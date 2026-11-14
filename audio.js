// Web Audio API Synthesizer - Sci-Fi / Cybernetic Sounds (Zero external audio files required)
class SoundFX {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.init();
    }

    init() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            // Lazy instantiate on first interaction
            document.addEventListener('click', () => {
                if (!this.ctx) {
                    this.ctx = new AudioContext();
                } else if (this.ctx.state === 'suspended') {
                    this.ctx.resume();
                }
            }, { once: true });
        }
    }

    ensureContext() {
        if (!this.enabled) return false;
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        return !!this.ctx;
    }

    playClick() {
        if (!this.ensureContext()) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.exponentialRampToValueAtTime(440, now + 0.04);

            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.04);
        } catch (e) {}
    }

    playSwitch() {
        if (!this.ensureContext()) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(420, now);
            osc.frequency.exponentialRampToValueAtTime(960, now + 0.06);

            gain.gain.setValueAtTime(0.07, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.06);
        } catch (e) {}
    }

    playHover() {
        if (!this.ensureContext()) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(1400, now);

            gain.gain.setValueAtTime(0.015, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.02);
        } catch (e) {}
    }

    playDeploy() {
        if (!this.ensureContext()) return;
        try {
            const now = this.ctx.currentTime;
            const notes = [330, 440, 554, 659, 880];
            notes.forEach((freq, idx) => {
                const noteTime = now + idx * 0.05;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(freq, noteTime);

                gain.gain.setValueAtTime(0.06, noteTime);
                gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.12);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(noteTime);
                osc.stop(noteTime + 0.12);
            });
        } catch (e) {}
    }

    playCadBlip() {
        if (!this.ensureContext()) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'square';
            osc.frequency.setValueAtTime(1200 + Math.random() * 400, now);

            gain.gain.setValueAtTime(0.02, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.025);
        } catch (e) {}
    }

    toggleMute() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

window.soundFX = new SoundFX();
