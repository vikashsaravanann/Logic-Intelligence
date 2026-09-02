import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import SupportChatWidget from '@/components/shared/support-chat-widget';

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
    </>
  );
}
