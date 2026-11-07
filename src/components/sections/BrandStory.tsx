import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { imagery } from "../../data/imagery";
import { brandFacts } from "../../data/company";

gsap.registerPlugin(ScrollTrigger);

export function BrandStory() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: trackRef.current, start: "top top", end: "bottom bottom", scrub: true }
      });
      tl.fromTo("[data-tread]", { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(80% at 50% 50%)", duration: 0.17 }, 0.04).
      fromTo("[data-tread-img]", { scale: 1.35 }, { scale: 1.05, duration: 0.5 }, 0.04).
      fromTo("[data-line]", { yPercent: 110 }, { yPercent: 0, duration: 0.1, stagger: 0.035 }, 0.2).
      fromTo("[data-copy]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.1 }, 0.34).
      to("[data-drift-left]", { xPercent: -6, duration: 0.3 }, 0.36).
      to("[data-drift-right]", { xPercent: 6, duration: 0.3 }, 0.36).
      fromTo("[data-panel]", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.2 }, 0.6).
      fromTo("[data-panel-text]", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.14, stagger: 0.03 }, 0.7).
      fromTo("[data-panel-img]", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.18 }, 0.72).
      to({}, { duration: 0.06 }, 0.94);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} aria-labelledby="story-title" className="relative bg-ink">
      <div ref={trackRef} className="relative h-[340vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div data-tread className="absolute inset-0 overflow-hidden" style={{ clipPath: "circle(0% at 50% 50%)" }}>
            <img data-tread-img src={imagery.treadMacro} alt="Extreme close-up of commercial tyre tread blocks" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-ink/50" />
          </div>

          <div className="absolute inset-0 mx-auto flex max-w-[1600px] flex-col justify-center px-5 md:px-10">
            <h2 id="story-title" className="font-display text-[clamp(1.9rem,min(7.8vw,14svh),9rem)] font-bold uppercase leading-[0.88] tracking-[-0.045em] text-bone">
              <span data-drift-left className="block">
                <span className="block overflow-hidden">
                  <span data-line className="block">
                    Beyond
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span data-line className="block">
                    Rubber<span className="text-signal">.</span>
                  </span>
                </span>
              </span>
              <span data-drift-right className="block text-right">
                <span className="block overflow-hidden">
                  <span data-line className="block text-silver">
                    Built for
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span data-line className="block text-silver">
                    Performance.
                  </span>
                </span>
              </span>
            </h2>
            <p
              data-copy
              className="mt-8 max-w-xs font-mono text-[11.5px] uppercase leading-relaxed tracking-[0.14em] text-silver md:absolute md:bottom-12 md:left-10 md:mt-0">
              
              Precured tread — the pattern is moulded in before it ever meets a casing.
            </p>
          </div>

          <div data-panel className="absolute inset-0 bg-bone text-ink" style={{ clipPath: "inset(100% 0% 0% 0%)" }}>
            <div className="mx-auto grid h-full max-w-[1600px] grid-cols-1 content-center gap-8 px-5 pb-12 pt-20 md:grid-cols-12 md:gap-10 md:px-10 md:pb-16 md:pt-24">
              <div className="md:col-span-7 md:self-center">
                <p data-panel-text className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-charcoal sm:text-[11px]">
                  <span className="h-px w-8 bg-signal sm:w-10" />
                  Vamshi Rubber Limited — Hyderabad, India
                </p>
                <p data-panel-text className="mt-4 font-display text-[clamp(1.3rem,min(2.9vw,4.6svh),3.15rem)] font-semibold leading-[1.08] tracking-[-0.025em] md:mt-6">
                  Vamshi Rubber delivers dependable precured tyre retreading materials designed to support the evolving demands of the tyre
                  retreading industry.
                </p>
                <dl data-panel-text className="mt-6 grid grid-cols-2 gap-x-4 border-t border-ink/15 md:mt-9">
                  {brandFacts.map((fact) =>
                  <div key={fact.label} className="flex flex-col gap-1 border-b border-ink/15 py-3 pr-2 sm:pr-6 md:py-4">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-charcoal sm:text-[10.5px]">{fact.label}</dt>
                      <dd className="text-[13.5px] font-medium leading-snug sm:text-[15px]">{fact.value}</dd>
                    </div>
                  )}
                </dl>
              </div>
              <figure className="relative hidden flex-col md:col-span-5 md:flex md:h-[64vh] md:self-center">
                <div data-panel-img className="min-h-0 w-full flex-1 overflow-hidden" style={{ clipPath: "inset(0% 0% 100% 0%)" }}>
                  <img src={imagery.workshop} alt="Precured tread being applied to a buffed truck tyre casing" className="h-full w-full object-cover" />
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="h-[11vw] min-h-[88px] bg-bone" />
    </section>);

}