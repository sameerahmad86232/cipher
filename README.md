# Koshur Noor 1.9 — Prayer Focus & Wooden Beads

Download Koshur-Noor-Android-arm64.apk for Android 7.0+ on a 64-bit ARM phone. It is a development-signed preview and may be installed over the prior preview (same verified signing identity). The new palette and launcher icon follow the supplied Qibla reference: coral, peach, cream and warm brown, with generated Jamia Masjid–inspired sunset artwork (not a photograph).

Live Android Qibla uses native rotation-vector/accelerometer/magnetometer sensors with geomagnetic declination correction for true north. Compass rotation follows the short angular path. Calibration, stale data and missing hardware are handled explicitly. GPS is opt-in; saved coordinates and device IANA timezone also drive prayer calculations. Permission denial, disabled GPS, timeout and manual-city alternatives are supported.

Screen transitions, zikr counting and compass movement are animated, with reduced-motion support. Includes offline prayer times, countdown, monthly timetable, 273 dua entries (complete 261-entry Hisnul Muslim plus 12 original duas), eight hadiths, Arabic/Kashmiri reading, saved favourites, prayer log and night mode. 184 Hisnul Muslim meanings (entries 78–261) are reviewed by the project owner. Original 12 duas and eight hadiths remain drafts.

30 Flutter tests passed; native five-second gate passed 6 assertions; analyzer clean; native Android and web release builds succeeded; APK signature and permissions verified. Physical sensor calibration and live GPS accuracy have not been tested on an actual phone. Browser Qibla screenshots correctly show the reference-only fallback, not simulated live sensor readings. No background location, server, ads or model download.

Source: apps/koshur_noor on main and the source ZIP. Screenshots: noor-reference-home.png, noor-qibla.png, noor-duas.png, noor-hadiths.png, noor-tasbih.png and noor-settings.png.

Custom prayer times: Settings → Custom prayer times. Five daily times repeat until edited, saved per location. Sunrise stays calculated. Supports after-midnight Isha and switching back to calculated times. Frosted glass can be disabled in Settings and is disabled automatically in high contrast.

APK SHA-256: `e133ff946a8b48a4d1c7edc29cfafc03d23e17535c90d9ad947c8d8c319ea8df`.

Version 1.5 adds a Hisnul Muslim filter, entry-number/Arabic/Kashmiri search, owner-review badges, separate reading instructions, and show-more loading for longer libraries. Exact approved text is regression-tested against the saved owner review. Existing screenshots show the earlier visual design.

Version 1.6 implements the approved home concept with Jamia-inspired hero, real next-prayer countdown, coral prayer strip (scroll to see all events), quick actions, Hisnul Muslim card, daily dua and collapsible prayer log. All 261 Hisnul entries are included; earlier entries 1–77 remain pending review, while 78–261 retain owner-approved text. Screenshot `noor-16-home.png` shows the implemented home screen.

Version 1.7: polished Home adhan setup card and a dedicated notification screen. Settings → Adhan & prayer alerts → enable notifications; optionally allow precise alarms. Select individual prayers, choose silent or bundled recorded adhan sound, and test the sound. Schedules use selected location/timezone and calculated/custom prayer times, excluding sunrise. Thirty days are scheduled ahead, refreshed at launch/resume and timetable changes; reopen at least monthly. Reboot restores scheduled alerts. Force-stop requires reopening; Android DND, channel sound/volume and battery settings can affect sound/delivery. This preview has not been tested for background delivery or sound on a physical phone.

Audio: Jarih, “Adhan wiki”, Wikimedia Commons, CC BY-SA 3.0. https://commons.wikimedia.org/wiki/File:Adhan_wiki.oga · https://creativecommons.org/licenses/by-sa/3.0/ . Complete 26.56-second recording converted to Ogg Vorbis; no content edits; no additional Fajr phrase. Attribution also appears in-app. Final APK verified to contain the actual sound bytes and notification icon.

## Version 1.9

- Two-minute advance reminders and on-time prayer notifications.
- Three licensed recording choices: Jarih (CC BY-SA 3.0), Aishatu98 (CC0), Andrewler (CC BY-SA 4.0). Full attribution and links in app settings and source THIRD_PARTY_NOTICES.md.
- Optional Android prayer-focus overlay with five-second continuous hold-to-dismiss. Emergency dismiss remains in the ongoing notification. This is not device lockdown: Android system controls remain available.
- Custom mosque times: Settings → Custom prayer times. They control advance reminders, prayer alerts and focus alarms.
- To enable focus: Settings → Adhan & prayer alerts → enable notifications; allow precise alarms; allow display over other apps; enable Prayer focus overlay; test it explicitly.
- Reopen at least monthly to renew the 30-day schedule. Force-stop requires reopening. OEM/Android background restrictions, overlay protection, DND and audio settings can affect behavior. Actual Instagram/background delivery and audio have not been verified on a physical phone.
- Realistic animated wooden-bead tasbih supports tap, pull and keyboard. Desktop website: https://koshur-noor.najarsameer8899.chatgpt.site (initial owner-private access). Website does not support Android background alerts or focus overlay.

Verified release APK signature, embedded audio bytes, required permissions and focus receivers/service. Thirty Flutter tests passed; six native HoldGate checks passed using the actual Kotlin gate class. Android Gradle release-unit-test task is unavailable in this configuration; do not interpret these checks as device tests. Source commit: 04c6ead.
