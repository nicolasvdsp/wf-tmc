export function initOrbitTiles(root) {
  const gsap = window.gsap;
  if (!gsap) return [];

  const CustomEase = window.CustomEase;
  if (CustomEase) {
    gsap.registerPlugin(CustomEase);
    if (!CustomEase.get?.('osmo')) {
      CustomEase.create('osmo', 'M0,0 C0.625,0.05 0,1 1,1');
    }
  }

  const scope = root || document;
  const containers = scope.matches?.('[data-orbit-tiles-init]')
    ? [scope]
    : [...scope.querySelectorAll('[data-orbit-tiles-init]')];

  return containers.map((container) => setupOrbitTiles(container, gsap)).filter(Boolean);
}

function setupOrbitTiles(container, gsap) {
  if (container._orbitTiles) return container._orbitTiles;

  const list = container.querySelector("[data-orbit-tiles-list]");
    const tiles = container.querySelectorAll("[data-orbit-tiles-item]");
    const tileCount = tiles.length;
    if (tileCount < 2) return;

    const radiusXMultiplier = 1;
    const radiusYMultiplier = 0;
    const blurMultiplier = 0.04;
    const minScale = 0.2;
    const minOpacity = 1;
    const minDarkness = 0.3;

    const moveDuration = 2.5;
    const pauseDuration = 0;
    const staggerAmount = moveDuration * 0.03;
    const linearRotateDuration = 24;

    const tileStates = Array.from(tiles, () => ({ progress: 0 }));

    let isActive = false;
    let stepTimeline;
    let delayedCall;
    let activeTileIndex = -1;

    function getActiveIndex() {
      return tileStates.reduce((closest, state, index) => {
        const current = Math.min(((index - state.progress) % tileCount + tileCount) % tileCount, tileCount - (((index - state.progress) % tileCount + tileCount) % tileCount));
        const previous = Math.min(((closest - tileStates[closest].progress) % tileCount + tileCount) % tileCount, tileCount - (((closest - tileStates[closest].progress) % tileCount + tileCount) % tileCount));
        return current < previous ? index : closest;
      }, 0);
    }

    function updateTileStatus() {
      const currentActiveIndex = getActiveIndex();
      if (currentActiveIndex === activeTileIndex) return;

      activeTileIndex = currentActiveIndex;

      tiles.forEach((tile, index) => {
        tile.setAttribute(
          "data-orbit-tiles-item-status",
          index === activeTileIndex ? "active" : "not-active"
        );
      });
    }

    function renderOrbit() {
      const tileWidth = tiles[0].offsetWidth;
      const radiusX = tileWidth * radiusXMultiplier;
      const radiusY = tileWidth * radiusYMultiplier;
      const maxBlur = tileWidth * blurMultiplier;

      updateTileStatus();

      tiles.forEach((tile, index) => {
        const angle = ((index - tileStates[index].progress) / tileCount) * Math.PI * 2;
        const depth = (Math.cos(angle) + 1) / 2;
        const adjustedDepth = Math.pow(depth, 1.3);

        const scale = gsap.utils.interpolate(minScale, 1, adjustedDepth);
        const opacity = gsap.utils.interpolate(minOpacity, 1, adjustedDepth);
        const blur = gsap.utils.interpolate(maxBlur, 0, adjustedDepth);
        const brightness = gsap.utils.interpolate(minDarkness, 1, adjustedDepth);

        gsap.set(tile, {
          x: Math.sin(angle) * radiusX,
          y: Math.cos(angle) * radiusY,
          scale,
          opacity,
          filter: `blur(${blur}px) brightness(${brightness})`,
          zIndex: Math.round(adjustedDepth * 1000)
        });
      });
    }

    // Changing service rebuilds the tiles, but the list keeps the angle it
    // already reached. New tiles have to start at the opposite of that angle,
    // or they spin with the orbit instead of staying upright.
    const orbitAngle = list ? Number(gsap.getProperty(list, "rotate")) || 0 : 0;
    gsap.set(tiles, { rotate: -orbitAngle });

    const rotations = !list || linearRotateDuration === 0 ? [] : [
      gsap.to(list, {
        rotate: "+=360",
        duration: linearRotateDuration,
        ease: "none",
        repeat: -1,
        paused: true
      }),
      gsap.to(tiles, {
        rotate: "-=360",
        duration: linearRotateDuration,
        ease: "none",
        repeat: -1,
        paused: true
      })
    ];

    function goToNextTile() {
      if (!isActive) return;
      const activeIndex = getActiveIndex();
      const orderedStates = tileStates.map((state, index) => ({ state, offset: (index - activeIndex + tileCount) % tileCount })).sort((a, b) => a.offset - b.offset);

      stepTimeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          if (isActive) delayedCall = gsap.delayedCall(pauseDuration, goToNextTile);
        }
      });

      orderedStates.forEach(({ state }, index) => {
        stepTimeline.to(state, {
          progress: state.progress + 1,
          duration: moveDuration,
          ease: "osmo",
          onUpdate: renderOrbit
        }, index * staggerAmount);
      });

      stepTimeline.play();
    }

    function pauseOrbit() {
      isActive = false;
      if (stepTimeline) stepTimeline.pause();
      if (delayedCall) delayedCall.pause();
      rotations.forEach((rotation) => rotation.pause());
    }

    function destroyOrbit() {
      pauseOrbit();
      if (stepTimeline) stepTimeline.kill();
      if (delayedCall) delayedCall.kill();
      rotations.forEach((rotation) => rotation.kill());
      gsap.killTweensOf(tileStates);
      gsap.killTweensOf(tiles);
      if (list) gsap.killTweensOf(list);
      delete container._orbitTiles;
    }

    function playOrbit() {
      isActive = true;
      rotations.forEach((rotation) => rotation.play());

      if (stepTimeline && stepTimeline.progress() < 1) {
        stepTimeline.play();
      } else {
        goToNextTile();
      }
    }

    renderOrbit();

    if (pauseDuration > 0) {
      new ResizeObserver(renderOrbit).observe(container);
    }

  const controls = { play: playOrbit, pause: pauseOrbit, destroy: destroyOrbit };
  container._orbitTiles = controls;
  return controls;
}

export function setOrbitTilesPlaying(container, playing) {
  const controls = container?._orbitTiles;
  if (!controls) return;
  if (playing) controls.play();
  else controls.pause();
}

function orbitTiles() {
  document.addEventListener('barba:afterEnter', (e) => {
    const root = e.detail?.container || document;
    // Hover preview fills its tiles from the CMS, then starts them itself.
    root.querySelectorAll('[data-orbit-tiles-init]').forEach((orbit) => {
      if (orbit.closest('[data-hover-preview]')) return;
      initOrbitTiles(orbit);
    });
  });

  window.barba?.hooks?.beforeLeave?.((data) => {
    const root = data.current?.container || document;
    root.querySelectorAll('[data-orbit-tiles-init]').forEach((orbit) => {
      orbit._orbitTiles?.destroy?.();
    });
  });
}

export default orbitTiles;