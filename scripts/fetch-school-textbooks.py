#!/usr/bin/env python3
"""Download the JKBOSE Kashmiri textbook PDFs listed in the manifest.

The PDFs are scan-only (JPEG page images, no text layer), so they are build
inputs for OCR and are gitignored under source-books/. Re-running skips files
that are already present and complete.

Usage:  python scripts/fetch-school-textbooks.py [MANIFEST.json]
"""
import json
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "scripts/kashmiri-school-textbooks.json"


def human(n):
    return f"{n / 1048576:.1f} MB"


manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
books = manifest.get("books") or []
downloaded = skipped = failed = 0
total = 0

for book in books:
    target = ROOT / book["file"]
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists() and target.stat().st_size > 1024:
        size = target.stat().st_size
        total += size
        skipped += 1
        print(f"skip  {book['id']:18} {human(size)}", flush=True)
        continue
    request = urllib.request.Request(book["url"], headers={"User-Agent": "KoshurLughat/1.0 (+textbook fetch)"})
    try:
        with urllib.request.urlopen(request, timeout=300) as response:
            payload = response.read()
    except Exception as error:  # noqa: BLE001 - report and continue with other books
        failed += 1
        print(f"FAIL  {book['id']:18} {type(error).__name__}: {error}", flush=True)
        continue
    if len(payload) < 1024:
        failed += 1
        print(f"FAIL  {book['id']:18} response too small ({len(payload)} bytes)", flush=True)
        continue
    target.write_bytes(payload)
    total += len(payload)
    downloaded += 1
    print(f"ok    {book['id']:18} {human(len(payload))}", flush=True)

print(json.dumps({
    "books": len(books), "downloaded": downloaded, "skipped": skipped,
    "failed": failed, "totalBytes": total, "totalHuman": human(total),
    "directory": str(ROOT / "source-books"),
}))
