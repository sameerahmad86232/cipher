// Studio Audio Mastering Engine
// Enhances raw TTS voice audio to professional broadcast/studio standards using Web Audio API

export type StudioPresetName = 'broadcast' | 'warm-radio' | 'crisp-learning' | 'natural-booth' | 'bypass';

export interface StudioPreset {
  name: StudioPresetName;
  label: string;
  description: string;
  highpassFreq: number;
  warmthGain: number;
  boxinessCut: number;
  presenceGain: number;
  airGain: number;
  deEsserGain: number;
  saturationAmount: number;
  compressorThreshold: number;
  compressorRatio: number;
  reverbMix: number;
  masterGain: number;
}

export const STUDIO_PRESETS: Record<StudioPresetName, StudioPreset> = {
  broadcast: {
    name: 'broadcast',
    label: 'Studio Master (Broadcast)',
    description: 'Crisp presence, warm chest resonance, subtle studio booth acoustics, and leveled dynamics.',
    highpassFreq: 85,
    warmthGain: 2.5,
    boxinessCut: -2.8,
    presenceGain: 3.8,
    airGain: 3.0,
    deEsserGain: -2.0,
    saturationAmount: 0.12,
    compressorThreshold: -20,
    compressorRatio: 4,
    reverbMix: 0.06,
    masterGain: 1.3
  },
  'warm-radio': {
    name: 'warm-radio',
    label: 'Warm Radio Host',
    description: 'Deep low-end authority, velvety smooth treble, and punchy vocal compression.',
    highpassFreq: 75,
    warmthGain: 4.5,
    boxinessCut: -1.5,
    presenceGain: 2.0,
    airGain: 1.5,
    deEsserGain: -3.0,
    saturationAmount: 0.22,
    compressorThreshold: -24,
    compressorRatio: 5,
    reverbMix: 0.08,
    masterGain: 1.35
  },
  'crisp-learning': {
    name: 'crisp-learning',
    label: 'Crisp Articulation (Learner Mode)',
    description: 'Maximum consonant clarity and vocal intelligibility; ideal for studying Kashmiri pronunciation.',
    highpassFreq: 110,
    warmthGain: 0.5,
    boxinessCut: -4.0,
    presenceGain: 5.0,
    airGain: 4.0,
    deEsserGain: -1.0,
    saturationAmount: 0.05,
    compressorThreshold: -18,
    compressorRatio: 3.5,
    reverbMix: 0.03,
    masterGain: 1.25
  },
  'natural-booth': {
    name: 'natural-booth',
    label: 'Natural Acoustic Booth',
    description: 'Transparent leveling with clean low-end rolloff and acoustic room presence.',
    highpassFreq: 80,
    warmthGain: 1.0,
    boxinessCut: -1.0,
    presenceGain: 1.5,
    airGain: 1.5,
    deEsserGain: -1.0,
    saturationAmount: 0.04,
    compressorThreshold: -15,
    compressorRatio: 2.5,
    reverbMix: 0.05,
    masterGain: 1.15
  },
  bypass: {
    name: 'bypass',
    label: 'Raw Model Output (Bypass)',
    description: 'Original unmastered audio directly from the TTS neural network.',
    highpassFreq: 20,
    warmthGain: 0,
    boxinessCut: 0,
    presenceGain: 0,
    airGain: 0,
    deEsserGain: 0,
    saturationAmount: 0,
    compressorThreshold: -50,
    compressorRatio: 1,
    reverbMix: 0,
    masterGain: 1.0
  }
};

class StudioAudioEngine {
  private ctx: AudioContext | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private analyser: AnalyserNode | null = null;
  private currentElement: HTMLAudioElement | null = null;

  // DSP Nodes
  private highpassNode: BiquadFilterNode | null = null;
  private warmthNode: BiquadFilterNode | null = null;
  private boxinessNode: BiquadFilterNode | null = null;
  private presenceNode: BiquadFilterNode | null = null;
  private deEsserNode: BiquadFilterNode | null = null;
  private airNode: BiquadFilterNode | null = null;
  private saturatorNode: WaveShaperNode | null = null;
  private compressorNode: DynamicsCompressorNode | null = null;
  private dryGainNode: GainNode | null = null;
  private wetGainNode: GainNode | null = null;
  private convolverNode: ConvolverNode | null = null;
  private masterGainNode: GainNode | null = null;

  private currentPreset: StudioPreset = STUDIO_PRESETS.broadcast;
  private isEngineActive = true;

  public init(audioElement: HTMLAudioElement) {
    if (this.currentElement === audioElement && this.ctx) {
      return;
    }

    this.currentElement = audioElement;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!this.ctx) {
      this.ctx = new AudioContextClass();
    }

    if (this.ctx.state === 'suspended') {
      const resume = () => {
        this.ctx?.resume();
        window.removeEventListener('click', resume);
        window.removeEventListener('keydown', resume);
      };
      window.addEventListener('click', resume);
      window.addEventListener('keydown', resume);
    }

