import React from "react";
import { motion } from "framer-motion";

type Tag = "h1" | "h2" | "h3" | "p";

type RevealLinesProps = {
  lines: React.ReactNode[];
  as?: Tag;
  id?: string;
  className?: string;
  lineClassNames?: string[];
  play?: boolean;
  delay?: number;
};

const EASE = [0.23, 1, 0.32, 1] as const;

const lineVariants = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 0.3, ease: EASE } }
};

export function RevealLines({ lines, as = "h2", id, className = "", lineClassNames = [], play, delay = 0 }: RevealLinesProps) {
  const MotionTag = motion[as] as unknown as typeof motion.h2;
  const trigger =
  play === undefined ?
  { whileInView: "show", viewport: { once: true, amount: 0.4 } } :
  { animate: play ? "show" : "hidden" };

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}>
      
      {lines.map((line, i) =>
      <span key={i} className={`block overflow-hidden pb-[0.06em] ${lineClassNames[i] ?? ""}`}>
          <motion.span className="block" variants={lineVariants}>
            {line}
          </motion.span>
        </span>
      )}
    </MotionTag>);

}