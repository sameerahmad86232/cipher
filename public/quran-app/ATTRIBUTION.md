# Koshur Quran: source & attribution

This interface is an independent reading experience built for the Koshur Quran domain.

Quran metadata, Arabic verses, and translations are sourced from [izan-majeed/kaeshur-quran-data](https://github.com/izan-majeed/kaeshur-quran-data), snapshot commit \`5515d1ee652300924065a5f5c16f49b63c2d5a79\`. The repository code is MIT licensed; a copy of its LICENSE is retained in DATA-LICENSE.txt. Textual translations remain attributed to the original named translators and should not be assumed to carry independent reuse rights beyond the upstream source's rights.

Translations available in the reader:
- Kashmiri — Athar Manigami (ID 300)
- Kashmiri — Mirwaiz Muhammad Yousuf Shah (ID 301)
- English — Saheeh International (ID 20)
- Roman-script Kashmiri versions (IDs 400 and 401)
- Urdu — Fatah Muhammad Jalandhari (ID 234)

Data loading: Surah metadata and the opening chapter are bundled locally; all remaining chapters are loaded on demand from jsDelivr or GitHub at the pinned source revision. An internet connection is required for non-bundled chapters.

Duas reference the Qur'an by surah and ayah and fetch original text from the same source.

## Sahih al-Bukhari Kashmiri Hadith reader

The Hadith section includes Sahih al-Bukhari numbers **1–100**. Kashmiri narrations **1–26** preserve owner-approved wording from `training-data/hadith-corrections/approved-passages.jsonl`. Kashmiri narrations **27–100** are **new AI-assisted drafts that have not yet been owner-approved**, even though the separate 66-expression vocabulary review is complete. Each unapproved narration is labelled prominently in the reader.

The Arabic originals for Hadith 21–100 are sourced from [AhmedBaset/hadith-json, pinned v1.2.0](https://github.com/AhmedBaset/hadith-json/tree/v1.2.0/db/by_chapter/the_9_books/bukhari), a transcription derived from Sunnah.com. Each card links directly to the canonical [Sunnah.com Sahih al-Bukhari](https://sunnah.com/bukhari) reference. The corresponding English source text informed the Kashmiri drafts but is not republished in the app.

The owner's vocabulary corrections remain in the separate 66-item review ledger. Corrections made in the website UI remain locally on the user's device until manually copied and shared; no browser note is automatically marked approved. Some approved vocabulary corrections supplied in Romanized Kashmiri remain Romanized within the drafts until exact Kashmiri-script spellings are confirmed.

The preexisting Kashmiri Seerah chapters remain accessible at /seerah/index.html, while the existing dictionary application remains on the original Vercel site.
