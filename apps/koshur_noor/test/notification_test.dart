import 'package:flutter_test/flutter_test.dart';
import 'package:timezone/data/latest.dart' as tzdata;
import 'package:koshur_noor/prayer_service.dart';
import 'package:koshur_noor/prayer_notifications.dart';

void main() {
  setUpAll(tzdata.initializeTimeZones);
  test('30-day plan schedules only selected future prayers, never sunrise', () {
    final service = PrayerService(city: City.all.first);
    final now = DateTime.utc(2026, 10, 25, 8);
    final rows = buildPrayerAlerts(service, now, {
      'fajr',
      'dhuhr',
      'asr',
      'maghrib',
      'isha',
      'sunrise',
    });
    expect(rows.length, inInclusiveRange(145, 150));
    expect(
      rows.every(
        (p) => p.isPrayer && p.id != 'sunrise' && p.instant.isAfter(now),
      ),
      isTrue,
    );
    expect(rows.map((p) => '${p.id}:${p.instant}').toSet().length, rows.length);
    for (var i = 1; i < rows.length; i++) {
      expect(rows[i].instant.isAfter(rows[i - 1].instant), isTrue);
    }
    expect(buildPrayerAlerts(service, now, {}), isEmpty);
  });
  test('Filtering and custom schedules retain after-midnight Isha', () {
    final service = PrayerService(
      city: City.all.first,
      customTimes: [300, 720, 960, 1080, 1500],
    );
    final now = DateTime.utc(2026, 10, 24);
    final rows = buildPrayerAlerts(service, now, {'isha'}, days: 3);
    expect(rows.length, 3);
    expect(
      rows.every((p) => p.id == 'isha' && service.local(p.instant).hour == 1),
      isTrue,
    );
  });
  test('London schedule follows local civil day over DST transition', () {
    final service = PrayerService(
      city: City.all.firstWhere((c) => c.name == 'London'),
    );
    final rows = buildPrayerAlerts(service, DateTime.utc(2026, 10, 24), {
      'dhuhr',
    }, days: 3);
    expect(rows.length, 3);
    expect(
      service.local(rows[0].instant).timeZoneOffset,
      const Duration(hours: 1),
    );
    expect(service.local(rows[1].instant).timeZoneOffset, Duration.zero);
  });
}
