import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import BackToHome from "@/components/ui/back-to-home";
import { env } from "@/config/env";
import { getUserPortalData } from "./actions/portal";
import { PortalTabs } from "./components/portal-tabs";
import { Building2, Mail, Phone } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient(
    { cookies: () => cookieStore as any },
    {
      supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .maybeSingle();

  const portalData = await getUserPortalData();

  const user = session.user;
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const fullName =
    profile?.full_name || user.user_metadata?.full_name || "";

  const profileDetails = {
    fullName,
    email: user.email || "",
    companyName: profile?.company_name || "",
    phoneNumber: profile?.phone_number || "",
  };

  const initial = (
    fullName?.charAt(0) ||
    user.email?.charAt(0) ||
    "U"
  ).toUpperCase();

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,191,255,0.08),_transparent_55%)]" />
      <BackToHome />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-4">
        {/* Profile header card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 mb-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-primary/40 bg-primary/10 flex items-center justify-center text-3xl font-black text-primary shrink-0 shadow-[0_0_30px_rgba(0,191,255,0.2)]">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={fullName || "Profile"}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                initial
              )}
            </div>

            <div className="flex-1 text-center sm:text-left min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                Client portal
              </p>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight truncate">
                {fullName || "Your profile"}
              </h1>
              <div className="mt-3 flex flex-col sm:flex-row sm:flex-wrap items-center sm:items-start gap-2 sm:gap-4 text-sm text-zinc-400">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-primary/80" />
                  {user.email}
                </span>
                {profileDetails.companyName ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-primary/80" />
                    {profileDetails.companyName}
                  </span>
                ) : null}
                {profileDetails.phoneNumber ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-primary/80" />
                    {profileDetails.phoneNumber}
                  </span>
                ) : null}
              </div>
              <p className="text-zinc-500 mt-3 text-xs sm:text-sm max-w-xl">
                Manage account details, projects, billing, and support for Logic
                Intelligence Technologies.
              </p>
            </div>
          </div>
        </div>

        <PortalTabs portalData={portalData} profileDetails={profileDetails} />
      </div>
    </div>
  );
}
