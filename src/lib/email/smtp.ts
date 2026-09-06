import "server-only";
import nodemailer from "nodemailer";
import { COMPANY } from "@/config/company";

type SenderKey = keyof typeof COMPANY.emails;

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
}

const senderEnvMap: Record<SenderKey, string> = {
  noReply: "NOREPLY",
  vikash: "VIKASH",
  hello: "HELLO",
  admin: "ADMIN",
  support: "SUPPORT",
};

/**
 * Resolve SMTP for a sender. Falls back to shared SMTP_* / NOREPLY credentials
 * so hello/support still deliver when only one mailbox password is configured.
 */
function getSmtpConfig(sender: SenderKey): SmtpConfig {
  const prefix = senderEnvMap[sender];

  const host =
    process.env[`SMTP_${prefix}_HOST`] ||
    process.env.SMTP_HOST ||
    "smtp.zoho.in";
  const port = Number(
    process.env[`SMTP_${prefix}_PORT`] || process.env.SMTP_PORT || 465
  );
  // Zoho: 465 = SSL (secure true); 587 = STARTTLS (secure false)
  const secureEnv = process.env[`SMTP_${prefix}_SECURE`] ?? process.env.SMTP_SECURE;
  const secure =
    secureEnv === "true"
      ? true
      : secureEnv === "false"
        ? false
        : port === 465;

  const user =
    process.env[`SMTP_${prefix}_USER`] ||
    process.env.SMTP_USER ||
    COMPANY.emails[sender] ||
    COMPANY.emails.noReply;

  // Prefer sender-specific password, then shared, then no-reply mailbox password
  const pass =
    process.env[`SMTP_${prefix}_PASS`] ||
    process.env.SMTP_PASS ||
    process.env.SMTP_NOREPLY_PASS ||
    "";

  const from =
    process.env[`SMTP_${prefix}_FROM`] ||
    process.env.SMTP_FROM ||
    `"${COMPANY.displayName}" <${COMPANY.emails[sender]}>`;

  if (!host || !user || !pass) {
    throw new Error(`SMTP config missing for sender: ${sender} (prefix: ${prefix})`);
  }

  return { host, port, secure, user, pass, from };
}

const transporterCache = new Map<string, nodemailer.Transporter>();

export function getSmtpTransporter(sender: SenderKey = "noReply"): nodemailer.Transporter {
  const config = getSmtpConfig(sender);
  const cacheKey = `${config.host}:${config.port}:${config.user}`;
  const cached = transporterCache.get(cacheKey);
  if (cached) return cached;

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 25000,
    tls: {
      // Hostinger / shared hosting certs
      rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false",
    },
  });

  transporterCache.set(cacheKey, transporter);
  return transporter;
}

export function getSmtpFromAddress(sender: SenderKey = "noReply"): string {
  const prefix = senderEnvMap[sender];
  const envFrom = process.env[`SMTP_${prefix}_FROM`] || process.env.SMTP_FROM;
  if (envFrom) return envFrom;
  return `"${COMPANY.displayName}" <${COMPANY.emails[sender]}>`;
}

export function isSmtpConfigured(sender: SenderKey = "noReply"): boolean {
  try {
    getSmtpConfig(sender);
    return true;
  } catch {
    // Last resort: any shared password means we can send as noReply
    if (sender !== "noReply") {
      try {
        getSmtpConfig("noReply");
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
}

/** Prefer requested sender; if not fully configured, use noReply. */
export function resolveSender(sender: SenderKey): SenderKey {
  try {
    getSmtpConfig(sender);
    return sender;
  } catch {
    return "noReply";
  }
}
