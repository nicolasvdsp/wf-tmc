import { initOrbitTiles, setOrbitTilesPlaying } from './orbit-tiles';

/*
 * Hover preview
 *
 * The visible service list is the source. Each row keeps the title Webflow
 * already rendered. Description, images, and links live in that same row and
 * stay hidden; hovering or focusing a row copies them into the preview.
 *
 * The preview starts closed. Entering a row opens it: the panel scales from
 * 0.75 to 1 from the left edge and fades in. The first row scales from the
 * top-left, the last from the bottom-left, and the rows between from a point
 * on that edge that matches their place in the list. Then the description
 * lines stagger in, then the button fades up. Moving down the list staggers the current
 * description out through the bottom and the next one in from the top,
 * together. Moving up reverses that. The link updates in place; the button
 * only slides when the description gets taller or shorter. Leaving the preview
 * fades the text, the button, and the panel out together.
 * Reduced motion skips the tweens.
 *
 * The Designer panel is the mobile card and stays as it was built. On init it
 * is cloned: the original gets the desktop layout (content column, hoisted
 * button, orbit beside the text). Below 768px only the Designer panel is
 * shown. Crossing that width closes whichever preview is open.
 *
 * On mobile the Designer panel is a dialog. It slides in while fading, then
 * the description and the button enter the same way as on desktop. The cross
 * fades it closed.
 *
 * Keyboard: Tab to the list, Up/Down to move, Tab again to read the preview
 * and follow its link. The preview closes when focus leaves it, unless the
 * pointer is still inside.
 *
 * At the mobile landscape breakpoint and below, hover does not open the
 * preview. Tapping a row opens it. The close control
 * ([data-hover-preview-close], shown with .show-mobile-l-down) dismisses it.
 *
 * Markup — use a list. In Webflow, set the collection list to <ul> and each
 * collection item to <li>. A .w-dyn-item div works the same way if the tag
 * cannot be changed.
 *
 *   <div data-hover-preview>
 *     <ul data-hover-preview-source aria-label="Services">
 *       <li>
 *         <span>Brand Foundation</span>
 *         <p data-text="description">…</p>
 *         <a data-link="cases" href="/cases">View cases</a>
 *         <div data-orbit-tiles-source>
 *           <!-- Webflow multi-image list. Each nested item is one image. -->
 *           <img alt="" src="…">
 *           <img alt="" src="…">
 *         </div>
 *       </li>
 *     </ul>
 *
 *     <div data-hover-preview-panel>
 *       <div data-hover-preview-detail>
 *         <div data-orbit-tiles-init>
 *           <div data-orbit-tiles-collection>
 *             <div data-orbit-tiles-list>
 *               <div data-orbit-tiles-item><img alt=""></div>
 *             </div>
 *           </div>
 *         </div>
 *         <p data-text="description"></p>
 *         <a data-link="cases">View cases</a>
 *       </div>
 *     </div>
 *   </div>
 *
 * Give the list an accessible name (aria-label, or aria-labelledby pointing
 * at a heading). Do not put data-text, data-image, or data-link on the <li>
 * or the visible title — those attributes mark source fields and are hidden.
 * Give every meaningful image an alt in the CMS. Leave alt empty when the
 * image is decorative. The detail template is cloned once per row; its parent
 * should only contain that template. Style the current row with .is-active.
 */

let previewCounter = 0;

function initHoverPreview(container) {
  container = container || document;

  const components = container.querySelectorAll('[data-hover-preview]');
  if (!components.length) return;

  components.forEach(setupHoverPreview);
}

