import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const SECTORS = [
  {
    code: "01",
    title: "Commercial Transportation",
    subtitle: "LONG-HAUL & REGIONAL LOGISTICS",
    description:
      "High-mileage radial and bias precured treads engineered for inter-city freight corridors across India and export highway routes.",
    image: "/images/editorial/hyderabad_truck.jpg",
    span: "lg:col-span-7",
  },
  {
    code: "02",
    title: "Heavy-Duty Fleet Operations",
    subtitle: "STATE TRANSPORT & PASSENGER CORRIDORS",
    description:
      "Trusted supplier to APSRTC, TSRTC, KSRTC, MSRTC, RSRTC, and TNSTC buses operating demanding urban and highway duty cycles.",
    image: "/images/editorial/tsrtc_bus.jpg",
    span: "lg:col-span-5",
  },
  {
    code: "03",
    title: "Tyre Retreading Businesses",
    subtitle: "400+ FRANCHISES & RETREADING PLANTS",
    description:
      "Complete cold and hot retread systems backed by technical training, plant engineering (500–2,500 retreads/month), and 14 regional depots.",
    image: "/images/editorial/retread_wide.jpg",
    span: "lg:col-span-5",
  },
  {
    code: "04",
    title: "Industrial & OTR Transportation",
    subtitle: "MINING, QUARRY & OFF-THE-ROAD",
    description:
      "Deep non-skid mining treads (MT, MTD, SLM, VRL-D, HCM) and tractor CBTR built to endure rough quarry haulage and port workloads.",
    image: "/images/editorial/mining_quarry.jpg",
    span: "lg:col-span-7",
  },
];

export function IndustriesSection() {
  return (
    <section className="relative bg-charcoal text-warm-white pb-16 lg:pb-22">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-14 lg:pt-20">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-industrial-orange" />
              <span className="font-heading text-xs uppercase tracking-[0.2em] text-industrial-orange">
                INDUSTRIES &amp; APPLICATIONS
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-[3.25rem] font-bold uppercase tracking-tight leading-[1.03] text-white">
              SUPPORTING THE BUSINESSES
              <br />
              THAT KEEP INDIA MOVING.
            </h2>
          </div>

          <Link
            href="/industries"
            className="inline-flex items-center gap-2 font-heading text-xs uppercase tracking-[0.16em] text-warm-white hover:text-industrial-orange transition-colors border-b border-white/25 pb-2 self-start md:self-auto"
          >
            <span>Explore Industry Solutions</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Asymmetric Editorial Photo Mosaic */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {SECTORS.map((sector) => (
            <Link
              key={sector.code}
              href="/industries"
              data-cursor="SECTOR"
              className={`group relative ${sector.span} flex min-h-[380px] sm:min-h-[430px] flex-col justify-end overflow-hidden border border-white/10 bg-obsidian p-7 sm:p-9`}
            >
              <Image
                src={sector.image}
                alt={sector.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-75 group-hover:brightness-[0.6]"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/55 to-transparent" />

              <div className="relative z-10 max-w-xl">
                <div className="flex items-center gap-3 text-[11px] font-heading uppercase tracking-[0.18em] text-industrial-orange">
                  <span>{sector.code}</span>
                  <span className="h-[1px] w-6 bg-industrial-orange" />
                  <span>{sector.subtitle}</span>
                </div>
                <h3 className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-white group-hover:text-industrial-orange transition-colors">
                  {sector.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-warm-white/80">
                  {sector.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
