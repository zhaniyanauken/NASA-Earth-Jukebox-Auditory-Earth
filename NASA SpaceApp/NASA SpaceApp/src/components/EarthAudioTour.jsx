import React, { useState, useEffect } from 'react';
import { Compass, Play, Pause, SkipForward, SkipBack, X, Volume2 } from 'lucide-react';
import { AUDIO_TOUR_STOPS, DATASETS } from '../data/nasaDatasets';
import { speechAssistant } from '../services/speechAssistant';

export default function EarthAudioTour({
  isOpen,
  onClose,
  onNavigateToPoint,
  onSelectDataset,
  language
}) {
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const isRu = Boolean(language && language.startsWith('ru'));

  const currentStop = AUDIO_TOUR_STOPS[currentStopIndex];

  // When stop changes, update coordinates and speech
  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      return;
    }

    const stop = AUDIO_TOUR_STOPS[currentStopIndex];
    if (stop) {
      // Find matching dataset
      const ds = DATASETS.find(d => d.id === stop.datasetId);
      if (ds) {
        onSelectDataset(ds);
      }

      // Convert lat/lon to 0..1
      const x = (stop.lon / 360) + 0.5;
      const y = 0.5 - (stop.lat / 180);

      onNavigateToPoint({
        lat: stop.lat,
        lon: stop.lon,
        x: Math.max(0, Math.min(1, x)),
        y: Math.max(0, Math.min(1, y))
      });

      // Speak narration
      const narration = isRu ? `${stop.titleRu}. ${stop.textRu}` : `${stop.titleEn}. ${stop.textEn}`;
      speechAssistant.speak(narration, true);
    }
  }, [currentStopIndex, isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    setCurrentStopIndex((prev) => (prev + 1) % AUDIO_TOUR_STOPS.length);
  };

  const handlePrev = () => {
    setCurrentStopIndex((prev) => (prev - 1 + AUDIO_TOUR_STOPS.length) % AUDIO_TOUR_STOPS.length);
  };

  const handleReplayVoice = () => {
    const narration = isRu ? `${currentStop.titleRu}. ${currentStop.textRu}` : `${currentStop.titleEn}. ${currentStop.textEn}`;
    speechAssistant.speak(narration, true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isRu ? 'Интерактивная звуковая экскурсия NASA' : 'NASA Interactive Audio Tour'}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '92%',
        maxWidth: '680px',
        zIndex: 90,
        boxShadow: '0 12px 50px rgba(0, 0, 0, 0.75)'
      }}
    >
      <div className="glass-panel" style={{ padding: '1rem 1.25rem', border: '2px solid var(--amber-nasa)' }}>
        
        {/* Top Header & Tour Tracker */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--amber-nasa)', fontWeight: 800, fontSize: '0.88rem' }}>
            <Compass size={18} />
            <span>{isRu ? 'АУДИО-ЭКСКУРСИЯ ПО ПЛАНЕТЕ' : 'EARTH SOUNDSCAPE TOUR'}</span>
            <span style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '0.1rem 0.5rem', borderRadius: '4px', fontSize: '0.74rem' }}>
              {currentStopIndex + 1} / {AUDIO_TOUR_STOPS.length}
            </span>
          </div>

          <button
            onClick={() => {
              speechAssistant.cancel();
              onClose();
            }}
            aria-label={isRu ? 'Закрыть экскурсию' : 'Close audio tour'}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.2rem' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Stop Content & Voice Text */}
        <div style={{ marginBottom: '0.85rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.35rem 0', color: '#FFFFFF' }}>
            {isRu ? currentStop.titleRu : currentStop.titleEn}
          </h3>
          <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
            {isRu ? currentStop.textRu : currentStop.textEn}
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '0.85rem' }}>
          {AUDIO_TOUR_STOPS.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentStopIndex(idx)}
              style={{
                flex: 1,
                height: '4px',
                borderRadius: '2px',
                backgroundColor: idx === currentStopIndex ? 'var(--amber-nasa)' : 'rgba(255,255,255,0.15)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              onClick={handlePrev}
              className="btn-nasa"
              aria-label={isRu ? 'Предыдущая локация' : 'Previous location'}
              style={{ padding: '0.45rem 0.75rem' }}
            >
              <SkipBack size={16} />
              <span>{isRu ? 'Назад' : 'Back'}</span>
            </button>
            <button
              onClick={handleNext}
              className="btn-nasa btn-nasa-primary"
              aria-label={isRu ? 'Следующая локация' : 'Next location'}
              style={{ padding: '0.45rem 0.9rem' }}
            >
              <span>{isRu ? 'Следующая точка' : 'Next Stop'}</span>
              <SkipForward size={16} />
            </button>
          </div>

          <button
            onClick={handleReplayVoice}
            className="btn-nasa"
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
            title={isRu ? 'Повторить аудиогид' : 'Replay narration'}
          >
            <Volume2 size={16} color="var(--cyan-nasa)" />
            <span>{isRu ? 'Повторить голос' : 'Replay Voice'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
