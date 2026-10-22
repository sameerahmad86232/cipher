# Koshur Lughat — Kashmiri English Dictionary & Translator (React + TypeScript)

A modern, fast, and responsive React single-page application for Kashmiri–English dictionary lookup, Persian-Arabic script orthography, and sentence-level neural translation.

Originally imported from `sameerahmad86232/cipher`, this project has been rewritten as a modular React application using Vite and TypeScript.

## Core Features

- **Searchable Kashmiri–English Dictionary**:
  - Over 58,000 modern-script records across 49,000+ searchable headwords.
  - Multi-script search supporting Perso-Arabic (Nastaliq), romanized Kashmiri, and English glosses.
  - Sourced entries with sense context, IPA pronunciation, inflected word forms, related vocabulary, and etymologies.
  - Alphabet browsing (Perso-Arabic script and English A–Z).
  - Search filters for Script (All, Perso-Arabic, Romanized), Source (All, Attributed), and Grammar (Nouns, Verbs, Adjectives, Adverbs, Numbers).
  - Quick hotkey navigation: press `/` anywhere to jump into search.
  - Recent searches history with local persistence.

- **Specialized Historical & OCR Collections**:
  - **Days & Calendar**: Seasonal terms, months, and days of the week.
  - **Historical Romanized Lexicon**: 20,643 Grierson entries (1932) loaded on demand.
  - **Koul Book OCR**: 140 scanned pages from Omkar Koul's *Kashmiri–English Dictionary for Second Language Learners*.
  - **Open Kashmiri Books OCR**: 490 pages from open-licensed textbooks.
  - **Kashir Dictionary OCR**: 7 volumes (2,710 pages) of reference material.
  - **Grammar & Textbooks OCR**: 2,813 reading and dictionary pages.
  - **Licensed Kashmiri Corpus**: 8,336 sentences from licensed Kashmiri corpus data.
  - **Kashmiri Qur’an Translation OCR**: 1,694 pages from historical translations.

- **Neural Sentence Translation**:
  - Kashmiri (Perso-Arabic) ⇄ English bidirectional sentence translation.
  - Server-side translation powered by NLLB-200 600M running in Hugging Face Spaces with Server-Sent Events (SSE).
  - Browser-based offline translation option with quantized `@huggingface/transformers` models.
  - High-precision translation memory for exact and close-match reviewed phrases.
  - Real-time live grammar checks analyzing polarity, TAM, ergativity, question markers, and word order.
  - Real-time live dictionary preview showing matches while typing.
  - Unknown English transliteration fallback into Perso-Arabic Kashmiri script.
  - Reference lookup tools mapping sentences to Koul OCR and Qur'an OCR pages.

- **Kashmiri Text-to-Speech (Bolbosh)**:
  - Neural Kashmiri speech synthesis using the GAASH Lab Bolbosh Matcha-TTS model.
  - Voice selection (Female / Male) and quality profiles (Fast, Medium, High).
  - Integrated HTML5 audio player.

- **Orthography & Language Guide**:
  - Comprehensive Kashmiri Perso-Arabic writing system documentation based on Richard Ishida's notes (v32).
  - Detailed grammar, sentence structure, proofreading schemes, and confusable character normalization.

## Development & Build

```bash
# Install dependencies
npm install

# Run local development server (port 3000)
npm run dev

# Build production bundle
npm run build
```

## Kashmiri text normalization

Install the MIT-licensed KashmiriNormalizer integration in your Python environment:

```bash
python -m pip install -r requirements-normalization.txt
python scripts/normalize-kashmiri-corpus.py --text "١٢٣ ، کِتاب ۔"
python scripts/normalize-kashmiri-corpus.py \
  --input training-data/combined-parallel.jsonl \
  --output /tmp/kashmiri-normalized-review.jsonl
```

The corpus command retains the original fields, adds `kashmiriNormalized`, and
writes a report beside the output. For monolingual OCR or corpus JSONL, pass
`--field text`; only that field is processed. Keep Quranic Arabic in its own
field because its spelling conventions differ from Kashmiri. Vowel marks are
preserved, and any transformation that removes combining marks is blocked.
The upstream TTS digit-by-digit word conversion and character filter are not used.

To use the integration during parallel-data preparation:

```bash
python scripts/prepare-kashmiri-parallel.py \
  --normalize-kashmiri --output /tmp/kashmiri-prepared-normalized
python scripts/test-kashmiri-normalization.py
python scripts/test-prepare-kashmiri-parallel.py
```

Normalized duplicate detection prioritizes owner-reviewed rows. Reviewed training
targets and evaluation references retain their wording; other targets get the
normalized copy and retain `kashmiriOriginal`. Existing browser search cleanup
continues to use the shared TypeScript helpers.

## Nectar: complete first-chapter reading edition

The standalone Seerah reader lives in `public/seerah/` and is embedded in the existing `#seerah` view. Open `/seerah/` for the full-screen edition. It includes the complete Chapter 1 (printed pages8–13), 52 bilingual passages, section navigation, local bookmarks, search, a schematic place guide, font controls and a night theme. New complete-chapter translations remain review drafts; the original 37 reviewed excerpts are unchanged.

Source coverage: `python scripts/test-seerah-firstchapter.py [path-to-the-supplied-PDF]`.
Reader interactions: `scripts/test-seerah-reader.cjs` requires a separate Playwright installation and a running static server; see `public/seerah/README.md` for the reader structure and rights boundaries. The same static reader is published as source in `sameerahmad86232/zameer`.
