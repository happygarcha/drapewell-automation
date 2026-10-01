---
name: Drapewell General Catalog
description: A general-store mail-order catalog for a multi-niche shop. Cool paper pages on a desk, printer's red, dense numbered rows.
colors:
  desk: "oklch(0.8 0.012 235)"
  paper: "oklch(0.968 0.008 235)"
  paper-shade: "oklch(0.92 0.01 235)"
  ink: "oklch(0.2 0.02 40)"
  ink-soft: "oklch(0.4 0.02 40)"
  ink-on-desk: "oklch(0.25 0.02 40)"
  red: "oklch(0.5 0.2 27)"
  red-deep: "oklch(0.42 0.19 27)"
  red-ink: "oklch(0.98 0.005 27)"
typography:
  ui:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  catalog-headline:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.4rem, 6.5vw, 4.6rem)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "0.005em"
  item-number:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    letterSpacing: "0.08em"
rounded:
  sm: "2px"
  tab: "4px"
spacing:
  gutter: "clamp(14px, 4vw, 40px)"
  page-padding: "20px, 40px from 700px"
components:
  button-primary:
    backgroundColor: "{colors.red}"
    textColor: "{colors.red-ink}"
    rounded: "{rounded.sm}"
    padding: "10px 18px"
  button-primary-hover:
    backgroundColor: "{colors.red-deep}"
  index-tab:
    backgroundColor: "{colors.paper-shade}"
    textColor: "{colors.ink}"
    typography: "{typography.item-number}"
    rounded: "{rounded.tab}"
  index-tab-active:
    backgroundColor: "{colors.red}"
    textColor: "{colors.red-ink}"
---

# Design System: Drapewell General Catalog

## Overview
One shop with menu-driven departments, laid out as a general-store mail-order catalog: dense numbered spreads, one department per page, order by item number. Cool pale-blue paper on a darker desk, warm near-black ink, a single printer's red. Line-drawn item illustrations, hairline rules, a fold shadow down the middle of each spread. Palette strategy: Restrained. Light scene: a catalog open on a table in daylight. No photos, no cream, no serif display.

## Colors
- **Desk** is the ground; **Paper** is the page. Both are tinted toward blue, never cream.
- **Ink** is warm near-black; secondary text uses **ink-soft**.
- **Red** is the only accent: item numbers, active tab, primary actions, the single spot in every drawing. **Red-deep** is for small red text and hover.

## Typography
Barlow Condensed (500/600, uppercase, tracked) for the masthead, index tabs, department headings, headlines and item numbers. Hanken Grotesk for item names, specs and controls. Body measure under 70ch.

## Layout
Max width 1280px, fluid gutter. A page is one paper sheet; a department is a two-column ruled list (single column under 900px) with a soft fold shadow between columns. Departments are index tabs on the page edge, generated from the store menu (menu.js mirrors the live Shopify Main menu; an in-page editor adds, removes and reorders items in a browser-local copy).

## Elevation & Depth
The page sits on the desk with one long soft shadow (22px offset, 40px blur, negative spread). Items are flat, separated by hairline rules. No glow, no hard offset shadows.

## Shapes
2px corners on buttons and inputs; tabs have 4px top corners. Illustrations are 2px round-cap strokes in ink with one filled red spot.

## Components
- **Item row:** drawing, red item number, name (link), spec, "Price not set", action (Add to cart, or Choose [option] when options exist).
- **Index tab:** paper-shade at rest; red and raised when active.
- **Item-number lookup:** one field, one primary button.
- **Option chips and quantity stepper:** square-cornered, ink border, red when selected.
- **Page turn:** switching department lays the new page down with a 550ms left-to-right clip reveal; it respects reduced motion.

## Do's and Don'ts
- Do label all catalog content as sample; never invent prices, stock, ratings or shipping claims.
- Do keep one red spot per drawing and one accent colour across the system.
- Don't add photos or gradients; don't use cream grounds or serif display faces.
- Don't make the departments identical tiles; they are ruled lists on a page.
