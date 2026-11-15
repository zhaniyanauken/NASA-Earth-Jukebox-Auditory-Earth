// Chromophonia Audio-Visual Palette & Kazakh Traditional Music Mathematics
// Integrated with NASA Earth Information Center (EIC) Visual Frame Sonification

export const SCALES = {
  kuy: {
    id: 'kuy',
    labelRu: 'Қоңыр (Күй)',
    labelEn: 'Qonyr (Kazakh Kui)',
    intervals: [0, 2, 5, 7, 9],
  },
  dala: {
    id: 'dala',
    labelRu: 'Дала сазы (Күй)',
    labelEn: 'Dala Sazy (Steppe Kui)',
    intervals: [0, 2, 5, 7, 10],
  },
  pentatonic: {
    id: 'pentatonic',
    labelRu: 'Пентатоника',
    labelEn: 'Pentatonic',
    intervals: [0, 2, 4, 7, 9],
  },
  major: {
    id: 'major',
    labelRu: 'Мажор',
    labelEn: 'Major',
    intervals: [0, 2, 4, 5, 7, 9, 11],
  },
  minor: {
    id: 'minor',
    labelRu: 'Минор',
    labelEn: 'Natural Minor',
    intervals: [0, 2, 3, 5, 7, 8, 10],
  },
  dorian: {
    id: 'dorian',
    labelRu: 'Дорийский',
    labelEn: 'Dorian Mode',
    intervals: [0, 2, 3, 5, 7, 9, 10],
  },
  lydian: {
    id: 'lydian',
    labelRu: 'Лидийский',
    labelEn: 'Lydian Cosmic',
    intervals: [0, 2, 4, 6, 7, 9, 11],
  },
  wholeTone: {
    id: 'wholeTone',
    labelRu: 'Целотонная',
    labelEn: 'Whole Tone',
    intervals: [0, 2, 4, 6, 8, 10],
  },
};

export const TIMBRES = {
  dombra: {
    id: 'dombra',
    labelRu: 'Домбыра',
    labelEn: 'Dombra',
    category: 'kazakh',
    subtitleRu: 'Двухструнный щипковый күй с квартовым бурдоном',
    subtitleEn: 'Two-string plucked Kazakh lute with sympathetic fourth drone',
  },
  kobyz: {
    id: 'kobyz',
    labelRu: 'Қобыз',
    labelEn: 'Kyl-Kobyz',
    category: 'kazakh',
    subtitleRu: 'Смычковый тембр с обертонами и вибрато',
    subtitleEn: 'Bowed horsehair instrument with rich overtone formants',
  },
  zhetigen: {
    id: 'zhetigen',
    labelRu: 'Жетіген',
    labelEn: 'Zhetigen',
    category: 'kazakh',
    subtitleRu: 'Семиструнная степная арфа-цитра',
    subtitleEn: 'Seven-string plucked steppe harp-zither',
  },
  sybyzgy: {
    id: 'sybyzgy',
    labelRu: 'Сыбызғы',
    labelEn: 'Sybyzgy',
    category: 'kazakh',
    subtitleRu: 'Традиционная тростниковая продольная флейта',
    subtitleEn: 'Airy end-blown shepherd reed flute',
  },
  shankobyz: {
    id: 'shankobyz',
    labelRu: 'Шаңқобыз',
    labelEn: 'Shankobyz',
    category: 'kazakh',
    subtitleRu: 'Обертонный язычковый варган',
    subtitleEn: 'Overtone reed jaw harp with vocal cavity resonance',
  },
  crystal: {
    id: 'crystal',
    labelRu: 'Кристалл',
    labelEn: 'Crystal FM',
    category: 'synth',
    subtitleRu: 'Чистый FM-колокольчик',
    subtitleEn: 'Pure FM crystalline bell chime',
  },
  pad: {
    id: 'pad',
    labelRu: 'Тёплый синт',
    labelEn: 'Warm Synth Pad',
    category: 'synth',
    subtitleRu: 'Мягкий расстроенный атмосферный пэд',
    subtitleEn: 'Lush detuned atmospheric analog pad',
  },
  organ: {
    id: 'organ',
    labelRu: 'Орган',
    labelEn: 'Harmonic Organ',
    category: 'synth',
    subtitleRu: 'Аддитивные гармоники',
    subtitleEn: 'Additive harmonic pipe organ',
  },
  sine: {
    id: 'sine',
    labelRu: 'Синус',
    labelEn: 'Pure Sine',
    category: 'synth',
    subtitleRu: 'Чистый эталонный тональный сигнал',
    subtitleEn: 'Clean reference fundamental tone',
  },
};

