"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Box, Gauge, Layers, Truck } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "tread-design",
    title: "Tread Design & Engineering",
    description:
      "Custom non-skid depths, computer-optimized groove geometry, and tailored void ratios for high-mileage expressways and severe-duty quarry haulage.",
    icon: Box,
  },
  {
    id: "durability",
    title: "Durable Polymer Compounding",
    description:
      "In-house Banbury mixing, high-grade polymer recipes, and cold feed extrusion delivering maximum casing adhesion and structural endurance.",
    icon: Truck,
  },
  {
    id: "abrasion-resistance",
    title: "Abrasion & Heat Resistance",
    description:
      "Specialized cut-and-chip resistant compounds engineered for low heat buildup, minimal hysteresis, and multi-retread casing preservation.",
    icon: Layers,
  },
  {
    id: "economy-mileage",
    title: "Economy & Fleet Mileage",
    description:
      "Industry-leading cost-per-kilometer (CPKM) reduction through multi-life retread cycles, technical plant training, and regional depot advisory.",
    icon: Gauge,
  },
];

export function ServicesSection() {
  const [activeCard, setActiveCard] = useState<string>("tread-design");

  return (
    <section className="relative bg-white text-obsidian py-20 lg:py-28 border-b border-slate-200">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Column: Eyebrow + Headline + Description + Signature Button */}
          <div className="lg:col-span-5 flex flex-col items-start">
            {/* Elevated Brand Pill Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-industrial-orange/30 bg-industrial-orange/10 px-4 py-1.5 shadow-xs mb-6">
              <span className="h-2 w-2 rounded-full bg-industrial-orange" />
              <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-industrial-orange">
                SERVICES
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-[3.25rem] font-bold uppercase tracking-tight text-obsidian leading-[1.02]">
              EXPLORE OUR
              <br />
              COMPREHENSIVE
              <br />
              SERVICE OFFERINGS.
            </h2>

            {/* Description Paragraph */}
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-normal max-w-md">
              Focused on your unique fleet and retreading needs, our engineering team delivers end-to-end solutions that blend 30+ years of compounding heritage with high-mileage road performance.
            </p>

            {/* Signature Dark Capsule Button with Industrial Orange Arrow */}
            <Link
              href="/contact"
              className="group inline-flex items-center justify-between gap-6 rounded-xl bg-[#111827] pl-6 pr-2.5 py-2.5 shadow-lg hover:bg-black transition-all duration-300 hover:shadow-xl mt-8"
            >
              <span className="font-heading text-sm font-semibold tracking-wide text-white">
                Get Started
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-industrial-orange text-white shadow-sm transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </span>
            </Link>
          </div>

          {/* Right Column: 2x2 Grid of 4 Elevated Service Cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {SERVICES_DATA.map((service) => {
                const IconComponent = service.icon;
                const isFeatured = activeCard === service.id;

                return (
                  <div
                    key={service.id}
                    onMouseEnter={() => setActiveCard(service.id)}
                    className={`group relative rounded-[28px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer min-h-[260px] ${
                      isFeatured
                        ? "bg-[#0B1736] text-white shadow-[0_18px_40px_rgba(11,23,54,0.28)] scale-[1.02] border border-[#1E40AF]/40"
                        : "bg-[#FAF9F6] text-obsidian border border-slate-200/80 shadow-xs hover:border-industrial-orange/40 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    <div>
                      {/* Top: Circular Icon Badge */}
                      <div className="mb-6">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-108 ${
                            isFeatured
                              ? "bg-white/15 text-white"
                              : "bg-[#0B1736]/8 text-[#0B1736]"
                          }`}
                        >
                          <IconComponent className="h-6 w-6 stroke-[2]" />
                        </div>
                      </div>

                      {/* Card Title */}
                      <h3
                        className={`font-heading text-lg sm:text-xl font-bold uppercase tracking-tight leading-snug transition-colors ${
                          isFeatured ? "text-white" : "text-obsidian group-hover:text-industrial-orange"
                        }`}
                      >
                        {service.title}
                      </h3>

                      {/* Card Description */}
                      <p
                        className={`mt-3 text-xs sm:text-sm leading-relaxed ${
                          isFeatured ? "text-white/80" : "text-slate-600"
                        }`}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
