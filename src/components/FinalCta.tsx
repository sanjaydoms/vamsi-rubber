import Image from "next/image";
import { MagneticButton } from "@/components/MagneticButton";

interface FinalCtaProps {
  headline?: string;
  subtext?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  imageSrc?: string;
}

export function FinalCta({
  headline = "LET'S BUILD A STRONGER ROAD AHEAD.",
  subtext = "Looking for dependable retreading materials or exploring a business partnership? Connect with our technical and commercial team.",
  primaryLabel = "REQUEST A QUOTE",
  primaryHref = "/contact",
  secondaryLabel = "EXPLORE PRODUCTS",
  secondaryHref = "/products",
  imageSrc = "/images/editorial/highway_truck_bridge.jpg",
}: FinalCtaProps) {
  return (
    <section className="relative overflow-hidden bg-obsidian">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt="Commercial highway freight transport"
          fill
          className="object-cover object-center opacity-30 grayscale contrast-125"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/90 to-obsidian/70" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-18 lg:py-24">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-[2px] w-10 bg-industrial-orange" />
            <span className="font-heading text-xs uppercase tracking-[0.18em] text-industrial-orange">
              PARTNERSHIP &amp; SUPPLY
            </span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[1.02] text-white">
            {headline}
          </h2>

          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-warm-white/75">
            {subtext}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href={primaryHref} variant="primary">
              <span>{primaryLabel}</span>
            </MagneticButton>
            <MagneticButton href={secondaryHref} variant="outline-light">
              <span>{secondaryLabel}</span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
