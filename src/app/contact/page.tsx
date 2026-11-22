import type { Metadata } from "next";
import { Building2, Factory, Mail, MapPin, Phone, UserCheck } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Corporate Office, Plant & Regional Depots",
  description:
    "Contact Vamshi Rubber Limited Corporate Office in Gachibowli, Hyderabad, Choutuppal Manufacturing Plant, Customer Service, or 10 pan-India marketing offices and depots.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; type?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <section className="relative overflow-hidden bg-obsidian text-warm-white pt-36 pb-20 lg:pt-44 lg:pb-24 border-b border-white/10">
        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-industrial-orange shadow-sm" />
            <span className="font-heading text-xs uppercase tracking-[0.2em] font-semibold text-industrial-orange">
              CONTACT &amp; BUSINESS ENQUIRIES
            </span>
          </div>
          <h1 className="max-w-4xl font-heading text-4xl sm:text-6xl lg:text-[4.25rem] font-bold uppercase tracking-tight leading-[0.98] text-white">
            GOOD BUSINESS STARTS WITH THE RIGHT CONNECTION.
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-warm-white/80">
            Reach our corporate headquarters in Hyderabad, export desk, customer service engineering lead, or any of our regional marketing offices across India.
          </p>
        </div>
      </section>

      {/* Main Contact Grid & Enquiry Form */}
      <section className="bg-white text-obsidian border-b border-slate-200">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left: Corporate Office, Factory, Customer Service */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-slate-200/90 bg-[#FAF9F6] p-7 sm:p-8 space-y-4 shadow-[0_4px_25px_rgba(0,0,0,0.04)] text-obsidian">
                <div className="flex items-center gap-2.5 text-industrial-orange">
                  <Building2 className="h-5 w-5" />
                  <span className="font-heading text-xs font-bold uppercase tracking-[0.18em]">
                    CORPORATE OFFICE
                  </span>
                </div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-obsidian">
                  {COMPANY_INFO.name}
                </h2>
                <p className="text-sm leading-relaxed text-slate-600">
                  {COMPANY_INFO.corporateOffice.address}
                </p>

                <div className="border-t border-slate-200 pt-4 space-y-2.5 text-sm">
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-industrial-orange shrink-0" />
                    <span className="font-semibold text-obsidian">
                      {COMPANY_INFO.corporateOffice.phones.join(" / ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="text-xs text-slate-600 font-medium">
                      Export Desk Mobile: {COMPANY_INFO.corporateOffice.exportMobile}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-industrial-orange shrink-0" />
                    <a
                      href={`mailto:${COMPANY_INFO.corporateOffice.email}`}
                      className="font-medium text-obsidian hover:text-industrial-orange transition-colors"
                    >
                      {COMPANY_INFO.corporateOffice.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-[#FAF9F6] p-7 sm:p-8 space-y-3 shadow-[0_4px_25px_rgba(0,0,0,0.04)] text-obsidian">
                <div className="flex items-center gap-2.5 text-industrial-orange">
                  <Factory className="h-5 w-5" />
                  <span className="font-heading text-xs font-bold uppercase tracking-[0.18em]">
                    MANUFACTURING FACILITY
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  {COMPANY_INFO.factory.address}
                </p>
                <p className="text-xs text-slate-500 font-medium">{COMPANY_INFO.factory.acreage}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0A1128] text-warm-white p-7 sm:p-8 space-y-3 shadow-xl">
                <div className="flex items-center gap-2.5 text-industrial-orange">
                  <UserCheck className="h-5 w-5" />
                  <span className="font-heading text-xs font-bold uppercase tracking-[0.18em]">
                    CUSTOMER SERVICE &amp; TECHNICAL SUPPORT
                  </span>
                </div>
                <p className="font-heading text-xl font-bold text-white tracking-tight">
                  {COMPANY_INFO.corporateOffice.customerServiceLead.name}
                </p>
                <p className="text-xs text-warm-white/70 font-medium">
                  {COMPANY_INFO.corporateOffice.customerServiceLead.role}
                </p>
                <div className="pt-2 space-y-1.5 text-xs">
                  <p className="text-warm-white/90">Ph: {COMPANY_INFO.corporateOffice.customerServiceLead.phone}</p>
                  <p>
                    Email:{" "}
                    <a
                      href={`mailto:${COMPANY_INFO.corporateOffice.customerServiceLead.email}`}
                      className="text-industrial-orange hover:underline font-medium"
                    >
                      {COMPANY_INFO.corporateOffice.customerServiceLead.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Working Business Enquiry Form */}
            <div className="lg:col-span-7">
              <ContactForm
                defaultProduct={params.product}
                defaultType={params.type}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Office Map Embed */}
      <section className="bg-[#FAF9F6] text-obsidian border-b border-slate-200">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-16 lg:py-20">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-heading text-xs uppercase tracking-[0.18em] text-industrial-orange font-bold">
                CORPORATE OFFICE LOCATION
              </span>
              <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-obsidian">
                VAMSHI HOUSE, GACHIBOWLI, HYDERABAD
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <MapPin className="h-4 w-4 text-industrial-orange" />
              <span>Hyderabad – 500 032, Telangana</span>
            </span>
          </div>

          <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
            <iframe
              title="Vamshi Rubber Limited Corporate Office Map"
              src={COMPANY_INFO.corporateOffice.mapEmbedUrl}
              width="100%"
              height="420"
              loading="lazy"
              className="w-full border-0 grayscale contrast-110"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
