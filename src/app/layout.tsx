import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Providers } from "@/components/Providers";
import { COMPANY_INFO } from "@/data/company";

const spaceGroteskHeading = localFont({
  src: "./fonts/SpaceGrotesk-Variable.woff2",
  weight: "400 700",
  variable: "--font-heading",
  display: "swap",
});

const spaceGroteskBody = localFont({
  src: "./fonts/SpaceGrotesk-Variable.woff2",
  weight: "400 700",
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk-Variable.woff2",
  weight: "400 700",
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vamshirubber.org"),
  title: {
    default: "Vamshi Rubber Limited | Tyre Retreading Materials & Engineering Solutions",
    template: "%s | Vamshi Rubber Limited",
  },
  description:
    "ISO 9001:2015 certified & REACH compliant Indian manufacturer of Precured Tread Rubber (PCTR), CBTR, Cushion Gum, Bonding Gum, Vulcanising Solution, Extruded Rope Rubber, and Curing Envelopes since 1993.",
  keywords: [
    "Vamshi Rubber Limited",
    "tyre retreading materials India",
    "precured tread rubber PCTR",
    "camelback tread rubber CBTR",
    "bonding gum cushion gum",
    "vulcanising solution",
    "curing envelopes",
    "Hyderabad retread manufacturer",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.vamshirubber.org",
    siteName: "Vamshi Rubber Limited",
    title: "Vamshi Rubber Limited — Engineered to Go Further. Built to Last Longer.",
    description:
      "Delivering dependable tyre retreading material solutions through manufacturing expertise, laboratory precision, and ISO 9001:2015 quality.",
    images: [
      {
        url: "/images/editorial/tire_transport.jpg",
        width: 1600,
        height: 1066,
        alt: "Vamshi Rubber Limited — Tyre Retreading Materials",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_INFO.name,
    url: "https://www.vamshirubber.org",
    logo: "https://www.vamshirubber.org/images/brand/vr-logo-new.png",
    foundingDate: "1993-11-24",
    description:
      "ISO 9001:2015 certified manufacturer and exporter of Precured Tread Rubber (PCTR), Camelback Tread Rubber (CBTR), Cushion Gum, Bonding Gum, Vulcanising Solution, and Curing Envelopes.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Vamshi House, Plot No. 41, Jayabheri Enclave, Gachibowli",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500032",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-40-2980-2533",
      contactType: "sales",
      email: "info@vamshirubber.org",
    },
  };

  return (
    <html
      lang="en"
      className={`${spaceGroteskHeading.variable} ${spaceGroteskBody.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-obsidian text-warm-white font-body antialiased selection:bg-industrial-orange selection:text-white"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
