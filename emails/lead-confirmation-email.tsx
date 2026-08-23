import { Text, Section } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/email-layout';
import { EmailHeader } from './components/email-header';
import { EmailFooter } from './components/email-footer';

interface LeadConfirmationEmailProps {
  fullName: string;
  service: string;
}

export const LeadConfirmationEmail = ({ fullName, service }: LeadConfirmationEmailProps) => {
  return (
    <EmailLayout>
      <EmailHeader />
      <Section style={content}>
        <Text style={paragraph}>Hello {fullName},</Text>
        <Text style={paragraph}>
          Thank you for contacting Logic Intelligence Technologies.
        </Text>
        <Text style={paragraph}>
          We have received your enquiry regarding {service}. Our team will review your requirements and contact you shortly.
        </Text>
        <Text style={paragraph}>
          If you need to add more details, simply reply to this email.
        </Text>
      </Section>
      <EmailFooter />
    </EmailLayout>
  );
};

export default LeadConfirmationEmail;

const content = {
  padding: '20px',
};

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};
