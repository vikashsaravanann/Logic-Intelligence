import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Logic Intelligence Technologies | Web & App Development",
  description: "Full-Stack Web, Software & App Development in Coimbatore.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* PREMIUM NAVBAR */}
        <nav className="bg-[#0a192f] border-b border-blue-900 w-full z-50 top-0 sticky">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex-shrink-0 flex items-center gap-3">
                {/* Logo Placeholder */}
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center font-bold text-xs text-[#0a192f]">
                  LIT
                </div>
                <Link
                  href="/"
                  className="font-bold text-white text-xl tracking-wide"
                >
                  Logic Intelligence
                </Link>
              </div>
              <div className="hidden md:flex space-x-8">
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition"
                >
                  Home
                </Link>
                <Link
                  href="#services"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition"
                >
                  Services
                </Link>
                <Link
                  href="https://t.me/your_telegram_bot_link"
                  target="_blank"
                  className="bg-white text-[#0a192f] hover:bg-gray-200 px-5 py-2 rounded-md text-sm font-bold transition"
                >
                  Chat with AI Assistant
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main>{children}</main>

        {/* PROFESSIONAL FOOTER */}
        <footer className="bg-[#0a192f] py-12 border-t border-blue-900 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <span className="text-white text-lg font-bold tracking-wider">
                  LOGIC INTELLIGENCE TECHNOLOGIES
                </span>
                <p className="text-gray-400 text-sm mt-2">
                  Where Logic Meets Innovation.
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Coimbatore, Tamil Nadu, India
                </p>
              </div>
              <div className="flex flex-wrap gap-6">
                <Link
                  href="/privacy-policy"
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-service"
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/refund-policy"
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  Refund Policy
                </Link>
              </div>
            </div>
            <div className="mt-8 border-t border-blue-900 pt-8 flex items-center justify-center">
              <p className="text-gray-500 text-sm">
                © 2026 Logic Intelligence Technologies Pvt. Ltd. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