function setupHoverPreview(component) {
  if (component.hasAttribute('data-hover-preview-init')) return;

  const source = component.querySelector('[data-hover-preview-source]');
  const panel = component.querySelector('[data-hover-preview-panel]');
  if (!source || !panel) return;

  const items = findPreviewItems(source);
  if (!items.length) return;

  const data = extractCMSData(items);
  if (!data.length) return;

  if (!panel.querySelector('[data-hover-preview-detail]')) return;

  component.setAttribute('data-hover-preview-init', '');

  // Clone before the desktop layout changes the original. The clone keeps the
  // Designer order: title, description, button, orbit, close.
  const mobilePanel = panel.cloneNode(true);
  mobilePanel.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
  panel.setAttribute('data-hover-preview-variant', 'desktop');
  mobilePanel.setAttribute('data-hover-preview-variant', 'mobile');
  panel.after(mobilePanel);

  const cid = ++previewCounter;
  const idPrefix = `hover-preview-${cid}`;
  const list = items[0].parentElement;
  nameTablist(list, source, component);

  const mobileQuery = window.matchMedia('(max-width: 767px)');
  const pointer = { inside: false, focus: false, keyboard: false };
  const abort = new AbortController();
  component._hoverPreviewAbort = abort;

  const desktop = createPreviewView({
    component,
    panel,
    items,
    data,
    pointer,
    variant: 'desktop',
    idPrefix,
  });
  const mobile = createPreviewView({
    component,
    panel: mobilePanel,
    items,
    data,
    pointer,
    variant: 'mobile',
    idPrefix: `${idPrefix}-m`,
  });
  if (!desktop || !mobile) return;

  const active = () => (mobileQuery.matches ? mobile : desktop);

  function pointTabs() {
    const view = active();
    items.forEach((item, i) => {
      const detail = view.details[i];
      if (detail?.id) item.setAttribute('aria-controls', detail.id);
    });
  }
  pointTabs();
  if (items.length) items[0].tabIndex = 0;

  items.forEach((item, i) => {
    item.addEventListener('pointerenter', () => {
      if (mobileQuery.matches) return;
      active().show(i);
    }, { signal: abort.signal });
    item.addEventListener('focusin', () => {
      if (mobileQuery.matches) return;
      if (!pointer.focus) pointer.keyboard = true;
      pointer.focus = false;
      active().show(i);
    }, { signal: abort.signal });
    item.addEventListener('click', (e) => {
      if (mobileQuery.matches) e.preventDefault();
      active().show(i);
    }, { signal: abort.signal });
  });

  component.addEventListener('pointerenter', () => {
    if (mobileQuery.matches) return;
    pointer.inside = true;
    if (desktop.phase() === 'closing' && desktop.index() >= 0) desktop.show(desktop.index());
  }, { signal: abort.signal });
  component.addEventListener('pointerleave', () => {
    pointer.inside = false;
    if (mobileQuery.matches) return;
    desktop.requestClose();
  }, { signal: abort.signal });
  component.addEventListener('pointerdown', () => {
    pointer.focus = true;
    pointer.keyboard = false;
  }, { signal: abort.signal });
  component.addEventListener('keydown', () => { pointer.keyboard = true; }, { signal: abort.signal });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !mobileQuery.matches || mobile.phase() === 'closed') return;
    e.preventDefault();
    mobile.close();
  }, { signal: abort.signal });

  component.addEventListener('focusout', (e) => {
    if (mobileQuery.matches) return;
    if (component.contains(e.relatedTarget)) return;
    desktop.requestClose();
  }, { signal: abort.signal });

  list.addEventListener('keydown', (e) => {
    const current = items.find((item) => item === e.target || item.contains(e.target));
    if (!current) return;

    const i = items.indexOf(current);
    if (i < 0) return;

    if (e.key === 'Enter' || e.key === ' ') {
      if (e.target !== current) return;
      e.preventDefault();
      active().show(i);
      return;
    }

    let next = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % items.length;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    if (next === null || next === i) return;

    e.preventDefault();
    active().show(next);
    items[next].focus();
  }, { signal: abort.signal });

  mobileQuery.addEventListener('change', () => {
    desktop.forceClose();
    mobile.forceClose();
    pointTabs();
  }, { signal: abort.signal });

  component.setAttribute('data-hover-preview-ready', '');
}

