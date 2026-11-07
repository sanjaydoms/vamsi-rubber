import { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";
import { RevealLines } from "../ui/RevealLines";
import { scrollToId } from "../../utils/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.23, 1, 0.32, 1] as const;

type HeroProps = {
  started: boolean;
  onReady?: () => void;
};

export function Hero({ started, onReady }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const readyRef = useRef(onReady);
  readyRef.current = onReady;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      readyRef.current?.();
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.play().catch(() => {});

    if (video.readyState >= 2) {
      readyRef.current?.();
      return;
    }

    const markReady = () => readyRef.current?.();
    video.addEventListener("loadeddata", markReady, { once: true });
    video.addEventListener("error", markReady, { once: true });
    const fallback = window.setTimeout(markReady, 1200);

    return () => {
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("error", markReady);
      window.clearTimeout(fallback);
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("[data-hero-content]", {
        yPercent: -14,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "70% top", scrub: true }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: started ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    transition: { duration: 0.3, ease: EASE, delay }
  });

  return (
    <section
      id="home"
      ref={ref}
      aria-label="Engineered to endure"
      className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-ink pt-24 md:pt-28 xl:pt-32">
      
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/40" />
      </div>

      <div data-hero-content className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-10 md:px-10 md:pb-12 xl:pb-14">
        <motion.p {...fade(0.1)} className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-silver">
          <span className="h-px w-10 bg-signal" />
          Advanced rubber engineering
        </motion.p>

        <RevealLines
          as="h1"
          play={started}
          delay={0.15}
          lines={[
          "Engineered",
          <>
              To endure<span className="text-signal">.</span>
            </>]
          }
          lineClassNames={["", "md:pl-[9vw]"]}
          className="mt-4 font-display text-[clamp(2.45rem,min(10.5vw,15.5svh),11.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.05em] text-bone md:mt-5" />
        

        <div className="mt-6 flex flex-col gap-8 md:mt-8 md:flex-row md:items-end md:justify-between xl:mt-10">
          <div className="max-w-md">
            <motion.p {...fade(0.4)} className="text-[14.5px] leading-relaxed text-silver sm:text-[15px] md:text-base">
              Precision-engineered retreading materials built for durability, consistent quality and dependable road performance.
            </motion.p>
            <motion.div {...fade(0.48)} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-7">
              <MagneticButton onClick={() => scrollToId("products")}>
                Explore our materials
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
              </MagneticButton>
              <button
                type="button"
                onClick={() => scrollToId("about", 0.95)}
                className="group flex items-center gap-2 border-b border-silver/40 pb-1 font-mono text-[12px] uppercase tracking-[0.14em] text-bone transition-colors duration-150 hover:border-signal focus-visible:outline-none focus-visible:border-signal">
                
                Discover Vamshi
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>);

}