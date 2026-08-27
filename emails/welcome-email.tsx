import { Text, Section, Link, Hr } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/email-layout';
import { EmailHeader } from './components/email-header';
import { EmailFooter } from './components/email-footer';
import { EmailButton } from './components/email-button';

interface WelcomeEmailProps {
  email: string;
}

export const WelcomeEmail = ({ email }: WelcomeEmailProps) => {
  return (
    <EmailLayout preview="Welcome to Logic Intelligence Technologies! 🚀">
      <EmailHeader />
      <Section style={content}>
        <Text style={greeting}>Hi {email},</Text>

        <Text style={heroText}>
          Welcome to Logic Intelligence Technologies! 🚀
        </Text>

        <Text style={paragraph}>
          We are absolutely thrilled to have you onboard. As a premium digital
          engineering and web development studio, our goal is to help you
          <strong> build, scale, and transform </strong>
          your digital presence.
        </Text>

        <Text style={paragraph}>
          Your account is now <strong>fully active</strong>.
        </Text>

        <Hr style={divider} />

        <Text style={sectionTitle}>What&apos;s next?</Text>

        <Section style={bulletSection}>
          <Text style={bulletItem}>
            🔹 Access your personal dashboard and manage your account
          </Text>
          <Text style={bulletItem}>
            🔹 Explore our latest digital solutions and services
          </Text>
          <Text style={bulletItem}>
            🔹 Connect with our team for any questions or ideas
          </Text>
        </Section>

        <Section style={buttonContainer}>
          <EmailButton href="https://www.logicintelligencetechnologies.in/login">
            Go to Your Dashboard →
          </EmailButton>
        </Section>

        <Hr style={divider} />

        <Text style={paragraph}>
          If you have any questions, ideas, or just want to say hi, simply reply
          to this email or reach out to our 24/7 support team. We are here to
          help you build something amazing.
        </Text>

        <Text style={closingText}>
          Welcome to the future of digital engineering!
        </Text>

        <Section style={signatureBlock}>
          <Text style={signatureName}>Vikash Saravanan</Text>
          <Text style={signatureTitle}>Founder & CEO</Text>
          <Text style={signatureCompany}>Logic Intelligence Technologies</Text>
          <Link
            href="https://www.logicintelligencetechnologies.in"
            style={signatureLink}
          >
            www.logicintelligencetechnologies.in
          </Link>
        </Section>
      </Section>
      <EmailFooter />
    </EmailLayout>
  );
};

export default WelcomeEmail;

const content = {
  padding: '36px 40px',
};

const greeting = {
  color: '#ffffff',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 8px 0',
};

const heroText = {
  color: '#ffffff',
  fontSize: '22px',
  fontWeight: '700' as const,
  lineHeight: '30px',
  margin: '0 0 24px 0',
};

const paragraph = {
  color: '#d1d5db',
  fontSize: '15px',
  lineHeight: '26px',
  margin: '0 0 16px 0',
};

const divider = {
  borderTop: '1px solid #374151',
  margin: '28px 0',
};

const sectionTitle = {
  color: '#ffffff',
  fontSize: '17px',
  fontWeight: '700' as const,
  margin: '0 0 16px 0',
};

const bulletSection = {
  margin: '0 0 24px 0',
};

const bulletItem = {
  color: '#d1d5db',
  fontSize: '15px',
  lineHeight: '26px',
  margin: '0 0 12px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '8px 0 0 0',
};

const closingText = {
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600' as const,
  lineHeight: '26px',
  margin: '0 0 20px 0',
};

const signatureBlock = {
  borderLeft: '3px solid #00bfff',
  paddingLeft: '16px',
  margin: '0',
};

const signatureName = {
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '700' as const,
  margin: '0 0 4px 0',
  lineHeight: '18px',
};

const signatureTitle = {
  color: '#9ca3af',
  fontSize: '13px',
  margin: '0 0 2px 0',
  lineHeight: '18px',
};

const signatureCompany = {
  color: '#9ca3af',
  fontSize: '13px',
  margin: '0 0 4px 0',
  lineHeight: '18px',
};

const signatureContact = {
  color: '#9ca3af',
  fontSize: '13px',
  margin: '0 0 2px 0',
  lineHeight: '18px',
};

const signatureLink = {
  color: '#00bfff',
  fontSize: '13px',
  textDecoration: 'none',
};
