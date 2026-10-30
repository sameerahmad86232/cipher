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

## Adhan notification recording

“Adhan wiki”, Jarih (2007), Wikimedia Commons. Source: https://commons.wikimedia.org/wiki/File:Adhan_wiki.oga . Used under CC BY-SA 3.0: https://creativecommons.org/licenses/by-sa/3.0/ . Android resource `android/app/src/main/res/raw/adhan.ogg` is a format conversion to Ogg Vorbis of the complete 26.56-second recording, with no content edits. This recording and its conversion remain CC BY-SA 3.0. Attribution and license link are also displayed in Adhan & prayer alerts settings. This recording has no additional Fajr phrase.

## Additional adhan recordings

- “Adhan”, Aishatu98, own work, CC0 1.0. https://commons.wikimedia.org/wiki/File:Adhan.ogg ; https://creativecommons.org/publicdomain/zero/1.0/ . Resource `adhan_cc0.ogg`, complete 42.10-second recording converted to Ogg Vorbis.
- “Azan”, Andrewler, own work, CC BY-SA 4.0. https://commons.wikimedia.org/wiki/File:Azan.ogg ; https://creativecommons.org/licenses/by-sa/4.0/ . Resource `adhan_andrew.ogg`, complete 183.48-second recording converted to Ogg Vorbis. Its conversion remains CC BY-SA 4.0.

No content edits, celebrity identity claims or voice cloning. Recording metadata is not independent religious or performance-quality certification. Android may limit notification sound duration; the optional focus service plays its selected recording until dismissed or completed.


## Madinah call to prayer (1.14)

- **Recording:** "33937 ejaz215 call-to-prayer-from-the-prophet-s-mo.ogg" / "Islamic call to prayer from the prophet mosque".
- **Author/recordist:** ejaz215; Wikimedia Commons contributor Nater uploaded the original recording.
- **Original source:** https://commons.wikimedia.org/wiki/File:33937_ejaz215_call-to-prayer-from-the-prophet-s-mo.ogg
- **Licence:** Creative Commons Attribution 3.0 Unported (CC BY 3.0) — https://creativecommons.org/licenses/by/3.0/
- **Changes:** None. The original Ogg Vorbis recording (approximately 186.55 seconds) is copied unmodified into Android raw resources when building the app. The CI script validates the original Wikimedia Commons SHA-1 checksum `4aa432b9e44804e7d72af4429bd743aa5fa9e3a4`.
- **Attribution:** The recording is separately copyrighted and is not covered by this repository's general source code licence. Its use does not imply endorsement by the performer, the Prophet's Mosque, Wikimedia Commons or the recordist.
- **Availability:** `bash tools/fetch_madinah_adhan.sh` from `apps/koshur_noor` downloads and verifies the licensed asset before Flutter tests and Android builds. The app plays the bundled sound offline after installation; no in-app network access is added. 


## Tasbih audio (1.15)

- The wooden-bead SFX are original audio synthesised locally on the Android device from deterministic damped resonances and low-amplitude noise. No third-party sound sample or audio pack is copied or downloaded. Android's SoundPool plays them at a deliberately restrained volume.
- Spoken dhikr uses a user-installed **offline Android text-to-speech voice** when available, not an external voice service, prerecorded narration or a particular imam's voice. The user's Arabic language TTS data is provided and licensed separately by their device's text-to-speech provider. No prerecorded audio, remote requests, or cloned voices are required by the app. Audible results vary by phone and installed Arabic TTS engine.
