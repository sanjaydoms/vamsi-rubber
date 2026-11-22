import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-industrial-orange">
        404 — PAGE NOT FOUND
      </span>
      <h1 className="mt-4 font-heading text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white">
        ROAD NOT FOUND
      </h1>
      <p className="mt-4 max-w-md text-sm text-slate-300">
        The page you are looking for doesn&apos;t exist or has been moved to a new destination.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-industrial-orange px-6 py-3.5 font-heading text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>RETURN HOME</span>
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center border border-white/20 bg-white/5 px-6 py-3.5 font-heading text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
        >
          <span>VIEW PRODUCTS</span>
        </Link>
      </div>
    </div>
  );
}
