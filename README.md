# Portfolio, Mohammad Nour

Personal site of **Mohammad Nour**, Product Engineer in Amman, Jordan.

## The design: the canvas

The site is a live design file. The top bar names the file (`mohammad-nour / portfolio`), the left
rail lists the layers and the real colour tokens, and the homepage is a frame called
"Home / Desktop 1440". On first load a cursor called Mohammad designs the hero in front of the
visitor (selection box, snap guides, spacing readouts), flips the frame from Draft to Live, and a
"Deployed" toast appears. Scrolling then zooms the camera out to the board of his products and
flies into each flagship frame: Karmetta, FoloEngine, Warsha, EchoFlow, FoloPrint and Inside the
Harness. After the board come More work, Process, Experience (as version history), Stack (as an
assets panel) and Contact.

Each device gets its own grammar over one HTML document:

- Desktop, 1200px and up: full tool chrome, layers rail that tracks the frame in view, pinned
  scroll camera (GSAP ScrollTrigger pin and scrub, set up with `gsap.matchMedia`).
- Tablet, 768px to 1199px: top bar, layers as a scrollable chip row, frames in a two-column board,
  the selection box snaps to the frame in view.
- Phone, under 768px: slim top bar, frames stacked full width, a short intro, and a bottom bar
  with Work, Process, Experience and Contact.

With JavaScript off, or with reduced motion, the finished page shows: no intro, no pin, no scrub.

## Tech

- Next.js 15 (App Router, TypeScript), static export to `out/`
- GSAP 3 with `@gsap/react` for the intro, the board camera and the process walk
- lucide-react icons
- Schibsted Grotesk (display) and Instrument Sans (body) via `next/font`
- Plain CSS with custom properties in `app/globals.css`. The accent is one token, `--accent`.

## Develop

```bash
npm ci
npm run dev      # http://localhost:3000
npm run build    # static export to out/
```

## Structure

```
app/                   layout (metadata, JSON-LD, boot script), page, globals.css, OG image, icon, robots, sitemap
components/canvas/     TopBar, LayersNav, Board, HeroFrame, FlagshipFrame, EngineDiagram, MoreWork,
                       Process, Experience, Libraries, Contact, Chrome (bottom bar, footer, overlays)
components/canvas/     CanvasMotion and LayerSync: the two client leaves
components/canvas/motion/   intro, board camera, process walk, visitor cursor
lib/                   site.ts (identity and links), projects.ts, experience.ts, tokens.ts, logo.ts
```

All content is server rendered HTML; the client leaves only animate DOM that is already there.
