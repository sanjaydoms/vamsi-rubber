import React from "react";

interface OrganicDividerProps {
  position?: "top" | "bottom";
  variant?: "wave" | "wave-layered" | "curve-down" | "curve-up" | "diagonal" | "arch";
  color?: string; // Tailwind text color class, e.g. "text-white", "text-obsidian", "text-[#FAF8F5]"
  secondaryColor?: string; // Optional for layered variant
  height?: string; // e.g. "h-12 sm:h-20 lg:h-28"
  className?: string;
  flipX?: boolean;
}

export function OrganicDivider({
  position = "bottom",
  variant = "wave",
  color = "text-white",
  secondaryColor = "text-white/20",
  height = "h-14 sm:h-20 lg:h-28",
  className = "",
  flipX = false,
}: OrganicDividerProps) {
  const isTop = position === "top";
  const transform = `${isTop ? "rotate-180" : ""} ${flipX ? "scale-x-[-1]" : ""}`.trim();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 right-0 z-20 w-full overflow-hidden leading-none select-none ${
        isTop ? "top-0" : "bottom-0"
      } ${className}`}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={`w-full block ${height} ${transform}`}
      >
        {variant === "wave-layered" && (
          <>
            {/* Soft decorative background curve */}
            <path
              d="M0,32 C320,110 680,10 1020,75 C1220,110 1360,60 1440,48 L1440,120 L0,120 Z"
              className={`${secondaryColor} fill-current`}
            />
            {/* Primary organic foreground curve */}
            <path
              d="M0,64 C280,12 720,115 1100,50 C1280,20 1380,55 1440,68 L1440,120 L0,120 Z"
              className={`${color} fill-current`}
            />
          </>
        )}

        {variant === "wave" && (
          <path
            d="M0,45 C280,110 680,15 1020,80 C1240,120 1370,60 1440,45 L1440,120 L0,120 Z"
            className={`${color} fill-current`}
          />
        )}

        {variant === "curve-down" && (
          <path
            d="M0,0 C380,105 1060,105 1440,0 L1440,120 L0,120 Z"
            className={`${color} fill-current`}
          />
        )}

        {variant === "curve-up" && (
          <path
            d="M0,95 C420,15 1020,15 1440,95 L1440,120 L0,120 Z"
            className={`${color} fill-current`}
          />
        )}

        {variant === "diagonal" && (
          <path
            d="M0,75 L1440,15 L1440,120 L0,120 Z"
            className={`${color} fill-current`}
          />
        )}

        {variant === "arch" && (
          <path
            d="M0,80 Q720,-20 1440,80 L1440,120 L0,120 Z"
            className={`${color} fill-current`}
          />
        )}
      </svg>
    </div>
  );
}
