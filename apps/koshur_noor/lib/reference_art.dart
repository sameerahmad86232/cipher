import 'dart:math' as math;
import 'package:flutter/material.dart';

/// Original vector artwork inspired by the supplied coral/peach reference.
class SunsetBackdropPainter extends CustomPainter {
  final bool dark;
  const SunsetBackdropPainter({this.dark = false});
  @override
  void paint(Canvas c, Size s) {
    c.drawRect(
      Offset.zero & s,
      Paint()
        ..shader = LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: dark
              ? const [Color(0xff793e37), Color(0xffb77950), Color(0xffdbad79)]
              : const [Color(0xfff46767), Color(0xfff79e83), Color(0xfffbd7a1)],
        ).createShader(Offset.zero & s),
    );
    for (var i = 0; i < 4; i++) {
      final y = s.height * (.24 + i * .17);
      final path = Path()
        ..moveTo(0, y)
        ..cubicTo(s.width * .3, y + 22, s.width * .6, y - 14, s.width, y + 8)
        ..lineTo(s.width, y + 14)
        ..cubicTo(s.width * .6, y - 8, s.width * .3, y + 30, 0, y + 8)
        ..close();
      c.drawPath(
        path,
        Paint()..color = const Color(0xffffe7c8).withValues(alpha: .15),
      );
    }
    final h = (s.height * .28).clamp(72.0, 210.0);
    final base = s.height - 15;
    final cx = s.width * .54;
    final w = s.width * .65;
    // Distant architectural layers.
    c.drawRect(
      Rect.fromLTWH(s.width * .08, base - h * .76, 7, h * .8),
      Paint()..color = const Color(0xffcb8e64).withValues(alpha: .21),
    );
    final brown = Paint()
      ..color = dark ? const Color(0xff4b2d21) : const Color(0xff794329);
    c.drawRect(Rect.fromLTWH(0, base - 12, s.width, 27), brown);
    c.drawRect(
      Rect.fromLTWH(cx - w * .42, base - h * .38, w * .84, h * .4),
      brown,
    );
    void dome(double x, double y, double width, double height) {
      final p = Path()
        ..moveTo(x - width / 2, y)
        ..cubicTo(
          x - width / 2,
          y - height * .55,
          x - width * .13,
          y - height * .7,
          x,
          y - height,
        )
        ..cubicTo(
          x + width * .13,
          y - height * .7,
          x + width / 2,
          y - height * .55,
          x + width / 2,
          y,
        )
        ..close();
      c.drawPath(p, brown);
    }

    dome(cx, base - h * .38, w * .36, h * .47);
    dome(cx - w * .29, base - h * .38, w * .17, h * .25);
    dome(cx + w * .29, base - h * .38, w * .17, h * .25);
    for (final x in [cx - w * .47, cx + w * .47]) {
      c.drawRect(Rect.fromLTWH(x - 4, base - h * .84, 8, h * .86), brown);
      c.drawRect(Rect.fromLTWH(x - 7, base - h * .63, 14, 3), brown);
      dome(x, base - h * .83, 12, h * .12);
      c.drawLine(
        Offset(x, base - h * .96),
        Offset(x, base - h * 1.04),
        Paint()
          ..color = brown.color
          ..strokeWidth = 1,
      );
    }
    final moonCenter = Offset(cx + 3, base - h * .94);
    c.drawArc(
      Rect.fromCircle(center: moonCenter, radius: 5),
      math.pi * .4,
      math.pi * 1.5,
      false,
      Paint()
        ..color = brown.color
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1.3,
    );
    c.drawLine(
      Offset(cx, base - h * .85),
      Offset(cx, base - h * .92),
      Paint()
        ..color = brown.color
        ..strokeWidth = 1,
    );
    final light = Paint()..color = const Color(0xffffe4bd);
    for (var i = -1; i <= 1; i++) {
      final x = cx + i * w * .29,
          ww = i == 0 ? 17.0 : 10.0,
          hh = i == 0 ? h * .26 : h * .16;
      c.drawRRect(
        RRect.fromRectAndCorners(
          Rect.fromLTWH(x - ww / 2, base - hh - 12, ww, hh),
          topLeft: Radius.circular(ww / 2),
          topRight: Radius.circular(ww / 2),
        ),
        light,
      );
    }
  }

  @override
  bool shouldRepaint(covariant SunsetBackdropPainter old) => old.dark != dark;
}
