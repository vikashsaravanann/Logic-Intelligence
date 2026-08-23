import { Text, Section, Row, Column } from '@react-email/components';
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
    <EmailLayout>
      <EmailHeader />
      <Section style={content}>
        <Text style={heading}>New Website Enquiry</Text>
        
        <Section style={detailsSection}>
          <Text style={detailItem}><strong>Name:</strong> {fullName}</Text>
          <Text style={detailItem}><strong>Company:</strong> {companyName || 'Not provided'}</Text>
          <Text style={detailItem}><strong>Email:</strong> {email}</Text>
          <Text style={detailItem}><strong>Phone:</strong> {phone || 'Not provided'}</Text>
          <Text style={detailItem}><strong>Service:</strong> {service}</Text>
          <Text style={detailItem}><strong>Submitted:</strong> {submissionDate}</Text>
        </Section>
        
        <Text style={subheading}>Project Description & Requirements:</Text>
        <Section style={requirementsBox}>
          <Text style={requirementsText}>{requirements}</Text>
        </Section>
      </Section>
      <EmailFooter />
    </EmailLayout>
  );
};

export default NewLeadNotificationEmail;

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

const requirementsBox = {
  backgroundColor: '#f6f9fc',
  padding: '16px',
  borderRadius: '8px',
  borderLeft: '4px solid #00bfff',
};

const requirementsText = {
  margin: '0',
  color: '#525f7f',
  fontSize: '14px',
  whiteSpace: 'pre-wrap' as const,
};