function createPreviewView({ component, panel, items, data, pointer, variant, idPrefix }) {
  const isMobile = variant === 'mobile';
  const templateDetail = panel.querySelector('[data-hover-preview-detail]');
  if (!templateDetail) return null;

  const stack = templateDetail.parentElement;
  const details = cloneTemplate(templateDetail, data.length);

  items.forEach((item, i) => {
    const tabId = `${idPrefix}-tab-${i}`;
    const panelId = `${idPrefix}-panel-${i}`;

    const serviceName = visibleName(item);
    hideSourceFields(item);

    if (!item.id) item.id = tabId;
    item.setAttribute('role', 'tab');
    item.setAttribute('aria-controls', panelId);
    item.setAttribute('aria-selected', 'false');
    item.tabIndex = -1;
    if (item.tagName === 'BUTTON' && !item.hasAttribute('type')) item.type = 'button';

    const detail = details[i];
    detail.id = panelId;
    detail.setAttribute('role', 'tabpanel');
    detail.setAttribute('aria-labelledby', item.id);
    detail.setAttribute('aria-hidden', 'true');
    detail.inert = true;
    if (!data[i].title) data[i].title = serviceName;
    populateElement(detail, data[i]);
    labelPreviewLinks(detail, serviceName);
    detail._orbitImages = orbitSourceImages(item);
    const orbit = detail.querySelector('[data-orbit-tiles-init]');
    if (orbit) applyOrbitImages(orbit, detail._orbitImages);
  });

  // Desktop only. The mobile panel keeps the Designer order, including the
  // button inside each service and the padding on that block.
  let content = null;
  let copy = null;
  let stableButton = null;
  if (!isMobile) {
    content = document.createElement('div');
    content.setAttribute('data-hover-preview-content', '');
    const contentClasses = ['services_preview-content', 'u-vflex-left-top', 'u-gap-smedium'];
    details.forEach((detail) => {
      contentClasses.forEach((className) => detail.classList.remove(className));
    });
    content.classList.add(...contentClasses);
    const orbitSlot = stack.querySelector(':scope > [data-orbit-tiles-init]');
    if (orbitSlot) stack.insertBefore(content, orbitSlot);
    else stack.appendChild(content);

    copy = document.createElement('div');
    copy.setAttribute('data-hover-preview-copy', '');
    content.appendChild(copy);
    details.forEach((detail) => copy.appendChild(detail));

    const linkSample = details.map((detail) => detail.querySelector('[data-link]')).find(Boolean);
    if (linkSample) {
      const shell = linkSample.closest('.button-group') || linkSample;
      stableButton = shell.cloneNode(true);
      stableButton.hidden = false;
      stableButton.removeAttribute('id');
      stableButton.setAttribute('data-hover-preview-button', '');
      content.appendChild(stableButton);
      panel._hoverButton = stableButton;
      details.forEach((detail) => {
        detail.querySelectorAll('[data-link]').forEach((el) => {
          const group = el.closest('.button-group');
          if (group && detail.contains(group)) group.hidden = true;
          else el.hidden = true;
        });
      });
    }
    stack.setAttribute('data-hover-preview-stack', '');
  }

  const closeControl = panel.querySelector('[data-hover-preview-close]')
    || panel.querySelector('.show-mobile-l-down');
  if (closeControl) {
    closeControl.setAttribute('data-hover-preview-close', '');
    closeControl.setAttribute('role', 'button');
    closeControl.tabIndex = 0;
    if (!closeControl.hasAttribute('aria-label')) closeControl.setAttribute('aria-label', 'Close');
  }

  let scrollLocked = false;
  let returnFocus = null;
  let pendingCloseFocus = false;
  let backdrop = null;
  let backdropEpoch = 0;

  const gsap = window.gsap;
  const SCALE = 0.75;
  const SHELL = 0.4;
  const AFTER_OPEN = 0.05;
  const LINE_IN = 0.45;
  const LINE_STAGGER = 0.04;
  const LINE_OUT = 0.28;
  const LINE_OUT_STAGGER = 0.03;
  const SWAP = 0.5;
  const SWAP_STAGGER = 0.045;
  const SWAP_EASE = 'power3.inOut';
  const BUTTON_IN = 0.28;
  const BUTTON_AFTER_LINES = 0.08;

  let activeIndex = -1;
  let visibleIndex = -1;
  let phase = 'closed'; // closed | opening | open | closing
  let contentStarted = false;
  let openTl = null;
  let closeTl = null;
  let contentTl = null;

  if (gsap) {
    gsap.set(panel, panelClosed());
    details.forEach((detail) => gsap.set(detail, { autoAlpha: 0 }));
  }
  panel.setAttribute('aria-hidden', 'true');
  if (items.length) items[0].tabIndex = 0;

  function show(index) {
    if (index < 0 || index >= items.length) return;
    if (index === activeIndex && phase !== 'closed' && phase !== 'closing') return;

    const previous = activeIndex;
    activeIndex = index;
    if (previous >= 0 && previous !== index) setSelected(items[previous], details[previous], false);
    setSelected(items[index], details[index], true);
    const openingFresh = phase === 'closed';
    engageModal(index);
    if (openingFresh && isMobile) pendingCloseFocus = true;

    if (!gsap || reducedMotion()) {
      if (gsap) gsap.set(panel, panelOpen());
      snapContent(index);
      phase = 'open';
      contentStarted = true;
      panel.removeAttribute('aria-hidden');
      focusCloseControl();
      return;
    }

    if (phase === 'closed') {
      stageContent(index);
      open();
      return;
    }

    if (phase === 'closing') {
      closeTl?.kill();
      gsap.killTweensOf(panel);
      panel.removeAttribute('aria-hidden');
      gsap.to(panel, {
        ...panelOpen(),
        duration: 0.28,
        ease: 'power3.out',
        overwrite: 'auto',
      });
      phase = 'open';
      if (contentStarted && visibleIndex >= 0 && visibleIndex !== index) swapContent(index);
      else playContentIn({ fromCurrent: contentStarted });
      return;
    }

    if (phase === 'opening' && !contentStarted) {
      stageContent(index);
      return;
    }

    swapContent(index);
  }

  function open() {
    closeTl?.kill();
    openTl?.kill();
    phase = 'opening';
    contentStarted = false;
    panel.removeAttribute('aria-hidden');
    gsap.killTweensOf(panel);
    gsap.set(panel, panelClosed());

    openTl = gsap.timeline();
    openTl.to(panel, {
      ...panelOpen(),
      duration: SHELL,
      ease: 'power3.out',
      onComplete: focusCloseControl,
    });
    openTl.call(() => {
      if (phase !== 'opening') return;
      phase = 'open';
      playContentIn();
    }, [], `>+${AFTER_OPEN}`);
  }

  function playContentIn({ fromCurrent = false } = {}) {
    contentStarted = true;
    contentTl?.kill();
    const detail = details[activeIndex];
    if (!detail) return;
    visibleIndex = activeIndex;
    gsap.set(detail, { autoAlpha: 1 });
    syncOrbits(detail);

    const desc = detail.querySelector('[data-text="description"]');
    contentTl = gsap.timeline({
      onComplete() {
        if (desc) desc.dataset.lineState = 'in';
      },
    });
    addContentIn(contentTl, detail, 0, fromCurrent);
  }

  function swapContent(index) {
    contentTl?.kill();
    const from = visibleIndex;
    const toDetail = details[index];
    if (!toDetail) return;

    if (from < 0 || from === index || !details[from]) {
      playContentIn({ fromCurrent: from === index });
      return;
    }

    const downward = index > from;
    const fromDetail = details[from];
    const toWasVisible = Number(gsap.getProperty(toDetail, 'autoAlpha')) > 0.2;
    const outY = downward ? 110 : -110;
    const inFrom = downward ? -110 : 110;

    visibleIndex = index;
    syncButton(toDetail);
    holdButton();
    syncOrbits(toDetail);

    const out = lineTargets(fromDetail);
    const incoming = lineTargets(toDetail);
    const fromDesc = fromDetail.querySelector('[data-text="description"]');
    const toDesc = toDetail.querySelector('[data-text="description"]');
    if (fromDesc) fromDesc.dataset.lineState = 'out';
    if (toDesc && !toWasVisible) toDesc.dataset.lineState = 'out';

    details.forEach((detail, i) => {
      if (i !== from && i !== index) gsap.set(detail, { autoAlpha: 0 });
    });
    if (incoming.lines.length && !toWasVisible) {
      gsap.set(incoming.lines, { y: 0, yPercent: inFrom, autoAlpha: 1 });
    }
    gsap.set(fromDetail, { autoAlpha: 1, zIndex: 1 });
    gsap.set(toDetail, { autoAlpha: 1, zIndex: 2 });

    const nextHeight = descriptionHeight(toDetail);
    const lastLine = Math.max(out.lines.length, incoming.lines.length) - 1;
    const travel = SWAP + SWAP_STAGGER * Math.max(lastLine, 0);
    // Top-aligned lines share a delay so each pair travels as one motion.
    const delayFor = (i) => (downward ? i : Math.max(lastLine, 0) - i) * SWAP_STAGGER;

    contentTl = gsap.timeline({
      onComplete() {
        gsap.set(fromDetail, { autoAlpha: 0 });
        if (toDesc) toDesc.dataset.lineState = 'in';
      },
    });

    const lineVars = (yPercent) => ({
      yPercent, y: 0, autoAlpha: 1, duration: SWAP, ease: SWAP_EASE, overwrite: 'auto',
    });
    out.lines.forEach((line, i) => contentTl.to(line, lineVars(outY), delayFor(i)));
    incoming.lines.forEach((line, i) => contentTl.to(line, lineVars(0), delayFor(i)));
    if (copy) {
      contentTl.to(copy, { height: nextHeight, duration: travel, ease: SWAP_EASE, overwrite: 'auto' }, 0);
    }
    if (!stableButton) {
      const outButton = buttonOf(fromDetail);
      const inButton = buttonOf(toDetail);
      if (outButton) gsap.set(outButton, { autoAlpha: 0 });
      if (inButton) gsap.set(inButton, { autoAlpha: 1, y: 0 });
    }
    contentTl.set(fromDetail, { autoAlpha: 0 }, travel);
  }

  function holdButton() {
    if (!stableButton) return;
    gsap.killTweensOf(stableButton);
    gsap.set(stableButton, { autoAlpha: 1, y: 0 });
  }

  function syncButton(detail) {
    if (!stableButton) return;
    const source = detail.querySelector('[data-link]');
    const sourceAnchor = source?.matches('a') ? source : source?.querySelector('a');
    if (!source || !sourceAnchor?.getAttribute('href')) {
      stableButton.hidden = true;
      return;
    }

    stableButton.hidden = false;
    const dest = stableButton.matches('a') ? stableButton : (stableButton.querySelector('a') || stableButton);
    dest.setAttribute('href', sourceAnchor.getAttribute('href'));
    ['target', 'rel'].forEach((attr) => {
      const value = sourceAnchor.getAttribute(attr);
      if (value) dest.setAttribute(attr, value);
      else dest.removeAttribute(attr);
    });
    if (dest.innerHTML !== sourceAnchor.innerHTML) dest.innerHTML = sourceAnchor.innerHTML;
    const label = source.getAttribute('aria-label') || sourceAnchor.getAttribute('aria-label');
    if (label) dest.setAttribute('aria-label', label);
  }

  function descriptionHeight(detail) {
    // Hidden controls are display:none, so this includes a visible mobile title
    // and excludes the link that was hoisted out of the detail.
    return detail.offsetHeight;
  }

  function syncOrbits(active) {
    const playing = !!(active && !reducedMotion());
    const shared = sharedOrbit();
    if (shared) {
      if (active) showSharedOrbit(shared, active);
      setOrbitTilesPlaying(shared, playing);
      return;
    }

    details.forEach((detail) => {
      const orbit = detail.querySelector('[data-orbit-tiles-init]');
      setOrbitTilesPlaying(orbit, playing && detail === active);
    });
  }

  function sharedOrbit() {
    return [...panel.querySelectorAll('[data-orbit-tiles-init]')].find((orbit) => (
      !orbit.closest('[data-hover-preview-detail]')
    ));
  }

  function showSharedOrbit(orbit, detail) {
    const images = detail._orbitImages || [];
    const signature = orbitSignature(images);
    if (orbit._orbitSignature === signature) return;
    applyOrbitImages(orbit, images);
  }

  function setCopyHeight(detail) {
    if (!gsap || !copy || !content) return;
    gsap.killTweensOf(copy);
    copy.style.height = '';
    content.style.height = '';
    const height = descriptionHeight(detail);
    if (height) gsap.set(copy, { height });
  }

  function addContentIn(tl, detail, position, fromCurrent) {
    const { lines, masked } = lineTargets(detail);
    const button = buttonOf(detail);

    if (lines.length) {
      if (!fromCurrent) {
        if (masked) gsap.set(lines, { yPercent: 110 });
        else gsap.set(lines, { autoAlpha: 0, y: 16 });
      }
      const vars = masked
        ? { yPercent: 0, duration: LINE_IN, stagger: LINE_STAGGER, ease: 'expo.out', overwrite: 'auto' }
        : { autoAlpha: 1, y: 0, duration: LINE_IN, stagger: LINE_STAGGER, ease: 'expo.out', overwrite: 'auto' };
      tl.to(lines, vars, position);
    }

    if (button) {
      if (!fromCurrent) gsap.set(button, { autoAlpha: 0, y: 16 });
      tl.to(button, {
        autoAlpha: 1, y: 0, duration: BUTTON_IN, ease: 'power3.out', overwrite: 'auto',
      }, offset(position, BUTTON_AFTER_LINES));
    }
  }

  function addContentOut(tl, detail, position, linesOnly) {
    const { lines } = lineTargets(detail);
    const button = linesOnly ? null : buttonOf(detail);
    const desc = detail.querySelector('[data-text="description"]');
    if (desc) desc.dataset.lineState = 'out';

    if (button) {
      tl.to(button, {
        autoAlpha: 0, duration: 0.22, ease: 'power3.in', overwrite: 'auto',
      }, position);
    }
    if (!lines.length) return;
    tl.to(lines, {
      autoAlpha: 0, duration: LINE_OUT, stagger: LINE_OUT_STAGGER, ease: 'power3.in', overwrite: 'auto',
    }, position);
  }

  function offset(position, amount) {
    if (!amount) return position;
    if (typeof position === 'number') return position + amount;
    return `${position}+=${amount}`;
  }

  function close() {
    if (phase === 'closed' || phase === 'closing') return;
    pendingCloseFocus = false;

    const started = contentStarted;
    openTl?.kill();
    contentTl?.kill();
    phase = 'closing';
    if (isMobile) fadeBackdrop();

    if (!gsap || reducedMotion()) {
      finishClose();
      return;
    }

    closeTl?.kill();
    closeTl = gsap.timeline({ onComplete: finishClose });

    if (started) {
      const current = visibleIndex >= 0 ? visibleIndex : activeIndex;
      const shown = details.filter((detail) => Number(gsap.getProperty(detail, 'autoAlpha')) > 0.01);
      if (!shown.length && details[current]) shown.push(details[current]);
      shown.forEach((detail) => addContentOut(closeTl, detail, 0, true));
      const button = buttonOf(details[current] || shown[0]);
      if (button) {
        closeTl.to(button, {
          autoAlpha: 0, duration: 0.22, ease: 'power3.in', overwrite: 'auto',
        }, 0);
      }
    }

    closeTl.to(panel, {
      autoAlpha: 0,
      duration: SHELL,
      ease: 'power3.in',
      overwrite: 'auto',
    }, 0);
  }

  function finishClose() {
    if (phase !== 'closing') return;
    phase = 'closed';
    contentStarted = false;
    visibleIndex = -1;
    const previous = activeIndex;
    if (previous >= 0) setSelected(items[previous], details[previous], false);
    activeIndex = -1;
    if (items.length) items[Math.max(previous, 0)].tabIndex = 0;
    if (gsap) gsap.set(panel, panelClosed());
    syncOrbits(null);
    panel.setAttribute('aria-hidden', 'true');
    const restore = returnFocus;
    returnFocus = null;
    releaseModal();
    if (restore?.isConnected) restore.focus({ preventScroll: true });
  }

  function scaleOrigin() {
    const last = items.length - 1;
    if (last <= 0) return '0% 0%';
    const index = Math.min(Math.max(activeIndex, 0), last);
    return `0% ${(index / last) * 100}%`;
  }

  function panelClosed() {
    if (isMobile) return { yPercent: 25, autoAlpha: 0, scale: 1 };
    return { yPercent: 0, scale: SCALE, autoAlpha: 0, transformOrigin: scaleOrigin() };
  }

  function panelOpen() {
    if (isMobile) return { yPercent: 0, autoAlpha: 1, scale: 1 };
    return { yPercent: 0, scale: 1, autoAlpha: 1, transformOrigin: scaleOrigin() };
  }

  function engageModal(index) {
    if (!isMobile) return;
    panel.setAttribute('data-hover-preview-modal', '');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    const title = details[index]?.querySelector('[data-text="title"]');
    if (title) {
      if (!title.id) title.id = `${idPrefix}-title`;
      panel.setAttribute('aria-labelledby', title.id);
    }
    returnFocus = items[index];
    showBackdrop();
    if (!scrollLocked) {
      scrollLocked = true;
      window.lenis?.stop();
      document.documentElement.style.overflow = 'hidden';
    }
  }

  function showBackdrop() {
    backdropEpoch += 1;
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.setAttribute('data-hover-preview-backdrop', '');
      document.body.appendChild(backdrop);
    }
    const layer = backdrop;
    requestAnimationFrame(() => layer?.setAttribute('data-open', ''));
    fitPanelToFrame();
  }

  function fitPanelToFrame() {
    if (panel._frameStyle) return;
    const transform = panel.style.transform;
    panel.style.transform = 'none';
    const rect = panel.getBoundingClientRect();
    panel.style.transform = transform;
    panel._frameStyle = {
      parent: panel.parentElement,
      next: panel.nextSibling,
    };
    // Pin the Designer box above the glass. Percentage min-height would
    // otherwise grow to the viewport once the panel leaves its parent.
    panel.style.position = 'fixed';
    panel.style.top = `${rect.top}px`;
    panel.style.left = `${rect.left}px`;
    panel.style.width = `${rect.width}px`;
    panel.style.height = `${rect.height}px`;
    panel.style.minHeight = '0px';
    panel.style.zIndex = '50';
    panel.style.margin = '0';
    document.body.appendChild(panel);
  }

  function clearFrame() {
    const home = panel._frameStyle;
    if (!home) return;
    panel.style.position = '';
    panel.style.top = '';
    panel.style.left = '';
    panel.style.width = '';
    panel.style.height = '';
    panel.style.minHeight = '';
    panel.style.zIndex = '';
    panel.style.margin = '';
    if (home.parent?.isConnected) home.parent.insertBefore(panel, home.next);
    panel._frameStyle = null;
  }

  function fadeBackdrop() {
    if (!backdrop) return;
    const layer = backdrop;
    const epoch = backdropEpoch;
    layer.removeAttribute('data-open');
    if (reducedMotion()) {
      layer.remove();
      if (backdrop === layer) backdrop = null;
      return;
    }

    const done = () => {
      if (epoch !== backdropEpoch || backdrop !== layer) return;
      layer.remove();
      backdrop = null;
    };
    layer.addEventListener('transitionend', (event) => {
      if (event.target !== layer || event.propertyName !== 'opacity') return;
      done();
    });
    window.setTimeout(done, 500);
  }

  function hideBackdrop() {
    clearFrame();
    fadeBackdrop();
  }

  function focusCloseControl() {
    if (!pendingCloseFocus || phase === 'closing' || phase === 'closed') {
      pendingCloseFocus = false;
      return;
    }
    pendingCloseFocus = false;
    closeControl?.focus({ preventScroll: true });
  }

  function releaseModal() {
    hideBackdrop();
    panel.removeAttribute('data-hover-preview-modal');
    panel.removeAttribute('role');
    panel.removeAttribute('aria-modal');
    panel.removeAttribute('aria-labelledby');
    if (!scrollLocked) return;
    scrollLocked = false;
    document.documentElement.style.overflow = '';
    window.lenis?.start();
  }

  function stageContent(index) {
    details.forEach((detail, i) => {
      const on = i === index;
      if (gsap) gsap.set(detail, { autoAlpha: on ? 1 : 0 });
      if (!on) return;
      visibleIndex = index;
      syncButton(detail);
      const desc = detail.querySelector('[data-text="description"]');
      if (desc) desc.dataset.lineState = 'out';
      const { lines, masked } = lineTargets(detail);
      if (gsap && lines.length) {
        if (masked) gsap.set(lines, { yPercent: 110 });
        else gsap.set(lines, { autoAlpha: 0, y: 16 });
      }
      setCopyHeight(detail);
      const button = buttonOf(detail);
      if (gsap && button) gsap.set(button, { autoAlpha: 0, y: 16 });
      syncOrbits(detail);
    });
  }

  function snapContent(index) {
    contentTl?.kill();
    visibleIndex = index;
    details.forEach((detail, i) => {
      const on = i === index;
      if (gsap) gsap.set(detail, { autoAlpha: on ? 1 : 0 });
      if (!on) return;
      syncButton(detail);
      const desc = detail.querySelector('[data-text="description"]');
      if (desc) desc.dataset.lineState = 'in';
      const { lines, masked } = lineTargets(detail);
      if (gsap && lines.length) {
        if (masked) gsap.set(lines, { yPercent: 0 });
        else gsap.set(lines, { autoAlpha: 1, y: 0 });
      }
      setCopyHeight(detail);
      const button = buttonOf(detail);
      if (gsap && button) gsap.set(button, { autoAlpha: 1, y: 0 });
      syncOrbits(detail);
    });
  }

  function requestClose() {
    if (pointer.inside) return;
    if (pointer.keyboard && component.contains(document.activeElement)) return;
    close();
  }

  function forceClose() {
    openTl?.kill();
    closeTl?.kill();
    contentTl?.kill();
    gsap?.killTweensOf(panel);
    if (phase === 'closed') return;
    pendingCloseFocus = false;
    phase = 'closing';
    finishClose();
  }

  const signal = component._hoverPreviewAbort?.signal;
  closeControl?.addEventListener('click', (e) => {
    e.preventDefault();
    close();
  }, { signal });
  closeControl?.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    close();
  }, { signal });

  return {
    show,
    close,
    requestClose,
    forceClose,
    details,
    panel,
    phase: () => phase,
    index: () => activeIndex,
  };
}

