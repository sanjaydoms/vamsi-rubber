"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { PRODUCTS } from "@/data/products";

const ENQUIRY_TYPES = [
  "Product enquiry",
  "Dealership enquiry",
  "Export enquiry",
  "Domestic distribution",
  "General business enquiry",
] as const;

interface ContactFormProps {
  defaultProduct?: string;
  defaultType?: string;
}

export function ContactForm({ defaultProduct = "", defaultType = "" }: ContactFormProps) {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("India");
  const [city, setCity] = useState("");
  const [enquiryType, setEnquiryType] = useState(
    ENQUIRY_TYPES.includes(defaultType as (typeof ENQUIRY_TYPES)[number])
      ? defaultType
      : "Product enquiry"
  );
  const [productInterest, setProductInterest] = useState(defaultProduct || "Precured Tread Rubber (PCTR)");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [renderedAt, setRenderedAt] = useState<number>(0);
  const [challenge, setChallenge] = useState({ a: 4, b: 7 });
  const [challengeAnswer, setChallengeAnswer] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    referenceId: string;
    submittedAt: string;
  } | null>(null);

  const regenerateChallenge = () => {
    const a = Math.floor(Math.random() * 9) + 2;
    const b = Math.floor(Math.random() * 9) + 2;
    setChallenge({ a, b });
    setChallengeAnswer("");
  };

  useEffect(() => {
    setRenderedAt(Date.now());
    regenerateChallenge();
  }, []);

  const validateClient = () => {
    const errs: Record<string, string> = {};
    if (fullName.trim().length < 2) errs.fullName = "Full name is required.";
    if (companyName.trim().length < 2) errs.companyName = "Company name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Valid email address is required.";
    }
    if (phoneNumber.replace(/[^0-9+]/g, "").length < 7) {
      errs.phoneNumber = "Valid phone number is required.";
    }
    if (country.trim().length < 2) errs.country = "Country is required.";
    if (city.trim().length < 2) errs.city = "City is required.";
    if (message.trim().length < 10) {
      errs.message = "Please provide at least 10 characters about your requirement.";
    }
    if (Number(challengeAnswer) !== challenge.a + challenge.b) {
      errs.challengeAnswer = "Please enter the correct verification sum.";
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateClient()) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          companyName,
          email,
          phoneNumber,
          country,
          city,
          enquiryType,
          productInterest,
          message,
          honeypot,
          renderedAt,
          challengeA: challenge.a,
          challengeB: challenge.b,
          challengeAnswer,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setServerError(data.error || "Unable to submit enquiry. Please verify your details.");
        return;
      }

      setSuccessData({
        referenceId: data.referenceId,
        submittedAt: data.submittedAt,
      });
    } catch {
      setServerError("Network error while submitting your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className="border border-industrial-orange/40 bg-white p-8 sm:p-12 space-y-6 shadow-xl text-obsidian">
        <div className="flex items-center gap-3 text-industrial-orange">
          <CheckCircle2 className="h-7 w-7" />
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em]">
            ENQUIRY RECEIVED &amp; LOGGED
          </span>
        </div>

        <h3 className="font-heading text-3xl font-bold uppercase text-obsidian">
          THANK YOU, {fullName.toUpperCase()}.
        </h3>

        <p className="text-base leading-relaxed text-slate-600">
          Your {enquiryType.toLowerCase()} regarding <strong className="text-obsidian">{productInterest}</strong> has been recorded for our sales and technical team in Hyderabad.
        </p>

        <div className="border-y border-slate-200 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <p className="font-heading uppercase tracking-[0.14em] text-slate-500 font-semibold">
              REFERENCE NUMBER
            </p>
            <p className="mt-1 font-heading text-lg font-bold text-obsidian">
              {successData.referenceId}
            </p>
          </div>
          <div>
            <p className="font-heading uppercase tracking-[0.14em] text-slate-500 font-semibold">
              LOGGED TIMESTAMP (UTC)
            </p>
            <p className="mt-1 font-medium text-obsidian">{successData.submittedAt}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setSuccessData(null);
            setMessage("");
            setFieldErrors({});
            regenerateChallenge();
          }}
          className="inline-flex items-center gap-2 border border-industrial-orange px-6 py-3.5 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-industrial-orange hover:bg-industrial-orange hover:text-white transition-colors"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  const inputBase =
    "w-full border border-slate-300 bg-white px-4 py-3.5 text-sm text-obsidian placeholder:text-slate-400 focus:border-industrial-orange focus:outline-none transition-colors";
  const labelBase =
    "block font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-obsidian mb-2";

  return (
    <form onSubmit={handleSubmit} noValidate className="border border-slate-200 bg-[#FAF8F5] p-7 sm:p-10 space-y-6 shadow-sm">
      <div className="border-b border-slate-200 pb-5">
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-industrial-orange">
          BUSINESS &amp; TECHNICAL ENQUIRY
        </span>
        <h2 className="mt-1.5 font-heading text-2xl sm:text-3xl font-bold uppercase text-obsidian">
          SEND US YOUR REQUIREMENT
        </h2>
      </div>

      {/* Honeypot anti-spam trap (hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company-website-url">Website</label>
        <input
          id="company-website-url"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {serverError && (
        <div
          role="alert"
          className="flex items-start gap-3 border border-red-600/30 bg-red-50 p-4 text-xs text-red-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelBase}>
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Rajesh Kumar"
            className={inputBase}
          />
          {fieldErrors.fullName && (
            <p className="mt-1.5 text-xs text-red-600">{fieldErrors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="companyName" className={labelBase}>
            Company Name *
          </label>
          <input
            id="companyName"
            type="text"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Organization or Retread Plant"
            className={inputBase}
          />
          {fieldErrors.companyName && (
            <p className="mt-1.5 text-xs text-red-600">{fieldErrors.companyName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelBase}>
            Business Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className={inputBase}
          />
          {fieldErrors.email && (
            <p className="mt-1.5 text-xs text-red-600">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phoneNumber" className={labelBase}>
            Phone Number (with country code) *
          </label>
          <input
            id="phoneNumber"
            type="tel"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+91 98XXXXXXXX"
            className={inputBase}
          />
          {fieldErrors.phoneNumber && (
            <p className="mt-1.5 text-xs text-red-600">{fieldErrors.phoneNumber}</p>
          )}
        </div>

        <div>
          <label htmlFor="country" className={labelBase}>
            Country *
          </label>
          <input
            id="country"
            type="text"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            className={inputBase}
          />
          {fieldErrors.country && (
            <p className="mt-1.5 text-xs text-red-600">{fieldErrors.country}</p>
          )}
        </div>

        <div>
          <label htmlFor="city" className={labelBase}>
            City *
          </label>
          <input
            id="city"
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className={inputBase}
          />
          {fieldErrors.city && (
            <p className="mt-1.5 text-xs text-red-600">{fieldErrors.city}</p>
          )}
        </div>

        <div>
          <label htmlFor="enquiryType" className={labelBase}>
            Enquiry Type *
          </label>
          <select
            id="enquiryType"
            value={enquiryType}
            onChange={(e) => setEnquiryType(e.target.value)}
            className={inputBase}
          >
            {ENQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {fieldErrors.enquiryType && (
            <p className="mt-1.5 text-xs text-red-600">{fieldErrors.enquiryType}</p>
          )}
        </div>

        <div>
          <label htmlFor="productInterest" className={labelBase}>
            Product Interest *
          </label>
          <select
            id="productInterest"
            value={productInterest}
            onChange={(e) => setProductInterest(e.target.value)}
            className={inputBase}
          >
            {PRODUCTS.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
            <option value="Multiple Products / Full Retread Plant Supply">
              Multiple Products / Full Retread Plant Supply
            </option>
          </select>
          {fieldErrors.productInterest && (
            <p className="mt-1.5 text-xs text-red-600">{fieldErrors.productInterest}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelBase}>
          Requirement Details / Message *
        </label>
        <textarea
          id="message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Specify tread patterns, tyre sizes, monthly volume, curing temperature, or dealership territory..."
          className={inputBase}
        />
        {fieldErrors.message && (
          <p className="mt-1.5 text-xs text-red-600">{fieldErrors.message}</p>
        )}
      </div>

      {/* Spam Verification Arithmetic Gate */}
      <div className="border border-slate-200 bg-white p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between shadow-sm">
        <div>
          <label htmlFor="challengeAnswer" className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-obsidian">
            Security Check: What is {challenge.a} + {challenge.b}? *
          </label>
          {fieldErrors.challengeAnswer && (
            <p className="mt-1 text-xs text-red-500">{fieldErrors.challengeAnswer}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            id="challengeAnswer"
            type="text"
            inputMode="numeric"
            required
            value={challengeAnswer}
            onChange={(e) => setChallengeAnswer(e.target.value)}
            placeholder="Sum"
            className="w-24 border border-slate-300 bg-[#FAF8F5] px-3 py-2 text-center text-sm font-semibold text-obsidian focus:border-industrial-orange focus:outline-none"
          />
          <button
            type="button"
            onClick={regenerateChallenge}
            aria-label="Refresh security challenge"
            className="p-2 border border-slate-300 bg-white text-obsidian hover:border-industrial-orange transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex items-center justify-between gap-6 rounded-xl bg-[#111827] pl-6 pr-2.5 py-2.5 shadow-lg hover:bg-black transition-all duration-300 hover:shadow-xl disabled:opacity-60"
      >
        <span className="font-heading text-xs sm:text-sm font-semibold tracking-wide text-white">
          {submitting ? "SUBMITTING ENQUIRY..." : "SUBMIT BUSINESS ENQUIRY"}
        </span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-industrial-orange text-white shadow-sm transition-transform duration-300 group-hover:translate-x-0.5">
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          )}
        </span>
      </button>
    </form>
  );
}
