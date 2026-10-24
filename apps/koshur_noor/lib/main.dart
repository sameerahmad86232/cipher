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

const forest = Color(0xff763f2b),
    gold = Color(0xffa24e36),
    paper = Color(0xfffff2e3);
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
      scaffoldBackgroundColor: dark ? const Color(0xff30211e) : paper,
      cardColor: dark ? const Color(0xff493129) : const Color(0xfffffaf5),
      dividerColor: dark ? const Color(0xff49604b) : const Color(0xffd4c4a0),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        surfaceTintColor: Colors.transparent,
      ),
      textTheme:
          ThemeData(
            brightness: dark ? Brightness.dark : Brightness.light,
          ).textTheme.apply(
            bodyColor: dark ? const Color(0xffe5e9de) : const Color(0xff683e2d),
            displayColor: dark
                ? const Color(0xffe5e9de)
                : const Color(0xff683e2d),
          ),
      chipTheme: ChipThemeData(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: dark ? const Color(0xff493129) : const Color(0xfffffaf5),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: gold.withValues(alpha: 0.3)),
        ),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: dark
            ? const Color(0xff36251f)
            : const Color(0xfffff5e8),
        height: 76,
        indicatorShape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(7),
        ),
        indicatorColor: dark
            ? const Color(0xff734d3b)
            : const Color(0xffffdfcb),
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
  int duaLimit = 24;
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
    body: Container(
      decoration: BoxDecoration(
        image: DecorationImage(
          image: const AssetImage('assets/images/jamia-inspired.png'),
          fit: BoxFit.cover,
          opacity: s.dark ? .07 : .025,
        ),
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: s.dark
              ? const [Color(0xff30211e), Color(0xff493129)]
              : const [Color(0xffffeee0), Color(0xfffff8ef)],
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
                milliseconds: MediaQuery.disableAnimationsOf(context) ? 0 : 320,
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
    bottomNavigationBar: Padding(
      padding: const EdgeInsets.fromLTRB(12, 0, 12, 8),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(28),
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
            NavigationDestination(icon: Icon(Icons.tune), label: 'Settings'),
          ],
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
            const Icon(Icons.nights_stay, color: Color(0xffb78b47), size: 30),
            const SizedBox(width: 8),
            const Expanded(
              child: Text(
                'KOSHUR NOOR',
                style: TextStyle(
                  fontFamily: 'ClassicalSerif',
                  fontWeight: FontWeight.w600,
                  fontSize: 22,
                ),
              ),
            ),
            IconButton(
              tooltip: 'Choose location',
              onPressed: pickCity,
              icon: const Icon(
                Icons.location_on_outlined,
                color: Color(0xffef8077),
              ),
            ),
            IconButton(
              tooltip: 'Settings',
              onPressed: () => setState(() => tab = 4),
              icon: const Icon(Icons.settings_outlined),
            ),
          ],
        ),
        Text(
          '${s.city.name} · ${DateFormat('EEE, d MMM').format(svc.local(now))}',
          style: const TextStyle(fontSize: 11, color: gold),
        ),
        const SizedBox(height: 16),
        ClipRRect(
          borderRadius: BorderRadius.circular(26),
          child: SizedBox(
            height: 340,
            child: Stack(
              fit: StackFit.expand,
              children: [
                Image.asset(
                  'assets/images/jamia-inspired.png',
                  fit: BoxFit.cover,
                  alignment: const Alignment(0, .62),
                ),
                const DecoratedBox(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.center,
                      colors: [Color(0x99fff4e5), Color(0x00fff4e5)],
                    ),
                  ),
                ),
                const Positioned(
                  top: 22,
                  left: 22,
                  child: Text(
                    'A moment\nof peace',
                    style: TextStyle(
                      fontFamily: 'ClassicalSerif',
                      fontSize: 34,
                      height: 1.05,
                      color: Color(0xff543323),
                    ),
                  ),
                ),
                Positioned(
                  left: 12,
                  right: 12,
                  bottom: 12,
                  child: surface(
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          next.name,
                          style: const TextStyle(
                            fontFamily: 'ClassicalSerif',
                            fontSize: 22,
                          ),
                        ),
                        FittedBox(
                          fit: BoxFit.scaleDown,
                          child: Text(
                            time(next.instant),
                            style: const TextStyle(
                              fontFamily: 'ClassicalSerif',
                              fontSize: 40,
                              height: 1.2,
                            ),
                          ),
                        ),
                        Text(
                          'Next prayer · in $remaining',
                          style: const TextStyle(fontSize: 12),
                        ),
                      ],
                    ),
                    padding: const EdgeInsets.symmetric(
                      horizontal: 20,
                      vertical: 12,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 12),
        surface(
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: prayers.map((p) {
                final active = p.id == next.id;
                return Container(
                  width: 86,
                  padding: const EdgeInsets.symmetric(
                    vertical: 14,
                    horizontal: 4,
                  ),
                  decoration: BoxDecoration(
                    color: active
                        ? const Color(0xffed8073)
                        : Colors.transparent,
                    borderRadius: BorderRadius.circular(18),
                  ),
                  child: Column(
                    children: [
                      Text(
                        p.name,
                        style: TextStyle(
                          fontSize: 12,
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
          padding: const EdgeInsets.all(5),
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
            const SizedBox(width: 8),
            Expanded(
              child: homeShortcut(
                Icons.menu_book_outlined,
                'Duas',
                () => setState(() => tab = 1),
              ),
            ),
            const SizedBox(width: 8),
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
                    color: const Color(0xffffdfcb),
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
        borderRadius: BorderRadius.circular(22),
        onTap: onTap,
        child: surface(
          Column(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: const BoxDecoration(
                  color: Color(0xffffdfcb),
                  shape: BoxShape.circle,
                ),
                child: Icon(icon, color: gold, size: 25),
              ),
              const SizedBox(height: 8),
              Text(
                label,
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 6),
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
          '${list.length} entries · 184 Hisnul Muslim meanings reviewed by the project owner · available offline',
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
                            AnimatedSwitcher(
                              duration: Duration(
                                milliseconds:
                                    MediaQuery.disableAnimationsOf(context)
                                    ? 0
                                    : 180,
                              ),
                              transitionBuilder: (child, animation) =>
                                  FadeTransition(
                                    opacity: animation,
                                    child: ScaleTransition(
                                      scale: Tween<double>(
                                        begin: 0.9,
                                        end: 1,
                                      ).animate(animation),
                                      child: child,
                                    ),
                                  ),
                              child: Text(
                                '${s.count}',
                                key: ValueKey(s.count),
                                style: const TextStyle(
                                  fontSize: 64,
                                  fontWeight: FontWeight.w300,
                                  letterSpacing: -2,
                                ),
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
