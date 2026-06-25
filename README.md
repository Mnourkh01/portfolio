# Portfolio — Mohammad Nour

Personal developer portfolio for **Mohammad Nour**, a backend-focused full-stack engineer.
A single-page site with a Matrix-inspired aesthetic: phosphor green on black, monospace
type, a full-page digital-rain backdrop, and terminal-style cards.

## Tech

- **Next.js 15** (App Router, TypeScript), static export
- **GSAP** + `@gsap/react` for the hero intro timeline
- **Lenis** for smooth scrolling
- A lightweight **2D canvas** for the Matrix digital rain (`components/MatrixRain.tsx`)
- **lucide-react** icons, **Geist** + **JetBrains Mono** via `next/font`
- IntersectionObserver scroll reveals; full `prefers-reduced-motion` support

No heavy 3D dependencies — the rain is a hand-written canvas effect, so first load
stays light (~155 kB) and Lighthouse-friendly.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

Requires Node 18+.

## Structure

```
app/            layout, page, global styles, OG image, favicon
components/     Nav, Hero, About, Work, Skills, Contact, MatrixRain, SmoothScroll, Reveals
lib/            projects.ts (project data)
```

## Accessibility & motion

Every motion path is wrapped in `prefers-reduced-motion`: the rain renders a single
calm frame, reveals show immediately, and smooth scroll is disabled.
