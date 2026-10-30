import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:geolocator/geolocator.dart';

import 'app_state.dart';
import 'device_services.dart';
import 'prayer_notifications.dart';

/// A one-time, non-blocking introduction to Android's optional permissions.
/// No OS permission prompt appears until the user taps its individual button.
class PermissionStartup extends StatefulWidget {
  final AppState state;
  final Widget child;
  final bool enabled;
  const PermissionStartup({
    super.key,
    required this.state,
    required this.child,
    this.enabled = true,
  });

  @override
  State<PermissionStartup> createState() => _PermissionStartupState();
}

class _PermissionStartupState extends State<PermissionStartup> {
  late bool _finished;

  @override
  void initState() {
    super.initState();
    _finished = !widget.enabled ||
        kIsWeb ||
        defaultTargetPlatform != TargetPlatform.android ||
        widget.state.prefs.getBool('permissionsIntroSeen') == true;
  }

  Future<void> _complete() async {
    await widget.state.prefs.setBool('permissionsIntroSeen', true);
    if (mounted) setState(() => _finished = true);
  }

  @override
  Widget build(BuildContext context) => _finished
      ? widget.child
      : PermissionSetup(state: widget.state, onFinished: _complete);
}

/// Can also be opened later from Settings. Android special-access pages are
/// requested separately and their actual state is rechecked on app resume.
class PermissionSetup extends StatefulWidget {
  final AppState state;
  final VoidCallback onFinished;
  const PermissionSetup({
    super.key,
    required this.state,
    required this.onFinished,
  });

  @override
  State<PermissionSetup> createState() => _PermissionSetupState();
}

