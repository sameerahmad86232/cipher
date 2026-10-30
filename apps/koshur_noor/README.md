# Koshur Noor — coral & peach edition

A Flutter prayer companion inspired by the supplied Qibla reference: coral-to-peach gradients, cream reading cards, cocoa mosque silhouettes, a detailed compass face and matching launcher icon. Amiri Arabic and Nastaliq Kashmiri remain bundled for offline reading.

[Android arm64 preview APK](https://github.com/sameerahmad86232/cipher/raw/refs/heads/noor-downloads/Koshur-Noor-Android-arm64.apk?v=1.4.0) · [Flutter source ZIP](https://github.com/sameerahmad86232/cipher/raw/refs/heads/noor-downloads/Koshur-Noor-Flutter-source.zip)

Android 7.0+, 64-bit ARM. Development-signed preview for sideloading and testing; configure your own signing key before production distribution. Never commit signing secrets.

## Features

- Offline five-prayer calculations, distinct sunrise, next-prayer countdown, monthly timetable and private prayer log.
- Karachi, Muslim World League, Egyptian and Moonsighting Committee methods; Hanafi/standard Asr; manual minute adjustment.
- Eleven manual cities with IANA timezones, plus optional current GPS coordinates using the device’s IANA timezone. Confirm the phone timezone is correct, especially when travelling.
- **Live Android Qibla:** native rotation-vector sensor, accelerometer/magnetometer fallback, display-orientation remapping and Android GeomagneticField correction from magnetic to true north. Kaaba pointer follows the relative bearing; north-crossing angles animate by the shortest route.
- Calibration/low-accuracy guidance, stale/no-sensor states, alignment feedback and explicit manual-location labels. No simulated headings. Web/non-Android builds show a truthful reference-only fallback.
- Opt-in location permission flow, GPS-disabled and blocked-permission handling, enable-location dialog, timeout handling and manual city alternative. The saved position and device timezone apply to prayer calculations too.
- 273 offline dua entries (all 261 Hisnul Muslim entries and the original 12 duas; 184 owner-reviewed meanings) and eight hadiths. Includes Hisnul filtering, numbered search, review badges, reading notes, saved favourites, copy/review tools and Arabic size controls.
- Zikr counter with count animation, haptic feedback, selectable target and reset confirmation.
- Immersive tasbih with four dhikr choices, animated round progress, persistent selection and distinct 11-count/round-complete haptics.
- Fade/slide screen transitions and smoothed compass movement. Custom motion respects the system’s reduced-animation preference. No decorative perpetual animation loop.
- Night palette, larger reading text, no account, ads, model download or app server.
- Visual adhan voice profiles with recording style, duration and one-tap preview for every bundled licensed recording.
- Offline Kashmiri–English dictionary search across 49,682 headwords derived from the project’s 58,000+ lexical records, including Kashmiri, English and romanized lookup.

## Privacy and limitations

GPS is requested only after tapping the location button. No background-location permission is requested. Last chosen coordinates, timezone, saved content and counters are stored locally; Android cloud backup is disabled. The app does not send positions to an app server. Android location providers may use the phone’s system location services. Compass subscriptions stop when leaving the screen and native sensors pause when the activity pauses.

The heading depends on actual phone hardware, calibration and magnetic interference. Keep the phone flat and away from metal. A manual city must match your real location. The browser cannot demonstrate the Android sensor implementation. No physical-device sensor or GPS installation test was available in this workspace; do not treat automated tests as a hardware accuracy certification.

Prayer times are calculations, not mosque iqamah times. Hisnul Muslim entries 78–261 are marked **reviewed by the project owner**; the original 12 duas and eight hadiths retain draft status. Owner review is not independent certification. Android now supports opt-in scheduled prayer alerts with a bundled adhan recording; web has no notification support.

## Build and verify

Tested with Flutter 3.47.7 / Dart 3.13.5, Java 21 and Android SDK 36.

```sh
flutter pub get
flutter analyze
flutter test
flutter run
flutter build apk --release --target-platform android-arm64
flutter build web --release --no-web-resources-cdn
```

Android entry: `android/app/src/main/kotlin/com/koshur/koshur_noor/MainActivity.kt`. Device integration: `lib/device_services.dart`; compass screen: `lib/qibla_screen.dart`; astronomical calculations: `lib/prayer_service.dart`.

See [verification](docs/VERIFICATION.md), [translation review](docs/TRANSLATION_REVIEW.md) and [third-party notices](THIRD_PARTY_NOTICES.md).

Verified 1.4 APK SHA-256: `6f7c2ac34b43de7b1bbff6380a3c95099cec9557fdc31dc783d8e5cfd6947617`.

### Version 1.10 — Voice & remembrance polish

- Adhan recordings now appear as visual voice profiles with performer credit,
  style, duration and individual preview controls.
- Tasbih now includes four selectable dhikr phrases, animated goal progress,
  round and 11-count haptics, round/remaining stats and an undo action.
- The selected dhikr, count and target remain private and persist on-device.

### Version 1.11 — Dictionary for translation review

- Adds the compact Koshur Lughat index to the Android app for fully offline
  Kashmiri, English and romanized searches.
- The dictionary is terminology and review context for future book work.
  Glosses remain excluded from neural sentence training because a word gloss is
  not an aligned sentence. Human-approved, source-cleared sentence corrections
  can still be promoted through the existing reviewed training workflow.

### Version 1.4 — Sunset Glass
- Jamia Masjid–inspired generated sunset illustration (not a photograph).
- Bounded frosted-glass cards; turn off under Settings → Frosted glass. High
  contrast accessibility automatically uses solid cards.
- Settings → Custom prayer times lets you enter all five daily prayer times
  from your local mosque, saved per location. They repeat daily until edited.
  Switch back with “Use calculated times instead”; sunrise remains calculated.
  An Isha time before Fajr is assigned to the following civil day. Calculated
  method, Asr school and minute offset do not override custom times.

## 1.5 reviewed dua library

Approved text is preserved exactly from `training-data/reusable-language-memory/hisnul-muslim/approved-entries-78-261.json`. A regression test checks all 184 Arabic/Kashmiri pairs and notes. Entries 1–77 have not been bulk imported as approved. Long lists show 24 entries at a time with a show-more control. Reading notes are separate from recited Arabic. No new audio or generated recitation is introduced.

## 1.6 classical home

Home follows the approved concept: Jamia-inspired hero artwork, live next-prayer glass card, a horizontal strip with all six calculated events including Isha, quick actions, complete Hisnul Muslim library entry point, daily dua and collapsible private prayer log. Timetable, GPS, custom times, dark mode and reduced-motion transitions remain available. Missing Hisnul entries 1–77 are now included with available corrections and pending-review labels. Entries 78–261 retain exact owner-approved text.

## 1.7 Adhan and prayer notifications

Settings → Adhan & prayer alerts (also accessible from Home). Android notification permission is requested only when enabling/testing alerts. Optional SCHEDULE_EXACT_ALARM access permits precise alarms; otherwise the screen clearly reports approximate delivery. Users can select prayers and silent/recorded-adhan channels. Schedule uses selected-city timezone, calculation method, offsets and custom times; excludes sunrise, schedules future one-shot alerts for 30 days and refreshes on launch, resume and timetable changes. Reboot/package-replacement receiver restores scheduled notifications. Open the app at least monthly. Force-stop, DND, battery restrictions and Android channel settings can affect sound/delivery. Never bypasses DND. No background location or network required.

Recording attribution and CC BY-SA 3.0 terms: see THIRD_PARTY_NOTICES.md and in-app settings. No additional Fajr phrase in the bundled recording. On-device screen-off delivery, audio output, reboot, exact-alarm grant/revocation and OEM battery behavior still require physical Android testing. Unit tests verify future-only scheduling, prayer selection, after-midnight custom Isha and DST changes; they do not prove hardware delivery.

## 1.9 opt-in prayer focus

Android: notifications → grant notifications, precise alarms and display-over-apps, then enable Prayer focus overlay. Two-minute reminders are independently selectable. Three bundled licensed recordings (Jarih, Aishatu98, Andrewler) have separate channels; attribution is in settings and THIRD_PARTY_NOTICES. The overlay covers ordinary apps at selected prayer times and dismisses after a continuous five-second hold, or via the ongoing notification emergency action. It does not use Accessibility/device administration, block Android system controls or enforce a device lockdown. No full-screen-intent permission or DND bypass is used. Exact-alarm, overlay and foreground-service restrictions/OEM battery policies still apply. Do not claim background Instagram coverage or reliable hardware delivery until tested on the target phone. One-shot focus alarms restore on reboot and share the 30-day refresh horizon. Test overlays explicitly in settings before relying on them.

Website: https://koshur-noor.najarsameer8899.chatgpt.site (initial owner-private Site). Static build/source mirror at `/workspace/sites/koshur-noor`, Site ID `appgprj_6addcc14dd948191a5e0f883f6f51b94`. Wooden beads support tap/pull/keyboard with reduced-motion support. Android-specific focus and background notifications are not available in the website.


## Version 1.12 — first-run Android permission choices

On first Android launch, an optional, skippable permissions screen explains GPS location, prayer notifications, precise alarms and display-over-apps. Every Android prompt is initiated only by tapping that specific option. No permission is required to read duas, count tasbih or choose a city manually. Precise alarms and overlay access are separate Android settings pages, and overlay permission alone does not turn on prayer focus. Settings → App permissions opens the same controls again; the first-run screen stays dismissed after Continue or Skip. This release requires real-device validation of the Android OS permission panels and scheduled alert delivery.


## Version 1.13 — Noor Atelier visual refinement

The home screen and first-run permissions experience now share a premium deep-emerald, antique-gold and warm-ivory visual system. A redesigned Jamia-inspired prayer hero, clearer next-prayer details, distinctive timeline icons, refreshed quick actions, cleaner bottom navigation, rounded reading surfaces, and consistent light/dark treatments improve usability without changing saved prayer data, Kashmiri/Arabic content, optional permission handling or offline capabilities. No extra dependencies.