function buttonOf(detail) {
  const stable = detail?.closest('[data-hover-preview-panel]')?._hoverButton;
  if (stable) return stable.hidden ? null : stable;
  const el = detail?.querySelector('[data-link]');
  if (!el || el.hidden) return null;
  return el;
}

function lineTargets(detail) {
  const el = detail?.querySelector('[data-text="description"]');
  if (!el) return { lines: [], masked: false };

  const split = splitDescription(el);
  if (split?.lines?.length) return { lines: [...split.lines], masked: true };
  return { lines: [el], masked: false };
}

function splitDescription(el) {
  if (el._hoverSplit) return el._hoverSplit;

  const SplitText = window.SplitText;
  const gsap = window.gsap;
  if (!SplitText?.create || !gsap) return null;

  let created = null;
  SplitText.create(el, {
    type: 'lines',
    mask: 'lines',
    autoSplit: true,
    linesClass: 'line',
    onSplit(self) {
      created = self;
      el._hoverSplit = self;
      gsap.set(self.lines, { paddingBottom: '0.15em', marginBottom: '-0.15em' });
      gsap.set(self.lines, { yPercent: el.dataset.lineState === 'in' ? 0 : 110 });
    },
  });

  if (created) el._hoverSplit = created;
  return el._hoverSplit || null;
}

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function setSelected(item, detail, selected) {
  item.classList.toggle('is-active', selected);
  item.setAttribute('aria-selected', String(selected));
  item.tabIndex = selected ? 0 : -1;

  detail.classList.toggle('is-active', selected);
  detail.inert = !selected;
  if (selected) {
    detail.removeAttribute('aria-hidden');
    // Lets a keyboard user Tab from the row into the preview and hear its text,
    // including when the only content is a paragraph.
    detail.tabIndex = 0;
  } else {
    detail.setAttribute('aria-hidden', 'true');
    detail.removeAttribute('tabindex');
  }
}

