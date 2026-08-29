/**
 * Database type definitions for Supabase tables.
 * Auto-generation: run `supabase gen types typescript --project-id <id> > src/types/database.ts`
 *
 * These types are derived from the migrations in supabase/migrations/.
 * Manually maintained until Supabase CLI type generation is configured.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// ── Contact Leads ────────────────────────────────────────────────────────────
export interface ContactLead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string | null;
  created_at: string;
}

// ── Demo Leads ───────────────────────────────────────────────────────────────
export interface DemoLead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  job_title: string | null;
  interests: string[] | null;
  budget: string | null;
  created_at: string;
}

// ── Checklist Leads ──────────────────────────────────────────────────────────
export interface ChecklistLead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  role: string | null;
  created_at: string;
}

// ── Profiles ─────────────────────────────────────────────────────────────────
export interface Profile {
  id: string; // References auth.users.id
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: "client" | "admin" | "user";
  welcome_email_sent: boolean;
  created_at: string;
  updated_at: string;
}

// ── Login Events ─────────────────────────────────────────────────────────────
// Table exists in migrations but no application code writes to it yet.
// Reserved for future login notification feature.
export interface LoginEvent {
  id: string;
  user_id: string;
  email: string;
  user_agent: string | null;
  device_summary: string | null;
  screen_size: string | null;
  timezone: string | null;
  ip_address: string | null;
  created_at: string;
  notification_sent_at: string | null;
}

// ── CRM: Projects ─────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  project_code: string;
  client_name: string;
  name: string;
  status: string;
  progress: number;
  value: number;
  due_date: string | null;
  created_at: string;
}

// ── CRM: Invoices ─────────────────────────────────────────────────────────────
export interface Invoice {
  id: string;
  invoice_code: string;
  project_id: string | null;
  client_name: string;
  amount: number;
  status: string;
  due_date: string | null;
  created_at: string;
}

// ── Orphaned tables (in migrations, not used in application code) ─────────────
// public.checklist_submissions — created in 20260823000001_email_tracking.sql
//   Code uses checklist_leads instead. Do not write new code against this table.
// public.login_events — reserved for future login notification feature.
