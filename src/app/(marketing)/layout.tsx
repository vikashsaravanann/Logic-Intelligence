import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import SupportChatWidget from '@/components/shared/support-chat-widget';
import FloatingWhatsApp from '@/components/shared/floating-whatsapp';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <SupportChatWidget />
      <FloatingWhatsApp />
    </>
  );
}
