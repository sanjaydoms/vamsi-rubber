import type { Annotation, LabeledValue, NavLink } from "../types/content";
import { products } from "./products";

export const navLinks: NavLink[] = [
  { label: "Home", id: "home" },
  { label: "About Us", id: "about", offsetVh: 0.95 },
  {
    label: "Products",
    id: "products",
    children: products.map((p) => ({
      label: p.name,
      code: p.code,
      sectionId: "products",
      productId: p.id
    }))
  },
  {
    label: "Financials",
    id: "financials",
    href: "https://www.vamshirubber.org/",
    children: [
      { label: "Annual Reports", href: "https://www.vamshirubber.org/" },
      { label: "Quarterly Results", href: "https://www.vamshirubber.org/" },
      { label: "Shareholding Pattern", href: "https://www.vamshirubber.org/" },
      { label: "Corporate Governance", href: "https://www.vamshirubber.org/" },
      { label: "Policies & Disclosures", href: "https://www.vamshirubber.org/" }
    ]
  },
  { label: "Quality", id: "quality" },
  { label: "Testimonials", id: "testimonials", offsetVh: -0.2 },
  {
    label: "Gallery",
    id: "manufacturing",
    children: [
      { label: "Manufacturing Plant", sectionId: "manufacturing" },
      { label: "Product Range", sectionId: "products" },
      { label: "Fleet Applications", sectionId: "applications" }
    ]
  },
  { label: "News", id: "applications" },
  { label: "Enquiry", id: "enquiry-form", offsetVh: -0.15 },
  {
    label: "Contact",
    id: "contact",
    children: [
      { label: "Head Office — Hyderabad", sectionId: "contact" },
      { label: "Send an Enquiry", sectionId: "enquiry-form", offsetVh: -0.15 },
      { label: "+91 40 2980 2533", href: "tel:+914029802533" },
      { label: "info@vamshirubber.org", href: "mailto:info@vamshirubber.org" }
    ]
  },
  { label: "Sitemap", id: "sitemap" }
];


export const contactDetails = {
  company: "Vamshi Rubber Limited",
  addressLines: ["Vamshi House, Plot No 41", "Jayabheri Enclave, Gachibowli", "Hyderabad – 500032, Telangana, India"],
  email: "info@vamshirubber.org",
  phoneDisplay: "+91 40 2980 2533",
  phoneHref: "tel:+914029802533",
  website: "www.vamshirubber.org",
  websiteHref: "https://www.vamshirubber.org/"
};

export const brandFacts: LabeledValue[] = [
{ label: "Focus", value: "Precured tyre retreading materials" },
{ label: "Certification", value: "ISO 9001:2015 — DNV" },
{ label: "Compliance", value: "REACH-compliant retread material" },
{ label: "Headquarters", value: "Gachibowli, Hyderabad" }];


export const treadAnatomy: Annotation[] = [
{ label: "Tread block", left: "14%", top: "22%" },
{ label: "Circumferential groove", left: "58%", top: "30%" },
{ label: "Sipe pattern", left: "64%", top: "68%" }];


export const qualityCommitments: LabeledValue[] = [
{
  label: "Quality control",
  value: "An ultra-modern laboratory located in the factory is capable of performing all necessary quality control."
},
{
  label: "Consistent standards",
  value:
  "Manufacturing and customer service run on the quality management system that the ISO 9001:2015 certification audits."
},
{
  label: "Material reliability",
  value: "Vamshi retread material is REACH compliant."
}];


export const testimonial = {
  quote:
  "High quality standards, regular interaction and prompt solutions. We are proud to be associated with Vamshi Rubber.",
  author: "Tyre Grip"
};

export const clients: string[] = [
"TSRTC",
"APSRTC",
"TNSPT",
"KSRTC",
"MSRTC",
"RSRTC",
"Arunachala",
"Arihanth",
"Disha",
"Fortune",
"TL Logistics",
"Tyre Grip"];


export const applications: LabeledValue[] = [
{ label: "State transport fleets", value: "Bus fleets including TSRTC, APSRTC, KSRTC and MSRTC." },
{ label: "Long-haul trucking", value: "Commercial trucks covering high daily distances." },
{ label: "Retread workshops", value: "Retreaders building precured retreads on buffed casings." },
{ label: "Logistics operators", value: "Fleet partners such as TL Logistics." }];


export const brochures: {label: string;href: string;isNew?: boolean;}[] = [
  { label: "Export Brochure", href: "https://www.vamshirubber.org/" },
  { label: "Domestic Brochure", href: "https://www.vamshirubber.org/" },
  { label: "Latest Info", href: "https://www.vamshirubber.org/", isNew: true }
];

export const socialLinks: {label: string;href: string;icon: "facebook" | "twitter" | "linkedin" | "youtube";}[] = [
  { label: "Facebook", href: "https://www.vamshirubber.org/", icon: "facebook" },
  { label: "Twitter", href: "https://www.vamshirubber.org/", icon: "twitter" },
  { label: "LinkedIn", href: "https://www.vamshirubber.org/", icon: "linkedin" },
  { label: "YouTube", href: "https://www.vamshirubber.org/", icon: "youtube" }
];