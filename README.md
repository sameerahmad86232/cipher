# Koshur Lughat

A static Kashmiri–English dictionary and experimental two-way sentence translator.

## Features

- 18,550 searchable dictionary records
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
