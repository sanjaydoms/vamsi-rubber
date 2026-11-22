import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Industries & Applications",
  description:
    "Retreading material solutions engineered for commercial freight transport, State Road Transport Corporations (SRTCs), heavy-duty trucks, commercial retreading plants, and mining/OTR applications.",
};

const INDUSTRY_PROFILES = [
  {
    code: "COMMERCIAL TRANSPORT",
    title: "Long-Haul & Regional Freight Corridors",
    image: "/images/editorial/hyderabad_truck.jpg",
    explanation:
      "Commercial trucking operators balance tyre cost directly against fuel efficiency and safety. Vamshi's free-rolling all-wheel and drive-axle PCTR compounds lower rolling resistance and resist heat fatigue across sustained national highway runs.",
    solutions: [
      { label: "Highway Radial (HWR)", href: "/products/pctr" },
      { label: "Spread Axle (SA)", href: "/products/pctr" },
      { label: "Vamshi Radial Long Drive (VRLD)", href: "/products/pctr" },
      { label: "Cushion Gum & BVC", href: "/products/cushion-gum" },
    ],
  },
  {
    code: "FLEET MANAGEMENT",
    title: "State Road Transport Corporations & Passenger Fleets",
    image: "/images/editorial/tsrtc_bus.jpg",
    explanation:
      "Major supplier to APSRTC, TSRTC, KSRTC, MSRTC, RSRTC, and TNSTC. High-frequency urban stops and inter-city coach schedules demand predictable tread wear, reliable wet grip, and multi-retread casing preservation.",
    solutions: [
      { label: "Vamshi Radial Excel (VRE)", href: "/products/pctr" },
      { label: "Drive Master (DM)", href: "/products/pctr" },
      { label: "Vulcanising Solution", href: "/products/vulcanising-solution" },
      { label: "Curing Envelopes", href: "/products/curing-envelopes" },
    ],
  },
  {
    code: "HEAVY-DUTY VEHICLES",
    title: "Heavy Haulage, Tankers & Spread-Axle Trailers",
    image: "/images/editorial/dump_semi_truck.jpg",
    explanation:
      "High axle loads and tight yard turning scrub trailer shoulders rapidly. Vamshi's wide-base wing treads and directional heavy-duty lug patterns distribute footprint stress evenly across multi-axle combinations.",
    solutions: [
      { label: "Vamshi Drive Heavy Duty (VDHD)", href: "/products/pctr" },
      { label: "Vamshi Trailer Plus Wing (VTP-W)", href: "/products/pctr" },
      { label: "Vamshi Heavy Haul Traction (VHHT)", href: "/products/pctr" },
      { label: "Bonding Gum (up to 480 mm)", href: "/products/bonding-gum" },
    ],
  },
  {
    code: "RETREADING OPERATIONS",
    title: "400+ Commercial Retread Plants & Turnkey Franchisees",
    image: "/images/editorial/retread_wide.jpg",
    explanation:
      "Beyond material supply via 14 company-owned depots, Vamshi provides industrial engineering for setting up retreading plants of 500, 1,000, and 2,500 retreads per month, complete with machinery guidance and technician training.",
    solutions: [
      { label: "Complete PCTR & CBTR Portfolio", href: "/products/pctr" },
      { label: "Extruded Rope Rubber", href: "/products/extruded-rope-rubber" },
      { label: "Full & Half Skirt Envelopes", href: "/products/curing-envelopes" },
      { label: "Plant Setup Advisory", href: "/contact?type=Dealership+enquiry" },
    ],
  },
  {
    code: "INDUSTRIAL & MINING OTR",
    title: "Mining, Quarry, Agricultural Tractor & Port Equipment",
    image: "/images/editorial/mining_quarry.jpg",
    explanation:
      "Deep non-skid profiles up to 25.00 mm NSD (and 35.50 mm for Bhumiputra tractor treads) paired with cut- and chip-resistant compounds safeguard off-the-road dumper, grader, loader, and agricultural tractor casings.",
    solutions: [
      { label: "Mines Trac & Mines Trac Deep (MT / MTD)", href: "/products/pctr" },
      { label: "Vamshi Rock Lug Deep (VRL-D)", href: "/products/pctr" },
      { label: "Camelback Tread Rubber (CBTR)", href: "/products/cbtr" },
      { label: "Vamshi Port Special (VPS)", href: "/products/pctr" },
    ],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-obsidian text-warm-white pt-36 pb-20 lg:pt-44 lg:pb-24 border-b border-white/10">
        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-industrial-orange shadow-sm" />
            <span className="font-heading text-xs uppercase tracking-[0.2em] font-semibold text-industrial-orange">
              INDUSTRIES &amp; APPLICATIONS
            </span>
          </div>
          <h1 className="max-w-4xl font-heading text-4xl sm:text-6xl lg:text-[4.25rem] font-bold uppercase tracking-tight leading-[0.98] text-white">
            APPLICATION-SPECIFIC RETREADING ACROSS EVERY DUTY CYCLE.
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-warm-white/80">
            From expressway fleet logistics and state transport buses to rugged mining dumper fleets and agricultural tractors, Vamshi compounds are tailored to real road and load geometry.
          </p>
        </div>
      </section>

      <section className="bg-white text-obsidian divide-y divide-slate-200">
        {INDUSTRY_PROFILES.map((item, idx) => {
          const reversed = idx % 2 === 1;
          return (
            <div key={item.code} className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
                <div className={`lg:col-span-6 ${reversed ? "lg:order-2" : ""}`}>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-obsidian shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>

                <div className={`lg:col-span-6 space-y-6 ${reversed ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-2.5">
                    <span className="h-[2px] w-6 bg-industrial-orange" />
                    <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-industrial-orange">
                      {item.code}
                    </span>
                  </div>
                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-[1.04] text-obsidian">
                    {item.title}
                  </h2>
                  <p className="text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                    {item.explanation}
                  </p>

                  <div className="border-t border-slate-200/90 pt-6 space-y-3.5">
                    <p className="font-heading text-[11px] uppercase tracking-[0.16em] text-slate-500 font-bold">
                      RECOMMENDED VAMSHI SOLUTIONS
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {item.solutions.map((sol) => (
                        <Link
                          key={sol.label}
                          href={sol.href}
                          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-[#FAF9F6] px-4 py-2 font-heading text-xs font-semibold text-obsidian hover:border-industrial-orange hover:bg-white hover:text-industrial-orange hover:shadow-sm transition-all duration-300"
                        >
                          <span>{sol.label}</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <FinalCta
        headline="MATCH YOUR FLEET DUTY TO THE RIGHT COMPOUND."
        subtext="Speak with our regional depot managers or Hyderabad technical team to select the optimal tread profile and cure system."
        primaryLabel="CONNECT WITH US"
        primaryHref="/contact"
        secondaryLabel="VIEW PRODUCT CATALOGUE"
        secondaryHref="/products"
      />
    </>
  );
}
