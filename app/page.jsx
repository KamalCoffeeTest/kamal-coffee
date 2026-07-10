"use client";
import { useState, useEffect, useRef, createContext, useContext, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

let lenisInstance = null;

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = -78;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset });
  } else {
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition + offset,
      behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  }
};


/* ═══════════════════════════════════════════════════════════════
   KAMAL v11 — "Golden Hour, production-ready"
   ───────────────────────────────────────────────────────────────
   Everything from v10, plus:
   • SELF-ANNOUNCING ASSET SLOTS — any missing video/image renders
     a labeled placeholder (type · filename · shot description), so
     the page doubles as your shot list. A small "assets pending"
     badge lists what's missing; it disappears automatically once
     every file exists. Nothing to remove before launch.
   • SCROLL TRANSITIONS — sections gently fade/rise in as they
     enter the viewport and fade as they leave. Respects
     prefers-reduced-motion.
   • MOBILE MENU — full-screen overlay nav under 880px.
   • Launch polish: anchor offsets under the fixed nav, skip link,
     document title.

   ── ASSET SHOT LIST — public/images/kamal/ ─────────────────────
   hero-pour.mp4        VIDEO  the pour · plays once · 1920×1080+
                               (you have a 1280×720 cut — works now,
                                swap in higher res when reshot)
   hero-poster.jpg      IMAGE  first frame of the video (provided)
   can-render.png       IMAGE  front can render, transparent PNG
   photo-fridge.jpg     PHOTO  cans on ice / in cooler · landscape,
                               ≥1600px wide ("Best served ice-cold" band)
   photo-hero-counter.jpg PHOTO can in warm daylight · ~4:5 (story)
   deco-palm.png        ART    palm cutout from label · transparent
   deco-sunburst.png    ART    sunburst cutout from label · transparent
   label-waves.png      ART    wave strip from label (footer texture)

   NOTE: verify the farmers-market schedule before launch — only
   list markets you are actually attending.

   Recommended <head> tags for your index.html:
   <title>KAMAL — Authentic Vietnamese Iced Coffee · Bold & Smooth</title>
   <meta name="description" content="Authentic Vietnamese iced coffee, reimagined: dairy-free, plant-based, sweetened with allulose. Brewed in Los Angeles. Find us at LA farmers markets." />
   <meta property="og:title" content="KAMAL — Vietnamese Iced Coffee, Bold & Smooth" />
   <meta property="og:image" content="/images/kamal/hero-poster.jpg" />
   ═══════════════════════════════════════════════════════════════ */

const ASSET_BASE = "/images/kamal";
const img = (f) => `${ASSET_BASE}/${f}`;

