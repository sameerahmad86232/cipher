import 'package:flutter_test/flutter_test.dart';
import 'package:timezone/data/latest.dart' as tzdata;
import 'package:koshur_noor/prayer_service.dart';

void main() {
  setUpAll(tzdata.initializeTimeZones);
  test(
    'Srinagar reference 2026-10-23 matches independent Karachi/Hanafi timetable',
    () {
      final svc = PrayerService(city: City.all.first);
      final rows = svc.forDate(DateTime.utc(2026, 10, 23));
      // AlAdhan API, method=1, school=1, Asia/Kolkata, accessed 2026-10-23.
      const expected = [318, 402, 735, 969, 1068, 1151];
      for (var i = 0; i < rows.length; i++) {
        final local = svc.local(rows[i].instant);
        expect(
          (local.hour * 60 + local.minute - expected[i]).abs(),
          lessThanOrEqualTo(2),
        );
      }
    },
  );
  test('Srinagar civil date uses Asia/Kolkata, not device timezone', () {
    const svc = PrayerService(
      city: City('Srinagar', '', 34.0837, 74.7973, 'Asia/Kolkata'),
    );
    expect(svc.day(DateTime.utc(2026, 10, 23, 20)), DateTime.utc(2026, 10, 24));
    expect(svc.local(DateTime.utc(2026, 10, 23, 0)).hour, 5);
    expect(svc.local(DateTime.utc(2026, 10, 23, 0)).minute, 30);
  });
  test('Prayer sequence, sunrise exclusion and tomorrow rollover', () {
    final svc = PrayerService(city: City.all.first);
    final day = DateTime.utc(2026, 10, 23);
    final p = svc.forDate(day);
    expect(p.length, 6);
    expect(p.where((r) => r.isPrayer).length, 5);
    for (var i = 1; i < p.length; i++) {
      expect(p[i].instant.isAfter(p[i - 1].instant), true);
    }
    expect(
      svc.next(p.last.instant.add(const Duration(seconds: 1))).instant,
      svc.forDate(day.add(const Duration(days: 1))).first.instant,
    );
    expect(
      svc.next(p.first.instant.add(const Duration(seconds: 1))).id,
      'dhuhr',
    );
  });
  test('Hanafi Asr is later; adjustment excludes sunrise', () {
    final day = DateTime.utc(2026, 10, 23);
    final a = PrayerService(city: City.all.first).forDate(day);
    final b = PrayerService(city: City.all.first, hanafi: false).forDate(day);
    expect(a[3].instant.isAfter(b[3].instant), true);
    final adjusted = PrayerService(
      city: City.all.first,
      adjustment: 7,
    ).forDate(day);
    expect(adjusted[0].instant.difference(a[0].instant).inMinutes, 7);
    expect(adjusted[1].instant, a[1].instant);
  });
  test('London daylight saving follows selected date', () {
    final svc = PrayerService(
      city: City.all.firstWhere((c) => c.name == 'London'),
    );
    expect(svc.local(DateTime.utc(2026, 7, 1, 12)).hour, 13);
    expect(svc.local(DateTime.utc(2026, 12, 1, 12)).hour, 12);
  });
  test(
    'All supported cities and calculation methods produce valid ordered prayers',
    () {
      for (final city in City.all) {
        for (final month in [1, 4, 7, 10]) {
          for (final method in [
            'Karachi',
            'Muslim World League',
            'Egyptian',
            'Moonsighting Committee',
          ]) {
            final svc = PrayerService(city: city, method: method);
            final p = svc.forDate(DateTime.utc(2026, month, 15));
            for (var i = 1; i < p.length; i++) {
              expect(
                p[i].instant.isAfter(p[i - 1].instant),
                true,
                reason: '${city.name} $month $method',
              );
            }
            expect(svc.bearing, inInclusiveRange(0, 360));
          }
        }
      }
    },
  );
}
