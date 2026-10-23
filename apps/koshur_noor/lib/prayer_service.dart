import 'package:adhan_dart/adhan_dart.dart';
import 'package:timezone/timezone.dart' as tz;

class City {
  final String name, nativeName, zone;
  final double latitude, longitude;
  final bool gps;
  final double? accuracyMeters;
  const City(
    this.name,
    this.nativeName,
    this.latitude,
    this.longitude,
    this.zone, {
    this.gps = false,
    this.accuracyMeters,
  });
  static const all = [
    City('Srinagar', 'سِریٖنَگَر', 34.0837, 74.7973, 'Asia/Kolkata'),
    City('Anantnag', 'اَنَنت ناگ', 33.7311, 75.1487, 'Asia/Kolkata'),
    City('Baramulla', 'بارہ مولہٕ', 34.1980, 74.3636, 'Asia/Kolkata'),
    City('Budgam', 'بَڈگام', 34.0209, 74.7219, 'Asia/Kolkata'),
    City('Kupwara', 'کُپوارٕ', 34.5262, 74.2546, 'Asia/Kolkata'),
    City('Pulwama', 'پُلوامہٕ', 33.8716, 74.8946, 'Asia/Kolkata'),
    City('Jammu', 'جَموں', 32.7266, 74.8570, 'Asia/Kolkata'),
    City('Delhi', 'دِلی', 28.6139, 77.2090, 'Asia/Kolkata'),
    City('London', 'لَندَن', 51.5074, -0.1278, 'Europe/London'),
    City('Dubai', 'دُبَیی', 25.2048, 55.2708, 'Asia/Dubai'),
    City('Makkah', 'مکہ', 21.4225, 39.8262, 'Asia/Riyadh'),
  ];
}

class PrayerEntry {
  final String id, name, nativeName;
  final DateTime instant;
  final bool isPrayer;
  const PrayerEntry(
    this.id,
    this.name,
    this.nativeName,
    this.instant, {
    this.isPrayer = true,
  });
}

class PrayerService {
  final City city;
  final String method;
  final bool hanafi;
  final int adjustment;
  final List<int>? customTimes;
  const PrayerService({
    required this.city,
    this.method = 'Karachi',
    this.hanafi = true,
    this.adjustment = 0,
    this.customTimes,
  });
  tz.Location get location => tz.getLocation(city.zone);
  tz.TZDateTime local(DateTime instant) =>
      tz.TZDateTime.from(instant, location);
  DateTime day(DateTime instant) {
    final n = local(instant);
    return DateTime.utc(n.year, n.month, n.day);
  }

  List<PrayerEntry> forDate(DateTime civilDate) {
    final params = switch (method) {
      'Muslim World League' => CalculationMethodParameters.muslimWorldLeague(),
      'Egyptian' => CalculationMethodParameters.egyptian(),
      'Moonsighting Committee' =>
        CalculationMethodParameters.moonsightingCommittee(),
      _ => CalculationMethodParameters.karachi(),
    };
    params.madhab = hanafi ? Madhab.hanafi : Madhab.shafi;
    params.highLatitudeRule = HighLatitudeRule.recommended(
      Coordinates(city.latitude, city.longitude),
    );
    final p = PrayerTimes(
      date: DateTime.utc(civilDate.year, civilDate.month, civilDate.day),
      coordinates: Coordinates(city.latitude, city.longitude),
      calculationParameters: params,
    );
    DateTime adjust(DateTime t) => t.add(Duration(minutes: adjustment));
    final rows = [
      PrayerEntry('fajr', 'Fajr', 'فَجَر', adjust(p.fajr)),
      PrayerEntry(
        'sunrise',
        'Sunrise',
        'آفتاب وُتھُن',
        p.sunrise,
        isPrayer: false,
      ),
      PrayerEntry('dhuhr', 'Dhuhr', 'ظُہر', adjust(p.dhuhr)),
      PrayerEntry('asr', 'Asr', 'عَصَر', adjust(p.asr)),
      PrayerEntry('maghrib', 'Maghrib', 'مَغرِب', adjust(p.maghrib)),
      PrayerEntry('isha', 'Isha', 'عِشا', adjust(p.isha)),
    ];
    final custom = customTimes;
    if (custom == null) return rows;
    var index = 0;
    return rows.map((row) {
      if (!row.isPrayer) return row;
      final i = index++;
      final minute = custom[i];
      final date = tz.TZDateTime(
        location,
        civilDate.year,
        civilDate.month,
        civilDate.day + (i == 4 && minute < custom[0] ? 1 : 0),
        minute ~/ 60,
        minute % 60,
      );
      return PrayerEntry(row.id, row.name, row.nativeName, date);
    }).toList();
  }

  PrayerEntry next(DateTime now) {
    final today = day(now);
    final upcoming = [
      ...forDate(today.subtract(const Duration(days: 1))),
      ...forDate(today),
      ...forDate(today.add(const Duration(days: 1))),
    ]..sort((a, b) => a.instant.compareTo(b.instant));
    return upcoming.firstWhere((p) => p.isPrayer && p.instant.isAfter(now));
  }

  double get bearing => Qibla.qibla(Coordinates(city.latitude, city.longitude));
}
