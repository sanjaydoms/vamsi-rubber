"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { COMPANY_INFO } from "@/data/company";

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap } = getGsap();

    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray<HTMLElement>("[data-stat-counter]");
      counters.forEach((el) => {
        const target = Number(el.dataset.target || "0");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A1128] text-warm-white"
    >
      {/* Exact Design Gradient Background Asset matching User Reference */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        <Image
          src="/images/backgrounds/operational-footprint-gradient.png"
          alt="Operational Footprint Architectural Dark Blue Gradient Background"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
        {/* Seamless bottom fade into section base */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A1128] to-transparent" />
      </div>

      {/* 3D CAD Wireframe Tyre Engineering Visual extending to the bottom of the section */}
      <div className="pointer-events-none absolute right-0 bottom-0 z-[1] h-[340px] w-[340px] sm:h-[440px] sm:w-[440px] lg:h-[520px] lg:w-[520px] xl:h-[580px] xl:w-[580px] opacity-35 select-none">
        <Image
          src="/images/editorial/tyre_cad_wireframe.png"
          alt="3D Tyre Tread CAD Geometry Wireframe"
          fill
          className="object-contain object-right-bottom"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-20 sm:pt-24 lg:pt-28 pb-20 lg:pb-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-white/20 pb-12">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-white shadow-sm" />
              <span className="font-heading text-xs uppercase tracking-[0.2em] text-white font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                OPERATIONAL FOOTPRINT
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[1.02] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
              BUILT ON EXPERIENCE.
              <br />
              PROVEN THROUGH PERFORMANCE.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-white/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] font-medium">
            Verified cumulative operational figures reported across Vamshi Rubber Limited&apos;s domestic SRTC contracts, dealer network, and international shipments.
          </p>
        </div>

        {/* Architectural Counter Grid with White Background */}
        <div className="mt-12 grid grid-cols-1 gap-px bg-slate-200 md:grid-cols-2 lg:grid-cols-4 border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
          {COMPANY_INFO.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col justify-between bg-white p-6 sm:p-7 xl:p-8 transition-all duration-300 hover:bg-slate-50 text-obsidian"
            >
              <div className="mb-6 flex flex-col">
                <div className="flex items-baseline flex-wrap gap-1 font-heading text-5xl xl:text-6xl font-bold tracking-tight text-obsidian min-h-[56px] sm:min-h-[64px]">
                  <span data-stat-counter data-target={stat.value}>
                    {stat.value}
                  </span>
                  <span className="text-3xl xl:text-4xl text-industrial-orange font-bold">
                    {stat.suffix}
                  </span>
                  {"unit" in stat && stat.unit ? (
                    <span className="text-xl xl:text-2xl text-slate-500 font-bold ml-1 uppercase">
                      {stat.unit}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 font-heading text-xs sm:text-xs xl:text-sm uppercase tracking-wider font-bold text-obsidian whitespace-nowrap overflow-hidden text-ellipsis">
                  {stat.label}
                </p>
              </div>

              <p className="text-xs leading-relaxed text-slate-600 border-t border-slate-200 pt-4 font-normal">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
