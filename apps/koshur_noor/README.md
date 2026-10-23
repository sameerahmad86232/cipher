# Koshur Noor — نوٗر

A Flutter Android/web prayer companion with offline astronomical prayer calculations, Kashmir-first locations, Arabic duas and Kashmiri meaning drafts in bundled Nastaliq. Original vector valley/mosque illustrations, warm paper/forest theme, night palette and larger-text option.

## Working features

- Five prayers plus clearly distinguished sunrise, next-prayer countdown and date rollover.
- Eleven manually selected cities, IANA timezones with daylight-saving handling.
- Karachi, Muslim World League, Egyptian and Moonsighting Committee methods; Hanafi/standard Asr and ±15-minute prayer adjustment.
- Monthly timetable and Qibla bearing clockwise from true north. Qibla is a **fixed bearing guide, not a live compass**.
- Twelve sourced Arabic supplications with Kashmiri meaning drafts, categories, diacritic-insensitive search, bookmarks, copy and correction templates.
- Private per-city/per-date prayer log and persistent tasbih counter with selectable targets and reset confirmation.
- Offline Android operation, no account, analytics, tracking, API keys or server.

## Build

Flutter 3.47.7 / Dart 3.13.5 used for validation. Java 21 and Android SDK required for Android builds.

```sh
flutter pub get
flutter analyze
flutter test
flutter run
flutter build apk --debug
flutter build web --release --no-web-resources-cdn
```

The debug APK is for sideloading/testing. Configure your own signing key for Play Store distribution; never commit a keystore or signing passwords. Existing generated release configuration uses the development signing key and is not a production publishing setup.

## Content review

Arabic is retained separately from the Kashmiri meanings. All meanings are `draft-awaiting-owner-review` in `assets/data/duas.json`. Quran snippets are explicitly labelled as excerpts. No accuracy percentage is claimed. Review grammar, orthography and meaning with a fluent Kashmiri reviewer before marking translations verified. The app exposes copyable correction templates and a full JSON review export in Settings. Prior owner corrections guide wording; they do not automatically verify new text.

Prayer calculations are not mosque iqamah times. Confirm the local calculation convention and timetable. Default: Srinagar, Karachi, Hanafi. No background alarms, adhan playback, live compass, GPS tracking or generated speech are included in this version.

Web rendering uses Flutter; the first web load needs its assets. Android bundles the fonts, text and calculation code. User data is stored in local preferences and can be removed by clearing app storage. Clipboard copying is explicit.

See [third-party notices](THIRD_PARTY_NOTICES.md) and [verification notes](docs/VERIFICATION.md).
