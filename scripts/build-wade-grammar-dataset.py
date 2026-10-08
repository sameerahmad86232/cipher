#!/usr/bin/env python3
"""Extract Wade's 1888 numbered grammar sections into traceable data."""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LAYOUT = ROOT / "source-ocr/wade-grammar/wade-1888-layout.txt"
RAW = ROOT / "source-ocr/wade-grammar/wade-1888-raw.txt"
OUT = ROOT / "training-data/wade-grammar"

pages = LAYOUT.read_text(encoding="utf-8", errors="replace").split("\f")
if pages and not pages[-1].strip():
    pages.pop()
chapter_names = {
    "I": "Letters", "II": "Nouns", "III": "Adjectives", "IV": "Pronouns",
    "V": "Verbs", "VI": "Indeclinable Words", "VII": "Numbers",
    "VIII": "Derivation of Words", "IX": "Syntax", "X": "Example Sentences",
}
chapter_ranges = {
    "I": (1, 6), "II": (7, 36), "III": (37, 44), "IV": (45, 80),
    "V": (81, 125), "VI": (126, 143), "VII": (144, 164),
    "VIII": (165, 177), "IX": (178, 317), "X": (318, 319),
}

rules = []
current_chapter = None
current = None
# Headings are uppercase in the scan. Case sensitivity matters because prose
# references such as "chapter ix" otherwise change the parser's state.
chapter_re = re.compile(r"^\s*CHA(?:P|F)TER\s+([IVXYH]+)\.?\s*$")
rule_re = re.compile(r"^\s*(\d{1,3})\.\s+(.*\S)\s*$")

def finish():
    global current
    if not current:
        return
    text = re.sub(r"\s+", " ", " ".join(current.pop("lines"))).strip()
    text = text.replace("¬ ", "").replace(" - ", "-")
    current["text"] = text
    current["characterCount"] = len(text)
    current["trainingEligible"] = False
    current["reviewStatus"] = "historical-source-extract-needs-modern-validation"
    current["warnings"] = [
        "Historical 1888 description; modern usage may differ.",
        "OCR may confuse diacritics, transliteration symbols, tables, and non-Latin scripts.",
        "Do not use as an English–Perso-Arabic translation pair without expert alignment.",
    ]
    rules.append(current)
    current = None

for page_number, page in enumerate(pages, 1):
    for line in page.splitlines():
        chapter = chapter_re.match(line)
        if chapter:
            finish()
            roman = chapter.group(1).upper()
            roman = {"HI": "III", "Y": "V"}.get(roman, roman)
            current_chapter = {"number": roman, "name": chapter_names.get(roman, "Unknown")}
            continue
        match = rule_re.match(line)
        if match:
            finish()
            current = {
                "id": f"wade-1888-rule-{int(match.group(1)):03d}",
                "ruleNumber": int(match.group(1)),
                "physicalPage": page_number,
                "chapter": current_chapter,
                "lines": [match.group(2)],
                "source": {
                    "title": "A Grammar of the Kashmiri Language as Spoken in the Valley of Kashmir",
                    "author": "T. R. Wade",
                    "originalPublicationYear": 1888,
                    "attachedEdition": "Asian Educational Services reprint, 1995",
                    "pageReferenceType": "physical PDF page",
                },
            }
        elif current and line.strip() and not re.match(r"^\s*\d+\s*$", line):
            current["lines"].append(line.strip())
finish()

# Keep a number only when it occurs in its expected chapter. This prevents
# numbered paradigms and example lists from masquerading as grammar sections.
expected_chapter = {
    number: roman
    for roman, (first, last) in chapter_ranges.items()
    for number in range(first, last + 1)
}
deduped = {}
for rule in rules:
    number = rule["ruleNumber"]
    chapter_number = (rule.get("chapter") or {}).get("number")
    if chapter_number == expected_chapter.get(number) and number not in deduped:
        deduped[number] = rule

missing = sorted(set(range(1, 320)) - set(deduped))
for number in missing:
    roman = expected_chapter[number]
    deduped[number] = {
        "id": f"wade-1888-rule-{number:03d}",
        "ruleNumber": number,
        "physicalPage": None,
        "chapter": {"number": roman, "name": chapter_names[roman]},
        "text": None,
        "characterCount": 0,
        "trainingEligible": False,
        "reviewStatus": "ocr-missing-needs-manual-transcription",
        "warnings": [
            "The numbered section was not reliably detected in the embedded OCR.",
            "Transcribe and validate it against the page image before any use.",
        ],
        "source": {
            "title": "A Grammar of the Kashmiri Language as Spoken in the Valley of Kashmir",
            "author": "T. R. Wade",
            "originalPublicationYear": 1888,
            "attachedEdition": "Asian Educational Services reprint, 1995",
            "pageReferenceType": "physical PDF page",
        },
    }
rules = [deduped[key] for key in sorted(deduped)]

instructions = [{
    "id": rule["id"],
    "instruction": f"According to Wade's 1888 historical grammar, summarize numbered section {rule['ruleNumber']}.",
    "response": rule["text"],
    "sourceRuleId": rule["id"],
    "trainingEligible": False,
    "reviewStatus": rule["reviewStatus"],
} for rule in rules if rule["text"]]

chapters = []
for roman, name in chapter_names.items():
    selected = [r for r in rules if r.get("chapter", {}).get("number") == roman]
    if selected:
        chapters.append({
            "number": roman,
            "name": name,
            "numberedSectionCount": len(selected),
            "sectionsWithExtractedText": sum(bool(r["text"]) for r in selected),
            "firstRule": min(r["ruleNumber"] for r in selected),
            "lastRule": max(r["ruleNumber"] for r in selected),
        })

page_characters = [len(re.sub(r"\s+", "", page)) for page in pages]
report = {
    "title": "Wade grammar extraction report",
    "pdfPages": len(pages),
    "layoutTextCharacters": len(LAYOUT.read_text(encoding="utf-8", errors="replace")),
    "rawTextCharacters": len(RAW.read_text(encoding="utf-8", errors="replace")),
    "numberedRuleSlots": len(rules),
    "numberedRulesExtracted": sum(bool(r["text"]) for r in rules),
    "ruleNumberMinimum": min((r["ruleNumber"] for r in rules), default=None),
    "ruleNumberMaximum": max((r["ruleNumber"] for r in rules), default=None),
    "missingRuleNumbers": missing,
    "pagesWithUnder40NonWhitespaceCharacters": [i + 1 for i, count in enumerate(page_characters) if count < 40],
    "scriptPolicy": "Historical Roman, Devanagari and Sharada forms are retained as evidence, not normalized into modern Perso-Arabic targets.",
    "trainingPolicy": "All automatically extracted records are excluded from gold training until a modern Kashmiri reviewer validates the rule and its examples.",
    "rightsNote": "The original 1888 work is public domain by age. The attached 1995 reprint PDF is not redistributed.",
}

OUT.mkdir(parents=True, exist_ok=True)
(OUT / "rules.jsonl").write_text("".join(json.dumps(r, ensure_ascii=False) + "\n" for r in rules), encoding="utf-8")
(OUT / "instruction-candidates.jsonl").write_text("".join(json.dumps(r, ensure_ascii=False) + "\n" for r in instructions), encoding="utf-8")
(OUT / "chapters.json").write_text(json.dumps(chapters, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
(OUT / "extraction-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps(report))
