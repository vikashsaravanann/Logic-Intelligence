import * as React from 'react';
import { Section, Text } from '@react-email/components';
import { EmailLayout } from './components/email-layout';
import { EmailHeader } from './components/email-header';
import { EmailFooter } from './components/email-footer';
import { EmailButton } from './components/email-button';

interface Props {
  fullName: string;
  proposalUrl: string;
}

export default function ProposalSentEmail({ fullName = 'Valued Client', proposalUrl = '#' }: Props) {
  return (
    <EmailLayout preview="Your project proposal is ready">
      <EmailHeader />
      <Section style={contentSection}>
        <Text style={heading}>Project Proposal</Text>
        <Text style={paragraph}>Hello {fullName},</Text>
        <Text style={paragraph}>
          Thank you for exploring a partnership with us. We have prepared a comprehensive Statement of Work (SOW) and proposal detailing the scope, timeline, and investment for your upcoming project.
        </Text>
        <Text style={paragraph}>
          You can review the full document here:
        </Text>
        <Section style={buttonContainer}>
          <EmailButton href={proposalUrl}>View Proposal</EmailButton>
        </Section>
        <Text style={paragraph}>
          Please let us know if you have any questions or require revisions. Once you are aligned with the proposal, we can proceed to the next steps.
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
