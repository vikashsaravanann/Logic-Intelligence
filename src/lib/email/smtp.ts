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
  contact: "CONTACT",
  admin: "ADMIN",
  support: "SUPPORT",
};

function getSmtpConfig(sender: SenderKey): SmtpConfig {
  const prefix = senderEnvMap[sender];
  
  // Fallbacks for Hostinger default configurations
  const host = process.env[`SMTP_${prefix}_HOST`] || process.env.SMTP_HOST || "smtp.hostinger.com";
  const port = Number(process.env[`SMTP_${prefix}_PORT`] || process.env.SMTP_PORT || 465);
  const secure = (process.env[`SMTP_${prefix}_SECURE`] || process.env.SMTP_SECURE) === "true" || port === 465;
  
  // Predict user and from based on COMPANY.emails if not explicitly set
  const user = process.env[`SMTP_${prefix}_USER`] || process.env.SMTP_USER || COMPANY.emails[sender];
  const from = process.env[`SMTP_${prefix}_FROM`] || process.env.SMTP_FROM || COMPANY.emails[sender];
  
  // Password MUST be set in environment variables
  const pass = process.env[`SMTP_${prefix}_PASS`] || process.env.SMTP_PASS;

  if (!host || !user || !pass || !from) {
    throw new Error(`SMTP config missing for sender: ${sender} (prefix: ${prefix})`);
  }

  return { host, port, secure, user, pass, from };
}

const transporterCache = new Map<SenderKey, nodemailer.Transporter>();

export function getSmtpTransporter(sender: SenderKey = "noReply"): nodemailer.Transporter {
  const cached = transporterCache.get(sender);
  if (cached) return cached;

  const config = getSmtpConfig(sender);

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  transporterCache.set(sender, transporter);
  return transporter;
}

export function getSmtpFromAddress(sender: SenderKey = "noReply"): string {
  const prefix = senderEnvMap[sender];
  return process.env[`SMTP_${prefix}_FROM`] || COMPANY.emails[sender];
}

export function isSmtpConfigured(sender: SenderKey = "noReply"): boolean {
  try {
    getSmtpConfig(sender);
    return true;
  } catch {
    return false;
  }
}
