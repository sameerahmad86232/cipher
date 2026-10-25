package com.koshur.koshur_noor

/** Monotonic-clock gate: releasing cancels the hold; only 5000 continuous ms count. */
class HoldGate {
    private var started: Long? = null
    fun start(now: Long) { started = now }
    fun cancel() { started = null }
    fun progress(now: Long): Int = started?.let { (now-it).coerceIn(0L,5000L).toInt() } ?: 0
}
