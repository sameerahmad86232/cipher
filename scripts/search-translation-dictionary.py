#!/usr/bin/env python3
"""Search the repository dictionary for human translation and book review.

The dictionary contains lexical evidence, not approved sentence translations.
Results should inform a translator and reviewer; they must not be copied into
training pairs or published religious text without contextual human review.
"""

import argparse
import json
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DICTIONARY = ROOT / "server-data" / "lexicon.json"
KASHMIRI_MARKS = {chr(code) for code in range(0x064B, 0x0660)}


def fold(value: str) -> str:
    value = unicodedata.normalize("NFKC", value).casefold().replace("\u200b", "")
    return "".join(char for char in value if char not in KASHMIRI_MARKS).strip()


def score(entry: dict, query: str) -> int | None:
    needle = fold(query)
    fields = [fold(entry.get(key, "")) for key in ("k", "e", "tr")]
    if any(value == needle for value in fields):
        return 0
    if any(value.startswith(needle) for value in fields):
        return 1
    if any(needle in value for value in fields):
        return 2
    return None


def search(entries: list[dict], query: str, limit: int) -> list[dict]:
    ranked = []
    for position, entry in enumerate(entries):
        rank = score(entry, query)
        if rank is not None:
            ranked.append((rank, position, entry))
    ranked.sort(key=lambda item: (item[0], item[1]))
    return [entry for _, _, entry in ranked[:limit]]


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Search the 58,000+ record Kashmiri dictionary source."
    )
    parser.add_argument("query", help="Kashmiri, English, or romanized term")
    parser.add_argument("--limit", type=int, default=20, help="maximum results")
    parser.add_argument("--json", action="store_true", help="emit machine-readable JSON")
    parser.add_argument("--dictionary", type=Path, default=DEFAULT_DICTIONARY)
    args = parser.parse_args()

    if args.limit < 1:
        parser.error("--limit must be at least 1")

    payload = json.loads(args.dictionary.read_text(encoding="utf-8"))
    entries = payload.get("entries", [])
    results = search(entries, args.query, args.limit)

    if args.json:
        print(json.dumps({"query": args.query, "results": results}, ensure_ascii=False, indent=2))
        return 0

    print(f"{len(results)} result(s) from {len(entries):,} indexed entries")
    for number, entry in enumerate(results, 1):
        transliteration = f" · {entry['tr']}" if entry.get("tr") else ""
        print(f"{number:>2}. {entry.get('k', '')} — {entry.get('e', '')}{transliteration}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