function findPreviewItems(source) {
  // A multi-image field is a collection list inside the service item, so its
  // .w-dyn-item nodes are images, not extra services.
  const dynItems = [...source.querySelectorAll('.w-dyn-item')].filter((item) => (
    !item.parentElement?.closest('.w-dyn-item')
  ));
  if (dynItems.length) return dynItems;

  const marked = [...source.querySelectorAll('[data-hover-preview-item]')].filter((item) => (
    !item.parentElement?.closest('[data-hover-preview-item]')
  ));
  if (marked.length) return marked;

  return [...source.querySelectorAll('li')].filter((item) => (
    !item.parentElement?.closest('li')
  ));
}

function nameTablist(list, source, component) {
  // Overwrite Webflow's role="list" — once enhanced, this is a tablist.
  list.setAttribute('role', 'tablist');
  setIfMissing(list, 'aria-orientation', 'vertical');

  if (list.hasAttribute('aria-label') || list.hasAttribute('aria-labelledby')) return;

  const label = source.getAttribute('aria-label') || component.getAttribute('aria-label');
  if (label) list.setAttribute('aria-label', label);
}

function visibleName(item) {
  const clone = item.cloneNode(true);
  clone.querySelectorAll('[data-text], [data-image], [data-link], [data-orbit-tiles-source], svg, script').forEach((el) => el.remove());
  return clone.textContent.replace(/\s+/g, ' ').trim();
}

