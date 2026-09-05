"use client";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

/**
 * Consistent "Back to Home" ghost/secondary button.
 * Placed top-left below the sticky navbar on every non-homepage page.
 * Matches the site's rounded-xl secondary button style (border-radius = 8px / rounded-xl).
 */
export default function BackToHome() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full text-[11px] font-black text-black uppercase tracking-[0.2em] bg-white hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl select-none"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Back to Home
      </Link>
    </div>
  );
}
