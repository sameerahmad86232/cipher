import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:timezone/timezone.dart' as tz;

import 'prayer_service.dart';

/// One-shot local times preserve changing daily solar calculations and DST.
List<PrayerEntry> buildPrayerAlerts(
  PrayerService service,
  DateTime now,
  Set<String> enabled, {
  int days = 30,
}) {
  final start = service.day(now);
  final result = <PrayerEntry>[];
  for (var day = 0; day < days; day++) {
    result.addAll(
      service
          .forDate(start.add(Duration(days: day)))
          .where(
            (p) =>
                p.isPrayer && enabled.contains(p.id) && p.instant.isAfter(now),
          ),
    );
  }
  result.sort((a, b) => a.instant.compareTo(b.instant));
  return result;
}

DateTime? prePrayerReminderTime(DateTime prayer, DateTime now) {
  final time = prayer.subtract(const Duration(minutes: 2));
  return time.isAfter(now) ? time : null;
}

class PrayerNotifications extends ChangeNotifier {
  final SharedPreferences prefs;
  final FlutterLocalNotificationsPlugin plugin;
  PrayerNotifications(this.prefs, {FlutterLocalNotificationsPlugin? plugin})
    : plugin = plugin ?? FlutterLocalNotificationsPlugin();
  bool get supported =>
      !kIsWeb && defaultTargetPlatform == TargetPlatform.android;
  bool get enabled => prefs.getBool('prayerAlerts') ?? false;
  static const focusChannel = MethodChannel('com.koshur.noor/prayer_focus');
  static const voices = {
    'adhan': 'Classic',
    'adhan_cc0': 'Clear & gentle',
    'adhan_andrew': 'Full recitation',
  };
  static const voiceDetails = {
    'adhan': ('Jarih', 'Warm, concise · 27 sec'),
    'adhan_cc0': ('Aishatu98', 'Gentle, unhurried · 42 sec'),
    'adhan_andrew': ('Andrewler', 'Extended, resonant · 3 min'),
  };
  bool get focus => prefs.getBool('prayerFocus') ?? false;
  bool get preReminder => prefs.getBool('prePrayerReminder') ?? true;
  String get voice => voices.containsKey(prefs.getString('adhanVoice'))
      ? prefs.getString('adhanVoice')!
      : 'adhan';
  bool _focusScheduled = false;
  Future<void> requestOverlay() async {
    if (supported) await focusChannel.invokeMethod<void>('requestOverlay');
  }

  Future<void> previewFocus() async {
    if (supported) await focusChannel.invokeMethod<void>('preview');
  }

  Future<void> setFocus(bool value, PrayerService service) async {
    if (value) {
      final permission = await focusChannel.invokeMapMethod<String, dynamic>(
        'status',
      );
      if (permission?['overlay'] != true || permission?['exact'] != true) {
        status =
            'Grant display-over-apps and precise alarms first, then enable prayer focus.';
        notifyListeners();
        return;
      }
    }
    await prefs.setBool('prayerFocus', value);
    await refresh(service, force: true);
  }

  Future<void> setPreReminder(bool value, PrayerService service) async {
    await prefs.setBool('prePrayerReminder', value);
    await refresh(service, force: true);
  }

  Future<void> setVoice(String value, PrayerService service) async {
    if (!voices.containsKey(value)) return;
    await prefs.setString('adhanVoice', value);
    await refresh(service, force: true);
  }

