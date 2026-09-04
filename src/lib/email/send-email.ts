import "server-only";
import { getSmtpTransporter, getSmtpFromAddress, isSmtpConfigured } from "./smtp";
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
  from?: keyof typeof COMPANY.emails | string;
}

/**
 * Server-only utility to send transactional emails securely.
 * Suppresses internal provider errors from leaking to the frontend.
 */
export async function sendEmail({
  to,
  subject,
  react,
  replyTo,
  from = "noReply",
}: SendEmailOptions): Promise<EmailResponse> {
  const senderKey = (typeof from === 'string' && from.includes('@')) 
    ? getSenderKeyFromEmail(from) 
    : (from as keyof typeof COMPANY.emails);

  if (!isSmtpConfigured(senderKey)) {
    console.warn(`[Email MOCK] Would have sent "${subject}" to ${to} from ${senderKey}`);
    return { success: true, message: "Email mocked successfully" };
  }

  try {
    const html = await render(react);
    const text = await render(react, { plainText: true });

    const transporter = getSmtpTransporter(senderKey);
    const fromAddress = getSmtpFromAddress(senderKey);

    const result = await transporter.sendMail({
      from: fromAddress,
      to,
      subject,
      html,
      text,
      replyTo,
    });

    return { success: true, message: `Email sent: ${result.messageId}` };
  } catch (error) {
    console.error("Email delivery failed", {
      type: error instanceof Error ? error.name : "UnknownEmailError",
    });

    return { success: false, message: "Internal failure while sending email" };
  }
}

function getSenderKeyFromEmail(email: string): keyof typeof COMPANY.emails {
  const normalized = email.toLowerCase().replace(/.*</, '').replace(/>.*/, '').trim();
  for (const [key, value] of Object.entries(COMPANY.emails)) {
    if (value.toLowerCase() === normalized) {
      return key as keyof typeof COMPANY.emails;
    }
  }
  return "noReply";
}
