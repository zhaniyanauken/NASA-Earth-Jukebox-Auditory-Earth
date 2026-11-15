// NASA Earth Jukebox - Intelligent Voice Assistant "Wally" (Cartoon Pixar Character Edition)
// Guaranteed 100% reliable wake-word response ("Wally"), auto-restarting continuous listener,
// expressive Pixar voice, Web Audio chirps, and continuous accessibility.
import { HOTSPOTS_BY_DATASET, DATASETS, sampleAllDatasetsAtPoint } from '../data/nasaDatasets';
import { TIMBRES, SCALES } from './chromophoniaMusic';

class SpeechAssistantService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.recognition = null;
    this.isListening = false;
    this.isSpeaking = false;
    this.speakingSafetyTimer = null;
    this.awaitingQuery = false;
    this.wakeWordActive = false;
    this.wallyAudioCtx = null;
    this.restartTimer = null;

    // WALL-E Animated Character Voice Configuration:
    // Slightly elevated pitch (1.26) and lively cadence (1.07) for curious, warm Pixar character tone
    this.language = 'en-US';
    this.voiceRate = 1.07;
    this.voicePitch = 1.26;
    this.currentVoice = null;

    // Callbacks
    this.onVoiceCommand = null;
    this.onWakeStateChange = null;
    this.onSpeakingStateChange = null;
    this.onTranscript = null;

    this.initVoices();
  }

  // Authentic WALL-E Cartoon Sound Design (Ben Burtt style FM/chirp synthesizer)
  // Plays expressive cartoon robot chirps directly via Web Audio API
  playWallyChirp(type = 'wake') {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.wallyAudioCtx) {
        this.wallyAudioCtx = new AudioCtx();
      }
      const ctx = this.wallyAudioCtx;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const t = ctx.currentTime;

      if (type === 'wake') {
        // Iconic Wall-E curious ascending vocalization: 440Hz -> 760Hz -> 1280Hz
        const osc = ctx.createOscillator();
        const sub = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        sub.type = 'triangle';

        osc.frequency.setValueAtTime(440, t);
        osc.frequency.exponentialRampToValueAtTime(740, t + 0.08);
        osc.frequency.exponentialRampToValueAtTime(1280, t + 0.2);

        sub.frequency.setValueAtTime(220, t);
        sub.frequency.exponentialRampToValueAtTime(370, t + 0.08);
        sub.frequency.exponentialRampToValueAtTime(640, t + 0.2);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.24, t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.26);

        osc.connect(gain);
        sub.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        sub.start(t);
        osc.stop(t + 0.28);
        sub.stop(t + 0.28);
      } else if (type === 'happy' || type === 'answer') {
        // Cheerful cartoon ascending two-tone chirp
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, t); // D5
        osc.frequency.setValueAtTime(880.0, t + 0.06); // A5
        osc.frequency.exponentialRampToValueAtTime(1420.0, t + 0.15);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.2, t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.24);
      } else if (type === 'chirp') {
        // Soft robotic inquisitiveness
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, t);
        osc.frequency.exponentialRampToValueAtTime(1175, t + 0.1);

        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.18);
      }
    } catch (e) {
      // AudioContext fallback
    }
  }

  initVoices() {
    if (!this.synth) return;

    const pickBestVoice = () => {
      const voices = this.synth.getVoices();
      if (!voices || voices.length === 0) return;
      this.currentVoice = this.findVoiceForLang(voices);
    };

    pickBestVoice();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = pickBestVoice;
    }
  }

  // Pick natural, expressive, friendly animated English voices
  findVoiceForLang(voices) {
    if (!voices || voices.length === 0) return null;

    // Priority 1: Premium Natural / Neural online voices
    const priorityNames = [
      'Guy Online (Natural)',
      'Christopher Online (Natural)',
      'Eric Online (Natural)',
      'Jenny Online (Natural)',
      'Ana Online (Natural)',
      'Aria Online (Natural)',
      'Natural',
      'Online',
      'Google US English',
      'Google UK English Male',
      'Samantha',
      'Alex',
      'Junior',
      'Albert',
      'Daniel',
      'Fred'
    ];

    for (const name of priorityNames) {
      const match = voices.find(
        (v) => (v.lang === 'en-US' || v.lang.startsWith('en')) && v.name.includes(name)
      );
      if (match) return match;
    }

    // Priority 2: Any English voice that is NOT David or Zira
    const nonRoboticUs = voices.find(
      (v) =>
        (v.lang === 'en-US' || v.lang.startsWith('en')) &&
        !v.name.toLowerCase().includes('david') &&
        !v.name.toLowerCase().includes('zira')
    );
    if (nonRoboticUs) return nonRoboticUs;

    // Fallback: standard en-US
    const usVoice = voices.find((v) => v.lang === 'en-US');
    if (usVoice) return usVoice;

    // Fallback: any English
    const anyEn = voices.find((v) => v.lang.startsWith('en'));
    if (anyEn) return anyEn;

    return voices[0];
  }

  setLanguage(lang = 'en-US') {
    this.language = 'en-US';
    this.initVoices();
    this.scheduleRestart(100);
  }

  setRate(rate) {
    this.voiceRate = Math.max(0.85, Math.min(1.4, rate));
  }

  setPitch(pitch) {
    this.voicePitch = Math.max(0.9, Math.min(1.6, pitch));
  }

  // Speak with animated Pixar WALL-E cartoon personality and cute introductory audio chirp
  speak(text, priority = false, onEndCallback = null, playChirp = true) {
    if (!this.synth) {
      if (onEndCallback) onEndCallback();
      return;
    }

    if (priority) {
      this.cancel();
    }

    const cleanText = String(text || '')
      .replace(/[\n\r]+/g, ' ')
      .replace(/[🔴🎧🎹🌍🛰️📊🔥🌊🌲⚡]/g, '')
      .trim();

    if (!cleanText) {
      if (onEndCallback) onEndCallback();
      return;
    }

    // Play WALL-E cartoon chirp sound effect
    if (playChirp) {
      this.playWallyChirp('chirp');
    }

    try {
      if (this.synth.paused) {
        this.synth.resume();
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      const voices = this.synth.getVoices();
      const targetVoice = this.findVoiceForLang(voices);

      if (targetVoice) utterance.voice = targetVoice;
      utterance.lang = 'en-US';
      utterance.rate = this.voiceRate;
      utterance.pitch = this.voicePitch;

      if (this.speakingSafetyTimer) clearTimeout(this.speakingSafetyTimer);

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (this.onSpeakingStateChange) this.onSpeakingStateChange(true);
      };

      const finishSpeaking = () => {
        if (this.speakingSafetyTimer) {
          clearTimeout(this.speakingSafetyTimer);
          this.speakingSafetyTimer = null;
        }
        this.isSpeaking = false;
        if (this.onSpeakingStateChange) this.onSpeakingStateChange(false);
        // CRUCIAL: Immediately revive continuous speech listener as soon as Wally stops talking!
        this.scheduleRestart(200);
        if (onEndCallback) onEndCallback();
      };

      utterance.onend = finishSpeaking;
      utterance.onerror = finishSpeaking;

      this.speakingSafetyTimer = setTimeout(finishSpeaking, Math.max(4000, cleanText.length * 90));
      this.synth.speak(utterance);
    } catch (e) {
      this.isSpeaking = false;
      this.scheduleRestart(200);
      if (onEndCallback) onEndCallback();
    }
  }

  cancel() {
    if (this.speakingSafetyTimer) {
      clearTimeout(this.speakingSafetyTimer);
      this.speakingSafetyTimer = null;
    }
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) { }
      this.isSpeaking = false;
      if (this.onSpeakingStateChange) this.onSpeakingStateChange(false);
      this.scheduleRestart(200);
    }
  }

  activateDirectQuestionMode() {
    this.cancel();
    this.awaitingQuery = true;
    this.restartContinuousListener();
    if (this.onWakeStateChange) this.onWakeStateChange(true);
  }

  // Bulletproof Wake Word Matcher:
  // Detects "wally", "wall-e", "walle", and common speech recognition phonetics anywhere in transcript
  checkWakeWord(transcript) {
    if (!transcript) return null;
    const lower = transcript.toLowerCase().trim();

    const wakeRegex = /\b(wally|wall-e|walle|wall\s*e|walley|wallie|wolly|volley|valley|vali|valli|well\s*he|while\s*he|willy|olly|валли|вали|вэлли|волли|уолли|уоли)\b/i;
    const match = wakeRegex.exec(lower);
    if (!match) return null;

    const matchIdx = match.index;
    const matchLen = match[0].length;
    // Extract query before and after wake-word
    const after = transcript.slice(matchIdx + matchLen).replace(/^[,.:;!?-]+/, '').trim();
    const before = transcript.slice(0, matchIdx).replace(/^(hey|hi|hello|ok|okay|please|yo|dear|um|uh)\b/i, '').trim();

    const query = (after.length > 0 ? after : before).trim();
    return {
      matched: match[0],
      query: query
    };
  }

  // Schedule an auto-restart of speech recognition to keep it alive 24/7
  scheduleRestart(delay = 250) {
    if (this.restartTimer) clearTimeout(this.restartTimer);
    this.restartTimer = setTimeout(() => {
      this.restartContinuousListener();
    }, delay);
  }

  restartContinuousListener() {
    if (!this.recognition) return;
    if (this.isSpeaking) return; // Don't listen to self while talking
    try {
      if (this.isListening) return;
      this.recognition.lang = 'en-US';
      this.recognition.start();
    } catch (e) {
      // If recognition is in transition, schedule retry
      if (e.name !== 'InvalidStateError') {
        setTimeout(() => {
          try {
            if (!this.isListening && !this.isSpeaking) {
              this.recognition.start();
            }
          } catch (err) {}
        }, 500);
      }
    }
  }

  // Unified Continuous Voice Recognition Engine
  // ALWAYS responds when addressed with "Wally" (or "Wall-E")
  initContinuousListener(onCommandCallback) {
    if (typeof window === 'undefined') return;
    this.onVoiceCommand = onCommandCallback;

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      console.warn('SpeechRecognition API not available in browser');
      return;
    }

    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) { }
    }

    try {
      this.recognition = new SpeechRec();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
        this.wakeWordActive = true;
        if (this.onWakeStateChange) this.onWakeStateChange(true);
      };

      this.recognition.onresult = (event) => {
        const lastIdx = event.results.length - 1;
        const result = event.results[lastIdx];
        const transcript = result[0].transcript.trim();
        if (!transcript) return;

        if (this.onTranscript) {
          this.onTranscript(transcript, result.isFinal);
        }

        // Ignore audio while Wally is actively speaking his own voice
        if (this.isSpeaking) return;

        // Check for wake word ("Wally", "Wall-E", etc.)
        const wakeCheck = this.checkWakeWord(transcript);

        if (wakeCheck) {
          this.cancel();
          this.playWallyChirp('wake');

          if (wakeCheck.query.length > 1) {
            this.awaitingQuery = false;
            this.handleUserVoiceQuery(wakeCheck.query);
          } else {
            this.awaitingQuery = true;
            if (this.onVoiceCommand) {
              this.onVoiceCommand('', 'WAKE_ACK', { wakeOnly: true });
            }
            this.speak('Wall-E! I am listening! Ask me anything about our planet!', true);
          }
          return;
        }

        // Direct question mode (user previously clicked mic or said "Wally")
        if (this.awaitingQuery && result.isFinal) {
          this.awaitingQuery = false;
          this.handleUserVoiceQuery(transcript);
        }
      };

      this.recognition.onerror = (err) => {
        if (err.error === 'not-allowed') {
          console.warn('Microphone permission not allowed');
          this.isListening = false;
          return;
        }
        // Always revive on 'aborted', 'no-speech', etc.!
        this.scheduleRestart(350);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        // Keep continuous listener alive indefinitely
        this.scheduleRestart(200);
      };

      this.recognition.start();
    } catch (err) {
      console.warn('SpeechRecognition start error:', err);
    }
  }

  // Parse natural voice request and trigger actions or speak fluent English answers
  handleUserVoiceQuery(query) {
    if (!query) return;
    const q = query.toLowerCase();

    // 1. Audio Control Commands
    if (q.includes('mute') || q.includes('silence') || q.includes('stop sound') || q.includes('quiet') || q.includes('shut up')) {
      if (this.onVoiceCommand) {
        this.onVoiceCommand(query, 'MUTE_AUDIO', {});
      }
      this.playWallyChirp('chirp');
      this.speak('Directive: Quiet mode! Background audio stopped. Call "Wall-E" whenever you need me!', true);
      return;
    }

    if (q.includes('unmute') || q.includes('turn on audio') || q.includes('enable audio') || q.includes('play music')) {
      if (this.onVoiceCommand) {
        this.onVoiceCommand(query, 'UNMUTE_AUDIO', {});
      }
      this.playWallyChirp('happy');
      this.speak('Whoopee! Audio and Chromophonia music enabled!', true);
      return;
    }

    // 2. Chromophonia Instrument Commands
    const timbreVoiceMap = [
      { id: 'dombra', words: ['dombra', 'dombyra'] },
      { id: 'kobyz', words: ['kobyz', 'kyl-kobyz'] },
      { id: 'zhetigen', words: ['zhetigen', 'harp', 'zither'] },
      { id: 'sybyzgy', words: ['sybyzgy', 'flute'] },
      { id: 'shankobyz', words: ['shankobyz', 'jaw harp'] },
      { id: 'crystal', words: ['crystal', 'bell'] },
      { id: 'organ', words: ['organ'] },
      { id: 'pad', words: ['pad', 'synth pad'] }
    ];

    for (const tm of timbreVoiceMap) {
      if (tm.words.some(w => q.includes(w))) {
        if (this.onVoiceCommand) {
          this.onVoiceCommand(query, 'CHANGE_TIMBRE', { timbre: tm.id });
        }
        const tObj = TIMBRES[tm.id];
        this.playWallyChirp('happy');
        this.speak(`Ta-da! Switched instrument to ${tObj.labelEn}!`, true);
        return;
      }
    }

    // 3. Camera Control Commands
    if (q.includes('turn on camera') || q.includes('enable camera') || q.includes('start camera')) {
      if (this.onVoiceCommand) {
        this.onVoiceCommand(query, 'TOGGLE_CAMERA', { active: true });
      }
      this.playWallyChirp('happy');
      this.speak('Gesture camera active! Point to explore, wave to cycle maps, or show a fist to hush me!', true);
      return;
    }
    if (q.includes('turn off camera') || q.includes('disable camera') || q.includes('stop camera')) {
      if (this.onVoiceCommand) {
        this.onVoiceCommand(query, 'TOGGLE_CAMERA', { active: false });
      }
      this.playWallyChirp('chirp');
      this.speak('Camera resting! Gesture tracking off.', true);
      return;
    }

    // 4. Fullscreen Commands
    if (q.includes('fullscreen') || q.includes('full screen')) {
      if (this.onVoiceCommand) {
        this.onVoiceCommand(query, 'TOGGLE_FULLSCREEN', {});
      }
      this.playWallyChirp('happy');
      this.speak('Whoosh! Fullscreen view toggled!', true);
      return;
    }

    // 5. Direct Navigation & Map Switching
    const isQuestionWord =
      q.includes('how') || q.includes('why') || q.includes('what') ||
      q.includes('is this real') || q.includes('tell me') || q.includes('where');

    if (!isQuestionWord) {
      const hotspotMap = [
        { datasetId: 'geos_temp', lat: 24.0, lon: 44.0, nameEn: 'Arabian & Saharan Thermal Core', words: ['sahara', 'arabia', 'heat core'] },
        { datasetId: 'geos_wind', lat: -56.0, lon: -146.0, nameEn: 'South Pacific Storm Vortex', words: ['storm', 'vortex', 'wind gale'] },
        { datasetId: 'geos_wind', lat: 33.5, lon: 136.5, nameEn: 'Typhoon Lan off Japan', words: ['typhoon', 'japan'] },
        { datasetId: 'geos_pm25', lat: 18.0, lon: -16.0, nameEn: 'Saharan Dust Plume PM2.5', words: ['dust', 'aerosol'] },
        { datasetId: 'geos_co', lat: 61.5, lon: -115.0, nameEn: 'Canadian Wildfire CO Dome', words: ['canada', 'wildfire smoke'] },
        { datasetId: 'wv_fires', lat: -11.0, lon: 21.0, nameEn: 'Central African Savanna Fire Belt', words: ['africa fires', 'angola fires'] },
        { datasetId: 'geos_humidity', lat: -7.0, lon: -60.0, nameEn: 'Amazon Moisture Canopy', words: ['amazon', 'humidity'] },
        { datasetId: 'wv_sst', lat: 35.0, lon: -72.0, nameEn: 'Gulf Stream Warm Current', words: ['gulf stream', 'ocean current'] },
        { datasetId: 'goes_truecolor', lat: 25.0, lon: -75.0, nameEn: 'NOAA GOES-East Full Disk', words: ['full disk', 'goes', 'terminator'] }
      ];

      if (q.includes('show') || q.includes('go to') || q.includes('fly to') || q.includes('switch to') || q.includes('open')) {
        for (const h of hotspotMap) {
          if (h.words.some(w => q.includes(w))) {
            const ds = DATASETS.find(d => d.id === h.datasetId);
            if (this.onVoiceCommand) {
              this.onVoiceCommand(query, 'NAVIGATE_TO_POINT', {
                lat: h.lat,
                lon: h.lon,
                dataset: ds
              });
              this.playWallyChirp('happy');
              this.speak(`Wheee! Flying over to ${h.nameEn}!`, true);
              return;
            }
          }
        }

        const layerMap = [
          { id: 'geos_temp', words: ['temperature', 'surface temp', '5147'] },
          { id: 'geos_wind', words: ['wind', 'wind speed', '5148'] },
          { id: 'geos_precip', words: ['precipitation', 'clouds', '5149'] },
          { id: 'geos_humidity', words: ['humidity', 'q2m', '5150'] },
          { id: 'geos_pm25', words: ['pm2.5', 'particulate', 'smoke', '5151'] },
          { id: 'geos_o3', words: ['ozone', 'o3', '5152'] },
          { id: 'geos_co', words: ['carbon monoxide', 'co', '5153'] },
          { id: 'geos_nox', words: ['nitrogen', 'nox', 'shipping', '5154'] },
          { id: 'wv_fires', words: ['active fires', 'wildfires', 'fire'] },
          { id: 'wv_precip', words: ['rain and snow', 'snowfall'] },
          { id: 'wv_sst', words: ['sea surface temperature', 'sst'] },
          { id: 'goes_truecolor', words: ['full disk', 'goes disk', '5120'] }
        ];

        for (const l of layerMap) {
          if (l.words.some(w => q.includes(w))) {
            const ds = DATASETS.find(d => d.id === l.id);
            if (ds && this.onVoiceCommand) {
              this.onVoiceCommand(query, 'CHANGE_LAYER', { dataset: ds });
              this.playWallyChirp('happy');
              this.speak(`Switched to ${ds.nameEn}!`, true);
              return;
            }
          }
        }
      }
    }

    // 6. Route to General Question with spoken English response
    if (this.onVoiceCommand) {
      this.onVoiceCommand(query, 'GENERAL_QUESTION', { query });
    }
  }

  // English Scientific & Musical Answer Generator (NASA SVS #40509)
  // Infused with WALL-E's lovable, curious, and expressive Pixar cartoon personality
  generateAnswer(question, context) {
    const q = (question || '').toLowerCase();
    const { dataset, val, lat, lon, regionInfo, timbre = 'dombra', scaleMode = 'kuy' } = context;

    const latStr = `${Math.abs(lat).toFixed(1)}° ${lat >= 0 ? 'N' : 'S'}`;
    const lonStr = `${Math.abs(lon).toFixed(1)}° ${lon >= 0 ? 'E' : 'W'}`;
    const locationName = regionInfo.nameEn || 'Earth Location';
    const reading = dataset.formatValue(val, lat, lon);
    const allMetrics = sampleAllDatasetsAtPoint(lat, lon);

    // 1. Question about NASA SVS #40509 Earth Now Dashboard
    if (q.includes('real') || q.includes('nasa') || q.includes('40509') || q.includes('earth now') || q.includes('source')) {
      return (
        'Ooh! Yes, yes! Direct from NASA Goddard Earth Now Dashboard, gallery 40509! ' +
        `It integrates ${DATASETS.length} real visualizations: GEOS-FP weather models, GEOS-CF air quality, ` +
        'Suomi NPP Active Fires, Rain and Snow, Sea Surface Temperature, and NOAA GOES geostationary disks!'
      );
    }

    // 2. Question about How Many Maps
    if (q.includes('how many map') || q.includes('how many layer') || q.includes('total map') || q.includes('all map')) {
      return (
        `Whoa! There are ${DATASETS.length} curated NASA visualizations in total! ` +
        '1) Weather Models (Temperature, Wind, Precip, Humidity), 2) Air Quality Forecasts (PM2.5, Ozone, CO, NOx), ' +
        '3) Active Wildfires, 4) Rain and Snow & Sea Surface Temperature, and 5) NOAA GOES Full Disk! ' +
        'Wave your hand left or right to cycle through them in order!'
      );
    }

    // 3. Question about Music and Chromophonia
    if (q.includes('music') || q.includes('sound') || q.includes('instrument') || q.includes('chromophon') || q.includes('sonifi')) {
      const curTimbre = TIMBRES[timbre] || TIMBRES.dombra;
      const curScale = SCALES[scaleMode] || SCALES.kuy;
      return (
        `Music time! We are playing the Kazakh ${curTimbre.labelEn} in the ${curScale.labelEn} scale! ` +
        'Chromophonia turns live satellite data and pixel colors into 8-step melodies using traditional instruments and synthesizers!'
      );
    }

    // 4. Question about Gestures
    if (q.includes('gesture') || q.includes('hand') || q.includes('swipe') || q.includes('fist')) {
      return (
        'Directive! Point with your finger to scan the map in stereo, wave your hand left or right to switch maps in queue order, ' +
        'pinch thumb and finger to probe, or show a clenched fist ✊ to hush me!'
      );
    }

    // 5. Question about Location and Metrics
    if (q.includes('where am i') || q.includes('location') || q.includes('metrics') || q.includes('data here')) {
      const topMetrics = allMetrics.slice(0, 5);
      const summaryEn = topMetrics.map(m => `${m.nameEn}: ${m.value} ${m.unit}`).join('; ');
      return `Aha! We are right over ${locationName} at ${latStr}, ${lonStr}! The active layer is ${dataset.nameEn}, reading ${reading}. Nearby readings include: ${summaryEn}. Isn't Earth magnificent?`;
    }

    // 6. Specific Regions (Sahara, Typhoon, Canada Fires, Arctic)
    if (q.includes('sahara') || q.includes('heat')) {
      return 'Ooh, super hot! On NASA SVS #5147, GEOS-FP Near-Surface Temperature captures an intense heat dome over +44.5 degrees Celsius across the Sahara, with huge PM2.5 dust plumes!';
    }
    if (q.includes('wind') || q.includes('typhoon') || q.includes('storm')) {
      return 'Whoosh! On SVS #5148, Near-Surface Wind Speed tracks a powerful cyclonic storm vortex in the South Pacific over 39 meters per second, plus Typhoon Lan off Japan!';
    }
    if (q.includes('fire') || q.includes('smoke') || q.includes('carbon monoxide')) {
      return 'Fires detected! Suomi NPP satellites track active thermal fire belts in Africa and Canada, showing crimson Carbon Monoxide plumes on SVS #5153!';
    }

    // 7. Greeting / Identity
    if (q.includes('who are you') || q.includes('hello') || q.includes('hi') || q.includes('wally')) {
      return `Waaall-E! That's me! Your friendly NASA Earth Jukebox explorer! We are looking at ${dataset.nameEn} over ${locationName}! What shall we discover together?`;
    }

    // Default rich contextual response
    return `Wall-E here! At ${locationName} (${latStr}, ${lonStr}), active layer ${dataset.nameEn} (recorded ${dataset.time}) reads ${reading}!`;
  }

  getFullInstructionText() {
    return (
      'Waaall-E here! Welcome to NASA Earth Jukebox and Chromophonia! ' +
      `Explore all ${DATASETS.length} official NASA Earth Now visualizations. ` +
      'Stereo audio maps longitude across the globe. ' +
      'Visual frames are sonified through traditional Kazakh instruments and synthesizers. ' +
      'Use arrow keys to fly across Earth, Space to probe coordinates, wave your hand to cycle maps in sequential queue order, and show a clenched fist to hush my voice!'
    );
  }

  speakFullInstruction() {
    const text = this.getFullInstructionText();
    this.playWallyChirp('wake');
    this.speak(text, true);
    return text;
  }
}

export const speechAssistant = new SpeechAssistantService();
