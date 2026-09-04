import { Text, Section, Link, Hr } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/email-layout';
import { EmailHeader } from './components/email-header';
import { EmailFooter } from './components/email-footer';
import { EmailButton } from './components/email-button';

interface PasswordResetEmailProps {
  fullName: string;
  resetLink: string;
}

export const PasswordResetEmail = ({
  fullName,
  resetLink,
}: PasswordResetEmailProps) => {
  return (
    <EmailLayout preview="Reset your password">
      <EmailHeader />
      <Section style={content}>
        <Text style={greeting}>Hi {fullName},</Text>

        <Text style={heroText}>
          Password Reset Request
        </Text>

        <Text style={paragraph}>
          We received a request to reset the password for your Logic Intelligence Technologies account. If you made this request, please click the button below to choose a new password:
        </Text>

        <Text style={paragraph}>
          <EmailButton href={resetLink}>
            Reset Password
          </EmailButton>
        </Text>

        <Hr style={divider} />
        
        <Text style={warningText}>
          <strong>Security Warning:</strong> This link will expire in 1 hour. If you did not request a password reset, please ignore this email or contact our support team immediately if you feel your account has been compromised. Never share this link with anyone.
        </Text>

        <Section style={signatureBlock}>
          <Text style={signatureName}>Logic Intelligence Security Team</Text>
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

export default PasswordResetEmail;

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

const warningText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 24px 0',
  backgroundColor: '#f9fafb',
  padding: '16px',
  borderRadius: '4px',
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

const signatureLink = {
  color: '#2563eb',
  fontSize: '13px',
  textDecoration: 'underline',
};
