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

The modern-script dictionary now contains **58,454 records across 49,682 NFC-normalized searchable headwords**: 23,953 meaning records, 23,377 clearly labeled OCR-only vocabulary records, and 11,124 licensed corpus-vocabulary records, plus **1,818 distinct sourced word-form spellings**. These are different measures, not counts of distinct Kashmiri words. A separate historical romanized collection has 20,643 records across 20,532 headwords. Source forms can overlap existing headwords and include multiple grammatical analyses of one spelling.

## Kashmiri orthography notes v32

The site incorporates structured language assets from [Richard Ishida's Arabic (Kashmiri) Nastaliq orthography notes v32](https://r12a.github.io/scripts/arab/ks.html), retrieved 3 October 2026. The project owner reports permission for public use. `assets/kashmiri-orthography.json` preserves the character spreadsheet, Kashmiri letters and combining marks, native digits and punctuation, 504 example glosses with IPA/transcription where supplied, and a concise set of writing rules. The 504 examples are added as attributed lookup records; orthography rules are not treated as word meanings. The source describes NFC/NFD handling, Kashmiri vowel visibility, aspirated digraphs, palatalisation, jazm placement, right-to-left layout and Kashmiri-specific characters. The translator’s Kashmiri input normalizer now applies the source’s core Kashmiri letter equivalences (`ك`/`ک`, `ي`/`ی`, `ى`/`ی`, `ه`/`ہ`) before model preprocessing.

The complete guide is bundled locally at [`/orthography.html`](orthography.html), with its sections, examples and tables preserved for in-site reading. `assets/transliteration.mjs` applies the source character mappings to provide a Romanized reading for Kashmiri translator output. Dictionary records that lacked a source transliteration were filled by `scripts/add-generated-transliterations.mjs`; those values carry `trGenerated: true` and `trSource` so they can be reviewed separately from published source spellings.

The practical [`language-guide.html`](language-guide.html) is an editorial synthesis built on the orthography notes and attributed dictionary examples. It explains the script, sounds, word structure, cases, sentence patterns, TAM and agreement, negation, questions, transliteration and proofreading workflow. It is deliberately descriptive: dialect-sensitive forms and unresolved paradigms are marked for fluent-speaker review rather than presented as universal rules.

## Open Kashmiri book OCR

The searchable `assets/kashmiri-school-textbooks-ocr.json` and `.txt` assets contain page-level machine OCR from two Kashmiri Perso-Arabic sources retrieved from Internet Archive. **Aagarnamah**, by Ghulam Mohammad Lone, is licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) and contributes 212 pages ([source](https://archive.org/details/Aagarnamah)). **An Advance Course in Kashmiri**, by Soom Nath Raina, is licensed [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) and contributes 278 pages ([source](https://archive.org/details/dli.language.2242)). The Koul learner dictionary contributes 140 pages under the project owner's reported rights-holder permission. OCR was run locally with Tesseract `ara+eng`, page images rendered at 300 dpi. The output is labeled machine OCR; its 5,754 unique Arabic-script words are also included in `assets/dictionary.json` as clearly labeled OCR vocabulary records with generated transliteration and page references. Existing definitions are preserved, while OCR-only records do not claim an English meaning that the books do not provide.

The orthography asset records the 38 Arabic-script characters observed in these OCR pages, with code points and counts. Dictionary search folds common OCR variants (`أ`, `إ`, `ك`, `ي`, `ى`, `ه`, `ة`) to the project’s Kashmiri forms, and the translator normalizer accepts the same variants. The Romanization module has fallback mappings for those observed characters and native Arabic-Indic digits.

Each OCR page now stores the original `text`, a conservative `normalizedText`, and a `transliteration`. Normalization is limited to NFC and documented script variants; uncertain words are not silently rewritten. Dictionary records retain their source transliterations, and generated ones remain marked for review.

## Kashir Dictionary seven-volume reference OCR

The site now includes a page-preserving search layer for all seven volumes of the [Kashir Dictionary series](https://archive.org/details/in.ernet.dli.2015.510168) associated with the Jammu and Kashmir Academy of Art, Culture and Languages. The individual archive records are [volume 1](https://archive.org/details/in.ernet.dli.2015.510168), [volume 2](https://archive.org/details/in.ernet.dli.2015.510170), [volume 3](https://archive.org/details/dli.ernet.241981), [volume 4](https://archive.org/details/dli.ernet.241982), [volume 5](https://archive.org/details/dli.ernet.241983), [volume 6](https://archive.org/details/in.ernet.dli.2015.241984) and [volume 7](https://archive.org/details/in.ernet.dli.2015.510171). The collection contributes **2,710 scanned pages** to `assets/kashir-dictionary-ocr.json` and `assets/kashir-dictionary-ocr.txt`.

The archive metadata does not state a reuse license for these scans. The project therefore keeps this as a clearly labeled, source-linked research and review layer and links each result back to its Internet Archive page. Its **18,074 new OCR-only rows** are searchable in the main dictionary, but they deliberately carry no invented English meaning: the card says “OCR vocabulary word” and exposes the source page and transliteration. This is a vocabulary-preservation import, not a corrected scholarly transcription. Arabic-script OCR errors, column-order errors and missing vowel marks are expected. Verify a headword against the page image and obtain the rights holder’s permission before redistributing scans or publishing extracted definitions. The reproducible builder is `scripts/build-kashir-ocr.py`; the normalization/transliteration pass is `scripts/enrich-kashir-ocr.mjs`; the dictionary merge is `scripts/add-kashir-vocabulary.mjs`.

## Reading library: grammar, textbooks and translations

The new reading collection adds **2,813 page OCR records from ten linked scans**: *Kashur Grammer*, *Kaishrik Grammer*, the JKBOSE eighth-standard textbook, Kashmiri translations of the *Bhagavad Gita*, *Othello*, *Raja Tarangini*, *Lole Gita* and *Sumran*, [Grierson’s 1932 dictionary scan](https://archive.org/details/in.ernet.dli.2015.24175), and the [Koul–Bhat–Raina learner dictionary scan](https://archive.org/details/dli.language.2243). Use the website’s “Grammar, textbooks & dictionaries” collection to search snippets and open the exact Internet Archive page. Each page keeps raw OCR, a conservative normalized view and a generated transliteration.

These archive records do not consistently state a reuse license. The Grierson archive metadata says public domain, while the structured DSAL edition carries different terms; the site therefore keeps its scan as source-linked OCR for review and does not bulk-import its definitions. The Koul learner-dictionary record reports CC BY-NC 4.0. These records are provided as source-linked reading and review material; the project does not present OCR text as a verified translation, grammar rule or English definition. The source links, authors and categories are preserved in `assets/kashmiri-reading-ocr.json`. The reproducible builder is `scripts/build-reading-ocr.py`, and the normalization/transliteration pass is `scripts/enrich-reading-ocr.mjs`. Check the scan and rights status before redistributing excerpts or publishing a corrected edition.

The OCR linker and vocabulary import attach 28,582 `OCR occurrence` page references across known and OCR-only records. These links document where a word appears in the books; they do not create an English meaning or retrain the sentence model.

## Transliteration and spelling corrections

The Romanization module previously skipped the documented variant-spelling equivalences and deleted any Arabic-script character that had neither a rule nor a fallback entry. That deletion produced readings that looked plausible but were wrong in both directions: `منٛز` (*manz*, "in") romanized as `mnż`, and `ییٚتی` lost its `e`.

**Identifying what the marks actually are.** The decisive source is the **"Confusables & spelling errors"** table in this project's own `orthography.html`, which records the incorrect code point and the character that should have been used. It settles the question that the earlier note in this file got wrong: `U+065B` `ٛ` is **not** a Kashmiri vowel sign. The guide states that it "looks like the Kashmiri jazm, [but] it was introduced to Unicode to serve as a vowel sign for African languages", that "the correct semantic character should be used", and that the lookalike "will cause problems for interoperable use of your text". It is therefore a mis-encoding of `U+0652` (sukun/jazm), which marks *absence* of a vowel — so eliding it from a romanization was right, while treating it as an unknown vowel was not. The relevant `orthography.html` sections are `confusables`, `jazm_placement`, `novowel` and `vowel_grid`.

Six documented confusables were not applied at all, affecting **6,079 records (10.4% of the dictionary)**:

| Incorrect | Correct | Records | Guide's reasoning |
| --- | --- | --- | --- |
| `U+065B` `ٛ` | `U+0652` `ْ` | 2,743 | Lookalike jazm; the sukun code point carries the intended meaning. |
| `U+06CD` `ۍ` | `U+0620` `ؠ` | 1,620 | Pashto YE (`əi`) used where the word-final KASHMIRI YEH belongs. |
| `U+066E U+06EA` `ٮ۪` | `U+0620` `ؠ` | 464 | Incorrect KASHMIRI YEH used when the Farsi yeh was unavailable; "corrupt[s] the semantics of the text stream". |
| `U+06C5` `ۅ` | `U+06C4` `ۄ` | 224 | Kirghiz OE instead of WAW WITH RING. |
| `U+0626` `ئ` | `U+06CC U+0654` `یٔ` | 260 | The precomposed form decomposes onto an Arabic yeh base; the hamza must be kept. |
| `U+0643` `ك` | `U+06A9` `ک` | 111 | Arabic KAF instead of Keheh; fonts hide the difference but search and comparison break. |

Changes made:

1. `assets/kashmiri-text.mjs` now implements all six documented confusables, ordered so the specific sequences run before the general letters they contain. This is the function used by search folding, translator input normalization and the OCR enrichment pass, so one fix corrects matching and romanization together.
2. `assets/transliteration.mjs` applies the documented equivalences before romanizing, so Arabic yeh/kaf/heh/teh-marbuta forms reach the rules written for the Kashmiri forms.
3. A character with no rule and no fallback is passed through unchanged instead of being dropped, so an unknown mark stays visible and reviewable rather than disappearing into a wrong reading. This matches the existing principle in this document that uncertain words are not silently rewritten.
4. `autocorrectKashmiri` re-normalizes with NFC **after** replacing. Some corrections swap one combining mark for another with a different canonical combining class (`U+065B` 230 → `U+0652` 34), and NFC reorders marks by class, so without the second pass the function was not idempotent. It is now verified idempotent across all 58,454 headwords and 20,000 generated fuzz strings.

**Measured effect.** Readings that were nonsense or misleading are now correct: `پٮ۪ٹھ` romanizes as `pʲʈʰ` rather than `pb۪ʈʰ`, `ہُپٲرۍ` as `hupə̄rʲ` rather than `hupə̄ry`, `ژۅپٲرۍ` as `ʦɔpə̄rʲ`, `لٮ۪کٕہ` as `lʲkɨh`, and `منٛز` as `mñż`, because `نْ` is the documented nasalisation digraph. Because three of the corrections are letter-level, search keys now agree, so a record stored as `پٮ۪ٹھ` is now findable by typing the correct `پؠٹھ` — verified by comparing `fold()` output, which is now identical for each corrected pair.

Regenerating the stored data via `scripts/regenerate-transliterations.mjs` changed **3,996 `tr` values**. A field-by-field comparison of all 58,454 records against the previous revision confirmed **zero differences in any other field** — no headword, meaning, part of speech, source, reference or form was touched. Hand-authored transliterations were not rewritten, and stored headwords are deliberately left as the source spells them; normalization is applied when searching and romanizing rather than by rewriting the corpus.

**Remaining, reported rather than guessed.** **960 transliterations still contain Arabic script** (942 machine-generated and 18 hand-authored, for example `trụٛh` for `ترٕٛہ`). After the confusables fix this is no longer Kashmiri vowel information but non-Kashmiri material: Arabic case endings (`ً` U+064B, `ٌ` U+064C, `ٍ` U+064D), Quranic recitation marks (`ۭ` U+06ED, `ۡ` U+06E1, `ۖ` U+06D6, `ۚ` U+06DA), superscript alef (`ٰ` U+0670) and letters belonging to other languages (Pashto `ړ` U+0693, Sindhi `ڪ` U+06AA, Kirghiz `ۋ` U+06CB, `ګ` U+06AB, `ټ` U+067C). `orthography.html` documents no Kashmiri value for any of these, so none has been invented; they are left visible as evidence that the source text contains non-Kashmiri characters.

`scripts/test-dictionary.mjs` was also repaired: it imported modules with a bare `path.resolve(...)` result, which Node's ESM loader rejects on Windows with `ERR_UNSUPPORTED_ESM_URL_SCHEME`. Imports now go through `pathToFileURL`, and the suite runs green on Windows. One of its assertions had pinned the incorrect hamza-dropping behaviour of `U+0626`; it now asserts the guide's documented `06CC 0654` output.


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
| [FLORES-200](https://huggingface.co/datasets/facebook/flores) | CC BY-SA 4.0; Hugging Face files require access approval in this environment | Evaluation resource recorded for future use; no files copied without access
| [PALI PersoArabicLID](https://github.com/sinaahmadi/PersoArabicLID) | MIT; clean Perso-Arabic language-identification corpus | Imported only the `__label__kas` records with source and license metadata
| [English–Kashmiri 1M translations](https://huggingface.co/datasets/Omarrran/english-kashmiri-1m-translations) | Manual access; no machine-readable license on the dataset card; machine-generated translations | Not imported into definitions or model assets
| [Kashmiri multilingual dictionary](https://huggingface.co/datasets/Omarrran/kashmiri_multilingual_dictionary_dataset) | Apache-2.0 card; manual access approval required | Not downloaded; no access bypass
| [KS-LIT-3M Kashmiri corpus](https://huggingface.co/datasets/Omarrran/3.1Million_KASHMIRI_text_Pre_Training_Dataset_for_LLM_2026_by_HNM) | CC BY-SA 4.0 card; manual access approval required | Not downloaded; recorded as a future corpus source
| [Kashmiri news snippets](https://github.com/DeheemBhat/Multiclass-Classification-of-Kashmiri-News-Snippets-Dataset-Creation-and-Comparative-Evaluations) | Repository has no explicit license | Not redistributed; source recorded for future rights clarification
| [Grierson’s Dictionary of the Kashmiri Language](https://dsal.uchicago.edu/dictionaries/grierson/) | CC BY-NC-ND 2.0; no derivatives permitted | Linked as an external reference; not copied into the dictionary |
| [PanLex](https://panlex.org/) | CC BY-NC-SA 4.0; noncommercial/share-alike terms | Linked as a future lexical lookup source; no bulk import made |
| [FLORES+](https://huggingface.co/datasets/openlanguagedata/flores_plus) | CC BY-SA 4.0 card; Hugging Face access is gated | Evaluation resource recorded; no files copied without access |
| [600K-KS-OCR](https://arxiv.org/html/2601.01088) | Paper describes a synthetic OCR resource; redistribution file/license not provided at the linked paper | Paper recorded for OCR evaluation; no dataset copied |
| [Mozilla Common Voice](https://commonvoice.mozilla.org/en/datasets) | Dataset versions have their own terms and require download/account review | Speech resource recorded for future ASR work; no audio copied |
| [AI4Bharat IndicConformer Kashmiri ASR](https://aikosh.indiaai.gov.in/home/models/details/ai4bharat_indicconformer_automatic_speech_recognition_asr_model_for_kashmiri.html) | Model terms must be checked at the hosting portal | Speech model recorded; not used as dictionary or translation data |
| [Kashmiri text dataset](https://huggingface.co/datasets/Aadilgani/kashmiri-text-dataset) | Ungated, no listed license | Not copied into this expansion |
| Speech, instruction and synthetic reasoning datasets | Audio/transcripts or generated training examples are not necessarily reviewed lexical definitions | Not converted into fabricated word meanings |

This is an audit of useful candidates, not a claim that every resource online was found or licensed. No new training/fine-tuning has been performed. Corpus access, careful alignment, native-speaker review and held-out evaluation are necessary for a credible improvement in translation accuracy.

## OCR and translation resource index

`assets/kashmiri-resource-index.json` records the additional resources supplied for this project: [Koshur Pixel](https://huggingface.co/datasets/Omarrran/Koshur_Pixel), the [40K Kashmiri image dataset](https://huggingface.co/datasets/Omarrran/40K_kashmiri_text_and_image_dataset), [600K-KS-OCR](https://arxiv.org/abs/2601.01088), [IndicTrans2](https://github.com/AI4Bharat/IndicTrans2), [NLLB-200](https://huggingface.co/facebook/nllb-200-distilled-600M), and the [COIL-D Hindi–Kashmiri model](https://huggingface.co/COIL-D/translate-it2-hindi-kashmiri). It now also records the [Kashmiri Nastaliq LLM](https://huggingface.co/megaketu555/kashmiri-nastaliq-llm), [Bhasini resource hub](https://kashmirairesearch.online/resources), [KoshurOCR](https://github.com/Faizaniqbal52/KoshurOCR), [Koshur-Pixel toolkit](https://github.com/Faizaniqbal52/Koshur-Pixel), [KoshurAI](https://github.com/Faizaniqbal52/KoshurAI), [OCR.AD](https://ocr.ad/free-online-ocr-kashmiri), the [Koshur Diacritizer model](https://huggingface.co/Omarrran/koshur-diacritizer-byt5-small) and dataset, [Bolbosh](https://github.com/gaash-lab/Bolbosh), [kscp](https://github.com/erstan/kscp), and [OpenSLR 122](https://www.openslr.org/122/). The index preserves reported sizes and licenses. Gated raw files and model weights are not copied into this static site; the live translator continues to use the tested NLLB server endpoint.

The new resources are deliberately separated by function. The Nastaliq LLM is a text-generation reference, not a translation model. KoshurOCR and Koshur-Pixel are OCR research references; KoshurAI is an unlicensed architecture reference. The Apache-2.0 diacritizer model is public and reproducible, but its companion dataset is manually gated and the model has not been inserted into the production path without a Kashmiri-speaker evaluation. Bolbosh and kscp support speech work, while Bhasini and OCR.AD are external services whose terms, quotas and credentials remain with their operators. No resource with an absent repository license is copied into the site.

## KS-LIT-3M pretraining corpus

The paper [KS-LIT-3M](https://arxiv.org/abs/2601.01091) describes a **3.1 million-word** Perso-Arabic Kashmiri text stream with about **16.4 million characters** and **131,607 unique words**, spanning literary, journalistic, academic and religious writing. Its official dataset page is [Omarrran/3.1Million_KASHMIRI_text_Pre_Training_Dataset_for_LLM_2026_by_HNM](https://huggingface.co/datasets/Omarrran/3.1Million_KASHMIRI_text_Pre_Training_Dataset_for_LLM_2026_by_HNM). The raw files are currently access-restricted to this workspace, so the site stores the paper metadata in `assets/ks-lit-3m-reference.json` and links the official source.

The paper says the dataset is CC-BY-4.0, while the current Hugging Face card reports CC BY-SA 4.0. That license discrepancy must be resolved with the authors before copying the corpus, adding its words to the dictionary, or using it to train the translator. It is a monolingual pretraining corpus, so it would improve language fluency rather than provide English sentence alignments.

## Neural translation

The public website sends translation requests to the Hugging Face Space [Sameer0313/Koshur_lughat](https://huggingface.co/spaces/Sameer0313/Koshur_lughat). The Space runs `facebook/nllb-200-distilled-600M` with `kas_Arab` and `eng_Latn` on its server hardware. Visitors do not download model weights.

The server normalizes documented Kashmiri code-point variants, generates with three-beam decoding, returns a Kashmiri transliteration, repairs question punctuation, renders an unknown English token in Kashmiri script when needed, and reports conservative grammar checks. It loads the compact lookup built by `scripts/build-server-lexicon.py` and the source-backed phrase memory built by `scripts/build-server-phrase-memory.py`: exact reviewed words and example sentences are returned directly, while unseen sentences use NLLB. Sentence requests also show matching dictionary terms, and the server indexes the 8,336 licensed corpus sentences. This lookup layer supports the neural result; it does not pretend that monolingual corpus text is an English translation. The grammar layer does not invent case endings or claim native-speaker agreement. Romanized Kashmiri sentence input is not supported.

Machine translation can omit information, mistranslate polysemous words, repeat words or alter names/numbers; important translations need fluent-speaker review. Hugging Face’s free ZeroGPU service has usage quotas and may temporarily reject requests after the quota is exhausted.

**How the browser talks to the Space.** The client prefers the Space's named endpoints (`/gradio_api/call/translate`, and `/gradio_api/call/pipeline` for speech) because those are bound by name and survive a rebuild that reorders the interface, and it falls back automatically to the older `fn_index` queue API when a Space build exposes no named API. Both protocols are parsed, since they report results differently: the named API emits an SSE `complete` event carrying the raw result array, while the legacy queue API emits `process_completed` messages whose errors carry the model's own wording. The named API returns `error` with a null payload, so the client falls back to its own guidance text there and uses the legacy path's message when it is available.

**Startup, quota and failure handling.** The Spaces run on scale-to-zero hardware, so the first request after a quiet period is refused while the container starts. Rather than retrying blindly and reporting a connection fault, the client polls the Space's cheap `/gradio_api/info` health endpoint for up to 90 seconds, reporting "starting up" progress, and then retries. Requests are bounded by a five-minute ceiling and a 60-second idle watchdog, so a slow translation is not killed early but a genuinely dead stream is abandoned. It distinguishes and reports separately: a device that is offline (no wake wait is attempted), an unreachable or renamed Space, a rate limit, a Space that is starting, and **ZeroGPU quota exhaustion** — which is rewritten from Hugging Face's token-appeal wording into an actionable message that points users at the offline model. Requesting speech generation is cancelled by the same Stop control as translation. These paths are covered by a network test harness that exercises the real client functions against both live Spaces and against a local mock that reproduces the cold start.

The dictionary, OCR collections and grammar guide remain static assets and work without a model download. The public server keeps its model, compact lexicon and licensed corpus on the Space; browser visitors send text and receive the result without downloading those files.


## Licensed public Kashmiri corpus subset

The site adds `assets/kashmiri-public-corpus.json`, a sentence-level reading collection filtered from [Nawab’s Kashmiri Language Corpus](https://huggingface.co/datasets/nawabhussain/Kashmiri-Language-Corpus). The composite dataset contains sources with different or unclear terms, so this import includes only clearly identified subsets: **2,232 Kashmiri Wikipedia sentences** under CC BY-SA 4.0, **1,934 OpenSLR 122 sentences** under GPL-3.0-or-later, and **4,170 PALI Perso-Arabic Kashmiri clean-corpus sentences** under MIT. Gated SMUQamar parallel sentences, NLLB-derived rows without a compatible redistribution determination, and the unlicensed scraped web rows are excluded. PALI is a separate MIT-licensed Perso-Arabic language-identification corpus; only its `kas` records are included.

The corpus contributes **8,336 sentences** for source-linked reading and **11,124 unique corpus vocabulary forms** to `assets/dictionary-corpus.json`. These forms are labeled as corpus vocabulary and do not receive fabricated English meanings. Every record preserves its source URL and license. The reproducible import is `scripts/import-public-corpus.py`; `scripts/add-public-corpus-vocabulary.mjs` creates the dictionary vocabulary layer. This corpus is useful for search, reading and future licensed parallel-corpus evaluation; it does not retrain the live NLLB model automatically.

## Optional offline translation model

The Translator view offers an opt-in browser/mobile offline mode using the ONNX conversion [`Xenova/nllb-200-distilled-600M`](https://huggingface.co/Xenova/nllb-200-distilled-600M), loaded through Transformers.js. It supports the project’s `kas_Arab` and `eng_Latn` directions and is cached on the device after the first download; the project does not bundle the large weight files. The model card identifies the underlying Meta NLLB model and **CC BY-NC 4.0** terms. Users must review those terms before redistribution or commercial use. Device memory, storage, browser support and translation speed vary; online mode remains available as a fallback.

## Kashmiri text to speech

The Translator view can synthesize the Kashmiri side of a translation through GAASH Lab's public [`Matcha-TTS-Kashmiri`](https://huggingface.co/GAASH-Lab/Matcha-TTS-Kashmiri) model and [`Bolbosh`](https://github.com/gaash-lab/Bolbosh) framework. The released model supports Perso-Arabic Kashmiri, male and female speaker choices, and several inference-quality settings. The model card and repository identify the release as MIT licensed. Audio generation runs on GAASH Lab's public demo service; this project does not claim to have trained that checkpoint. Bolbosh reports training on 33,182 utterances, validation on 4,542 utterances, and testing on 2,272 utterances from Rasa and IndicVoices. Generated speech remains automatic output and should be reviewed by fluent speakers.
