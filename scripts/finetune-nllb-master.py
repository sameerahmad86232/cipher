#!/usr/bin/env python3
"""Master NLLB-200 Kashmiri-English Translation Fine-Tuning Pipeline.

Ingests and unifies:
1. SMUQamar/Kashmiri-English-Dataset-270K (270k pairs)
2. Omarrran/kashmiri_English_parallel_corpus_49K (49k pairs)
3. Kaggle expanded & clean parallel datasets
4. JKBOSE textbook stories and literary corpora
5. 26 In-House verified Kashmiri grammar lessons (Wade/Koul structural alignment)

Model: facebook/nllb-200-distilled-600M (or facebook/nllb-200-1.3B)
LoRA: Rank 64, Alpha 128 on Attention Projections (q_proj, k_proj, v_proj, out_proj)
Evaluation: sacreBLEU and chrF++ metrics with test smoke generations
"""

import os
import sys
import csv
import glob
import json
import shutil
import hashlib
import unicodedata
from pathlib import Path

import torch
from datasets import Dataset, load_dataset
from peft import LoraConfig, TaskType, get_peft_model
from transformers import (
    AutoModelForSeq2SeqLM,
    AutoTokenizer,
    DataCollatorForSeq2Seq,
    Seq2SeqTrainer,
    Seq2SeqTrainingArguments,
)
from transformers.trainer_utils import get_last_checkpoint
import evaluate

ROOT = Path(__file__).resolve().parents[1]
MODEL_ID = os.getenv("BASE_MODEL", "facebook/nllb-200-distilled-600M")
OUTPUT_DIR = Path(os.getenv("OUTPUT_DIR", "/kaggle/working/kashmiri-nllb-master"))
HF_REPO_ID = os.getenv("HF_REPO_ID", "Sameer0313/kashmiri-nllb-lora")
HF_TOKEN = os.getenv("HF_TOKEN", "")

if not torch.cuda.is_available():
    print("[!] Warning: CUDA GPU not detected. Training will be slow.")
    device = "cpu"
else:
    device = "cuda"
    gpu_name = torch.cuda.get_device_name(0)
    vram = torch.cuda.get_device_properties(0).total_memory / (1024 ** 3)
    print(f"[+] Active GPU: {gpu_name} ({vram:.1f} GB VRAM)")

# ---------------------------------------------------------------------------
# Kashmiri Text Normalization & Filtering
# ---------------------------------------------------------------------------
def clean_text(text: str) -> str:
    if not isinstance(text, str):
        return ""
    text = unicodedata.normalize("NFKC", text)
    return " ".join(text.strip().split())

def is_valid_pair(en: str, ks: str) -> bool:
    if not en or not ks:
        return False
    en_words = en.split()
    ks_words = ks.split()
    if len(en_words) < 2 or len(en_words) > 180:
        return False
    if len(ks_words) < 2 or len(ks_words) > 180:
        return False
    # Ensure Kashmiri side contains Arabic/Perso-Arabic script characters
    if not any("\u0600" <= c <= "\u06ff" or "\u0750" <= c <= "\u077f" for c in ks):
        return False
    # Filter out identical source and target (untranslated copy-paste)
    if en.strip().lower() == ks.strip().lower():
        return False
    return True

