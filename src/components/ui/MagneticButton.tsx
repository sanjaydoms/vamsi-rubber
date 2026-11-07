import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Variant = "solid" | "outline" | "dark";

type MagneticButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: Variant;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  size?: "md" | "sm";
};

const VARIANTS: Record<Variant, string> = {
  solid: "bg-signal text-ink hover:bg-bone",
  outline: "border border-silver/40 text-bone hover:border-bone",
  dark: "bg-ink text-bone hover:bg-signal hover:text-ink"
};

export function MagneticButton({
  children,
  onClick,
  href,
  variant = "solid",
  type = "button",
  disabled,
  className = "",
  size = "md"
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const sizing = size === "sm" ? "px-4 py-2.5 text-[11px]" : "px-6 py-4 text-[12px]";
  const classes = `group relative inline-flex items-center gap-3 whitespace-nowrap font-mono uppercase tracking-[0.14em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-60 ${sizing} ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <motion.a href={href} style={{ x: sx, y: sy }} onMouseMove={handleMove} onMouseLeave={reset} className={classes}>
        {children}
      </motion.a>);

  }
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={classes}>
      
      {children}
    </motion.button>);

}