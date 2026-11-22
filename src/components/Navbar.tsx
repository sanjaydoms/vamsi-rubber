"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  FileDown,
  FolderTree,
  Images,
  Menu,
  Newspaper,
  X,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products", hasMega: true },
  { label: "Quality", href: "/quality" },
  { label: "Industries", href: "/industries" },
];

const MORE_DROPDOWN_LINKS = [
  {
    label: "Gallery",
    href: "/gallery",
    description: "Facility, plant & field photographic archive",
    icon: Images,
  },
  {
    label: "News",
    href: "/news",
    description: "Corporate press releases & announcements",
    icon: Newspaper,
  },
  {
    label: "Sitemap",
    href: "/sitemap",
    description: "Architectural website directory & endpoints",
    icon: FolderTree,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMegaOpen(false);
    setMoreOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const domesticProducts = PRODUCTS.filter((p) => p.market === "domestic" || p.market === "both");
  const exportProducts = PRODUCTS.filter((p) => p.market === "export" || p.market === "both");

  const solidHeader = true;
  const isMoreActive =
    pathname === "/gallery" || pathname === "/news" || pathname === "/sitemap";

  return (
    <>
      <header
        onMouseLeave={() => {
          setMegaOpen(false);
          setMoreOpen(false);
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solidHeader
            ? "bg-obsidian/95 backdrop-blur-md border-b border-white/10"
            : "bg-gradient-to-b from-obsidian/80 via-obsidian/35 to-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Left: Vamshi Rubber Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-3.5 group" aria-label="Vamshi Rubber Limited Home">
            <Image
              src="/images/brand/vr-logo-new.png"
              alt="Vamshi Rubber Limited"
              width={140}
              height={65}
              className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <div className="flex flex-col">
              <span className="font-heading text-sm sm:text-base font-bold uppercase tracking-wider text-white leading-none">
                VAMSHI RUBBER
              </span>
              <span className="font-heading text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-slate-400 font-medium mt-0.5">
                LIMITED
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              if (item.hasMega) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => {
                      setMegaOpen(true);
                      setMoreOpen(false);
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`relative inline-flex items-center gap-1.5 py-2 font-heading text-xs uppercase tracking-[0.14em] transition-colors ${
                        active || megaOpen ? "text-industrial-orange" : "text-warm-white/90 hover:text-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          megaOpen ? "rotate-180 text-industrial-orange" : ""
                        }`}
                      />
                      <span
                        className={`absolute bottom-0 left-0 h-[1.5px] bg-industrial-orange transition-all duration-300 ${
                          active || megaOpen ? "w-full" : "w-0"
                        }`}
                      />
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => {
                    setMegaOpen(false);
                    setMoreOpen(false);
                  }}
                  className={`group relative py-2 font-heading text-xs uppercase tracking-[0.14em] transition-colors ${
                    active ? "text-industrial-orange" : "text-warm-white/90 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-industrial-orange transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}

            {/* "More" Dropdown Menu */}
            <div
              className="relative"
              onMouseEnter={() => {
                setMegaOpen(false);
                setMoreOpen(true);
              }}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMoreOpen((prev) => !prev)}
                className={`group relative inline-flex items-center gap-1.5 py-2 font-heading text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                  moreOpen || isMoreActive
                    ? "text-industrial-orange"
                    : "text-warm-white/90 hover:text-white"
                }`}
              >
                <span>MORE</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    moreOpen ? "rotate-180 text-industrial-orange" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-industrial-orange transition-all duration-300 ${
                    moreOpen || isMoreActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute top-full right-0 mt-3 w-80 rounded-2xl border border-white/20 bg-[#0A1128] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-50"
                    style={{ backgroundColor: "#0A1128" }}
                  >
                    <div className="space-y-1.5">
                      {MORE_DROPDOWN_LINKS.map((item) => {
                        const IconComponent = item.icon;
                        const isItemActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMoreOpen(false)}
                            className={`group flex items-start gap-3.5 rounded-xl p-3 transition-all ${
                              isItemActive
                                ? "bg-white/10 text-white border border-white/10"
                                : "text-white/90 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                isItemActive
                                  ? "bg-industrial-orange text-white"
                                  : "bg-white/10 text-white group-hover:bg-industrial-orange group-hover:text-white"
                              }`}
                            >
                              <IconComponent className="h-5 w-5 stroke-[2]" />
                            </div>
                            <div className="flex-1">
                              <p
                                className={`font-heading text-xs font-bold uppercase tracking-wider transition-colors ${
                                  isItemActive
                                    ? "text-industrial-orange"
                                    : "text-white group-hover:text-industrial-orange"
                                }`}
                              >
                                {item.label}
                              </p>
                              <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right: CTA + Mobile Trigger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="group hidden sm:inline-flex items-center justify-between gap-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 pl-4 pr-1.5 py-1.5 shadow-sm transition-all duration-300"
            >
              <span className="font-heading text-xs font-semibold tracking-wide text-white">
                GET IN TOUCH
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-industrial-orange text-white shadow-xs transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              className="inline-flex lg:hidden h-11 w-11 items-center justify-center border border-white/20 bg-charcoal text-warm-white hover:border-industrial-orange transition-colors"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu for Products */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block border-t border-white/10 bg-obsidian/98 backdrop-blur-xl"
            >
              <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8 px-12 py-10">
                {/* Domestic Column */}
                <div className="col-span-4 border-r border-white/10 pr-8">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-heading text-[11px] uppercase tracking-[0.18em] text-industrial-orange">
                      01 / Domestic Products
                    </span>
                    <Link
                      href="/products?market=domestic"
                      className="text-[11px] font-heading uppercase tracking-[0.12em] text-neutral-grey hover:text-white"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {domesticProducts.map((product) => (
                      <Link
                        key={`dom-${product.slug}`}
                        href={`/products/${product.slug}`}
                        className="group flex items-center justify-between border-b border-white/5 py-2.5 text-sm text-warm-white/85 hover:text-white transition-colors"
                      >
                        <div>
                          <span className="font-heading font-medium">{product.shortName}</span>
                          <span className="ml-2.5 text-xs text-neutral-grey">{product.categoryLabel}</span>
                        </div>
                        <ArrowUpRight className="h-3.5 w-3.5 text-neutral-grey transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-industrial-orange" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Export Column */}
                <div className="col-span-4 border-r border-white/10 pr-8">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-heading text-[11px] uppercase tracking-[0.18em] text-industrial-orange">
                      02 / Export Products (REACH)
                    </span>
                    <Link
                      href="/products?market=export"
                      className="text-[11px] font-heading uppercase tracking-[0.12em] text-neutral-grey hover:text-white"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {exportProducts.map((product) => (
                      <Link
                        key={`exp-${product.slug}`}
                        href={`/products/${product.slug}`}
                        className="group flex items-center justify-between border-b border-white/5 py-2.5 text-sm text-warm-white/85 hover:text-white transition-colors"
                      >
                        <div>
                          <span className="font-heading font-medium">{product.shortName}</span>
                          <span className="ml-2.5 text-xs text-neutral-grey">{product.categoryLabel}</span>
                        </div>
                        <ArrowUpRight className="h-3.5 w-3.5 text-neutral-grey transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-industrial-orange" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Brochures & Technical Feature Card */}
                <div className="col-span-4 flex flex-col justify-between bg-charcoal p-6 border border-white/10">
                  <div>
                    <span className="font-heading text-[10px] uppercase tracking-[0.18em] text-neutral-grey">
                      TECHNICAL CATALOGUES
                    </span>
                    <h4 className="mt-2 font-heading text-xl font-semibold text-white">
                      33+ Export &amp; Domestic Tread Profiles
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-grey">
                      Download verified dimensional specifications, non-skid depths, roll weights, and cure parameters.
                    </p>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    <a
                      href="/brochures/export_brochure.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-white/15 bg-obsidian px-4 py-3 text-xs font-heading uppercase tracking-[0.12em] text-warm-white hover:border-industrial-orange hover:text-industrial-orange transition-colors"
                    >
                      <span>Export Brochure PDF</span>
                      <FileDown className="h-4 w-4" />
                    </a>
                    <a
                      href="/brochures/domestic_brochure.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-white/15 bg-obsidian px-4 py-3 text-xs font-heading uppercase tracking-[0.12em] text-warm-white hover:border-industrial-orange hover:text-industrial-orange transition-colors"
                    >
                      <span>Domestic Brochure 2024 PDF</span>
                      <FileDown className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-obsidian px-6 pb-8 pt-24 overflow-y-auto lg:hidden"
          >
            <nav className="space-y-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((item, idx) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between border-b border-white/10 py-4 font-heading text-2xl font-semibold tracking-tight ${
                        active ? "text-industrial-orange" : "text-warm-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-xs font-normal tracking-[0.16em] text-neutral-grey">
                        0{idx + 1}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* More Dropdown Items for Mobile */}
              <div className="pt-3 border-t border-white/10 mt-2">
                <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-industrial-orange font-bold px-1 block mb-2">
                  MORE PAGES
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {MORE_DROPDOWN_LINKS.map((item) => {
                    const IconComponent = item.icon;
                    const isItemActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-3.5 py-3 border transition-colors ${
                          isItemActive
                            ? "bg-white/10 border-industrial-orange text-white"
                            : "border-white/10 bg-charcoal text-warm-white hover:border-industrial-orange"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-4 w-4 text-industrial-orange" />
                          <span className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-normal">
                          {item.label === "Gallery"
                            ? "Photos"
                            : item.label === "News"
                              ? "Press"
                              : "Directory"}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>

            <div className="mt-8 space-y-5 border-t border-white/10 pt-6">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/products?market=domestic"
                  className="border border-white/15 bg-charcoal px-4 py-3 text-center font-heading text-xs uppercase tracking-[0.14em] text-warm-white"
                >
                  Domestic Range
                </Link>
                <Link
                  href="/products?market=export"
                  className="border border-white/15 bg-charcoal px-4 py-3 text-center font-heading text-xs uppercase tracking-[0.14em] text-warm-white"
                >
                  Export Range
                </Link>
              </div>

              <Link
                href="/contact"
                className="flex w-full items-center justify-center gap-2 bg-industrial-orange px-6 py-4 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#f83e3e]"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <div className="text-xs text-neutral-grey">
                <p>info@vamshirubber.org · +91 40 2980 2533</p>
                <p className="mt-1">Gachibowli, Hyderabad – 500 032, Telangana</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
