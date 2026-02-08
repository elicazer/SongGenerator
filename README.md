# SongGenerator
AI-powered procedural music generator that creates full songs with dynamic arrangements, multiple instruments, and genre-specific patterns.

## Features
- **10 Genres:** Lo-Fi, EDM, Synthwave, Drum & Bass, Trap, Hip-Hop, Jazz, Rock, Chiptune, Ambient
- **Dynamic Arrangements:** Genre-specific song structures (intro → verse → chorus → bridge → outro)
- **Multiple Instruments:** Piano, pluck, synth, bells, supersaw, brass, mallets — layered per section
- **Motif-Based Melodies:** Quantized to the beat with proper music theory
- **Beat Variation:** Drum patterns evolve throughout the song with fills and transitions
- **WAV Export:** Download your generated songs

## Usage
Open `index.html` in your browser. No server required.

1. Select a genre and key
2. Adjust tempo, energy, complexity, and duration
3. Click **Generate**
4. Click **Play** to preview
5. Click **Export WAV** to download

## Controls
- **Genre** — Musical style and instrument selection
- **Key** — Musical key (major/minor)
- **Tempo** — BPM (70-180)
- **Energy** — Drum intensity and pattern density
- **Complexity** — Melody variation and note density
- **Duration** — Song length (1-4 minutes)

## Tech
- [Tone.js](https://tonejs.github.io/) for audio synthesis
- Web Audio API
- Pure JavaScript, no build tools required

## Files
- `index.html` — UI and styles
- `song-engine-v3.js` — Core music generation engine
