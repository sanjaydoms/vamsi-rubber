import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let locked = false;

export function initSmoothScroll(): () => void {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (reduced || coarse) return () => undefined;

  lenis = new Lenis({ duration: 1.15, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  lenis.on("scroll", ScrollTrigger.update);
  if (locked) lenis.stop();

  const raf = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(raf);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToId(id: string, offsetVh = 0) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + offsetVh * window.innerHeight;
  if (lenis) {
    lenis.scrollTo(top, { duration: 1.6 });
  } else {
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function setScrollLocked(value: boolean) {
  locked = value;
  if (lenis) {
    if (value) lenis.stop();else
    lenis.start();
  }
  document.documentElement.style.overflow = value ? "hidden" : "";
}