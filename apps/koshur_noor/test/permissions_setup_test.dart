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
    debugDefaultTargetPlatformOverride = TargetPlatform.android;
  });
  tearDown(() => debugDefaultTargetPlatformOverride = null);

  testWidgets('First launch offers optional permissions and skipping is saved',
      (tester) async {
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
    expect(find.text('Prayer notifications'), findsOneWidget);
    expect(find.text('Precise prayer alarms'), findsOneWidget);
    expect(find.text('Display over other apps'), findsOneWidget);
    await tester.ensureVisible(find.text('Continue without permissions'));
    await tester.tap(find.text('Continue without permissions'));
    await tester.pumpAndSettle();
    expect(find.text('Noor home'), findsOneWidget);
    expect(prefs.getBool('permissionsIntroSeen'), isTrue);
    expect(tester.takeException(), isNull);
  });

  testWidgets('Completed onboarding is never forced again', (tester) async {
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
  });
}