export const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..900,0..100;1,9..144,300..900,0..100&family=Outfit:wght@300..700&display=swap');

  /* hide Next.js layout headers and footers */
  body > header, body > footer { display: none !important; }

  :root {
    /* the can's palette */
    --cream: #FBF3E2;
    --cream-2: #F6EAD2;
    --oat: #F3E4C4;
    --tan: #E8D5AD;
    --sand: #F0DEBC;
    --foam: #FFFCF4;
    --caramel: #C98A4B;
    --gold: #C9963A;
    --gold-light: #DEBB6E;
    --orange: #CD6514;
    --orange-deep: #B6540B;
    --espresso: #3A2A1A;
    --espresso-deep: #261A0E;
    --ink: #2A2218;
    --ink-soft: #6A5C48;
    --ink-faint: #7C6C52;
    --line: rgba(106,92,72,0.16);
    --navy: #1B2A4A; /* accent only — the wordmark's color on the can */
    --brown: #73562F;

    --f-disp: 'DM Serif Display', serif;
    --f-fraunces: 'Fraunces', serif;
    --f-body: 'Outfit', sans-serif;
    --f-mono: ui-monospace, 'SF Mono', Menlo, monospace;
    --ease: cubic-bezier(0.22, 1, 0.36, 1);
    --gutter: clamp(20px, 4.5vw, 60px);
  }

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; background: var(--espresso-deep); }
  body {
    background: var(--cream);
    color: var(--ink);
    font-family: var(--f-body);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
  }
  #root, .kamal-app { min-height: 100vh; background: var(--cream); }
  img { display: block; max-width: 100%; }
  ::selection { background: rgba(212,114,42,0.24); }
  button:focus-visible, a:focus-visible, summary:focus-visible {
    outline: 2.5px solid var(--orange); outline-offset: 3px; border-radius: 4px;
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0ms !important; transition-duration: 0ms !important; }
  }

  .wrap { max-width: 1160px; margin: 0 auto; padding: 0 var(--gutter); }
  .skip-link {
    position: fixed; top: -60px; left: 16px; z-index: 300;
    background: var(--espresso); color: var(--foam); padding: 12px 20px; border-radius: 6px;
    font-size: 13px; font-weight: 600; text-decoration: none; transition: top .25s;
  }
  .skip-link:focus { top: 14px; }

  /* ── inner reveals (elements) ── */
  .rv { opacity: 0; transform: translateY(36px); transition: opacity 1.5s var(--ease), transform 1.5s var(--ease); }
  .rv.vis { opacity: 1; transform: translateY(0); }
  /* ── section fade wrapper (whole sections, in AND out) ── */
  .fade-sec { position: relative; z-index: 1; will-change: opacity, transform; }

  /* ── type primitives ── */
  .eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: 4.5px; text-transform: uppercase;
    color: var(--brown); margin-bottom: 22px;
  }
  .h2 {
    font-family: var(--f-fraunces); font-weight: 560;
    font-variation-settings: "SOFT" 70, "opsz" 144;
    font-size: clamp(32px, 4.4vw, 56px); line-height: 1.04;
    letter-spacing: -0.015em; color: var(--ink); margin-bottom: 22px;
  }
  .lede { font-size: 16.5px; line-height: 1.75; color: var(--ink-soft); max-width: 540px; font-weight: 350; }
  .lede b { color: var(--ink); font-weight: 600; }

  /* ════════ ASSET SLOT PLACEHOLDERS ════════
     Render only when a file is missing. Self-removing scaffolding. */
  .slot {
    width: 100%; height: 100%; min-height: 240px;
    background:
      repeating-linear-gradient(-45deg, rgba(139,111,71,0.05) 0 14px, rgba(139,111,71,0.1) 14px 28px),
      var(--sand);
    border: 2px dashed rgba(139,111,71,0.4); border-radius: 6px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 10px; padding: 28px; text-align: center;
  }
  .slot-type {
    font-size: 10px; font-weight: 700; letter-spacing: 2.6px; text-transform: uppercase;
    color: var(--foam); background: var(--brown); padding: 5px 12px; border-radius: 100px;
  }
  .slot-file { font-family: var(--f-mono); font-size: 12.5px; font-weight: 600; color: var(--espresso); }
  .slot-note { font-size: 12px; line-height: 1.6; color: var(--ink-soft); max-width: 34ch; }
  .slot-path { font-family: var(--f-mono); font-size: 10.5px; color: var(--ink-faint); }
  .slot.on-dark { background: repeating-linear-gradient(-45deg, rgba(255,252,244,0.03) 0 14px, rgba(255,252,244,0.07) 14px 28px), rgba(38,26,14,0.55); border-color: rgba(222,187,110,0.45); }
  .slot.on-dark .slot-file { color: var(--gold-light); }
  .slot.on-dark .slot-note { color: rgba(251,243,226,0.7); }
  .slot.on-dark .slot-path { color: rgba(251,243,226,0.45); }
  .slot.on-dark .slot-type { background: var(--gold); color: var(--espresso-deep); }
  /* tiny corner chip — shown on the hero when the video file is absent */
  .video-chip {
    position: absolute; right: 18px; bottom: 18px; z-index: 3;
    display: flex; align-items: center; gap: 8px;
    font-family: var(--f-mono); font-size: 10.5px; font-weight: 600; letter-spacing: 0.5px;
    color: var(--gold-light); background: rgba(38,26,14,0.72); border: 1px dashed rgba(222,187,110,0.5);
    padding: 8px 14px; border-radius: 100px; backdrop-filter: blur(6px);
  }
  .video-chip::before { content: '▸'; font-size: 12px; }
  /* pending-assets badge — bottom-left, disappears when all files exist */
  .pending {
    position: fixed; left: 16px; bottom: 16px; z-index: 150;
    font-family: var(--f-body); max-width: 300px;
    background: var(--espresso-deep); color: var(--cream);
    border: 1px solid rgba(222,187,110,0.3); border-radius: 12px;
    box-shadow: 0 12px 40px rgba(20,12,4,0.4); overflow: hidden;
  }
  .pending-head {
    display: flex; align-items: center; gap: 10px; width: 100%;
    padding: 12px 16px; background: none; border: none; cursor: pointer;
    font-size: 11.5px; font-weight: 600; letter-spacing: 0.6px; color: var(--gold-light);
    font-family: var(--f-body);
  }
  .pending-head .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--orange); animation: pulse 2s ease-in-out infinite; flex-shrink: 0; }
  @keyframes pulse { 0%,100% { opacity: .5; } 50% { opacity: 1; } }
  .pending-list { list-style: none; padding: 4px 16px 12px; }
  .pending-list li { font-family: var(--f-mono); font-size: 10.5px; color: rgba(251,243,226,0.65); padding: 3px 0; }
  .pending-list li i { font-style: normal; color: var(--gold); }
  .pending-close { position: absolute; top: 8px; right: 10px; background: none; border: none; color: rgba(251,243,226,0.5); font-size: 15px; cursor: pointer; padding: 4px; line-height: 1; }
  .pending-close:hover { color: var(--cream); }

  /* ════════ NAV ════════ */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: var(--espresso-deep);
    transition: background .45s var(--ease), border-color .45s var(--ease);
    border-bottom: 1px solid rgba(222,187,110,0.14);
  }
  .nav.solid {
    background: rgba(251,243,226,0.92);
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    border-bottom-color: var(--line);
  }
  .nav-in { display: flex; align-items: center; justify-content: space-between; height: 78px; padding: 0 var(--gutter); }
  .logo { display: flex; flex-direction: column; align-items: center; line-height: 1; cursor: pointer; user-select: none; background: none; border: none; }
  .logo b { font-family: var(--f-disp); font-weight: 400; font-size: 27px; letter-spacing: 4px; color: var(--foam); transition: color .45s; text-shadow: 0 1px 14px rgba(38,26,14,0.35); }
  .logo .tagline { display: flex; align-items: center; gap: 7px; margin-top: 5px; font-size: 8.5px; font-weight: 600; letter-spacing: 3.6px; text-transform: uppercase; color: var(--gold-light); white-space: nowrap; transition: color .45s; }
  .logo .tagline .dash { width: 16px; height: 1px; background: var(--gold); flex-shrink: 0; opacity: .7; }
  .nav.solid .logo b { color: var(--navy); text-shadow: none; }
  .nav.solid .logo .tagline { color: var(--brown); }
  .nav-links { display: flex; gap: 30px; list-style: none; }
  .nav-a { font-family: var(--f-body); font-size: 13px; font-weight: 500; letter-spacing: 1.4px; text-transform: uppercase; color: rgba(255,252,244,0.85); background: none; border: none; cursor: pointer; padding: 8px 0; transition: color .3s; text-shadow: 0 1px 10px rgba(38,26,14,0.3); }
  .nav-a:hover { color: var(--gold-light); }
  .nav.solid .nav-a { color: var(--ink-soft); text-shadow: none; }
  .nav.solid .nav-a:hover { color: var(--orange-deep); }
  .nav-right { display: flex; align-items: center; gap: 14px; }
  .nav-cta {
    font-family: var(--f-body); font-size: 12px; font-weight: 600; letter-spacing: 1.6px; text-transform: uppercase;
    padding: 13px 26px; background: rgba(38,26,14,0.18); color: var(--foam);
    border: 1px solid rgba(255,252,244,0.55); border-radius: 100px; cursor: pointer;
    transition: all .35s var(--ease); backdrop-filter: blur(4px);
  }
  .nav-cta:hover { background: var(--orange); border-color: var(--orange); }
  .nav.solid .nav-cta { color: var(--espresso); background: transparent; border-color: rgba(58,42,26,0.35); }
  .nav.solid .nav-cta:hover { background: var(--espresso); border-color: var(--espresso); color: var(--foam); }
  /* hamburger */
  .burger { display: none; flex-direction: column; justify-content: center; gap: 5px; width: 44px; height: 44px; background: none; border: none; cursor: pointer; padding: 8px; }
  .burger span { display: block; height: 2px; width: 100%; background: var(--foam); border-radius: 2px; transition: all .3s var(--ease); box-shadow: 0 1px 8px rgba(38,26,14,0.3); }
  .nav.solid .burger span { background: var(--espresso); box-shadow: none; }
  @media (max-width: 880px) {
    .nav-links { display: none; }
    .nav-cta { display: none; }
    .burger { display: flex; }
  }
  /* mobile overlay menu */
  .menu {
    position: fixed; inset: 0; z-index: 200; background: var(--cream);
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
    animation: menuIn .35s var(--ease) both;
  }
  @keyframes menuIn { from { opacity: 0; } to { opacity: 1; } }
  .menu-close { position: absolute; top: 22px; right: 22px; width: 44px; height: 44px; background: none; border: 1px solid var(--line); border-radius: 50%; color: var(--espresso); font-size: 20px; cursor: pointer; line-height: 1; }
  .menu-mark { font-family: var(--f-disp); font-size: 22px; letter-spacing: 4px; color: var(--navy); margin-bottom: 26px; }
  .menu a, .menu button.m-link {
    font-family: var(--f-fraunces); font-size: 32px; font-weight: 500; color: var(--ink);
    background: none; border: none; cursor: pointer; padding: 10px 20px; text-decoration: none;
    transition: color .25s;
  }
  .menu button.m-link:hover { color: var(--orange-deep); }
  .menu .m-cta {
    margin-top: 26px; font-family: var(--f-body); font-size: 13px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
    padding: 17px 40px; background: var(--orange); color: var(--foam); border: none; border-radius: 100px; cursor: pointer;
  }
  .menu .m-ig { margin-top: 30px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: var(--ink-faint); text-decoration: none; font-family: var(--f-body); }

  /* ════════ HERO — THE POUR ════════
     Header bar on top (always visible) → video fills the rest of
     the screen below it, edge to edge, with NO text over it →
     headline / CTA band right below the video. */
  .hero { position: relative; padding-top: 78px; background: var(--espresso-deep); color: var(--foam); z-index: 10; }
  .hero-frame {
    position: relative; height: calc(100svh - 78px); min-height: 420px;
    overflow: hidden; background: var(--espresso);
  }
  .hero-media { position: absolute; inset: 0; z-index: 0; }
  .hero-video, .hero-poster-img { width: 100%; height: 100%; object-fit: cover; }
  .hero-scene {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 70% 55% at 60% 45%, rgba(201,138,75,0.28) 0%, rgba(38,26,14,0) 62%),
      radial-gradient(ellipse 100% 90% at 50% 115%, #4A3520 0%, var(--espresso-deep) 64%);
  }
  /* FULL-BLEED placeholder — occupies the exact footprint the real
     video will fill: the entire first screen, edge to edge, and it
     runs underneath the transparent header too. */
  .hero-scene .slot {
    position: absolute; inset: 0; max-width: none; min-height: 0;
    border: none; border-radius: 0; padding: 40px var(--gutter);
    background: repeating-linear-gradient(-45deg, rgba(255,252,244,0.015) 0 22px, rgba(255,252,244,0.045) 22px 44px);
  }
  /* thin dashed crop-guide just inside the edges, so it still reads
     as "placeholder" while showing the true video area */
  .hero-scene .slot::before {
    content: ''; position: absolute; inset: 10px;
    border: 2px dashed rgba(222,187,110,0.35); border-radius: 8px; pointer-events: none;
  }
  /* copy band — sits directly BELOW the video, never over it */
  .hero-copy {
    position: relative; text-align: center; max-width: 900px; margin: 0 auto;
    padding: clamp(56px, 9vh, 92px) var(--gutter) clamp(60px, 9vh, 96px);
  }
  .hero-eyebrow {
    font-size: 11.5px; font-weight: 600; letter-spacing: 5px; text-transform: uppercase;
    color: var(--gold-light); margin-bottom: 24px;
    animation: heroUp 1.5s var(--ease) .28s both;
  }
  .hero-h1 {
    font-family: var(--f-fraunces); font-weight: 480;
    font-variation-settings: "SOFT" 80, "opsz" 144;
    font-size: clamp(38px, 6vw, 74px); line-height: 1.02; letter-spacing: -0.015em;
    color: var(--foam);
    animation: heroUp 1.5s var(--ease) .49s both;
  }
  .hero-h1 em { font-style: italic; font-weight: 430; color: var(--gold-light); }
  .hero-sub {
    margin: 26px auto 32px; max-width: 460px;
    font-size: 15.5px; line-height: 1.75; font-weight: 330; color: rgba(255,252,244,0.85);
    animation: heroUp 1.5s var(--ease) .7s both;
  }
  .hero-cta {
    font-family: var(--f-body); font-size: 13px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
    padding: 18px 42px; background: var(--orange); color: var(--foam);
    border: none; border-radius: 100px; cursor: pointer; transition: all .35s var(--ease);
    animation: heroUp 1.5s var(--ease) .91s both;
  }
  .hero-cta:hover { background: var(--orange-deep); transform: translateY(-2px); box-shadow: 0 18px 44px rgba(190,101,35,0.4); }
  .hero-facts {
    margin-top: 30px; font-size: 11px; font-weight: 500; letter-spacing: 3px; text-transform: uppercase;
    color: rgba(255,252,244,0.6);
    animation: heroUp 1.5s var(--ease) 1.12s both;
  }
  .hero-facts i { font-style: normal; color: var(--gold-light); padding: 0 12px; }
  @keyframes heroUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

  /* the melt — espresso dissolves into cream */
  .melt { position: relative; height: 110px; margin-top: -1px; z-index: 10; pointer-events: none; }
  .melt svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }

  /* ════════ SECTIONS ════════ */
  .sec { position: relative; padding: clamp(80px, 12vh, 140px) 0; overflow: hidden; scroll-margin-top: 86px; }
  #coffee { overflow: visible; }

  .deco { position: absolute; pointer-events: none; z-index: 0; opacity: 0.32; }
  .deco img { width: 100%; height: auto; }

  /* ── THE CAN ── */
  .can-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 0.9fr 1.1fr; gap: clamp(36px, 6vw, 90px); align-items: center; }
  .can-stage { display: flex; justify-content: center; }
  .can-stage-inner {
    position: relative;
    width: 100%;
    height: clamp(360px, 44vw, 520px);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
  }
  .can-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .can-hero, .can-companion {
    position: absolute;
    height: 100%;
    width: auto;
    object-fit: contain;
    filter: drop-shadow(0 34px 50px rgba(58,42,26,0.24));
    will-change: transform;
  }
  .can-hero {
    z-index: 10;
    transform: rotate(0deg);
  }
  .can-companion {
    z-index: 5;
    transform-origin: bottom center;
  }
  .can-left {
    transform: translateX(-65px) translateY(12px) scale(0.85) rotate(-18deg);
  }
  .can-right {
    transform: translateX(65px) translateY(12px) scale(0.85) rotate(14deg);
    z-index: 4;
  }
  @media (max-width: 880px) {
    .hero-frame {
      height: auto;
      aspect-ratio: 16 / 9;
      min-height: auto;
    }
    .can-stage-inner {
      height: 210px;
    }
    .can-left {
      transform: translateX(-40px) translateY(12px) scale(0.8) rotate(-18deg) !important;
    }
    .can-right {
      transform: translateX(40px) translateY(12px) scale(0.8) rotate(14deg) !important;
    }
  }
  .can-stage .slot { min-height: clamp(360px, 44vw, 520px); max-width: 340px; }
  .spec-line {
    display: flex; flex-wrap: wrap; gap: 10px 0; align-items: center;
    margin: 30px 0 36px; padding: 18px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
    font-size: 11.5px; font-weight: 600; letter-spacing: 2.4px; text-transform: uppercase; color: var(--ink);
  }
  .spec-line i { font-style: normal; color: var(--gold); padding: 0 14px; }
  .ingr-list { list-style: none; }
  .ingr-list li { display: flex; align-items: baseline; gap: 16px; padding: 15px 0; border-bottom: 1px dashed var(--line); }
  .ingr-list li:last-child { border-bottom: none; }
  .ingr-name { font-family: var(--f-fraunces); font-size: 19px; font-weight: 540; color: var(--ink); white-space: nowrap; }
  .ingr-desc { font-size: 14px; line-height: 1.6; color: var(--ink-soft); font-weight: 350; }
  .vegan-line { margin-top: 26px; font-family: var(--f-fraunces); font-style: italic; font-size: 17px; color: var(--orange-deep); }
  @media (max-width: 880px) { .can-grid { grid-template-columns: 1fr; text-align: left; } .can-stage { order: -1; } }

  /* ── FULL-BLEED IMAGE BAND ── */
  .band { position: relative; width: 100%; aspect-ratio: 1024 / 572; overflow: hidden; background: var(--espresso); }
  .band img { width: 100%; height: 100%; object-fit: cover; }
  .band .slot { position: absolute; inset: 0; border-radius: 0; }
  .band-shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(38,26,14,0.22), rgba(38,26,14,0.42)); pointer-events: none; }
  .band-line {
    position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
    font-family: var(--f-fraunces); font-style: italic; font-weight: 440;
    font-size: clamp(26px, 4vw, 44px); color: var(--foam); text-align: center; padding: 0 var(--gutter);
    text-shadow: 0 4px 30px rgba(20,12,4,0.4); pointer-events: none;
  }

  /* ── STORY ── */
  .story-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 0.9fr 1.1fr; gap: clamp(36px, 5.5vw, 84px); align-items: center; }
  .story-photo { border-radius: 4px; overflow: hidden; box-shadow: 0 30px 70px rgba(58,42,26,0.2); aspect-ratio: 4/5; }
  .story-photo img { width: 100%; height: 100%; object-fit: cover; }
  .story-body p { font-size: 16px; line-height: 1.85; color: var(--ink-soft); font-weight: 350; margin-bottom: 16px; max-width: 56ch; }
  .story-body p b { color: var(--ink); font-weight: 600; }
  .story-quote {
    font-family: var(--f-fraunces); font-style: italic; font-weight: 460;
    font-size: clamp(22px, 2.6vw, 30px); line-height: 1.4; color: var(--ink); margin-bottom: 24px;
  }
  .story-quote span { color: var(--orange); }
  .story-close { margin-top: 28px; padding-top: 24px; border-top: 1px solid var(--line); font-family: var(--f-fraunces); font-style: italic; font-size: 15.5px; line-height: 1.7; color: var(--brown); max-width: 48ch; }
  @media (max-width: 880px) { .story-grid { grid-template-columns: 1fr; } }

  /* ── ALLULOSE ── */
  .allu { background: var(--cream-2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
  .allu-head { max-width: 640px; }
  .allu-points { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(28px, 4vw, 56px); margin-top: 58px; position: relative; z-index: 1; }
  .allu-point { border-top: 2px solid var(--gold); padding-top: 22px; }
  .allu-point h4 { font-family: var(--f-fraunces); font-weight: 560; font-size: 20px; color: var(--ink); margin-bottom: 10px; }
  .allu-point p { font-size: 14.5px; line-height: 1.7; color: var(--ink-soft); font-weight: 350; }
  .allu-note { margin-top: 44px; font-size: 12px; font-style: italic; color: var(--ink-faint); max-width: 60ch; line-height: 1.7; position: relative; z-index: 1; }
  @media (max-width: 780px) { .allu-points { grid-template-columns: 1fr; gap: 26px; } }

  /* ── FIND US ── */
  .next-line { margin: 40px 0 34px; font-family: var(--f-fraunces); font-size: clamp(19px, 2.2vw, 24px); font-weight: 500; color: var(--ink); position: relative; z-index: 1; }
  .next-line em { font-style: italic; color: var(--orange-deep); }
  .week-list { list-style: none; border-top: 1px solid var(--line); position: relative; z-index: 1; }
  .week-row { display: grid; grid-template-columns: 130px 1fr; gap: 20px; align-items: baseline; padding: 20px 0; border-bottom: 1px solid var(--line); }
  .week-day { font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--ink-faint); display: flex; align-items: center; gap: 10px; }
  .week-row.live .week-day { color: var(--orange-deep); }
  .today-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--orange); flex-shrink: 0; }
  .week-markets { font-size: 15.5px; line-height: 1.8; color: var(--ink); font-weight: 400; }
  .week-markets b { font-weight: 600; }
  .week-markets .mk-meta { color: var(--ink-faint); font-size: 13.5px; font-weight: 350; }
  .week-markets .sep { color: var(--gold); padding: 0 10px; }
  .week-rest { font-family: var(--f-fraunces); font-style: italic; font-size: 14.5px; color: var(--ink-faint); }
  .find-note { margin-top: 32px; font-size: 15px; line-height: 1.8; color: var(--ink-soft); font-weight: 350; max-width: 62ch; position: relative; z-index: 1; }
  .find-note a { color: var(--orange-deep); font-weight: 600; text-decoration: none; }
  .find-note a:hover { text-decoration: underline; }
  @media (max-width: 620px) { .week-row { grid-template-columns: 1fr; gap: 8px; } }

  /* ── FAQ ── */
  .faq-sec { background: var(--cream-2); border-top: 1px solid var(--line); }
  .faq-wrap { max-width: 720px; margin: 0 auto; position: relative; z-index: 1; padding: 0 var(--gutter); }
  .faq-list { margin-top: 44px; border-top: 1px solid var(--line); }
  .faq-list details { border-bottom: 1px solid var(--line); }
  .faq-list summary {
    list-style: none; cursor: pointer; padding: 24px 0;
    display: flex; justify-content: space-between; align-items: center; gap: 18px;
    font-family: var(--f-fraunces); font-weight: 540; font-size: 18.5px; color: var(--ink);
    transition: color .25s;
  }
  .faq-list summary::-webkit-details-marker { display: none; }
  .faq-list summary:hover { color: var(--orange-deep); }
  .faq-list summary::after { content: '+'; font-family: var(--f-body); font-weight: 300; font-size: 24px; color: var(--gold); transition: transform .3s var(--ease); flex-shrink: 0; }
  .faq-list details[open] summary::after { transform: rotate(45deg); }
  .faq-list details p { padding: 0 0 26px; font-size: 15px; line-height: 1.8; color: var(--ink-soft); font-weight: 350; max-width: 58ch; }

  /* ── FOOTER — deep roast ── */
  .footer { position: relative; background: var(--espresso-deep); color: rgba(251,243,226,0.55); }
  .footer-waves { height: 50px; background-image: url('${ASSET_BASE}/label-waves.png'); background-size: auto 100%; background-repeat: repeat-x; opacity: 0.2; }
  .footer-in { max-width: 1160px; margin: 0 auto; padding: 60px var(--gutter) 34px; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; padding-bottom: 44px; border-bottom: 1px solid rgba(251,243,226,0.1); }
  .f-brand b { font-family: var(--f-disp); font-weight: 400; font-size: 24px; letter-spacing: 4px; color: var(--foam); display: block; }
  .f-brand i { font-style: normal; font-size: 8.5px; font-weight: 600; letter-spacing: 3.4px; text-transform: uppercase; color: var(--gold-light); display: block; margin: 7px 0 18px; }
  .f-brand p { font-size: 13.5px; line-height: 1.75; color: rgba(251,243,226,0.4); max-width: 300px; font-weight: 300; }
  .f-col h5 { font-size: 10.5px; font-weight: 700; letter-spacing: 2.4px; text-transform: uppercase; color: var(--cream); margin-bottom: 18px; }
  .f-col a, .f-col button { display: block; font-size: 14px; font-weight: 350; color: rgba(251,243,226,0.45); background: none; border: none; cursor: pointer; padding: 6px 0; text-decoration: none; transition: color .25s; font-family: var(--f-body); text-align: left; }
  .f-col a:hover, .f-col button:hover { color: var(--gold-light); }
  .f-base { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; padding-top: 26px; font-size: 11.5px; color: rgba(251,243,226,0.3); font-weight: 300; }
  @media (max-width: 880px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr; } }

  /* ── Tactile paper texture ── */
  .paper-texture {
    position: relative;
  }
  .paper-texture::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background-image: url('/images/kamal/atmosphere/coffee-beans-linen.webp');
    background-size: cover;
    background-position: center;
    opacity: 0.04;
    mix-blend-mode: multiply;
    pointer-events: none;
  }

  /* ── Editorial grids ── */
  .find-grid {
    display: grid;
    grid-template-columns: 1.12fr 0.88fr;
    gap: clamp(36px, 5.5vw, 84px);
    align-items: flex-start;
  }
  .find-image-container {
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 30px 70px rgba(58,42,26,0.12);
    aspect-ratio: 3 / 4;
    z-index: 1;
  }
  .find-image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 880px) {
    .find-grid {
      grid-template-columns: 1fr;
    }
    .find-image-container {
      display: none;
    }
    .ingr-desc {
      font-size: 16px !important;
    }
    .allu-point p {
      font-size: 16px !important;
    }
    .faq-list details p {
      font-size: 16px !important;
    }
    .find-note {
      font-size: 16px !important;
    }
    .story-close {
      font-size: 16px !important;
    }
    .week-markets {
      font-size: 16px !important;
    }
    .week-markets .mk-meta {
      font-size: 14.5px !important;
    }
    .week-rest {
      font-size: 16px !important;
    }
    .allu-note {
      font-size: 14px !important;
    }
    .f-brand p {
      font-size: 15px !important;
      max-width: 100% !important;
    }
    .hero-sub {
      font-size: 16px !important;
    }
    .sec {
      padding: clamp(50px, 7vh, 80px) 0 !important;
    }
    .footer-grid {
      gap: 32px !important;
    }
  }
