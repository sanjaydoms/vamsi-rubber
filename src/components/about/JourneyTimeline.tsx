"use client";

import { useState } from "react";
import { MILESTONES } from "@/data/company";

export function JourneyTimeline() {
  const [active, setActive] = useState(0);
  const current = MILESTONES[active];

  return (
    <div className="space-y-10">
      {/* Horizontal Interactive Scrubber Rail */}
      <div className="relative overflow-x-auto no-scrollbar pb-4">
        <div className="flex min-w-[680px] items-stretch border-y border-white/15">
          {MILESTONES.map((item, idx) => {
            const isSelected = idx === active;
            return (
              <button
                key={item.year}
                type="button"
                onClick={() => setActive(idx)}
                className={`group relative flex-1 border-r last:border-r-0 border-white/15 px-6 py-6 text-left transition-colors ${
                  isSelected ? "bg-charcoal" : "bg-obsidian hover:bg-charcoal/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-[10px] uppercase tracking-[0.18em] text-industrial-orange">
                    0{idx + 1} / {item.tag}
                  </span>
                  <span
                    className={`h-2 w-2 transition-colors ${
                      isSelected ? "bg-industrial-orange" : "bg-white/20 group-hover:bg-white/50"
                    }`}
                  />
                </div>
                <p
                  className={`mt-3 font-heading text-2xl sm:text-3xl font-bold tracking-tight transition-colors ${
                    isSelected ? "text-white" : "text-white/60 group-hover:text-white"
                  }`}
                >
                  {item.year}
                </p>
                {isSelected && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-industrial-orange" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Milestone Display */}
      <div className="grid grid-cols-1 gap-8 border border-white/15 bg-charcoal p-8 sm:p-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
          <span className="font-heading text-xs uppercase tracking-[0.18em] text-industrial-orange">
            {current.tag}
          </span>
          <p className="mt-2 font-heading text-5xl sm:text-6xl font-bold text-white">
            {current.year}
          </p>
        </div>

        <div className="lg:col-span-8 space-y-4">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            {current.title}
          </h3>
          <p className="text-base sm:text-lg leading-relaxed text-warm-white/80">
            {current.detail}
          </p>
        </div>
      </div>
    </div>
  );
}
