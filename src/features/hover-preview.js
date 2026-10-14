/*
 * Hover preview
 *
 * The visible service list is the source. Each row keeps the title Webflow
 * already rendered. Description, images, and links live in that same row and
 * stay hidden; hovering or focusing a row copies them into the preview.
 *
 * The preview starts closed. Entering a row opens it: the panel scales from
 * 0.75 to 1 from the center and fades in, then the description lines stagger
 * in, then the button fades up. Moving down the list staggers the current
 * description out through the bottom and the next one in from the top,
 * together. Moving up reverses that. The link updates in place; the button
 * only slides when the description gets taller or shorter. Leaving both
 * staggers the lines out and scales the panel closed at the same time.
 * Reduced motion skips the tweens.
 *
 * Keyboard: Tab to the list, Up/Down to move, Tab again to read the preview
 * and follow its link. The preview closes when focus leaves it, unless the
 * pointer is still inside.
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
 *         <img data-image="image" alt="Enoki badge" src="…">
 *       </li>
 *     </ul>
 *
 *     <div data-hover-preview-panel>
 *       <div data-hover-preview-detail>
 *         <p data-text="description"></p>
 *         <a data-link="cases">View cases</a>
 *         <img data-image="image" alt="">
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

  const templateDetail = panel.querySelector('[data-hover-preview-detail]');
  if (!templateDetail) return;

  component.setAttribute('data-hover-preview-init', '');

  const cid = ++previewCounter;
  const idPrefix = `hover-preview-${cid}`;
  const list = items[0].parentElement;
  nameTablist(list, source, component);

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
    populateElement(detail, data[i]);
    labelPreviewLinks(detail, serviceName);
  });

  // One link stays put, including a .button-group around it. Descriptions
  // stack behind it and swap on their own. The group has to move with the
  // link: the copy area is clipped to the description height.
  const copy = document.createElement('div');
  copy.setAttribute('data-hover-preview-copy', '');
  stack.appendChild(copy);
  details.forEach((detail) => copy.appendChild(detail));

  let stableButton = null;
  const linkSample = details.map((detail) => detail.querySelector('[data-link]')).find(Boolean);
  if (linkSample) {
    const shell = linkSample.closest('.button-group') || linkSample;
    stableButton = shell.cloneNode(true);
    stableButton.hidden = false;
    stableButton.removeAttribute('id');
    stableButton.setAttribute('data-hover-preview-button', '');
    stack.appendChild(stableButton);
    panel._hoverButton = stableButton;
    details.forEach((detail) => {
      detail.querySelectorAll('[data-link]').forEach((el) => {
        const group = el.closest('.button-group');
        if (group && detail.contains(group)) group.hidden = true;
        else el.hidden = true;
      });
    });
    const gap = getComputedStyle(details[0]).rowGap;
    if (gap && gap !== 'normal') stableButton.style.marginTop = gap;
  }

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
  let pointerInside = false;
  let pointerFocus = false;
  let usingKeyboard = false;
  let openTl = null;
  let closeTl = null;
  let contentTl = null;

  if (gsap) {
    gsap.set(panel, { scale: SCALE, autoAlpha: 0, transformOrigin: 'center center' });
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

    if (!gsap || reducedMotion()) {
      if (gsap) gsap.set(panel, { scale: 1, autoAlpha: 1 });
      snapContent(index);
      phase = 'open';
      contentStarted = true;
      panel.removeAttribute('aria-hidden');
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
        scale: 1,
        autoAlpha: 1,
        duration: 0.28,
        ease: 'power3.out',
        overwrite: 'auto',
        transformOrigin: 'center center',
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
    gsap.set(panel, { scale: SCALE, autoAlpha: 0, transformOrigin: 'center center' });

    openTl = gsap.timeline();
    openTl.to(panel, { scale: 1, autoAlpha: 1, duration: SHELL, ease: 'power3.out' });
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
    contentTl.to(copy, { height: nextHeight, duration: travel, ease: SWAP_EASE, overwrite: 'auto' }, 0);
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
    return detail.querySelector('[data-text="description"]')?.offsetHeight || 0;
  }

  function setCopyHeight(detail) {
    if (!gsap) return;
    gsap.set(copy, { height: descriptionHeight(detail) });
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
    const { lines, masked } = lineTargets(detail);
    const button = linesOnly ? null : buttonOf(detail);
    const desc = detail.querySelector('[data-text="description"]');
    if (desc) desc.dataset.lineState = 'out';

    if (button) {
      tl.to(button, {
        autoAlpha: 0, y: 16, duration: 0.22, ease: 'power3.in', overwrite: 'auto',
      }, position);
    }
    if (!lines.length) return;
    const vars = masked
      ? { yPercent: 110, duration: LINE_OUT, stagger: LINE_OUT_STAGGER, ease: 'power3.in', overwrite: 'auto' }
      : { autoAlpha: 0, y: 16, duration: LINE_OUT, ease: 'power3.in', overwrite: 'auto' };
    tl.to(lines, vars, position);
  }

  function offset(position, amount) {
    if (!amount) return position;
    if (typeof position === 'number') return position + amount;
    return `${position}+=${amount}`;
  }

  function close() {
    if (phase === 'closed' || phase === 'closing') return;

    const started = contentStarted;
    openTl?.kill();
    contentTl?.kill();
    phase = 'closing';

    if (!gsap || reducedMotion() || !started) {
      closeTl?.kill();
      if (!gsap || reducedMotion()) {
        finishClose();
        return;
      }
      closeTl = gsap.timeline({ onComplete: finishClose });
      closeTl.to(panel, {
        scale: SCALE, autoAlpha: 0, duration: SHELL, ease: 'power3.in', overwrite: 'auto',
      });
      return;
    }

    const current = visibleIndex >= 0 ? visibleIndex : activeIndex;
    const shown = details.filter((detail) => Number(gsap.getProperty(detail, 'autoAlpha')) > 0.01);
    if (!shown.length && details[current]) shown.push(details[current]);
    closeTl = gsap.timeline({ onComplete: finishClose });
    shown.forEach((detail) => addContentOut(closeTl, detail, 0, true));
    const button = buttonOf(details[current] || shown[0]);
    if (button) {
      closeTl.to(button, {
        autoAlpha: 0, y: 16, duration: 0.22, ease: 'power3.in', overwrite: 'auto',
      }, 0);
    }
    closeTl.to(panel, {
      scale: SCALE,
      autoAlpha: 0,
      duration: SHELL,
      ease: 'power3.in',
      transformOrigin: 'center center',
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
    if (gsap) gsap.set(panel, { autoAlpha: 0, scale: SCALE });
    panel.setAttribute('aria-hidden', 'true');
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
    });
  }

  function requestClose() {
    if (pointerInside) return;
    if (usingKeyboard && component.contains(document.activeElement)) return;
    close();
  }

  items.forEach((item, i) => {
    item.addEventListener('pointerenter', () => show(i));
    item.addEventListener('focusin', () => {
      if (!pointerFocus) usingKeyboard = true;
      pointerFocus = false;
      show(i);
    });
    item.addEventListener('click', () => show(i));
  });

  component.addEventListener('pointerenter', () => {
    pointerInside = true;
    if (phase === 'closing' && activeIndex >= 0) show(activeIndex);
  });
  component.addEventListener('pointerleave', () => {
    pointerInside = false;
    requestClose();
  });
  component.addEventListener('pointerdown', () => {
    pointerFocus = true;
    usingKeyboard = false;
  });
  component.addEventListener('keydown', () => { usingKeyboard = true; });
  component.addEventListener('focusout', (e) => {
    if (component.contains(e.relatedTarget)) return;
    requestClose();
  });

  list.addEventListener('keydown', (e) => {
    const current = items.find((item) => item === e.target || item.contains(e.target));
    if (!current) return;

    const i = items.indexOf(current);
    if (i < 0) return;

    // Space on a non-button tab would otherwise scroll the page.
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.target !== current) return;
      e.preventDefault();
      show(i);
      return;
    }

    let next = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % items.length;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    if (next === null || next === i) return;

    e.preventDefault();
    show(next);
    items[next].focus();
  });

  stack.setAttribute('data-hover-preview-stack', '');
  component.setAttribute('data-hover-preview-ready', '');
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
  const dynItems = source.querySelectorAll('.w-dyn-item');
  if (dynItems.length) return [...dynItems];

  const marked = source.querySelectorAll('[data-hover-preview-item]');
  if (marked.length) return [...marked];

  return [...source.querySelectorAll('li')];
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
  clone.querySelectorAll('[data-text], [data-image], [data-link]').forEach((el) => el.remove());
  return clone.textContent.replace(/\s+/g, ' ').trim();
}

function hideSourceFields(item) {
  item.querySelectorAll('[data-text], [data-image], [data-link]').forEach((el) => {
    if (el !== item) el.hidden = true;
  });
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
}

export default hoverPreview;
