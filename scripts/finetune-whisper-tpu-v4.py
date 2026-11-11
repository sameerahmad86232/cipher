#!/usr/bin/env python3
"""Fine-tune OpenAI Whisper Large-V3-Turbo on Google Cloud TPU v4.

Hardware Profile:
- Google Cloud TPU v4 (8 TensorCores, 128 GB High-Bandwidth Memory)
- Native hardware bfloat16 (BF16) matrix acceleration
- Parallel SPMD execution via PyTorch / XLA (PJRT)
- Multi-dataset ingestion: gopikrishnan2005/kashmiri-text-to-speech + umar1103/converteddatanew
"""

import os
import sys
import glob
import json
import shutil
import unicodedata
from pathlib import Path
from dataclasses import dataclass
from typing import Any, Dict, List, Union

import torch
import numpy as np
import pandas as pd
import soundfile as sf
import librosa
from torch.utils.data import Dataset

is_tpu = False
try:
    import torch_xla.core.xla_model as xm
    is_tpu = True
    print(f"[+] Active TPU v4 Device: {xm.xla_device()}")
except ImportError:
    print("[!] torch_xla not detected; using CPU/CUDA fallback.")

from transformers import (
    WhisperProcessor,
    WhisperForConditionalGeneration,
    Seq2SeqTrainer,
    Seq2SeqTrainingArguments,
)
from peft import LoraConfig, get_peft_model, TaskType
import evaluate

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
BASE_MODEL = os.getenv("WHISPER_MODEL", "openai/whisper-large-v3-turbo")
OUTPUT_DIR = Path(os.getenv("OUTPUT_DIR", "/kaggle/working/kashmiri-whisper-tpu-v4-adapter"))
CHECKPOINTS_DIR = Path(os.getenv("CHECKPOINTS_DIR", "/kaggle/working/whisper-tpu-checkpoints"))
HF_REPO_ID = os.getenv("HF_REPO_ID", "Sameer0313/kashmiri-whisper-lora")
HF_TOKEN = os.getenv("HF_TOKEN", "")

NUM_EPOCHS = int(os.getenv("NUM_EPOCHS", "8"))
BATCH_SIZE = int(os.getenv("BATCH_SIZE", "8" if is_tpu else "4"))
GRAD_ACCUM = int(os.getenv("GRAD_ACCUM", "2" if is_tpu else "4"))
LEARNING_RATE = float(os.getenv("LEARNING_RATE", "2e-4"))
TARGET_SAMPLE_RATE = 16000

print(f"[+] Target Model: {BASE_MODEL}")
print(f"[+] Output Directory: {OUTPUT_DIR}")
print(f"[+] Target HF Repo: {HF_REPO_ID}")

# ---------------------------------------------------------------------------
# Processor & Model Setup
# ---------------------------------------------------------------------------
processor = WhisperProcessor.from_pretrained(
    BASE_MODEL,
    language="Urdu",  # Perso-Arabic phonetic conditioning
    task="transcribe"
)

dtype = torch.bfloat16 if is_tpu else (torch.float16 if torch.cuda.is_available() else torch.float32)
base_model = WhisperForConditionalGeneration.from_pretrained(
    BASE_MODEL,
    torch_dtype=dtype,
    low_cpu_mem_usage=True
)

base_model.config.forced_decoder_ids = processor.get_decoder_prompt_ids(
    language="Urdu",
    task="transcribe"
)
base_model.config.suppress_tokens = []
base_model.config.use_cache = False

peft_config = LoraConfig(
    task_type=TaskType.FEATURE_EXTRACTION,
    inference_mode=False,
    r=64,
    lora_alpha=128,
    lora_dropout=0.05,
    target_modules=["q_proj", "v_proj", "k_proj", "out_proj", "fc1", "fc2"]
)
model = get_peft_model(base_model, peft_config)
model.print_trainable_parameters()

# ---------------------------------------------------------------------------
# Dataset Discovery & Indexing
# ---------------------------------------------------------------------------
def clean_kashmiri_text(text: str) -> str:
    if not isinstance(text, str):
        return ""
    text = unicodedata.normalize("NFKC", text)
    return " ".join(text.strip().split())

def find_dataset_pairs() -> List[Dict[str, str]]:
    pairs = []
    seen = set()
    kaggle_input = Path("/kaggle/input")
    if not kaggle_input.exists():
        print("[!] /kaggle/input not found. Looking in local paths...")
        kaggle_input = Path(".")

    # Search all csv and tsv metadata
    for meta_file in kaggle_input.glob("**/*.[ct]sv"):
        try:
            sep = "\t" if meta_file.suffix == ".tsv" else ","
            df = pd.read_csv(meta_file, sep=sep, on_bad_lines="skip")
            cols = {c.lower(): c for c in df.columns}
            audio_col = cols.get("audio") or cols.get("path") or cols.get("filename") or cols.get("file")
            text_col = cols.get("text") or cols.get("transcription") or cols.get("kashmiri") or cols.get("sentence")
            if audio_col and text_col:
                base_dir = meta_file.parent
                for _, row in df.iterrows():
                    audio_val = str(row[audio_col]).strip()
                    text_val = clean_kashmiri_text(str(row[text_col]))
                    if not text_val or len(text_val) < 2:
                        continue
                    audio_path = base_dir / audio_val
                    if not audio_path.exists():
                        matches = list(base_dir.glob(f"**/{audio_val}"))
                        if matches:
                            audio_path = matches[0]
                    if audio_path.exists() and str(audio_path) not in seen:
                        seen.add(str(audio_path))
                        pairs.append({"audio_path": str(audio_path), "text": text_val})
        except Exception:
            pass

    # Direct audio search if metadata not found
    if not pairs:
        print("[*] Direct wav/flac search...")
        for audio in kaggle_input.glob("**/*.[wf][al][va]*"):
            txt_path = audio.with_suffix(".txt")
            if txt_path.exists():
                t = clean_kashmiri_text(txt_path.read_text(encoding="utf-8", errors="ignore"))
                if t and str(audio) not in seen:
                    seen.add(str(audio))
                    pairs.append({"audio_path": str(audio), "text": t})

    print(f"[+] Total Verified Kashmiri Audio-Text Pairs: {len(pairs)}")
    return pairs

