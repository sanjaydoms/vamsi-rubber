import Image from "next/image";
import { CheckCircle2, FileCheck2, FlaskConical, Microscope } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";

const QUALITY_PILLARS = [
  {
    icon: FlaskConical,
    title: "Testing Laboratory",
    detail:
      "Ultra-modern in-house laboratory at Choutuppal equipped with Oscillating Disc Rheometer and tensile testing machinery.",
  },
  {
    icon: Microscope,
    title: "Quality Inspection",
    detail:
      "Experienced rubber technologists inspecting raw polymers, carbon blacks, and semi-finished batches at every production gate.",
  },
  {
    icon: CheckCircle2,
    title: "Product Testing",
    detail:
      "Every final tread roll and bonding compound undergoes stringent scorch, cure-curve, hardness, and abrasion verification.",
  },
  {
    icon: FileCheck2,
    title: "Verified Certifications",
    detail:
      "ISO 9001:2015 Quality Management System certified by Det Norske Veritas (DNV), Netherlands, with REACH-compliant export compounds.",
  },
];

export function QualitySection() {
  return (
    <section className="relative bg-white text-obsidian">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-12 pb-16 lg:pt-16 lg:pb-22">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
          {/* Left: Lab & Inspection Photography with Overlapping Elevation */}
          <div className="lg:col-span-6 space-y-5 relative z-20">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-slate-200 bg-obsidian shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
              <Image
                src="/images/brand/vamshi-lab-rheometer.jpg"
                alt="Vamshi Rubber Limited quality control laboratory with Oscillating Disc Rheometer"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white">
                <span className="font-heading uppercase tracking-[0.16em]">
                  VAMSHI R&amp;D LABORATORY · CHOUTUPPAL
                </span>
                <span className="bg-industrial-orange px-2.5 py-1 font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                  OSCILLATING DISC RHEOMETER
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-slate-200 bg-[#F8FAFC] p-5">
                <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-industrial-orange font-bold">
                  QUALITY MANAGEMENT
                </p>
                <p className="mt-2 font-heading text-xl font-bold text-obsidian">ISO 9001:2015</p>
                <p className="mt-1 text-xs text-slate-600">
                  Certified by Det Norske Veritas (DNV), Netherlands
                </p>
              </div>
              <div className="border border-slate-200 bg-[#F8FAFC] p-5">
                <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-industrial-orange font-bold">
                  EXPORT COMPLIANCE
                </p>
                <p className="mt-2 font-heading text-xl font-bold text-obsidian">REACH Compliant</p>
                <p className="mt-1 text-xs text-slate-600">
                  Verified retreading compound formulations
                </p>
              </div>
            </div>
          </div>

          {/* Right: Copy & Structured QC Pillars */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-industrial-orange" />
                <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
                  QUALITY ASSURANCE
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-[1.03] text-obsidian">
                QUALITY IS NOT A FINAL CHECK.
                <br />
                IT IS OUR STANDARD.
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600">
                Our quality commitment is supported by testing facilities and structured quality-control processes that help maintain consistency across our products — backed by continuous R&amp;D for multi-retreadability and safety.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {QUALITY_PILLARS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="border-t-2 border-industrial-orange border-x border-b border-slate-200 bg-[#F8FAFC] p-5 transition-all hover:bg-white hover:shadow-md"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 text-industrial-orange" />
                      <h3 className="font-heading text-sm font-bold uppercase tracking-[0.08em] text-obsidian">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>

            <div>
              <MagneticButton href="/quality" variant="primary">
                <span>EXPLORE OUR QUALITY STANDARDS</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