class _PermissionSetupState extends State<PermissionSetup>
    with WidgetsBindingObserver {
  bool locationGranted = false;
  bool notificationsGranted = false;
  bool exactGranted = false;
  bool overlayGranted = false;
  String? busy;
  String? notice;

  bool get onAndroid =>
      !kIsWeb && defaultTargetPlatform == TargetPlatform.android;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _refreshStatus();
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) _refreshStatus();
  }

  Future<void> _refreshStatus() async {
    if (!onAndroid) return;
    var location = false;
    var notifications = false;
    var exact = false;
    var overlay = false;
    try {
      final permission = await Geolocator.checkPermission();
      location = permission == LocationPermission.always ||
          permission == LocationPermission.whileInUse;
    } catch (_) {
      // The user can still choose a city manually.
    }
    final android = widget.state.notifications?.android;
    try {
      notifications = await android?.areNotificationsEnabled() ?? false;
    } catch (_) {}
    try {
      exact = await android?.canScheduleExactNotifications() ?? false;
    } catch (_) {}
    try {
      final status = await PrayerNotifications.focusChannel
          .invokeMapMethod<String, dynamic>('status');
      overlay = status?['overlay'] == true;
    } catch (_) {}
    if (!mounted) return;
    setState(() {
      locationGranted = location;
      notificationsGranted = notifications;
      exactGranted = exact;
      overlayGranted = overlay;
    });
  }

  Future<void> _request(
    String action,
    Future<void> Function() operation,
  ) async {
    if (busy != null) return;
    setState(() {
      busy = action;
      notice = null;
    });
    try {
      await operation();
    } on LocationProblem catch (error) {
      notice = error.message;
    } on PlatformException catch (_) {
      notice = 'Android could not open this permission. Try again in your phone settings.';
    } catch (_) {
      notice = 'Permission could not be updated. You can try again later in Settings.';
    } finally {
      await _refreshStatus();
      if (mounted) setState(() => busy = null);
    }
  }

  Future<void> _useLocation() async {
    final city = await PhoneLocator().locate();
    await widget.state.update(() => widget.state.city = city);
  }

  Future<void> _enableNotifications() async {
    final alerts = widget.state.notifications;
    if (alerts == null) return;
    await alerts.setEnabled(true, widget.state.service);
  }

  Future<void> _allowExactAlarms() async {
    await widget.state.notifications?.requestExact(widget.state.service);
  }

  Future<void> _allowOverlay() async {
    await widget.state.notifications?.requestOverlay();
  }

  @override
  Widget build(BuildContext context) {
    final dark = Theme.of(context).brightness == Brightness.dark;
    final surface = dark ? const Color(0xff493129) : const Color(0xfffffaf5);
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 540),
            child: ListView(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 28),
              children: [
                Container(
                  padding: const EdgeInsets.fromLTRB(22, 22, 22, 24),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(26),
                    gradient: const LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: [Color(0xffec7d73), Color(0xffffc0a0)],
                    ),
                  ),
                  child: const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Icon(Icons.nights_stay_outlined, size: 34, color: Color(0xff63382d)),
                      SizedBox(height: 14),
                      Text(
                        'WELCOME TO NOOR',
                        style: TextStyle(
                          color: Color(0xff63382d),
                          fontWeight: FontWeight.w700,
                          letterSpacing: 2.1,
                          fontSize: 11,
                        ),
                      ),
                      SizedBox(height: 8),
                      Text(
                        'Make prayer time your own.',
                        style: TextStyle(
                          color: Color(0xff63382d),
                          fontFamily: 'ClassicalSerif',
                          fontSize: 30,
                          height: 1.06,
                        ),
                      ),
                      SizedBox(height: 12),
                      Text(
                        'Choose which features to enable. Noor still works offline if you skip everything.',
                        style: TextStyle(color: Color(0xff63382d), height: 1.5),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
                Text('Your permissions',
                    style: Theme.of(context).textTheme.titleLarge),
                const SizedBox(height: 6),
                const Text(
                  'Nothing is requested automatically. Each choice is optional.',
                  style: TextStyle(fontSize: 13, height: 1.45),
                ),
                const SizedBox(height: 15),
                _PermissionRow(
                  surface: surface,
                  icon: Icons.location_on_outlined,
                  title: 'Use my location',
                  subtitle: 'Use GPS for accurate Qibla and local prayer times. Or select a city manually.',
                  granted: locationGranted,
                  busy: busy == 'location',
                  disabled: busy != null || !onAndroid,
                  onTap: () => _request('location', _useLocation),
                ),
                _PermissionRow(
                  surface: surface,
                  icon: Icons.notifications_active_outlined,
                  title: 'Prayer notifications',
                  subtitle: 'Enable adhan and five daily prayer reminders.',
                  granted: notificationsGranted,
                  busy: busy == 'notifications',
                  disabled: busy != null || !onAndroid,
                  onTap: () => _request('notifications', _enableNotifications),
                ),
                _PermissionRow(
                  surface: surface,
                  icon: Icons.alarm_outlined,
                  title: 'Precise prayer alarms',
                  subtitle: 'Optional Android special access for more accurate scheduled reminders.',
                  granted: exactGranted,
                  busy: busy == 'exact',
                  disabled: busy != null || !onAndroid,
                  onTap: () => _request('exact', _allowExactAlarms),
                ),
                _PermissionRow(
                  surface: surface,
                  icon: Icons.layers_outlined,
                  title: 'Display over other apps',
                  subtitle: 'Only for the optional prayer-focus overlay; activate focus separately in alert settings.',
                  granted: overlayGranted,
                  busy: busy == 'overlay',
                  disabled: busy != null || !onAndroid,
                  onTap: () => _request('overlay', _allowOverlay),
                ),
                if (notice != null) ...[
                  const SizedBox(height: 8),
                  Text(notice!, style: TextStyle(
                    color: Theme.of(context).colorScheme.error,
                    height: 1.5,
                  )),
                ],
                const SizedBox(height: 17),
                FilledButton(
                  onPressed: busy == null ? widget.onFinished : null,
                  style: FilledButton.styleFrom(
                    backgroundColor: const Color(0xffa24e36),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15),
                    ),
                  ),
                  child: const Text('Continue to Noor'),
                ),
                TextButton(
                  onPressed: busy == null ? widget.onFinished : null,
                  child: const Text('Continue without permissions'),
                ),
                const SizedBox(height: 6),
                const Text(
                  'You can change these permissions later in Settings. Android controls special access, and no background location is collected.',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 11, height: 1.5),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _PermissionRow extends StatelessWidget {
  final Color surface;
  final IconData icon;
  final String title, subtitle;
  final bool granted, busy, disabled;
  final VoidCallback onTap;

  const _PermissionRow({
    required this.surface,
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.granted,
    required this.busy,
    required this.disabled,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.only(bottom: 9),
    child: DecoratedBox(
      decoration: BoxDecoration(
        color: surface,
        borderRadius: BorderRadius.circular(17),
        border: Border.all(color: Theme.of(context).dividerColor.withValues(alpha: .35)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(13),
        child: Row(
          children: [
            Icon(icon, color: const Color(0xffd77869), size: 26),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
                  const SizedBox(height: 4),
                  Text(subtitle, style: const TextStyle(fontSize: 11.5, height: 1.4)),
                ],
              ),
            ),
            const SizedBox(width: 7),
            SizedBox(
              width: 84,
              child: OutlinedButton(
                onPressed: disabled || granted ? null : onTap,
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 10),
                ),
                child: busy
                    ? const SizedBox(height: 14, width: 14,
                        child: CircularProgressIndicator(strokeWidth: 2))
                    : Text(granted ? 'Allowed' : 'Allow', style: const TextStyle(fontSize: 12)),
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
