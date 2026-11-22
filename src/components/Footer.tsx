import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, FileDown, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";
import { PRODUCTS } from "@/data/products";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-obsidian text-warm-white">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Company Introduction */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3.5 group" aria-label="Vamshi Rubber Limited Home">
              <Image
                src="/images/brand/vr-logo-new.png"
                alt="Vamshi Rubber Limited"
                width={156}
                height={72}
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-heading text-lg font-bold uppercase tracking-wider text-white leading-none">
                  VAMSHI RUBBER
                </span>
                <span className="font-heading text-[10px] uppercase tracking-[0.24em] text-slate-400 font-medium mt-1">
                  LIMITED
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-neutral-grey">
              Established in 1993 in technical collaboration with Hercules Tire &amp; Rubber Co., USA. Manufacturing dependable tyre retreading materials for domestic fleets and global export markets.
            </p>

            <div className="space-y-2 border-l-2 border-industrial-orange pl-4 text-xs text-warm-white/85">
              <div className="flex items-center gap-2 font-heading uppercase tracking-[0.12em]">
                <ShieldCheck className="h-4 w-4 text-industrial-orange" />
                <span>ISO 9001:2015 Certified (DNV)</span>
              </div>
              <p className="text-neutral-grey">
                Export retread compounds verified REACH Compliant · BSE: {COMPANY_INFO.bseCode}
              </p>
            </div>
          </div>

          {/* Column 2: Main Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-heading text-xs uppercase tracking-[0.16em] text-industrial-orange">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-warm-white/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/quality" className="hover:text-white transition-colors">
                  Quality Standards
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-white transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Categories & Brochures */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-heading text-xs uppercase tracking-[0.16em] text-industrial-orange">
              Product Portfolio
            </h3>
            <ul className="grid grid-cols-1 gap-2 text-sm text-warm-white/80">
              {PRODUCTS.slice(0, 7).map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/products/${item.slug}`}
                    className="inline-flex items-center gap-1.5 hover:text-industrial-orange transition-colors"
                  >
                    <span>{item.shortName}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-3 space-y-2">
              <p className="font-heading text-[10px] uppercase tracking-[0.16em] text-neutral-grey">
                Catalogues &amp; Brochures
              </p>
              <div className="flex flex-col gap-2">
                {COMPANY_INFO.brochures.map((doc) => (
                  <a
                    key={doc.href}
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between border border-white/15 bg-charcoal px-3.5 py-2 text-xs text-warm-white hover:border-industrial-orange hover:text-industrial-orange transition-colors"
                  >
                    <span>{doc.title}</span>
                    <FileDown className="h-3.5 w-3.5 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 4: Corporate & Plant Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-heading text-xs uppercase tracking-[0.16em] text-industrial-orange">
              Corporate &amp; Plant
            </h3>
            <div className="space-y-4 text-xs leading-relaxed text-warm-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-industrial-orange" />
                <div>
                  <p className="font-heading font-semibold text-white">Corporate Office</p>
                  <p className="text-neutral-grey">{COMPANY_INFO.corporateOffice.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-grey" />
                <div>
                  <p className="font-heading font-semibold text-white">Manufacturing Plant</p>
                  <p className="text-neutral-grey">{COMPANY_INFO.factory.address}</p>
                </div>
              </div>

              <div className="space-y-1.5 border-t border-white/10 pt-3">
                <a
                  href={`tel:${COMPANY_INFO.corporateOffice.phones[0].replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 hover:text-industrial-orange transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-industrial-orange" />
                  <span>{COMPANY_INFO.corporateOffice.phones.join(" / ")}</span>
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.corporateOffice.email}`}
                  className="flex items-center gap-2 hover:text-industrial-orange transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-industrial-orange" />
                  <span>{COMPANY_INFO.corporateOffice.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Investor Bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-neutral-grey md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Vamshi Rubber Limited. All Rights Reserved. CIN: {COMPANY_INFO.cin}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>
              Investor Grievances:{" "}
              <a
                href={`mailto:${COMPANY_INFO.corporateOffice.grievanceEmail}`}
                className="text-warm-white hover:text-industrial-orange transition-colors"
              >
                {COMPANY_INFO.corporateOffice.grievanceEmail}
              </a>
            </span>
            <Link href="/quality" className="hover:text-white transition-colors">
              ISO 9001:2015 QMS
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact &amp; Enquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
