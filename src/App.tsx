import { useCallback, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/sections/Hero";
import { BrandStory } from "./components/sections/BrandStory";
import { ProductDiscovery } from "./components/sections/ProductDiscovery";
import { Manufacturing } from "./components/sections/Manufacturing";
import { Quality } from "./components/sections/Quality";
import { Applications } from "./components/sections/Applications";
import { ContactFinale } from "./components/sections/ContactFinale";
import { initSmoothScroll, scrollToId, setScrollLocked } from "./utils/smoothScroll";

export function App() {
  const [enquiryProduct, setEnquiryProduct] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>();

  useEffect(() => {
    setScrollLocked(false);
    return initSmoothScroll();
  }, []);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const id = window.setTimeout(refresh, 400);
    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(id);
    };
  }, []);

  const handleEnquire = useCallback((productName: string) => {
    setEnquiryProduct(productName);
    scrollToId("enquiry-form", -0.15);
  }, []);
  const handleSelectProduct = useCallback((productId: string) => {
    setSelectedProductId(productId);
    scrollToId("products");
  }, []);

  return (
    <div className="relative w-full bg-ink text-bone [overflow-x:clip]">
      <Navbar onSelectProduct={handleSelectProduct} />
      <main className="relative z-10">
        <Hero started />
        <BrandStory />
        <ProductDiscovery onEnquire={handleEnquire} selectedProductId={selectedProductId} />
        <Manufacturing />
        <Quality />
        <Applications />
        <ContactFinale product={enquiryProduct} onProductChange={setEnquiryProduct} />
      </main>
    </div>);

}