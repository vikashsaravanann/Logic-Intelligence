import { sendEmail } from "./send-email";
import LoginNotificationEmail from "@/emails/login-notification-email";
import * as React from "react";
import { UAParser } from "ua-parser-js";

export async function sendLoginNotification(
  email: string,
  reqHeaders: Headers,
  body?: { screenSize?: string; timezone?: string }
) {
  const uaString = reqHeaders.get("user-agent") || "";
  const parser = new UAParser(uaString);
  const result = parser.getResult();
  const deviceStr =
    [result.device.vendor, result.device.model, result.os.name]
      .filter(Boolean)
      .join(" ") ||
    result.os.name ||
    "Unknown Device";
  const browserStr = result.browser.name || "Unknown Browser";
  const parsedDevice = `${deviceStr} • ${browserStr}`;

  const ipAddress = reqHeaders.get("x-forwarded-for") || "Local Development";
  const city = reqHeaders.get("x-vercel-ip-city");
  const region = reqHeaders.get("x-vercel-ip-region");
  const country = reqHeaders.get("x-vercel-ip-country");

  let location = "Local Development";
  if (city || region || country) {
    location = [city, region, country].filter(Boolean).join(", ");
  }

  const adminEmail = process.env.ADMIN_ALERT_EMAIL || "admin@logicintelligencetechnologies.in";

  return sendEmail({
    to: adminEmail,
    from: "noReply",
    subject: `Client login: ${email}`,
    replyTo: "support@logicintelligencetechnologies.in",
    react: React.createElement(LoginNotificationEmail, {
      email,
      loginTimestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      userAgent: uaString,
      location,
      parsedDevice,
      ipAddress,
      screenSize: body?.screenSize,
      timezone: body?.timezone,
    }),
  });
}
