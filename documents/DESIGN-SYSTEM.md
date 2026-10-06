# PickmenPack Design System — "Clean Commerce + Pop"

> Global source of truth for the UI. Page-specific overrides: none yet.
> Tokens are implemented in `src/app/globals.css` (`@theme`), class recipes in
> `src/lib/ui.ts`, pastel tone map in `src/lib/tones.ts`, shadcn/ui components in
> `src/components/ui`. If this file and the code disagree, fix one of them.
>
> History: "Street Block" (rejected 4 Oct 2026, too loud) → "Clean Commerce"
> (ink + one orange accent, reference kickavenue.com) → **"Clean Commerce + Pop"**
> (5 Oct 2026, home redesign): same clean base, plus a pastel "pop" palette so the
> page isn't monotone black-and-white.

## 1. Direction

| | |
|---|---|
| Product type | E-commerce (catalog + request flow, closing via WhatsApp — PRD 2.2, 6.1) |
| Audience | Sneakerheads & budget shoppers, 18–30, mostly mobile (PRD 3, 7.3) |
| Style | Minimalism & Swiss base (clean, spacious, grid-based, high contrast) with **pastel colour blocks** for banners, category cards and step cards |
| Mood | Premium but playful: white space and product first, colour used in blocks so it feels friendly, not loud |
| Roles of colour | **Ink** = structure & primary actions · **orange accent** = brand seasoning · **pop pastels** = background blocks · **green action** = WhatsApp · semantic colours = status only |

## 2. Colour tokens

### Core

| Token | Hex | Use |
|---|---|---|
| `ink` (primary, `brand`) | `#111111` | Text, primary buttons, active states, logo, dark "anchor" cards (How it works, admin nav) |
| `paper` | `#ffffff` | Page background, text on ink |
| `zinc-100` (surface) | `#f5f5f5` | Image panels, soft blocks, `zinc` tone |
| `zinc-200` (line) | `#e5e5e5` | Borders, dividers |
| `zinc-500 / 600` | `#737373 / #525252` | Secondary text — `zinc-500` on white only (4.7:1), `zinc-600` on `zinc-100` (7.2:1) |

### Brand accent (orange)

| Token | Hex | Use |
|---|---|---|
| `accent` | `#ea580c` | Decorative only: dots, underlines, icon strokes (not small text — 3.6:1) |
| `accent-dark` | `#c2410c` | Accent text & fills with white text (5.2:1): highlighted words, product-name hover, `btnAccent` |
| `accent-deep` | `#9a3412` | Hover/active of `accent-dark`, selection text |
| `accent-soft` | `#fff4ed` | Warm backgrounds: highlight chips, "you" rows in group buy, text selection |
| `sale` | = `accent-dark` | Discount `-X%` pill — no separate sale colour |

### Pop palette (pastel blocks)

| Token | Hex | Token | Hex |
|---|---|---|---|
| `pop-lime` | `#d9f99d` | `pop-yellow` | `#fde68a` |
| `pop-sky` | `#bae6fd` | `pop-mint` | `#a7f3d0` |
| `pop-pink` | `#fbcfe8` | `pop-peach` | `#fed7aa` |
| `pop-violet` | `#ddd6fe` | `pop-blue` | `#1d4ed8` (reserved, not used yet) |

`neon` `#a3e635` — neon green, **only on ink** (How it works card): headline date, step dots (ink number), date labels, "Requests open" dot. 12.5:1 on ink; never as text on white.

Rules:
- Pastels are **backgrounds only**, for big promo blocks: hero slides, category tiles & showcase banners, CTA banner. Text on them is **always ink** (>10:1 on every tone).
- Informational sections (Why, How it works, Pricing) use **no pastels** — no pastel cards, no coloured icon chips. Their colour comes from **one accent each**: orange on white (Why, Pricing), `neon` green on the ink card (How it works): icons, numbers, date labels, a short accent bar or a soft link row. One colour keeps them lively but calm.
- Use them through `tones` in `src/lib/tones.ts` (`lime · sky · pink · violet · yellow · mint · peach · zinc`). Write classes out in full — never build them as `bg-pop-${x}`, Tailwind won't see them.
- On ink backgrounds, pastels may be used as text/dots for highlights (e.g. `text-pop-lime` for the store-run day).
- Neighbouring blocks get different tones; one block = one tone.

### Action & status

| Token | Hex | Use |
|---|---|---|
| `action` (+ `-hover`, `-soft`) | `#15803d / #166534 / #dcfce7` | WhatsApp actions: floating button, chat CTAs; `action-soft` for small highlight tags in reviews |
| `whatsapp` (+ `-dark`) | `#0b6b57 / #085243` | Older WhatsApp buttons (request form) — prefer `action` for new UI |
| `success / warning / danger` (+ `-soft`) | `#047857 / #b45309 / #be123c` | Order & stock status only (PRD 7.4), e.g. "Few sizes left" |

