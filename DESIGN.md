---
name: Drapewell Lookbook
description: A calm room lookbook for a home-textiles store. Cool white walls, ink slate type, one deep teal accent, large light-weight headlines.
colors:
  wall: "oklch(0.975 0.004 240)"
  wall-deep: "oklch(0.945 0.006 240)"
  ink: "oklch(0.24 0.025 250)"
  ink-soft: "oklch(0.46 0.02 250)"
  accent: "oklch(0.42 0.08 220)"
  accent-deep: "oklch(0.34 0.08 220)"
  accent-ink: "oklch(0.98 0.004 220)"
  discover-bg: "oklch(0.14 0.025 285)"
  discover-surface: "oklch(0.19 0.03 285)"
  discover-surface-2: "oklch(0.235 0.035 285)"
  discover-text: "oklch(0.97 0.005 285)"
  discover-text-soft: "oklch(0.76 0.02 285)"
  discover-line: "oklch(1 0 0 / 0.1)"
  neon-magenta: "oklch(0.72 0.27 340)"
  neon-cyan: "oklch(0.86 0.17 200)"
  neon-lime: "oklch(0.9 0.22 130)"
typography:
  display:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.8rem, 8vw, 6rem)"
    fontWeight: 300
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  room-title:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 5vw, 3.8rem)"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  wordmark:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 500
    letterSpacing: "0.32em"
rounded:
  none: "0"
  window: "999px"
  circle: "50%"
  discover-xs: "8px"
  discover-arch: "160px"
  discover-arch-base: "24px"
  discover-sm: "12px"
  discover-md: "20px"
  discover-hero: "32px"
  discover-pill: "999px"
spacing:
  gutter: "clamp(18px, 5vw, 64px)"
  spread: "clamp(56px, 9vw, 128px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.wall}"
    rounded: "{rounded.none}"
    padding: "14px 26px"
  button-primary-hover:
    backgroundColor: "{colors.accent-deep}"
  plate:
    backgroundColor: "{colors.wall-deep}"
    rounded: "{rounded.none}"
---

# Design System: Drapewell Lookbook

## Overview
A calm room lookbook: each room is a spread with one large plate and a short, quiet list of what is in the room. Cool white walls, deep ink slate type, one deep teal accent for prices and the current room. Light-weight grotesque at large size, hairline rules, generous space, square corners. Palette strategy: Restrained. Light scene: a bright, quiet room in daylight. No cream, no serif display, no terracotta.

## Colors
- **Wall** is the page; **wall-deep** tints frames and thumbnails. Both lean blue, never cream.
- **Ink** is the text and primary button; **ink-soft** is secondary text.
- **Accent** (deep teal) marks prices and the active room only; **accent-deep** is hover.

## Typography
Hanken Grotesk only. Display and room titles at weight 300 with tight tracking; body at 400; wordmark at 500 uppercase with wide tracking. Tabular numerals throughout. Display never exceeds 6rem.

## Layout
Max width 1440px, fluid gutter. The home page is a hero, a numbered room index, then one spread per room (7:5 plate and text, alternating sides from 900px). Room pages are a four-up grid of 4:5 plates. Menu items drive the room links, spreads and index.

## Elevation & Depth
Flat. No shadows. Depth comes from space and hairline rules. Photographs sit in tinted frames, with a soft bottom scrim only under the caption.

## Shapes
Windows, not boxes: product photos are cut as arches (999px top corners), circles (50%) and pills (999px); buttons, inputs and rules stay square. A pleated fabric stand-in sits under every photo so a missing image still reads as cloth and light. Thumbnails are 56 by 70.

## Components
- **Plate:** tinted frame (fallback when a photo is missing), image cover-cropped, caption on a bottom scrim, slow 2.5% zoom on hover.
- **Room list:** thumbnail, name, price; hairline separated.
- **Primary button:** ink fill, no radius; teal on hover.
- **Reveal:** plates and text fade up once on scroll (900ms ease-out); respects reduced motion and stays visible without JavaScript.

## Do's and Don'ts
- Do cut photos as windows (arch, circle, pill) and let large outline type pass behind them; never show SKUs, supplier ids or stock.
- Do keep one accent colour and let space do the work.
- Don't add shadows, gradients beyond the caption scrim, cream grounds or serif display faces.
- Don't use product tiles as the page structure on the home page; rooms are spreads.

## Discover surface (discover/)
A second, dark surface built to the Muzli rules the owner supplied: Inter body text with bold, wide editorial headings (Archivo, 125% width, 800 to 900), strict 4px spacing steps (every margin, padding and gap is a multiple of 4), a three-column dashboard (sticky left curation sidebar, sticky right feeds, an oversized hero accent card), and deep-contrast dark mode with vibrant neon radial gradients (magenta, cyan, lime). Neon is reserved for the hero glow, active states, prices and primary actions. The calm lookbook in `site/` is unchanged.
