/*
  GRADIENT GLOW

  One radial light follows the pointer across a group of SVGs, as if they
  were a single shape. A finger does the same while it is down, including
  on Safari, and the light goes out when the finger lifts. The page still
  scrolls. Every path is filled with that light at 5% opacity,
  and a 1px stroke along the edge of every path uses the same light at
  full strength. A ring edge that passes through a neighbouring circle is
  hidden, so the overlaps read as one outline.

  Add [data-gradient-glow] to the wrapper around the SVGs. Not to each letter.

  Optional, on the same element:
    data-gradient-glow-color   light color, default #FAF9F7
    data-gradient-glow-size    radius of the light, in letters, default 1.5
    data-gradient-glow-fill    fill opacity at the center of the light, default 0.05

  The numbers to play with live in TUNING, just below.
*/

const TUNING = {
  color: '#FAF9F7',
  // How far the light reaches, measured in letters. 1.5 covers the letter
  // under the pointer and spills into its neighbours.
  size: 1.5,
  fill: 0.05,
};

const NS = 'http://www.w3.org/2000/svg';

const active = new Set();
let listening = false;
let pointer = null;
let usingTouch = false;
let touchReset = 0;
let rafId = 0;
let uid = 0;
let tickerOn = false;
let fadeTween = null;
let fading = false;

function attr(el, name) {
  return el.getAttribute(name);
}

function num(el, name, fallback) {
  const value = parseFloat(attr(el, name));
  return Number.isFinite(value) ? value : fallback;
}

function makeGradient(id, color, centerOpacity) {
  const grad = document.createElementNS(NS, 'radialGradient');
  grad.setAttribute('id', id);
  grad.setAttribute('data-gradient-glow-paint', '');
  grad.setAttribute('gradientUnits', 'userSpaceOnUse');
  grad.setAttribute('r', '0');

  const start = document.createElementNS(NS, 'stop');
  start.setAttribute('offset', '0');
  start.setAttribute('stop-color', color);
  start.setAttribute('stop-opacity', String(centerOpacity));

  const end = document.createElementNS(NS, 'stop');
  end.setAttribute('offset', '1');
  end.setAttribute('stop-color', color);
  end.setAttribute('stop-opacity', '0');

  grad._glowOpacity = centerOpacity;
  grad.append(start, end);
  return grad;
}

function makePath(d, rule, fill, stroke) {
  const path = document.createElementNS(NS, 'path');
  path.setAttribute('data-gradient-glow-paint', '');
  path.setAttribute('d', d);
  path.setAttribute('fill', fill);
  path.setAttribute('stroke', stroke);
  path.setAttribute('stroke-width', '1');
  path.setAttribute('fill-rule', rule);
  path.setAttribute('pointer-events', 'none');
  return path;
}

function setupSvg(svg, root) {
  if (svg._gradientGlow) return svg._gradientGlow;

  const source = [...svg.querySelectorAll('path')].find((path) => path.getAttribute('d') && !path.hasAttribute('data-gradient-glow-paint'));
  const d = source?.getAttribute('d');
  if (!d) return null;

  const id = ++uid;
  const color = attr(root, 'data-gradient-glow-color') || TUNING.color;
  const fillOpacity = num(root, 'data-gradient-glow-fill', TUNING.fill);
  const strokeId = `gradient-glow-${id}-stroke`;
  const fillId = `gradient-glow-${id}-fill`;

  let defs = svg.querySelector('defs');
  if (!defs) {
    defs = document.createElementNS(NS, 'defs');
    svg.prepend(defs);
  }

  const strokeGrad = makeGradient(strokeId, color, 1);
  const fillGrad = makeGradient(fillId, color, fillOpacity);
  defs.append(strokeGrad, fillGrad);

  const rule = source.getAttribute('fill-rule') || 'evenodd';
  const fillPath = makePath(d, rule, `url(#${fillId})`, 'none');
  const strokePath = makePath(d, rule, 'none', `url(#${strokeId})`);
  // width="auto" lets iOS size the SVG from the mask. Fill the letter box.
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.style.display = 'block';
  svg.style.width = '100%';
  svg.style.height = '100%';
  svg.style.overflow = 'hidden';
  svg.append(fillPath, strokePath);

  const state = { svg, id, strokeGrad, fillGrad, strokePath, holes: [] };
  svg._gradientGlow = state;
  return state;
}

