#!/usr/bin/env python3
"""Small CPU-only character Transformer diagnostic; never a production model."""
import json, os, random, time
from pathlib import Path
import torch
from torch import nn
from torch.utils.data import DataLoader, Dataset

ROOT=Path(__file__).resolve().parents[1]
USE_SILVER=os.getenv("INCLUDE_SILVER")=="1"
OUT=ROOT/("training-data/cpu-silver-diagnostic" if USE_SILVER else "training-data/cpu-diagnostic")
torch.manual_seed(42); random.seed(42); torch.set_num_threads(4)

rows=[]
for path in [ROOT/"training-data/approved-parallel.jsonl",ROOT/"training-data/hadith-corrections/approved-passages.jsonl"]:
    rows += [json.loads(x) for x in path.read_text(encoding="utf-8").splitlines() if x.strip()]
pairs=[]; seen=set()
for r in rows:
    pair=(" ".join(r["english"].split())," ".join(r["kashmiri"].split()))
    if pair not in seen: seen.add(pair); pairs.append(pair)
gold_pairs=list(pairs)
if USE_SILVER:
    silver_train=[json.loads(x) for x in (ROOT/"training-data/opus-en-ks/train-silver.jsonl").read_text().splitlines() if x.strip()]
    silver_eval=[json.loads(x) for x in (ROOT/"training-data/opus-en-ks/evaluation-silver.jsonl").read_text().splitlines() if x.strip()]
    train_pairs=[(r["english"],r["kashmiri"]) for r in silver_train]+gold_pairs*8
    val_pairs=[(r["english"],r["kashmiri"]) for r in silver_eval]
    pairs=train_pairs+val_pairs
else:
    random.shuffle(pairs); cut=max(1,int(len(pairs)*.85)); train_pairs,val_pairs=pairs[:cut],pairs[cut:]

PAD,BOS,EOS,UNK="<pad>","<bos>","<eos>","<unk>"
chars=sorted(set("".join(a+b for a,b in pairs)))
itos=[PAD,BOS,EOS,UNK]+chars; stoi={c:i for i,c in enumerate(itos)}
def encode(s,max_len=256): return [1]+[stoi.get(c,3) for c in s[:max_len-2]]+[2]
class Pairs(Dataset):
    def __init__(self,p): self.p=p
    def __len__(self): return len(self.p)
    def __getitem__(self,i): return torch.tensor(encode(self.p[i][0])),torch.tensor(encode(self.p[i][1]))
def collate(batch):
    src=nn.utils.rnn.pad_sequence([x for x,_ in batch],batch_first=True)
    tgt=nn.utils.rnn.pad_sequence([y for _,y in batch],batch_first=True)
    return src,tgt

class Model(nn.Module):
    def __init__(self,vocab,d=96):
        super().__init__(); self.emb=nn.Embedding(vocab,d,padding_idx=0); self.pos=nn.Embedding(256,d)
        self.t=nn.Transformer(d_model=d,nhead=4,num_encoder_layers=2,num_decoder_layers=2,dim_feedforward=256,dropout=.1,batch_first=True)
        self.out=nn.Linear(d,vocab)
    def e(self,x): return self.emb(x)+self.pos(torch.arange(x.size(1),device=x.device))[None]
    def forward(self,s,t):
        mask=nn.Transformer.generate_square_subsequent_mask(t.size(1),device=t.device)
        return self.out(self.t(self.e(s),self.e(t),tgt_mask=mask,src_key_padding_mask=s.eq(0),tgt_key_padding_mask=t.eq(0),memory_key_padding_mask=s.eq(0)))

model=Model(len(itos)); checkpoint=OUT/"diagnostic.pt"; previous=[]
if checkpoint.exists():
    saved=torch.load(checkpoint,map_location="cpu",weights_only=False)
    if saved.get("vocabulary")==itos:
        model.load_state_dict(saved["state_dict"])
        report_path=OUT/"report.json"
        if report_path.exists(): previous=json.loads(report_path.read_text())["history"]
opt=torch.optim.AdamW(model.parameters(),lr=1.5e-4); lossfn=nn.CrossEntropyLoss(ignore_index=0)
batch_size=8 if USE_SILVER else 4
loader=DataLoader(Pairs(train_pairs),batch_size=batch_size,shuffle=True,collate_fn=collate)
valloader=DataLoader(Pairs(val_pairs),batch_size=batch_size,collate_fn=collate)
history=[]; started=time.time(); start_epoch=len(previous)
for epoch in range(int(os.getenv("EPOCHS","12"))):
    model.train(); total=0; count=0
    for src,tgt in loader:
        opt.zero_grad(); logits=model(src,tgt[:,:-1]); loss=lossfn(logits.reshape(-1,len(itos)),tgt[:,1:].reshape(-1)); loss.backward(); nn.utils.clip_grad_norm_(model.parameters(),1); opt.step(); total+=loss.item(); count+=1
    model.eval(); vt=vc=0
    with torch.no_grad():
        for src,tgt in valloader:
            loss=lossfn(model(src,tgt[:,:-1]).reshape(-1,len(itos)),tgt[:,1:].reshape(-1)); vt+=loss.item(); vc+=1
    row={"epoch":start_epoch+epoch+1,"trainLoss":total/count,"validationLoss":vt/max(vc,1)}; history.append(row); print(row,flush=True)
OUT.mkdir(parents=True,exist_ok=True)
torch.save({"state_dict":model.state_dict(),"vocabulary":itos,"config":{"dModel":96,"layers":2}},OUT/"diagnostic.pt")
(OUT/"report.json").write_text(json.dumps({"purpose":"CPU pipeline diagnostic only—not deployable translation quality","approvedPairs":len(gold_pairs),"includesOpusSilver":USE_SILVER,"trainPairs":len(train_pairs),"validationPairs":len(val_pairs),"parameters":sum(p.numel() for p in model.parameters()),"lastRunSeconds":time.time()-started,"history":previous+history,"productionEligible":False},indent=2)+"\n")
print("saved",OUT)
