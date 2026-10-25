import 'dart:convert';
import 'package:flutter/foundation.dart';
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

class PrayerNotifications extends ChangeNotifier {
  final SharedPreferences prefs;
  final FlutterLocalNotificationsPlugin plugin;
  PrayerNotifications(this.prefs, {FlutterLocalNotificationsPlugin? plugin})
    : plugin = plugin ?? FlutterLocalNotificationsPlugin();
  bool get supported =>
      !kIsWeb && defaultTargetPlatform == TargetPlatform.android;
  bool get enabled => prefs.getBool('prayerAlerts') ?? false;
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
  NotificationDetails get details => NotificationDetails(
    android: AndroidNotificationDetails(
      sound ? 'noor_adhan_v1' : 'noor_silent_v1',
      sound ? 'Prayer times · adhan' : 'Prayer times · silent',
      channelDescription: 'Scheduled prayer times for your selected location',
      importance: Importance.high,
      priority: Priority.high,
      playSound: sound,
      sound: sound ? const RawResourceAndroidNotificationSound('adhan') : null,
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
      notificationDetails: details,
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
    var id = 1000;
    for (final p in alerts) {
      await plugin.zonedSchedule(
        id: id++,
        title: '${p.name} · ${service.city.name}',
        body: '${p.nativeName} · It is time for prayer',
        scheduledDate: tz.TZDateTime.from(p.instant, service.location),
        notificationDetails: details,
        androidScheduleMode: exact
            ? AndroidScheduleMode.exactAllowWhileIdle
            : AndroidScheduleMode.inexactAllowWhileIdle,
        payload: 'prayer:${p.id}',
      );
    }
    _fingerprint = key;
    status =
        '${alerts.length} alerts scheduled for 30 days · ${exact ? 'precise timing enabled' : 'approximate timing; enable precise alarms below'}';
    notifyListeners();
  }
}
