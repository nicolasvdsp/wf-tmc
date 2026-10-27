function initCursorMarqueeEffect() {
  const hoverOutDelay = 0.4;
  const followDuration = 0.4;
  const speedMultiplier = 5;

  const cursor = document.querySelector('[data-cursor-marquee-status]');
  if (!cursor) return;
  cursor.setAttribute('data-cursor-marquee-status', 'not-active');
  const targets = cursor.querySelectorAll('[data-cursor-marquee-text-target]');
  mountIcons(cursor, targets);

  const xTo = gsap.quickTo(cursor, 'x', { duration: followDuration, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: followDuration, ease: 'power3' });

  let pauseTimeout = null;
  let activeEl = null;
  let lastX = 0;
  let lastY = 0;

  function playFor(el) {
    if (!el) return;
    if (pauseTimeout) clearTimeout(pauseTimeout);
    const text = el.getAttribute('data-cursor-marquee-text') || '';
    const sec = (text.length || 1) / speedMultiplier;
    targets.forEach(t => {
      setTargetText(t, text);
      t.style.animationPlayState = 'running';
      t.style.animationDuration = sec + 's';
    });
    cursor.setAttribute('data-cursor-marquee-status', 'active');
    activeEl = el;
  }

  function pauseLater() {
    cursor.setAttribute('data-cursor-marquee-status', 'not-active');
    if (pauseTimeout) clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
      targets.forEach(t => {
        t.style.animationPlayState = 'paused';
      });
    }, hoverOutDelay * 1000);
    activeEl = null;
  }

  function checkTarget() {
    const el = document.elementFromPoint(lastX, lastY);
    const hit = el && el.closest('[data-cursor-marquee-text]');
    if (hit !== activeEl) {
      if (activeEl) pauseLater();
      if (hit) playFor(hit);
    }
  }

  window.addEventListener('pointermove', e => {
    lastX = e.clientX;
    lastY = e.clientY;
    xTo(lastX);
    yTo(lastY);
    checkTarget();
  }, { passive: true });

  window.addEventListener('scroll', () => {
    xTo(lastX);
    yTo(lastY);
    checkTarget();
  }, { passive: true });
}

function setTargetText(target, text) {
  const textNode = [...target.childNodes].find(node => node.nodeType === Node.TEXT_NODE);
  if (textNode) {
    textNode.nodeValue = text;
    return;
  }
  target.insertBefore(document.createTextNode(text), target.firstChild);
}

function mountIcons(cursor, targets) {
  const card = cursor.querySelector('.cursor-marquee__card') || cursor;
  const icons = [...card.children].filter(el => !el.hasAttribute('data-cursor-marquee-text-target'));
  if (!icons.length || !targets.length) return;

  targets.forEach(target => {
    target.style.display = 'inline-flex';
    target.style.alignItems = 'center';
    icons.forEach(icon => target.appendChild(icon.cloneNode(true)));
  });

  icons.forEach(icon => icon.remove());
}

export default initCursorMarqueeEffect;