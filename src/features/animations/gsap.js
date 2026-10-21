function gsapSetup() {

  const { gsap, ScrollTrigger, SplitText, CustomEase, InertiaPlugin } = window;

  if (!gsap) {
    console.error('GSAP is not loaded. Make sure to include GSAP CDN scripts in Webflow.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, InertiaPlugin);

}

export default gsapSetup;