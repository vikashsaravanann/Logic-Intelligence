import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import FloatingElements from "@/components/FloatingElements";
import { getProjectBySlug, portfolioProjects } from "@/data/portfolioData";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
  };
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-32">
      <section className="py-16 px-6 lg:px-8 max-w-4xl mx-auto">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Work
        </Link>

        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
          {project.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6">{project.title}</h1>
        <p className="text-lg text-zinc-300 leading-relaxed mb-8">{project.description}</p>

        {project.results && (
          <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 mb-8">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Outcome</p>
            <p className="text-zinc-300">{project.results}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-10">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide text-zinc-300 bg-white/5 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/contact" className="px-8 py-4 rounded-xl font-bold text-black bg-primary neon-btn text-center">
            Start a Similar Project
          </Link>
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 transition-colors text-center inline-flex items-center justify-center gap-2 border border-white/10"
            >
              View Live Site <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </section>

      <FloatingElements />
    </main>
  );
}