    try {
      this.buildRack(audioElement);
    } catch (e) {
      console.warn('Web Audio Studio Rack initialization note:', e);
    }
  }

  private buildRack(audioElement: HTMLAudioElement) {
    if (!this.ctx) return;

    if (!this.sourceNode) {
      this.sourceNode = this.ctx.createMediaElementSource(audioElement);
    }

    // 1. Highpass filter (cuts low rumble and mic thumps)
    this.highpassNode = this.ctx.createBiquadFilter();
    this.highpassNode.type = 'highpass';
    this.highpassNode.frequency.value = this.currentPreset.highpassFreq;
    this.highpassNode.Q.value = 0.707;

    // 2. Warmth peaking filter (~220Hz)
    this.warmthNode = this.ctx.createBiquadFilter();
    this.warmthNode.type = 'peaking';
    this.warmthNode.frequency.value = 220;
    this.warmthNode.Q.value = 1.0;
    this.warmthNode.gain.value = this.currentPreset.warmthGain;

    // 3. Mud / boxiness notch filter (~500Hz)
    this.boxinessNode = this.ctx.createBiquadFilter();
    this.boxinessNode.type = 'peaking';
    this.boxinessNode.frequency.value = 500;
    this.boxinessNode.Q.value = 1.4;
    this.boxinessNode.gain.value = this.currentPreset.boxinessCut;

    // 4. Vocal presence & clarity filter (~3.4kHz)
    this.presenceNode = this.ctx.createBiquadFilter();
    this.presenceNode.type = 'peaking';
    this.presenceNode.frequency.value = 3400;
    this.presenceNode.Q.value = 1.2;
    this.presenceNode.gain.value = this.currentPreset.presenceGain;

    // 5. De-esser sibilance attenuator (~7.2kHz)
    this.deEsserNode = this.ctx.createBiquadFilter();
    this.deEsserNode.type = 'peaking';
    this.deEsserNode.frequency.value = 7200;
    this.deEsserNode.Q.value = 2.0;
    this.deEsserNode.gain.value = this.currentPreset.deEsserGain;

    // 6. Air high-shelf filter (~10.5kHz)
    this.airNode = this.ctx.createBiquadFilter();
    this.airNode.type = 'highshelf';
    this.airNode.frequency.value = 10500;
    this.airNode.gain.value = this.currentPreset.airGain;

    // 7. Warm harmonic saturator (analog tube curve)
    this.saturatorNode = this.ctx.createWaveShaper();
    this.saturatorNode.curve = this.generateSaturationCurve(this.currentPreset.saturationAmount) as any;
    this.saturatorNode.oversample = '4x';

    // 8. Studio Vocal Compressor
    this.compressorNode = this.ctx.createDynamicsCompressor();
    this.compressorNode.threshold.value = this.currentPreset.compressorThreshold;
    this.compressorNode.knee.value = 8;
    this.compressorNode.ratio.value = this.currentPreset.compressorRatio;
    this.compressorNode.attack.value = 0.003;
    this.compressorNode.release.value = 0.15;

    // 9. Studio Room Ambience (Early Reflections)
    this.convolverNode = this.ctx.createConvolver();
    this.convolverNode.buffer = this.generateStudioImpulseResponse(this.ctx);

    this.dryGainNode = this.ctx.createGain();
    this.dryGainNode.gain.value = 1.0 - this.currentPreset.reverbMix;

    this.wetGainNode = this.ctx.createGain();
    this.wetGainNode.gain.value = this.currentPreset.reverbMix;

    // 10. Master Output Limiter & Gain
    this.masterGainNode = this.ctx.createGain();
    this.masterGainNode.gain.value = this.currentPreset.masterGain;

    // 11. Visualizer Analyser
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 256;
    this.analyser.smoothingTimeConstant = 0.8;

    // Connect audio signal chain:
    // Source -> Highpass -> Warmth -> Boxiness -> Presence -> DeEsser -> Air -> Saturator -> Compressor
    this.sourceNode.connect(this.highpassNode);
    this.highpassNode.connect(this.warmthNode);
    this.warmthNode.connect(this.boxinessNode);
    this.boxinessNode.connect(this.presenceNode);
    this.presenceNode.connect(this.deEsserNode);
    this.deEsserNode.connect(this.airNode);
    this.airNode.connect(this.saturatorNode);
    this.saturatorNode.connect(this.compressorNode);

    // Split for studio room reverb (dry/wet)
    this.compressorNode.connect(this.dryGainNode);
    this.compressorNode.connect(this.convolverNode);
    this.convolverNode.connect(this.wetGainNode);

    this.dryGainNode.connect(this.masterGainNode);
    this.wetGainNode.connect(this.masterGainNode);

    this.masterGainNode.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
  }

  private generateSaturationCurve(amount: number): Float32Array {
    const k = amount * 10;
    const n = 4096;
    const curve = new Float32Array(n);
    const deg = Math.PI / 180;
    for (let i = 0; i < n; ++i) {
      const x = (i * 2) / n - 1;
      if (k === 0) {
        curve[i] = x;
      } else {
        curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
      }
    }
    return curve;
  }

  private generateStudioImpulseResponse(ctx: AudioContext): AudioBuffer {
    const rate = ctx.sampleRate;
    const duration = 0.12; // 120ms subtle booth early reflections
    const length = rate * duration;
    const decay = 2.4;
    const buffer = ctx.createBuffer(2, length, rate);
    const left = buffer.getChannelData(0);
    const right = buffer.getChannelData(1);

    for (let i = 0; i < length; i++) {
      const n = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
      left[i] = n;
      right[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
    return buffer;
  }

  public setPreset(presetName: StudioPresetName) {
    const preset = STUDIO_PRESETS[presetName] || STUDIO_PRESETS.broadcast;
    this.currentPreset = preset;

    if (!this.ctx) return;

    if (this.highpassNode) this.highpassNode.frequency.value = preset.highpassFreq;
    if (this.warmthNode) this.warmthNode.gain.value = preset.warmthGain;
    if (this.boxinessNode) this.boxinessNode.gain.value = preset.boxinessCut;
    if (this.presenceNode) this.presenceNode.gain.value = preset.presenceGain;
    if (this.deEsserNode) this.deEsserNode.gain.value = preset.deEsserGain;
    if (this.airNode) this.airNode.gain.value = preset.airGain;
    if (this.saturatorNode) this.saturatorNode.curve = this.generateSaturationCurve(preset.saturationAmount) as any;
    if (this.compressorNode) {
      this.compressorNode.threshold.value = preset.compressorThreshold;
      this.compressorNode.ratio.value = preset.compressorRatio;
    }
    if (this.dryGainNode) this.dryGainNode.gain.value = 1.0 - preset.reverbMix;
    if (this.wetGainNode) this.wetGainNode.gain.value = preset.reverbMix;
    if (this.masterGainNode) this.masterGainNode.gain.value = preset.masterGain;
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public resumeContext() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Offline rendering: Process an existing audio URL through the studio mastering rack
   * and return a downloadable studio-mastered WAV Blob.
   */
  public async renderMasteredWav(audioUrl: string, presetName: StudioPresetName = 'broadcast'): Promise<Blob> {
    const preset = STUDIO_PRESETS[presetName] || STUDIO_PRESETS.broadcast;
    const response = await fetch(audioUrl);
    const arrayBuffer = await response.arrayBuffer();

    const offlineCtx = new (window.OfflineAudioContext || (window as any).webkitOfflineAudioContext)(
      2,
      44100 * 30, // up to 30s
      44100
    );

    const decoded = await offlineCtx.decodeAudioData(arrayBuffer);
    const renderCtx = new (window.OfflineAudioContext || (window as any).webkitOfflineAudioContext)(
      decoded.numberOfChannels,
      decoded.length,
      decoded.sampleRate
    );

    const src = renderCtx.createBufferSource();
    src.buffer = decoded;

    const hp = renderCtx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = preset.highpassFreq;

    const warmth = renderCtx.createBiquadFilter();
    warmth.type = 'peaking';
    warmth.frequency.value = 220;
    warmth.gain.value = preset.warmthGain;

    const presence = renderCtx.createBiquadFilter();
    presence.type = 'peaking';
    presence.frequency.value = 3400;
    presence.gain.value = preset.presenceGain;

    const air = renderCtx.createBiquadFilter();
    air.type = 'highshelf';
    air.frequency.value = 10500;
    air.gain.value = preset.airGain;

    const comp = renderCtx.createDynamicsCompressor();
    comp.threshold.value = preset.compressorThreshold;
    comp.ratio.value = preset.compressorRatio;
    comp.attack.value = 0.003;
    comp.release.value = 0.15;

    const gain = renderCtx.createGain();
    gain.gain.value = preset.masterGain;

    src.connect(hp);
    hp.connect(warmth);
    warmth.connect(presence);
    presence.connect(air);
    air.connect(comp);
    comp.connect(gain);
    gain.connect(renderCtx.destination);

    src.start(0);
    const rendered = await renderCtx.startRendering();
    return this.audioBufferToWav(rendered);
  }

  private audioBufferToWav(buffer: AudioBuffer): Blob {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;

    const samples = buffer.length;
    const dataSize = samples * blockAlign;
    const bufferSize = 44 + dataSize;
    const arrayBuffer = new ArrayBuffer(bufferSize);
    const view = new DataView(arrayBuffer);

    // RIFF identifier
    this.writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    this.writeString(view, 8, 'WAVE');
    this.writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    this.writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);

    // Interleave channels
    const channels = [];
    for (let c = 0; c < numChannels; c++) {
      channels.push(buffer.getChannelData(c));
    }

    let offset = 44;
    for (let i = 0; i < samples; i++) {
      for (let c = 0; c < numChannels; c++) {
        let sample = channels[c][i];
        sample = Math.max(-1, Math.min(1, sample));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
        offset += 2;
      }
    }

    return new Blob([view], { type: 'audio/wav' });
  }

  private writeString(view: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }
}

export const studioEngine = new StudioAudioEngine();