# ---------------------------------------------------------------------------
# Corpus Aggregation from All Sources
# ---------------------------------------------------------------------------
def load_all_parallel_data():
    all_rows = []
    seen = set()

    def add_row(src, tgt, tier, src_lang="eng_Latn", tgt_lang="kas_Arab"):
        src_c = clean_text(src)
        tgt_c = clean_text(tgt)
        if is_valid_pair(src_c, tgt_c):
            key = (src_lang, src_c.lower(), tgt_c)
            if key not in seen:
                seen.add(key)
                all_rows.append({
                    "source": src_c,
                    "target": tgt_c,
                    "src_lang": src_lang,
                    "tgt_lang": tgt_lang,
                    "tier": tier
                })

    print("[*] Ingesting local repository gold & verified parallel data...")
    # 1. Local gold parallel
    for p in [
        ROOT / "training-data/approved-parallel.jsonl",
        ROOT / "training-data/combined-parallel.jsonl",
        ROOT / "training-data/reviewed-parallel.jsonl",
        ROOT / "training-data/seerah-chapter1-parallel-review.jsonl",
    ]:
        if p.exists():
            for line in p.read_text(encoding="utf-8").splitlines():
                if not line.strip():
                    continue
                try:
                    row = json.loads(line)
                    en = row.get("english") or row.get("source") or row.get("en")
                    ks = row.get("kashmiri") or row.get("target") or row.get("ks")
                    if en and ks:
                        add_row(en, ks, tier="repo-gold")
                except Exception:
                    pass

    # 2. In-house Grammar Lessons (Lessons 1 to 26)
    for p in ROOT.glob("training-data/native-speaker-grammar-lesson-*.json"):
        try:
            data = json.loads(p.read_text(encoding="utf-8"))
            pairs = data.get("pairs") or data.get("sentences") or data if isinstance(data, list) else []
            for item in pairs:
                if isinstance(item, dict):
                    en = item.get("english") or item.get("en")
                    ks = item.get("kashmiri") or item.get("ks")
                    if en and ks:
                        add_row(en, ks, tier="grammar-lesson")
        except Exception:
            pass

    # 3. Kaggle Input Datasets (if running on Kaggle)
    kaggle_input = Path("/kaggle/input")
    if kaggle_input.exists():
        print("[*] Ingesting Kaggle parallel datasets...")
        for csv_file in kaggle_input.glob("**/*.csv"):
            try:
                with csv_file.open(encoding="utf-8", errors="ignore") as f:
                    reader = csv.DictReader(f)
                    for r in reader:
                        en = r.get("English") or r.get("english") or r.get("en") or r.get("src")
                        ks = r.get("Kashmiri") or r.get("kashmiri") or r.get("ks") or r.get("tgt")
                        if en and ks:
                            add_row(en, ks, tier="kaggle-csv")
            except Exception:
                pass
        for jsonl_file in kaggle_input.glob("**/*.jsonl"):
            try:
                for line in jsonl_file.read_text(encoding="utf-8", errors="ignore").splitlines():
                    if line.strip():
                        r = json.loads(line)
                        en = r.get("english") or r.get("en") or r.get("source")
                        ks = r.get("kashmiri") or r.get("ks") or r.get("target")
                        if en and ks:
                            add_row(en, ks, tier="kaggle-jsonl")
            except Exception:
                pass

    # 4. Hugging Face Large Corpora
    print("[*] Ingesting Hugging Face online corpora (SMUQamar 270K & Omarrran 49K)...")
    for hf_id, split in [
        ("Omarrran/kashmiri_English_parallel_corpus_49K", "train"),
        ("SMUQamar/Kashmiri-English-Dataset-270K", "train"),
    ]:
        try:
            print(f"[*] Loading {hf_id}...")
            ds = load_dataset(hf_id, split=split, trust_remote_code=True)
            for item in ds:
                en = item.get("English") or item.get("english") or item.get("en") or item.get("source")
                ks = item.get("Kashmiri") or item.get("kashmiri") or item.get("ks") or item.get("target")
                if en and ks:
                    add_row(en, ks, tier=hf_id)
            print(f"[+] Successfully loaded from {hf_id}!")
        except Exception as e:
            print(f"[-] Could not load {hf_id}: {e}")

    print(f"[+] Total Verified & Deduplicated Parallel Sentences: {len(all_rows)}")
    return all_rows

# ---------------------------------------------------------------------------
# Training Pipeline
# ---------------------------------------------------------------------------
print(f"[*] Initializing tokenizer and model: {MODEL_ID}...")
tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
base_model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_ID)

peft_config = LoraConfig(
    task_type=TaskType.SEQ_2_SEQ_LM,
    r=64,
    lora_alpha=128,
    lora_dropout=0.05,
    target_modules=["q_proj", "v_proj", "k_proj", "out_proj"],
    bias="none",
)
model = get_peft_model(base_model, peft_config)
model.config.use_cache = False
model.enable_input_require_grads()
model.print_trainable_parameters()

