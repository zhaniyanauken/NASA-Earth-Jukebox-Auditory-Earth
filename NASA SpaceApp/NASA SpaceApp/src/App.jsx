import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import EarthMapVisualizer from './components/EarthMapVisualizer';
import SonificationHUD from './components/SonificationHUD';
import HandTrackingHUD from './components/HandTrackingHUD';
import AIAssistantModal from './components/AIAssistantModal';
import AudioWelcomeModal from './components/AudioWelcomeModal';
import KeyboardGuideModal from './components/KeyboardGuideModal';
import ScientificStoryModal from './components/ScientificStoryModal';

import {
  DATASETS,
  HOTSPOTS_BY_DATASET,
  DATASET_MUSIC_PROFILES,
  isLandCoordinate,
  getRegionInfo,
  decodePixelToDatasetValue,
  fetchLiveNasaEonetEvents
} from './data/nasaDatasets';
import { mapColorToMusicalNote } from './services/chromophoniaMusic';
import { sonificationEngine } from './services/sonificationEngine';
import { speechAssistant } from './services/speechAssistant';

export default function App() {
  // App State - Default language is strictly English
  const [language, setLanguage] = useState('en-US');

  const [activeDataset, setActiveDataset] = useState(DATASETS[0]);
  const activeDatasetRef = useRef(DATASETS[0]);
  activeDatasetRef.current = activeDataset;

  const [cursorCoords, setCursorCoords] = useState({ lat: 24.0, lon: 44.0, x: 0.622, y: 0.367 });
  const [isAudioActive, setIsAudioActive] = useState(false);
  const isAudioActiveRef = useRef(false);
  isAudioActiveRef.current = isAudioActive;

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [detectedGesture, setDetectedGesture] = useState('NONE');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const lastQueueSwitchTimeRef = useRef(0);

  // Chromophonia Music State
  const [timbre, setTimbre] = useState('kobyz');
  const [scaleMode, setScaleMode] = useState('dala');
  const [musicIntensity, setMusicIntensity] = useState(1.25);
  const [reverbAmount, setReverbAmount] = useState(0.48);
  const [sampledRgb, setSampledRgb] = useState({ r: 210, g: 45, b: 35 });
  const [pixelDensity, setPixelDensity] = useState(0.5);
  const [sampledNoteInfo, setSampledNoteInfo] = useState(null);

  // HUD Sub-tab ('music' | 'metrics' | 'jukebox') & Jukebox Playlist
  const [hudTab, setHudTab] = useState('music');
  const [activeJukeboxTrackId, setActiveJukeboxTrackId] = useState(null);
  const jukeboxTimerRef = useRef(null);

  // Custom / Relocated Hotspots & Live NASA EONET Events
  const [customHotspotsByDataset, setCustomHotspotsByDataset] = useState(() => {
    const clone = {};
    for (const k in HOTSPOTS_BY_DATASET) {
      clone[k] = HOTSPOTS_BY_DATASET[k].map((s) => ({ ...s }));
    }
    return clone;
  });
  const [liveEonetEvents, setLiveEonetEvents] = useState([]);

  // Modals & Accessibility
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState('');
  const [incomingAssistantQuery, setIncomingAssistantQuery] = useState('');

  // Fetch Real-Time Active Planetary Events from NASA EONET v3 API on mount
  useEffect(() => {
    let mounted = true;
    fetchLiveNasaEonetEvents(12).then((events) => {
      if (mounted && events && events.length > 0) {
        setLiveEonetEvents(events);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Compute geographical and scientific data for current coordinates
  const isLand = isLandCoordinate(cursorCoords.lat, cursorCoords.lon);

  const computeCurrentValue = useCallback(() => {
    const baseVal = activeDataset.sample(cursorCoords.lat, cursorCoords.lon, isLand);
    let val = decodePixelToDatasetValue(
      activeDataset.id,
      sampledRgb.r,
      sampledRgb.g,
      sampledRgb.b,
      cursorCoords.lat,
      cursorCoords.lon,
      isLand,
      baseVal
    );
    const customSpots = customHotspotsByDataset[activeDataset.id] || [];
    for (const spot of customSpots) {
      const d = Math.hypot(cursorCoords.lat - spot.lat, cursorCoords.lon - spot.lon);
      if (d < 7.5) {
        const factor = Math.max(0, 1 - d / 7.5);
        val = Math.round((val * (1 - factor) + spot.value * factor) * 100) / 100;
        break;
      }
    }
    return val;
  }, [activeDataset, cursorCoords.lat, cursorCoords.lon, isLand, customHotspotsByDataset, sampledRgb]);

  const currentValue = computeCurrentValue();

  // Check if near a relocated/custom hotspot or live EONET event first
  const computeRegionInfo = useCallback(() => {
    const customSpots = [
      ...(customHotspotsByDataset[activeDataset.id] || []),
      ...liveEonetEvents.filter((e) => e.datasetId === activeDataset.id)
    ];
    for (const spot of customSpots) {
      if (Math.hypot(cursorCoords.lat - spot.lat, cursorCoords.lon - spot.lon) < 6) {
        return {
          nameRu: spot.nameRu,
          nameEn: spot.nameEn,
          descRu: spot.descRu,
          descEn: spot.descEn,
          isLand,
          spot
        };
      }
    }
    return getRegionInfo(cursorCoords.lat, cursorCoords.lon, activeDataset.id);
  }, [cursorCoords.lat, cursorCoords.lon, activeDataset.id, customHotspotsByDataset, liveEonetEvents, isLand]);

  const regionInfo = computeRegionInfo();

  // Announce to Screen Readers
  const announce = useCallback((text) => {
    setScreenReaderAnnouncement(text);
  }, []);

  // Update Chromophonia Note preview & Sonification Audio in real-time
  useEffect(() => {
    const noteObj = mapColorToMusicalNote(sampledRgb, {
      scaleId: scaleMode,
      rootIndex: 9,
      depthMode: 'deep-low'
    });
    setSampledNoteInfo(noteObj);

    if (isAudioActive) {
      sonificationEngine.updateSonification(
        activeDataset,
        currentValue,
        cursorCoords.lat,
        cursorCoords.lon,
        isLand,
        sampledRgb,
        pixelDensity
      );
    } else {
      sonificationEngine.stop();
    }
  }, [cursorCoords, activeDataset, currentValue, isLand, isAudioActive, sampledRgb, pixelDensity, scaleMode, timbre, musicIntensity]);

  // Callback from EarthMapVisualizer's Computer Vision pixel sampler
  const handlePixelSampled = useCallback((rgb, density) => {
    setSampledRgb(rgb);
    setPixelDensity(density);
  }, []);

  // Relocate an existing hotspot point on the map
  const handleUpdateHotspotPosition = useCallback((datasetId, hotspotId, newLat, newLon) => {
    setCustomHotspotsByDataset((prev) => {
      const list = prev[datasetId] || [];
      return {
        ...prev,
        [datasetId]: list.map((s) =>
          s.id === hotspotId
            ? {
                ...s,
                lat: newLat,
                lon: newLon,
                tagRu: `${s.tagRu.split('(')[0].trim()} (${newLat.toFixed(0)}°,${newLon.toFixed(0)}°)`,
                tagEn: `${s.tagEn.split('(')[0].trim()} (${newLat.toFixed(0)}°,${newLon.toFixed(0)}°)`
              }
            : s
        )
      };
    });
  }, []);

  // Add a new custom hotspot pin at current cursor location
  const handleAddCustomHotspot = useCallback((datasetId, lat, lon, val) => {
    const ds = DATASETS.find((d) => d.id === datasetId) || activeDataset;
    const newSpot = {
      id: `custom_${Date.now()}`,
      nameRu: `Точка наблюдения (${lat.toFixed(1)}°, ${lon.toFixed(1)}°)`,
      nameEn: `Custom Pin (${lat.toFixed(1)}°, ${lon.toFixed(1)}°)`,
      lat,
      lon,
      value: val || ds.max * 0.75,
      unit: ds.unit,
      unitEn: ds.unit,
      tagRu: `ПИН (${val} ${ds.unit})`,
      tagEn: `PIN (${val} ${ds.unit})`,
      descRu: 'Пользовательская точка мониторинга спутниковых показателей NASA.',
      descEn: 'User-created NASA satellite observation hotspot.'
    };
    setCustomHotspotsByDataset((prev) => ({
      ...prev,
      [datasetId]: [...(prev[datasetId] || []), newSpot]
    }));
    if (isAudioActiveRef.current) {
      sonificationEngine.playProbePing();
    }
  }, [activeDataset]);

  // Reset hotspots to default NASA EIC coordinates
  const handleResetHotspots = useCallback((datasetId) => {
    setCustomHotspotsByDataset((prev) => ({
      ...prev,
      [datasetId]: (HOTSPOTS_BY_DATASET[datasetId] || []).map((s) => ({ ...s }))
    }));
  }, []);

  // Chromophonia Instrument & Scale Handlers
  const handleChangeTimbre = useCallback((newTimbre) => {
    setTimbre(newTimbre);
    sonificationEngine.setTimbre(newTimbre);
  }, []);

  const handleChangeScaleMode = useCallback((newScale) => {
    setScaleMode(newScale);
    sonificationEngine.setScaleMode(newScale);
  }, []);

  const handleChangeMusicIntensity = useCallback((val) => {
    setMusicIntensity(val);
    sonificationEngine.setMusicIntensity(val);
  }, []);

  const handleChangeReverbAmount = useCallback((val) => {
    setReverbAmount(val);
    sonificationEngine.setReverb(val);
  }, []);

  // Select NASA Dataset & sync thematic Chromophonia instrument, scale, contour, intensity, reverb + primary hotspot
  const handleSelectDataset = useCallback((ds) => {
    setActiveDataset(ds);
    activeDatasetRef.current = ds;
    const profile = DATASET_MUSIC_PROFILES[ds.id];
    if (profile) {
      setTimbre(profile.timbre);
      sonificationEngine.setTimbre(profile.timbre);
      setScaleMode(profile.scale);
      sonificationEngine.setScaleMode(profile.scale);
      if (profile.contourId) {
        sonificationEngine.setContourId(profile.contourId);
      }
      if (profile.baseIntensity) {
        setMusicIntensity(profile.baseIntensity);
        sonificationEngine.setMusicIntensity(profile.baseIntensity);
      }
      if (profile.reverb !== undefined) {
        setReverbAmount(profile.reverb);
        sonificationEngine.setReverb(profile.reverb);
      }
    }
    const spots = (customHotspotsByDataset && customHotspotsByDataset[ds.id]) || HOTSPOTS_BY_DATASET[ds.id] || [];
    if (spots.length > 0) {
      const firstSpot = spots[0];
      setCursorCoords({
        lat: firstSpot.lat,
        lon: firstSpot.lon,
        x: Math.max(0, Math.min(1, firstSpot.lon / 360 + 0.5)),
        y: Math.max(0, Math.min(1, 0.5 - firstSpot.lat / 180))
      });
    }
    if (isAudioActiveRef.current) {
      sonificationEngine.playDatasetSwitch();
    }
    const globalIdx = DATASETS.findIndex((d) => d.id === ds.id);
    const msg = `Map ${globalIdx + 1} of ${DATASETS.length}: ${ds.nameEn}`;
    announce(msg);
  }, [announce, customHotspotsByDataset]);

  // Sequential queue order switcher (guarantees strict queue order without random jumps)
  const handleAdvanceMapInQueue = useCallback((direction = 1) => {
    const now = Date.now();
    if (now - lastQueueSwitchTimeRef.current < 1200) return;
    lastQueueSwitchTimeRef.current = now;

    const curDs = activeDatasetRef.current;
    const curIdx = Math.max(0, DATASETS.findIndex((d) => d.id === curDs.id));
    const nextIdx = (curIdx + direction + DATASETS.length) % DATASETS.length;
    const nextDs = DATASETS[nextIdx];
    handleSelectDataset(nextDs);
    const msg = `Map ${nextIdx + 1} of ${DATASETS.length}: ${nextDs.nameEn}!`;
    speechAssistant.speak(msg, true);
  }, [handleSelectDataset]);

  // Play Curated Earth Jukebox Track
  const handlePlayJukeboxTrack = useCallback((track) => {
    if (jukeboxTimerRef.current) clearInterval(jukeboxTimerRef.current);

    sonificationEngine.resume();
    sonificationEngine.setMuted(false);
    setIsAudioActive(true);
    isAudioActiveRef.current = true;
    setActiveJukeboxTrackId(track.id);

    const ds = DATASETS.find((d) => d.id === track.datasetId) || DATASETS[0];
    setActiveDataset(ds);
    activeDatasetRef.current = ds;
    setTimbre(track.timbre);
    sonificationEngine.setTimbre(track.timbre);
    setScaleMode(track.scaleId);
    sonificationEngine.setScaleMode(track.scaleId);
    setMusicIntensity(track.intensity);
    sonificationEngine.setMusicIntensity(track.intensity);

    setCursorCoords({
      lat: track.lat,
      lon: track.lon,
      x: Math.max(0, Math.min(1, track.lon / 360 + 0.5)),
      y: Math.max(0, Math.min(1, 0.5 - track.lat / 180))
    });

    const narration = `${track.titleEn}. ${track.storyEn}`;
    speechAssistant.speak(narration, true);
    announce(narration);

    let angle = 0;
    jukeboxTimerRef.current = setInterval(() => {
      angle += 0.35;
      const dLat = Math.sin(angle) * 3.5;
      const dLon = Math.cos(angle) * 5.0;
      const nextLat = Math.max(-85, Math.min(85, track.lat + dLat));
      const nextLon = Math.max(-180, Math.min(180, track.lon + dLon));
      setCursorCoords({
        lat: Math.round(nextLat * 10) / 10,
        lon: Math.round(nextLon * 10) / 10,
        x: Math.max(0, Math.min(1, nextLon / 360 + 0.5)),
        y: Math.max(0, Math.min(1, 0.5 - nextLat / 180))
      });
    }, 900);
  }, [announce]);

  const handleStopJukeboxTrack = useCallback(() => {
    if (jukeboxTimerRef.current) {
      clearInterval(jukeboxTimerRef.current);
      jukeboxTimerRef.current = null;
    }
    setActiveJukeboxTrackId(null);
  }, []);

  // Probe specific location (Pinch gesture or Spacebar)
  const handleProbePoint = useCallback(() => {
    if (isAudioActiveRef.current) {
      sonificationEngine.playProbePing();
    }
    const latStr = `${Math.abs(cursorCoords.lat).toFixed(1)}° ${cursorCoords.lat >= 0 ? 'N' : 'S'}`;
    const lonStr = `${Math.abs(cursorCoords.lon).toFixed(1)}° ${cursorCoords.lon >= 0 ? 'E' : 'W'}`;
    const region = regionInfo.nameEn || 'Earth Location';
    const reading = activeDataset.formatValue(currentValue, cursorCoords.lat, cursorCoords.lon);

    const probeText = `Aha! ${region} at ${latStr}, ${lonStr}. ${activeDataset.nameEn} reads ${reading}!`;
    speechAssistant.speak(probeText, true);
    announce(probeText);
  }, [cursorCoords, regionInfo, activeDataset, currentValue, announce]);

  // Audio start & Welcome speech (Mute stops all sounds, assistant continues speaking)
  const handleToggleAudio = useCallback(() => {
    const nextState = !isAudioActive;
    setIsAudioActive(nextState);
    isAudioActiveRef.current = nextState;

    if (nextState) {
      sonificationEngine.resume();
      sonificationEngine.setMuted(false);
      sonificationEngine.playEquatorChime();
      const welcome = 'Whoopee! Audio and Chromophonia music enabled!';
      speechAssistant.speak(welcome);
      announce(welcome);
    } else {
      sonificationEngine.setMuted(true);
      sonificationEngine.stop();
      handleStopJukeboxTrack();
      const muteMsg = 'Quiet mode! Music stopped. Call "Wall-E" whenever you need me!';
      speechAssistant.speak(muteMsg);
      announce(muteMsg);
    }
  }, [isAudioActive, announce, handleStopJukeboxTrack]);

  // Unified Voice Command & Action Dispatcher
  const handleVoiceCommand = useCallback((transcript, actionType, payload) => {
    switch (actionType) {
      case 'WAKE_ACK':
        if (isAudioActiveRef.current) {
          sonificationEngine.playGestureChime();
        }
        setIsAssistantOpen(true);
        break;

      case 'CHANGE_LAYER':
        handleSelectDataset(payload.dataset);
        break;

      case 'CHANGE_TIMBRE':
        handleChangeTimbre(payload.timbre);
        break;

      case 'NAVIGATE_TO_POINT':
        if (payload.dataset) {
          handleSelectDataset(payload.dataset);
        }
        setCursorCoords({
          lat: payload.lat,
          lon: payload.lon,
          x: Math.max(0, Math.min(1, payload.lon / 360 + 0.5)),
          y: Math.max(0, Math.min(1, 0.5 - payload.lat / 180))
        });
        if (isAudioActiveRef.current) {
          sonificationEngine.playProbePing();
        }
        break;

      case 'PROBE_POINT':
        handleProbePoint();
        break;

      case 'MUTE_AUDIO':
        sonificationEngine.setMuted(true);
        sonificationEngine.stop();
        setIsAudioActive(false);
        isAudioActiveRef.current = false;
        break;

      case 'UNMUTE_AUDIO':
        sonificationEngine.resume();
        sonificationEngine.setMuted(false);
        setIsAudioActive(true);
        isAudioActiveRef.current = true;
        break;

      case 'TOGGLE_CAMERA':
        setIsCameraActive((prev) => (payload.active !== undefined ? payload.active : !prev));
        break;

      case 'TOGGLE_FULLSCREEN':
        setIsFullscreen((prev) => !prev);
        break;

      case 'GENERAL_QUESTION':
        setIsAssistantOpen(true);
        setIncomingAssistantQuery(payload.query);
        break;

      default:
        break;
    }
  }, [handleProbePoint, handleSelectDataset, handleChangeTimbre]);

  // Background continuous listener for "Wally"
  useEffect(() => {
    speechAssistant.setLanguage('en-US');
    speechAssistant.initContinuousListener(handleVoiceCommand);

    const handleFirstInteraction = () => {
      speechAssistant.restartContinuousListener();
    };
    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [handleVoiceCommand]);

  // Start with complete audio onboarding
  const handleStartWithAudioOnboarding = (options = {}) => {
    setShowWelcomeModal(false);
    setIsAudioActive(true);
    isAudioActiveRef.current = true;
    sonificationEngine.resume();
    sonificationEngine.setMuted(false);

    if (options.enableCamera) {
      setIsCameraActive(true);
      const camMsg = 'Camera active! Wave your hand to cycle maps, or show a fist to hush me!';
      speechAssistant.speak(camMsg);
      announce(camMsg);
    } else {
      const enterMsg = 'Waaall-E here! Exploring Earth Jukebox! Say "Wall-E" anytime to ask about Earth!';
      speechAssistant.speak(enterMsg);
      announce(enterMsg);
    }
  };

  const handlePlayInstructions = () => {
    speechAssistant.speakFullInstruction();
  };

  // Keyboard navigation listener (will NOT automatically unmute if user turned audio off!)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

      let { lat, lon, x, y } = cursorCoords;
      let handled = false;
      const stepDeg = e.shiftKey ? 12 : 4;

      switch (e.key) {
        case 'ArrowLeft':
          lon = Math.max(-180, lon - stepDeg);
          x = lon / 360 + 0.5;
          handled = true;
          break;
        case 'ArrowRight':
          lon = Math.min(180, lon + stepDeg);
          x = lon / 360 + 0.5;
          handled = true;
          break;
        case 'ArrowUp':
          lat = Math.min(85, lat + stepDeg);
          y = 0.5 - lat / 180;
          handled = true;
          break;
        case 'ArrowDown':
          lat = Math.max(-85, lat - stepDeg);
          y = 0.5 - lat / 180;
          handled = true;
          break;
        case ' ':
          e.preventDefault();
          handleProbePoint();
          return;
        case 'f':
        case 'F':
          setIsFullscreen((prev) => !prev);
          return;
        case 'i':
        case 'I':
          handlePlayInstructions();
          return;
        case 'j':
        case 'J':
          setHudTab('jukebox');
          return;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7': {
          const idx = parseInt(e.key, 10) - 1;
          if (DATASETS[idx]) handleSelectDataset(DATASETS[idx]);
          return;
        }
        case 'c':
        case 'C':
          setIsCameraActive((prev) => !prev);
          return;
        case 'm':
        case 'M':
          handleToggleAudio();
          return;
        case 'a':
        case 'A':
          setIsAssistantOpen(true);
          return;
        case 'h':
        case 'H':
          setIsHelpOpen(true);
          return;
        default:
          break;
      }

      if (handled) {
        e.preventDefault();
        setCursorCoords({
          lat: Math.round(lat * 10) / 10,
          lon: Math.round(lon * 10) / 10,
          x: Math.max(0, Math.min(1, x)),
          y: Math.max(0, Math.min(1, y))
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cursorCoords, handleProbePoint, handleSelectDataset, handleToggleAudio]);

  // Hand Gestures Update from MediaPipe / Optical Tracker
  const handleGestureUpdate = useCallback((data) => {
    if (!data.hasHand) {
      setDetectedGesture('NONE');
      return;
    }

    setDetectedGesture(data.gesture);

    // 1. FIST GESTURE: IMMEDIATELY SILENCE WALLY
    if (data.gesture === 'FIST') {
      speechAssistant.cancel();
      announce('Wally silenced by fist gesture');
      return;
    }

    // 2. Strict queue order map switching on hand wave
    if (data.gesture === 'SWIPE_RIGHT') {
      handleAdvanceMapInQueue(1);
      return;
    } else if (data.gesture === 'SWIPE_LEFT') {
      handleAdvanceMapInQueue(-1);
      return;
    }

    // 3. Update coordinates when pointing or pinching (without unmuting muted audio!)
    if (data.gesture === 'POINTING' || data.gesture === 'PINCH') {
      const x = data.x;
      const y = data.y;
      const lon = (x - 0.5) * 360;
      const lat = (0.5 - y) * 180;

      setCursorCoords({
        lat: Math.max(-85, Math.min(85, Math.round(lat * 10) / 10)),
        lon: Math.max(-180, Math.min(180, Math.round(lon * 10) / 10)),
        x,
        y
      });
    }

    // 4. Trigger Probe on Pinch
    if (data.gesture === 'PINCH_TRIGGER') {
      handleProbePoint();
    }

    // 5. Activate AI Assistant on Thumbs Up
    if (data.gesture === 'THUMBS_UP' && !isAssistantOpen) {
      if (isAudioActiveRef.current) {
        sonificationEngine.playGestureChime();
      }
      setIsAssistantOpen(true);
      speechAssistant.speak('Listening! Ask me anything about Earth.', true);
    }

    // 6. Peace Sign triggers planetary harmony chime
    if (data.gesture === 'PEACE' && isAudioActiveRef.current) {
      sonificationEngine.playEquatorChime();
    }

    // 7. Shaka Sign triggers location status report
    if (data.gesture === 'SHAKA') {
      handleProbePoint();
    }
  }, [isAssistantOpen, handleProbePoint, handleAdvanceMapInQueue, announce]);

  // Map pointer interaction (does not auto-unmute)
  const handleMapClick = useCallback((coordsOrUpdater) => {
    setCursorCoords((prev) =>
      typeof coordsOrUpdater === 'function' ? coordsOrUpdater(prev) : coordsOrUpdater
    );
  }, []);

  // High contrast body toggle
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Accessible Skip Link for Screen Readers */}
      <a
        href="#interactive-earth-map"
        className="skip-link"
        style={{
          position: 'absolute',
          top: '-60px',
          left: '10px',
          background: 'var(--cyan-nasa)',
          color: '#000000',
          padding: '8px 16px',
          fontWeight: 800,
          zIndex: 9999,
          borderRadius: '4px',
          textDecoration: 'none',
          transition: 'top 0.2s ease'
        }}
        onFocus={(e) => { e.currentTarget.style.top = '10px'; }}
        onBlur={(e) => { e.currentTarget.style.top = '-60px'; }}
      >
        Skip directly to Earth Sound Map
      </a>

      {/* Screen Reader Announcements */}
      <div
        role="status"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {screenReaderAnnouncement}
      </div>

      {/* Main Header */}
      {!isFullscreen && (
        <Header
          isCameraActive={isCameraActive}
          onToggleCamera={() => {
            const nextState = !isCameraActive;
            setIsCameraActive(nextState);
            speechAssistant.speak(nextState ? 'Camera on' : 'Camera off');
          }}
          isAudioActive={isAudioActive}
          onToggleAudio={handleToggleAudio}
          language="en-US"
          onOpenAssistant={() => setIsAssistantOpen(true)}
          onOpenStory={() => setIsStoryOpen(true)}
          onOpenHelp={() => setIsHelpOpen(true)}
          highContrast={highContrast}
          onToggleHighContrast={() => setHighContrast((p) => !p)}
          liveEventsCount={liveEonetEvents.length}
        />
      )}

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: isFullscreen ? 0 : '0 1rem 0.75rem 1rem' }}>
        
        {/* Interactive Earth Map Visualizer */}
        <EarthMapVisualizer
          activeDataset={activeDataset}
          onSelectDataset={handleSelectDataset}
          cursorCoords={cursorCoords}
          currentValue={currentValue}
          regionInfo={regionInfo}
          onMapClick={handleMapClick}
          isCameraActive={isCameraActive}
          detectedGesture={detectedGesture}
          language="en-US"
          onProbePoint={handleProbePoint}
          isFullscreen={isFullscreen}
          customHotspotsByDataset={customHotspotsByDataset}
          onUpdateHotspotPosition={handleUpdateHotspotPosition}
          onAddCustomHotspot={handleAddCustomHotspot}
          onResetHotspots={handleResetHotspots}
          liveEonetEvents={liveEonetEvents}
          onOpenAllMetrics={() => setHudTab('metrics')}
          onPixelSampled={handlePixelSampled}
        />

        {/* Earth Jukebox & Chromophonia Control Deck */}
        {!isFullscreen && (
          <SonificationHUD
            activeDataset={activeDataset}
            onSelectDataset={handleSelectDataset}
            cursorCoords={cursorCoords}
            currentValue={currentValue}
            isAudioActive={isAudioActive}
            language="en-US"
            timbre={timbre}
            onChangeTimbre={handleChangeTimbre}
            scaleMode={scaleMode}
            onChangeScaleMode={handleChangeScaleMode}
            musicIntensity={musicIntensity}
            onChangeMusicIntensity={handleChangeMusicIntensity}
            reverbAmount={reverbAmount}
            onChangeReverbAmount={handleChangeReverbAmount}
            activeTab={hudTab}
            onChangeTab={setHudTab}
            customHotspotsByDataset={customHotspotsByDataset}
            activeJukeboxTrackId={activeJukeboxTrackId}
            onPlayJukeboxTrack={handlePlayJukeboxTrack}
            onStopJukeboxTrack={handleStopJukeboxTrack}
            sampledNoteInfo={sampledNoteInfo}
          />
        )}
      </main>

      {/* Floating Hand Tracking HUD */}
      <HandTrackingHUD
        isActive={isCameraActive}
        onClose={() => setIsCameraActive(false)}
        onGestureUpdate={handleGestureUpdate}
        detectedGesture={detectedGesture}
        language="en-US"
      />

      {/* Wally AI Voice Assistant Modal */}
      <AIAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        activeDataset={activeDataset}
        currentValue={currentValue}
        cursorCoords={cursorCoords}
        regionInfo={regionInfo}
        language="en-US"
        incomingQuery={incomingAssistantQuery}
        onClearIncomingQuery={() => setIncomingAssistantQuery('')}
        onExecuteAction={(type, payload) => handleVoiceCommand('', type, payload)}
      />

      {/* Accessibility & Keyboard Guide Modal */}
      <KeyboardGuideModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        language="en-US"
      />

      {/* Scientific Story & SVS #40509 Gallery Modal */}
      <ScientificStoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
        language="en-US"
      />

      {/* Comprehensive Audio Welcome Tutorial Modal */}
      <AudioWelcomeModal
        isOpen={showWelcomeModal}
        onStart={handleStartWithAudioOnboarding}
        onClose={() => setShowWelcomeModal(false)}
        language="en-US"
      />

    </div>
  );
}