export const NOTE_NAMES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

// Expressive 8-step musical contours from Chromophonia (steppe kui motifs, ocean waves, mountain fifths)
export const CONTOUR_PRESETS = [
  {
    id: 'steppe_chant',
    nameRu: 'Степной напев',
    nameEn: 'Steppe Chant',
    offsets: [0, 2, 3, 2, 4, 3, 2, 0],
    velocities: [0.85, 0.62, 0.78, 0.65, 0.92, 0.7, 0.64, 0.55],
  },
  {
    id: 'mountain_echo',
    nameRu: 'Горное эхо',
    nameEn: 'Mountain Echo',
    offsets: [0, 3, 4, 6, 4, 3, null, 4],
    velocities: [0.88, 0.72, 0.85, 0.95, 0.74, 0.65, 0, 0.78],
  },
  {
    id: 'deep_wave',
    nameRu: 'Волна глубины',
    nameEn: 'Deep Ocean Wave',
    offsets: [0, 1, 2, 4, 2, 1, 0, -1],
    velocities: [0.82, 0.6, 0.74, 0.86, 0.72, 0.62, 0.75, 0.58],
  },
  {
    id: 'kui_motion',
    nameRu: 'Движение кюя',
    nameEn: 'Kui Gallop',
    offsets: [0, 0, 2, 3, 2, 4, 2, 1],
    velocities: [0.9, 0.58, 0.76, 0.84, 0.62, 0.92, 0.7, 0.6],
  },
  {
    id: 'wind_ornament',
    nameRu: 'Орнамент ветра',
    nameEn: 'Wind Ornament',
    offsets: [2, 4, 3, 1, 2, 0, null, 2],
    velocities: [0.82, 0.9, 0.72, 0.64, 0.78, 0.68, 0, 0.62],
  },
  {
    id: 'celestial_gleam',
    nameRu: 'Небесный отблеск',
    nameEn: 'Celestial Gleam',
    offsets: [0, 2, 4, 5, 7, 5, 4, 2],
    velocities: [0.78, 0.68, 0.82, 0.74, 0.94, 0.72, 0.65, 0.58],
  },
];

