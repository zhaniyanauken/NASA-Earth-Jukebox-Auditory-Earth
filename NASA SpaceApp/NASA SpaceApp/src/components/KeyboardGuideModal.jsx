import React from 'react';
import { HelpCircle, X, Keyboard, Hand, Headphones, Smartphone } from 'lucide-react';

export default function KeyboardGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Arrows (← →)', desc: 'Fly along longitude (West / East). Stereo panning shifts smoothly between left and right ear across Prime Meridian.' },
    { key: 'Arrows (↑ ↓)', desc: 'Fly along latitude (North / South). Pitch modulates from bright high treble in the North to deep resonant bass in the South.' },
    { key: 'Spacebar', desc: 'Probe current point: instant voice and telemetry report of coordinates, region name, and active NASA sensor readings.' },
    { key: 'Keys 1 - 7', desc: 'Quick switch between NASA climate layers (GPM Storms, Temperature, CO₂, NDVI Vegetation, Ocean SST, Fires, Night Lights).' },
    { key: 'Key C', desc: 'Toggle webcam hand and gesture tracking on / off.' },
    { key: 'Key M', desc: 'Mute / unmute audio sonification. When muted, background music stops and Wally speaks only when addressed.' },
    { key: 'Key A', desc: 'Open Wally AI voice assistant dialog or say "Wally".' },
    { key: 'Key I', desc: 'Replay complete spoken audio guide.' },
    { key: 'Key F', desc: 'Toggle fullscreen map mode.' },
    { key: 'Key H', desc: 'Open this help and controls guide.' }
  ];

  const gestures = [
    { name: '☝️ Index Finger', desc: 'Point and move finger in the air 40–70 cm from camera — audio probe cursor follows dynamically with stereo panning.' },
    { name: '👌 Pinch (Thumb + Index)', desc: 'Pinch index and thumb together — triggers an instant telemetry probe ping with spoken report.' },
    { name: '👋 Hand Wave (Left / Right)', desc: 'Wave your open palm left or right — sequentially cycles through NASA Earth Now maps in exact queue order.' },
    { name: '✊ Clenched Fist', desc: 'Immediately silences Wally AI voice assistant.' },
    { name: '🤙 Shaka (Thumb + Pinky)', desc: 'Announces current coordinates and geographical region.' },
    { name: '👍 Thumbs Up', desc: 'Activates microphone voice query for Wally.' },
    { name: '✌️ Peace Sign', desc: 'Plays harmonic planetary resonance chime.' }
  ];

  const touchGestures = [
    { name: '👆 Single Touch & Drag', desc: 'Real-time sonic scanning of Earth surface across longitude and latitude.' },
    { name: '✌️ Double Tap', desc: 'Probes current coordinates and speaks telemetry readout.' },
    { name: '↔️ Two-Finger Swipe', desc: 'Cycles NASA climate and observation datasets in sequential order.' }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="NASA Earth Jukebox Help and Accessibility Guide"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(2, 6, 17, 0.9)',
        backdropFilter: 'blur(12px)',
        zIndex: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="scientific-card"
        style={{
          width: '740px',
          maxWidth: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '16px',
          border: '1px solid rgba(0, 242, 254, 0.35)',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(2, 6, 23, 0.98))',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 242, 254, 0.15)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <HelpCircle size={24} color="var(--cyan-nasa)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
              Controls & Blind / Low-Vision Guide
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close help guide"
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          {/* Audio Orientation Guide */}
          <section style={{ background: 'rgba(0, 242, 254, 0.06)', border: '1px solid rgba(0, 242, 254, 0.25)', borderRadius: '10px', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--cyan-nasa)', fontWeight: 700, fontSize: '0.95rem' }}>
              <Headphones size={20} />
              <span>How to Listen to Earth (Audio Orientation)</span>
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-main)', lineHeight: '1.5', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div>• <strong>Stereo Headphones:</strong> Left Ear = Western Hemisphere (Americas); Right Ear = Eastern Hemisphere (Eurasia, Africa, Australia). Center = Greenwich Prime Meridian (0°).</div>
              <div>• <strong>Pitch Modulation:</strong> Flying North elevates the pitch to bright crystal tones. Flying South drops into deep resonant bass.</div>
              <div>• <strong>Acoustic Markers:</strong> Transitioning between ocean and land produces a wooden click; crossing the Equator chimes a bell.</div>
            </div>
          </section>

          {/* Keyboard Shortcuts */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem', color: 'var(--amber-nasa)', fontWeight: 700, fontSize: '0.95rem' }}>
              <Keyboard size={20} />
              <span>Keyboard Shortcuts</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {shortcuts.map((sc, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}
                >
                  <span style={{ fontSize: '0.82rem', color: '#E2E8F0', flex: 1 }}>{sc.desc}</span>
                  <kbd style={{
                    padding: '0.25rem 0.6rem',
                    borderRadius: '6px',
                    background: 'rgba(0, 242, 254, 0.12)',
                    border: '1px solid rgba(0, 242, 254, 0.35)',
                    color: 'var(--cyan-nasa)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    marginLeft: '1rem'
                  }}>
                    {sc.key}
                  </kbd>
                </div>
              ))}
            </div>
          </section>

          {/* Hand Gestures Guide */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem', color: '#10B981', fontWeight: 700, fontSize: '0.95rem' }}>
              <Hand size={20} />
              <span>Hand Gesture Controls (Key [C])</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {gestures.map((g, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}
                >
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#FFFFFF', minWidth: '220px' }}>{g.name}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', flex: 1 }}>{g.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Touch / Trackpad Controls */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem', color: '#EC4899', fontWeight: 700, fontSize: '0.95rem' }}>
              <Smartphone size={20} />
              <span>Touch / Trackpad Gestures</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {touchGestures.map((tg, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}
                >
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#FFFFFF', minWidth: '220px' }}>{tg.name}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', flex: 1 }}>{tg.desc}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            className="action-pill primary"
            style={{ padding: '0.5rem 1.4rem', fontSize: '0.88rem' }}
          >
            Got it (Close)
          </button>
        </div>
      </div>
    </div>
  );
}
