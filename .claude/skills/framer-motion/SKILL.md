---
name: framer-motion
description: Guidance for building UI animation with Framer Motion (now published as Motion). Use when adding or reviewing animation in a React project, such as enter and exit transitions, springs, gestures, layout animations, shared-element transitions, scroll-linked effects or stagger. Not for Liquid or plain-HTML themes, where CSS or the Web Animations API applies instead.
---

# Framer Motion

Framer Motion is a React animation library. It is now published as **Motion**. Check `package.json` for which package the project already uses before suggesting an import.

| Package | Import |
|---|---|
| `motion` (current) | `import { motion, AnimatePresence } from "motion/react"` |
| `framer-motion` (legacy name, still works) | `import { motion, AnimatePresence } from "framer-motion"` |

Install with `npm install motion` (or `npm install framer-motion` to match an existing project). Do not add it to a project that has no React build step. For a Shopify Liquid theme or plain HTML, use CSS transitions, the Web Animations API, or the framework-free `animate` function from `motion`.

## Decide first

1. Should it animate at all? Animate to explain a change (something appeared, moved or responded), not for decoration.
2. Prefer animating `transform` and `opacity` (`x`, `y`, `scale`, `rotate`, `opacity`). Avoid animating `width`, `height`, `top` and `left`. Use `layout` for size and position changes instead.
3. Keep UI motion short: roughly 150 to 300 ms for small changes, up to about 500 ms for large ones.
4. Honour reduced motion (see below).

## Core patterns

### Enter, animate, exit
```tsx
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 8 }}
  transition={{ duration: 0.25, ease: "easeOut" }}
/>
```
`exit` only runs inside `AnimatePresence`. The direct child needs a stable, unique `key`.

```tsx
<AnimatePresence mode="wait">
  {open && <motion.div key="panel" exit={{ opacity: 0 }} />}
</AnimatePresence>
```
Use `mode="wait"` to finish the exit before the next child enters, and `mode="popLayout"` when siblings should reflow while one exits.

### Springs
Springs suit interactive and physical motion; tweens (`duration` + `ease`) suit simple fades.
```tsx
transition={{ type: "spring", stiffness: 400, damping: 30 }}
// or duration-based: { type: "spring", duration: 0.4, bounce: 0.2 }
```
Higher damping means less bounce. Use low bounce for most UI.

### Variants and stagger
```tsx
const list = { show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

<motion.ul variants={list} initial="hidden" animate="show">
  {items.map(i => <motion.li key={i.id} variants={item} />)}
</motion.ul>
```
Children inherit the parent's `initial` and `animate` labels, so only set them on the parent.

### Gestures
```tsx
<motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} />
<motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2} />
```
Use `whileTap` for press feedback. Skip hover effects as the only affordance, because touch devices have no hover.

### Layout and shared-element transitions
```tsx
<motion.div layout />                       // animates position and size changes
<motion.div layoutId="active-tab" />        // shared element across renders
```
Wrap sibling groups in `LayoutGroup` when `layoutId` values could clash. Text and borders can distort during layout animation; add `layout="position"` or counter-scale where it shows.

### Scroll
```tsx
const { scrollYProgress } = useScroll();
const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
<motion.div style={{ opacity }} />

<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-10% 0px" }} />
```

### Motion values
Use `useMotionValue`, `useSpring` and `useTransform` for values that change every frame. They update without re-rendering React, so do not mirror them into `useState`.

## Reduced motion
```tsx
import { MotionConfig, useReducedMotion } from "motion/react";

<MotionConfig reducedMotion="user">{children}</MotionConfig>
```
`reducedMotion="user"` turns off transform and layout animation when the visitor asks for less motion, and keeps opacity changes. Check `useReducedMotion()` for anything that moves a lot.

## Performance
- Animate `transform` and `opacity`; they stay on the compositor.
- Do not animate on every scroll event with state; use `useScroll` and `useTransform`.
- Keep `AnimatePresence` close to the elements it wraps.
- Avoid `layout` on very large lists.
- In Next.js App Router, files that use `motion` need `"use client"`. The `motion/react-client` entry exposes client components for use from server files.

## Common mistakes
- `exit` has no effect because the element is not inside `AnimatePresence`, or the `key` is missing or unstable.
- `initial={false}` is the way to skip the first-render animation.
- Animating `height: "auto"` works with `animate={{ height: "auto" }}`; set `overflow: hidden` on the element.
- Do not use CSS `transition` on a property that Motion is also animating.

## Verify
Test in the browser with the OS reduced-motion setting on and off, on a phone-size viewport, and with the CPU throttled. Confirm nothing blocks taps or scrolling while it animates.
