import * as React from 'react';
import { Section, Text } from '@react-email/components';
import { EmailLayout } from './components/email-layout';
import { EmailHeader } from './components/email-header';
import { EmailFooter } from './components/email-footer';

interface Props {
  fullName: string;
  projectName: string;
}

export default function ProjectKickoffEmail({ fullName = 'Valued Client', projectName = 'Your Project' }: Props) {
  return (
    <EmailLayout preview={`Welcome to the kickoff for ${projectName}`}>
      <EmailHeader />
      <Section style={contentSection}>
        <Text style={heading}>Project Kickoff</Text>
        <Text style={paragraph}>Hello {fullName},</Text>
        <Text style={paragraph}>
          Welcome to the kickoff for <strong>{projectName}</strong>. We are thrilled to officially begin our collaboration.
        </Text>
        <Text style={paragraph}>
          Over the next few days, our team will be setting up the foundational environment. To ensure a smooth start, our immediate next steps are:
        </Text>
        <ul style={list}>
          <li style={listItem}>Gathering your brand assets and initial content.</li>
          <li style={listItem}>Setting up the development and staging environments.</li>
          <li style={listItem}>Finalizing the initial project timeline and milestones.</li>
        </ul>
        <Text style={paragraph}>
          We will be in touch shortly to align on any remaining details and schedule our formal kickoff meeting.
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

const list = {
  margin: '0 0 24px 0',
  paddingLeft: '24px',
};

const listItem = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#374151',
  marginBottom: '8px',
};

const signature = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#374151',
  margin: '24px 0 0 0',
};
