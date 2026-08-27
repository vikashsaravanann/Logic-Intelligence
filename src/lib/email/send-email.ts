import "server-only";
import { getSmtpTransporter, isSmtpConfigured } from "./smtp";
import * as React from "react";
import { render } from "@react-email/components";

export type EmailResponse = {
  success: boolean;
  message: string;
};

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
  replyTo?: string;
}

/**
 * Server-only utility to send transactional emails securely.
 * Suppresses internal provider errors from leaking to the frontend.
 */
export async function sendEmail({
  to,
  subject,
  react,
  replyTo = process.env.SMTP_REPLY_TO || "contact@logicintelligencetechnologies.in",
}: SendEmailOptions): Promise<EmailResponse> {
  if (!isSmtpConfigured) {
    console.warn(`[Email MOCK] Would have sent "${subject}" to ${to}`);
    return { success: true, message: "Email mocked successfully" };
  }

  try {
    const html = await render(react);
    // You can optionally render plain text version
    const text = await render(react, { plainText: true });

    const transporter = getSmtpTransporter();

    const result = await transporter.sendMail({
      from: process.env.SMTP_FROM,
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
