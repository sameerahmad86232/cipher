# Dictionary sources

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

The modern-script dictionary now contains **23,630 meaning records across 14,986 NFC-normalized headwords**, plus **1,818 distinct sourced word-form spellings**. These are different measures, not 23,630 distinct Kashmiri words. A separate historical romanized collection has 20,643 records across 20,532 headwords. Source forms can overlap existing headwords and include multiple grammatical analyses of one spelling.

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
