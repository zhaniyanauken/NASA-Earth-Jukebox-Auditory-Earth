# NASA Earth Jukebox × Chromophonia 🛰️🎶

[![NASA SVS Gallery #40509](https://img.shields.io/badge/NASA%20SVS-Gallery%20%2340509-blue.svg)](http://svs.gsfc.nasa.gov/gallery/earth-now-dashboard/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Accessibility: WCAG AAA](https://img.shields.io/badge/Accessibility-WCAG%20AAA-orange.svg)](https://www.w3.org/WAI/WCAG2AAA-Conformance)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-cyan.svg)](https://react.dev/)

An interactive, accessibility-first planetary sonification and exploratory platform built for the **NASA Space Apps Challenge**. Calibrated directly to official datasets from the **NASA Scientific Visualization Studio (SVS #40509 Earth Now Dashboard)**, NASA Earth Jukebox transforms global satellite and climate model observations into dynamic acoustic soundscapes, musical timbres, and interactive educational experiences.

---

## 🌟 Executive Summary

**NASA Earth Jukebox × Chromophonia** is an interactive multi-sensory Earth science platform developed for the NASA Space Apps Challenge. Calibrated directly to official NASA Scientific Visualization Studio (SVS #40509) Earth Now datasets, the application transforms global satellite observations—such as GEOS-FP wind speeds, precipitation, wildfire radiative power, and atmospheric trace gases—into multi-layered soundscapes and music. Built with an accessibility-first architecture for blind and visually impaired users, it features real-time sonification, WCAG AAA high-contrast visuals, keyboard shortcuts, hands-free voice interaction, and webcam hand-tracking powered by MediaPipe AI. Users navigate 12 curated planetary datasets through natural gestures: pointing steers geographical coordinates, pinching probes local sensor measurements, clenched fists silence speech, and hand waves sequentially cycle map layers. An integrated cartoon-inspired voice assistant, **Wally**, provides real-time scientific explanations, creating an engaging, hands-free bridge between orbital NASA data and human perception.

---

## 🖐️ AI Gesture Control System (MediaPipe 3D Landmark & Optical Flow)

The platform provides a dual-engine contactless gesture control interface using your webcam. No special hardware is required:

| Gesture | Icon | Action & Functionality |
| :--- | :---: | :--- |
| **Index Finger Point** | ☝️ | **Coordinate Navigation:** Steers the tactical pointer across latitude and longitude. Real-time sonification dynamically reacts to the environmental data under your fingertip. |
| **Finger Pinch** | 👌 | **Sensor Probe:** Pinching index finger and thumb triggers a precision measurement reading, announces scientific values, and chimes the local sonification chord. |
| **Clenched Fist** | ✊ | **Instant Silence (Silence Wally):** Clenching your hand into a tight fist immediately silences the voice assistant if you want pure audio sonification. |
| **Wave Right** | 👋➡️ | **Next Map in Queue:** Decisive wave to the right switches to the next dataset strictly in sequential order (1 → 2 → ... → 12) with return-stroke suppression. |
| **Wave Left** | ⬅️👋 | **Previous Map in Queue:** Decisive wave to the left steps backward through the queue sequence. |
| **Thumbs Up** | 👍 | **Wake Wally AI:** Opens the assistant dialogue modal and immediately listens for questions about global climate patterns. |
| **Shaka Sign** | 🤙 | **Audio Status Brief:** Thumb and pinky extended triggers an immediate spoken geographical coordinate and environmental reading report. |
| **Peace Sign (V)** | ✌️ | **Equator Harmony Chime:** Triggers a planetary harmonic overtone chime. |

---

## 🛰️ 12 Active NASA SVS #40509 Datasets

The dashboard features 12 curated planetary visualizations across models and satellites:

1. **Near-Surface Air Temperature** (`geos_temp`): NASA GMAO GEOS-FP Model (SVS #5147).
2. **Wind Speed at 10m** (`geos_wind`): NASA GMAO GEOS-FP Model (SVS #5148).
3. **Precipitation & Clouds** (`geos_precip`): NASA GMAO GEOS-FP Model (SVS #5149).
4. **Specific Humidity Q2M** (`geos_humidity`): NASA GMAO GEOS-FP Model (SVS #5150).
5. **Particulate Matter PM2.5** (`geos_pm25`): NASA GMAO GEOS-CF Composition Forecast (SVS #5151).
6. **Surface Ozone O3** (`geos_o3`): NASA GMAO GEOS-CF Composition Forecast (SVS #5152).
7. **Carbon Monoxide CO** (`geos_co`): NASA GMAO GEOS-CF Composition Forecast (SVS #5153).
8. **Nitrogen Oxides NOx** (`geos_nox`): NASA GMAO GEOS-CF Composition Forecast (SVS #5154).
9. **Active Wildfires (Suomi NPP VIIRS)** (`wv_fires`): NASA Worldview LANCE Near Real-Time Active Fires.
10. **Daily Rain & Snow** (`wv_precip`): NASA Worldview Multi-Satellite Precipitation.
11. **Sea Surface Temperature (SST)** (`wv_sst`): NASA Worldview Global Ocean Temperature.
12. **NOAA GOES True-Color Disk** (`goes_truecolor`): Full-Disk Geostationary Imagery (SVS #5120).

---

## 🤖 Meet "Wally" — Cartoon Voice Assistant

Wally is an embedded AI scientific guide designed to emulate a playful cartoon character:
* **Always-On Wake Word:** Speak `"Wally"`, `"Wall-E"`, or `"Walle"` anywhere in your sentence to prompt an answer.
* **Resilient Audio Loop:** Automatically recovers from browser speech interruption errors, ensuring the assistant never goes deaf.
* **Authentic Web Audio Chirps:** Generates characteristic cartoon-like chirp, happy, and wake sound effects using custom frequency synthesis and pitch contours.
* **Clenched Fist Mute:** Fast physical reflex mute by simply clenching your fist on camera.

---

## ♿ Comprehensive Accessibility Architecture

Designed from the ground up for low-vision and blind users:
* **Audio Mute Isolation:** Toggling audio mute mutes continuous environmental sonification while preserving crystal-clear voice feedback from Wally.
* **Full Keyboard Navigation:**
  * `[Arrow Keys]` — Pan latitude and longitude across Earth.
  * `[Space]` / `[Enter]` — Probe sensor data at current position.
  * `[1]` to `[7]` — Instant quick jump to featured planetary datasets.
  * `[C]` — Toggle webcam hand tracking.
  * `[M]` — Toggle audio sonification on / muted.
  * `[A]` — Open Wally Voice Assistant dialog.
  * `[H]` — Open interactive accessibility help guide.
* **WCAG AAA Contrast Mode:** One-click high-contrast mode with bold outlines and enhanced legibility.
* **ARIA Live Announcements:** Dynamic screen-reader polite notifications for coordinate and dataset updates.

---

## 🛠️ Installation & Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18 or higher recommended)
* Modern web browser with Web Audio API, Web Speech API, and WebRTC support (e.g., Google Chrome, Microsoft Edge)

### Setup Instructions

1. **Navigate to the application folder and install dependencies:**
   ```bash
   cd "NASA SpaceApp/NASA SpaceApp"
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000/`. Click anywhere on the interface or press `[Space]` to initialize the Web Audio context.

4. **Production Build:**
   ```bash
   npm run build
   ```

---

## 🛰️ Credits & Acknowledgments
* **NASA Scientific Visualization Studio (SVS):** Gallery #40509 "Earth Now Dashboard".
* **NASA Global Modeling and Assimilation Office (GMAO):** GEOS-FP and GEOS-CF weather & atmospheric chemistry models.
* **NASA EOSDIS / LANCE / Worldview:** Near real-time satellite imagery and thermal anomaly detection.
* **MediaPipe Hands:** Real-time machine learning hand tracking.

---
*Created for the NASA Space Apps Challenge.*

