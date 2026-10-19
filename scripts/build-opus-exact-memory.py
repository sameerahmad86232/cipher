#!/usr/bin/env python3
"""Publish deduplicated OPUS silver pairs for exact-match browser lookup only."""
import json
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "training-data/opus-en-ks/train-silver.jsonl"
OUTPUT = ROOT / "public/assets/opus-exact-memory.json"


def key(text):
    folded = unicodedata.normalize("NFC", text).casefold()
    return " ".join("".join(char if unicodedata.category(char)[0] in "LNM" else " " for char in folded).split())


def build(source=SOURCE, output=OUTPUT):
    en_to_ks, ks_to_en = {}, {}
    for line in source.read_text(encoding="utf-8").splitlines():
        row = json.loads(line)
        en, ks = row["english"].strip(), row["kashmiri"].strip()
        source_name = row.get("source")
        license_name = row.get("license")
        if source_name not in {"translatewiki", "wikimedia"} or not license_name:
            continue
        # Ambiguous source sentences are discarded rather than choosing an
        # arbitrary translation. Reviewed project matches are checked first.
        for target, lookup, result in ((en_to_ks, key(en), ks), (ks_to_en, key(ks), en)):
            if lookup and lookup not in target:
                target[lookup] = {"text": result, "source": source_name, "license": license_name}
            elif lookup and target[lookup] is not None and target[lookup]["text"] != result:
                target[lookup] = None
    unique_en = {k: v for k, v in en_to_ks.items() if v}
    unique_ks = {k: v for k, v in ks_to_en.items() if v}
    pairs = []
    for line in source.read_text(encoding="utf-8").splitlines():
        row = json.loads(line)
        en, ks = row["english"].strip(), row["kashmiri"].strip()
        if key(en) in unique_en and key(ks) in unique_ks:
            pairs.append([en, ks, row["source"], row["license"]])
    payload = {"status": "silver-draft-needs-native-review", "pairs": pairs}
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    return {"enToKs": len(unique_en), "ksToEn": len(unique_ks), "pairs": len(pairs)}


if __name__ == "__main__":
    print(json.dumps(build()))
