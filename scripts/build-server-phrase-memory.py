"""Build source-backed sentence pairs for exact server-side lookup."""
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FILES = [ROOT / "dist/assets/dictionary.json"]
FILES += [ROOT / f"dist/assets/dictionary-kashir-{n}.json" for n in range(1, 9)]
OUT = ROOT / "server-data/phrase-memory.json"


def clean(value):
    return re.sub(r"\s+", " ", unicodedata.normalize("NFC", str(value or "")).strip())


def key(value, direction):
    value = clean(value).rstrip(".!?؟۔")
    return value.casefold() if direction == "en-ks" else value


ks_to_en = {}
en_to_ks = {}
for filename in FILES:
    for row in json.loads(filename.read_text()):
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

payload = {
    "version": 1,
    "description": "Exact source-backed sentence pairs from reviewed dictionary examples; neural translation handles unseen sentences.",
    "kashmiri_to_english": ks_to_en,
    "english_to_kashmiri": en_to_ks,
}
OUT.parent.mkdir(exist_ok=True)
OUT.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))
print(json.dumps({"kashmiri_to_english": len(ks_to_en), "english_to_kashmiri": len(en_to_ks), "output": str(OUT)}))
