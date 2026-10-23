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

## Version 1.2: Classical manuscript design

- Ivory/forest/antique-gold palette, Cormorant Garamond headings, locally painted illuminated frames, architectural prayer cover and Arabic invocation header. Arabic and Kashmiri content are unchanged. Decorative paintings ignore pointer events.
- Twelve tests passed after fixing the prayer clock’s narrow-width layout. Existing 320px large-text, search, saved content, counter, prayer calculation and reader controls continue to pass. Analyzer clean.
- Final Android and web release builds succeeded. Mobile screenshots inspected at 390×844; browser reported no JavaScript exceptions. APK signature verified; application version 1.2.0, build 3. No physical-device installation test was available.

## Version 1.3: reference palette and live Android Qibla

- Eighteen tests pass. New tests cover compass angle wrapping and alignment, GPS/timezone/accuracy persistence, invalid stored coordinates, injected heading/calibration state, GPS application to prayer coordinates, disabled-GPS enable dialog and no-sensor fallback. Device service interfaces use fakes only in tests; release code uses Android sensors and Geolocator.
- Native SensorManager bridge calculates true heading by applying GeomagneticField declination at the selected/GPS coordinates. Rotation-vector and accelerometer/magnetometer paths are implemented, with orientation remapping, throttled updates and lifecycle cleanup.
- Tab fade/slide, zikr count and short-angle compass animations honor reduced-motion settings. Reference-inspired coral/peach/cream/cocoa styling and launcher/splash assets replace the earlier green manuscript cover.
- Browser screenshots cover all five main tabs and Qibla. Browser mode truthfully shows reference-only guidance, since Android hardware sensors are unavailable there.
- Physical Android installation, live GPS fixes, actual calibration accuracy and magnetic interference behaviour remain untested on a real phone. Automated heading tests do not certify hardware accuracy.
- The default Flutter 8 GB Gradle heap caused memory contention when checks overlapped in this environment; build memory was reduced to a 3 GB heap with two workers, and the final build was rerun. No application feature was disabled to work around it.

Final 1.3 delivery checks: `flutter analyze` clean; 18 tests passed; web release and Android arm64 release builds succeeded. APK version 1.3.0/build 4 verified with aapt; signature verified and identical to the prior preview. DEX contains the native true-compass channel. Manifest contains coarse/fine location permission, no background-location permission and no INTERNET permission. Browser screenshots of all tabs and reference-only Qibla had zero JavaScript exceptions. The APK remains a development-signed preview, with physical sensors/GPS testing outstanding.
