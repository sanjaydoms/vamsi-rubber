import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Press Room | Vamshi Rubber Limited",
  description:
    "Official news, press releases, corporate announcements, and compounding milestones from Vamshi Rubber Limited (BSE: 530369).",
};

interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  readTime: string;
  image: string;
}

const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "reach-compliance-expansion",
    title: "Vamshi Rubber Expands REACH-Compliant Tread Range for European & Gulf Retreaders",
    date: "October 18, 2024",
    category: "Export & Compliance",
    readTime: "4 min read",
    image: "/images/editorial/truck_wheel_hero.jpg",
    summary:
      "Vamshi's 33-pattern Precured Tread Rubber (PCTR) portfolio has finalized comprehensive REACH certification and heavy-metal testing, accelerating direct bulk dispatches to commercial tyre retreading facilities across the EU and GCC regions.",
  },
  {
    id: "200m-kg-milestone",
    title: "Milestone: Over 200 Million Kilograms of Retreading Material Delivered Across India",
    date: "August 12, 2024",
    category: "Corporate Milestone",
    readTime: "3 min read",
    image: "/images/editorial/tyre_manufacture_factory.jpg",
    summary:
      "Having enabled approximately 20 million commercial tyre casings to achieve multi-life mileage since founding in 1993, Vamshi Rubber continues to support India's circular economy and sustainable logistics.",
  },
  {
    id: "srtc-partnerships-renewed",
    title: "Major State Road Transport Undertakings Renew Retreading Supply Contracts",
    date: "May 24, 2024",
    category: "Fleet Partnerships",
    readTime: "5 min read",
    image: "/images/editorial/tsrtc_bus.jpg",
    summary:
      "Following comparative cost-per-kilometer (CPKM) casing trials and depot audits, major State Road Transport Corporations (including APSRTC, TSRTC, and KSRTC) have re-affirmed compounding framework agreements with Vamshi.",
  },
  {
    id: "automated-banbury-commissioning",
    title: "Automated Banbury Compounding Bay Commissioned at Choutuppal Plant",
    date: "January 15, 2024",
    category: "Plant Innovation",
    readTime: "3 min read",
    image: "/images/editorial/rubber_mill.jpg",
    summary:
      "Installation of computerized temperature-controlled mixing cycles and automated carbon black dosing achieves unprecedented Mooney viscosity consistency across every production batch.",
  },
  {
    id: "bse-corporate-governance",
    title: "Vamshi Rubber Limited (BSE: 530369) Highlights High-Mileage Radial Growth",
    date: "November 28, 2023",
    category: "Investor Relations",
    readTime: "4 min read",
    image: "/images/editorial/semi_fleet.jpg",
    summary:
      "Corporate presentation to shareholders details increasing domestic radialization trends in India's commercial transport sector and Vamshi's specialized radial tread profiles.",
  },
];

export default function NewsPage() {
  return (
    <>
      {/* 1. Hero Header */}
      <section className="relative overflow-hidden bg-obsidian text-warm-white pt-32 pb-20 lg:pt-40 lg:pb-24 border-b border-white/10">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-industrial-orange" />
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
              PRESS ROOM &amp; MILESTONES
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white max-w-4xl leading-[1.03]">
            CORPORATE NEWS &amp;
            <br />
            TECHNICAL ANNOUNCEMENTS.
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-warm-white/80">
            Latest press releases, plant capacity milestones, fleet case studies, and corporate developments from Vamshi Rubber Limited (BSE: 530369).
          </p>
        </div>
      </section>

      {/* 2. News Feed Grid */}
      <section className="bg-white text-obsidian py-20 lg:py-28 border-b border-slate-200">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Featured Article (First) */}
            <div className="lg:col-span-12">
              <div className="rounded-[28px] overflow-hidden border border-slate-200 bg-[#FAF9F6] p-6 sm:p-8 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900">
                  <Image
                    src={NEWS_ARTICLES[0].image}
                    alt={NEWS_ARTICLES[0].title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-industrial-orange px-3.5 py-1 text-[10px] font-heading font-bold uppercase tracking-wider text-white shadow-sm">
                    FEATURED STORY
                  </span>
                </div>
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-4 text-xs font-heading uppercase tracking-wider text-slate-500">
                    <span className="inline-flex items-center gap-1.5 text-industrial-orange font-bold">
                      <Tag className="h-3.5 w-3.5" />
                      {NEWS_ARTICLES[0].category}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {NEWS_ARTICLES[0].date}
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-obsidian leading-snug">
                    {NEWS_ARTICLES[0].title}
                  </h2>
                  <p className="text-base leading-relaxed text-slate-600">
                    {NEWS_ARTICLES[0].summary}
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-wider text-industrial-orange hover:text-industrial-red"
                    >
                      <span>Media &amp; Commercial Enquiry</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Remaining Articles */}
            {NEWS_ARTICLES.slice(1).map((article) => (
              <div
                key={article.id}
                className="lg:col-span-6 flex flex-col rounded-[24px] border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="rounded-full bg-black/70 backdrop-blur-md px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-wider text-white border border-white/20">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-wider text-slate-400">
                      <Calendar className="h-3.5 w-3.5 text-industrial-orange" />
                      <span>{article.date}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-obsidian leading-snug hover:text-industrial-orange transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-slate-600">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-heading uppercase tracking-wider">
                    <span className="text-slate-500">Official Press Release</span>
                    <span className="text-industrial-orange font-bold inline-flex items-center gap-1">
                      Read Details <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Media Contact Bar */}
      <section className="bg-obsidian text-warm-white py-16 border-b border-white/10">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-heading text-xs uppercase tracking-[0.18em] text-industrial-orange font-semibold">
              PRESS &amp; MEDIA INQUIRIES
            </p>
            <p className="font-heading text-lg font-bold text-white mt-1">
              Looking for executive interviews, high-res assets, or corporate reports?
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 font-heading text-xs font-bold uppercase tracking-wider text-white transition-colors shrink-0"
          >
            <span>Contact Media Relations</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
