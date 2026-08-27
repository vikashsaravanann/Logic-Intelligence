import { Text, Section, Link, Hr } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/email-layout';
import { EmailHeader } from './components/email-header';
import { EmailFooter } from './components/email-footer';
import { EmailButton } from './components/email-button';

interface LeadConfirmationEmailProps {
  fullName: string;
  service: string;
}

export const LeadConfirmationEmail = ({ fullName, service }: LeadConfirmationEmailProps) => {
  return (
    <EmailLayout preview="We received your request! — Logic Intelligence Technologies">
      <EmailHeader />
      <Section style={content}>
        <Text style={greeting}>Hi {fullName},</Text>

        <Text style={heroText}>
          We received your request! ✅
        </Text>

        <Text style={paragraph}>
          Thank you for reaching out to <strong>Logic Intelligence Technologies</strong>!
          This is a quick automated message to confirm that we have successfully 
          received your form submission regarding <strong>{service}</strong>.
        </Text>

        <Section style={highlightBox}>
          <Text style={highlightTitle}>📋 What happens next?</Text>
          <Text style={highlightText}>
            Our engineering and strategy team is already reviewing your details.
            We review all inquiries carefully and will get back to you 
            <strong> personally within the next 24 hours </strong>
            with the next steps.
          </Text>
        </Section>

        <Text style={paragraph}>
          In the meantime, feel free to check out our latest work on our website, 
          or reply directly to this email if you need to add any more details to 
          your request.
        </Text>

        <Section style={buttonContainer}>
          <EmailButton href="https://www.logicintelligencetechnologies.in/work">
            Explore Our Work →
          </EmailButton>
        </Section>

        <Hr style={divider} />

        <Text style={closingText}>
          Talk to you very soon! 🙌
        </Text>

        <Section style={signatureBlock}>
          <Text style={signatureName}>The Team at Logic Intelligence Technologies</Text>
          <Text style={signatureContact}>
            ✉️ contact@logicintelligencetechnologies.in
          </Text>
          <Link
            href="https://www.logicintelligencetechnologies.in"
            style={signatureLink}
          >
            🌐 www.logicintelligencetechnologies.in
          </Link>
        </Section>
      </Section>
      <EmailFooter />
    </EmailLayout>
  );
};

export default LeadConfirmationEmail;

const content = {
  padding: '36px 40px',
};

const greeting = {
  color: '#1a1a2e',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 8px 0',
};

const heroText = {
  color: '#0a0d1a',
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

const highlightBox = {
  backgroundColor: '#f0fdf4',
  border: '1px solid #bbf7d0',
  borderRadius: '12px',
  padding: '20px 24px',
  margin: '24px 0',
};

const highlightTitle = {
  color: '#0a0d1a',
  fontSize: '16px',
  fontWeight: '700' as const,
  margin: '0 0 8px 0',
};

const highlightText = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '8px 0 0 0',
};

const divider = {
  borderTop: '1px solid #e5e7eb',
  margin: '28px 0',
};

const closingText = {
  color: '#0a0d1a',
  fontSize: '16px',
  fontWeight: '600' as const,
  lineHeight: '26px',
  margin: '0 0 20px 0',
};

const signatureBlock = {
  borderLeft: '3px solid #00bfff',
  paddingLeft: '16px',
  margin: '0',
};

const signatureName = {
  color: '#0a0d1a',
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
  color: '#00bfff',
  fontSize: '13px',
  textDecoration: 'none',
};
