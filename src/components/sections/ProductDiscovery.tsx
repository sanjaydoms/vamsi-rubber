import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "../../data/products";
import { ProductSelector } from "../products/ProductSelector";
import { ProductStage } from "../products/ProductStage";
import { RevealLines } from "../ui/RevealLines";

gsap.registerPlugin(ScrollTrigger);

type ProductDiscoveryProps = {
  onEnquire: (productName: string) => void;
  selectedProductId?: string;
};

export function ProductDiscovery({ onEnquire, selectedProductId }: ProductDiscoveryProps) {
  const ref = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(products[0].id);
  const active = products.find((p) => p.id === activeId) ?? products[0];

  useEffect(() => {
    if (selectedProductId) setActiveId(selectedProductId);
  }, [selectedProductId]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-strip]",
        { xPercent: 0 },
        { xPercent: -28, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="products" ref={ref} aria-labelledby="products-title" className="relative bg-graphite pb-24 pt-[18vh] md:pb-36">
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-30 -translate-y-1/2 whitespace-nowrap mix-blend-difference">
        <div data-strip className="font-display text-[15vw] font-bold uppercase leading-none tracking-[-0.05em] text-bone">
          PCTR — Cushion Gum — Bonding Gum — CBTR — Curing Envelopes —
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-silver">
              <span className="h-px w-10 bg-signal" />
              Product families
            </p>
            <RevealLines
              id="products-title"
              lines={["The retread,", "material by material."]}
              className="mt-6 font-display text-[clamp(2.4rem,5.6vw,6rem)] font-bold uppercase leading-[0.9] tracking-[-0.045em] text-bone"
              lineClassNames={["", "text-silver"]} />
            
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-silver lg:col-span-4 lg:col-start-9">
            Eight product families cover the precured retreading process — from casing preparation and repair to bonding, tread application
            and curing. Hover a material to bring it forward.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:order-2 lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              <ProductStage product={active} onEnquire={onEnquire} />
            </div>
          </div>
          <div className="order-first lg:order-1 lg:col-span-5">
            <ProductSelector products={products} activeId={activeId} onSelect={setActiveId} />
          </div>
        </div>
      </div>
    </section>);

}