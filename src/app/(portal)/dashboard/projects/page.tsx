import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Layers, Clock, CheckCircle, Rocket, AlertCircle, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_MAP: Record<string, { color: string; icon: React.ElementType; label: string }> = {
  "in-progress": { color: "text-blue-400 bg-blue-400/10 border-blue-400/20", icon: Rocket, label: "In Progress" },
  "planning":    { color: "text-amber-400 bg-amber-400/10 border-amber-400/20", icon: Clock, label: "Planning" },
  "completed":   { color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", icon: CheckCircle, label: "Completed" },
  "on-hold":     { color: "text-red-400 bg-red-400/10 border-red-400/20", icon: AlertCircle, label: "On Hold" },
};

const STAGES = ["Discovery", "Design", "Development", "QA", "Launch"];

function StageProgress({ current }: { current?: string }) {
  const idx = STAGES.indexOf(current ?? "Discovery");
  const pct = idx === -1 ? 0 : Math.round(((idx + 1) / STAGES.length) * 100);
  return (
    <div className="mt-4 space-y-2">
      <div className="flex justify-between text-xs text-zinc-500">
        <span>{current ?? "Discovery"}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="flex justify-between">
        {STAGES.map((s, i) => (
          <span key={s} className={`text-[9px] uppercase tracking-widest ${i <= idx ? "text-primary" : "text-zinc-700"}`}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function ProjectsPage() {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore as any });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Your Projects</h2>
          <p className="text-zinc-500 text-sm mt-1">Track the live status of all your active and past projects.</p>
        </div>
        <Link href="/dashboard/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-black text-sm font-bold hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> New Project
        </Link>
      </div>

      {!projects || projects.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border border-white/10 bg-white/5">
          <Layers className="w-10 h-10 mx-auto mb-4 text-zinc-600" />
          <p className="text-zinc-400 mb-2">No projects yet.</p>
          <p className="text-zinc-600 text-sm">Your active projects will appear here once created.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(projects ?? []).map((project: any) => {
            const s = STATUS_MAP[project.status] ?? STATUS_MAP["planning"];
            return (
              <div key={project.id} className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/5 transition-colors space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-white text-base leading-tight">{project.title}</h3>
                  <span className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${s.color}`}>
                    <s.icon className="w-3 h-3" /> {s.label}
                  </span>
                </div>
                {project.description && (
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                )}
                <StageProgress current={project.stage ?? project.current_stage} />
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-zinc-600">
                  <span>Started {project.created_at ? new Date(project.created_at).toLocaleDateString("en-IN") : "—"}</span>
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1">
                      View Live
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
