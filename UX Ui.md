# UI/UX Senior Design Playbook — Glassmorphism, Motion & Layout

> Written like a 10-year senior product designer handing off a spec to a dev.
> Use this alongside `portfolio-build-prompt.md`. This file focuses purely on
> **how to make it look and feel premium** — positioning, glass effects, motion,
> and a step-by-step polish pass — plus a self-audit checklist at the end.

---

## 1. Core Design Principles (read this before touching code)

1. **Hierarchy first, decoration second.** Every screen needs one clear focal point.
   On the hero, that's the face + headline. Everything else (nav, socials) should be
   visually quieter — smaller, lower contrast, or moved to edges.
2. **Spacing is the design.** Most "amateur" UIs fail from inconsistent spacing, not bad colors.
   Use an **8px base scale**: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Never use arbitrary values like `13px` or `27px`.
3. **Contrast drives attention.** On a dark UI, reserve pure white text for the single
   most important line (headline). Body text should be `text-white/70`, muted labels `text-white/40–50`.
4. **Alignment beats symmetry.** Elements don't need to be centered — they need to align
   to a shared invisible grid (same left edge, same baseline).
5. **Motion should explain, not decorate.** Every animation should answer "where did this
   come from / where is it going / why did it change." If you can't answer that, cut the animation.

---

## 2. Layout & Positioning System

### 2.1 Grid & container rules
- Max content width: `1280px` (`max-w-7xl`), centered, with `px-6` mobile / `px-12` desktop side padding.
- Use CSS Grid for section layout, Flexbox for component-internal layout.
- Vertical rhythm: `py-24` to `py-32` between major sections on desktop, `py-16` on mobile.