function hideSourceFields(item) {
  item.querySelectorAll('[data-text], [data-image], [data-link], [data-orbit-tiles-source]').forEach((el) => {
    if (el !== item) el.hidden = true;
  });
}

function orbitSourceImages(item) {
  const images = [];
  item.querySelectorAll('[data-orbit-tiles-source]').forEach((source) => {
    if (source.tagName === 'IMG') images.push(source);
    else images.push(...source.querySelectorAll('img'));
  });

  return images.filter((img) => (
    !img.closest('.w-dyn-empty') && (img.getAttribute('src') || img.getAttribute('srcset'))
  ));
}

function orbitSignature(images) {
  return images.map((img) => img.getAttribute('src') || img.getAttribute('srcset') || '').join('|');
}

function applyOrbitImages(orbit, images) {
  const list = orbit.querySelector('[data-orbit-tiles-list]');
  const existing = list ? [...list.querySelectorAll(':scope > [data-orbit-tiles-item]')] : [];
  const template = existing[0];
  if (!list || !template) return;

  orbit._orbitTiles?.destroy?.();

  if (!images.length) {
    orbit.hidden = true;
    orbit._orbitSignature = '';
    return;
  }

  orbit.hidden = false;
  existing.slice(1).forEach((tile) => tile.remove());
  const anchor = template.nextSibling;
  images.forEach((img) => {
    const tile = template.cloneNode(true);
    const target = tile.tagName === 'IMG' ? tile : tile.querySelector('img');
    if (target) copyImage(target, img);
    list.insertBefore(tile, anchor);
  });
  template.remove();
  orbit._orbitSignature = orbitSignature(images);
  initOrbitTiles(orbit);
}

