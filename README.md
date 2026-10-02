# Koshur Lughat

A static Kashmiri–English dictionary and experimental two-way sentence translator.

## Features

- 18,595 searchable dictionary records
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

The sentence translator currently uses longest-phrase dictionary matching. It is useful for simple sentences and vocabulary assistance, but is not a replacement for a neural translation model.

Calendar entries are adapted from Wiktionary via Kaikki under CC BY-SA 4.0. See [SOURCES.md](SOURCES.md) for provenance and licensing details. Calendar entries can be refreshed from Kaikki's Kashmiri JSONL download using `node scripts/import-calendar.mjs SOURCE.jsonl`.
