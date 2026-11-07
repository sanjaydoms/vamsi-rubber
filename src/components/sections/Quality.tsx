import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { imagery } from "../../data/imagery";
import { clients, qualityCommitments, testimonial } from "../../data/company";
import { RevealLines } from "../ui/RevealLines";

gsap.registerPlugin(ScrollTrigger);

export function Quality() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-q-mask]",
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: "[data-q-mask]", start: "top 90%", end: "top 35%", scrub: true } }
      );
      gsap.fromTo(
        "[data-q-img]",
        { yPercent: -8 },
        { yPercent: 8, ease: "none", scrollTrigger: { trigger: "[data-q-mask]", start: "top bottom", end: "bottom top", scrub: true } }
      );
      gsap.fromTo(
        "[data-clients]",
        { xPercent: 0 },
        { xPercent: -35, ease: "none", scrollTrigger: { trigger: "[data-clients]", start: "top bottom", end: "bottom top", scrub: true } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="quality" ref={ref} aria-labelledby="quality-title" className="relative bg-bone text-ink">
      <div className="mx-auto max-w-[1600px] px-5 pt-28 md:px-10 md:pt-40">
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-charcoal">
          <span className="h-px w-10 bg-signal" />
          Quality &amp; trust
        </p>
        <RevealLines
          id="quality-title"
          lines={["Quality is", "engineered.", <span className="text-outline-ink">Not assumed.</span>]}
          lineClassNames={["", "", "md:pl-[14vw] lg:pl-[18vw]"]}
          className="mt-6 font-display text-[clamp(2.05rem,8.4vw,9.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.045em]" />
        

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-8 lg:mt-24 lg:gap-10">
          <figure className="md:col-span-5">
            <div data-q-mask className="relative aspect-[4/5] overflow-hidden" style={{ clipPath: "inset(100% 0% 0% 0%)" }}>
              <img
                data-q-img
                src={imagery.lab}
                alt="Rubber specimen under test in the factory laboratory"
                loading="lazy"
                className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover" />
              
            </div>
            <figcaption className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-charcoal">
              In-factory laboratory — material testing
            </figcaption>
          </figure>

          <div className="md:col-span-7 md:pl-4 lg:pl-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-charcoal">Certification</p>
            <p className="mt-3 font-display text-[clamp(2.6rem,6.8vw,8rem)] font-bold leading-[0.9] tracking-[-0.05em]">
              ISO 9001<span className="text-signal">:</span>2015
            </p>
            <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-ink/80 md:mt-6 lg:text-[17px]">
              Vamshi Rubber Ltd holds ISO 9001:2015 certification from Det Norske Veritas (DNV), Netherlands, for consistently conforming
              to quality management system standards in manufacturing and in servicing customers.
            </p>

            <dl className="mt-10 border-t border-ink/15 lg:mt-12">
              {qualityCommitments.map((item) =>
              <div key={item.label} className="grid gap-2 border-b border-ink/15 py-5 sm:grid-cols-[170px_1fr] sm:gap-6 lg:grid-cols-[200px_1fr] lg:gap-8 lg:py-6">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal">{item.label}</dt>
                  <dd className="text-[15.5px] leading-relaxed lg:text-[17px]">{item.value}</dd>
                </div>
              )}
            </dl>

            <blockquote id="testimonials" className="mt-14 max-w-xl">
              <p className="font-display text-[clamp(1.35rem,2.2vw,2rem)] font-semibold leading-snug tracking-[-0.02em]">
                “{testimonial.quote}”
              </p>
              <footer className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal">— {testimonial.author}</footer>
            </blockquote>
          </div>
        </div>
      </div>

      <div className="mt-24 overflow-hidden border-y border-ink/15 py-8 md:mt-32">
        <p className="px-5 font-mono text-[11px] uppercase tracking-[0.2em] text-charcoal md:px-10">On the road with</p>
        <ul data-clients className="mt-4 flex w-max items-center gap-8 whitespace-nowrap px-5 md:px-10" aria-label="Clients">
          {clients.map((client) =>
          <li key={client} className="flex items-center gap-8 font-display text-[clamp(2.25rem,5.5vw,5.5rem)] font-bold uppercase tracking-[-0.04em]">
              {client}
              <span aria-hidden="true" className="h-3 w-3 bg-signal" />
            </li>
          )}
        </ul>
      </div>
    </section>);

}