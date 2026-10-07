#!/usr/bin/env python3
"""Build the compact browser index used before neural translation."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "training-data" / "combined-parallel.jsonl"
WEB_ROOT = ROOT / "dist" if (ROOT / "dist" / "assets").is_dir() else ROOT
OUTPUT = WEB_ROOT / "assets" / "hybrid-translation-index.json"


def main():
    pairs = []
    seen = set()
    for line in SOURCE.read_text(encoding="utf-8").splitlines():
        row = json.loads(line)
        key = (row["english"].casefold().strip(), row["kashmiri"].strip())
        if key in seen:
            continue
        seen.add(key)
        pairs.append({
            "english": row["english"],
            "kashmiri": row["kashmiri"],
            "transliteration": row.get("transliteration", ""),
            "headword": row.get("headword", ""),
            "partOfSpeech": row.get("partOfSpeech", ""),
            "humanReview": row.get("humanReview", "pending"),
            "status": row.get("status", "source-attested"),
            "source": row.get("source", {}),
        })

    pairs.sort(key=lambda row: (
        row["humanReview"] != "approved-by-project-owner",
        row["english"].casefold(),
    ))
    payload = {
        "version": 1,
        "policy": "Project-owner-approved pairs rank above source-attested pairs. Fuzzy matches are suggestions, not translations.",
        "counts": {
            "pairs": len(pairs),
            "approved": sum(row["humanReview"] == "approved-by-project-owner" for row in pairs),
            "sourceAttested": sum(row["humanReview"] != "approved-by-project-owner" for row in pairs),
        },
        "pairs": pairs,
    }
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(json.dumps(payload["counts"]))


if __name__ == "__main__":
    main()
