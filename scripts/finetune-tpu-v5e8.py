#!/usr/bin/env python3
"""Master Kashmiri Model Fine-Tuning Pipeline Optimized for Google Cloud TPU v5e-8.

Hardware Profile:
- 8 TPU v5e TensorCores (128 GB Total High Bandwidth Memory / 16 GB HBM per core)
- Native bfloat16 (BF16) matrix multiplication units
- Parallel SPMD execution via PyTorch / XLA (PJRT)

Ingestion Corpora:
1. SMUQamar/Kashmiri-English-Dataset-270K (270k pairs)
2. Omarrran/kashmiri_English_parallel_corpus_49K (49k pairs)
3. Kaggle Clean & Expanded Kashmiri Datasets
4. JKBOSE Textbooks & 26 In-House Verified Grammar Lessons
"""

import os
import sys
import json
import shutil
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
import evaluate

ROOT = Path(__file__).resolve().parents[1]
MODEL_ID = os.getenv("BASE_MODEL", "facebook/nllb-200-distilled-600M")
OUTPUT_DIR = Path(os.getenv("OUTPUT_DIR", "/tmp/kashmiri-tpu-master"))
HF_REPO_ID = os.getenv("HF_REPO_ID", "Sameer0313/kashmiri-nllb-lora")
HF_TOKEN = os.getenv("HF_TOKEN", "")

# ---------------------------------------------------------------------------
# TPU Environment Setup
# ---------------------------------------------------------------------------
is_tpu = False
try:
    import torch_xla.core.xla_model as xm
    is_tpu = True
    print(f"[+] Active Accelerator: TPU (XLA Device: {xm.xla_device()})")
except ImportError:
    print("[!] torch_xla not detected. Falling back to CUDA / CPU.")

# ---------------------------------------------------------------------------
# Text Normalization & Pair Validation
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
    if not any("\u0600" <= c <= "\u06ff" or "\u0750" <= c <= "\u077f" for c in ks):
        return False
    if en.strip().lower() == ks.strip().lower():
        return False
    return True

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

    print("[*] Ingesting repository gold data & grammar lessons...")
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

    print("[*] Ingesting Hugging Face online corpora (SMUQamar 270K & Omarrran 49K)...")
    for hf_id, split in [
        ("Omarrran/kashmiri_English_parallel_corpus_49K", "train"),
        ("SMUQamar/Kashmiri-English-Dataset-270K", "train"),
    ]:
        try:
            print(f"[*] Ingesting {hf_id}...")
            ds = load_dataset(hf_id, split=split, trust_remote_code=True)
            for item in ds:
                en = item.get("English") or item.get("english") or item.get("en") or item.get("source")
                ks = item.get("Kashmiri") or item.get("kashmiri") or item.get("ks") or item.get("target")
                if en and ks:
                    add_row(en, ks, tier=hf_id)
            print(f"[+] Loaded {hf_id} successfully!")
        except Exception as e:
            print(f"[-] Could not load {hf_id}: {e}")

    print(f"[+] Total Ingested Parallel Pairs: {len(all_rows)}")
    return all_rows

# ---------------------------------------------------------------------------
# Main Training Routine
# ---------------------------------------------------------------------------
def main():
    print("=" * 70)
    print("KASHMIRI MASTER NLLB FINE-TUNING PIPELINE (TPU v5e-8 OPTIMIZED)")
    print("=" * 70)

    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
    base_model = AutoModelForSeq2SeqLM.from_pretrained(
        MODEL_ID,
        torch_dtype=torch.bfloat16 if is_tpu else (torch.float16 if torch.cuda.is_available() else torch.float32)
    )

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
    model.print_trainable_parameters()

    corpus = load_all_parallel_data()
    if not corpus:
        raise SystemExit("[!] No parallel data available.")

    import random
    random.seed(42)
    random.shuffle(corpus)
    split = max(int(len(corpus) * 0.98), 1)
    train_rows = corpus[:split]
    eval_rows = corpus[split:] if len(corpus) > 50 else corpus[:10]

    def tokenize_fn(batch):
        encoded = []
        for s, t, sl, tl in zip(batch["source"], batch["target"], batch["src_lang"], batch["tgt_lang"]):
            tokenizer.src_lang = sl
            tokenizer.tgt_lang = tl
            res = tokenizer(s, text_target=t, max_length=192, truncation=True)
            encoded.append(res)
        return {k: [r[k] for r in encoded] for k in encoded[0]}

    train_ds = Dataset.from_list(train_rows).map(tokenize_fn, batched=True, remove_columns=["source", "target", "src_lang", "tgt_lang", "tier"])
    eval_ds = Dataset.from_list(eval_rows).map(tokenize_fn, batched=True, remove_columns=["source", "target", "src_lang", "tgt_lang", "tier"])

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
        return {
            "bleu": round(bleu_metric.compute(predictions=decoded_preds, references=decoded_labels)["score"], 2),
            "chrf": round(chrf_metric.compute(predictions=decoded_preds, references=decoded_labels)["score"], 2)
        }

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    collator = DataCollatorForSeq2Seq(tokenizer, model=model)

    # TPU v5e-8 has 8 cores x 16 GB HBM (128 GB total memory)
    # Allows larger batch size without gradient checkpointing slowdown
    batch_size = int(os.getenv("BATCH_SIZE", "16" if is_tpu else "4"))
    grad_accum = int(os.getenv("GRAD_ACCUM", "2" if is_tpu else "4"))

    training_args = Seq2SeqTrainingArguments(
        output_dir=str(OUTPUT_DIR / "checkpoints"),
        num_train_epochs=int(os.getenv("NUM_EPOCHS", "3")),
        per_device_train_batch_size=batch_size,
        per_device_eval_batch_size=batch_size,
        gradient_accumulation_steps=grad_accum,
        learning_rate=float(os.getenv("LEARNING_RATE", "2e-4" if is_tpu else "1e-4")),
        lr_scheduler_type="cosine",
        warmup_ratio=0.03,
        weight_decay=0.01,
        bf16=is_tpu,
        fp16=False if is_tpu else torch.cuda.is_available(),
        eval_strategy="epoch",
        save_strategy="epoch",
        save_total_limit=2,
        logging_steps=50,
        dataloader_drop_last=is_tpu,  # Critical for TPU XLA compilation stability
        report_to=["none"],
        predict_with_generate=False,
    )

    trainer = Seq2SeqTrainer(
        model=model,
        args=training_args,
        train_dataset=train_ds,
        eval_dataset=eval_ds,
        data_collator=collator,
        compute_metrics=compute_metrics,
    )

    print(f"[*] Starting Training on {len(train_ds)} Kashmiri Parallel Pairs...")
    trainer.train()

    adapter_dir = OUTPUT_DIR / "adapter"
    model.save_pretrained(str(adapter_dir))
    tokenizer.save_pretrained(str(OUTPUT_DIR / "tokenizer"))
    print(f"[+] Saved fine-tuned adapter to {adapter_dir}")

if __name__ == "__main__":
    main()
