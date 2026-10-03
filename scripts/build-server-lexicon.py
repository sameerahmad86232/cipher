"""Build the compact lookup shipped with the server-side translator.

This is deliberately a lookup index rather than a second translation model: it
lets the live service use the reviewed dictionary and corpus vocabulary for
single-word translations, spelling variants, and context shown beside a neural
sentence translation.
"""
import json
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FILES = [ROOT / "dist/assets/dictionary.json"]
FILES += [ROOT / f"dist/assets/dictionary-kashir-{n}.json" for n in range(1, 9)]
FILES += [ROOT / "dist/assets/dictionary-corpus.json"]
OUT = ROOT / "server-data/lexicon.json"


def clean(value):
    return unicodedata.normalize("NFC", str(value or "")).replace("\u200b", "").strip()


records = []
for filename in FILES:
    records.extend(json.loads(filename.read_text()))

entries = {}
english_to_kashmiri = {}
kashmiri_to_english = {}

for row in records:
    kashmiri = clean(row.get("k"))
    english = clean(row.get("e"))
    transliteration = clean(row.get("tr"))
    if not kashmiri:
        continue
    # Keep the first reviewed dictionary definition for stable output.
    if english and "Corpus vocabulary word" not in english:
        entries.setdefault(kashmiri, {"k": kashmiri, "e": english[:240], **({"tr": transliteration} if transliteration else {})})
        english_to_kashmiri.setdefault(english.casefold(), kashmiri)
        kashmiri_to_english.setdefault(kashmiri, english[:240])
        for form in row.get("forms") or []:
            variant = clean(form.get("word"))
            if variant:
                kashmiri_to_english.setdefault(variant, english[:240])
    elif row.get("corpusVocabulary"):
        entries.setdefault(kashmiri, {"k": kashmiri, "e": "Corpus vocabulary word", **({"tr": transliteration} if transliteration else {})})

payload = {
    "version": 1,
    "description": "Compact lookup extracted from the reviewed dictionary and licensed corpus vocabulary.",
    "entries": list(entries.values()),
    "english_to_kashmiri": english_to_kashmiri,
    "kashmiri_to_english": kashmiri_to_english,
}
OUT.parent.mkdir(exist_ok=True)
OUT.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))
print(json.dumps({"entries": len(entries), "english_terms": len(english_to_kashmiri), "kashmiri_terms": len(kashmiri_to_english), "output": str(OUT)}))
