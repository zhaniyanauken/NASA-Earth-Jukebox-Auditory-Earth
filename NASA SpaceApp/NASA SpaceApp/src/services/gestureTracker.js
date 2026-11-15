// NASA Earth Jukebox - High-Precision Dual-Engine Gesture Tracker
// Engine 1: MediaPipe 3D Landmark Neural Network (Normalized hand scale & adaptive hysteresis)
// Engine 2: Robust Real-Time Optical Color-Kinematic Flow Tracker

export class GestureTracker {
  constructor(videoElement, canvasElement, onGestureUpdate, onStatusChange) {
    this.video = videoElement;
    this.canvas = canvasElement;
    this.ctx = canvasElement ? canvasElement.getContext('2d', { willReadFrequently: true }) : null;
    this.onGestureUpdate = onGestureUpdate;
    this.onStatusChange = onStatusChange;

    this.hands = null;
    this.stream = null;
    this.animationFrameId = null;
    this.isRunning = false;
    this.isProcessingFrame = false;
    this.mediaPipeReady = false;

    // Smoothed pointer coordinates (0..1)
    this.cursorX = 0.5;
    this.cursorY = 0.5;
    this.targetX = 0.5;
    this.targetY = 0.5;

    // Timing & hysteresis
    this.lastPinchTime = 0;
    this.lastSwipeTime = 0;
    this.lastMuteTime = 0;
    this.isCurrentlyPinched = false;
    this.recentXHistory = [];
    this.consecutiveHandFrames = 0;
    this.noHandFrames = 0;
    this.activeGesture = 'NONE';
  }

