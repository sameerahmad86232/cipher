#!/usr/bin/env python3
"""Fine-tune pretrained XTTS-v2 on clean KTTS using tokenizer-safe Kashmiri G2P."""

from __future__ import annotations

import json
import os
import sys
import unicodedata
import zipfile
from pathlib import Path

from trainer import Trainer, TrainerArgs
from TTS.config.shared_configs import BaseDatasetConfig
from TTS.tts.configs.xtts_config import XttsAudioConfig
from TTS.tts.datasets import load_tts_samples
from TTS.tts.layers.xtts.trainer.gpt_trainer import GPTArgs, GPTTrainer, GPTTrainerConfig
from TTS.utils.manage import ModelManager

sys.path.insert(0, "/kaggle/working/cipher/scripts")
from kashmiri_speech_frontend import ascii_g2p  # noqa: E402


DATA_ROOT = Path(os.getenv("KTTS_ROOT", "/kaggle/working/ktts-xtts"))
OUTPUT_ROOT = Path(os.getenv("OUTPUT_DIR", "/kaggle/working/ktts-xtts-training"))
EPOCHS = int(os.getenv("XTTS_EPOCHS", "15"))
BASE_FILES = OUTPUT_ROOT / "XTTS-v2-base"
BASE_FILES.mkdir(parents=True, exist_ok=True)

DVAE_URL = "https://huggingface.co/coqui/XTTS-v2/resolve/main/dvae.pth"
MEL_URL = "https://huggingface.co/coqui/XTTS-v2/resolve/main/mel_stats.pth"
VOCAB_URL = "https://huggingface.co/coqui/XTTS-v2/resolve/main/vocab.json"
MODEL_URL = "https://huggingface.co/coqui/XTTS-v2/resolve/main/model.pth"


def download_base() -> dict[str, Path]:
    paths = {name: BASE_FILES / Path(url).name for name, url in {"dvae": DVAE_URL, "mel": MEL_URL, "vocab": VOCAB_URL, "model": MODEL_URL}.items()}
    missing = [url for name, url in {"dvae": DVAE_URL, "mel": MEL_URL, "vocab": VOCAB_URL, "model": MODEL_URL}.items() if not paths[name].is_file()]
    if missing:
        ModelManager._download_model_files(missing, str(BASE_FILES), progress_bar=True)
    return paths


