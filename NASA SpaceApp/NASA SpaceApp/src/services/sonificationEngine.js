// NASA Earth Jukebox + Chromophonia Polyphonic Sonification Engine
// Combines Kazakh Traditional Instruments (Dombra, Kobyz, Zhetigen, Sybyzgy, Shankobyz),
// Atmospheric Synthesizers, 8-Step Melodic Contours, Spatial Stereo Panning, and Tactile Feedback.

import {
  SCALES,
  TIMBRES,
  mapColorToMusicalNote,
  deriveScientificRgb,
  generateRegionMelody,
  buildNoteFromMelodyStep,
  clamp
} from './chromophoniaMusic';

class SonificationEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = true;
    this.volume = 0.65;
    this.reverbAmount = 0.42;
    this.musicIntensity = 1.0; // 0.3 to 2.0 (controls tempo, note density, harmonic richness, volume boost)
    this.playbackMode = 'melody'; // 'melody' (8-step Chromophonia kui) | 'glide' (continuous drone + notes) | 'single'

    // Chromophonia musical configuration
    this.timbre = 'kobyz'; // 'dombra' | 'kobyz' | 'zhetigen' | 'sybyzgy' | 'shankobyz' | 'crystal' | 'pad' | 'organ' | 'sine'
    this.scaleMode = 'dala'; // 'kuy' | 'dala' | 'pentatonic' | 'major' | 'minor' | 'dorian' | 'lydian' | 'wholeTone'
    this.preferredContourId = 'steppe_chant';
    this.liveEffectiveIntensity = 1.0;
    this.rootIndex = 9; // A = 9, C = 0, D = 2
    this.depthMode = 'deep-low';

    // Live state
    this.currentNote = null;
    this.currentMelody = null;
    this.currentStepIndex = 0;
    this.lastStepTime = 0;
    this.melodyTimer = null;
    this.onStepCallback = null;

    // Geographic boundary state
    this.lastLandState = null;
    this.lastLatSign = null;

    // Audio graph nodes
    this.masterGain = null;
    this.compressor = null;
    this.panner = null;
    this.dryGain = null;
    this.wetGain = null;
    this.delayNode = null;
    this.feedbackGain = null;
    this.filter = null;
    this.osc1 = null;
    this.osc2 = null;
    this.subOsc = null;
    this.synthGain = null;
    this.subGain = null;
    this.noiseFilter = null;
    this.noiseGain = null;
    this.noiseBuffer = null;
    this.lfo = null;
    this.lfoGain = null;
    this.analyser = null;
  }

  init() {
    if (this.audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.audioCtx = new AudioContext();

    const t = this.audioCtx.currentTime;

    // Dynamics Compressor (from Chromophonia)
    this.compressor = this.audioCtx.createDynamicsCompressor();
    this.compressor.threshold.setValueAtTime(-16, t);
    this.compressor.knee.setValueAtTime(18, t);
    this.compressor.ratio.setValueAtTime(4, t);
    this.compressor.attack.setValueAtTime(0.005, t);
    this.compressor.release.setValueAtTime(0.18, t);

    // Master Gain
    this.masterGain = this.audioCtx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, t);

    // Stereo Panner (Maps Longitude -180..+180 to -1..+1)
    if (this.audioCtx.createStereoPanner) {
      this.panner = this.audioCtx.createStereoPanner();
    } else {
      this.panner = this.audioCtx.createGain();
    }

    // Dry / Wet Reverb-Delay Network (from Chromophonia)
    this.dryGain = this.audioCtx.createGain();
    this.dryGain.gain.setValueAtTime(1 - this.reverbAmount * 0.35, t);

    this.wetGain = this.audioCtx.createGain();
    this.wetGain.gain.setValueAtTime(this.reverbAmount * 0.48, t);

    this.delayNode = this.audioCtx.createDelay(1.0);
    this.delayNode.delayTime.setValueAtTime(0.24, t);

    const delayFilter = this.audioCtx.createBiquadFilter();
    delayFilter.type = 'lowpass';
    delayFilter.frequency.setValueAtTime(2600, t);

    this.feedbackGain = this.audioCtx.createGain();
    this.feedbackGain.gain.setValueAtTime(0.38, t);

    // Master Lowpass Filter for continuous ambient carrier
    this.filter = this.audioCtx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(1500, t);
    this.filter.Q.setValueAtTime(2.0, t);

    // Analyser Node for live waveform & frequency spectrum
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 256;
    this.analyser.smoothingTimeConstant = 0.75;

    // Routing
    this.filter.connect(this.dryGain);
    this.filter.connect(this.wetGain);

    this.dryGain.connect(this.panner);

    this.wetGain.connect(this.delayNode);
    this.delayNode.connect(delayFilter);
    delayFilter.connect(this.feedbackGain);
    this.feedbackGain.connect(this.delayNode);
    delayFilter.connect(this.panner);

    this.panner.connect(this.compressor);
    this.compressor.connect(this.masterGain);
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);

    this.ensureNoiseBuffer();
    this.setupContinuousSynthesizer();
    this.startMelodySequencerLoop();
  }

  ensureNoiseBuffer() {
    if (!this.audioCtx) return null;
    if (this.noiseBuffer) return this.noiseBuffer;
    const length = Math.floor(this.audioCtx.sampleRate * 1.5);
    const buffer = this.audioCtx.createBuffer(1, length, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    this.noiseBuffer = buffer;
    return buffer;
  }

  setupContinuousSynthesizer() {
    const t = this.audioCtx.currentTime;

    // Osc 1 (Primary spatial carrier)
    this.osc1 = this.audioCtx.createOscillator();
    this.osc1.type = 'triangle';
    this.osc1.frequency.setValueAtTime(220, t);

    // Osc 2 (Sympathetic drone / harmonic companion)
    this.osc2 = this.audioCtx.createOscillator();
    this.osc2.type = 'sine';
    this.osc2.frequency.setValueAtTime(220.5, t);

    // Sub Bass Oscillator
    this.subOsc = this.audioCtx.createOscillator();
    this.subOsc.type = 'sine';
    this.subOsc.frequency.setValueAtTime(110, t);

    this.synthGain = this.audioCtx.createGain();
    this.synthGain.gain.setValueAtTime(0, t);

    this.subGain = this.audioCtx.createGain();
    this.subGain.gain.setValueAtTime(0.12, t);

    // LFO for pulse rate (CO2 heartbeat / fire alarm)
    this.lfo = this.audioCtx.createOscillator();
    this.lfo.type = 'sine';
    this.lfo.frequency.setValueAtTime(1, t);
    this.lfoGain = this.audioCtx.createGain();
    this.lfoGain.gain.setValueAtTime(0, t);

    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.synthGain.gain);

    // Granular noise generator (rain / fire crackle / wind)
    this.createNoiseGenerator();

    this.osc1.connect(this.synthGain);
    this.osc2.connect(this.synthGain);
    this.subOsc.connect(this.subGain);
    this.subGain.connect(this.synthGain);

    this.synthGain.connect(this.filter);

    this.osc1.start();
    this.osc2.start();
    this.subOsc.start();
    this.lfo.start();
  }

  createNoiseGenerator() {
    const whiteNoise = this.audioCtx.createBufferSource();
    whiteNoise.buffer = this.ensureNoiseBuffer();
    whiteNoise.loop = true;

    this.noiseFilter = this.audioCtx.createBiquadFilter();
    this.noiseFilter.type = 'bandpass';
    this.noiseFilter.frequency.setValueAtTime(2200, this.audioCtx.currentTime);
    this.noiseFilter.Q.setValueAtTime(2.5, this.audioCtx.currentTime);

    this.noiseGain = this.audioCtx.createGain();
    this.noiseGain.gain.setValueAtTime(0, this.audioCtx.currentTime);

    whiteNoise.connect(this.noiseFilter);
    this.noiseFilter.connect(this.noiseGain);
    this.noiseGain.connect(this.filter);

    whiteNoise.start();
  }

  resume() {
    if (!this.audioCtx) {
      this.init();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Background loop that steps through the 8-step Chromophonia melody
  startMelodySequencerLoop() {
    if (this.melodyTimer) clearInterval(this.melodyTimer);
    this.melodyTimer = setInterval(() => {
      if (this.isMuted || !this.audioCtx || this.audioCtx.state !== 'running') return;
      if (this.playbackMode !== 'melody' || !this.currentMelody || !this.currentNote) return;

      const now = performance.now();
      const interval = Math.max(95, this.currentMelody.stepIntervalMs || 240);
      if (now - this.lastStepTime < interval) return;
      this.lastStepTime = now;

      const steps = this.currentMelody.steps;
      if (!steps || steps.length === 0) return;

      this.currentStepIndex = (this.currentStepIndex + 1) % steps.length;
      const step = steps[this.currentStepIndex];

      if (this.onStepCallback) {
        this.onStepCallback(this.currentStepIndex, step, this.currentMelody);
      }

      if (!step.isRest) {
        const stepNote = buildNoteFromMelodyStep(this.currentNote, step);
        const vel = clamp(step.velocity * (this.liveEffectiveIntensity || this.musicIntensity), 0.2, 1.0);
        this.playChromophoniaNote(stepNote, this.timbre, vel);
      }
    }, 35);
  }

  // Authentic Chromophonia Polyphonic Instrument Note Synthesizer
  // Supports: dombra, kobyz, zhetigen, sybyzgy, shankobyz, crystal, pad, organ, sine
  playChromophoniaNote(note, timbre = this.timbre, velocity = 0.72) {
    if (this.isMuted || !this.audioCtx || !this.dryGain || !this.wetGain) return;
    const ctx = this.audioCtx;
    const now = ctx.currentTime;
    const clampedVel = clamp(velocity, 0.18, 1.0);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(note.filterCutoffHz || 2200, now);
    filter.Q.value = 1.4 + (note.harmonicRichness || 0.5) * 2.0;

    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, now);

    filter.connect(env);
    env.connect(this.dryGain);
    env.connect(this.wetGain);

    const oscList = [];
    const noiseNodes = [];
    let duration = 0.7;

    if (timbre === 'dombra') {
      // Kazakh Dombra: crisp spruce pluck + 2-string sympathetic fourth drone + warm body resonance
      duration = 0.78;
      const cutoff = note.filterCutoffHz || 2400;
      filter.frequency.setValueAtTime(Math.min(5400, cutoff * 1.45), now);
      filter.frequency.exponentialRampToValueAtTime(Math.max(420, cutoff * 0.25), now + 0.42);
      filter.Q.value = 2.2;

      const bodyEq = ctx.createBiquadFilter();
      bodyEq.type = 'peaking';
      bodyEq.frequency.setValueAtTime(240, now);
      bodyEq.Q.value = 1.4;
      bodyEq.gain.value = 4.5;

      const strMain = ctx.createOscillator();
      strMain.type = 'triangle';
      strMain.frequency.setValueAtTime(note.frequency, now);

      const strHarm = ctx.createOscillator();
      strHarm.type = 'sine';
      strHarm.frequency.setValueAtTime(note.frequency * 2, now);
      const harmGain = ctx.createGain();
      harmGain.gain.setValueAtTime(0.32 + (note.harmonicRichness || 0.5) * 0.2, now);
      harmGain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

      // Sympathetic companion string tuned a fourth below (classic dombra kui drone)
      const strDrone = ctx.createOscillator();
      strDrone.type = 'triangle';
      strDrone.frequency.setValueAtTime(note.frequency * 0.75, now);
      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.16, now);
      droneGain.gain.exponentialRampToValueAtTime(0.01, now + 0.55);

      const pluckNoise = ctx.createBufferSource();
      pluckNoise.buffer = this.ensureNoiseBuffer();
      const pluckFilter = ctx.createBiquadFilter();
      pluckFilter.type = 'bandpass';
      pluckFilter.frequency.setValueAtTime(1650, now);
      pluckFilter.Q.value = 1.8;
      const pluckGain = ctx.createGain();
      pluckGain.gain.setValueAtTime(0.28 * clampedVel, now);
      pluckGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      pluckNoise.connect(pluckFilter);
      pluckFilter.connect(pluckGain);
      pluckGain.connect(bodyEq);

      strMain.connect(bodyEq);
      strHarm.connect(harmGain);
      harmGain.connect(bodyEq);
      strDrone.connect(droneGain);
      droneGain.connect(bodyEq);
      bodyEq.connect(filter);

      env.gain.linearRampToValueAtTime(0.38 * clampedVel, now + 0.006);
      env.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscList.push(strMain, strHarm, strDrone);
      noiseNodes.push(pluckNoise);
    } else if (timbre === 'kobyz') {
      // Kazakh Kyl-Kobyz: bowed horsehair strings + hollow skin/wood formants + expressive vibrato
      duration = 1.15;
      filter.frequency.setValueAtTime(Math.min(3400, (note.filterCutoffHz || 2200) * 0.85), now);
      filter.Q.value = 2.6;

      const formantA = ctx.createBiquadFilter();
      formantA.type = 'peaking';
      formantA.frequency.setValueAtTime(640, now);
      formantA.Q.value = 2.6;
      formantA.gain.value = 5.5;

      const bowA = ctx.createOscillator();
      bowA.type = 'sawtooth';
      bowA.frequency.setValueAtTime(note.frequency, now);

      const bowB = ctx.createOscillator();
      bowB.type = 'triangle';
      bowB.frequency.setValueAtTime(note.frequency * 1.0025, now);

      const vibrato = ctx.createOscillator();
      vibrato.type = 'sine';
      vibrato.frequency.setValueAtTime(5.2, now);
      const vibDepth = ctx.createGain();
      vibDepth.gain.setValueAtTime(0, now);
      vibDepth.gain.linearRampToValueAtTime(14, now + 0.25);
      vibrato.connect(vibDepth);
      vibDepth.connect(bowA.detune);
      vibDepth.connect(bowB.detune);

      const bowNoise = ctx.createBufferSource();
      bowNoise.buffer = this.ensureNoiseBuffer();
      bowNoise.loop = true;
      const bowNoiseFilter = ctx.createBiquadFilter();
      bowNoiseFilter.type = 'bandpass';
      bowNoiseFilter.frequency.setValueAtTime(1400, now);
      bowNoiseFilter.Q.value = 2.2;
      const bowNoiseGain = ctx.createGain();
      bowNoiseGain.gain.setValueAtTime(0.035 * clampedVel, now);
      bowNoise.connect(bowNoiseFilter);
      bowNoiseFilter.connect(bowNoiseGain);
      bowNoiseGain.connect(formantA);

      const mixGain = ctx.createGain();
      mixGain.gain.value = 0.55;
      bowA.connect(mixGain);
      bowB.connect(mixGain);
      mixGain.connect(formantA);
      formantA.connect(filter);

      env.gain.linearRampToValueAtTime(0.26 * clampedVel, now + 0.095);
      env.gain.setValueAtTime(0.22 * clampedVel, now + 0.55);
      env.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscList.push(bowA, bowB, vibrato);
      noiseNodes.push(bowNoise);
    } else if (timbre === 'zhetigen') {
      // Kazakh Zhetigen: 7-string plucked harp-zither with luminous sustain
      duration = 1.4;
      const cutoff = note.filterCutoffHz || 2600;
      filter.frequency.setValueAtTime(Math.min(5800, cutoff * 1.35), now);
      filter.frequency.exponentialRampToValueAtTime(Math.max(700, cutoff * 0.45), now + 0.85);

      const strA = ctx.createOscillator();
      strA.type = 'triangle';
      strA.frequency.setValueAtTime(note.frequency, now);

      const strB = ctx.createOscillator();
      strB.type = 'sine';
      strB.frequency.setValueAtTime(note.frequency, now);
      strB.detune.setValueAtTime(4, now);

      const overtone = ctx.createOscillator();
      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(note.frequency * 2, now);
      const overGain = ctx.createGain();
      overGain.gain.setValueAtTime(0.24, now);
      overGain.gain.exponentialRampToValueAtTime(0.005, now + 0.48);

      strA.connect(filter);
      strB.connect(filter);
      overtone.connect(overGain);
      overGain.connect(filter);

      env.gain.linearRampToValueAtTime(0.30 * clampedVel, now + 0.01);
      env.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscList.push(strA, strB, overtone);
    } else if (timbre === 'sybyzgy') {
      // Kazakh Sybyzgy: airy end-blown shepherd flute
      duration = 0.92;
      filter.frequency.setValueAtTime(Math.min(4200, (note.filterCutoffHz || 2200) * 1.1), now);

      const fluteMain = ctx.createOscillator();
      fluteMain.type = 'sine';
      fluteMain.frequency.setValueAtTime(note.frequency, now);

      const fluteHarm = ctx.createOscillator();
      fluteHarm.type = 'triangle';
      fluteHarm.frequency.setValueAtTime(note.frequency * 2, now);
      const harmGain = ctx.createGain();
      harmGain.gain.value = 0.14;

      const vib = ctx.createOscillator();
      vib.type = 'sine';
      vib.frequency.setValueAtTime(4.7, now);
      const vibGain = ctx.createGain();
      vibGain.gain.setValueAtTime(11, now);
      vib.connect(vibGain);
      vibGain.connect(fluteMain.detune);

      const breath = ctx.createBufferSource();
      breath.buffer = this.ensureNoiseBuffer();
      breath.loop = true;
      const breathFilter = ctx.createBiquadFilter();
      breathFilter.type = 'bandpass';
      breathFilter.frequency.setValueAtTime(Math.min(4800, note.frequency * 2.1), now);
      breathFilter.Q.value = 3.2;
      const breathGain = ctx.createGain();
      breathGain.gain.setValueAtTime(0.075 * clampedVel, now);
      breath.connect(breathFilter);
      breathFilter.connect(breathGain);
      breathGain.connect(filter);

      fluteMain.connect(filter);
      fluteHarm.connect(harmGain);
      harmGain.connect(filter);

      env.gain.linearRampToValueAtTime(0.30 * clampedVel, now + 0.068);
      env.gain.setValueAtTime(0.25 * clampedVel, now + 0.35);
      env.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscList.push(fluteMain, fluteHarm, vib);
      noiseNodes.push(breath);
    } else if (timbre === 'shankobyz') {
      // Kazakh Shankobyz (Jaw Harp): low reed buzz + high-Q vocal overtone formant
      duration = 0.72;
      const baseDroneHz = Math.max(65, note.frequency * 0.5);

      const reedA = ctx.createOscillator();
      reedA.type = 'sawtooth';
      reedA.frequency.setValueAtTime(baseDroneHz, now);

      const reedB = ctx.createOscillator();
      reedB.type = 'square';
      reedB.frequency.setValueAtTime(baseDroneHz, now);
      const sqGain = ctx.createGain();
      sqGain.gain.value = 0.25;

      const cavityFilter = ctx.createBiquadFilter();
      cavityFilter.type = 'bandpass';
      const targetFormant = Math.min(3400, Math.max(380, note.frequency * 2.0));
      cavityFilter.frequency.setValueAtTime(targetFormant * 0.72, now);
      cavityFilter.frequency.exponentialRampToValueAtTime(targetFormant, now + 0.14);
      cavityFilter.Q.value = 9.5;

      const dryReedGain = ctx.createGain();
      dryReedGain.value = 0.18;

      reedA.connect(cavityFilter);
      reedB.connect(sqGain);
      sqGain.connect(cavityFilter);
      reedA.connect(dryReedGain);
      dryReedGain.connect(filter);
      cavityFilter.connect(filter);

      filter.frequency.setValueAtTime(4800, now);

      env.gain.linearRampToValueAtTime(0.35 * clampedVel, now + 0.015);
      env.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscList.push(reedA, reedB);
    } else if (timbre === 'crystal') {
      duration = 0.95;
      const carrier = ctx.createOscillator();
      carrier.type = 'sine';
      carrier.frequency.setValueAtTime(note.frequency, now);

      const mod = ctx.createOscillator();
      mod.type = 'triangle';
      mod.frequency.setValueAtTime(note.frequency * 2.0, now);

      const modGain = ctx.createGain();
      modGain.gain.setValueAtTime(note.frequency * (0.4 + (note.harmonicRichness || 0.5) * 1.1), now);
      modGain.gain.exponentialRampToValueAtTime(1, now + 0.38);

      mod.connect(modGain);
      modGain.connect(carrier.frequency);
      carrier.connect(filter);

      env.gain.linearRampToValueAtTime(0.30 * clampedVel, now + 0.012);
      env.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscList.push(carrier, mod);
    } else if (timbre === 'pad') {
      duration = 1.25;
      const oscA = ctx.createOscillator();
      oscA.type = 'sawtooth';
      oscA.frequency.setValueAtTime(note.frequency, now);
      oscA.detune.setValueAtTime(-7, now);

      const oscB = ctx.createOscillator();
      oscB.type = 'triangle';
      oscB.frequency.setValueAtTime(note.frequency, now);
      oscB.detune.setValueAtTime(7, now);

      const subGain = ctx.createGain();
      subGain.gain.value = 0.5;

      oscA.connect(subGain);
      oscB.connect(subGain);
      subGain.connect(filter);

      env.gain.linearRampToValueAtTime(0.26 * clampedVel, now + 0.08);
      env.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscList.push(oscA, oscB);
    } else if (timbre === 'organ') {
      duration = 0.72;
      const partials = [
        { mult: 1, gain: 0.55, type: 'sine' },
        { mult: 2, gain: 0.25 + (note.harmonicRichness || 0.5) * 0.15, type: 'sine' },
        { mult: 3, gain: 0.12 + (note.harmonicRichness || 0.5) * 0.12, type: 'triangle' },
      ];
      for (const p of partials) {
        const osc = ctx.createOscillator();
        osc.type = p.type;
        osc.frequency.setValueAtTime(note.frequency * p.mult, now);
        const pg = ctx.createGain();
        pg.gain.value = p.gain;
        osc.connect(pg);
        pg.connect(filter);
        oscList.push(osc);
      }
      env.gain.linearRampToValueAtTime(0.26 * clampedVel, now + 0.02);
      env.gain.setValueAtTime(0.20 * clampedVel, now + 0.18);
      env.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    } else {
      // Pure Sine
      duration = 0.75;
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.frequency, now);
      osc.connect(filter);

      env.gain.linearRampToValueAtTime(0.32 * clampedVel, now + 0.015);
      env.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      oscList.push(osc);
    }

    noiseNodes.forEach((src) => {
      src.start(now);
      src.stop(now + duration + 0.02);
    });

    oscList.forEach((osc, index) => {
      osc.start(now);
      osc.stop(now + duration + 0.02);
      if (index === 0) {
        osc.onended = () => {
          try {
            env.disconnect();
            filter.disconnect();
          } catch (e) {}
        };
      }
    });
  }

  // Update sonification state based on dataset, value, spatial location, and sampled pixel RGB
  updateSonification(dataset, val, lat, lon, isLand, sampledRgb = null, pixelDensity = 0.5) {
    if (!this.audioCtx) return;
    this.resume();

    const t = this.audioCtx.currentTime;
    const p = dataset.getSonificationParams(val, lat, lon);

    // 1. Stereo Panning: map longitude (-180..+180) to (-1.0..+1.0)
    const panVal = Math.max(-1, Math.min(1, lon / 180));
    if (this.panner && this.panner.pan) {
      this.panner.pan.setTargetAtTime(panVal, t, 0.05);
    }

    // 2. Compute Chromophonia Musical Note from actual pixel RGB or scientific value RGB
    const rgb = sampledRgb || deriveScientificRgb(dataset.id, val, dataset.min, dataset.max, isLand);
    const mappedNote = mapColorToMusicalNote(rgb, {
      scaleId: this.scaleMode,
      rootIndex: this.rootIndex,
      depthMode: this.depthMode
    });

    // Calculate combined intensity factor from data normalized value + user musicIntensity + pixelDensity
    const dataNorm = clamp((val - dataset.min) / Math.max(0.0001, dataset.max - dataset.min), 0, 1);
    const effectiveIntensity = clamp(
      this.musicIntensity * (0.68 + dataNorm * 0.72 + pixelDensity * 0.2),
      0.35,
      2.2
    );
    this.liveEffectiveIntensity = effectiveIntensity;

    const prevMidi = this.currentNote ? this.currentNote.midiNote : null;
    this.currentNote = mappedNote;

    // Generate 8-step Chromophonia regional melody tailored to the map's contour & live sensor intensity
    this.currentMelody = generateRegionMelody(
      mappedNote,
      {
        scaleId: this.scaleMode,
        rootIndex: this.rootIndex,
        depthMode: this.depthMode,
        preferredContourId: this.preferredContourId,
        dataNorm
      },
      effectiveIntensity,
      isLand
    );

    // Trigger immediate note pluck when moving into a new pitch class
    if (prevMidi !== mappedNote.midiNote && !this.isMuted) {
      this.playChromophoniaNote(mappedNote, this.timbre, clamp(0.65 * effectiveIntensity, 0.25, 0.98));
    }

    // 3. Smooth continuous drone / carrier glide
    const targetFreq = mappedNote.frequency;
    const compRatio = this.timbre === 'dombra' ? 0.75 : 1.003;
    if (this.osc1) {
      this.osc1.type =
        this.timbre === 'kobyz' || this.timbre === 'shankobyz' || this.timbre === 'pad'
          ? 'sawtooth'
          : this.timbre === 'sybyzgy' || this.timbre === 'sine'
          ? 'sine'
          : 'triangle';
      this.osc1.frequency.setTargetAtTime(targetFreq, t, 0.06);
    }
    if (this.osc2) {
      this.osc2.frequency.setTargetAtTime(targetFreq * compRatio, t, 0.06);
    }
    if (this.subOsc) {
      this.subOsc.frequency.setTargetAtTime(Math.max(40, targetFreq / 2), t, 0.08);
    }

    // 4. Filter cutoff and resonance
    if (this.filter) {
      const cutoff = clamp((mappedNote.filterCutoffHz || p.filterFreq || 1400) * effectiveIntensity, 300, 6200);
      this.filter.frequency.setTargetAtTime(cutoff, t, 0.08);
      this.filter.Q.setTargetAtTime(p.resonance || 2.0, t, 0.08);
    }

    // 5. Continuous carrier volume (scales dynamically with sensor reading intensity)
    const carrierScale = this.playbackMode === 'melody' ? 0.42 : 0.85;
    const targetVol = this.isMuted ? 0 : clamp((p.volume || 0.22) * carrierScale * effectiveIntensity, 0, 0.48);
    if (this.synthGain) {
      this.synthGain.gain.setTargetAtTime(targetVol, t, 0.05);
    }

    // 6. Rhythmic pulse modulation (fires, CO, NOx shipping lanes, PM2.5 smoke)
    if (this.lfo && this.lfoGain) {
      if (p.pulseRate && p.pulseRate > 0) {
        this.lfo.frequency.setTargetAtTime(p.pulseRate * clamp(effectiveIntensity, 0.6, 1.8), t, 0.05);
        this.lfoGain.gain.setTargetAtTime(targetVol * 0.65, t, 0.05);
      } else {
        this.lfoGain.gain.setTargetAtTime(0, t, 0.05);
      }
    }

    // 7. Thematic environmental soundscape texture tailored to each map's physics
    if (this.noiseGain && this.noiseFilter) {
      let noiseFreq = 2000;
      let noiseQ = 2.5;
      if (dataset.id === 'geos_wind') {
        // Aerodynamic wind howl sweeping with wind speed (0..45 m/s)
        noiseFreq = 380 + dataNorm * 2200;
        noiseQ = 3.6;
      } else if (dataset.id === 'geos_precip' || dataset.id === 'wv_precip') {
        // Crisp raindrop & storm downpour texture
        noiseFreq = 2600 + dataNorm * 2000;
        noiseQ = 1.6;
      } else if (dataset.id === 'wv_fires' || dataset.id === 'geos_co' || dataset.id === 'geos_pm25') {
        // Crackling fire embers & dense smoke turbulence
        noiseFreq = 1100 + dataNorm * 1800;
        noiseQ = 4.2;
      } else if (dataset.id === 'wv_arctic' || dataset.id === 'wv_antarctic') {
        // High crystalline polar ice shimmer
        noiseFreq = 3800 + dataNorm * 1400;
        noiseQ = 5.0;
      } else if (dataset.id === 'wv_sst' || dataset.id === 'geos_humidity') {
        // Deep oceanic wave wash
        noiseFreq = 420 + dataNorm * 900;
        noiseQ = 2.0;
      }
      this.noiseFilter.frequency.setTargetAtTime(noiseFreq, t, 0.06);
      this.noiseFilter.Q.setTargetAtTime(noiseQ, t, 0.06);

      const noiseVol = p.noiseAmount ? clamp(p.noiseAmount * 0.26 * effectiveIntensity, 0, 0.38) : 0;
      this.noiseGain.gain.setTargetAtTime(noiseVol, t, 0.06);
    }

    // 8. Haptic & Tactile Audio Boundary Checks
    this.checkGeographicBoundaries(lat, isLand);

    return {
      note: this.currentNote,
      melody: this.currentMelody,
      effectiveIntensity
    };
  }

  // Detect crossing from water to land or crossing equator (with Web Vibration API for tactile accessibility)
  checkGeographicBoundaries(lat, isLand) {
    if (this.lastLandState !== null && this.lastLandState !== isLand) {
      this.playBoundaryClick(isLand);
      this.triggerTactileVibration(isLand ? [35] : [20, 30, 20]);
    }
    this.lastLandState = isLand;

    const currentLatSign = lat >= 0 ? 1 : -1;
    if (this.lastLatSign !== null && this.lastLatSign !== currentLatSign && Math.abs(lat) < 5) {
      this.playEquatorChime();
      this.triggerTactileVibration([50, 40, 50]);
    }
    this.lastLatSign = currentLatSign;
  }

  triggerTactileVibration(pattern = [30]) {
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(pattern);
      }
    } catch (e) {}
  }

  // Earcon: Tactile boundary crossing (percussive click)
  playBoundaryClick(enteringLand) {
    if (this.isMuted || !this.audioCtx) return;
    const t = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = enteringLand ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(enteringLand ? 320 : 160, t);
    osc.frequency.exponentialRampToValueAtTime(enteringLand ? 80 : 50, t + 0.06);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.07);
  }

  // Earcon: Crossing the Equator (celestial bell tone)
  playEquatorChime() {
    if (this.isMuted || !this.audioCtx) return;
    const t = this.audioCtx.currentTime;
    const bell = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    bell.type = 'sine';
    bell.frequency.setValueAtTime(1046.5, t);
    gain.gain.setValueAtTime(0.28, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);

    bell.connect(gain);
    gain.connect(this.masterGain);

    bell.start(t);
    bell.stop(t + 0.65);
  }

  // Earcon: Probe data point (plays current Chromophonia instrument chord + crystal ping)
  playProbePing() {
    if (this.isMuted || !this.audioCtx) return;
    this.triggerTactileVibration([40, 30, 60]);
    if (this.currentNote) {
      this.playChromophoniaNote(this.currentNote, this.timbre, 0.92);
    }
    const t = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, t);
    osc.frequency.exponentialRampToValueAtTime(1760, t + 0.12);

    gain.gain.setValueAtTime(0.32, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.42);
  }

  // Earcon: Switching dataset layer
  playDatasetSwitch() {
    if (this.isMuted || !this.audioCtx) return;
    this.triggerTactileVibration([25]);
    const t = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(660, t + 0.15);

    gain.gain.setValueAtTime(0.05, t);
    gain.gain.linearRampToValueAtTime(0.28, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.24);
  }

  // Earcon: Gesture Recognized Affirmation
  playGestureChime() {
    if (this.isMuted || !this.audioCtx) return;
    const t = this.audioCtx.currentTime;
    const chord = [523.25, 659.25, 783.99];
    chord.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.04);
      gain.gain.setValueAtTime(0.18, t + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.04 + 0.25);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + idx * 0.04);
      osc.stop(t + idx * 0.04 + 0.3);
    });
  }

  stop() {
    if (this.synthGain && this.audioCtx) {
      this.synthGain.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.08);
    }
    if (this.noiseGain && this.audioCtx) {
      this.noiseGain.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.08);
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.audioCtx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.audioCtx.currentTime, 0.04);
    }
  }

  setReverb(val) {
    this.reverbAmount = clamp(val, 0, 1);
    if (this.audioCtx && this.dryGain && this.wetGain && this.feedbackGain) {
      const t = this.audioCtx.currentTime;
      this.dryGain.gain.setTargetAtTime(1 - this.reverbAmount * 0.35, t, 0.03);
      this.wetGain.gain.setTargetAtTime(this.reverbAmount * 0.52, t, 0.03);
      this.feedbackGain.gain.setTargetAtTime(0.15 + this.reverbAmount * 0.36, t, 0.03);
    }
  }

  setMusicIntensity(intensity) {
    this.musicIntensity = clamp(intensity, 0.25, 2.0);
  }

  setTimbre(timbreId) {
    if (TIMBRES[timbreId]) {
      this.timbre = timbreId;
      if (this.currentNote && !this.isMuted) {
        this.playChromophoniaNote(this.currentNote, this.timbre, 0.8);
      }
    }
  }

  setScaleMode(mode) {
    if (SCALES[mode]) {
      this.scaleMode = mode;
    }
  }

  setContourId(contourId) {
    this.preferredContourId = contourId || null;
  }

  setPlaybackMode(mode) {
    this.playbackMode = mode; // 'melody' | 'glide' | 'single'
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.masterGain && this.audioCtx) {
      const target = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.setValueAtTime(target, this.audioCtx.currentTime);
    }
    if (this.isMuted) {
      this.stop();
    }
    return this.isMuted;
  }

  toggleMute() {
    return this.setMuted(!this.isMuted);
  }

  getAnalyserData() {
    if (!this.analyser) return new Uint8Array(64);
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  getWaveformData(targetBuffer) {
    if (!this.analyser || this.isMuted) return false;
    this.analyser.getByteTimeDomainData(targetBuffer);
    return true;
  }
}

export const sonificationEngine = new SonificationEngine();
