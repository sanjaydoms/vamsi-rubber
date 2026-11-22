import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, FileDown } from "lucide-react";
import {
  EXPORT_PCTR_PATTERNS,
  getProductBySlug,
  getRelatedProducts,
  PRODUCTS,
} from "@/data/products";
import { MagneticButton } from "@/components/MagneticButton";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Product Not Found" };
  }
  return {
    title: `${product.name} (${product.code})`,
    description: `${product.tagline} ${product.description}`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(slug, 3);
  const appPhotos = [
    { src: "/images/editorial/hyderabad_truck.jpg", label: "Commercial Freight Corridor" },
    { src: "/images/editorial/tsrtc_bus.jpg", label: "State Transport Passenger Fleet" },
    { src: "/images/editorial/tyre_manufacture_factory.jpg", label: "Precured & Mould-Cured Casings" },
  ];

  return (
    <>
      {/* 1. Product Hero */}
      <section className="relative overflow-hidden bg-obsidian text-warm-white pt-32 pb-20 lg:pt-40 lg:pb-24 border-b border-white/10">
        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Link
            href="/products"
            className="mb-8 inline-flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-warm-white/70 hover:text-industrial-orange transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Product Catalogue</span>
          </Link>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-industrial-orange bg-industrial-orange/15 px-3.5 py-1 font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-industrial-orange">
                  {product.code}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1 font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-warm-white">
                  {product.market === "both"
                    ? "DOMESTIC & EXPORT"
                    : product.market === "export"
                      ? "EXPORT RANGE"
                      : "DOMESTIC RANGE"}
                </span>
                <span className="font-heading text-xs uppercase tracking-[0.16em] text-warm-white/60 font-medium">
                  {product.categoryLabel}
                </span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[1.02] text-white">
                {product.name}
              </h1>

              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-warm-white/80">
                {product.tagline}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <MagneticButton
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  variant="primary"
                >
                  <span>REQUEST QUOTE FOR {product.shortName.toUpperCase()}</span>
                </MagneticButton>
                <a
                  href={product.datasheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-warm-white hover:border-industrial-orange hover:text-industrial-orange transition-all duration-300"
                >
                  <FileDown className="h-4 w-4 text-industrial-orange" />
                  <span>DATASHEET PDF</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-white/20 bg-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.4)] group">
                <Image
                  src={product.editorialImage || product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                {/* Subtle Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                {/* Bottom Architectural Caption Strip */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6 flex items-end justify-between border-t border-white/10 bg-gradient-to-t from-black/90 to-transparent">
                  <div>
                    <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-industrial-orange font-bold">
                      {product.categoryLabel}
                    </p>
                    <p className="font-heading text-lg sm:text-xl font-bold uppercase tracking-tight text-white mt-0.5">
                      {product.shortName}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 border border-white/15">
                    <span className="h-1.5 w-1.5 rounded-full bg-industrial-orange" />
                    <span className="font-heading text-[9px] uppercase tracking-[0.16em] text-white/90 font-bold">
                      VAMSHI RUBBER LIMITED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Product Overview & 3. Features and Benefits */}
      <section className="bg-white text-obsidian border-b border-slate-200">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            {/* Overview */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-industrial-orange" />
                <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
                  PRODUCT OVERVIEW
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-obsidian">
                ENGINEERING PURPOSE &amp; PERFORMANCE
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-slate-600">
                {product.overview}
              </p>

              <div className="pt-4">
                <p className="font-heading text-[11px] uppercase tracking-[0.16em] text-slate-500 font-bold mb-3">
                  PRIMARY APPLICATIONS
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app) => (
                    <span
                      key={app}
                      className="rounded-full border border-slate-200/90 bg-[#FAF9F6] px-4 py-1.5 font-heading text-xs font-medium uppercase tracking-[0.1em] text-obsidian shadow-xs"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Features and Benefits */}
            <div className="lg:col-span-7 rounded-3xl border border-slate-200/90 bg-[#FAF9F6] p-8 sm:p-10 space-y-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
                FEATURES &amp; OPERATIONAL BENEFITS
              </span>
              <ul className="divide-y divide-slate-200">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3.5 py-4 first:pt-2 last:pb-0">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-industrial-orange" />
                    <span className="text-sm sm:text-base leading-relaxed text-slate-700">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Technical Specifications & 5. Compounds & Variants */}
      <section className="bg-[#FAF9F6] text-obsidian border-b border-slate-200">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-industrial-orange" />
                <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
                  TECHNICAL SPECIFICATION
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-obsidian">
                PHYSICAL PARAMETERS &amp; STANDARDS
              </h2>
              <div className="rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-slate-200">
                    {product.specifications.map((spec) => (
                      <tr key={spec.parameter} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-heading text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 w-1/3">
                          {spec.parameter}
                        </td>
                        <td className="px-6 py-4 text-obsidian font-medium">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
                COMPOUNDS &amp; VARIANTS
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-obsidian">
                AVAILABLE FORMULATIONS
              </h2>
              <div className="space-y-3.5 pt-2">
                {product.variants.map((variant) => (
                  <div
                    key={variant.name}
                    className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-1.5 shadow-sm hover:border-industrial-orange/60 transition-colors"
                  >
                    <p className="font-heading text-base font-bold text-obsidian">
                      {variant.name}
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                      {variant.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dedicated Pattern Matrix for PCTR detail view */}
          {product.slug === "pctr" && (
            <div className="mt-16 border-t border-slate-200 pt-16">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="font-heading text-xs uppercase tracking-[0.18em] font-semibold text-industrial-orange">
                    EXPORT TREAD PROFILE SAMPLE MATRIX
                  </span>
                  <h3 className="mt-1 font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-obsidian">
                    HIGHLIGHTED EXPORT PCTR PATTERNS
                  </h3>
                </div>
                <Link
                  href="/products"
                  className="font-heading text-xs uppercase tracking-[0.14em] font-semibold text-industrial-orange hover:underline"
                >
                  View all 33 patterns in catalogue →
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {EXPORT_PCTR_PATTERNS.slice(0, 8).map((pat) => (
                  <div key={pat.code} className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs hover:border-industrial-orange/60 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xs font-bold text-industrial-orange">
                        {pat.code}
                      </span>
                      <span className="text-[10px] font-heading font-medium text-slate-500">
                        NSD {pat.nsdRangeMm} mm
                      </span>
                    </div>
                    <p className="font-heading text-sm font-bold text-obsidian tracking-tight">{pat.name}</p>
                    <div className="relative h-20 w-full rounded-xl overflow-hidden bg-slate-50 p-1.5 border border-slate-100">
                      <Image
                        src={pat.thumbnail}
                        alt={pat.name}
                        fill
                        className="object-contain"
                        sizes="240px"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. Application Gallery & 7. Datasheet Download */}
      <section className="bg-obsidian text-white border-b border-white/10">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 lg:py-24">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8">
            <div>
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
                APPLICATION GALLERY &amp; DATASHEET
              </span>
              <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                OPERATIONAL FIELD CONTEXT
              </h2>
            </div>

            <a
              href={product.datasheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-industrial-orange px-6 py-4 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-industrial-red transition-all duration-300 shadow-lg"
            >
              <FileDown className="h-4 w-4" />
              <span>{product.datasheetLabel}</span>
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {appPhotos.map((photo) => (
              <div
                key={photo.label}
                className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/15 bg-obsidian shadow-xl"
              >
                <Image
                  src={photo.src}
                  alt={photo.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-white">
                  {photo.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Related Products */}
      <section className="bg-obsidian text-warm-white border-b border-white/10">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 lg:py-24">
          <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-6">
            <div>
              <span className="font-heading text-xs uppercase tracking-[0.2em] font-semibold text-industrial-orange">
                COMPATIBLE RETREADING SYSTEM
              </span>
              <h2 className="mt-2 font-heading text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                RELATED PRODUCTS
              </h2>
            </div>
            <Link
              href="/products"
              className="font-heading text-xs uppercase tracking-[0.14em] font-semibold text-warm-white/70 hover:text-industrial-orange transition-colors"
            >
              All Products →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                className="group rounded-2xl border border-white/10 bg-[#101E3C]/60 p-6 backdrop-blur-xs shadow-xl transition-all duration-300 hover:border-industrial-orange/60 hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <span className="font-heading text-[10px] uppercase tracking-[0.16em] font-bold text-industrial-orange">
                    {item.categoryLabel}
                  </span>
                  <h3 className="mt-1 font-heading text-xl font-bold text-white group-hover:text-industrial-orange transition-colors">
                    {item.name}
                  </h3>
                  <div className="relative my-5 aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-900 border border-white/15">
                    <Image
                      src={item.editorialImage || item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-108"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-2.5 left-3 font-heading text-[10px] font-bold uppercase tracking-wider text-white">
                      {item.code}
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 font-heading text-xs uppercase tracking-[0.14em] font-semibold text-warm-white/80 group-hover:text-industrial-orange">
                  <span>Inspect Specs</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Enquiry CTA */}
      <section className="bg-obsidian text-warm-white py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="font-heading text-xs uppercase tracking-[0.2em] font-semibold text-industrial-orange">
              DIRECT ENQUIRY
            </span>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              ENQUIRE ABOUT {product.shortName.toUpperCase()}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-warm-white/70 font-normal">
              Speak directly with Vamshi Rubber&apos;s commercial and technical team for roll dimensions, MOQs, domestic depot dispatch, or export quotations.
            </p>
          </div>

          <MagneticButton
            href={`/contact?product=${encodeURIComponent(product.name)}`}
            variant="primary"
          >
            <span>SUBMIT BUSINESS ENQUIRY</span>
          </MagneticButton>
        </div>
      </section>
    </>
  );
}
