# Create Studio — Recreation

A from-scratch React + Vite + TypeScript recreation of the visual identity, layout, and
motion language of [createstudio.framer.media](https://createstudio.framer.media/) — an
award-style creative studio homepage. No Framer runtime, no copied source; every component,
style, and asset here is original.

## Stack

- React 18 + TypeScript + Vite
- Framer Motion for scroll reveals, staggered text, and transitions
- Plain CSS (custom properties as a design-token system, no UI kit)
- Figtree (display/body) + Fragment Mono (labels/numerics) via Google Fonts

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run lint
```

## Structure

```
src/
  components/     one file + co-located .css per section (Hero, Navbar, Projects, Services...)
  animations/     RevealText, MagneticButton, Counter, shared motion variants
  hooks/          useLiveClock (LA time), useMagnetic
  data/           copy/content for nav, projects, services, stats, clients
  styles/         tokens.css (design system) + global.css (reset)
public/assets/    local images (Unsplash-sourced placeholders, downloaded not hotlinked)
```

## Notes on fidelity

- Colors, type pairing, spacing scale, and breakpoints (809 / 1199px) were reverse-engineered
  from the live site's shipped CSS and font files.
- Copy for the hero, intro, showreel, projects, performance stats, and footer mirrors the
  reference; client logos, service imagery, and photography are original placeholders (no
  reference assets were reused).
- Visual QA was done via build/lint checks and manual CSS review — a live browser wasn't
  available in this session to do pixel-diffing against the reference, so give it a pass
  yourself with `npm run dev` and flag anything that's off.
