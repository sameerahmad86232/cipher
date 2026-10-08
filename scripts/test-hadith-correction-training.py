#!/usr/bin/env python3
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1] / "training-data/hadith-corrections"
manifest = json.loads((root / "manifest.json").read_text(encoding="utf-8"))
passages = [json.loads(line) for line in (root / "approved-passages.jsonl").read_text(encoding="utf-8").splitlines()]
preferences = [json.loads(line) for line in (root / "preference-pairs.jsonl").read_text(encoding="utf-8").splitlines()]
candidates = [json.loads(line) for line in (root / "review-candidates.jsonl").read_text(encoding="utf-8").splitlines()]
patterns = json.loads((root / "grammar-patterns.json").read_text(encoding="utf-8"))

assert manifest["approvedHadiths"] == 15
assert len(passages) == 15 and all(row["weight"] == 8 for row in passages)
assert len(preferences) == 18 and all(row["chosen"] != row["rejected"] for row in preferences)
assert len(patterns) == 12
assert candidates and all(row["status"] == "pending-human-review" for row in candidates)
assert manifest["trainingPolicy"]["pendingCandidatesUsedForTraining"] is False
print(json.dumps({"result": "passed", "passages": len(passages), "preferences": len(preferences), "patterns": len(patterns)}))
