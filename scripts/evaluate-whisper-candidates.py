#!/usr/bin/env python3
"""Compare Kashmiri Whisper adapters on a fixed reviewed audio manifest."""

import argparse
import gc
import json
import re
import unicodedata
import zipfile
from pathlib import Path

import jiwer
import librosa
import pandas as pd
import torch
from peft import PeftModel
from transformers import WhisperForConditionalGeneration, WhisperProcessor


BASE_MODEL = "openai/whisper-large-v3-turbo"
ADAPTERS = {
    "v2": "Sameer0313/kashmiri-whisper-lora-v2",
    "v3-public-candidate": "Sameer0313/kashmiri-whisper-lora-v3-public-candidate",
    "v4-real-speech-candidate": "Sameer0313/kashmiri-whisper-lora-v4-candidate",
    "v5-licensed-speech-candidate": "Sameer0313/kashmiri-whisper-lora-v5-candidate",
}
VARIANTS = str.maketrans({"ي": "ی", "ى": "ی", "ك": "ک", "أ": "ا", "إ": "ا", "ٱ": "ا"})


def normalize(text: str) -> str:
    value = unicodedata.normalize("NFC", str(text or "")).translate(VARIANTS)
    return re.sub(r"\s+", " ", value).strip()


def locate_manifest(root: Path) -> Path:
    manifests = list(root.rglob("metadata.csv"))
    if not manifests:
        raise FileNotFoundError(f"metadata.csv not found below {root}")
    return manifests[0]


def prepare_audio(manifest: Path, work: Path) -> Path:
    archive = manifest.parent / "audio.zip"
    if archive.exists():
        with zipfile.ZipFile(archive) as bundle:
            bundle.extractall(work)
        return work
    return manifest.parent


def evaluate(adapter: str, rows: pd.DataFrame, audio_root: Path) -> tuple[dict, list[dict]]:
    processor = WhisperProcessor.from_pretrained(BASE_MODEL, language="urdu", task="transcribe")
    base = WhisperForConditionalGeneration.from_pretrained(
        BASE_MODEL, torch_dtype=torch.float16, low_cpu_mem_usage=True
    )
    model = PeftModel.from_pretrained(base, adapter).to("cuda").eval()
    prompt = processor.get_decoder_prompt_ids(language="urdu", task="transcribe")
    predictions = []
    records = []
    references = [normalize(text) for text in rows["text"].tolist()]
    for index, row in rows.iterrows():
        audio_path = audio_root / row["audio"]
        if not audio_path.exists():
            audio_path = audio_root / Path(row["audio"]).name
        audio, _ = librosa.load(audio_path, sr=16000, mono=True)
        features = processor.feature_extractor(
            audio, sampling_rate=16000, return_tensors="pt"
        ).input_features.to("cuda", dtype=torch.float16)
        with torch.inference_mode():
            tokens = model.generate(
                features,
                forced_decoder_ids=prompt,
                max_new_tokens=224,
                num_beams=5,
                do_sample=False,
                repetition_penalty=1.05,
                early_stopping=True,
            )
        prediction = normalize(processor.tokenizer.batch_decode(tokens, skip_special_tokens=True)[0])
        predictions.append(prediction)
        records.append({"audio": row["audio"], "reference": references[index], "prediction": prediction})
        if (index + 1) % 25 == 0:
            print(f"{adapter}: {index + 1}/{len(rows)}", flush=True)
    result = {
        "adapter": adapter,
        "samples": len(rows),
        "wer": 100 * jiwer.wer(references, predictions),
        "cer": 100 * jiwer.cer(references, predictions),
    }
    del model, base, processor
    gc.collect(); torch.cuda.empty_cache()
    return result, records


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--data-root", type=Path, default=Path("/kaggle/input"))
    parser.add_argument("--output", type=Path, default=Path("/kaggle/working/whisper-candidate-evaluation.json"))
    args = parser.parse_args()
    manifest = locate_manifest(args.data_root)
    audio_root = prepare_audio(manifest, Path("/kaggle/working/ai4bharat-eval"))
    rows = pd.read_csv(manifest).head(150)
    results = []
    comparisons = {}
    for name, adapter in ADAPTERS.items():
        result, records = evaluate(adapter, rows, audio_root)
        result["name"] = name
        results.append(result)
        comparisons[name] = records
        print(json.dumps(result, ensure_ascii=False), flush=True)
    payload = {
        "dataset": "ai4bharat/IndicVoices Kashmiri valid",
        "license": "CC-BY-4.0",
        "results": results,
        "comparisons": comparisons,
    }
    args.output.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Saved {args.output}")


if __name__ == "__main__":
    main()
