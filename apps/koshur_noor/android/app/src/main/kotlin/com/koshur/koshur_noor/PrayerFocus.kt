package com.koshur.koshur_noor

import android.app.*
import android.content.*
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.media.AudioAttributes
import android.media.MediaPlayer
import android.media.AudioManager
import android.media.AudioFocusRequest
import android.net.Uri
import android.os.*
import android.provider.Settings
import android.view.*
import android.widget.*
import org.json.JSONArray
import org.json.JSONObject

/** User-enabled overlay only. Does not use Accessibility, device administration or lock-task. */
object PrayerFocus {
    fun prefs(c: Context) = c.getSharedPreferences("noor_prayer_focus", Context.MODE_PRIVATE)
    fun canExact(c: Context) = Build.VERSION.SDK_INT < 31 || (c.getSystemService(Context.ALARM_SERVICE) as AlarmManager).canScheduleExactAlarms()
    fun intent(c: Context, id: Int, title: String) = PendingIntent.getBroadcast(c, id, Intent(c, PrayerFocusReceiver::class.java).putExtra("title", title), PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
    fun configure(c: Context, enabled: Boolean, alarms: List<Map<*, *>>, sound: Boolean, voice: String): Boolean {
        val p=prefs(c); val manager=c.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        val previous=JSONArray(p.getString("alarms", "[]"))
        for(i in 0 until previous.length()) manager.cancel(intent(c, 5000+i, ""))
        val valid=enabled && Settings.canDrawOverlays(c) && canExact(c)
        val list=JSONArray()
        if(valid) for(row in alarms) list.put(JSONObject().put("time",(row["time"] as Number).toLong()).put("title",row["title"].toString()))
        p.edit().putBoolean("enabled", enabled).putBoolean("sound",sound).putString("voice",voice).putString("alarms",list.toString()).apply()
        if(!enabled) c.stopService(Intent(c, PrayerFocusService::class.java))
        restore(c)
        return valid
    }
    fun restore(c: Context) {
        if(!prefs(c).getBoolean("enabled",false) || !Settings.canDrawOverlays(c) || !canExact(c)) return
        val list=JSONArray(prefs(c).getString("alarms","[]"));val manager=c.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        for(i in 0 until list.length()) {val row=list.getJSONObject(i);val time=row.getLong("time");if(time>System.currentTimeMillis()) manager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP,time,intent(c,5000+i,row.getString("title")))}
    }
    fun show(c: Context, title: String) {
        if(!Settings.canDrawOverlays(c)) return
        val i=Intent(c,PrayerFocusService::class.java).putExtra("title",title)
        try {if(Build.VERSION.SDK_INT>=26)c.startForegroundService(i) else c.startService(i)} catch(_:Exception) { /* OS may deny background start; ordinary prayer notification remains. */ }
    }
}
class PrayerFocusReceiver: BroadcastReceiver() {
    override fun onReceive(c: Context, i: Intent) {if(PrayerFocus.prefs(c).getBoolean("enabled",false)) PrayerFocus.show(c,i.getStringExtra("title")?:"Prayer time")}
}
class PrayerFocusBootReceiver: BroadcastReceiver() {
    override fun onReceive(c: Context, i: Intent) {if(i.action==Intent.ACTION_BOOT_COMPLETED || i.action==Intent.ACTION_MY_PACKAGE_REPLACED)PrayerFocus.restore(c)}
}
class PrayerFocusService: Service() {
    private var overlay: View?=null
    private var player: MediaPlayer?=null
    private var audioManager: AudioManager?=null
    private var audioRequest: AudioFocusRequest?=null
    private val handler=Handler(Looper.getMainLooper())
    override fun onBind(i: Intent?) = null
    override fun onStartCommand(i: Intent?,flags:Int,id:Int): Int {
        if(i?.action=="STOP") {stopSelf();return START_NOT_STICKY}
        val title=i?.getStringExtra("title")?:"Prayer time"
        val nm=getSystemService(NOTIFICATION_SERVICE) as NotificationManager
        if(Build.VERSION.SDK_INT>=26) nm.createNotificationChannel(NotificationChannel("noor_focus","Prayer focus",NotificationManager.IMPORTANCE_LOW).apply {setSound(null,null)})
        val stop=PendingIntent.getService(this,9900,Intent(this,PrayerFocusService::class.java).setAction("STOP"),PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
        val builder=if(Build.VERSION.SDK_INT>=26)Notification.Builder(this,"noor_focus") else Notification.Builder(this)
        val notification=builder.setSmallIcon(R.drawable.ic_prayer_notification).setContentTitle("Koshur Noor · $title").setContentText("Prayer focus is open. Emergency dismiss is always available.").setOngoing(true).addAction(Notification.Action.Builder(null,"Emergency dismiss",stop).build()).build()
        startForeground(9900,notification)
        if(!Settings.canDrawOverlays(this)) {stopSelf();return START_NOT_STICKY}
        handler.removeCallbacksAndMessages(null)
        removeOverlay()
        val dm=resources.displayMetrics;fun dp(v:Int)=(v*dm.density).toInt()
        val root=LinearLayout(this).apply {orientation=LinearLayout.VERTICAL;gravity=Gravity.CENTER;setPadding(dp(28),dp(40),dp(28),dp(40));background=GradientDrawable(GradientDrawable.Orientation.TOP_BOTTOM,intArrayOf(Color.rgb(255,224,203),Color.rgb(255,248,239)))}
        fun text(value:String,size:Float):TextView = TextView(this).apply {text=value;textSize=size;setTextColor(Color.rgb(104,62,45));gravity=Gravity.CENTER;setPadding(0,dp(12),0,dp(12))}
        root.addView(text("☾  KOSHUR NOOR",22f));root.addView(text("A moment for prayer",18f));root.addView(text(title,38f).apply{typeface=Typeface.create("serif",Typeface.NORMAL)})
        root.addView(text("Pause. Breathe. Return to prayer.",17f))
        val progress=ProgressBar(this,null,android.R.attr.progressBarStyleHorizontal).apply {max=5000;progress=0;progressTintList=android.content.res.ColorStateList.valueOf(Color.rgb(237,128,115))}
        val label=text("Hold to unlock · 5 seconds",20f).apply {setPadding(dp(18),dp(28),dp(18),dp(28));background=GradientDrawable().apply{setColor(Color.rgb(255,250,245));cornerRadius=dp(24).toFloat()};contentDescription="Hold for five seconds to dismiss prayer focus. Alternatively use emergency dismiss in the notification."}
        val button=LinearLayout(this).apply{orientation=LinearLayout.VERTICAL;addView(label);addView(progress,LinearLayout.LayoutParams(-1,dp(6)))}
        val gate=HoldGate();var holding=false
        val tick=object:Runnable {override fun run(){if(!holding)return;val elapsed=gate.progress(SystemClock.elapsedRealtime());progress.progress=elapsed;label.text="Hold to unlock · ${((5000-elapsed+999)/1000).coerceAtLeast(0)}";if(elapsed>=5000){holding=false;stopSelf()}else handler.postDelayed(this,40)}}
        label.setOnTouchListener {_,event -> when(event.actionMasked) {MotionEvent.ACTION_DOWN->{holding=true;gate.start(SystemClock.elapsedRealtime());handler.post(tick)};MotionEvent.ACTION_UP,MotionEvent.ACTION_CANCEL->{holding=false;gate.cancel();handler.removeCallbacks(tick);progress.progress=0;label.text="Hold to unlock · 5 seconds"}};true}
        root.addView(button,LinearLayout.LayoutParams(-1,-2).apply {topMargin=dp(30)})
        root.addView(text("You remain in control. Android system controls and the emergency dismiss notification remain available.",12f))
        val params=WindowManager.LayoutParams(-1,-1,(if(Build.VERSION.SDK_INT>=26) WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY else WindowManager.LayoutParams.TYPE_PHONE),WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN or WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON,android.graphics.PixelFormat.TRANSLUCENT)
        try {(getSystemService(WINDOW_SERVICE) as WindowManager).addView(root,params);overlay=root} catch(_:Exception){stopSelf();return START_NOT_STICKY}
        player?.release();player=null
        if(PrayerFocus.prefs(this).getBoolean("sound",true)) try {
            audioManager=getSystemService(AUDIO_SERVICE) as AudioManager
            if(Build.VERSION.SDK_INT>=26) {audioRequest=AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN_TRANSIENT).setAudioAttributes(AudioAttributes.Builder().setUsage(AudioAttributes.USAGE_ALARM).build()).setOnAudioFocusChangeListener{}.build();audioManager?.requestAudioFocus(audioRequest!!)}
            else {@Suppress("DEPRECATION") audioManager?.requestAudioFocus(null,AudioManager.STREAM_ALARM,AudioManager.AUDIOFOCUS_GAIN_TRANSIENT)}
            val voice=PrayerFocus.prefs(this).getString("voice","adhan")?:"adhan"
            val res=resources.getIdentifier(voice,"raw",packageName).let{if(it==0)R.raw.adhan else it}
            val fd=resources.openRawResourceFd(res)
            player=MediaPlayer().apply{setAudioAttributes(AudioAttributes.Builder().setUsage(AudioAttributes.USAGE_ALARM).setContentType(AudioAttributes.CONTENT_TYPE_MUSIC).build());setDataSource(fd.fileDescriptor,fd.startOffset,fd.length);prepare();start()};fd.close()
        } catch(_:Exception){/* Focus still functions if audio is unavailable. */}
        return START_NOT_STICKY
    }
    private fun removeOverlay(){overlay?.let{try{(getSystemService(WINDOW_SERVICE) as WindowManager).removeView(it)}catch(_:Exception){}};overlay=null}
    override fun onDestroy(){handler.removeCallbacksAndMessages(null);removeOverlay();player?.release();player=null;if(Build.VERSION.SDK_INT>=26)audioRequest?.let{audioManager?.abandonAudioFocusRequest(it)} else {@Suppress("DEPRECATION") audioManager?.abandonAudioFocus(null)};super.onDestroy()}
}
