#!/usr/bin/env python3
"""Prepare licensed public Kashmiri speech for Whisper fine-tuning.

The script writes verified 16 kHz mono WAV files plus a metadata CSV that the
Stage-2 trainer can discover. Gated AI4Bharat sources are attempted only when
--include-gated is supplied and HF_TOKEN has accepted the dataset terms.
"""

import argparse
import csv
import hashlib
import io
import os
import re
import unicodedata
from pathlib import Path

import librosa
import numpy as np
import soundfile as sf
from datasets import Audio, load_dataset


SOURCES = (
    {
        "id": "facebook/omnilingual-asr-corpus",
        "config": "ks_Arab",
        "split": "train",
        "audio": ("audio",),
        "text": ("raw_text", "text"),
        "license": "CC-BY-4.0",
        "revision": "8648ba8946377697b427ae952076e49fc0e5e44d",
        "gated": False,
        "origin": "Meta Omnilingual ASR Kashmiri",
    },
    {
        "id": "GAASH-Lab/Bolbosh",
        "config": "default",
        "split": "train",
        "audio": ("audio",),
        "text": ("text",),
        "license": "CC-BY-4.0",
        "revision": "88aef14aa30bca969b7bda49b056a2483f7fcde8",
        "gated": False,
        "origin": "GAASH-Lab Bolbosh",
    },
    {
        "id": "programindz/kashmiri-audio-corpus",
        "config": "default",
        "split": "train",
        "audio": ("audio", "audio_filepath"),
        "text": ("normalized", "text", "verbatim"),
        "license": "GPL-3.0-or-later",
        "revision": "cd0b1408bf2757f7fefc5832a6c12cbc61abc627",
        "gated": False,
        "origin": "OpenSLR-122",
    },
    {
        "id": "ai4bharat/IndicVoices",
        "config": "kashmiri",
        "split": "train",
        "audio": ("audio_filepath", "audio"),
        "text": ("normalized", "text", "verbatim"),
        "license": "CC-BY-4.0",
        "revision": "main",
        "gated": True,
        "origin": "AI4Bharat IndicVoices",
    },
    {
        "id": "ai4bharat/indicvoices_r",
        "config": "Kashmiri",
        "split": "train",
        "audio": ("audio_filepath", "audio"),
        "text": ("normalized", "text", "verbatim"),
        "license": "CC-BY-4.0",
        "revision": "main",
        "gated": True,
        "origin": "AI4Bharat IndicVoices-R",
    },
)

ARABIC = re.compile(r"[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]")
LETTERS = re.compile(r"[^\W\d_]", re.UNICODE)
VARIANTS = str.maketrans({"ي": "ی", "ى": "ی", "ك": "ک", "أ": "ا", "إ": "ا", "ٱ": "ا"})


def normalize_text(value: object) -> str:
    text = unicodedata.normalize("NFC", str(value or "")).translate(VARIANTS)
    return re.sub(r"\s+", " ", text.replace("\u200b", "").replace("\ufeff", "")).strip()


def valid_text(text: str) -> bool:
    letters = LETTERS.findall(text)
    return 1 <= len(text.split()) <= 80 and len(letters) >= 2 and len(ARABIC.findall(text)) / len(letters) >= 0.65


def decode_audio(value: object) -> tuple[np.ndarray, int]:
    if not isinstance(value, dict):
        raise ValueError("audio row is not a dictionary")
    if value.get("bytes"):
        audio, rate = sf.read(io.BytesIO(value["bytes"]), dtype="float32")
    elif value.get("path"):
        audio, rate = sf.read(value["path"], dtype="float32")
    else:
        raise ValueError("audio row has neither bytes nor path")
    if audio.ndim > 1:
        audio = audio.mean(axis=1)
    if rate != 16000:
        audio = librosa.resample(audio, orig_sr=rate, target_sr=16000)
        rate = 16000
    return np.asarray(audio, dtype=np.float32), rate


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, default=Path("/kaggle/working/public-kashmiri-asr"))
    parser.add_argument("--include-gated", action="store_true")
    parser.add_argument("--max-per-source", type=int, default=12000, help="0 keeps every accepted sample")
    parser.add_argument("--source-id", action="append", default=[], help="Only prepare these source repository IDs")
    args = parser.parse_args()

    audio_dir = args.output / "audio"
    audio_dir.mkdir(parents=True, exist_ok=True)
    token = os.getenv("HF_TOKEN") or None
    rows: list[dict[str, object]] = []
    seen: set[str] = set()

    for source in SOURCES:
        if args.source_id and source["id"] not in args.source_id:
            continue
        if source["gated"] and (not args.include_gated or not token):
            print(f"[skip] {source['id']}: gated; accept its terms and provide HF_TOKEN")
            continue
        print(f"[load] {source['id']} ({source['license']})")
        try:
            dataset = load_dataset(
                source["id"],
                source["config"],
                split=source["split"],
                streaming=True,
                token=token,
                revision=source["revision"],
            )
            audio_column = next((name for name in source["audio"] if name in dataset.column_names), None)
            text_column = next((name for name in source["text"] if name in dataset.column_names), None)
            if not audio_column or not text_column:
                raise ValueError(f"required columns missing; found {dataset.column_names}")
            dataset = dataset.cast_column(audio_column, Audio(decode=False))
            accepted = 0
            for index, item in enumerate(dataset):
                if args.max_per_source and accepted >= args.max_per_source:
                    break
                text = normalize_text(item.get(text_column))
                if not valid_text(text):
                    continue
                try:
                    audio, rate = decode_audio(item.get(audio_column))
                except Exception:
                    continue
                duration = len(audio) / rate
                rms = float(np.sqrt(np.mean(np.square(audio)))) if len(audio) else 0.0
                if not 0.8 <= duration <= 30.0 or rms < 0.0005 or not np.isfinite(audio).all():
                    continue
                digest = hashlib.sha256(audio.tobytes() + text.encode("utf-8")).hexdigest()
                if digest in seen:
                    continue
                seen.add(digest)
                filename = f"{source['origin'].lower().replace(' ', '-')}-{digest[:16]}.wav"
                sf.write(audio_dir / filename, np.clip(audio, -1, 1), 16000, subtype="PCM_16")
                rows.append({
                    "filename": filename,
                    "text": text,
                    "duration": round(duration, 3),
                    "source": source["id"],
                    "origin": source["origin"],
                    "license": source["license"],
                    "revision": source["revision"],
                    "sha256": digest,
                })
                accepted += 1
            print(f"[done] {source['id']}: {accepted:,} verified clips")
        except Exception as error:
            print(f"[skip] {source['id']}: {type(error).__name__}: {error}")

    manifest = args.output / "metadata.csv"
    fields = ["filename", "text", "duration", "source", "origin", "license", "revision", "sha256"]
    with manifest.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)
    hours = sum(float(row["duration"]) for row in rows) / 3600
    print(f"[ready] {len(rows):,} clips / {hours:.2f} hours -> {manifest}")


if __name__ == "__main__":
    main()
