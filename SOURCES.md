# Dictionary sources

## Koul, Raina and Bhat reference book

We consulted [*Kashmiri–English Dictionary for Second Language Learners*](https://archive.org/details/tbjU_kashmiri-english-dictionary-for-second-language-learners-omkar-koul) by Omkar N. Koul, S. N. Raina and Roop Krishen Bhat (Central Institute of Indian Languages, 2000). It contains Perso-Arabic Kashmiri headwords, romanization and English glosses. The available PDF is a 140-page image scan; its OCR text is too unreliable for automated extraction. The archive item carries an uploader-supplied CC0 label, but the book’s printed copyright page (PDF p. 8) says reproduction requires the publisher’s written permission. The project owner reports rights-holder approval for public reuse of entries; the scan itself is linked, not redistributed. We are adding manually checked entries and page-linked verification rather than importing unreviewed OCR.

Eleven existing word pairs, including `اَدَب` / “literature,” `اَنٛدَر` / “inside,” and `اَداکار` / “actor,” were manually checked against printed p. 10 (PDF p. 20) and now have links to that page. The book also supplied the new `اَدَب` / “good manners” and `اَنٛداز` / “imagination” senses. Comparison exposed an unrelated dataset's incorrect `اَدَب` / “court” pair, which was removed; the book has `عدالَت` for “court.” `scripts/reference-koul.mjs` applies these reviewed changes reproducibly. The book is not declared CC0 or bundled with the site.

### Complete machine OCR

The 140-page scan has also been OCRed page by page with Tesseract `eng+ara` from the embedded page images. The output is available as `assets/koul-book-ocr.json` and `assets/koul-book-ocr.txt`, and the site exposes it through “Koul book OCR.” It contains one record for every PDF page, including blank or front-matter pages, and links each result to the corresponding Internet Archive page. This is a preservation/search layer, not a claim that every Kashmiri glyph was recognized correctly; the OCR model is Arabic-trained and the book uses Kashmiri Nastaliq. Human review is required before treating a machine-OCR line as a dictionary fact.

The Translator view also offers a manual Koul-reference lookup for the current sentence. It returns matching source pages and snippets without changing the model's generated translation. Adding OCR text to a lookup glossary does not retrain IndicTrans2; better model accuracy still requires a reviewed parallel corpus and model fine-tuning.

The original vocabulary comes from [injilashah/Kashmiri-language-text-dataset](https://huggingface.co/datasets/injilashah/Kashmiri-language-text-dataset). Its dataset card does not specify a license; the new calendar entries do not change the terms of that earlier material.

## Wiktionary expansion

Perso-Arabic Kashmiri definitions covering everyday nouns, verbs, adjectives, numbers, family terms, names and calendar vocabulary are adapted from English Wiktionary's Kashmiri entries, extracted by [Kaikki.org](https://kaikki.org/dictionary/Kashmiri/) using Wiktextract.

- Extraction dated 2026-09-28, based on the English Wiktionary dump dated 2026-09-02.
- License: [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/).
- Definitions, romanization, IPA, and examples are retained from the source. Grammatical labels are shortened for display and duplicate headword/meaning pairs are merged with existing records. Alphabet-only entries and entries without a definition are excluded.
- Each adapted entry contains its Wiktionary source URL. The linked page history identifies its contributors.
- The traditional month definitions describe approximate spans across Gregorian months; they are not individual Gregorian month names.

All adapted records are marked `s: "Wiktionary"` in `assets/dictionary.json` and remain available under CC BY-SA 4.0. The calendar collection is additionally marked `topic: "calendar"`.

The general import added 2,359 records to the 18,595-record calendar edition, bringing the combined dictionary to 20,954 records. Record totals include multiple meanings and script variants; they are not counts of distinct Kashmiri words.

The former dictionary-based sentence substitution has been removed. Dictionary entries are used for lookup, not as a replacement for a neural translation model.

## October 2026 expansion

The modern-script dictionary now contains **29,256 records across 20,484 NFC-normalized searchable headwords**: 23,953 meaning records and 5,303 clearly labeled OCR-only vocabulary records, plus **1,818 distinct sourced word-form spellings**. These are different measures, not counts of distinct Kashmiri words. A separate historical romanized collection has 20,643 records across 20,532 headwords. Source forms can overlap existing headwords and include multiple grammatical analyses of one spelling.

## Kashmiri orthography notes v32

The site incorporates structured language assets from [Richard Ishida's Arabic (Kashmiri) Nastaliq orthography notes v32](https://r12a.github.io/scripts/arab/ks.html), retrieved 3 October 2026. The project owner reports permission for public use. `assets/kashmiri-orthography.json` preserves the character spreadsheet, Kashmiri letters and combining marks, native digits and punctuation, 504 example glosses with IPA/transcription where supplied, and a concise set of writing rules. The 504 examples are added as attributed lookup records; orthography rules are not treated as word meanings. The source describes NFC/NFD handling, Kashmiri vowel visibility, aspirated digraphs, palatalisation, jazm placement, right-to-left layout and Kashmiri-specific characters. The translator’s Kashmiri input normalizer now applies the source’s core Kashmiri letter equivalences (`ك`/`ک`, `ي`/`ی`, `ى`/`ی`, `ه`/`ہ`) before model preprocessing.

The complete guide is bundled locally at [`/orthography.html`](orthography.html), with its sections, examples and tables preserved for in-site reading. `assets/transliteration.mjs` applies the source character mappings to provide a Romanized reading for Kashmiri translator output. Dictionary records that lacked a source transliteration were filled by `scripts/add-generated-transliterations.mjs`; those values carry `trGenerated: true` and `trSource` so they can be reviewed separately from published source spellings.

The practical [`language-guide.html`](language-guide.html) is an editorial synthesis built on the orthography notes and attributed dictionary examples. It explains the script, sounds, word structure, cases, sentence patterns, TAM and agreement, negation, questions, transliteration and proofreading workflow. It is deliberately descriptive: dialect-sensitive forms and unresolved paradigms are marked for fluent-speaker review rather than presented as universal rules.

## Open Kashmiri book OCR

The searchable `assets/kashmiri-school-textbooks-ocr.json` and `.txt` assets contain page-level machine OCR from two Kashmiri Perso-Arabic sources retrieved from Internet Archive. **Aagarnamah**, by Ghulam Mohammad Lone, is licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) and contributes 212 pages ([source](https://archive.org/details/Aagarnamah)). **An Advance Course in Kashmiri**, by Soom Nath Raina, is licensed [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) and contributes 278 pages ([source](https://archive.org/details/dli.language.2242)). The Koul learner dictionary contributes 140 pages under the project owner's reported rights-holder permission. OCR was run locally with Tesseract `ara+eng`, page images rendered at 300 dpi. The output is labeled machine OCR; its 5,754 unique Arabic-script words are also included in `assets/dictionary.json` as clearly labeled OCR vocabulary records with generated transliteration and page references. Existing definitions are preserved, while OCR-only records do not claim an English meaning that the books do not provide.

The orthography asset records the 38 Arabic-script characters observed in these OCR pages, with code points and counts. Dictionary search folds common OCR variants (`أ`, `إ`, `ك`, `ي`, `ى`, `ه`, `ة`) to the project’s Kashmiri forms, and the translator normalizer accepts the same variants. The Romanization module has fallback mappings for those observed characters and native Arabic-Indic digits.

Each OCR page now stores the original `text`, a conservative `normalizedText`, and a `transliteration`. Normalization is limited to NFC and documented script variants; uncertain words are not silently rewritten. Dictionary records retain their source transliterations, and generated ones remain marked for review.

The OCR linker and vocabulary import attach 28,582 `OCR occurrence` page references across known and OCR-only records. These links document where a word appears in the books; they do not create an English meaning or retrain the sentence model.

- Scanned all 1,492,838 rows of the English Kaikki dump and imported 183 explicitly tagged Perso-Arabic Kashmiri translation pairs. Sense context, transliteration, grammatical tags and the English source-page link are retained. Entries are marked `s: "Wiktionary translation table"`.
- Imported 139 additional explicitly glossed derived/related terms from Kashmiri Wiktionary entries. A synonym without an explicit English gloss does not generate a guessed definition.
- Enriched sourced entries with inflected forms and their grammatical tags, sense labels, etymologies, synonyms, antonyms and paired examples when available. Kashmiri and English examples are kept together from the same source; old unrelated English illustrations are not attached to new Kashmiri examples.
- Search groups senses by headword, indexes recorded forms, ranks exact matches first and allows script/source/word-type filtering. It tolerates omitted vowel marks for lookup; it does not invent new vocabulary or transliterations.

The English and Kashmiri Wiktionary adaptations remain **CC BY-SA 4.0**, with attribution links in every imported record. The original dataset's missing license remains unresolved. Filtering to “Attributed sources” helps inspect the attributable subset, but is not a blanket license for the original data.

## Kaeshir Dictionary expansion

Imported the English–Kashmiri word list and a separate historical romanized lexicon from [izan-majeed/kaeshir-dictionary-data](https://github.com/izan-majeed/kaeshir-dictionary-data) at commit `4222492fbac277321bc0a4bfc6cc790edc25566a`. The dataset is published under [MIT](DATA-LICENSES/kaeshir-dictionary-MIT.txt); attribution: Izan Majeed, *Kaeshir Dictionary Data* (2026). The repository describes the romanized historical entries as sourced from Grierson. Original historical source and romanization conventions should be checked before scholarly citation.

- `collected-words.json` contributed **2,354 new Perso-Arabic/English pairs** and additional attribution for **9,496 overlapping pairs**. Its `englishMeaning` field contains romanized Kashmiri, not an English definition. We use its English `title` as the gloss, keep its romanized examples labeled as such, and attach transliteration only when variants align unambiguously.
- `dictionary-words.json` contributed **20,643 separate historical romanized entries**. These are browsable on demand and are excluded from the modern Perso-Arabic counts and sentence model. Long historical entries are collapsed in result cards.
- `audio-words.json` was not copied because its linked audio/descriptions may have separate rights and the source host was unavailable during review.

The import can be repeated with `node scripts/import-kaeshir.mjs /path/to/kaeshir-dictionary-data`. Existing original entries retain their original licensing status even when we attach an MIT source for the same word pair. This is a lookup expansion, not new training or evidence of improved sentence translation accuracy.

## Sources audited, not imported indiscriminately

| Resource | Finding | Treatment |
| --- | --- | --- |
| [Kaikki Kashmiri](https://kaikki.org/dictionary/Kashmiri/) | Explicit English definitions, forms and examples; Wiktionary licensing | Imported and attributed |
| [Kaikki English](https://kaikki.org/dictionary/English/) | Explicit `ks` translation-table pairs | Scanned whole dump; imported only identified Kashmiri pairs |
| [Original Kashmiri Language Text Dataset](https://huggingface.co/datasets/injilashah/Kashmiri-language-text-dataset) | Original lexicon and romanized meanings, no listed license | Existing material retained with licensing warning |
| [Kashmiri-English Parallel Corpus](https://huggingface.co/datasets/SMUQamar/Kashmiri-English-Parallel-Corpus) | Manually gated; CC BY-NC-SA 4.0 | Not downloaded; requires owner-approved access and non-commercial/share-alike compliance |
| [270K Kashmiri-English Dataset](https://huggingface.co/datasets/SMUQamar/Kashmiri-English-Dataset-270K) | Manually gated; CC BY-NC-SA 4.0 | Not downloaded or presented as training data used by this site |
| [Multilingual dictionary dataset](https://huggingface.co/datasets/Omarrran/kashmiri_multilingual_dictionary_dataset) | Manually gated | Not imported; access approval needed |
| [Structured Grierson dictionary](https://huggingface.co/datasets/Omarrran/The_Grierson_Kashmiri_dictionary) | Manually gated, license unresolved | Not imported; no access bypass |
| [Kashmiri Language Corpus](https://huggingface.co/datasets/nawabhussain/Kashmiri-Language-Corpus) | Ungated, Apache-2.0 card; mixed-source monolingual text | Not treated as English definitions or verified parallel translations |
| [Kashmiri text dataset](https://huggingface.co/datasets/Aadilgani/kashmiri-text-dataset) | Ungated, no listed license | Not copied into this expansion |
| Speech, instruction and synthetic reasoning datasets | Audio/transcripts or generated training examples are not necessarily reviewed lexical definitions | Not converted into fabricated word meanings |

This is an audit of useful candidates, not a claim that every resource online was found or licensed. No new training/fine-tuning has been performed. Corpus access, careful alignment, native-speaker review and held-out evaluation are necessary for a credible improvement in translation accuracy.

## Neural translation

AI4Bharat IndicTrans2 models support `eng_Latn` and `kas_Arab`. Public ONNX INT8 exports by Hari31416 are used under their listed MIT license. Both sizes are supported; model capacity is not an accuracy guarantee.

| Mode | English → Kashmiri | Kashmiri → English | Approximate first download per direction |
| --- | --- | --- | --- |
| Standard · 200M | [Model](https://huggingface.co/hari31416/indictrans2-en-indic-dist-200M-ONNX-int8) | [Model](https://huggingface.co/hari31416/indictrans2-indic-en-dist-200M-ONNX-int8) | 260–310 MB |
| Large · 1B · desktop | [Model](https://huggingface.co/hari31416/indictrans2-en-indic-1B-ONNX-int8) | [Model](https://huggingface.co/hari31416/indictrans2-indic-en-1B-ONNX-int8) | 1.1–1.2 GB; several GB of runtime memory |

`assets/translation-worker.mjs` pins each model's full revision, uses ONNX Runtime Web 1.21.0 (MIT) and Transformers.js 3.0.2 (Apache-2.0) tokenizers. Inference uses a single-threaded WASM worker and three-beam decoding; no cross-origin-isolation headers or API key are required. Only one model is kept loaded at a time. Cache Storage is best-effort; a storage limit or private-browsing policy can cause repeat downloads.

Input processing adapts the English/Perso-Arabic path described by [IndicTransToolkit](https://github.com/VarunGumma/IndicTransToolkit) (MIT): language tags, punctuation/digit normalization, basic entity placeholders, shared Arabic vowel-mark normalization, and output punctuation cleanup. This focused browser implementation is not the complete Python toolkit or its full Moses/UrduHack pipeline. It preserves Kashmiri-specific letters/signs; it does not relabel the language as Urdu. Romanized Kashmiri sentence input is not supported.

Sentences are segmented before inference. Inputs exceeding a model's 256-token source limit are rejected explicitly rather than silently truncated. A generation-limit warning is shown if output cannot complete within 128 decoding steps. Machine translation can omit information, mistranslate polysemous words, repeat words or alter names/numbers; important translations need fluent-speaker review.

Browser smoke tests demonstrate that both directions run and produce output; they are not evidence of world-leading translation accuracy. The exported models' parity scores compare quantized outputs with the original model, not with human correctness.

The public website is static. Sentences are not sent to a translation service. Model/runtime downloads contact Hugging Face and jsDelivr; dictionary fonts contact Google Fonts. Users can stop downloads/inference or clear this site's model cache.