  async start() {
    if (this.isRunning) return true;

    try {
      this.notifyStatus('INITIALIZING', 'Подключение веб-камеры...');

      const constraints = {
        video: {
          width: { ideal: 640, min: 320 },
          height: { ideal: 480, min: 240 },
          facingMode: 'user'
        },
        audio: false
      };

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Webcam API is not supported in this browser.');
      }

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (this.video) {
        this.video.srcObject = this.stream;
        this.video.setAttribute('playsinline', 'true');
        this.video.setAttribute('muted', 'true');
        await this.video.play();
      }

      this.isRunning = true;
      this.notifyStatus('CAMERA_READY', 'Камера активна. Запуск ИИ распознавания...');

      await this.initMediaPipe();
      this.processLoop();

      return true;
    } catch (err) {
      console.error('GestureTracker start error:', err);
      this.isRunning = false;
      this.notifyStatus('ERROR', err.message || 'Ошибка веб-камеры');
      throw err;
    }
  }

  notifyStatus(status, message) {
    if (this.onStatusChange) {
      this.onStatusChange({ status, message });
    }
  }

  async initMediaPipe() {
    try {
      if (window.Hands) {
        this.hands = new window.Hands({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`
        });

        this.hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.65,
          minTrackingConfidence: 0.60
        });

        this.hands.onResults((results) => {
          this.handleMediaPipeResults(results);
        });

        this.mediaPipeReady = true;
        this.notifyStatus('TRACKER_ACTIVE', 'ИИ MediaPipe активен (максимальная точность)');
      } else {
        this.mediaPipeReady = false;
        this.notifyStatus('OPTICAL_ACTIVE', 'Оптический сенсор активен');
      }
    } catch (e) {
      console.warn('MediaPipe fallback:', e);
      this.mediaPipeReady = false;
      this.notifyStatus('OPTICAL_ACTIVE', 'Оптический сенсор активен (fallback)');
    }
  }

  processLoop() {
    if (!this.isRunning) return;

    if (this.video && this.video.readyState >= 2) {
      if (this.mediaPipeReady && this.hands) {
        if (!this.isProcessingFrame) {
          this.isProcessingFrame = true;
          this.hands.send({ image: this.video })
            .catch(() => this.runEnhancedOpticalTracking())
            .finally(() => {
              this.isProcessingFrame = false;
            });
        }
      } else {
        this.runEnhancedOpticalTracking();
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.processLoop());
  }

  // Optical fallback tracker with skin-color filtering and kinematic center
  runEnhancedOpticalTracking() {
    if (!this.canvas || !this.ctx || !this.video) return;

    const w = this.canvas.width;
    const h = this.canvas.height;
    if (w <= 0 || h <= 0) return;

    this.ctx.drawImage(this.video, 0, 0, w, h);

    try {
      const frame = this.ctx.getImageData(0, 0, w, h);
      const data = frame.data;
      let totalX = 0, totalY = 0, count = 0;
      let minX = w, maxX = 0, minY = h, maxY = 0;

      for (let i = 0; i < data.length; i += 16) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Skin detection: YCbCr inspired heuristics
        const isSkin = (r > 95 && g > 40 && b > 20 && r > g && r > b && (r - g) > 15 && Math.abs(r - g) < 140);
        if (isSkin) {
          const pixelIdx = i / 4;
          const px = pixelIdx % w;
          const py = Math.floor(pixelIdx / w);
          totalX += px;
          totalY += py;
          count++;
          if (px < minX) minX = px;
          if (px > maxX) maxX = px;
          if (py < minY) minY = py;
          if (py > maxY) maxY = py;
        }
      }

      this.ctx.clearRect(0, 0, w, h);

      if (count > 90) {
        this.consecutiveHandFrames++;
        this.noHandFrames = 0;

        const rawTargetX = 1 - (totalX / count) / w;
        const rawTargetY = (totalY / count) / h;

        // Adaptive smoothing
        const dist = Math.hypot(rawTargetX - this.cursorX, rawTargetY - this.cursorY);
        const alpha = dist > 0.08 ? 0.5 : 0.3;
        this.cursorX = this.cursorX * (1 - alpha) + rawTargetX * alpha;
        this.cursorY = this.cursorY * (1 - alpha) + rawTargetY * alpha;

        const boundW = maxX - minX;
        const boundH = maxY - minY;
        const area = Math.max(1, boundW * boundH);
        const density = count / area;
        const now = Date.now();

        this.recentXHistory.push({ x: rawTargetX, y: rawTargetY, time: now });
        if (this.recentXHistory.length > 20) {
          this.recentXHistory.shift();
        }

        let gesture = 'POINTING';

        // Check for fast horizontal swipe in recent 120..500ms window
        const swipeGesture = this.detectHorizontalSwipe(now);

        // Check if hand is compressed into a tight solid fist
        if (density > 0.58 && count > 70 && area < 8500) {
          gesture = 'FIST';
        } else if (swipeGesture) {
          gesture = swipeGesture;
        } else if (density < 0.40 && count > 140) {
          gesture = 'OPEN_PALM';
        } else if (area < 2500 && count < 200 && this.consecutiveHandFrames > 3) {
          gesture = 'PINCH';
          if (now - this.lastPinchTime > 900) {
            this.lastPinchTime = now;
            gesture = 'PINCH_TRIGGER';
          }
        }

        this.activeGesture = gesture;

        // Draw tactical cursor feedback
        const cx = (1 - this.cursorX) * w;
        const cy = this.cursorY * h;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, 14, 0, 2 * Math.PI);
        this.ctx.strokeStyle = gesture === 'PINCH_TRIGGER' ? '#FFD700' : '#00F2FE';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();

        if (this.onGestureUpdate) {
          this.onGestureUpdate({
            hasHand: true,
            gesture,
            x: Math.max(0, Math.min(1, this.cursorX)),
            y: Math.max(0, Math.min(1, this.cursorY)),
            isOptical: true
          });
        }
      } else {
        this.noHandFrames++;
        if (this.noHandFrames > 6) {
          this.consecutiveHandFrames = 0;
          this.activeGesture = 'NONE';
          if (this.onGestureUpdate) {
            this.onGestureUpdate({
              hasHand: false,
              gesture: 'NONE',
              x: this.cursorX,
              y: this.cursorY,
              isOptical: true
            });
          }
        }
      }
    } catch (e) {
      // Ignored
    }
  }

  // MediaPipe AI Multi-Landmark High Precision Processor
  handleMediaPipeResults(results) {
    if (!this.isRunning) return;

    if (this.canvas && this.ctx) {
      this.drawHandSkeletonOverlay(results);
    }

    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
      this.noHandFrames++;
      if (this.noHandFrames > 5) {
        this.activeGesture = 'NONE';
        this.recentXHistory = [];
        if (this.onGestureUpdate) {
          this.onGestureUpdate({
            hasHand: false,
            gesture: 'NONE',
            x: this.cursorX,
            y: this.cursorY
          });
        }
      }
      return;
    }

    this.noHandFrames = 0;
    this.consecutiveHandFrames++;

    const lm = results.multiHandLandmarks[0];

    // Landmark references:
    // 0: Wrist
    // 4: Thumb tip, 3: Thumb IP, 2: Thumb MCP
    // 8: Index tip, 7: Index DIP, 6: Index PIP, 5: Index MCP
    // 12: Middle tip, 11: DIP, 10: PIP, 9: Middle MCP
    // 16: Ring tip, 14: PIP, 13: Ring MCP
    // 20: Pinky tip, 18: PIP, 17: Pinky MCP
    const wrist = lm[0];
    const thumbTip = lm[4];
    const thumbIp = lm[3];
    const indexTip = lm[8];
    const indexPip = lm[6];
    const indexMcp = lm[5];
    const middleTip = lm[12];
    const middlePip = lm[10];
    const middleMcp = lm[9];
    const ringTip = lm[16];
    const ringPip = lm[14];
    const ringMcp = lm[13];
    const pinkyTip = lm[20];
    const pinkyPip = lm[18];
    const pinkyMcp = lm[17];

    // Hand scale normalization: distance between wrist (0) and middle MCP (9)
    const handScale = Math.max(0.08, this.getDist(wrist, middleMcp));

    // Pointer position: use index tip (8) or midpoint between index and thumb during pinch
    const rawX = 1 - indexTip.x;
    const rawY = indexTip.y;

    // Fast adaptive exponential smoothing (low latency + anti-jitter)
    const moveDist = Math.hypot(rawX - this.cursorX, rawY - this.cursorY);
    const smoothFactor = moveDist > 0.15 ? 0.65 : (moveDist > 0.04 ? 0.45 : 0.28);
    this.cursorX = this.cursorX * (1 - smoothFactor) + rawX * smoothFactor;
    this.cursorY = this.cursorY * (1 - smoothFactor) + rawY * smoothFactor;

    // Track horizontal & vertical history for reliable wave/swipe detection
    const now = Date.now();
    const palmX = 1 - middleMcp.x;
    const palmY = middleMcp.y;
    this.recentXHistory.push({ x: palmX, y: palmY, time: now });
    if (this.recentXHistory.length > 20) {
      this.recentXHistory.shift();
    }

    // Finger extension & folding checks
    const indexExtended = this.getDist(indexTip, wrist) > this.getDist(indexPip, wrist) * 1.12 && this.getDist(indexTip, indexMcp) > handScale * 0.85;
    const middleExtended = this.getDist(middleTip, wrist) > this.getDist(middlePip, wrist) * 1.12 && this.getDist(middleTip, middleMcp) > handScale * 0.85;
    const ringExtended = this.getDist(ringTip, wrist) > this.getDist(ringPip, wrist) * 1.10 && this.getDist(ringTip, ringMcp) > handScale * 0.85;
    const pinkyExtended = this.getDist(pinkyTip, wrist) > this.getDist(pinkyPip, wrist) * 1.10 && this.getDist(pinkyTip, pinkyMcp) > handScale * 0.85;
    const thumbExtended = this.getDist(thumbTip, indexMcp) > handScale * 0.9;

    const extendedCount = [indexExtended, middleExtended, ringExtended, pinkyExtended].filter(Boolean).length;

    const indexFolded = !indexExtended;
    const middleFolded = !middleExtended;
    const ringFolded = !ringExtended;
    const pinkyFolded = !pinkyExtended;
    const allFourFolded = indexFolded && middleFolded && ringFolded && pinkyFolded;

    // Check if thumb is pointing strictly UP for Thumbs Up
    const thumbPointingUp = thumbTip.y < indexMcp.y - handScale * 0.35 && this.getDist(thumbTip, wrist) > handScale * 1.1;

    // Normalized pinch distance
    const rawPinchDist = this.getDist(thumbTip, indexTip);
    const normPinchDist = rawPinchDist / handScale;

    let gesture = 'POINTING';

    // 1. FIST DETECTION (Immediate Priority: Clenched fist silences AI instantly)
    if (allFourFolded && !thumbPointingUp) {
      gesture = 'FIST';
      this.isCurrentlyPinched = false;
    }
    // 2. THUMBS UP (Thumb points UP, 4 fingers folded -> AI Assistant)
    else if (allFourFolded && thumbPointingUp) {
      gesture = 'THUMBS_UP';
      this.isCurrentlyPinched = false;
    }
    // 3. HORIZONTAL WAVE / SWIPE (Any open/semi-open hand wave with >= 2 extended fingers switches maps reliably!)
    else if (extendedCount >= 2) {
      const swipe = this.detectHorizontalSwipe(now);
      if (swipe) {
        gesture = swipe;
      } else if (extendedCount >= 3) {
        gesture = 'OPEN_PALM';
      } else if (indexExtended && middleExtended && !ringExtended && !pinkyExtended) {
        gesture = 'PEACE';
      }
    }
    // 4. PINCH DETECTION (Thumb + Index touching, but hand is not a clenched fist)
    if (gesture === 'POINTING' && normPinchDist < 0.38 && !allFourFolded) {
      gesture = 'PINCH';
      if (!this.isCurrentlyPinched && (now - this.lastPinchTime > 800)) {
        this.lastPinchTime = now;
        this.isCurrentlyPinched = true;
        gesture = 'PINCH_TRIGGER';
      }
    } else if (normPinchDist > 0.50) {
      this.isCurrentlyPinched = false;
    }

    // 5. SHAKA GESTURE (Thumb + Pinky extended, middle three folded -> Audio status report)
    if (gesture === 'POINTING' && thumbExtended && pinkyExtended && !indexExtended && !middleExtended && !ringExtended) {
      gesture = 'SHAKA';
    }

    this.activeGesture = gesture;

    if (this.onGestureUpdate) {
      this.onGestureUpdate({
        hasHand: true,
        gesture,
        x: Math.max(0, Math.min(1, this.cursorX)),
        y: Math.max(0, Math.min(1, this.cursorY)),
        landmarks: lm
      });
    }
  }

  // Sliding-window horizontal wave/swipe detector with strict cooldown and queue sequencing
  detectHorizontalSwipe(now) {
    // 1200ms cooldown prevents double-triggering or reversing on hand return
    if (now - this.lastSwipeTime < 1200 || this.recentXHistory.length < 5) {
      return null;
    }
    const newest = this.recentXHistory[this.recentXHistory.length - 1];

    for (let i = 0; i < this.recentXHistory.length - 3; i++) {
      const sample = this.recentXHistory[i];
      const dt = newest.time - sample.time;
      if (dt >= 130 && dt <= 650) {
        const dx = newest.x - sample.x;
        const dy = (newest.y ?? 0.5) - (sample.y ?? 0.5);
        // Requires decisive horizontal motion with minimal vertical drift
        if (Math.abs(dx) > 0.18 && Math.abs(dx) > Math.abs(dy) * 1.8) {
          this.lastSwipeTime = now + 400; // Extra buffer to completely absorb hand return stroke
          this.recentXHistory = [];
          // In mirrored webcam view: dx > 0 is hand waving to the right (Next in queue), dx < 0 is waving left (Previous in queue)
          return dx > 0 ? 'SWIPE_RIGHT' : 'SWIPE_LEFT';
        }
      }
    }
    return null;
  }

  getDist(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  drawHandSkeletonOverlay(results) {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) return;

    const lm = results.multiHandLandmarks[0];

    // Tactical clean styling
    const isPinch = this.activeGesture === 'PINCH' || this.activeGesture === 'PINCH_TRIGGER';
    ctx.strokeStyle = isPinch ? '#FFD700' : (this.activeGesture === 'FIST' ? '#EF4444' : '#00F2FE');
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.beginPath();

    const bones = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [0, 5], [5, 6], [6, 7], [7, 8],
      [5, 9], [9, 10], [10, 11], [11, 12],
      [9, 13], [13, 14], [14, 15], [15, 16],
      [13, 17], [17, 18], [18, 19], [19, 20],
      [0, 17]
    ];

    for (let [i, j] of bones) {
      ctx.moveTo((1 - lm[i].x) * w, lm[i].y * h);
      ctx.lineTo((1 - lm[j].x) * w, lm[j].y * h);
    }
    ctx.stroke();

    // Finger joint points
    for (let i = 0; i < lm.length; i++) {
      const x = (1 - lm[i].x) * w;
      const y = lm[i].y * h;
      ctx.beginPath();
      const r = (i === 8 || i === 4) ? 5.5 : 3;
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = i === 8 ? '#00F2FE' : (i === 4 ? '#FFD700' : '#10B981');
      ctx.fill();
    }
  }

  stop() {
    this.isRunning = false;
    this.isProcessingFrame = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    if (this.video) {
      this.video.srcObject = null;
    }
    if (this.hands) {
      try { this.hands.close(); } catch (e) {}
      this.hands = null;
    }
    this.mediaPipeReady = false;
    this.notifyStatus('STOPPED', 'Камера выключена');
  }
}
