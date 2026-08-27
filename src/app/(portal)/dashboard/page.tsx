import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

import { env } from "@/config/env";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient(
    { cookies: () => cookieStore },
    {
      supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }
  );
  
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white p-10 font-sans flex flex-col items-center justify-center">
      <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          🎉
        </div>
        <h1 className="text-3xl font-black mb-2">Welcome to the Dashboard!</h1>
        <p className="text-zinc-400 mb-8">
          You have successfully logged in. Your email is: <br/>
          <strong className="text-white mt-1 inline-block">{session.user.email}</strong>
        </p>
        
        <form action="/auth/signout" method="POST">
          <button className="flex items-center gap-2 justify-center w-full py-3 rounded-xl bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20 transition-colors border border-red-500/20">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
