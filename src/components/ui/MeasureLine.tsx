import React from "react";
import { motion } from "framer-motion";

type MeasureLineProps = {label: string;};

const EASE = [0.23, 1, 0.32, 1] as const;

export function MeasureLine({ label }: MeasureLineProps) {
  return (
    <motion.div className="flex items-center gap-4" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.8 }}>
      <motion.span
        className="relative block h-3 flex-1 origin-left"
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.3, ease: EASE } } }}>
        
        <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
        <span className="absolute left-0 top-0 h-3 w-px bg-current" />
        <span className="absolute right-0 top-0 h-3 w-px bg-current" />
      </motion.span>
      <motion.span
        className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em]"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2, delay: 0.2 } } }}>
        
        {label}
      </motion.span>
    </motion.div>);

}