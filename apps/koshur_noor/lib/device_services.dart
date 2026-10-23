import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:flutter_timezone/flutter_timezone.dart';
import 'package:geolocator/geolocator.dart';
import 'package:timezone/timezone.dart' as tz;
import 'prayer_service.dart';

double normalizeDegrees(double x) => (x % 360 + 360) % 360;
double shortestTurn(double from, double to) => (to - from + 540) % 360 - 180;
double unwrapHeading(double previous, double next) =>
    previous + shortestTurn(previous, next);
bool alignedWithQibla(double heading, double bearing) =>
    shortestTurn(heading, bearing).abs() <= 5;

class HeadingSample {
  final double heading, declination;
  final int accuracy;
  const HeadingSample(this.heading, this.accuracy, {this.declination = 0});
  bool get calibrated => accuracy >= 2;
}

abstract class HeadingSource {
  Stream<HeadingSample> watch(City city);
}

class PhoneHeadingSource implements HeadingSource {
  @override
  Stream<HeadingSample> watch(City city) {
    if (kIsWeb || defaultTargetPlatform != TargetPlatform.android) {
      return Stream.error(
        UnsupportedError('Live compass is available in the Android app.'),
      );
    }
    return const EventChannel('com.koshur.noor/true_compass')
        .receiveBroadcastStream({
          'latitude': city.latitude,
          'longitude': city.longitude,
        })
        .map((e) {
          final m = e as Map;
          final heading = (m['heading'] as num).toDouble();
          if (!heading.isFinite) throw StateError('Invalid compass sample');
          return HeadingSample(
            normalizeDegrees(heading),
            (m['accuracy'] as num).toInt(),
            declination: (m['declination'] as num).toDouble(),
          );
        });
  }
}

class LocationProblem implements Exception {
  final String code, message;
  const LocationProblem(this.code, this.message);
  @override
  String toString() => message;
}

abstract class DeviceLocator {
  Future<City> locate();
  Future<bool> openLocationSettings();
  Future<bool> openAppSettings();
}

class PhoneLocator implements DeviceLocator {
  @override
  Future<City> locate() async {
    if (!await Geolocator.isLocationServiceEnabled()) {
      throw const LocationProblem(
        'disabled',
        'Location is turned off. Enable it in your phone settings, then try again.',
      );
    }
    var permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
    }
    if (permission == LocationPermission.deniedForever) {
      throw const LocationProblem(
        'blocked',
        'Location permission is blocked. You can allow it in the app settings.',
      );
    }
    if (permission == LocationPermission.denied ||
        permission == LocationPermission.unableToDetermine) {
      throw const LocationProblem(
        'denied',
        'Location was not shared. You can still choose your city manually.',
      );
    }
    final Position position;
    try {
      position = await Geolocator.getCurrentPosition(
        locationSettings: const LocationSettings(
          accuracy: LocationAccuracy.high,
          timeLimit: Duration(seconds: 20),
        ),
      );
    } on TimeoutException {
      throw const LocationProblem(
        'timeout',
        'GPS did not respond in time. Move outdoors or choose a city manually.',
      );
    }
    if (!position.latitude.isFinite ||
        !position.longitude.isFinite ||
        position.latitude.abs() > 90 ||
        position.longitude.abs() > 180) {
      throw const LocationProblem(
        'invalid',
        'A valid GPS location was not available. Please try again.',
      );
    }
    final String zone;
    try {
      zone = (await FlutterTimezone.getLocalTimezone()).identifier;
      tz.getLocation(zone);
    } catch (_) {
      throw const LocationProblem(
        'timezone',
        'Your device timezone could not be identified. Choose a city manually for correct prayer dates and times.',
      );
    }
    return City(
      'GPS location',
      'GPS',
      position.latitude,
      position.longitude,
      zone,
      gps: true,
      accuracyMeters: position.accuracy.isFinite ? position.accuracy : null,
    );
  }

  @override
  Future<bool> openLocationSettings() => Geolocator.openLocationSettings();
  @override
  Future<bool> openAppSettings() => Geolocator.openAppSettings();
}
