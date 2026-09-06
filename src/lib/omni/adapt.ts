import type { OmniChannel } from "./types";

/** Deterministic channel copy adapter (LLM hook can replace later). */
export function adaptCopy(root: string, channel: OmniChannel): string {
  const text = root.trim();
  if (channel === "x") {
    return text.length > 270 ? `${text.slice(0, 270)}…` : text;
  }
  if (channel === "linkedin") {
    return `${text}\n\n— Logic Intelligence Technologies`;
  }
  if (channel === "website") {
    return `## Update\n\n${text}\n\n### Next steps\n\nContact us for a free demo.`;
  }
  return text;
}

export function aspectFor(channel: OmniChannel): string {
  const map: Record<OmniChannel, string> = {
    instagram: "4:5",
    facebook: "4:5",
    threads: "1:1",
    linkedin: "16:9",
    website: "16:9",
    x: "16:9",
    telegram: "1:1",
    discord: "16:9",
  };
  return map[channel];
}

export function mcpToolFor(channel: OmniChannel): string {
  const map: Record<OmniChannel, string> = {
    discord: "publish_discord_webhook",
    telegram: "publish_telegram_bot",
    website: "publish_website_db",
    x: "publish_x",
    linkedin: "publish_linkedin",
    instagram: "publish_to_meta",
    facebook: "publish_to_meta",
    threads: "publish_to_meta",
  };
  return map[channel];
}
