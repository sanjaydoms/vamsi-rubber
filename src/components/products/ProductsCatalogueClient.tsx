"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, FileDown, Search } from "lucide-react";
import { EXPORT_PCTR_PATTERNS, PRODUCTS } from "@/data/products";
import { COMPANY_INFO } from "@/data/company";

type MarketFilter = "all" | "domestic" | "export";
type TreadSegmentFilter =
  | "All"
  | "Highway & All-Wheel"
  | "Drive & Traction"
  | "Trailer & Mixed Service"
  | "Mines & OTR";

const PRODUCT_EDITORIAL_IMAGES: Record<string, string> = {
  pctr: "/images/editorial/truck_wheel_hero.jpg",
  "vulcanising-solution": "/images/editorial/tensile_lab.jpg",
  "bonding-gum": "/images/editorial/rubber_mill.jpg",
  "extruded-rope-rubber": "/images/editorial/extruder_machinery.jpg",
  "cushion-gum": "/images/products/cushion-gum-actual.jpg",
  "curing-envelopes": "/images/editorial/retread_wide.jpg",
  cbtr: "/images/editorial/ultra_wheel_exact.jpg",
  "rubber-compound-sheet": "/images/editorial/stacked_tires.jpg",
};

export function ProductsCatalogueClient({
  initialMarket = "all",
}: {
  initialMarket?: MarketFilter;
}) {
  const [market, setMarket] = useState<MarketFilter>(initialMarket);
  const [treadSegment, setTreadSegment] = useState<TreadSegmentFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (market === "all") return true;
      return p.market === market || p.market === "both";
    });
  }, [market]);

  const filteredPatterns = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return EXPORT_PCTR_PATTERNS.filter((pat) => {
      const matchesSeg = treadSegment === "All" || pat.segment === treadSegment;
      const matchesQuery =
        !q ||
        pat.name.toLowerCase().includes(q) ||
        pat.code.toLowerCase().includes(q) ||
        pat.applications.some((a) => a.toLowerCase().includes(q));
      return matchesSeg && matchesQuery;
    });
  }, [treadSegment, searchQuery]);

  const marketTabs: { id: MarketFilter; label: string; count: number }[] = [
    { id: "all", label: "ALL PRODUCTS", count: PRODUCTS.length },
    {
      id: "domestic",
      label: "DOMESTIC PRODUCTS",
      count: PRODUCTS.filter((p) => p.market === "domestic" || p.market === "both").length,
    },
    {
      id: "export",
      label: "EXPORT PRODUCTS",
      count: PRODUCTS.filter((p) => p.market === "export" || p.market === "both").length,
    },
  ];

  const segments: TreadSegmentFilter[] = [
    "All",
    "Highway & All-Wheel",
    "Drive & Traction",
    "Trailer & Mixed Service",
    "Mines & OTR",
  ];

  return (
    <>
      {/* Market Filter Bar & Product Grid */}
      <section className="bg-warm-white text-obsidian border-b border-obsidian/10">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
          {/* Interactive Category Filter */}
          <div className="mb-12 flex flex-col gap-6 border-b border-obsidian/15 pb-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Product market category">
              {marketTabs.map((tab) => {
                const isActive = market === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setMarket(tab.id)}
                    className={`relative rounded-xl px-5 py-3 font-heading text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-300 ${
                      isActive
                        ? "text-white shadow-md shadow-obsidian/20"
                        : "border border-slate-200 bg-white text-obsidian hover:border-industrial-orange"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="product-market-pill"
                        className="absolute inset-0 bg-[#0A1128] rounded-xl"
                        transition={{ type: "spring", stiffness: 360, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <span>{tab.label}</span>
                      <span className={isActive ? "text-industrial-orange" : "text-neutral-grey"}>
                        ({tab.count})
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-xs font-heading uppercase tracking-[0.14em] text-neutral-grey">
              ISO 9001:2015 Certified · REACH Compliant Export Range
            </p>
          </div>

          {/* Product Catalogue Grid matching Landing Page UI Card Design */}
          <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, idx) => {
              const editorialImage =
                product.editorialImage ||
                PRODUCT_EDITORIAL_IMAGES[product.slug] ||
                "/images/editorial/truck_wheel_hero.jpg";

              return (
                <motion.div
                  key={product.slug}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="group relative flex flex-col select-none"
                  >
                    {/* 1. Upper Full-Bleed Image Frame with Inverted Corner Notch */}
                    <div className="relative aspect-[4/3] w-full">
                      <div className="relative h-full w-full rounded-[28px] overflow-hidden bg-slate-900 shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:shadow-[0_24px_50px_rgba(0,0,0,0.18)]">
                        <Image
                          src={editorialImage}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 brightness-95 contrast-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Cinematic Image Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25 pointer-events-none" />

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

                      {/* Perfectly Round Floating Action Button */}
                      <div className="absolute bottom-2.5 right-2.5 z-30 pointer-events-none">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#101E3C] text-white shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:bg-industrial-orange group-hover:shadow-[0_10px_28px_rgba(0,0,0,0.3)]">
                          <ArrowUpRight className="h-6 w-6 stroke-[2.3] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* 2. Lower Content Block (Category, Title & Description) */}
                    <div className="pt-5 px-1 flex flex-col">
                      <span className="font-heading text-[11px] uppercase tracking-[0.16em] text-industrial-orange font-bold mb-1">
                        {product.categoryLabel}
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-obsidian tracking-tight group-hover:text-industrial-orange transition-colors">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive 33-Pattern Export PCTR Matrix */}
      <section className="bg-obsidian text-warm-white border-b border-white/10">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-white/10 pb-8">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-industrial-orange" />
                <span className="font-heading text-xs uppercase tracking-[0.2em] text-industrial-orange">
                  PRECURED TREAD PATTERN INDEX
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                33 VERIFIED EXPORT PCTR PROFILES
              </h2>
              <p className="mt-2 text-sm text-neutral-grey">
                Verified from Vamshi Rubber Export Catalogue · Widths 150–320 mm · ±2% Commercial Tolerance · Max Supply Length 3,750 mm.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-grey" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pattern code or name..."
                aria-label="Search tread pattern code or name"
                className="w-full border border-white/15 bg-charcoal py-3 pl-10 pr-4 text-xs text-white placeholder:text-neutral-grey focus:border-industrial-orange focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {segments.map((seg) => (
              <button
                key={seg}
                type="button"
                onClick={() => setTreadSegment(seg)}
                className={`border px-4 py-2 font-heading text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  treadSegment === seg
                    ? "border-industrial-orange bg-industrial-orange text-obsidian font-semibold"
                    : "border-white/15 bg-charcoal text-warm-white hover:border-white/40"
                }`}
              >
                {seg}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPatterns.map((pat) => (
              <div
                key={pat.code}
                className="flex flex-col justify-between rounded-2xl overflow-hidden border border-white/10 bg-[#101E3C]/60 backdrop-blur-xs p-6 shadow-xl hover:border-industrial-orange/60 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-industrial-orange">
                      {pat.code}
                    </span>
                    <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.12em] text-warm-white/70">
                      {pat.segment}
                    </span>
                  </div>
                  <h3 className="mt-1 font-heading text-lg font-bold text-white tracking-tight">
                    {pat.name}
                    {pat.directional && (
                      <span className="ml-2 text-[10px] font-normal uppercase tracking-[0.12em] text-industrial-orange">
                        · Directional
                      </span>
                    )}
                  </h3>

                  <div className="relative my-4 h-24 w-full overflow-hidden rounded-xl bg-white/95 p-2 shadow-xs">
                    <Image
                      src={pat.thumbnail}
                      alt={`${pat.name} (${pat.code}) tread pattern`}
                      fill
                      className="object-contain"
                      sizes="360px"
                    />
                  </div>
                </div>

                <div className="space-y-2 border-t border-white/10 pt-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-warm-white/60">Widths (mm)</span>
                    <span className="font-semibold text-warm-white">
                      {pat.widthsMm[0]}
                      {pat.widthsMm.length > 1
                        ? ` – ${pat.widthsMm[pat.widthsMm.length - 1]}`
                        : ""}{" "}
                      mm ({pat.widthsMm.length} sizes)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-white/60">NSD (mm)</span>
                    <span className="font-semibold text-warm-white">{pat.nsdRangeMm} mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-white/60">Weight / Meter</span>
                    <span className="font-semibold text-warm-white">{pat.kgPerMtrRange} kg/m</span>
                  </div>
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {pat.applications.map((app) => (
                      <span
                        key={app}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-heading font-medium uppercase tracking-[0.1em] text-warm-white/80"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPatterns.length === 0 && (
            <div className="border border-white/10 bg-charcoal p-12 text-center text-sm text-neutral-grey">
              No tread patterns matched “{searchQuery}”. Try clearing the filter.
            </div>
          )}
        </div>
      </section>

      {/* Downloadable Product Brochures */}
      <section className="bg-warm-white text-obsidian border-b border-obsidian/10">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
                TECHNICAL DOCUMENTATION
              </span>
              <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-obsidian">
                DOMESTIC &amp; EXPORT BROCHURE ARCHIVE
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-obsidian/75">
                Access complete dimensional tables including tread width, tread length, non-skid depth (NSD), weight per tread, treads per roll, and recommended tyre sizes.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {COMPANY_INFO.brochures.map((doc) => (
                <a
                  key={doc.href}
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-[#FAF9F6] p-7 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-industrial-orange/60 transition-all duration-300"
                >
                  <div>
                    <span className="rounded-full bg-industrial-orange/10 px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-industrial-orange border border-industrial-orange/20">
                      {doc.tag}
                    </span>
                    <h3 className="mt-4 font-heading text-xl font-bold tracking-tight text-obsidian group-hover:text-industrial-orange transition-colors">
                      {doc.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 font-normal">
                      {doc.subtitle}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-slate-200/80 pt-4 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-obsidian">
                    <span>Download PDF</span>
                    <FileDown className="h-4 w-4 text-industrial-orange transition-transform group-hover:translate-y-0.5" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
