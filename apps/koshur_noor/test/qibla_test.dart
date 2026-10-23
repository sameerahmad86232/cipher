import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:timezone/data/latest.dart' as tzdata;
import 'package:koshur_noor/app_state.dart';
import 'package:koshur_noor/device_services.dart';
import 'package:koshur_noor/prayer_service.dart';
import 'package:koshur_noor/qibla_screen.dart';

class FakeHeadings implements HeadingSource {
  final controller = StreamController<HeadingSample>.broadcast();
  City? watched;
  @override
  Stream<HeadingSample> watch(City city) {
    watched = city;
    return controller.stream;
  }
}

class FakeLocator implements DeviceLocator {
  City? result;
  LocationProblem? problem;
  int settings = 0;
  @override
  Future<City> locate() async {
    if (problem != null) throw problem!;
    return result!;
  }

  @override
  Future<bool> openLocationSettings() async {
    settings++;
    return true;
  }

  @override
  Future<bool> openAppSettings() async {
    settings++;
    return true;
  }
}

void main() {
  setUp(tzdata.initializeTimeZones);
  test(
    'Compass crosses north by the short route and aligns within five degrees',
    () {
      expect(unwrapHeading(359, 1), 361);
      expect(unwrapHeading(1, 359), -1);
      expect(shortestTurn(350, 10), 20);
      expect(shortestTurn(10, 350), -20);
      expect(alignedWithQibla(359, 2), true);
      expect(alignedWithQibla(0, 7), false);
      expect(normalizeDegrees(-10), 350);
      expect(const HeadingSample(30, 1).calibrated, false);
      expect(const HeadingSample(30, 3).calibrated, true);
    },
  );
  test(
    'GPS coordinates and IANA timezone persist; manual city turns GPS off',
    () async {
      SharedPreferences.setMockInitialValues({});
      final prefs = await SharedPreferences.getInstance();
      final state = AppState(prefs);
      await state.update(
        () => state.city = const City(
          'GPS location',
          'GPS',
          25.2048,
          55.2708,
          'Asia/Dubai',
          gps: true,
          accuracyMeters: 18,
        ),
      );
      final restored = AppState(prefs);
      expect(restored.city.gps, true);
      expect(restored.city.longitude, 55.2708);
      expect(restored.city.accuracyMeters, 18);
      expect(restored.service.local(DateTime.utc(2026, 10, 23, 0)).hour, 4);
      await state.update(() => state.city = City.all.first);
      expect(AppState(prefs).city.gps, false);
      expect(AppState(prefs).city.name, 'Srinagar');
    },
  );
  test('Invalid stored GPS coordinates cannot replace a known city', () async {
    SharedPreferences.setMockInitialValues({
      'gpsEnabled': true,
      'gpsLatitude': 999.0,
      'gpsLongitude': 2.0,
      'gpsZone': 'Europe/London',
    });
    final state = AppState(await SharedPreferences.getInstance());
    expect(state.city.name, 'Srinagar');
    expect(state.city.gps, false);
  });
  testWidgets(
    'Live heading, calibration and GPS update use real state interfaces',
    (tester) async {
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      SharedPreferences.setMockInitialValues({});
      final state = AppState(await SharedPreferences.getInstance());
      final headings = FakeHeadings();
      final locator = FakeLocator()
        ..result = const City(
          'GPS location',
          'GPS',
          25.2048,
          55.2708,
          'Asia/Dubai',
          gps: true,
        );
      await tester.pumpWidget(
        MaterialApp(
          home: QiblaScreen(
            state: state,
            headings: headings,
            locator: locator,
            onPickCity: () async {},
          ),
        ),
      );
      await tester.pumpAndSettle();
      headings.controller.add(HeadingSample(state.service.bearing, 0));
      await tester.pumpAndSettle();
      expect(find.text('Calibrate your compass'), findsOneWidget);
      headings.controller.add(HeadingSample(state.service.bearing, 3));
      await tester.pumpAndSettle();
      expect(find.text('You are facing the Qibla'), findsOneWidget);
      await tester.scrollUntilVisible(
        find.text('Use my current location'),
        150,
        scrollable: find.byType(Scrollable).first,
      );
      await tester.ensureVisible(find.text('Use my current location'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Use my current location'));
      await tester.pumpAndSettle();
      await tester.runAsync(() async {
        await Future<void>.delayed(const Duration(milliseconds: 20));
      });
      await tester.pumpAndSettle();
      expect(state.city.gps, true);
      expect(headings.watched!.longitude, 55.2708);
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox());
      await headings.controller.close();
    },
  );
  testWidgets(
    'Disabled GPS shows reference-style enable-location dialog without fabricating coordinates',
    (tester) async {
      SharedPreferences.setMockInitialValues({});
      final state = AppState(await SharedPreferences.getInstance());
      final headings = FakeHeadings();
      final locator = FakeLocator()
        ..problem = const LocationProblem(
          'disabled',
          'Please enable GPS for an accurate location.',
        );
      await tester.pumpWidget(
        MaterialApp(
          home: QiblaScreen(
            state: state,
            headings: headings,
            locator: locator,
            onPickCity: () async {},
          ),
        ),
      );
      await tester.pumpAndSettle();
      await tester.scrollUntilVisible(
        find.text('Use my current location'),
        150,
        scrollable: find.byType(Scrollable).first,
      );
      await tester.ensureVisible(find.text('Use my current location'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Use my current location'));
      await tester.pumpAndSettle();
      expect(find.text('Enable your location'), findsOneWidget);
      expect(state.city.gps, false);
      await tester.tap(find.text('Enable your location'));
      await tester.pumpAndSettle();
      expect(locator.settings, 1);
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox());
      await headings.controller.close();
    },
  );
  testWidgets('No compass sensor shows a truthful reference-only fallback', (
    tester,
  ) async {
    SharedPreferences.setMockInitialValues({});
    final state = AppState(await SharedPreferences.getInstance());
    final headings = FakeHeadings();
    await tester.pumpWidget(
      MaterialApp(
        home: QiblaScreen(
          state: state,
          headings: headings,
          locator: FakeLocator(),
          onPickCity: () async {},
        ),
      ),
    );
    await tester.pumpAndSettle();
    headings.controller.addError(UnsupportedError('No sensor'));
    await tester.pumpAndSettle();
    expect(find.text('Reference bearing only'), findsOneWidget);
    expect(find.text('Retry compass'), findsOneWidget);
    expect(find.text('You are facing the Qibla'), findsNothing);
    await tester.pumpWidget(const SizedBox());
    await headings.controller.close();
  });
}
