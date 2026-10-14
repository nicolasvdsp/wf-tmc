# The Mothership — Dev Context

Use this file at the start of a new chat to skip project discovery and jump straight into building.

---

## Project Overview

The Mothership's own marketing website, built in **Webflow**, with a custom JS/SCSS layer in this repo for interactions and animations. The Mothership is a brand, web design, and web development agency.

The Webflow MCP bridge and Figma desktop MCP are used together to build components.

There is no production domain yet. Staging is the only public URL until that changes.

| | |
|---|---|
| Brand | The Mothership |
| Webflow site | the Mothership Creative |
| Webflow site ID | `69a1c2a22d243aa642fbd16a` |
| Short name | `themothershipcreative` |
| Staging | https://themothershipcreative.webflow.io/ |
| Production | Not live yet |
| Designer (last checked) | Home — page ID `69a81976eb8f3f4f621dddcf` |
| Bundle host | https://wf-tmc.netlify.app/main.min.js |

---

## Tools & MCPs

- **Webflow MCP bridge**: Must be open with the Webflow Designer tab active and in the foreground (not idle/backgrounded). Webflow site ID: `69a1c2a22d243aa642fbd16a`
- **Figma MCP** (desktop app, file currently open): pages are Home (`4842:3956`), Approach (&services) (`5396:5703`), Cases (`3602:2703`), About (`5114:419`), Resources (`4658:3434`), Contact (`5396:5855`), and 404 (`5396:6329`). Use `get_design_context` + `get_screenshot` together. Dev notes for sections are placed next to frames in Figma. The desktop connection did not return the file title or file key — confirm the name in the Figma tab before writing it here.
- **No CSS shorthand** in Webflow style calls — always use longhand (`margin-top`, `padding-left`, etc.)
- Reuse existing Webflow variables and styles wherever logical. Only create new ones when truly necessary.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Layout & styles | Webflow (via MCP) |
| Custom JS | Vanilla ES modules in `src/features/` |
| Custom CSS | SCSS in `src/scss/components/` |
| Animations | GSAP + ScrollTrigger (`window.gsap`) |
| Page transitions | Barba.js |
| Build | Vite (`npm run dev` = HTTP localhost; `npm run dev:https` = HTTPS opt-in) |

### Dev-mode protocol (HTTP vs HTTPS)

Staging is `https://themothershipcreative.webflow.io/`. Safari blocks an `http://localhost` script on that page, so that browser needs `https-mode` on the script tag plus `npm run dev:https`.

The bundle is in the site footer custom code (before `</body>`), currently with HTTP dev mode:

```html
<!-- Barba.js -->
<script src="https://cdn.jsdelivr.net/npm/@barba/core"></script>
<!-- vimeo.js -->
<script src="https://player.vimeo.com/api/player.js"></script>

<!-- Custom components -->
<script src="https://wf-tmc.netlify.app/main.min.js" dev-mode></script>
```

For Safari on staging, add `https-mode` to that same tag:

```html
<script src="https://wf-tmc.netlify.app/main.min.js" dev-mode https-mode></script>
```

Run the matching Vite command:

- `npm run dev` → `http://localhost:3012` (no certificate prompts)
- `npm run dev:https` → `https://localhost:3012` (accept the self-signed cert in the browser once: open `https://localhost:3012` directly, click through, then reload Webflow)

Browsers reject `fetch()` to self-signed `https://localhost` with no trust prompt, so the loader uses `<script type="module">` injection (which uses the same TLS stack as normal Vite loads) — that path works in both modes.

---

## Naming Convention

Finsweet **Client First** strategy throughout:

- Sections: `section_[name]` (e.g. `section_services`)
- Components: `[name]_component`
- Child elements: `[name]_[element]` (e.g. `services_list-header-item`)
- State classes: `is-active`, `is-open`, `is-visible` (always combo classes, never standalone)
- JS hooks: **data-attributes preferred** (e.g. `data-services-item="0"`), with hardcoded fallbacks in JS
- Padding wrappers follow Client First: `padding-global` > `padding-section-large` > component

---

## JS Feature Pattern

Every feature lives in `src/features/[feature-name].js` and follows this exact boilerplate:

```js
function initFeatureName(container) {
  container = container || document;

  const items = container.querySelectorAll('[data-feature-name]');
  if (!items.length) return;

  // feature logic here
}

function featureName() {
  document.addEventListener('barba:afterEnter', (e) => {
    initFeatureName(e.detail.container);
  });
}

export default featureName;
```

See `src/features/custom-feature.js` for the annotated boilerplate reference.

---

## Adding a New Feature — Checklist

1. Create `src/features/[feature-name].js` using the pattern above
2. Create `src/scss/components/_[feature-name].scss` for any custom CSS
3. Add `@use 'components/[feature-name]';` to `src/scss/app.scss`
4. Add `featureName: true` to `INCLUDE_FEATURES` in `src/config.js`
5. Add `import featureName from './features/[feature-name]';` to `src/main.js`
6. Add `ACTIVE_FEATURES.featureName && featureName();` inside `initFeatures()` in `src/main.js`

---

## Feature Flag System

Features can be toggled in two ways:

- `src/config.js` — default flags (`INCLUDE_FEATURES` object)
- Script tag attributes — override at the HTML level: `<script src="main.min.js" featureName></script>`

If no attributes are present on the script tag, `config.js` values are used.

---

## SCSS Structure

```
src/scss/
  app.scss                   ← imports all component files
  components/
    _animations.scss
    _breakpoints.scss
    _breadcrumbs.scss
    _cta.scss
    _lottie.scss
    _richtext.scss
    _testimonials.scss
    _touchdevice.scss
```

Custom CSS that can't be done in Webflow UI goes in the relevant `_[component].scss` file.

---

## Key CSS Patterns

- **`overflow: clip`** instead of `overflow: hidden` when sticky children are involved — `clip` doesn't create a scroll container so `position: sticky` on children is preserved
- **SVG gradient fills**: Define a hidden inline SVG with `<defs>` as a Webflow Embed element. Use `width:0; height:0; display:block` — **do not use `overflow: hidden`** (breaks `url(#id)` gradient references in some browsers). Reference via `fill: url(#gradient-id)` in SCSS. Guard with `html:not(.wf-design-mode)` to prevent applying in Webflow Designer.

---

## Reduced Motion

All components with animations/transitions **must** respect `prefers-reduced-motion: reduce`. When the user has reduced motion enabled:

- Skip all animation — no crossfade, no slide, no stagger. Just an instant state change.
- Check via `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and override the transition to an immediate swap (e.g. a `'none'` transition that uses `gsap.set` instead of `gsap.to`).
- This applies to every feature: testimonials, page transitions, scroll animations, etc.

---

## Developer Preferences

- Data-attribute approach for JS hooks — with hardcoded fallbacks in the script
- Avoid JS injection of DOM elements when a native Webflow Embed can achieve the same result
- Keep custom CSS minimal — prefer Webflow styles/variables; only use SCSS for things the UI can't do
- No hover states until explicitly requested
- Always check Figma dev notes alongside the frame design — they contain implementation hints
