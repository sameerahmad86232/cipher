# Koshur Lughat

A static Kashmiri–English dictionary and experimental two-way sentence translator.

## Features

- 20,954 searchable dictionary records
- 2,359 additional sourced definitions covering everyday vocabulary, verbs, adjectives, family terms and numbers
- All seven weekdays and the twelve traditional Kashmiri months
- A Days & calendar collection with time vocabulary, transliteration, and source links
- Perso-Arabic and romanized Kashmiri search
- English alphabetical browsing and recent searches
- Kashmiri → English sentence translation
- English → Kashmiri sentence translation
- Runs entirely in the browser with no build step

## Run locally

Serve the repository with any static server, for example:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploy on Vercel

1. Open <https://vercel.com/new> and import `sameerahmad86232/cipher`.
2. Keep the Root Directory at the repository root. The included `vercel.json` selects the **Other** framework preset, skips installation/build commands and serves `.` as the output directory.
3. Click **Deploy**. After linking the repository, subsequent pushes to `main` can trigger a new deployment.

This static edition needs no environment variables, API key or Python server. Dictionary lookup and the experimental sentence lookup run in the browser.

The sentence translator currently uses longest-phrase dictionary matching. It is useful for simple sentences and vocabulary assistance, but is not a replacement for a neural translation model.

Additional dictionary entries are adapted from Wiktionary via Kaikki under CC BY-SA 4.0. See [SOURCES.md](SOURCES.md) for provenance and licensing details.

To refresh the Wiktionary entries, download Kaikki's [Kashmiri JSONL](https://kaikki.org/dictionary/Kashmiri/kaikki.org-dictionary-Kashmiri.jsonl) and run `node scripts/import-wiktionary.mjs SOURCE.jsonl`. The import merges matching word/meaning pairs rather than inserting duplicates. The narrower calendar import remains available as `node scripts/import-calendar.mjs SOURCE.jsonl`.
