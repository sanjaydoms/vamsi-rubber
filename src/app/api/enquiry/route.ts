import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const VALID_ENQUIRY_TYPES = new Set([
  "Product enquiry",
  "Dealership enquiry",
  "Export enquiry",
  "Domestic distribution",
  "General business enquiry",
]);

interface EnquiryPayload {
  fullName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  enquiryType: string;
  productInterest: string;
  message: string;
  honeypot?: string;
  renderedAt?: number;
  challengeA?: number;
  challengeB?: number;
  challengeAnswer?: string;
}

function sanitize(value: unknown, maxLen = 500): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as EnquiryPayload;

    // 1. Spam protection: Honeypot check
    if (body.honeypot && body.honeypot.trim().length > 0) {
      return NextResponse.json(
        { error: "Submission rejected by anti-spam verification." },
        { status: 400 }
      );
    }

    // 2. Spam protection: Minimum human interaction duration (1.5s)
    if (typeof body.renderedAt === "number") {
      const elapsed = Date.now() - body.renderedAt;
      if (elapsed < 1500) {
        return NextResponse.json(
          { error: "Please take a moment to review your enquiry before submitting." },
          { status: 400 }
        );
      }
    }

    // 3. Spam protection: Verification arithmetic challenge
    const a = Number(body.challengeA);
    const b = Number(body.challengeB);
    const ans = Number(sanitize(body.challengeAnswer, 10));
    if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(ans) || ans !== a + b) {
      return NextResponse.json(
        { error: "Verification sum is incorrect. Please check and try again." },
        { status: 400 }
      );
    }

    const fullName = sanitize(body.fullName, 120);
    const companyName = sanitize(body.companyName, 160);
    const email = sanitize(body.email, 160);
    const phoneNumber = sanitize(body.phoneNumber, 40);
    const country = sanitize(body.country, 100);
    const city = sanitize(body.city, 100);
    const enquiryType = sanitize(body.enquiryType, 80);
    const productInterest = sanitize(body.productInterest, 160);
    const message = sanitize(body.message, 2500);

    const errors: Record<string, string> = {};

    if (fullName.length < 2) errors.fullName = "Please enter your full name.";
    if (companyName.length < 2) errors.companyName = "Please enter your company name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid business email address.";
    }
    if (phoneNumber.replace(/[^0-9+]/g, "").length < 7) {
      errors.phoneNumber = "Please enter a valid phone number with country/area code.";
    }
    if (country.length < 2) errors.country = "Please enter your country.";
    if (city.length < 2) errors.city = "Please enter your city.";
    if (!VALID_ENQUIRY_TYPES.has(enquiryType)) {
      errors.enquiryType = "Please select a valid enquiry type.";
    }
    if (productInterest.length < 2) {
      errors.productInterest = "Please select your product interest.";
    }
    if (message.length < 10) {
      errors.message = "Please enter at least 10 characters describing your requirement.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: "Please correct the highlighted fields.", fieldErrors: errors },
        { status: 422 }
      );
    }

    const now = new Date();
    const dateStamp = now.toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = crypto.randomBytes(2).toString("hex").toUpperCase();
    const referenceId = `VRL-${dateStamp}-${randomSuffix}`;

    const record = {
      referenceId,
      submittedAt: now.toISOString(),
      fullName,
      companyName,
      email,
      phoneNumber,
      country,
      city,
      enquiryType,
      productInterest,
      message,
      sourceIp: request.headers.get("x-forwarded-for") || "local",
    };

    // Persist enquiry to server-side storage
    const dataDir = path.join(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });
    await fs.appendFile(
      path.join(dataDir, "enquiries.jsonl"),
      JSON.stringify(record) + "\n",
      "utf8"
    );

    // Optional external webhook relay if configured in production environment
    const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      }).catch(() => {
        // Primary local persistence succeeded; do not block user confirmation on secondary relay
      });
    }

    return NextResponse.json(
      {
        success: true,
        referenceId,
        submittedAt: record.submittedAt,
        message: "Your enquiry has been recorded by Vamshi Rubber Limited.",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to process your enquiry at this time. Please email info@vamshirubber.org." },
      { status: 500 }
    );
  }
}