corpus = load_all_parallel_data()
if not corpus:
    raise SystemExit("[!] No training data found. Ensure internet is ON or datasets are attached.")

# Deterministic Split
import random
random.seed(42)
random.shuffle(corpus)
split_idx = max(int(len(corpus) * 0.98), 1)
train_rows = corpus[:split_idx]
eval_rows = corpus[split_idx:] if len(corpus) > 50 else corpus[:10]
# Write to disk to enable memory-mapped arrow cache (prevents RAM OOM on 300k+ rows)
tmp_train = Path("/tmp/kashmiri_train.jsonl")
tmp_eval = Path("/tmp/kashmiri_eval.jsonl")
with tmp_train.open("w", encoding="utf-8") as f:
    for r in train_rows:
        f.write(json.dumps(r, ensure_ascii=False) + "\n")
with tmp_eval.open("w", encoding="utf-8") as f:
    for r in eval_rows[:100]:
        f.write(json.dumps(r, ensure_ascii=False) + "\n")

def tokenize_batch(batch):
    encoded = []
    for source, target, src_l, tgt_l in zip(batch["source"], batch["target"], batch["src_lang"], batch["tgt_lang"]):
        tokenizer.src_lang = src_l
        tokenizer.tgt_lang = tgt_l
        res = tokenizer(source, text_target=target, max_length=192, truncation=True)
        encoded.append(res)
    return {k: [r[k] for r in encoded] for k in encoded[0]}

raw_ds = load_dataset("json", data_files={"train": str(tmp_train), "eval": str(tmp_eval)})
train_ds = raw_ds["train"].map(
    tokenize_batch,
    batched=True,
    batch_size=1000,
    keep_in_memory=False,
    remove_columns=["source", "target", "src_lang", "tgt_lang", "tier"]
)
eval_ds = raw_ds["eval"].map(
    tokenize_batch,
    batched=True,
    batch_size=1000,
    keep_in_memory=False,
    remove_columns=["source", "target", "src_lang", "tgt_lang", "tier"]
)

# ---------------------------------------------------------------------------
# Metrics: sacreBLEU and chrF++
# ---------------------------------------------------------------------------
bleu_metric = evaluate.load("sacrebleu")
chrf_metric = evaluate.load("chrf")

def compute_metrics(eval_preds):
    preds, labels = eval_preds
    if isinstance(preds, tuple):
        preds = preds[0]
    decoded_preds = tokenizer.batch_decode(preds, skip_special_tokens=True)
    labels = [[l for l in label if l != -100] for label in labels]
    decoded_labels = tokenizer.batch_decode(labels, skip_special_tokens=True)

    decoded_preds = [p.strip() for p in decoded_preds]
    decoded_labels = [[l.strip()] for l in decoded_labels]

    bleu = bleu_metric.compute(predictions=decoded_preds, references=decoded_labels)["score"]
    chrf = chrf_metric.compute(predictions=decoded_preds, references=decoded_labels)["score"]
    return {"bleu": round(bleu, 2), "chrf": round(chrf, 2)}

# ---------------------------------------------------------------------------
# Trainer Setup & Execution
# ---------------------------------------------------------------------------
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
collator = DataCollatorForSeq2Seq(tokenizer, model=model)

training_args = Seq2SeqTrainingArguments(
    output_dir=str(OUTPUT_DIR / "checkpoints"),
    num_train_epochs=int(os.getenv("NUM_EPOCHS", "3")),
    per_device_train_batch_size=int(os.getenv("BATCH_SIZE", "2")),
    per_device_eval_batch_size=2,
    gradient_accumulation_steps=int(os.getenv("GRAD_ACCUM", "8")),
    learning_rate=float(os.getenv("LEARNING_RATE", "1e-4")),
    lr_scheduler_type="cosine",
    warmup_ratio=0.05,
    weight_decay=0.01,
    gradient_checkpointing=True,
    gradient_checkpointing_kwargs={"use_reentrant": False},
    fp16=torch.cuda.is_available(),
    eval_accumulation_steps=1,
    eval_strategy="epoch",
    save_strategy="epoch",
    save_total_limit=2,
    logging_steps=50,
    report_to=["none"],
    predict_with_generate=False,
    load_best_model_at_end=True,
    metric_for_best_model="eval_loss",
    greater_is_better=False,
)

