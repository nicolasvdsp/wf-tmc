/*
  MOMENTUM HOVER

  On a fine pointer, entering an element throws its target with the pointer's
  speed, plus a little rotation, then inertia eases it back to rest.

  [data-momentum-hover-init]     section that tracks pointer speed. Give it
                                 some padding so speed is known before enter.
  [data-momentum-hover-element]  wrapper that listens for mouseenter
  [data-momentum-hover-target]   nested element that moves

  [data-momentum-scroll-area]    on the same element as data-momentum-hover-init.
                                 Scrolling lags each target, then it springs
                                 past rest and settles. Each target keeps its
                                 own random strength, so letters don't move
                                 together.

  Needs window.gsap. Hover also needs window.InertiaPlugin.
*/

const xMultiplier = .5;
const yMultiplier = 20;
const rotationMultiplier = 100;
const inertiaResistance = 100;

// Scroll lag. Higher scrollLag throws further. scrollOvershoot is how far
// past rest the catch-up travels before it settles.
const scrollLag = 1.4;
const scrollMax = 60;
const scrollDecay = 0.3;
const scrollMove = 0.35;
const scrollReturn = 2;
const scrollOvershoot = 2.6;
const scrollMulMin = 0.4;
const scrollMulMax = 2;

function rootsIn(container) {
  const scope = container || document;
  const roots = [...scope.querySelectorAll('[data-momentum-hover-init]')];
  if (scope.matches?.('[data-momentum-hover-init]')) roots.unshift(scope);
  return roots;
}

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function bindHover(root, gsap, cleanups) {
  const clampXY = gsap.utils.clamp(-1080, 1080);
  const clampRot = gsap.utils.clamp(-60, 60);

  let prevX = 0;
  let prevY = 0;
  let velX = 0;
  let velY = 0;
  let rafId = null;

  const onMove = (e) => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      velX = e.clientX - prevX;
      velY = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      rafId = null;
    });
  };

  root.querySelectorAll('[data-momentum-hover-element]').forEach((el) => {
    const onEnter = (e) => {
      const target = el.querySelector('[data-momentum-hover-target]');
      if (!target) return;

      const { left, top, width, height } = target.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;

      const rawTorque = offsetX * velY - offsetY * velX;
      const leverDist = Math.hypot(offsetX, offsetY) || 1;
      const angularForce = rawTorque / leverDist;

      const velocityX = clampXY(velX * xMultiplier);
      const velocityY = clampXY(velY * yMultiplier);
      const rotationVelocity = clampRot(angularForce * rotationMultiplier);

      gsap.to(target, {
        inertia: {
          x: { velocity: velocityX, end: 0 },
          y: { velocity: velocityY, end: 0 },
          rotation: { velocity: rotationVelocity, end: 0 },
          resistance: inertiaResistance,
        },
      });
    };

    el.addEventListener('mouseenter', onEnter);
    cleanups.push(() => el.removeEventListener('mouseenter', onEnter));
  });

  root.addEventListener('mousemove', onMove);
  cleanups.push(() => {
    root.removeEventListener('mousemove', onMove);
    if (rafId) cancelAnimationFrame(rafId);
  });
}

function bindScroll(root, gsap, cleanups) {
  const targets = [...root.querySelectorAll('[data-momentum-hover-target]')];
  if (!targets.length) return;

  targets.forEach((target) => {
    if (target._momentumScrollMul == null) {
      target._momentumScrollMul = gsap.utils.random(scrollMulMin, scrollMulMax);
    }
  });

  let last = window.lenis?.scroll ?? window.scrollY ?? 0;
  let velocity = 0;
  let stopTimer = 0;

  const applyLag = () => {
    targets.forEach((target) => {
      const max = scrollMax * target._momentumScrollMul;
      const y = gsap.utils.clamp(-max, max, velocity * scrollLag * target._momentumScrollMul);
      gsap.killTweensOf(target, 'y');
      gsap.set(target, { y });
    });
  };

  const release = () => {
    targets.forEach((target) => {
      gsap.to(target, {
        y: 0,
        duration: scrollReturn,
        ease: `back.out(${scrollOvershoot})`,
        overwrite: 'auto',
      });
    });
  };

  const sample = (y) => {
    const delta = y - last;
    last = y;
    if (!delta) return;
    if (root.getBoundingClientRect().bottom < 0 || root.getBoundingClientRect().top > window.innerHeight) return;

    velocity = velocity * scrollDecay + delta;

    if (Math.abs(delta) < scrollMove) return;

    applyLag();
    clearTimeout(stopTimer);
    stopTimer = setTimeout(release, 90);
  };

  const onLenis = (lenis) => sample(lenis.scroll);
  const onScroll = () => sample(window.scrollY);

  if (window.lenis?.on) {
    window.lenis.on('scroll', onLenis);
    cleanups.push(() => window.lenis?.off('scroll', onLenis));
  } else {
    window.addEventListener('scroll', onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener('scroll', onScroll));
  }

  cleanups.push(() => clearTimeout(stopTimer));
}

export function initMomentumHover(container) {
  const gsap = window.gsap;
  if (!gsap) return;

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (canHover && window.InertiaPlugin) gsap.registerPlugin(window.InertiaPlugin);

  rootsIn(container).forEach((root) => {
    if (root._momentumHover) return;

    const cleanups = [];
    const wantsScroll = root.hasAttribute('data-momentum-scroll-area') && !reducedMotion();

    if (canHover && window.InertiaPlugin) bindHover(root, gsap, cleanups);
    if (wantsScroll) bindScroll(root, gsap, cleanups);
    if (!cleanups.length) return;

    root._momentumHover = {
      destroy() {
        cleanups.forEach((cleanup) => cleanup());
        root.querySelectorAll('[data-momentum-hover-target]').forEach((target) => {
          gsap.killTweensOf(target);
        });
        delete root._momentumHover;
      },
    };
  });
}

function destroyMomentumHover(container) {
  rootsIn(container).forEach((root) => root._momentumHover?.destroy());
}

function momentumHover() {
  document.addEventListener('barba:afterEnter', (e) => {
    initMomentumHover(e.detail?.container);
  });

  window.barba?.hooks?.beforeLeave?.((data) => {
    destroyMomentumHover(data.current?.container || document);
  });
}

export default momentumHover;
