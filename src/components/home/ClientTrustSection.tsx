"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { CLIENTS, TESTIMONIALS } from "@/data/company";

export function ClientTrustSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeItems = [...CLIENTS, ...CLIENTS];

  // Automatically transition cards every 5 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="relative overflow-hidden bg-white text-obsidian pb-16 lg:pb-24">
      {/* Top Header */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-14 pb-8 lg:pt-18">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-slate-200 pb-8">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-industrial-orange" />
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
                CLIENT TRUST &amp; TESTIMONIALS
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-[1.03] text-obsidian">
              TRUSTED RELATIONSHIPS.
              <br />
              PROVEN PERFORMANCE.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            Major retreading supplier to India&apos;s leading State Road Transport Corporations (SRTCs), commercial logistics fleets, and over 400 authorized retreaders.
          </p>
        </div>
      </div>

      {/* Continuous Logo Marquee */}
      <div className="relative py-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-6 will-change-transform">
          {marqueeItems.map((client, idx) => (
            <div
              key={`${client.id}-${idx}`}
              className="relative h-[80px] w-[155px] shrink-0 overflow-hidden border border-slate-200 bg-[#EEEEEE] shadow-xs transition-all duration-300 hover:shadow-md hover:border-industrial-orange"
              title={client.fullName}
            >
              <Image
                src={client.logo}
                alt={client.fullName}
                width={155}
                height={80}
                className="h-full w-full object-cover"
                loading={idx < 12 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Organic Curved Customer Testimonial Showcase (Exact Minimal Design Matching Reference) */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-10 lg:pt-14">
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative overflow-hidden rounded-3xl bg-[#FAF9F6] border border-slate-200/90 shadow-[0_20px_60px_rgba(0,0,0,0.06)] min-h-[380px] sm:min-h-[420px] lg:min-h-[450px] flex flex-col md:block cursor-default"
        >
          {/* Left Side: High-Resolution Editorial Portrait Image */}
          <div className="relative h-[320px] sm:h-[380px] md:absolute md:inset-y-0 md:left-0 md:h-full md:w-[48%] overflow-hidden bg-slate-900">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={t.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  idx === activeIndex ? "opacity-100 z-1" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={t.image || "/images/testimonials/tanya_singer.jpg"}
                  alt={t.author}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center contrast-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}

            {/* Subtle photo vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-transparent pointer-events-none z-2" />
          </div>

          {/* Elegant Organic S-Curve Divider (Exact Reference Curvature with Safe Margin) */}
          <div className="pointer-events-none absolute inset-0 hidden md:block z-5 select-none">
            <svg
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <path
                d="M 400 0 C 450 110, 460 210, 410 320 C 360 410, 310 460, 260 500 L 1000 500 L 1000 0 Z"
                fill="#FAF9F6"
              />
            </svg>
          </div>

          {/* Mobile Bottom Curve */}
          <div className="pointer-events-none absolute top-[300px] sm:top-[360px] inset-x-0 h-10 md:hidden z-5 select-none">
            <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="h-full w-full">
              <path d="M 0 0 C 35 20, 65 0, 100 20 L 100 20 L 0 20 Z" fill="#FAF9F6" />
            </svg>
          </div>

          {/* Right Side: Editorial Content Area with Ample Margin and Smooth Crossfade */}
          <div className="relative z-10 flex flex-col justify-center p-8 sm:p-12 md:p-14 lg:p-16 md:w-[54%] md:ml-auto md:pl-8 lg:pl-14 min-h-[380px] sm:min-h-[420px] lg:min-h-[450px]">
            {TESTIMONIALS.map((t, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={t.id}
                  className={`transition-all duration-1000 ease-in-out ${
                    isActive
                      ? "opacity-100 translate-y-0 relative z-1"
                      : "opacity-0 translate-y-2 absolute inset-y-0 right-0 left-8 sm:left-12 md:left-8 lg:left-14 pointer-events-none z-0 flex flex-col justify-center"
                  }`}
                >
                  {/* Author Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-obsidian">
                        {t.author}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium italic">
                        {t.role}
                        {t.company && (
                          <span className="not-italic text-slate-700 font-semibold ml-1.5">
                            · {t.company}
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Editorial Quotation */}
                  <div className="relative mt-6 sm:mt-8">
                    <Quote className="pointer-events-none absolute right-0 -top-6 h-16 w-16 text-slate-200/40" />
                    <blockquote className="relative z-1 font-heading text-xl sm:text-2xl lg:text-3xl font-medium leading-[1.35] text-obsidian tracking-tight">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
