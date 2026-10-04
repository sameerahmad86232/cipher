"""Build source-backed sentence pairs for exact server-side lookup.

Two sources are merged:
  1. Kashmiri/English sentence pairs found in the dictionary records.
  2. server-data/reviewed-pairs.json — hand-reviewed corrections from a fluent
     speaker. These are authoritative, so they OVERRIDE anything generated in (1).
"""
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets" if (ROOT / "assets").is_dir() else ROOT / "dist/assets"
FILES = [ASSETS / "dictionary.json"]
FILES += [ASSETS / f"dictionary-kashir-{n}.json" for n in range(1, 9)]
REVIEWED = ROOT / "server-data/reviewed-pairs.json"
OUT = ROOT / "server-data/phrase-memory.json"


def clean(value):
    return re.sub(r"\s+", " ", unicodedata.normalize("NFC", str(value or "")).strip())


def key(value, direction):
    value = clean(value).rstrip(".!?؟۔")
    return value.casefold() if direction == "en-ks" else value


ks_to_en = {}
en_to_ks = {}
for filename in FILES:
    if not filename.exists():
        continue
    for row in json.loads(filename.read_text(encoding="utf-8")):
        pairs = []
        if row.get("kx") and row.get("x"):
            pairs.append((row["kx"], row["x"]))
        pairs.extend((example.get("k"), example.get("e")) for example in row.get("examples") or [])
        for kashmiri, english in pairs:
            kashmiri, english = clean(kashmiri), clean(english)
            if not kashmiri or not english or len(kashmiri) > 300 or len(english) > 300:
                continue
            ks_to_en.setdefault(key(kashmiri, "ks-en"), english)
            en_to_ks.setdefault(key(english, "en-ks"), kashmiri)

# Reviewed corrections last, so they win over generated pairs.
reviewed_count = 0
if REVIEWED.exists():
    reviewed = json.loads(REVIEWED.read_text(encoding="utf-8"))
    for pair in reviewed.get("pairs") or []:
        if pair.get("status") != "reviewed":
            continue
        kashmiri, english = clean(pair.get("kashmiri")), clean(pair.get("english"))
        if not kashmiri or not english:
            continue
        ks_to_en[key(kashmiri, "ks-en")] = english
        en_to_ks[key(english, "en-ks")] = kashmiri
        reviewed_count += 1

payload = {
    "version": 1,
    "description": "Exact source-backed sentence pairs from reviewed dictionary examples plus hand-reviewed corrections; neural translation handles unseen sentences.",
    "reviewedPairCount": reviewed_count,
    "kashmiri_to_english": ks_to_en,
    "english_to_kashmiri": en_to_ks,
}
OUT.parent.mkdir(exist_ok=True)
OUT.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
print(json.dumps({
    "kashmiri_to_english": len(ks_to_en),
    "english_to_kashmiri": len(en_to_ks),
    "reviewedPairsMerged": reviewed_count,
    "assetsDir": str(ASSETS),
    "output": str(OUT),
}))
