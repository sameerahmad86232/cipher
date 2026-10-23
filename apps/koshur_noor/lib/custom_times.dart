import 'package:flutter/material.dart';
import 'app_state.dart';

const prayerIds = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
bool validCustomTimes(List<int> t) =>
    t.length == 5 &&
    t.every((v) => v >= 0 && v < 1440) &&
    t[0] < t[1] &&
    t[1] < t[2] &&
    t[2] < t[3] &&
    (t[4] > t[3] || t[4] < t[0]);

class CustomTimesScreen extends StatefulWidget {
  final AppState state;
  const CustomTimesScreen({super.key, required this.state});
  @override
  State<CustomTimesScreen> createState() => _CustomTimesScreenState();
}

class _CustomTimesScreenState extends State<CustomTimesScreen> {
  late List<int> times;
  @override
  void initState() {
    super.initState();
    final s = widget.state;
    times = List<int>.from(
      s.customTimes ??
          s.service
              .forDate(s.service.day(DateTime.now()))
              .where((p) => p.isPrayer)
              .map((p) {
                final t = s.service.local(p.instant);
                return t.hour * 60 + t.minute;
              }),
    );
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.state;
    return Scaffold(
      appBar: AppBar(title: const Text('Custom prayer times')),
      body: ListView(
        padding: const EdgeInsets.all(22),
        children: [
          Text(
            '${s.city.name} · ${s.city.zone}',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          const SizedBox(height: 12),
          const Text(
            'Set your trusted local timetable. These times repeat every day until you edit them; they do not follow seasonal changes. Sunrise stays calculated. Calculation adjustments do not affect custom times.',
          ),
          const SizedBox(height: 16),
          for (var i = 0; i < 5; i++)
            ListTile(
              title: Text(['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'][i]),
              subtitle: i == 4 && times[4] < times[0]
                  ? const Text('Following day')
                  : null,
              trailing: Text(
                TimeOfDay(
                  hour: times[i] ~/ 60,
                  minute: times[i] % 60,
                ).format(context),
              ),
              onTap: () async {
                final t = await showTimePicker(
                  context: context,
                  initialTime: TimeOfDay(
                    hour: times[i] ~/ 60,
                    minute: times[i] % 60,
                  ),
                );
                if (t != null && mounted) {
                  setState(() => times[i] = t.hour * 60 + t.minute);
                }
              },
            ),
          const SizedBox(height: 16),
          FilledButton(
            onPressed: () async {
              if (!validCustomTimes(times)) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text(
                      'Use Fajr < Dhuhr < Asr < Maghrib, then Isha in the evening or before next Fajr.',
                    ),
                  ),
                );
                return;
              }
              await s.update(
                () => s.customSchedules[s.scheduleKey] = List<int>.from(times),
              );
              if (context.mounted) Navigator.pop(context);
            },
            child: const Text('Save and use custom times'),
          ),
          TextButton(
            onPressed: () async {
              await s.update(() => s.customSchedules.remove(s.scheduleKey));
              if (context.mounted) Navigator.pop(context);
            },
            child: const Text('Use calculated times instead'),
          ),
        ],
      ),
    );
  }
}
