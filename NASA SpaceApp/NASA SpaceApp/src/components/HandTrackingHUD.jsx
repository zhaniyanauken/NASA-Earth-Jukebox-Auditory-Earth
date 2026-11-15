import React, { useRef, useEffect } from 'react';
import { Camera, X } from 'lucide-react';
import { GestureTracker } from '../services/gestureTracker';

export default function HandTrackingHUD({
  isActive,
  onClose,
  onGestureUpdate,
  detectedGesture,
  language
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const trackerRef = useRef(null);
  const isRu = Boolean(language && language.startsWith('ru'));

  useEffect(() => {
    if (trackerRef.current) {
      trackerRef.current.onGestureUpdate = onGestureUpdate;
    }
  }, [onGestureUpdate]);

  useEffect(() => {
    if (!isActive) {
      if (trackerRef.current) {
        trackerRef.current.stop();
        trackerRef.current = null;
      }
      return;
    }

    const initTracker = async () => {
      try {
        if (!videoRef.current || !canvasRef.current) return;
        const tracker = new GestureTracker(
          videoRef.current,
          canvasRef.current,
          onGestureUpdate
        );
        trackerRef.current = tracker;
        await tracker.start();
      } catch (err) {
        console.error('Hand tracking init error:', err);
      }
    };

    initTracker();

    return () => {
      if (trackerRef.current) {
        trackerRef.current.stop();
        trackerRef.current = null;
      }
    };
  }, [isActive]);

  if (!isActive) return null;

  const getGestureInfo = (g) => {
    switch (g) {
      case 'POINTING':
        return {
          icon: '☝️',
          title: 'Index: Navigation',
          desc: 'Move finger to steer cursor'
        };
      case 'PINCH':
      case 'PINCH_TRIGGER':
        return {
          icon: '👌',
          title: 'Pinch: Probe Point',
          desc: 'Index & thumb pinch'
        };
      case 'FIST':
        return {
          icon: '✊',
          title: 'Fist: Silence Wally',
          desc: 'Immediately silences speech'
        };
      case 'SWIPE_RIGHT':
        return {
          icon: '👋',
          title: 'Wave Right: Next Map in Queue',
          desc: 'Advances to next map'
        };
      case 'SWIPE_LEFT':
        return {
          icon: '👋',
          title: 'Wave Left: Previous Map',
          desc: 'Returns to previous map'
        };
      case 'THUMBS_UP':
        return {
          icon: '👍',
          title: 'Thumbs Up: Wally AI',
          desc: 'Activate voice assistant'
        };
      case 'SHAKA':
        return {
          icon: '🤙',
          title: 'Shaka: Audio Status',
          desc: 'Thumb & pinky extended'
        };
      case 'PEACE':
        return {
          icon: '✌️',
          title: 'Peace: Harmony Chime',
          desc: 'Two fingers up'
        };
      default:
        return {
          icon: '✋',
          title: 'Awaiting Hand...',
          desc: 'Show hand 40-70cm from camera'
        };
    }
  };

  const gestureInfo = getGestureInfo(detectedGesture);

  return (
    <div
      className="scientific-card"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '270px',
        padding: '0.65rem',
        zIndex: 50,
        boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
        border: '1.5px solid var(--cyan-nasa)',
        borderRadius: '8px'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--cyan-nasa)' }}>
          <Camera size={14} />
          <span>GESTURE TRACKER</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close panel"
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.2rem' }}
        >
          <X size={15} />
        </button>
      </div>

      {/* Video & Skeleton Viewport */}
      <div style={{ position: 'relative', width: '100%', height: '150px', borderRadius: '6px', overflow: 'hidden', background: '#000000', border: '1px solid rgba(255,255,255,0.1)' }}>
        <video
          ref={videoRef}
          playsInline
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scaleX(-1)'
          }}
        />
        <canvas
          ref={canvasRef}
          width={240}
          height={150}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        />

        {/* Live Gesture Pill */}
        <div
          style={{
            position: 'absolute',
            bottom: '6px',
            left: '6px',
            right: '6px',
            background: 'rgba(7, 11, 20, 0.92)',
            borderRadius: '4px',
            padding: '0.3rem 0.5rem',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem'
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>{gestureInfo.icon}</span>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {gestureInfo.title}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {gestureInfo.desc}
            </div>
          </div>
        </div>
      </div>

      {/* Quick instructions */}
      <div style={{ marginTop: '0.4rem', fontSize: '0.68rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
        <div>• <strong>Index Finger:</strong> navigate map with spatial audio</div>
        <div>• <strong>Wave Hand:</strong> switch maps in sequential queue order</div>
        <div>• <strong>Clenched Fist:</strong> immediately silence Wally</div>
      </div>

    </div>
  );
}
