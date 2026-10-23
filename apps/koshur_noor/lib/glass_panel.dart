import 'dart:ui';
import 'package:flutter/material.dart';

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
    final glass = enabled && !MediaQuery.highContrastOf(context);
    final dark = Theme.of(context).brightness == Brightness.dark;
    final panel = Material(
      color: Theme.of(
        context,
      ).cardColor.withValues(alpha: glass ? (dark ? .86 : .76) : 1),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(22),
        side: BorderSide(
          color: glass
              ? Colors.white.withValues(alpha: dark ? .18 : .7)
              : Theme.of(context).dividerColor,
        ),
      ),
      child: Padding(padding: padding, child: child),
    );
    return ClipRRect(
      borderRadius: BorderRadius.circular(22),
      child: glass
          ? BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
              child: panel,
            )
          : panel,
    );
  }
}
