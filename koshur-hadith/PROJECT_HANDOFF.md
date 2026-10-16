# Project handoff

Updated: 2026-10-16

This document lets another developer or coding agent continue without rebuilding
the project from the beginning.

## Current product

- Production URL: `https://koshur-hadith.najarsameer8899.chatgpt.site`
- Sites project ID: `appgprj_6ac2438620f08191855e71647604a28e`
- Main public page: Hadith reader (`dist/index.html`)
- Seerah section: `dist/seerah.html`
- Translation review tools: `dist/proofread.html`
- The public deployment includes both the Hadith and Seerah sections.

## Important files

| Path | Purpose |
| --- | --- |
| `dist/seerah.html` | Seerah reader shell and accessible dialogs |
| `dist/assets/seerah.js` | chapter navigation, Bolbosh, highlighting, word lookup and maps |
| `dist/assets/seerah.css` | desktop/mobile reader design |
| `dist/data/seerah.json` | all current Seerah English/Kashmiri content, glossaries and word meanings |
| `review-memory/seerah-corrections.json` | human corrections and preferred terminology |
| `dist/data/hadiths.json` | retained Hadith translations |
| `dist/index.html`, `dist/assets/app.js` | retained Hadith reader |
| `dist/proofread.html`, `dist/assets/workbench.js` | retained review workbench |

## Translation state

The current Seerah coverage reaches the end of the Yemen discussion immediately
before the book's Heerah section. Chapter 2's newest Yemen paragraphs are review
drafts. Do not mark a translation as certified merely because it is present.

Project-owner terminology currently includes:

- elephant: `houss` singular, `haaesss` plural; stored as `ہۄس / ہسہِ` pending
  confirmation of exact diacritics;
- crowned king: `تاج پوش بادشاہ`;
- outside/outward: `نٮ۪بَر`;
- support/help: `مَدَت`.

Every correction from the owner should be applied both to the displayed JSON and
to `review-memory/seerah-corrections.json` so it can later become training data.

## Speech behavior

The reader calls the public Bolbosh/Matcha-TTS Gradio Space:

`https://gaash-lab-matcha-tts-kashmiri-demo.hf.space`

It requests the male, fast voice per paragraph and caches returned audio URLs in
the browser session. The endpoint does not return word timestamps. Highlighting
is therefore estimated from audio progress and must continue to be labeled as
approximate.

## Word lookup

Every rendered Kashmiri token is keyboard- and tap-accessible. Lookup order:

1. section glossary meaning;
2. `wordMeanings` in `dist/data/seerah.json`;
3. an honest “meaning not reviewed yet” message plus the aligned English sentence.

Never invent a one-word gloss when the contextual meaning is uncertain. Expand
`wordMeanings` only with reviewed entries.

## Deployment policy

Package the complete tracked `dist/` directory so the public website contains
Hadith, Seerah, speech, review tools, images and both JSON datasets. Keep
`.openai/hosting.json` in the archive. Do not replace `dist/index.html` with the
Seerah page: the main URL is the Hadith reader and `/seerah.html` is the Seerah
section.

## Required checks

Run the validation commands from `README.md`, confirm all referenced images
exist, commit the complete source state, push that exact commit, then save and
deploy a Sites version built from the same commit SHA.

## Content and visual safeguards

- Do not depict the Prophet, angels, Companions, or sacred personalities.
- Use maps, landscapes, architecture, manuscripts and distant historical objects.
- Keep source English beside Kashmiri for review.
- Preserve visible draft/review status.
- Verify dates independently when the supplied English edition contains an
  apparent chronological error.
