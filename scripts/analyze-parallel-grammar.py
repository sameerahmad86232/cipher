#!/usr/bin/env python3
"""Extract attested Kashmiri constructions; no model training or auto-correction."""
import collections
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCES = {
    "ownerApproved": ROOT / "training-data/approved-parallel.jsonl",
    "opusSilver": ROOT / "training-data/opus-en-ks/train-silver.jsonl",
}
PATTERNS = {
    "firstPersonPresent": ("بہٕ", "چھُس"),
    "firstPersonPastAgent": ("مےٚ",),
    "pluralPresent": ("اَسۍ", "چھِ"),
    "thirdPersonPresent": ("سُہ", "چھُ"),
    "negation": ("نہٕ", "نٕہ", "چھُنہٕ", "چُھنہٕ"),
    "locativePostposition": ("منٛز", "مَنٛز", "پؠٹھ"),
    "genitive": ("ہُنٛد", "ہِنٛز", "سُنٛد", "سٕنٛز"),
    "relative": ("یُس", "یۄس", "یِم"),
}


def words(text):
    text = unicodedata.normalize("NFC", text)
    return re.findall(r"[\u0600-\u06ff]+", text)


def report():
    result = {"method": "Exact token/co-occurrence counts; descriptive evidence, not validated grammatical rules or model training.", "sources": {}}
    for name, path in SOURCES.items():
        counts = collections.Counter()
        examples = {}
        records = 0
        tokens = collections.Counter()
        for line in path.read_text(encoding="utf-8").splitlines():
            if not line.strip():
                continue
            row = json.loads(line)
            english, kashmiri = row["english"], row["kashmiri"]
            sequence = words(kashmiri)
            present = set(sequence)
            records += 1
            tokens.update(sequence)
            for label, forms in PATTERNS.items():
                if (all(form in present for form in forms)
                        if label in {"firstPersonPresent", "pluralPresent", "thirdPersonPresent"}
                        else any(form in present for form in forms)):
                    counts[label] += 1
                    examples.setdefault(label, {"english": english, "kashmiri": kashmiri})
        result["sources"][name] = {"pairs": records, "patternCounts": dict(counts),
                                    "examples": examples, "topTokens": tokens.most_common(20)}
    return result


if __name__ == "__main__":
    output = ROOT / "training-data/parallel-grammar-evidence.json"
    output.write_text(json.dumps(report(), ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(output)
