# The Mothership — Custom Code

Custom JavaScript and SCSS for The Mothership website. The site is designed and built in **Webflow**. This repository is the interaction layer on top of it: animations, page transitions, scroll behaviour, and other features the Designer cannot cover on its own.

The Mothership is a brand, web design, and web development agency. This is their own site. There is no production domain yet. Staging is [themothershipcreative.webflow.io](https://themothershipcreative.webflow.io/). Project ids and the open Figma pages live in [CONTEXT.md](CONTEXT.md).

## How it fits together

`src/main.js` is the entry point. Vite bundles it to `dist/main.js` and `dist/main.min.js`. Webflow loads the minified bundle from the site footer custom code:

```html
<script src="https://wf-tmc.netlify.app/main.min.js" dev-mode></script>
```

The loader lives inside that bundle (`src/loader.js`). It picks the environment from the hostname and the script tag:

| Environment | What runs |
|---|---|
| Production (custom domain) | The deployed bundle, immediately |
| Staging (`.webflow.io`) with `dev-mode`, and the local server running | Vite on `localhost:3012`, with hot reload |
| Staging without the dev server | The deployed bundle, as a fallback |

`dev-mode` on the script tag opts into local development. Add `https-mode` on the same tag and run `npm run dev:https` when staging is HTTPS and the browser blocks mixed content (Safari).

CDN libraries (GSAP, and others only if a feature needs them) are loaded in Webflow, not bundled. Features are toggled in `src/config.js`, or overridden with attributes on the script tag.

Full Webflow steps, script-tag examples, and the HTTP vs HTTPS workflow: **[Webflow Setup](documentation/webflow-setup.md)**.

## Getting started

1. `npm install`
2. Read [CONTEXT.md](CONTEXT.md) for the Webflow site id, staging URL, and Figma pages
3. `npm run dev` (or `npm run dev:https` in Safari — staging is HTTPS), then open [themothershipcreative.webflow.io](https://themothershipcreative.webflow.io/)
4. `npm run build`, push to GitHub, and Netlify deploys the bundle to [wf-tmc.netlify.app](https://wf-tmc.netlify.app/main.min.js)

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server with HMR on `http://localhost:3012` |
| `npm run dev:https` | Same server over HTTPS (self-signed). Pair with `https-mode` on the Webflow script tag |
| `npm run build` | Write `main.js` and `main.min.js` to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run clean` | Remove `dist/` |

Dev server port `3012` is set in both `src/loader.js` (`DEV_PORT`) and `vite.config.js` (`server.port`).

## Project structure

```
├── src/
│   ├── main.js              # Entry point — wires features and starts the loader
│   ├── loader.js            # Staging vs production detection
│   ├── config.js            # Feature toggles
│   ├── features/            # One module per interaction
│   └── scss/                # Custom CSS the Webflow UI cannot express
├── dist/                    # Build output (main.js + main.min.js)
├── documentation/
│   ├── webflow-setup.md     # How the bundle is added in Webflow
│   └── inline_loader_script.js  # Legacy inline loader (reference only)
└── vite.config.js
```

## Features

Defaults live in `src/config.js`. On for this project today: page transitions, navbar, scroll behaviour, breakpoints, utilities, and the custom-feature boilerplate. Everything else (marquees, video, glossary, HubSpot, and so on) stays off until a page needs it.

If the Webflow script tag has no feature attributes, `config.js` wins. If it has any (`breakpoints`, `glossary`, …), only those attributes are enabled.

## Adding a feature

1. Create `src/features/[feature-name].js` using the Barba-aware pattern in `CONTEXT.md.example` (see `src/features/custom-feature.js`)
2. Add styles in `src/scss/components/_[feature-name].scss` and import them from `src/scss/app.scss` when the feature needs custom CSS
3. Set `featureName: true` in `INCLUDE_FEATURES` in `src/config.js`
4. Import it in `src/main.js` and call it from `initFeatures()` behind `ACTIVE_FEATURES.featureName`

Re-init inside the `barba:afterEnter` listener so the feature runs again after a page transition. Respect `prefers-reduced-motion`.

## Conventions

- Finsweet **Client First** class names. State classes (`is-active`, `is-open`, `is-visible`) are combo classes.
- JS hooks prefer data attributes, with a hardcoded fallback in the script.
- Layout and visual styles stay in Webflow. SCSS is for what the Designer cannot do.
- Page transitions (Barba.js), Lenis, and anchor-link handling are documented in `.cursor/rules/page-transitions.md`.

## License

MIT
