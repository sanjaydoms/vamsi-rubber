"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { MagneticButton } from "@/components/MagneticButton";
import { Star } from "lucide-react";

export function BrandIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap } = getGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mainImageRef.current,
        { clipPath: "inset(12% 0% 12% 0%)", scale: 1.06 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mainImageRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="who-we-are"
      ref={sectionRef}
      className="relative bg-white text-obsidian"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 lg:pb-20">
        {/* 1. Primary Editorial Introduction: WHO WE ARE */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center pb-8 sm:pb-12">
          {/* Left Column: Editorial Typography */}
          <div className="lg:col-span-5 space-y-7">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-industrial-orange" />
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
                WHO WE ARE
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl lg:text-[3.35rem] font-bold uppercase tracking-tight leading-[1.03] text-obsidian">
              MORE THAN MATERIALS.
              <br />
              A COMMITMENT TO EVERY MILE.
            </h2>

            <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-600">
              <p>
                Vamshi Rubber Limited is a supplier of tyre retreading materials, delivering dependable solutions designed to support retreaders and transportation businesses.
              </p>
              <p>
                With manufacturing capabilities, testing facilities and a focus on product consistency, we work towards delivering reliable performance, safety and value.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-6 grid grid-cols-2 gap-6 text-xs">
              <div>
                <p className="font-heading uppercase tracking-[0.14em] text-slate-500 font-semibold">
                  HEADQUARTERS
                </p>
                <p className="mt-1 font-semibold text-obsidian">Vamshi House, Hyderabad</p>
              </div>
              <div>
                <p className="font-heading uppercase tracking-[0.14em] text-slate-500 font-semibold">
                  PLANT ESTATE
                </p>
                <p className="mt-1 font-semibold text-obsidian">4 Acres, Choutuppal</p>
              </div>
            </div>

            <div className="pt-2">
              <MagneticButton href="/about" variant="primary">
                <span>DISCOVER OUR STORY</span>
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Asymmetric Layered Photography Composition */}
          <div className="lg:col-span-7 relative">
            <div
              ref={mainImageRef}
              className="relative aspect-[16/11] w-full overflow-hidden bg-obsidian border border-slate-200 will-change-transform shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
            >
              <Image
                src="/images/editorial/stacked_tires.jpg"
                alt="Commercial radial tyre casings and tread inspection"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>

            {/* Asymmetric Offset Frame — Real Tyre Manufacture Industry Facility */}
            <div className="mt-6 sm:mt-0 sm:absolute sm:-bottom-10 sm:-left-10 w-full sm:w-60 border-4 border-white bg-obsidian shadow-2xl">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/images/editorial/tyre_manufacture_factory.jpg"
                  alt="Vamshi Tyre Manufacturing Facility in Choutuppal"
                  fill
                  className="object-cover object-center"
                  sizes="240px"
                />
              </div>
              <div className="bg-obsidian px-3.5 py-2.5 text-[10px] font-heading uppercase tracking-[0.14em] text-white">
                TYRE MANUFACTURING · CHOUTUPPAL
              </div>
            </div>
          </div>
        </div>

        {/* 2. 4-Circle Industrial Capability Showcase */}
        <div className="relative z-30 pt-10 sm:pt-14 lg:pt-18">
          <div className="mx-auto max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-3 xl:gap-4 items-center justify-center">
            {/* Circle 1: Heritage & Robotic Manufacturing */}
            <div className="mx-auto w-full max-w-[320px] sm:max-w-[340px] lg:max-w-[325px] xl:max-w-[345px] aspect-square rounded-full bg-white border border-slate-200/90 shadow-[0_15px_35px_rgba(0,0,0,0.06)] p-7 sm:p-8 lg:p-7 xl:p-8 flex flex-col items-center justify-between text-center hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              {/* Tag */}
              <p className="font-heading text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-industrial-orange">
                &#47;&#47; 1993-2025 &#47;&#47;
              </p>

              {/* Stat & Description */}
              <div className="my-auto space-y-1.5">
                <p className="font-heading text-6xl sm:text-7xl lg:text-[4.25rem] font-bold tracking-tight text-obsidian leading-none">
                  30+
                </p>
                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-600 max-w-[210px] mx-auto font-normal">
                  Delivering compounding excellence and casing longevity since day one.
                </p>
              </div>

              {/* Precision Robot Arm Graphic */}
              <div className="h-11 w-11 flex items-center justify-center">
                <svg viewBox="0 0 48 48" fill="none" className="h-11 w-11 text-slate-900" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="14" y="38" width="20" height="6" rx="2" fill="#111827" stroke="none" />
                  <circle cx="24" cy="34" r="4" fill="#E52E2E" stroke="none" />
                  <path d="M24 34 L18 20" stroke="currentColor" />
                  <circle cx="18" cy="20" r="3.5" fill="#111827" stroke="none" />
                  <path d="M18 20 L30 12" stroke="currentColor" />
                  <circle cx="30" cy="12" r="3" fill="#E52E2E" stroke="none" />
                  <path d="M30 12 L35 8" stroke="currentColor" />
                  <path d="M32 5 L36 9 M38 7 L34 11" stroke="currentColor" />
                </svg>
              </div>
            </div>

            {/* Circle 2: Precision Machinery Window Frame */}
            <div className="mx-auto w-full max-w-[320px] sm:max-w-[340px] lg:max-w-[325px] xl:max-w-[345px] aspect-square rounded-full overflow-hidden border border-slate-200/90 shadow-[0_15px_35px_rgba(0,0,0,0.06)] bg-obsidian relative group">
              <Image
                src="/images/editorial/extruder_machinery.jpg"
                alt="Precision rubber compounding & CNC extruder machinery"
                fill
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 340px, 360px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Circle 3: 400+ Partners & Star Rating */}
            <div className="mx-auto w-full max-w-[320px] sm:max-w-[340px] lg:max-w-[325px] xl:max-w-[345px] aspect-square rounded-full bg-white border border-slate-200/90 shadow-[0_15px_35px_rgba(0,0,0,0.06)] p-7 sm:p-8 lg:p-7 xl:p-8 flex flex-col items-center justify-between text-center hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              {/* Brand Wordmark */}
              <span className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-obsidian">
                VAMSHI RUBBER&reg;
              </span>

              {/* Stat & Description */}
              <div className="my-auto space-y-1.5">
                <p className="font-heading text-6xl sm:text-7xl lg:text-[4.25rem] font-bold tracking-tight text-industrial-orange leading-none">
                  400+
                </p>
                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-600 max-w-[210px] mx-auto font-normal">
                  Delivering consistent manufacturing excellence since day one.
                </p>
              </div>

              {/* Rating & Stars */}
              <div className="space-y-1">
                <p className="font-heading text-sm sm:text-base font-bold text-obsidian leading-none">
                  4.9 <span className="text-[11px] text-slate-400 font-normal">/5.0</span>
                </p>
                <div className="flex items-center justify-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* Circle 4: Dark Contrast Circle with 1 Million+ */}
            <div className="mx-auto w-full max-w-[320px] sm:max-w-[340px] lg:max-w-[325px] xl:max-w-[345px] aspect-square rounded-full bg-[#111827] text-white border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.2)] p-7 sm:p-8 lg:p-7 xl:p-8 flex flex-col items-center justify-between text-center hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              {/* Mini Product Components Strip */}
              <div className="flex items-center justify-center -space-x-2 pt-1">
                <div className="relative h-10 w-10 rounded-lg overflow-hidden border-2 border-white/20 bg-obsidian shadow-sm">
                  <Image
                    src="/images/editorial/truck_wheel_hero.jpg"
                    alt="PCTR Casing"
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="relative h-10 w-10 rounded-lg overflow-hidden border-2 border-white/20 bg-obsidian shadow-sm z-1">
                  <Image
                    src="/images/editorial/rubber_mill.jpg"
                    alt="Elastomer Milling"
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="relative h-10 w-10 rounded-lg overflow-hidden border-2 border-white/20 bg-obsidian shadow-sm z-2">
                  <Image
                    src="/images/brand/vamshi-lab-rheometer.jpg"
                    alt="Lab Rheometer"
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              </div>

              {/* Big Stat & Description */}
              <div className="my-auto space-y-2">
                <p className="font-heading text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-bold tracking-tight text-white leading-none">
                  1 million<span className="text-industrial-orange">+</span>
                </p>
                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-300 max-w-[210px] mx-auto font-normal">
                  Precision-crafted retread materials supplied across India &amp; globally.
                </p>
              </div>

              {/* Bottom Subtle Tag */}
              <span className="text-[10px] sm:text-[11px] font-heading uppercase tracking-[0.2em] text-slate-400">
                PROVEN PERFORMANCE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