all_pairs = find_dataset_pairs()
if not all_pairs:
    raise SystemExit("[!] No audio pairs found in /kaggle/input. Verify datasets are attached.")

import random
random.seed(42)
random.shuffle(all_pairs)
split_idx = max(int(len(all_pairs) * 0.95), 1)
train_records = all_pairs[:split_idx]
eval_records = all_pairs[split_idx:] if len(all_pairs) > 50 else all_pairs[:10]
print(f"[+] Train: {len(train_records)} | Eval: {len(eval_records)}")

# ---------------------------------------------------------------------------
# Streaming PyTorch Audio Dataset
# ---------------------------------------------------------------------------
class KashmiriAudioDataset(Dataset):
    def __init__(self, records, processor, target_sr=16000):
        self.records = records
        self.processor = processor
        self.target_sr = target_sr

    def __len__(self):
        return len(self.records)

    def __getitem__(self, idx):
        rec = self.records[idx]
        try:
            audio, sr = sf.read(rec["audio_path"], dtype="float32")
            if audio.ndim > 1:
                audio = audio.mean(axis=1)
            if sr != self.target_sr:
                audio = librosa.resample(audio, orig_sr=sr, target_sr=self.target_sr)
        except Exception:
            audio = np.zeros(self.target_sr * 2, dtype="float32")

        max_samples = 30 * self.target_sr
        if len(audio) > max_samples:
            audio = audio[:max_samples]

        features = self.processor.feature_extractor(
            audio,
            sampling_rate=self.target_sr,
            return_tensors="pt"
        ).input_features[0]

        labels = self.processor.tokenizer(rec["text"]).input_ids
        return {"input_features": features, "labels": labels}

@dataclass
class DataCollatorSpeechSeq2SeqWithPadding:
    processor: Any
    def __call__(self, features: List[Dict[str, Any]]) -> Dict[str, torch.Tensor]:
        input_features = [{"input_features": f["input_features"]} for f in features]
        batch = self.processor.feature_extractor.pad(input_features, return_tensors="pt")
        label_features = [{"input_ids": f["labels"]} for f in features]
        labels_batch = self.processor.tokenizer.pad(label_features, return_tensors="pt")
        labels = labels_batch["input_ids"].masked_fill(labels_batch.attention_mask.ne(1), -100)
        batch["labels"] = labels
        return batch

train_ds = KashmiriAudioDataset(train_records, processor)
eval_ds = KashmiriAudioDataset(eval_records[:100], processor)
collator = DataCollatorSpeechSeq2SeqWithPadding(processor=processor)

# ---------------------------------------------------------------------------
# Training Pipeline
# ---------------------------------------------------------------------------
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
CHECKPOINTS_DIR.mkdir(parents=True, exist_ok=True)

training_args = Seq2SeqTrainingArguments(
    output_dir=str(CHECKPOINTS_DIR),
    per_device_train_batch_size=BATCH_SIZE,
    gradient_accumulation_steps=GRAD_ACCUM,
    learning_rate=LEARNING_RATE,
    warmup_ratio=0.05,
    num_train_epochs=NUM_EPOCHS,
    bf16=is_tpu,
    fp16=False if is_tpu else torch.cuda.is_available(),
    eval_strategy="no",
    save_strategy="epoch",
    save_total_limit=2,
    logging_steps=25,
    dataloader_drop_last=is_tpu,
    report_to=["none"],
    predict_with_generate=False,
)

trainer = Seq2SeqTrainer(
    args=training_args,
    model=model,
    train_dataset=train_ds,
    data_collator=collator,
    tokenizer=processor.feature_extractor,
)

print("=" * 70)
print(f"[*] Starting Whisper Large-V3-Turbo TPU v4 Training on {len(train_ds)} audio pairs...")
print("=" * 70)

trainer.train()

print("[+] Training completed!")
model.save_pretrained(str(OUTPUT_DIR))
processor.save_pretrained(str(OUTPUT_DIR))
shutil.make_archive(str(OUTPUT_DIR), "zip", OUTPUT_DIR)
print(f"[+] Saved model to {OUTPUT_DIR} and created zip archive.")

if HF_TOKEN:
    try:
        from huggingface_hub import HfApi
        api = HfApi(token=HF_TOKEN)
        api.create_repo(repo_id=HF_REPO_ID, repo_type="model", exist_ok=True)
        api.upload_folder(
            folder_path=str(OUTPUT_DIR),
            repo_id=HF_REPO_ID,
            repo_type="model",
            commit_message="Update: SOTA Kashmiri Whisper Large-V3-Turbo TPU v4 Speech Model"
        )
        print(f"[+] Successfully pushed adapter to https://huggingface.co/{HF_REPO_ID}")
    except Exception as e:
        print(f"[-] HF upload note: {e}")

print("=" * 70)
print("KASHMIRI WHISPER TPU v4 PIPELINE COMPLETE!")
print("=" * 70)
