/**
 * SWAPNANEEL NASKAR — PORTFOLIO ENGINE
 * Noir & Crimson Op-Art Canvas, Interactive 7-Layer Stack Explorer, 
 * Bento Grid Filter, Non-Blocking Multi-Agent Swarm, Audio FX & Smooth Navigation
 */

(function () {
  'use strict';

  // ==========================================================================
  // WEB AUDIO API SYNTHESIZER (Futuristic Sci-Fi Sound FX)
  // ==========================================================================
  class SoundFX {
    constructor() {
      this.ctx = null;
      this.enabled = true;
      this.init();
    }

    init() {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        document.addEventListener('click', () => {
          if (!this.ctx) this.ctx = new AudioCtx();
          else if (this.ctx.state === 'suspended') this.ctx.resume();
        }, { once: true });
      }
    }

    ensure() {
      if (!this.enabled) return false;
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return !!this.ctx;
    }

    playClick() {
      if (!this.ensure()) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } catch (e) {}
    }

    playSwitch() {
      if (!this.ensure()) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(950, now + 0.06);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      } catch (e) {}
    }

    playDeploy() {
      if (!this.ensure()) return;
      try {
        const now = this.ctx.currentTime;
        [330, 440, 554, 659].forEach((freq, idx) => {
          const t = now + idx * 0.04;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.04, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.1);
        });
      } catch (e) {}
    }

    toggle() {
      this.enabled = !this.enabled;
      return this.enabled;
    }
  }

  const sound = new SoundFX();

  // ==========================================================================
  // 7-LAYER ARCHITECTURAL DATA
  // ==========================================================================
  const LAYER_DATA = {
    1: {
      badge: 'LAYER 01 // NEURAL BIOMETRICS',
      title: 'Client-Side FaceAPI Neural Core',
      desc: '100% on-device biometric verification running via WebAssembly and TensorFlow.js. Extracts 68 facial landmarks and generates a 128-dimensional Euclidean facial vector descriptor in real time — completely eliminating biometric data leakage to third-party cloud servers.',
      tags: ['Client WASM', '128-d Vector Math', 'Zero Cloud Leak', 'TensorFlow.js']
    },
    2: {
      badge: 'LAYER 02 // CONCURRENT RUNTIME',
      title: 'React 19 State & Action Pipeline',
      desc: 'Engineered using modern React 19 concurrent actions, optimistic state mutations, and unidirectional data flow. Enforces component reusability, prop-driven hierarchies, and immutable state trees across academic grade rosters.',
      tags: ['React 19 Actions', 'Optimistic Updates', 'Unidirectional Flow', 'Concurrent Mode']
    },
    3: {
      badge: 'LAYER 03 // IDENTITY ARCHITECTURE',
      title: 'Multi-Role Institutional SSO & RBAC',
      desc: 'Hierarchical role-based access control (RBAC) delineating discrete privilege boundaries across Students, Department Faculty, and University Administrators. Secure credential hashing with tamper-evident audit trails.',
      tags: ['RBAC Isolation', 'Zero-Trust Tokens', 'Credential Hashing', 'Institutional SSO']
    },
    4: {
      badge: 'LAYER 04 // ALGORITHMIC OPTIMIZATION',
      title: 'Immutable CGPA Ranking Engine',
      desc: 'Deterministic O(N log N) sorting and ranking algorithms operating over high-density student matriculation datasets. Supports multi-predicate sorting by CGPA, semester credits, and attendance thresholds.',
      tags: ['O(N log N) Sorter', 'Stable Multi-Key', 'Memory Hierarchy', 'Pure Functions']
    },
    5: {
      badge: 'LAYER 05 // CYBERSECURITY HEURISTICS',
      title: 'NLP Scam Detection & Entropy Engine',
      desc: 'AI threat intelligence heuristic classifiers analyzing message phishing patterns, OCR image extraction, and Shannon URL entropy scoring to provide an interpretable 0–100 risk assessment.',
      tags: ['NLP Threat Intel', 'URL Entropy (0-100)', 'Heuristic Scoring', 'Phishing Classifier']
    },
    6: {
      badge: 'LAYER 06 // MULTI-MODAL OCR',
      title: 'Multi-Photo Optical Character Extraction',
      desc: 'Computer vision ingestion pipeline parsing multi-screenshot payment slips, spoofed SMS interfaces, and suspicious receipts into clean, tokenized textual data for immediate heuristic analysis.',
      tags: ['Computer Vision', 'OCR Slip Parsing', 'Tesseract Engine', 'Text Normalizer']
    },
    7: {
      badge: 'LAYER 07 // RESILIENCE & PERSISTENCE',
      title: 'Offline-First Local Persistence Pattern',
      desc: 'Repository abstraction layer bridging browser LocalStorage and IndexedDB caches. Guarantees zero data loss during network dropouts by maintaining an optimistic transaction replay journal.',
      tags: ['Offline-First', 'IndexedDB Replay', 'Local Cache', 'Zero-Loss Sync']
    }
  };

  // ==========================================================================
  // AMBIENT CRIMSON & NOIR AURORA CANVAS (Parallax Glow)
  // ==========================================================================
  function initAuroraCanvas() {
    const canvas = document.getElementById('aurora-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const orbs = [
      { x: 0.15, y: 0.25, radius: 0.45, color: 'rgba(239, 68, 68, 0.16)' },
      { x: 0.85, y: 0.35, radius: 0.50, color: 'rgba(185, 28, 28, 0.14)' },
      { x: 0.50, y: 0.75, radius: 0.40, color: 'rgba(220, 38, 38, 0.10)' },
      { x: 0.30, y: 0.80, radius: 0.35, color: 'rgba(239, 68, 68, 0.08)' }
    ];

    let width = 0, height = 0, frame = 0, animationId = null;
    const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX / window.innerWidth;
      mouse.targetY = e.clientY / window.innerHeight;
    }, { passive: true });

    function render() {
      frame++;
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      orbs.forEach((orb) => {
        const px = (orb.x + (mouse.x - 0.5) * 0.05) * width;
        const py = (orb.y + (mouse.y - 0.5) * 0.05) * height;
        const r = orb.radius * Math.min(width, height);
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, r);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(5, 6, 8, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    }

    render();
  }

  // ==========================================================================
  // 7-LAYER INTERACTIVE TAB SWITCHER
  // ==========================================================================
  function initLayerTabs() {
    const tabs = document.querySelectorAll('.layer-tab');
    const badgeEl = document.getElementById('layer-inspect-id');
    const titleEl = document.getElementById('layer-inspect-title');
    const descEl = document.getElementById('layer-inspect-desc');
    const tagsEl = document.getElementById('layer-inspect-tags');
    const contentPane = document.getElementById('layer-content');

    if (!tabs.length || !titleEl) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const layerNum = tab.getAttribute('data-layer');
        const data = LAYER_DATA[layerNum];
        if (!data) return;

        tabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        if (contentPane) {
          contentPane.style.opacity = '0';
          contentPane.style.transform = 'translateY(4px)';
          contentPane.style.transition = 'opacity 0.15s ease, transform 0.15s ease';

          setTimeout(() => {
            if (badgeEl) badgeEl.textContent = data.badge;
            if (titleEl) titleEl.textContent = data.title;
            if (descEl) descEl.textContent = data.desc;

            if (tagsEl) {
              tagsEl.innerHTML = '';
              data.tags.forEach((tagText) => {
                const span = document.createElement('span');
                span.className = 'tag';
                span.textContent = tagText;
                tagsEl.appendChild(span);
              });
            }

            contentPane.style.opacity = '1';
            contentPane.style.transform = 'translateY(0)';
          }, 150);
        }

        sound.playSwitch();
      });
    });
  }

  // ==========================================================================
  // BENTO GRID CATEGORY FILTERING
  // ==========================================================================
  function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const bentoCards = document.querySelectorAll('.bento-card');

    if (!filterButtons.length || !bentoCards.length) return;

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = btn.getAttribute('data-filter');

        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        bentoCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
          }
        });

        sound.playClick();
      });
    });
  }

  // ==========================================================================
  // 1-CLICK EMAIL COPY TO CLIPBOARD WITH FLOATING TOAST
  // ==========================================================================
  function initCopyEmail() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    let toastTimeout = null;

    function showToast(message) {
      if (!toast) return;
      if (toastMsg) toastMsg.textContent = message;
      toast.classList.add('show');
      if (toastTimeout) clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 3200);
    }

    copyButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const textToCopy = btn.getAttribute('data-copy') || 'swapnaneelnaskar2006@gmail.com';

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast('✓ Email copied to clipboard: ' + textToCopy);
            sound.playClick();
          }).catch(() => {
            fallbackCopy(textToCopy);
          });
        } else {
          fallbackCopy(textToCopy);
        }
      });
    });

    function fallbackCopy(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast('✓ Email copied: ' + text);
        sound.playClick();
      } catch (err) {
        showToast('Email: ' + text);
      }
      document.body.removeChild(textarea);
    }
  }

  // ==========================================================================
  // RELIABLE SMOOTH SCROLLING FOR ALL NAVIGATION LINKS
  // ==========================================================================
  function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const topOffset = target.getBoundingClientRect().top + window.pageYOffset - 85;
            window.scrollTo({
              top: topOffset,
              behavior: 'smooth'
            });
            sound.playClick();
          }
        }
      });
    });
  }

  // ==========================================================================
  // ACTIVE NAVIGATION DOCK SECTION OBSERVER
  // ==========================================================================
  function initScrollObserver() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');

    if (!navItems.length || !sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach((item) => {
              if (item.getAttribute('href') === `#${id}`) {
                item.classList.add('active');
              } else {
                item.classList.remove('active');
              }
            });
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  // ==========================================================================
  // NON-BLOCKING MULTI-AGENT SWARM SIMULATION (From the Reel)
  // ==========================================================================
  function initSwarmSimulation() {
    if (document.querySelector('swarm-rebuild') || window.__swarmRebuild) return;
    const container = document.body;
    const colors = ['#ef4444', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#3b82f6'];
    const roles = [
      'Orchestrator', 'FaceAPI Verifier', 'React 19 Core', 'Security Audit',
      'Code Synthesizer', 'URL Entropy Sentry', 'Logistics Router', 'Axiomatic Checker'
    ];

    const agents = [];
    const count = 10;

    for (let i = 0; i < count; i++) {
      const id = i + 1;
      const color = colors[i % colors.length];
      const role = roles[i % roles.length];

      const el = document.createElement('div');
      el.className = 'agent-cursor-floating';
      el.style.cssText = `
        position: fixed;
        pointer-events: none !important;
        z-index: 90;
        transition: transform 0.08s linear;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6));
      `;
      el.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M5 3L19 12L12 14L9 21L5 3Z" fill="${color}" stroke="#000" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
        <div style="background: ${color}; color: #fff; font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 3px; margin-left: 12px; margin-top: -2px; white-space: nowrap;">
          Agent-${id.toString().padStart(2, '0')} (${role})
        </div>
      `;
      container.appendChild(el);

      agents.push({
        el,
        x: Math.random() * (window.innerWidth - 200) + 50,
        y: Math.random() * (window.innerHeight - 200) + 100,
        targetX: Math.random() * (window.innerWidth - 200) + 50,
        targetY: Math.random() * (window.innerHeight - 200) + 100,
        speed: 0.02 + Math.random() * 0.025,
        idle: 0
      });
    }

    // CAD Bounding Box element (Never blocks clicks: pointer-events: none)
    const cadBox = document.createElement('div');
    cadBox.style.cssText = `
      position: absolute;
      border: 1px solid #06b6d4;
      background: rgba(6, 182, 212, 0.04);
      pointer-events: none !important;
      z-index: 85;
      display: none;
      transition: all 0.3s ease;
    `;
    cadBox.innerHTML = `
      <div style="position: absolute; top: -3px; left: -3px; width: 6px; height: 6px; background: #06b6d4;"></div>
      <div style="position: absolute; top: -3px; right: -3px; width: 6px; height: 6px; background: #06b6d4;"></div>
      <div style="position: absolute; bottom: -3px; left: -3px; width: 6px; height: 6px; background: #06b6d4;"></div>
      <div style="position: absolute; bottom: -3px; right: -3px; width: 6px; height: 6px; background: #06b6d4;"></div>
      <div id="cad-dim" style="position: absolute; top: -20px; left: 0; background: #06b6d4; color: #000; font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 800; padding: 1px 5px; border-radius: 2px;">1346 x 100</div>
    `;
    document.body.appendChild(cadBox);

    // Bottom floating controller bar
    const bar = document.createElement('div');
    bar.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(10, 12, 16, 0.92);
      border: 1px solid rgba(255, 255, 255, 0.14);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      padding: 8px 18px;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      gap: 16px;
      z-index: 1000;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(239, 68, 68, 0.2);
    `;
    bar.innerHTML = `
      <div style="display: flex; align-items: center;">
        <span style="width: 12px; height: 12px; border-radius: 50%; background: #ef4444; border: 1.5px solid #000;"></span>
        <span style="width: 12px; height: 12px; border-radius: 50%; background: #06b6d4; border: 1.5px solid #000; margin-left: -4px;"></span>
        <span style="width: 12px; height: 12px; border-radius: 50%; background: #10b981; border: 1.5px solid #000; margin-left: -4px;"></span>
        <span style="width: 12px; height: 12px; border-radius: 50%; background: #f59e0b; border: 1.5px solid #000; margin-left: -4px;"></span>
      </div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #f1f5f9; font-weight: 600; white-space: nowrap;">
        <span style="color: #ef4444; font-weight: 700;">28 agents</span> &bull; <span>239/252 layers</span>
      </div>
      <div style="width: 80px; height: 4px; background: rgba(255,255,255,0.12); border-radius: 2px; overflow: hidden;">
        <div style="height: 100%; width: 95%; background: linear-gradient(90deg, #06b6d4, #ef4444); box-shadow: 0 0 8px #ef4444;"></div>
      </div>
      <div style="background: rgba(6, 182, 212, 0.12); color: #06b6d4; border: 1px solid rgba(6, 182, 212, 0.3); font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 9999px;">
        Touring 1x
      </div>
      <button id="swarm-pause-btn" style="background: transparent; border: none; color: #94a3b8; cursor: pointer; font-size: 13px; padding: 2px 4px;" title="Pause / Play Swarm">⏸</button>
      <button id="swarm-sound-btn" style="background: transparent; border: none; color: #94a3b8; cursor: pointer; font-size: 13px; padding: 2px 4px;" title="Toggle Sound">🔊</button>
    `;
    document.body.appendChild(bar);

    let swarmActive = true;
    const pauseBtn = document.getElementById('swarm-pause-btn');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        swarmActive = !swarmActive;
        pauseBtn.textContent = swarmActive ? '⏸' : '▶';
        agents.forEach(a => a.el.style.display = swarmActive ? 'flex' : 'none');
        if (cadBox) cadBox.style.display = 'none';
        sound.playClick();
      });
    }

    const soundBtn = document.getElementById('swarm-sound-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const on = sound.toggle();
        soundBtn.textContent = on ? '🔊' : '🔇';
        if (on) sound.playClick();
      });
    }

    // Agent animation loop
    function animateAgents() {
      if (swarmActive) {
        agents.forEach((ag) => {
          ag.x += (ag.targetX - ag.x) * ag.speed;
          ag.y += (ag.targetY - ag.y) * ag.speed;
          ag.el.style.transform = `translate3d(${ag.x}px, ${ag.y}px, 0)`;

          ag.idle++;
          if (ag.idle > 100 || Math.hypot(ag.targetX - ag.x, ag.targetY - ag.y) < 25) {
            ag.targetX = Math.random() * (window.innerWidth - 200) + 40;
            ag.targetY = Math.random() * (window.innerHeight - 150) + 80;
            ag.idle = 0;
          }
        });
      }
      requestAnimationFrame(animateAgents);
    }
    animateAgents();

    // Occasional CAD Bounding Box highlight (strictly pointer-events: none)
    const targets = ['.hero-desc', '.hero-role-pill', '.highlighted-card', '.quote-box', '.hud-card'];
    setInterval(() => {
      if (!swarmActive) return;
      const sel = targets[Math.floor(Math.random() * targets.length)];
      const targetEl = document.querySelector(sel);
      if (targetEl && cadBox) {
        const rect = targetEl.getBoundingClientRect();
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;

        cadBox.style.top = `${rect.top + scrollY - 6}px`;
        cadBox.style.left = `${rect.left + scrollX - 6}px`;
        cadBox.style.width = `${rect.width + 12}px`;
        cadBox.style.height = `${rect.height + 12}px`;
        cadBox.style.display = 'block';

        const dimBadge = document.getElementById('cad-dim');
        if (dimBadge) dimBadge.textContent = `${Math.round(rect.width)} × ${Math.round(rect.height)}`;

        if (agents[0]) {
          agents[0].targetX = rect.left + rect.width / 2;
          agents[0].targetY = rect.top + rect.height / 2;
        }

        setTimeout(() => {
          if (cadBox) cadBox.style.display = 'none';
        }, 3200);
      }
    }, 10000);
  }

  // ==========================================================================
  // BOOTSTRAP ALL MODULES ON DOM READY
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initAuroraCanvas();
    initLayerTabs();
    initProjectFilters();
    initSmoothScroll();
    initCopyEmail();
    initScrollObserver();
    initSwarmSimulation();
  });
})();
