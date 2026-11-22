import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass, FileCode, Layers, Package } from "lucide-react";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "Website Sitemap & Directory | Vamshi Rubber Limited",
  description:
    "Complete architectural sitemap and page directory for Vamshi Rubber Limited (BSE: 530369): products, specifications, corporate information, and downloads.",
};

export default function SitemapPage() {
  return (
    <>
      {/* 1. Hero Header */}
      <section className="relative overflow-hidden bg-obsidian text-warm-white pt-32 pb-20 lg:pt-40 lg:pb-24 border-b border-white/10">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-industrial-orange" />
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
              ARCHITECTURAL DIRECTORY
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white max-w-4xl leading-[1.03]">
            COMPLETE WEBSITE
            <br />
            SITEMAP &amp; INDEX.
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-warm-white/80">
            A comprehensive, structural overview of all corporate sections, product specifications, market segments, technical brochures, and machine-readable endpoints across the Vamshi Rubber Limited digital platform.
          </p>
        </div>
      </section>

      {/* 2. Structured Directory Grid */}
      <section className="bg-white text-obsidian py-20 lg:py-28 border-b border-slate-200">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Column 1: Core Corporate Pages */}
            <div className="rounded-[24px] border border-slate-200/90 bg-[#FAF9F6] p-7 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-obsidian text-white">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-heading text-[10px] uppercase tracking-[0.18em] text-industrial-orange font-bold">
                    SECTION 01
                  </span>
                  <h2 className="font-heading text-lg font-bold uppercase tracking-tight text-obsidian">
                    Core Corporate Pages
                  </h2>
                </div>
              </div>

              <ul className="space-y-3">
                {[
                  { title: "Home / Overview", href: "/", desc: "Hero, 30+ year heritage, showcase & services" },
                  { title: "About Us", href: "/about", desc: "Corporate timeline, heritage & Hercules collaboration" },
                  { title: "Quality & Testing Lab", href: "/quality", desc: "ISO 9001:2015, rheometer & tensile parameters" },
                  { title: "Industries Served", href: "/industries", desc: "State transport, logistics, mining & agriculture" },
                  { title: "Facility Gallery", href: "/gallery", desc: "Photographic archive of Choutuppal campus & bays" },
                  { title: "News & Press Room", href: "/news", desc: "Press releases, corporate milestones & announcements" },
                  { title: "Get In Touch", href: "/contact", desc: "Corporate headquarters, plant campus & RFQ form" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-start justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-industrial-orange/60 hover:shadow-xs transition-all"
                    >
                      <div>
                        <p className="font-heading text-sm font-bold text-obsidian group-hover:text-industrial-orange transition-colors">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-industrial-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-0.5 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Complete Product Portfolio */}
            <div className="rounded-[24px] border border-slate-200/90 bg-[#FAF9F6] p-7 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-obsidian text-white">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-heading text-[10px] uppercase tracking-[0.18em] text-industrial-orange font-bold">
                    SECTION 02
                  </span>
                  <h2 className="font-heading text-lg font-bold uppercase tracking-tight text-obsidian">
                    Product Catalogue
                  </h2>
                </div>
              </div>

              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/products"
                    className="group flex items-center justify-between p-3 rounded-xl bg-obsidian text-white hover:bg-black transition-colors"
                  >
                    <div>
                      <p className="font-heading text-sm font-bold uppercase tracking-wider text-industrial-orange">
                        All Products Catalogue
                      </p>
                      <p className="text-xs text-white/70">Main product index &amp; segment filters</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                </li>

                {PRODUCTS.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="group flex items-start justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-industrial-orange/60 hover:shadow-xs transition-all"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-industrial-orange">
                            {product.code}
                          </span>
                          <span className="font-heading text-sm font-bold text-obsidian group-hover:text-industrial-orange transition-colors">
                            {product.shortName}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{product.categoryLabel}</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-industrial-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-0.5 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Markets, Catalogues & Technical Feeds */}
            <div className="rounded-[24px] border border-slate-200/90 bg-[#FAF9F6] p-7 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-obsidian text-white">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-heading text-[10px] uppercase tracking-[0.18em] text-industrial-orange font-bold">
                    SECTION 03
                  </span>
                  <h2 className="font-heading text-lg font-bold uppercase tracking-tight text-obsidian">
                    Markets &amp; Machine Feeds
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="font-heading text-[10px] uppercase tracking-[0.14em] text-slate-500 font-bold block mb-2">
                    Market Segmentation
                  </span>
                  <div className="space-y-2">
                    <Link
                      href="/products?market=domestic"
                      className="group flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-industrial-orange/60 transition-all"
                    >
                      <div>
                        <p className="font-heading text-xs font-bold uppercase tracking-wider text-obsidian group-hover:text-industrial-orange">
                          Domestic Product Range
                        </p>
                        <p className="text-[11px] text-slate-500">Pan-India state transport &amp; retread shop tier</p>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-industrial-orange" />
                    </Link>

                    <Link
                      href="/products?market=export"
                      className="group flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-industrial-orange/60 transition-all"
                    >
                      <div>
                        <p className="font-heading text-xs font-bold uppercase tracking-wider text-obsidian group-hover:text-industrial-orange">
                          Export Range (REACH Compliant)
                        </p>
                        <p className="text-[11px] text-slate-500">33 profiles certified for international fleets</p>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-industrial-orange" />
                    </Link>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="font-heading text-[10px] uppercase tracking-[0.14em] text-slate-500 font-bold block mb-2">
                    PDF Technical Catalogues
                  </span>
                  <div className="space-y-2">
                    <a
                      href="/brochures/export_brochure.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-industrial-orange/60 transition-all"
                    >
                      <div>
                        <p className="font-heading text-xs font-bold uppercase tracking-wider text-obsidian group-hover:text-industrial-orange">
                          Export Brochure &amp; PCTR Spec (PDF)
                        </p>
                        <p className="text-[11px] text-slate-500">33 tread pattern dimensions &amp; weights</p>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-industrial-orange" />
                    </a>

                    <a
                      href="/brochures/domestic_brochure.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-industrial-orange/60 transition-all"
                    >
                      <div>
                        <p className="font-heading text-xs font-bold uppercase tracking-wider text-obsidian group-hover:text-industrial-orange">
                          Domestic Brochure &amp; Compound Spec (PDF)
                        </p>
                        <p className="text-[11px] text-slate-500">Cushion gum, BVC &amp; CBTR formulations</p>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-industrial-orange" />
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="font-heading text-[10px] uppercase tracking-[0.14em] text-slate-500 font-bold block mb-2">
                    Search Engine Endpoints
                  </span>
                  <div className="space-y-2">
                    <a
                      href="/sitemap.xml"
                      target="_blank"
                      className="group flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-industrial-orange/60 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <FileCode className="h-4 w-4 text-industrial-orange" />
                        <div>
                          <p className="font-heading text-xs font-bold uppercase tracking-wider text-obsidian group-hover:text-industrial-orange">
                            XML Sitemap (/sitemap.xml)
                          </p>
                          <p className="text-[11px] text-slate-500">Dynamic search crawler index</p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-industrial-orange" />
                    </a>

                    <a
                      href="/robots.txt"
                      target="_blank"
                      className="group flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-industrial-orange/60 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <FileCode className="h-4 w-4 text-industrial-orange" />
                        <div>
                          <p className="font-heading text-xs font-bold uppercase tracking-wider text-obsidian group-hover:text-industrial-orange">
                            Robots.txt (/robots.txt)
                          </p>
                          <p className="text-[11px] text-slate-500">Crawler indexing permissions</p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-industrial-orange" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
