import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'prayer_service.dart';
import 'custom_times.dart';
import 'prayer_notifications.dart';

import 'package:timezone/timezone.dart' as tz;

class AppState extends ChangeNotifier {
  final SharedPreferences prefs;
  PrayerNotifications? notifications;
  late City city;
  late String method;
  late bool hanafi, dark, clock24, large;
  bool glass = true;
  bool tasbihClick = true;
  bool tasbihVoice = false;
  final Map<String, List<int>> customSchedules = {};
  String get scheduleKey =>
      "${city.name}:${city.latitude.toStringAsFixed(1)}:${city.longitude.toStringAsFixed(1)}:${city.zone}";
  List<int>? get customTimes => customSchedules[scheduleKey];
  late int adjustment, count, target, dhikrIndex;
  late double arabicScale;
  late Set<String> favourites, completed;
  AppState(this.prefs) {
    city = City.all.firstWhere(
      (c) => c.name == prefs.getString('city'),
      orElse: () => City.all.first,
    );
    if (prefs.getBool('gpsEnabled') == true) {
      final lat = prefs.getDouble('gpsLatitude'),
          lon = prefs.getDouble('gpsLongitude'),
          zone = prefs.getString('gpsZone');
      if (lat != null &&
          lon != null &&
          lat.isFinite &&
          lon.isFinite &&
          lat.abs() <= 90 &&
          lon.abs() <= 180 &&
          zone != null) {
        try {
          tz.getLocation(zone);
          city = City(
            'GPS location',
            'GPS',
            lat,
            lon,
            zone,
            gps: true,
            accuracyMeters: prefs.getDouble('gpsAccuracy'),
          );
        } catch (_) {
          /* Fall back to a known manual city. */
        }
      }
    }
    method = prefs.getString('method') ?? 'Karachi';
    if (![
      'Karachi',
      'Muslim World League',
      'Egyptian',
      'Moonsighting Committee',
    ].contains(method)) {
      method = 'Karachi';
    }
    glass = prefs.getBool('glass') ?? true;
    tasbihClick = prefs.getBool('tasbihClick') ?? true;
    tasbihVoice = prefs.getBool('tasbihVoice') ?? false;
    try {
      final raw = jsonDecode(prefs.getString('customSchedules') ?? '{}') as Map;
      for (final e in raw.entries) {
        if (e.value is List && (e.value as List).every((v) => v is int)) {
          final t = List<int>.from(e.value);
          if (validCustomTimes(t)) customSchedules[e.key as String] = t;
        }
      }
    } catch (_) {
      /* Ignore corrupt custom settings. */
    }
    hanafi = prefs.getBool('hanafi') ?? true;
    dark = prefs.getBool('dark') ?? false;
    arabicScale = (prefs.getDouble('arabicScale') ?? 1).clamp(0.85, 1.35);
    clock24 = prefs.getBool('clock24') ?? false;
    large = prefs.getBool('large') ?? false;
    adjustment = (prefs.getInt('adjustment') ?? 0).clamp(-15, 15);
    count = prefs.getInt('count') ?? 0;
    target = prefs.getInt('target') ?? 33;
    dhikrIndex = (prefs.getInt('dhikrIndex') ?? 0).clamp(0, 3);
    if (![33, 99, 100].contains(target)) target = 33;
    favourites = (prefs.getStringList('favourites') ?? []).toSet();
    completed = (prefs.getStringList('completed') ?? []).toSet();
  }
  PrayerService get service => PrayerService(
    city: city,
    method: method,
    hanafi: hanafi,
    adjustment: adjustment,
    customTimes: customTimes,
  );
  String completionKey(String id, DateTime now) =>
      '${city.name}:${service.day(now).toIso8601String().substring(0, 10)}:$id';
  Future<void> update(VoidCallback change) async {
    change();
    notifyListeners();
    await Future.wait([
      prefs.setString('city', city.name),
      prefs.setBool('gpsEnabled', city.gps),
      if (city.gps) prefs.setDouble('gpsLatitude', city.latitude),
      if (city.gps) prefs.setDouble('gpsLongitude', city.longitude),
      if (city.gps) prefs.setString('gpsZone', city.zone),
      if (city.gps)
        city.accuracyMeters != null
            ? prefs.setDouble('gpsAccuracy', city.accuracyMeters!)
            : prefs.remove('gpsAccuracy'),
      prefs.setString('method', method),
      prefs.setBool('hanafi', hanafi),
      prefs.setBool('dark', dark),
      prefs.setBool('glass', glass),
      prefs.setBool('tasbihClick', tasbihClick),
      prefs.setBool('tasbihVoice', tasbihVoice),
      prefs.setString('customSchedules', jsonEncode(customSchedules)),
      prefs.setDouble('arabicScale', arabicScale),
      prefs.setBool('clock24', clock24),
      prefs.setBool('large', large),
      prefs.setInt('adjustment', adjustment),
      prefs.setInt('count', count),
      prefs.setInt('target', target),
      prefs.setInt('dhikrIndex', dhikrIndex),
      prefs.setStringList('favourites', favourites.toList()),
      prefs.setStringList('completed', completed.toList()),
    ]);
    await notifications?.refresh(service);
  }

  String exportReview(
    List<Map<String, dynamic>> duas, [
    List<Map<String, dynamic>> hadiths = const [],
  ]) => const JsonEncoder.withIndent('  ').convert({
    'app': 'Koshur Noor',
    'duas': duas,
    'hadiths': hadiths,
    'note':
        'Kashmiri meanings await owner review; Arabic is retained separately.',
  });
}