function copyImage(target, img) {
  const src = img.getAttribute('src');
  if (src) target.src = src;
  target.alt = img.getAttribute('alt') || '';
  target.loading = 'eager';

  const srcset = img.getAttribute('srcset');
  if (srcset) target.setAttribute('srcset', srcset);
  else target.removeAttribute('srcset');

  const sizes = img.getAttribute('sizes');
  if (sizes) target.setAttribute('sizes', sizes);
  else target.removeAttribute('sizes');
}

function labelPreviewLinks(detail, serviceName) {
  if (!serviceName) return;

  detail.querySelectorAll('a[href]').forEach((a) => {
    if (a.hidden || a.closest('[hidden]')) return;
    if (a.hasAttribute('aria-label')) return;
    const text = a.textContent.trim();
    if (!text) return;
    a.setAttribute('aria-label', `${text} for ${serviceName}`);
  });
}

function setIfMissing(el, attr, value) {
  if (!el.hasAttribute(attr)) el.setAttribute(attr, value);
}

function cloneTemplate(template, count) {
  const parent = template.parentElement;
  const anchor = template.nextSibling;
  const clones = [];

  for (let i = 0; i < count; i++) {
    const clone = template.cloneNode(true);
    parent.insertBefore(clone, anchor);
    clones.push(clone);
  }

  template.remove();
  return clones;
}

