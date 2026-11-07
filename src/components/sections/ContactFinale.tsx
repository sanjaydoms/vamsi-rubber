import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpIcon, ArrowUpRightIcon } from "lucide-react";
import { brochures, contactDetails } from "../../data/company";
import { EnquiryForm } from "../contact/EnquiryForm";
import { Logo } from "../ui/Logo";
import { MagneticButton } from "../ui/MagneticButton";
import { RevealLines } from "../ui/RevealLines";
import { scrollToId } from "../../utils/smoothScroll";

type ContactFinaleProps = {
  product: string;
  onProductChange: (value: string) => void;
};

export function ContactFinale({ product, onProductChange }: ContactFinaleProps) {
  const nameRef = useRef<HTMLInputElement>(null);

  const talkToTeam = () => {
    scrollToId("enquiry-form", -0.15);
    window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 700);
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative min-h-[100svh] bg-ink pt-28 md:pt-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-silver">
          <span className="h-px w-10 bg-signal" />
          Contact — Vamshi House, Hyderabad
        </p>
        <RevealLines
          id="contact-title"
          lines={[
          "Let’s move",
          "industry",
          <>
              forward<span className="text-signal">.</span>
            </>]
          }
          lineClassNames={["", "md:pl-[12vw]", ""]}
          className="mt-6 font-display text-[clamp(2.35rem,min(10vw,15svh),11rem)] font-bold uppercase leading-[0.86] tracking-[-0.05em] text-bone" />
        

        <div className="mt-10 grid gap-10 md:mt-14 md:gap-12 lg:mt-24 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="flex items-center justify-center py-4 sm:py-6 lg:sticky lg:top-36 lg:col-span-5 lg:self-start lg:py-20">
            <motion.img
              src="/vamshi-outline-logo.png"
              alt="Vamshi Rubber"
              draggable={false}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 0.9, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="w-full max-w-[280px] object-contain sm:max-w-[400px] lg:max-w-[540px]"
            />
          </div>

          <div className="-mx-5 bg-ink/85 px-5 py-6 sm:py-10 lg:col-span-6 lg:col-start-7 lg:mx-0 lg:bg-transparent lg:p-0">
            <p className="max-w-md font-display text-[clamp(1.35rem,2vw,1.85rem)] font-semibold leading-snug tracking-[-0.02em] text-bone">
              Looking for reliable retreading material solutions? Connect with Vamshi Rubber.
            </p>
            <div className="mt-8">
              <MagneticButton onClick={talkToTeam}>
                Talk to our team
                <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
            </div>

            <EnquiryForm ref={nameRef} product={product} onProductChange={onProductChange} className="mt-16" />

            <address className="mt-16 grid gap-8 border-t border-charcoal pt-10 not-italic sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-silver">Head office</p>
                <p className="mt-3 text-[15px] leading-relaxed text-bone">
                  {contactDetails.company}
                  {contactDetails.addressLines.map((line) =>
                  <span key={line} className="block">
                      {line}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <div>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-silver">All sales enquiries</p>
                  <a href={`mailto:${contactDetails.email}`} className="mt-2 block text-[15px] text-bone transition-colors duration-150 hover:text-signal">
                    {contactDetails.email}
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-silver">For all enquiries call</p>
                  <a href={contactDetails.phoneHref} className="mt-2 block text-[15px] text-bone transition-colors duration-150 hover:text-signal">
                    {contactDetails.phoneDisplay}
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-silver">Web</p>
                  <a
                    href={contactDetails.websiteHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block text-[15px] text-bone transition-colors duration-150 hover:text-signal">
                    
                    {contactDetails.website}
                  </a>
                </div>
              </div>
            </address>
          </div>
        </div>

        <footer id="sitemap" className="mt-24 flex flex-col gap-8 border-t border-charcoal py-10 md:flex-row md:items-center md:justify-between">
          <Logo />
          <ul className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.16em] text-silver">
            {brochures.map((b) =>
            <li key={b.label}>
                <a href={b.href} target="_blank" rel="noreferrer" className="transition-colors duration-150 hover:text-bone">
                  {b.label}
                </a>
              </li>
            )}
            <li>ISO 9001:2015 certified</li>
            <li>© 2026 {contactDetails.company}</li>
          </ul>
          <button
            type="button"
            onClick={() => scrollToId("home")}
            className="flex items-center gap-3 self-start font-mono text-[11px] uppercase tracking-[0.16em] text-silver transition-colors duration-150 hover:text-bone md:self-auto">
            
            Back to top
            <span className="flex h-9 w-9 items-center justify-center border border-silver/30">
              <ArrowUpIcon className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>
        </footer>
      </div>
    </section>);

}