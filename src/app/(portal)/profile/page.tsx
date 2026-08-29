import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { User, Building, Phone, Mail, LogOut, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { env } from "@/config/env";

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient(
    { cookies: () => cookieStore as any },
    {
      supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }
  );
  
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  // Extract user details
  const user = session.user;
  const avatarUrl = user.user_metadata?.avatar_url;
  const fullName = user.user_metadata?.full_name || '';

  return (
    <div className="min-h-screen bg-[#050B14] text-white font-sans flex flex-col items-center py-12 px-4 relative">
      <Link href="/" className="absolute top-8 left-8 text-sm font-semibold text-zinc-400 hover:text-white flex items-center gap-2 transition-colors">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="w-full max-w-2xl mt-12">
        <div className="text-center mb-10">
          <div className="w-24 h-24 mx-auto rounded-full bg-blue-900/40 border-4 border-blue-500/30 flex items-center justify-center text-4xl font-bold text-blue-400 mb-4 overflow-hidden shadow-[0_0_30px_rgba(0,191,255,0.2)]">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              user.email?.charAt(0).toUpperCase()
            )}
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Client Profile</h1>
          <p className="text-zinc-400 mt-2 text-sm">Manage your Logic Intelligence Technologies account details.</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <User size={14} /> Full Name
                </label>
                <input 
                  type="text" 
                  defaultValue={fullName}
                  placeholder="John Doe"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Mail size={14} /> Email ID
                </label>
                <input 
                  type="email" 
                  defaultValue={user.email}
                  disabled
                  className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-500 cursor-not-allowed"
                />
              </div>

              {/* Company / College Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Building size={14} /> Company / College Name
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Logic Intelligence or XYZ College"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Phone size={14} /> Phone Number
                </label>
                <input 
                  type="tel" 
                  placeholder="+91 00000 00000"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <button type="button" className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(0,191,255,0.4)]">
                Save Changes
              </button>
              
              <form action="/auth/signout" method="POST" className="w-full sm:w-auto">
                <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-sm rounded-xl transition-all border border-red-500/20 flex items-center justify-center gap-2">
                  <LogOut size={16} /> Sign Out
                </button>
              </form>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
