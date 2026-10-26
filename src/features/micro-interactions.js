function alianInteraction(container) {
  container = container || document;
  const folder = container.querySelector('[data-icon-type="folder"]');
  if (!folder) return;
  const alian = folder.querySelector('[data-icon-type="alian"]');

  gsap.set(alian, { xPercent: 0, yPercent: 0, x: 0, y: 0 });

  let isOpen = false;
  let autoCloseTimer = null;

  function close() {
    gsap.to(alian, {
      duration: 0.5,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      ease: "power2.inOut"
    });
    gsap.to(folder, {
      duration: 0.5,
      rotate: 0,
      ease: "power2.inOut"
    });
    isOpen = false;
    clearTimeout(autoCloseTimer);
  }

  folder.addEventListener("click", function () {
    clearTimeout(autoCloseTimer);

    if (!isOpen) {
      const iconFolderWidth = parseFloat(window.getComputedStyle(folder).width);
      const moveX = iconFolderWidth * 0.305;
      const moveY = -iconFolderWidth * 0.61;

      gsap.to(alian, {
        duration: .6,
        x: moveX,
        y: moveY,
        rotation: 135,
        scale: 1.5,
        ease: "back.out"
      });
      gsap.to(folder, {
        duration: .6,
        rotate: 15,
        ease: "back.out"
      });
      isOpen = true;
      autoCloseTimer = setTimeout(close, 3000);
    } else {
      close();
    }
  });
}

function dragJoystick(container) {
  container = container || document;
  const joystick = container.querySelector('[data-icon-type="stick"]');
  if (!joystick) return;


  const maxRotation = 15; // Max 15 graden naar links/rechts
  const centerX = window.innerWidth / 2; // Center van het scherm (horizontaal)

  joystick.style.transformOrigin = "50% 55%";

  document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX; // Muispositie op de X-as
    const deltaX = mouseX - centerX;
    const rotation = Math.max(-maxRotation, Math.min(maxRotation, deltaX / 10)); // deltaX wordt gedeeld om de rotatie geleidelijker te maken

    // Gebruik GSAP om de rotatie van de joystick te veranderen
    gsap.to(joystick, { rotation: rotation, ease: "linear" });
  });
}

function initAnalogClock(container) {
  container = container || document;
  const clocks = container.querySelectorAll('[data-analog-clock-init]');
  if (!clocks.length) return;

  const defaultTimezone = 'Europe/Amsterdam';

  clocks.forEach((clock) => {
    const timezone = clock.getAttribute('data-analog-clock-init') || defaultTimezone;
    const hourHand = clock.querySelector('[data-analog-clock-hour]');
    const minuteHand = clock.querySelector('[data-analog-clock-minute]');
    const secondHand = clock.querySelector('[data-analog-clock-second]');

    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    let previousSecond;
    let secondRotation;

    function updateClock() {
      const now = new Date();
      const parts = Object.fromEntries(
        formatter.formatToParts(now).map((part) => [part.type, part.value])
      );

      const hours = Number(parts.hour);
      const minutes = Number(parts.minute);
      const seconds = Number(parts.second);
      const milliseconds = now.getMilliseconds();

      const smoothSeconds = seconds + milliseconds / 1000;
      const smoothMinutes = minutes + smoothSeconds / 60;
      const smoothHours = (hours % 12) + smoothMinutes / 60;

      if (hourHand) hourHand.style.transform = `rotate(${smoothHours * 30}deg)`;
      if (minuteHand) minuteHand.style.transform = `rotate(${smoothMinutes * 6}deg)`;

      if (secondHand && seconds !== previousSecond) {
        if (previousSecond === undefined) {
          secondRotation = seconds * 6;
          secondHand.style.transition = 'none';
          secondHand.style.transform = `rotate(${secondRotation}deg)`;
          secondHand.offsetHeight;
          secondHand.style.transition = '';
        } else {
          secondRotation += 6;
          secondHand.style.transform = `rotate(${secondRotation}deg)`;
        }

        previousSecond = seconds;
      }

      requestAnimationFrame(updateClock);
    }

    updateClock();
    console.log('updateClock');
  });
}

let emojiAnimationRunning = false;

function initEmojiRain(emojiTypes, emojiContainer) {
  if (emojiAnimationRunning) return;

  emojiAnimationRunning = true;

  const emojiContainerHeight = emojiContainer.offsetHeight;
  const emojiQuantity = 20;

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const createEmojiElement = () => {
    const emojiScale = Math.random() * 0.6 + 0.4;
    const emojiRotate = getRandomInt(1, 5);
    const emojiDelay = 0.001 * getRandomInt(0, 1250);
    const emojiSpeed = getRandomInt(800, 1200) * 0.001;
    const emojiPosition = `${getRandomInt(0, 10)}0%`;
    const emojiClass = `single-rain-emoji-image-${emojiTypes[Math.floor(Math.random() * emojiTypes.length)]}`;

    const singleEmoji = document.createElement("div");
    singleEmoji.className = "single-rain-emoji append";
    singleEmoji.style.left = emojiPosition;

    const singleEmojiChild = document.createElement("div");
    singleEmojiChild.className = emojiClass;
    singleEmoji.appendChild(singleEmojiChild);

    gsap.fromTo(
      singleEmoji,
      { y: emojiContainerHeight, xPercent: -50, rotate: 0.001, scale: emojiScale },
      { y: "-100%", xPercent: -50, rotate: 0.001, delay: emojiDelay, ease: "Power1.easeIn", duration: emojiSpeed }
    );

    gsap.fromTo(
      singleEmojiChild,
      { xPercent: -25, rotate: emojiRotate },
      { xPercent: 25, rotate: -emojiRotate, ease: "Power1.easeInOut", delay: emojiDelay, duration: 0.8, repeat: -1, yoyo: true }
    );

    emojiContainer.appendChild(singleEmoji);
  };

  Array.from({ length: emojiQuantity }).forEach(createEmojiElement);

  setTimeout(() => {
    emojiContainer.querySelectorAll(".single-rain-emoji.append").forEach(el => el.remove());
    emojiAnimationRunning = false;
  }, 2750);
}

function initEmojiRainActions(container) {
  container = container || document;
  container.querySelectorAll("[data-emoji-rain-type-1]").forEach(trigger => {
    trigger.addEventListener("click", () => {
      const type1 = trigger.getAttribute("data-emoji-rain-type-1");
      const type2 = trigger.getAttribute("data-emoji-rain-type-2") || type1;
      const emojiContainer = document.querySelector("[data-emoji-rain-container]");

      if (!emojiContainer) {
        console.warn("No emoji rain container found with [data-emoji-rain-container]");
        return;
      }

      initEmojiRain([type1, type2], emojiContainer);
    });
  });
}

function microInteractions() {
  document.addEventListener('barba:pageVisible', (e) => {
    dragJoystick(e.detail.container);
    alianInteraction(e.detail.container);
    initAnalogClock(e.detail.container);
    initEmojiRainActions(e.detail.container);
  });
}

export default microInteractions;