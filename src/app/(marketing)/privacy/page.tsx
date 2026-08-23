import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FloatingElements from "@/components/FloatingElements";
import { companyConfig } from "@/config/company";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0A0D1A] text-white pt-24 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[800px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />
      <Navbar />
      <section className="py-20 px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Privacy Policy</h1>
        <p className="text-zinc-400 mb-12">Last updated: August 2026</p>
        
        <div className="prose prose-invert prose-zinc max-w-none prose-headings:text-white prose-a:text-primary hover:prose-a:text-primary/80">
          <p className="text-lg text-zinc-300 leading-relaxed mb-8">
            At {companyConfig.legalName}, accessible from our website and related digital channels, one of our main priorities is the privacy of our visitors and clients. This Privacy Policy document contains types of information that is collected and recorded by {companyConfig.displayName} and how we use it.
          </p>
          
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
              </p>
              <ul className="list-disc pl-6 text-zinc-400 space-y-2">
                <li><strong className="text-zinc-200">Contact Information:</strong> When you contact us, request a demo, or use our live chat, we may receive your name, email address, phone number, the contents of the message and/or attachments you may send us.</li>
                <li><strong className="text-zinc-200">Account Information:</strong> When you register for our Client Portal, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</li>
                <li><strong className="text-zinc-200">Usage Data:</strong> We collect standard log files and analytics data (such as IP addresses, browser type, ISP, date and time stamp, referring/exit pages, and possibly the number of clicks) to analyze trends and administer the site.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                We use the information we collect in various ways, including to:
              </p>
              <ul className="list-disc pl-6 text-zinc-400 space-y-2">
                <li>Provide, operate, and maintain our website and client portal</li>
                <li>Improve, personalize, and expand our services</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you directly (e.g., for customer service, project updates, or marketing)</li>
                <li>Send you transactional emails related to your demo requests or checklist downloads</li>
                <li>Find and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Data Security & Storage</h2>
              <p className="text-zinc-400 leading-relaxed">
                We implement a variety of security measures to maintain the safety of your personal information. Our platform uses Supabase for secure authentication and encrypted database storage. We do not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties without explicit consent, except for trusted third parties who assist us in operating our website or conducting our business, so long as those parties agree to keep this information confidential.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Cookies and Web Beacons</h2>
              <p className="text-zinc-400 leading-relaxed">
                Like any other website, {companyConfig.displayName} uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. GDPR & CCPA Data Protection Rights</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
              </p>
              <ul className="list-disc pl-6 text-zinc-400 space-y-2">
                <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
                <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
                <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
                <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              </ul>
            </section>

            <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-xl">
              <h4 className="text-xl font-bold text-white mb-2">Contact Us About Privacy</h4>
              <p className="text-zinc-400">
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href={`mailto:${companyConfig.email}`} className="text-primary hover:underline">{companyConfig.email}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingElements />
    </main>
  );
}
