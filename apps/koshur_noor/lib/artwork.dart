import 'dart:math' as math;
import 'package:flutter/material.dart';

/// Original vector artwork: no downloaded artwork or external image service.
class ValleyPainter extends CustomPainter {
  final bool dark;
  const ValleyPainter({this.dark = false});
  @override
  void paint(Canvas c, Size s) {
    final sky = Paint()
      ..shader = const LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [Color(0xff254d52), Color(0xff668c85)],
      ).createShader(Offset.zero & s);
    c.drawRect(Offset.zero & s, sky);
    final stars = Paint()
      ..color = const Color(0xffe8d8ac).withValues(alpha: .6);
    for (var i = 0; i < 20; i++) {
      final x = ((i * 71 + 21) % 360) / 360 * s.width;
      final y = ((i * 37 + 12) % 100) / 250 * s.height;
      c.drawCircle(Offset(x, y), i % 3 == 0 ? 1.3 : .7, stars);
    }
    c.drawCircle(
      Offset(s.width * .81, s.height * .22),
      19,
      Paint()..color = const Color(0xfff3dfaa),
    );
    c.drawCircle(
      Offset(s.width * .83, s.height * .19),
      18,
      Paint()..color = const Color(0xff3b6464),
    );
    void ridge(double y, Color color, int phase) {
      final p = Path()..moveTo(0, s.height);
      for (int i = 0; i < 9; i++) {
        p.lineTo(
          s.width * i / 8,
          s.height * (y + math.sin(i * 2.3 + phase) * .09),
        );
      }
      p.lineTo(s.width, s.height);
      p.close();
      c.drawPath(p, Paint()..color = color);
    }

    ridge(.55, const Color(0xff416d69), 1);
    ridge(.68, const Color(0xff294f4d), 2);
    ridge(.88, const Color(0xff193e3c), 4);
    final p = Paint()..color = const Color(0xff143431);
    final base = s.height * .92;
    final center = s.width * .65;
    final width = s.width * .37;
    c.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(center - width / 2, base - 55, width, 60),
        const Radius.circular(3),
      ),
      p,
    );
    final dome = Path()
      ..moveTo(center - width * .36, base - 55)
      ..cubicTo(
        center - width * .36,
        base - 86,
        center - 9,
        base - 88,
        center,
        base - 106,
      )
      ..cubicTo(
        center + 9,
        base - 88,
        center + width * .36,
        base - 86,
        center + width * .36,
        base - 55,
      )
      ..close();
    c.drawPath(dome, p);
    for (final x in [center - width * .54, center + width * .54]) {
      c.drawRect(Rect.fromLTWH(x - 4, base - 105, 8, 110), p);
      c.drawOval(
        Rect.fromCenter(center: Offset(x, base - 109), width: 15, height: 14),
        p,
      );
      c.drawLine(
        Offset(x, base - 115),
        Offset(x, base - 130),
        Paint()
          ..color = p.color
          ..strokeWidth = 2,
      );
    }
    for (var i = -1; i <= 1; i++) {
      final r = Rect.fromLTWH(center + i * 26 - 6, base - 35, 12, 29);
      c.drawRRect(
        RRect.fromRectAndRadius(r, const Radius.circular(8)),
        Paint()..color = const Color(0xffd0b17c).withValues(alpha: .7),
      );
    }
    final water = Paint()
      ..color = const Color(0xff8bab98).withValues(alpha: .25)
      ..strokeWidth = 1;
    for (var i = 0; i < 5; i++) {
      c.drawLine(
        Offset(10 + i * 11, s.height - 12 + i * 3),
        Offset(s.width * .4 + i * 4, s.height - 12 + i * 3),
        water,
      );
    }
  }

  @override
  bool shouldRepaint(covariant ValleyPainter old) => old.dark != dark;
}

class CompassPainter extends CustomPainter {
  final double bearing;
  final Color ink;
  CompassPainter(this.bearing, this.ink);
  @override
  void paint(Canvas c, Size s) {
    final o = Offset(s.width / 2, s.height / 2);
    final r = s.width * .4;
    c.drawCircle(o, r, Paint()..color = ink.withValues(alpha: .08));
    for (var i = 0; i < 60; i++) {
      final a = i * math.pi / 30;
      final inner = r - (i % 5 == 0 ? 14 : 6);
      c.drawLine(
        o + Offset(math.sin(a) * inner, -math.cos(a) * inner),
        o + Offset(math.sin(a) * r, -math.cos(a) * r),
        Paint()
          ..color = ink.withValues(alpha: i % 5 == 0 ? 0.7 : 0.2)
          ..strokeWidth = i % 5 == 0 ? 2 : 1,
      );
    }
    c.save();
    c.translate(o.dx, o.dy);
    c.rotate(bearing * math.pi / 180);
    final path = Path()
      ..moveTo(0, -r + 28)
      ..lineTo(15, 26)
      ..lineTo(0, 16)
      ..lineTo(-15, 26)
      ..close();
    c.drawPath(path, Paint()..color = const Color(0xffba8a44));
    c.restore();
    c.drawCircle(o, 6, Paint()..color = ink);
  }

  @override
  bool shouldRepaint(covariant CompassPainter old) =>
      old.bearing != bearing || old.ink != ink;
}
