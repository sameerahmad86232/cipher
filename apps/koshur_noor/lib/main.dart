import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:intl/intl.dart' hide TextDirection;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:timezone/data/latest.dart' as tzdata;

import 'app_state.dart';
import 'prayer_service.dart';
import 'qibla_screen.dart';
import 'glass_panel.dart';
import 'custom_times.dart';
import 'prayer_notifications.dart';
import 'notification_settings.dart';
import 'permissions_setup.dart';
import 'real_tasbih.dart';

// Noor Atelier: cedar green, aged brass and warm handmade-paper surfaces.
const forest = Color(0xff21483d),
    gold = Color(0xffa77437),
    paper = Color(0xfffaf5ed);
const noorInk = Color(0xff183a33),
    noorDeep = Color(0xff102e2a),
    noorCream = Color(0xfffffbf5),
    noorLine = Color(0xffe8dfd0);
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  tzdata.initializeTimeZones();
  LicenseRegistry.addLicense(() async* {
    for (final name in ['nastaliq', 'naskh', 'amiri', 'classical-serif']) {
      final text = await rootBundle.loadString('assets/fonts/$name-OFL.txt');
      yield LicenseEntryWithLineBreaks([
        name == 'amiri'
            ? 'Amiri Arabic font'
            : name == 'classical-serif'
            ? 'Cormorant Garamond classical serif font'
            : 'Noto $name font',
      ], text);
    }
  });
  final prefs = await SharedPreferences.getInstance();
  final raw = await rootBundle.loadString('assets/data/duas.json');
  final duas = (jsonDecode(raw) as List)
      .map((r) => Map<String, dynamic>.from(r as Map))
      .toList();
  final hadithRaw = await rootBundle.loadString('assets/data/hadiths.json');
  final hadiths = (jsonDecode(hadithRaw) as List)
      .map((r) => Map<String, dynamic>.from(r as Map))
      .toList();
  final state = AppState(prefs);
  final alerts = PrayerNotifications(prefs);
  state.notifications = alerts;
  try {
    await alerts.initialize();
    unawaited(alerts.refresh(state.service));
  } catch (_) {
    /* Settings shows scheduling errors without blocking launch. */
  }
  runApp(NoorApp(state: state, duas: duas, hadiths: hadiths, enablePermissionIntro: true));
}

class NoorApp extends StatelessWidget {
  final AppState state;
  final List<Map<String, dynamic>> duas;
  final List<Map<String, dynamic>> hadiths;
  final bool enablePermissionIntro;
  const NoorApp({
    super.key,
    required this.state,
    required this.duas,
    this.hadiths = const [],
    this.enablePermissionIntro = false,
  });
  @override
  Widget build(BuildContext context) => ListenableBuilder(
    listenable: state,
    builder: (context, _) => MaterialApp(
      title: 'Koshur Noor • نوٗر',
      debugShowCheckedModeBanner: false,
      theme: makeTheme(false),
      darkTheme: makeTheme(true),
      themeMode: state.dark ? ThemeMode.dark : ThemeMode.light,
      builder: (context, child) => MediaQuery(
        data: MediaQuery.of(context).copyWith(
          textScaler: TextScaler.linear(
            (MediaQuery.textScalerOf(context).scale(1) *
                    (state.large ? 1.15 : 1))
                .clamp(1, 1.8),
          ),
        ),
        child: child!,
      ),
      home: PermissionStartup(
        state: state,
        enabled: enablePermissionIntro,
        child: Home(state: state, duas: duas, hadiths: hadiths),
      ),
    ),
  );
  ThemeData makeTheme(bool dark) {
    final scheme = ColorScheme.fromSeed(
      seedColor: forest,
      brightness: dark ? Brightness.dark : Brightness.light,
      surface: dark ? const Color(0xff152e29) : noorCream,
    );
    final base = ThemeData(
      useMaterial3: true,
      brightness: dark ? Brightness.dark : Brightness.light,
    );
    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      scaffoldBackgroundColor: dark ? const Color(0xff102620) : paper,
      cardColor: dark ? const Color(0xff1d3c34) : noorCream,
      dividerColor: dark ? const Color(0xff38554b) : noorLine,
      appBarTheme: AppBarTheme(
        backgroundColor: dark ? const Color(0xff102620) : paper,
        surfaceTintColor: Colors.transparent,
        foregroundColor: dark ? const Color(0xfff4ead9) : noorInk,
        elevation: 0,
        titleTextStyle: TextStyle(
          fontFamily: 'ClassicalSerif',
          fontSize: 23,
          fontWeight: FontWeight.w600,
          color: dark ? const Color(0xfff4ead9) : noorInk,
        ),
      ),
      textTheme: base.textTheme.apply(
        bodyColor: dark ? const Color(0xfff2eadd) : noorInk,
        displayColor: dark ? const Color(0xfff2eadd) : noorInk,
      ),
      chipTheme: ChipThemeData(
        showCheckmark: false,
        selectedColor: dark ? const Color(0xff46665a) : const Color(0xffdfe9df),
        backgroundColor: dark ? const Color(0xff1d3c34) : noorCream,
        side: BorderSide(color: dark ? const Color(0xff3b5a50) : noorLine),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(13)),
        labelStyle: TextStyle(
          color: dark ? const Color(0xfff2eadd) : noorInk,
          fontWeight: FontWeight.w600,
          fontSize: 12,
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: dark ? const Color(0xff1d3c34) : noorCream,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 18),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(17),
          borderSide: BorderSide(color: dark ? const Color(0xff3b5a50) : noorLine),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(17),
          borderSide: BorderSide(color: dark ? const Color(0xff3b5a50) : noorLine),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(17),
          borderSide: const BorderSide(color: gold, width: 1.5),
        ),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: dark ? const Color(0xff1a3831) : noorCream,
        surfaceTintColor: Colors.transparent,
        height: 70,
        elevation: 0,
        indicatorShape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
        indicatorColor: dark ? const Color(0xff3d6053) : const Color(0xffe4ebdf),
        iconTheme: WidgetStateProperty.resolveWith((states) => IconThemeData(
          size: 23,
          color: states.contains(WidgetState.selected)
              ? (dark ? const Color(0xffefce99) : forest)
              : (dark ? const Color(0xff9bb5aa) : const Color(0xff74877b)),
        )),
        labelTextStyle: WidgetStateProperty.resolveWith((states) => TextStyle(
          fontSize: 10.5,
          letterSpacing: .1,
          fontWeight: states.contains(WidgetState.selected)
              ? FontWeight.w700 : FontWeight.w500,
          color: states.contains(WidgetState.selected)
              ? (dark ? const Color(0xfff0d6ae) : forest)
              : (dark ? const Color(0xff9bb5aa) : const Color(0xff74877b)),
        )),
      ),
    );
  }
}

class ClassicalInvocation extends StatelessWidget {
  const ClassicalInvocation({super.key});
  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 4),
    child: Row(
      children: [
        Expanded(child: Divider(color: gold.withValues(alpha: 0.45))),
        Expanded(
          flex: 8,
          child: Text(
            'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
            textDirection: TextDirection.rtl,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontFamily: 'Arabic',
              fontFamilyFallback: const ['NaskhFallback'],
              fontSize: 23,
              height: 1.8,
              color: Theme.of(context).brightness == Brightness.dark
                  ? const Color(0xffd3b476)
                  : forest,
            ),
          ),
        ),
        Expanded(child: Divider(color: gold.withValues(alpha: 0.45))),
      ],
    ),
  );
}

