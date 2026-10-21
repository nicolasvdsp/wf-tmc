/*
  GRADIENT GLOW

  One radial light follows the pointer across a group of SVGs, as if they
  were a single shape. Every path is filled with that light at 5% opacity,
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
let rafId = 0;
let uid = 0;
let tickerOn = false;

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
  path.setAttribute('vector-effect', 'non-scaling-stroke');
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
  svg.append(fillPath, strokePath);

  const state = { svg, id, strokeGrad, fillGrad, strokePath, holes: [] };
  svg._gradientGlow = state;
  return state;
}

function screenCircle(svg) {
  const ctm = svg.getScreenCTM();
  const vb = svg.viewBox?.baseVal;
  if (!ctm || !vb?.width) return null;

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
  const ctm = svg.getScreenCTM();
  if (!ctm) return null;
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

function addOverlapMask(state, others) {
  const maskId = `gradient-glow-${state.id}-mask`;
  const mask = document.createElementNS(NS, 'mask');
  mask.setAttribute('id', maskId);
  mask.setAttribute('data-gradient-glow-paint', '');
  mask.setAttribute('maskUnits', 'userSpaceOnUse');
  mask.setAttribute('maskContentUnits', 'userSpaceOnUse');
  mask.setAttribute('x', '-4000');
  mask.setAttribute('y', '-4000');
  mask.setAttribute('width', '8000');
  mask.setAttribute('height', '8000');

  const rect = document.createElementNS(NS, 'rect');
  rect.setAttribute('x', '-4000');
  rect.setAttribute('y', '-4000');
  rect.setAttribute('width', '8000');
  rect.setAttribute('height', '8000');
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
      // Cover the 1px stroke, which sits half a pixel outside the circle.
      const pad = circle.r ? local.r / circle.r : 0;
      node.setAttribute('cx', local.x);
      node.setAttribute('cy', local.y);
      node.setAttribute('r', local.r + pad);
    });
  });
}

function place(grad, x, y, r) {
  grad.setAttribute('cx', x);
  grad.setAttribute('cy', y);
  grad.setAttribute('r', r);
}

function updateRoot(root) {
  const size = num(root, 'data-gradient-glow-size', TUNING.size);
  root._gradientGlow.svgs.forEach(({ svg, strokeGrad, fillGrad }) => {
    const ctm = svg.getScreenCTM();
    const vb = svg.viewBox?.baseVal;
    const width = vb?.width || svg.clientWidth || 1;
    if (!ctm || !pointer) {
      place(strokeGrad, 0, 0, 0);
      place(fillGrad, 0, 0, 0);
      return;
    }

    const point = svg.createSVGPoint();
    point.x = pointer.x;
    point.y = pointer.y;
    const local = point.matrixTransform(ctm.inverse());
    const r = width * size;
    place(strokeGrad, local.x, local.y, r);
    place(fillGrad, local.x, local.y, r);
  });
}

function flush() {
  rafId = 0;
  active.forEach(updateRoot);
}

function onMove(e) {
  pointer = { x: e.clientX, y: e.clientY };
  if (rafId) return;
  rafId = requestAnimationFrame(flush);
}

function onLeave() {
  pointer = null;
  flush();
}

function onTick() {
  active.forEach(updateMasks);
}

function ensureTicker() {
  if (tickerOn || !window.gsap) return;
  window.gsap.ticker.add(onTick);
  tickerOn = true;
}

function dropTicker() {
  if (active.size || !tickerOn || !window.gsap) return;
  window.gsap.ticker.remove(onTick);
  tickerOn = false;
}

function ensureListener() {
  if (listening) return;
  window.addEventListener('mousemove', onMove, { passive: true });
  document.documentElement.addEventListener('mouseleave', onLeave);
  listening = true;
}

function dropListener() {
  if (active.size) return;
  window.removeEventListener('mousemove', onMove);
  document.documentElement.removeEventListener('mouseleave', onLeave);
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
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

  root._gradientGlow = { svgs };
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
