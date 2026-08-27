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
    <Preview>Welcome to Logic Intelligence Technologies! 🚀</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to {COMPANY.displayName}! 🚀</Heading>
        <Text style={text}>Hi {email},</Text>
        <Text style={text}>
          Welcome to Logic Intelligence Technologies! We are absolutely thrilled to have you onboard.
        </Text>
        <Text style={text}>
          As a premium digital engineering and web development studio, our goal is to help you build, scale, and transform your digital presence. Your account is now fully active.
        </Text>
        <Text style={text}>
          <strong>What's next?</strong>
          <br/>
          • Access your dashboard: <Link href="https://www.logicintelligencetechnologies.in/login">https://www.logicintelligencetechnologies.in/login</Link>
          <br/>
          • Explore our latest digital solutions and services on our website.
        </Text>
        <Text style={text}>
          If you have any questions, ideas, or just want to say hi, simply reply to this email or reach out to our 24/7 support team. We are here to help you build something amazing.
        </Text>
        <Text style={text}>
          Welcome to the future of digital engineering!
        </Text>
        <Text style={text}>
          Best regards,<br />
          Vikash Saravanan<br />
          Founder & CEO, Logic Intelligence Technologies<br />
          <Link href="https://www.logicintelligencetechnologies.in">www.logicintelligencetechnologies.in</Link>
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
