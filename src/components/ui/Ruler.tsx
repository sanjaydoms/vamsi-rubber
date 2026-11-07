import React from "react";

type RulerProps = {ticks?: number;className?: string;};

export function Ruler({ ticks = 40, className = "" }: RulerProps) {
  const width = ticks * 10;
  return (
    <svg viewBox={`0 0 ${width} 24`} preserveAspectRatio="none" className={`h-5 w-full ${className}`} aria-hidden="true">
      {Array.from({ length: ticks + 1 }).map((_, i) => {
        const major = i % 5 === 0;
        return (
          <line
            key={i}
            x1={i * 10}
            x2={i * 10}
            y1={major ? 2 : 10}
            y2={18}
            stroke="currentColor"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke" />);


      })}
      <line x1={0} x2={width} y1={18} y2={18} stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke" />
    </svg>);

}