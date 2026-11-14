/*
 * swarm-init.js — boots the vendored swarm rebuild engine on saai.pro.
 *
 * Behaviour (full takeover, califa-style):
 *   1. The real page is captured into a blueprint.
 *   2. The page is blanked and repainted by cursor agents, top-down.
 *   3. Scrolling advances the build frontier.
 *   4. "Go live" fades the canvas out and restores the live, interactive page.
 *
 * Unlike the upstream Chrome extension, there is no background.js screenshot
 * pass. The engine handles <canvas> natively (canvasPixels -> toDataURL), so the
 * aurora background survives the rebuild without a host-page screenshot.
 *
 * Production notes:
 *   - The engine parks on requestAnimationFrame. A backgrounded tab throttles
 *     rAF to ~1fps (and Chrome may suspend it entirely), which would leave the
 *     page covered by the overlay with no build progress. We therefore refuse
 *     to boot until the document is actually visible.
 *   - Runs on every page load by default. Add ?swarm=once to show it only once
 *     per browser session (returning visitors get the live site immediately).
 */
(function () {
  "use strict";

  var KEY = "__swarmRebuild";

  var opts = {
    auto: true,
    // Settle time after load+fonts before we snapshot the page.
    delayMs: 350,
    // Wait for webfonts before capturing, otherwise headings get captured with
    // a fallback font and the rebuilt page renders in the wrong typeface.
    waitFonts: true,
    // Refuse to boot if the tab never becomes visible within this window.
    visibilityTimeoutMs: 8000,
    // false = replay the takeover on every page load (Sahi's call, 2026-11-06).
    // Flip to true for production if returning visitors should get the live
    // site straight away — no query flag or redeploy beyond this one line.
    oncePerSession: false
  };

  function q(name) {
    try {
      return new URLSearchParams(location.search).get(name);
    } catch (_) {
      return null;
    }
  }

  // Three modes:
  //   "off"    ?swarm=off     never boot
  //   "once"   ?swarm=once    boot once per browser session
  //   "always" ?swarm=1|on    boot on every load, ignore reduced motion
  //   default                 every load (opts.oncePerSession = false)
  function mode() {
    var v = q("swarm");
    if (v === "off" || v === "0") return "off";
    if (v === "once" || v === "session") return "once";
    if (v === "1" || v === "on") return "always";
    return opts.oncePerSession ? "once" : "always";
  }

  function forced() {
    return mode() === "always";
  }

  function disabled() {
    return mode() === "off";
  }

  function alreadyDone() {
    if (mode() !== "once") return false;
    try {
      return sessionStorage.getItem("swarm:done") === "1";
    } catch (_) {
      return false;
    }
  }

  // A full-screen animated takeover is unkind to visitors who ask their OS for
  // reduced motion (vestibular disorders). They get the real site immediately.
  // Override with ?swarm=1 when recording.
  function prefersReducedMotion() {
    if (forced()) return false;
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (_) {
      return false;
    }
  }

  function markDone() {
    try {
      sessionStorage.setItem("swarm:done", "1");
    } catch (_) {}
  }

  function waitVisible(timeoutMs) {
    if (document.visibilityState === "visible") return Promise.resolve(true);
    return new Promise(function (resolve) {
      var done = false;
      var onVis = function () {
        if (document.visibilityState === "visible" && !done) {
          done = true;
          document.removeEventListener("visibilitychange", onVis);
          resolve(true);
        }
      };
      document.addEventListener("visibilitychange", onVis);
      setTimeout(function () {
        if (done) return;
        done = true;
        document.removeEventListener("visibilitychange", onVis);
        resolve(document.visibilityState === "visible");
      }, timeoutMs);
    });
  }

  // The engine registers window.__swarmRebuild and self-starts when the script
  // is evaluated. We inject it as a classic script so execution order is
  // deterministic, then let it own the takeover.
  function loadEngine() {
    return new Promise(function (resolve, reject) {
      if (window[KEY]) return resolve(window[KEY]);
      var s = document.createElement("script");
      s.src = "./swarm/swarm.js";
      s.async = false;
      s.onload = function () {
        if (window[KEY]) resolve(window[KEY]);
        else reject(new Error("swarm engine did not register"));
      };
      s.onerror = function () {
        reject(new Error("failed to load swarm engine"));
      };
      document.head.appendChild(s);
    });
  }

  async function boot() {
    if (!opts.auto) return;
    if (disabled()) return;
    if (prefersReducedMotion()) return;
    if (alreadyDone()) return;
    if (window[KEY]) return; // already running

    // Let the real page paint before we snapshot it.
    await new Promise(function (r) {
      if (document.readyState === "complete") r();
      else window.addEventListener("load", r, { once: true });
    });

    // A hidden tab cannot drive requestAnimationFrame, so booting here would
    // leave the visitor staring at a frozen overlay. Wait for visibility, but
    // bail out rather than block forever.
    var visible = await waitVisible(opts.visibilityTimeoutMs);
    if (!visible) return;

    if (opts.waitFonts) {
      try {
        await Promise.race([
          document.fonts.ready,
          new Promise(function (r) { setTimeout(r, 1500); })
        ]);
      } catch (_) {}
    }

    await new Promise(function (r) { setTimeout(r, opts.delayMs); });

    // Re-check: the visitor may have backgrounded the tab while we waited.
    if (disabled() || alreadyDone()) return;
    if (document.visibilityState !== "visible") return;

    try {
      await loadEngine();
      markDone();
      // Auto-start Tour: visitors get the smooth scroll-driven build
      // from the first paint instead of a static half-built page.
      // Cancelled by any real user scroll, so it never fights the wheel.
      if (window[KEY] && window[KEY].app && !window[KEY].app.tour) {
        var started = false;
        var start = function () {
          if (started) return;
          started = true;
          setTimeout(function () {
            try {
              var host = document.querySelector("swarm-rebuild");
              var btn = host && host.shadowRoot && host.shadowRoot.querySelector('[data-a="tour"]');
              if (btn && !btn.hidden) btn.click();
            } catch (_) {}
          }, 350);
        };
        var cancel = function () {
          if (!window[KEY] || !window[KEY].app) return;
          try { window[KEY].app.tour = false; } catch (_) {}
        };
        if (document.readyState === "complete") start();
        else window.addEventListener("load", start, { once: true });
        window.addEventListener("wheel", cancel, { passive: true });
        window.addEventListener("touchstart", cancel, { passive: true });
        document.addEventListener("keydown", function (e) {
          if (e.key === "ArrowDown" || e.key === "ArrowUp" ||
              e.key === "PageDown" || e.key === "PageUp" ||
              e.key === " " || e.key === "Home" || e.key === "End") cancel();
        });
      }
    } catch (err) {
      console.error("[swarm] boot failed", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  // Operator escape hatch: ESC drops the swarm immediately. The engine also
  // handles ESC itself; this is a belt-and-braces path.
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && window[KEY] && window[KEY].app) {
      try { window[KEY].stop(false); } catch (_) {}
    }
  });
})();
