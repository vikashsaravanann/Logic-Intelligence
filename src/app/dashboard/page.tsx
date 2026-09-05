import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { 
  FolderGit2, 
  Receipt, 
  MessageSquareWarning, 
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  const userId = session.user.id;

  // Fetch data
  const [
    { data: projects },
    { data: invoices },
    { data: tickets }
  ] = await Promise.all([
    supabase.from('projects').select('*').eq('user_id', userId),
    supabase.from('invoices').select('*').eq('user_id', userId),
    supabase.from('support_tickets').select('*').eq('user_id', userId),
  ]);

  const safeProjects = projects || [];
  const safeInvoices = invoices || [];
  const safeTickets = tickets || [];

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'paid':
      case 'resolved':
      case 'completed':
        return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'pending':
      case 'open':
      case 'in progress':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'overdue':
      case 'closed':
      case 'cancelled':
        return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      default:
        return 'text-zinc-400 bg-zinc-800 border-zinc-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'paid':
      case 'resolved':
      case 'completed':
        return <CheckCircle2 size={14} className="mr-1.5" />;
      case 'pending':
      case 'open':
      case 'in progress':
        return <Clock size={14} className="mr-1.5" />;
      case 'overdue':
      case 'closed':
      case 'cancelled':
        return <AlertCircle size={14} className="mr-1.5" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome back, {session.user.user_metadata?.full_name || 'Client'}</h1>
        <p className="text-zinc-400 text-lg">Here is an overview of your active projects and account status.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Metric Cards */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FolderGit2 size={64} />
          </div>
          <p className="text-zinc-400 font-medium mb-1 flex items-center gap-2"><FolderGit2 size={16} /> Active Projects</p>
          <p className="text-4xl font-bold text-white">{safeProjects.filter(p => p.status?.toLowerCase() === 'active').length}</p>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Receipt size={64} />
          </div>
          <p className="text-zinc-400 font-medium mb-1 flex items-center gap-2"><Receipt size={16} /> Pending Invoices</p>
          <p className="text-4xl font-bold text-white">{safeInvoices.filter(i => i.status?.toLowerCase() === 'pending').length}</p>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <MessageSquareWarning size={64} />
          </div>
          <p className="text-zinc-400 font-medium mb-1 flex items-center gap-2"><MessageSquareWarning size={16} /> Open Tickets</p>
          <p className="text-4xl font-bold text-white">{safeTickets.filter(t => t.status?.toLowerCase() === 'open').length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Projects Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FolderGit2 className="text-blue-400" size={20} /> Projects
            </h2>
            <Link href="#" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden backdrop-blur-sm flex-1">
            {safeProjects.length > 0 ? (
              <div className="divide-y divide-zinc-800/80">
                {safeProjects.map(project => (
                  <div key={project.id} className="p-5 hover:bg-zinc-800/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white">{project.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                        {getStatusIcon(project.status)}
                        {project.status}
                      </span>
                    </div>
                    {project.description && (
                      <p className="text-sm text-zinc-400 line-clamp-2">{project.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center flex flex-col items-center justify-center h-full text-zinc-500">
                <FolderGit2 size={32} className="mb-3 opacity-20" />
                <p>No projects found.</p>
                <p className="text-sm mt-1">Start a new project to see it here.</p>
              </div>
            )}
          </div>
        </section>

        <div className="flex flex-col gap-8">
          {/* Invoices Section */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Receipt className="text-emerald-400" size={20} /> Invoices
              </h2>
              <Link href="#" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden backdrop-blur-sm">
              {safeInvoices.length > 0 ? (
                <div className="divide-y divide-zinc-800/80">
                  {safeInvoices.map(invoice => (
                    <div key={invoice.id} className="p-5 hover:bg-zinc-800/30 transition-colors flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-white">{invoice.description || `Invoice #${invoice.id.substring(0, 8)}`}</h3>
                        <p className="text-sm text-zinc-400 mt-1">${Number(invoice.amount).toFixed(2)}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        {invoice.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-zinc-500">
                  <Receipt size={32} className="mb-3 opacity-20 mx-auto" />
                  <p>No invoices found.</p>
                </div>
              )}
            </div>
          </section>

          {/* Tickets Section */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <MessageSquareWarning className="text-rose-400" size={20} /> Support Tickets
              </h2>
              <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                <Plus size={14} /> New Ticket
              </button>
            </div>
            
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden backdrop-blur-sm">
              {safeTickets.length > 0 ? (
                <div className="divide-y divide-zinc-800/80">
                  {safeTickets.map(ticket => (
                    <div key={ticket.id} className="p-5 hover:bg-zinc-800/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-white">{ticket.subject}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(ticket.status || 'Open')}`}>
                          {getStatusIcon(ticket.status || 'Open')}
                          {ticket.status || 'Open'}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400 line-clamp-1">{ticket.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-zinc-500">
                  <MessageSquareWarning size={32} className="mb-3 opacity-20 mx-auto" />
                  <p>No open support tickets.</p>
                  <p className="text-sm mt-1">Need help? Create a new ticket.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
