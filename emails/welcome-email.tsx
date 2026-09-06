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
    <EmailLayout preview="Welcome to Logic Intelligence Technologies!">
      <EmailHeader />
      <Section style={content}>
        <Text style={greeting}>Hi {email},</Text>

        <Text style={heroText}>
          Welcome to Logic Intelligence Technologies!
        </Text>

        <Text style={paragraph}>
          Thank you for joining Logic Intelligence Technologies. We help businesses
          design, build, and ship production web products and practical AI systems
          — with clear scope, transparent pricing, and measurable outcomes.
        </Text>

        <Text style={paragraph}>
          Your account is now <strong>fully active</strong>.
        </Text>

        <Hr style={divider} />

        <Text style={sectionTitle}>What&apos;s next?</Text>

        <Section style={bulletSection}>
          <Text style={bulletItem}>
            → Access your personal dashboard and manage your account
          </Text>
          <Text style={bulletItem}>
            → Explore our latest digital solutions and services
          </Text>
          <Text style={bulletItem}>
            → Connect with our team for any questions or ideas
          </Text>
        </Section>

        <Text style={paragraph}>
          <EmailButton href="https://www.logicintelligencetechnologies.in/login">
            Go to Your Dashboard →
          </EmailButton>
        </Text>

        <Hr style={divider} />

        <Text style={paragraph}>
          If you have any questions, ideas, or just want to say hi, simply reply
          to this email or reach out to our 24/7 support team. We are here to
          help you build something amazing.
        </Text>

        <Text style={closingText}>
          We look forward to building with you.
        </Text>

        <Section style={signatureBlock}>
          <Text style={signatureName}>Vikash Saravanan</Text>
          <Text style={signatureTitle}>Founder &amp; CEO</Text>
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
  color: '#111827',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 8px 0',
};

const heroText = {
  color: '#111827',
  fontSize: '22px',
  fontWeight: '700' as const,
  lineHeight: '30px',
  margin: '0 0 24px 0',
};

const paragraph = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '26px',
  margin: '0 0 16px 0',
};

const divider = {
  borderTop: '1px solid #e5e7eb',
  margin: '28px 0',
};

const sectionTitle = {
  color: '#111827',
  fontSize: '17px',
  fontWeight: '700' as const,
  margin: '0 0 16px 0',
};

const bulletSection = {
  margin: '0 0 24px 0',
};

const bulletItem = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '26px',
  margin: '0 0 12px 0',
};

const closingText = {
  color: '#111827',
  fontSize: '16px',
  fontWeight: '600' as const,
  lineHeight: '26px',
  margin: '0 0 20px 0',
};

const signatureBlock = {
  borderLeft: '3px solid #2563eb',
  paddingLeft: '16px',
  margin: '0',
};

const signatureName = {
  color: '#111827',
  fontSize: '14px',
  fontWeight: '700' as const,
  margin: '0 0 4px 0',
  lineHeight: '18px',
};

const signatureTitle = {
  color: '#6b7280',
  fontSize: '13px',
  margin: '0 0 2px 0',
  lineHeight: '18px',
};

const signatureCompany = {
  color: '#6b7280',
  fontSize: '13px',
  margin: '0 0 4px 0',
  lineHeight: '18px',
};

const signatureLink = {
  color: '#2563eb',
  fontSize: '13px',
  textDecoration: 'underline',
};
