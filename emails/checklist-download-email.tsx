import { Text, Section, Link, Hr } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/email-layout';
import { EmailHeader } from './components/email-header';
import { EmailFooter } from './components/email-footer';
import { EmailButton } from './components/email-button';
import { COMPANY } from '@/config/company';

interface ChecklistDownloadEmailProps {
  fullName?: string;
}

export const ChecklistDownloadEmail = ({ fullName = "there" }: ChecklistDownloadEmailProps) => {
  return (
    <EmailLayout preview="Your Website Launch Checklist is here! — Logic Intelligence Technologies">
      <EmailHeader />
      <Section style={content}>
        <Text style={greeting}>Hi {fullName},</Text>

        <Text style={heroText}>
          Here is your Website Launch Checklist.
        </Text>

        <Text style={paragraph}>
          Thank you for requesting our <strong>50-point Website Launch Checklist</strong>! 
          As promised, you can download your free PDF copy below.
        </Text>

        <Text style={paragraph}>
          <EmailButton href={`${COMPANY.websiteUrl}/checklist.pdf`}>
            Download Checklist PDF
          </EmailButton>
        </Text>

        <Text style={paragraph}>
          We run through this exact checklist on every project before it goes live to ensure 
          performance, security, mobile UX, and more are flawless. We hope it helps your next launch!
        </Text>

        <Hr style={divider} />

        <Text style={closingText}>
          Best of luck with your launch.
        </Text>

        <Section style={signatureBlock}>
          <Text style={signatureName}>The Team at Logic Intelligence Technologies</Text>
          <Text style={signatureContact}>
            {COMPANY.emails.support}
          </Text>
          <Link
            href={COMPANY.websiteUrl}
            style={signatureLink}
          >
            {COMPANY.websiteUrl.replace(/^https?:\/\//, '')}
          </Link>
        </Section>
      </Section>
      <EmailFooter />
    </EmailLayout>
  );
};

export default ChecklistDownloadEmail;

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

const signatureContact = {
  color: '#6b7280',
  fontSize: '13px',
  margin: '0 0 2px 0',
  lineHeight: '18px',
};

const signatureLink = {
  color: '#2563eb',
  fontSize: '13px',
  textDecoration: 'underline',
};
