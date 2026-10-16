# Koshur Seerah and Hadith

An open, mobile-first Kashmiri Perso-Arabic reading project containing:

- a chapter-by-chapter Seerah translation workspace;
- the retained Sahih al-Bukhari translation data and review tools;
- per-line Bolbosh Kashmiri speech generation;
- estimated word highlighting during playback;
- tap-to-translate word cards with contextual English;
- reviewed terminology and correction memory.

Live website: <https://koshur-hadith.najarsameer8899.chatgpt.site>

- Hadith section: `/`
- Seerah section: `/seerah.html`
- Translation review tools: `/proofread.html`

## Start here

The deployable static application is in `dist/`. The Seerah source of truth is
`dist/data/seerah.json`; human corrections are retained in
`review-memory/seerah-corrections.json`. Read `PROJECT_HANDOFF.md` before making
translation, audio, or deployment changes.

## Local preview

Serve the repository root with any static HTTP server and open
`/dist/seerah.html`. Do not open the HTML directly from the filesystem because
the reader fetches JSON data.

## Validation

```bash
python -m json.tool dist/data/seerah.json >/dev/null
python -m json.tool review-memory/seerah-corrections.json >/dev/null
node --check dist/assets/seerah.js
git diff --check
```

Religious and historical translations remain subject to fluent Kashmiri and
qualified scholarly review. Generated historical illustrations never depict
the Prophet, angels, Companions, or other sacred personalities.
