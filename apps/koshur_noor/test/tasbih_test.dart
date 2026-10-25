import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:koshur_noor/real_tasbih.dart';

void main() {
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
