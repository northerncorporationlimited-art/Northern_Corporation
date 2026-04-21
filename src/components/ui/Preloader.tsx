"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/* ═══════════════════════════════════════════════════
   WEB AUDIO SYNTH ENGINE — zero downloads, pure code
   ═══════════════════════════════════════════════════ */

let audioCtx: AudioContext | null = null;

function initAudio() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new Ctx();
  }
  return audioCtx;
}

function createReverb(duration = 1.5, decay = 2) {
  const ctx = initAudio();
  const rate = ctx.sampleRate;
  const len = rate * duration;
  const impulse = ctx.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
  }
  const conv = ctx.createConvolver();
  conv.buffer = impulse;
  return conv;
}

function playImpact() {
  try {
    const ctx = initAudio();
    const now = ctx.currentTime;
    const reverb = createReverb(2.0, 2.5);
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.7;
    reverb.connect(masterGain);
    masterGain.connect(ctx.destination);

    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = "sine";
    sub.frequency.setValueAtTime(50, now);
    sub.frequency.exponentialRampToValueAtTime(20, now + 1.2);
    subGain.gain.setValueAtTime(0.4, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    sub.connect(subGain);
    subGain.connect(reverb);
    subGain.connect(ctx.destination);
    sub.start(now);
    sub.stop(now + 1.2);

    const mid = ctx.createOscillator();
    const midGain = ctx.createGain();
    mid.type = "triangle";
    mid.frequency.setValueAtTime(150, now);
    mid.frequency.exponentialRampToValueAtTime(60, now + 0.4);
    midGain.gain.setValueAtTime(0.15, now);
    midGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    mid.connect(midGain);
    midGain.connect(reverb);
    mid.start(now);
    mid.stop(now + 0.5);

    const bufLen = ctx.sampleRate * 0.3;
    const noiseBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const noiseData = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) noiseData[i] = (Math.random() * 2 - 1) * 0.3;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;
    const nFilter = ctx.createBiquadFilter();
    nFilter.type = "lowpass";
    nFilter.frequency.value = 500;
    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0.08, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    noise.connect(nFilter);
    nFilter.connect(nGain);
    nGain.connect(reverb);
    noise.start(now);
  } catch {}
}

function playWhoosh() {
  try {
    const ctx = initAudio();
    const now = ctx.currentTime;
    const bufLen = ctx.sampleRate * 0.8;
    const noiseBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 3;
    filter.frequency.setValueAtTime(150, now);
    filter.frequency.exponentialRampToValueAtTime(3000, now + 0.2);
    filter.frequency.exponentialRampToValueAtTime(600, now + 0.7);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.06);
    gain.gain.setValueAtTime(0.15, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    const reverb = createReverb(1.0, 3);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(reverb);
    reverb.connect(ctx.destination);
    gain.connect(ctx.destination);
    noise.start(now);
  } catch {}
}

function playChime() {
  try {
    const ctx = initAudio();
    const now = ctx.currentTime;
    const reverb = createReverb(2.5, 1.8);
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.5;
    reverb.connect(masterGain);
    masterGain.connect(ctx.destination);
    const freqs = [523.25, 659.25, 783.99, 1046.5];
    const volumes = [0.06, 0.04, 0.035, 0.02];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(volumes[i], now + i * 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);
      osc.connect(gain);
      gain.connect(reverb);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.03);
      osc.stop(now + 2.0);
    });
    const shimLen = ctx.sampleRate * 0.15;
    const shimBuf = ctx.createBuffer(1, shimLen, ctx.sampleRate);
    const shimData = shimBuf.getChannelData(0);
    for (let i = 0; i < shimLen; i++) shimData[i] = Math.random() * 2 - 1;
    const shim = ctx.createBufferSource();
    shim.buffer = shimBuf;
    const shimFilter = ctx.createBiquadFilter();
    shimFilter.type = "highpass";
    shimFilter.frequency.value = 6000;
    const shimGain = ctx.createGain();
    shimGain.gain.setValueAtTime(0.02, now);
    shimGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    shim.connect(shimFilter);
    shimFilter.connect(shimGain);
    shimGain.connect(reverb);
    shim.start(now);
  } catch {}
}

function playSettle() {
  try {
    const ctx = initAudio();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 110;
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1.5);
  } catch {}
}

/* ═══════════════════════════════════════════════════
   PRELOADER COMPONENT — Var G: Logo Becomes The N
   ═══════════════════════════════════════════════════ */

const LETTERS = ["O", "R", "T", "H", "E", "R", "N"];

