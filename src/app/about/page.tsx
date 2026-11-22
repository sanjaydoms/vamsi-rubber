import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Factory, FlaskConical, ShieldCheck, Wrench } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";
import { JourneyTimeline } from "@/components/about/JourneyTimeline";
import { FinalCta } from "@/components/FinalCta";
import { MagneticButton } from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded in 1993 in technical collaboration with Hercules Tire & Rubber Co., USA. Learn about Vamshi Rubber Limited's manufacturing facility in Choutuppal, testing lab, and 200M+ kg retreading heritage.",
};

export default function AboutPage() {
  return (
    <>
      {/* 01. About Hero with Real Tyre Manufacture Photographic Background */}
      <section className="relative overflow-hidden bg-obsidian text-warm-white pt-36 pb-20 lg:pt-44 lg:pb-28 border-b border-white/10">
        {/* Authentic Tyre Manufacturing Facility Background */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/images/editorial/tyre_manufacture_factory.jpg"
            alt="Vamshi Tyre Manufacturing Facility"
            fill
            className="object-cover object-center brightness-75"
            priority
          />
          {/* Architectural Contrast Scrim to guarantee razor-sharp text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/95 via-obsidian/85 to-obsidian/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/70" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-industrial-orange shadow-sm" />
                <span className="font-heading text-xs uppercase tracking-[0.2em] font-semibold text-industrial-orange">
                  ABOUT VAMSHI RUBBER LIMITED · SINCE 1993
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-6xl lg:text-[4.5rem] font-bold uppercase tracking-tight leading-[0.98] text-white">
                ENGINEERING CONFIDENCE.
                <br />
                DELIVERING PERFORMANCE.
              </h1>
              <p className="mt-7 max-w-2xl text-base sm:text-lg leading-relaxed text-warm-white/80">
                Incorporated on {COMPANY_INFO.incorporated} with technical collaboration from {COMPANY_INFO.technicalPartner}, Vamshi Rubber Limited is a publicly listed (BSE: {COMPANY_INFO.bseCode}) Indian manufacturer of tyre retreading materials and equipment.
              </p>
            </div>

            <div className="lg:col-span-4 rounded-2xl bg-obsidian/80 border border-white/15 p-6 lg:p-7 backdrop-blur-md shadow-2xl">
              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-industrial-orange">
                CORPORATE &amp; PLANT PROFILE
              </p>
              <dl className="mt-4 space-y-3.5 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-2.5">
                  <dt className="text-warm-white/70">Incorporated</dt>
                  <dd className="font-semibold text-white">Nov 24, 1993</dd>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2.5">
                  <dt className="text-warm-white/70">Quality Standard</dt>
                  <dd className="font-semibold text-industrial-orange">ISO 9001:2015 (DNV)</dd>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2.5">
                  <dt className="text-warm-white/70">Plant Campus</dt>
                  <dd className="font-semibold text-white">4 Acres, Choutuppal</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-warm-white/70">Network</dt>
                  <dd className="font-semibold text-white">14 Depots · 400+ Customers</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Company Introduction */}
      <section className="bg-white text-obsidian border-b border-slate-200">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-industrial-orange" />
                <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
                  COMPANY INTRODUCTION
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-[1.03] text-obsidian">
                A LEGACY BUILT AROUND EVERY MILE.
              </h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-600">
                <p>
                  In the manufacture of a new commercial tyre, roughly 75%–80% of the structural cost resides in the casing body and 20%–25% in the tread. Applying a precision-engineered new tread over a sound casing delivers a fresh service life at under 50% of new tyre replacement cost.
                </p>
                <p>
                  Having delivered over 200 million kilograms of retreading material enabling approximately 20 million retreaded casings, Vamshi Rubber serves major State Road Transport Corporations (APSRTC, TSRTC, KSRTC, MSRTC, RSRTC, TNSTC), 400+ domestic retreaders, and international markets.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-5 items-end">
              <div className="sm:col-span-7 relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-slate-200 bg-obsidian shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
                <Image
                  src="/images/editorial/tyre_manufacture_factory.jpg"
                  alt="Vamshi Tyre Manufacturing Facility in Choutuppal"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 35vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-obsidian/90 backdrop-blur-xs px-4 py-3 text-[11px] font-heading font-semibold uppercase tracking-[0.14em] text-white">
                  Manufacturing Facility · Choutuppal
                </div>
              </div>
              <div className="sm:col-span-5 space-y-4 rounded-2xl border border-slate-200/90 bg-[#FAF9F6] p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.04)]">
                <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-industrial-orange font-bold">
                  PROVEN SCALE
                </p>
                <p className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-obsidian">200M+ KG</p>
                <p className="text-xs leading-relaxed text-slate-600 font-normal">
                  Retreading compound &amp; precured tread delivered across India and export partners.
                </p>
                <div className="border-t border-slate-200 pt-4">
                  <p className="font-heading text-3xl font-bold tracking-tight text-obsidian">20M+</p>
                  <p className="text-xs text-slate-600 font-normal mt-1">Tyre casings retreaded using Vamshi materials &amp; technology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Company Journey Interactive Timeline */}
      <section className="bg-obsidian text-warm-white border-b border-white/10">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-industrial-orange" />
                <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
                  COMPANY JOURNEY
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
                VERIFIED MILESTONES SINCE 1993.
              </h2>
            </div>
            <p className="text-xs font-heading uppercase tracking-[0.16em] text-neutral-grey font-medium">
              Select a stage to inspect verified milestone
            </p>
          </div>

          <JourneyTimeline />
        </div>
      </section>

      {/* 04. Manufacturing Infrastructure */}
      <section className="bg-white text-obsidian border-b border-slate-200">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
          <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end border-b border-slate-200 pb-8">
            <div className="lg:col-span-7">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-industrial-orange" />
                <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
                  MANUFACTURING INFRASTRUCTURE
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-[1.03] text-obsidian">
                4-ACRE INTEGRATED PLANT AT CHOUTUPPAL.
              </h2>
            </div>
            <p className="lg:col-span-5 text-base leading-relaxed text-slate-600">
              Situated at Survey No. 312/E, Lingojigudem Village, Choutuppal Mandal near Hyderabad with air and sea freight connectivity, the manufacturing estate integrates compound mixing, extrusion, curing presses, and dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200 bg-obsidian shadow-[0_10px_35px_rgba(0,0,0,0.06)]">
              <Image
                src="/images/editorial/rubber_mill.jpg"
                alt="Synthetic and natural rubber sheet milling operations"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian/95 via-obsidian/60 to-transparent p-6 text-white">
                <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-industrial-orange">
                  COMPOUNDING &amp; MILLING
                </p>
                <p className="mt-1 text-sm text-warm-white/90 font-medium">
                  Precision elastomer blending for low rolling resistance &amp; high abrasion life
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200 bg-obsidian shadow-[0_10px_35px_rgba(0,0,0,0.06)]">
                <Image
                  src="/images/editorial/extruder_machinery.jpg"
                  alt="Rubber kneader and extruder machinery"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian/95 via-obsidian/60 to-transparent p-5 text-white">
                  <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-industrial-orange">
                    EXTRUSION &amp; MOULDING
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {COMPANY_INFO.capacities.map((cap) => (
                  <div key={cap.label} className="rounded-2xl border border-slate-200/90 bg-[#FAF9F6] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-industrial-orange/50 transition-colors">
                    <p className="font-heading text-lg sm:text-xl font-bold tracking-tight text-obsidian">
                      {cap.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-600 font-normal">{cap.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05. Testing Laboratory */}
      <section className="bg-obsidian text-warm-white border-b border-white/10">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/15 bg-obsidian shadow-2xl">
              <Image
                src="/images/brand/vamshi-lab-rheometer.jpg"
                alt="Vamshi Rubber Oscillating Disc Rheometer laboratory equipment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-industrial-orange" />
                <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
                  TESTING LABORATORY &amp; QC
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-[1.03] text-white">
                ULTRA-MODERN R&amp;D &amp; QC VERIFICATION.
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-warm-white/80">
                Located directly inside our Choutuppal factory, Vamshi&apos;s testing laboratory conducts multi-stage analytical checks across raw materials, semi-finished sheet stock, and final vulcanized products.
              </p>
              <ul className="space-y-3.5 text-sm text-warm-white/90">
                <li className="flex items-start gap-3">
                  <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-industrial-orange" />
                  <span>Oscillating Disc Rheometer testing for batch cure profiles &amp; scorch safety</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-industrial-orange" />
                  <span>ISO 9001:2015 certified process control audited by Det Norske Veritas (DNV)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-industrial-orange" />
                  <span>Experienced rubber technologists overseeing physical tensile &amp; abrasion checks</span>
                </li>
              </ul>
              <div className="pt-2">
                <MagneticButton href="/quality" variant="primary">
                  <span>INSPECT QUALITY STANDARDS</span>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06. Vision & Mission */}
      <section className="bg-[#0A1128] text-warm-white border-b border-white/10">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-12 space-y-5 shadow-2xl">
              <span className="font-heading text-xs uppercase tracking-[0.2em] font-semibold text-industrial-orange">
                OUR VISION
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl font-bold uppercase tracking-tight leading-[1.08] text-[#0B1736]">
                RELIABLE, ECO-CONSCIOUS RETREADING FOR GLOBAL FLEETS.
              </h2>
              <p className="text-base leading-relaxed text-[#0B1736]/80 font-normal">
                To deliver cost-effective, safe, and environmentally responsible tyre retreading materials adhering to Reduce–Reuse–Recycle principles while expanding Vamshi&apos;s footprint across domestic and international fleets.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-12 space-y-5 shadow-2xl">
              <span className="font-heading text-xs uppercase tracking-[0.2em] font-semibold text-industrial-orange">
                OUR MISSION
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl font-bold uppercase tracking-tight leading-[1.08] text-[#0B1736]">
                CONSISTENT PERFORMANCE, SAFETY &amp; VALUE IN EVERY RETREAD.
              </h2>
              <p className="text-base leading-relaxed text-[#0B1736]/80 font-normal">
                To understand every retreader&apos;s operational reality and continually advance compounding R&amp;D, manufacturing consistency, technical service, and retreading machinery support so every customer achieves superior mileage per rupee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 07. Why Vamshi Rubber — Strengths & Plant Advisory */}
      <section className="bg-[#FAF9F6] text-obsidian border-b border-slate-200">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
          <div className="mb-12 border-b border-slate-200 pb-8">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-industrial-orange" />
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
                WHY VAMSHI RUBBER
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-obsidian">
              BEYOND SUPPLY: END-TO-END RETREADING SUPPORT.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-8 space-y-4 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-industrial-orange/60 transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-industrial-orange/10 text-industrial-orange">
                <Factory className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-obsidian">
                Turnkey Plant Engineering
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Vamshi Rubber provides industrial engineering guidance for setting up retreading plants with installed capacities of 500, 1,000, and 2,500 retreads per month.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white p-8 space-y-4 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-industrial-orange/60 transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-industrial-orange/10 text-industrial-orange">
                <Wrench className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-obsidian">
                Technical &amp; Personnel Training
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Continuous technical assistance, retreading machinery upgrades, market survey guidance, and technician training to sustain consistent shop-floor curing quality.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white p-8 space-y-4 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-industrial-orange/60 transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-industrial-orange/10 text-industrial-orange">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-obsidian">
                Pan-India Supply Assurance
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Supported by 14 company-owned marketing offices and depots across India, ensuring prompt stock availability for fleets and franchise retreaders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 08. Final CTA */}
      <FinalCta
        headline="YOUR BUSINESS DESERVES A DEPENDABLE PARTNER."
        subtext="Whether sourcing export-grade REACH-compliant treads or setting up a commercial retreading line, connect with our technical team."
        primaryLabel="CONNECT WITH US"
        primaryHref="/contact"
        secondaryLabel="VIEW PRODUCT CATALOGUE"
        secondaryHref="/products"
      />
    </>
  );
}
