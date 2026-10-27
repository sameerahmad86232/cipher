#!/usr/bin/env python3
"""Build the compact offline dictionary asset used by Koshur Noor.

The server lexicon is the canonical generated lookup. This export deliberately
contains lexical entries rather than sentence-training pairs. Dictionary glosses
support terminology lookup and review, but do not become neural training data.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "server-data" / "lexicon.json"
OUTPUT = ROOT / "apps" / "koshur_noor" / "assets" / "data" / "dictionary.json"


def build():
    source = json.loads(SOURCE.read_text(encoding="utf-8"))
    entries = source.get("entries") or []
    payload = {
        "version": 1,
        "sourceRecordLabel": "58,000+ source records",
        "entryCount": len(entries),
        "purpose": "Offline terminology lookup and translation review context",
        "neuralTrainingEligible": False,
        "trainingNote": (
            "Dictionary glosses are lexical evidence, not aligned sentences. "
            "Use for retrieval and review; promote only human-approved, "
            "source-cleared sentence pairs into training datasets."
        ),
        "entries": entries,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        json.dumps(payload, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    return {"entries": len(entries), "output": str(OUTPUT.relative_to(ROOT))}


if __name__ == "__main__":
    print(json.dumps(build(), indent=2))
