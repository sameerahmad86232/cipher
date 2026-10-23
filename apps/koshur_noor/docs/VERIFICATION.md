# Verification — 23 October 2026

- Flutter 3.47.7, Dart 3.13.5.
- `flutter analyze`: no issues found.
- `flutter test`: 10 tests passed. Includes selected-city timezone, DST, tomorrow Fajr rollover, five-prayer/sunrise distinction, Hanafi Asr, minute adjustments, 11 cities × 4 methods × 4 months, retained content provenance, persistence, 390px phone navigation/search/detail/tasbih/settings and 320px large-text navigation.
- Srinagar 2026-10-23 Karachi/Hanafi times compared against AlAdhan API (method 1, school 1, Asia/Kolkata): all six events within two minutes. This is one independent reference case, not certification of every location/date.
- `flutter build web --release --no-web-resources-cdn --no-wasm-dry-run`: success. Local browser render checked at 390×844; screenshots retained outside source. No JavaScript exceptions.
- Android arm64 APK build is tracked in delivery notes. No physical Android phone or emulator available for installation testing.

Kashmiri meanings have not been independently reviewed. They remain explicitly marked drafts. App versions do not guarantee 99% translation accuracy. Background prayer alarms, adhan/TTS and a device-heading compass are not implemented or represented as working.
