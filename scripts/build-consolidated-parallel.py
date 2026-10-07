"""Build a deduplicated parallel corpus from source-attested and user-approved data."""
import hashlib
import json
import pathlib
import unicodedata

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / "training-data"
BASE = OUT / "reviewed-parallel.jsonl"
APPROVED_FILES = [
    OUT / "user-approved-grammar-pairs.json",
    OUT / "user-approved-review-batch-01.json",
    OUT / "user-approved-review-batch-03.json",
    OUT / "user-approved-review-batch-05.json",
    OUT / "user-reviewed-batch-02.json",
    OUT / "user-reviewed-corrections.json",
]


def clean(value):
    return " ".join(unicodedata.normalize("NFC", str(value or "")).split())


def key(row):
    return clean(row["english"]).casefold() + "\0" + clean(row["kashmiri"])


rows = []
seen = set()
approved_keys = set()

for line in BASE.read_text().splitlines():
    if not line.strip():
        continue
    row = json.loads(line)
    pair_key = key(row)
    if pair_key not in seen:
        seen.add(pair_key)
        rows.append(row)

for path in APPROVED_FILES:
    data = json.loads(path.read_text())
    candidates = data.get("records", []) + data.get("approved", []) + data.get("corrections", [])
    if path.name == "user-reviewed-batch-02.json":
        candidates += data.get("correctionsPendingScriptReview", [])
    for candidate in candidates:
        english = clean(candidate.get("english") or candidate.get("englishDraft") or candidate.get("englishOriginal"))
        kashmiri = clean(candidate.get("kashmiri") or candidate.get("kashmiriDraft"))
        if not english or not kashmiri:
            continue
        pair_key = english.casefold() + "\0" + kashmiri
        approved_keys.add(pair_key)
        if pair_key in seen:
            for row in rows:
                if key(row) == pair_key:
                    row["humanReview"] = "approved-by-project-owner"
                    row["status"] = "user-reviewed"
            continue
        seen.add(pair_key)
        rows.append({
            "id": "owner-" + hashlib.sha256(pair_key.encode()).hexdigest()[:12],
            "english": english,
            "kashmiri": kashmiri,
            "transliteration": candidate.get("romanized_kashmiri", ""),
            "source": {
                "name": "Koshur Lughat project-owner language review",
                "url": "https://github.com/sameerahmad86232/cipher/tree/main/training-data",
                "license": "Project-owner contribution; public reuse approved",
            },
            "status": "user-reviewed",
            "humanReview": "approved-by-project-owner",
            "reviewNote": "Native-speaker approval recorded in the source review file.",
            "reviewSourceFile": path.name,
        })

combined_path = OUT / "combined-parallel.jsonl"
approved_path = OUT / "approved-parallel.jsonl"
combined_path.write_text("\n".join(json.dumps(r, ensure_ascii=False) for r in rows) + "\n")
approved_rows = [r for r in rows if r.get("humanReview") == "approved-by-project-owner" or key(r) in approved_keys]
approved_path.write_text("\n".join(json.dumps(r, ensure_ascii=False) for r in approved_rows) + "\n")
report = {
    "combinedPairs": len(rows),
    "ownerApprovedPairs": len(approved_rows),
    "pendingPairs": len(rows) - len(approved_rows),
    "inputs": [str(BASE.relative_to(ROOT))] + [str(p.relative_to(ROOT)) for p in APPROVED_FILES],
    "excluded": [
        "raw OCR and monolingual books",
        "dictionary glosses without sentence alignment",
        "user-reviewed batch 08 entry 5, later explicitly skipped",
        "held-out grammar diagnostics",
    ],
    "policy": "Only aligned English-Kashmiri pairs enter this corpus. Approval status is preserved per row.",
}
(OUT / "combined-parallel-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
print(json.dumps(report, ensure_ascii=False))
