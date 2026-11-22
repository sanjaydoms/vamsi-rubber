"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

const HERO_SHOWCASE_IMAGES = [
  {
    src: "/images/editorial/truck_wheel_hero.jpg",
    alt: "Precision precured tread rubber in active commercial highway operation",
    caption: "Precured Tread Rubber (PCTR) · 33+ Export Profiles",
  },
  {
    src: "/images/editorial/rubber_mill.jpg",
    alt: "Industrial rubber compounding mixing mill machinery in operation",
    caption: "In-House Compounding & Polymer Milling · Choutuppal",
  },
  {
    src: "/images/editorial/tire_transport.jpg",
    alt: "Heavy commercial logistics hauling industrial tyre retread products",
    caption: "Commercial Freight Logistics & Pan-India Fleet Distribution",
  },
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SHOWCASE_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Entrance typography and elements animation with GSAP
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap } = getGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-reveal]",
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Hero Showcase"
      className="relative w-full overflow-hidden bg-[#FAF9F6] text-obsidian pt-28 sm:pt-36 lg:pt-40 pb-0"
    >
      {/* Architectural Subtle Vertical Grid Lines (Exact Match to Reference Style) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 h-full select-none"
      >
        <div className="border-r border-slate-200/50 border-dashed h-full" />
        <div className="border-r border-slate-200/50 border-dashed h-full" />
        <div className="border-r border-slate-200/50 border-dashed h-full hidden sm:block" />
        <div className="border-r border-slate-200/50 border-dashed h-full" />
        <div className="border-r border-slate-200/50 border-dashed h-full hidden lg:block" />
        <div className="border-r border-slate-200/50 border-dashed h-full hidden sm:block" />
        <div className="border-r border-slate-200/50 border-dashed h-full hidden lg:block" />
        <div className="border-r border-slate-200/50 border-dashed h-full" />
        <div className="border-r border-slate-200/50 border-dashed h-full hidden lg:block" />
        <div className="border-r border-slate-200/50 border-dashed h-full hidden sm:block" />
        <div className="border-r border-slate-200/50 border-dashed h-full hidden lg:block" />
        <div className="h-full" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Main 2-Column Split: Exact Match to User's Uploaded Reference */}
        <div className="grid grid-cols-1 gap-12 sm:gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-24 lg:items-end justify-between">
          {/* Left Column: Eyebrow Pill + Massive Headline */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start">
            {/* Pill: [■ Trusted manufacturing partner] */}
            <div
              data-hero-reveal
              className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/90 bg-white/95 px-3.5 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-7 sm:mb-9 backdrop-blur-xs"
            >
              <span className="h-2 w-2 rounded-[2px] bg-industrial-orange shrink-0" />
              <span className="font-heading text-xs font-semibold tracking-wide text-slate-800">
                Trusted manufacturing partner
              </span>
            </div>

            {/* Headline: From raw material to market-ready */}
            <h1
              data-hero-reveal
              className="font-heading text-5xl sm:text-7xl lg:text-[5rem] xl:text-[6rem] font-bold tracking-[-0.035em] leading-[0.96] text-obsidian"
            >
              From raw <span className="text-industrial-orange">material</span>
              <br />
              to market-ready
            </h1>
          </div>

          {/* Right Column: // SINCE - 1993 // + Description + Dark Button with Orange Arrow */}
          <div
            data-hero-reveal
            className="lg:col-span-5 xl:col-span-4 xl:col-start-9 flex flex-col items-start lg:pl-8 xl:pl-12 pb-2 sm:pb-3"
          >
            {/* // SINCE - 1993 // */}
            <p className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-slate-900">
              &#47;&#47; SINCE - 1993 &#47;&#47;
            </p>

            {/* Description Paragraph */}
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 max-w-md font-normal">
              From concept to production, we deliver high-quality, scalable, and cost-effective solutions tailored to your business needs.
            </p>

            {/* Custom Rounded Dark Capsule Button with Orange Arrow Square */}
            <Link
              href="/products"
              className="group inline-flex items-center justify-between gap-6 rounded-xl bg-[#111827] pl-6 pr-2.5 py-2.5 shadow-lg hover:bg-black transition-all duration-300 hover:shadow-xl mt-7 sm:mt-8"
            >
              <span className="font-heading text-sm font-semibold tracking-wide text-white">
                Explore Our Capabilities
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-industrial-orange text-white shadow-sm transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Full-Width Edge-to-Edge Editorial Showcase Frame */}
      <div
        data-hero-reveal
        className="mt-14 sm:mt-18 lg:mt-22 relative w-full overflow-hidden bg-obsidian border-y border-slate-200/80 shadow-[0_25px_60px_rgba(0,0,0,0.15)]"
      >
        <div className="relative w-full h-[540px] sm:h-[660px] lg:h-[780px] xl:h-[860px] overflow-hidden">
          {HERO_SHOWCASE_IMAGES.map((img, idx) => (
            <div
              key={img.src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? "opacity-100 z-1" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={idx === 0}
                className="object-cover object-center contrast-105"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
