import React from "react";

type CornerFrameProps = {className?: string;size?: string;};

export function CornerFrame({ className = "border-silver/40", size = "h-4 w-4" }: CornerFrameProps) {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className={`absolute left-0 top-0 border-l border-t ${size} ${className}`} />
      <span className={`absolute right-0 top-0 border-r border-t ${size} ${className}`} />
      <span className={`absolute bottom-0 left-0 border-b border-l ${size} ${className}`} />
      <span className={`absolute bottom-0 right-0 border-b border-r ${size} ${className}`} />
    </span>);

}