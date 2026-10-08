#!/usr/bin/env python3
"""Staged NLLB LoRA training for higher-quality English→Kashmiri.

Stage A teaches broad Kashmiri generation from attributed parallel corpora.
Stage B performs low-rate corrective training on owner-approved English pairs.
Raw OCR, dictionary glosses, synthetic translations and unreviewed Hadith drafts
are deliberately excluded.
"""
import csv, hashlib, json, os
from pathlib import Path

import torch
from datasets import Dataset
from peft import LoraConfig, TaskType, get_peft_model
from transformers import (AutoModelForSeq2SeqLM, AutoTokenizer,
    DataCollatorForSeq2Seq, Seq2SeqTrainer, Seq2SeqTrainingArguments)

ROOT = Path(__file__).resolve().parents[1]
MODEL_ID = os.getenv("BASE_MODEL", "facebook/nllb-200-distilled-600M")
OUT = Path(os.getenv("OUTPUT_DIR", ROOT / "training-data/nllb-quality-staged"))

if not torch.cuda.is_available():
    raise SystemExit("CUDA GPU required; no training was started and no false model artifact was created.")

def clean(value): return " ".join(str(value).strip().split())
def valid(en, ks):
    return 2 <= len(en.split()) <= 180 and 2 <= len(ks.split()) <= 180 and any("\u0600" <= c <= "\u06ff" for c in ks)
def split_key(en, ks): return int(hashlib.sha256((en+"\0"+ks).encode()).hexdigest(), 16) % 100

gold=[]
for path in [ROOT/"training-data/approved-parallel.jsonl", ROOT/"training-data/hadith-corrections/approved-passages.jsonl"]:
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip(): continue
        row=json.loads(line); en,ks=clean(row["english"]),clean(row["kashmiri"])
        if valid(en,ks): gold.append({"source":en,"target":ks,"src_lang":"eng_Latn","tier":"gold"})

# CoRIL is Hindi→Kashmiri, not English→Kashmiri. It is used only as a
# multilingual target-fluency auxiliary task; its test split is never trained.
aux=[]
with (ROOT/"training-data/coril/train.tsv").open(encoding="utf-8") as handle:
    for row in csv.reader(handle, delimiter="\t"):
        if len(row) >= 2:
            hi,ks=map(clean,row[:2])
            if valid(hi,ks): aux.append({"source":hi,"target":ks,"src_lang":"hin_Deva","tier":"aux-coril"})

# Optional gated BPCC file, downloaded by the user after accepting its terms.
bpcc_path=Path(os.getenv("BPCC_FILE", ROOT/"source-data/bpcc-seed-latest/kas_Arab.tsv"))
bpcc=[]
if bpcc_path.exists():
    with bpcc_path.open(encoding="utf-8") as handle:
        for row in csv.DictReader(handle, delimiter="\t"):
            en,ks=clean(row.get("src","")),clean(row.get("tgt",""))
            if row.get("src_lang")=="eng_Latn" and row.get("tgt_lang")=="kas_Arab" and valid(en,ks):
                bpcc.append({"source":en,"target":ks,"src_lang":"eng_Latn","tier":"bpcc"})

seen=set()
def unique(rows):
    out=[]
    for row in rows:
        key=(row["src_lang"],row["source"],row["target"])
        if key not in seen: seen.add(key); out.append(row)
    return out

gold=unique(gold); bpcc=unique(bpcc); aux=unique(aux)
gold_train=[r for r in gold if split_key(r["source"],r["target"])>=15]
gold_eval=[r for r in gold if split_key(r["source"],r["target"])<15]
bpcc_train=[r for r in bpcc if split_key(r["source"],r["target"])>=5]
bpcc_eval=[r for r in bpcc if split_key(r["source"],r["target"])<5][:1000]

# Oversampling makes the small native-reviewed set influence Stage A without
# pretending it is a large corpus. Stage B then specializes only on gold data.
stage_a=aux + bpcc_train + gold_train*12
eval_rows=(bpcc_eval + gold_eval) or gold_eval

tokenizer=AutoTokenizer.from_pretrained(MODEL_ID)
base=AutoModelForSeq2SeqLM.from_pretrained(MODEL_ID)
model=get_peft_model(base,LoraConfig(task_type=TaskType.SEQ_2_SEQ_LM,r=16,lora_alpha=32,lora_dropout=.1,target_modules=["q_proj","v_proj"]))
model.config.use_cache=False

def tokenize(batch):
    encoded=[]
    for source,target,src in zip(batch["source"],batch["target"],batch["src_lang"]):
        tokenizer.src_lang=src; tokenizer.tgt_lang="kas_Arab"
        encoded.append(tokenizer(source,text_target=target,max_length=256,truncation=True))
    return {key:[row[key] for row in encoded] for key in encoded[0]}
def dataset(rows): return Dataset.from_list(rows).map(tokenize,batched=True,remove_columns=["source","target","src_lang","tier"])

collator=DataCollatorForSeq2Seq(tokenizer,model=model)
common=dict(per_device_train_batch_size=2,per_device_eval_batch_size=2,gradient_accumulation_steps=8,fp16=True,report_to="none",seed=42,save_total_limit=2)

trainer_a=Seq2SeqTrainer(model=model,args=Seq2SeqTrainingArguments(output_dir=str(OUT/"stage-a"),num_train_epochs=2,learning_rate=5e-5,eval_strategy="epoch",save_strategy="epoch",**common),train_dataset=dataset(stage_a),eval_dataset=dataset(eval_rows),data_collator=collator)
trainer_a.train()
stage_a_metrics=trainer_a.evaluate()

trainer_b=Seq2SeqTrainer(model=model,args=Seq2SeqTrainingArguments(output_dir=str(OUT/"stage-b"),num_train_epochs=8,learning_rate=8e-6,eval_strategy="epoch",save_strategy="epoch",load_best_model_at_end=True,metric_for_best_model="eval_loss",greater_is_better=False,**common),train_dataset=dataset(gold_train),eval_dataset=dataset(gold_eval),data_collator=collator)
trainer_b.train(); stage_b_metrics=trainer_b.evaluate()
model.save_pretrained(OUT/"adapter"); tokenizer.save_pretrained(OUT/"tokenizer")
(OUT/"training-report.json").write_text(json.dumps({"baseModel":MODEL_ID,"goldPairs":len(gold),"auxCorilPairs":len(aux),"bpccPairs":len(bpcc),"stageAMetrics":stage_a_metrics,"stageBMetrics":stage_b_metrics,"exclusions":["raw OCR","dictionary glosses","synthetic corpora","unreviewed Hadith drafts","CoRIL dev/test"],"productionDeployed":False},ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print("Saved",OUT/"adapter")
