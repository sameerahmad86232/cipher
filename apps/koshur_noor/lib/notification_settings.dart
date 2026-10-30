import 'package:flutter/material.dart';

import 'app_state.dart';
import 'glass_panel.dart';
import 'prayer_notifications.dart';

const _emerald = Color(0xff21483d);
const _midnight = Color(0xff102e29);
const _brass = Color(0xffd9b779);
const _umber = Color(0xffa77437);
const _cream = Color(0xfffffbf5);

class NotificationSettings extends StatelessWidget {
  final AppState state;
  const NotificationSettings({super.key, required this.state});

  @override
  Widget build(BuildContext context) {
    final alerts = state.notifications;
    return Scaffold(
      appBar: AppBar(title: const Text('Adhan & prayer alerts')),
      body: alerts == null || !alerts.supported
          ? const Center(
              child: Padding(
                padding: EdgeInsets.all(28),
                child: Text('Adhan and scheduled prayer alerts are available in the Android app.'),
              ),
            )
          : ListenableBuilder(
              listenable: alerts,
              builder: (context, _) {
                final isDark = Theme.of(context).brightness == Brightness.dark;
                return ListView(
                  padding: const EdgeInsets.fromLTRB(18, 12, 18, 38),
                  children: [
                    _AdhanHero(enabled: alerts.enabled, voice: alerts.voice),
                    const SizedBox(height: 26),
                    const _SectionHeading(
                      eyebrow: 'YOUR MOMENT OF REMEMBRANCE',
                      title: 'Hear the call.',
                      detail: 'Personalise how your day pauses for prayer.',
                    ),
                    const SizedBox(height: 13),
                    GlassPanel(
                      enabled: state.glass,
                      padding: const EdgeInsets.fromLTRB(17, 7, 17, 7),
                      child: Column(
                        children: [
                          _SwitchRow(
                            icon: Icons.notifications_active_outlined,
                            title: 'Prayer notifications',
                            subtitle: 'Receive the five daily calls to prayer',
                            value: alerts.enabled,
                            onChanged: (v) => alerts.setEnabled(v, state.service),
                          ),
                          const Divider(height: 1),
                          _SwitchRow(
                            icon: Icons.volume_up_outlined,
                            title: 'Play the Adhan',
                            subtitle: 'Turn off for a quiet notification',
                            value: alerts.sound,
                            onChanged: (v) => alerts.setSound(v, state.service),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 28),
                    const _SectionHeading(
                      eyebrow: 'A VOICE THAT MOVES YOU',
                      title: 'Choose your Adhan',
                      detail: 'Listen to each recording and choose what feels right.',
                    ),
                    const SizedBox(height: 13),
                    for (final item in PrayerNotifications.voices.entries)
                      Padding(
                        padding: const EdgeInsets.only(bottom: 10),
                        child: _VoiceCard(
                          id: item.key,
                          name: item.value,
                          selected: alerts.voice == item.key,
                          detail: PrayerNotifications.voiceDetails[item.key]!,
                          onSelect: () => alerts.setVoice(item.key, state.service),
                          onPreview: () => alerts.previewVoice(item.key),
                        ),
                      ),
                    const SizedBox(height: 7),
                    Row(
                      children: [
                        Icon(Icons.info_outline_rounded,
                            size: 14, color: isDark ? _brass : _umber),
                        const SizedBox(width: 8),
                        const Expanded(
                          child: Text(
                            'Madinah is a licensed field recording from the Prophet’s Mosque. Playback duration depends on Android notification settings.',
                            style: TextStyle(fontSize: 11, height: 1.5),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 27),
                    const _SectionHeading(
                      eyebrow: 'MAKE IT YOURS',
                      title: 'Prayer experience',
                      detail: 'Gentle reminders, precise timing and an optional focus moment.',
                    ),
                    const SizedBox(height: 13),
                    GlassPanel(
                      enabled: state.glass,
                      padding: const EdgeInsets.fromLTRB(16, 7, 16, 7),
                      child: Column(
                        children: [
                          _SwitchRow(
                            icon: Icons.schedule_rounded,
                            title: 'Before prayer',
                            subtitle: 'Gentle reminder two minutes early',
                            value: alerts.preReminder,
                            onChanged: (v) => alerts.setPreReminder(v, state.service),
                          ),
                          const Divider(height: 1),
                          _SwitchRow(
                            icon: Icons.nights_stay_outlined,
                            title: 'Prayer focus',
                            subtitle: 'Immersive view · hold 5 seconds to dismiss',
                            value: alerts.focus,
                            onChanged: (v) => alerts.setFocus(v, state.service),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 23),
                    const Text('PRAYERS TO REMIND ME',
                        style: TextStyle(
                          fontSize: 10, fontWeight: FontWeight.w800,
                          letterSpacing: 1.5, color: _umber,
                        )),
                    const SizedBox(height: 10),
                    GlassPanel(
                      enabled: state.glass,
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
                      child: Column(
                        children: [
                          for (final prayer in const {
                            'fajr': 'Fajr',
                            'dhuhr': 'Dhuhr',
                            'asr': 'Asr',
                            'maghrib': 'Maghrib',
                            'isha': 'Isha',
                          }.entries)
                            CheckboxListTile(
                              contentPadding: const EdgeInsets.symmetric(horizontal: 5),
                              controlAffinity: ListTileControlAffinity.trailing,
                              visualDensity: VisualDensity.compact,
                              activeColor: _emerald,
                              title: Text(prayer.value,
                                style: const TextStyle(
                                  fontFamily: 'ClassicalSerif',
                                  fontSize: 20, fontWeight: FontWeight.w600,
                                )),
                              value: alerts.prayers.contains(prayer.key),
                              onChanged: (v) => alerts.setPrayer(
                                prayer.key, v ?? false, state.service),
                            ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 22),
                    DecoratedBox(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(17),
                        color: isDark ? const Color(0xff2a4539) : const Color(0xffe9eee5),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Icon(Icons.check_circle_outline,
                              size: 21, color: _emerald),
                            const SizedBox(width: 11),
                            Expanded(child: Text(
                              alerts.status,
                              style: const TextStyle(fontSize: 12, height: 1.55),
                            )),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 18),
                    Wrap(
                      spacing: 10,
                      runSpacing: 10,
                      children: [
                        OutlinedButton.icon(
                          onPressed: () => alerts.requestExact(state.service),
                          icon: const Icon(Icons.alarm_outlined, size: 18),
                          label: const Text('Precise alarms'),
                        ),
                        OutlinedButton.icon(
                          onPressed: alerts.requestOverlay,
                          icon: const Icon(Icons.layers_outlined, size: 18),
                          label: const Text('Overlay permission'),
                        ),
                        OutlinedButton.icon(
                          onPressed: alerts.previewFocus,
                          icon: const Icon(Icons.open_in_full_rounded, size: 18),
                          label: const Text('Try prayer focus'),
                        ),
                        OutlinedButton.icon(
                          onPressed: alerts.preview,
                          icon: const Icon(Icons.play_arrow_rounded, size: 18),
                          label: const Text('Test selected Adhan'),
                        ),
                      ],
                    ),
                    const SizedBox(height: 25),
                    Text(
                      'Prayer focus is optional and never locks Android. The emergency dismiss notification remains available. Precise alarms and display-over-apps access are required for focus. Open Noor at least once a month to renew reminders. Silent mode, Do Not Disturb, battery restrictions and Android notification channels can affect playback. Recordings may not include the separate Fajr phrase.',
                      style: TextStyle(
                        fontSize: 11, height: 1.65,
                        color: Theme.of(context).colorScheme.onSurfaceVariant,
                      ),
                    ),
                    const SizedBox(height: 17),
                    Text(
                      'RECORDING CREDITS  ·  Madinah — ejaz215, “Islamic call to prayer from the prophet mosque”, Wikimedia Commons, CC BY 3.0. Other recordings: Jarih (CC BY-SA 3.0); Aishatu98 (CC0); Andrewler (CC BY-SA 4.0). Sources and full licences: THIRD_PARTY_NOTICES.md in the app repository.',
                      style: TextStyle(
                        fontSize: 10, height: 1.7,
                        color: Theme.of(context).colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                );
              },
            ),
    );
  }
}

class _AdhanHero extends StatelessWidget {
  final bool enabled;
  final String voice;
  const _AdhanHero({required this.enabled, required this.voice});

  @override
  Widget build(BuildContext context) => Container(
    height: 266,
    clipBehavior: Clip.antiAlias,
    decoration: BoxDecoration(
      borderRadius: BorderRadius.circular(27),
      gradient: const LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [_midnight, Color(0xff285848)],
      ),
      boxShadow: [
        BoxShadow(
          color: _midnight.withValues(alpha: .2),
          blurRadius: 25,
          offset: const Offset(0, 10),
        ),
      ],
    ),
    child: Stack(
      children: [
        Positioned(
          top: -94, right: -90,
          child: IgnorePointer(
            child: SizedBox(
              width: 280, height: 280,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  for (final d in [260.0, 206.0, 152.0])
                    Container(
                      width: d, height: d,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(color: const Color(0x44e7c68d)),
                      ),
                    ),
                  const Icon(Icons.mosque_outlined,
                    color: Color(0x77efcf9b), size: 64),
                ],
              ),
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.fromLTRB(23, 21, 23, 21),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 7),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: .09),
                  borderRadius: BorderRadius.circular(30),
                  border: Border.all(color: const Color(0x60dcc397)),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(enabled ? Icons.graphic_eq_rounded : Icons.notifications_off_outlined,
                      color: _brass, size: 15),
                    const SizedBox(width: 7),
                    Text(enabled ? 'PRAYER ALERTS ON' : 'PRAYER ALERTS OFF',
                      style: const TextStyle(
                        color: Color(0xfff1d4a3), fontSize: 9,
                        letterSpacing: 1.4, fontWeight: FontWeight.w700,
                      )),
                  ],
                ),
              ),
              const Spacer(),
              const Text(
                'حَيَّ عَلَى الصَّلَاةِ',
                textDirection: TextDirection.rtl,
                style: TextStyle(
                  fontFamily: 'Arabic',
                  fontSize: 29,
                  color: Color(0xffedce99),
                  height: 1.4,
                ),
              ),
              const SizedBox(height: 3),
              const Text(
                'Let the Adhan\nfind your heart.',
                style: TextStyle(
                  fontFamily: 'ClassicalSerif',
                  color: _cream,
                  height: .99,
                  fontSize: 37,
                  fontWeight: FontWeight.w600,
                  letterSpacing: -.8,
                ),
              ),
              const SizedBox(height: 13),
              Text(
                'Selected · ${PrayerNotifications.voices[voice] ?? "Adhan"}',
                style: const TextStyle(
                  fontSize: 11,
                  color: Color(0xffd4decf),
                  letterSpacing: .1,
                ),
              ),
            ],
          ),
        ),
      ],
    ),
  );
}

class _SectionHeading extends StatelessWidget {
  final String eyebrow, title, detail;
  const _SectionHeading({
    required this.eyebrow, required this.title, required this.detail,
  });
  @override
  Widget build(BuildContext context) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(eyebrow,
        style: const TextStyle(
          color: _umber, letterSpacing: 1.75,
          fontSize: 9, fontWeight: FontWeight.w800,
        )),
      const SizedBox(height: 6),
      Text(title, style: const TextStyle(
        fontFamily: 'ClassicalSerif',
        fontSize: 31, height: 1.08,
        fontWeight: FontWeight.w600,
      )),
      const SizedBox(height: 6),
      Text(detail, style: TextStyle(
        color: Theme.of(context).colorScheme.onSurfaceVariant,
        fontSize: 12, height: 1.4,
      )),
    ],
  );
}

class _SwitchRow extends StatelessWidget {
  final IconData icon;
  final String title, subtitle;
  final bool value;
  final ValueChanged<bool> onChanged;
  const _SwitchRow({
    required this.icon, required this.title, required this.subtitle,
    required this.value, required this.onChanged,
  });
  @override
  Widget build(BuildContext context) => SwitchListTile(
    contentPadding: EdgeInsets.zero,
    activeTrackColor: _emerald,
    secondary: Container(
      height: 42, width: 42, alignment: Alignment.center,
      decoration: BoxDecoration(
        color: Theme.of(context).brightness == Brightness.dark
          ? const Color(0xff37594c) : const Color(0xffe9eee5),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Icon(icon,
        size: 21,
        color: Theme.of(context).brightness == Brightness.dark
          ? _brass : _emerald),
    ),
    title: Text(title, style: const TextStyle(
      fontWeight: FontWeight.w700, fontSize: 13,
    )),
    subtitle: Text(subtitle, style: const TextStyle(fontSize: 11, height: 1.4)),
    value: value,
    onChanged: onChanged,
  );
}

class _VoiceCard extends StatelessWidget {
  final String id, name;
  final (String, String) detail;
  final bool selected;
  final VoidCallback onSelect, onPreview;
  const _VoiceCard({
    required this.id,
    required this.name,
    required this.detail,
    required this.selected,
    required this.onSelect,
    required this.onPreview,
  });

  @override
  Widget build(BuildContext context) {
    final featured = id == 'adhan_madinah';
    final dark = Theme.of(context).brightness == Brightness.dark;
    final foreground = featured
        ? const Color(0xfffff9eb)
        : Theme.of(context).colorScheme.onSurface;
    return Material(
      color: featured ? _emerald : Theme.of(context).cardColor,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(19),
        side: BorderSide(
          color: selected ? _brass : (featured
              ? const Color(0xff5f8a72)
              : Theme.of(context).dividerColor),
          width: selected ? 1.7 : 1,
        ),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(19),
        onTap: onSelect,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(13, 14, 10, 14),
          child: Row(
            children: [
              AnimatedContainer(
                duration: const Duration(milliseconds: 240),
                height: 49, width: 49,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(15),
                  color: featured
                    ? const Color(0xff3e6858)
                    : dark ? const Color(0xff36564a) : const Color(0xffe9eee5),
                ),
                child: Icon(
                  featured ? Icons.mosque_outlined
                      : selected ? Icons.check_circle_rounded : Icons.multitrack_audio_outlined,
                  color: featured ? _brass : _emerald,
                  size: 24,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (featured)
                      const Padding(
                        padding: EdgeInsets.only(bottom: 4),
                        child: Text('FEATURED  ·  MADINAH',
                          style: TextStyle(
                            fontSize: 9, color: _brass,
                            fontWeight: FontWeight.w800,
                            letterSpacing: 1.3,
                          )),
                      ),
                    Text(name,
                      maxLines: 2,
                      style: TextStyle(
                        color: foreground,
                        fontSize: featured ? 15 : 14,
                        fontWeight: FontWeight.w700,
                      )),
                    const SizedBox(height: 5),
                    Text(detail.$1,
                      style: TextStyle(fontSize: 11,
                        color: featured
                            ? const Color(0xffcadbd1)
                            : Theme.of(context).colorScheme.onSurfaceVariant)),
                    const SizedBox(height: 3),
                    Text(detail.$2,
                      style: TextStyle(
                        fontSize: 10,
                        color: featured ? const Color(0xffdfc994) : _umber,
                      )),
                    if (selected)
                      const Padding(
                        padding: EdgeInsets.only(top: 6),
                        child: Text('SELECTED',
                          style: TextStyle(
                            fontSize: 9, color: _brass,
                            letterSpacing: 1, fontWeight: FontWeight.w800)),
                      ),
                  ],
                ),
              ),
              const SizedBox(width: 3),
              IconButton.filledTonal(
                tooltip: 'Preview $name',
                onPressed: onPreview,
                style: IconButton.styleFrom(
                  backgroundColor: featured
                    ? const Color(0xff537967) : const Color(0xffe9eee5),
                  foregroundColor: featured ? Colors.white : _emerald,
                ),
                icon: const Icon(Icons.play_arrow_rounded),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
