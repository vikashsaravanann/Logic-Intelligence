import { Text, Section, Link, Hr } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/email-layout';
import { EmailHeader } from './components/email-header';
import { EmailFooter } from './components/email-footer';
import { EmailButton } from './components/email-button';

interface MaintenanceRenewalEmailProps {
  fullName: string;
  expiryDate: string;
  renewLink: string;
}

export const MaintenanceRenewalEmail = ({
  fullName,
  expiryDate,
  renewLink,
}: MaintenanceRenewalEmailProps) => {
  return (
    <EmailLayout preview="Your maintenance subscription is expiring soon">
      <EmailHeader />
      <Section style={content}>
        <Text style={greeting}>Hi {fullName},</Text>

        <Text style={heroText}>
          Maintenance Subscription Renewal
        </Text>

        <Text style={paragraph}>
          This is a friendly reminder that your maintenance subscription with Logic Intelligence Technologies is set to expire on <strong>{expiryDate}</strong>.
        </Text>

        <Text style={paragraph}>
          To ensure uninterrupted access to our support and services, please renew your subscription by clicking the button below:
        </Text>

        <Text style={paragraph}>
          <EmailButton href={renewLink}>
            Renew Maintenance Subscription
          </EmailButton>
        </Text>

        <Hr style={divider} />

        <Text style={paragraph}>
          If you have any questions or need assistance, please don't hesitate to reach out to our support team.
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

export default MaintenanceRenewalEmail;

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