function circleFromBox(svg) {
  const box = svg.getBoundingClientRect();
  if (box.width < 1 || box.height < 1) return null;
  return {
    x: box.left + box.width / 2,
    y: box.top + box.height / 2,
    r: Math.min(box.width, box.height) / 2,
  };
}

function localCircleFromBox(svg, screen) {
  const vb = svg.viewBox?.baseVal;
  const box = svg.getBoundingClientRect();
  if (!vb?.width || box.width < 1 || box.height < 1) return null;
  const scaleX = vb.width / box.width;
  const scaleY = vb.height / box.height;
  return {
    x: vb.x + (screen.x - box.left) * scaleX,
    y: vb.y + (screen.y - box.top) * scaleY,
    r: screen.r * scaleX,
  };
}

function screenCircle(svg) {
  // iOS getScreenCTM() during a touch puts the mask holes in the wrong
  // place and the border disappears. The letter box stays reliable.
  if (usingTouch) return circleFromBox(svg);

  const ctm = svg.getScreenCTM();
  const vb = svg.viewBox?.baseVal;
  if (!ctm || !vb?.width) return circleFromBox(svg);

  const cx = vb.x + vb.width / 2;
  const cy = vb.y + vb.height / 2;
  const r = Math.min(vb.width, vb.height) / 2;
  const center = svg.createSVGPoint();
  center.x = cx;
  center.y = cy;
  const edge = svg.createSVGPoint();
  edge.x = cx + r;
  edge.y = cy;
  const screen = center.matrixTransform(ctm);
  const screenEdge = edge.matrixTransform(ctm);
  return {
    x: screen.x,
    y: screen.y,
    r: Math.hypot(screenEdge.x - screen.x, screenEdge.y - screen.y),
  };
}

function toLocal(svg, screen) {
  if (usingTouch) return localCircleFromBox(svg, screen);

  const ctm = svg.getScreenCTM();
  if (!ctm) return localCircleFromBox(svg, screen);
  const inv = ctm.inverse();
  const center = svg.createSVGPoint();
  center.x = screen.x;
  center.y = screen.y;
  const edge = svg.createSVGPoint();
  edge.x = screen.x + screen.r;
  edge.y = screen.y;
  const local = center.matrixTransform(inv);
  const localEdge = edge.matrixTransform(inv);
  return {
    x: local.x,
    y: local.y,
    r: Math.hypot(localEdge.x - local.x, localEdge.y - local.y),
  };
}

function fitStroke(path, svg) {
  // A non-scaling 1px stroke never paints on iOS once it is masked.
  // Match one screen pixel in the letter's own units instead.
  const vb = svg.viewBox?.baseVal?.width || 155;
  const rendered = svg.getBoundingClientRect().width;
  if (!path || rendered < 1) return;
  const width = vb / rendered;
  const unit = SVGLength.SVG_LENGTHTYPE_NUMBER;
  if (path.strokeWidth?.baseVal?.newValueSpecifiedUnits) {
    path.strokeWidth.baseVal.newValueSpecifiedUnits(unit, width);
    return;
  }
  path.setAttribute('stroke-width', String(width));
}

function maskBounds(svg) {
  const vb = svg.viewBox?.baseVal;
  const width = vb?.width || 155;
  const height = vb?.height || width;
  const x = vb?.width ? vb.x : 0;
  const y = vb?.width ? vb.y : 0;
  // Just enough for the 1px stroke. A mask larger than the viewBox
  // becomes the SVG's layout size on iOS.
  const pad = 8;
  return { x: x - pad, y: y - pad, width: width + pad * 2, height: height + pad * 2 };
}

