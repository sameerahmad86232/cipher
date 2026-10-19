#!/usr/bin/env python3
"""Make private, source-labeled translation workbooks from a local Nawab CSV."""

import argparse
import csv
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill

HEADERS = (
    "Row ID",
    "Kashmiri sentence",
    "Kashmiri continuation",
    "English translation — fill this",
    "Source URL",
    "Original word count",
    "Duplicate of row",
    "Translator notes",
)


def read_rows(path: Path):
    with path.open(encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        if not {"sentence", "source", "word_count"}.issubset(reader.fieldnames or []):
            raise ValueError("Expected sentence, source, word_count CSV columns")
        first_seen = {}
        for number, row in enumerate(reader, start=1):
            sentence = row["sentence"].strip()
            if not sentence:
                continue
            duplicate_of = first_seen.setdefault(sentence, number)
            yield (
                number,
                sentence[:32767],
                sentence[32767:],
                "",
                row["source"],
                row["word_count"],
                "" if duplicate_of == number else duplicate_of,
                "",
            )


def make_workbook(rows, output: Path, source_revision: str):
    workbook = Workbook(write_only=False)
    notes = workbook.active
    notes.title = "Read me"
    for text in (
        "Fill only the English translation column on the Translate sheet; do not change Row ID or the Kashmiri text.",
        "The starter workbook is a subset. The full workbook contains every source CSV row, including duplicates.",
        "A second Kashmiri cell is used only if a source sentence exceeds Excel's 32,767-character cell limit.",
        "Source URL and duplicate-of-row columns preserve provenance and prevent duplicate translation work.",
        "This is a private review worksheet, not an approved or rights-cleared training dataset.",
        "The aggregate dataset card says Apache-2.0, but upstream source rights differ and must be checked before model training or public redistribution.",
        f"Source: nawabhussain/Kashmiri-Language-Corpus at revision {source_revision}",
    ):
        notes.append([text])
    notes.column_dimensions["A"].width = 115

    sheet = workbook.create_sheet("Translate")
    sheet.append(HEADERS)
    sheet.freeze_panes = "D2"
    sheet.auto_filter.ref = f"A1:H{len(rows) + 1}"
    for cell in sheet[1]:
        cell.font = Font(bold=True, color="FFFFFF")
        cell.fill = PatternFill("solid", fgColor="173B35")
    for column, width in {"A": 12, "B": 65, "C": 35, "D": 65, "E": 58, "F": 20, "G": 20, "H": 35}.items():
        sheet.column_dimensions[column].width = width
    for row_index, row in enumerate(rows, start=2):
        sheet.append(row)
        for column in (2, 3):
            cell = sheet.cell(row_index, column)
            cell.data_type = "s"  # Never interpret source text as an Excel formula.
            cell.alignment = Alignment(horizontal="right", vertical="top", wrap_text=True)
    output.parent.mkdir(parents=True, exist_ok=True)
    workbook.save(output)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("csv", type=Path, help="Local copy of the Nawab CSV")
    parser.add_argument("output_dir", type=Path)
    parser.add_argument("--starter-rows", type=int, default=500)
    args = parser.parse_args()
    all_rows = list(read_rows(args.csv))
    if not all_rows:
        raise ValueError("No sentences found")
    revision = "92c2609fcdccc848d754098c48bd67444a8f3a14"
    full = args.output_dir / "kashmiri-english-translation-full.xlsx"
    starter = args.output_dir / "kashmiri-english-translation-starter-500.xlsx"
    make_workbook(all_rows, full, revision)
    unique_rows = [row for row in all_rows if not row[6]][:args.starter_rows]
    make_workbook(unique_rows, starter, revision)
    print(f"Full: {len(all_rows)} rows → {full}")
    print(f"Starter: {len(unique_rows)} unique rows → {starter}")
