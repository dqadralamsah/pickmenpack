# PickmenPack Design System — "Clean Commerce"

> Global source of truth for the UI. Page-specific overrides live in `pages/<page>.md`
> (none yet). Tokens are implemented in `src/app/globals.css` (`@theme`) and the
> class recipes in `src/lib/ui.ts`. If this file and the code disagree, fix one of them.
>
> Replaces the earlier "Street Block" direction (rejected by the owner, 4 Oct 2026:
> too loud). Visual reference given by the owner: kickavenue.com — simple, elegant, classy.

## 1. Direction

| | |
|---|---|
| Product type | E-commerce (catalog + request flow, closing via WhatsApp — PRD 2.2, 6.1) |
| Audience | Sneakerheads & budget shoppers, 18–30, mostly mobile (PRD 3, 7.3) |
| Style | **Minimalism & Swiss Style** (ui-ux-pro-max style #1: clean, spacious, high contrast, grid-based, monochrome + one accent) |
| Mood | Premium but friendly: white space, product first, one warm accent that makes it feel personal (not a clone of the reference) |
| Rules of restraint | **One primary colour (ink black) + one accent (warm orange)**. No gradients, no textures, no tilted elements, no hard shadows |

## 2. Colour tokens

| Token | Hex | Use |
|---|---|---|
| `ink` (primary) | `#111111` | Text, primary buttons, active states, logo |
| `paper` | `#ffffff` | Page background |
| `zinc-100` (surface) | `#f5f5f5` | Image panels, banners, soft blocks |
| `zinc-200` (line) | `#e5e5e5` | Borders, dividers |
| `zinc-500 / 600` | `#737373 / #525252` | Secondary text — `zinc-500` on white only (4.7:1), `zinc-600` on `zinc-100` (7.2:1) |
| `accent` | `#ea580c` | Decorative only: dots, logo full stop, icon strokes (not small text — 3.6:1) |
| `accent-dark` | `#c2410c` | Accent text & fills with white text (5.2:1): eyebrows, highlighted words, discount pills (`sale` alias), active nav, mobile Request button |
| `accent-deep` | `#9a3412` | Hover/active of `accent-dark` |
| `accent-soft` | `#fff4ed` | Warm backgrounds: hero banner, icon circles, store-run header, highlight chips |
| `success / warning / danger` (+ `-soft`) | `#047857 / #b45309 / #be123c` | Order & stock status only (PRD 7.4) |
| `whatsapp` | `#0b6b57` | WhatsApp buttons only |

Primary actions stay **ink**; the accent is a seasoning, never the main button colour on light backgrounds.

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Headings & logo (`font-heading`) | **Outfit** (ui-ux-pro-max pairing #11 "Geometric Modern" — friendly, contemporary) | Applied to h1–h3 globally; bold, tracking −0.015em |
| Body & UI | **Plus Jakarta Sans** (pairing #13 — clean, approachable) | Weights 400 / 500 / 600 / 700 |
| Numbers | same font, `tabular-nums` | Prices don't jitter |

Scale: hero 32→48px bold, tight tracking (−0.02em) · section 20→24px semibold ·
card title 14px medium · body 14–15px, `leading-relaxed` · label 12px medium.
Never use uppercase+wide tracking for body; only small labels (`.eyebrow`).

## 4. Shape, depth, spacing

| | |
|---|---|
| Radius | `rounded-2xl/3xl` panels & images, `rounded-full` public CTAs, search, chips & pills, `rounded-lg` inputs & admin buttons |
| Depth | Flat. Borders `zinc-200` for structure; hover on cards = image zoom 1.04, no lift, no shadow |
| Spacing | 8px grid; sections `py-10 → py-14`; product grid gap 16–24px |
| Container | `max-w-[1200px]`, gutter 16px → 24px |

## 5. Components (recipes in `src/lib/ui.ts`)

| Recipe | Look |
|---|---|
| `btnPrimary` / `pillAccent` | Ink fill, white text, 44–48px (`pill*` = `rounded-full`) |
| `btnGhost` / `pillOutline` | White, `zinc-200` border → ink on hover |
| `chipOn / chipOff` | Filter chips, `rounded-full`: on = ink fill; off = white + `zinc-200` border |
| `card` | White, `zinc-200` border, `rounded-xl` |
| `field` | 44px, `rounded-lg`, `zinc-300` border → ink + 3px ink/10 ring on focus |
| Product card | No border. Square `zinc-100` image panel (`rounded-2xl`), `accent-dark` `-X%` pill top-left, 2-line name (turns accent on hover), bold price + "up to" range |

## 6. Layout

- Announcement bar (ink, 1 line) → header (logo · search · nav · Request CTA) → content → light footer.
- Mobile: header = logo + search icon + WhatsApp; bottom nav 5 items, active = ink.
- Home order (PRD 6.1): Banner → Trust strip → Categories → Hot right now → Brands → Store run → How it works → Reviews → FAQ → CTA banner.
- Product grid: 2 cols mobile → 3 (sm) → 4 (lg) → 6 (xl).

## 7. Motion

- 150–250ms ease-out colour/opacity transitions; image zoom 400ms on hover.
- No continuous animation except the single pulse dot on "next store run" (off under `prefers-reduced-motion`).

## 8. Voice

Friendly and plain, like a mate who shops for you: "Your next pair, picked straight from the store", "Zero deposit", "Happy feet, happy people". Short sentences, no jargon, never stiff. Avoid copying reference-site phrasing.

## 9. Anti-patterns (don't)

- Adding a second accent colour; using the accent for large filled areas (use `accent-soft`).
- Gradients, textures, rotated elements, hard/offset shadows, display fonts.
- Grey text below 4.5:1 (`zinc-400` is for icons/lines only).
- Emoji as icons — inline SVG, stroke 1.75.
- Copy that says "flat fee" or "deposit" (PRD 5.4/5.5 — tiered fee, no DP).
