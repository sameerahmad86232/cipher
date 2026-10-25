import 'package:flutter/material.dart';
import 'app_state.dart';
import 'glass_panel.dart';

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
                    onPressed: alerts.preview,
                    icon: const Icon(Icons.volume_up_outlined),
                    label: const Text('Test notification & sound'),
                  ),
                  const SizedBox(height: 18),
                  const Text(
                    'Open Noor at least once every 30 days to renew the schedule. Reboot restores scheduled alerts. After force-stopping the app, reopen it. Silent mode, Do Not Disturb, notification-channel settings and battery restrictions can affect delivery or sound. This recording does not include the additional Fajr phrase.',
                    style: TextStyle(fontSize: 12, height: 1.7),
                  ),
                  const SizedBox(height: 14),
                  const Text(
                    'Adhan recording: Jarih, “Adhan wiki”, Wikimedia Commons. CC BY-SA 3.0. Converted to Ogg Vorbis; no content edits. commons.wikimedia.org/wiki/File:Adhan_wiki.oga · creativecommons.org/licenses/by-sa/3.0/',
                    style: TextStyle(fontSize: 11, height: 1.6),
                  ),
                ],
              ),
            ),
    );
  }
}
