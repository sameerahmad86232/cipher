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

Long definitions, descriptions of inflections and proverbs are marked `lexical: false` so they remain searchable without being used as direct word substitutions by the experimental sentence translator.
