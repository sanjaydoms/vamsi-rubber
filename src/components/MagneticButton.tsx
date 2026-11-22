"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "outline-light" | "outline-dark" | "solid-dark" | "secondary";
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  showBadge?: boolean;
}

export function MagneticButton({
  href,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
  children,
  target,
  rel,
  icon,
  showBadge = true,
}: MagneticButtonProps) {
  const variantStyles: Record<string, { container: string; badge: string }> = {
    primary: {
      container:
        "bg-[#111827] text-white hover:bg-black border border-white/10 shadow-lg hover:shadow-xl",
      badge: "bg-industrial-orange text-white",
    },
    "solid-dark": {
      container:
        "bg-[#111827] text-white hover:bg-black border border-white/10 shadow-lg hover:shadow-xl",
      badge: "bg-industrial-orange text-white",
    },
    "outline-light": {
      container:
        "bg-white/10 text-white hover:bg-white/20 border border-white/25 shadow-md backdrop-blur-xs",
      badge: "bg-industrial-orange text-white",
    },
    "outline-dark": {
      container:
        "bg-white text-obsidian hover:bg-slate-50 border border-slate-300 shadow-sm",
      badge: "bg-industrial-orange text-white",
    },
    secondary: {
      container:
        "bg-[#1E293B] text-white hover:bg-[#0F172A] border border-white/10 shadow-md",
      badge: "bg-industrial-orange text-white",
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.primary;

  const baseClasses = `group inline-flex items-center justify-between gap-5 sm:gap-6 rounded-xl pl-5 sm:pl-6 pr-2 sm:pr-2.5 py-2 sm:py-2.5 transition-all duration-300 select-none ${currentVariant.container} ${
    disabled ? "opacity-50 pointer-events-none" : ""
  } ${className}`;

  const content = (
    <>
      <span className="font-heading text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap">
        {children}
      </span>
      {showBadge && (
        <span
          className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg shadow-sm transition-transform duration-300 group-hover:translate-x-0.5 ${currentVariant.badge}`}
        >
          {icon || <ArrowRight className="h-4 w-4 stroke-[2.5]" />}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} target={target} rel={rel} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
      {content}
    </button>
  );
}
