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
    HapticFeedback.selectionClick();
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
          height: 360,
          width: 330,
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
                  size: const Size(330, 360),
                  painter: BeadPainter(
                    phase: phase,
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
                    Text(
                      '${widget.count}',
                      style: TextStyle(
                        fontFamily: 'ClassicalSerif',
                        fontSize: widget.count > 9999 ? 42 : 62,
                        height: 1.2,
                      ),
                    ),
                    const Text(
                      'TAP TO COUNT',
                      style: TextStyle(
                        fontSize: 9,
                        letterSpacing: 1.8,
                        color: Color(0xffa24e36),
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

class BeadPainter extends CustomPainter {
  final double phase;
  final bool dark;
  const BeadPainter({required this.phase, required this.dark});
  @override
  void paint(Canvas canvas, Size size) {
    final scale = math.min(size.width / 330, size.height / 360);
    canvas.save();
    canvas.translate((size.width - 330 * scale) / 2, 0);
    canvas.scale(scale);
    const center = Offset(165, 145);
    final ring = Rect.fromCenter(center: center, width: 242, height: 242);
    canvas.drawOval(
      ring.shift(const Offset(0, 8)),
      Paint()
        ..color = Colors.black.withValues(alpha: .045)
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 10),
    );
    canvas.drawOval(
      ring,
      Paint()
        ..color = const Color(0xff8a5832)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2.5,
    );
    // 33 beads glide one position with every count; lighting stays fixed.
    for (var i = 0; i < 33; i++) {
      final angle = -math.pi / 2 + (i + phase) * 2 * math.pi / 33;
      final pos = center + Offset(math.cos(angle) * 121, math.sin(angle) * 121);
      final marker = i % 11 == 0;
      final radius = marker ? 10.6 : 10.1;
      canvas.drawCircle(
        pos + const Offset(1.5, 3),
        radius,
        Paint()
          ..color = Colors.black.withValues(alpha: .18)
          ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 2.5),
      );
      canvas.drawCircle(
        pos,
        radius,
        Paint()
          ..shader = RadialGradient(
            center: const Alignment(-.45, -.55),
            radius: 1.1,
            colors: marker
                ? const [
                    Color(0xffffe4a3),
                    Color(0xffc29543),
                    Color(0xff714322),
                  ]
                : [
                    const Color(0xfff3cc91),
                    Color.lerp(
                      const Color(0xffc48a4e),
                      const Color(0xff9e6232),
                      (i % 5) / 7,
                    )!,
                    const Color(0xff633c25),
                  ],
          ).createShader(Rect.fromCircle(center: pos, radius: radius)),
      );
      canvas.save();
      canvas.clipPath(
        Path()..addOval(Rect.fromCircle(center: pos, radius: radius - .8)),
      );
      for (var g = 0; g < 4; g++) {
        canvas.drawArc(
          Rect.fromCenter(
            center: pos + Offset(2.0 + g, 0),
            width: radius * (.6 + g * .35),
            height: radius * 2.5,
          ),
          -1.5,
          3.1,
          false,
          Paint()
            ..style = PaintingStyle.stroke
            ..strokeWidth = .55
            ..color = const Color(0xff704322).withValues(alpha: .19),
        );
      }
      canvas.restore();
      canvas.drawOval(
        Rect.fromCenter(
          center: pos + const Offset(-3, -4),
          width: 5,
          height: 2.5,
        ),
        Paint()
          ..color = Colors.white.withValues(alpha: .36)
          ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 1),
      );
    }
    // Imame and tied silk tassel below the strand.
    canvas.drawLine(
      const Offset(165, 266),
      const Offset(165, 288),
      Paint()
        ..color = const Color(0xff9a713f)
        ..strokeWidth = 3,
    );
    final imame = RRect.fromRectAndRadius(
      const Rect.fromLTWH(157, 277, 16, 34),
      const Radius.circular(8),
    );
    canvas.drawRRect(
      imame,
      Paint()
        ..shader = const LinearGradient(
          colors: [Color(0xff74462c), Color(0xffe4b879), Color(0xff80512e)],
        ).createShader(imame.outerRect),
    );
    canvas.drawOval(
      const Rect.fromLTWH(154, 308, 22, 7),
      Paint()..color = const Color(0xffb68d48),
    );
    for (var i = 0; i < 24; i++) {
      final p = Path()
        ..moveTo(160 + (i % 10), 313)
        ..quadraticBezierTo(
          146 + i * 1.6,
          335,
          144 + i * 1.85,
          348 + (i % 3) * 2,
        );
      canvas.drawPath(
        p,
        Paint()
          ..style = PaintingStyle.stroke
          ..strokeWidth = 1.3
          ..color = Color.lerp(
            const Color(0xffb88b4c),
            const Color(0xff74462c),
            (i % 5) / 5,
          )!,
      );
    }
    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant BeadPainter old) =>
      old.phase != phase || old.dark != dark;
}
