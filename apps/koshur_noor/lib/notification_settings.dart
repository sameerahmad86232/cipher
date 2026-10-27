import 'package:flutter/material.dart';

import 'app_state.dart';
import 'glass_panel.dart';
import 'prayer_notifications.dart';

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
                child: Text(
                  'Scheduled adhan notifications are available in the Android app.',
                ),
              ),
            )
          : ListenableBuilder(
              listenable: alerts,
              builder: (context, _) => ListView(
                padding: const EdgeInsets.all(22),
                children: [
                  const Icon(
                    Icons.notifications_active_outlined,
                    size: 52,
                    color: Color(0xffed8073),
                  ),
                  const SizedBox(height: 14),
                  Text(
                    'Never miss a moment',
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.headlineMedium,
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Offline reminders, following your location and prayer timetable.',
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 22),
                  GlassPanel(
                    enabled: state.glass,
                    child: Column(
                      children: [
                        SwitchListTile(
                          contentPadding: EdgeInsets.zero,
                          title: const Text('Prayer notifications'),
                          value: alerts.enabled,
                          onChanged: (v) => alerts.setEnabled(v, state.service),
                        ),
                        SwitchListTile(
                          contentPadding: EdgeInsets.zero,
                          title: const Text('Adhan sound'),
                          subtitle: const Text(
                            'Recorded adhan · turn off for silent alerts',
                          ),
                          value: alerts.sound,
                          onChanged: (v) => alerts.setSound(v, state.service),
                        ),
                        const SizedBox(height: 8),
                        Align(
                          alignment: Alignment.centerLeft,
                          child: Text(
                            'Choose your adhan',
                            style: Theme.of(context).textTheme.titleMedium,
                          ),
                        ),
                        const SizedBox(height: 10),
                        for (final voice in PrayerNotifications.voices.entries)
                          Padding(
                            padding: const EdgeInsets.only(bottom: 8),
                            child: _VoiceCard(
                              name: voice.value,
                              selected: alerts.voice == voice.key,
                              detail:
                                  PrayerNotifications.voiceDetails[voice.key]!,
                              onSelect: () =>
                                  alerts.setVoice(voice.key, state.service),
                              onPreview: () => alerts.previewVoice(voice.key),
                            ),
                          ),
                        SwitchListTile(
                          contentPadding: EdgeInsets.zero,
                          title: const Text('Two-minute reminder'),
                          subtitle: const Text(
                            'A separate alert before each prayer',
                          ),
                          value: alerts.preReminder,
                          onChanged: (v) =>
                              alerts.setPreReminder(v, state.service),
                        ),
                        SwitchListTile(
                          contentPadding: EdgeInsets.zero,
                          title: const Text('Prayer focus overlay'),
                          subtitle: const Text(
                            'Cover other apps · hold 5 seconds to dismiss',
                          ),
                          value: alerts.focus,
                          onChanged: (v) => alerts.setFocus(v, state.service),
                        ),
                        const Divider(),
                        for (final p in const {
                          'fajr': 'Fajr',
                          'dhuhr': 'Dhuhr',
                          'asr': 'Asr',
                          'maghrib': 'Maghrib',
                          'isha': 'Isha',
                        }.entries)
                          CheckboxListTile(
                            contentPadding: EdgeInsets.zero,
                            title: Text(p.value),
                            value: alerts.prayers.contains(p.key),
                            onChanged: (v) => alerts.setPrayer(
                              p.key,
                              v ?? false,
                              state.service,
                            ),
                          ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 18),
                  Text(alerts.status, style: const TextStyle(height: 1.6)),
                  const SizedBox(height: 12),
                  OutlinedButton.icon(
                    onPressed: () => alerts.requestExact(state.service),
                    icon: const Icon(Icons.alarm),
                    label: const Text('Allow precise prayer alarms'),
                  ),
                  OutlinedButton.icon(
                    onPressed: alerts.requestOverlay,
                    icon: const Icon(Icons.layers_outlined),
                    label: const Text('Allow display over other apps'),
                  ),
                  OutlinedButton.icon(
                    onPressed: alerts.previewFocus,
                    icon: const Icon(Icons.touch_app_outlined),
                    label: const Text('Test five-second prayer focus'),
                  ),
                  OutlinedButton.icon(
                    onPressed: alerts.preview,
                    icon: const Icon(Icons.volume_up_outlined),
                    label: const Text('Test notification & sound'),
                  ),
                  const SizedBox(height: 18),
                  const Text(
                    'Focus is opt-in and does not lock Android or block system controls. Emergency dismiss remains available in the ongoing notification. Grant display-over-apps and precise alarms, then enable focus. Custom prayer times are under Settings → Custom prayer times. Open Noor at least once every 30 days to renew the schedule. Reboot restores scheduled alerts. After force-stopping the app, reopen it. Silent mode, Do Not Disturb, notification-channel settings and battery restrictions can affect delivery or sound. This recording does not include the additional Fajr phrase.',
                    style: TextStyle(fontSize: 12, height: 1.7),
                  ),
                  const SizedBox(height: 14),
                  const Text(
                    'Additional recordings: Aishatu98, “Adhan”, CC0; Andrewler, “Azan”, CC BY-SA 4.0, Wikimedia Commons. See app source THIRD_PARTY_NOTICES for links and credits. Classic recording: Jarih, “Adhan wiki”, Wikimedia Commons. CC BY-SA 3.0. Converted to Ogg Vorbis; no content edits. commons.wikimedia.org/wiki/File:Adhan_wiki.oga · creativecommons.org/licenses/by-sa/3.0/',
                    style: TextStyle(fontSize: 11, height: 1.6),
                  ),
                ],
              ),
            ),
    );
  }
}

class _VoiceCard extends StatelessWidget {
  final String name;
  final (String, String) detail;
  final bool selected;
  final VoidCallback onSelect, onPreview;
  const _VoiceCard({
    required this.name,
    required this.detail,
    required this.selected,
    required this.onSelect,
    required this.onPreview,
  });

  @override
  Widget build(BuildContext context) => Material(
    color: selected
        ? Theme.of(context).colorScheme.primaryContainer.withValues(alpha: .55)
        : Theme.of(context).colorScheme.surface.withValues(alpha: .45),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(14),
      side: BorderSide(
        color: selected
            ? const Color(0xffed8073)
            : Theme.of(context).dividerColor.withValues(alpha: .55),
        width: selected ? 1.5 : 1,
      ),
    ),
    child: InkWell(
      borderRadius: BorderRadius.circular(14),
      onTap: onSelect,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(14, 12, 8, 12),
        child: Row(
          children: [
            AnimatedContainer(
              duration: const Duration(milliseconds: 220),
              width: 38,
              height: 38,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: selected
                    ? const Color(0xffed8073)
                    : const Color(0xffed8073).withValues(alpha: .12),
              ),
              child: Icon(
                selected ? Icons.check_rounded : Icons.graphic_eq_rounded,
                color: selected ? Colors.white : const Color(0xffa24e36),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    name,
                    style: const TextStyle(fontWeight: FontWeight.w700),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    '${detail.$1} · ${detail.$2}',
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                ],
              ),
            ),
            IconButton(
              tooltip: 'Preview $name',
              onPressed: onPreview,
              icon: const Icon(Icons.play_circle_outline_rounded),
            ),
          ],
        ),
      ),
    ),
  );
}
