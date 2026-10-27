import 'dart:async';
import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class DictionaryEntry {
  final String kashmiri, english, transliteration;
  const DictionaryEntry({
    required this.kashmiri,
    required this.english,
    required this.transliteration,
  });

  factory DictionaryEntry.fromJson(Map<String, dynamic> json) =>
      DictionaryEntry(
        kashmiri: '${json['k'] ?? ''}'.trim(),
        english: '${json['e'] ?? ''}'.trim(),
        transliteration: '${json['tr'] ?? ''}'.trim(),
      );
}

class DictionaryPayload {
  final int entryCount;
  final String sourceRecordLabel;
  final List<DictionaryEntry> entries;
  const DictionaryPayload(
    this.entryCount,
    this.sourceRecordLabel,
    this.entries,
  );
}

DictionaryPayload parseDictionary(String raw) {
  final json = jsonDecode(raw) as Map<String, dynamic>;
  final entries = (json['entries'] as List? ?? const [])
      .whereType<Map>()
      .map((row) => DictionaryEntry.fromJson(Map<String, dynamic>.from(row)))
      .where((entry) => entry.kashmiri.isNotEmpty)
      .toList(growable: false);
  return DictionaryPayload(
    json['entryCount'] as int? ?? entries.length,
    '${json['sourceRecordLabel'] ?? '58,000+ source records'}',
    entries,
  );
}

String foldDictionaryText(String value) => value
    .toLowerCase()
    .replaceAll(RegExp(r'[\u064b-\u065f\u0670\u06d6-\u06ed]'), '')
    .replaceAll('ـ', '')
    .replaceAll(RegExp(r'\s+'), ' ')
    .trim();

List<DictionaryEntry> searchDictionary(
  List<DictionaryEntry> entries,
  String query, {
  int limit = 80,
}) {
  final needle = foldDictionaryText(query);
  if (needle.isEmpty) return const [];
  final ranked = <(int, DictionaryEntry)>[];
  for (final entry in entries) {
    final k = foldDictionaryText(entry.kashmiri);
    final e = foldDictionaryText(entry.english);
    final tr = foldDictionaryText(entry.transliteration);
    final rank = k == needle
        ? 0
        : e == needle
        ? 1
        : tr == needle
        ? 2
        : k.startsWith(needle)
        ? 3
        : e.startsWith(needle)
        ? 4
        : tr.startsWith(needle)
        ? 5
        : k.contains(needle)
        ? 6
        : e.contains(needle)
        ? 7
        : tr.contains(needle)
        ? 8
        : -1;
    if (rank >= 0) ranked.add((rank, entry));
  }
  ranked.sort((a, b) {
    final rank = a.$1.compareTo(b.$1);
    return rank != 0
        ? rank
        : a.$2.english.toLowerCase().compareTo(b.$2.english.toLowerCase());
  });
  return ranked.take(limit).map((result) => result.$2).toList(growable: false);
}

class DictionaryScreen extends StatefulWidget {
  const DictionaryScreen({super.key});

  @override
  State<DictionaryScreen> createState() => _DictionaryScreenState();
}