function addOverlapMask(state, others) {
  const box = maskBounds(state.svg);
  const maskId = `gradient-glow-${state.id}-mask`;
  const mask = document.createElementNS(NS, 'mask');
  mask.setAttribute('id', maskId);
  mask.setAttribute('data-gradient-glow-paint', '');
  mask.setAttribute('maskUnits', 'userSpaceOnUse');
  mask.setAttribute('maskContentUnits', 'userSpaceOnUse');
  mask.setAttribute('x', box.x);
  mask.setAttribute('y', box.y);
  mask.setAttribute('width', box.width);
  mask.setAttribute('height', box.height);

  const rect = document.createElementNS(NS, 'rect');
  rect.setAttribute('x', box.x);
  rect.setAttribute('y', box.y);
  rect.setAttribute('width', box.width);
  rect.setAttribute('height', box.height);
  rect.setAttribute('fill', 'white');
  mask.appendChild(rect);

  others.forEach(() => {
    const circle = document.createElementNS(NS, 'circle');
    circle.setAttribute('fill', 'black');
    circle.setAttribute('r', '0');
    mask.appendChild(circle);
    state.holes.push(circle);
  });

  state.svg.querySelector('defs').appendChild(mask);
  state.strokePath.setAttribute('mask', `url(#${maskId})`);
}

function updateMasks(root) {
  const svgs = root._gradientGlow.svgs;
  const circles = svgs.map(({ svg }) => screenCircle(svg));
  svgs.forEach((state, i) => {
    let hole = 0;
    circles.forEach((circle, j) => {
      if (i === j) return;
      const node = state.holes[hole++];
      if (!node || !circle) return;
      const local = toLocal(state.svg, circle);
      if (!local) return;
      const width = state.svg.viewBox?.baseVal?.width || 155;
      if (![local.x, local.y, local.r, circle.r].every(Number.isFinite)) return;
      // A neighbour that overlaps this letter sits about one letter away.
      // Ignore a bad transform that would throw the hole across the page.
      const span = width * 3;
      if (Math.abs(local.x) > span || Math.abs(local.y) > span || local.r > span) {
        node.setAttribute('r', '0');
        return;
      }
      // Cover the 1px stroke, which sits half a pixel outside the circle.
      const pad = circle.r ? local.r / circle.r : 0;
      node.setAttribute('cx', local.x);
      node.setAttribute('cy', local.y);
      node.setAttribute('r', Math.min(local.r + pad, span));
    });
    fitStroke(state.strokePath, state.svg);
  });
}

function place(grad, x, y, r) {
  // iOS repaints a gradient when the length unit is set this way.
  // setAttribute alone updates the DOM and Safari keeps the old light.
  const unit = SVGLength.SVG_LENGTHTYPE_NUMBER;
  if (grad.cx?.baseVal?.newValueSpecifiedUnits) {
    grad.cx.baseVal.newValueSpecifiedUnits(unit, x);
    grad.cy.baseVal.newValueSpecifiedUnits(unit, y);
    grad.r.baseVal.newValueSpecifiedUnits(unit, r);
    return;
  }
  grad.setAttribute('cx', x);
  grad.setAttribute('cy', y);
  grad.setAttribute('r', r);
}

function localFromBox(svg, x, y) {
  const vb = svg.viewBox?.baseVal;
  const box = svg.getBoundingClientRect();
  if (!vb?.width || box.width < 1 || box.height < 1) return null;
  return {
    x: vb.x + ((x - box.left) / box.width) * vb.width,
    y: vb.y + ((y - box.top) / box.height) * vb.height,
    width: vb.width,
  };
}

function localFromScreen(svg, x, y) {
  // A finger uses the letter's box. getScreenCTM() during a touch on iOS
  // often ignores the scroll and parks the light off the letter.
  if (!usingTouch) {
    const ctm = svg.getScreenCTM();
    const vb = svg.viewBox?.baseVal;
    const width = vb?.width || svg.clientWidth || 1;
    if (ctm) {
      const point = svg.createSVGPoint();
      point.x = x;
      point.y = y;
      const local = point.matrixTransform(ctm.inverse());
      return { x: local.x, y: local.y, width };
    }
  }
  return localFromBox(svg, x, y);
}

