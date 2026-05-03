import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingElements from "@/components/FloatingElements";
import CustomCursor from "@/components/CustomCursor";
import InitialLoader from "@/components/InitialLoader";
import PageTransition from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://vikashsaravanann.github.io/Logic-Intelligence'),
  title: "Logic Intelligence Technologies — Web & Software Development Company in Coimbatore",
  description: "Full stack web development, hotel websites, travel portals, software & game development. Based in Coimbatore, Tamil Nadu. Contact us today.",
  openGraph: {
    title: "Logic Intelligence Technologies",
    description: "Full stack web development, hotel websites, travel portals, software & game development.",
    url: "https://vikashsaravanann.github.io/Logic-Intelligence",
    siteName: "Logic Intelligence Technologies",
    images: [{ url: "/logo.jpg" }],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0A0F1E] text-white min-h-screen flex flex-col`}>
        <InitialLoader />
        <PageTransition>
          {children}
        </PageTransition>
        <FloatingElements />
      </body>
    </html>
  );
}
