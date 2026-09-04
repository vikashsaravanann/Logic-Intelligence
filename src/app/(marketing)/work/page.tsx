import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import FloatingElements from "@/components/motion/floating-elements";
import BackToHome from "@/components/ui/back-to-home";
import { portfolioProjects } from "@/data/portfolioData";

import { COMPANY } from "@/config/company";

export const metadata: Metadata = {
  title: "Featured Projects | Portfolio",
  description:
    "Explore our curated selection of high-performance web applications, scalable enterprise platforms, and bespoke digital solutions designed to drive business growth.",
  openGraph: {
    title: "Featured Projects | Logic Intelligence Technologies",
    description: "Explore our curated selection of high-performance web applications, scalable enterprise platforms, and bespoke digital solutions.",
    images: [{ url: COMPANY.bannerPath, width: 1200, height: 630, alt: "Logic Intelligence Technologies" }],
  },
};

function ProjectCardImage({ title, category, image }: { title: string; category: string; image: string }) {
  return (
    <>
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-transparent flex items-end p-6">
        <div className="relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block drop-shadow-md">
            {category}
          </span>
          <span className="text-sm font-semibold text-white/90 line-clamp-2 drop-shadow-md">{title}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-[#0A0F1E]/40 to-transparent" />
      </div>
    </>
  );
}

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-32">
      <BackToHome />
      <section className="py-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
            Our Portfolio
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-white mb-6">Featured Projects</h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            Explore our curated selection of high-performance web applications, scalable enterprise platforms, and bespoke digital solutions designed to drive business growth and operational excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {portfolioProjects.map((project) => (
            <article
              key={project.slug}
              className="group rounded-3xl border border-white/10 bg-zinc-900/40 overflow-hidden hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <ProjectCardImage title={project.title} category={project.category} image={project.image} />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide text-zinc-300 bg-white/5 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
                  >
                    View Project <ArrowRight className="w-4 h-4" />
                  </Link>
                  {project.externalUrl && (
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors ml-auto"
                    >
                      Live site <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-zinc-400 mb-6">Want something similar built for your business?</p>
          <Link href="/free-demo" className="inline-flex px-8 py-4 rounded-xl text-sm font-bold text-black bg-primary neon-btn">
            Request a Free Demo
          </Link>
        </div>
      </section>

      <FloatingElements />
    </main>
  );
}
