import { Text, Section, Hr } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/email-layout';
import { EmailHeader } from './components/email-header';
import { EmailFooter } from './components/email-footer';

interface LoginNotificationEmailProps {
  email: string;
  loginTimestamp: string;
  userAgent?: string;
  deviceSummary?: string;
  screenSize?: string;
  timezone?: string;
  ipAddress?: string;
}

export const LoginNotificationEmail = ({ 
  email,
  loginTimestamp,
  userAgent,
  deviceSummary,
  screenSize,
  timezone,
  ipAddress
}: LoginNotificationEmailProps) => {
  return (
    <EmailLayout preview={`Login Activity: ${email}`}>
      <EmailHeader />
      <Section style={content}>
        <Section style={alertBanner}>
          <Text style={alertText}>🔐 CLIENT PORTAL LOGIN</Text>
        </Section>

        <Section style={detailsCard}>
          <Section style={detailRow}>
            <Text style={detailLabel}>Email</Text>
            <Text style={detailValueHighlight}>{email}</Text>
          </Section>
          <Hr style={rowDivider} />
          <Section style={detailRow}>
            <Text style={detailLabel}>Timestamp</Text>
            <Text style={detailValue}>
              {new Date(loginTimestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </Text>
          </Section>
          <Hr style={rowDivider} />
          <Section style={detailRow}>
            <Text style={detailLabel}>Device</Text>
            <Text style={detailValue}>{deviceSummary || 'Unknown'}</Text>
          </Section>
          <Hr style={rowDivider} />
          <Section style={detailRow}>
            <Text style={detailLabel}>Screen Size</Text>
            <Text style={detailValue}>{screenSize || 'Unknown'}</Text>
          </Section>
          <Hr style={rowDivider} />
          <Section style={detailRow}>
            <Text style={detailLabel}>Timezone</Text>
            <Text style={detailValue}>{timezone || 'Unknown'}</Text>
          </Section>
          <Hr style={rowDivider} />
          <Section style={detailRow}>
            <Text style={detailLabel}>IP Address</Text>
            <Text style={detailValue}>{ipAddress || 'Hidden'}</Text>
          </Section>
        </Section>
        
        <Text style={subheading}>🖥️ Raw User Agent</Text>
        <Section style={userAgentBox}>
          <Text style={userAgentText}>{userAgent || 'Not provided'}</Text>
        </Section>
      </Section>
      <EmailFooter />
    </EmailLayout>
  );
};

export default LoginNotificationEmail;

const content = {
  padding: '0 40px 36px 40px',
};

const alertBanner = {
  backgroundColor: '#10b981',
  padding: '12px 24px',
  margin: '0 -40px 28px -40px',
  textAlign: 'center' as const,
};

const alertText = {
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: '800' as const,
  letterSpacing: '2px',
  margin: '0',
};

const subheading = {
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '700' as const,
  margin: '28px 0 12px 0',
};

const detailsCard = {
  backgroundColor: '#1f2937',
  borderRadius: '12px',
  border: '1px solid #374151',
  padding: '4px 20px',
};

const detailRow = {
  padding: '4px 0',
};

const rowDivider = {
  borderTop: '1px solid #374151',
  margin: '0',
};

const detailLabel = {
  color: '#9ca3af',
  fontSize: '12px',
  fontWeight: '600' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 2px 0',
  lineHeight: '16px',
};

const detailValue = {
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: '500' as const,
  margin: '0',
  lineHeight: '22px',
};

const detailValueHighlight = {
  color: '#10b981',
  fontSize: '15px',
  fontWeight: '600' as const,
  margin: '0',
  lineHeight: '22px',
};

const userAgentBox = {
  backgroundColor: '#111827',
  padding: '16px 20px',
  borderRadius: '12px',
  borderLeft: '4px solid #10b981',
};

const userAgentText = {
  margin: '0',
  color: '#9ca3af',
  fontSize: '11px',
  fontFamily: '"SF Mono", Monaco, "Cascadia Code", monospace',
  lineHeight: '18px',
  wordBreak: 'break-all' as const,
};
