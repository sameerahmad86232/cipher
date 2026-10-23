import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'app_state.dart';
import 'device_services.dart';
import 'reference_art.dart';

class QiblaScreen extends StatefulWidget {
  final AppState state;
  final Future<void> Function() onPickCity;
  final HeadingSource? headings;
  final DeviceLocator? locator;
  const QiblaScreen({
    super.key,
    required this.state,
    required this.onPickCity,
    this.headings,
    this.locator,
  });
  @override
  State<QiblaScreen> createState() => _QiblaScreenState();
}

class _QiblaScreenState extends State<QiblaScreen> with WidgetsBindingObserver {
  StreamSubscription<HeadingSample>? sub;
  Timer? freshness;
  HeadingSample? sample;
  DateTime? sampledAt;
  double unwrapped = 0;
  bool busy = false, wasAligned = false;
  String? compassError;
  LocationProblem? locationError;
  late final DeviceLocator locator;
  late final HeadingSource headings;
  DateTime started = DateTime.now(),
      lastHaptic = DateTime.fromMillisecondsSinceEpoch(0);
  String coordinates = '';
  int generation = 0;
  AppState get s => widget.state;
  bool get fresh =>
      sampledAt != null && DateTime.now().difference(sampledAt!).inSeconds < 4;
  bool get aligned =>
      fresh &&
      sample?.calibrated == true &&
      alignedWithQibla(sample!.heading, s.service.bearing);
  @override
  void initState() {
    super.initState();
    locator = widget.locator ?? PhoneLocator();
    headings = widget.headings ?? PhoneHeadingSource();
    WidgetsBinding.instance.addObserver(this);
    s.addListener(changed);
    startCompass();
    freshness = Timer.periodic(const Duration(seconds: 1), (_) {
      if (mounted &&
          sample == null &&
          compassError == null &&
          DateTime.now().difference(started).inSeconds > 8) {
        setState(
          () => compassError =
              'No compass readings were received. Use the reference bearing or retry on a phone with compass sensors.',
        );
      }
      if (mounted && sampledAt != null && !fresh) {
        setState(() => wasAligned = false);
      }
    });
  }

  void changed() {
    final key = '${s.city.latitude}:${s.city.longitude}';
    if (key != coordinates) startCompass();
    if (mounted) setState(() {});
  }

