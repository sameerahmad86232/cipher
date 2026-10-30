import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';

/// Flutter bridge for original wooden click effects and local-only Arabic TTS.
///
/// Audio is optional. On web and unsupported platforms counting stays usable.
/// Spoken Arabic uses only a locally installed Android offline TTS voice.
class TasbihAudio {
  static const _channel = MethodChannel('com.koshur.noor/tasbih');

  static bool get available =>
      !kIsWeb && defaultTargetPlatform == TargetPlatform.android;

  static Future<void> click() async {
    if (!available) return;
    try {
      await _channel.invokeMethod<void>('click');
    } on PlatformException {
      // Never interrupt private counting if device audio is unavailable.
    } on MissingPluginException {
      // Tests and platforms without the Android bridge stay usable.
    }
  }

  static Future<String> voiceStatus() async {
    if (!available) return 'Arabic voice is available on Android only';
    try {
      return await _channel.invokeMethod<String>('status') ??
          'Arabic voice unavailable';
    } on PlatformException {
      return 'Could not check installed Arabic voice';
    } on MissingPluginException {
      return 'Arabic voice is unavailable on this device';
    }
  }

  static Future<String> speak(String phrase, {bool preview = false}) async {
    if (!available) return 'Arabic voice is available on Android only';
    try {
      return await _channel.invokeMethod<String>('speak', {
            'phrase': phrase,
            'preview': preview,
          }) ??
          'Arabic voice unavailable';
    } on PlatformException {
      return 'Arabic speech is unavailable on this phone';
    } on MissingPluginException {
      return 'Arabic speech is unavailable on this device';
    }
  }

  static Future<void> stop() async {
    if (!available) return;
    try {
      await _channel.invokeMethod<void>('stop');
    } on PlatformException {
      // Best effort when switching dhikr or disabling speech.
    } on MissingPluginException {
      // Bridge absent on non-Android targets.
    }
  }
}
