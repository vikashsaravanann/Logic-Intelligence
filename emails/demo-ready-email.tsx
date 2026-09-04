import * as React from 'react';
import { Section, Text } from '@react-email/components';
import { EmailLayout } from './components/email-layout';
import { EmailHeader } from './components/email-header';
import { EmailFooter } from './components/email-footer';
import { EmailButton } from './components/email-button';

interface Props {
  fullName: string;
  demoUrl: string;
}

export default function DemoReadyEmail({ fullName = 'Valued Client', demoUrl = '#' }: Props) {
  return (
    <EmailLayout preview="Your prototype is ready for review">
      <EmailHeader />
      <Section style={contentSection}>
        <Text style={heading}>Prototype Ready</Text>
        <Text style={paragraph}>Hello {fullName},</Text>
        <Text style={paragraph}>
          We are pleased to inform you that your prototype is now ready for review. Our team has carefully crafted the designs according to the requirements discussed.
        </Text>
        <Text style={paragraph}>
          Please take a moment to review the prototype and let us know your thoughts. You can access it securely using the link below:
        </Text>
        <Section style={buttonContainer}>
          <EmailButton href={demoUrl}>View Prototype</EmailButton>
        </Section>
        <Text style={paragraph}>
          We are available to schedule a walkthrough at your convenience.
        </Text>
        <Text style={signature}>
          Best regards,<br />
          The Logic Intelligence Technologies Team
        </Text>
      </Section>
      <EmailFooter />
    </EmailLayout>
  );
}

const contentSection = {
  padding: '40px 40px 32px 40px',
};

const heading = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#111827',
  margin: '0 0 24px 0',
};

const paragraph = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#374151',
  margin: '0 0 16px 0',
};

const buttonContainer = {
  margin: '24px 0',
};

const signature = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#374151',
  margin: '24px 0 0 0',
};
