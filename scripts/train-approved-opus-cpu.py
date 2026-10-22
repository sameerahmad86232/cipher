#!/usr/bin/env python3
"""Bounded CPU neural seq2seq diagnostic, not pretrained-translator fine-tuning."""
import hashlib,json,random,re,time
from pathlib import Path
import torch
from torch import nn
from torch.nn.utils.rnn import pad_sequence,pack_padded_sequence
from torch.utils.data import DataLoader
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'training-data/approved-opus-cpu'
SEED=42;MAXLEN=256;EPOCHS=3

def main():
 torch.manual_seed(SEED);random.seed(SEED);torch.set_num_threads(4)
 OUT.mkdir(parents=True,exist_ok=True)
 source=ROOT/'training-data/opus-sentence-review/approved-pairs.jsonl'
 rows=[json.loads(s) for s in source.read_text().splitlines()]
 train=[];valid=[];excluded=[]
 for r in rows:
  reason=None
  if not r['trainingEligible']:reason='conflicting-target'
  elif r['english']=='He is also the member of parliament (MP) for Gandhinagar.':reason='observed-content-mismatch'
  elif len(r['english'].split())>2*len(r['kashmiri'].split()):reason='possible-content-omission'
  elif max(len(r['english']),len(r['kashmiri']))>MAXLEN-2:reason='exceeds-diagnostic-length-limit-no-truncation'
  if reason:excluded.append({'id':r['id'],'reason':reason});continue
  group=f"{r['source']}:{r['alignmentLine']}"
  (valid if int(hashlib.sha256(group.encode()).hexdigest(),16)%10==0 else train).append(r)
 chars=sorted(set(''.join(r['english']+r['kashmiri'] for r in train)))
 vocab=['<pad>','<bos>','<eos>','<unk>']+chars;lookup={c:i for i,c in enumerate(vocab)}
 def encode(s):return torch.tensor([1]+[lookup.get(c,3) for c in s]+[2])
 def collate(batch):
  a=[encode(r['english']) for r in batch];b=[encode(r['kashmiri']) for r in batch]
  return pad_sequence(a,batch_first=True),torch.tensor([len(x) for x in a]),pad_sequence(b,batch_first=True)
 class Net(nn.Module):
  def __init__(self):
   super().__init__();self.emb=nn.Embedding(len(vocab),64,padding_idx=0);self.enc=nn.GRU(64,128,batch_first=True);self.dec=nn.GRU(64,128,batch_first=True);self.out=nn.Linear(128,len(vocab))
  def state(self,x,lengths):return self.enc(pack_padded_sequence(self.emb(x),lengths.cpu(),batch_first=True,enforce_sorted=False))[1]
  def forward(self,x,lengths,y):return self.out(self.dec(self.emb(y),self.state(x,lengths))[0])
 model=Net();opt=torch.optim.AdamW(model.parameters(),lr=.001);criterion=nn.CrossEntropyLoss(ignore_index=0,reduction='sum')
 loader=DataLoader(train,batch_size=32,shuffle=True,collate_fn=collate,generator=torch.Generator().manual_seed(SEED))
 evalloader=DataLoader(valid,batch_size=32,collate_fn=collate)
 def evaluate():
  model.eval();total=count=0
  with torch.no_grad():
   for x,l,y in evalloader:
    total+=criterion(model(x,l,y[:,:-1]).reshape(-1,len(vocab)),y[:,1:].reshape(-1)).item();count+=y[:,1:].ne(0).sum().item()
  return total/count
 start=time.time();baseline=evaluate();history=[]
 print(json.dumps({'train':len(train),'validation':len(valid),'excluded':len(excluded),'initialValidationLoss':baseline}),flush=True)
 for epoch in range(EPOCHS):
  model.train();total=count=0
  for x,l,y in loader:
   opt.zero_grad();n=y[:,1:].ne(0).sum();loss=criterion(model(x,l,y[:,:-1]).reshape(-1,len(vocab)),y[:,1:].reshape(-1))/n
   loss.backward();nn.utils.clip_grad_norm_(model.parameters(),1);opt.step();total+=loss.item()*n.item();count+=n.item()
  result={'epoch':epoch+1,'trainTokenLoss':total/count,'validationTokenLoss':evaluate()};history.append(result);print(json.dumps(result),flush=True)
 def generate(s):
  model.eval();x=encode(s)[None];out=[]
  with torch.no_grad():
   h=model.state(x,torch.tensor([x.size(1)]));y=torch.tensor([[1]])
   for _ in range(100):
    z,h=model.dec(model.emb(y),h);v=int(model.out(z)[0,-1].argmax())
    if v==2:break
    if v>=4:out.append(vocab[v])
    y=torch.tensor([[v]])
  return ''.join(out)
 samples=[{'english':r['english'],'reference':r['kashmiri'],'generated':generate(r['english'])} for r in sorted(valid,key=lambda x:len(x['english']))[:3]]
 torch.save({'state_dict':model.state_dict(),'vocabulary':vocab,'architecture':{'type':'character-GRU-encoder-decoder','embedding':64,'hidden':128},'seed':SEED},OUT/'model.pt')
 split={'trainIds':[r['id'] for r in train],'validationIds':[r['id'] for r in valid],'excluded':excluded}
 (OUT/'split.json').write_text(json.dumps(split,indent=2)+'\n')
 report={'purpose':'CPU neural training diagnostic, not production translation','pytorchVersion':torch.__version__,'device':'cpu','seed':SEED,'inputSHA256':hashlib.sha256(source.read_bytes()).hexdigest(),'trainPairs':len(train),'validationPairs':len(valid),'excludedPairs':len(excluded),'splitPolicy':'Parent source+alignment line hash; siblings stay together. Conflicting targets excluded. Vocabulary fitted on training only.','epochs':EPOCHS,'parameters':sum(p.numel() for p in model.parameters()),'baselineValidationTokenLoss':baseline,'history':history,'seconds':time.time()-start,'generationSamples':samples,'distinctGeneratedSamples':len({r['generated'] for r in samples}),'pretrainedModelFineTuning':False,'neuralTrainingPerformed':True,'productionEligible':False,'qualityDecision':'Experimental only. Falling character loss does not establish translation quality. Do not deploy these weights as the translator.','licensePolicy':'Retain underlying CC BY and CC BY-SA attribution and obligations; checkpoint is not claimed to have independent permissive clearance.'}
 (OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False),flush=True)
if __name__=='__main__':main()
