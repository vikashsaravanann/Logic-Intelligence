import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";
import { COMPANY } from "@/config/company";

interface WelcomeEmailProps {
  email: string;
}

export const WelcomeEmail = ({
  email,
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to {COMPANY.displayName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to {COMPANY.displayName}</Heading>
        <Text style={text}>Hi {email},</Text>
        <Text style={text}>
          Thank you for joining {COMPANY.displayName}. We are thrilled to have you!
        </Text>
        <Text style={text}>
          You can now log in to your dashboard and manage your account.
        </Text>
        <Text style={text}>
          Best regards,<br />
          The {COMPANY.displayName} Team
        </Text>
        <Text style={footer}>
          {COMPANY.displayName} | {COMPANY.email} | {COMPANY.phone}<br />
          {COMPANY.address}
        </Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  padding: "0 40px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  padding: "0 40px",
};

const footer = {
  color: "#898989",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  padding: "0 40px",
};
