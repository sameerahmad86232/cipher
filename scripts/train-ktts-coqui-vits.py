#!/usr/bin/env python3
"""Audit KTTS and train a single-speaker Coqui VITS model on clean clips only."""

from __future__ import annotations

import json
import math
import os
import re
import shutil
import unicodedata
from pathlib import Path

import numpy as np
import soundfile as sf

from trainer import Trainer, TrainerArgs
from TTS.config.shared_configs import BaseAudioConfig
from TTS.tts.configs.shared_configs import BaseDatasetConfig, CharactersConfig
from TTS.tts.configs.vits_config import VitsConfig
from TTS.tts.datasets import load_tts_samples
from TTS.tts.models.vits import Vits


DATA_ROOT = Path(os.getenv("KTTS_ROOT", "/kaggle/working/ktts-vits"))
OUTPUT_ROOT = Path(os.getenv("OUTPUT_DIR", "/kaggle/working/ktts-coqui-vits"))
EPOCHS = int(os.getenv("VITS_EPOCHS", "200"))
SAMPLE_RATE = 22_050
ARABIC = re.compile(r"[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]")
PUNCTUATION = " !'(),-.:;?،؛؟۔"
CHARACTERS = "ابتثجحخدذرزسشصضطظعغفقكلمنهويءةىأإؤئپچژکگںھہۃیېۄۆۈٲؠۍےٹڈڑ"
DIACRITICS = "ًٌٍَُِّْٰٕٖٜٟٔٗ٘ٙٚٛ"


def audit_line(line: str) -> tuple[dict, str | None]:
    audio_path, _speaker, text = line.split("|", 2)
    path = Path(audio_path)
    text = unicodedata.normalize("NFC", " ".join(text.split()))
    record = {"audio": str(path), "text": text}
    if not path.is_file():
        return record, "missing_audio"
    if len(text) < 2 or len(text) > 220 or not ARABIC.search(text):
        return record, "invalid_transcript"
    try:
        info = sf.info(path)
        audio, sample_rate = sf.read(path, dtype="float32", always_2d=False)
    except Exception:
        return record, "decode_error"
    if audio.ndim > 1:
        audio = audio.mean(axis=1)
    duration = len(audio) / sample_rate
    peak = float(np.max(np.abs(audio), initial=0.0))
    rms = float(np.sqrt(np.mean(np.square(audio), dtype=np.float64))) if len(audio) else 0.0
    clipped = float(np.mean(np.abs(audio) >= 0.999)) if len(audio) else 1.0
    record.update({"seconds": round(duration, 4), "sampleRate": info.samplerate, "peak": peak, "rms": rms, "clippedFraction": clipped})
    if sample_rate != SAMPLE_RATE:
        return record, "wrong_sample_rate"
    if duration < 0.8 or duration > 12.0:
        return record, "duration_outlier"
    if not np.isfinite(audio).all() or peak < 0.015 or rms < 0.003:
        return record, "silent_or_invalid"
    if clipped > 0.001:
        return record, "clipped"
    return record, None


