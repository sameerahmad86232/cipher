#!/usr/bin/env python3
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
profile = json.loads((root / "training-data" / "hadith-language-profile.json").read_text(encoding="utf-8"))
counts = profile["generatedFrom"]
assert counts["corpusSentences"] >= 20000
assert counts["ownerReviewedCorrections"] >= 4
assert counts["ownerReviewedTerms"] >= 20
assert counts["approvedHadiths"] >= 4
assert len(profile["frequencies"]["bigrams"]) >= 100
assert len(profile["approvedTerminology"]) >= 20
assert all(row["sourceUrl"].startswith("https://") for row in profile["approvedHadithStyleExamples"])
assert "honorifics" in profile["constructionEvidence"]
assert any("draft" in rule.lower() for rule in profile["reviewChecklist"])
print(json.dumps({"result": "passed", **counts}))
