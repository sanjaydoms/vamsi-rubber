"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
        TEMPORARY APPLICATION NOTICE
      </span>
      <h1 className="mt-4 font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
        SOMETHING WENT WRONG
      </h1>
      <p className="mt-4 max-w-md text-sm text-slate-300">
        A temporary error occurred while rendering this view. Please try reloading or return to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 bg-industrial-orange px-6 py-3.5 font-heading text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          <span>TRY AGAIN</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-6 py-3.5 font-heading text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
        >
          <Home className="h-4 w-4" />
          <span>BACK TO HOME</span>
        </Link>
      </div>
    </div>
  );
}
