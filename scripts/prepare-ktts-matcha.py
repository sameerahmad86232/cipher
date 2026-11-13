#!/usr/bin/env python3
"""Prepare the CC BY-NC 3.0 KTTS corpus for Bolbosh/Matcha-TTS.

Downloads the public Hugging Face Parquet shards, validates embedded WAV audio,
resamples to Bolbosh's native 22.05 kHz format, and writes deterministic
train/validation/test filelists. The designated speaker ID is 422 so an
existing male Bolbosh speaker embedding can be adapted without changing the
released checkpoint architecture.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
import re
import subprocess
import unicodedata
from pathlib import Path

import numpy as np
import pyarrow.parquet as pq
import soundfile as sf
from huggingface_hub import snapshot_download
from scipy.signal import resample_poly


DATASET_ID = "programindz/kashmiri-tts-single-speaker"
DATASET_REVISION = "6819f8b4a49d6c8070008ba69bf255b6b8296b09"
SAMPLE_RATE = 22_050
SPEAKER_ID = 422
KASHMIRI_RE = re.compile(r"[\u0600-\u06ff]")


def normalize_text(value: object) -> str:
    text = unicodedata.normalize("NFC", str(value or ""))
    return " ".join(text.replace("|", " ").split())


def audio_bytes(value: object) -> bytes | None:
    if isinstance(value, dict):
        value = value.get("bytes")
    if isinstance(value, memoryview):
        value = value.tobytes()
    return value if isinstance(value, bytes) else None


def stable_bucket(text: str, raw: bytes) -> int:
    return int(hashlib.sha256(text.encode("utf-8") + raw[:4096]).hexdigest()[:8], 16) % 100


def iter_source_rows(local_root: Path):
    """Prefer Kaggle's attached original KTTS files; fall back to pinned HF Parquet."""
    csv_files = list(local_root.glob("**/textcorpus.csv")) if local_root.exists() else []
    if csv_files:
        metadata = csv_files[0]
        wavs = {path.stem: path for path in metadata.parent.parent.glob("Recordings/*") if path.is_file()}
        with metadata.open(encoding="utf-8-sig", newline="") as handle:
            for row in csv.DictReader(handle):
                audio = wavs.get(str(row.get("id", "")).strip())
                if audio:
                    yield {"audio": {"bytes": audio.read_bytes()}, "text": row.get("sentence", "")}
        return

    cache = snapshot_download(
        DATASET_ID,
        repo_type="dataset",
        revision=DATASET_REVISION,
        allow_patterns=["data/*.parquet", "README.md"],
    )
    shards = sorted(Path(cache).glob("data/*.parquet"))
    if not shards:
        raise SystemExit("No KTTS source files were found")
    for shard in shards:
        parquet = pq.ParquetFile(shard)
        for batch in parquet.iter_batches(batch_size=32, columns=["audio", "text"]):
            yield from batch.to_pylist()


def decode_audio(raw: bytes) -> tuple[np.ndarray, int]:
    """Decode PCM WAV or Opus-in-WAV, which occurs in the original KTTS archive."""
    try:
        audio, source_rate = sf.read(io.BytesIO(raw), dtype="float32", always_2d=False)
        return np.asarray(audio), int(source_rate)
    except Exception:
        process = subprocess.run(
            ["ffmpeg", "-v", "error", "-i", "pipe:0", "-ac", "1", "-ar", str(SAMPLE_RATE), "-f", "f32le", "pipe:1"],
            input=raw,
            capture_output=True,
            check=True,
        )
        return np.frombuffer(process.stdout, dtype="<f4").copy(), SAMPLE_RATE


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, default=Path("/kaggle/working/ktts-matcha"))
    parser.add_argument("--repo-dir", type=Path, required=True, help="Bolbosh repository root")
    parser.add_argument("--local-root", type=Path, default=Path("/kaggle/input"))
    args = parser.parse_args()

    output = args.output.resolve()
    wav_dir = output / "wavs"
    wav_dir.mkdir(parents=True, exist_ok=True)
    splits: dict[str, list[str]] = {"train": [], "val": [], "test": []}
    rejected: list[dict[str, object]] = []
    durations: list[float] = []
    index = 0
    for row in iter_source_rows(args.local_root):
        raw = audio_bytes(row.get("audio"))
        text = normalize_text(row.get("text"))
        reason = ""
        if not raw:
            reason = "missing_audio"
        elif not text or not KASHMIRI_RE.search(text):
            reason = "missing_kashmiri_text"
        try:
            if reason:
                raise ValueError(reason)
            audio, source_rate = decode_audio(raw)
            if audio.ndim == 2:
                audio = audio.mean(axis=1)
            duration = len(audio) / source_rate
            if not np.isfinite(audio).all() or float(np.max(np.abs(audio), initial=0)) < 1e-4:
                raise ValueError("invalid_or_silent_audio")
            if duration < 0.8 or duration > 20.0:
                raise ValueError("duration_out_of_range")
            if source_rate != SAMPLE_RATE:
                divisor = np.gcd(source_rate, SAMPLE_RATE)
                audio = resample_poly(audio, SAMPLE_RATE // divisor, source_rate // divisor).astype(np.float32)
            peak = float(np.max(np.abs(audio), initial=0))
            if peak > 0.99:
                audio = audio * (0.99 / peak)
        except Exception as exc:  # keep an auditable rejection ledger
            rejected.append({"row": index, "reason": reason or str(exc)})
            index += 1
            continue

        wav_path = wav_dir / f"ktts_{index:05d}.wav"
        sf.write(wav_path, audio, SAMPLE_RATE, subtype="PCM_16")
        bucket = stable_bucket(text, raw)
        split = "test" if bucket < 3 else "val" if bucket < 8 else "train"
        splits[split].append(f"{wav_path}|{SPEAKER_ID}|{text}")
        durations.append(duration)
        index += 1

    for split, lines in splits.items():
        (output / f"{split}.txt").write_text("\n".join(lines) + "\n", encoding="utf-8")
    report = {
        "dataset": DATASET_ID,
        "revision": DATASET_REVISION,
        "license": "CC BY-NC 3.0",
        "commercial_use": False,
        "speaker_id": SPEAKER_ID,
        "sample_rate": SAMPLE_RATE,
        "accepted": sum(map(len, splits.values())),
        "splits": {key: len(value) for key, value in splits.items()},
        "rejected": len(rejected),
        "hours": round(sum(durations) / 3600, 3),
        "duration_seconds": {
            "minimum": round(min(durations), 3) if durations else None,
            "maximum": round(max(durations), 3) if durations else None,
            "mean": round(float(np.mean(durations)), 3) if durations else None,
        },
    }
    (output / "preparation-report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    (output / "rejected.json").write_text(json.dumps(rejected, indent=2), encoding="utf-8")

    data_dir = args.repo_dir / "data" / "Kashmiri"
    data_dir.mkdir(parents=True, exist_ok=True)
    (data_dir / "train.txt").write_text((output / "train.txt").read_text(encoding="utf-8"), encoding="utf-8")
    (data_dir / "val.txt").write_text((output / "val.txt").read_text(encoding="utf-8"), encoding="utf-8")
    print(json.dumps(report, indent=2))
    if report["accepted"] < 2500:
        raise SystemExit("Too few validated KTTS pairs; refusing to train")


if __name__ == "__main__":
    main()
