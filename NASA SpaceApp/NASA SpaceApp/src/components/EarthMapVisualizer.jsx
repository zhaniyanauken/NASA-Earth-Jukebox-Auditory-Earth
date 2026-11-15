import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  Layers,
  MapPin,
  Radio,
  Wifi,
  WifiOff,
  ChevronLeft,
  ChevronRight,
  Move,
  PlusCircle,
  RotateCcw,
  Play,
  Pause,
  Upload,
  Eye,
  Compass,
  Calendar
} from 'lucide-react';
import {
  DATASETS,
  getNasaGibsWmsUrl,
  HOTSPOTS_BY_DATASET,
  FRAME_TIMELINE_DATES
} from '../data/nasaDatasets';
import { deriveScientificRgb, rgbToHex, rgbToHsl } from '../services/chromophoniaMusic';

export default function EarthMapVisualizer({
  activeDataset,
  onSelectDataset,
  cursorCoords, // { lat, lon, x, y }
  currentValue,
  regionInfo,
  onMapClick,
  language,
  onProbePoint,
  isFullscreen,
  customHotspotsByDataset,
  onUpdateHotspotPosition,
  onAddCustomHotspot,
  onResetHotspots,
  liveEonetEvents = [],
  onOpenAllMetrics,
  onPixelSampled
}) {
  const mapContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const cvCanvasRef = useRef(null);

  const [useWmsLayer, setUseWmsLayer] = useState(true);
  const [isFramePlaying, setIsFramePlaying] = useState(false);
  const [isEditPointsMode, setIsEditPointsMode] = useState(false);
  const [selectedHotspotId, setSelectedHotspotId] = useState(null);
  const [draggingHotspotId, setDraggingHotspotId] = useState(null);
  const [customFrameUrl, setCustomFrameUrl] = useState(null);
  const [customFrameName, setCustomFrameName] = useState('');

  const isRu = Boolean(language && language.startsWith('ru'));

  // Dataset index (1 to 18 in NASA SVS #40509 Earth Now Dashboard)
  const datasetIndex = Math.max(0, DATASETS.findIndex((d) => d.id === activeDataset.id));
  const totalMaps = DATASETS.length;

  // Combine dataset hotspots (with user-relocated positions) + live SVS anomaly pins for this layer
  const baseHotspots =
    (customHotspotsByDataset && customHotspotsByDataset[activeDataset.id]) ||
    HOTSPOTS_BY_DATASET[activeDataset.id] ||
    [];
  const matchingEonet = liveEonetEvents.filter((ev) => ev.datasetId === activeDataset.id);
  const activeHotspots = [...baseHotspots, ...matchingEonet];

  // Ensure a valid selectedHotspotId when switching layers
  useEffect(() => {
    if (activeHotspots.length > 0) {
      setSelectedHotspotId(activeHotspots[0].id);
    } else {
      setSelectedHotspotId(null);
    }
  }, [activeDataset.id]);

  // Animated Earth Now Dashboard Hyperwall Sequence Player
  useEffect(() => {
    if (!isFramePlaying) return;
    const timer = setInterval(() => {
      const nextIdx = (datasetIndex + 1) % DATASETS.length;
      const nextDs = DATASETS[nextIdx];
      onSelectDataset(nextDs);
      const nextSpots = HOTSPOTS_BY_DATASET[nextDs.id] || [];
      if (nextSpots.length > 0) {
        const sp = nextSpots[0];
        onMapClick({
          lat: sp.lat,
          lon: sp.lon,
          x: sp.lon / 360 + 0.5,
          y: 0.5 - sp.lat / 180
        });
      }
    }, 3200);
    return () => clearInterval(timer);
  }, [isFramePlaying, datasetIndex, onSelectDataset, onMapClick]);

  // Computer Vision Pixel Sampler (draws official NASA SVS #40509 image to offscreen canvas and reads RGB + pixel density)
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = customFrameUrl || activeDataset.localImage;
    img.onload = () => {
      let canvas = cvCanvasRef.current;
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        cvCanvasRef.current = canvas;
      }
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };
  }, [activeDataset.id, activeDataset.localImage, customFrameUrl]);

  // Sample pixel RGB + spatial contrast density from the active NASA SVS #40509 visualization whenever cursor moves
  useEffect(() => {
    if (!onPixelSampled) return;
    const sciRgb = deriveScientificRgb(
      activeDataset.id,
      currentValue,
      activeDataset.min,
      activeDataset.max,
      regionInfo.isLand
    );

    let finalRgb = sciRgb;
    let pixelDensity = 0.5;

    const canvas = cvCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        try {
          const px = Math.max(1, Math.min(canvas.width - 2, Math.floor(cursorCoords.x * canvas.width)));
          const py = Math.max(1, Math.min(canvas.height - 2, Math.floor(cursorCoords.y * canvas.height)));
          const patch = ctx.getImageData(px - 1, py - 1, 3, 3).data;
          const centerR = patch[16];
          const centerG = patch[17];
          const centerB = patch[18];

          // Compute local spatial pixel contrast density across 3x3 neighborhood
          let varianceSum = 0;
          for (let i = 0; i < patch.length; i += 4) {
            varianceSum +=
              Math.abs(patch[i] - centerR) +
              Math.abs(patch[i + 1] - centerG) +
              Math.abs(patch[i + 2] - centerB);
          }
          pixelDensity = Math.min(1, varianceSum / (9 * 180));

          // Use real RGB pixels directly from the official NASA SVS #40509 visualization image
          // (falling back to scientific palette only over pure black unweighted margins)
          const isPureBlackMargin = centerR < 8 && centerG < 8 && centerB < 12 && activeDataset.id !== 'wv_blackmarble';
          if (customFrameUrl || !isPureBlackMargin) {
            finalRgb = { r: centerR, g: centerG, b: centerB };
          } else {
            finalRgb = sciRgb;
          }
        } catch (e) {}
      }
    }

    onPixelSampled(finalRgb, pixelDensity);
  }, [cursorCoords.x, cursorCoords.y, activeDataset, currentValue, regionInfo.isLand, customFrameUrl, onPixelSampled]);

  // Convert click/touch to Equirectangular coordinates (EPSG:4326)
  const handlePointerInteraction = useCallback(
    (e) => {
      if (!mapContainerRef.current) return;
      const rect = mapContainerRef.current.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

      const lon = Math.round(((x - 0.5) * 360) * 10) / 10;
      const lat = Math.round(((0.5 - y) * 180) * 10) / 10;

      // If dragging a hotspot or in "Move Point Mode", relocate the active hotspot!
      if ((draggingHotspotId || isEditPointsMode) && selectedHotspotId && onUpdateHotspotPosition) {
        const targetId = draggingHotspotId || selectedHotspotId;
        onUpdateHotspotPosition(activeDataset.id, targetId, lat, lon);
      }

      onMapClick({
        x: Math.round(x * 1000) / 1000,
        y: Math.round(y * 1000) / 1000,
        lat,
        lon
      });
    },
    [onMapClick, draggingHotspotId, isEditPointsMode, selectedHotspotId, activeDataset.id, onUpdateHotspotPosition]
  );

  // Cycle Previous / Next Map Layer
  const handlePrevMap = () => {
    const prevIdx = (datasetIndex - 1 + totalMaps) % totalMaps;
    onSelectDataset(DATASETS[prevIdx]);
  };
  const handleNextMap = () => {
    const nextIdx = (datasetIndex + 1) % totalMaps;
    onSelectDataset(DATASETS[nextIdx]);
  };

  // Cycle Previous / Next Hotspot Point on current map
  const handleCycleHotspot = (dir) => {
    if (activeHotspots.length === 0) return;
    const curIdx = activeHotspots.findIndex((s) => s.id === selectedHotspotId);
    const nextIdx = (curIdx + dir + activeHotspots.length) % activeHotspots.length;
    const spot = activeHotspots[nextIdx];
    setSelectedHotspotId(spot.id);
    onMapClick({
      lat: spot.lat,
      lon: spot.lon,
      x: spot.lon / 360 + 0.5,
      y: 0.5 - spot.lat / 180
    });
  };

  // Handle Custom EIC Frame Image Upload
  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCustomFrameUrl(url);
    setCustomFrameName(file.name);
  };

  const cursorSvgX = cursorCoords.x * 1000;
  const cursorSvgY = cursorCoords.y * 500;

  const stereoPan = (cursorCoords.x - 0.5) * 2;
  const panPercent = Math.round(((stereoPan + 1) / 2) * 100);

  const baseMapSrc = customFrameUrl ? customFrameUrl : activeDataset.localImage;
  const isAspectPreserved =
    !customFrameUrl &&
    activeDataset.projection &&
    activeDataset.projection !== 'equirectangular' &&
    !useWmsLayer;

  return (
    <div
      className="scientific-card"
      style={
        isFullscreen
          ? {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 99,
              borderRadius: 0,
              padding: '0.75rem 1.15rem',
              display: 'flex',
              flexDirection: 'column',
              background: '#070B14'
            }
          : {
              position: 'relative',
              overflow: 'hidden',
              padding: '0.65rem 0.95rem',
              flex: '1 1 auto',
              minHeight: '390px',
              display: 'flex',
              flexDirection: 'column'
            }
      }
    >
      {/* 1. TOP MAP HUD BAR: Map Counter (1 of 7), NASA Source, Live WMS Toggle, Telemetry */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        
        {/* Left: Map X of 7 Switcher + Active Layer Name + Live GIBS Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          {/* Map Counter & Prev/Next Buttons */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            borderRadius: '6px',
            padding: '0.2rem 0.4rem'
          }}>
            <button
              onClick={handlePrevMap}
              title={isRu ? 'Предыдущая карта NASA' : 'Previous NASA Map'}
              style={{ background: 'none', border: 'none', color: 'var(--cyan-nasa)', cursor: 'pointer', display: 'flex', padding: '2px' }}
            >
              <ChevronLeft size={15} />
            </button>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono)', padding: '0 0.25rem' }}>
              {isRu ? `КАРТА ${datasetIndex + 1} / ${totalMaps}` : `MAP ${datasetIndex + 1} / ${totalMaps}`}
            </span>
            <button
              onClick={handleNextMap}
              title={isRu ? 'Следующая карта NASA' : 'Next NASA Map'}
              style={{ background: 'none', border: 'none', color: 'var(--cyan-nasa)', cursor: 'pointer', display: 'flex', padding: '2px' }}
            >
              <ChevronRight size={15} />
            </button>
          </div>

          {/* Active Layer Badge + Official SVS ID */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.7rem',
            borderRadius: '6px',
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            border: `1.5px solid ${activeDataset.color}`,
            color: activeDataset.color,
            fontSize: '0.82rem',
            fontWeight: 700
          }}>
            <Radio size={13} />
            <span>{isRu ? activeDataset.name : activeDataset.nameEn}</span>
            <span style={{
              fontSize: '0.66rem',
              padding: '0.08rem 0.35rem',
              borderRadius: '4px',
              background: 'rgba(255,255,255,0.08)',
              color: '#E2E8F0',
              fontFamily: 'var(--font-mono)'
            }}>
              SVS #{activeDataset.svsId}
            </span>
          </div>

          {/* Map Observation Date Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.3rem 0.6rem',
              borderRadius: '6px',
              background: 'rgba(0, 242, 254, 0.12)',
              border: '1px solid rgba(0, 242, 254, 0.35)',
              color: '#00F2FE',
              fontSize: '0.72rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)'
            }}
            title="NASA Map Observation Date"
          >
            <Calendar size={12} />
            <span>DATE: {activeDataset.time || '2023-08-15'}</span>
          </div>

          {/* Earth Now Dashboard Media Group Badge */}
          <button
            onClick={() => setUseWmsLayer(!useWmsLayer)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.3rem 0.55rem',
              borderRadius: '6px',
              background: 'rgba(16, 185, 129, 0.14)',
              border: '1px solid #10B981',
              color: '#10B981',
              fontSize: '0.7rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
            title={isRu ? 'Официальные данные NASA SVS #40509 Earth Now Dashboard' : 'Official NASA SVS #40509 Earth Now Dashboard'}
          >
            <Wifi size={12} />
            <span>{isRu ? activeDataset.groupTitleRu : activeDataset.groupTitle}</span>
          </button>

          {/* Upload Custom EIC Visual Frame */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <button
            onClick={() => (customFrameUrl ? setCustomFrameUrl(null) : fileInputRef.current?.click())}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.3rem 0.55rem',
              borderRadius: '6px',
              background: customFrameUrl ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${customFrameUrl ? '#F59E0B' : 'rgba(255,255,255,0.15)'}`,
              color: customFrameUrl ? '#FBBF24' : 'var(--text-muted)',
              fontSize: '0.7rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            title={isRu ? 'Загрузить свой визуальный кадр NASA EIC для сонификации цветов' : 'Upload custom NASA EIC visual frame to sonify pixel colors'}
          >
            <Upload size={12} />
            <span>
              {customFrameUrl
                ? (isRu ? `Сбросить кадр (${customFrameName.slice(0, 10)})` : `Reset Frame (${customFrameName.slice(0, 10)})`)
                : (isRu ? 'Свой кадр EIC' : 'Upload EIC Frame')}
            </span>
          </button>
        </div>

        {/* Right: Stereo Pan + Region Name + Coordinates + Value + All Metrics Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
          {/* Stereo Longitude Channel */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'rgba(0,0,0,0.45)',
              padding: '0.26rem 0.5rem',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.08)',
              fontSize: '0.7rem'
            }}
          >
            <span style={{ color: 'var(--cyan-nasa)', fontWeight: 700 }}>{isRu ? 'Л (Зап)' : 'L (W)'}</span>
            <div style={{ width: '34px', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '-3px',
                left: `${panPercent}%`,
                transform: 'translateX(-50%)',
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: 'var(--cyan-nasa)'
              }} />
            </div>
            <span style={{ color: 'var(--cyan-nasa)', fontWeight: 700 }}>{isRu ? 'П (Вост)' : 'R (E)'}</span>
          </div>

          {/* Region Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(0,0,0,0.5)', padding: '0.26rem 0.6rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <MapPin size={13} color="var(--cyan-nasa)" />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FFFFFF' }}>
              {isRu ? regionInfo.nameRu : regionInfo.nameEn}
            </span>
          </div>

          {/* Exact Coordinates */}
          <div style={{ fontSize: '0.76rem', color: 'var(--cyan-nasa)', fontFamily: 'var(--font-mono)', fontWeight: 700, background: 'rgba(0,0,0,0.4)', padding: '0.26rem 0.5rem', borderRadius: '6px', border: '1px solid rgba(0, 242, 254, 0.25)' }}>
            {Math.abs(cursorCoords.lat).toFixed(1)}°{cursorCoords.lat >= 0 ? (isRu ? 'с.ш.' : 'N') : (isRu ? 'ю.ш.' : 'S')},{' '}
            {Math.abs(cursorCoords.lon).toFixed(1)}°{cursorCoords.lon >= 0 ? (isRu ? 'в.д.' : 'E') : (isRu ? 'з.д.' : 'W')}
          </div>

          {/* Real-time Value */}
          <div style={{
            fontSize: '0.82rem',
            fontWeight: 800,
            color: activeDataset.color,
            padding: '0.24rem 0.65rem',
            background: 'rgba(0,0,0,0.65)',
            borderRadius: '6px',
            border: `1.5px solid ${activeDataset.color}`
          }}>
            {activeDataset.formatValue(currentValue, cursorCoords.lat, cursorCoords.lon)}
          </div>

          {/* Quick button to inspect all metrics at this exact point */}
          {onOpenAllMetrics && (
            <button
              onClick={onOpenAllMetrics}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.28rem 0.6rem',
                borderRadius: '6px',
                background: 'rgba(56, 189, 248, 0.16)',
                border: '1px solid var(--cyan-nasa)',
                color: '#FFFFFF',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title={isRu ? `Посмотреть все ${totalMaps} показателей NASA Earth Now Dashboard в этой точке` : `View all ${totalMaps} NASA Earth Now Dashboard metrics at this point`}
            >
              <Eye size={13} color="var(--cyan-nasa)" />
              <span>{isRu ? `Все ${totalMaps} показателей` : `All ${totalMaps} Metrics Here`}</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. INTERACTIVE HOTSPOT SWITCHER & POINT EDITOR BAR ("менятть на картах места с точками") */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.4rem',
        flexWrap: 'wrap',
        marginBottom: '0.45rem',
        padding: '0.35rem 0.6rem',
        borderRadius: '7px',
        background: 'rgba(10, 17, 32, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        {/* Hotspot Selector Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.32rem', flexWrap: 'wrap', flex: 1 }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '0.2rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Compass size={13} color={activeDataset.color} />
            {isRu ? 'ТОЧКИ КАРТЫ:' : 'HOTSPOTS:'}
          </span>

          <button
            onClick={() => handleCycleHotspot(-1)}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '4px', color: '#FFF', cursor: 'pointer', padding: '2px 5px', fontSize: '0.68rem' }}
            title={isRu ? 'Предыдущая точка' : 'Previous Point'}
          >
            ◀
          </button>

          {activeHotspots.map((spot) => {
            const isNear = Math.hypot(cursorCoords.lat - spot.lat, cursorCoords.lon - spot.lon) < 5;
            const isActiveSpot = selectedHotspotId === spot.id || isNear;
            return (
              <button
                key={spot.id}
                onClick={() => {
                  setSelectedHotspotId(spot.id);
                  onMapClick({
                    lat: spot.lat,
                    lon: spot.lon,
                    x: spot.lon / 360 + 0.5,
                    y: 0.5 - spot.lat / 180
                  });
                }}
                style={{
                  padding: '0.2rem 0.5rem',
                  borderRadius: '5px',
                  fontSize: '0.7rem',
                  fontWeight: isActiveSpot ? 800 : 600,
                  background: isActiveSpot ? `${activeDataset.color}28` : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${isActiveSpot ? activeDataset.color : 'rgba(255, 255, 255, 0.12)'}`,
                  color: isActiveSpot ? '#FFFFFF' : '#CBD5E1',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <span>{isRu ? spot.tagRu : spot.tagEn}</span>
              </button>
            );
          })}

          <button
            onClick={() => handleCycleHotspot(1)}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '4px', color: '#FFF', cursor: 'pointer', padding: '2px 5px', fontSize: '0.68rem' }}
            title={isRu ? 'Следующая точка' : 'Next Point'}
          >
            ▶
          </button>
        </div>

        {/* Point Relocation / Custom Pin Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setIsEditPointsMode((prev) => !prev)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.28rem',
              padding: '0.22rem 0.55rem',
              borderRadius: '5px',
              fontSize: '0.69rem',
              fontWeight: 700,
              background: isEditPointsMode ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${isEditPointsMode ? '#F59E0B' : 'rgba(255, 255, 255, 0.14)'}`,
              color: isEditPointsMode ? '#FBBF24' : '#CBD5E1',
              cursor: 'pointer'
            }}
            title={isRu ? 'Включите и кликните на любое место карты, чтобы переместить туда выбранную точку' : 'Toggle and click anywhere on the map to move the selected hotspot point'}
          >
            <Move size={12} />
            <span>{isEditPointsMode ? (isRu ? 'Режим перемещения точек: ВКЛ' : 'Move Points: ON') : (isRu ? 'Менять места точек' : 'Move Points')}</span>
          </button>

          {onAddCustomHotspot && (
            <button
              onClick={() => onAddCustomHotspot(activeDataset.id, cursorCoords.lat, cursorCoords.lon, currentValue)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.22rem 0.5rem',
                borderRadius: '5px',
                fontSize: '0.69rem',
                fontWeight: 700,
                background: 'rgba(16, 185, 129, 0.14)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                color: '#10B981',
                cursor: 'pointer'
              }}
              title={isRu ? 'Добавить новую точку замера в текущих координатах курсора' : 'Add a new hotspot pin at current cursor coordinates'}
            >
              <PlusCircle size={12} />
              <span>{isRu ? '+ Точка здесь' : '+ Pin Here'}</span>
            </button>
          )}

          {onResetHotspots && (
            <button
              onClick={() => onResetHotspots(activeDataset.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.22rem 0.45rem',
                borderRadius: '5px',
                fontSize: '0.68rem',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
              title={isRu ? 'Вернуть исходные координаты точек NASA' : 'Restore default NASA hotspot positions'}
            >
              <RotateCcw size={11} />
              <span>{isRu ? 'Сброс' : 'Reset'}</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. MAIN INTERACTIVE MAP SURFACE (Equirectangular 2:1 EPSG:4326) */}
      <div
        id="interactive-earth-map"
        ref={mapContainerRef}
        role="application"
        aria-label={isRu ? `Карта Земли NASA. Слой ${activeDataset.name}.` : `NASA Earth Map. Layer ${activeDataset.nameEn}.`}
        tabIndex={0}
        onPointerDown={handlePointerInteraction}
        onPointerMove={(e) => {
          if (e.buttons === 1 || draggingHotspotId) handlePointerInteraction(e);
        }}
        onPointerUp={() => setDraggingHotspotId(null)}
        onDoubleClick={onProbePoint}
        style={{
          position: 'relative',
          flex: 1,
          width: '100%',
          minHeight: '300px',
          borderRadius: '8px',
          background: '#040812',
          cursor: isEditPointsMode ? 'move' : 'crosshair',
          overflow: 'hidden',
          border: isEditPointsMode ? '2px dashed #F59E0B' : '1.5px solid rgba(56, 189, 248, 0.25)',
          userSelect: 'none'
        }}
      >
        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <defs>
            <radialGradient id="typhoonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#FF0055" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#FF8800" stopOpacity="0.75" />
              <stop offset="85%" stopColor="#00D2FF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#002244" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="heatGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFF00" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#FF4400" stopOpacity="0.75" />
              <stop offset="80%" stopColor="#990000" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="co2Plume" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF0077" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="vegetationGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00FF88" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#059669" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#064E3B" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="fireGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="30%" stopColor="#FFDD00" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#FF3300" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="nightLightGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="35%" stopColor="#FFDD44" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#FF9900" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. OFFICIAL NASA SVS #40509 EARTH NOW DASHBOARD VISUALIZATION OR CUSTOM UPLOADED FRAME */}
          <rect x="0" y="0" width="1000" height="500" fill="#020611" />
          <image
            href={baseMapSrc}
            x="0"
            y="0"
            width="1000"
            height="500"
            preserveAspectRatio={isAspectPreserved ? 'xMidYMid meet' : 'none'}
            opacity="0.98"
          />

          {/* 3. DYNAMIC SYNCHRONIZED SCIENTIFIC HOTSPOTS & DRAGGABLE BEACONS */}
          <g className="scientific-hotspots-group">
            {activeHotspots.map((spot) => {
              const spotSvgX = (spot.lon / 360 + 0.5) * 1000;
              const spotSvgY = (0.5 - spot.lat / 180) * 500;
              const isSelected =
                selectedHotspotId === spot.id ||
                Math.hypot(cursorCoords.lat - spot.lat, cursorCoords.lon - spot.lon) < 5;
              const spotTag = isRu ? spot.tagRu : spot.tagEn;

              let fillGradient = 'url(#typhoonGlow)';
              if (activeDataset.id === 'geos_temp' || activeDataset.id === 'wv_lst') fillGradient = 'url(#heatGlow)';
              else if (activeDataset.id.startsWith('geos_pm') || activeDataset.id === 'geos_co' || activeDataset.id === 'geos_o3' || activeDataset.id === 'geos_nox') fillGradient = 'url(#co2Plume)';
              else if (activeDataset.id === 'wv_truecolor' || activeDataset.id === 'geos_humidity') fillGradient = 'url(#vegetationGlow)';
              else if (activeDataset.id === 'wv_fires') fillGradient = 'url(#fireGlow)';
              else if (activeDataset.id === 'wv_blackmarble' || activeDataset.id === 'goes_truecolor') fillGradient = 'url(#nightLightGlow)';

              return (
                <g
                  key={spot.id}
                  transform={`translate(${spotSvgX}, ${spotSvgY})`}
                  style={{ cursor: isEditPointsMode ? 'grab' : 'pointer' }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    setSelectedHotspotId(spot.id);
                    setDraggingHotspotId(spot.id);
                    onMapClick({
                      lat: spot.lat,
                      lon: spot.lon,
                      x: spot.lon / 360 + 0.5,
                      y: 0.5 - spot.lat / 180
                    });
                  }}
                >
                  {/* Outer pulse aura */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isSelected ? 34 : 24}
                    fill={fillGradient}
                    opacity={isSelected ? 0.95 : 0.75}
                  />

                  {/* Animated radar rings */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isSelected ? 26 : 18}
                    fill="none"
                    stroke={spot.isLiveEonet ? '#10B981' : activeDataset.color}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    strokeDasharray="6,3"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0"
                      to="360"
                      dur="6s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Core hotspot pinpoint */}
                  <circle
                    cx="0"
                    cy="0"
                    r="4.5"
                    fill="#FFFFFF"
                    stroke={spot.isLiveEonet ? '#10B981' : activeDataset.color}
                    strokeWidth="1.5"
                  />

                  {/* Tactical Data Pill */}
                  <g transform={`translate(${spotSvgX > 800 ? -130 : 14}, ${spotSvgY < 60 ? 20 : -14})`}>
                    <rect
                      x="0"
                      y="-14"
                      width={Math.min(180, spotTag.length * 6.2 + 16)}
                      height="18"
                      rx="4"
                      fill="rgba(6, 11, 22, 0.92)"
                      stroke={isSelected ? '#FFFFFF' : spot.isLiveEonet ? '#10B981' : activeDataset.color}
                      strokeWidth={isSelected ? 2 : 1}
                    />
                    <text
                      x="7"
                      y="-1.5"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontFamily="var(--font-mono)"
                      fontWeight="800"
                      letterSpacing="0.02em"
                    >
                      {spotTag}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>

          {/* 4. SCIENTIFIC GEOGRAPHIC GRID */}
          <g stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="3,3">
            <line x1="166.7" y1="0" x2="166.7" y2="500" />
            <line x1="333.3" y1="0" x2="333.3" y2="500" />
            <line x1="666.7" y1="0" x2="666.7" y2="500" />
            <line x1="833.3" y1="0" x2="833.3" y2="500" />
            <line x1="0" y1="65.3" x2="1000" y2="65.3" />
            <line x1="0" y1="184.7" x2="1000" y2="184.7" />
            <line x1="0" y1="315.3" x2="1000" y2="315.3" />
            <line x1="0" y1="434.7" x2="1000" y2="434.7" />
          </g>

          {/* Prime Meridian (Greenwich 0°) & Equator (0°) */}
          <line x1="500" y1="0" x2="500" y2="500" stroke="var(--cyan-nasa)" strokeWidth="1.6" strokeDasharray="5,3" opacity="0.75" />
          <line x1="0" y1="250" x2="1000" y2="250" stroke="#FFD700" strokeWidth="1.6" strokeDasharray="5,3" opacity="0.75" />

          <text x="506" y="20" fill="var(--cyan-nasa)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">
            {isRu ? 'ГРИНВИЧ 0°' : 'PRIME MERIDIAN 0°'}
          </text>
          <text x="14" y="244" fill="#FFD700" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">
            {isRu ? 'ЭКВАТОР 0°' : 'EQUATOR 0°'}
          </text>

          {/* 5. TARGET CURSOR WITH SONIC RETICLE */}
          <g transform={`translate(${cursorSvgX}, ${cursorSvgY})`}>
            <circle cx="0" cy="0" r="26" fill="none" stroke={activeDataset.color} strokeWidth="1.5" opacity="0.6">
              <animate attributeName="r" values="8;34;8" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2s" repeatCount="indefinite" />
            </circle>

            <circle cx="0" cy="0" r="14" fill="none" stroke={activeDataset.color} strokeWidth="2" />
            <circle cx="0" cy="0" r="3" fill="#FFFFFF" />

            <line x1="-20" y1="0" x2="-8" y2="0" stroke="var(--cyan-nasa)" strokeWidth="1.8" />
            <line x1="8" y1="0" x2="20" y2="0" stroke="var(--cyan-nasa)" strokeWidth="1.8" />
            <line x1="0" y1="-20" x2="0" y2="-8" stroke="var(--cyan-nasa)" strokeWidth="1.8" />
            <line x1="0" y1="8" x2="0" y2="20" stroke="var(--cyan-nasa)" strokeWidth="1.8" />

            <g transform={`translate(${cursorSvgX > 840 ? -115 : 16}, -16)`}>
              <rect x="0" y="-14" width="110" height="16" rx="4" fill="rgba(7, 11, 20, 0.9)" stroke={activeDataset.color} strokeWidth="1" />
              <text x="5" y="-3" fill="#FFFFFF" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700">
                {activeDataset.formatValue(currentValue, cursorCoords.lat, cursorCoords.lon).slice(0, 18)}
              </text>
            </g>
          </g>
        </svg>

        {/* Bottom-Left: Color Scale Legend */}
        {activeDataset.legend && (
          <div style={{
            position: 'absolute',
            bottom: '8px',
            left: '10px',
            background: 'rgba(7, 11, 20, 0.88)',
            backdropFilter: 'blur(8px)',
            borderRadius: '6px',
            padding: '0.35rem 0.6rem',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.2rem',
            maxWidth: '260px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.65rem', color: '#FFFFFF', fontWeight: 700 }}>
              <span>{activeDataset.legend.minLabel}</span>
              <span>{activeDataset.legend.maxLabel}</span>
            </div>
            <div style={{
              width: '220px',
              height: '7px',
              borderRadius: '4px',
              background: activeDataset.legend.gradient,
              border: '1px solid rgba(255,255,255,0.2)'
            }} />
          </div>
        )}

        {/* Bottom-Right: Earth Now Dashboard (#40509) Hyperwall Sequence Player & Scrubber */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          right: '10px',
          background: 'rgba(7, 11, 20, 0.9)',
          backdropFilter: 'blur(8px)',
          borderRadius: '6px',
          padding: '0.3rem 0.55rem',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          fontSize: '0.7rem'
        }}>
          <button
            onClick={() => setIsFramePlaying((p) => !p)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              background: isFramePlaying ? '#10B981' : 'rgba(0, 242, 254, 0.15)',
              color: isFramePlaying ? '#000' : 'var(--cyan-nasa)',
              border: '1px solid var(--cyan-nasa)',
              borderRadius: '4px',
              padding: '0.18rem 0.45rem',
              fontWeight: 800,
              fontSize: '0.68rem',
              cursor: 'pointer'
            }}
            title={isRu ? `Автопроигрывание всех ${totalMaps} карт NASA Earth Now` : `Auto-play all ${totalMaps} NASA Earth Now visualizations`}
          >
            {isFramePlaying ? <Pause size={11} /> : <Play size={11} />}
            <span>{isRu ? 'Цикл Earth Now' : 'Earth Now Cycle'}</span>
          </button>

          <input
            type="range"
            min={0}
            max={DATASETS.length - 1}
            value={datasetIndex}
            onChange={(e) => {
              const idx = Number(e.target.value);
              if (DATASETS[idx]) onSelectDataset(DATASETS[idx]);
            }}
            style={{ width: '90px', accentColor: 'var(--cyan-nasa)', cursor: 'pointer' }}
            title={isRu ? `Перемотка ${totalMaps} визуализаций NASA SVS` : `Scrub through all ${totalMaps} NASA SVS visualizations`}
          />

          <span style={{ color: '#FFFFFF', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '0.66rem' }}>
            {`#${datasetIndex + 1}/${DATASETS.length} • SVS #${activeDataset.svsId}`}
          </span>
        </div>
      </div>
    </div>
  );
}
