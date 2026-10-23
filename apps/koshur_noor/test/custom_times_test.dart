import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:timezone/data/latest.dart' as tz;
import 'package:koshur_noor/app_state.dart';
import 'package:koshur_noor/custom_times.dart';
import 'package:koshur_noor/prayer_service.dart';

void main() {
  setUpAll(tz.initializeTimeZones);
  test(
    'manual times ignore calculation offset, preserve sunrise, and find after-midnight Isha',
    () {
      final service = PrayerService(
        city: City.all.first,
        adjustment: 15,
        customTimes: const [300, 750, 960, 1080, 30],
      );
      final date = DateTime.utc(2026, 10, 23);
      final rows = service.forDate(date);
      expect(service.local(rows.first.instant).hour, 5);
      expect(
        rows[1].instant,
        PrayerService(city: City.all.first).forDate(date)[1].instant,
      );
      expect(service.local(rows.last.instant).day, 24);
      // 00:10 in India is 18:40 UTC the previous day.
      expect(service.next(DateTime.utc(2026, 10, 23, 18, 40)).id, 'isha');
      expect(
        service
            .local(service.next(DateTime.utc(2026, 10, 23, 18, 40)).instant)
            .minute,
        30,
      );
    },
  );
  test('validation rejects incomplete, unordered and invalid clock values', () {
    expect(validCustomTimes([300, 750, 960, 1080, 1200]), isTrue);
    expect(validCustomTimes([300, 750, 960, 1080, 30]), isTrue);
    for (final times in [
      [300],
      [300, 750, 960, 1080, 900],
      [300, 750, 700, 1080, 1200],
      [300, 750, 960, 1080, 1440],
    ]) {
      expect(validCustomTimes(times), isFalse);
    }
  });
  test(
    'saved schedules and glass setting restore, stay scoped by location, and reset',
    () async {
      SharedPreferences.setMockInitialValues({});
      final prefs = await SharedPreferences.getInstance();
      final s = AppState(prefs);
      await s.update(() {
        s.customSchedules[s.scheduleKey] = [300, 750, 960, 1080, 1200];
        s.glass = false;
      });
      final restored = AppState(prefs);
      expect(restored.customTimes, [300, 750, 960, 1080, 1200]);
      expect(restored.glass, isFalse);
      await restored.update(() => restored.city = City.all.last);
      expect(restored.customTimes, isNull);
      await restored.update(() => restored.city = City.all.first);
      expect(restored.customTimes, isNotNull);
      await restored.update(
        () => restored.customSchedules.remove(restored.scheduleKey),
      );
      expect(AppState(prefs).customTimes, isNull);
    },
  );
  test('corrupt persisted custom schedules are ignored', () async {
    SharedPreferences.setMockInitialValues({
      'customSchedules': '{"bad":[1,2]}',
    });
    final s = AppState(await SharedPreferences.getInstance());
    expect(s.customSchedules, isEmpty);
  });
  testWidgets(
    'custom editor saves times and allows switching back to calculations',
    (tester) async {
      SharedPreferences.setMockInitialValues({});
      final s = AppState(await SharedPreferences.getInstance());
      await tester.pumpWidget(MaterialApp(home: CustomTimesScreen(state: s)));
      await tester.pumpAndSettle();
      expect(find.text('Fajr'), findsOneWidget);
      await tester.tap(find.text('Save and use custom times'));
      await tester.pumpAndSettle();
      expect(s.customTimes, isNotNull);
      await tester.pumpWidget(const SizedBox());
      await tester.pumpWidget(MaterialApp(home: CustomTimesScreen(state: s)));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Use calculated times instead'));
      await tester.pumpAndSettle();
      expect(s.customTimes, isNull);
      expect(tester.takeException(), isNull);
    },
  );
}
