import { Text, Section, Link, Hr } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/email-layout';
import { EmailHeader } from './components/email-header';
import { EmailFooter } from './components/email-footer';
import { EmailButton } from './components/email-button';

interface WeeklyRecognitionEmailProps {
  fullName: string;
  dashboardUrl: string;
}

export const WeeklyRecognitionEmail = ({
  fullName,
  dashboardUrl,
}: WeeklyRecognitionEmailProps) => {
  return (
    <EmailLayout preview="Checking in: Let's build something amazing">
      <EmailHeader />
      <Section style={content}>
        <Text style={greeting}>Hi {fullName},</Text>

        <Text style={heroText}>
          Let's Bring Your Ideas to Life!
        </Text>

        <Text style={paragraph}>
          We noticed you've been exploring what Logic Intelligence Technologies has to offer, but haven't taken the next step yet. We're reaching out to see how we can help you build, scale, and transform your digital presence.
        </Text>

        <Text style={paragraph}>
          Whether you have a fully fleshed-out idea or just a concept in mind, our expert team is ready to collaborate with you to create stunning and performant digital solutions.
        </Text>
        
        <Text style={paragraph}>
          Check out your dashboard to see our latest offerings and how we can add value to your projects.
        </Text>

        <Text style={paragraph}>
          <EmailButton href={dashboardUrl}>
            Visit Your Dashboard
          </EmailButton>
        </Text>

        <Hr style={divider} />

        <Text style={paragraph}>
          If you'd like to schedule a quick chat to discuss your specific needs or have any questions, feel free to reply directly to this email!
        </Text>

        <Section style={signatureBlock}>
          <Text style={signatureName}>Vikash Saravanan</Text>
          <Text style={signatureTitle}>Founder &amp; CEO</Text>
          <Text style={signatureCompany}>Logic Intelligence Technologies</Text>
          <Link
            href="https://www.logicintelligencetechnologies.in"
            style={signatureLink}
          >
            www.logicintelligencetechnologies.in
          </Link>
        </Section>
      </Section>
      <EmailFooter />
    </EmailLayout>
  );
};

export default WeeklyRecognitionEmail;

const content = {
  padding: '36px 40px',
};

const greeting = {
  color: '#111827',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 8px 0',
};

const heroText = {
  color: '#111827',
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

const divider = {
  borderTop: '1px solid #e5e7eb',
  margin: '28px 0',
};

const signatureBlock = {
  borderLeft: '3px solid #2563eb',
  paddingLeft: '16px',
  margin: '0',
};

const signatureName = {
  color: '#111827',
  fontSize: '14px',
  fontWeight: '700' as const,
  margin: '0 0 4px 0',
  lineHeight: '18px',
};

const signatureTitle = {
  color: '#6b7280',
  fontSize: '13px',
  margin: '0 0 2px 0',
  lineHeight: '18px',
};

const signatureCompany = {
  color: '#6b7280',
  fontSize: '13px',
  margin: '0 0 4px 0',
  lineHeight: '18px',
};

const signatureLink = {
  color: '#2563eb',
  fontSize: '13px',
  textDecoration: 'underline',
};
