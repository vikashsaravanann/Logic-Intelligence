import { Text, Section, Hr } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/email-layout';
import { EmailHeader } from './components/email-header';
import { EmailFooter } from './components/email-footer';

interface LoginNotificationEmailProps {
  email: string;
  loginTimestamp: string;
  userAgent?: string;
  location?: string;
  parsedDevice?: string;
  screenSize?: string;
  timezone?: string;
  ipAddress?: string;
}

export const LoginNotificationEmail = (props: LoginNotificationEmailProps) => {
  return (
    <EmailLayout preview={`Login Activity: ${props.email}`}>
      <EmailHeader />
      <Section style={content}>
        <Text style={alertBannerText}>🚨 INTERNAL ALERT: LOGIN ACTIVITY</Text>

        <Section style={detailsCard}>
          <Section style={detailRow}>
            <Text style={detailLabel}>Email</Text>
            <Text style={detailValueHighlight}>{props.email}</Text>
          </Section>
          <Hr style={rowDivider} />
          <Section style={detailRow}>
            <Text style={detailLabel}>Timestamp</Text>
            <Text style={detailValue}>
              {new Date(props.loginTimestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </Text>
          </Section>
          <Hr style={rowDivider} />
          <Section style={detailRow}>
            <Text style={detailLabel}>Device</Text>
            <Text style={detailValue}>{props.parsedDevice || 'Unknown'}</Text>
          </Section>
          <Hr style={rowDivider} />
          <Section style={detailRow}>
            <Text style={detailLabel}>Location</Text>
            <Text style={detailValue}>{props.location || 'Unknown'}</Text>
          </Section>
          <Hr style={rowDivider} />
          <Section style={detailRow}>
            <Text style={detailLabel}>Screen Size</Text>
            <Text style={detailValue}>{props.screenSize || 'Unknown'}</Text>
          </Section>
          <Hr style={rowDivider} />
          <Section style={detailRow}>
            <Text style={detailLabel}>Timezone</Text>
            <Text style={detailValue}>{props.timezone || 'Unknown'}</Text>
          </Section>
          <Hr style={rowDivider} />
          <Section style={detailRow}>
            <Text style={detailLabel}>IP Address</Text>
            <Text style={detailValue}>{props.ipAddress || 'Hidden'}</Text>
          </Section>
        </Section>
        
        <Text style={subheading}>🖥️ Raw User Agent</Text>
        <Section style={userAgentBox}>
          <Text style={userAgentText}>{props.userAgent || 'Not provided'}</Text>
        </Section>
      </Section>
      <EmailFooter />
    </EmailLayout>
  );
};

export default LoginNotificationEmail;

const content = {
  padding: '32px 40px 36px 40px',
};

const alertBannerText = {
  color: '#111827',
  fontSize: '14px',
  fontWeight: '700' as const,
  letterSpacing: '1px',
  margin: '0 0 20px 0',
  textTransform: 'uppercase' as const,
};

const subheading = {
  color: '#374151',
  fontSize: '14px',
  fontWeight: '700' as const,
  margin: '24px 0 8px 0',
};

const detailsCard = {
  backgroundColor: '#f9fafb',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
  padding: '4px 20px',
};

const detailRow = {
  padding: '4px 0',
};

const rowDivider = {
  borderTop: '1px solid #e5e7eb',
  margin: '0',
};

const detailLabel = {
  color: '#6b7280',
  fontSize: '12px',
  fontWeight: '600' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 2px 0',
  lineHeight: '16px',
};

const detailValue = {
  color: '#111827',
  fontSize: '15px',
  fontWeight: '500' as const,
  margin: '0',
  lineHeight: '22px',
};

const detailValueHighlight = {
  color: '#1d4ed8',
  fontSize: '15px',
  fontWeight: '600' as const,
  margin: '0',
  lineHeight: '22px',
};

const userAgentBox = {
  backgroundColor: '#f9fafb',
  padding: '12px 16px',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
  borderLeft: '3px solid #6b7280',
};

const userAgentText = {
  margin: '0',
  color: '#6b7280',
  fontSize: '11px',
  fontFamily: '"SF Mono", Monaco, "Cascadia Code", monospace',
  lineHeight: '18px',
  wordBreak: 'break-all' as const,
};