  bool get sound => prefs.getBool('adhanSound') ?? true;
  Set<String> get prayers =>
      (prefs.getStringList('alertPrayers') ??
              ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'])
          .toSet();
  String status = 'Prayer alerts are off';
  String? _fingerprint;
  Future<void> _queue = Future.value();
  Future<void> initialize() async {
    if (!supported) return;
    await plugin.initialize(
      settings: const InitializationSettings(
        android: AndroidInitializationSettings('ic_prayer_notification'),
      ),
    );
  }

  AndroidFlutterLocalNotificationsPlugin? get android => plugin
      .resolvePlatformSpecificImplementation<
        AndroidFlutterLocalNotificationsPlugin
      >();
  NotificationDetails details({bool focusSilent = false}) =>
      NotificationDetails(
        android: AndroidNotificationDetails(
          sound && !focusSilent ? 'noor_${voice}_v2' : 'noor_silent_v1',
          sound && !focusSilent
              ? 'Prayer times · ${voices[voice]}'
              : 'Prayer times · silent',
          channelDescription:
              'Scheduled prayer times for your selected location',
          importance: Importance.high,
          priority: Priority.high,
          playSound: sound && !focusSilent,
          sound: sound && !focusSilent
              ? RawResourceAndroidNotificationSound(voice)
              : null,
          audioAttributesUsage: AudioAttributesUsage.notification,
          enableVibration: sound,
          category: AndroidNotificationCategory.reminder,
          icon: 'ic_prayer_notification',
        ),
      );
  Future<void> setEnabled(bool value, PrayerService service) async {
    if (!supported) return;
    if (value && await android?.requestNotificationsPermission() != true) {
      status =
          'Notification permission was not granted. Enable it in Android settings.';
      notifyListeners();
      return;
    }
    await prefs.setBool('prayerAlerts', value);
    await refresh(service, force: true);
  }

  Future<void> setSound(bool value, PrayerService service) async {
    await prefs.setBool('adhanSound', value);
    await refresh(service, force: true);
  }

  Future<void> setPrayer(String id, bool value, PrayerService service) async {
    final set = prayers;
    value ? set.add(id) : set.remove(id);
    await prefs.setStringList('alertPrayers', set.toList());
    await refresh(service, force: true);
  }

  Future<void> requestExact(PrayerService service) async {
    await android?.requestExactAlarmsPermission();
    await refresh(service, force: true);
  }

  Future<void> preview() async {
    if (!supported) return;
    if (await android?.requestNotificationsPermission() != true) return;
    await plugin.show(
      id: 900001,
      title: 'Koshur Noor · adhan preview',
      body: 'Your selected prayer notification sound',
      notificationDetails: details(),
    );
  }

  Future<void> previewVoice(String value) async {
    if (!supported || !voices.containsKey(value)) return;
    if (await android?.requestNotificationsPermission() != true) return;
    final detail = voiceDetails[value];
    await plugin.show(
      id: 900002,
      title: 'Koshur Noor · ${voices[value]}',
      body: 'Previewing ${detail == null ? 'adhan recording' : detail.$1}',
      notificationDetails: NotificationDetails(
        android: AndroidNotificationDetails(
          'noor_${value}_preview_v1',
          'Adhan preview · ${voices[value]}',
          channelDescription: 'Preview for a Koshur Noor adhan recording',
          importance: Importance.high,
          priority: Priority.high,
          playSound: true,
          sound: RawResourceAndroidNotificationSound(value),
          audioAttributesUsage: AudioAttributesUsage.notification,
          icon: 'ic_prayer_notification',
        ),
      ),
    );
  }

  Future<void> refresh(PrayerService service, {bool force = false}) {
    _queue = _queue.then((_) => _refresh(service, force)).catchError((
      Object error,
    ) {
      _fingerprint = null;
      status =
          'Could not schedule alerts. Check Android notification and alarm settings.';
      notifyListeners();
    });
    return _queue;
  }

  Future<void> _refresh(PrayerService service, bool force) async {
    if (!supported) return;
    final now = DateTime.now();
    final key = jsonEncode([
      enabled,
      sound,
      focus,
      preReminder,
      voice,
      prayers.toList()..sort(),
      service.city.name,
      service.city.latitude,
      service.city.longitude,
      service.city.zone,
      service.method,
      service.hanafi,
      service.adjustment,
      service.customTimes,
      service.day(now).toIso8601String(),
    ]);
    if (!force && key == _fingerprint) return;
    // App owns its notification namespace, so replacing clears stale city/time alerts.
    await plugin.cancelAllPendingNotifications();
    _focusScheduled =
        await focusChannel.invokeMethod<bool>('configure', {
          'enabled': false,
          'alarms': <Map<String, dynamic>>[],
          'sound': sound,
          'voice': voice,
        }) ??
        false;
    if (!enabled) {
      status = 'Prayer alerts are off';
      _fingerprint = key;
      notifyListeners();
      return;
    }
    if (await android?.areNotificationsEnabled() != true) {
      status = 'Notifications are blocked in Android settings';
      notifyListeners();
      return;
    }
    final exact = await android?.canScheduleExactNotifications() ?? false;
    final alerts = buildPrayerAlerts(service, now, prayers);
    if (focus && exact) {
      _focusScheduled =
          await focusChannel.invokeMethod<bool>('configure', {
            'enabled': true,
            'sound': sound,
            'voice': voice,
            'alarms': alerts
                .map(
                  (p) => {
                    'time': p.instant.millisecondsSinceEpoch,
                    'title': '${p.name} · ${service.city.name}',
                  },
                )
                .toList(),
          }) ??
          false;
    }
    var id = 1000;
    for (final p in alerts) {
      await plugin.zonedSchedule(
        id: id++,
        title: '${p.name} · ${service.city.name}',
        body: '${p.nativeName} · It is time for prayer',
        scheduledDate: tz.TZDateTime.from(p.instant, service.location),
        notificationDetails: details(focusSilent: _focusScheduled),
        androidScheduleMode: exact
            ? AndroidScheduleMode.exactAllowWhileIdle
            : AndroidScheduleMode.inexactAllowWhileIdle,
        payload: 'prayer:${p.id}',
      );
      final reminder = prePrayerReminderTime(p.instant, now);
      if (preReminder && reminder != null) {
        await plugin.zonedSchedule(
          id: id++,
          title: '${p.name} in 2 minutes',
          body: 'Prayer time is approaching · ${service.city.name}',
          scheduledDate: tz.TZDateTime.from(reminder, service.location),
          notificationDetails: const NotificationDetails(
            android: AndroidNotificationDetails(
              'noor_pre_prayer_v1',
              'Two-minute prayer reminders',
              importance: Importance.high,
              priority: Priority.high,
              icon: 'ic_prayer_notification',
            ),
          ),
          androidScheduleMode: exact
              ? AndroidScheduleMode.exactAllowWhileIdle
              : AndroidScheduleMode.inexactAllowWhileIdle,
        );
      }
    }
    _fingerprint = key;
    status =
        '${alerts.length} prayer times scheduled for 30 days · ${exact ? 'precise timing enabled' : 'approximate timing'} · ${_focusScheduled ? 'focus overlay enabled' : 'focus overlay off'}';
    notifyListeners();
  }
}
