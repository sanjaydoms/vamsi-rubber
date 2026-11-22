import type { Metadata } from "next";
import { ProductsCatalogueClient } from "@/components/products/ProductsCatalogueClient";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Products — Domestic & Export Retreading Materials",
  description:
    "Explore Vamshi Rubber Limited's Domestic and Export retreading portfolio: PCTR (33+ export & 40+ domestic tread patterns), Vulcanising Solution, Bonding Gum, Cushion Gum, Extruded Rope Rubber, Curing Envelopes, and CBTR.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ market?: string }>;
}) {
  const params = await searchParams;
  const initialMarket =
    params.market === "domestic" || params.market === "export" ? params.market : "all";

  return (
    <>
      <section className="relative overflow-hidden bg-obsidian text-warm-white pt-36 pb-20 lg:pt-44 lg:pb-24 border-b border-white/10">
        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-industrial-orange shadow-sm" />
            <span className="font-heading text-xs uppercase tracking-[0.2em] font-semibold text-industrial-orange">
              PRODUCT CATALOGUE · DOMESTIC &amp; EXPORT
            </span>
          </div>
          <h1 className="max-w-4xl font-heading text-4xl sm:text-6xl lg:text-[4.25rem] font-bold uppercase tracking-tight leading-[0.98] text-white">
            THE RIGHT MATERIAL FOR EVERY RETREADING APPLICATION.
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-warm-white/80">
            Complete cold and conventional retreading systems manufactured under ISO 9001:2015 process controls — engineered for Highway, Regional, Urban, Mixed Service, Agricultural, and Mines/OTR fleets.
          </p>
        </div>
      </section>

      <ProductsCatalogueClient initialMarket={initialMarket} />

      <FinalCta
        headline="NEED CUSTOM WIDTHS OR COMPOUND RECOMMENDATIONS?"
        subtext="Share your casing sizes, curing chamber temperatures, or export market requirements with our technical team."
        primaryLabel="REQUEST TECHNICAL CONSULT"
        primaryHref="/contact"
        secondaryLabel="EXPLORE QUALITY STANDARDS"
        secondaryHref="/quality"
      />
    </>
  );
}
