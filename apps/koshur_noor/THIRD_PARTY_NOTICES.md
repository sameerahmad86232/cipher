# Attribution and rights

- Flutter SDK / engine: BSD-style licences. Bundled through Flutter's generated runtime and licence registry.
- adhan_dart 2.0.1: MIT; prayer-timetable, port of Adhan by Batoul Apps. Used for astronomical calculations and Qibla bearing. See included `licenses/adhan_dart-MIT.txt`.
- timezone: BSD-2-Clause; uses the IANA timezone database. Package licences included by Flutter's licence registry.
- shared_preferences and platform implementations: Flutter/Dart ecosystem BSD-style licences; see runtime Open-source licences screen and pubspec.lock.
- intl: BSD-3-Clause; see package licence and runtime registry.
- Cormorant Garamond Medium: Cormorant Project Authors, SIL Open Font License 1.1. Font reused from the project’s licensed reader assets; full notice in assets/fonts/classical-serif-OFL.txt and registered in-app.
- Amiri Regular: The Amiri Project Authors, SIL Open Font License 1.1. Downloaded from google/fonts/ofl/amiri; full notice in assets/fonts/amiri-OFL.txt, registered in-app.
- Noto Nastaliq Urdu and Noto Naskh Arabic: SIL Open Font License 1.1. Fonts and full notices are in assets/fonts. Also registered in-app.
- Arabic Quran excerpts are scripture, manually entered here with verse references; no third-party translation corpus or audio is included. Arabic transcription and references should be reviewed alongside meanings.
- Arabic hadith texts: manually entered prophetic text with collection/number references. Chains of transmission are omitted and excerpts explicitly marked. No third-party translation corpus was imported. Reference pages returned HTTP 403 during this update, so live external verification was unavailable. Content should receive editorial review.
- Kashmiri meaning drafts: newly authored for this app using the owner's corrections as guidance. They are not certified or independently reviewed.
- Mosque/valley artwork and app icons: original geometric artwork created for this project; no stock image or external image service.

No recorded audio, commercial corpus, non-commercial model weights, or neural model is bundled. Open-source licences are accessible from Settings. Check all applicable distribution and source-content rights before a public commercial release.

## Device integration added in 1.3

- geolocator 14.1.2 and platform implementations: MIT (Baseflow); full root notice in licenses/geolocator-MIT.txt. Android implementation uses Android/Google system location APIs; no location server or paid API is configured by this app.
- flutter_timezone 5.1.1: Apache-2.0; full notice in licenses/flutter_timezone-Apache-2.0.txt. Used only to identify the device’s timezone for GPS prayer dates.
- Native true-north sensor bridge and all sunset/mosque/compass vector artwork: original project code. Android SensorManager and GeomagneticField platform APIs are used; no third-party heading model or compass dataset is bundled.
- Dependency licences are also bundled in Flutter’s generated licence registry. The reference image inspired the palette and layout; no reference image file is embedded in the app.

## Sunset background (1.4)
`assets/images/jamia-inspired.png` is generated artwork inspired by Jamia Masjid,
Srinagar, created for this app. It is an illustrative reconstruction, not a
photograph, surveyed architectural record, or third-party licensed photo.
