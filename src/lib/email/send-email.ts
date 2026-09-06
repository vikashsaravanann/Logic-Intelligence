import "server-only";
import {
  getSmtpTransporter,
  getSmtpFromAddress,
  isSmtpConfigured,
  resolveSender,
} from "./smtp";
import * as React from "react";
import { render } from "@react-email/components";
import { COMPANY } from "@/config/company";

export type EmailResponse = {
  success: boolean;
  message: string;
};

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
  replyTo?: string;
  from: keyof typeof COMPANY.emails | string;
  attachments?: Array<{
    filename: string;
    content?: Buffer | string;
    path?: string;
    contentType?: string;
  }>;
}

function getSenderKeyFromEmail(email: string): keyof typeof COMPANY.emails {
  const normalized = email
    .toLowerCase()
    .replace(/.*</, "")
    .replace(/>.*/, "")
    .trim();
  for (const [key, value] of Object.entries(COMPANY.emails)) {
    if (value.toLowerCase() === normalized) {
      return key as keyof typeof COMPANY.emails;
    }
  }
  return "noReply";
}

function normalizeRecipients(to: string | string[]): string[] {
  const list = Array.isArray(to) ? to : [to];
  return list
    .map((e) => String(e || "").trim().toLowerCase())
    .filter((e) => e.includes("@") && !e.endsWith("@example.com"));
}

/**
 * Transactional email sender with:
 * - sender fallback to noReply when mailbox-specific SMTP is missing
 * - one automatic retry via noReply on transport failure
 * - never throws to the request path
 */
export async function sendEmail({
  to,
  subject,
  react,
  replyTo,
  from,
  attachments,
}: SendEmailOptions): Promise<EmailResponse> {
  const recipients = normalizeRecipients(to);
  if (!recipients.length) {
    return { success: false, message: "No valid recipients" };
  }

  const requested =
    typeof from === "string" && from.includes("@")
      ? getSenderKeyFromEmail(from)
      : (from as keyof typeof COMPANY.emails);

  if (!isSmtpConfigured(requested) && !isSmtpConfigured("noReply")) {
    console.error("[Email] SMTP not configured — cannot send", { subject, to: recipients });
    return { success: false, message: "SMTP not configured" };
  }

  const primary = resolveSender(requested);

  try {
    const html = await render(react);
    const text = await render(react, { plainText: true });

    const attempt = async (sender: keyof typeof COMPANY.emails) => {
      const transporter = getSmtpTransporter(sender);
      const fromAddress = getSmtpFromAddress(sender);
      return transporter.sendMail({
        from: fromAddress,
        to: recipients,
        subject,
        html,
        text,
        replyTo: replyTo || COMPANY.emails.support || COMPANY.emails.hello,
        attachments,
      });
    };

    try {
      const result = await attempt(primary);
      return { success: true, message: `Email sent: ${result.messageId}` };
    } catch (primaryErr) {
      console.error("[Email] primary send failed, retrying noReply", {
        primary,
        err: primaryErr instanceof Error ? primaryErr.message : String(primaryErr),
        subject,
        to: recipients,
      });
      if (primary !== "noReply" && isSmtpConfigured("noReply")) {
        const result = await attempt("noReply");
        return { success: true, message: `Email sent via fallback: ${result.messageId}` };
      }
      throw primaryErr;
    }
  } catch (error: unknown) {
    const err = error as { code?: string; responseCode?: number; command?: string };
    console.error("Email delivery failed", {
      type: error instanceof Error ? error.name : "UnknownEmailError",
      message: error instanceof Error ? error.message : String(error),
      code: err?.code,
      responseCode: err?.responseCode,
      command: err?.command,
      sender: primary,
      to: recipients,
      subject,
    });
    return { success: false, message: "Internal failure while sending email" };
  }
}