function pointerHits(root) {
  const box = root.getBoundingClientRect();
  const pad = Math.max(box.height, 64);
  return pointer.x >= box.left - pad && pointer.x <= box.right + pad
    && pointer.y >= box.top - pad && pointer.y <= box.bottom + pad;
}

function darken(root) {
  if (!root._gradientGlow?.lit) return;
  root._gradientGlow.lit = false;
  root._gradientGlow.svgs.forEach(({ strokeGrad, fillGrad }) => {
    place(strokeGrad, 0, 0, 0);
    place(fillGrad, 0, 0, 0);
  });
}

function setGlowAmount(grad, amount) {
  const stop = grad.firstElementChild;
  if (!stop) return;
  const base = grad._glowOpacity ?? 1;
  stop.setAttribute('stop-opacity', String(base * amount));
}

function restoreGlow() {
  active.forEach((root) => {
    root._gradientGlow?.svgs.forEach(({ strokeGrad, fillGrad }) => {
      setGlowAmount(strokeGrad, 1);
      setGlowAmount(fillGrad, 1);
    });
  });
}

function finishFade() {
  fadeTween = null;
  fading = false;
  active.forEach((root) => {
    if (root._gradientGlow) darken(root);
  });
  restoreGlow();
}

function cancelFade() {
  fadeTween?.kill();
  fadeTween = null;
  fading = false;
  restoreGlow();
}

function beginFade() {
  if (fading) return;
  const gsap = window.gsap;
  if (!gsap) {
    active.forEach((root) => {
      if (root._gradientGlow) darken(root);
    });
    return;
  }

  fading = true;
  const state = { amount: 1 };
  fadeTween = gsap.to(state, {
    amount: 0,
    duration: 0.55,
    ease: 'power2.out',
    onUpdate() {
      active.forEach((root) => {
        root._gradientGlow?.svgs.forEach(({ strokeGrad, fillGrad }) => {
          setGlowAmount(strokeGrad, state.amount);
          setGlowAmount(fillGrad, state.amount);
        });
      });
    },
    onComplete: finishFade,
  });
}

function updateRoot(root) {
  const hit = pointer && pointerHits(root);
  if (!hit) {
    if (usingTouch && root._gradientGlow.lit) beginFade();
    else if (!fading) darken(root);
    return;
  }

  if (fading) cancelFade();
  if (usingTouch) updateMasks(root);

  const size = num(root, 'data-gradient-glow-size', TUNING.size);
  root._gradientGlow.lit = true;
  root._gradientGlow.svgs.forEach(({ svg, strokeGrad, fillGrad, strokePath }) => {
    fitStroke(strokePath, svg);
    const local = localFromScreen(svg, pointer.x, pointer.y);
    if (!local) {
      place(strokeGrad, 0, 0, 0);
      place(fillGrad, 0, 0, 0);
      return;
    }
    const r = local.width * size;
    place(strokeGrad, local.x, local.y, r);
    place(fillGrad, local.x, local.y, r);
  });
}

function flush() {
  rafId = 0;
  active.forEach(updateRoot);
}

function track(x, y) {
  pointer = { x, y };
  if (rafId) return;
  rafId = requestAnimationFrame(flush);
}

function onMove(e) {
  // iOS fires a fake mousemove after a touch. Ignore it or the light
  // stays on once the finger has lifted.
  if (usingTouch) return;
  track(e.clientX, e.clientY);
}

function onLeave() {
  if (usingTouch) return;
  pointer = null;
  flush();
}

function paintTouch(x, y) {
  // Paint now. iOS holds requestAnimationFrame until the finger lifts
  // when the gesture is also scrolling, so a frame callback never shows.
  usingTouch = true;
  clearTimeout(touchReset);
  pointer = { x, y };
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
  flush();
}

function onTouch(e) {
  const touch = e.touches[0] || e.changedTouches[0];
  if (!touch) return;
  paintTouch(touch.clientX, touch.clientY);
}

function onTouchEnd(e) {
  if (e.touches.length) {
    onTouch(e);
    return;
  }
  pointer = null;
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
  flush();
  clearTimeout(touchReset);
  touchReset = setTimeout(() => { usingTouch = false; }, 900);
}