def prepare_phonetic_metadata() -> dict:
    missing: list[dict] = []
    counts: dict[str, int] = {}
    reference: Path | None = None
    for split in ("train", "val"):
        source = DATA_ROOT / f"{split}.txt"
        output: list[str] = []
        for line_number, line in enumerate(source.read_text(encoding="utf-8").splitlines(), 1):
            if not line.strip():
                continue
            audio, _speaker, text = line.split("|", 2)
            if reference is None and split == "train":
                reference = Path(audio)
            try:
                phonetic = ascii_g2p(unicodedata.normalize("NFC", text))
            except ValueError as error:
                missing.append({"split": split, "line": line_number, "text": text, "error": str(error)})
                continue
            stem = Path(audio).stem
            safe = phonetic.replace("|", " ")
            output.append(f"{stem}|{safe}|{safe}")
        (DATA_ROOT / f"metadata_{split}.csv").write_text("\n".join(output) + "\n", encoding="utf-8")
        counts[split] = len(output)
    report = {"counts": counts, "unmappedRows": len(missing), "unmappedExamples": missing[:50], "representation": "deterministic ASCII Kashmiri G2P"}
    (DATA_ROOT / "xtts-g2p-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    if missing:
        raise SystemExit("Kashmiri G2P has unmapped graphemes; refusing lossy XTTS training")
    if counts.get("train", 0) < 2500 or counts.get("val", 0) < 100 or reference is None:
        raise SystemExit("Insufficient phonetic KTTS metadata")
    return {**report, "speakerReference": str(reference)}


def main() -> None:
    base = download_base()
    g2p_report = prepare_phonetic_metadata()
    dataset = BaseDatasetConfig(
        formatter="ljspeech",
        dataset_name="ktts_phonetic",
        path=str(DATA_ROOT),
        meta_file_train="metadata_train.csv",
        meta_file_val="metadata_val.csv",
        language="ar",
    )
    model_args = GPTArgs(
        max_conditioning_length=132300,
        min_conditioning_length=66150,
        max_wav_length=264600,
        max_text_length=240,
        mel_norm_file=str(base["mel"]),
        dvae_checkpoint=str(base["dvae"]),
        xtts_checkpoint=str(base["model"]),
        tokenizer_file=str(base["vocab"]),
        gpt_num_audio_tokens=1026,
        gpt_start_audio_token=1024,
        gpt_stop_audio_token=1025,
        gpt_use_masking_gt_prompt_approach=True,
        gpt_use_perceiver_resampler=True,
    )
    audio = XttsAudioConfig(sample_rate=22050, dvae_sample_rate=22050, output_sample_rate=24000)
    reference = g2p_report["speakerReference"]
    config = GPTTrainerConfig(
        output_path=str(OUTPUT_ROOT),
        model_args=model_args,
        run_name="ktts_xtts_v1",
        project_name="ktts_xtts",
        run_description="Pretrained XTTS-v2 adapted to clean KTTS with lossless ASCII Kashmiri G2P",
        datasets=[dataset],
        dashboard_logger="tensorboard",
        audio=audio,
        epochs=EPOCHS,
        batch_size=3,
        batch_group_size=24,
        eval_batch_size=3,
        num_loader_workers=2,
        num_eval_loader_workers=1,
        eval_split_max_size=166,
        print_step=25,
        plot_step=200,
        log_model_step=1000,
        # XTTS checkpoints are about 1.9 GB. Periodic copies exhausted Kaggle's
        # disk during v4; retain only the validation-best model.
        save_step=1000000,
        save_n_checkpoints=1,
        save_checkpoints=True,
        print_eval=True,
        optimizer="AdamW",
        optimizer_wd_only_on_weights=True,
        optimizer_params={"betas": [0.9, 0.96], "eps": 1e-8, "weight_decay": 1e-2},
        lr=5e-6,
        lr_scheduler="MultiStepLR",
        lr_scheduler_params={"milestones": [6000, 12000], "gamma": 0.5, "last_epoch": -1},
        test_sentences=[
            {"text": ascii_g2p("تُہۍ کِتھ پٲٹھۍ چھِو؟"), "speaker_wav": [reference], "language": "ar"},
            {"text": ascii_g2p("کٲشُر زَبان چھِ واریاہ خوٗبصوٗرَت۔"), "speaker_wav": [reference], "language": "ar"},
        ],
    )
    # Coqui 0.28 expects the full trainer config here (newer development
    # recipes accept a raw dataset list). Pin this to the installed release.
    train_samples, eval_samples = load_tts_samples(
        config, eval_split=True, eval_split_max_size=166, eval_split_size=0.05
    )
    if not eval_samples:
        raise SystemExit("XTTS validation samples missing")
    print(f"XTTS clean phonetic samples: train={len(train_samples)}, eval={len(eval_samples)}")
    # GPTTrainer does not expose init_from_config in Coqui 0.28; instantiate
    # it directly, as required by that release's pinned XTTS recipe.
    model = GPTTrainer(config)
    # The pretrained weights and DVAE are now resident in the model. Keeping
    # their downloaded copies alongside multi-GB trainer checkpoints needlessly
    # raises peak disk use and caused the previous run to fail while saving.
    for disposable in (base["model"], base["dvae"]):
        disposable.unlink(missing_ok=True)
    trainer = Trainer(
        TrainerArgs(restore_path=None, skip_train_epoch=False, start_with_eval=True, grad_accum_steps=32),
        config,
        output_path=str(OUTPUT_ROOT),
        model=model,
        train_samples=train_samples,
        eval_samples=eval_samples,
    )
    trainer.fit()

    candidates = list(OUTPUT_ROOT.rglob("best_model*.pth")) or list(OUTPUT_ROOT.rglob("model.pth")) or list(OUTPUT_ROOT.rglob("checkpoint_*.pth"))
    if not candidates:
        raise SystemExit("XTTS training ended without a checkpoint")
    best = max(candidates, key=lambda path: path.stat().st_mtime)
    configs = list(best.parent.glob("config.json")) or list(OUTPUT_ROOT.rglob("config.json"))
    report = {"architecture": "XTTS-v2 GPT adaptation", "epochs": EPOCHS, "g2p": g2p_report, "checkpoint": str(best), "productionDeployed": False, "humanReviewRequired": True}
    report_path = OUTPUT_ROOT / "training-report.json"
    licenses_path = OUTPUT_ROOT / "LICENSES.txt"
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    licenses_path.write_text("XTTS-v2: Coqui Public Model License 1.0.0. KTTS data: CC BY-NC 3.0. Non-commercial experiment.\n", encoding="utf-8")
    # Stream files directly into the archive. A staging copy of model.pth would
    # consume another ~1.9 GB before ZIP creation.
    artifact = Path("/kaggle/working/ktts-xtts-v1.zip")
    with zipfile.ZipFile(artifact, "w", compression=zipfile.ZIP_STORED, allowZip64=True) as archive:
        for source, archive_name in (
            (best, "model.pth"),
            (configs[0], "config.json"),
            (base["vocab"], "vocab.json"),
            (DATA_ROOT / "xtts-g2p-report.json", "g2p-report.json"),
            (report_path, "training-report.json"),
            (licenses_path, "LICENSES.txt"),
        ):
            archive.write(source, archive_name)
    print(json.dumps(report, ensure_ascii=False, indent=2))
    print(f"Artifact: {artifact} ({artifact.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
