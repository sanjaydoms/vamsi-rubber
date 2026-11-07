import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { imagery } from "../../data/imagery";
import { applications } from "../../data/company";

gsap.registerPlugin(ScrollTrigger);

export function Applications() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom bottom", scrub: true }
      });
      tl.to("[data-app-intro]", { opacity: 0, duration: 0.08 }, 0.12).
      fromTo("[data-band]", { clipPath: "inset(44% 8% 44% 8%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.28 }, 0).
      fromTo("[data-band-img]", { scale: 1.4 }, { scale: 1.1, duration: 0.4 }, 0).
      fromTo("[data-road]", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.2 }, 0.3).
      fromTo("[data-road-img]", { yPercent: -10 }, { yPercent: 0, duration: 0.7 }, 0.3).
      fromTo("[data-app-line]", { yPercent: 110 }, { yPercent: 0, duration: 0.1, stagger: 0.04 }, 0.48).
      fromTo("[data-app-quote]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.08 }, 0.58).
      fromTo("[data-route-line]", { scaleX: 0 }, { scaleX: 1, duration: 0.16 }, 0.66).
      fromTo("[data-route-mark]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.08, stagger: 0.04 }, 0.72).
      to({}, { duration: 0.04 }, 0.96);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="applications" ref={ref} aria-labelledby="applications-title" className="relative h-[280vh] bg-bone">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <p data-app-intro className="absolute inset-x-0 top-[30%] text-center font-mono text-[11px] uppercase tracking-[0.24em] text-charcoal">
          From the tread —
        </p>
        <p data-app-intro className="absolute inset-x-0 bottom-[30%] text-center font-mono text-[11px] uppercase tracking-[0.24em] text-charcoal">
          — to the road
        </p>

        <div data-band className="absolute inset-0 overflow-hidden" style={{ clipPath: "inset(44% 8% 44% 8%)" }}>
          <img data-band-img src={imagery.treadMacro} alt="" aria-hidden="true" className="h-full w-full object-cover" />
        </div>

        <div data-road className="absolute inset-0 overflow-hidden" style={{ clipPath: "inset(100% 0% 0% 0%)" }}>
          <img
            data-road-img
            src={imagery.highway}
            alt="Commercial truck on an open highway at dusk"
            className="absolute inset-x-0 top-0 h-[115%] w-full object-cover" />
          
          <div className="absolute inset-0 bg-ink/45" />
        </div>

        <div className="absolute inset-0 mx-auto flex max-w-[1600px] flex-col justify-between px-5 pb-8 pt-20 md:px-10 md:pb-12 md:pt-24 xl:pb-14 xl:pt-28">
          <p data-app-quote className="max-w-sm self-end font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.14em] text-bone/85 sm:text-[11.5px]" style={{ opacity: 0 }}>
            After fuel, the tyre is the largest operating cost for a fleet. Retreading is how that cost goes further.
          </p>

          <div>
            <h2 id="applications-title" className="font-display text-[clamp(1.85rem,min(7.8vw,12.5svh),9rem)] font-bold uppercase leading-[0.88] tracking-[-0.045em] text-bone">
              <span className="block overflow-hidden">
                <span data-app-line className="block">
                  Built for the
                </span>
              </span>
              <span className="block overflow-hidden md:pl-[10vw]">
                <span data-app-line className="block">
                  distance ahead<span className="text-signal">.</span>
                </span>
              </span>
            </h2>

            <div className="relative mt-6 md:mt-10 xl:mt-14">
              <span data-route-line className="absolute inset-x-0 top-0 hidden h-px origin-left bg-bone/50 md:block" />
              <ul className="grid grid-cols-2 gap-x-5 gap-y-4 sm:gap-x-6 sm:gap-y-6 md:grid-cols-4 md:gap-8">
                {applications.map((item) =>
                <li key={item.label} data-route-mark className="relative md:pt-5 xl:pt-6" style={{ opacity: 0 }}>
                    <span aria-hidden="true" className="absolute -top-[5px] left-0 hidden h-[11px] w-[11px] bg-signal md:block" />
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-bone sm:text-[11px]">{item.label}</p>
                    <p className="mt-1.5 max-w-[15rem] text-[12.5px] leading-relaxed text-silver sm:mt-2 sm:text-[13.5px]">{item.value}</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>);

}