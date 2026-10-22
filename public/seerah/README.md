# Nectar — The Seerah, in Kashmiri

A complete, buildless bilingual reading website for Chapter 1 of **The Sealed Nectar**, printed pages **8–13**, translated into Kashmiri Perso-Arabic script. 52 source-linked passages in seven navigable sections.

## Run

Serve this directory over HTTP; opening `index.html` directly as a `file://` URL will block JSON loading in many browsers:

```bash
python3 -m http.server 4173
```

Open http://localhost:4173. No npm installation, API key, sign-in, server-side model, or paid service is required. In the cipher project this same reader is served at `/seerah/` and embedded in the existing `#seerah` view.

## Features

- Complete first chapter, Kashmiri / English / bilingual modes, original-page references.
- Search both languages; search matching ignores combining marks without rewriting display text.
- Browser-local bookmarks, bookmark export, saved reading position, font size and day/night theme.
- Accessible native dialogs, keyboard search shortcut `/`, mobile contents drawer, reduced-motion support.
- Original local SVG desert illustration and schematic geographic guide. The map does not claim exact borders or migration paths.
- Local Noto Naskh Arabic, DM Sans and Cormorant Garamond fonts with their SIL Open Font License notices in `assets/`.

## Translation and source boundaries

The English comes from the user-supplied PDF, SHA256 recorded in `chapter-one.json`. All original paragraph blocks are retained, including text split across pages. Damaged font extraction of several names is normalized only for display; original text and normalization notes remain in the JSON.

The complete Kashmiri chapter is a **draft awaiting owner review**, adapted using prior owner corrections. It is not newly approved training data and has not been independently authenticated. The original 37 reviewed excerpts in cipher are preserved separately. Historical claims and the book's narration references are translated, not silently endorsed as verified facts.

Book text and its translations have separate rights from website code. No public-domain or permissive-license status for the book is asserted. Font licenses are separate. Reader code is distributed with `READER-CODE-LICENSE.txt`; do not apply it to book text.

## Handoff

- `index.html`: accessible reader structure and dialogs.
- `style.css`, `fonts.css`, `assets/`: responsive styles, local fonts and artwork.
- `app.js`: client-side navigation, search, persistence and geographic guide.
- `chapter-one.json`: authoritative bilingual passages, IDs, original source blocks, chapter structure and review status. Correct translations here, retaining IDs and provenance. Do not mark a passage owner-approved without an actual review.

No audio button is included because Kashmiri audio has not been generated. No pretrained model or scratch-training weights are presented as a working translator.
