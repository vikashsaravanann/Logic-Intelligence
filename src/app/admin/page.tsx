import { supabaseAdmin } from "@/lib/supabase/admin";
import { DollarSign, Briefcase, MessageSquare, Ticket } from "lucide-react";
import { AdminTriggers } from "./components/AdminTriggers";

export const revalidate = 0; // Opt out of caching for real-time admin data

async function getAdminData() {
  const [
    { count: aiChatsCount },
    { data: invoices },
    { count: projectsCount },
    { count: ticketsCount },
  ] = await Promise.all([
    supabaseAdmin.from("ai_chats").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("invoices").select("amount"),
    supabaseAdmin
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
    supabaseAdmin
      .from("support_tickets")
      .select("*", { count: "exact", head: true })
      .eq("status", "open"),
  ]);

  const totalRevenue = invoices?.reduce((sum, inv) => sum + (Number(inv.amount) || 0), 0) || 0;

  return {
    aiChatsCount: aiChatsCount || 0,
    totalRevenue,
    projectsCount: projectsCount || 0,
    ticketsCount: ticketsCount || 0,
  };
}

export default async function AdminDashboardPage() {
  const data = await getAdminData();

  return (
    <div className="container mx-auto p-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Overview</h1>
        <p className="text-neutral-400">
          Welcome back to the admin dashboard. Here's what's happening today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* KPI: Total Revenue */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-sm backdrop-blur-sm">
          <div className="flex flex-row items-center justify-between pb-4">
            <h3 className="text-sm font-medium text-neutral-300">Total Revenue</h3>
            <DollarSign className="h-5 w-5 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            ${data.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-neutral-500 mt-1">From all invoices</p>
        </div>

        {/* KPI: Active Projects */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-sm backdrop-blur-sm">
          <div className="flex flex-row items-center justify-between pb-4">
            <h3 className="text-sm font-medium text-neutral-300">Active Projects</h3>
            <Briefcase className="h-5 w-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{data.projectsCount}</div>
          <p className="text-xs text-neutral-500 mt-1">Currently in progress</p>
        </div>

        {/* KPI: AI Chats */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-sm backdrop-blur-sm">
          <div className="flex flex-row items-center justify-between pb-4">
            <h3 className="text-sm font-medium text-neutral-300">AI Chats</h3>
            <MessageSquare className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">{data.aiChatsCount}</div>
          <p className="text-xs text-neutral-500 mt-1">Total conversations logged</p>
        </div>

        {/* KPI: Open Tickets */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-sm backdrop-blur-sm">
          <div className="flex flex-row items-center justify-between pb-4">
            <h3 className="text-sm font-medium text-neutral-300">Open Tickets</h3>
            <Ticket className="h-5 w-5 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-white">{data.ticketsCount}</div>
          <p className="text-xs text-neutral-500 mt-1">Awaiting support response</p>
        </div>
            </div>

      <AdminTriggers />
    </div>
  );
}
