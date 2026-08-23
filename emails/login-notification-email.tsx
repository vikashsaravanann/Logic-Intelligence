import { Text, Section } from '@react-email/components';
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
    <EmailLayout>
      <EmailHeader />
      <Section style={content}>
        <Text style={heading}>Client Portal Login</Text>
        
        <Section style={detailsSection}>
          <Text style={detailItem}><strong>Email:</strong> {email}</Text>
          <Text style={detailItem}><strong>Timestamp:</strong> {loginTimestamp}</Text>
          <Text style={detailItem}><strong>Device:</strong> {deviceSummary || 'Unknown'}</Text>
          <Text style={detailItem}><strong>Screen Size:</strong> {screenSize || 'Unknown'}</Text>
          <Text style={detailItem}><strong>Timezone:</strong> {timezone || 'Unknown'}</Text>
          <Text style={detailItem}><strong>IP Address:</strong> {ipAddress || 'Hidden'}</Text>
        </Section>
        
        <Text style={subheading}>Raw User Agent:</Text>
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
  padding: '20px',
};

const heading = {
  color: '#0a0d1a',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const subheading = {
  color: '#0a0d1a',
  fontSize: '18px',
  fontWeight: 'bold',
  marginTop: '20px',
  marginBottom: '10px',
};

const detailsSection = {
  backgroundColor: '#f6f9fc',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '20px',
};

const detailItem = {
  margin: '8px 0',
  color: '#525f7f',
  fontSize: '14px',
};

const userAgentBox = {
  backgroundColor: '#f6f9fc',
  padding: '16px',
  borderRadius: '8px',
  borderLeft: '4px solid #00bfff',
};

const userAgentText = {
  margin: '0',
  color: '#525f7f',
  fontSize: '12px',
  fontFamily: 'monospace',
  wordBreak: 'break-all' as const,
};
