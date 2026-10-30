import 'dart:ui';
import 'package:flutter/material.dart';

/// Subtle translucent paper with restrained brass outlines.
/// High contrast mode uses opaque surfaces and removes backdrop blur.
class GlassPanel extends StatelessWidget {
  final Widget child;
  final EdgeInsets padding;
  final bool enabled;
  const GlassPanel({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(20),
    this.enabled = true,
  });

  @override
  Widget build(BuildContext context) {
    final highContrast = MediaQuery.highContrastOf(context);
    final glass = enabled && !highContrast;
    final dark = Theme.of(context).brightness == Brightness.dark;
    final base = Theme.of(context).cardColor;
    final corner = BorderRadius.circular(23);
    return DecoratedBox(
      decoration: BoxDecoration(
        borderRadius: corner,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: dark ? .10 : .035),
            blurRadius: 21,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: corner,
        child: BackdropFilter(
          enabled: glass,
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
          child: DecoratedBox(
            decoration: BoxDecoration(
              gradient: glass
                  ? LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: [
                        base.withValues(alpha: dark ? .94 : .98),
                        base.withValues(alpha: dark ? .85 : .88),
                      ],
                    )
                  : null,
              color: glass ? null : base,
              borderRadius: corner,
              border: Border.all(
                color: dark
                    ? const Color(0xff547264).withValues(alpha: .55)
                    : const Color(0xffe2d9c8),
              ),
            ),
            child: Padding(padding: padding, child: child),
          ),
        ),
      ),
    );
  }
}
