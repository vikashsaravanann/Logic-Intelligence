'use client';

import { motion } from 'framer-motion';
import {
  Users, Briefcase, FileText,
  Plus, TrendingUp, Calendar, Mail, Phone, ArrowUpRight, Activity
} from 'lucide-react';
import Link from 'next/link';
import RevenueChart from './RevenueChart';
import KanbanBoard from './KanbanBoard';
import ActivityFeed from './ActivityFeed';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function DashboardClient({
  leads,
  projects,
  invoices,
}: {
  leads: any[];
  projects: any[];
  invoices: any[];
}) {
  const totalRevenue = invoices.reduce((sum, inv) => sum + Number(inv.amount || 0), 0);
  const activeProjects = projects.filter(p => p.status !== 'Completed').length;
  const pendingInvoices = invoices.filter(inv => inv.status === 'Pending').length;

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="p-10 space-y-10 max-w-7xl mx-auto"
    >
      {/* Top Metrics - Equal Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'emerald', trend: '+12.5%', 
            bgClass: 'bg-emerald-500/10', textClass: 'text-emerald-400', borderClass: 'border-emerald-500/20', hoverClass: 'group-hover:bg-emerald-500/20' },
          { label: 'Active Projects', value: activeProjects, icon: Briefcase, color: 'indigo', trend: '+2', 
            bgClass: 'bg-indigo-500/10', textClass: 'text-indigo-400', borderClass: 'border-indigo-500/20', hoverClass: 'group-hover:bg-indigo-500/20' },
          { label: 'Pending Invoices', value: pendingInvoices, icon: FileText, color: 'amber', trend: '-1', 
            bgClass: 'bg-amber-500/10', textClass: 'text-amber-400', borderClass: 'border-amber-500/20', hoverClass: 'group-hover:bg-amber-500/20' },
          { label: 'New Leads', value: leads.length, icon: Users, color: 'blue', trend: '+5', 
            bgClass: 'bg-blue-500/10', textClass: 'text-blue-400', borderClass: 'border-blue-500/20', hoverClass: 'group-hover:bg-blue-500/20' },
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            variants={fadeIn}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/5 p-6 rounded-3xl relative overflow-hidden group shadow-lg"
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 ${stat.bgClass} rounded-full blur-2xl ${stat.hoverClass} transition-all`}></div>
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-4xl font-black text-white tracking-tight">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl ${stat.bgClass} flex items-center justify-center ${stat.textClass} shadow-inner border ${stat.borderClass}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 relative z-10">
              <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {stat.trend} this month
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics & Activity - 3 Cols */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <motion.div variants={fadeIn} className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" /> Revenue Overview
              </h3>
              <p className="text-xs text-zinc-500 mt-1">Monthly recurring and project revenue</p>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500/50">
              <option>Last 12 Months</option>
              <option>Year to Date</option>
              <option>All Time</option>
            </select>
          </div>
          
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
            <RevenueChart />
          </div>

          <div className="flex items-center justify-between mt-10">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-400" /> Active Operations
              </h3>
              <p className="text-xs text-zinc-500 mt-1">Ongoing projects and deliverables</p>
            </div>
            <Link href="/dashboard/projects/new">
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                <Plus className="w-4 h-4" /> Initialize Project
              </button>
            </Link>
          </div>
          
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.03] text-zinc-400 text-xs uppercase tracking-wider border-b border-white/5">
                <tr>
                  <th className="px-6 py-5 font-bold">Project Details</th>
                  <th className="px-6 py-5 font-bold">Status Pipeline</th>
                  <th className="px-6 py-5 font-bold">Timeline</th>
                  <th className="px-6 py-5 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.length > 0 ? projects.slice(0, 5).map((p: any) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-5">
                      <p className="font-bold text-white text-base mb-1">{p.name}</p>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <span className="text-indigo-400">{p.client_name}</span>
                        <span>•</span>
                        <span className="font-mono bg-white/5 px-1.5 py-0.5 rounded">{p.project_code}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-2">
                        <span className={`inline-flex w-fit px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                          p.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          p.status === 'Client Review' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                          {p.status}
                        </span>
                        <div className="flex items-center gap-3 max-w-[150px]">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${p.progress || 0}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className={`h-full ${
                                p.progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                              }`}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-zinc-400">{p.progress || 0}%</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <Calendar className="w-4 h-4 text-zinc-500" />
                        <span>Due in {Math.floor(Math.random() * 14) + 1} days</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Link href={`/dashboard/projects`}>
                        <button className="opacity-0 group-hover:opacity-100 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-all transform hover:scale-105">
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                      <div className="flex flex-col items-center justify-center">
                        <Briefcase className="w-8 h-8 mb-3 opacity-20" />
                        <p className="text-sm">No active operations in database.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Activity Feed - 1 Col */}
        <motion.div variants={fadeIn} className="xl:col-span-1 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-400" /> System Audit
              </h3>
              <p className="text-xs text-zinc-500 mt-1">Real-time team activity</p>
            </div>
            <Link href="/dashboard/analytics">
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-full transition-colors">
                Full Log
              </button>
            </Link>
          </div>
          
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 shadow-xl">
            <ActivityFeed />
          </div>
        </motion.div>
      </div>
      
      {/* Kanban Pipeline Section */}
      <motion.div variants={fadeIn} className="mt-12 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" /> Lead Pipeline
            </h3>
            <p className="text-xs text-zinc-500 mt-1">Drag and drop to move leads across stages</p>
          </div>
        </div>
        
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 shadow-xl overflow-hidden">
          <KanbanBoard leads={leads} />
        </div>
      </motion.div>
    </motion.div>
  );
}
