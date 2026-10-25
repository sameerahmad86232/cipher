package com.koshur.koshur_noor
import org.junit.Assert.assertEquals
import org.junit.Test
class HoldGateTest {
 @Test fun holdRequiresFiveContinuousSeconds() { val gate=HoldGate();gate.start(100L);assertEquals(4999,gate.progress(5099));assertEquals(5000,gate.progress(5100));assertEquals(5000,gate.progress(9000)) }
 @Test fun releaseAndRestartDoesNotAccumulate() { val gate=HoldGate();gate.start(0);gate.cancel();assertEquals(0,gate.progress(6000));gate.start(7000);assertEquals(1000,gate.progress(8000)) }
}