Primary actions stay **ink**; orange is a seasoning, pastels are blocks, green is only for WhatsApp.

### shadcn/ui mapping

shadcn variables in `globals.css` map onto the tokens above (`primary` = ink, `muted`/`secondary` = `zinc-100`, `border` = `zinc-200`, `ring` = ink, `destructive` = danger).
`accent` is **deliberately not** mapped to shadcn's `--accent` — here `accent` means orange. shadcn components that need a muted hover use `muted`. All shadcn radii derive from one value: `--radius: 0.625rem`.

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Headings & logo (`font-heading`) | **Outfit** (geometric, friendly) | Applied to h1–h3 globally; bold, tracking −0.015em, `text-wrap: balance` |
| Body & UI (`font-sans`) | **Plus Jakarta Sans** | Weights 400 / 500 / 600 / 700 |
| Numbers | same font, `tabular-nums` (set on `body`) | Prices don't jitter |

Scale: hero 32→48px bold, tight tracking · section 20→24px semibold · card title 14px medium ·
body 14–15px, `leading-relaxed` · label 12px medium.
Uppercase + wide tracking only for small labels (`eyebrow` utility), never body text.

## 4. Shape, depth, spacing

| | |
|---|---|
| Radius | `rounded-3xl` big blocks (hero, How it works, Pricing, CTA banner) · `rounded-2xl` image panels & cards · `rounded-full` public CTAs, search, chips, pills · `rounded-lg/xl` inputs, admin buttons & cards |
| Depth | Flat. Structure from borders (`zinc-200`) and colour blocks, not shadows. Hover on product cards = image zoom 1.04, no lift |
| Glass | `glass` utility (frosted white, solid fallback) only for small controls floating over imagery: slider bullets. **Not** for bars over scrolling content — the sticky Shop toolbar is solid `paper` + `zinc-200` bottom border (glass let products show through and hurt legibility) |
| Spacing | 8px grid; sections `py-10 → py-14`; product grid gap 16–24px |
| Container | `max-w-[1200px]`, gutter 16px → 24px |

## 5. Components

### Recipes (`src/lib/ui.ts`)

| Recipe | Look |
|---|---|
| `btnPrimary` / `pillAccent` | Ink fill, white text, 44px (`pill*` = 48px `rounded-full`) |
| `btnAccent` | `accent-dark` fill, white text — rare, admin highlights |
| `btnGhost` / `pillOutline` | White, `zinc-200/300` border → ink on hover |
| `btnDanger` | White, danger text & border, `danger-soft` hover |
| `chipOn / chipOff` | Filter chips, `rounded-full`, 44px mobile: on = ink fill; off = white + `zinc-200` border |
| `card` / `cardInteractive` | White, `zinc-200` border, `rounded-xl`; interactive darkens border on hover |
| `field` | 44px, 16px text on mobile (no iOS zoom), `rounded-lg`, `zinc-300` border → ink + 3px ink/10 ring on focus |
| `summaryRow` / `disclosureBody` | `<details>` rows for admin lists |

### shadcn/ui (`src/components/ui`)

`button`, `accordion` (FAQ, `type="single" collapsible`), `carousel` (Embla + autoplay).
`src/components/shared/slider.tsx` wraps the carousel with dots (+ arrows outside the hero), no pause button, and is used for the hero and reviews.

### Key blocks

