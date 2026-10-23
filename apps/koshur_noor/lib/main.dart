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
import 'artwork.dart';

const forest = Color(0xff183f35),
    gold = Color(0xff986d32),
    paper = Color(0xfff4edde);
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
  runApp(NoorApp(state: AppState(prefs), duas: duas, hadiths: hadiths));
}

class NoorApp extends StatelessWidget {
  final AppState state;
  final List<Map<String, dynamic>> duas;
  final List<Map<String, dynamic>> hadiths;
  const NoorApp({
    super.key,
    required this.state,
    required this.duas,
    this.hadiths = const [],
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
      home: Home(state: state, duas: duas, hadiths: hadiths),
    ),
  );
  ThemeData makeTheme(bool dark) {
    final scheme = ColorScheme.fromSeed(
      seedColor: forest,
      brightness: dark ? Brightness.dark : Brightness.light,
    );
    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      scaffoldBackgroundColor: dark ? const Color(0xff122421) : paper,
      cardColor: dark ? const Color(0xff20372e) : const Color(0xfffffaf0),
      dividerColor: dark ? const Color(0xff49604b) : const Color(0xffd4c4a0),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        surfaceTintColor: Colors.transparent,
      ),
      textTheme:
          ThemeData(
            brightness: dark ? Brightness.dark : Brightness.light,
          ).textTheme.apply(
            bodyColor: dark ? const Color(0xffe5e9de) : const Color(0xff243e36),
            displayColor: dark
                ? const Color(0xffe5e9de)
                : const Color(0xff243e36),
          ),
      chipTheme: ChipThemeData(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: dark ? const Color(0xff20372e) : const Color(0xfffffaf0),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: gold.withValues(alpha: 0.3)),
        ),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: dark
            ? const Color(0xff182c27)
            : const Color(0xfff8f1e4),
        height: 76,
        indicatorShape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(7),
        ),
        indicatorColor: dark
            ? const Color(0xff35554a)
            : const Color(0xffe4eee5),
        labelTextStyle: WidgetStateProperty.all(
          const TextStyle(fontSize: 11, fontWeight: FontWeight.w600),
        ),
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

