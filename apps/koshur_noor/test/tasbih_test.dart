import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:koshur_noor/app_state.dart';
import 'package:koshur_noor/real_tasbih.dart';

void main() {
  test('Tasbih SFX is on, voice is opt-in and both persist locally', () async {
    SharedPreferences.setMockInitialValues({});
    final prefs = await SharedPreferences.getInstance();
    final state = AppState(prefs);
    expect(state.tasbihClick, isTrue);
    expect(state.tasbihVoice, isFalse);
    await state.update(() {
      state.tasbihClick = false;
      state.tasbihVoice = true;
    });
    final restored = AppState(prefs);
    expect(restored.tasbihClick, isFalse);
    expect(restored.tasbihVoice, isTrue);
  });

  test('Tasbih progress fills at a completed round', () {
    expect(tasbihProgress(0, 33), 0);
    expect(tasbihProgress(11, 33), closeTo(1 / 3, .001));
    expect(tasbihProgress(33, 33), 1);
    expect(tasbihProgress(34, 33), closeTo(1 / 33, .001));
  });

  testWidgets(
    'Beads count once per tap or pull and support keyboard counting',
    (tester) async {
      var count = 0;
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: StatefulBuilder(
              builder: (context, update) => RealTasbih(
                count: count,
                target: 33,
                onCount: () => update(() => count++),
              ),
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();
      await tester.tap(find.byType(RealTasbih));
      await tester.pumpAndSettle();
      expect(count, 1);
      await tester.drag(find.byType(RealTasbih), const Offset(0, 55));
      await tester.pumpAndSettle();
      expect(count, 2);
      await tester.sendKeyEvent(LogicalKeyboardKey.space);
      await tester.pumpAndSettle();
      expect(count, 3);
      expect(tester.takeException(), isNull);
    },
  );
}
