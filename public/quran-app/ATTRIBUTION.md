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

Duas reference the Qur'an by surah and ayah and fetch original text from the same source. The Hadith section links to original collections on Sunnah.com and does not claim to contain translated Hadith text.

The preexisting Kashmiri Seerah chapters remain accessible at /seerah/index.html, while the existing dictionary application remains on the original Vercel site.
