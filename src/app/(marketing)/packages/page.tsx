import { Metadata } from 'next';
import FloatingElements from "@/components/motion/floating-elements";
import PackagesSection from "@/features/home/components/packages-section";

export const metadata: Metadata = {
  title: 'Packages | Logic Intelligence Technologies',
  description: 'Transparent, fixed-price packages for web development, e-commerce, and enterprise software. See exactly what is included before you commit.',
};

// This is a Server Component — client logic stays inside PackagesSection
export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-20">
      <PackagesSection />
      <FloatingElements />
    </main>
  );
}
