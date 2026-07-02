---
name: kenos UI
description: The space before design — void editorial primitives for React.
colors:
  void-ground: "#09090b"
  void-surface: "#18181b"
  void-border: "#ffffff12"
  zinc-muted: "#71717a"
  zinc-fg: "#fafafa"
  ink: "#09090b"
  paper: "#fafafa"
  surface: "#ffffff"
  accent: "#fafafa"
  accent-light: "#e4e4e7"
  accent-muted: "#ffffff24"
  status: "oklch(0.72 0.14 55)"
typography:
  display:
    fontFamily: "Space Grotesk, Geist, sans-serif"
    fontSize: "clamp(2.125rem, 1.4rem + 3vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Space Grotesk, Geist, sans-serif"
    fontSize: "clamp(1.625rem, 1.2rem + 1.6vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "0.08em"
rounded:
  sm: "0.27rem"
  md: "0.36rem"
  lg: "0.45rem"
  xl: "0.63rem"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "#6366f1"
    textColor: "#ffffff"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.zinc-fg}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  chip-mono:
    backgroundColor: "{colors.void-surface}"
    textColor: "{colors.zinc-muted}"
    rounded: "9999px"
    padding: "4px 12px"
---

# Design System: kenos UI

## Overview

**Creative North Star: "The Void Workshop"**

Kenos UI's visual system is an editorial void — a dark, grid-aware workshop where structure is visible and style is deliberately absent from the primitives themselves. Marketing surfaces carry the brand: zinc depths, indigo signal, Geist precision, monospace annotation. Docs surfaces shift to a calmer product register (light/dark zinc, dense prose, demo stages) while sharing the same accent and typographic DNA.

The system rejects SaaS theater. No cream backgrounds, no identical card grids, no gradient hero metrics. Depth comes from tonal layering, hairline borders at low opacity, and dot/grid textures — not drop shadows paired with 1px borders.

**Key Characteristics:**

- Void-ground marketing (`#09090b`) with hairline `white/7%` grid borders
- Indigo accent used as signal, not wallpaper (CTAs, focus rings, code highlights)
- Geist Sans for prose + Geist Mono for labels, install commands, and section markers
- Tight display tracking (floor −0.04em) without crushing letterforms
- Motion: smooth ease-out (`cubic-bezier(0.32, 0.72, 0, 1)`), spring only for mark/corner accents; always respect `prefers-reduced-motion`

## Colors

Void Signal — pure black ground, zinc surfaces, white pill CTAs. No indigo. Status amber for badges only.

### Primary

- **Signal White** (`#fafafa` on void): Primary CTAs — pill buttons, inverted on black.
- **Signal Ink** (`#09090b`): CTA text on white buttons; focus rings in light mode.

### Neutral

- **Void Ground** (`#000000`): Landing + docs default background.
- **Void Surface** (`#161616`): Elevated cells, cards, code chrome.
- **Zinc Body** (`#a1a1aa`): Secondary body copy on void — WCAG AA.
- **Zinc Muted** (`#71717a`): Labels 11px mono only.
- **Zinc Foreground** (`#fafafa`): Primary text on void.

### Status (≤5% of screen)

- **Status Amber** (`oklch(0.72 0.14 55)`): `New`, `Beta`, `available` badges — xAI-style warm signal.

### Named Rules

**The Signal Rule.** White appears on CTAs and focus only — not labels, grids, or links.

**The Void-First Rule.** `#000` ground, elevation by surface tone not shadow.

**The Status Rule.** Amber is for semantic status badges only — never primary actions.

## Typography

**Display / Headings:** Space Grotesk 500 (`--font-display`) — landing h1–h3, docs page titles, section headings. Pattern: `font-heading font-medium tracking-tight` (xAI-style; no bold 700 on display).

**Body:** Geist Sans 400 (`--font-sans`, 15px / 1.65)

**Label / Mono:** Geist Mono 600 (`--font-mono`, 11px uppercase on landing)

**Upgrade path:** `--font-display` maps to `--font-space-grotesk` today; swap the `localFont` / variable in `layout.tsx` to Universal Sans WOFF2 when licensed — no component changes.

**Character:** Geometric display + humanist body; monospace as annotation only.

### Hierarchy

