# Kashmiri hadith translation method

This project uses a no-GPU linguistic training layer before attempting further Sahih al-Bukhari translation.

## Evidence hierarchy

1. Project-owner-approved Kashmiri hadith translations and corrections.
2. Source-attested English–Kashmiri sentence pairs.
3. Licensed parallel/monolingual corpus patterns for frequency evidence.
4. Dictionary and grammar-book evidence.
5. OCR text only as a search lead until a person checks it against the scanned page.

Lower tiers never overwrite a higher-tier approved form automatically. Draft hadith translations are excluded from gold examples.

## Required record fields

Every published record should preserve the collection, book, hadith number, narrator, Arabic text, English reference, Kashmiri translation, source URL, revision number and review status. `approved-by-project-owner` must only be assigned after explicit review.

## Translation pass

1. Segment the narration without removing meaningful repetition.
2. Retrieve approved terminology and similar reviewed clauses.
3. Produce a Kashmiri draft with respectful reporting language and Perso-Arabic orthography.
4. Check tense, person, number, gender, case, perfective-transitive agreement, postpositions and relative–correlative constructions.
5. Compare every clause with the Arabic and English reference for omissions or additions.
6. Keep the result marked `draft` until a competent reviewer approves it.

The generated `hadith-language-profile.json` contains corpus frequencies and construction examples. These are linguistic evidence, not proof that every corpus sentence is correct.
