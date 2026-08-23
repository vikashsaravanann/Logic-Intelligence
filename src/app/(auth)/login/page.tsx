"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { companyConfig } from "@/config/company";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/config/env";

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (authError) {
        throw authError;
      }
      
      // We will let the callback handle the session redirect or directly redirect here
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Invalid login credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full pl-11 pr-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner";

  return (
    <main className="min-h-screen bg-[#0A0D1A] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto shadow-xl overflow-hidden">
               <span className="text-2xl font-black text-white">LI</span>
            </div>
          </Link>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Client Portal</h1>
          <p className="text-zinc-400 text-sm">Sign in to manage your projects and view reports</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#12172b] p-8 md:p-10 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input type="email" required placeholder="client@example.com" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input type="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-4 h-4 rounded border border-zinc-600 group-hover:border-zinc-400 flex items-center justify-center transition-colors">
                  <input type="checkbox" className="hidden" />
                </div>
                <span className="text-xs text-zinc-400">Remember me</span>
              </label>
              <a href="#" className="text-xs text-primary hover:text-primary/80 transition-colors">Forgot password?</a>
            </div>

            <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-black bg-white hover:bg-primary transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,191,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-8">
              {isLoading ? 'Signing in...' : <><ArrowRight className="w-5 h-5" /> Sign In</>}
            </button>
          </form>
        </motion.div>

        <p className="text-center text-xs text-zinc-600 mt-8 flex justify-center items-center gap-1">
          <Shield className="w-3 h-3" /> Secure portal for {companyConfig.displayName} clients.
        </p>
      </div>
    </main>
  );
}