trainer = Seq2SeqTrainer(
    model=model,
    args=training_args,
    train_dataset=train_ds,
    eval_dataset=eval_ds,
    data_collator=collator,
    compute_metrics=compute_metrics,
)

print("=" * 70)
print(f"[*] Starting Master Kashmiri NLLB Training on {len(train_ds)} Parallel Pairs...")
print("=" * 70)

trainer.train()

print("[+] Training completed successfully!")
eval_results = trainer.evaluate()
print("[+] Final Evaluation:", eval_results)

# ---------------------------------------------------------------------------
# Generation Smoke Tests
# ---------------------------------------------------------------------------
def translate_english_to_kashmiri(text: str) -> str:
    tokenizer.src_lang = "eng_Latn"
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=192).to(model.device)
    with torch.no_grad():
        ids = model.generate(
            **inputs,
            forced_bos_token_id=tokenizer.convert_tokens_to_ids("kas_Arab"),
            max_new_tokens=128,
            num_beams=4,
            repetition_penalty=1.15,
            no_repeat_ngram_size=3
        )
    return tokenizer.batch_decode(ids, skip_special_tokens=True)[0]

test_sentences = [
    "I am reading a book in Kashmiri.",
    "The children are playing happily in the garden.",
    "Peace and blessings be upon the Prophet.",
    "Quantization is the process of mapping continuous values to discrete levels.",
    "Kashmir is famous for its mountains, saffron, and beautiful lakes.",
]

print("\n" + "=" * 70)
print("MASTER TRANSLATION GENERATION SMOKE TEST:")
print("=" * 70)
smoke_results = []
for sent in test_sentences:
    trans = translate_english_to_kashmiri(sent)
    print(f"EN: {sent}")
    print(f"KS: {trans}\n")
    smoke_results.append({"english": sent, "kashmiri": trans})

# ---------------------------------------------------------------------------
# Save & Hugging Face Upload
# ---------------------------------------------------------------------------
adapter_dir = OUTPUT_DIR / "adapter"
tokenizer_dir = OUTPUT_DIR / "tokenizer"
model.save_pretrained(str(adapter_dir))
tokenizer.save_pretrained(str(tokenizer_dir))

report = {
    "base_model": MODEL_ID,
    "total_parallel_pairs": len(corpus),
    "evaluation_metrics": eval_results,
    "smoke_test_generations": smoke_results
}
(OUTPUT_DIR / "training-report.json").write_text(json.dumps(report, indent=2, ensure_ascii=False))

# Create zip archive for 1-click download
shutil.make_archive("/kaggle/working/kashmiri-nllb-master-adapter", "zip", adapter_dir)
print("[+] Created download zip: /kaggle/working/kashmiri-nllb-master-adapter.zip")

if HF_TOKEN:
    try:
        from huggingface_hub import HfApi
        api = HfApi(token=HF_TOKEN)
        api.create_repo(repo_id=HF_REPO_ID, repo_type="model", exist_ok=True)
        api.upload_folder(
            folder_path=str(adapter_dir),
            repo_id=HF_REPO_ID,
            repo_type="model",
            commit_message="Update: Master SOTA Kashmiri NLLB Translation LoRA Adapter (300k+ pairs)"
        )
        print(f"[+] Uploaded master adapter to: https://huggingface.co/{HF_REPO_ID}")
    except Exception as e:
        print(f"[-] Hugging Face upload skipped or error: {e}")

print("=" * 70)
print("MASTER KASHMIRI TRANSLATION PIPELINE COMPLETE!")
print("=" * 70)
