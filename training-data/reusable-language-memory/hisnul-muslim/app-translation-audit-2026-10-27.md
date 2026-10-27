# Hisnul Muslim app translation audit — 2026-10-27

This audit integrates only corrections supported by the project owner's saved feedback. It uses the dictionary as terminology evidence, not as authority for complete religious translations.

## Applied to the app

| Book entry | Corrected concept | Evidence |
| --- | --- | --- |
| 20 | `بِوَجْهِهِ الْكَرِيمِ` and `سُلْطَانِهِ الْقَدِيمِ` | Exact owner wording in `correction-ledger/owner-corrections-02.json` |
| 21 | `فَضْلِكَ` | Owner wording “تہنز مہربانی یا فیاضی” in `correction-ledger/vocabulary-owner-01.json`; also removes the broken app text `چُھنے فَضل` |
| 62 | `بَرْدَ الْعَيْشِ بَعْدَ الْمَوْتِ` | Owner correction `waajean zindagi`, with saved native-script draft, in `correction-ledger/vocabulary-item-41-correction.json` |
| 63, 65 | `الصَّمَدُ` | Full displayed phrase explicitly approved in `correction-ledger/vocabulary-item-43-approved.json` |

All five complete duas remain `draft-awaiting-owner-review`. The evidence approves words or phrases, not the complete composed translations.

## Preserved without change

- The 184 owner-approved entries numbered 78–261 remain byte-for-byte aligned with `approved-entries-78-261.json`.
- Entry 26 already contains the owner's saved correction.
- Entry 47 was not changed: its Arabic contains `بِمُعَافَاتِكَ`, while the phrase approval in the ledger is for `عَفْوِكَ`. These must not be treated as the same source phrase without a new review.
- Entry 32 was not changed: the owner supplied a corrected explanation of `الْمُقَدِّمُ وَالْمُؤَخِّرُ`, but the ledger explicitly says that its grammar in the complete prayer still depends on context.

## Still requiring owner review

Entries 1–77 remain drafts. Roman-only corrections and unresolved vocabulary questions were not converted into native-script app text. Future changes should preserve Arabic meaning, prayer register, person, gender, number, and tense, and should cite the exact correction record used.
