import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'prayer_service.dart';

class AppState extends ChangeNotifier {
  final SharedPreferences prefs;
  late City city;
  late String method;
  late bool hanafi, dark, clock24, large;
  late int adjustment, count, target;
  late double arabicScale;
  late Set<String> favourites, completed;
  AppState(this.prefs) {
    city = City.all.firstWhere(
      (c) => c.name == prefs.getString('city'),
      orElse: () => City.all.first,
    );
    method = prefs.getString('method') ?? 'Karachi';
    if (![
      'Karachi',
      'Muslim World League',
      'Egyptian',
      'Moonsighting Committee',
    ].contains(method)) {
      method = 'Karachi';
    }
    hanafi = prefs.getBool('hanafi') ?? true;
    dark = prefs.getBool('dark') ?? false;
    arabicScale = (prefs.getDouble('arabicScale') ?? 1).clamp(0.85, 1.35);
    clock24 = prefs.getBool('clock24') ?? false;
    large = prefs.getBool('large') ?? false;
    adjustment = (prefs.getInt('adjustment') ?? 0).clamp(-15, 15);
    count = prefs.getInt('count') ?? 0;
    target = prefs.getInt('target') ?? 33;
    if (![33, 99, 100].contains(target)) target = 33;
    favourites = (prefs.getStringList('favourites') ?? []).toSet();
    completed = (prefs.getStringList('completed') ?? []).toSet();
  }
  PrayerService get service => PrayerService(
    city: city,
    method: method,
    hanafi: hanafi,
    adjustment: adjustment,
  );
  String completionKey(String id, DateTime now) =>
      '${city.name}:${service.day(now).toIso8601String().substring(0, 10)}:$id';
  Future<void> update(VoidCallback change) async {
    change();
    notifyListeners();
    await Future.wait([
      prefs.setString('city', city.name),
      prefs.setString('method', method),
      prefs.setBool('hanafi', hanafi),
      prefs.setBool('dark', dark),
      prefs.setDouble('arabicScale', arabicScale),
      prefs.setBool('clock24', clock24),
      prefs.setBool('large', large),
      prefs.setInt('adjustment', adjustment),
      prefs.setInt('count', count),
      prefs.setInt('target', target),
      prefs.setStringList('favourites', favourites.toList()),
      prefs.setStringList('completed', completed.toList()),
    ]);
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
