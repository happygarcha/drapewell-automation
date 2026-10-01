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
Square corners everywhere. Plates are 4:5; thumbnails 56 by 70.

## Components
- **Plate:** tinted frame (fallback when a photo is missing), image cover-cropped, caption on a bottom scrim, slow 2.5% zoom on hover.
- **Room list:** thumbnail, name, price; hairline separated.
- **Primary button:** ink fill, no radius; teal on hover.
- **Reveal:** plates and text fade up once on scroll (900ms ease-out); respects reduced motion and stays visible without JavaScript.

## Do's and Don'ts
- Do use real catalog photos and prices from the store; never show SKUs, supplier ids or stock.
- Do keep one accent colour and let space do the work.
- Don't add shadows, gradients beyond the caption scrim, cream grounds or serif display faces.
- Don't use product tiles as the page structure on the home page; rooms are spreads.
