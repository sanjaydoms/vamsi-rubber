"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { MagneticButton } from "@/components/MagneticButton";

interface ShowcaseProductCard {
  code: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  tags: { label: string; color: "red" | "blue" | "amber" | "emerald" | "purple" | "slate" }[];
  btnColor: string;
}

const DARK_BLUE_BTN = "bg-[#0A1128] group-hover:bg-industrial-orange";

const SHOWCASE_CARDS: Record<string, ShowcaseProductCard> = {
  pctr: {
    code: "VR-PCTR",
    badge: "COLD RETREAD",
    title: "Precured Tread (PCTR)",
    description:
      "Pre-vulcanized, precision-moulded tread rubber strips with 33 export patterns for high mileage and casing longevity.",
    image: "/images/editorial/truck_wheel_hero.jpg",
    tags: [
      { label: "Cold Retread", color: "red" },
      { label: "150 – 320 mm", color: "blue" },
      { label: "33 Profiles", color: "amber" },
    ],
    btnColor: DARK_BLUE_BTN,
  },
  "vulcanising-solution": {
    code: "VR-BVC",
    badge: "SURFACE PRIMER",
    title: "Vulcanising Solution (BVC)",
    description:
      "Fast-curing vulcanising cement formulated to prime buffed casings and unite cushion bonding layers.",
    image: "/images/brand/vamshi-lab-rheometer.jpg",
    tags: [
      { label: "Surface Primer", color: "blue" },
      { label: "99°C & 125°C", color: "emerald" },
      { label: "400 KL Output", color: "purple" },
    ],
    btnColor: DARK_BLUE_BTN,
  },
  "bonding-gum": {
    code: "VR-BG",
    badge: "EXPORT GRADE",
    title: "Bonding Gum Sheet",
    description:
      "Protective poly-lined uncured rubber bonding strip engineered for high dynamic adhesion under highway heat.",
    image: "/images/editorial/hero_wheel_studio.jpg",
    tags: [
      { label: "Export Spec", color: "amber" },
      { label: "Up to 480 mm", color: "blue" },
      { label: "REACH Verified", color: "emerald" },
    ],
    btnColor: DARK_BLUE_BTN,
  },
  "extruded-rope-rubber": {
    code: "VR-ERR",
    badge: "EXTRUDER READY",
    title: "Extruded Rope Rubber",
    description:
      "Continuous spooled rubber rope formulated for smooth feed through handheld retreading extruders.",
    image: "/images/editorial/extruder_machinery.jpg",
    tags: [
      { label: "Continuous", color: "emerald" },
      { label: "10 kg Spool", color: "purple" },
      { label: "Porosity-Free", color: "blue" },
    ],
    btnColor: DARK_BLUE_BTN,
  },
  "cushion-gum": {
    code: "VR-CG",
    badge: "DOMESTIC TIER",
    title: "Cushion Gum Sheet",
    description:
      "Domestic uncured cushion gum formulated across 99°C, 125°C, and 150°C chamber curing cycles.",
    image: "/images/editorial/rubber_mill.jpg",
    tags: [
      { label: "Domestic Standard", color: "red" },
      { label: "400 MT Output", color: "amber" },
      { label: "High Green Tack", color: "blue" },
    ],
    btnColor: DARK_BLUE_BTN,
  },
  "curing-envelopes": {
    code: "VR-CE",
    badge: "MULTI-CURE",
    title: "Curing Envelopes",
    description:
      "Heavy-duty elastomeric curing envelopes engineered for repeated electrical and steam autoclave cycles.",
    image: "/images/editorial/semi_fleet.jpg",
    tags: [
      { label: "Chamber Fit", color: "purple" },
      { label: "Up to 42×25", color: "blue" },
      { label: "Multi-Cycle Seal", color: "emerald" },
    ],
    btnColor: DARK_BLUE_BTN,
  },
};

export function ProductShowcaseSection() {
  // Take exactly 6 featured products for a balanced 3x2 grid on the landing page
  const showcaseProducts = PRODUCTS.filter((p) => p.featuredInShowcase).slice(0, 6);

  return (
    <section className="relative bg-white text-obsidian pb-2 sm:pb-4 lg:pb-6">
      {/* Section Header matching clean editorial reference layout */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-10 pb-8 lg:pt-14 lg:pb-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-slate-200 pb-8">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-industrial-orange" />
              <span className="font-heading text-xs uppercase tracking-[0.2em] font-semibold text-industrial-orange">
                ENGINEERED PORTFOLIO
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[1.02] text-obsidian">
              MATERIALS THAT KEEP
              <br />
              BUSINESSES MOVING.
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <MagneticButton href="/products" variant="solid-dark">
              <span>VIEW ALL PRODUCTS</span>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* 3x2 Grid for Landing Page */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 pb-24 lg:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {showcaseProducts.map((product) => {
            const card = SHOWCASE_CARDS[product.slug] || {
              code: `VR-${product.slug.toUpperCase()}`,
              badge: "VAMSHI SPEC",
              title: product.name,
              description: product.description,
              image: "/images/editorial/truck_wheel_hero.jpg",
              tags: [
                { label: "Standard", color: "blue" },
                { label: "Industrial", color: "slate" },
              ],
              btnColor: DARK_BLUE_BTN,
            };

            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group relative flex flex-col select-none"
              >
                {/* 1. Upper Full-Bleed Image Frame with Inverted Corner Notch */}
                <div className="relative aspect-[4/3] w-full">
                  {/* The Image Container with rounded corners and overflow-hidden */}
                  <div className="relative h-full w-full rounded-[28px] overflow-hidden bg-slate-900 shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:shadow-[0_24px_50px_rgba(0,0,0,0.18)]">
                    {/* Full-Card High-Resolution Related Editorial Image */}
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 brightness-95 contrast-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Cinematic Image Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25 pointer-events-none" />

                    {/* Signature Inverted Notch Scoop Cradle inside the image */}
                    <div className="absolute bottom-0 right-0 z-20 h-[80px] w-[80px] bg-white rounded-tl-[28px]">
                      {/* Top Concave Curve Scoop */}
                      <svg
                        className="absolute -top-[22px] right-0 h-[22px] w-[22px] fill-white"
                        viewBox="0 0 22 22"
                        aria-hidden="true"
                      >
                        <path d="M22 22 V0 C22 12.15 12.15 22 0 22 H22 Z" />
                      </svg>

                      {/* Left Concave Curve Scoop */}
                      <svg
                        className="absolute bottom-0 -left-[22px] h-[22px] w-[22px] fill-white"
                        viewBox="0 0 22 22"
                        aria-hidden="true"
                      >
                        <path d="M22 22 H0 C12.15 22 22 12.15 22 0 V22 Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Perfectly Round Floating Action Button - Positioned outside overflow-hidden for 100% full circle */}
                  <div className="absolute bottom-2.5 right-2.5 z-30 pointer-events-none">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_10px_28px_rgba(0,0,0,0.3)] ${card.btnColor}`}
                    >
                      <ArrowUpRight className="h-6 w-6 stroke-[2.3] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                {/* 2. Lower Content Block (Title & Description) */}
                <div className="pt-5 px-1 flex flex-col">
                  {/* Title */}
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-obsidian tracking-tight group-hover:text-industrial-orange transition-colors">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-2">
                    {card.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
