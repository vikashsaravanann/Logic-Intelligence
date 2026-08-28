import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import FloatingElements from "@/components/FloatingElements";
import { getProjectBySlug, portfolioProjects } from "@/data/portfolioData";
import { testimonials } from "@/data/testimonialsData";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const isCaseStudy = Boolean(project.problem || project.solution || project.metrics?.length);
  const linkedTestimonial = project.testimonialId
    ? testimonials.find((t) => t.id === project.testimonialId)
    : undefined;

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
          {project.client ? ` · ${project.client}` : ""}
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6">{project.title}</h1>
        <p className="text-lg text-zinc-300 leading-relaxed mb-8">{project.description}</p>

        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
            {project.metrics.map((m) => (
              <div key={m.label} className="p-4 rounded-2xl border border-primary/20 bg-primary/5 text-center">
                <p className="text-lg md:text-xl font-black text-primary">{m.value}</p>
                <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wide">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        {isCaseStudy ? (
          <div className="space-y-10 mb-10">
            {project.problem && (
              <div>
                <p className="text-sm font-bold text-white uppercase tracking-widest mb-3">The Problem</p>
                <p className="text-zinc-300 leading-relaxed">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div>
                <p className="text-sm font-bold text-white uppercase tracking-widest mb-3">What We Built</p>
                <p className="text-zinc-300 leading-relaxed">{project.solution}</p>
              </div>
            )}
            {project.results && (
              <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5">
                <p className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Outcome</p>
                <p className="text-zinc-300">{project.results}</p>
              </div>
            )}
          </div>
        ) : (
          project.results && (
            <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 mb-8">
              <p className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Outcome</p>
              <p className="text-zinc-300">{project.results}</p>
            </div>
          )
        )}

        {linkedTestimonial && (
          <blockquote className="border-l-2 border-primary pl-6 mb-10 italic text-zinc-300">
            &ldquo;{linkedTestimonial.quote}&rdquo;
            <footer className="mt-3 not-italic text-sm text-zinc-500">
              — {linkedTestimonial.name}, {linkedTestimonial.role} at {linkedTestimonial.company}
            </footer>
          </blockquote>
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
