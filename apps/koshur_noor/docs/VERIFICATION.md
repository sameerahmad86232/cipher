# Verification — 23 October 2026

- Flutter 3.47.7, Dart 3.13.5.
- `flutter analyze`: no issues found.
- `flutter test`: 10 tests passed. Includes selected-city timezone, DST, tomorrow Fajr rollover, five-prayer/sunrise distinction, Hanafi Asr, minute adjustments, 11 cities × 4 methods × 4 months, retained content provenance, persistence, 390px phone navigation/search/detail/tasbih/settings and 320px large-text navigation.
- Srinagar 2026-10-23 Karachi/Hanafi times compared against AlAdhan API (method 1, school 1, Asia/Kolkata): all six events within two minutes. This is one independent reference case, not certification of every location/date.
- `flutter build web --release --no-web-resources-cdn --no-wasm-dry-run`: success. Local browser render checked at 390×844; screenshots retained outside source. No JavaScript exceptions.
- `flutter build apk --release --target-platform android-arm64`: success, 19.4 MB. APK signature verified with apksigner; application ID com.koshur.koshur_noor, minimum Android SDK 24. Development-signed preview. Release manifest has no INTERNET or location permission and disables Android backup. No physical Android phone or emulator available for installation testing.

Kashmiri meanings have not been independently reviewed. They remain explicitly marked drafts. App versions do not guarantee 99% translation accuracy. Background prayer alarms, adhan/TTS and a device-heading compass are not implemented or represented as working.

## Version 1.1: Hadith and Arabic typography

- Twelve Flutter tests passed, including all previous checks plus hadith reference/ID/review metadata and hadith search, saved favourites and Arabic size persistence at 320px with larger text. A font-control row overflow found during testing was fixed.
- Amiri Regular from Google Fonts: SIL OFL verified and bundled. Arabic remains RTL, selectable and independently resizable; Kashmiri remains Nastaliq.
- Eight hadiths, with narrator and collection/number; chain omission and excerpts are explicitly labelled. Kashmiri meanings remain review drafts. Live source pages returned HTTP 403, so this is not a claim of independent scholarly verification.
- Mobile web preview inspected: hadith library and Arabic reader rendered with no JavaScript exceptions. APK and web production builds checked after final layout changes. Physical device installation remains untested.
