import { sendEmail } from "./src/lib/email/send-email";
import * as React from "react";
import WelcomeEmail from "./emails/welcome-email";
import { config } from "dotenv";

config({ path: ".env.local" });

async function test() {
  console.log("Testing email...");
  const res = await sendEmail({
    to: "vikash@logicintelligencetechnologies.in",
    subject: "Test email",
    react: React.createElement(WelcomeEmail, { email: "vikash@logicintelligencetechnologies.in" })
  });
  console.log("Result:", res);
}
test().catch(console.error);
