package com.koshur.koshur_noor

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.provider.Settings
import io.flutter.plugin.common.MethodChannel
import android.hardware.*
import android.os.SystemClock
import android.view.Surface
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.EventChannel

class MainActivity : FlutterActivity() {
    private var compass: TrueNorthCompass? = null
    override fun configureFlutterEngine(engine: FlutterEngine) {
        super.configureFlutterEngine(engine)
        MethodChannel(engine.dartExecutor.binaryMessenger, "com.koshur.noor/prayer_focus").setMethodCallHandler { call, result ->
            when(call.method) {
                "status" -> result.success(mapOf("overlay" to Settings.canDrawOverlays(this), "exact" to PrayerFocus.canExact(this)))
                "requestOverlay" -> {startActivity(Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:$packageName")));result.success(null)}
                "configure" -> {val rows=call.argument<List<Map<*, *>>>("alarms")?:emptyList();result.success(PrayerFocus.configure(this,call.argument<Boolean>("enabled")==true,rows,call.argument<Boolean>("sound")!=false,call.argument<String>("voice")?:"adhan"))}
                "preview" -> {PrayerFocus.show(this,"Prayer focus preview");result.success(null)}
                else -> result.notImplemented()
            }
        }
        compass = TrueNorthCompass(this)
        EventChannel(engine.dartExecutor.binaryMessenger, "com.koshur.noor/true_compass").setStreamHandler(compass)
    }
    override fun onPause() { compass?.pause(); super.onPause() }
    override fun onResume() { super.onResume(); compass?.resume() }
    override fun onDestroy() { compass?.dispose(); super.onDestroy() }
}

/** Android rotation-vector heading with platform geomagnetic declination correction.
 * Uses accelerometer + magnetometer when rotation-vector hardware is unavailable.
 * No simulated sensor values, location polling, background service or network calls.
 */
private class TrueNorthCompass(private val activity: MainActivity) : EventChannel.StreamHandler, SensorEventListener {
    private val manager = activity.getSystemService(Context.SENSOR_SERVICE) as SensorManager
    private val rotation = manager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR)
    private val accel = manager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
    private val magnetic = manager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD)
    private var sink: EventChannel.EventSink? = null
    private var gravity: FloatArray? = null
    private var field: FloatArray? = null
    private var declination = 0f
    private var lastEmit = 0L
    private var quality = SensorManager.SENSOR_STATUS_UNRELIABLE
    override fun onListen(arguments: Any?, events: EventChannel.EventSink) {
        val args = arguments as? Map<*, *>
        val lat = (args?.get("latitude") as? Number)?.toDouble()
        val lon = (args?.get("longitude") as? Number)?.toDouble()
        if (lat == null || lon == null || !lat.isFinite() || !lon.isFinite() || lat !in -90.0..90.0 || lon !in -180.0..180.0) {
            events.error("INVALID_LOCATION", "A valid location is needed for true north.", null); return
        }
        sink = events
        declination = GeomagneticField(lat.toFloat(), lon.toFloat(), 0f, System.currentTimeMillis()).declination
        gravity=null; field=null; lastEmit=0L; quality=SensorManager.SENSOR_STATUS_UNRELIABLE
        if (rotation == null && (accel == null || magnetic == null)) {
            events.error("NO_COMPASS", "This phone does not have the sensors needed for a compass.", null)
            sink=null; return
        }
        resume()
    }
    override fun onCancel(arguments: Any?) { dispose() }
    fun pause() { manager.unregisterListener(this) }
    fun resume() {
        if (sink == null) return
        if (rotation != null) manager.registerListener(this, rotation, SensorManager.SENSOR_DELAY_GAME)
        else {
            manager.registerListener(this, accel, SensorManager.SENSOR_DELAY_GAME)
            manager.registerListener(this, magnetic, SensorManager.SENSOR_DELAY_GAME)
        }
    }
    fun dispose() { pause(); sink=null }
    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
        if (sensor?.type == Sensor.TYPE_ROTATION_VECTOR || sensor?.type == Sensor.TYPE_MAGNETIC_FIELD) quality=accuracy
    }
    override fun onSensorChanged(event: SensorEvent) {
        val matrix = FloatArray(9)
        if (event.sensor.type == Sensor.TYPE_ROTATION_VECTOR) {
            SensorManager.getRotationMatrixFromVector(matrix, event.values)
            quality=event.accuracy
        } else {
            if (event.sensor.type == Sensor.TYPE_ACCELEROMETER) gravity=event.values.clone()
            if (event.sensor.type == Sensor.TYPE_MAGNETIC_FIELD) { field=event.values.clone(); quality=event.accuracy }
            if (gravity == null || field == null || !SensorManager.getRotationMatrix(matrix,null,gravity,field)) return
        }
        val now=SystemClock.elapsedRealtime(); if (now-lastEmit<50) return
        lastEmit=now
        @Suppress("DEPRECATION") val displayRotation=activity.windowManager.defaultDisplay.rotation
        val axes=when(displayRotation) {
            Surface.ROTATION_90 -> Pair(SensorManager.AXIS_Y,SensorManager.AXIS_MINUS_X)
            Surface.ROTATION_180 -> Pair(SensorManager.AXIS_MINUS_X,SensorManager.AXIS_MINUS_Y)
            Surface.ROTATION_270 -> Pair(SensorManager.AXIS_MINUS_Y,SensorManager.AXIS_X)
            else -> Pair(SensorManager.AXIS_X,SensorManager.AXIS_Y)
        }
        val remapped=FloatArray(9)
        if (!SensorManager.remapCoordinateSystem(matrix,axes.first,axes.second,remapped)) return
        val angles=FloatArray(3); SensorManager.getOrientation(remapped,angles)
        val magneticHeading=Math.toDegrees(angles[0].toDouble())
        val heading=((magneticHeading+declination)%360.0+360.0)%360.0
        sink?.success(mapOf("heading" to heading,"accuracy" to quality,"declination" to declination.toDouble()))
    }
}
