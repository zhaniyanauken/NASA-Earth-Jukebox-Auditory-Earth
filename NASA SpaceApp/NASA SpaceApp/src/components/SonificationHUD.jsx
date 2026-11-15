import React, { useState, useEffect, useRef } from 'react';
import {
  Layers,
  Thermometer,
  CloudFog,
  Trees,
  Waves,
  Flame,
  Sparkles,
  CloudRain,
  Volume2,
  Music,
  BarChart3,
  Disc,
  Play,
  Square,
  Sliders,
  Activity,
  Wind,
  Droplets,
  Globe,
  Snowflake,
  Sun
} from 'lucide-react';
import { DATASETS, MEDIA_GROUPS, DATASET_MUSIC_PROFILES, sampleAllDatasetsAtPoint } from '../data/nasaDatasets';
import { TIMBRES, SCALES, JUKEBOX_PLAYLIST } from '../services/chromophoniaMusic';
import { sonificationEngine } from '../services/sonificationEngine';

const ICONS = {
  geos_temp: Thermometer,
  geos_wind: Wind,
  geos_precip: CloudRain,
  geos_humidity: Droplets,
  geos_pm25: CloudFog,
  geos_o3: Sun,
  geos_co: Flame,
  geos_nox: Activity,
  wv_truecolor: Globe,
  wv_blackmarble: Sparkles,
  wv_geostationary: Globe,
  wv_fires: Flame,
  wv_precip: CloudRain,
  wv_sst: Waves,
  wv_lst: Thermometer,
  wv_arctic: Snowflake,
  wv_antarctic: Snowflake,
  goes_truecolor: Globe
};

