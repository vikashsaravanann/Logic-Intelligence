"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";

export default function ShareButton({ title, text }: { title: string; text: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        /* user cancelled share sheet */
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-primary transition-colors text-zinc-300"
      aria-label="Share this article"
      title={copied ? "Link copied" : "Share"}
    >
      {copied ? <Check className="w-4 h-4 text-primary" /> : <Share2 className="w-4 h-4" />}
    </button>
  );
}
