import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { env } from "@/config/env";
import ProfileForm from "./profile-form";

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

  // Fetch the full profile from the profiles table
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  // Extract user details
  const user = session.user;
  const avatarUrl = user.user_metadata?.avatar_url;
  const fullName = profile?.full_name || user.user_metadata?.full_name || '';

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

        <ProfileForm 
          initialFullName={fullName}
          email={user.email || ''}
          initialCompanyName={profile?.company_name || ''}
          initialPhoneNumber={profile?.phone_number || ''}
        />
      </div>
    </div>
  );
}
