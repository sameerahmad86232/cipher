import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:timezone/data/latest.dart' as tzdata;
import 'package:koshur_noor/app_state.dart';
import 'package:koshur_noor/permissions_setup.dart';

void main() {
  setUp(() {
    tzdata.initializeTimeZones();
    SharedPreferences.setMockInitialValues({});
  });

  testWidgets('First launch offers optional permissions and skipping is saved',
      (tester) async {
    debugDefaultTargetPlatformOverride = TargetPlatform.android;
    try {
    tester.view.physicalSize = const Size(320, 740);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    final prefs = await SharedPreferences.getInstance();
    final state = AppState(prefs);
    await tester.pumpWidget(MaterialApp(
      home: PermissionStartup(
        state: state,
        child: const Scaffold(body: Text('Noor home')),
      ),
    ));
    await tester.pumpAndSettle();
    expect(find.text('Your permissions'), findsOneWidget);
    expect(find.text('Use my location'), findsOneWidget);
    await tester.scrollUntilVisible(find.text('Prayer notifications'), 150);
    expect(find.text('Prayer notifications'), findsOneWidget);
    await tester.scrollUntilVisible(find.text('Precise prayer alarms'), 150);
    expect(find.text('Precise prayer alarms'), findsOneWidget);
    await tester.scrollUntilVisible(find.text('Display over other apps'), 150);
    expect(find.text('Display over other apps'), findsOneWidget);
    await tester.scrollUntilVisible(find.text('Continue without permissions'), 150);
    await tester.tap(find.text('Continue without permissions'));
    await tester.pumpAndSettle();
    expect(find.text('Noor home'), findsOneWidget);
    expect(prefs.getBool('permissionsIntroSeen'), isTrue);
    expect(tester.takeException(), isNull);
    } finally {
      debugDefaultTargetPlatformOverride = null;
    }
  });

  testWidgets('Completed onboarding is never forced again', (tester) async {
    debugDefaultTargetPlatformOverride = TargetPlatform.android;
    try {
    SharedPreferences.setMockInitialValues({'permissionsIntroSeen': true});
    final prefs = await SharedPreferences.getInstance();
    await tester.pumpWidget(MaterialApp(
      home: PermissionStartup(
        state: AppState(prefs),
        child: const Scaffold(body: Text('Noor home')),
      ),
    ));
    await tester.pumpAndSettle();
    expect(find.text('Noor home'), findsOneWidget);
    expect(find.text('Your permissions'), findsNothing);
    } finally {
      debugDefaultTargetPlatformOverride = null;
    }
  });
}
