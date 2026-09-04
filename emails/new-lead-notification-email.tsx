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
        <Text style={alertBannerText}>🔔 NEW WEBSITE ENQUIRY</Text>

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
        
        <Text style={subheading}>📝 Project Description &amp; Requirements</Text>
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
  padding: '32px 40px 36px 40px',
};

const alertBannerText = {
  color: '#111827',
  fontSize: '14px',
  fontWeight: '700' as const,
  letterSpacing: '1px',
  margin: '0 0 16px 0',
  textTransform: 'uppercase' as const,
};

const heading = {
  color: '#111827',
  fontSize: '20px',
  fontWeight: '700' as const,
  margin: '0 0 16px 0',
  lineHeight: '28px',
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
  margin: '0 0 8px 0',
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

const requirementsBox = {
  backgroundColor: '#f9fafb',
  borderLeft: '3px solid #6b7280',
  padding: '12px 16px',
  borderRadius: '4px',
  margin: '0',
};

const requirementsText = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '24px',
  whiteSpace: 'pre-wrap' as const,
  margin: '0',
};