class _HomeState extends State<Home> {
  int tab = 0;
  Timer? timer;
  DateTime now = DateTime.now();
  String query = '', category = 'All';
  String hadithQuery = '', hadithCategory = 'All';
  bool savedHadithOnly = false;
  bool savedOnly = false;
  AppState get s => widget.state;
  @override
  void initState() {
    super.initState();
    timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (mounted) setState(() => now = DateTime.now());
    });
  }

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
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
    body: SafeArea(
      bottom: false,
      child: Align(
        alignment: Alignment.topCenter,
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 760),
          child: AnimatedSwitcher(
            duration: const Duration(milliseconds: 220),
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
    bottomNavigationBar: NavigationBar(
      selectedIndex: tab,
      onDestinationSelected: (v) => setState(() => tab = v),
      destinations: const [
        NavigationDestination(
          icon: Icon(Icons.wb_twilight_outlined),
          selectedIcon: Icon(Icons.wb_twilight),
          label: 'Today',
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
        NavigationDestination(icon: Icon(Icons.blur_circular), label: 'Tasbih'),
        NavigationDestination(icon: Icon(Icons.tune), label: 'Settings'),
      ],
    ),
  );
  Widget surface(
    Widget child, {
    EdgeInsets padding = const EdgeInsets.all(20),
  }) => Material(
    color: Theme.of(context).cardColor,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(9),
      side: BorderSide(
        color: Theme.of(context).dividerColor.withValues(alpha: 0.6),
      ),
    ),
    child: Stack(
      children: [
        Positioned.fill(
          child: IgnorePointer(
            child: CustomPaint(painter: ManuscriptBorderPainter(gold)),
          ),
        ),
        Padding(padding: padding, child: child),
      ],
    ),
  );
  TextStyle arabicStyle(double size) => TextStyle(
    fontFamily: 'Arabic',
    fontFamilyFallback: const ['NaskhFallback'],
    fontSize: size * s.arabicScale,
    height: 2.1,
    fontWeight: FontWeight.w400,
  );
  Widget heading(String eyebrow, String title, {Widget? trailing}) => Padding(
    padding: const EdgeInsets.fromLTRB(2, 8, 0, 22),
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
                  fontSize: 35,
                  fontWeight: FontWeight.w600,
                  letterSpacing: -.5,
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
    final done = prayers
        .where(
          (p) => p.isPrayer && s.completed.contains(s.completionKey(p.id, now)),
        )
        .length;
    return ListView(
      key: const ValueKey('today'),
      padding: const EdgeInsets.fromLTRB(22, 18, 22, 24),
      children: [
        Row(
          children: [
            Container(
              width: 42,
              height: 42,
              decoration: BoxDecoration(
                color: forest,
                borderRadius: BorderRadius.circular(7),
              ),
              child: const Icon(
                Icons.nights_stay_outlined,
                color: Color(0xfff0d9a7),
                size: 23,
              ),
            ),
            const SizedBox(width: 11),
            const Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'NOOR',
                    style: TextStyle(
                      fontFamily: 'ClassicalSerif',
                      letterSpacing: 5,
                      fontWeight: FontWeight.w600,
                      fontSize: 23,
                    ),
                  ),
                  Text(
                    'A companion for the devoted heart.',
                    style: TextStyle(fontSize: 11, color: Colors.grey),
                  ),
                ],
              ),
            ),
            IconButton(
              tooltip: 'Choose location',
              onPressed: pickCity,
              icon: const Icon(Icons.location_on_outlined),
            ),
          ],
        ),
        const SizedBox(height: 16),
        const ClassicalInvocation(),
        const SizedBox(height: 22),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    DateFormat('EEEE, d MMMM').format(svc.local(now)),
                    style: const TextStyle(
                      fontSize: 12,
                      color: gold,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Make space\nfor peace.',
                    style: TextStyle(
                      fontFamily: 'ClassicalSerif',
                      fontSize: 43,
                      height: 1.05,
                      letterSpacing: -.6,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
            const Padding(
              padding: EdgeInsets.only(top: 8),
              child: Ks('دِلَس سُکوٗن', size: 22),
            ),
          ],
        ),
        const SizedBox(height: 22),
        ClipRRect(
          borderRadius: BorderRadius.circular(10),
          child: SizedBox(
            height: 270,
            child: Stack(
              fit: StackFit.expand,
              children: [
                const CustomPaint(painter: ClassicCoverPainter()),
                Padding(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            width: 6,
                            height: 6,
                            decoration: const BoxDecoration(
                              color: Color(0xffe0c188),
                              shape: BoxShape.circle,
                            ),
                          ),
                          const SizedBox(width: 8),
                          Text(
                            'NEXT PRAYER · ${next.name.toUpperCase()}',
                            style: const TextStyle(
                              color: Color(0xffe5e9da),
                              fontSize: 10,
                              letterSpacing: 1.8,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 9),
                      FittedBox(
                        fit: BoxFit.scaleDown,
                        alignment: Alignment.centerLeft,
                        child: Text(
                          time(next.instant),
                          style: const TextStyle(
                            color: Colors.white,
                            fontFamily: 'ClassicalSerif',
                            fontSize: 47,
                            fontWeight: FontWeight.w500,
                            letterSpacing: -1,
                          ),
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'In $remaining',
                        style: const TextStyle(
                          color: Color(0xffe2e9d9),
                          fontSize: 13,
                        ),
                      ),
                      const Spacer(),
                      Row(
                        children: [
                          const Icon(
                            Icons.location_on_outlined,
                            size: 14,
                            color: Color(0xffd4dfcf),
                          ),
                          const SizedBox(width: 4),
                          Text(
                            s.city.name,
                            style: const TextStyle(
                              color: Color(0xffd4dfcf),
                              fontSize: 12,
                            ),
                          ),
                          const Spacer(),
                          Ks(
                            next.nativeName,
                            size: 21,
                            color: const Color(0xfff6e7c7),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 20),
        Row(
          children: [
            Expanded(
              child: quick(
                Icons.explore_outlined,
                'Qibla',
                'Find your direction',
                showQibla,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: quick(
                Icons.calendar_month_outlined,
                'Timetable',
                'Plan your month',
                showTimetable,
              ),
            ),
          ],
        ),
        const SizedBox(height: 27),
        Row(
          children: [
            const Expanded(
              child: Text(
                'Your prayer rhythm',
                style: TextStyle(
                  fontFamily: 'ClassicalSerif',
                  fontSize: 27,
                  fontWeight: FontWeight.w600,
                  letterSpacing: -.5,
                ),
              ),
            ),
            Text(
              '$done / 5',
              style: const TextStyle(color: gold, fontWeight: FontWeight.w700),
            ),
          ],
        ),
        const SizedBox(height: 7),
        const Text(
          'Tap a circle to keep a private prayer log.',
          style: TextStyle(fontSize: 12, color: Colors.grey),
        ),
        const SizedBox(height: 14),
        surface(
          Column(
            children: prayers.map((p) {
              final active = p.id == next.id;
              final checked = s.completed.contains(s.completionKey(p.id, now));
              return Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    child: Row(
                      children: [
                        Container(
                          width: 36,
                          height: 36,
                          decoration: BoxDecoration(
                            color: (active ? gold : forest).withValues(
                              alpha: .09,
                            ),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Icon(
                            prayerIcon(p.id),
                            size: 19,
                            color: active
                                ? gold
                                : Theme.of(context).colorScheme.primary,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                p.name,
                                style: TextStyle(
                                  fontWeight: active
                                      ? FontWeight.w700
                                      : FontWeight.w500,
                                ),
                              ),
                              Ks(p.nativeName, size: 13, align: TextAlign.left),
                            ],
                          ),
                        ),
                        Text(
                          time(p.instant),
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: active
                                ? FontWeight.w700
                                : FontWeight.w500,
                            color: active ? gold : null,
                          ),
                        ),
                        if (p.isPrayer)
                          Checkbox(
                            semanticLabel: 'Mark ${p.name} prayed',
                            value: checked,
                            shape: const CircleBorder(),
                            onChanged: (v) => s.update(() {
                              final key = s.completionKey(p.id, now);
                              v == true
                                  ? s.completed.add(key)
                                  : s.completed.remove(key);
                            }),
                          ),
                        if (!p.isPrayer) const SizedBox(width: 48),
                      ],
                    ),
                  ),
                  if (p.id != 'isha')
                    Divider(height: 1, color: Theme.of(context).dividerColor),
                ],
              );
            }).toList(),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        ),
        const SizedBox(height: 12),
        Text(
          '${s.method} · ${s.hanafi ? 'Hanafi' : 'Standard'} Asr · ${s.city.zone}\nCalculated times; confirm with your local mosque. Sunrise is not a prayer.',
          style: const TextStyle(fontSize: 10, height: 1.7, color: Colors.grey),
        ),
        const SizedBox(height: 26),
        Row(
          children: [
            const Expanded(
              child: Text(
                'A moment of remembrance',
                style: TextStyle(
                  fontFamily: 'ClassicalSerif',
                  fontSize: 26,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            TextButton(
              onPressed: () => setState(() => tab = 1),
              child: const Text('All duas →'),
            ),
          ],
        ),
        const SizedBox(height: 9),
        InkWell(
          borderRadius: BorderRadius.circular(9),
          onTap: () => showDua(widget.duas.first),
          child: surface(
            Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Text(
                  'DUA FOR EVERY DAY',
                  style: TextStyle(
                    letterSpacing: 1.7,
                    fontSize: 10,
                    color: gold,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 14),
                Text(
                  widget.duas.first['arabic'],
                  textDirection: TextDirection.rtl,
                  style: arabicStyle(28),
                ),
                const SizedBox(height: 12),
                Ks(widget.duas.first['kashmiri'], size: 17),
                const SizedBox(height: 16),
                const Text(
                  'Qur’an 2:201  ·  Kashmiri meaning draft',
                  style: TextStyle(fontSize: 10, color: Colors.grey),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

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
              borderRadius: BorderRadius.circular(9),
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
                '${d['title']} ${d['subtitle']} ${d['kashmiri']} ${d['arabic']} ${d['source']}',
              ).contains(fold(query)),
        )
        .toList();
    return ListView(
      key: const ValueKey('duas'),
      padding: const EdgeInsets.fromLTRB(22, 18, 22, 24),
      children: [
        heading(
          'Words to return to',
          'A dua for your day',
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
          onChanged: (v) => setState(() => query = v),
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
                ['All', 'Daily', 'Family', 'Learning', 'Comfort', 'Prayer']
                    .map(
                      (c) => Padding(
                        padding: const EdgeInsets.only(right: 8),
                        child: ChoiceChip(
                          label: Text(c),
                          selected: category == c,
                          onSelected: (_) => setState(() => category = c),
                        ),
                      ),
                    )
                    .toList(),
          ),
        ),
        const SizedBox(height: 12),
        const Text(
          'Arabic supplications with Kashmiri meaning drafts. Please review the meanings before treating them as verified translations.',
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
        ...list.map(
          (d) => Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: InkWell(
              onTap: () => showDua(d),
              borderRadius: BorderRadius.circular(9),
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
                    Ks(d['title'], size: 21),
                    const SizedBox(height: 8),
                    Text(d['subtitle'], style: const TextStyle(fontSize: 12)),
                    const SizedBox(height: 8),
                    Text(
                      d['source'],
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
                            '${d['arabic']}\n\n${d['kashmiri']}\n${d['source']}\nKashmiri meaning: draft for review',
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
                      d['kind'] == 'hadith'
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
    padding: const EdgeInsets.fromLTRB(22, 18, 22, 24),
    children: [
      heading('Small words. Lasting peace.', 'Remember, gently.'),
      const Ks('اللہ سُنٛد ذِکر', size: 25),
      const SizedBox(height: 22),
      surface(
        Column(
          children: [
            Text(
              'سُبْحَانَ اللَّهِ',
              textDirection: TextDirection.rtl,
              style: arabicStyle(34),
            ),
            const Ks('اللہ چھُ پاک', size: 18, align: TextAlign.center),
            const SizedBox(height: 20),
            SizedBox(
              width: 230,
              height: 230,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  SizedBox.expand(
                    child: CircularProgressIndicator(
                      value: (s.count % s.target) / s.target,
                      strokeWidth: 4,
                      backgroundColor: gold.withValues(alpha: .14),
                      color: gold,
                    ),
                  ),
                  Semantics(
                    button: true,
                    label: 'Tap to count dhikr. Current count ${s.count}',
                    child: InkWell(
                      customBorder: const CircleBorder(),
                      onTap: () {
                        HapticFeedback.selectionClick();
                        s.update(() => s.count++);
                      },
                      child: Container(
                        width: 207,
                        height: 207,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: forest.withValues(alpha: .06),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              '${s.count}',
                              style: const TextStyle(
                                fontSize: 64,
                                fontWeight: FontWeight.w300,
                                letterSpacing: -2,
                              ),
                            ),
                            const Text(
                              'TAP TO COUNT',
                              style: TextStyle(
                                fontSize: 9,
                                letterSpacing: 2,
                                color: gold,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            Text(
              '${s.count ~/ s.target} completed rounds · ${s.count % s.target} / ${s.target}',
              style: const TextStyle(color: Colors.grey, fontSize: 12),
            ),
            const SizedBox(height: 18),
            Wrap(
              spacing: 8,
              children: [33, 99, 100]
                  .map(
                    (n) => ChoiceChip(
                      label: Text('$n'),
                      selected: s.target == n,
                      onSelected: (_) => s.update(() => s.target = n),
                    ),
                  )
                  .toList(),
            ),
            const SizedBox(height: 12),
            TextButton.icon(
              onPressed: () async {
                final reset = await showDialog<bool>(
                  context: context,
                  builder: (c) => AlertDialog(
                    title: const Text('Reset your counter?'),
                    content: const Text(
                      'Your current count will return to zero.',
                    ),
                    actions: [
                      TextButton(
                        onPressed: () => Navigator.pop(c, false),
                        child: const Text('Keep it'),
                      ),
                      FilledButton(
                        onPressed: () => Navigator.pop(c, true),
                        child: const Text('Reset'),
                      ),
                    ],
                  ),
                );
                if (reset == true) s.update(() => s.count = 0);
              },
              icon: const Icon(Icons.restart_alt, size: 18),
              label: const Text('Reset counter'),
            ),
          ],
        ),
      ),
      const SizedBox(height: 18),
      const Text(
        'Your count stays on this device. Choose a target for your own routine; the app does not prescribe a particular count.',
        textAlign: TextAlign.center,
        style: TextStyle(color: Colors.grey, fontSize: 11, height: 1.7),
      ),
    ],
  );
  Widget settings() => ListView(
    key: const ValueKey('settings'),
    padding: const EdgeInsets.fromLTRB(22, 18, 22, 30),
    children: [
      heading('Made for your rhythm', 'Make Noor yours.'),
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
              onChanged: (v) => s.update(() => s.method = v!),
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
              onChanged: (v) => s.update(() => s.hanafi = v),
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
              onChanged: (v) => s.update(() => s.adjustment = v.round()),
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
              'No account. No ads. No server. Prayer times are calculated on your device. Your saved duas, prayer log, and tasbih count stay here. Location is selected manually; Noor does not track you.',
              style: TextStyle(fontSize: 12, height: 1.8, color: Colors.grey),
            ),
            const SizedBox(height: 16),
            const Text(
              'Kashmiri meanings are drafts for owner review. Prayer times are calculations, not mosque iqamah times. No background alarm or audio feature is enabled in this version.',
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
                applicationVersion: '1.2.0',
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
    final bearing = s.service.bearing;
    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      showDragHandle: true,
      builder: (c) => SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(28, 8, 28, 30),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Ks('قِبلہٕ کُن رُخ', size: 25, align: TextAlign.center),
              Text(
                'From ${s.city.name} towards Makkah',
                style: const TextStyle(fontSize: 12, color: Colors.grey),
              ),
              SizedBox(
                width: 280,
                height: 280,
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    CustomPaint(
                      size: const Size(280, 280),
                      painter: CompassPainter(
                        bearing,
                        Theme.of(c).colorScheme.primary,
                      ),
                    ),
                    const Positioned(
                      top: 8,
                      child: Text(
                        'N',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Text(
                '${bearing.toStringAsFixed(1)}°',
                style: const TextStyle(
                  fontSize: 42,
                  fontWeight: FontWeight.w300,
                ),
              ),
              const Text(
                'clockwise from true north',
                style: TextStyle(fontSize: 12, color: gold),
              ),
              const SizedBox(height: 18),
              const Text(
                'This is a fixed bearing guide, not a live compass. First identify true north with a reliable compass or map, then use this angle. The pointer does not follow your phone.',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 12, color: Colors.grey, height: 1.8),
              ),
            ],
          ),
        ),
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
                  '${s.method} · ${s.hanafi ? 'Hanafi' : 'Standard'} Asr\nConfirm local prayer and iqamah times with your mosque.',
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
