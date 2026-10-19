#!/usr/bin/env python3
"""Prepare locally obtained, permission-checked English–Kashmiri corpora.

No gated file is fetched or redistributed by this script. FLORES is evaluation
only. The synthetic corpus has unspecified licensing and is excluded.
"""
import argparse
import csv
import hashlib
import json
from pathlib import Path


def normalize(value):
    return " ".join(str(value).split())


def valid(en, ks):
    return (2 <= len(en.split()) <= 180 and 2 <= len(ks.split()) <= 180
            and any("\u0600" <= char <= "\u06ff" for char in ks))


def add(rows, en, ks, source, tier):
    original_ks = str(ks)
    en, ks = normalize(en), normalize(ks)
    if valid(en, ks):
        rows.append({"english": en, "kashmiri": ks, "kashmiriOriginal": original_ks, "source": source, "tier": tier})


def paired_lines(rows, english_path, kashmiri_path, source, tier):
    english = english_path.read_text(encoding="utf-8-sig").splitlines()
    kashmiri = kashmiri_path.read_text(encoding="utf-8-sig").splitlines()
    if len(english) != len(kashmiri):
        raise ValueError(f"Misaligned files for {source}: {len(english)} != {len(kashmiri)}")
    for en, ks in zip(english, kashmiri):
        add(rows, en, ks, source, tier)


def read_bpcc(rows, path):
    with path.open(encoding="utf-8-sig", newline="") as handle:
        for row in csv.DictReader(handle, delimiter="\t"):
            if row.get("src_lang") == "eng_Latn" and row.get("tgt_lang") == "kas_Arab":
                add(rows, row.get("src", ""), row.get("tgt", ""), "bpcc", "silver")


def read_flores(rows, path, source):
    # A local TSV export with precisely these two headers is required.
    with path.open(encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle, delimiter="\t")
        if not {"sentence_eng_Latn", "sentence_kas_Arab"}.issubset(reader.fieldnames or []):
            raise ValueError(f"Expected FLORES bilingual TSV columns in {path}")
        for row in reader:
            add(rows, row["sentence_eng_Latn"], row["sentence_kas_Arab"], source, "eval")


def split_key(en):
    return int(hashlib.sha256(en.casefold().encode()).hexdigest(), 16) % 100


def prepare(args):
    train, evaluation = [], []
    if args.bpcc:
        read_bpcc(train, args.bpcc)
    if args.qamar30:
        paired_lines(train, args.qamar30 / "English.txt", args.qamar30 / "Kashmiri.txt", "qamar30", "noncommercial")
    if args.qamar270:
        paired_lines(train, args.qamar270 / "English.txt", args.qamar270 / "Kashmiri.txt", "qamar270", "noncommercial")
    if (args.qamar30 or args.qamar270) and not args.allow_noncommercial:
        raise ValueError("Qamar datasets are CC BY-NC-SA 4.0. Pass --allow-noncommercial only for a noncommercial workflow.")
    if args.flores:
        read_flores(evaluation, args.flores, "flores200")
    if args.flores_plus:
        read_flores(evaluation, args.flores_plus, "flores-plus")

    # Gold from the project is train-only here. Existing held-out native tests
    # must remain separately held out by the training/evaluation workflow.
    if args.approved:
        for line in args.approved.read_text(encoding="utf-8").splitlines():
            if line.strip():
                row = json.loads(line)
                add(train, row["english"], row["kashmiri"], "owner-approved", "gold")

    normalization_report = None
    if getattr(args, "normalize_kashmiri", False):
        from kashmiri_normalization import normalize_kashmiri, normalizer_metadata
        normalization_report = {"normalizer": normalizer_metadata(), "records": 0,
                                "changed": 0, "warnings": 0, "goldTargetsPreserved": True}
        for row in train + evaluation:
            original = row["kashmiriOriginal"]
            result = normalize_kashmiri(original)
            row["kashmiriOriginal"] = original
            row["kashmiriNormalized"] = result["normalized"]
            row["normalizationWarnings"] = result["warnings"]
            # Keep owner-reviewed targets and evaluation references unchanged.
            if row["tier"] not in ("gold", "eval"):
                row["kashmiri"] = result["normalized"]
            else:
                row["kashmiri"] = original
            normalization_report["records"] += 1
            normalization_report["changed"] += int(result["changed"])
            normalization_report["warnings"] += int(bool(result["warnings"]))
        # When normalization reveals a duplicate, keep the reviewed target.
        train.sort(key=lambda row: row["tier"] != "gold")

    eval_english = {row["english"].casefold() for row in evaluation}
    seen = set()
    unique_train = []
    for row in train:
        key = (row["english"].casefold(), normalize(row.get("kashmiriNormalized", row["kashmiri"])))
        if key not in seen and row["english"].casefold() not in eval_english:
            seen.add(key)
            unique_train.append(row)
    # Deterministic source-level holdout prevents English paraphrase targets
    # with identical source strings from leaking between train and validation.
    heldout_sources = {row["english"].casefold() for row in unique_train
                       if split_key(row["english"]) < 5 and row["tier"] != "gold"}
    validation = [row for row in unique_train if row["english"].casefold() in heldout_sources]
    training = [row for row in unique_train if row["english"].casefold() not in heldout_sources]
    args.output.mkdir(parents=True, exist_ok=True)
    for name, rows in (("train.jsonl", training), ("validation.jsonl", validation), ("flores-evaluation.jsonl", evaluation)):
        (args.output / name).write_text("".join(json.dumps(row, ensure_ascii=False) + "\n" for row in rows), encoding="utf-8")
    report = {"train": len(training), "validation": len(validation), "floresEvaluation": len(evaluation),
              "sources": {source: sum(row["source"] == source for row in unique_train)
                          for source in sorted({row["source"] for row in unique_train})},
              "note": "No training occurred. Synthetic 1M excluded: license unspecified. FLORES is evaluation-only."}
    if normalization_report is not None:
        report["normalization"] = normalization_report
    (args.output / "manifest.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    return report


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--bpcc", type=Path, help="Local, access-approved kas_Arab.tsv")
    parser.add_argument("--qamar30", type=Path, help="Directory with English.txt and Kashmiri.txt")
    parser.add_argument("--qamar270", type=Path, help="Directory with English.txt and Kashmiri.txt")
    parser.add_argument("--allow-noncommercial", action="store_true")
    parser.add_argument("--normalize-kashmiri", action="store_true", help="Use the pinned normalizer; retain original text and gold/evaluation targets")
    parser.add_argument("--flores", type=Path, help="Local kas_Arab–eng_Latn TSV")
    parser.add_argument("--flores-plus", type=Path, help="Local kas_Arab–eng_Latn TSV")
    parser.add_argument("--approved", type=Path, default=Path(__file__).resolve().parents[1] / "training-data/approved-parallel.jsonl")
    parser.add_argument("--output", type=Path, default=Path(__file__).resolve().parents[1] / "training-data/prepared-parallel")
    print(json.dumps(prepare(parser.parse_args()), indent=2))
