# Koshur Lughat

A public Kashmiri–English dictionary and **real browser-based neural sentence translator** for Perso-Arabic Kashmiri.

## Dictionary

- 21,276 meaning records across 13,233 headwords; 1,818 distinct sourced word-form spellings.
- 322 additional sourced meaning records in this upgrade: 183 English Wiktionary translation pairs and 139 explicitly glossed related terms.
- Multiple meanings grouped under each word, exact-match ranking, inflection-aware search, and script/source/grammar filters.
- Transliteration, IPA, grammatical labels, paired examples, etymologies and related words where supplied by the source.
- Kashmiri and English alphabetical browsing; all seven weekdays and twelve traditional months.

Counts include spelling alternatives, multiple senses and romanized records. They are **not** counts of distinct Perso-Arabic Kashmiri concepts. Original vocabulary has unresolved licensing; attributed Wiktionary adaptations are CC BY-SA 4.0. See [SOURCES.md](SOURCES.md).

## Translator

English ↔ Kashmiri sentence translation uses AI4Bharat IndicTrans2, with public MIT-licensed ONNX exports by Hari31416. The old longest-phrase word-substitution translator has been removed.

- Standard: 200M INT8 models; first download roughly 260–310 MB per direction.
- Large: 1B INT8 models; first download roughly 1.1–1.2 GB per direction. Desktop only; at least 8 GB RAM recommended. Browser/model memory limits may still prevent it running.
- Runs locally in a WASM web worker; three-beam decoding; on-demand downloads and best-effort browser caching.
- No API key, paid translation server or sentence upload. Model/runtime downloads contact Hugging Face and jsDelivr.
- Stop, retry and clear downloaded models. Models are released before changing direction/size.
- Up to 1,000 characters, processed sentence by sentence; overlong source sentences are rejected explicitly and unfinished output is flagged.

Use Perso-Arabic Kashmiri for sentence input. Romanized words can be searched in the dictionary, but romanized sentence translation is not supported.

**This is a public beta, not a claim of world's-best accuracy.** It can omit information, misread words with multiple senses, repeat words or alter names/numbers. Native-speaker evaluation and properly licensed, reviewed parallel-corpus training are necessary for stronger accuracy. Functional smoke tests do not establish human translation quality.

## Run locally

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000>. Use an HTTP server, not `file://`, for modules and workers.

## Deploy on Vercel

1. Open <https://vercel.com/new> and import `sameerahmad86232/cipher`.
2. Keep Root Directory at the repository root. The included `vercel.json` uses the **Other** framework preset, skips install/build commands and serves `.` as output.
3. Click **Deploy**. Linked pushes to `main` can trigger subsequent deployments.

No environment variables or server-side model hosting are needed. Model weights are fetched from their pinned Hugging Face snapshots; they are not committed to GitHub or included in Vercel deployments. A reliable internet connection is required for the first model download. Caching is subject to browser storage limits and can be cleared or evicted.

## Refresh sources

```sh
curl --fail -L https://kaikki.org/dictionary/Kashmiri/kaikki.org-dictionary-Kashmiri.jsonl -o /tmp/kashmiri.jsonl
node scripts/import-wiktionary.mjs /tmp/kashmiri.jsonl
node scripts/import-english-translations.mjs --download
```

The English dump exceeds 3 GB; the importer streams it without retaining the entire dump. Imports preserve attribution and sense context; generated form/character-only entries without meanings are not mined as new definitions. Re-running the imports merges existing pairs rather than intentionally duplicating them.

## Checks

`node scripts/test-dictionary.mjs` checks sourced data, lookup and text processing. `scripts/test-neural-browser.mjs` runs functional Chromium smoke tests with Playwright; set `TEST_ORIGIN`, `PLAYWRIGHT_MODULE` and `CHROMIUM_PATH` for your environment. Pass `--large` to exercise the larger models. These tests require model downloads and are not a native-speaker accuracy benchmark.
