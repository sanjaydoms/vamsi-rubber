import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Facility & Media Gallery | Vamshi Rubber Limited",
  description:
    "Explore the photographic archive of Vamshi Rubber Limited: our 4-acre Choutuppal manufacturing plant, Banbury compounding mills, testing laboratories, and fleet applications.",
};

interface GalleryItem {
  id: string;
  title: string;
  category: "Plant & Machinery" | "Quality & Lab" | "Products" | "Fleet Operations";
  src: string;
  location: string;
  aspect?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "plant-campus",
    title: "Choutuppal Manufacturing Facility & Casing Bays",
    category: "Plant & Machinery",
    src: "/images/editorial/tyre_manufacture_factory.jpg",
    location: "Choutuppal, Telangana",
  },
  {
    id: "compounding-mill",
    title: "Automated Two-Roll Rubber Sheeting & Compounding Mill",
    category: "Plant & Machinery",
    src: "/images/editorial/rubber_mill.jpg",
    location: "Mixing Division · Choutuppal",
  },
  {
    id: "extruder-line",
    title: "Cold-Feed Rubber Extrusion & Profile Machinery",
    category: "Plant & Machinery",
    src: "/images/editorial/extruder_machinery.jpg",
    location: "Extrusion Bay · Plant 1",
  },
  {
    id: "tensile-lab",
    title: "Rheometer & Physical Tensile Compound Testing",
    category: "Quality & Lab",
    src: "/images/editorial/tensile_lab.jpg",
    location: "QMS Laboratory · Choutuppal",
  },
  {
    id: "pctr-tread",
    title: "Precision Precured Tread Profile (PCTR) Highway Inspection",
    category: "Products",
    src: "/images/editorial/truck_wheel_hero.jpg",
    location: "Inspection & Finishing Line",
  },
  {
    id: "autoclave-curing",
    title: "Chamber Autoclaves with Pressurized Curing Envelopes",
    category: "Plant & Machinery",
    src: "/images/editorial/retread_wide.jpg",
    location: "Curing Division",
  },
  {
    id: "stacked-casings",
    title: "Commercial Radial Tyre Casing Warehouse & Dispatches",
    category: "Products",
    src: "/images/editorial/stacked_tires.jpg",
    location: "Central Logistics Hub",
  },
  {
    id: "hyderabad-freight",
    title: "Heavy Long-Haul Multi-Axle Freight Corridor Road Test",
    category: "Fleet Operations",
    src: "/images/editorial/hyderabad_truck.jpg",
    location: "NH-44 Freight Corridor",
  },
  {
    id: "tsrtc-fleet",
    title: "State Transport Corporation Passenger Bus Fleet on Vamshi Treads",
    category: "Fleet Operations",
    src: "/images/editorial/tsrtc_bus.jpg",
    location: "TSRTC Regional Depot",
  },
  {
    id: "quarry-trials",
    title: "Severe-Duty Mining & Quarry Casing Endurance Test",
    category: "Fleet Operations",
    src: "/images/editorial/mining_quarry.jpg",
    location: "South India Granite Belt",
  },
  {
    id: "cushion-gum-roll",
    title: "Calendered Uncured Cushion Gum Sheet with Protective Liner",
    category: "Products",
    src: "/images/products/cushion-gum-actual.jpg",
    location: "Calender Bay",
  },
  {
    id: "commercial-fleet",
    title: "National Fleet Logistics Line-Haul Highway Endurance",
    category: "Fleet Operations",
    src: "/images/editorial/semi_fleet.jpg",
    location: "Golden Quadrilateral",
  },
];

export default function GalleryPage() {
  return (
    <>
      {/* 1. Architectural Hero Header */}
      <section className="relative overflow-hidden bg-obsidian text-warm-white pt-32 pb-20 lg:pt-40 lg:pb-24 border-b border-white/10">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-industrial-orange" />
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
              PHOTOGRAPHIC ARCHIVE
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white max-w-4xl leading-[1.03]">
            FACILITY, PLANT &amp;
            <br />
            FIELD OPERATIONS GALLERY.
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-warm-white/80">
            A comprehensive visual tour inside Vamshi Rubber Limited&apos;s 4-acre manufacturing campus in Choutuppal, automated polymer compounding lines, in-house quality laboratories, and multi-life fleet performance across India.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-xs font-heading uppercase tracking-wider text-neutral-grey">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-warm-white">
              <span className="h-2 w-2 rounded-full bg-industrial-orange" />
              12 High-Resolution Visuals
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-warm-white">
              ISO 9001:2015 Plant Campus
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-warm-white">
              Choutuppal, Telangana
            </span>
          </div>
        </div>
      </section>

      {/* 2. Gallery Grid */}
      <section className="bg-white text-obsidian py-20 lg:py-28 border-b border-slate-200">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col rounded-[24px] overflow-hidden bg-slate-900 border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.16)] transition-all duration-500"
              >
                {/* Photo Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-md px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-wider text-white border border-white/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-industrial-orange" />
                      <span>{item.category}</span>
                    </span>
                  </div>

                  {/* Bottom Location Indicator */}
                  <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-white/90">
                    <span className="font-heading text-[10px] uppercase tracking-[0.14em] text-white/80 font-medium">
                      {item.location}
                    </span>
                    <span className="font-heading text-[9px] uppercase tracking-[0.16em] text-industrial-orange font-bold">
                      VAMSHI
                    </span>
                  </div>
                </div>

                {/* Caption Strip */}
                <div className="p-6 bg-white flex flex-col justify-between flex-1 border-t border-slate-100">
                  <h3 className="font-heading text-base sm:text-lg font-bold text-obsidian uppercase tracking-tight leading-snug group-hover:text-industrial-orange transition-colors">
                    {item.title}
                  </h3>
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-heading uppercase tracking-wider text-slate-500">
                    <span>Manufacturing &amp; Quality</span>
                    <span className="text-industrial-orange font-semibold">Verified Archive</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Bottom CTA Section */}
      <section className="bg-obsidian text-warm-white py-20 lg:py-24 border-b border-white/10">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <span className="font-heading text-xs uppercase tracking-[0.2em] font-semibold text-industrial-orange">
              TECHNICAL CONSULTATION &amp; PLANT VISITS
            </span>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              ARRANGE A RETREAD PLANT AUDIT
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-warm-white/70">
              Fleet operators, commercial retreaders, and state transport engineers are welcome to schedule technical plant tours and compound consistency reviews at Choutuppal.
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex items-center justify-between gap-4 rounded-xl bg-industrial-orange pl-6 pr-2.5 py-2.5 shadow-lg hover:bg-industrial-red transition-all duration-300"
          >
            <span className="font-heading text-xs font-bold tracking-wide text-white uppercase">
              Schedule Plant Discussion
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/20 text-white transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
