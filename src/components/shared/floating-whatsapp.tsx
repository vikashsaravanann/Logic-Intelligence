"use client";

import { MessageCircle } from "lucide-react";
import { COMPANY } from "@/config/company";

export default function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${COMPANY.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-105 transition-transform mb-safe"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
