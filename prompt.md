# AI Build Prompt — "Fluid Memoji" Interactive Portfolio

> Copy this entire file into Claude Code / Cursor / any AI coding agent as the starting instruction.
> It describes a Toukoum-style ([aaabadcode.com](https://www.aaabadcode.com/)) interactive one-page portfolio:
> a 3D-ish animated face/memoji on the hero, a fluid multi-color gradient that reacts to
> mouse hover on the background, and section content that reveals itself behind a
> "typing…" (3 bouncing dots) loader whenever a nav item is clicked.

Fill in the `[[ ... ]]` placeholders with your real info before handing this to the agent.

---

## 1. Project Goal

Build a single-page, section-based personal portfolio with these signature interactions:

1. **Hero / Home section**
   - A large, friendly **3D-styled face / memoji / avatar** (can be a rendered 3D model,
     a rigged Lottie/Spline character, or a stylized 2D illustration with parallax + subtle
     3D tilt on mouse move — pick based on skill level below).
   - The **page background reacts to mouse hover** with a **fluid, multi-color blob/gradient**
     that follows the cursor (WebGL shader or canvas noise field), like colored ink or plasma
     moving under glass.
   - Short intro: name, role/title, one-line pitch, nav links.
2. **Section navigation** (e.g. `Me`, `Projects`, `Skills`, `Fun`, `Contact`)
   - Clicking a nav item / pill does **not** instantly swap content.
   - Instead it shows a **typing indicator (3 pulsing/bouncing dots)**, like a chat app
     "is typing…" bubble, for ~500–900ms.
   - Then the dots fade out and the real section content **fades/slides in smoothly**
     (staggered children, easing, ~400–600ms).
   - Every section uses the exact same reveal choreography for consistency.
3. Fully responsive, dark-mode-first, smooth 60fps feel, minimal but playful.

---

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router) + TypeScript** | matches reference site, great DX, easy deploy on Vercel |
| Styling | **Tailwind CSS** | fast utility styling, easy to keep design consistent |
| Animation | **Framer Motion** | declarative enter/exit, stagger, layout animations — perfect for the "typing → content" reveal |
| 3D / Face | **React Three Fiber + drei** (or **Spline** embed if you don't want to hand-code 3D) | renders the memoji/face and lets it react to cursor (rotation/tilt) |
| Fluid background | **Custom WebGL/Canvas shader** (simplex-noise driven, cursor-reactive) — e.g. build with `three.js` `ShaderMaterial` or a canvas 2D metaball/blob approach | produces the multi-color fluid hover effect |
| Icons | `lucide-react` | clean line icons |
| Fonts | `next/font` — a geometric sans (e.g. Inter / Geist) for UI + optional display font for the big headline | matches modern portfolio feel |
| Deployment | Vercel | zero-config Next.js hosting |

Optional/alternative if you want a lighter build: swap React Three Fiber for a pre-rendered
Lottie/Rive character with cursor-follow eyes, and swap the WebGL shader for a simpler
canvas-based blurred blob gradient using CSS `filter: blur()` + `mix-blend-mode`.

---

## 3. Folder Structure

```
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 # assembles all sections on one page
│   ├── globals.css
│   └── api/
│       └── contact/route.ts     # optional: contact form handler
├── components/
│   ├── hero/
│   │   ├── Hero.tsx
│   │   ├── FaceModel.tsx        # 3D face / memoji (react-three-fiber canvas)
│   │   └── FluidBackground.tsx  # cursor-reactive multi-color shader/canvas bg
│   ├── nav/
│   │   └── SectionNav.tsx       # Me / Projects / Skills / Fun / Contact pills
│   ├── sections/
│   │   ├── SectionShell.tsx     # shared wrapper: handles typing-dots -> content reveal
│   │   ├── MeSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── FunSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── TypingDots.tsx       # the reusable 3-dot bouncing loader
│       ├── ProjectCard.tsx
│       └── SkillBadge.tsx
├── lib/
│   └── data.ts                  # all your personal content lives here
├── public/
│   ├── face-model.glb           # or memoji/avatar asset
│   └── images/
├── tailwind.config.ts
└── package.json
```

---

## 4. Core Interaction Spec (must-implement exactly)

### 4.1 Fluid hover background (`FluidBackground.tsx`)
- Full-viewport `<canvas>` positioned behind all hero content (`position: fixed; inset: 0; z-index: -1`).
- On `pointermove`, update a target position (with lerp/damping so it trails smoothly, not 1:1).
- Render **2–4 soft, large, blurred color blobs** (e.g. violet, cyan, pink, amber) that:
  - drift slowly on their own (idle animation, sine-based),
  - are pulled toward the cursor position when hovering,
  - blend together using `mix-blend-mode: screen` or a WebGL blend/noise shader for a "fluid ink" look.
- Use `requestAnimationFrame`, not `setInterval`. Respect `prefers-reduced-motion` (fall back to a static gradient).
- Performance: cap devicePixelRatio at 1.5–2, pause the RAF loop with `IntersectionObserver`/`visibilitychange` when tab/section not visible.

### 4.2 3D Face (`FaceModel.tsx`)
- `<Canvas>` from `@react-three-fiber` rendering a stylized head/memoji.
- Subtle idle motion: gentle floating (sin wave on Y), slow auto-rotation.
- On mouse move over the hero, the head/eyes subtly turn toward the cursor (lerped rotation, small max angle so it stays natural — e.g. ±15°).
- Add soft studio lighting (`ambientLight` + one `directionalLight`) and maybe a rim light for a premium look.
- Provide a fallback: if `.glb` isn't available yet, render a simple placeholder (a 3D-tilted PNG using CSS `perspective` + `rotateX/rotateY` bound to mouse position) so the layout works immediately.

### 4.3 Section reveal — "typing dots → content" (`SectionShell.tsx`)
This is the signature pattern, used identically by every section:

```
State machine per section: "idle" -> "typing" -> "revealed"

onNavClick(section):
  1. set activeSection = section, phase = "typing"
  2. render <TypingDots /> only
  3. after ~600ms (randomize 500-800ms for a human feel) -> phase = "content"
  4. TypingDots exits (fade+scale down, 150ms)
  5. Section content enters with Framer Motion stagger:
     container: variants={{ hidden:{opacity:0}, show:{opacity:1, transition:{staggerChildren:0.08}}}}
     children:  variants={{ hidden:{opacity:0, y:16}, show:{opacity:1, y:0, transition:{duration:0.45, ease:"easeOut"}}}}
```

`TypingDots.tsx` — 3 small circles, staggered bounce, looping while `phase === "typing"`:
```tsx
// Tailwind + Framer Motion sketch
const dotVariants = {
  animate: (i: number) => ({
    y: [0, -6, 0],
    transition: { duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" },
  }),
};
// render 3 <motion.span custom={i} variants={dotVariants} animate="animate" /> in a row
```

- Keep `SectionShell` generic: it takes `title`, `children`, and just orchestrates phase + `AnimatePresence`.
- Switching sections while one is already "typing" should cancel the previous timer (avoid race conditions — use `useEffect` cleanup / `AbortController` pattern).

### 4.4 Section nav (`SectionNav.tsx`)
- Pill/tab buttons: `Me · Projects · Skills · Fun · Contact`.
- Active pill gets a highlighted background that **slides** between buttons (Framer Motion `layoutId="activePill"`).
- Clicking a pill triggers 4.3's state machine; disable double-clicks while `phase === "typing"`.

---

## 5. Content Sections

- **Me** — short bio, photo/memoji, quick facts (location, role, current focus).
- **Projects** — grid/list of `ProjectCard` (title, 1-line description, tech tags, thumbnail, live/repo links).
- **Skills** — grouped `SkillBadge` pills (e.g. Languages, Frameworks, Tools) — optional animated proficiency bars.
- **Fun** — hobbies, fun facts, playlist, gear, or anything personal/off-beat that adds personality.
- **Contact** — email, socials, optional working contact form (`app/api/contact/route.ts` + email provider like Resend).

All copy/data should live in `lib/data.ts` as typed objects/arrays so content edits never touch component code:

```ts
export const profile = {
  name: "[[Your Name]]",
  role: "[[Your Title, e.g. Full-Stack Developer]]",
  tagline: "[[One punchy sentence about what you do]]",
  location: "[[City, Country]]",
  email: "[[you@example.com]]",
  socials: { github: "[[url]]", linkedin: "[[url]]", x: "[[url]]" },
};

export const projects = [
  { title: "[[Project 1]]", description: "[[...]]", tags: ["Next.js","TypeScript"], image: "/images/p1.png", href: "[[live url]]", repo: "[[repo url]]" },
  // ...
];

export const skills = {
  Languages: ["TypeScript", "Python", "..."],
  Frameworks: ["Next.js", "React", "..."],
  Tools: ["Figma", "Docker", "..."],
};

export const funFacts = ["[[fun fact 1]]", "[[fun fact 2]]"];
```

---

## 6. Visual/Design Direction

- Dark background (`#0a0a0f`–`#111116`) so the fluid colors pop.
- Accent gradient palette: violet `#8b5cf6`, cyan `#22d3ee`, pink `#ec4899`, amber `#f59e0b`.
- Rounded-xl cards, soft shadows, generous whitespace, large confident headline type (64–96px on desktop hero).
- Micro-interactions everywhere: hover-scale on cards (`whileHover={{ scale: 1.02 }}`), cursor-follow glow on buttons.
- Respect accessibility: focus rings, semantic headings per section, `prefers-reduced-motion` fallbacks for both the fluid bg and the 3D face (swap to static image + no motion).

---

## 7. Step-by-Step Build Order (give this order to the agent)

1. `npx create-next-app@latest` with TypeScript + Tailwind + App Router.
2. Install deps: `framer-motion`, `three`, `@react-three/fiber`, `@react-three/drei`, `lucide-react`.
3. Scaffold `lib/data.ts` with placeholder content.
4. Build static layout first (no animation): Hero text + nav pills + all 5 sections stacked/hidden.
5. Implement `TypingDots` and `SectionShell` state machine; wire nav clicks to it. Verify the typing→reveal choreography feels right using plain content first.
6. Implement `FluidBackground` (start with a simple 3–4 blurred div blobs following the mouse via `transform: translate` + spring, THEN upgrade to a real shader if desired).
7. Implement `FaceModel` (start with the CSS-tilt PNG fallback, then swap in the real `.glb` via react-three-fiber once you have/create a 3D asset).
8. Fill in real content in `lib/data.ts`, add real project images.
9. Polish: responsive breakpoints, reduced-motion fallbacks, meta tags/OG image, favicon.
10. Deploy to Vercel; test Lighthouse (aim 90+ perf on desktop, 80+ mobile given the WebGL/3D weight).

---

## 8. Prompt to paste to your AI coding agent

> Build me a Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion single-page portfolio.
> Use the folder structure, interaction spec, and data schema exactly as defined in this document.
> Priorities in order: (1) get the typing-dots-then-content reveal working perfectly and reused
> identically across all 5 sections, (2) build the cursor-reactive multi-color fluid background
> on the hero, (3) add the 3D/tilted face element with cursor-follow rotation, (4) polish visuals
> and responsiveness. Use placeholder content from `lib/data.ts` where I haven't filled in real
> info yet. Explain any 3D/shader code with comments since I may need to tweak it later.

---

## 9. Notes / Scope Cuts if Short on Time

- Skip a real WebGL shader — 3 blurred, mouse-attracted `div`s with `blur-3xl` + `mix-blend-mode: screen` reads as "fluid" for 80% of the effort.
- Skip a real `.glb` 3D model — a well-lit PNG/illustration with CSS 3D tilt (`perspective`, `rotateX/rotateY` bound to mouse) reads as "3D-ish" convincingly.
- Keep the typing-dots + stagger reveal — it's the cheapest-to-build, highest-signature interaction of the whole site.