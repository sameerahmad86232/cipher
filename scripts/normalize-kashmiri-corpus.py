#!/usr/bin/env python3
"""Add normalized Kashmiri copies to JSONL records without changing source fields."""
import argparse
import json
from pathlib import Path
import tempfile

from kashmiri_normalization import normalize_kashmiri, normalizer_metadata


def process(input_path, output_path, field="kashmiri", normalized_field=None):
    normalized_field = normalized_field or f"{field}Normalized"
    if input_path.resolve() == output_path.resolve():
        raise ValueError("Choose a different output path; source files are preserved")
    if field == normalized_field:
        raise ValueError("The normalized field must differ from the source field")
    report_path = output_path.with_suffix(".report.json")
    if output_path.exists() or report_path.exists():
        raise FileExistsError("Choose a new output path; an output or report already exists")
    report = {"records": 0, "changed": 0, "warnings": 0, "field": field,
              "normalizedField": normalized_field, "normalizer": normalizer_metadata()}
    unique = set()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    temporary = None
    try:
        with input_path.open(encoding="utf-8-sig") as source, tempfile.NamedTemporaryFile(
            mode="w", encoding="utf-8", dir=output_path.parent, delete=False
        ) as target:
            temporary = Path(target.name)
            for number, line in enumerate(source, start=1):
                if not line.strip():
                    continue
                row = json.loads(line)
                if not isinstance(row, dict) or not isinstance(row.get(field), str):
                    raise ValueError(f"Line {number}: expected a string field named {field!r}")
                if normalized_field in row or "_normalization" in row:
                    raise ValueError(f"Line {number}: derived normalization fields already exist")
                result = normalize_kashmiri(row[field])
                row[normalized_field] = result["normalized"]
                row["_normalization"] = {"changed": result["changed"], "warnings": result["warnings"]}
                report["records"] += 1
                report["changed"] += int(result["changed"])
                report["warnings"] += int(bool(result["warnings"]))
                unique.add(result["normalized"])
                target.write(json.dumps(row, ensure_ascii=False) + "\n")
        temporary.replace(output_path)
        report["distinctNormalizedTexts"] = len(unique)
        report["input"] = str(input_path)
        report["output"] = str(output_path)
        report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)
    return report


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    inputs = parser.add_mutually_exclusive_group(required=True)
    inputs.add_argument("--text")
    inputs.add_argument("--input", type=Path)
    parser.add_argument("--output", type=Path)
    parser.add_argument("--field", default="kashmiri")
    parser.add_argument("--normalized-field")
    args = parser.parse_args()
    if args.text is not None:
        print(json.dumps(normalize_kashmiri(args.text), ensure_ascii=False, indent=2))
    else:
        if args.output is None:
            parser.error("--output is required with --input")
        print(json.dumps(process(args.input, args.output, args.field, args.normalized_field), ensure_ascii=False, indent=2))
