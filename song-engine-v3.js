/**
 * SONG GENERATOR V3
 * Advanced procedural music with:
 * - Dynamic arrangements with real variation
 * - Motif-based melodies that develop
 * - Genre-specific drum patterns with fills
 * - Build-ups, drops, transitions
 * - Multiple instrument layers
 * - FX and ear candy
 */

// ============================================
// MUSIC THEORY ENGINE
// ============================================

const Theory = {
    notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    
    scales: {
        major: [0, 2, 4, 5, 7, 9, 11],
        minor: [0, 2, 3, 5, 7, 8, 10],
        dorian: [0, 2, 3, 5, 7, 9, 10],
        mixolydian: [0, 2, 4, 5, 7, 9, 10],
        pentatonicMaj: [0, 2, 4, 7, 9],
        pentatonicMin: [0, 3, 5, 7, 10],
        blues: [0, 3, 5, 6, 7, 10]
    },

    chordTypes: {
        major: [0, 4, 7],
        minor: [0, 3, 7],
        major7: [0, 4, 7, 11],
        minor7: [0, 3, 7, 10],
        dom7: [0, 4, 7, 10],
        sus4: [0, 5, 7],
        sus2: [0, 2, 7],
        dim: [0, 3, 6],
        aug: [0, 4, 8]
    },

    // Genre-specific progressions with more variety
    progressions: {
        lofi: [
            [{ d: 'ii', t: 'minor7' }, { d: 'V', t: 'dom7' }, { d: 'I', t: 'major7' }, { d: 'vi', t: 'minor7' }],
            [{ d: 'I', t: 'major7' }, { d: 'vi', t: 'minor7' }, { d: 'ii', t: 'minor7' }, { d: 'V', t: 'dom7' }],
            [{ d: 'iii', t: 'minor7' }, { d: 'vi', t: 'minor7' }, { d: 'ii', t: 'minor7' }, { d: 'V', t: 'dom7' }]
        ],
        edm: [
            [{ d: 'vi', t: 'minor' }, { d: 'IV', t: 'major' }, { d: 'I', t: 'major' }, { d: 'V', t: 'major' }],
            [{ d: 'i', t: 'minor' }, { d: 'VI', t: 'major' }, { d: 'III', t: 'major' }, { d: 'VII', t: 'major' }],
            [{ d: 'i', t: 'minor' }, { d: 'i', t: 'minor' }, { d: 'VI', t: 'major' }, { d: 'VII', t: 'major' }]
        ],
        synthwave: [
            [{ d: 'i', t: 'minor' }, { d: 'VI', t: 'major' }, { d: 'III', t: 'major' }, { d: 'VII', t: 'major' }],
            [{ d: 'i', t: 'minor' }, { d: 'iv', t: 'minor' }, { d: 'VI', t: 'major' }, { d: 'V', t: 'major' }],
            [{ d: 'i', t: 'minor' }, { d: 'III', t: 'major' }, { d: 'VII', t: 'major' }, { d: 'VI', t: 'major' }]
        ],
        dnb: [
            [{ d: 'i', t: 'minor' }, { d: 'VI', t: 'major' }, { d: 'i', t: 'minor' }, { d: 'VII', t: 'major' }],
            [{ d: 'i', t: 'minor' }, { d: 'iv', t: 'minor' }, { d: 'i', t: 'minor' }, { d: 'V', t: 'major' }]
        ],
        chiptune: [
            [{ d: 'I', t: 'major' }, { d: 'IV', t: 'major' }, { d: 'V', t: 'major' }, { d: 'I', t: 'major' }],
            [{ d: 'I', t: 'major' }, { d: 'V', t: 'major' }, { d: 'vi', t: 'minor' }, { d: 'IV', t: 'major' }],
            [{ d: 'vi', t: 'minor' }, { d: 'IV', t: 'major' }, { d: 'I', t: 'major' }, { d: 'V', t: 'major' }]
        ],
        ambient: [
            [{ d: 'I', t: 'major7' }, { d: 'IV', t: 'major7' }, { d: 'I', t: 'major7' }, { d: 'IV', t: 'major7' }],
            [{ d: 'i', t: 'minor7' }, { d: 'iv', t: 'minor7' }, { d: 'i', t: 'minor7' }, { d: 'VI', t: 'major7' }]
        ],
        jazz: [
            [{ d: 'ii', t: 'minor7' }, { d: 'V', t: 'dom7' }, { d: 'I', t: 'major7' }, { d: 'vi', t: 'minor7' }],
            [{ d: 'I', t: 'major7' }, { d: 'vi', t: 'minor7' }, { d: 'ii', t: 'minor7' }, { d: 'V', t: 'dom7' }],
            [{ d: 'iii', t: 'minor7' }, { d: 'VI', t: 'dom7' }, { d: 'ii', t: 'minor7' }, { d: 'V', t: 'dom7' }]
        ],
        rock: [
            [{ d: 'I', t: 'major' }, { d: 'IV', t: 'major' }, { d: 'V', t: 'major' }, { d: 'I', t: 'major' }],
            [{ d: 'I', t: 'major' }, { d: 'bVII', t: 'major' }, { d: 'IV', t: 'major' }, { d: 'I', t: 'major' }],
            [{ d: 'vi', t: 'minor' }, { d: 'IV', t: 'major' }, { d: 'I', t: 'major' }, { d: 'V', t: 'major' }]
        ],
        hiphop: [
            [{ d: 'i', t: 'minor7' }, { d: 'iv', t: 'minor7' }, { d: 'i', t: 'minor7' }, { d: 'VI', t: 'major7' }],
            [{ d: 'i', t: 'minor' }, { d: 'VI', t: 'major' }, { d: 'III', t: 'major' }, { d: 'VII', t: 'major' }],
            [{ d: 'vi', t: 'minor7' }, { d: 'IV', t: 'major7' }, { d: 'I', t: 'major7' }, { d: 'V', t: 'dom7' }]
        ],
        trap: [
            [{ d: 'i', t: 'minor' }, { d: 'i', t: 'minor' }, { d: 'i', t: 'minor' }, { d: 'i', t: 'minor' }],
            [{ d: 'i', t: 'minor' }, { d: 'VI', t: 'major' }, { d: 'i', t: 'minor' }, { d: 'VII', t: 'major' }],
            [{ d: 'i', t: 'minor' }, { d: 'iv', t: 'minor' }, { d: 'i', t: 'minor' }, { d: 'v', t: 'minor' }]
        ]
    },

    degreeToSemitones: {
        'I': 0, 'i': 0,
        'II': 2, 'ii': 2,
        'III': 4, 'iii': 4, 'bIII': 3,
        'IV': 5, 'iv': 5,
        'V': 7, 'v': 7,
        'VI': 9, 'vi': 9, 'bVI': 8,
        'VII': 11, 'vii': 11, 'bVII': 10
    },

    noteToName(noteNum, octave) {
        const idx = ((noteNum % 12) + 12) % 12;
        return this.notes[idx] + octave;
    },

    getScaleNotes(root, scaleType, octave) {
        const rootIdx = this.notes.indexOf(root);
        const intervals = this.scales[scaleType] || this.scales.major;
        return intervals.map(interval => ({
            note: this.noteToName(rootIdx + interval, octave),
            degree: intervals.indexOf(interval)
        }));
    },

    getChordNotes(root, chordType, octave) {
        const rootIdx = this.notes.indexOf(root);
        const intervals = this.chordTypes[chordType] || this.chordTypes.major;
        return intervals.map(interval => this.noteToName(rootIdx + interval, octave));
    },

    resolveProgression(progression, rootNote, isMinor) {
        const rootIdx = this.notes.indexOf(rootNote.replace('m', ''));
        return progression.map(chord => {
            const semitones = this.degreeToSemitones[chord.d] || 0;
            const chordRoot = this.notes[(rootIdx + semitones) % 12];
            return {
                root: chordRoot,
                type: chord.t,
                notes: this.getChordNotes(chordRoot, chord.t, 3)
            };
        });
    },

    random(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
};

// ============================================
// RHYTHM & PATTERN GENERATOR
// ============================================

const Rhythm = {
    // Euclidean rhythm generator - creates interesting polyrhythms
    euclidean(steps, pulses) {
        const pattern = new Array(steps).fill(0);
        if (pulses === 0) return pattern;
        if (pulses >= steps) return new Array(steps).fill(1);
        
        let bucket = 0;
        for (let i = 0; i < steps; i++) {
            bucket += pulses;
            if (bucket >= steps) {
                bucket -= steps;
                pattern[i] = 1;
            }
        }
        return pattern;
    },

    // Swing timing (for lo-fi, jazz)
    applySwing(time, amount, subdivision = 0.5) {
        const beat = time % subdivision;
        const isOffbeat = beat > subdivision / 4;
        if (isOffbeat) {
            return time + (amount * subdivision * 0.3);
        }
        return time;
    },

    // Generate drum pattern based on genre
    getDrumPattern(genre, section, energy) {
        const patterns = {
            lofi: {
                verse: {
                    kick:  [1,0,0,0, 0,0,1,0, 0,0,0,0, 0,0,0,0],
                    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                    hat:   [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
                    perc:  [0,0,0,0, 0,0,0,1, 0,0,0,0, 0,0,0,1]
                },
                chorus: {
                    kick:  [1,0,0,0, 0,0,1,0, 0,1,0,0, 0,0,0,0],
                    snare: [0,0,0,0, 1,0,0,1, 0,0,0,0, 1,0,0,0],
                    hat:   [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
                    perc:  [0,0,0,1, 0,0,0,0, 0,0,0,1, 0,0,1,0]
                }
            },
            edm: {
                verse: {
                    kick:  [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
                    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                    hat:   [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
                    perc:  [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
                },
                chorus: {
                    kick:  [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
                    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                    hat:   [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
                    perc:  [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,1,1,1]
                },
                drop: {
                    kick:  [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
                    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1],
                    hat:   [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
                    perc:  [0,1,0,1, 0,1,0,1, 0,1,0,1, 0,1,0,1]
                }
            },
            dnb: {
                verse: {
                    kick:  [1,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0],
                    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                    hat:   [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
                    perc:  [0,0,0,1, 0,0,1,0, 0,0,0,1, 0,1,0,0]
                },
                chorus: {
                    kick:  [1,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0],
                    snare: [0,0,0,0, 1,0,0,1, 0,0,0,0, 1,0,1,0],
                    hat:   [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
                    perc:  [0,1,0,1, 0,0,1,0, 0,1,0,1, 0,0,1,1]
                }
            },
            trap: {
                verse: {
                    kick:  [1,0,0,0, 0,0,0,1, 0,1,0,0, 0,0,0,0],
                    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                    hat:   [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
                    perc:  [0,0,0,0, 0,0,1,0, 0,0,0,0, 0,0,1,1]
                },
                chorus: {
                    kick:  [1,0,0,0, 0,0,1,0, 0,1,0,0, 0,0,0,1],
                    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                    hat:   [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1], // Will get rolls added
                    perc:  [0,0,1,0, 0,0,0,1, 0,0,1,0, 0,1,0,1]
                }
            },
            hiphop: {
                verse: {
                    kick:  [1,0,0,0, 0,0,0,1, 0,1,0,0, 0,0,0,0],
                    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                    hat:   [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
                    perc:  [0,0,0,0, 0,0,0,1, 0,0,0,0, 0,0,1,0]
                },
                chorus: {
                    kick:  [1,0,0,0, 0,0,1,0, 0,1,0,0, 0,0,0,1],
                    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1],
                    hat:   [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
                    perc:  [0,0,0,1, 0,0,0,0, 0,0,0,1, 0,1,0,0]
                }
            },
            synthwave: {
                verse: {
                    kick:  [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
                    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1],
                    hat:   [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
                    perc:  [0,0,0,0, 0,0,0,1, 0,0,0,0, 0,0,0,0]
                },
                chorus: {
                    kick:  [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
                    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                    hat:   [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
                    perc:  [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,1]
                }
            },
            jazz: {
                verse: {
                    kick:  [1,0,0,0, 0,0,1,0, 0,0,0,0, 1,0,0,0],
                    snare: [0,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0],
                    hat:   [1,0,1,1, 0,1,1,0, 1,0,1,1, 0,1,1,0],
                    perc:  [0,0,0,1, 0,0,0,0, 0,0,0,1, 0,0,0,0]
                },
                chorus: {
                    kick:  [1,0,0,0, 0,0,1,0, 0,1,0,0, 0,0,1,0],
                    snare: [0,0,0,0, 1,0,0,1, 0,0,0,0, 1,0,0,0],
                    hat:   [1,0,1,1, 0,1,1,0, 1,0,1,1, 0,1,1,0],
                    perc:  [0,1,0,0, 0,0,0,1, 0,1,0,0, 0,0,1,0]
                }
            },
            rock: {
                verse: {
                    kick:  [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
                    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                    hat:   [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
                    perc:  [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
                },
                chorus: {
                    kick:  [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,1,0],
                    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                    hat:   [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
                    perc:  [0,0,0,0, 0,0,1,0, 0,0,0,0, 0,0,1,1]
                }
            },
            chiptune: {
                verse: {
                    kick:  [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
                    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                    hat:   [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
                    perc:  [0,0,0,1, 0,0,0,0, 0,0,0,1, 0,0,0,0]
                },
                chorus: {
                    kick:  [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,1,0],
                    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1],
                    hat:   [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
                    perc:  [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,1,1,1]
                }
            },
            ambient: {
                verse: {
                    kick:  [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                    snare: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                    hat:   [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                    perc:  [0,0,0,0, 0,0,0,1, 0,0,0,0, 0,0,0,0]
                },
                chorus: {
                    kick:  [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                    snare: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                    hat:   [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                    perc:  [0,0,0,0, 0,0,0,1, 0,0,0,0, 0,0,0,1]
                }
            }
        };

        const genrePatterns = patterns[genre] || patterns.lofi;
        const sectionType = section.includes('chorus') || section.includes('drop') ? 'chorus' : 
                          section.includes('drop') && genrePatterns.drop ? 'drop' : 'verse';
        
        return genrePatterns[sectionType] || genrePatterns.verse;
    },

    // Get variation of a pattern (subtle changes)
    getPatternVariation(basePattern, variationLevel) {
        const varied = {
            kick: [...basePattern.kick],
            snare: [...basePattern.snare],
            hat: [...basePattern.hat],
            perc: basePattern.perc ? [...basePattern.perc] : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        };
        
        if (variationLevel === 0) return varied;
        
        // Variation 1: Add/remove a kick
        if (variationLevel >= 1) {
            const kickPos = [2, 6, 10, 14][Math.floor(Math.random() * 4)];
            varied.kick[kickPos] = varied.kick[kickPos] ? 0 : 1;
        }
        
        // Variation 2: Change hi-hat pattern
        if (variationLevel >= 2) {
            // Add some open hats or remove some hits
            if (Math.random() > 0.5) {
                varied.hat = varied.hat.map((h, i) => i % 4 === 2 ? 1 : h); // Add offbeats
            } else {
                varied.hat = varied.hat.map((h, i) => i % 2 === 0 ? h : (Math.random() > 0.3 ? h : 0)); // Thin out
            }
        }
        
        // Variation 3: Ghost snares
        if (variationLevel >= 3 && Math.random() > 0.5) {
            const ghostPos = [2, 6, 10, 14][Math.floor(Math.random() * 4)];
            varied.snare[ghostPos] = 0.5; // Half velocity ghost note
        }
        
        return varied;
    },

    // Get half-time pattern (for breakdowns)
    getHalfTimePattern(basePattern) {
        return {
            kick:  [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
            snare: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
            hat:   [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
            perc:  [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
        };
    },

    // Generate drum fill for transitions
    generateFill(genre, intensity) {
        const fills = {
            snare: [],
            kick: [],
            hat: []
        };
        
        // Snare fill patterns
        if (intensity > 0.7) {
            fills.snare = [0,0,0,0, 0,0,1,0, 1,0,1,0, 1,1,1,1];
        } else if (intensity > 0.4) {
            fills.snare = [0,0,0,0, 0,0,0,0, 1,0,0,0, 1,0,1,0];
        } else {
            fills.snare = [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0];
        }
        
        fills.kick = [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,1];
        
        if (intensity > 0.5) {
            fills.hat = [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,1,1,1];
        } else {
            fills.hat = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,1];
        }
        
        return fills;
    },

    // Generate a beat drop (silence before drop)
    generateBeatDrop() {
        return {
            kick:  [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
            snare: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,1],
            hat:   [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
            perc:  [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
        };
    }
};

// ============================================
// MELODY GENERATOR - Quantized & Musical
// ============================================

const MelodyGen = {
    // Quantized rhythm patterns per genre (in 16th notes, 16 = 1 bar)
    rhythmPatterns: {
        lofi: [
            [0, 6, 8, 14],           // Lazy, behind the beat
            [0, 4, 10, 12],          // Sparse
            [2, 6, 10, 14],          // Swung offbeats
        ],
        edm: [
            [0, 4, 8, 12],           // Straight 4s
            [0, 2, 4, 8, 12, 14],    // Rhythmic stabs
            [0, 8],                  // Half notes - powerful
        ],
        synthwave: [
            [0, 4, 8, 12],           // Straight
            [0, 6, 8, 14],           // Slight swing
            [0, 4, 6, 8, 12, 14],    // Arpeggiated feel
        ],
        dnb: [
            [0, 3, 6, 10, 12],       // Syncopated
            [0, 4, 7, 12, 15],       // Broken
            [0, 6, 12],              // Sparse hits
        ],
        trap: [
            [0, 6, 8, 12],           // Triplet-ish
            [0, 4, 10, 14],          // Sparse bounce
            [0, 3, 8, 11],           // Triplet flow
        ],
        hiphop: [
            [0, 4, 8, 14],           // Laid back
            [0, 6, 10, 12],          // Swung
            [2, 6, 8, 14],           // Behind beat
        ],
        jazz: [
            [0, 3, 6, 10, 13],       // Swing 8ths
            [0, 5, 8, 10, 14],       // Bebop rhythm
            [0, 6, 9, 12],           // Triplet feel
        ],
        rock: [
            [0, 4, 8, 12],           // Straight 8ths
            [0, 2, 8, 10],           // Driving
            [0, 4, 8, 10, 12],       // With pickup
        ],
        chiptune: [
            [0, 2, 4, 6, 8, 10, 12, 14], // Fast arps
            [0, 4, 8, 12],           // Quarter notes
            [0, 2, 8, 10],           // Staccato
        ],
        ambient: [
            [0, 8],                  // Very sparse
            [0, 12],                 // Whole + dotted
            [0],                     // Single note per bar
        ]
    },

    // Chord tones for strong beats (scale degrees 0, 2, 4 = root, 3rd, 5th)
    chordTones: [0, 2, 4],
    passingTones: [1, 3, 5, 6],

    generateMotif(scale, complexity, genre) {
        const motifLength = complexity > 60 ? 4 : (complexity > 30 ? 3 : 2);
        const motif = [];
        
        // Start on a chord tone
        let currentIdx = this.chordTones[Math.floor(Math.random() * this.chordTones.length)];
        
        for (let i = 0; i < motifLength; i++) {
            // First and last notes should be chord tones
            const useChordTone = (i === 0 || i === motifLength - 1 || Math.random() < 0.6);
            
            if (useChordTone && i > 0) {
                currentIdx = this.chordTones[Math.floor(Math.random() * this.chordTones.length)];
            } else if (i > 0) {
                // Step to nearby note
                const step = Math.random() < 0.7 ? (Math.random() < 0.5 ? 1 : -1) : (Math.random() < 0.5 ? 2 : -2);
                currentIdx = Math.max(0, Math.min(scale.length - 1, currentIdx + step));
            }
            
            motif.push({
                scaleIdx: currentIdx,
                position: i,  // Position in phrase
                isChordTone: this.chordTones.includes(currentIdx % 7),
                velocity: i === 0 ? 0.8 : (0.5 + Math.random() * 0.3)  // First note strongest
            });
        }
        return motif;
    },

    developMotif(motif, scale, bars, section, complexity, genre = 'lofi') {
        const melody = [];
        const patterns = this.rhythmPatterns[genre] || this.rhythmPatterns.lofi;
        const isChorus = section.includes('chorus') || section.includes('drop');
        
        for (let bar = 0; bar < bars; bar++) {
            // Pick a rhythm pattern
            const pattern = patterns[Math.floor(Math.random() * patterns.length)];
            
            // Decide if this bar has melody (add rests for breathing room)
            const playThisBar = isChorus ? (Math.random() < 0.85) : (Math.random() < 0.65);
            if (!playThisBar) continue;
            
            // Transpose motif every few bars for variety
            const transpose = Math.floor(bar / 2) % 3 === 1 ? 2 : (Math.floor(bar / 2) % 3 === 2 ? -2 : 0);
            
            // Map motif notes to rhythm pattern positions
            const notesToPlay = Math.min(motif.length, pattern.length);
            
            for (let i = 0; i < notesToPlay; i++) {
                const motifNote = motif[i % motif.length];
                const sixteenthPos = pattern[i];
                const beatTime = bar * 4 + (sixteenthPos / 4);  // Convert 16ths to beats
                
                // Calculate note index with transposition
                let noteIdx = motifNote.scaleIdx + transpose;
                noteIdx = Math.max(0, Math.min(scale.length - 1, noteIdx));
                
                // Strong beats (0, 8) get chord tones
                const isStrongBeat = (sixteenthPos === 0 || sixteenthPos === 8);
                if (isStrongBeat && !motifNote.isChordTone && Math.random() < 0.7) {
                    noteIdx = this.chordTones[Math.floor(Math.random() * this.chordTones.length)];
                }
                
                // Duration based on gap to next note
                const nextPos = pattern[i + 1] || 16;
                const duration = Math.min((nextPos - sixteenthPos) / 4 * 0.8, 1);
                
                melody.push({
                    note: scale[noteIdx].note,
                    time: beatTime,
                    duration: Math.max(0.15, duration),
                    velocity: isStrongBeat ? 0.75 : motifNote.velocity * (isChorus ? 1 : 0.85)
                });
            }
        }
        return melody;
    },

    generateArpeggio(chordNotes, bars, pattern = 'up', genre = 'lofi') {
        const arp = [];
        const beatsPerBar = 4;
        
        // Genre-specific arp speeds (notes per beat)
        const speeds = {
            lofi: 2, edm: 4, synthwave: 4, dnb: 4, trap: 3,
            hiphop: 2, jazz: 3, rock: 2, chiptune: 4, ambient: 1
        };
        const notesPerBeat = speeds[genre] || 2;
        
        let noteIdx = 0;
        let goingUp = pattern !== 'down';
        
        for (let bar = 0; bar < bars; bar++) {
            // Rest some bars for variety
            if (Math.random() < 0.2) continue;
            
            for (let beat = 0; beat < beatsPerBar; beat++) {
                for (let sub = 0; sub < notesPerBeat; sub++) {
                    const time = bar * beatsPerBar + beat + (sub / notesPerBeat);
                    
                    arp.push({
                        note: chordNotes[noteIdx],
                        time: time,
                        duration: 0.8 / notesPerBeat,
                        velocity: (sub === 0 && beat % 2 === 0) ? 0.6 : 0.4
                    });
                    
                    // Update index based on pattern
                    if (pattern === 'updown') {
                        if (goingUp) {
                            noteIdx++;
                            if (noteIdx >= chordNotes.length - 1) goingUp = false;
                        } else {
                            noteIdx--;
                            if (noteIdx <= 0) goingUp = true;
                        }
                    } else {
                        const dir = pattern === 'down' ? -1 : 1;
                        noteIdx = (noteIdx + dir + chordNotes.length) % chordNotes.length;
                    }
                }
            }
        }
        return arp;
    }
};

// ============================================
// ARRANGEMENT ENGINE
// ============================================

const Arranger = {
    structures: {
        lofi: ['intro', 'verse', 'verse', 'chorus', 'verse', 'chorus', 'outro'],
        edm: ['intro', 'buildup', 'drop', 'breakdown', 'buildup', 'drop', 'outro'],
        synthwave: ['intro', 'verse', 'chorus', 'verse', 'chorus', 'bridge', 'chorus', 'outro'],
        dnb: ['intro', 'verse', 'drop', 'breakdown', 'drop', 'outro'],
        trap: ['intro', 'verse', 'chorus', 'verse', 'chorus', 'bridge', 'chorus', 'outro'],
        hiphop: ['intro', 'verse', 'chorus', 'verse', 'chorus', 'verse', 'chorus', 'outro'],
        jazz: ['intro', 'head', 'solo', 'head', 'outro'],
        rock: ['intro', 'verse', 'chorus', 'verse', 'chorus', 'bridge', 'chorus', 'outro'],
        chiptune: ['intro', 'verse', 'chorus', 'verse', 'chorus', 'bridge', 'chorus', 'outro'],
        ambient: ['intro', 'verse', 'verse', 'chorus', 'verse', 'outro']
    },

    sectionLengths: {
        lofi:     { intro: 4, verse: 8, chorus: 8, bridge: 4, outro: 4, buildup: 4, drop: 8, breakdown: 4 },
        edm:      { intro: 8, verse: 8, chorus: 8, bridge: 4, outro: 8, buildup: 8, drop: 16, breakdown: 8 },
        synthwave:{ intro: 8, verse: 8, chorus: 8, bridge: 8, outro: 8, buildup: 4, drop: 8, breakdown: 4 },
        dnb:      { intro: 8, verse: 8, chorus: 8, bridge: 4, outro: 8, buildup: 4, drop: 16, breakdown: 8 },
        trap:     { intro: 4, verse: 8, chorus: 8, bridge: 4, outro: 4, buildup: 4, drop: 8, breakdown: 4 },
        hiphop:   { intro: 4, verse: 16, chorus: 8, bridge: 8, outro: 4, buildup: 4, drop: 8, breakdown: 4 },
        jazz:     { intro: 4, head: 8, solo: 16, outro: 4, verse: 8, chorus: 8, bridge: 4 },
        rock:     { intro: 4, verse: 8, chorus: 8, bridge: 8, outro: 4, buildup: 4, drop: 8, breakdown: 4 },
        chiptune: { intro: 4, verse: 8, chorus: 8, bridge: 4, outro: 4, buildup: 4, drop: 8, breakdown: 4 },
        ambient:  { intro: 8, verse: 16, chorus: 16, outro: 8, bridge: 8, buildup: 4, drop: 8, breakdown: 4 }
    },

    // Reduced lead presence, more variety
    instrumentation: {
        intro:     { drums: 0.3, bass: 0.5, pad: 1, lead: 0, arp: 0.4, fx: 0.3 },
        verse:     { drums: 1, bass: 1, pad: 0.8, lead: 0.4, arp: 0.3, fx: 0.2 },
        chorus:    { drums: 1, bass: 1, pad: 1, lead: 0.7, arp: 0.5, fx: 0.4 },
        drop:      { drums: 1, bass: 1, pad: 0.7, lead: 0.6, arp: 0.7, fx: 0.6 },
        breakdown: { drums: 0.3, bass: 0.5, pad: 1, lead: 0, arp: 0.6, fx: 0.5 },
        buildup:   { drums: 0.7, bass: 0.7, pad: 1, lead: 0, arp: 1, fx: 1 },
        bridge:    { drums: 0.7, bass: 0.8, pad: 1, lead: 0.3, arp: 0.4, fx: 0.3 },
        head:      { drums: 0.8, bass: 1, pad: 0.7, lead: 0.8, arp: 0, fx: 0.2 },
        solo:      { drums: 1, bass: 1, pad: 0.5, lead: 0.9, arp: 0.3, fx: 0.3 },
        outro:     { drums: 0.5, bass: 0.7, pad: 1, lead: 0, arp: 0.3, fx: 0.2 }
    },

    generateStructure(genre, targetDuration, tempo) {
        const structure = this.structures[genre] || this.structures.lofi;
        const lengths = this.sectionLengths[genre] || this.sectionLengths.lofi;
        const secondsPerBar = (60 / tempo) * 4;
        
        let totalBars = 0;
        const sections = structure.map(sectionType => {
            const bars = lengths[sectionType] || 8;
            totalBars += bars;
            return { type: sectionType, bars };
        });
        
        const totalSeconds = totalBars * secondsPerBar;
        const scale = targetDuration / totalSeconds;
        
        let currentBar = 0;
        return sections.map((section, idx) => {
            const adjustedBars = Math.max(4, Math.round(section.bars * scale / 4) * 4);
            const result = {
                type: section.type,
                startBar: currentBar,
                bars: adjustedBars,
                instruments: this.instrumentation[section.type] || this.instrumentation.verse,
                isLast: idx === sections.length - 1,
                needsFill: idx < sections.length - 1
            };
            currentBar += adjustedBars;
            return result;
        });
    }
};

// ============================================
// INSTRUMENTS - Tone.js (Multi-Instrument)
// ============================================

class InstrumentRack {
    constructor() {
        this.instruments = {};
        this.effects = {};
        this.leads = {};  // Multiple lead instruments
    }

    async init(genre) {
        this.genre = genre;
        this.master = new Tone.Gain(0.7).toDestination();
        this.limiter = new Tone.Limiter(-2).connect(this.master);
        this.setupEffects(genre);
        this.createInstruments(genre);
    }

    setupEffects(genre) {
        const configs = {
            lofi: { reverbDecay: 2.5, reverbWet: 0.35, filterFreq: 2500 },
            edm: { reverbDecay: 1.5, reverbWet: 0.2, filterFreq: 8000 },
            synthwave: { reverbDecay: 4, reverbWet: 0.5, filterFreq: 4000 },
            dnb: { reverbDecay: 1, reverbWet: 0.15, filterFreq: 6000 },
            trap: { reverbDecay: 1.5, reverbWet: 0.2, filterFreq: 5000 },
            hiphop: { reverbDecay: 1.5, reverbWet: 0.2, filterFreq: 4000 },
            jazz: { reverbDecay: 2.5, reverbWet: 0.3, filterFreq: 6000 },
            rock: { reverbDecay: 1.5, reverbWet: 0.2, filterFreq: 7000 },
            chiptune: { reverbDecay: 0.5, reverbWet: 0.1, filterFreq: 10000 },
            ambient: { reverbDecay: 8, reverbWet: 0.7, filterFreq: 2000 }
        };
        const cfg = configs[genre] || configs.lofi;
        
        this.effects.reverb = new Tone.Reverb({ decay: cfg.reverbDecay, wet: cfg.reverbWet }).connect(this.limiter);
        this.effects.filter = new Tone.Filter(cfg.filterFreq, 'lowpass').connect(this.effects.reverb);
        this.effects.chorus = new Tone.Chorus(4, 0.5, 0.5).connect(this.effects.filter);
        this.effects.delay = new Tone.FeedbackDelay('8n', 0.2).connect(this.effects.reverb);
        this.effects.delay.wet.value = 0.15;
        this.mainBus = this.effects.chorus;
    }

    createInstruments(genre) {
        // === LEAD INSTRUMENTS (multiple per genre) - reduced volumes ===
        
        // Piano - works for most genres
        this.leads.piano = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: 'triangle' },
            envelope: { attack: 0.005, decay: 0.3, sustain: 0.2, release: 0.8 }
        }).connect(this.effects.reverb);
        this.leads.piano.volume.value = -12;
        
        // Pluck - guitar-like
        this.leads.pluck = new Tone.PluckSynth({
            attackNoise: 1,
            dampening: 4000,
            resonance: 0.9
        }).connect(this.mainBus);
        this.leads.pluck.volume.value = -10;
        
        // Synth lead - for electronic genres
        this.leads.synth = new Tone.Synth({
            oscillator: { type: genre === 'chiptune' ? 'square' : 'sawtooth' },
            envelope: { attack: 0.01, decay: 0.2, sustain: 0.4, release: 0.3 }
        }).connect(this.mainBus);
        this.leads.synth.volume.value = -12;
        
        // FM Bell - ambient, jazz
        this.leads.bell = new Tone.FMSynth({
            harmonicity: 8,
            modulationIndex: 2,
            envelope: { attack: 0.001, decay: 1, sustain: 0.1, release: 1.5 },
            modulation: { type: 'sine' }
        }).connect(this.effects.reverb);
        this.leads.bell.volume.value = -14;
        
        // Supersaw - EDM, synthwave
        this.leads.supersaw = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: 'fatsawtooth', spread: 30, count: 3 },
            envelope: { attack: 0.01, decay: 0.3, sustain: 0.5, release: 0.4 }
        }).connect(this.mainBus);
        this.leads.supersaw.volume.value = -14;
        
        // Brass - hiphop, jazz
        this.leads.brass = new Tone.FMSynth({
            harmonicity: 1,
            modulationIndex: 4,
            envelope: { attack: 0.05, decay: 0.2, sustain: 0.8, release: 0.3 },
            modulation: { type: 'square' }
        }).connect(this.mainBus);
        this.leads.brass.volume.value = -14;
        
        // Mallet - ambient, lofi
        this.leads.mallet = new Tone.FMSynth({
            harmonicity: 5,
            modulationIndex: 1,
            envelope: { attack: 0.001, decay: 0.5, sustain: 0, release: 0.5 }
        }).connect(this.effects.delay);
        this.leads.mallet.volume.value = -14;

        // Set primary/secondary leads per genre
        this.genreLeads = {
            lofi: ['piano', 'pluck', 'mallet'],
            edm: ['supersaw', 'synth', 'pluck'],
            synthwave: ['supersaw', 'synth', 'bell'],
            dnb: ['synth', 'supersaw', 'pluck'],
            trap: ['brass', 'synth', 'bell'],
            hiphop: ['piano', 'brass', 'pluck'],
            jazz: ['piano', 'bell', 'brass'],
            rock: ['pluck', 'synth', 'piano'],
            chiptune: ['synth', 'synth', 'synth'],
            ambient: ['bell', 'mallet', 'piano']
        };
        
        // Keep lead as alias for backwards compatibility
        this.instruments.lead = this.leads.piano;
        
        // === OTHER INSTRUMENTS ===
        
        this.instruments.pad = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: genre === 'synthwave' ? 'fatsawtooth' : 'triangle' }
        }).connect(this.effects.reverb);
        this.instruments.pad.volume.value = -12;
        
        this.instruments.bass = new Tone.MonoSynth({
            oscillator: { type: genre === 'edm' ? 'sawtooth' : 'sine' }
        }).connect(this.limiter);
        this.instruments.bass.volume.value = -8;
        
        this.instruments.arp = new Tone.Synth({
            oscillator: { type: genre === 'chiptune' ? 'square' : 'triangle' }
        }).connect(this.effects.delay);
        this.instruments.arp.volume.value = -15;
        
        this.instruments.kick = new Tone.MembraneSynth({
            pitchDecay: 0.05, octaves: 6,
            envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 0.4 }
        }).connect(this.limiter);
        this.instruments.kick.volume.value = -4;
        
        this.instruments.snare = new Tone.NoiseSynth({
            noise: { type: 'white' },
            envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.15 }
        }).connect(this.effects.reverb);
        this.instruments.snare.volume.value = -8;
        
        this.instruments.hihat = new Tone.MetalSynth({
            frequency: 300, envelope: { attack: 0.001, decay: 0.05, release: 0.01 },
            harmonicity: 5.1, modulationIndex: 32, resonance: 4000, octaves: 1.5
        }).connect(this.mainBus);
        this.instruments.hihat.volume.value = -18;
        
        this.instruments.perc = new Tone.MembraneSynth({
            pitchDecay: 0.01, octaves: 4,
            envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.1 }
        }).connect(this.effects.reverb);
        this.instruments.perc.volume.value = -15;
    }

    // Get lead instrument for a section
    getLeadForSection(sectionType, sectionIdx) {
        const leads = this.genreLeads[this.genre] || ['piano', 'synth', 'pluck'];
        
        // Rotate instruments based on section
        // Verse = primary, Chorus = secondary (layered), Bridge = tertiary
        if (sectionType.includes('chorus') || sectionType.includes('drop')) {
            return [this.leads[leads[0]], this.leads[leads[1]]];  // Layer 2 instruments
        } else if (sectionType.includes('bridge') || sectionType.includes('breakdown')) {
            return [this.leads[leads[2]]];
        } else {
            // Verse/intro/outro - alternate between primary instruments
            const idx = sectionIdx % 2;
            return [this.leads[leads[idx]]];
        }
    }

    dispose() {
        Object.values(this.instruments).forEach(i => i?.dispose());
        Object.values(this.leads).forEach(l => l?.dispose());
        Object.values(this.effects).forEach(e => e?.dispose());
        this.limiter?.dispose();
        this.master?.dispose();
    }
}

// ============================================
// SONG BUILDER
// ============================================

class SongBuilder {
    constructor() {
        this.rack = null;
        this.isPlaying = false;
        this.duration = 120;
        this.startTime = 0;
    }

    async generate(settings) {
        const { genre, key, tempo, energy, complexity, duration } = settings;
        this.duration = duration;
        
        const isMinor = key.includes('m');
        const rootNote = key.replace('m', '');
        const scaleType = isMinor ? 'minor' : 'major';
        
        const scale = Theory.getScaleNotes(rootNote, scaleType, 4);
        const progressions = Theory.progressions[genre] || Theory.progressions.lofi;
        const progression = Theory.resolveProgression(Theory.random(progressions), key, isMinor);
        const sections = Arranger.generateStructure(genre, duration, tempo);
        const motif = MelodyGen.generateMotif(scale, complexity, genre);
        
        sections.forEach((section, idx) => {
            section.drums = Rhythm.getDrumPattern(genre, section.type, energy);
            
            if (section.instruments.lead > Math.random()) {
                section.melody = MelodyGen.developMotif(motif, scale, section.bars, section.type, complexity, genre);
            }
            if (section.instruments.arp > Math.random()) {
                const arpPattern = ['up', 'down', 'updown'][Math.floor(Math.random() * 3)];
                section.arpeggio = MelodyGen.generateArpeggio(progression[idx % progression.length].notes, section.bars, arpPattern, genre);
            }
            if (section.needsFill && Math.random() > 0.3) {
                section.fill = Rhythm.generateFill(genre, energy / 100);
            }
        });
        
        return { settings, tempo, duration, scale, progression, sections, secondsPerBar: (60 / tempo) * 4 };
    }

    async play(song) {
        this.stop();
        await Tone.start();
        Tone.Transport.bpm.value = song.tempo;
        
        this.rack = new InstrumentRack();
        await this.rack.init(song.settings.genre);
        
        const { secondsPerBar, progression, sections } = song;
        const stepDuration = secondsPerBar / 16;
        
        sections.forEach((section, sectionIdx) => {
            const sectionStart = section.startBar * secondsPerBar;
            
            // Pads
            if (section.instruments.pad > 0.3) {
                for (let bar = 0; bar < section.bars; bar++) {
                    const chord = progression[(section.startBar + bar) % progression.length];
                    const time = sectionStart + bar * secondsPerBar;
                    Tone.Transport.schedule(t => {
                        this.rack.instruments.pad.triggerAttackRelease(chord.notes, secondsPerBar * 0.9, t, 0.3 * section.instruments.pad);
                    }, time);
                }
            }
            
            // Bass
            if (section.instruments.bass > 0.3) {
                for (let bar = 0; bar < section.bars; bar++) {
                    const chord = progression[(section.startBar + bar) % progression.length];
                    const time = sectionStart + bar * secondsPerBar;
                    Tone.Transport.schedule(t => {
                        this.rack.instruments.bass.triggerAttackRelease(chord.root + '2', '2n', t, 0.7);
                    }, time);
                    if (section.instruments.bass > 0.7) {
                        Tone.Transport.schedule(t => {
                            this.rack.instruments.bass.triggerAttackRelease(chord.root + '2', '4n', t, 0.5);
                        }, time + secondsPerBar / 2);
                    }
                }
            }
            
            // Melody - using multi-instrument system
            if (section.melody) {
                const leadInstruments = this.rack.getLeadForSection(section.type, sectionIdx);
                
                section.melody.forEach((note, noteIdx) => {
                    const time = sectionStart + note.time * (secondsPerBar / 4);
                    const duration = note.duration * (secondsPerBar / 4) * 0.8;
                    
                    // Primary instrument plays all notes
                    Tone.Transport.schedule(t => {
                        leadInstruments[0].triggerAttackRelease(note.note, duration, t, note.velocity * section.instruments.lead * 0.7);
                    }, time);
                    
                    // Secondary instrument (if layered) plays on strong beats only
                    if (leadInstruments[1] && (noteIdx % 2 === 0 || note.velocity > 0.7)) {
                        Tone.Transport.schedule(t => {
                            leadInstruments[1].triggerAttackRelease(note.note, duration * 0.9, t, note.velocity * section.instruments.lead * 0.4);
                        }, time);
                    }
                });
            }
            
            // Arpeggio
            if (section.arpeggio) {
                section.arpeggio.forEach(note => {
                    const time = sectionStart + note.time * (secondsPerBar / 4);
                    Tone.Transport.schedule(t => {
                        this.rack.instruments.arp.triggerAttackRelease(note.note, note.duration * (secondsPerBar / 4), t, note.velocity * section.instruments.arp);
                    }, time);
                });
            }
            
            // Drums with variation
            if (section.instruments.drums > 0.2) {
                const baseDrums = section.drums;
                const isBreakdown = section.type.includes('breakdown') || section.type.includes('buildup');
                const isPreDrop = section.needsFill && (section.type.includes('buildup') || section.type.includes('verse'));
                
                for (let bar = 0; bar < section.bars; bar++) {
                    const isLastBar = bar === section.bars - 1;
                    const isSecondToLastBar = bar === section.bars - 2;
                    
                    // Determine which pattern to use
                    let pattern;
                    if (isLastBar && section.fill) {
                        pattern = section.fill;
                    } else if (isSecondToLastBar && isPreDrop) {
                        // Beat drop before the drop
                        pattern = Rhythm.generateBeatDrop();
                    } else if (isBreakdown) {
                        // Half-time for breakdowns
                        pattern = Rhythm.getHalfTimePattern(baseDrums);
                    } else {
                        // Vary the pattern every 4 bars
                        const variationLevel = Math.floor(bar / 4) % 3;
                        pattern = Rhythm.getPatternVariation(baseDrums, variationLevel);
                    }
                    
                    for (let step = 0; step < 16; step++) {
                        const time = sectionStart + bar * secondsPerBar + step * stepDuration;
                        
                        const kickHit = pattern.kick[step];
                        const snareHit = pattern.snare[step];
                        const hatHit = pattern.hat[step];
                        const percHit = pattern.perc ? pattern.perc[step] : 0;
                        
                        if (kickHit) {
                            Tone.Transport.schedule(t => this.rack.instruments.kick.triggerAttackRelease('C1', '8n', t, 0.9), time);
                        }
                        if (snareHit) {
                            // Support ghost notes (velocity < 1)
                            const vel = typeof snareHit === 'number' && snareHit < 1 ? snareHit * 0.5 : 0.7;
                            Tone.Transport.schedule(t => this.rack.instruments.snare.triggerAttackRelease('8n', t, vel), time);
                        }
                        if (hatHit) {
                            // Vary hat velocity for groove
                            const hatVel = 0.25 + Math.random() * 0.15 + (step % 4 === 0 ? 0.1 : 0);
                            Tone.Transport.schedule(t => this.rack.instruments.hihat.triggerAttackRelease('C6', '32n', t, hatVel), time);
                        }
                        if (percHit) {
                            Tone.Transport.schedule(t => this.rack.instruments.perc.triggerAttackRelease('G4', '16n', t, 0.4), time);
                        }
                    }
                }
            }
        });
        
        this.startTime = Tone.now();
        Tone.Transport.start();
        this.isPlaying = true;
    }

    stop() {
        Tone.Transport.stop();
        Tone.Transport.cancel();
        this.rack?.dispose();
        this.rack = null;
        this.isPlaying = false;
    }

    getProgress() {
        if (!this.isPlaying) return 0;
        return Math.min(1, (Tone.now() - this.startTime) / this.duration);
    }

    getCurrentTime() {
        if (!this.isPlaying) return 0;
        return Math.max(0, Tone.now() - this.startTime);
    }
}

// ============================================
// UI CONTROLLER
// ============================================

const App = {
    builder: new SongBuilder(),
    song: null,
    animFrame: null,

    async init() {
        this.els = {
            genre: document.getElementById('genre'),
            key: document.getElementById('key'),
            tempo: document.getElementById('tempo'),
            tempoVal: document.getElementById('tempoVal'),
            energy: document.getElementById('energy'),
            energyVal: document.getElementById('energyVal'),
            complexity: document.getElementById('complexity'),
            complexityVal: document.getElementById('complexityVal'),
            duration: document.getElementById('duration'),
            durationVal: document.getElementById('durationVal'),
            generateBtn: document.getElementById('generateBtn'),
            playBtn: document.getElementById('playBtn'),
            stopBtn: document.getElementById('stopBtn'),
            exportBtn: document.getElementById('exportBtn'),
            progress: document.getElementById('progress'),
            currentTime: document.getElementById('currentTime'),
            totalTime: document.getElementById('totalTime'),
            songInfo: document.getElementById('songInfo'),
            songTitle: document.getElementById('songTitle'),
            songDetails: document.getElementById('songDetails'),
            sectionPreview: document.getElementById('sectionPreview'),
            canvas: document.getElementById('waveform'),
            loading: document.getElementById('loading'),
            loadingText: document.getElementById('loadingText')
        };
        
        this.ctx = this.els.canvas.getContext('2d');
        
        this.els.tempo.oninput = () => this.els.tempoVal.textContent = this.els.tempo.value;
        this.els.energy.oninput = () => this.els.energyVal.textContent = this.els.energy.value;
        this.els.complexity.oninput = () => this.els.complexityVal.textContent = this.els.complexity.value;
        this.els.duration.oninput = () => {
            const mins = Math.floor(this.els.duration.value / 60);
            const secs = this.els.duration.value % 60;
            this.els.durationVal.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
        };
        
        this.els.generateBtn.onclick = () => this.generate();
        this.els.playBtn.onclick = () => this.play();
        this.els.stopBtn.onclick = () => this.stop();
        this.els.exportBtn.onclick = () => this.export();
        
        this.resizeCanvas();
        window.onresize = () => this.resizeCanvas();
        
        this.els.loading.classList.add('hidden');
        this.drawIdle();
    },

    resizeCanvas() {
        const rect = this.els.canvas.parentElement.getBoundingClientRect();
        this.els.canvas.width = rect.width;
        this.els.canvas.height = rect.height;
    },

    async generate() {
        this.els.generateBtn.disabled = true;
        this.els.generateBtn.textContent = 'Generating...';
        
        const settings = {
            genre: this.els.genre.value,
            key: this.els.key.value,
            tempo: parseInt(this.els.tempo.value),
            energy: parseInt(this.els.energy.value),
            complexity: parseInt(this.els.complexity.value),
            duration: parseInt(this.els.duration.value)
        };
        
        try {
            this.song = await this.builder.generate(settings);
            
            this.els.playBtn.disabled = false;
            this.els.exportBtn.disabled = false;
            
            const adj = ['Midnight', 'Neon', 'Crystal', 'Digital', 'Cosmic', 'Electric', 'Golden', 'Velvet', 'Shadow', 'Liquid'];
            const noun = ['Dreams', 'Waves', 'Pulse', 'Echo', 'Drift', 'Glow', 'Rain', 'Storm', 'Flight', 'Horizon'];
            this.els.songTitle.textContent = `${adj[Math.floor(Math.random() * adj.length)]} ${noun[Math.floor(Math.random() * noun.length)]}`;
            this.els.songDetails.textContent = `${settings.key} | ${settings.tempo} BPM | ${settings.genre.toUpperCase()}`;
            this.els.songInfo.classList.add('visible');
            
            this.els.sectionPreview.innerHTML = this.song.sections.map(s => 
                `<span class="section-block ${s.type}">${s.type}</span>`
            ).join('');
            
            const totalMins = Math.floor(settings.duration / 60);
            const totalSecs = settings.duration % 60;
            this.els.totalTime.textContent = `${totalMins}:${totalSecs.toString().padStart(2, '0')}`;
            
            this.drawWaveform();
        } catch (err) {
            console.error(err);
            alert('Generation failed: ' + err.message);
        }
        
        this.els.generateBtn.disabled = false;
        this.els.generateBtn.textContent = 'Generate';
    },

    async play() {
        if (!this.song) return;
        
        this.els.loadingText.textContent = 'Loading instruments...';
        this.els.loading.classList.remove('hidden');
        
        try {
            await this.builder.play(this.song);
            this.els.playBtn.disabled = true;
            this.els.stopBtn.disabled = false;
            this.els.generateBtn.disabled = true;
            this.updateProgress();
        } catch (err) {
            console.error(err);
            alert('Playback failed: ' + err.message);
        }
        
        this.els.loading.classList.add('hidden');
    },

    stop() {
        this.builder.stop();
        this.els.playBtn.disabled = false;
        this.els.stopBtn.disabled = true;
        this.els.generateBtn.disabled = false;
        if (this.animFrame) cancelAnimationFrame(this.animFrame);
        this.els.progress.style.width = '0%';
        this.els.currentTime.textContent = '0:00';
        document.querySelectorAll('.section-block').forEach(el => el.classList.remove('active'));
        this.drawWaveform();
    },

    updateProgress() {
        if (!this.builder.isPlaying) return;
        
        const progress = this.builder.getProgress();
        const time = this.builder.getCurrentTime();
        
        this.els.progress.style.width = `${progress * 100}%`;
        
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        this.els.currentTime.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
        
        if (this.song) {
            const currentBar = time / this.song.secondsPerBar;
            const blocks = document.querySelectorAll('.section-block');
            this.song.sections.forEach((section, idx) => {
                if (currentBar >= section.startBar && currentBar < section.startBar + section.bars) {
                    blocks[idx]?.classList.add('active');
                } else {
                    blocks[idx]?.classList.remove('active');
                }
            });
        }
        
        this.drawVisualizer(progress);
        
        if (progress >= 1) {
            this.stop();
            return;
        }
        
        this.animFrame = requestAnimationFrame(() => this.updateProgress());
    },

    drawIdle() {
        const { ctx, els } = this;
        const w = els.canvas.width, h = els.canvas.height;
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, w, h);
        
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0,217,255,0.2)';
        ctx.lineWidth = 2;
        for (let x = 0; x < w; x++) {
            const y = h/2 + Math.sin(x * 0.02) * 15;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
    },

    drawWaveform() {
        if (!this.song) return this.drawIdle();
        
        const { ctx, els } = this;
        const w = els.canvas.width, h = els.canvas.height;
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, w, h);
        
        const totalBars = this.song.sections.reduce((sum, s) => sum + s.bars, 0);
        
        this.song.sections.forEach(section => {
            const startX = (section.startBar / totalBars) * w;
            const sectionW = (section.bars / totalBars) * w;
            const intensity = section.type.includes('chorus') || section.type.includes('drop') ? 0.9 : 
                            section.type.includes('verse') ? 0.6 : 0.35;
            
            const gradient = ctx.createLinearGradient(startX, 0, startX + sectionW, 0);
            gradient.addColorStop(0, 'rgba(0,217,255,0.6)');
            gradient.addColorStop(1, 'rgba(255,0,170,0.6)');
            ctx.fillStyle = gradient;
            
            for (let x = startX; x < startX + sectionW; x += 4) {
                const barH = (Math.random() * intensity + 0.1) * h * 0.7;
                ctx.fillRect(x, (h - barH) / 2, 3, barH);
            }
        });
    },

    drawVisualizer(progress) {
        const { ctx, els } = this;
        const w = els.canvas.width, h = els.canvas.height;
        
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(0, 0, w, h);
        
        const bars = 64;
        const barW = w / bars - 2;
        
        const gradient = ctx.createLinearGradient(0, h, 0, 0);
        gradient.addColorStop(0, '#00d9ff');
        gradient.addColorStop(0.5, '#ff00aa');
        gradient.addColorStop(1, '#ffaa00');
        ctx.fillStyle = gradient;
        
        for (let i = 0; i < bars; i++) {
            const val = Math.random() * 0.5 + 0.2 + Math.sin(progress * 15 + i * 0.3) * 0.25;
            const barH = val * h * 0.75;
            ctx.fillRect(i * (barW + 2), (h - barH) / 2, barW, barH);
        }
        
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(progress * w, 0);
        ctx.lineTo(progress * w, h);
        ctx.stroke();
    },

    async export() {
        if (!this.song) return alert('Generate a song first!');
        
        this.els.loadingText.textContent = 'Rendering audio...';
        this.els.loading.classList.remove('hidden');
        
        try {
            const buffer = await Tone.Offline(async () => {
                const rack = new InstrumentRack();
                await rack.init(this.song.settings.genre);
                
                const { secondsPerBar, progression, sections } = this.song;
                const stepDuration = secondsPerBar / 16;
                
                sections.forEach((section, sectionIdx) => {
                    const sectionStart = section.startBar * secondsPerBar;
                    
                    if (section.instruments.pad > 0.3) {
                        for (let bar = 0; bar < section.bars; bar++) {
                            const chord = progression[(section.startBar + bar) % progression.length];
                            rack.instruments.pad.triggerAttackRelease(chord.notes, secondsPerBar * 0.9, sectionStart + bar * secondsPerBar, 0.3);
                        }
                    }
                    
                    if (section.instruments.bass > 0.3) {
                        for (let bar = 0; bar < section.bars; bar++) {
                            const chord = progression[(section.startBar + bar) % progression.length];
                            rack.instruments.bass.triggerAttackRelease(chord.root + '2', '2n', sectionStart + bar * secondsPerBar, 0.7);
                        }
                    }
                    
                    if (section.melody) {
                        const leadInstruments = rack.getLeadForSection(section.type, sectionIdx);
                        
                        section.melody.forEach((note, noteIdx) => {
                            const time = sectionStart + note.time * (secondsPerBar / 4);
                            const duration = note.duration * (secondsPerBar / 4) * 0.8;
                            
                            leadInstruments[0].triggerAttackRelease(note.note, duration, time, note.velocity);
                            
                            if (leadInstruments[1] && (noteIdx % 2 === 0 || note.velocity > 0.7)) {
                                leadInstruments[1].triggerAttackRelease(note.note, duration * 0.9, time, note.velocity * 0.6);
                            }
                        });
                    }
                    
                    if (section.arpeggio) {
                        section.arpeggio.forEach(note => {
                            rack.instruments.arp.triggerAttackRelease(note.note, note.duration * (secondsPerBar/4), sectionStart + note.time * (secondsPerBar/4), note.velocity * 0.7);
                        });
                    }
                    
                    if (section.instruments.drums > 0.2) {
                        const drums = section.drums;
                        for (let bar = 0; bar < section.bars; bar++) {
                            for (let step = 0; step < 16; step++) {
                                const time = sectionStart + bar * secondsPerBar + step * stepDuration;
                                if (drums.kick[step]) rack.instruments.kick.triggerAttackRelease('C1', '8n', time, 0.9);
                                if (drums.snare[step]) rack.instruments.snare.triggerAttackRelease('8n', time, 0.7);
                                if (drums.hat[step]) rack.instruments.hihat.triggerAttackRelease('C6', '32n', time, 0.35);
                            }
                        }
                    }
                });
            }, this.song.duration);
            
            const wav = this.bufferToWav(buffer);
            const blob = new Blob([wav], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${this.els.songTitle.textContent.replace(/\s+/g, '_')}.wav`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Offline render failed, trying live recording:', err);
            // Fallback: record live playback using MediaRecorder
            await this.exportLive();
        }
        
        this.els.loading.classList.add('hidden');
    },

    async exportLive() {
        // Record the actual audio output
        const dest = Tone.context.createMediaStreamDestination();
        const recorder = new MediaRecorder(dest.stream, { mimeType: 'audio/webm' });
        const chunks = [];
        
        recorder.ondataavailable = e => chunks.push(e.data);
        
        const originalDest = Tone.Destination;
        Tone.Destination.connect(dest);
        
        return new Promise(async (resolve) => {
            recorder.onstop = async () => {
                const webmBlob = new Blob(chunks, { type: 'audio/webm' });
                const url = URL.createObjectURL(webmBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${this.els.songTitle.textContent.replace(/\s+/g, '_')}.webm`;
                a.click();
                URL.revokeObjectURL(url);
                resolve();
            };
            
            recorder.start();
            await this.builder.play(this.song);
            
            // Wait for song to finish
            const checkDone = setInterval(() => {
                if (this.builder.getProgress() >= 0.99 || !this.builder.isPlaying) {
                    clearInterval(checkDone);
                    setTimeout(() => {
                        recorder.stop();
                        this.builder.stop();
                    }, 500);
                }
            }, 100);
        });
    },

    bufferToWav(buffer) {
        const numCh = buffer.numberOfChannels;
        const sr = buffer.sampleRate;
        const samples = buffer.length;
        const bytesPerSample = 2;
        const blockAlign = numCh * bytesPerSample;
        const dataSize = samples * blockAlign;
        const bufferSize = 44 + dataSize;
        
        const ab = new ArrayBuffer(bufferSize);
        const view = new DataView(ab);
        
        const writeStr = (o, s) => { for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i)); };
        
        writeStr(0, 'RIFF');
        view.setUint32(4, bufferSize - 8, true);
        writeStr(8, 'WAVE');
        writeStr(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, numCh, true);
        view.setUint32(24, sr, true);
        view.setUint32(28, sr * blockAlign, true);
        view.setUint16(32, blockAlign, true);
        view.setUint16(34, 16, true);
        writeStr(36, 'data');
        view.setUint32(40, dataSize, true);
        
        const channels = [];
        for (let i = 0; i < numCh; i++) channels.push(buffer.getChannelData(i));
        
        let offset = 44;
        for (let i = 0; i < samples; i++) {
            for (let ch = 0; ch < numCh; ch++) {
                let s = Math.max(-1, Math.min(1, channels[ch][i]));
                view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
                offset += 2;
            }
        }
        
        return ab;
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