`;
/* ═══════════ ASSET REGISTRY — powers placeholders & the pending badge ═══════════ */
export const AssetCtx = createContext({ report: () => {}, missing: [] });

export function AssetProvider({ children }) {
  const [missing, setMissing] = useState([]);
  const report = useCallback((label) => {
    setMissing((m) => (m.includes(label) ? m : [...m, label]));
  }, []);
  return <AssetCtx.Provider value={{ report, missing }}>{children}</AssetCtx.Provider>;
}

/* labeled placeholder block — appears wherever an asset file is missing */
export function Slot({ type, file, note, dark, style }) {
  return (
    <div className={`slot ${dark ? "on-dark" : ""}`} style={style} role="img" aria-label={`Placeholder for ${file}`}>
      <span className="slot-type">{type}</span>
      <span className="slot-file">{file}</span>
      {note && <span className="slot-note">{note}</span>}
      <span className="slot-path">→ public{ASSET_BASE}/</span>
    </div>
  );
}

/* image that self-replaces with a labeled Slot when its file is missing */
export function Pic({ src, alt, style, className, type = "Photo", file, note, dark }) {
  const [err, setErr] = useState(false);
  const { report } = useContext(AssetCtx);
  const label = file || src.split("/").pop();
  useEffect(() => { if (err) report(`${label} — ${type.toLowerCase()}`); }, [err, label, type, report]);
  if (err) return <Slot type={type} file={label} note={note} dark={dark} style={style} />;
  return <img src={src} alt={alt} style={style} className={className} onError={() => setErr(true)} loading="lazy" />;
}

/* decorative cutout — no inline placeholder (it's ornament), but still
   reports to the pending badge so you remember to export it */
export function Deco({ name, style, rotate = 0 }) {
  const [err, setErr] = useState(false);
  const { report } = useContext(AssetCtx);
  const ref = useRef(null);

  useEffect(() => {
    if (err) report(`${name} — label art (optional)`);
  }, [err, name, report]);

  useEffect(() => {
    if (err) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    const section = el.closest(".sec");
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { 
          rotation: rotate - 6,
          y: -20
        },
        {
          rotation: rotate + 6,
          y: 20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, [err, rotate]);

  if (err) return null;
  return (
    <div ref={ref} className="deco" style={{ ...style, transform: `rotate(${rotate}deg)` }} aria-hidden="true">
      <img src={img(name)} alt="" onError={() => setErr(true)} />
    </div>
  );
}

/* bottom-left badge listing every missing file; auto-disappears when all exist */
export function PendingBadge() {
  const { missing } = useContext(AssetCtx);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  if (!missing.length || hidden) return null;
  return (
    <div className="pending" role="status">
      <button className="pending-close" onClick={() => setHidden(true)} aria-label="Dismiss">×</button>
      <button className="pending-head" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="dot" />
        {missing.length} asset{missing.length > 1 ? "s" : ""} pending — placeholders marked on page
      </button>
      {open && (
        <ul className="pending-list">
          {missing.map((m, i) => <li key={i}><i>▸</i> {m}</li>)}
        </ul>
      )}
    </div>
  );
}

/* ═══════════ SCROLL FADE — sections ease in entering, ease out leaving ═══════════ */
export function FadeSection({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      if (r.bottom < -80 || r.top > vh + 80) { el.style.opacity = "0.02"; return; }
      const zone = vh * 0.32; // fade band at each viewport edge (widened from 0.22)
      const tIn = (vh - r.top) / zone;   // entering from below
      const tOut = r.bottom / zone;      // exiting above
      const t = Math.max(0, Math.min(1, tIn, tOut));
      const eased = t * t * (3 - 2 * t); // smoothstep
      el.style.opacity = String(0.02 + 0.98 * eased);
      el.style.transform = `translateY(${((1 - eased) * 36).toFixed(1)}px)`; // translateY increased from 26 to 36
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="fade-sec">{children}</div>;
}

/* inner element reveal (fires once) */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add("vis");
      } else {
        el.classList.remove("vis");
      }
    }, {
      rootMargin: "-8% 0px -8% 0px",
      threshold: 0.05
    });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}
export function Rv({ children, delay = 0 }) {
  const ref = useReveal();
  return <div ref={ref} className="rv" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

/* ─────────── data ─────────── */
/* NOTE: verify this schedule reflects markets you actually attend. */
export const WEEK = [
  { day: "Sun", full: "Sunday", markets: [
    { n: "Hollywood", m: "Ivar & Selma · 8–1" }, { n: "Mar Vista", m: "Venice & Grand View · 9–2" },
    { n: "Larchmont", m: "Larchmont Blvd · 10–2" }, { n: "Studio City", m: "Ventura Pl · 8–1" }, { n: "Brentwood", m: "Gretna Green · 9–2" },
  ]},
  { day: "Mon", full: "Monday", markets: [] },
  { day: "Tue", full: "Tuesday", markets: [] },
  { day: "Wed", full: "Wednesday", markets: [{ n: "Santa Monica", m: "Arizona & 2nd · 8–1" }] },
  { day: "Thu", full: "Thursday", markets: [] },
  { day: "Fri", full: "Friday", markets: [{ n: "Echo Park", m: "Logan & Sunset · PM" }] },
  { day: "Sat", full: "Saturday", markets: [{ n: "Santa Monica", m: "Arizona & 2nd · 8–1" }, { n: "Silverlake", m: "Sunset & Edgecliffe · 8–1:30" }] },
];
export function nextMarketInfo() {
  const today = new Date().getDay();
  for (let o = 0; o < 7; o++) {
    const i = (today + o) % 7;
    if (WEEK[i].markets.length) return { when: o === 0 ? "today" : o === 1 ? "tomorrow" : WEEK[i].full, names: WEEK[i].markets.map((m) => m.n).join(" · ") };
  }
  return null;
}

const FAQS = [
  { q: "What makes KAMAL different?", a: "It's an authentic Vietnamese iced coffee made with creamy oat milk and sweetened exclusively with allulose — a naturally occurring rare sugar that doesn't spike blood sugar. No gums, no stabilizers, no artificial anything." },
  { q: "Is KAMAL vegan and dairy-free?", a: "100% — always. We use condensed oat milk (water, oats, sunflower oil, a touch of sea salt) instead of condensed dairy milk. No lactose, no cream, fully plant-based." },
  { q: "What is allulose?", a: "A rare, naturally occurring sugar found in figs and raisins. Tastes like sugar, with minimal impact on blood glucose and insulin — and it's excluded from total and added sugars on labels per FDA guidance." },
  { q: "How much caffeine?", a: "90mg per 8.4oz can — about one strong cup of coffee." },
  { q: "Does it need refrigeration?", a: "Yes. Keep it cold, and once opened, finish within 48 hours. Best shaken and chilled." },
  { q: "Can I order online?", a: "Not yet. For now, KAMAL is in-person only at LA farmers markets — see the weekly circuit above, and follow @kamal_coffee for each week's confirmed lineup." },
];

/* ─────────── nav + mobile menu ─────────── */
export function Nav() {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const [isReserve, setIsReserve] = useState(false);
  useEffect(() => {
    setIsReserve(window.location.pathname.startsWith("/reserve"));
    const fn = () => setSolid(window.scrollY > window.innerHeight * 0.72);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);
  const goTo = (id) => {
    setMenu(false);
    if (typeof window !== "undefined") {
      const isHome = window.location.pathname === "/" || window.location.pathname === "";
      if (id === "story") {
        window.location.href = "/story";
      } else if (id === "reserve") {
        window.location.href = "/reserve";
      } else if (isHome) {
        setTimeout(() => scrollToId(id), 40);
      } else {
        window.location.href = "/#" + id;
      }
    }
  };
  const links = [
    { id: "coffee", label: "The Coffee" },
    { id: "story", label: "Our Story" },
    { id: "allulose", label: "Allulose" },
    { id: "find", label: "Find Us" },
    { id: "faq", label: "FAQ" },
  ];
  return (
    <>
      <nav className={`nav ${solid || isReserve ? "solid" : ""}`}>
        <div className="nav-in">
          <button className="logo" onClick={() => {
            if (typeof window !== "undefined") {
              const isHome = window.location.pathname === "/" || window.location.pathname === "";
              if (isHome) {
                if (lenisInstance) { lenisInstance.scrollTo(0); } else { window.scrollTo({ top: 0, behavior: "smooth" }); }
              } else {
                window.location.href = "/";
              }
            }
          }} aria-label="KAMAL — back to top">
            <b>KAMAL</b>
            <span className="tagline"><span className="dash" />Bold &amp; Smooth<span className="dash" /></span>
          </button>
          <ul className="nav-links">
            {links.map((l) => <li key={l.id}><button className="nav-a" onClick={() => goTo(l.id)}>{l.label}</button></li>)}
          </ul>
          <div className="nav-right">
            <button className="nav-cta" onClick={() => goTo("reserve")}>Reserve</button>
            <button className="burger" onClick={() => setMenu(true)} aria-label="Open menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
      {menu && (
        <div className="menu" role="dialog" aria-label="Menu">
          <button className="menu-close" onClick={() => setMenu(false)} aria-label="Close menu">×</button>
          <div className="menu-mark">KAMAL</div>
          {links.map((l) => <button key={l.id} className="m-link" onClick={() => goTo(l.id)}>{l.label}</button>)}
          <button className="m-cta" onClick={() => goTo("reserve")}>Reserve</button>
          <a className="m-ig" href="https://instagram.com/kamal_coffee" target="_blank" rel="noopener noreferrer">@kamal_coffee</a>
        </div>
      )}
    </>
  );
}

/* ─────────── hero — the pour ───────────
   Plays hero-pour.mp4 ONCE and holds on the final settled-glass
   frame. Fallback chain: video → hero-poster.jpg → labeled slot. */
function HeroMedia() {
  const [mode, setMode] = useState("video"); // "video" | "poster" | "slot"
  const [videoMissing, setVideoMissing] = useState(false);
  const { report } = useContext(AssetCtx);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) setMode("poster");
  }, []);
  useEffect(() => { if (videoMissing) report("hero-pour.mp4 — video (the pour)"); }, [videoMissing, report]);
  const videoFailed = () => { setVideoMissing(true); setMode("poster"); };
  if (mode === "video") {
    return (
      <div className="hero-media">
        <video
          className="hero-video"
          autoPlay muted loop playsInline preload="auto"
          poster={img("hero-poster.jpg")}
          onError={videoFailed}
          aria-hidden="true"
        >
          <source src={img("hero-pour.mp4")} type="video/mp4" onError={videoFailed} />
        </video>
      </div>
    );
  }
  if (mode === "poster") {
    return (
      <div className="hero-media">
        <img
          className="hero-poster-img"
          src={img("hero-poster.jpg")}
          alt=""
          aria-hidden="true"
          onError={() => setMode("slot")}
        />
        {videoMissing && <div className="video-chip">video pending · hero-pour.mp4</div>}
      </div>
    );
  }
  return (
    <div className="hero-media">
      <div className="hero-scene">
        <Slot
          dark
          type="Video"
          file="hero-pour.mp4"
          note="The pour: coffee over ice beside the can, cream swirl, condensation. Plays once, holds final frame. 1920×1080+, ~10s, muted. (Poster: hero-poster.jpg — first frame.)"
        />
      </div>
    </div>
  );
}

function Hero() {
  const goTo = (id) => {
    if (id === "reserve") {
      window.location.href = "/reserve";
    } else {
      scrollToId(id);
    }
  };
  return (
    <header className="hero">
      {/* pure video, nothing over it — fills the screen below the header */}
      <div className="hero-frame">
        <HeroMedia />
      </div>
      {/* headline + CTA live directly BELOW the video */}
      <div className="hero-copy">
        <div className="hero-eyebrow">Cà phê sữa đá — Vietnamese iced coffee</div>
        <h1 className="hero-h1">Bold &amp; smooth,<br /><em>poured slow.</em></h1>
        <p className="hero-sub">Slow-brewed coffee over ice, swirled with creamy condensed oat milk. Dairy-free, plant-based, brewed in Los Angeles.</p>
        <button className="hero-cta" onClick={() => goTo("reserve")}>Reserve your cans</button>
        <div className="hero-facts">85 calories<i>·</i>Vegan<i>·</i>90mg caffeine<i>·</i>6g net carbs</div>
      </div>
    </header>
  );
}

/* espresso melts into cream */
function Melt() {
  return (
    <div className="melt" aria-hidden="true">
      <svg viewBox="0 0 1440 110" preserveAspectRatio="none">
        <path d="M0,70 C240,110 480,20 720,45 C960,70 1200,105 1440,55 L1440,0 L0,0 Z" fill="var(--espresso-deep)" />
      </svg>
    </div>
  );
}

/* ─────────── the can stage ─────────── */
function CanStage() {
  const [err, setErr] = useState(false);
  const { report } = useContext(AssetCtx);
  const containerRef = useRef(null);
  
  const src = img("can-render.png");
  const label = "can-render.png";
  
  useEffect(() => {
    if (err) report(`${label} — render`);
  }, [err, report]);

  useEffect(() => {
    if (err) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const el = containerRef.current;
    if (!el) return;

    const triggerSection = el.closest(".sec");
    if (!triggerSection) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 880;
      const travelY = isMobile ? "-60vh" : "-120vh";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerSection,
          start: "top 100%",
          end: "top -15%",
          scrub: 1.8,
        }
      });

      // Left can
      tl.fromTo(".can-left",
        { y: travelY },
        { y: 12, duration: 3.0, ease: "power3.out" },
        0
      );
      tl.fromTo(".can-left",
        { rotation: -36 },
        { rotation: -18, duration: 3.0, ease: "back.out(1.4)" },
        0
      );

      // Right can
      tl.fromTo(".can-right",
        { y: travelY },
        { y: 12, duration: 3.0, ease: "power3.out" },
        0.50
      );
      tl.fromTo(".can-right",
        { rotation: 28 },
        { rotation: 14, duration: 3.0, ease: "back.out(1.4)" },
        0.50
      );

      // Hero can
      tl.fromTo(".can-hero",
        { y: travelY },
        { y: 0, duration: 4.0, ease: "power3.out" },
        1.00
      );
      tl.fromTo(".can-hero",
        { rotation: -6 },
        { rotation: 0, duration: 4.0, ease: "back.out(1.4)" },
        1.00
      );
    }, el);

    return () => ctx.revert();
  }, [err]);

  if (err) {
    return (
      <Slot
        type="Render"
        file={label}
        note="Front can render on transparent background, ≥1200px tall."
      />
    );
  }

  return (
    <div ref={containerRef} className="can-stage-inner">
      <img
        src={src}
        alt=""
        style={{ display: "none" }}
        onError={() => setErr(true)}
      />
      <div className="can-container">
        <img
          src={src}
          className="can-companion can-left"
          alt="KAMAL Vietnamese Iced Coffee can companion left"
          width="432"
          height="577"
          loading="lazy"
        />
        <img
          src={src}
          className="can-companion can-right"
          alt="KAMAL Vietnamese Iced Coffee can companion right"
          width="432"
          height="577"
          loading="lazy"
        />
        <img
          src={src}
          className="can-hero"
          alt="KAMAL Vietnamese Iced Coffee can hero"
          width="432"
          height="577"
          loading="lazy"
        />
      </div>
    </div>
  );
}

/* ─────────── the can ─────────── */
function TheCan() {
  return (
    <section className="sec" id="coffee">
      <div className="wrap">
        <div className="can-grid">
          <Rv>
            <div className="can-stage">
              <CanStage />
            </div>
          </Rv>
          <Rv delay={180}> {/* 120 * 1.5 = 180 */}
            <div>
              <div className="eyebrow">The coffee</div>
              <h2 className="h2">One can. Three ingredients that matter.</h2>
              <p className="lede">Vietnamese iced coffee is bold, sweet, and silky all at once. We keep everything you love about it minus the dairy and the sugar crash.</p>
              <div className="spec-line">8.4 oz<i>·</i>90mg caffeine<i>·</i>6g net carbs<i>·</i>85 cal</div>
              <ul className="ingr-list">
                <li><span className="ingr-name">Slow-brewed coffee</span><span className="ingr-desc">Brewed low and slow in LA, for depth without bitterness.</span></li>
                <li><span className="ingr-name">Condensed oat milk</span><span className="ingr-desc">Creamy condensed oat milk — no gums, no stabilizers.</span></li>
                <li><span className="ingr-name">Allulose</span><span className="ingr-desc">A rare sugar that tastes like sugar — without the spike.</span></li>
              </ul>
              <div className="vegan-line">Always dairy-free. Always plant-based. Nothing artificial, ever.</div>
            </div>
          </Rv>
        </div>
      </div>
    </section>
  );
}

/* ─────────── cinematic breather ─────────── */
function ColdBand() {
  const containerRef = useRef(null);
  const handRef = useRef(null);
  const [isBgErr, setIsBgErr] = useState(false);
  const [isHandErr, setIsHandErr] = useState(false);
  const { report } = useContext(AssetCtx);

  const boxSrc = img("kit-box-open.png");
  const handCanSrc = img("kit-hand-can.png");

  useEffect(() => {
    if (isBgErr) report("kit-box-open.png");
  }, [isBgErr, report]);

  useEffect(() => {
    if (isHandErr) report("kit-hand-can.png");
  }, [isHandErr, report]);

  useEffect(() => {
    if (isBgErr || isHandErr) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Animate the hand+can image moving in and out as we scroll
      gsap.fromTo(handRef.current,
        { x: "-30%", y: "-15%", rotation: -10 },
        {
          x: "0%",
          y: "0%",
          rotation: 0,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, [isBgErr, isHandErr]);

  if (isBgErr || isHandErr) {
    return (
      <div className="band">
        <Slot
          dark
          type="Photo"
          file="kit-box-open.png / kit-hand-can.png"
          note="Kamal coffee decomposed animation kit"
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="band" style={{ height: "auto", aspectRatio: "1024 / 572" }}>
      {/* Background Box */}
      <img
        src={boxSrc}
        alt="KAMAL coffee box"
        style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
        width="1024"
        height="572"
        onError={() => setIsBgErr(true)}
      />
      {/* Foreground Hand + Can */}
      <img
        ref={handRef}
        src={handCanSrc}
        alt="Hand placing KAMAL coffee can"
        style={{
          width: "75%",
          height: "75%",
          position: "absolute",
          left: "-4.88%",
          bottom: "15.73%",
          willChange: "transform",
        }}
        width="1024"
        height="571"
        onError={() => setIsHandErr(true)}
      />
      <div className="band-shade" style={{ mixBlendMode: "multiply", opacity: 0.18 }} />
      <div className="band-line">Best served ice-cold.</div>
    </div>
  );
}

/* ─────────── story ─────────── */
export function Story() {
  return (
    <section className="sec" id="story">
      <Deco name="deco-palm.png" style={{ top: "6%", right: "-40px", width: 180 }} rotate={12} />
      <div className="wrap">
        <div className="story-grid">
          <Rv>
            <div className="story-photo">
              <Pic
                src={img("photo-hero-counter.jpg")}
                alt="KAMAL can in warm daylight in LA"
                type="Photo"
                note="Can in warm golden-hour light — portrait ~4:5, kitchen counter or market table."
              />
            </div>
          </Rv>
          <Rv delay={210}>
            <div className="story-body">
              <div className="eyebrow">Our story</div>
              <p className="story-quote">"We grew up on <span>cà phê sữa đá</span> — and wanted a version that loved us back."</p>
              <p>Vietnamese iced coffee was the taste of every family gathering, every afternoon break, every reason to slow down for five minutes. Bold coffee, sweet condensed milk, a tall glass of ice.</p>
              <p>KAMAL keeps the flavor we grew up loving and adds the wellness we care about now: <b>dairy swapped for creamy oat milk, sugar swapped for allulose.</b> Every can is brewed and canned in Los Angeles, and we bring it to you in person — one farmers market at a time.</p>
              <p className="story-close">The pagoda on our can rises over still water at sunset — a quiet tribute to the landscapes and rituals that gave the world this coffee.</p>
            </div>
          </Rv>
        </div>
      </div>
    </section>
  );
}

/* ─────────── breather ─────────── */
export function Breather() {
  return (
    <section className="sec" style={{ background: "var(--cream)", padding: "clamp(100px, 15vh, 180px) 0" }}>
      <div className="wrap">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <Rv>
            <div style={{
              width: "100%",
              maxWidth: "800px",
              borderRadius: "4px",
              overflow: "hidden",
              boxShadow: "0 30px 70px rgba(58,42,26,0.12)",
              aspectRatio: "16 / 9",
              marginBottom: "44px"
            }}>
              <img
                src="/images/kamal/atmosphere/coffee-swirl.webp"
                alt="Espresso coffee swirled with creamy condensed oat milk"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                width="800"
                height="450"
                loading="lazy"
              />
            </div>
          </Rv>
          <Rv delay={150}>
            <p style={{
              fontFamily: "var(--f-fraunces)",
              fontWeight: 430,
              fontStyle: "italic",
              fontSize: "clamp(20px, 2.4vw, 28px)",
              lineHeight: 1.4,
              color: "var(--ink)",
              maxWidth: "28ch"
            }}>
              Creamy condensed oat milk, swirled low and slow.
            </p>
          </Rv>
        </div>
      </div>
    </section>
  );
}

/* ─────────── allulose ─────────── */
function Allulose() {
  return (
    <section className="sec allu paper-texture" id="allulose">
      <Deco name="deco-sunburst.png" style={{ bottom: "-30px", left: "-50px", width: 190 }} rotate={-10} />
      <div className="wrap">
        <Rv>
          <div className="allu-head">
            <div className="eyebrow">The sweetener</div>
            <h2 className="h2">Sweet, without the sugar.</h2>
            <p className="lede">Kamal Coffee is sweetened exclusively with allulose — a rare sugar found naturally in figs and raisins. It's why the can tastes like dessert and reads like discipline.</p>
          </div>
        </Rv>
        <div className="allu-points">
          <Rv delay={120}><div className="allu-point"><h4>Tastes like sugar</h4><p>Because chemically, it nearly is — the same clean sweetness, no bitter aftertaste, no artificial anything.</p></div></Rv>
          <Rv delay={240}><div className="allu-point"><h4>Minimal glucose impact</h4><p>Allulose has minimal effect on blood glucose and insulin, so there's no crash an hour later.</p></div></Rv>
          <Rv delay={360}><div className="allu-point"><h4>6g net carbs</h4><p>From the label: 56g total carbs − 50g allulose = 6g net carbs per can.</p></div></Rv>
        </div>
        <Rv delay={450}><p className="allu-note">Per FDA guidance, allulose is excluded from total and added sugars on nutrition labels. As always, talk to your doctor about what's right for your diet.</p></Rv>
      </div>
    </section>
  );
}

/* ─────────── find us ─────────── */
function FindUs() {
  const next = nextMarketInfo();
  const todayIdx = new Date().getDay();
  const order = [0, 1, 2, 3, 4, 5, 6]; // Sun → Sat
  return (
    <section className="sec" id="find">
      <div className="wrap">
        <div className="find-grid">
          <div>
            <Rv>
              <div className="eyebrow">Find us</div>
              <h2 className="h2">At the markets, every week.</h2>
              <p className="lede">Kamal Coffee launches where LA's food culture lives — the farmers markets. Cold cans straight from the cooler, and a friendly face behind the table.</p>
            </Rv>
            {next && (
              <Rv delay={100}>
                <p className="next-line">Next up <em>{next.when}</em> — {next.names}. Come say hi.</p>
              </Rv>
            )}
            <Rv delay={160}>
              <ul className="week-list">
                {order.map((idx) => {
                  const d = WEEK[idx];
                  return (
                    <li key={d.day} className={`week-row ${d.markets.length ? "live" : ""}`}>
                      <span className="week-day">{d.day}{idx === todayIdx && <span className="today-dot" aria-label="today" />}</span>
                      <span className="week-markets">
                        {d.markets.length
                          ? d.markets.map((m, j) => (
                              <span key={j}>
                                <b>{m.n}</b> <span className="mk-meta">{m.m}</span>
                                {j < d.markets.length - 1 && <span className="sep">·</span>}
                              </span>
                            ))
                          : <span className="week-rest">brew &amp; restock day</span>}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Rv>
            <Rv delay={220}>
              <p className="find-note">Our lineup shifts week to week — we post each week's confirmed markets on <a href="https://instagram.com/kamal_coffee" target="_blank" rel="noopener noreferrer">@kamal_coffee</a>. Days and hours can change seasonally, so check each market before heading out.</p>
            </Rv>
          </div>
          <Rv delay={260}>
            <div className="find-image-container">
              <img
                src="/images/kamal/atmosphere/la-palms.webp"
                alt="LA palm trees silhouetted against a golden hour sunset"
                width="382"
                height="510"
                loading="lazy"
              />
            </div>
          </Rv>
        </div>
      </div>
    </section>
  );
}

/* ─────────── faq ─────────── */
function FAQ() {
  return (
    <section className="sec faq-sec paper-texture" id="faq">
      <div className="faq-wrap">
        <Rv>
          <div className="eyebrow" style={{ textAlign: "center" }}>Questions</div>
          <h2 className="h2" style={{ textAlign: "center" }}>Asked &amp; answered.</h2>
        </Rv>
        <Rv delay={180}>
          <div className="faq-list">
            {FAQS.map((f, i) => <details key={i}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </div>
        </Rv>
      </div>
    </section>
  );
}

/* ─────────── footer ─────────── */
export function Footer() {
  const goTo = (id) => {
    if (typeof window !== "undefined") {
      const isHome = window.location.pathname === "/" || window.location.pathname === "";
      if (id === "story") {
        window.location.href = "/story";
      } else if (id === "reserve") {
        window.location.href = "/reserve";
      } else if (isHome) {
        scrollToId(id);
      } else {
        window.location.href = "/#" + id;
      }
    }
  };
  return (
    <footer className="footer">
      <div className="footer-waves" />
      <div className="footer-in">
        <div className="footer-grid">
          <div className="f-brand">
            <b>KAMAL</b><i>Bold &amp; Smooth</i>
            <p>Authentic Vietnamese iced coffee — dairy-free, plant-based, sweetened with allulose, and brewed in Los Angeles, California.</p>
          </div>
          <div className="f-col"><h5>Explore</h5>
            <button onClick={() => goTo("reserve")}>Reserve</button>
            <button onClick={() => goTo("coffee")}>The Coffee</button>
            <button onClick={() => goTo("story")}>Our Story</button>
            <button onClick={() => goTo("allulose")}>Allulose</button>
            <button onClick={() => goTo("find")}>Find Us</button>
            <button onClick={() => goTo("faq")}>FAQ</button>
          </div>
          <div className="f-col"><h5>Connect</h5>
            <a href="https://instagram.com/kamal_coffee" target="_blank" rel="noopener noreferrer">Instagram @kamal_coffee</a>
            <a href="https://tiktok.com/@kamal_coffee" target="_blank" rel="noopener noreferrer">TikTok @kamal_coffee</a>
            <a href="https://kamalcoffee.com">kamalcoffee.com</a>
          </div>
        </div>
        <div className="f-base">
          <span>© 2026 Kamal Coffee · Los Angeles, CA · Product of USA</span>
          <span>Brewed in LA</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────── app ─────────── */
export default function App() {
  useEffect(() => {
    document.title = "KAMAL — Authentic Vietnamese Iced Coffee · Bold & Smooth";

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 1.1,
      syncTouch: true,
    });

    lenisInstance = lenis;

    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      setTimeout(() => {
        scrollToId(hash);
      }, 300);
    }

    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    const onTick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
  return (
    <AssetProvider>
      <div className="kamal-app">
        <style>{CSS}</style>
        <a className="skip-link" href="#coffee">Skip to content</a>
        <Nav />
        <main>
          <Hero />
          <Melt />
          <FadeSection><TheCan /></FadeSection>
          <FadeSection><ColdBand /></FadeSection>
          <FadeSection><Allulose /></FadeSection>
          <FadeSection><FindUs /></FadeSection>
          <FadeSection><FAQ /></FadeSection>
        </main>
        <Footer />
        <PendingBadge />
      </div>
    </AssetProvider>
  );
}
