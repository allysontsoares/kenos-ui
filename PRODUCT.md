# Product

## Register

brand

## Users

**Primary:** React developers shipping production apps who need headless, accessible primitives they can style themselves.

**Secondary:** Developers evaluating headless libraries (comparing Kenos to Radix, Base UI, React Aria) — the docs site must earn trust fast enough to convert them.

**Tertiary:** Contributors and maintainers working inside the monorepo (packages, Storybook, playground).

Context: users arrive either from the marketing landing (identity + first impression) or directly into docs (API proof, install path, a11y guarantees). Both surfaces must feel like the same brand, but the landing leads.

## Product Purpose

Kenos UI is a composable, accessible, unstyled React primitive library — "the space before design." It gives developers structure (WAI-ARIA patterns, keyboard navigation, composable APIs) without imposing visual opinions.

Success looks like:

- A visitor recognizes Kenos as distinct — not another generic headless clone
- Technical trust is established within minutes (docs, examples, test coverage signals)
- A developer installs a package and has a working primitive styled their way in minutes

## Brand Personality

**Three words:** Void · Craft · Precise

- **Void** — editorial darkness, negative space, the calm before styling decisions; "the space before design" is literal brand territory
- **Craft** — careful composition, intentional motion, materials that feel made — not generated
- **Precise** — engineering confidence: dense when needed, never sloppy; monospace labels and grid structure as voice, not decoration

**Emotional goals:** confidence, clarity, quiet authority. The brand should feel like a tool made by people who respect both design and engineering — Linear/Vercel density with Base UI–level technical honesty.

**Voice:** Direct, technical, understated. Show capability through structure and proof, not hype.

## Anti-references

- Generic SaaS cream — warm off-white backgrounds, identical icon+heading+text card grids, hero-metric templates
- shadcn/ui clone — looking like a copy-paste kit rather than an original primitive ecosystem
- Flashy marketing — gradient text, glassmorphism defaults, loud entrance animations, decorative motion without purpose
- AI slop patterns — eyebrow kickers on every section, numbered section markers (01/02/03) as scaffolding, ghost cards (border + wide shadow), over-rounded cards (24px+)

## Design Principles

1. **The space before design** — Lead with structure and negative space; styling is the developer's job, but the brand still owns atmosphere, rhythm, and typographic voice on marketing surfaces.
2. **Practice what we preach** — If we claim WAI-ARIA compliance and keyboard excellence, every public surface and primitive must demonstrate it; credibility is the conversion mechanism.
3. **Proof over promise** — Docs and landing show real APIs, real anatomy, real install commands — not abstract benefit copy.
4. **Editorial void, not SaaS theater** — Dark, grid-aware, typographically confident marketing; density and craft over decoration.
5. **One brand, two jobs** — Landing creates identity and desire; docs create trust and speed. They share tokens and voice but optimize for different moments in the funnel.

## Accessibility & Inclusion

- **Baseline:** WCAG 2.1 AA for all public surfaces and documented component patterns (contrast, keyboard, screen reader support, focus visibility).
- **Stretch:** Pursue AAA conformance wherever it does not compromise usability or the unstyled flexibility of primitives (e.g. contrast on marketing copy, focus rings in docs).
- **Motion:** Respect `prefers-reduced-motion` on every animation; provide reduced alternatives (crossfade or instant).
- **Preferences:** Honor user preferences broadly (color scheme, reduced transparency, contrast) on docs and marketing where technically feasible.
- **Primitives:** Components ship with correct ARIA roles, keyboard patterns, and live regions — accessibility is a product feature, not a docs footnote.
