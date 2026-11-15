import React, { useState, useEffect } from 'react';
import { Volume2, Play, Pause, RotateCcw, Keyboard, Hand, Smartphone, Headphones, Globe, ArrowRight } from 'lucide-react';
import { speechAssistant } from '../services/speechAssistant';

export default function AudioWelcomeModal({
  isOpen,
  onStart,
  onClose
}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState('shortcuts');
  const [speechSpeed, setSpeechSpeed] = useState(1.0);
  const [startWithCamera, setStartWithCamera] = useState(false);

  useEffect(() => {
    speechAssistant.onSpeakingStateChange = (speaking) => {
      setIsPlayingAudio(speaking);
    };
    return () => {
      speechAssistant.onSpeakingStateChange = null;
    };
  }, []);

  if (!isOpen) return null;

  const handleTogglePlayInstruction = () => {
    if (isPlayingAudio) {
      speechAssistant.cancel();
      setIsPlayingAudio(false);
    } else {
      speechAssistant.setRate(speechSpeed);
      speechAssistant.speakFullInstruction();
      setIsPlayingAudio(true);
    }
  };

  const handleRestartInstruction = () => {
    speechAssistant.cancel();
    speechAssistant.setRate(speechSpeed);
    speechAssistant.speakFullInstruction();
    setIsPlayingAudio(true);
  };

  const handleSpeedChange = (speed) => {
    setSpeechSpeed(speed);
    speechAssistant.setRate(speed);
    if (isPlayingAudio) {
      speechAssistant.speak(`Speech speed: ${speed}x`, true, () => {
        speechAssistant.speakFullInstruction();
      });
    }
  };

  const handleEnterApp = () => {
    speechAssistant.cancel();
    onStart({ enableCamera: startWithCamera });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEnterApp();
    } else if (e.key === 'p' || e.key === 'P') {
      e.preventDefault();
      handleTogglePlayInstruction();
    }
  };

  const keyboardShortcuts = [
    {
      keys: ['←', '→'],
      title: 'Left & Right Arrows',
      desc: 'Fly along longitude (West / East). Audio shifts smoothly between left and right stereo channels across the Prime Meridian.'
    },
    {
      keys: ['↑', '↓'],
      title: 'Up & Down Arrows',
      desc: 'Fly along latitude (North / South). Pitch modulates from shimmering crystal highs in the Arctic to deep resonant bass in Antarctica.'
    },
    {
      keys: ['Spacebar'],
      title: 'Spacebar — Probe Point',
      desc: 'Spoken readout: Wally announces the geographic region, exact coordinates, and active NASA satellite reading.'
    },
    {
      keys: ['1', '2', '3', '4', '5', '6', '7'],
      title: 'Keys 1–7 — Fast NASA Layers',
      desc: '1: Temperature, 2: Wind Speed, 3: Precipitation, 4: Humidity, 5: PM2.5 Smoke, 6: Ozone O3, 7: Carbon Monoxide CO.'
    },
    {
      keys: ['C'],
      title: 'Key C — Hand Gesture Camera',
      desc: 'Toggle webcam tracking for contactless hand-gesture flight and map switching.'
    },
    {
      keys: ['M'],
      title: 'Key M — Sound Mute',
      desc: 'Mute or unmute sonification music. When muted, Wally remains fully audible when called.'
    },
    {
      keys: ['A'],
      title: 'Key A / Voice "Wally"',
      desc: 'Activate Wally AI voice assistant (or simply say "Wally" aloud into your microphone).'
    },
    {
      keys: ['I', 'H'],
      title: 'Key I or H — Audio Guide',
      desc: 'Replay spoken audio instructions or open the keyboard and accessibility guide.'
    },
    {
      keys: ['F'],
      title: 'Key F — Fullscreen Map',
      desc: 'Expand interactive Earth sound map to complete monitor view.'
    }
  ];

  const gestureItems = [
    {
      icon: '☝️',
      name: 'Index Finger Pointing',
      action: 'Auditory Map Navigation',
      desc: 'Point your index finger 40–70cm from the webcam. The sonic cursor and stereo panorama follow your finger with precision.'
    },
    {
      icon: '👋',
      name: 'Horizontal Hand Wave',
      action: 'Sequential Map Switching',
      desc: 'Decisively wave your open hand right or left to cycle through all NASA Earth Now maps in exact sequential queue order.'
    },
    {
      icon: '👌',
      name: 'Pinch (Thumb + Index)',
      action: 'Probe Location Telemetry',
      desc: 'Pinch thumb and index tips together to trigger an instant spoken coordinates and sensor reading report.'
    },
    {
      icon: '✊',
      name: 'Clenched Fist',
      action: 'Silence: Instantly stops speech',
      desc: 'Show a clenched fist in front of the camera. Wally stops speaking immediately.'
    },
    {
      icon: '🤙',
      name: 'Shaka Sign (Thumb + Pinky)',
      action: 'Voice Location Status',
      desc: 'Extend thumb and pinky to hear current coordinates and regional climate analysis.'
    },
    {
      icon: '👍',
      name: 'Thumbs Up',
      action: 'Activate Wally AI',
      desc: 'Give a thumbs up to open the voice dialog with Wally.'
    },
    {
      icon: '✌️',
      name: 'Peace Sign (Two Fingers)',
      action: 'Planetary Harmony Chime',
      desc: 'Raise index and middle fingers to trigger the celestial harmony chime.'
    }
  ];

  const touchItems = [
    {
      icon: '👆',
      name: 'Single Touch & Drag',
      action: 'Auditory Map Scanning',
      desc: 'Glide your finger across the touchscreen or laptop trackpad to continuously hear the sonified planetary landscape.'
    },
    {
      icon: '✌️',
      name: 'Double Tap',
      action: 'Probe Coordinate Point',
      desc: 'Double tap anywhere on the map to hear Wally speak the exact region and satellite measurement.'
    },
    {
      icon: '↔️',
      name: 'Two-Finger Swipe',
      action: 'Cycle NASA Datasets',
      desc: 'Swipe two fingers horizontally across the map to switch sequentially to the next scientific layer.'
    }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="NASA Earth Jukebox Audio and Visual Tutorial"
      onKeyDown={handleKeyDown}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(2, 6, 17, 0.94)',
        backdropFilter: 'blur(16px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        overflowY: 'auto'
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid var(--cyan-nasa)',
          boxShadow: '0 0 70px rgba(0, 242, 254, 0.35)',
          borderRadius: '16px',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at top, #0B192C 0%, #030814 100%)'
        }}
      >
        {/* Brand Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(0, 242, 254, 0.25)',
          background: 'rgba(10, 18, 32, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #00F2FE 0%, #0284C7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(0, 242, 254, 0.6)'
            }}>
              <Globe size={30} color="#040914" strokeWidth={2.4} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h1 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                  NASA Earth Jukebox — Auditory Earth
                </h1>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '0.15rem 0.5rem',
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid var(--emerald-nasa)',
                  color: 'var(--emerald-nasa)',
                  borderRadius: '20px',
                  fontWeight: 700
                }}>
                  ACCESSIBLE
                </span>
              </div>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: 'var(--cyan-nasa)' }}>
                Multisensory Exploration Guide for Blind & Low-Vision Explorers (NASA EIC SVS #40509)
              </p>
            </div>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Press Enter to begin exploration
          </div>
        </div>

        {/* Interactive Spoken Audio Player Bar */}
        <div style={{
          padding: '1rem 1.5rem',
          background: 'rgba(0, 242, 254, 0.08)',
          borderBottom: '1px solid rgba(0, 242, 254, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '280px' }}>
            <button
              onClick={handleTogglePlayInstruction}
              className={`btn-nasa ${isPlayingAudio ? 'btn-nasa-active' : 'btn-nasa-primary'}`}
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              aria-label={isPlayingAudio ? 'Pause audio guidance' : 'Play audio guidance (Key P)'}
            >
              {isPlayingAudio ? <Pause size={18} /> : <Play size={18} />}
              <span>{isPlayingAudio ? 'PAUSE AUDIO [P]' : 'PLAY AUDIO GUIDE [P]'}</span>
            </button>

            <button
              onClick={handleRestartInstruction}
              className="btn-nasa"
              style={{ padding: '0.65rem', fontSize: '0.85rem' }}
              title="Restart audio guide from beginning"
              aria-label="Restart audio guide"
            >
              <RotateCcw size={16} />
            </button>

            {isPlayingAudio && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '24px' }}>
                <span className="audio-bar" style={{ width: '4px', height: '14px', background: 'var(--cyan-nasa)', animation: 'pulse 0.7s infinite alternate' }} />
                <span className="audio-bar" style={{ width: '4px', height: '22px', background: 'var(--cyan-nasa)', animation: 'pulse 0.5s infinite alternate' }} />
                <span className="audio-bar" style={{ width: '4px', height: '10px', background: 'var(--cyan-nasa)', animation: 'pulse 0.9s infinite alternate' }} />
                <span style={{ fontSize: '0.78rem', color: 'var(--cyan-nasa)', fontWeight: 600, marginLeft: '0.3rem' }}>
                  Wally is speaking...
                </span>
              </div>
            )}
          </div>

          {/* Voice Speed Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginRight: '0.2rem' }}>
              Voice Speed:
            </span>
            {[1.0, 1.25, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className={`btn-nasa ${speechSpeed === speed ? 'btn-nasa-active' : ''}`}
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.78rem', minWidth: '42px' }}
                aria-label={`Speech rate ${speed}x`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(5, 11, 20, 0.7)',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => setActiveTab('shortcuts')}
            className={`tab-btn ${activeTab === 'shortcuts' ? 'tab-btn-active' : ''}`}
            style={{
              padding: '0.8rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.88rem',
              fontWeight: activeTab === 'shortcuts' ? 700 : 500,
              background: 'none',
              border: 'none',
              color: activeTab === 'shortcuts' ? 'var(--cyan-nasa)' : 'var(--text-muted)',
              borderBottom: activeTab === 'shortcuts' ? '3px solid var(--cyan-nasa)' : '3px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Keyboard size={18} />
            <span>1. Hotkeys</span>
          </button>

          <button
            onClick={() => setActiveTab('gestures')}
            className={`tab-btn ${activeTab === 'gestures' ? 'tab-btn-active' : ''}`}
            style={{
              padding: '0.8rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.88rem',
              fontWeight: activeTab === 'gestures' ? 700 : 500,
              background: 'none',
              border: 'none',
              color: activeTab === 'gestures' ? 'var(--emerald-nasa)' : 'var(--text-muted)',
              borderBottom: activeTab === 'gestures' ? '3px solid var(--emerald-nasa)' : '3px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Hand size={18} />
            <span>2. Camera Air-Gestures</span>
          </button>

          <button
            onClick={() => setActiveTab('touch')}
            className={`tab-btn ${activeTab === 'touch' ? 'tab-btn-active' : ''}`}
            style={{
              padding: '0.8rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.88rem',
              fontWeight: activeTab === 'touch' ? 700 : 500,
              background: 'none',
              border: 'none',
              color: activeTab === 'touch' ? 'var(--amber-nasa)' : 'var(--text-muted)',
              borderBottom: activeTab === 'touch' ? '3px solid var(--amber-nasa)' : '3px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Smartphone size={18} />
            <span>3. Touch / Trackpad</span>
          </button>

          <button
            onClick={() => setActiveTab('sound')}
            className={`tab-btn ${activeTab === 'sound' ? 'tab-btn-active' : ''}`}
            style={{
              padding: '0.8rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.88rem',
              fontWeight: activeTab === 'sound' ? 700 : 500,
              background: 'none',
              border: 'none',
              color: activeTab === 'sound' ? '#C084FC' : 'var(--text-muted)',
              borderBottom: activeTab === 'sound' ? '3px solid #C084FC' : '3px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Headphones size={18} />
            <span>4. Spatial Audio</span>
          </button>
        </div>

        {/* Tab Content Area (Scrollable) */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* TAB 1: KEYBOARD SHORTCUTS */}
          {activeTab === 'shortcuts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{
                background: 'rgba(0, 242, 254, 0.05)',
                border: '1px solid rgba(0, 242, 254, 0.2)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontSize: '0.85rem',
                color: 'var(--text-main)',
                lineHeight: '1.45'
              }}>
                <strong>Complete keyboard accessibility:</strong>{' '}
                All flight controls operate instantly without requiring mouse clicks. Every keystroke is confirmed via spatial audio and spoken feedback.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '0.65rem' }}>
                {keyboardShortcuts.map((sc, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '10px',
                      padding: '0.75rem 0.9rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                        {sc.keys.map((k, kIdx) => (
                          <kbd
                            key={kIdx}
                            style={{
                              background: 'rgba(0, 242, 254, 0.15)',
                              border: '1px solid var(--cyan-nasa)',
                              color: '#FFFFFF',
                              padding: '0.2rem 0.55rem',
                              borderRadius: '6px',
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              fontFamily: 'var(--font-mono)'
                            }}
                          >
                            {k}
                          </kbd>
                        ))}
                      </div>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--cyan-nasa)' }}>
                        {sc.title}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                      {sc.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CAMERA HAND GESTURES */}
          {activeTab === 'gestures' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid var(--emerald-nasa)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontSize: '0.85rem',
                color: 'var(--text-main)',
                lineHeight: '1.45'
              }}>
                <strong>Sequential Queue Switching:</strong>{' '}
                Wave your hand horizontally in front of the camera to advance through the NASA Earth Now Dashboard maps in strict sequential order. Show a clenched fist ✊ at any time to immediately silence Wally.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '0.65rem' }}>
                {gestureItems.map((g, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                      borderRadius: '10px',
                      padding: '0.75rem 0.9rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.85rem'
                    }}
                  >
                    <span style={{ fontSize: '1.8rem', lineHeight: '1' }}>{g.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--emerald-nasa)', marginBottom: '0.15rem' }}>
                        {g.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#FFFFFF', fontWeight: 600, marginBottom: '0.25rem' }}>
                        {g.action}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                        {g.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                background: 'rgba(0,0,0,0.4)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input
                    type="checkbox"
                    checked={startWithCamera}
                    onChange={(e) => setStartWithCamera(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--cyan-nasa)' }}
                  />
                  <span>Enable gesture camera immediately upon entering</span>
                </label>
              </div>
            </div>
          )}

          {/* TAB 3: TOUCH & TRACKPAD GESTURES */}
          {activeTab === 'touch' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid var(--amber-nasa)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontSize: '0.85rem',
                color: 'var(--text-main)',
                lineHeight: '1.45'
              }}>
                <strong>Tactile Touchscreen Navigation:</strong>{' '}
                Explore Earth with your fingertips on laptops with touchpads, iPads, or touchscreen displays.
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {touchItems.map((t, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(245, 158, 11, 0.25)',
                      borderRadius: '10px',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.85rem'
                    }}
                  >
                    <span style={{ fontSize: '1.8rem', lineHeight: '1' }}>{t.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--amber-nasa)', marginBottom: '0.15rem' }}>
                        {t.name} — <span style={{ color: '#FFFFFF' }}>{t.action}</span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                        {t.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AUDIO ORIENTATION */}
          {activeTab === 'sound' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{
                background: 'rgba(192, 132, 252, 0.08)',
                border: '1px solid #C084FC',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontSize: '0.85rem',
                color: 'var(--text-main)',
                lineHeight: '1.45'
              }}>
                <strong>Headphones Recommended:</strong>{' '}
                Binaural 3D audio translates longitude into stereo panorama and latitude into musical pitch registers.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '0.65rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '0.85rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--cyan-nasa)', marginBottom: '0.3rem', fontSize: '0.88rem' }}>
                    🎧 Stereo Longitude (West — East)
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                    Left ear represents the Western Hemisphere (Americas); Right ear represents the Eastern Hemisphere (Eurasia, Africa, Australia). Center is the Greenwich Meridian.
                  </div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '0.85rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--amber-nasa)', marginBottom: '0.3rem', fontSize: '0.88rem' }}>
                    🎼 Pitch Elevation (North — South)
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                    The North Pole sounds in crystal high pitches. Moving south shifts registers down to a deep resonant sub-bass over Antarctica.
                  </div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '0.85rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--emerald-nasa)', marginBottom: '0.3rem', fontSize: '0.88rem' }}>
                    🔔 Acoustic Earcons
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                    Crossing the Equator chimes a bell. Moving between ocean and land produces a percussive wooden click, and storms release rain acoustics.
                  </div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '0.85rem' }}>
                  <div style={{ fontWeight: 700, color: '#C084FC', marginBottom: '0.3rem', fontSize: '0.88rem' }}>
                    🤖 Wally Voice AI
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                    Address Wally by saying "Wally, [question]" or press Key [A]. Ask "Where am I?", "What is the temperature?", or "Explain the wind".
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Enter Button */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderTop: '1px solid rgba(0, 242, 254, 0.25)',
          background: 'rgba(10, 18, 32, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Replay this orientation anytime by pressing Key [I] or [H]
          </div>

          <button
            id="btn-enter-earth-jukebox"
            autoFocus
            onClick={handleEnterApp}
            className="btn-nasa btn-nasa-primary"
            style={{
              padding: '0.9rem 2rem',
              fontSize: '1.05rem',
              fontWeight: 800,
              borderRadius: '12px',
              letterSpacing: '0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 0 35px rgba(0, 242, 254, 0.6)'
            }}
            aria-label="Enter NASA Earth Jukebox (Press Enter)"
          >
            <Volume2 size={22} />
            <span>ENTER & EXPLORE EARTH [ENTER]</span>
            <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}
