import { portfolioData } from "@/data/portfolioData";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingElements from "@/components/FloatingElements";
import { CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return portfolioData.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = portfolioData.find((p) => p.slug === params.slug);
  if (!project) return { title: "Not Found" };
  
  return {
    title: `${project.title} | Case Study | Logic Intelligence Technologies Pvt. Ltd.`,
    description: project.shortDescription,
  };
}

export default function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const project = portfolioData.find((p) => p.slug === params.slug);
  
  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-32">
      <Navbar />
      
      <section className="py-20 px-6 lg:px-8 max-w-5xl mx-auto text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[300px] opacity-[0.1] blur-[100px] bg-gradient-to-r from-primary to-accent pointer-events-none" />
        <div className="flex items-center justify-center gap-3 mb-6 relative z-10">
          <span className="px-3 py-1 rounded-full text-xs font-bold text-black bg-primary uppercase">{project.category}</span>
          <span className="flex items-center gap-1 text-sm text-zinc-400"><MapPin className="w-4 h-4" /> {project.clientLocation}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 relative z-10">{project.title}</h1>
        <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-10 relative z-10">{project.shortDescription}</p>
        
        <div className="w-full aspect-video rounded-3xl overflow-hidden border border-white/10 mb-16 relative z-10 bg-zinc-900 flex items-center justify-center group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-zinc-600 font-bold tracking-widest uppercase">Project Screenshot Placeholder</p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
            <ul className="space-y-4">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-zinc-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech, i) => (
                <span key={i} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
            
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">Results</h2>
            <p className="text-lg text-primary font-medium">{project.results}</p>
          </div>
        </div>
      </section>

      {project.testimonial && (
        <section className="py-16 px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <div className="p-10 rounded-3xl bg-zinc-900/60 border border-white/10 relative">
            <span className="text-6xl text-primary/20 absolute top-4 left-6 font-serif">"</span>
            <p className="text-xl italic text-zinc-300 relative z-10 mb-6">"{project.testimonial}"</p>
            <p className="text-sm font-bold text-white uppercase tracking-widest">Client Feedback</p>
          </div>
        </section>
      )}

      <section className="py-20 px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-black text-white mb-6">Want similar results for your business?</h2>
        <Link href="/contact" className="inline-block px-8 py-4 rounded-xl font-bold text-black bg-primary neon-btn">Build Something Like This For Me</Link>
      </section>

      <Footer />
      <FloatingElements />
    </main>
  );
}
