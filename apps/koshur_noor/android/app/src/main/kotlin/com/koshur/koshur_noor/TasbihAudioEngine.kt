package com.koshur.koshur_noor

import android.content.Context
import android.media.AudioAttributes
import android.media.SoundPool
import android.os.Handler
import android.os.Looper
import android.os.SystemClock
import android.speech.tts.TextToSpeech
import android.speech.tts.Voice
import java.io.File
import java.io.FileOutputStream
import java.util.Locale
import kotlin.math.PI
import kotlin.math.exp
import kotlin.math.sin
import kotlin.random.Random

/**
 * Fully local Tasbih feedback.
 *
 * The click is an original procedurally synthesised wood/plucked-string
 * transient. Arabic speech only uses an already installed offline TTS voice;
 * no prerecorded third-party recitation, downloaded model, or network TTS.
 */
class TasbihAudioEngine(private val context: Context) {
    private val handler = Handler(Looper.getMainLooper())
    private val pool = SoundPool.Builder()
        .setMaxStreams(3)
        .setAudioAttributes(
            AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_ASSISTANCE_SONIFICATION)
                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                .build()
        )
        .build()
    private var clickId = 0
    private var clickLoaded = false
    private var tts: TextToSpeech? = null
    private var arabicVoice: Voice? = null
    private var speechStatus = "Arabic offline voice is loading"
    private var lastSpokenAt = 0L

    init {
        pool.setOnLoadCompleteListener { _, id, status ->
            if (id == clickId && status == 0) clickLoaded = true
        }
        try {
            val audio = File(context.cacheDir, "noor_wood_click_v1.wav")
            if (!audio.exists() || audio.length() < 2000) createWoodClick(audio)
            clickId = pool.load(audio.absolutePath, 1)
        } catch (_: Exception) {
            // Haptic feedback remains available without audio playback.
        }
        try {
            tts = TextToSpeech(context) { status ->
                handler.post { configureArabicVoice(status) }
            }
        } catch (_: Exception) {
            speechStatus = "Android text-to-speech is unavailable"
        }
    }

    private fun configureArabicVoice(status: Int) {
        if (status != TextToSpeech.SUCCESS) {
            speechStatus = "Android text-to-speech could not start"
            return
        }
        val engine = tts ?: return
        val voice = try {
            engine.voices
                ?.filter {
                    it.locale.language == "ar" &&
                    !it.isNetworkConnectionRequired &&
                    !it.features.orEmpty().contains(TextToSpeech.Engine.KEY_FEATURE_NOT_INSTALLED)
                }
                ?.minByOrNull { it.latency }
        } catch (_: Exception) { null }
        if (voice == null) {
            speechStatus = "No offline Arabic voice installed. Install one in Android text-to-speech settings."
            return
        }
        try {
            val code = engine.setVoice(voice)
            if (code == TextToSpeech.ERROR) {
                speechStatus = "The installed Arabic voice cannot be started"
                return
            }
            engine.setSpeechRate(.88f)
            engine.setPitch(.97f)
            arabicVoice = voice
            speechStatus = "Offline Arabic voice ready"
        } catch (_: Exception) {
            speechStatus = "The installed Arabic voice cannot be started"
        }
    }

    fun click() {
        if (clickLoaded && clickId != 0) {
            pool.play(clickId, .40f, .40f, 1, 0, 1f)
        }
    }

    fun voiceStatus(): String = speechStatus

    fun speak(phrase: String, preview: Boolean): String {
        if (phrase !in allowedDhikr) return "Unsupported dhikr phrase"
        val voice = arabicVoice ?: return speechStatus
        val engine = tts ?: return "Android text-to-speech is unavailable"
        val now = SystemClock.elapsedRealtime()
        if (!preview && (engine.isSpeaking || now - lastSpokenAt < 1400L)) {
            return "Already speaking"
        }
        lastSpokenAt = now
        return try {
            engine.setVoice(voice)
            val result = engine.speak(
                phrase, TextToSpeech.QUEUE_FLUSH, null, "noor_dhikr_${now}"
            )
            if (result == TextToSpeech.SUCCESS) "Speaking" else "Voice playback unavailable"
        } catch (_: Exception) { "Voice playback unavailable" }
    }

    fun stop() {
        tts?.stop()
    }

    fun dispose() {
        handler.removeCallbacksAndMessages(null)
        tts?.stop()
        tts?.shutdown()
        tts = null
        pool.release()
    }

    private fun createWoodClick(file: File) {
        val sampleRate = 22050
        val sampleCount = (sampleRate * .105).toInt()
        val random = Random(1771)
        FileOutputStream(file).use { output ->
            fun intLE(value: Int) {
                for (i in 0..3) output.write((value ushr (8 * i)) and 255)
            }
            fun shortLE(value: Int) {
                output.write(value and 255)
                output.write((value ushr 8) and 255)
            }
            output.write("RIFF".toByteArray(Charsets.US_ASCII))
            intLE(36 + sampleCount * 2)
            output.write("WAVEfmt ".toByteArray(Charsets.US_ASCII))
            intLE(16)
            shortLE(1)
            shortLE(1)
            intLE(sampleRate)
            intLE(sampleRate * 2)
            shortLE(2)
            shortLE(16)
            output.write("data".toByteArray(Charsets.US_ASCII))
            intLE(sampleCount * 2)
            for (i in 0 until sampleCount) {
                val t = i.toDouble() / sampleRate
                val knock = sin(2 * PI * 690 * t) * exp(-t * 72)
                val body = sin(2 * PI * 340 * t) * exp(-t * 48)
                val grain = (random.nextDouble() * 2 - 1) * exp(-t * 230)
                val echoT = t - .018
                val adjacent = if (echoT >= 0)
                    sin(2 * PI * 820 * echoT) * exp(-echoT * 110) else 0.0
                val signal = (knock * .35 + body * .22 + grain * .09 + adjacent * .12)
                    .coerceIn(-.95, .95)
                shortLE((signal * 32767).toInt())
            }
        }
    }

    companion object {
        private val allowedDhikr = setOf(
            "سُبْحَانَ اللَّهِ",
            "الْحَمْدُ لِلَّهِ",
            "اللَّهُ أَكْبَرُ",
            "لَا إِلٰهَ إِلَّا اللَّهُ"
        )
    }
}
