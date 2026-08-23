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
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-zinc-400 border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:text-white hover:border-white/20 transition-all duration-200 select-none"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Back to Home
      </Link>
    </div>
  );
}
