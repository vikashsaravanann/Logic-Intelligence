import * as React from 'react';
import { Section, Text, Heading } from '@react-email/components';
import { EmailLayout } from './components/email-layout';
import { EmailHeader } from './components/email-header';
import { EmailFooter } from './components/email-footer';
import { EmailButton } from './components/email-button';

interface ProjectDeliveredEmailProps {
  fullName: string;
  projectName: string;
  liveUrl: string;
}

export default function ProjectDeliveredEmail({
  fullName = 'Client Name',
  projectName = 'Your Project',
  liveUrl = 'https://example.com',
}: ProjectDeliveredEmailProps) {
  return (
    <EmailLayout preview={`Project Delivered: ${projectName} is now live`}>
      <EmailHeader />
      <Section style={contentContainer}>
        <Heading style={heading}>Project Delivered</Heading>
        <Text style={text}>Hi {fullName},</Text>
        <Text style={text}>
          We are pleased to announce that <strong>{projectName}</strong> has been successfully launched and is now live.
        </Text>
        <Text style={text}>
          As part of our handover process, we are transferring all relevant assets to you. This includes domain management, hosting credentials, and access to the full source code repositories. You will receive separate communications with these specific access details shortly.
        </Text>
        <Section style={buttonContainer}>
          <EmailButton href={liveUrl}>
            View Live Project
          </EmailButton>
        </Section>
        <Text style={text}>
          It has been a pleasure working on this project with you. Please let us know if you require any further assistance during this transition period.
        </Text>
        <Text style={signature}>
          Best regards,<br />
          Logic Intelligence Technologies
        </Text>
      </Section>
      <EmailFooter />
    </EmailLayout>
  );
}

const contentContainer = {
  padding: '40px',
};

const heading = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#111827',
  margin: '0 0 24px 0',
};

const text = {
  fontSize: '15px',
  color: '#374151',
  lineHeight: '24px',
  margin: '0 0 16px 0',
};

const buttonContainer = {
  margin: '32px 0',
};

const signature = {
  fontSize: '15px',
  color: '#374151',
  lineHeight: '24px',
  margin: '32px 0 0 0',
};