export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const logoRef = useRef<HTMLImageElement>(null);
  const ghostRef = useRef<HTMLImageElement>(null);
  const nSlotRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animRan = useRef(false);

  // Progress counter
  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 1600;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Main animation sequence
  useEffect(() => {
    if (animRan.current) return;
    animRan.current = true;

    // Phase 0: Impact sound on logo entrance
    const t0 = setTimeout(() => playImpact(), 150);

    // Phase 1: At 1.5s — letters emerge from logo, logo morphs to N
    const t1 = setTimeout(() => {
      const logo = logoRef.current;
      const ghost = ghostRef.current;
      const nSlot = nSlotRef.current;
      const flash = flashRef.current;
      if (!logo || !ghost || !nSlot || !flash) return;

      playWhoosh();

      // Ghost watermark: stays center, scales up + fades
      ghost.style.opacity = "0.7";
      ghost.style.animation =
        "preloader-ghost-expand 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards";

      const logoRect = logo.getBoundingClientRect();
      const logoCX = logoRect.left + logoRect.width / 2;
      const logoCY = logoRect.top + logoRect.height / 2;

      // Animate each letter from logo center to its natural position
      wrapRefs.current.forEach((wrap, i) => {
        const letterEl = letterRefs.current[i];
        if (!wrap || !letterEl) return;

        const wrapRect = wrap.getBoundingClientRect();
        const letterCX = wrapRect.left + wrapRect.width / 2;
        const letterCY = wrapRect.top + wrapRect.height / 2;
        const offsetX = logoCX - letterCX;
        const offsetY = logoCY - letterCY;

        letterEl.animate(
          [
            {
              transform: `translate(${offsetX}px, ${offsetY}px) scale(0.3)`,
              opacity: 0,
              filter: "blur(3px)",
            },
            {
              transform: `translate(${offsetX * 0.1}px, ${offsetY * 0.1}px) scale(1.02)`,
              opacity: 0.8,
              filter: "blur(0px)",
              offset: 0.7,
            },
            {
              transform: "translate(0, 0) scale(1)",
              opacity: 1,
              filter: "blur(0px)",
            },
          ],
          {
            duration: 900,
            delay: i * 50,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "forwards",
          }
        );
      });

      // Logo morphs to N position
      const nRect = nSlot.getBoundingClientRect();
      const oWrap = wrapRefs.current[0];
      if (!oWrap) return;
      const oRect = oWrap.getBoundingClientRect();
      // Anchor to 40% of N-slot width (left of center) so the arrow clears the "O"
      const nAnchorX = nRect.left + nRect.width * 0.4;
      const oCenterY = oRect.top + oRect.height / 2;
      const dx = nAnchorX - logoCX;
      const dy = oCenterY - logoCY;
      // Responsive scale: smaller on mobile, larger on desktop
      const isMobile = window.innerWidth < 768;
      const sizeMultiplier = isMobile ? 1.25 : 1.5;
      const targetSize = oRect.height * sizeMultiplier;
      const scaleFactor = targetSize / logoRect.height;

      logo.animate(
        [
          { transform: "scale(1) translate(0, 0)", opacity: 1, offset: 0 },
          {
            transform: `scale(${scaleFactor * 1.8}) translate(${dx * 0.15 / (scaleFactor * 1.8)}px, ${dy * 0.15 / (scaleFactor * 1.8)}px)`,
            opacity: 0.7,
            offset: 0.3,
          },
          {
            transform: `scale(${scaleFactor}) translate(${dx / scaleFactor}px, ${(dy - 3) / scaleFactor}px)`,
            opacity: 1,
            offset: 1,
          },
        ],
        {
          duration: 1100,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "forwards",
        }
      );

      // Lock-in chime + flash
      setTimeout(() => {
        playChime();
        flash.style.left = nAnchorX + "px";
        flash.style.top = oRect.top + oRect.height / 2 + "px";
        flash.style.transform = "translate(-50%, -50%)";
        flash.classList.add("preloader-flash-active");
      }, 950);

      setTimeout(() => playSettle(), 1200);
    }, 800);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
    };
  }, []);

  return (
    <motion.div
      className="preloader-root"
      exit={{
        clipPath: "inset(0 0 100% 0)",
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.15 },
      }}
    >
      {/* Ambient gold glow */}
      <div className="preloader-glow" />

      {/* Decorative corners */}
      <div className="preloader-corner preloader-corner-tl" />
      <div className="preloader-corner preloader-corner-tr" />
      <div className="preloader-corner preloader-corner-bl" />
      <div className="preloader-corner preloader-corner-br" />

      {/* Logo — morphs to N position */}
      <img
        ref={logoRef}
        src="/logo-symbol.svg"
        alt=""
        className="preloader-logo-morph"
      />

      {/* Ghost watermark — stays center, scales up */}
      <img
        ref={ghostRef}
        src="/logo-symbol.svg"
        alt=""
        className="preloader-logo-ghost"
      />

      {/* Lock flash */}
      <div ref={flashRef} className="preloader-lock-flash" />

      {/* Main content */}
      <div className="preloader-content">
        <div
          className="preloader-letters"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {/* N slot — invisible, logo takes this position */}
          <div ref={nSlotRef} className="preloader-letter-wrap preloader-n-slot">
            <span className="preloader-letter" style={{ visibility: "hidden" }}>
              N
            </span>
          </div>

          {/* O-R-T-H-E-R-N — emerge from logo center */}
          {LETTERS.map((letter, i) => (
            <div
              key={i}
              ref={(el) => { wrapRefs.current[i] = el; }}
              className="preloader-letter-wrap"
            >
              <span
                ref={(el) => { letterRefs.current[i] = el; }}
                className="preloader-letter"
                style={{ opacity: 0 }}
              >
                {letter}
              </span>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <div className="preloader-subtitle-wrap">
          <p className="preloader-subtitle">Corporation Limited</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="preloader-bottom-bar">
        <p className="preloader-est">Est. 1967</p>
        <div className="preloader-progress-track">
          <div
            className="preloader-progress-fill"
            style={{ width: `${progress}%` }}
          />
          <div
            className="preloader-progress-glow"
            style={{ left: `${Math.min(progress, 97)}%` }}
          />
        </div>
        <div className="preloader-pct-row">
          <span
            className="preloader-pct"
            style={{
              color:
                progress >= 100
                  ? "rgba(191,163,80,0.8)"
                  : "rgba(245,240,225,0.25)",
            }}
          >
            {progress}%
          </span>
        </div>
      </div>

      {/* Film grain */}
      <div className="preloader-grain" />
    </motion.div>
  );
};