- **Display** (500, clamp 34–60px, lh 1.02, tracking −0.03em): Landing h1. `text-wrap: balance`. Max ~16ch per line on hero.
- **Headline** (500, clamp 26–36px, lh ~1.15, tracking tight): Section titles on landing and docs (`scroll-mt-28 lg:scroll-mt-24` on docs h1/h2).
- **Body** (400, 15–17px, lh 1.65, `zinc-400` on void): Prose and descriptions; cap line length at 65–75ch in docs.
- **Label** (600, 11px mono, tracking 0.08em, uppercase): `kenos-landing-label` — sparingly, one per major section.

### Named Rules

**The Medium Display Rule.** Headings use weight 500, not 700. Hierarchy comes from size, spacing, and contrast — not bold reflex.

**The Display Token Rule.** All headings consume `--font-display` / `font-heading`. Body and UI chrome stay on Geist.

**The Mono-Annotation Rule.** Geist Mono is for code, install commands, and section labels — never for long body copy.

## Elevation

Flat-by-default. Kenos does not use the ghost-card pattern (1px border + wide soft shadow). Depth is conveyed through:

- Tonal steps (void ground → void surface → zinc-900 cells)
- Hairline borders at 7–12% opacity
- Optional white ambient behind hero (`white/3%` blur) — never on cards
- Docs demo stages: `border-zinc-200/800` + `bg-zinc-100/800`, no shadow

### Shadow Vocabulary

- **CTA glow**: removed — signal is flat white pills, no glow at rest.
- **Navbar blur** (`backdrop-blur-md` + `bg-[#09090b]/85`): Sticky header only when scrolled.

### Named Rules

**The No Ghost Card Rule.** Never pair `border: 1px solid` with `box-shadow` blur ≥16px on the same element. Pick border OR shadow.

## Components

### Buttons

- **Shape:** Moderately rounded (`0.45rem` / `rounded-md`)
- **Primary (`.kenos-cta`):** `rounded-full bg-zinc-100`, ink text, hover `bg-zinc-200`.
- **Secondary/Ghost:** Border `white/7%`, zinc-100 text, hover brightens border to `white/20` and fills `zinc-900`.
- **Focus:** `outline-color: var(--kenos-accent)` via global `:focus-visible`.

### Chips

- **Style:** `rounded-full`, `border white/8%`, `bg-zinc-900/80`, mono 11px, zinc-400 text (hero pills).
- **State:** Static labels, not interactive filters.

### Cards / Containers

- **Corner Style:** `rounded-md` to `rounded-xl` (12–16px max on containers; never 24px+ on cards).
- **Background:** Void surface or zinc-900 cells inside grid layouts.
- **Border:** Full hairline borders (`border-white/[0.07]`), never left-stripe accent borders.
- **Internal Padding:** 16–24px (p-4 to p-6).

### Inputs / Fields

- **Docs context:** shadcn/Base UI primitives with zinc borders, accent focus ring.
- **Landing:** Install command copy button — mono xs, border `white/7%`, hover `white/15`.

### Navigation

- **Landing navbar:** Sticky, h-14, max-w 1200px with side borders matching page grid. Links: 13px zinc-500 → zinc-100 on hover. NPM CTA in nav uses accent treatment.
- **Docs:** Sidebar 264px, topbar 60px; product-density layout.

### Signature: Grid Landing Shell

- **Structure:** `max-w-[1200px]` centered column with `border-x border-white/[0.07]` — page reads as one instrument panel.
- **Texture:** `kenos-landing-dot-bg` radial dot grid at low opacity; optional `kenos-hero-grid` line grid for docs hero areas.

## Do's and Don'ts

### Do:

- **Do** default marketing surfaces to void ground (`#09090b`) with zinc typography hierarchy.
- **Do** use indigo only for signal moments — CTA, focus, selection, accent glow.
- **Do** use hairline full borders and tonal layering for structure.
- **Do** respect `prefers-reduced-motion` — replace entrance animations with crossfade or instant state.
- **Do** keep display headings at `tracking-[-0.04em]` or looser.
- **Do** show real install commands and API snippets as trust signals.

### Don't:

- **Don't** use generic SaaS cream — warm off-white backgrounds, identical icon+heading+text card grids, hero-metric templates.
- **Don't** look like a shadcn/ui clone — copy-paste kit aesthetics without Kenos void identity.
- **Don't** use flashy marketing — gradient text, glassmorphism defaults, loud entrance animations, decorative motion without purpose.
- **Don't** put eyebrow kickers on every section or numbered markers (01/02/03) as default scaffolding.
- **Don't** pair 1px borders with wide soft drop shadows on the same element.
- **Don't** use `border-radius` ≥24px on cards or section containers.
- **Don't** use colored left/right stripe borders on cards, alerts, or list items.
