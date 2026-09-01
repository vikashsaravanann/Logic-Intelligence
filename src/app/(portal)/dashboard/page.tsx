import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { env } from "@/config/env";
import DashboardClient from "./components/DashboardClient";

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

  // Fetching data from Supabase
  const { data: leads = [] } = await supabase.from("contact_leads").select("*").order("created_at", { ascending: false }).limit(5);
  const { data: projects = [] } = await supabase.from("projects").select("*").order("created_at", { ascending: false }).limit(5);
  const { data: invoices = [] } = await supabase.from("invoices").select("*").order("created_at", { ascending: false }).limit(5);

  return (
    <DashboardClient 
      leads={leads || []} 
      projects={projects || []} 
      invoices={invoices || []} 
    />
  );
}