function onPointerTouch(e) {
  if (e.pointerType !== 'touch') return;
  paintTouch(e.clientX, e.clientY);
}

function onPointerTouchEnd(e) {
  if (e.pointerType !== 'touch') return;
  onTouchEnd({ touches: [] });
}

function onTick() {
  active.forEach(updateMasks);
}

function ensureTicker() {
  // Masks follow letters that move under a mouse. A finger never moves
  // the letters, and rewriting the mask every frame makes Safari drop
  // frames while the page scrolls.
  if (tickerOn || !window.gsap) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  window.gsap.ticker.add(onTick);
  tickerOn = true;
}

function dropTicker() {
  if (active.size || !tickerOn || !window.gsap) return;
  window.gsap.ticker.remove(onTick);
  tickerOn = false;
}

const touchListen = { passive: true, capture: true };

function ensureListener() {
  if (listening) return;
  window.addEventListener('mousemove', onMove, { passive: true });
  document.documentElement.addEventListener('mouseleave', onLeave);
  document.addEventListener('touchstart', onTouch, touchListen);
  document.addEventListener('touchmove', onTouch, touchListen);
  document.addEventListener('touchend', onTouchEnd, touchListen);
  document.addEventListener('touchcancel', onTouchEnd, touchListen);
  document.addEventListener('pointerdown', onPointerTouch, touchListen);
  document.addEventListener('pointermove', onPointerTouch, touchListen);
  document.addEventListener('pointerup', onPointerTouchEnd, touchListen);
  document.addEventListener('pointercancel', onPointerTouchEnd, touchListen);
  listening = true;
}

function dropListener() {
  if (active.size) return;
  window.removeEventListener('mousemove', onMove);
  document.documentElement.removeEventListener('mouseleave', onLeave);
  document.removeEventListener('touchstart', onTouch, touchListen);
  document.removeEventListener('touchmove', onTouch, touchListen);
  document.removeEventListener('touchend', onTouchEnd, touchListen);
  document.removeEventListener('touchcancel', onTouchEnd, touchListen);
  document.removeEventListener('pointerdown', onPointerTouch, touchListen);
  document.removeEventListener('pointermove', onPointerTouch, touchListen);
  document.removeEventListener('pointerup', onPointerTouchEnd, touchListen);
  document.removeEventListener('pointercancel', onPointerTouchEnd, touchListen);
  clearTimeout(touchReset);
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
  if (!active.size) {
    fadeTween?.kill();
    fadeTween = null;
    fading = false;
  }
  listening = false;
}

function rootsIn(container) {
  const scope = container || document;
  const roots = [...scope.querySelectorAll('[data-gradient-glow]')];
  if (scope.matches?.('[data-gradient-glow]')) roots.unshift(scope);
  return roots;
}

function setupRoot(root) {
  if (root._gradientGlow) return;

  const svgs = [...root.querySelectorAll('svg')].map((svg) => setupSvg(svg, root)).filter(Boolean);
  if (!svgs.length) return;

  svgs.forEach((state, i) => {
    addOverlapMask(state, svgs.filter((_, j) => j !== i));
  });

  root._gradientGlow = { svgs, lit: false };
  active.add(root);
  ensureListener();
  ensureTicker();
  updateMasks(root);
  updateRoot(root);
}

function destroyRoot(root) {
  if (!root?._gradientGlow) return;
  root._gradientGlow.svgs.forEach(({ svg }) => {
    svg.querySelectorAll('[data-gradient-glow-paint]').forEach((node) => node.remove());
    delete svg._gradientGlow;
  });
  delete root._gradientGlow;
  active.delete(root);
  dropListener();
  dropTicker();
}

export function initGradientGlow(container) {
  rootsIn(container).forEach(setupRoot);
}

export function destroyGradientGlow(container) {
  rootsIn(container).forEach(destroyRoot);
}

function gradientGlow() {
  document.addEventListener('barba:afterEnter', (e) => {
    initGradientGlow(e.detail?.container);
  });

  window.barba?.hooks?.beforeLeave?.((data) => {
    destroyGradientGlow(data.current?.container || document);
  });
}

export default gradientGlow;