  Future<void> startCompass() async {
    final token = ++generation;
    coordinates = '${s.city.latitude}:${s.city.longitude}';
    await sub?.cancel();
    if (!mounted || token != generation) return;
    setState(() {
      started = DateTime.now();
      sample = null;
      sampledAt = null;
      compassError = null;
      wasAligned = false;
    });
    sub = headings
        .watch(s.city)
        .listen(
          (e) {
            if (!mounted || token != generation) return;
            final nowAligned =
                e.calibrated && alignedWithQibla(e.heading, s.service.bearing);
            if (nowAligned &&
                !wasAligned &&
                DateTime.now().difference(lastHaptic).inSeconds >= 2) {
              HapticFeedback.selectionClick();
              lastHaptic = DateTime.now();
            }
            setState(() {
              unwrapped = sample == null
                  ? e.heading
                  : unwrapHeading(unwrapped, e.heading);
              compassError = null;
              sample = e;
              sampledAt = DateTime.now();
              wasAligned = nowAligned;
            });
          },
          onError: (Object error) {
            if (mounted && token == generation) {
              setState(
                () => compassError =
                    'A live compass is not available on this device. Use a reliable true-north compass with the reference bearing below.',
              );
            }
          },
        );
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) startCompass();
  }

  @override
  void dispose() {
    generation++;
    sub?.cancel();
    freshness?.cancel();
    s.removeListener(changed);
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  Future<void> locate() async {
    setState(() {
      busy = true;
      locationError = null;
    });
    try {
      final city = await locator.locate();
      if (!mounted) return;
      await s.update(() => s.city = city);
    } on LocationProblem catch (e) {
      if (mounted) {
        setState(() {
          locationError = e;
          busy = false;
        });
        await showLocationProblem(e);
      }
    } catch (_) {
      if (mounted) {
        setState(
          () => locationError = const LocationProblem(
            'unavailable',
            'Location could not be read. Try again or select a city.',
          ),
        );
      }
    } finally {
      if (mounted) setState(() => busy = false);
    }
  }

  Future<void> showLocationProblem(LocationProblem problem) async {
    if (!mounted) return;
    await showDialog<void>(
      context: context,
      builder: (c) => AlertDialog(
        backgroundColor: const Color(0xfffffbf7),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(22)),
        icon: const CircleAvatar(
          radius: 32,
          backgroundColor: Color(0xffb4dff3),
          child: Icon(
            Icons.phonelink_setup,
            size: 34,
            color: Color(0xff805742),
          ),
        ),
        content: Text(
          problem.message,
          textAlign: TextAlign.center,
          style: const TextStyle(
            fontSize: 13,
            height: 1.7,
            color: Color(0xff4e3328),
          ),
        ),
        actionsAlignment: MainAxisAlignment.center,
        actions: [
          if (problem.code == 'disabled' || problem.code == 'blocked')
            FilledButton(
              onPressed: () async {
                Navigator.pop(c);
                try {
                  if (problem.code == 'disabled') {
                    await locator.openLocationSettings();
                  } else {
                    await locator.openAppSettings();
                  }
                } catch (_) {}
              },
              style: FilledButton.styleFrom(
                backgroundColor: const Color(0xff65acd2),
              ),
              child: Text(
                problem.code == 'disabled'
                    ? 'Enable your location'
                    : 'Open app permissions',
              ),
            ),
          TextButton(
            onPressed: () => Navigator.pop(c),
            child: const Text(
              'Close',
              style: TextStyle(color: Color(0xffbc5145)),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final bearing = s.service.bearing;
    final width = math.min(MediaQuery.sizeOf(context).width * 0.64, 330.0);
    final reduced = MediaQuery.disableAnimationsOf(context);
    final status = compassError != null
        ? 'Reference bearing only'
        : sample == null
        ? 'Waiting for the phone compass…'
        : !fresh
        ? 'Compass paused — move the phone gently'
        : !sample!.calibrated
        ? 'Calibrate your compass'
        : aligned
        ? 'You are facing the Qibla'
        : 'Turn ${shortestTurn(sample!.heading, bearing) >= 0 ? 'right' : 'left'} ${shortestTurn(sample!.heading, bearing).abs().round()}°';
    return Scaffold(
      extendBodyBehindAppBar: true,
      backgroundColor: const Color(0xfffbcf9f),
      appBar: AppBar(
        foregroundColor: Colors.white,
        title: const Text('Qibla compass', style: TextStyle(fontSize: 17)),
        actions: [
          IconButton(
            tooltip: 'Choose a city manually',
            onPressed: widget.onPickCity,
            icon: const Icon(Icons.location_city_outlined),
          ),
        ],
      ),
      body: Stack(
        children: [
          const Positioned.fill(
            child: CustomPaint(painter: SunsetBackdropPainter()),
          ),
          SafeArea(
            child: ListView(
              padding: const EdgeInsets.fromLTRB(24, 64, 24, 32),
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.near_me_outlined,
                      color: Colors.white,
                      size: 15,
                    ),
                    const SizedBox(width: 7),
                    Flexible(
                      child: Text(
                        s.city.name,
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 7),
                Text(
                  '${bearing.toStringAsFixed(2)}°',
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 31,
                    color: Colors.white,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const Text(
                  'QIBLA · CLOCKWISE FROM TRUE NORTH',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 9,
                    color: Colors.white,
                    letterSpacing: 1.2,
                  ),
                ),
                const SizedBox(height: 24),
                Center(
                  child: Semantics(
                    label: status,
                    child: AnimatedContainer(
                      duration: Duration(milliseconds: reduced ? 0 : 300),
                      width: width + 16,
                      height: width + 16,
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: aligned
                            ? const Color(0xff498a6b).withValues(alpha: .35)
                            : Colors.white.withValues(alpha: .24),
                        boxShadow: [
                          BoxShadow(
                            color: const Color(
                              0xff8f4b37,
                            ).withValues(alpha: .13),
                            blurRadius: 30,
                            offset: const Offset(0, 12),
                          ),
                        ],
                      ),
                      child: TweenAnimationBuilder<double>(
                        duration: Duration(milliseconds: reduced ? 0 : 220),
                        curve: Curves.easeOutCubic,
                        tween: Tween(begin: unwrapped, end: unwrapped),
                        builder: (context, value, _) => CustomPaint(
                          painter: LiveCompassPainter(
                            heading: value,
                            bearing: bearing,
                            live: sample != null && fresh,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                Container(
                  padding: const EdgeInsets.all(18),
                  decoration: BoxDecoration(
                    color: const Color(0xfffff9f1).withValues(alpha: .96),
                    borderRadius: BorderRadius.circular(22),
                  ),
                  child: Column(
                    children: [
                      Icon(
                        aligned
                            ? Icons.check_circle_outline
                            : Icons.explore_outlined,
                        color: aligned
                            ? const Color(0xff357459)
                            : const Color(0xff8d4d33),
                        size: 24,
                      ),
                      const SizedBox(height: 8),
                      Text(
                        status,
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          color: Color(0xff693b29),
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        compassError ??
                            'Hold the phone flat, away from metal and magnets. Move it in a figure-eight if the direction is unstable. Sensor accuracy depends on your phone.',
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          color: Color(0xff855e4e),
                          fontSize: 11,
                          height: 1.7,
                        ),
                      ),
                      if (compassError != null)
                        TextButton(
                          onPressed: startCompass,
                          child: const Text('Retry compass'),
                        ),
                    ],
                  ),
                ),
                const SizedBox(height: 14),
                FilledButton.icon(
                  onPressed: busy ? null : locate,
                  style: FilledButton.styleFrom(
                    backgroundColor: const Color(0xff86472f),
                    foregroundColor: Colors.white,
                    minimumSize: const Size.fromHeight(50),
                  ),
                  icon: busy
                      ? const SizedBox(
                          width: 18,
                          height: 18,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Icon(Icons.my_location, size: 19),
                  label: Text(
                    busy
                        ? 'Finding your location…'
                        : s.city.gps
                        ? 'Refresh GPS location'
                        : 'Use my current location',
                  ),
                ),
                const SizedBox(height: 10),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xfffff9f1).withValues(alpha: 0.96),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Text(
                    s.city.gps
                        ? 'Saved GPS position · device timezone ${s.city.zone}\n${s.city.latitude.toStringAsFixed(4)}, ${s.city.longitude.toStringAsFixed(4)}${s.city.accuracyMeters != null ? ' · ±${s.city.accuracyMeters!.round()} m' : ''}'
                        : 'Using selected city coordinates. For your actual position, enable GPS or choose the correct city.',
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 10,
                      height: 1.7,
                      color: Color(0xff673e2b),
                    ),
                  ),
                ),
                if (locationError != null)
                  Padding(
                    padding: const EdgeInsets.only(top: 14),
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(18),
                      ),
                      child: Column(
                        children: [
                          const Icon(
                            Icons.location_off_outlined,
                            color: Color(0xffbd6251),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            locationError!.message,
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                              color: Color(0xff673e2b),
                              fontSize: 12,
                              height: 1.6,
                            ),
                          ),
                          if (locationError!.code == 'disabled' ||
                              locationError!.code == 'blocked')
                            TextButton(
                              onPressed: () async {
                                try {
                                  if (locationError!.code == 'disabled') {
                                    await locator.openLocationSettings();
                                  } else {
                                    await locator.openAppSettings();
                                  }
                                } catch (_) {
                                  /* Keep the manual city choice available. */
                                }
                              },
                              child: Text(
                                locationError!.code == 'disabled'
                                    ? 'Enable location'
                                    : 'Open app permissions',
                              ),
                            ),
                          TextButton(
                            onPressed: widget.onPickCity,
                            child: const Text('Choose city instead'),
                          ),
                        ],
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class LiveCompassPainter extends CustomPainter {
  final double heading, bearing;
  final bool live;
  LiveCompassPainter({
    required this.heading,
    required this.bearing,
    required this.live,
  });
  @override
  void paint(Canvas c, Size s) {
    final o = Offset(s.width / 2, s.height / 2), r = s.width / 2 - 3;
    c.drawCircle(o, r, Paint()..color = const Color(0xffd5c7bd));
    c.drawCircle(o, r - 2, Paint()..color = Colors.white);
    c.drawCircle(
      o,
      r - 9,
      Paint()
        ..style = PaintingStyle.stroke
        ..color = const Color(0xffe4ded9)
        ..strokeWidth = 1,
    );
    c.save();
    c.translate(o.dx, o.dy);
    c.rotate(-heading * math.pi / 180);
    final ink = Paint()
      ..color = const Color(0xffbdc0c0)
      ..strokeWidth = 1;
    for (var i = 0; i < 120; i++) {
      final a = i * math.pi / 60;
      final outer = r - 21;
      final inner = outer - (i % 10 == 0 ? 9 : 3);
      c.drawLine(
        Offset(math.sin(a) * inner, -math.cos(a) * inner),
        Offset(math.sin(a) * outer, -math.cos(a) * outer),
        ink,
      );
    }
    for (var i = 0; i < 8; i++) {
      c.save();
      c.rotate(i * math.pi / 4);
      final p = Path()
        ..moveTo(0, -r * .61)
        ..lineTo(r * .12, 0)
        ..lineTo(0, r * .12)
        ..close();
      c.drawPath(
        p,
        Paint()
          ..color = i.isEven
              ? const Color(0xffd4d5d5)
              : const Color(0xffececec),
      );
      c.restore();
    }
    for (final pair in [(0.0, 'N'), (90.0, 'E'), (180.0, 'S'), (270.0, 'W')]) {
      final a = pair.$1 * math.pi / 180;
      final text = TextPainter(
        text: TextSpan(
          text: pair.$2,
          style: TextStyle(
            color: pair.$2 == 'N'
                ? const Color(0xffe64e4a)
                : const Color(0xff292929),
            fontSize: 12,
            fontWeight: FontWeight.w700,
          ),
        ),
        textDirection: TextDirection.ltr,
      )..layout();
      final pos = Offset(math.sin(a) * (r - 40), -math.cos(a) * (r - 40));
      text.paint(c, pos - Offset(text.width / 2, text.height / 2));
    }
    final north = Path()
      ..moveTo(0, -r * .66)
      ..lineTo(-7, 0)
      ..lineTo(7, 0)
      ..close();
    c.drawPath(north, Paint()..color = const Color(0xfff13e3e));
    c.restore();
    if (live) {
      c.save();
      c.translate(o.dx, o.dy);
      c.rotate((bearing - heading) * math.pi / 180);
      final pointer = Path()
        ..moveTo(0, -r * .69)
        ..lineTo(-7, 10)
        ..lineTo(0, 5)
        ..lineTo(7, 10)
        ..close();
      c.drawPath(pointer, Paint()..color = const Color(0xff292c2a));
      c.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromLTWH(-8, -r * .78, 16, 15),
          const Radius.circular(2),
        ),
        Paint()..color = const Color(0xff272727),
      );
      c.drawRect(
        Rect.fromLTWH(-8, -r * .78 + 4, 16, 3),
        Paint()..color = const Color(0xffd4ac52),
      );
      c.restore();
    }
    c.drawCircle(o, 13, Paint()..color = const Color(0xff343735));
    c.drawCircle(o, 8, Paint()..color = Colors.white);
    c.drawCircle(o, 4, Paint()..color = const Color(0xffbfc3c2));
  }

  @override
  bool shouldRepaint(covariant LiveCompassPainter old) =>
      old.heading != heading || old.bearing != bearing || old.live != live;
}