export default function SonificationHUD({
  activeDataset,
  onSelectDataset,
  cursorCoords,
  currentValue = 0,
  isAudioActive,
  language,
  timbre,
  onChangeTimbre,
  scaleMode,
  onChangeScaleMode,
  musicIntensity,
  onChangeMusicIntensity,
  reverbAmount,
  onChangeReverbAmount,
  activeTab,
  onChangeTab,
  customHotspotsByDataset,
  activeJukeboxTrackId,
  onPlayJukeboxTrack,
  onStopJukeboxTrack,
  sampledNoteInfo
}) {
  const isRu = Boolean(language && language.startsWith('ru'));
  const scopeCanvasRef = useRef(null);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [melodyState, setMelodyState] = useState(null);
  const [selectedGroupKey, setSelectedGroupKey] = useState('all');

  const visibleDatasets =
    selectedGroupKey === 'all'
      ? DATASETS
      : DATASETS.filter((d) => d.groupKey === selectedGroupKey);

  // Subscribe to 8-step melody sequencer steps from sonificationEngine
  useEffect(() => {
    sonificationEngine.onStepCallback = (stepIdx, step, melody) => {
      setActiveStepIdx(stepIdx);
      setMelodyState(melody);
    };
    return () => {
      sonificationEngine.onStepCallback = null;
    };
  }, []);

  // Live Oscilloscope Waveform Canvas
  useEffect(() => {
    let rafId = 0;
    const buffer = new Uint8Array(128);

    const drawScope = () => {
      const canvas = scopeCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const w = canvas.width;
          const h = canvas.height;
          ctx.clearRect(0, 0, w, h);

          ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, h / 2);
          ctx.lineTo(w, h / 2);
          ctx.stroke();

          const hasLive = sonificationEngine.getWaveformData(buffer);
          ctx.strokeStyle = sampledNoteInfo?.hex || activeDataset.color || '#38BDF8';
          ctx.lineWidth = 2;
          ctx.beginPath();

          if (hasLive && isAudioActive) {
            const slice = w / buffer.length;
            for (let i = 0; i < buffer.length; i++) {
              const v = buffer[i] / 128.0;
              const y = (v * h) / 2;
              const x = i * slice;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
          } else {
            ctx.moveTo(0, h / 2);
            ctx.lineTo(w, h / 2);
          }
          ctx.stroke();
        }
      }
      rafId = requestAnimationFrame(drawScope);
    };

    rafId = requestAnimationFrame(drawScope);
    return () => cancelAnimationFrame(rafId);
  }, [isAudioActive, activeDataset.color, sampledNoteInfo]);

  const allMetricsHere = sampleAllDatasetsAtPoint(
    cursorCoords.lat,
    cursorCoords.lon,
    customHotspotsByDataset
  );

  const currentTimbreObj = TIMBRES[timbre] || TIMBRES.dombra;
  const currentScaleObj = SCALES[scaleMode] || SCALES.kuy;
  const activeMelody = melodyState || sonificationEngine.currentMelody;
  const currentNote = sampledNoteInfo || sonificationEngine.currentNote;
  const mapThemeProfile = DATASET_MUSIC_PROFILES[activeDataset.id];
  const dataNorm = Math.max(0, Math.min(1, (currentValue - activeDataset.min) / Math.max(0.0001, activeDataset.max - activeDataset.min)));
  const liveSensorIntensityPct = Math.round(musicIntensity * (0.68 + dataNorm * 0.72) * 100);

  return (
    <div
      className="scientific-card"
      style={{
        padding: '0.65rem 0.95rem',
        marginTop: '0.45rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.55rem'
      }}
    >
      {/* 1. TOP ROW: 18 NASA SVS #40509 Earth Now Dashboard Maps + Media Group Filter + Studio Mode Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: '0.35rem', marginRight: '0.2rem' }}>
            <Layers size={14} color="var(--cyan-nasa)" />
            <span>
              {isRu
                ? `${DATASETS.length} КАРТ EARTH NOW (#40509):`
                : `${DATASETS.length} EARTH NOW MAPS (#40509):`}
            </span>
          </div>

          <button
            onClick={() => setSelectedGroupKey('all')}
            style={{
              padding: '0.2rem 0.5rem',
              borderRadius: '5px',
              fontSize: '0.68rem',
              fontWeight: selectedGroupKey === 'all' ? 800 : 600,
              cursor: 'pointer',
              background: selectedGroupKey === 'all' ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${selectedGroupKey === 'all' ? 'var(--cyan-nasa)' : 'rgba(255,255,255,0.12)'}`,
              color: selectedGroupKey === 'all' ? '#FFFFFF' : '#94A3B8'
            }}
          >
            {isRu ? `Все (${DATASETS.length})` : `All (${DATASETS.length})`}
          </button>

          {MEDIA_GROUPS.map((grp) => {
            const isGrp = selectedGroupKey === grp.key;
            const count = DATASETS.filter((d) => d.groupKey === grp.key).length;
            return (
              <button
                key={grp.id}
                onClick={() => {
                  setSelectedGroupKey(grp.key);
                  const firstInGroup = DATASETS.find((d) => d.groupKey === grp.key);
                  if (firstInGroup) onSelectDataset(firstInGroup);
                }}
                style={{
                  padding: '0.2rem 0.5rem',
                  borderRadius: '5px',
                  fontSize: '0.68rem',
                  fontWeight: isGrp ? 800 : 600,
                  cursor: 'pointer',
                  background: isGrp ? 'rgba(56, 189, 248, 0.22)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isGrp ? '#38BDF8' : 'rgba(255,255,255,0.12)'}`,
                  color: isGrp ? '#FFFFFF' : '#CBD5E1'
                }}
                title={isRu ? grp.descriptionRu : grp.description}
              >
                {isRu ? `${grp.shortTitleRu} (${count})` : `${grp.shortTitle} (${count})`}
              </button>
            );
          })}
        </div>

        {/* Sub-panel Tabs: Chromophonia Music | All 18 Metrics Here | Jukebox Playlist */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onChangeTab('music')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.26rem 0.65rem',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'music' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.04)',
              border: `1px solid ${activeTab === 'music' ? '#F59E0B' : 'rgba(255, 255, 255, 0.12)'}`,
              color: activeTab === 'music' ? '#FBBF24' : '#CBD5E1'
            }}
          >
            <Music size={13} />
            <span>{isRu ? '🎹 Музыка Хромофонии и Интенсивность' : '🎹 Chromophonia Music & Intensity'}</span>
          </button>

          <button
            onClick={() => onChangeTab('metrics')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.26rem 0.65rem',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'metrics' ? 'rgba(0, 242, 254, 0.18)' : 'rgba(255, 255, 255, 0.04)',
              border: `1px solid ${activeTab === 'metrics' ? 'var(--cyan-nasa)' : 'rgba(255, 255, 255, 0.12)'}`,
              color: activeTab === 'metrics' ? 'var(--cyan-nasa)' : '#CBD5E1'
            }}
          >
            <BarChart3 size={13} />
            <span>{isRu ? `📊 Другие показатели точки (Все ${DATASETS.length})` : `📊 Other Metrics Here (All ${DATASETS.length})`}</span>
          </button>

          <button
            onClick={() => onChangeTab('jukebox')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.26rem 0.65rem',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'jukebox' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.04)',
              border: `1px solid ${activeTab === 'jukebox' ? '#10B981' : 'rgba(255, 255, 255, 0.12)'}`,
              color: activeTab === 'jukebox' ? '#10B981' : '#CBD5E1'
            }}
          >
            <Disc size={13} />
            <span>{isRu ? '💿 Плейлист Earth Jukebox (7 историй)' : '💿 Earth Jukebox Playlist (7 Stories)'}</span>
          </button>
        </div>
      </div>

      {/* 2. LAYER SELECTOR BUTTONS (Earth Now Dashboard #40509 Maps) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.32rem' }}>
        {visibleDatasets.map((ds) => {
          const globalIndex = DATASETS.findIndex((item) => item.id === ds.id);
          const isSelected = activeDataset.id === ds.id;
          const Icon = ICONS[ds.id] || CloudRain;
          return (
            <button
              key={ds.id}
              id={`btn-dataset-${ds.id}`}
              onClick={() => onSelectDataset(ds)}
              aria-pressed={isSelected}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.32rem 0.5rem',
                borderRadius: '6px',
                background: isSelected ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.03)',
                border: isSelected ? `2px solid ${ds.color}` : '1px solid rgba(255,255,255,0.08)',
                color: isSelected ? '#FFFFFF' : 'var(--text-muted)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.15s ease, background 0.15s ease'
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                background: `${ds.color}22`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: ds.color,
                flexShrink: 0
              }}>
                <Icon size={12} />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.6rem', color: ds.color, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  [{globalIndex + 1}] SVS #{ds.svsId}
                </div>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {isRu ? ds.name : ds.nameEn}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. ACTIVE TAB CONTENT */}
      {activeTab === 'music' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '0.6rem',
          background: 'rgba(6, 11, 22, 0.78)',
          padding: '0.65rem 0.8rem',
          borderRadius: '8px',
          border: '1px solid rgba(245, 158, 11, 0.22)'
        }}>
          {/* Column 1: Kazakh Instruments & Synthesizers from Chromophonia */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FBBF24', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{isRu ? 'КАЗАХСКИЕ ИНСТРУМЕНТЫ И СИНТЕЗАТОРЫ (ХРОМОФОНИЯ):' : 'CHROMOPHONIA INSTRUMENTS (KAZAKH & SYNTH):'}</span>
              <span style={{ fontSize: '0.66rem', color: 'var(--cyan-nasa)' }}>
                {isRu ? currentTimbreObj.subtitleRu : currentTimbreObj.subtitleEn}
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.28rem' }}>
              {Object.values(TIMBRES).map((t) => {
                const isSelected = timbre === t.id;
                const isKazakh = t.category === 'kazakh';
                return (
                  <button
                    key={t.id}
                    onClick={() => onChangeTimbre(t.id)}
                    style={{
                      padding: '0.24rem 0.52rem',
                      borderRadius: '5px',
                      fontSize: '0.7rem',
                      fontWeight: isSelected ? 800 : 600,
                      cursor: 'pointer',
                      background: isSelected
                        ? isKazakh
                          ? 'rgba(245, 158, 11, 0.28)'
                          : 'rgba(56, 189, 248, 0.25)'
                        : 'rgba(255, 255, 255, 0.04)',
                      border: `1px solid ${
                        isSelected
                          ? isKazakh
                            ? '#F59E0B'
                            : '#38BDF8'
                          : 'rgba(255, 255, 255, 0.1)'
                      }`,
                      color: isSelected ? '#FFFFFF' : isKazakh ? '#FDE68A' : '#BAE6FD'
                    }}
                  >
                    {isKazakh ? '🪕 ' : '🎹 '}
                    {isRu ? t.labelRu : t.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 2: Musical Scale + Intensity & Reverb Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--cyan-nasa)' }}>
                {isRu ? 'ЛАД (ГАММА):' : 'MUSICAL SCALE:'}
              </span>
              <select
                value={scaleMode}
                onChange={(e) => onChangeScaleMode(e.target.value)}
                style={{
                  background: '#0F172A',
                  color: '#FFFFFF',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  borderRadius: '5px',
                  padding: '0.2rem 0.5rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {Object.values(SCALES).map((sc) => (
                  <option key={sc.id} value={sc.id}>
                    {isRu ? sc.labelRu : sc.labelEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Music Intensity Slider + Live Sensor-Driven Intensity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.72rem', flexWrap: 'wrap' }}>
              <Sliders size={13} color="#F59E0B" />
              <span style={{ color: '#E2E8F0', fontWeight: 700, minWidth: '125px' }}>
                {isRu ? 'База / От датчика:' : 'Base / Sensor Live:'}{' '}
                <strong style={{ color: '#FBBF24' }}>{Math.round(musicIntensity * 100)}%</strong>
                {' → '}
                <strong style={{ color: '#10B981' }}>{liveSensorIntensityPct}%</strong>
              </span>
              <input
                type="range"
                min="0.3"
                max="2.0"
                step="0.05"
                value={musicIntensity}
                onChange={(e) => onChangeMusicIntensity(parseFloat(e.target.value))}
                style={{ flex: 1, accentColor: '#F59E0B', cursor: 'pointer' }}
              />
            </div>
            {mapThemeProfile && (
              <div style={{ fontSize: '0.65rem', color: '#94A3B8', display: 'flex', justifyContent: 'space-between' }}>
                <span>{isRu ? 'Тема карты:' : 'Map Theme:'}</span>
                <span style={{ color: '#FDE68A', fontWeight: 700 }}>
                  {isRu ? mapThemeProfile.scaleNameRu : mapThemeProfile.scaleNameEn}
                </span>
              </div>
            )}

            {/* Reverb Space Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.72rem' }}>
              <Volume2 size={13} color="var(--cyan-nasa)" />
              <span style={{ color: '#E2E8F0', fontWeight: 700, minWidth: '125px' }}>
                {isRu ? 'Эхо / Пространство:' : 'Space Reverb:'}{' '}
                <strong style={{ color: 'var(--cyan-nasa)' }}>{Math.round(reverbAmount * 100)}%</strong>
              </span>
              <input
                type="range"
                min="0"
                max="0.95"
                step="0.05"
                value={reverbAmount}
                onChange={(e) => onChangeReverbAmount(parseFloat(e.target.value))}
                style={{ flex: 1, accentColor: 'var(--cyan-nasa)', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Column 3: Live 8-Step Kui Sequencer + Computer Vision Pixel Note + Oscilloscope */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.7rem' }}>
              <span style={{ color: '#10B981', fontWeight: 800 }}>
                {activeMelody
                  ? `${isRu ? activeMelody.motifNameRu : activeMelody.motifNameEn} (${activeMelody.tempoBpm} BPM)`
                  : isRu
                  ? '8-шаговый кюй-секвенсор'
                  : '8-Step Kui Sequencer'}
              </span>
              {currentNote && (
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: currentNote.hex, display: 'inline-block', border: '1px solid #FFF' }} />
                  {currentNote.fullNote} ({currentNote.frequency} Hz | Hue {currentNote.hue}°)
                </span>
              )}
            </div>

            {/* 8-Step Melody Visual Steps */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '0.22rem' }}>
              {(activeMelody?.steps || []).map((st, idx) => {
                const isCurrent = idx === activeStepIdx && isAudioActive;
                return (
                  <div
                    key={idx}
                    style={{
                      padding: '0.2rem 0.1rem',
                      textAlign: 'center',
                      borderRadius: '4px',
                      fontSize: '0.66rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      background: isCurrent
                        ? activeDataset.color
                        : 'rgba(255, 255, 255, 0.05)',
                      color: isCurrent ? '#000000' : '#CBD5E1',
                      border: `1px solid ${isCurrent ? '#FFFFFF' : 'rgba(255,255,255,0.08)'}`
                    }}
                  >
                    {st.fullNote}
                  </div>
                );
              })}
            </div>

            {/* Live Oscilloscope Canvas */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Activity size={13} color="var(--cyan-nasa)" />
              <canvas
                ref={scopeCanvasRef}
                width={220}
                height={26}
                style={{
                  flex: 1,
                  height: '26px',
                  background: 'rgba(0, 0, 0, 0.45)',
                  borderRadius: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ALL 7 NASA METRICS AT THIS POINT ("посмотреть другие показатели") */}
      {activeTab === 'metrics' && (
        <div style={{
          background: 'rgba(6, 11, 22, 0.85)',
          padding: '0.65rem 0.85rem',
          borderRadius: '8px',
          border: '1px solid rgba(0, 242, 254, 0.28)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.45rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#FFFFFF' }}>
              {isRu
                ? `📊 Все ${DATASETS.length} показателей панели NASA Earth Now (#40509) в точке (${Math.abs(cursorCoords.lat).toFixed(1)}°, ${Math.abs(cursorCoords.lon).toFixed(1)}°):`
                : `📊 All ${DATASETS.length} NASA Earth Now (#40509) Metrics at Current Point (${Math.abs(cursorCoords.lat).toFixed(1)}°, ${Math.abs(cursorCoords.lon).toFixed(1)}°):`}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--cyan-nasa)' }}>
              {isRu ? 'Нажмите на любой показатель, чтобы переключить карту и музыку на него' : 'Click any metric to switch the map and music to it'}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.4rem' }}>
            {allMetricsHere.map((m) => {
              const isCurrent = m.id === activeDataset.id;
              const tObj = TIMBRES[m.recommendedTimbre] || TIMBRES.dombra;
              return (
                <div
                  key={m.id}
                  onClick={() => {
                    onSelectDataset(m.dataset);
                    onChangeTimbre(m.recommendedTimbre);
                  }}
                  style={{
                    padding: '0.45rem 0.65rem',
                    borderRadius: '7px',
                    background: isCurrent ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1.5px solid ${isCurrent ? m.color : 'rgba(255, 255, 255, 0.1)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.73rem', fontWeight: 700, color: '#FFFFFF' }}>
                    <span>{isRu ? m.nameRu : m.nameEn}</span>
                    <span style={{ color: m.color, fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                      {m.value} {m.unit}
                    </span>
                  </div>

                  {/* Intensity Bar */}
                  <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.max(6, m.intensityPercent)}%`, height: '100%', background: m.color }} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                    <span>{isRu ? `Интенсивность: ${m.intensityPercent}%` : `Intensity: ${m.intensityPercent}%`}</span>
                    <span style={{ color: '#FBBF24' }}>🪕 {isRu ? tObj.labelRu : tObj.labelEn}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: CURATED EARTH JUKEBOX PLAYLIST ("Curated Collection of Generated Audio Stories") */}
      {activeTab === 'jukebox' && (
        <div style={{
          background: 'rgba(6, 11, 22, 0.85)',
          padding: '0.65rem 0.85rem',
          borderRadius: '8px',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.45rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#10B981' }}>
              {isRu
                ? '💿 Музыкальная коллекция «Earth Jukebox» — 7 аудио-историй Земли на данных NASA EIC и Хромофонии:'
                : '💿 Curated Earth Jukebox Playlist — 7 Generative Audio Stories from NASA EIC & Chromophonia:'}
            </div>
            {activeJukeboxTrackId && (
              <button
                onClick={onStopJukeboxTrack}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '5px',
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid #EF4444',
                  color: '#FCA5A5',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Square size={11} />
                <span>{isRu ? 'Остановить трек' : 'Stop Track'}</span>
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.4rem' }}>
            {JUKEBOX_PLAYLIST.map((track) => {
              const isPlayingTrack = activeJukeboxTrackId === track.id;
              const tObj = TIMBRES[track.timbre] || TIMBRES.dombra;
              return (
                <div
                  key={track.id}
                  onClick={() => (isPlayingTrack ? onStopJukeboxTrack() : onPlayJukeboxTrack(track))}
                  style={{
                    padding: '0.48rem 0.65rem',
                    borderRadius: '7px',
                    background: isPlayingTrack ? 'rgba(16, 185, 129, 0.16)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1.5px solid ${isPlayingTrack ? '#10B981' : 'rgba(255, 255, 255, 0.1)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.22rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.3rem' }}>
                    <span style={{ fontSize: '0.73rem', fontWeight: 800, color: isPlayingTrack ? '#10B981' : '#FFFFFF' }}>
                      {isRu ? track.titleRu : track.titleEn}
                    </span>
                    <span style={{
                      padding: '0.15rem 0.4rem',
                      borderRadius: '4px',
                      background: isPlayingTrack ? '#10B981' : 'rgba(0, 242, 254, 0.14)',
                      color: isPlayingTrack ? '#000' : 'var(--cyan-nasa)',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      flexShrink: 0
                    }}>
                      {isPlayingTrack ? <Square size={10} /> : <Play size={10} />}
                      {isPlayingTrack ? (isRu ? 'Играет' : 'Playing') : (isRu ? 'Слушать' : 'Play')}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.67rem', color: '#94A3B8', lineHeight: '1.35' }}>
                    {isRu ? track.storyRu : track.storyEn}
                  </div>
                  <div style={{ fontSize: '0.64rem', color: '#FBBF24', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    🪕 {isRu ? tObj.labelRu : tObj.labelEn} | ⚡ {Math.round(track.intensity * 100)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
