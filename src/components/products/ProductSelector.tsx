import { motion } from "framer-motion";
import type { Product } from "../../types/content";

type ProductSelectorProps = {
  products: Product[];
  activeId: string;
  onSelect: (id: string) => void;
};

export function ProductSelector({ products, activeId, onSelect }: ProductSelectorProps) {
  return (
    <>
      <div
        role="tablist"
        aria-label="Product families"
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:-mx-10 md:px-10 lg:hidden">
        
        {products.map((p) => {
          const isActive = p.id === activeId;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(p.id)}
              className={`shrink-0 whitespace-nowrap border px-4 py-2.5 text-[12.5px] font-medium tracking-[0.01em] transition-colors duration-150 ${
                isActive ? "border-signal bg-signal text-ink" : "border-charcoal text-silver hover:text-bone"
              }`}>
              
              {p.name}
            </button>);

        })}
      </div>

      <ul className="hidden border-b border-charcoal lg:block">
        {products.map((p) => {
          const isActive = p.id === activeId;
          return (
            <li key={p.id} className="border-t border-charcoal">
              <button
                type="button"
                aria-pressed={isActive}
                onMouseEnter={() => onSelect(p.id)}
                onFocus={() => onSelect(p.id)}
                onClick={() => onSelect(p.id)}
                className="group flex w-full items-center gap-3.5 py-4 text-left focus-visible:outline-none xl:gap-5 xl:py-5">
                
                <span className="relative h-2 w-2 shrink-0">
                  {isActive &&
                  <motion.span layoutId="product-marker" className="absolute inset-0 bg-signal" transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }} />
                  }
                </span>
                <span
                  className={`flex-1 whitespace-nowrap font-display text-[clamp(1.15rem,1.95vw,2.25rem)] font-semibold tracking-[-0.03em] transition-colors duration-150 ${
                  isActive ? "text-bone" : "text-silver/55 group-hover:text-silver group-focus-visible:text-silver"}`
                  }>
                  
                  {p.name}
                </span>
                <span className={`shrink-0 font-mono text-[11px] tracking-[0.16em] ${isActive ? "text-signal" : "text-silver/55"}`}>{p.code}</span>
              </button>
            </li>);

        })}
      </ul>
    </>);

}