### 2.2 Hero positioning
```
┌─────────────────────────────────────────────┐
│  [Logo/Initials]              [Nav Pills]    │  ← fixed/sticky top, 24px inset
│                                               │
│              (3D Face, centered               │
│         or offset-right on wide screens)      │
│                                               │
│         Headline (max-w-2xl, left or          │
│         center aligned — pick one, be         │
│         consistent)                           │
│         Sub-line (text-white/60)              │
│         [Primary CTA] [Secondary link]        │
│                                               │
│  ↓ scroll cue, bottom-center, subtle bounce   │
└─────────────────────────────────────────────┘
```
- **Z-index map** (keep this explicit in code as constants, don't guess):
  `bg-fluid: -10` → `bg-noise-overlay: -5` → `content: 0` → `nav: 40` → `modal/overlay: 50` → `cursor-glow: 60`.
- Face element: on desktop, offset slightly right-of-center or behind the headline at low opacity
  so text stays legible; on mobile, stack it above the text, smaller (max 40vh height).
- Nav pills: fixed to top, but shrink/add backdrop-blur on scroll (see §3.3) so they don't
  fight the hero for attention while stationary at top.

### 2.3 Section content positioning
- Keep a consistent **left-aligned label + right/below content** pattern across sections
  (e.g. small uppercase eyebrow label like `/ 01 — PROJECTS`, then the heading, then content).
- Cards (projects/skills) use a **responsive grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, `gap-6`.
- Never let text lines exceed ~70 characters (`max-w-prose` / `max-w-[65ch]`) — long lines hurt readability.

---

## 3. Glassmorphism — exact recipe

Glassmorphism fails when overused or when contrast is too low. Rules:

### 3.1 The base glass card
```css
.glass {
  background: rgba(255, 255, 255, 0.06);       /* barely-there tint */
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.12);  /* hairline edge — essential, not optional */
  border-radius: 20px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.35),              /* soft drop shadow for depth */
    inset 0 1px 0 rgba(255, 255, 255, 0.08);     /* inner top highlight = "glass edge catching light" */
}
```
- **Never** use glass on top of a flat solid background — it needs colorful/blurred content
  behind it (your fluid blobs) to actually read as "glass." On a plain black bg it just looks like grey.
- Blur range: `12px`–`20px`. Below 8px looks like a dirty smudge; above 24px kills performance and detail.
- Always pair with a **1px semi-transparent border** — this is what sells the "edge of glass" illusion.
- Tint variation: use a *slightly* different tint per card type (e.g. project cards `rgba(139,92,246,0.06)`
  violet-tinted, skill cards neutral white) so glass doesn't look monotonous.

### 3.2 Depth layering (don't stack glass on glass)
- Max **2 levels** of glass depth on screen at once (e.g. nav bar glass + a card glass). Stacking
  3+ blurred layers tanks frame rate and muddies the visual.
- Give the top-most glass element a slightly stronger border/shadow than the one behind it, so
  the eye reads depth order correctly.

### 3.3 Glass nav bar (scroll-aware)
```css
/* default: transparent, floating over hero */
.nav { background: transparent; border-color: transparent; }

/* after scroll > 40px, add via JS/IntersectionObserver toggling a class */
.nav.scrolled {
  background: rgba(10, 10, 15, 0.55);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
```
Transition both with `transition: background 0.3s ease, backdrop-filter 0.3s ease`.

### 3.4 Where to use glass vs. where NOT to
- ✅ Nav bar, modal/dialogs, cards floating over the fluid background, tooltips.
- ❌ Full-page backgrounds, body text containers with long paragraphs (blur behind dense text
  hurts legibility), buttons (buttons should be solid/high-contrast for clear affordance).

---

## 4. Motion & Animation System

### 4.1 Timing & easing tokens (define once, reuse everywhere)
```ts
export const motionTokens = {
  duration: { fast: 0.15, base: 0.35, slow: 0.6, verySlow: 1.2 },
  ease: {
    out: [0.16, 1, 0.3, 1],       // snappy settle — use for elements entering
    inOut: [0.65, 0, 0.35, 1],    // smooth both ways — use for looping/idle motion
    spring: { type: "spring", stiffness: 260, damping: 24 }, // for pills, drag, playful UI
  },
};
```
- **Entrances:** 300–500ms, ease-out, slight upward translate (`y: 16 → 0`) + fade.
- **Exits:** faster than entrances (150–250ms) — things should leave quicker than they arrived.
- **Hover states:** 150–200ms, no delay, `ease-out`.
- **Looping/idle motion** (float, dot bounce, blob drift): always `ease-in-out`, never linear
  (linear looping reads mechanical/cheap).

### 4.2 Stagger pattern (use this everywhere content reveals as a group)
```ts
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: motionTokens.ease.out } },
};
```
Cap stagger groups at ~6–8 children — beyond that the last items feel laggy; batch instead.

### 4.3 Micro-interactions checklist (small things that read as "10 years experience")
- Buttons: `whileHover={{ scale: 1.03 }}`, `whileTap={{ scale: 0.97 }}`, plus a subtle glow/shadow grow.
- Links: underline draws in from left on hover (`background-size` trick or `scaleX` transform), not instant.
- Cards: `whileHover={{ y: -4 }}` + shadow deepens — implies "lifting toward the user."
- Cursor: optional custom cursor glow/dot that trails with spring physics over interactive zones.
- Page/section transitions: never a hard cut — always cross-fade or the typing-dots pattern from the build doc.
- Loading/typing dots: stagger delay `0.15s` per dot, `y: [0,-6,0]`, `duration: 0.6`, `repeat: Infinity`.

### 4.4 Scroll-triggered reveals
- Use `whileInView` (Framer Motion) with `viewport={{ once: true, margin: "-100px" }}` so
  content animates in once as it enters viewport, not on every scroll pass.
- Parallax: keep subtle — background layers move at `0.4–0.6x` scroll speed, foreground at `1x`. Overdoing
  parallax (>1.5x differential) feels gimmicky/nauseating.

### 4.5 Performance rules for animation
- Animate only `transform` and `opacity` — never animate `width`, `height`, `top/left`, or `box-shadow`
  directly every frame (forces layout/paint). Use `transform: translate/scale` instead.
- `will-change: transform` on elements that animate frequently (blobs, floating face) — but remove it
  when idle to avoid memory bloat.
- Respect `prefers-reduced-motion: reduce` — swap all entrance animations to a plain opacity fade,
  disable the idle blob drift and face float loop, keep only essential state-change feedback.

---

## 5. Color, Type & Visual Effects

### 5.1 Color system
- 1 background base (near-black), 1 near-white text, 1 muted grey text, 3–4 accent hues used
  ONLY for: gradients, glow, active states, icons. Never use more than 2 accents in one component.
- Accent gradient direction should be consistent site-wide (e.g. always 135deg, violet→cyan).
- Glow effect recipe: `box-shadow: 0 0 40px -8px var(--accent-color)` on hover for buttons/cards — cheap
  way to add "premium tech" feel.

### 5.2 Typography
- 2 font families max: 1 for display/headings (can have personality), 1 for body/UI (neutral, high legibility).
- Type scale (desktop): `H1 64–80px / H2 40px / H3 28px / Body 16–18px / Small 13–14px`, line-height
  1.1 for display, 1.5–1.6 for body.
- Letter-spacing: slightly negative (`-0.02em`) on large display type, slightly positive (`0.05–0.1em`)
  + uppercase for small labels/eyebrows — this contrast is a classic "senior designer" tell.

### 5.3 Website effects worth including
- **Grain/noise overlay** (very subtle, `opacity: 0.03–0.05`, `mix-blend-mode: overlay`) over the whole
  page — kills the "flat digital" look and adds texture cheaply.
- **Gradient mesh / fluid blobs** behind glass (already covered in build doc) — this is what makes the
  glassmorphism actually work.
- **Magnetic buttons** (button subtly moves toward cursor within a small radius) — nice on primary CTA only,
  don't overuse.
- **Text reveal on scroll** — words/lines fade+rise in one after another, good for the "Me" section bio.
- **Cursor-following spotlight** — a soft radial gradient mask that follows the mouse over dark sections,
  revealing a lit "spotlight" area — good for a skills/tech grid.

---

## 6. Step-by-Step Polish Pass (do this after the base build works)

1. **Spacing audit** — go section by section, snap every margin/padding to the 8px scale. Fix any
   element not aligned to the shared left/right edges.
2. **Contrast pass** — check every text/background pair with a contrast checker; body text should
   hit at least 4.5:1, large headings 3:1.
3. **Apply glass tokens** — swap flat cards for the `.glass` recipe in §3.1, add correct blur/border/shadow.
4. **Add motion tokens** — replace any ad-hoc `transition-all duration-300` with the tokenized values
   from §4.1 so timing feels consistent across the whole site.
5. **Add stagger reveals** to every section container (§4.2) and the typing-dots loader (§4.3).
6. **Add micro-interactions** — buttons, links, cards hover states from §4.3.
7. **Add the grain overlay + fluid blob layer** — these two alone dramatically raise perceived quality.
8. **Scroll-linked nav state** — glass on scroll (§3.3), active-section highlight in nav synced to
   scroll position (`IntersectionObserver` per section).
9. **Responsive pass** — test at 375px, 768px, 1024px, 1440px. Rule of thumb: font sizes step down
   ~20–25%, spacing steps down ~30–40% from desktop to mobile; never just shrink everything uniformly.
10. **Reduced-motion + accessibility pass** — keyboard nav (tab order matches visual order), visible
    focus rings (`focus-visible:ring-2 ring-white/40`), alt text on all images, `aria-label`s on icon-only buttons.
11. **Performance pass** — Lighthouse run, check for layout shift (CLS), lazy-load below-fold images,
    verify animation loops pause off-screen/off-tab.
12. **Final "squint test"** — blur your eyes at the screen. You should still clearly see: 1 focal point,
    a clear hierarchy of 2–3 text weights, and balanced whitespace. If everything blurs into the same
    grey blob, contrast/hierarchy needs another pass.

---

## 7. Self-Audit Checklist ("does this feel like a 10-year-experience site?")

- [ ] One clear focal point per screen/section — no competing elements.
- [ ] Spacing consistently follows the 8px scale, nothing arbitrary.
- [ ] Glass elements have a visible hairline border + inner highlight, sit over colorful/blurred content.
- [ ] No more than 2 accent colors active in any single view.
- [ ] All animation durations/eases pulled from one shared tokens file, nothing hand-tuned per component.
- [ ] Every entrance animation is answerable: "where does this come from and why now."
- [ ] Hover/tap states exist on every interactive element, no dead-feeling buttons/links.
- [ ] Nothing animates `width/height/top/left` — only `transform`/`opacity`.
- [ ] Reduced-motion users get a fully usable, animation-light experience.
- [ ] Mobile isn't just "desktop shrunk" — spacing, type scale, and layout genuinely adapted.
- [ ] Contrast checked, focus states visible, images have alt text.
- [ ] Grain overlay + fluid background give the page texture instead of feeling flat/generic.
- [ ] Lighthouse performance ≥ 90 desktop / ≥ 80 mobile despite the effects.

---

## 8. Prompt to paste to your AI coding agent (polish pass)

> Using the design system defined in this document — spacing scale, glassmorphism recipe,
> motion tokens, and the step-by-step polish pass in §6 — audit and upgrade my existing
> portfolio codebase. Go section by section: fix spacing to the 8px scale, apply the exact
> glass CSS recipe to card/nav elements, replace ad-hoc transitions with the shared motion
> tokens, add stagger reveals and the micro-interactions listed in §4.3, add the grain overlay
> and confirm the fluid background sits behind glass elements correctly. Finish with the
> accessibility and performance pass, and report back against the checklist in §7.