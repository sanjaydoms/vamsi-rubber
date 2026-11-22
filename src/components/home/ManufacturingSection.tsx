"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

const STAGES = [
  {
    id: "01",
    code: "STAGE 01",
    title: "MATERIAL DEVELOPMENT",
    summary:
      "Formulating low rolling resistance, abrasion-resistant natural and synthetic elastomer compounds engineered for cooler running and varied road stress.",
    points: [
      "Technical compound design backed by Hercules Tire & Rubber Co., USA technology absorption",
      "Application-tailored polymers for Highway, Drive, Trailer, and Mines/OTR duty cycles",
      "REACH-compliant chemical selection for global export catalogues",
    ],
    image: "/images/editorial/rubber_mill.jpg",
    caption: "Elastomer compound milling & sheet formulation",
  },
  {
    id: "02",
    code: "STAGE 02",
    title: "PRECISION MANUFACTURING",
    summary:
      "Controlled extrusion, calendering, and multi-cavity precure moulding across a 4-acre manufacturing campus near Hyderabad with 3,200 MT annual PCTR capacity.",
    points: [
      "Automated process parameter control across extrusion, curing presses, and bonding sheets",
      "Strict dimensional consistency within ±2% commercial tolerance across widths up to 320 mm",
      "Dedicated lines for Cushion Gum (400 MT), Vulcanising Solution (400 KL), and Envelopes",
    ],
    image: "/images/editorial/extruder_machinery.jpg",
    caption: "Industrial compounding & extrusion processing",
  },
  {
    id: "03",
    code: "STAGE 03",
    title: "QUALITY VERIFICATION",
    summary:
      "Every raw material batch, semi-finished sheet, and finished tread profile undergoes laboratory testing on Oscillating Disc Rheometers and tensile testers.",
    points: [
      "In-house ultra-modern laboratory checking cure kinetics, scorch safety & tensile strength",
      "ISO 9001:2015 Quality Management System certified by Det Norske Veritas (DNV), Netherlands",
      "Full batch traceability from mixing mill to finished tread roll dispatch",
    ],
    image: "/images/brand/vamshi-lab-rheometer.jpg",
    caption: "Vamshi Rubber in-house Oscillating Disc Rheometer & tensile laboratory",
  },
];

export function ManufacturingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = getGsap();

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.3,
          onUpdate: (self) => {
            const progress = self.progress;
            const idx = Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length));
            setActiveStage(idx);
          },
        });
      });
    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-obsidian pb-10 lg:pb-16"
    >
      {/* Desktop Pinned Experience */}
      <div className="hidden lg:flex min-h-screen flex-col justify-between mx-auto max-w-[1440px] px-12 py-16">
        <div className="flex items-end justify-between border-b border-slate-200 pb-8">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-industrial-orange" />
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
                MANUFACTURING EXCELLENCE
              </span>
            </div>
            <h2 className="font-heading text-4xl xl:text-5xl font-bold uppercase tracking-tight leading-[1.02] text-obsidian">
              PRECISION IN EVERY PROCESS.
              <br />
              CONSISTENCY IN EVERY PRODUCT.
            </h2>
          </div>
        </div>

        {/* Main 2-column Stage Grid */}
        <div className="my-auto grid grid-cols-12 gap-12 py-8 items-center">
          {/* Left: Stage Navigation & Active Details */}
          <div className="col-span-5 space-y-6">
            <div className="flex flex-col border-t border-slate-200">
              {STAGES.map((stage, idx) => {
                const isActive = idx === activeStage;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveStage(idx)}
                    className={`group text-left border-b border-slate-200 py-5 transition-all ${
                      isActive ? "opacity-100" : "opacity-50 hover:opacity-85"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-industrial-orange">
                        {stage.id} — {stage.title}
                      </span>
                      <span
                        className={`h-2 w-2 transition-colors ${
                          isActive ? "bg-industrial-orange" : "bg-slate-300"
                        }`}
                      />
                    </div>
                    {isActive && (
                      <div className="mt-4 space-y-3">
                        <p className="text-sm sm:text-base leading-relaxed text-slate-700">
                          {stage.summary}
                        </p>
                        <ul className="space-y-1.5 border-l-2 border-industrial-orange pl-4 text-xs text-slate-600">
                          {stage.points.map((pt) => (
                            <li key={pt}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Stage Large Photography */}
          <div className="col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian border border-slate-200 shadow-2xl">
              {STAGES.map((stage, idx) => (
                <div
                  key={stage.id}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    idx === activeStage
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105 pointer-events-none"
                  }`}
                >
                  <Image
                    src={stage.image}
                    alt={stage.title}
                    fill
                    className="object-cover"
                    sizes="58vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Clean Stacked Layout */}
      <div className="lg:hidden mx-auto max-w-[1440px] px-5 sm:px-8 py-20">
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-industrial-orange" />
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
              MANUFACTURING EXCELLENCE
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight leading-[1.05] text-obsidian">
            PRECISION IN EVERY PROCESS.
            <br />
            CONSISTENCY IN EVERY PRODUCT.
          </h2>
        </div>

        <div className="space-y-12">
          {STAGES.map((stage) => (
            <div key={stage.id} className="border-t border-slate-200 pt-8 space-y-5">
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-industrial-orange">
                {stage.id} — {stage.title}
              </span>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian border border-slate-200">
                <Image
                  src={stage.image}
                  alt={stage.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-slate-700">
                {stage.summary}
              </p>
              <ul className="space-y-1.5 border-l-2 border-industrial-orange pl-4 text-xs text-slate-600">
                {stage.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
