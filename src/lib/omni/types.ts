export type OmniChannel =
  | "instagram"
  | "facebook"
  | "linkedin"
  | "x"
  | "telegram"
  | "threads"
  | "discord"
  | "website";

export type OmniPostStatus =
  | "draft"
  | "queued"
  | "publishing"
  | "published"
  | "partial"
  | "failed"
  | "cancelled";

export interface OmniPostCreate {
  root_text: string;
  media_master_url?: string | null;
  channels: OmniChannel[];
  execute_at?: string | null;
  schedule_mode?: "manual" | "predictive";
  title?: string | null;
}

export interface OmniPostRow {
  id: string;
  root_text: string;
  media_master_url: string | null;
  status: OmniPostStatus;
  channels: string[];
  execute_at: string | null;
  schedule_mode: string;
  title: string | null;
  created_at: string;
}