// Curated Earth Jukebox Playlist — Original Generative Audio Stories paired with NASA SVS #40509 Earth Now Dashboard Imagery
export const JUKEBOX_PLAYLIST = [
  {
    id: 'track_svs5147_temp',
    titleRu: '1. SVS #5147: Экстремальный зной Аравии и Сахары (+44.8°C) — Қобыз',
    titleEn: '1. SVS #5147: Arabian & Saharan Thermal Core (+44.8°C) — Kyl-Kobyz',
    datasetId: 'geos_temp',
    timbre: 'kobyz',
    scaleId: 'dala',
    intensity: 1.25,
    lat: 24.0,
    lon: 44.0,
    durationSec: 25,
    storyRu: 'Металлически-серый купол максимального прогрева (+44.8°C над Недждом и Сахарой на снимке SVS #5147 от 15 авг 2023) звучит густыми обертонами смычкового қобыза в степном ладу «Дала сазы».',
    storyEn: 'The metallic-gray extreme heat core (+44.8°C over Arabia and the Sahara in NASA GMAO GEOS-FP SVS #5147, Aug 15 2023) resonates through bowed Kyl-Kobyz overtones in the Dala Sazy scale.'
  },
  {
    id: 'track_svs5148_wind',
    titleRu: '2. SVS #5148: Южно-Тихоокеанский циклон и Тайфун Лан (39.5 м/с) — Сыбызғы',
    titleEn: '2. SVS #5148: South Pacific Storm Vortex & Typhoon Lan (39.5 m/s) — Sybyzgy',
    datasetId: 'geos_wind',
    timbre: 'sybyzgy',
    scaleId: 'dorian',
    intensity: 1.35,
    lat: -56.0,
    lon: -146.0,
    durationSec: 25,
    storyRu: 'Главная обложка Earth Now (#40509): ярко-красное ядро шторма (39.5 м/с в Южном океане и вихрь тайфуна Лан у Японии) раскрывается стремительным дыханием тростниковой флейты сыбызғы.',
    storyEn: 'Featured cover of the Earth Now Dashboard (#40509): the crimson 39.5 m/s storm core in the South Pacific unfolds through the airy breath and wind rush of the Kazakh Sybyzgy flute.'
  },
  {
    id: 'track_svs5149_precip',
    titleRu: '3. SVS #5149: Тропический ливень и Тайфун Лан (44 мм/ч) — Галоп Домбры',
    titleEn: '3. SVS #5149: East Pacific Storm & Typhoon Lan (44 mm/h) — Dombra Kui Gallop',
    datasetId: 'geos_precip',
    timbre: 'dombra',
    scaleId: 'kuy',
    intensity: 1.35,
    lat: 12.0,
    lon: -103.0,
    durationSec: 25,
    storyRu: 'Ярко-синие и пурпурные ядра тропических ливней (44 мм/ч у берегов Мексики и Японии, SVS #5149) переводятся в стремительный ритм казахской домбры («Движение кюя») с шумом дождя.',
    storyEn: 'Bright cyan-magenta convective rain bands (44 mm/h off Mexico and Japan, SVS #5149) drive a rapid Kazakh Dombra kui gallop layered with raindrop percussion.'
  },
  {
    id: 'track_svs5151_pm25',
    titleRu: '4. SVS #5151: Дым мегапожаров Канады PM2.5 (238 мкг/м³) — Шаңқобыз',
    titleEn: '4. SVS #5151: Canadian Megafire Smoke PM2.5 (238 µg/m³) — Shankobyz',
    datasetId: 'geos_pm25',
    timbre: 'shankobyz',
    scaleId: 'minor',
    intensity: 1.4,
    lat: 61.5,
    lon: -115.0,
    durationSec: 25,
    storyRu: 'Густой темно-коричневый шлейф аэрозолей PM2.5 (238 мкг/м³ над Большим Невольничьим озером в Канаде, SVS #5151) преобразуется в тревожные гортанные обертоны шаңқобыза.',
    storyEn: 'The dense dark-brown PM2.5 smoke plume (238 µg/m³ over Great Slave Lake, Canada in NASA GEOS-CF SVS #5151) drives resonant Shankobyz jaw-harp overtones.'
  },
  {
    id: 'track_svs5153_co',
    titleRu: '5. SVS #5153: Багровый купол угарного газа CO (740 ppbv) — Орган',
    titleEn: '5. SVS #5153: Crimson Carbon Monoxide Plume (740 ppbv) — Organ Symphony',
    datasetId: 'geos_co',
    timbre: 'organ',
    scaleId: 'minor',
    intensity: 1.35,
    lat: 61.5,
    lon: -115.0,
    durationSec: 25,
    storyRu: 'Гигантский темно-бордовый купол монооксида углерода (740 ppbv, SVS #5153) от бореальных пожаров Канады и Африки звучит мощными минорными аккордами гармонического органа.',
    storyEn: 'The massive blood-crimson Carbon Monoxide dome (740 ppbv, SVS #5153) over Canadian boreal wildfires resonates as dramatic harmonic organ progressions.'
  },
  {
    id: 'track_wv_fires_pulse',
    titleRu: '6. Worldview Цикл 1: Огненный пояс Африки (440 MW) — Шаңқобыз',
    titleEn: '6. Worldview Cycle 1: Central African Fire Belt (440 MW) — Shankobyz',
    datasetId: 'wv_fires',
    timbre: 'shankobyz',
    scaleId: 'kuy',
    intensity: 1.45,
    lat: -10.5,
    lon: 21.5,
    durationSec: 25,
    storyRu: 'Сплошной огненный пояс Центральной Африки (440 МВт, Suomi NPP VIIRS) звучит мощным трансовым ритмом шаңқобыза с треском пламени.',
    storyEn: 'The massive wildfire belt across Central Africa (440 MW, Suomi NPP VIIRS) pulses with resonant Shankobyz rhythmic overtones layered with fire crackle.'
  },
  {
    id: 'track_svs5120_goes',
    titleRu: '7. SVS #5120: Полный диск NOAA GOES-East и Атлантика — Жетіген',
    titleEn: '7. SVS #5120: NOAA GOES-East Full-Disk True Color — Zhetigen Harp',
    datasetId: 'goes_truecolor',
    timbre: 'zhetigen',
    scaleId: 'pentatonic',
    intensity: 1.12,
    lat: 25.0,
    lon: -75.0,
    durationSec: 25,
    storyRu: 'Геостационарный взгляд на полный диск Земли (SVS #5120, 16 ноября 2023): облачные вихри Атлантики и бирюзовые отмели Багам раскрываются семиструнными переливами жетігена.',
    storyEn: 'Full-disk NOAA GOES-East true-color imagery (SVS #5120, Nov 16 2023): Atlantic cloud swirls and turquoise Bahama banks unfold as 7-string Zhetigen harp arpeggios.'
  }
];

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function rgbToHex(r, g, b) {
  const toHex = (n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHsl(r, g, b) {
  const rn = clamp(r, 0, 255) / 255;
  const gn = clamp(g, 0, 255) / 255;
  const bn = clamp(b, 0, 255) / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360) % 360,
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function computeColorDepth(r, g, b) {
  const rn = clamp(r, 0, 255) / 255;
  const gn = clamp(g, 0, 255) / 255;
  const bn = clamp(b, 0, 255) / 255;

  const luminance = clamp(0.2126 * rn + 0.7152 * gn + 0.0722 * bn, 0, 1);
  const depth = clamp(1 - luminance, 0, 1);

  return { luminance, depth };
}

export function midiToFrequency(midiNote) {
  return 440 * Math.pow(2, (midiNote - 69) / 12);
}

export function formatMidiNote(midiNote) {
  const clamped = Math.round(clamp(midiNote, 12, 108));
  const pitchClass = ((clamped % 12) + 12) % 12;
  const octave = Math.floor(clamped / 12) - 1;
  const noteName = NOTE_NAMES[pitchClass];
  return {
    noteName,
    octave,
    fullNote: `${noteName}${octave}`,
  };
}

// Computer Vision Color-to-Music Translation (from Chromophonia)
export function mapColorToMusicalNote(rgb, config = {}) {
  const scaleId = config.scaleId || 'kuy';
  const rootIndex = config.rootIndex ?? 9; // Default A (9) or C (0)
  const depthMode = config.depthMode || 'deep-low';
  const minOctave = config.minOctave ?? 2;
  const maxOctave = config.maxOctave ?? 6;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const { luminance, depth } = computeColorDepth(rgb.r, rgb.g, rgb.b);
  const scale = SCALES[scaleId] ?? SCALES.kuy;
  const octaveSpan = Math.max(1, maxOctave - minOctave);

  // Hue selects the degree within the musical scale
  const hueNorm = (hsl.h % 360) / 360;
  const degreeIndex = Math.floor(hueNorm * scale.intervals.length) % scale.intervals.length;
  const semitoneOffset = scale.intervals[degreeIndex];

  // Color depth determines octave register
  const registerFactor = depthMode === 'deep-low' ? 1 - depth : depth;
  const rawOctave = Math.round(minOctave + registerFactor * octaveSpan);
  const octave = clamp(rawOctave, minOctave, maxOctave);

  const root = ((Math.round(rootIndex) % 12) + 12) % 12;
  const midiNote = clamp((octave + 1) * 12 + root + semitoneOffset, 24, 96);
  const frequency = Number(midiToFrequency(midiNote).toFixed(2));
  const formatted = formatMidiNote(midiNote);

  const satNorm = hsl.s / 100;
  const harmonicRichness = clamp(satNorm * 0.72 + (1 - depth) * 0.28, 0.08, 1);
  const filterCutoffHz = Math.round(360 + satNorm * 2400 + (1 - depth) * 2200);

  return {
    midiNote,
    frequency,
    noteName: formatted.noteName,
    octave: formatted.octave,
    fullNote: formatted.fullNote,
    scaleDegree: degreeIndex + 1,
    hue: hsl.h,
    saturation: hsl.s,
    lightness: hsl.l,
    depthPercent: Math.round(depth * 100),
    luminancePercent: Math.round(luminance * 100),
    filterCutoffHz,
    harmonicRichness,
    hex: rgbToHex(rgb.r, rgb.g, rgb.b),
    rgb
  };
}

// Synthesize scientific RGB color when sampling parametric NASA EIC value
export function deriveScientificRgb(datasetId, value, min, max, isLand = true) {
  const norm = clamp((value - min) / Math.max(0.0001, max - min), 0, 1);
  let r = 30, g = 100, b = 200;

  switch (datasetId) {
    case 'geos_precip':
    case 'wv_precip':
      if (norm < 0.1) {
        r = isLand ? 28 : 12;
        g = isLand ? 68 : 42;
        b = isLand ? 58 : 110;
      } else if (norm < 0.45) {
        r = Math.round(0 + norm * 80);
        g = Math.round(180 + norm * 160);
        b = 255;
      } else {
        r = Math.round(255 * Math.min(1, (norm - 0.3) * 1.6));
        g = Math.round(220 * Math.max(0, 1 - (norm - 0.45) * 1.8));
        b = Math.round(180 * (norm > 0.75 ? 1 : 0.3));
      }
      break;

    case 'geos_temp':
    case 'wv_lst':
      if (norm < 0.35) {
        r = Math.round(30 + norm * 120);
        g = Math.round(80 + norm * 350);
        b = 255;
      } else if (norm < 0.65) {
        r = Math.round(120 + (norm - 0.35) * 420);
        g = Math.round(220 - Math.abs(norm - 0.5) * 150);
        b = Math.round(180 * (1 - (norm - 0.35) * 3));
      } else {
        r = 255;
        g = Math.round(220 * (1 - (norm - 0.65) * 2.2));
        b = Math.round(40 * (norm > 0.88 ? 2 : 0.2));
      }
      break;

    case 'geos_wind':
    case 'geos_humidity':
      r = Math.round(20 + norm * 180);
      g = Math.round(140 + norm * 110);
      b = Math.round(200 + norm * 55);
      break;

    case 'geos_pm25':
    case 'geos_co':
      r = Math.round(120 + norm * 135);
      g = Math.round(180 - norm * 130);
      b = Math.round(120 - norm * 100);
      break;

    case 'geos_o3':
    case 'geos_nox':
      r = Math.round(80 + norm * 175);
      g = Math.round(160 - norm * 100);
      b = Math.round(180 + norm * 75);
      break;

    case 'wv_truecolor':
    case 'wv_geostationary':
    case 'goes_truecolor':
      r = Math.round(190 * (1 - norm * 0.6));
      g = Math.round(140 + norm * 105);
      b = Math.round(110 + norm * 120);
      break;

    case 'wv_sst':
      r = Math.round(10 + norm * 245);
      g = Math.round(70 + Math.sin(norm * Math.PI) * 180);
      b = Math.round(240 - norm * 160);
      break;

    case 'wv_fires':
      r = Math.round(40 + norm * 215);
      g = Math.round(20 + Math.pow(norm, 1.5) * 220);
      b = Math.round(35 + Math.pow(norm, 3) * 180);
      break;

    case 'wv_blackmarble':
      r = Math.round(8 + Math.pow(norm, 0.7) * 247);
      g = Math.round(10 + Math.pow(norm, 0.85) * 215);
      b = Math.round(24 + Math.pow(norm, 1.2) * 160);
      break;

    case 'wv_arctic':
    case 'wv_antarctic':
      r = Math.round(20 + norm * 235);
      g = Math.round(80 + norm * 175);
      b = Math.round(160 + norm * 95);
      break;

    default:
      r = Math.round(norm * 255);
      g = Math.round(140);
      b = Math.round(255 - norm * 200);
      break;
  }

  return { r: clamp(r, 0, 255), g: clamp(g, 0, 255), b: clamp(b, 0, 255) };
}

export function buildScaleMidiPool(scaleId = 'kuy', rootIndex = 9, minMidi = 36, maxMidi = 96) {
  const scale = SCALES[scaleId] ?? SCALES.kuy;
  const root = ((Math.round(rootIndex) % 12) + 12) % 12;
  const pool = [];

  for (let octave = 1; octave <= 7; octave++) {
    for (const interval of scale.intervals) {
      const midi = (octave + 1) * 12 + root + interval;
      if (midi >= minMidi && midi <= maxMidi) {
        pool.push(midi);
      }
    }
  }

  return Array.from(new Set(pool)).sort((a, b) => a - b);
}

export function buildNoteFromMelodyStep(regionNote, step) {
  const octave = Math.floor(step.midiNote / 12) - 1;
  const semitoneRatio = Math.pow(2, (step.midiNote - regionNote.midiNote) / 12);
  const filterCutoffHz = Number(
    clamp(regionNote.filterCutoffHz * Math.sqrt(semitoneRatio), 320, 6200).toFixed(0)
  );
  return {
    ...regionNote,
    midiNote: step.midiNote,
    frequency: step.frequency,
    noteName: step.noteName,
    octave,
    fullNote: step.fullNote,
    filterCutoffHz,
  };
}

export function generateRegionMelody(note, config = {}, intensityMultiplier = 1.0, isLand = true) {
  const scaleId = config.scaleId || 'kuy';
  const rootIndex = config.rootIndex ?? 9;
  const preferredContourId = config.preferredContourId || null;
  const dataNorm = config.dataNorm ?? 0.5;
  const pool = buildScaleMidiPool(scaleId, rootIndex, 36, 94);
  const safePool = pool.length > 0 ? pool : [60, 62, 65, 67, 69, 72];

  let anchorIdx = 0;
  let bestDiff = Infinity;
  for (let i = 0; i < safePool.length; i++) {
    const diff = Math.abs(safePool[i] - note.midiNote);
    if (diff < bestDiff) {
      bestDiff = diff;
      anchorIdx = i;
    }
  }

  // Choose contour preset based on dataset theme first, then geography & pixel hue
  let preset = null;
  if (preferredContourId) {
    preset = CONTOUR_PRESETS.find((c) => c.id === preferredContourId);
  }
  if (!preset) {
    let presetIdx = 0;
    if (!isLand) {
      presetIdx = 2; // Волна глубины (Deep Ocean Wave)
    } else if (note.depthPercent > 70) {
      presetIdx = 1; // Горное эхо
    } else if (note.saturation > 65) {
      presetIdx = 3; // Движение кюя (Kui Gallop)
    } else {
      const hueSector = Math.floor((note.hue % 360) / 60);
      presetIdx = hueSector % CONTOUR_PRESETS.length;
    }
    preset = CONTOUR_PRESETS[presetIdx] || CONTOUR_PRESETS[0];
  }

  const numericOffsets = preset.offsets.filter((o) => o !== null);
  const minOffset = numericOffsets.length > 0 ? Math.min(0, ...numericOffsets) : 0;
  const maxOffset = numericOffsets.length > 0 ? Math.max(0, ...numericOffsets) : 0;
  const minAllowedAnchor = Math.min(safePool.length - 1, Math.max(0, -minOffset));
  const maxAllowedAnchor = Math.max(minAllowedAnchor, safePool.length - 1 - maxOffset);
  const effectiveAnchorIdx = clamp(anchorIdx, minAllowedAnchor, maxAllowedAnchor);

  const lightnessNorm = 1 - note.depthPercent / 100;
  const baseBpm = 88 + lightnessNorm * 38 + dataNorm * 32;
  const tempoBpm = Math.round(clamp(baseBpm * clamp(intensityMultiplier, 0.45, 2.1), 68, 215));
  const stepIntervalMs = Math.round((60000 / tempoBpm) / 2);

  const steps = preset.offsets.map((offset, stepIndex) => {
    if (offset === null) {
      const restMidi = safePool[effectiveAnchorIdx];
      const formatted = formatMidiNote(restMidi);
      return {
        stepIndex,
        midiNote: restMidi,
        frequency: Number(midiToFrequency(restMidi).toFixed(2)),
        noteName: formatted.noteName,
        fullNote: '·',
        velocity: 0,
        isRest: true,
      };
    }

    const targetIdx = clamp(effectiveAnchorIdx + offset, 0, safePool.length - 1);
    const midiNote = safePool[targetIdx];
    const formatted = formatMidiNote(midiNote);
    const baseVel = preset.velocities[stepIndex] ?? 0.72;
    return {
      stepIndex,
      midiNote,
      frequency: Number(midiToFrequency(midiNote).toFixed(2)),
      noteName: formatted.noteName,
      fullNote: formatted.fullNote,
      velocity: clamp(baseVel * clamp(intensityMultiplier, 0.45, 1.5), 0.2, 1.0),
      isRest: false,
    };
  });

  return {
    motifId: preset.id,
    motifNameRu: preset.nameRu,
    motifNameEn: preset.nameEn,
    tempoBpm,
    stepIntervalMs,
    steps,
  };
}