function extractCMSData(items) {
  const data = [];

  items.forEach((item) => {
    const entry = {};

    item.querySelectorAll('[data-text]').forEach((el) => {
      entry[el.getAttribute('data-text')] = el.textContent.trim();
    });

    item.querySelectorAll('[data-image]').forEach((el) => {
      const img = el.tagName === 'IMG' ? el : el.querySelector('img');
      const key = el.getAttribute('data-image');
      entry[key] = img?.getAttribute('src') || '';
      entry[`${key}:srcset`] = img?.getAttribute('srcset') || '';
      entry[`${key}:sizes`] = img?.getAttribute('sizes') || '';
      entry[`${key}:alt`] = img?.getAttribute('alt') || '';
    });

    item.querySelectorAll('[data-link]').forEach((el) => {
      const a = el.tagName === 'A' ? el : el.querySelector('a');
      const key = el.getAttribute('data-link');
      entry[key] = a?.getAttribute('href') || '';
      entry[`${key}:target`] = a?.getAttribute('target') || '';
      entry[`${key}:rel`] = a?.getAttribute('rel') || '';
    });

    data.push(entry);
  });

  return data;
}

function populateElement(container, data) {
  container.querySelectorAll('[data-text]').forEach((el) => {
    const value = data[el.getAttribute('data-text')];
    if (value != null) el.textContent = value;
  });

  container.querySelectorAll('[data-image]').forEach((el) => {
    const key = el.getAttribute('data-image');
    const value = data[key];
    if (!value) {
      el.hidden = true;
      const placeholder = el.tagName === 'IMG' ? el : el.querySelector('img');
      if (placeholder) {
        placeholder.removeAttribute('src');
        placeholder.removeAttribute('srcset');
      }
      return;
    }

    el.hidden = false;
    const img = el.tagName === 'IMG' ? el : el.querySelector('img');
    if (!img) return;

    img.loading = 'eager';
    img.src = value;
    img.alt = data[`${key}:alt`] || '';

    const srcset = data[`${key}:srcset`];
    if (srcset) img.setAttribute('srcset', srcset);
    else img.removeAttribute('srcset');

    const sizes = data[`${key}:sizes`];
    if (sizes) img.setAttribute('sizes', sizes);
    else img.removeAttribute('sizes');
  });

  container.querySelectorAll('[data-link]').forEach((el) => {
    const key = el.getAttribute('data-link');
    const value = data[key];
    const a = el.tagName === 'A' ? el : el.querySelector('a');
    if (!a) return;

    if (!value) {
      el.hidden = true;
      return;
    }

    el.hidden = false;
    a.setAttribute('href', value);

    const target = data[`${key}:target`];
    if (target) a.setAttribute('target', target);

    const rel = data[`${key}:rel`];
    if (rel) a.setAttribute('rel', rel);
  });
}

function hoverPreview() {
  document.addEventListener('barba:afterEnter', (e) => {
    initHoverPreview(e.detail.container);
  });

  // The orbit loop repeats forever. Stop it with the page that owns it,
  // before Barba removes that container.
  window.barba?.hooks?.beforeLeave?.((data) => {
    document.querySelectorAll('[data-hover-preview-modal]').forEach((panel) => {
      const home = panel._frameStyle;
      if (home?.parent?.isConnected) home.parent.insertBefore(panel, home.next);
    });
    document.querySelectorAll('[data-hover-preview-backdrop]').forEach((layer) => layer.remove());
    const root = data.current?.container || document;
    root.querySelectorAll('[data-hover-preview]').forEach((el) => el._hoverPreviewAbort?.abort());
    root.querySelectorAll('[data-orbit-tiles-init]').forEach((orbit) => {
      orbit._orbitTiles?.destroy?.();
    });
  });
}

export default hoverPreview;
