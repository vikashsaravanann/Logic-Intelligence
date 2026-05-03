import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingElements from "@/components/FloatingElements";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers | Logic Intelligence Technologies Pvt. Ltd.",
  description: "Join Logic Intelligence Technologies and build the future.",
};

export default function CareersPage() {
  const jobs = [
    "Junior Full Stack Developer",
    "React Frontend Developer",
    "UI/UX Designer (Figma)",
    "Mobile App Developer (Flutter)",
    "SEO & Content Writer",
    "Business Development Executive",
    "Social Media Manager"
  ];

  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-32">
      <Navbar />
      
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Join Logic Intelligence Technologies</h1>
          <p className="text-xl text-primary font-bold tracking-widest uppercase">We Are Building Something Big — Come Build It With Us</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Why Work With Us?</h2>
            <ul className="space-y-4">
              {[
                "Work on real client projects from day 1",
                "Learn the latest tech stack",
                "Flexible working hours",
                "Remote and hybrid options available",
                "Startup culture — your ideas matter here",
                "Competitive pay based on skill"
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-300">
                  <span className="text-primary">✓</span> {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-primary/10 border border-primary/20">
            <h2 className="text-2xl font-bold text-white mb-4">Internship Program</h2>
            <p className="text-zinc-300 mb-6">
              We offer paid internships for college students in Coimbatore. Work on live projects, build your portfolio, and get a certificate.
            </p>
            <a href="mailto:startupwithvikashsaravanan@gmail.com?subject=Internship Application" className="inline-block px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-zinc-200">
              Apply for Internship
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Open Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job, i) => (
              <div key={i} className="p-6 rounded-2xl glass-card bg-zinc-900/60 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h4 className="text-lg font-bold text-white">{job}</h4>
                <a href={`mailto:startupwithvikashsaravanan@gmail.com?subject=Application for ${job}`} className="px-6 py-2 rounded-lg bg-primary text-black font-bold text-sm hover:bg-primary/90 shrink-0">
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingElements />
    </main>
  );
}
