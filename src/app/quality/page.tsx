import type { Metadata } from "next";
import Image from "next/image";
import { FileCheck2, FlaskConical, Microscope, ShieldCheck } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";
import { QualityProcessDiagram } from "@/components/quality/QualityProcessDiagram";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Quality Assurance & Laboratory Standards",
  description:
    "Explore Vamshi Rubber Limited's ISO 9001:2015 Quality Management System (DNV), REACH-compliant export compounds, and in-house Oscillating Disc Rheometer & tensile testing laboratory.",
};

export default function QualityPage() {
  return (
    <>
      {/* 1. Quality Philosophy Hero */}
      <section className="relative overflow-hidden bg-obsidian text-warm-white pt-36 pb-20 lg:pt-44 lg:pb-24 border-b border-white/10">
        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-industrial-orange shadow-sm" />
            <span className="font-heading text-xs uppercase tracking-[0.2em] font-semibold text-industrial-orange">
              QUALITY PHILOSOPHY &amp; STANDARDS
            </span>
          </div>
          <h1 className="max-w-4xl font-heading text-4xl sm:text-6xl lg:text-[4.25rem] font-bold uppercase tracking-tight leading-[0.98] text-white">
            QUALITY IS NOT A FINAL CHECK. IT IS OUR STANDARD.
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-warm-white/80">
            Vamshi Rubber Limited is committed to meeting statutory, regulatory, safety, and environmental requirements — continuously improving consistency, multi-retreadability, and reliability through structured quality management.
          </p>
        </div>
      </section>

      {/* 2. Manufacturing Quality & Laboratory */}
      <section className="bg-white text-obsidian border-b border-slate-200">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-industrial-orange" />
                <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
                  TESTING LABORATORY &amp; R&amp;D
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-[1.03] text-obsidian">
                CHOUTUPPAL IN-HOUSE LABORATORY &amp; SOPHISTICATED TESTING.
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-slate-600">
                Our ultra-modern laboratory located inside the factory is equipped to execute full quality control verification — led by experienced technical personnel specializing in rubber compounding and vulcanization behaviour.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-2xl border border-slate-200/90 bg-[#FAF9F6] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-industrial-orange/50 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-industrial-orange/10 text-industrial-orange">
                    <FlaskConical className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-bold uppercase tracking-tight text-obsidian">
                    Oscillating Disc Rheometer
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    Measures exact cure rate, scorch time, and torque consistency on every production batch.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200/90 bg-[#FAF9F6] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-industrial-orange/50 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-industrial-orange/10 text-industrial-orange">
                    <Microscope className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-bold uppercase tracking-tight text-obsidian">
                    Physical &amp; Tensile Testing
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    Verifies tensile properties, elongation, and multi-retreadability endurance.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-5">
              <div className="sm:col-span-8 relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 bg-obsidian shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                <Image
                  src="/images/brand/vamshi-lab-rheometer.jpg"
                  alt="Vamshi Rubber Oscillating Disc Rheometer laboratory equipment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <span className="absolute bottom-3 left-3 rounded-md bg-obsidian/90 backdrop-blur-xs px-3 py-1 font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                  Vamshi Lab · Rheometer
                </span>
              </div>
              <div className="sm:col-span-4 relative aspect-[3/4] sm:aspect-auto w-full overflow-hidden rounded-2xl border border-slate-200 bg-obsidian shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                <Image
                  src="/images/editorial/tensile_lab.jpg"
                  alt="50kN precision tensile testing apparatus"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 20vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Product Inspection Process Diagram */}
      <section className="bg-obsidian text-white border-b border-white/10">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 pb-24 lg:pb-28 pt-18">
          <div className="mb-10 border-b border-white/10 pb-6">
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
              STRUCTURED PROCESS CONTROL
            </span>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              FOUR-STAGE QUALITY INSPECTION GATEWAYS
            </h2>
          </div>

          <QualityProcessDiagram />
        </div>
      </section>

      {/* 4. Quality Management & Verified Certifications */}
      <section className="bg-[#FAF9F6] text-obsidian border-b border-slate-200">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
          <div className="mb-12 border-b border-slate-200 pb-6">
            <span className="font-heading text-xs uppercase tracking-[0.2em] font-semibold text-industrial-orange">
              CERTIFICATIONS &amp; COMPLIANCE
            </span>
            <h2 className="mt-2 font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-obsidian">
              VERIFIED STANDARDS &amp; DOCUMENTATION
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {COMPANY_INFO.certifications.map((cert, i) => (
              <div
                key={cert.name}
                className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 space-y-5 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:border-industrial-orange/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  {i === 0 ? (
                    <ShieldCheck className="h-8 w-8 text-industrial-orange" />
                  ) : (
                    <FileCheck2 className="h-8 w-8 text-industrial-orange" />
                  )}
                  <span className="rounded-full bg-emerald-50 px-3 py-1 font-heading text-[10px] uppercase tracking-[0.16em] text-emerald-800 font-bold border border-emerald-200">
                    VERIFIED CLAIM
                  </span>
                </div>
                <h3 className="font-heading text-3xl font-bold tracking-tight text-obsidian">{cert.name}</h3>
                <p className="font-heading text-xs uppercase tracking-[0.14em] text-industrial-orange font-bold">
                  {cert.issuer}
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
                  {cert.scope}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        headline="CONSISTENT COMPOUNDING FOR EVERY SHIPMENT."
        subtext="Request batch quality specifications or download our Domestic & Export technical brochures."
        primaryLabel="CONTACT QUALITY & SALES"
        primaryHref="/contact"
        secondaryLabel="VIEW PRODUCTS"
        secondaryHref="/products"
      />
    </>
  );
}