| Block | Look |
|---|---|
| Hero slider | 4 slides, each a pastel tone, autoplay 6s, **bullets only** (centred, glass) — no pause button; autoplay stops on hover/focus and is off under reduced motion. Optional `image` per slide |
| Category tiles | Grid 4 × 2, small cards, full-cover image (square mobile, 5:2 desktop), pastel tone as fallback |
| Category showcase | Title + description + "View all" + short banner (16:9 → 3:1 → 4:1), pastel + sneaker illustration until an `image` is set. Below it a product shelf of **exactly 2 rows** (`ProductGrid rows={2}`: 4 / 6 / 8 / 12 cards at 2 / 3 / 4 / 6 cols), filtered by `Product.category` |
| Product card | No border. Square `zinc-100` image panel (`rounded-2xl`), `sale` `-X%` pill top-left, colour dots + "N colours" when a model has >1 colorway, 2-line name (turns `accent-dark` on hover), bold price + "up to" range. Whole card links to `/katalog/[slug]` |
| Shop filters | ≥lg: 248px sticky sidebar of collapsible `<details>` groups (Category, Gender, Price presets + min/max, Brand with "Show all", Availability) using native checkbox/radio with `accent-ink`, facet counts in `zinc-400`. <lg: solid sticky toolbar (Filters button with count badge + Sort select) + quick category chips; filters open in a native `<dialog>` bottom sheet (`rounded-t-3xl`, `backdrop:bg-ink/40`, footer Clear all + "Show N items"). Active filters render as removable `zinc-100` pills. State lives in the URL |
| Product detail | Two columns ≥lg (gallery 1.15fr / info 1fr). Gallery: square main image + thumbnails (left column on desktop, row below on mobile) per **colorway**; colour picker = product thumbnails with `ring-ink` on the selected one. Size grid of 44px buttons (ink when selected). CTAs: ink "Request this pair" (`rounded-full`) + outline "Ask on WhatsApp" with green icon. Details as a bordered `dl` |
| How it works | Dark ink card (`on-dark`): status line (pulsing `neon` dot when requests are open, static `pop-yellow` when the cutoff has passed) → "Next run: {date}" with the date in `neon` → cutoff pill; 5-step timeline with `neon` numbered dots (ink number) and `neon` date labels. Neon instead of orange so the dark card stands apart from the orange Why/Pricing. Also used on /cara-bayar |
| Pricing | One `rounded-3xl` panel, 4 cells split by 1px `zinc-200` hairlines, `accent` icon + `accent-dark` `01–04` index, `accent-soft` footer row with `accent-dark` link to /cara-bayar |
| `FeatureList` (`src/components/shared/feature-list.tsx`) | Plain list: hairline `zinc-200` top border per item with a 40×2px `accent` bar on its left end, `accent` icon without background, title + `zinc-500` body; 1 → 2 → 4 cols. Used by Why PickmenPack |
| Reviews | Slider, 3 (lg) → 4 (xl) per view, dots + arrows, no pause button. Compact card: `rounded-2xl p-5`, stars + highlight on one line, quote clamped to 4 lines, Bought / Size / Delivery. Slides get 1px inner padding so the edge card's border isn't clipped at 100% zoom |
| CTA banner | `pop-yellow` block with decorative peach & lime circles, ink pill button |
| Floating WhatsApp | `action` green, 56px icon-only circle (`h-14 w-14 rounded-full`, `aria-label`) on every breakpoint, bottom-right above the bottom nav (`bottom-safe`) |

## 6. Layout

- Announcement bar (ink, 1 line) → header (logo · search · nav · Request CTA) → content → footer.
- Footer columns: Products / About (Our story, Blog, Privacy, Terms) / Help / Follow us; pages not built yet are marked "Soon". Column headers 14px semibold, body text & links 13px, fine print 12px; the info box is 11px with the WhatsApp hours line in `accent-dark` semibold.
- Mobile: header = logo + search; bottom nav 5 items, active = ink; WhatsApp via the floating button.
- Home order: Hero slider → Categories → Trending → Brands → Category showcase (banner + 2-row shelf) ×3 → Why PickmenPack → How it works → Pricing → Reviews → FAQ → CTA banner.
- Copy for Why / How it works / Pricing lives in `src/modules/home/content.ts`, pulled from the vault note "03. Landing Page Content — PickmenPack". Change the note first, then the file.
- Product grid: 2 cols mobile → 3 (sm) → 4 (lg) → 6 (xl).
- Dark surfaces get the `on-dark` class so the focus ring turns white.

## 7. Motion

Tokens: `--duration-tap` 150ms · `--duration-ui` 200ms · `--duration-move` 400ms, easing `--ease-out-soft`.

- Colour/opacity transitions 150–250ms; image zoom 400ms on hover.
- Continuous motion only for: hero/review autoplay (stops on hover/focus) and the pulse dot on "Requests open".
- Everything is cut under `prefers-reduced-motion`.

## 8. Accessibility basics

- One global focus ring: 2px ink outline on `:focus-visible` (white on `on-dark`). No `border-radius` in that rule — rounded elements keep their shape.
- Touch targets ≥ 44px on mobile.
- Thin neutral scrollbars (6px), hidden on horizontal chip rows (`no-scrollbar`).

## 9. Voice

Friendly and plain, like a mate who shops for you: "Your next pair, picked straight from the store", "Zero deposit", "Happy feet, happy people". Short sentences, no jargon, never stiff. Avoid copying reference-site phrasing.

## 10. Anti-patterns (don't)

- Text in any colour other than ink on pastel blocks; pastels as text on white.
- Pastel cards for informational lists (rules, steps, benefits).
- Repeating the same fact in two sections: "no deposit" only in How it works, "locked price" and fees only in Pricing, "checked & photographed" only in Why.
- "Insured" delivery — say "tracked courier" until insurance is decided (Landing Page Content §8).
- Using orange for large filled areas (use `accent-soft` or a pastel), or a second "brand" accent.
- Green outside WhatsApp actions; status colours for decoration.
- Gradients, textures, rotated elements, hard/offset shadows, display fonts.
- Grey text below 4.5:1 (`zinc-400` is for icons/lines only).
- Building `bg-pop-*` class names dynamically.
- Emoji as icons — inline SVG from `src/components/shared/icons.tsx` (stroke 1.8).
- Copy that says "flat fee" or "deposit" (PRD 5.4/5.5 — tiered fee, no DP).
