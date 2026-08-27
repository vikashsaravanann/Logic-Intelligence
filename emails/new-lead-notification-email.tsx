import { Text, Section, Hr } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/email-layout';
import { EmailHeader } from './components/email-header';
import { EmailFooter } from './components/email-footer';

interface NewLeadNotificationEmailProps {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  service: string;
  requirements: string;
  submissionDate: string;
}

export const NewLeadNotificationEmail = ({ 
  fullName, 
  companyName, 
  email, 
  phone, 
  service, 
  requirements, 
  submissionDate 
}: NewLeadNotificationEmailProps) => {
  return (
    <EmailLayout preview={`New Enquiry from ${fullName} — ${service}`}>
      <EmailHeader />
      <Section style={content}>
        <Section style={alertBanner}>
          <Text style={alertText}>🔔 NEW WEBSITE ENQUIRY</Text>
        </Section>

        <Text style={heading}>Lead Details</Text>

        <Section style={detailsCard}>
          <Section style={detailRow}>
            <Text style={detailLabel}>Name</Text>
            <Text style={detailValue}>{fullName}</Text>
          </Section>
          <Hr style={rowDivider} />
          <Section style={detailRow}>
            <Text style={detailLabel}>Company</Text>
            <Text style={detailValue}>{companyName || 'Not provided'}</Text>
          </Section>
          <Hr style={rowDivider} />
          <Section style={detailRow}>
            <Text style={detailLabel}>Email</Text>
            <Text style={detailValueHighlight}>{email}</Text>
          </Section>
          <Hr style={rowDivider} />
          <Section style={detailRow}>
            <Text style={detailLabel}>Phone</Text>
            <Text style={detailValue}>{phone || 'Not provided'}</Text>
          </Section>
          <Hr style={rowDivider} />
          <Section style={detailRow}>
            <Text style={detailLabel}>Service</Text>
            <Text style={detailValueHighlight}>{service}</Text>
          </Section>
          <Hr style={rowDivider} />
          <Section style={detailRow}>
            <Text style={detailLabel}>Submitted</Text>
            <Text style={detailValue}>{new Date(submissionDate).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</Text>
          </Section>
        </Section>
        
        <Text style={subheading}>📝 Project Description & Requirements</Text>
        <Section style={requirementsBox}>
          <Text style={requirementsText}>{requirements || 'No additional details provided.'}</Text>
        </Section>
      </Section>
      <EmailFooter />
    </EmailLayout>
  );
};

export default NewLeadNotificationEmail;

const content = {
  padding: '0 40px 36px 40px',
};

const alertBanner = {
  backgroundColor: '#00bfff',
  padding: '12px 24px',
  margin: '0 -40px 28px -40px',
  textAlign: 'center' as const,
};

const alertText = {
  color: '#0a0d1a',
  fontSize: '13px',
  fontWeight: '800' as const,
  letterSpacing: '2px',
  margin: '0',
};

const heading = {
  color: '#ffffff',
  fontSize: '22px',
  fontWeight: '700' as const,
  margin: '0 0 16px 0',
  lineHeight: '28px',
};

const subheading = {
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '700' as const,
  margin: '28px 0 12px 0',
};

const detailsCard = {
  backgroundColor: '#1f2937',
  borderRadius: '8px',
  padding: '24px',
  margin: '0 0 24px 0',
  border: '1px solid #374151',
};

const detailRow = {
  margin: '0 0 16px 0',
};

const rowDivider = {
  borderTop: '1px solid #374151',
  margin: '0 0 16px 0',
};

const detailLabel = {
  color: '#9ca3af',
  fontSize: '12px',
  fontWeight: '600' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  margin: '0 0 4px 0',
};

const detailValue = {
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '500' as const,
  margin: '0',
};

const detailValueHighlight = {
  color: '#00bfff',
  fontSize: '16px',
  fontWeight: '600' as const,
  margin: '0',
};

const requirementsBox = {
  backgroundColor: '#111827',
  borderLeft: '4px solid #00bfff',
  padding: '16px',
  borderRadius: '4px',
  margin: '8px 0 0 0',
};

const requirementsText = {
  color: '#d1d5db',
  fontSize: '14px',
  lineHeight: '24px',
  whiteSpace: 'pre-wrap' as const,
};

const footer = {
  color: '#9ca3af',
  fontSize: '13px',
  margin: '32px 0 0 0',
  borderTop: '1px solid #374151',
  paddingTop: '16px',
};
