#!/usr/bin/env python3
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1] / "training-data/wade-grammar"
rules = [json.loads(line) for line in (root / "rules.jsonl").read_text(encoding="utf-8").splitlines()]
instructions = [json.loads(line) for line in (root / "instruction-candidates.jsonl").read_text(encoding="utf-8").splitlines()]
report = json.loads((root / "extraction-report.json").read_text(encoding="utf-8"))
assert len(rules) == report["numberedRuleSlots"] == 319
assert len(instructions) == report["numberedRulesExtracted"]
assert all(rule["source"]["originalPublicationYear"] == 1888 for rule in rules)
assert all(rule["text"] for rule in rules if rule["reviewStatus"] != "ocr-missing-needs-manual-transcription")
assert all(rule["trainingEligible"] is False for rule in rules)
assert all(row["trainingEligible"] is False for row in instructions)
assert any(rule["chapter"]["name"] == "Syntax" for rule in rules if rule.get("chapter"))
assert [rule["ruleNumber"] for rule in rules] == list(range(1, 320))
print(json.dumps({"result": "passed", "ruleSlots": len(rules), "extracted": len(instructions), "pages": report["pdfPages"]}))
