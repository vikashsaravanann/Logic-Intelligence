import "server-only";
import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT ?? 465);
const smtpSecure = process.env.SMTP_SECURE === "true";
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

export const isSmtpConfigured = Boolean(
  smtpHost && smtpUser && smtpPass && process.env.SMTP_FROM
);

export function getSmtpTransporter() {
  if (!isSmtpConfigured) {
    throw new Error("SMTP email is not configured.");
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}
