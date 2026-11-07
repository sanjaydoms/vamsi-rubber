import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "../ui/Logo";
import { setScrollLocked } from "../../utils/smoothScroll";

type LoaderProps = {ready: boolean;onDone: () => void;};

export function Loader({ ready, onDone }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const readyRef = useRef(ready);
  readyRef.current = ready;
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    setScrollLocked(true);
    const start = performance.now();
    let shown = 0;
    let raf = 0;
    let timeout = 0;
    const step = (now: number) => {
      const elapsed = now - start;
      const cap = readyRef.current || elapsed > 3200 ? 100 : 92;
      const target = Math.min(cap, elapsed / 1000 * 100);
      shown += (target - shown) * 0.2;
      const value = target >= 100 && shown > 99.4 ? 100 : Math.floor(shown);
      setProgress(value);
      if (value >= 100) {
        timeout = window.setTimeout(() => {
          setVisible(false);
          doneRef.current();
        }, 140);
        return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={() => setScrollLocked(false)}>
      {visible &&
      <motion.div
        role="status"
        aria-live="polite"
        aria-label={`Loading ${progress}%`}
        className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-5 py-6 md:px-10 md:py-10"
        exit={{ y: "-100%" }}
        transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}>
        
          <Logo />
          <div>
            <div className="flex items-end justify-between gap-6">
              <p className="max-w-[16rem] font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-silver">
                Calibrating material
                <br />
                Precured retread systems
              </p>
              <span className="font-display text-[clamp(4rem,14vw,12rem)] font-bold leading-[0.8] tracking-[-0.05em] tabular-nums text-bone">
                {String(progress).padStart(3, "0")}
              </span>
            </div>
            <div className="mt-6 h-px w-full bg-charcoal">
              <div className="h-px bg-signal" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}