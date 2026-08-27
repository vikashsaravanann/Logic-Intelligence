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
        <Text style={paragraph}>Hi {fullName},</Text>
        <Text style={paragraph}>
          Thank you for reaching out to Logic Intelligence Technologies!
        </Text>
        <Text style={paragraph}>
          This is a quick automated message to confirm that we have successfully received your form submission. Our engineering and strategy team is already reviewing your details.
        </Text>
        <Text style={paragraph}>
          <strong>When will you hear from us?</strong> We review all inquiries carefully and will get back to you personally within the next 24 hours with the next steps.
        </Text>
        <Text style={paragraph}>
          In the meantime, feel free to check out our latest work on our website, or reply directly to this email if you need to add any more details to your request.
        </Text>
        <Text style={paragraph}>
          Talk to you very soon!
        </Text>
        <Text style={paragraph}>
          Best regards,<br />
          The Team at Logic Intelligence Technologies<br />
          ✉️ contact@logicintelligencetechnologies.in<br />
          🌐 www.logicintelligencetechnologies.in
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
