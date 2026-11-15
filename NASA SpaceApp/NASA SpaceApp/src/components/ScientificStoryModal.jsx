import React from 'react';
import { X, Globe, Music, Eye, Radio, Cpu, Heart } from 'lucide-react';
import { DATASETS, EARTH_NOW_DASHBOARD_META, MEDIA_GROUPS } from '../data/nasaDatasets';
import { TIMBRES } from '../services/chromophoniaMusic';

export default function ScientificStoryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Earth Jukebox Science & Sonification Story"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(3, 6, 14, 0.88)',
        backdropFilter: 'blur(10px)',
        zIndex: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div
        className="scientific-card"
        style={{
          width: '920px',
          maxWidth: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          border: '1.5px solid var(--cyan-nasa)',
          borderRadius: '14px',
          background: '#080E1C',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.9)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1rem 1.4rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(15, 23, 42, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: 'rgba(0, 242, 254, 0.15)',
              border: '1px solid var(--cyan-nasa)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cyan-nasa)'
            }}>
              <Globe size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.08rem', fontWeight: 800, color: '#FFFFFF' }}>
                NASA SVS #40509 "Earth Now Dashboard" × Chromophonia
              </h2>
              <div style={{ fontSize: '0.75rem', color: 'var(--cyan-nasa)', marginTop: '0.15rem' }}>
                Official NASA Scientific Visualization Studio Gallery #40509 ({DATASETS.length} Visualizations across 5 Media Groups)
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.3rem' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{ padding: '1.25rem 1.4rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.1rem', fontSize: '0.84rem', lineHeight: '1.55', color: '#E2E8F0' }}>

          {/* 1. Official NASA SVS #40509 Earth Now Dashboard Overview */}
          <section style={{ background: 'rgba(0, 242, 254, 0.05)', border: '1px solid rgba(0, 242, 254, 0.2)', borderRadius: '10px', padding: '0.9rem 1.1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--cyan-nasa)', fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.4rem' }}>
              <Heart size={17} />
              <span>1. NASA Earth Now Dashboard Overview (ID #40509, Media Group #372477)</span>
            </div>
            <p style={{ margin: 0, color: '#CBD5E1', whiteSpace: 'pre-line' }}>
              {EARTH_NOW_DASHBOARD_META.description.trim()}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.5rem', marginTop: '0.75rem' }}>
              {EARTH_NOW_DASHBOARD_META.overview_stages.map((st) => (
                <div key={st.id} style={{ background: 'rgba(0,0,0,0.45)', borderRadius: '7px', padding: '0.4rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={st.localUrl} alt={st.title} style={{ width: '100%', height: '82px', objectFit: 'cover', borderRadius: '5px', display: 'block' }} />
                  <div style={{ fontSize: '0.68rem', color: '#E2E8F0', fontWeight: 700, marginTop: '0.3rem', textAlign: 'center' }}>
                    {st.title}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 2. The 5 Official Media Groups from JSON */}
          <section style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '0.9rem 1.1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F59E0B', fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.5rem' }}>
              <Cpu size={17} />
              <span>2. The 5 Official Media Groups in Earth Now Dashboard (#40509)</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {MEDIA_GROUPS.map((grp) => (
                <div key={grp.id} style={{ background: 'rgba(0,0,0,0.35)', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontWeight: 800, color: '#38BDF8', fontSize: '0.82rem' }}>
                    {grp.title} <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>(#media_group_{grp.id})</span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#CBD5E1', marginTop: '0.2rem' }}>
                    {grp.description}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Chromophonia Instruments (Kazakh Traditional + Synthesizers) */}
          <section style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '0.9rem 1.1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10B981', fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.5rem' }}>
              <Music size={17} />
              <span>3. Chromophonia Sound Palette: 5 Kazakh Traditional Instruments & 4 Synthesizers</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.5rem' }}>
              {Object.values(TIMBRES).map((t) => (
                <div key={t.id} style={{ padding: '0.5rem 0.65rem', borderRadius: '7px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontWeight: 700, color: t.category === 'kazakh' ? '#FBBF24' : '#38BDF8', fontSize: '0.8rem' }}>
                    {t.labelEn}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.15rem' }}>
                    {t.subtitleEn}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Active NASA SVS #40509 Visualizations */}
          <section style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '0.9rem 1.1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38BDF8', fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.5rem' }}>
              <Radio size={17} />
              <span>4. Active NASA SVS #40509 Earth Now Visualizations ({DATASETS.length} Maps)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.5rem' }}>
              {DATASETS.map((ds, idx) => (
                <div key={ds.id} style={{ padding: '0.55rem 0.75rem', borderRadius: '7px', background: 'rgba(0,0,0,0.35)', borderLeft: `3px solid ${ds.color}` }}>
                  <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.78rem' }}>
                    [{idx + 1}] {ds.nameEn}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: ds.color, fontFamily: 'var(--font-mono)' }}>
                    {ds.source} • {ds.filename}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Blind & Low-Vision Accessibility Architecture */}
          <section style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '10px', padding: '0.9rem 1.1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10B981', fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.35rem' }}>
              <Eye size={17} />
              <span>5. Comprehensive Blind & Low-Vision Accessibility</span>
            </div>
            <div style={{ fontSize: '0.79rem', color: '#CBD5E1' }}>
              • Hands-free voice assistant "Wally" (always listening for "Wally"). • Instant speech silence via clenched fist gesture ✊. • Hand wave cycles through NASA Earth Now maps in strict sequential queue order. • Full screen-reader compatibility and WCAG AAA High-Contrast mode.
            </div>
          </section>

        </div>

        {/* Footer */}
        <div style={{
          padding: '0.85rem 1.4rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(15, 23, 42, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            NASA Space Apps Challenge — Earth Jukebox × Chromophonia
          </span>
          <button
            onClick={onClose}
            className="btn-scientific btn-scientific-primary"
            style={{ padding: '0.5rem 1.4rem', fontWeight: 700 }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
