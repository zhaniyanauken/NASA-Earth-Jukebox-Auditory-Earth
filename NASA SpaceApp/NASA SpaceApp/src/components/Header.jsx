import React from 'react';
import { Camera, CameraOff, Globe, Bot, BookOpen, HelpCircle, Eye, Volume2, VolumeX } from 'lucide-react';
import { DATASETS } from '../data/nasaDatasets';

export default function Header({
  isCameraActive,
  onToggleCamera,
  isAudioActive,
  onToggleAudio,
  onOpenAssistant,
  onOpenStory,
  onOpenHelp,
  highContrast,
  onToggleHighContrast,
  liveEventsCount = 0
}) {
  return (
    <header className="standard-header">
      <div style={{
        maxWidth: '1500px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.55rem 1.15rem',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        
        {/* Brand & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '7px',
            background: 'linear-gradient(135deg, #0284C7 0%, #0F172A 100%)',
            border: '1px solid var(--cyan-nasa)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#38BDF8'
          }}>
            <Globe size={18} strokeWidth={2} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.02rem', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.01em' }}>
              NASA Earth Jukebox
            </span>
            <span style={{
              background: 'rgba(0, 242, 254, 0.12)',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              color: 'var(--cyan-nasa)',
              fontSize: '0.68rem',
              padding: '0.12rem 0.48rem',
              borderRadius: '4px',
              fontWeight: 700
            }}>
              × Chromophonia
            </span>
            <span style={{
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#10B981',
              fontSize: '0.66rem',
              padding: '0.12rem 0.45rem',
              borderRadius: '4px',
              fontWeight: 700
            }}>
              🛰️ {DATASETS.length} Active Maps • NASA SVS #40509 Earth Now Dashboard
            </span>
          </div>
        </div>

        {/* Right side controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          
          {/* Audio Mute/Unmute Toggle */}
          <button
            onClick={onToggleAudio}
            className="header-cam-btn"
            style={{
              background: isAudioActive ? 'rgba(16, 185, 129, 0.18)' : 'rgba(255, 255, 255, 0.06)',
              border: `1px solid ${isAudioActive ? '#10B981' : 'rgba(255, 255, 255, 0.15)'}`,
              color: isAudioActive ? '#10B981' : '#FFFFFF'
            }}
            title="Toggle Audio Sonification [M]"
          >
            {isAudioActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span>{isAudioActive ? 'Audio On' : 'Muted'}</span>
          </button>

          {/* Wally AI Assistant Button */}
          <button
            onClick={onOpenAssistant}
            className="header-cam-btn"
            style={{
              background: 'rgba(0, 242, 254, 0.12)',
              border: '1px solid rgba(0, 242, 254, 0.35)',
              color: 'var(--cyan-nasa)'
            }}
            title="Wally Voice AI Assistant [A]"
          >
            <Bot size={15} />
            <span>Wally AI</span>
          </button>

          {/* Science & Sonification Story Modal */}
          <button
            onClick={onOpenStory}
            className="header-cam-btn"
            style={{
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              color: '#FBBF24'
            }}
            title="Science & Sonification Story"
          >
            <BookOpen size={15} />
            <span>Science & Story</span>
          </button>

          {/* High Contrast Accessibility Toggle */}
          <button
            onClick={onToggleHighContrast}
            className="header-cam-btn"
            style={{
              background: highContrast ? '#FFD700' : 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: highContrast ? '#000000' : '#FFFFFF'
            }}
            title="High Contrast Mode (Low-Vision A11y)"
          >
            <Eye size={15} />
            <span>A11y</span>
          </button>

          {/* Help & Gestures Guide */}
          <button
            onClick={onOpenHelp}
            className="header-cam-btn"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF'
            }}
            title="Gestures & Shortcuts Guide [H]"
          >
            <HelpCircle size={15} />
            <span>Help</span>
          </button>

          {/* Camera Toggle */}
          <button
            id="btn-toggle-camera"
            className={`header-cam-btn ${isCameraActive ? 'header-cam-btn-active' : ''}`}
            onClick={onToggleCamera}
            title="Toggle Gesture Camera [C]"
            aria-label="Toggle Gesture Camera"
          >
            {isCameraActive ? <Camera size={16} /> : <CameraOff size={16} />}
            <span>{isCameraActive ? 'Camera On' : 'Camera'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