class Ks extends StatelessWidget {
  final String text;
  final double size;
  final Color? color;
  final TextAlign align;
  const Ks(
    this.text, {
    super.key,
    this.size = 21,
    this.color,
    this.align = TextAlign.right,
  });
  @override
  Widget build(BuildContext context) => Text(
    text,
    textDirection: TextDirection.rtl,
    textAlign: align,
    style: TextStyle(
      fontFamily: 'Nastaliq',
      fontSize: size,
      height: 2.4,
      color: color,
    ),
  );
}

class Home extends StatefulWidget {
  final AppState state;
  final List<Map<String, dynamic>> duas;
  final List<Map<String, dynamic>> hadiths;
  const Home({
    super.key,
    required this.state,
    required this.duas,
    this.hadiths = const [],
  });
  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> with WidgetsBindingObserver {
  int tab = 0;
  Timer? timer;
  DateTime now = DateTime.now();
  String query = '', category = 'All';
  String hadithQuery = '', hadithCategory = 'All';
  bool savedHadithOnly = false;
  bool savedOnly = false;
  int duaLimit = 24;
  AppState get s => widget.state;
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (mounted) setState(() => now = DateTime.now());
    });
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    timer?.cancel();
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      s.notifications?.refresh(s.service, force: true);
    }
  }

  String time(DateTime instant) => DateFormat(
    s.clock24 ? 'HH:mm' : 'h:mm a',
  ).format(s.service.local(instant));
  String get remaining {
    final d = s.service.next(now).instant.difference(now);
    final h = d.inHours, m = d.inMinutes % 60, sec = d.inSeconds % 60;
    return '${h.toString().padLeft(2, '0')}:${m.toString().padLeft(2, '0')}:${sec.toString().padLeft(2, '0')}';
  }

  void snack(String text) => ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(content: Text(text), behavior: SnackBarBehavior.floating),
  );
  @override
  Widget build(BuildContext context) => Scaffold(
    body: Row(
      children: [
        if (MediaQuery.sizeOf(context).width >= 1000)
          SizedBox(
            width: 220,
            child: SafeArea(
              child: Column(
                children: [
                  const Padding(
                    padding: EdgeInsets.symmetric(vertical: 32),
                    child: Text(
                      'KOSHUR NOOR',
                      style: TextStyle(
                        fontFamily: 'ClassicalSerif',
                        fontSize: 24,
                      ),
                    ),
                  ),
                  Expanded(
                    child: NavigationRail(
                      extended: true,
                      selectedIndex: tab,
                      onDestinationSelected: (v) => setState(() => tab = v),
                      destinations: const [
                        NavigationRailDestination(
                          icon: Icon(Icons.wb_twilight_outlined),
                          label: Text('Home'),
                        ),
                        NavigationRailDestination(
                          icon: Icon(Icons.menu_book_outlined),
                          label: Text('Duas'),
                        ),
                        NavigationRailDestination(
                          icon: Icon(Icons.auto_stories_outlined),
                          label: Text('Hadith'),
                        ),
                        NavigationRailDestination(
                          icon: Icon(Icons.blur_circular),
                          label: Text('Tasbih'),
                        ),
                        NavigationRailDestination(
                          icon: Icon(Icons.tune),
                          label: Text('Settings'),
                        ),
                      ],
                    ),
                  ),
                  const Padding(
                    padding: EdgeInsets.all(24),
                    child: Text(
                      'A moment of peace.\nArabic & Kashmiri',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 12, height: 1.8),
                    ),
                  ),
                ],
              ),
            ),
          ),
        Expanded(
          child: Container(
            decoration: BoxDecoration(
              image: DecorationImage(
                image: const AssetImage('assets/images/jamia-inspired.png'),
                fit: BoxFit.cover,
                opacity: s.dark ? .045 : .018,
              ),
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: s.dark
                    ? const [Color(0xff102620), Color(0xff193d32)]
                    : const [Color(0xfffaf5ed), Color(0xfffffbf5)],
              ),
            ),
            child: SafeArea(
              bottom: false,
              child: Align(
                alignment: Alignment.topCenter,
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 760),
                  child: AnimatedSwitcher(
                    duration: Duration(
                      milliseconds: MediaQuery.disableAnimationsOf(context)
                          ? 0
                          : 320,
                    ),
                    transitionBuilder: (child, animation) => FadeTransition(
                      opacity: animation,
                      child: SlideTransition(
                        position:
                            Tween<Offset>(
                              begin: const Offset(0, 0.025),
                              end: Offset.zero,
                            ).animate(
                              CurvedAnimation(
                                parent: animation,
                                curve: Curves.easeOutCubic,
                              ),
                            ),
                        child: child,
                      ),
                    ),
                    child: switch (tab) {
                      0 => today(),
                      1 => duaLibrary(),
                      2 => hadithLibrary(),
                      3 => tasbih(),
                      _ => settings(),
                    },
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    ),
    bottomNavigationBar: MediaQuery.sizeOf(context).width >= 1000
        ? null
        : Padding(
            padding: const EdgeInsets.fromLTRB(12, 0, 12, 10),
            child: DecoratedBox(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(22),
                border: Border.all(
                  color: s.dark ? const Color(0xff36564a) : noorLine,
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: s.dark ? .17 : .055),
                    blurRadius: 22,
                    offset: const Offset(0, 7),
                  ),
                ],
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(21),
                child: NavigationBar(
                selectedIndex: tab,
                onDestinationSelected: (v) => setState(() => tab = v),
                destinations: const [
                  NavigationDestination(
                    icon: Icon(Icons.wb_twilight_outlined),
                    selectedIcon: Icon(Icons.wb_twilight),
                    label: 'Home',
                  ),
                  NavigationDestination(
                    icon: Icon(Icons.menu_book_outlined),
                    selectedIcon: Icon(Icons.menu_book),
                    label: 'Duas',
                  ),
                  NavigationDestination(
                    icon: Icon(Icons.auto_stories_outlined),
                    selectedIcon: Icon(Icons.auto_stories),
                    label: 'Hadith',
                  ),
                  NavigationDestination(
                    icon: Icon(Icons.blur_circular),
                    label: 'Tasbih',
                  ),
                  NavigationDestination(
                    icon: Icon(Icons.tune),
                    label: 'Settings',
                  ),
                ],
                ),
              ),
            ),
          ),
  );
  Widget surface(
    Widget child, {
    EdgeInsets padding = const EdgeInsets.all(20),
  }) => GlassPanel(enabled: s.glass, padding: padding, child: child);
  TextStyle arabicStyle(double size) => TextStyle(
    fontFamily: 'Arabic',
    fontFamilyFallback: const ['NaskhFallback'],
    fontSize: size * s.arabicScale,
    height: 2.1,
    fontWeight: FontWeight.w400,
  );
  Widget heading(String eyebrow, String title, {Widget? trailing}) => Padding(
    padding: const EdgeInsets.fromLTRB(2, 8, 0, 20),
    child: Row(
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                eyebrow.toUpperCase(),
                style: const TextStyle(
                  fontSize: 10,
                  letterSpacing: 2,
                  fontWeight: FontWeight.w700,
                  color: gold,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                title,
                style: const TextStyle(
                  fontFamily: 'ClassicalSerif',
                  fontSize: 32,
                  fontWeight: FontWeight.w600,
                  letterSpacing: -.65,
                  height: 1.02,
                ),
              ),
            ],
          ),
        ),
        ?trailing,
      ],
    ),
  );
  Widget today() {
    final svc = s.service;
    final next = svc.next(now);
    final prayers = svc.forDate(svc.day(now));
    final total = widget.duas.where((d) => d['bookNumber'] != null).length;
    final daily = widget.duas.firstWhere(
      (d) => d['id'] == 'knowledge',
      orElse: () => widget.duas.first,
    );
    final done = prayers
        .where(
          (p) => p.isPrayer && s.completed.contains(s.completionKey(p.id, now)),
        )
        .length;
    return ListView(
      key: const ValueKey('today'),
      padding: const EdgeInsets.fromLTRB(18, 12, 18, 28),
      children: [
        Row(
          children: [
            Container(
              width: 42,
              height: 42,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: noorInk,
                borderRadius: BorderRadius.circular(14),
                boxShadow: [BoxShadow(
                  color: forest.withValues(alpha: .14),
                  blurRadius: 14,
                  offset: const Offset(0, 5),
                )],
              ),
              child: const Icon(Icons.brightness_2_rounded,
                color: Color(0xffe6bf7e), size: 23),
            ),
            const SizedBox(width: 11),
            const Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('KOSHUR NOOR',
                    style: TextStyle(
                      fontFamily: 'ClassicalSerif',
                      fontWeight: FontWeight.w700,
                      letterSpacing: .6,
                      fontSize: 21,
                      height: 1,
                    ),
                  ),
                  SizedBox(height: 5),
                  Text('A space for reflection',
                    style: TextStyle(fontSize: 10, color: gold, letterSpacing: .45),
                  ),
                ],
              ),
            ),
            IconButton.filledTonal(
              tooltip: 'Choose location',
              onPressed: pickCity,
              icon: const Icon(Icons.location_on_outlined, size: 20),
            ),
            const SizedBox(width: 3),
            IconButton(
              tooltip: 'Settings',
              onPressed: () => setState(() => tab = 4),
              icon: const Icon(Icons.tune_rounded, size: 21),
            ),
          ],
        ),
        const SizedBox(height: 14),
        Row(
          children: [
            const Icon(Icons.location_on_outlined, size: 13, color: gold),
            const SizedBox(width: 5),
            Expanded(
              child: Text(
                '${s.city.name}  ·  ${DateFormat('EEEE, d MMMM').format(svc.local(now))}',
                style: const TextStyle(
                  fontSize: 11, color: gold,
                  letterSpacing: .1, fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Container(
          height: 354,
          clipBehavior: Clip.antiAlias,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(27),
            color: noorDeep,
            boxShadow: [BoxShadow(
              color: noorDeep.withValues(alpha: s.dark ? .23 : .18),
              blurRadius: 24,
              offset: const Offset(0, 10),
            )],
          ),
          child: Stack(
            fit: StackFit.expand,
            children: [
              Image.asset(
                'assets/images/jamia-inspired.png',
                fit: BoxFit.cover,
                alignment: const Alignment(0, .42),
                color: const Color(0xff183a33).withValues(alpha: .48),
                colorBlendMode: BlendMode.multiply,
              ),
              const DecoratedBox(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    stops: [0, .44, 1],
                    colors: [Color(0xee102e29), Color(0x991c4a3b), Color(0xd714302a)],
                  ),
                ),
              ),
              Positioned(
                right: -66,
                top: -72,
                child: IgnorePointer(
                  child: Container(
                    height: 218, width: 218,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: const Color(0x55ebc997), width: .8),
                    ),
                    child: Center(
                      child: Container(
                        width: 167, height: 167,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: const Color(0x33ebc997)),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(22, 23, 22, 19),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Row(
                      children: [
                        Icon(Icons.auto_awesome_outlined,
                          size: 15, color: Color(0xffe5c995)),
                        SizedBox(width: 8),
                        Expanded(
                          child: Text('A SANCTUARY IN YOUR DAY',
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(
                              color: Color(0xffe5c995), fontSize: 10,
                              fontWeight: FontWeight.w700, letterSpacing: 1.55,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 18),
                    SizedBox(
                      width: double.infinity,
                      height: 96,
                      child: Align(
                        alignment: Alignment.topLeft,
                        child: FittedBox(
                          fit: BoxFit.scaleDown,
                          alignment: Alignment.topLeft,
                          child: Text(
                            'Pause. Pray.\nFind your light.',
                            style: const TextStyle(
                              color: Color(0xfffff8e9),
                              fontFamily: 'ClassicalSerif',
                              fontSize: 39, fontWeight: FontWeight.w600,
                              height: .99, letterSpacing: -.9,
                            ),
                          ),
                        ),
                      ),
                    ),
                    const Spacer(),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 17, vertical: 15),
                      decoration: BoxDecoration(
                        color: const Color(0xfffbf6eb).withValues(alpha: .96),
                        borderRadius: BorderRadius.circular(19),
                        border: Border.all(color: const Color(0xfff5e6d1)),
                      ),
                      child: Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                const Text('UP NEXT',
                                  style: TextStyle(
                                    color: gold, fontSize: 9,
                                    letterSpacing: 1.65, fontWeight: FontWeight.w800,
                                  )),
                                const SizedBox(height: 5),
                                Text(next.name,
                                  style: const TextStyle(
                                    color: noorInk, fontFamily: 'ClassicalSerif',
                                    fontSize: 27, height: 1.08, fontWeight: FontWeight.w600,
                                  )),
                                const SizedBox(height: 7),
                                Text('In $remaining',
                                  style: const TextStyle(
                                    color: Color(0xff70847a), fontSize: 11,
                                    fontWeight: FontWeight.w600,
                                  )),
                              ],
                            ),
                          ),
                          const SizedBox(width: 7),
                          Flexible(
                            child: FittedBox(
                              fit: BoxFit.scaleDown,
                              child: Text(
                                time(next.instant), textAlign: TextAlign.right,
                                style: const TextStyle(
                                  fontFamily: 'ClassicalSerif',
                                  color: noorInk, fontSize: 33,
                                  fontWeight: FontWeight.w700, height: 1.1,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 19),
        Padding(
          padding: const EdgeInsets.fromLTRB(3, 0, 0, 10),
          child: Row(
            children: [
              const Expanded(child: Text('TODAY’S PRAYERS',
                style: TextStyle(
                  color: gold, fontSize: 10,
                  letterSpacing: 1.8, fontWeight: FontWeight.w800,
                ))),
              InkWell(
                onTap: showTimetable,
                child: const Row(children: [
                  Text('Full timetable',
                    style: TextStyle(color: gold,
                      fontWeight: FontWeight.w600, fontSize: 11)),
                  SizedBox(width: 3),
                  Icon(Icons.arrow_forward_ios_rounded, color: gold, size: 10),
                ]),
              ),
            ],
          ),
        ),
        surface(
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: prayers.map((p) {
                final active = p.id == next.id;
                return Container(
                  width: 88,
                  padding: const EdgeInsets.symmetric(
                    vertical: 13,
                    horizontal: 4,
                  ),
                  decoration: BoxDecoration(
                    color: active ? forest : Colors.transparent,
                    borderRadius: BorderRadius.circular(15),
                  ),
                  child: Column(
                    children: [
                      Icon(prayerIcon(p.id), size: 18,
                        color: active ? const Color(0xffe9ce97) : gold),
                      const SizedBox(height: 7),
                      Text(
                        p.name,
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: active ? FontWeight.w700 : FontWeight.w500,
                          color: active ? Colors.white : null,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        time(p.instant),
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: active ? Colors.white : null,
                        ),
                      ),
                    ],
                  ),
                );
              }).toList(),
            ),
          ),
          padding: const EdgeInsets.all(6),
        ),
        const SizedBox(height: 12),
        InkWell(
          borderRadius: BorderRadius.circular(22),
          onTap: () => Navigator.push(
            context,
            MaterialPageRoute<void>(
              builder: (_) => NotificationSettings(state: s),
            ),
          ),
          child: surface(
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: const BoxDecoration(
                    color: Color(0xffffdfcb),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.notifications_active_outlined,
                    color: gold,
                    size: 22,
                  ),
                ),
                const SizedBox(width: 12),
                const Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'A gentle call to prayer',
                        style: TextStyle(
                          fontFamily: 'ClassicalSerif',
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      Text(
                        'Set up adhan & prayer reminders',
                        style: TextStyle(fontSize: 11, color: gold),
                      ),
                    ],
                  ),
                ),
                const Icon(Icons.chevron_right, color: gold),
              ],
            ),
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          ),
        ),
        const SizedBox(height: 22),
        const Text(
          'Your daily companion',
          style: TextStyle(
            fontFamily: 'ClassicalSerif',
            fontSize: 25,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: homeShortcut(Icons.explore_outlined, 'Qibla', showQibla),
            ),
            const SizedBox(width: 6),
            Expanded(
              child: homeShortcut(
                Icons.menu_book_outlined,
                'Duas',
                () => setState(() => tab = 1),
              ),
            ),
            const SizedBox(width: 6),
            Expanded(
              child: homeShortcut(
                Icons.blur_circular,
                'Tasbih',
                () => setState(() => tab = 3),
              ),
            ),
          ],
        ),
        const SizedBox(height: 14),
        InkWell(
          borderRadius: BorderRadius.circular(24),
          onTap: () => setState(() {
            category = 'Hisnul Muslim';
            query = '';
            duaLimit = 24;
            tab = 1;
          }),
          child: surface(
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: const Color(0xffe9eee5),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: const Icon(
                    Icons.auto_stories_outlined,
                    color: gold,
                    size: 30,
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Hisnul Muslim',
                        style: TextStyle(
                          fontFamily: 'ClassicalSerif',
                          fontSize: 24,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      Text(
                        '$total numbered entries',
                        style: const TextStyle(fontSize: 12, color: gold),
                      ),
                      const SizedBox(height: 6),
                      const Text(
                        'Read in Arabic & Kashmiri',
                        style: TextStyle(fontSize: 11),
                      ),
                    ],
                  ),
                ),
                const Icon(Icons.chevron_right, color: gold),
              ],
            ),
          ),
        ),
        const SizedBox(height: 14),
        InkWell(
          borderRadius: BorderRadius.circular(24),
          onTap: () => showDua(daily),
          child: surface(
            Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Text(
                  'A dua for today',
                  style: TextStyle(fontFamily: 'ClassicalSerif', fontSize: 23),
                ),
                const SizedBox(height: 12),
                Text(
                  daily['arabic'],
                  textDirection: TextDirection.rtl,
                  textAlign: TextAlign.center,
                  style: arabicStyle(30),
                ),
                const SizedBox(height: 10),
                const Text(
                  'Continue reading →',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: gold, fontSize: 12),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        surface(
          ExpansionTile(
            tilePadding: EdgeInsets.zero,
            title: const Text(
              'Your prayer rhythm',
              style: TextStyle(fontFamily: 'ClassicalSerif', fontSize: 22),
            ),
            subtitle: Text(
              '$done / 5 prayed · private prayer log',
              style: const TextStyle(fontSize: 11),
            ),
            children: [
              ...prayers
                  .where((p) => p.isPrayer)
                  .map(
                    (p) => CheckboxListTile(
                      contentPadding: EdgeInsets.zero,
                      title: Text(p.name),
                      subtitle: Text(time(p.instant)),
                      value: s.completed.contains(s.completionKey(p.id, now)),
                      onChanged: (v) => s.update(() {
                        final key = s.completionKey(p.id, now);
                        v == true
                            ? s.completed.add(key)
                            : s.completed.remove(key);
                      }),
                    ),
                  ),
              TextButton.icon(
                onPressed: showTimetable,
                icon: const Icon(Icons.calendar_month_outlined),
                label: const Text('Monthly timetable'),
              ),
              Text(
                s.customTimes != null
                    ? 'Custom daily timetable · ${s.city.zone}'
                    : '${s.method} · ${s.hanafi ? 'Hanafi' : 'Standard'} Asr · ${s.city.zone}',
                style: const TextStyle(fontSize: 10),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget homeShortcut(IconData icon, String label, VoidCallback onTap) =>
      InkWell(
        borderRadius: BorderRadius.circular(23),
        onTap: onTap,
        child: surface(
          Column(
            children: [
              Container(
                width: 49,
                height: 49,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: s.dark ? const Color(0xff355a4d)
                      : const Color(0xffe8eee5),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Icon(icon,
                  color: s.dark ? const Color(0xffe5c995) : forest, size: 24),
              ),
              const SizedBox(height: 10),
              Text(
                label,
                maxLines: 1,
                overflow: TextOverflow.fade,
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                  letterSpacing: .1,
                ),
              ),
            ],
          ),
          padding: const EdgeInsets.symmetric(vertical: 17, horizontal: 3),
        ),
      );

  IconData prayerIcon(String id) => switch (id) {
    'fajr' => Icons.wb_twilight,
    'sunrise' => Icons.wb_sunny_outlined,
    'dhuhr' => Icons.light_mode_outlined,
    'asr' => Icons.brightness_6_outlined,
    'maghrib' => Icons.wb_twilight_outlined,
    _ => Icons.nightlight_outlined,
  };
  Widget quick(
    IconData icon,
    String title,
    String subtitle,
    VoidCallback tap,
  ) => InkWell(
    onTap: tap,
    borderRadius: BorderRadius.circular(22),
    child: surface(
      Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: gold, size: 23),
          const SizedBox(height: 12),
          Text(
            title,
            style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 5),
          Text(
            subtitle,
            style: const TextStyle(fontSize: 10, color: Colors.grey),
          ),
        ],
      ),
      padding: const EdgeInsets.all(17),
    ),
  );
  String fold(String x) => x.toLowerCase().replaceAll(
    RegExp(r'[\u064B-\u065F\u0670\u06D6-\u06ED]'),
    '',
  );
  Widget hadithLibrary() {
    final rows = widget.hadiths
        .where(
          (d) =>
              (hadithCategory == 'All' || d['category'] == hadithCategory) &&
              (!savedHadithOnly || s.favourites.contains(d['id'])) &&
              fold(
                '${d['title']} ${d['subtitle']} ${d['source']} ${d['narrator']} ${d['kashmiri']} ${d['arabic']}',
              ).contains(fold(hadithQuery)),
        )
        .toList();
    return ListView(
      key: const ValueKey('hadiths'),
      padding: const EdgeInsets.fromLTRB(22, 18, 22, 28),
      children: [
        heading(
          'Guidance for everyday life',
          'Words to live by.',
          trailing: IconButton(
            tooltip: savedHadithOnly
                ? 'Show all hadiths'
                : 'Show saved hadiths',
            onPressed: () => setState(() => savedHadithOnly = !savedHadithOnly),
            icon: Icon(
              savedHadithOnly ? Icons.bookmark : Icons.bookmark_border,
              color: gold,
            ),
          ),
        ),
        const Ks('حَدیٖث — زِندگی ہٕنٛز رَہنُمٲیی', size: 23),
        const SizedBox(height: 18),
        TextField(
          onChanged: (v) => setState(() => hadithQuery = v),
          decoration: const InputDecoration(
            prefixIcon: Icon(Icons.search),
            hintText: 'Search hadith, narrator or reference',
            hintStyle: TextStyle(fontSize: 12),
          ),
        ),
        const SizedBox(height: 14),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: ['All', 'Faith', 'Character', 'Learning']
                .map(
                  (c) => Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: ChoiceChip(
                      label: Text(c),
                      selected: hadithCategory == c,
                      onSelected: (_) => setState(() => hadithCategory = c),
                    ),
                  ),
                )
                .toList(),
          ),
        ),
        const SizedBox(height: 14),
        const Text(
          'Arabic prophetic text with source references. Kashmiri meanings are drafts for review. Narration chains are omitted; shorter excerpts are labelled.',
          style: TextStyle(fontSize: 11, height: 1.7, color: Colors.grey),
        ),
        const SizedBox(height: 18),
        if (rows.isEmpty)
          surface(
            const Text('No hadiths found. Try another search or filter.'),
          ),
        ...rows.map(
          (d) => Padding(
            padding: const EdgeInsets.only(bottom: 14),
            child: InkWell(
              onTap: () => showDua(d),
              borderRadius: BorderRadius.circular(22),
              child: surface(
                Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            d['source'],
                            style: const TextStyle(
                              color: gold,
                              fontSize: 10,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                        Icon(
                          s.favourites.contains(d['id'])
                              ? Icons.bookmark
                              : Icons.north_east,
                          size: 18,
                          color: gold,
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    if (d['reviewStatus'] == 'approved-by-project-owner')
                      const Padding(
                        padding: EdgeInsets.symmetric(vertical: 8),
                        child: Row(
                          children: [
                            Icon(
                              Icons.verified_outlined,
                              size: 14,
                              color: gold,
                            ),
                            SizedBox(width: 6),
                            Text(
                              'Owner-reviewed meaning',
                              style: TextStyle(fontSize: 10, color: gold),
                            ),
                          ],
                        ),
                      ),
                    Ks(d['title'], size: 21),
                    const SizedBox(height: 10),
                    Text(
                      d['arabic'],
                      textDirection: TextDirection.rtl,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: arabicStyle(25),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      d['subtitle'],
                      style: const TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 7),
                    Text(
                      d['excerpt'] == true
                          ? 'Excerpt · Kashmiri meaning draft'
                          : 'Kashmiri meaning draft',
                      style: const TextStyle(fontSize: 10, color: Colors.grey),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget duaLibrary() {
    final list = widget.duas
        .where(
          (d) =>
              (category == 'All' || d['category'] == category) &&
              (!savedOnly || s.favourites.contains(d['id'])) &&
              fold(
                '${d['title']} ${d['subtitle']} ${d['kashmiri']} ${d['arabic']} ${d['source']} ${d['instructions'] ?? ''}',
              ).contains(fold(query)),
        )
        .toList();
    return ListView(
      key: const ValueKey('duas'),
      padding: const EdgeInsets.fromLTRB(22, 18, 22, 24),
      children: [
        heading(
          'Words to return to',
          'Your Kashmiri dua library',
          trailing: IconButton(
            tooltip: savedOnly ? 'Show all duas' : 'Show saved duas',
            onPressed: () => setState(() => savedOnly = !savedOnly),
            icon: Icon(
              savedOnly ? Icons.bookmark : Icons.bookmark_border,
              color: gold,
            ),
          ),
        ),
        const Ks('دُعا — رَبَس سۭتۍ کتھ', size: 24),
        const SizedBox(height: 16),
        TextField(
          onChanged: (v) => setState(() {
            query = v;
            duaLimit = 24;
          }),
          decoration: const InputDecoration(
            prefixIcon: Icon(Icons.search),
            hintText: 'Search Kashmiri, Arabic, or English',
            hintStyle: TextStyle(fontSize: 12),
          ),
        ),
        const SizedBox(height: 14),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children:
                [
                      'All',
                      'Hisnul Muslim',
                      'Daily',
                      'Family',
                      'Learning',
                      'Comfort',
                      'Prayer',
                    ]
                    .map(
                      (c) => Padding(
                        padding: const EdgeInsets.only(right: 8),
                        child: ChoiceChip(
                          label: Text(c),
                          selected: category == c,
                          onSelected: (_) => setState(() {
                            category = c;
                            duaLimit = 24;
                          }),
                        ),
                      ),
                    )
                    .toList(),
          ),
        ),
        const SizedBox(height: 12),
        Text(
          '${list.length} entries · Arabic & Kashmiri · available offline',
          style: TextStyle(color: Colors.grey, fontSize: 11, height: 1.6),
        ),
        const SizedBox(height: 18),
        if (list.isEmpty)
          surface(
            const Padding(
              padding: EdgeInsets.all(20),
              child: Text('No duas found. Try another word or category.'),
            ),
          ),
        ...list
            .take(duaLimit)
            .map(
              (d) => Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: InkWell(
                  onTap: () => showDua(d),
                  borderRadius: BorderRadius.circular(22),
                  child: surface(
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Row(
                          children: [
                            Text(
                              d['category'].toString().toUpperCase(),
                              style: const TextStyle(
                                color: gold,
                                fontSize: 9,
                                letterSpacing: 1.5,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                            const Spacer(),
                            Icon(
                              s.favourites.contains(d['id'])
                                  ? Icons.bookmark
                                  : Icons.north_east,
                              size: 17,
                              color: gold,
                            ),
                          ],
                        ),
                        if (d['reviewStatus'] == 'approved-by-project-owner')
                          const Padding(
                            padding: EdgeInsets.symmetric(vertical: 8),
                            child: Row(
                              children: [
                                Icon(
                                  Icons.verified_outlined,
                                  size: 14,
                                  color: gold,
                                ),
                                SizedBox(width: 6),
                                Text(
                                  'Owner-reviewed meaning',
                                  style: TextStyle(fontSize: 10, color: gold),
                                ),
                              ],
                            ),
                          ),
                        Ks(d['title'], size: 21),
                        const SizedBox(height: 8),
                        Text(
                          d['subtitle'],
                          style: const TextStyle(fontSize: 12),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          d['source'],
                          style: const TextStyle(
                            fontSize: 10,
                            color: Colors.grey,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
        if (list.length > duaLimit)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 12),
            child: OutlinedButton.icon(
              onPressed: () => setState(() => duaLimit += 24),
              icon: const Icon(Icons.expand_more),
              label: Text('Show more · ${list.length - duaLimit} remaining'),
            ),
          ),
      ],
    );
  }

  void showDua(Map<String, dynamic> d) {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (context) => ListenableBuilder(
          listenable: s,
          builder: (context, _) => Scaffold(
            appBar: AppBar(
              title: Text(
                d['kind'] == 'hadith'
                    ? 'Hadith & reflection'
                    : 'Dua & reflection',
                style: TextStyle(fontSize: 16),
              ),
              actions: [
                IconButton(
                  tooltip: 'Copy Arabic and Kashmiri',
                  onPressed: () {
                    Clipboard.setData(
                      ClipboardData(
                        text:
                            '${d['arabic']}\n\n${d['kashmiri']}\n${d['source']}\nKashmiri meaning: ${d['reviewStatus'] == 'approved-by-project-owner' ? 'reviewed by project owner' : 'draft for review'}',
                      ),
                    );
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text(
                          'Text copied with source and review label.',
                        ),
                      ),
                    );
                  },
                  icon: const Icon(Icons.copy_outlined),
                ),
                IconButton(
                  tooltip: d['kind'] == 'hadith' ? 'Save hadith' : 'Save dua',
                  onPressed: () => s.update(() {
                    s.favourites.contains(d['id'])
                        ? s.favourites.remove(d['id'])
                        : s.favourites.add(d['id']);
                  }),
                  icon: Icon(
                    s.favourites.contains(d['id'])
                        ? Icons.bookmark
                        : Icons.bookmark_border,
                  ),
                ),
              ],
            ),
            body: Align(
              alignment: Alignment.topCenter,
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 700),
                child: ListView(
                  padding: const EdgeInsets.fromLTRB(24, 10, 24, 40),
                  children: [
                    Ks(d['title'], size: 27),
                    Text(
                      d['subtitle'],
                      style: const TextStyle(color: gold, fontSize: 13),
                    ),
                    const SizedBox(height: 14),
                    if (d['narrator'] != null)
                      Text(
                        'Narrated by ${d['narrator']}',
                        style: const TextStyle(
                          fontSize: 12,
                          height: 1.8,
                          color: gold,
                        ),
                      ),
                    if (d['kind'] == 'hadith')
                      Padding(
                        padding: const EdgeInsets.only(top: 10),
                        child: Text(
                          d['excerpt'] == true
                              ? 'Hadith excerpt · chain omitted'
                              : 'Prophetic text · chain omitted',
                          style: const TextStyle(
                            fontSize: 10,
                            color: Colors.grey,
                          ),
                        ),
                      ),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        const Expanded(
                          child: Text(
                            'ARABIC READING SIZE',
                            style: TextStyle(
                              fontSize: 9,
                              letterSpacing: 1.4,
                              color: gold,
                            ),
                          ),
                        ),
                        IconButton(
                          tooltip: 'Smaller Arabic',
                          onPressed: s.arabicScale <= 0.85
                              ? null
                              : () => s.update(
                                  () => s.arabicScale = (s.arabicScale - 0.1)
                                      .clamp(0.85, 1.35),
                                ),
                          icon: const Icon(Icons.text_decrease),
                        ),
                        IconButton(
                          tooltip: 'Larger Arabic',
                          onPressed: s.arabicScale >= 1.35
                              ? null
                              : () => s.update(
                                  () => s.arabicScale = (s.arabicScale + 0.1)
                                      .clamp(0.85, 1.35),
                                ),
                          icon: const Icon(Icons.text_increase),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    surface(
                      SelectableText(
                        d['arabic'],
                        textDirection: TextDirection.rtl,
                        textAlign: TextAlign.center,
                        style: arabicStyle(32),
                      ),
                      padding: const EdgeInsets.all(25),
                    ),
                    const SizedBox(height: 28),
                    const Text(
                      'KASHMIRI MEANING',
                      style: TextStyle(
                        letterSpacing: 2,
                        fontSize: 10,
                        color: gold,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 14),
                    SelectableText(
                      d['kashmiri'],
                      textDirection: TextDirection.rtl,
                      style: const TextStyle(
                        fontFamily: 'Nastaliq',
                        fontSize: 23,
                        height: 2.6,
                      ),
                    ),
                    if ((d['instructions'] ?? '').toString().isNotEmpty) ...[
                      const SizedBox(height: 24),
                      const Text(
                        'READING NOTES',
                        style: TextStyle(
                          color: gold,
                          fontSize: 10,
                          letterSpacing: 2,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Ks(d['instructions'], size: 18),
                    ],
                    const SizedBox(height: 28),
                    Text(
                      d['source'],
                      style: const TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 12,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      d['reviewStatus'] == 'approved-by-project-owner'
                          ? 'Kashmiri meaning reviewed by the project owner. Source and reading instructions are retained below.'
                          : d['kind'] == 'hadith'
                          ? 'Kashmiri meaning draft · awaiting your review. References identify the narration. Excerpts and omitted chains are labelled separately.'
                          : 'Meaning draft · awaiting your review. Arabic excerpts are identified in the reference. A translation explains meaning and does not replace the Arabic Qur’an.',
                      style: TextStyle(
                        color: Colors.grey,
                        fontSize: 11,
                        height: 1.7,
                      ),
                    ),
                    const SizedBox(height: 22),
                    OutlinedButton.icon(
                      onPressed: () {
                        Clipboard.setData(
                          ClipboardData(
                            text:
                                '${d['kind'] == 'hadith' ? 'Hadith' : 'Dua'} ID: ${d['id']}\nSource: ${d['source']}\nCurrent: ${d['kashmiri']}\nMy correction: ',
                          ),
                        );
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text(
                              'Review template copied. Paste and add your correction.',
                            ),
                          ),
                        );
                      },
                      icon: const Icon(Icons.rate_review_outlined),
                      label: const Text('Copy correction template'),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget tasbih() => ListView(
    key: const ValueKey('tasbih'),
    padding: const EdgeInsets.fromLTRB(18, 22, 18, 28),
    children: [
      const Text(
        'A QUIET MOMENT',
        textAlign: TextAlign.center,
        style: TextStyle(
          color: gold,
          fontSize: 10,
          fontWeight: FontWeight.w800,
          letterSpacing: 2.8,
        ),
      ),
      const SizedBox(height: 7),
      const Text(
        'Dhikr',
        textAlign: TextAlign.center,
        style: TextStyle(
          fontFamily: 'ClassicalSerif',
          fontSize: 38,
          fontWeight: FontWeight.w600,
        ),
      ),
      const Ks('اللہ سُنٛد ذِکر', size: 20, align: TextAlign.center),
      const SizedBox(height: 8),
      SizedBox(
        height: 42,
        child: ListView.separated(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: 4),
          itemCount: _dhikr.length,
          separatorBuilder: (_, _) => const SizedBox(width: 8),
          itemBuilder: (_, i) {
            final selected = s.dhikrIndex == i;
            return ChoiceChip(
              showCheckmark: false,
              avatar: selected
                  ? const Icon(Icons.circle, size: 7, color: Colors.white)
                  : null,
              label: Text(_dhikr[i].$3),
              selected: selected,
              selectedColor: forest,
              labelStyle: TextStyle(
                color: selected ? Colors.white : null,
                fontWeight: FontWeight.w600,
              ),
              side: BorderSide(
                color: selected
                    ? Colors.transparent
                    : gold.withValues(alpha: .28),
              ),
              onSelected: (_) => s.update(() => s.dhikrIndex = i),
            );
          },
        ),
      ),
      const SizedBox(height: 22),
      AnimatedSwitcher(
        duration: const Duration(milliseconds: 240),
        child: Column(
          key: ValueKey(s.dhikrIndex),
          children: [
            Text(
              _dhikr[s.dhikrIndex].$1,
              textAlign: TextAlign.center,
              textDirection: TextDirection.rtl,
              style: arabicStyle(37),
            ),
            Ks(_dhikr[s.dhikrIndex].$2, size: 17, align: TextAlign.center),
          ],
        ),
      ),
      RealTasbih(
        count: s.count,
        target: s.target,
        onCount: () => s.update(() => s.count++),
      ),
      AnimatedSwitcher(
        duration: const Duration(milliseconds: 250),
        child: Text(
          s.count > 0 && s.count % s.target == 0
              ? 'Round complete · may it bring you peace'
              : '${s.count ~/ s.target} rounds  •  ${s.target - (s.count % s.target)} remaining',
          key: ValueKey('${s.count ~/ s.target}:${s.count % s.target}'),
          textAlign: TextAlign.center,
          style: TextStyle(
            color: s.count > 0 && s.count % s.target == 0
                ? gold
                : Theme.of(context).colorScheme.onSurfaceVariant,
            fontSize: 12,
            fontWeight: FontWeight.w600,
            letterSpacing: .2,
          ),
        ),
      ),
      const SizedBox(height: 22),
      Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          for (final n in const [33, 99, 100])
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 4),
              child: InkWell(
                borderRadius: BorderRadius.circular(30),
                onTap: () => s.update(() => s.target = n),
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 180),
                  width: 58,
                  height: 38,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: s.target == n
                        ? forest
                        : Colors.transparent,
                    borderRadius: BorderRadius.circular(30),
                    border: Border.all(
                      color: s.target == n
                          ? Colors.transparent
                          : gold.withValues(alpha: .35),
                    ),
                  ),
                  child: Text(
                    '$n',
                    style: TextStyle(
                      color: s.target == n ? Colors.white : null,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
      const SizedBox(height: 10),
      Wrap(
        alignment: WrapAlignment.center,
        spacing: 4,
        children: [
          TextButton.icon(
            onPressed: s.count == 0 ? null : () => s.update(() => s.count--),
            icon: const Icon(Icons.undo_rounded, size: 18),
            label: const Text('Undo'),
          ),
          TextButton.icon(
            onPressed: _resetTasbih,
            icon: const Icon(Icons.restart_alt, size: 18),
            label: const Text('Reset'),
          ),
        ],
      ),
      const SizedBox(height: 8),
      const Text(
        'Private and saved only on this device',
        textAlign: TextAlign.center,
        style: TextStyle(color: Colors.grey, fontSize: 10, letterSpacing: .3),
      ),
    ],
  );

  Future<void> _resetTasbih() async {
    final reset = await showDialog<bool>(
      context: context,
      builder: (c) => AlertDialog(
        title: const Text('Begin again?'),
        content: const Text('Your current tasbih count will return to zero.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(c, false),
            child: const Text('Keep counting'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(c, true),
            child: const Text('Reset'),
          ),
        ],
      ),
    );
    if (reset == true) s.update(() => s.count = 0);
  }

  static const _dhikr = <(String, String, String)>[
    ('سُبْحَانَ اللَّهِ', 'اللہ چھُ پاک', 'SubhanAllah'),
    ('الْحَمْدُ لِلَّهِ', 'سارِوٕے تعریف اللہ سُنٛد', 'Alhamdulillah'),
    ('اللَّهُ أَكْبَرُ', 'اللہ چھُ سارِوٕے کھۄتہٕ بۆڑ', 'Allahu Akbar'),
    ('لَا إِلٰهَ إِلَّا اللَّهُ', 'اللہ سِوا چھُنہٕ کانٛہہ معبود', 'Tahlil'),
  ];
  Widget settings() => ListView(
    key: const ValueKey('settings'),
    padding: const EdgeInsets.fromLTRB(22, 18, 22, 30),
    children: [
      heading('Made for your rhythm', 'Make Noor yours.'),
      surface(
        ListTile(
          contentPadding: EdgeInsets.zero,
          leading: const Icon(Icons.notifications_active_outlined, color: gold),
          title: const Text('Adhan & prayer alerts'),
          subtitle: const Text('Sound, silent reminders & prayer selection'),
          trailing: const Icon(Icons.chevron_right),
          onTap: () => Navigator.push(
            context,
            MaterialPageRoute<void>(
              builder: (_) => NotificationSettings(state: s),
            ),
          ),
        ),
      ),
      const SizedBox(height: 16),
      surface(
        ListTile(
          contentPadding: EdgeInsets.zero,
          leading: const Icon(Icons.admin_panel_settings_outlined, color: gold),
          title: const Text('App permissions'),
          subtitle: const Text('Location, notifications & special access'),
          trailing: const Icon(Icons.chevron_right),
          onTap: () => Navigator.push(
            context,
            MaterialPageRoute<void>(
              builder: (pageContext) => PermissionSetup(
                state: s,
                onFinished: () => Navigator.pop(pageContext),
              ),
            ),
          ),
        ),
      ),
      const SizedBox(height: 16),
      surface(
        ListTile(
          contentPadding: EdgeInsets.zero,
          leading: const Icon(Icons.edit_calendar),
          title: const Text('Custom prayer times'),
          subtitle: Text(
            s.customTimes == null
                ? 'Use your local mosque timetable'
                : 'Custom daily timetable active',
          ),
          trailing: const Icon(Icons.chevron_right),
          onTap: () => Navigator.push(
            context,
            MaterialPageRoute<void>(
              builder: (_) => CustomTimesScreen(state: s),
            ),
          ),
        ),
      ),
      const SizedBox(height: 16),
      surface(
        Column(
          children: [
            ListTile(
              contentPadding: EdgeInsets.zero,
              leading: const Icon(Icons.location_on_outlined, color: gold),
              title: Text(s.city.name),
              subtitle: Text(s.city.zone),
              trailing: const Icon(Icons.chevron_right),
              onTap: pickCity,
            ),
            const Divider(),
            DropdownButtonFormField<String>(
              initialValue: s.method,
              isExpanded: true,
              decoration: const InputDecoration(
                labelText: 'Calculation method',
                contentPadding: EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 16,
                ),
              ),
              items:
                  [
                        'Karachi',
                        'Muslim World League',
                        'Egyptian',
                        'Moonsighting Committee',
                      ]
                      .map(
                        (m) => DropdownMenuItem(
                          value: m,
                          child: Text(m, style: const TextStyle(fontSize: 13)),
                        ),
                      )
                      .toList(),
              onChanged: s.customTimes != null
                  ? null
                  : (v) => s.update(() => s.method = v!),
            ),
            const SizedBox(height: 12),
            SwitchListTile(
              contentPadding: EdgeInsets.zero,
              title: const Text('Hanafi Asr', style: TextStyle(fontSize: 14)),
              subtitle: const Text(
                'Off uses the standard shadow factor',
                style: TextStyle(fontSize: 11),
              ),
              value: s.hanafi,
              onChanged: s.customTimes != null
                  ? null
                  : (v) => s.update(() => s.hanafi = v),
            ),
            const Divider(),
            Text(
              'Prayer adjustment: ${s.adjustment > 0 ? '+' : ''}${s.adjustment} minutes',
              style: const TextStyle(fontSize: 13),
            ),
            Slider(
              value: s.adjustment.toDouble(),
              min: -15,
              max: 15,
              divisions: 30,
              label: '${s.adjustment} min',
              onChanged: s.customTimes != null
                  ? null
                  : (v) => s.update(() => s.adjustment = v.round()),
            ),
            const Text(
              'Applies to the five prayers, not sunrise. Match your trusted local timetable.',
              style: TextStyle(fontSize: 10, color: Colors.grey, height: 1.6),
            ),
          ],
        ),
      ),
      const SizedBox(height: 16),
      surface(
        Column(
          children: [
            SwitchListTile(
              title: const Text('Frosted glass'),
              subtitle: const Text('Soft translucent cards'),
              value: s.glass,
              onChanged: (v) => s.update(() => s.glass = v),
            ),
            SwitchListTile(
              contentPadding: EdgeInsets.zero,
              title: const Text('Night palette'),
              value: s.dark,
              onChanged: (v) => s.update(() => s.dark = v),
            ),
            SwitchListTile(
              contentPadding: EdgeInsets.zero,
              title: const Text('24-hour clock'),
              value: s.clock24,
              onChanged: (v) => s.update(() => s.clock24 = v),
            ),
            SwitchListTile(
              contentPadding: EdgeInsets.zero,
              title: const Text('Larger reading text'),
              value: s.large,
              onChanged: (v) => s.update(() => s.large = v),
            ),
          ],
        ),
      ),
      const SizedBox(height: 16),
      surface(
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Icon(Icons.offline_bolt_outlined, color: gold),
            const SizedBox(height: 12),
            const Text(
              'Quiet by design.',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.w500),
            ),
            const SizedBox(height: 10),
            const Text(
              'No account. No ads. No server. Prayer times are calculated on your device. Choose a city or explicitly use GPS in Qibla. The saved GPS position and device timezone stay in local app storage; no background location is collected.',
              style: TextStyle(fontSize: 12, height: 1.8, color: Colors.grey),
            ),
            const SizedBox(height: 16),
            const Text(
              'Kashmiri meanings are drafts for owner review. Prayer times are calculations, not mosque iqamah times. Live Qibla needs compatible Android sensors and calibration. No background alarm or audio feature is enabled in this version.',
              style: TextStyle(fontSize: 11, height: 1.7, color: Colors.grey),
            ),
            TextButton.icon(
              onPressed: () {
                Clipboard.setData(
                  ClipboardData(
                    text: s.exportReview(widget.duas, widget.hadiths),
                  ),
                );
                snack('Dua and hadith meanings copied as review JSON.');
              },
              icon: const Icon(Icons.file_copy_outlined, size: 18),
              label: const Text('Copy all meanings for review'),
            ),
            TextButton(
              onPressed: () => showLicensePage(
                context: context,
                applicationName: 'Koshur Noor',
                applicationVersion: '1.4.0',
              ),
              child: const Text('Open-source licences'),
            ),
          ],
        ),
      ),
      const SizedBox(height: 24),
      const Text(
        'NOOR  /  کٲشُر\nMade with care. Reviewed with you.',
        textAlign: TextAlign.center,
        style: TextStyle(
          fontSize: 10,
          letterSpacing: 1.2,
          color: gold,
          height: 2,
        ),
      ),
    ],
  );
  Future<void> pickCity() async {
    final picked = await showModalBottomSheet<City>(
      context: context,
      isScrollControlled: true,
      showDragHandle: true,
      builder: (c) => SafeArea(
        child: SizedBox(
          height: MediaQuery.sizeOf(c).height * .75,
          child: Column(
            children: [
              const Padding(
                padding: EdgeInsets.all(16),
                child: Text(
                  'Choose your prayer location',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
                ),
              ),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 24),
                child: Text(
                  'Times and dates always use the selected city’s timezone.',
                  style: TextStyle(fontSize: 12, color: Colors.grey),
                ),
              ),
              const SizedBox(height: 12),
              Expanded(
                child: ListView(
                  children: City.all
                      .map(
                        (city) => ListTile(
                          title: Text(city.name),
                          subtitle: Text(
                            city.zone,
                            style: const TextStyle(fontSize: 10),
                          ),
                          trailing: Ks(city.nativeName, size: 15),
                          leading: Icon(
                            city.name == s.city.name
                                ? Icons.radio_button_checked
                                : Icons.radio_button_off,
                            color: gold,
                          ),
                          onTap: () => Navigator.pop(c, city),
                        ),
                      )
                      .toList(),
                ),
              ),
            ],
          ),
        ),
      ),
    );
    if (picked != null) await s.update(() => s.city = picked);
  }

  void showQibla() {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => QiblaScreen(state: s, onPickCity: pickCity),
      ),
    );
  }

  void showTimetable() {
    final local = s.service.local(now);
    final days = DateUtils.getDaysInMonth(local.year, local.month);
    Navigator.push(
      context,
      MaterialPageRoute<void>(
        builder: (c) => Scaffold(
          appBar: AppBar(
            title: Text(
              '${s.city.name} · ${DateFormat('MMMM yyyy').format(local)}',
              style: const TextStyle(fontSize: 16),
            ),
          ),
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Swipe sideways for all prayer times.',
                  style: TextStyle(fontSize: 12, color: Colors.grey),
                ),
                const SizedBox(height: 14),
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: DataTable(
                    columnSpacing: 22,
                    columns: [
                      'Day',
                      'Fajr',
                      'Sunrise',
                      'Dhuhr',
                      'Asr',
                      'Maghrib',
                      'Isha',
                    ].map((t) => DataColumn(label: Text(t))).toList(),
                    rows: List.generate(days, (i) {
                      final d = DateTime.utc(local.year, local.month, i + 1);
                      return DataRow(
                        selected: i + 1 == local.day,
                        cells: [
                          DataCell(Text('${i + 1}')),
                          ...s.service
                              .forDate(d)
                              .map((p) => DataCell(Text(time(p.instant)))),
                        ],
                      );
                    }),
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  s.customTimes != null
                      ? 'Custom daily times repeat until edited. Isha before Fajr belongs to the following day. Sunrise is calculated.'
                      : '${s.method} · ${s.hanafi ? 'Hanafi' : 'Standard'} Asr\nConfirm local prayer and iqamah times with your mosque.',
                  style: const TextStyle(
                    fontSize: 11,
                    color: Colors.grey,
                    height: 1.7,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