def prepare_metadata() -> dict:
    accepted: dict[str, list[dict]] = {"train": [], "val": []}
    rejected: list[dict] = []
    for split in accepted:
        source = DATA_ROOT / f"{split}.txt"
        if not source.is_file():
            raise SystemExit(f"Missing prepared KTTS file list: {source}")
        for line in source.read_text(encoding="utf-8").splitlines():
            if not line.strip():
                continue
            record, reason = audit_line(line)
            if reason:
                rejected.append({**record, "split": split, "reason": reason})
            else:
                accepted[split].append(record)

    DATA_ROOT.mkdir(parents=True, exist_ok=True)
    for split, records in accepted.items():
        lines = []
        for record in records:
            stem = Path(record["audio"]).stem
            text = record["text"].replace("|", " ")
            lines.append(f"{stem}|{text}|{text}")
        (DATA_ROOT / f"metadata_{split}.csv").write_text("\n".join(lines) + "\n", encoding="utf-8")

    seconds = sum(record["seconds"] for records in accepted.values() for record in records)
    reasons: dict[str, int] = {}
    for record in rejected:
        reasons[record["reason"]] = reasons.get(record["reason"], 0) + 1
    report = {
        "accepted": {split: len(records) for split, records in accepted.items()},
        "acceptedHours": round(seconds / 3600, 3),
        "rejected": len(rejected),
        "rejectionReasons": reasons,
        "policy": {"durationSeconds": [0.8, 12.0], "minimumPeak": 0.015, "minimumRms": 0.003, "maximumClippedFraction": 0.001},
    }
    (DATA_ROOT / "vits-audit-report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    (DATA_ROOT / "vits-rejected.json").write_text(json.dumps(rejected, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))
    if len(accepted["train"]) < 2200 or report["acceptedHours"] < 3.2:
        raise SystemExit("Too little clean KTTS data remains; refusing VITS training")
    return report


def main() -> None:
    audit = prepare_metadata()
    dataset = BaseDatasetConfig(
        formatter="ljspeech",
        dataset_name="ktts_clean",
        path=str(DATA_ROOT),
        meta_file_train="metadata_train.csv",
        meta_file_val="metadata_val.csv",
        language="ks",
    )
    audio = BaseAudioConfig(
        sample_rate=SAMPLE_RATE,
        win_length=1024,
        hop_length=256,
        num_mels=80,
        mel_fmin=0,
        mel_fmax=8000,
    )
    characters = CharactersConfig(
        characters=CHARACTERS + DIACRITICS,
        punctuations=PUNCTUATION,
        pad="<PAD>",
        eos=None,
        bos=None,
        blank="<BLNK>",
        is_unique=True,
        is_sorted=True,
    )
    config = VitsConfig(
        audio=audio,
        characters=characters,
        run_name="ktts_vits_clean_v1",
        output_path=str(OUTPUT_ROOT),
        datasets=[dataset],
        batch_size=16,
        eval_batch_size=8,
        batch_group_size=0,
        num_loader_workers=2,
        num_eval_loader_workers=1,
        run_eval=True,
        test_delay_epochs=-1,
        epochs=EPOCHS,
        text_cleaner="basic_cleaners",
        use_phonemes=False,
        compute_input_seq_cache=True,
        print_step=50,
        print_eval=True,
        save_step=2000,
        save_n_checkpoints=3,
        mixed_precision=True,
        cudnn_benchmark=False,
    )
    train_samples, eval_samples = load_tts_samples(
        config,
        eval_split=True,
        eval_split_max_size=166,
        eval_split_size=0.05,
    )
    if not eval_samples:
        raise SystemExit("Coqui did not load validation samples; refusing training without evaluation")
    print(f"Loaded clean KTTS samples: train={len(train_samples)}, eval={len(eval_samples)}")
    model = Vits(config)
    trainer = Trainer(
        TrainerArgs(),
        config,
        str(OUTPUT_ROOT),
        model=model,
        train_samples=train_samples,
        eval_samples=eval_samples,
    )
    trainer.fit()

    candidates = list(OUTPUT_ROOT.rglob("best_model*.pth")) or list(OUTPUT_ROOT.rglob("checkpoint_*.pth"))
    if not candidates:
        raise SystemExit("Training ended without a VITS checkpoint")
    best = max(candidates, key=lambda path: path.stat().st_mtime)
    configs = list(best.parent.glob("config.json")) or list(OUTPUT_ROOT.rglob("config.json"))
    if not configs:
        raise SystemExit("VITS config was not exported")
    release = Path("/kaggle/working/ktts-vits-clean-v1")
    release.mkdir(exist_ok=True)
    shutil.copy2(best, release / "model.pth")
    shutil.copy2(configs[0], release / "config.json")
    shutil.copy2(DATA_ROOT / "vits-audit-report.json", release / "audit-report.json")
    (release / "LICENSE-DATA.txt").write_text("KTTS data: CC BY-NC 3.0. Non-commercial use only. DOI: 10.17632/5c4dcvxdmb.2\n", encoding="utf-8")
    summary = {"architecture": "Coqui VITS", "epochs": EPOCHS, "cleanData": audit, "checkpoint": str(best), "productionDeployed": False, "humanReviewRequired": True}
    (release / "training-report.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    shutil.make_archive("/kaggle/working/ktts-vits-clean-v1", "zip", release)
    print(json.dumps(summary, indent=2))
    print("Artifact: /kaggle/working/ktts-vits-clean-v1.zip")


if __name__ == "__main__":
    main()
