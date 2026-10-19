#!/usr/bin/env python3
"""Import new Kashmiri Wikipedia lines from PALI for monolingual analysis."""
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / "source-datasets/pali/Kashmiri_ks-wiki-20221201.txt"
EXISTING = ROOT / "assets/kashmiri-public-corpus.json"
OUTPUT = ROOT / "training-data/pali-wiki-monolingual.jsonl"
REVISION = "79a3ee702c699452574e6a24c4835a3729edd2d1"
SOURCE_URL = f"https://github.com/sinaahmadi/PersoArabicLID/blob/{REVISION}/corpora/Kashmiri_ks-wiki-20221201.txt"
KASHMIRI_MARKS = set("ؠٲۆۄٕۍۭٚ")


def clean(text):
    return " ".join(unicodedata.normalize("NFC", text).split())


def acceptable(text):
    letters = [char for char in text if char.isalpha()]
    arabic = sum("\u0600" <= char <= "\u06ff" for char in letters)
    return (30 <= len(text) <= 700 and 5 <= len(text.split()) <= 130
            and arabic >= .75 * max(1, len(letters))
            and any(char in KASHMIRI_MARKS for char in text)
            and not re.search(r"(?:https?://|==|\{\{|<[^>]+>|%[0-9A-Fa-f]{2})", text))


def build(input_path=INPUT, existing_path=EXISTING, output_path=OUTPUT):
    old = {clean(row["text"]) for row in json.loads(existing_path.read_text(encoding="utf-8"))["records"]}
    seen = set(old)
    rows = []
    for raw in input_path.read_text(encoding="utf-8-sig").splitlines():
        text = clean(raw)
        if acceptable(text) and text not in seen:
            seen.add(text)
            rows.append({"text": text, "dataset": "PALI Kashmiri Wikipedia 2022",
                         "source": SOURCE_URL, "license": "CC BY-SA 4.0",
                         "status": "monolingual-unreviewed", "trainingUse": "language-pattern-analysis-only"})
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text("".join(json.dumps(row, ensure_ascii=False) + "\n" for row in rows), encoding="utf-8")
    return {"newMonolingualLines": len(rows), "inputLines": len(input_path.read_text(encoding="utf-8-sig").splitlines())}


if __name__ == "__main__":
    print(json.dumps(build()))
