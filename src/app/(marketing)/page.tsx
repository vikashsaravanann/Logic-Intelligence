import { Metadata } from 'next';
import HeroSection from '@/features/home/components/hero-section';
import CredentialsStripSection from '@/features/home/components/credentials-strip-section';
import ServicesSection from '@/features/home/components/services-section';
import WhyUsSection from '@/features/home/components/why-us-section';
import HowItWorksSection from '@/features/home/components/how-it-works-section';
import AboutSection from '@/features/home/components/about-section';
import TechStackMarqueeSection from '@/features/home/components/tech-stack-marquee-section';
import PackagesSection from '@/features/home/components/packages-section';
import TrustBadgesSection from '@/features/home/components/trust-badges-section';
import ConnectSection from '@/features/home/components/connect-section';
import InstagramFeedSection from '@/features/home/components/instagram-feed-section';
import FreeDemoCTA from '@/features/leads/components/free-demo-cta';
import { COMPANY } from '@/config/company';

export const metadata: Metadata = {
  title: 'Logic Intelligence Technologies | Premium Web & Software Development',
  description:
    'Coimbatore-based full-stack development studio. Custom web apps, mobile apps, and enterprise software for businesses worldwide. Free demo available.',
  openGraph: {
    title: `${COMPANY.legalName} — Where Logic Meets Innovation`,
    description: 'We Build What Others Imagine. Based in Coimbatore, India.',
    images: [{ url: COMPANY.bannerPath, width: 1200, height: 630, alt: 'Logic Intelligence Technologies' }],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CredentialsStripSection />
      <ServicesSection />
      <WhyUsSection />
      <HowItWorksSection />
      <AboutSection />
      <TechStackMarqueeSection />
      <PackagesSection />
      <TrustBadgesSection />
      <ConnectSection />
      <InstagramFeedSection />
      <FreeDemoCTA />
    </>
  );
}