class _DictionaryScreenState extends State<DictionaryScreen> {
  final search = TextEditingController();
  DictionaryPayload? payload;
  List<DictionaryEntry> results = const [];
  String? error;
  Timer? debounce;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    try {
      final raw = await rootBundle.loadString('assets/data/dictionary.json');
      final loaded = await compute(parseDictionary, raw);
      if (!mounted) return;
      setState(() => payload = loaded);
      _search(search.text);
    } catch (_) {
      if (mounted)
        setState(() => error = 'The offline dictionary could not be loaded.');
    }
  }

  void _search(String value) {
    debounce?.cancel();
    debounce = Timer(const Duration(milliseconds: 140), () {
      if (!mounted || payload == null) return;
      setState(() => results = searchDictionary(payload!.entries, value));
    });
  }

  @override
  void dispose() {
    debounce?.cancel();
    search.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Koshur dictionary')),
    body: SafeArea(
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(18, 8, 18, 12),
            child: Column(
              children: [
                const Text(
                  'کٲشُر لُغَت',
                  textDirection: TextDirection.rtl,
                  style: TextStyle(
                    fontFamily: 'Nastaliq',
                    fontSize: 31,
                    height: 2,
                  ),
                ),
                Text(
                  payload == null
                      ? 'Loading the offline dictionary…'
                      : '${payload!.entryCount} searchable headwords · ${payload!.sourceRecordLabel}',
                  textAlign: TextAlign.center,
                  style: Theme.of(context).textTheme.bodySmall,
                ),
                const SizedBox(height: 14),
                TextField(
                  controller: search,
                  autofocus: true,
                  textInputAction: TextInputAction.search,
                  onChanged: _search,
                  decoration: InputDecoration(
                    hintText: 'Search Kashmiri, English or romanization',
                    prefixIcon: const Icon(Icons.search_rounded),
                    suffixIcon: search.text.isEmpty
                        ? null
                        : IconButton(
                            tooltip: 'Clear search',
                            onPressed: () {
                              search.clear();
                              _search('');
                              setState(() {});
                            },
                            icon: const Icon(Icons.close_rounded),
                          ),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(22),
                      borderSide: BorderSide.none,
                    ),
                  ),
                ),
              ],
            ),
          ),
          Expanded(child: _body(context)),
        ],
      ),
    ),
  );

  Widget _body(BuildContext context) {
    if (error != null) return Center(child: Text(error!));
    if (payload == null)
      return const Center(child: CircularProgressIndicator());
    if (search.text.trim().isEmpty) {
      return const _DictionaryEmptyState(
        icon: Icons.translate_rounded,
        title: 'Find the word you need',
        message:
            'Use Kashmiri script, an English meaning, or romanized Kashmiri.',
      );
    }
    if (results.isEmpty) {
      return const _DictionaryEmptyState(
        icon: Icons.search_off_rounded,
        title: 'No direct match',
        message: 'Try a shorter word or a different spelling.',
      );
    }
    return ListView.separated(
      padding: const EdgeInsets.fromLTRB(16, 4, 16, 28),
      itemCount: results.length,
      separatorBuilder: (_, _) => const SizedBox(height: 8),
      itemBuilder: (_, index) {
        final entry = results[index];
        return Card(
          elevation: 0,
          clipBehavior: Clip.antiAlias,
          child: InkWell(
            onLongPress: () {
              Clipboard.setData(
                ClipboardData(
                  text:
                      '${entry.kashmiri} — ${entry.english}${entry.transliteration.isEmpty ? '' : ' (${entry.transliteration})'}',
                ),
              );
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Dictionary entry copied')),
              );
            },
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 13, 16, 14),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          entry.kashmiri,
                          textDirection: TextDirection.rtl,
                          style: const TextStyle(
                            fontFamily: 'Nastaliq',
                            fontSize: 24,
                            height: 1.8,
                          ),
                        ),
                        Text(
                          entry.english,
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        if (entry.transliteration.isNotEmpty) ...[
                          const SizedBox(height: 3),
                          Text(
                            entry.transliteration,
                            style: Theme.of(context).textTheme.bodySmall,
                          ),
                        ],
                      ],
                    ),
                  ),
                  const Padding(
                    padding: EdgeInsets.only(top: 8),
                    child: Icon(Icons.content_copy_rounded, size: 17),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

class _DictionaryEmptyState extends StatelessWidget {
  final IconData icon;
  final String title, message;
  const _DictionaryEmptyState({
    required this.icon,
    required this.title,
    required this.message,
  });

  @override
  Widget build(BuildContext context) => Center(
    child: Padding(
      padding: const EdgeInsets.all(32),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 48, color: const Color(0xffed8073)),
          const SizedBox(height: 14),
          Text(title, style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 7),
          Text(message, textAlign: TextAlign.center),
        ],
      ),
    ),
  );
}
