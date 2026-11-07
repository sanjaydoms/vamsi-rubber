import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processStages } from "../../data/process";
import { ProcessPanel } from "../manufacturing/ProcessPanel";
import { RevealLines } from "../ui/RevealLines";

gsap.registerPlugin(ScrollTrigger);

export function Manufacturing() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        if (!track) return;
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1
          }
        });
        gsap.utils.toArray<HTMLElement>("[data-par]").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true }
            }
          );
        });
      });
    }, sectionRef);
    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section id="manufacturing" ref={sectionRef} aria-labelledby="mfg-title" className="relative bg-ink">
      <div data-mfg-head className="mx-auto max-w-[1600px] px-5 pb-16 pt-28 md:px-10 md:pt-40 lg:pb-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-silver">
              <span className="h-px w-10 bg-signal" />
              Manufacturing
            </p>
            <RevealLines
              id="mfg-title"
              lines={[
              "Precision in",
              <>
                  every process<span className="text-signal">.</span>
                </>]
              }
              lineClassNames={["", "lg:pl-[8vw]"]}
              className="mt-6 font-display text-[clamp(2.05rem,7.6vw,8.75rem)] font-bold uppercase leading-[0.88] tracking-[-0.045em] text-bone" />
            
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-silver lg:col-span-4">
            From compound to finished strip, each stage is built around control and repeatability — so material reaching a retreader
            behaves the way it should, batch after batch.
          </p>
        </div>
      </div>

      <div ref={pinRef} className="relative lg:h-[100svh] lg:overflow-hidden">
        <div ref={trackRef} className="flex flex-col gap-20 px-5 pb-28 md:px-10 lg:h-full lg:w-max lg:flex-row lg:gap-0 lg:px-0 lg:pb-0 lg:pr-[10vw]">
          {processStages.map((stage, i) =>
          <ProcessPanel key={stage.id} stage={stage} index={i} total={processStages.length} />
          )}
        </div>
      </div>
    </section>);

}