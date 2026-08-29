import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { LogOut, Home, Users, Briefcase, FileText, CheckCircle2, DollarSign, Clock, Settings, Search, Plus } from "lucide-react";
import Link from "next/link";
import { env } from "@/config/env";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient(
    { cookies: () => cookieStore as any },
    {
      supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }
  );
  
  const { data: { session } } = await supabase.auth.getSession();

  // Auth and Admin checks are now handled by middleware.ts
  const isAdmin = session?.user?.email?.endsWith('@logicintelligencetechnologies.in');

  // Fetching data from Supabase
  const { data: leads = [] } = await supabase.from("contact_leads").select("*").order("created_at", { ascending: false }).limit(5);
  const { data: projects = [] } = await supabase.from("projects").select("*").order("created_at", { ascending: false }).limit(5);
  const { data: invoices = [] } = await supabase.from("invoices").select("*").order("created_at", { ascending: false }).limit(5);

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A0F1E] border-r border-white/5 flex flex-col fixed h-full z-10">
        <div className="p-6">
          <Link href="/" className="text-xl font-black text-white tracking-tighter">
            LOGIC<span className="text-primary">INTEL</span> CRM
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-bold">
            <Home className="w-4 h-4" /> Overview
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-colors">
            <Users className="w-4 h-4" /> Leads
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-colors">
            <Briefcase className="w-4 h-4" /> Projects
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-colors">
            <FileText className="w-4 h-4" /> Invoices
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-colors">
            <Settings className="w-4 h-4" /> Settings
          </Link>
        </nav>
        <div className="p-4 mt-auto border-t border-white/5">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
              {session.user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{session.user.email}</p>
              <p className="text-[10px] text-zinc-500">Administrator</p>
            </div>
          </div>
          <form action="/auth/signout" method="POST">
            <button className="flex items-center gap-2 justify-center w-full py-2.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-colors border border-red-500/10">
              <LogOut className="w-3 h-3" /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 bg-[#0A0D1A] min-h-screen">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-zinc-900/30 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-lg font-bold">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input type="text" placeholder="Search projects..." className="bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:border-primary w-64" />
            </div>
            <button className="bg-primary text-black px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-white transition-colors">
              <Plus className="w-3 h-3" /> New Project
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex items-start justify-between">
              <div>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Projects (DB)</p>
                <p className="text-3xl font-black text-white">{projects?.length || 0}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400"><Briefcase className="w-5 h-5" /></div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex items-start justify-between">
              <div>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Revenue (Invoices)</p>
                <p className="text-3xl font-black text-white">₹{invoices?.reduce((sum: number, inv: any) => sum + Number(inv.amount), 0).toLocaleString() || 0}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400"><DollarSign className="w-5 h-5" /></div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex items-start justify-between">
              <div>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Invoices (DB)</p>
                <p className="text-3xl font-black text-white">{invoices?.length || 0}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400"><Clock className="w-5 h-5" /></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Projects Table */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Active Projects</h3>
                <Link href="#" className="text-xs text-primary hover:underline">View All</Link>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-zinc-400 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4 font-bold">Project</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 font-bold">Progress</th>
                      <th className="px-6 py-4 font-bold">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {projects && projects.length > 0 ? (
                      projects.map((p: any) => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-white">{p.name}</p>
                          <p className="text-xs text-zinc-500">{p.client_name} · {p.project_code}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            p.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400' :
                            p.status === 'Client Review' ? 'bg-orange-500/10 text-orange-400' :
                            'bg-zinc-500/10 text-zinc-400'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${p.progress}%` }}></div>
                            </div>
                            <span className="text-xs font-bold text-zinc-400">{p.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-white">₹{p.value}</td>
                      </tr>
                    ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-zinc-500 text-sm">No projects found in database.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Invoices List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Recent Invoices</h3>
                <Link href="#" className="text-xs text-primary hover:underline">View All</Link>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4">
                {invoices && invoices.length > 0 ? (
                  invoices.map((inv: any) => (
                  <div key={inv.id} className="flex items-center justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <div>
                      <p className="font-bold text-sm text-white mb-0.5">{inv.client_name}</p>
                      <p className="text-[11px] text-zinc-500">{inv.invoice_code} · {inv.due_date ? new Date(inv.due_date).toLocaleDateString() : 'No date'}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm text-white mb-0.5">₹{inv.amount}</p>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        inv.status === 'Paid' ? 'text-green-400' :
                        inv.status === 'Pending' ? 'text-orange-400' :
                        'text-red-400'
                      }`}>
                        {inv.status}
                      </span>
                    </div>
                  </div>
                ))
                ) : (
                  <div className="text-center text-zinc-500 text-sm py-4">
                    No invoices found in database.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Leads Table */}
          <div className="space-y-4 mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Recent Inbound Leads (Supabase)</h3>
              <Link href="#" className="text-xs text-primary hover:underline">View All Leads</Link>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
              {leads && leads.length > 0 ? (
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-zinc-400 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4 font-bold">Date</th>
                      <th className="px-6 py-4 font-bold">Name</th>
                      <th className="px-6 py-4 font-bold">Email</th>
                      <th className="px-6 py-4 font-bold">Company</th>
                      <th className="px-6 py-4 font-bold">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads.map((lead: any) => (
                      <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-xs text-zinc-400 whitespace-nowrap">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 font-bold text-white">{lead.name}</td>
                        <td className="px-6 py-4 text-zinc-300">{lead.email}</td>
                        <td className="px-6 py-4 text-zinc-400">{lead.company || '-'}</td>
                        <td className="px-6 py-4 text-xs text-zinc-500 max-w-xs truncate">{lead.message || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-12 text-center">
                  <Users className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                  <p className="text-sm font-bold text-zinc-400">No leads found in database.</p>
                  <p className="text-xs text-zinc-500 mt-1">Submit a test inquiry on the contact form to see it here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
