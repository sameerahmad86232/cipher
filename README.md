# Koshur Lughat

The current public dictionary and two-way browser translator live at the repository root, which is the published site (there is no `dist/` directory and no build step).
It contains 58,454 modern-script records across 49,682 searchable headwords, including 23,953 meaning records, 23,377 OCR-only vocabulary records and 11,124 licensed corpus-vocabulary records. A separate 20,643-entry historical romanized lexicon is loaded on demand.
English ↔ Perso-Arabic Kashmiri neural translation runs server-side in the public Hugging Face Space [Sameer0313/Koshur_lughat](https://huggingface.co/spaces/Sameer0313/Koshur_lughat), so visitors do not download model weights.
Kashmiri text to speech uses the public GAASH Lab Bolbosh Matcha-TTS Space.
Both Spaces run on scale-to-zero hardware, so the first request after a quiet period can take up to a minute while the container starts; the client polls for readiness instead of failing, and reports a distinct message when the shared anonymous GPU quota is exhausted.

Serve the site with `python3 -m http.server 8006` from the repository root.
The public GitHub edition is [sameerahmad86232/cipher](https://github.com/sameerahmad86232/cipher),
which is directly importable into Vercel. See [source and model documentation](SOURCES.md)
for provenance, licensing, download requirements and accuracy limits.
The site also provides a 8,336-sentence licensed Kashmiri corpus subset from Kashmiri Wikipedia and OpenSLR, plus source-linked vocabulary forms. The site also links to Koul, Raina and Bhat's scanned 2000 learner's dictionary for reference and includes manually checked data from it. The project owner reports rights-holder approval for public reuse; the scan's OCR is too noisy for unreviewed bulk import.
The full 140-page machine OCR is preserved and searchable separately in the site.
The Kashmiri orthography notes contribute 118 character mappings and 504 attributed example glosses, including vowel marks, aspirated digraphs, palatalisation and canonical-spelling guidance. The complete guide is bundled as `orthography.html`. Every dictionary record has a transliteration; generated values are marked with `trGenerated` in the JSON, and the translator shows a Romanized reading for Kashmiri text.

Text normalization and transliteration implement the **"Confusables & spelling errors"** table in `orthography.html`, which documents the incorrect code point and the character that should have been used. Six of those mappings were previously not applied at all, and they affect **6,079 records (10.4% of the dictionary)**:

| Incorrect | Correct | Records | Meaning |
| --- | --- | --- | --- |
| `U+065B` `ٛ` | `U+0652` `ْ` | 2,743 | This only *looks* like the Kashmiri jazm; it was introduced as a vowel sign for African languages. The sukun code point carries the intended meaning. |
| `U+06CD` `ۍ` | `U+0620` `ؠ` | 1,620 | Pashto YE used where the word-final KASHMIRI YEH belongs (the palatalisation marker). |
| `U+066E U+06EA` `ٮ۪` | `U+0620` `ؠ` | 464 | An incorrect way of writing KASHMIRI YEH, used when the Farsi yeh was unavailable. |
| `U+06C5` `ۅ` | `U+06C4` `ۄ` | 224 | Kirghiz OE instead of WAW WITH RING. |
| `U+0626` `ئ` | `U+06CC U+0654` `یٔ` | 260 | The hamza must be kept: dropping it deletes a vowel sound. |
| `U+0643` `ك` | `U+06A9` `ک` | 111 | Arabic KAF instead of Keheh. |

Applying the table corrects readings that were previously nonsense or misleading. `پٮ۪ٹھ` now romanizes as `pʲʈʰ` instead of `pb۪ʈʰ`, `ہُپٲرۍ` as `hupə̄rʲ` instead of `hupə̄ry`, and `منٛز` as `mñż` — because `نْ` is the documented nasalisation digraph, whereas the old output fell back to `mnż`. Because these are letter-level corrections, search keys now agree: a reader can find `پٮ۪ٹھ` by typing the correct `پؠٹھ`. The stored headwords are deliberately **not** rewritten in place, so the source spelling is preserved; normalization is applied when searching and romanizing.

`autocorrectKashmiri` re-normalizes after replacing, because some corrections swap a combining mark for one with a different canonical combining class (`U+065B` 230 → `U+0652` 34) and NFC canonically reorders marks by class. Without that second pass the function was not idempotent. It is verified idempotent across all 58,454 headwords and 20,000 generated fuzz strings.

Characters with no rule and no fallback are passed through unchanged rather than deleted, so an unrecognized mark stays visible and reviewable. **960 transliterations therefore still contain Arabic script** (942 machine-generated and 18 hand-authored, e.g. `trụٛh`). After the confusables fix the remainder is no longer Kashmiri vowel information but non-Kashmiri material — Arabic case endings (`ً` U+064B, `ٌ` U+064C, `ٍ` U+064D), Quranic marks (`ۭ` U+06ED, `ۡ` U+06E1), and letters belonging to other languages (Pashto `ړ`, Sindhi `ڪ`, Kirghiz `ۋ`). These are reported for review rather than mapped, since `orthography.html` documents no value for them.

Run `node scripts/regenerate-transliterations.mjs` after changing the transliteration rules to bring the stored `tr` values back in step; it only rewrites records marked `trGenerated` and never touches hand-authored values.
The site also includes page-preserving OCR for 490 pages of openly licensed Kashmiri Perso-Arabic books: *Aagarnamah* and *An Advance Course in Kashmiri*. These pages are searchable source context and are labeled machine OCR.
The OCR character inventory is also used to accept common Arabic-script spelling variants in dictionary search, translator input normalization, and transliteration fallback.
OCR pages preserve raw text alongside conservative normalized text and transliteration. All 5,754 unique Arabic-script OCR words from the 630 combined pages are now searchable dictionary vocabulary records with generated transliteration and page references; existing definitions are retained, while OCR-only words are clearly labeled when the source supplies no English gloss.
The OCR vocabulary layer carries 28,582 page-level references across known and OCR-only records.
The site now includes a practical [Kashmiri language and proofreading guide](language-guide.html) covering the Perso-Arabic script, sounds, word structure, cases, sentence patterns, verbs, agreement, negation, questions and an editorial checking workflow.

Import scripts under `scripts/` refresh Wiktionary definitions/forms, explicit English translation-table pairs and Kaeshir Dictionary data. `scripts/test-neural-browser.mjs` provides
functional browser smoke tests, not a native-speaker accuracy benchmark.

## Run locally

The published site is plain static files, so any static server works from the repository root:

```bash
python3 -m http.server 8006
```

Open <http://127.0.0.1:8006>. There is no build step and no dependency install for the site itself.

The import and OCR scripts under `scripts/` are build-time tooling, not part of the site. They need Node (`.mjs`) or Python (`build-*-ocr.py`). The Python OCR builders read Internet Archive DjVu XML; see [SOURCES.md](SOURCES.md) for provenance and licensing.

Example — rebuild the stored transliterations after editing the transliteration rules:

```bash
node scripts/regenerate-transliterations.mjs
```

## Notes

- Translation direction is explicitly `kas_Arab` to `eng_Latn` (and the reverse), sent to the public Hugging Face Space; the optional offline model runs the same NLLB-200 distilled 600M weights in the browser via Transformers.js.
- Input is NFC-normalized, but Kashmiri diacritics are preserved.
- NLLB is a useful baseline rather than a Kashmiri-specialist model. Fine-tuning on a reviewed Kashmiri–English parallel corpus is the next quality step.
- The converted NLLB model is published under CC BY-NC 4.0. Replace or separately license the model before commercial deployment.

## Not in this repository

Earlier notes in this README described a local FastAPI + CTranslate2 NLLB prototype started with `uvicorn app.main:app`. That prototype, its `requirements.txt` and its `models/` directory are **not** part of this repository; the paths above no longer exist here. Do not follow those old instructions.
