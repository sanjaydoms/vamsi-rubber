"use client";

import { useState } from "react";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Raw Material Receiving & Verification",
    summary:
      "Every incoming lot of natural/synthetic elastomer, carbon black, curing agent, and adhesive resin undergoes laboratory acceptance screening prior to release into compounding.",
    checks: [
      "Polymer viscosity & moisture screening",
      "REACH chemical compliance screening for export compounds",
      "Lot traceability code assigned at warehouse intake",
    ],
  },
  {
    step: "02",
    title: "In-Process Rheometric & Compound Control",
    summary:
      "Mixed compounds and semi-finished sheets are verified using our in-house Oscillating Disc Rheometer before moving to extrusion, calendering, or tread press lines.",
    checks: [
      "Cure kinetics, scorch safety (t2 / t90), and torque uniformity",
      "Semi-finished gauge and extrusion profile calibration",
      "Temperature-controlled chamber curing monitoring",
    ],
  },
  {
    step: "03",
    title: "Final Physical & Dimensional Inspection",
    summary:
      "Finished precured tread rubber, cushion gum, vulcanising solution, and curing envelopes undergo stringent mechanical and dimensional verification before dispatch.",
    checks: [
      "Tensile strength, elongation, and abrasion resistance checks",
      "Tread width, length, and NSD tolerance verification (±2%)",
      "Multi-retreadability & bonding integrity evaluation",
    ],
  },
  {
    step: "04",
    title: "QMS Traceability & Technical Field Feedback",
    summary:
      "Under ISO 9001:2015 QMS governance, R&D and customer service monitor field mileage across SRTCs and 400+ retreaders to continuously refine formulations.",
    checks: [
      "DNV Netherlands ISO 9001:2015 structured documentation & audits",
      "Batch retention samples for post-dispatch verification",
      "Direct R&D feedback loop from fleet & retreader performance",
    ],
  },
];

export function QualityProcessDiagram() {
  const [active, setActive] = useState(0);
  const current = PROCESS_STEPS[active];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4 border border-white/10">
        {PROCESS_STEPS.map((item, idx) => {
          const isActive = idx === active;
          return (
            <button
              key={item.step}
              type="button"
              onClick={() => setActive(idx)}
              className={`p-6 text-left transition-colors ${
                isActive ? "bg-industrial-orange text-white" : "bg-obsidian text-warm-white/80 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-heading text-xs font-bold uppercase tracking-[0.16em] ${isActive ? "text-white" : "text-industrial-orange"}`}>
                  GATE {item.step}
                </span>
                <span
                  className={`h-2 w-2 ${isActive ? "bg-white" : "bg-white/20"}`}
                />
              </div>
              <p className="mt-3 font-heading text-lg font-bold leading-snug">{item.title}</p>
            </button>
          );
        })}
      </div>

      <div className="border border-white/10 bg-charcoal/50 p-8 sm:p-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center shadow-xl">
        <div className="lg:col-span-7 space-y-3">
          <span className="font-heading text-xs uppercase tracking-[0.18em] text-industrial-orange">
            QUALITY STAGE {current.step}
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            {current.title}
          </h3>
          <p className="text-base leading-relaxed text-warm-white/75">{current.summary}</p>
        </div>

        <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
          <p className="font-heading text-[11px] uppercase tracking-[0.16em] text-neutral-grey mb-3">
            VERIFIED INSPECTION POINTS
          </p>
          <ul className="space-y-2.5 text-sm text-warm-white/90">
            {current.checks.map((c) => (
              <li key={c} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-industrial-orange" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
