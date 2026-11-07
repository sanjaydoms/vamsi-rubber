import React from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import type { Product } from "../../types/content";
import { CornerFrame } from "../ui/CornerFrame";
import { MagneticButton } from "../ui/MagneticButton";

type ProductStageProps = {
  product: Product;
  onEnquire: (name: string) => void;
};

const EASE = [0.23, 1, 0.32, 1] as const;

export function ProductStage({ product, onEnquire }: ProductStageProps) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 18 });
  const sry = useSpring(ry, { stiffness: 120, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 18);
    rx.set(-(py - 0.5) * 14);
  };
  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div>
      <div
        className="relative aspect-square w-full overflow-hidden bg-graphite [perspective:1400px] sm:aspect-[5/4]"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}>
        
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={product.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.96, clipPath: "inset(10% 10% 10% 10%)" }}
            animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.28, ease: EASE }}>
            
            <motion.div
              style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
              className="absolute inset-0 h-full w-full">
              
              <img
                src={product.image}
                alt={`${product.name} — product visual`}
                draggable={false}
                className="h-full w-full scale-110 object-cover" />
              
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <CornerFrame size="h-5 w-5" className="border-silver/40" />
        <span className="pointer-events-none absolute left-4 top-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-silver">
          {product.code}
        </span>
      </div>

      <div className="relative z-10 mt-6 grid gap-6 px-1 sm:grid-cols-[1fr_auto] sm:items-center sm:px-6">
        <p className="max-w-lg text-[15px] leading-relaxed text-silver">{product.summary}</p>
        <div className="flex flex-col items-start sm:items-end">
          <MagneticButton onClick={() => onEnquire(product.name)}>
            Enquire — {product.code}
            <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>
        </div>
      </div>
    </div>);

}