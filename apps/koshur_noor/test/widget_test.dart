import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:timezone/data/latest.dart' as tzdata;
import 'package:koshur_noor/main.dart';
import 'package:koshur_noor/app_state.dart';

void main() {
  setUp(tzdata.initializeTimeZones);
  test('All duas retain Arabic, source and unreviewed Kashmiri meaning', () {
    final rows =
        jsonDecode(File('assets/data/duas.json').readAsStringSync()) as List;
    expect(rows.length, 12);
    expect(rows.map((r) => r['id']).toSet().length, 12);
    for (final r in rows) {
      expect(r['arabic'], isNotEmpty);
      expect(r['kashmiri'], isNotEmpty);
      expect(r['source'], isNotEmpty);
      expect(r['reviewStatus'], 'draft-awaiting-owner-review');
    }
  });
  test(
    'Settings and favourites survive reload; prayer keys separate dates',
    () async {
      SharedPreferences.setMockInitialValues({});
      final prefs = await SharedPreferences.getInstance();
      final state = AppState(prefs);
      await state.update(() {
        state.favourites.add('knowledge');
        state.count = 18;
        state.dark = true;
      });
      final restored = AppState(prefs);
      expect(restored.favourites, contains('knowledge'));
      expect(restored.count, 18);
      expect(restored.dark, true);
      expect(
        restored.completionKey('fajr', DateTime.utc(2026, 10, 23)),
        isNot(restored.completionKey('fajr', DateTime.utc(2026, 10, 24))),
      );
    },
  );
  testWidgets('Phone navigation, dua search, counter and no overflow', (
    tester,
  ) async {
    tester.view.physicalSize = const Size(390, 844);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    SharedPreferences.setMockInitialValues({});
    final prefs = await SharedPreferences.getInstance();
    final rows =
        (jsonDecode(File('assets/data/duas.json').readAsStringSync()) as List)
            .map((r) => Map<String, dynamic>.from(r))
            .toList();
    final state = AppState(prefs);
    await tester.pumpWidget(NoorApp(state: state, duas: rows));
    await tester.pumpAndSettle();
    expect(find.text('NOOR'), findsOneWidget);
    expect(tester.takeException(), isNull);
    await tester.tap(find.text('Duas'));
    await tester.pumpAndSettle();
    await tester.enterText(find.byType(TextField), 'knowledge');
    await tester.pumpAndSettle();
    expect(find.text('For beneficial knowledge'), findsOneWidget);
    await tester.tap(find.text('For beneficial knowledge'));
    await tester.pumpAndSettle();
    expect(find.text('KASHMIRI MEANING'), findsOneWidget);
    await tester.pageBack();
    await tester.pumpAndSettle();
    await tester.tap(find.text('Tasbih'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('TAP TO COUNT'));
    await tester.pump();
    expect(state.count, 1);
    await tester.tap(find.text('Settings'));
    await tester.pumpAndSettle();
    expect(find.text('Hanafi Asr'), findsOneWidget);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox());
  });
  testWidgets('Small screen and larger text remain usable', (tester) async {
    tester.view.physicalSize = const Size(320, 740);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    SharedPreferences.setMockInitialValues({'large': true});
    final prefs = await SharedPreferences.getInstance();
    final rows =
        (jsonDecode(File('assets/data/duas.json').readAsStringSync()) as List)
            .map((r) => Map<String, dynamic>.from(r))
            .toList();
    await tester.pumpWidget(NoorApp(state: AppState(prefs), duas: rows));
    await tester.pumpAndSettle();
    expect(tester.takeException(), isNull);
    await tester.tap(find.text('Duas'));
    await tester.pumpAndSettle();
    expect(tester.takeException(), isNull);
    await tester.tap(find.text('Tasbih'));
    await tester.pumpAndSettle();
    expect(tester.takeException(), isNull);
    await tester.tap(find.text('Settings'));
    await tester.pumpAndSettle();
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox());
  });
  test(
    'Hadith entries retain separate Arabic text, references and review status',
    () {
      final hadiths =
          jsonDecode(File('assets/data/hadiths.json').readAsStringSync())
              as List;
      final duas =
          jsonDecode(File('assets/data/duas.json').readAsStringSync()) as List;
      expect(hadiths.length, 8);
      expect([...hadiths, ...duas].map((r) => r['id']).toSet().length, 20);
      for (final h in hadiths) {
        expect(h['kind'], 'hadith');
        expect(h['arabic'], isNotEmpty);
        expect(h['kashmiri'], isNotEmpty);
        expect(h['narrator'], isNotEmpty);
        expect(Uri.parse(h['sourceUrl']).host, 'sunnah.com');
        expect(h['source'], isNotEmpty);
        expect(h['excerpt'], isA<bool>());
        expect(h['reviewStatus'], 'draft-awaiting-owner-review');
        expect(h['arabicScope'], contains('chain of transmission omitted'));
      }
    },
  );
  testWidgets('Hadith search, saved filter and Amiri reading size persist', (
    tester,
  ) async {
    tester.view.physicalSize = const Size(320, 740);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    SharedPreferences.setMockInitialValues({'large': true});
    final prefs = await SharedPreferences.getInstance();
    final state = AppState(prefs);
    final hadiths =
        (jsonDecode(File('assets/data/hadiths.json').readAsStringSync())
                as List)
            .map((r) => Map<String, dynamic>.from(r))
            .toList();
    await tester.pumpWidget(
      NoorApp(
        state: state,
        duas: [
          {'arabic': 'دُعَاء', 'kashmiri': 'دُعا', 'title': 'دُعا'},
        ],
        hadiths: hadiths,
      ),
    );
    await tester.pumpAndSettle();
    await tester.tap(find.text('Hadith'));
    await tester.pumpAndSettle();
    await tester.enterText(find.byType(TextField), 'intentions');
    await tester.pumpAndSettle();
    await tester.scrollUntilVisible(
      find.text('Actions and intentions'),
      200,
      scrollable: find.byType(Scrollable).first,
    );
    expect(find.text('Actions and intentions'), findsOneWidget);
    await tester.ensureVisible(find.text('Actions and intentions'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Actions and intentions'));
    await tester.pumpAndSettle();
    expect(find.text('Hadith & reflection'), findsOneWidget);
    final arabic = tester.widget<SelectableText>(
      find.byType(SelectableText).first,
    );
    expect(arabic.style!.fontFamily, 'Arabic');
    expect(arabic.textDirection, TextDirection.rtl);
    await tester.tap(find.byTooltip('Larger Arabic'));
    await tester.pumpAndSettle();
    expect(state.arabicScale, closeTo(1.1, .001));
    await tester.tap(find.byTooltip('Save hadith'));
    await tester.pumpAndSettle();
    expect(state.favourites, contains('hadith-intentions'));
    expect(AppState(prefs).arabicScale, closeTo(1.1, .001));
    await tester.pageBack();
    await tester.pumpAndSettle();
    await tester.scrollUntilVisible(
      find.byTooltip('Show saved hadiths'),
      -200,
      scrollable: find.byType(Scrollable).first,
    );
    await tester.tap(find.byTooltip('Show saved hadiths'));
    await tester.pumpAndSettle();
    await tester.scrollUntilVisible(
      find.text('Actions and intentions'),
      200,
      scrollable: find.byType(Scrollable).first,
    );
    expect(find.text('Actions and intentions'), findsOneWidget);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox());
  });
}
