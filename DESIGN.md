---
name: Drapewell Storefront
description: A mill sample counter for ready-made drapes. Swatch cards on a cool grey counter, indigo hang tags, notched size strips.
colors:
  counter: "oklch(0.83 0.012 255)"
  counter-deep: "oklch(0.77 0.014 255)"
  card: "oklch(0.975 0.006 255)"
  card-edge: "oklch(0.88 0.01 255)"
  ink: "oklch(0.2 0.03 265)"
  ink-soft: "oklch(0.38 0.03 265)"
  indigo: "oklch(0.4 0.16 268)"
  indigo-deep: "oklch(0.33 0.15 268)"
  indigo-ink: "oklch(0.98 0.005 268)"
typography:
  ui:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  headline:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 6vw, 4.4rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  tag:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.05em"
rounded:
  sm: "2px"
  md: "3px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  card-gap: "28px 24px"
components:
  button-primary:
    backgroundColor: "{colors.indigo}"
    textColor: "{colors.indigo-ink}"
    rounded: "{rounded.md}"
    padding: "11px 20px"
  button-primary-hover:
    backgroundColor: "{colors.indigo-deep}"
  swatch-card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.md}"
    padding: "12px"
  hang-tag:
    backgroundColor: "{colors.indigo}"
    textColor: "{colors.indigo-ink}"
    typography: "{typography.tag}"
---

# Design System: Drapewell Storefront

## Overview
Shopping at a mill sample counter. Drapes are physical swatch cards laid on a cool mill-grey counter; you pull two or three to compare and read sizes off the notches. The surface is flat print: soft offset shadows, pinked swatch edges, punched tag holes. It refuses the photo-title-price product grid. Palette strategy: Restrained, with one saturated indigo carrying tags, lit notches and the primary action. Light scene: a daytime counter by a window.

## Colors
- **Counter** and **counter-deep** are the cool grey ground. **Card** is bleached white tinted toward indigo, never cream.
- **Indigo** is the only accent: hang tags, lit notches, the primary button, focus ring. Fabric colours (the swatches) belong to products, not the system.
- Secondary text is tinted toward the indigo hue (`ink-soft`), never neutral grey.

## Typography
Hanken Grotesk for the interface; Barlow Condensed (500/600, uppercase, tracked) only for hang-tag lettering, notch numerals and row labels. No serif display. Body measure stays under 70ch; headline uses balanced wrapping.

## Layout
Max width 1280px with a fluid gutter. The collection is an auto-fill grid of cards at a 250px minimum, deliberately staggered by differing swatch heights so it reads as laid-out cards, not a table. The compare sheet is a fixed bottom sheet.

## Elevation & Depth
Cards: 10px blur, strongly negative spread, low alpha, plus a 1px inner highlight. Hover lifts 3px. Never a zero-blur block shadow, never a glow.

## Shapes
2-3px corners. Swatches have a zigzag pinked bottom edge (conic-gradient mask). Tags are clipped with angled top corners and a punched hole. Notches are small cut-outs on the top edge of each size cell.

## Components
- **Swatch card:** swatch + hang tag + spec line + notch strip + pull-to-compare + Choose size.
- **Hang tag:** indigo, condensed uppercase name and sample ref number, rotated 3deg.
- **Notch strip:** drop lengths; absent sizes are struck through; fitting sizes fill indigo, staggered 55ms.
- **Compare sheet:** up to three cards side by side.
- **Window finder:** width and height in inches; returns panels and drop.

## Do's and Don'ts
- Do keep catalog content labelled as sample; never invent prices, stock, ratings or shipping claims.
- Do light notches to show fit; dim non-fitting cards rather than hide them.
- Don't use cream grounds, serif display faces, gradient text, glass, or nested cards.
- Don't add accent colours beyond indigo; fabric colour comes from the product.
