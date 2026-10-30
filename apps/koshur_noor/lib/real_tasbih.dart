import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// Procedural, resolution-independent wooden beads; no downloaded imagery.
class RealTasbih extends StatefulWidget {
  final int count, target;
  final VoidCallback onCount;
  const RealTasbih({
    super.key,
    required this.count,
    required this.target,
    required this.onCount,
  });
  @override
  State<RealTasbih> createState() => _RealTasbihState();
}

class _RealTasbihState extends State<RealTasbih> {
  double drag = 0;
  void count() {
    final next = widget.count + 1;
    if (next % widget.target == 0) {
      HapticFeedback.heavyImpact();
    } else if (next % 11 == 0) {
      HapticFeedback.mediumImpact();
    } else {
      HapticFeedback.selectionClick();
    }
    widget.onCount();
  }

  @override
  Widget build(BuildContext context) => FocusableActionDetector(
    autofocus: true,
    shortcuts: const {
      SingleActivator(LogicalKeyboardKey.space): ActivateIntent(),
      SingleActivator(LogicalKeyboardKey.enter): ActivateIntent(),
    },
    actions: {
      ActivateIntent: CallbackAction<ActivateIntent>(
        onInvoke: (_) {
          count();
          return null;
        },
      ),
    },
    child: Semantics(
      button: true,
      label: 'Tasbih beads. ${widget.count} counts. Tap or pull to count.',
      onTap: count,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: count,
        onVerticalDragStart: (_) => drag = 0,
        onVerticalDragUpdate: (d) => drag += d.delta.dy,
        onVerticalDragEnd: (_) {
          if (drag.abs() >= 24) count();
          drag = 0;
        },
        child: SizedBox(
          height: 372,
          width: double.infinity,
          child: Stack(
            alignment: Alignment.center,
            children: [
              TweenAnimationBuilder<double>(
                tween: Tween(end: widget.count.toDouble()),
                duration: Duration(
                  milliseconds: MediaQuery.disableAnimationsOf(context)
                      ? 0
                      : 420,
                ),
                curve: Curves.easeOutCubic,
                builder: (_, phase, _) => CustomPaint(
                  size: const Size(330, 372),
                  painter: BeadPainter(
                    phase: phase,
                    progress: tasbihProgress(widget.count, widget.target),
                    dark: Theme.of(context).brightness == Brightness.dark,
                  ),
                ),
              ),
              Positioned(
                top: 94,
                left: 70,
                right: 70,
                child: Column(
                  children: [
                    AnimatedSwitcher(
                      duration: const Duration(milliseconds: 180),
                      transitionBuilder: (child, animation) => ScaleTransition(
                        scale: Tween(begin: .82, end: 1.0).animate(animation),
                        child: FadeTransition(opacity: animation, child: child),
                      ),
                      child: Text(
                        '${widget.count}',
                        key: ValueKey(widget.count),
                        style: TextStyle(
                          fontFamily: 'ClassicalSerif',
                          fontSize: widget.count > 9999 ? 42 : 62,
                          height: 1.2,
                        ),
                      ),
                    ),
                    const Text(
                      'TAP OR PULL A BEAD',
                      style: TextStyle(
                        fontSize: 9,
                        letterSpacing: 1.35,
                        fontWeight: FontWeight.w700,
                        color: Color(0xffa77437),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      '${widget.count % widget.target} / ${widget.target}',
                      style: const TextStyle(fontSize: 12),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    ),
  );
}

double tasbihProgress(int count, int target) {
  if (count <= 0 || target <= 0) return 0;
  final remainder = count % target;
  return remainder == 0 ? 1 : remainder / target;
}

/// Hand-turned wooden misbaha drawn locally, without external image assets.
class BeadPainter extends CustomPainter {
  final double phase, progress;
  final bool dark;
  const BeadPainter({required this.phase, required this.progress, required this.dark});

  @override
  void paint(Canvas canvas, Size size) {
    final scale = math.min(size.width / 330, size.height / 372);
    canvas.save();
    canvas.translate((size.width - 330 * scale) / 2, 0);
    canvas.scale(scale);
    const center = Offset(165, 145);
    const radius = 121.0;
    final ring = Rect.fromCircle(center: center, radius: radius);

    canvas.drawCircle(
      center + const Offset(0, 5), 130,
      Paint()
        ..color = Colors.black.withValues(alpha: dark ? .29 : .13)
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 22),
    );
    canvas.drawCircle(
      center, 117,
      Paint()
        ..shader = RadialGradient(
          center: const Alignment(-.35, -.5),
          radius: 1.14,
          colors: dark
              ? const [Color(0xff315a49), Color(0xff21483e), Color(0xff102a24)]
              : const [Color(0xfffffcf3), Color(0xfff4eddf), Color(0xffe3d9c8)],
        ).createShader(Rect.fromCircle(center: center, radius: 119)),
    );
    canvas.drawCircle(
      center, 97,
      Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1
        ..color = const Color(0xffc1a371).withValues(alpha: .5),
    );

    canvas.drawOval(
      ring.shift(const Offset(1.0, 2.5)),
      Paint()
        ..color = Colors.black.withValues(alpha: .30)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 4.6,
    );
    canvas.drawOval(
      ring,
      Paint()
        ..shader = const SweepGradient(
          colors: [
            Color(0xffb28b56), Color(0xff59402c),
            Color(0xffe0c496), Color(0xff65482b),
            Color(0xffb28b56),
          ],
        ).createShader(ring)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 3.1,
    );
    canvas.drawArc(
      ring.inflate(15), -math.pi / 2, math.pi * 2 * progress, false,
      Paint()
        ..color = const Color(0xffc9a15b)
        ..style = PaintingStyle.stroke
        ..strokeCap = StrokeCap.round
        ..strokeWidth = 3.6,
    );

    // Beads rotate around a stationary light. Every eleventh is gilded.
    for (var i = 0; i < 33; i++) {
      final angle = -math.pi / 2 + (i + phase) * 2 * math.pi / 33;
      final point = center +
          Offset(math.cos(angle) * radius, math.sin(angle) * radius);
      final spacer = i % 11 == 0;
      final hue = (i * 7) % 6;
      canvas.save();
      canvas.translate(point.dx, point.dy);
      canvas.rotate(angle + math.pi / 2);
      final oval = Rect.fromCenter(
        center: Offset.zero, width: spacer ? 19.2 : 18.2,
        height: spacer ? 22 : 21,
      );
      canvas.drawOval(
        oval.shift(const Offset(1.4, 2.4)),
        Paint()
          ..color = Colors.black.withValues(alpha: .28)
          ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 2.2),
      );
      canvas.drawOval(
        oval,
        Paint()
          ..shader = RadialGradient(
            center: const Alignment(-.52, -.67),
            radius: 1.03,
            colors: spacer
                ? const [
                    Color(0xffffecb5), Color(0xffd1a856), Color(0xff6e4827),
                  ]
                : [
                    Color.lerp(const Color(0xfff6c990),
                        const Color(0xffffdfac), hue / 10)!,
                    Color.lerp(const Color(0xffb97e45),
                        const Color(0xff926038), hue / 8)!,
                    const Color(0xff3d261c),
                  ],
          ).createShader(oval),
      );
      canvas.save();
      canvas.clipPath(Path()..addOval(oval));
      if (spacer) {
        for (final y in [-7.0, 7.0]) {
          canvas.drawLine(
            Offset(-8, y), Offset(8, y),
            Paint()
              ..color = const Color(0xffffe0a0).withValues(alpha: .65)
              ..strokeWidth = 1.25,
          );
        }
      } else {
        for (var g = 0; g < 5; g++) {
          final x = -7.2 + g * 3.1;
          canvas.drawPath(
            Path()
              ..moveTo(x, -11)
              ..cubicTo(x - 2.1, -3, x + 2.5, 3.0, x - 1.4, 11),
            Paint()
              ..style = PaintingStyle.stroke
              ..strokeWidth = .48
              ..color = const Color(0xff512e1e)
                  .withValues(alpha: .09 + (g % 3) * .05),
          );
        }
      }
      canvas.restore();
      // Drilled wood openings and a small specular highlight.
      for (final y in [-9.7, 9.7]) {
        canvas.drawOval(
          Rect.fromCenter(center: Offset(0, y), width: 6, height: 2.4),
          Paint()..color = const Color(0xff4e3121).withValues(alpha: .78),
        );
      }
      canvas.drawOval(
        const Rect.fromLTWH(-5.5, -7, 7, 3.7),
        Paint()
          ..color = Colors.white.withValues(alpha: spacer ? .48 : .35)
          ..maskFilter = const MaskFilter.blur(BlurStyle.normal, .9),
      );
      canvas.restore();
    }

    // Turned wooden imame and finely braided thread tassel.
    canvas.drawLine(
      const Offset(165, 263), const Offset(165, 285),
      Paint()
        ..color = const Color(0xffad8953)
        ..strokeCap = StrokeCap.round
        ..strokeWidth = 2.8,
    );
    final stem = RRect.fromRectAndRadius(
      const Rect.fromLTWH(157, 283, 16, 34), const Radius.circular(8),
    );
    canvas.drawRRect(
      stem,
      Paint()
        ..shader = const LinearGradient(
          colors: [
            Color(0xff4f2c1e), Color(0xffc38b52),
            Color(0xfff0c78d), Color(0xff7b4a2c),
          ],
        ).createShader(stem.outerRect),
    );
    for (final y in [289.0, 308.0]) {
      canvas.drawLine(
        Offset(158, y), Offset(172, y),
        Paint()
          ..color = const Color(0xffddc18a)
          ..strokeWidth = 1.2,
      );
    }
    canvas.drawOval(
      const Rect.fromLTWH(153, 314, 24, 8),
      Paint()
        ..shader = const LinearGradient(
          colors: [Color(0xff72502e), Color(0xffe3bc7a), Color(0xff755032)],
        ).createShader(const Rect.fromLTWH(153, 314, 24, 8)),
    );
    for (var i = 0; i < 26; i++) {
      final path = Path()
        ..moveTo(162 + (i % 7), 320)
        ..quadraticBezierTo(
          151 + i * 1.02, 338, 144 + i * 1.60, 355 + i % 4,
        );
      canvas.drawPath(
        path,
        Paint()
          ..style = PaintingStyle.stroke
          ..strokeCap = StrokeCap.round
          ..strokeWidth = .7 + (i % 3) * .27
          ..color = Color.lerp(
            const Color(0xff6b4a2a),
            const Color(0xffedcb94),
            (i % 7) / 7,
          )!,
      );
    }
    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant BeadPainter old) =>
      old.phase != phase || old.progress != progress || old.dark != dark;
}
