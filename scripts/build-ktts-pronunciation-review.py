#!/usr/bin/env python3
"""Build a frequency-ranked KTTS pronunciation review sheet.

Attested romanizations are evidence, not automatically approved gold. The
output deliberately leaves a reviewer column blank for native-speaker edits.
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill
from openpyxl.worksheet.datavalidation import DataValidation

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from kashmiri_speech_frontend import ascii_g2p, normalize_for_tts  # noqa: E402

ARABIC_WORD = re.compile(r"[\u0600-\u06ff]+(?:[\u064b-\u065f\u0670\u06d6-\u06ed]+)?")
ROMAN_WORD = re.compile(r"[^\W_]+(?:[\u0300-\u036f˔͑͞ˌᵊʲʰʃʧʦʈɖɨəɔñżġħ]+)?", re.UNICODE)


def words(text: str) -> list[str]:
    return ARABIC_WORD.findall(normalize_for_tts(text))


def roman_words(text: str) -> list[str]:
    return ROMAN_WORD.findall(text)


def load_evidence(path: Path) -> dict[str, list[dict]]:
    evidence: dict[str, list[dict]] = defaultdict(list)
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        row = json.loads(line)
        source_words = words(row.get("kashmiri", ""))
        roman = roman_words(row.get("transliteration", ""))
        if len(source_words) != len(roman):
            continue
        review = row.get("humanReview", "pending")
        for source_word, pronunciation in zip(source_words, roman):
            evidence[source_word].append({
                "pronunciation": pronunciation,
                "review": review,
                "id": row.get("id", ""),
                "source": row.get("source", {}).get("url", ""),
            })
    return evidence


def choose_evidence(items: list[dict]) -> dict | None:
    if not items:
        return None
    ranked = sorted(items, key=lambda item: ("approved" not in item["review"], item["pronunciation"]))
    return ranked[0]


def build(args: argparse.Namespace) -> dict:
    counts: Counter[str] = Counter()
    contexts: dict[str, list[str]] = defaultdict(list)
    for transcript in args.transcripts:
        for line in transcript.read_text(encoding="utf-8").splitlines():
            if not line.strip():
                continue
            text = line.split("|", 2)[-1]
            for word in words(text):
                counts[word] += 1
                if len(contexts[word]) < 2 and text not in contexts[word]:
                    contexts[word].append(text)

    evidence = load_evidence(args.evidence)
    rows = []
    for word, frequency in counts.most_common(args.limit):
        attested = choose_evidence(evidence.get(word, []))
        rows.append({
            "rank": len(rows) + 1,
            "frequency": frequency,
            "kashmiri_word": word,
            "old_xtts_input": ascii_g2p(word),
            "attested_pronunciation": attested["pronunciation"] if attested else "",
            "evidence_status": f"positional-candidate:{attested['review']}" if attested else "no-attested-pronunciation",
            "evidence_id": attested["id"] if attested else "",
            "evidence_url": attested["source"] if attested else "",
            "example_1": contexts[word][0] if contexts[word] else "",
            "example_2": contexts[word][1] if len(contexts[word]) > 1 else "",
            "reviewed_pronunciation": "",
            "reviewer_status": "pending",
            "reviewer_note": "",
        })

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)
    workbook_path = args.output.with_suffix(".xlsx")
    workbook = Workbook()
    sheet = workbook.active
    sheet.title = "Pronunciation Review"
    headers = list(rows[0])
    sheet.append(headers)
    for row in rows:
        sheet.append([row[header] for header in headers])
    sheet.freeze_panes = "A2"
    sheet.auto_filter.ref = sheet.dimensions
    sheet.sheet_view.rightToLeft = True
    for cell in sheet[1]:
        cell.font = Font(bold=True, color="FFFFFF")
        cell.fill = PatternFill("solid", fgColor="234F3D")
    widths = {"A": 8, "B": 11, "C": 22, "D": 24, "E": 26, "F": 30, "G": 18, "H": 45,
              "I": 55, "J": 55, "K": 28, "L": 18, "M": 35}
    for column, width in widths.items():
        sheet.column_dimensions[column].width = width
    status_validation = DataValidation(type="list", formula1='"pending,approved,rejected"', allow_blank=False)
    sheet.add_data_validation(status_validation)
    status_validation.add(f"L2:L{len(rows) + 1}")
    instructions = workbook.create_sheet("Instructions")
    instructions.sheet_view.rightToLeft = True
    instructions.append(["KTTS pronunciation review"])
    instructions.append(["Fill reviewed_pronunciation and set reviewer_status to approved only after listening/native review."])
    instructions.append(["old_xtts_input is the rejected v1 input. Do not approve it merely because it is present."])
    instructions.append(["attested_pronunciation is a positional candidate from a sentence and may be misaligned."])
    instructions.column_dimensions["A"].width = 120
    workbook.save(workbook_path)
    report = {
        "transcriptRows": sum(1 for path in args.transcripts for line in path.read_text(encoding="utf-8").splitlines() if line.strip()),
        "uniqueWords": len(counts),
        "reviewRows": len(rows),
        "withAttestedEvidence": sum(bool(row["attested_pronunciation"]) for row in rows),
        "fromApprovedSentences": sum("approved" in row["evidence_status"] for row in rows),
        "policy": "Sentence transliterations are only positional candidates, even when the sentence was approved. Only reviewer_status=approved may become a word-level pronunciation override.",
        "output": str(args.output),
        "workbook": str(workbook_path),
    }
    args.output.with_suffix(".report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return report


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("transcripts", nargs="+", type=Path)
    parser.add_argument("--evidence", type=Path, default=ROOT / "training-data" / "combined-parallel.jsonl")
    parser.add_argument("--output", type=Path, default=ROOT / "review-output" / "KTTS-Pronunciation-Review.csv")
    parser.add_argument("--limit", type=int, default=300)
    print(json.dumps(build(parser.parse_args()), ensure_ascii=False, indent=2))
