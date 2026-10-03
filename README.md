# Koshur Lughat

The current public dictionary and two-way browser translator live in `dist/`.
It contains 57,912 modern-script records across 49,140 searchable headwords, including 23,953 meaning records, 23,377 OCR-only vocabulary records and 10,582 licensed corpus-vocabulary records. A separate 20,643-entry historical romanized lexicon is loaded on demand.
English ↔ Perso-Arabic Kashmiri neural translation runs server-side in the public Hugging Face Space [Sameer0313/Koshur_lughat](https://huggingface.co/spaces/Sameer0313/Koshur_lughat), so visitors do not download model weights.

Serve the site with `python3 -m http.server 8006 --directory dist`.
The public GitHub edition is [sameerahmad86232/cipher](https://github.com/sameerahmad86232/cipher),
which is directly importable into Vercel. See [source and model documentation](dist/SOURCES.md)
for provenance, licensing, download requirements and accuracy limits.
The site also provides a 4,166-sentence licensed Kashmiri corpus subset from Kashmiri Wikipedia and OpenSLR, plus source-linked vocabulary forms. The site also links to Koul, Raina and Bhat's scanned 2000 learner's dictionary for reference and includes manually checked data from it. The project owner reports rights-holder approval for public reuse; the scan's OCR is too noisy for unreviewed bulk import.
The full 140-page machine OCR is preserved and searchable separately in the site.
The Kashmiri orthography notes contribute 118 character mappings and 504 attributed example glosses, including vowel marks, aspirated digraphs, palatalisation and canonical-spelling guidance. The complete guide is bundled as `dist/orthography.html`. Every dictionary record now has a transliteration; generated values are marked in the JSON, and the translator shows a Romanized reading for Kashmiri text.
The site also includes page-preserving OCR for 490 pages of openly licensed Kashmiri Perso-Arabic books: *Aagarnamah* and *An Advance Course in Kashmiri*. These pages are searchable source context and are labeled machine OCR.
The OCR character inventory is also used to accept common Arabic-script spelling variants in dictionary search, translator input normalization, and transliteration fallback.
OCR pages preserve raw text alongside conservative normalized text and transliteration. All 5,754 unique Arabic-script OCR words from the 630 combined pages are now searchable dictionary vocabulary records with generated transliteration and page references; existing definitions are retained, while OCR-only words are clearly labeled when the source supplies no English gloss.
The OCR vocabulary layer carries 28,582 page-level references across known and OCR-only records.
The site now includes a practical [Kashmiri language and proofreading guide](dist/language-guide.html) covering the Perso-Arabic script, sounds, word structure, cases, sentence patterns, verbs, agreement, negation, questions and an editorial checking workflow.

Import scripts under `scripts/` refresh Wiktionary definitions/forms, explicit English translation-table pairs and Kaeshir Dictionary data. `scripts/test-neural-browser.mjs` provides
functional browser smoke tests, not a native-speaker accuracy benchmark.

## Earlier local NLLB prototype

A local Kashmiri (Perso-Arabic) to English translator powered by the int8 CTranslate2 build of Meta's NLLB-200 distilled 600M model.

## Run

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open <http://127.0.0.1:8000>. The model is downloaded into `models/` on the first translation (roughly 600 MB), then reused locally.

## Notes

- Translation direction is explicitly `kas_Arab` to `eng_Latn`.
- Input is NFC-normalized, but Kashmiri diacritics are preserved.
- NLLB is a useful baseline rather than a Kashmiri-specialist model. Fine-tuning on a reviewed Kashmiri–English parallel corpus is the next quality step.
- The selected converted NLLB model is published under CC BY-NC 4.0. Replace or separately license the model before commercial deployment.
