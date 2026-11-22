"use client";

import { useState } from "react";
import Image from "next/image";
import { FileText, Compass, Factory, PackageCheck } from "lucide-react";

const PILLARS = [
  {
    num: "01",
    title: "Durability & Casing Life",
    tag: "COOLER RUNNING COMPOUNDS",
    description:
      "Cooler-running elastomer formulation paired with optimum tread thickness minimizes heat build-up at sustained highway speeds, protecting belt packages and supporting multi-retread casing longevity.",
    icon: FileText,
    image: "/images/editorial/retread_wide.jpg",
  },
  {
    num: "02",
    title: "Optimised Tread Geometry",
    tag: "TRACTION & AXLE SPECIFIC",
    description:
      "Tread patterns engineered for specific axle duties — spanning free-rolling highway ribs, directional drive lugs, wide-base trailer profiles, and deep mining traction.",
    icon: Compass,
    image: "/images/editorial/truck_wheel_hero.jpg",
  },
  {
    num: "03",
    title: "Compounding & Production",
    tag: "PRECISION COMPOUND CONTROL",
    description:
      "Application-specific compounds formulated to resist cutting, chipping, and irregular shoulder wear — backed by in-house Oscillating Disc Rheometer cure verification.",
    icon: Factory,
    image: "/images/editorial/rubber_mill.jpg",
  },
  {
    num: "04",
    title: "Mileage & Fleet Economy",
    tag: "LOW ROLLING RESISTANCE",
    description:
      "Low rolling resistance compounds designed for increased fuel economy and higher mileage — delivering lowest cost-per-kilometer for commercial fleets at under 50% of new tyre cost.",
    icon: PackageCheck,
    image: "/images/editorial/hyderabad_truck.jpg",
  },
];

export function WhyVamshiSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-obsidian text-warm-white pb-20 sm:pb-28 lg:pb-32">
      <div className="relative min-h-[680px] sm:min-h-[740px] lg:min-h-[800px] xl:min-h-[850px] flex flex-col justify-between overflow-hidden">
        {/* Full-Bleed Background Images with Smooth Crossfade */}
        <div className="absolute inset-0 z-0">
          {PILLARS.map((pillar, idx) => (
            <div
              key={pillar.num}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === activeIndex ? "opacity-100 z-1" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={pillar.image}
                alt={pillar.title}
                fill
                className="object-cover object-center contrast-105 brightness-[0.52]"
                priority={idx === 0}
                sizes="100vw"
              />
            </div>
          ))}
          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/35 to-obsidian/70 z-2" />
        </div>

        {/* Top Section Header */}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-16 sm:pt-20 lg:pt-24">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-industrial-orange" />
              <span className="font-heading text-xs uppercase tracking-[0.2em] font-semibold text-industrial-orange">
                WHY VAMSHI RUBBER
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.98] text-white">
              PERFORMANCE YOU
              <br />
              CAN RELY ON.
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-200 max-w-2xl">
              Every engineering advantage is backed by 30+ years of compounding expertise and verified commercial retreading performance across India.
            </p>
          </div>
        </div>

        {/* Bottom 4-Column Dock (Streamlined Height) */}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 pb-0 pt-12 sm:pt-16 lg:pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-white/20 divide-y md:divide-y-0 md:divide-x divide-white/15 items-end">
            {PILLARS.map((pillar, idx) => {
              const isActive = idx === activeIndex;
              const Icon = pillar.icon;

              if (isActive) {
                return (
                  <div
                    key={pillar.num}
                    className="bg-white rounded-none p-6 sm:p-7 text-obsidian shadow-[0_-20px_50px_rgba(0,0,0,0.6)] relative -mt-6 sm:-mt-8 z-20 transition-all duration-300 min-h-[190px] flex flex-col justify-between"
                  >
                    {/* Red Outline Icon */}
                    <div>
                      <Icon className="h-7 w-7 text-industrial-orange" />
                    </div>

                    {/* Content */}
                    <div className="mt-3">
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-obsidian leading-snug">
                        {pillar.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={pillar.num}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className="group text-left p-5 sm:p-6 transition-all duration-300 hover:bg-white/[0.08] backdrop-blur-xs flex flex-col justify-end min-h-[150px] sm:min-h-[170px]"
                >
                  {/* Amber/Gold Outline Icon */}
                  <div>
                    <Icon className="h-6 w-6 text-amber-400 group-hover:text-industrial-orange transition-colors" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-base sm:text-lg font-bold text-white group-hover:text-industrial-orange transition-colors mt-3 leading-snug">
                    {pillar.title}
                  </h3>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
