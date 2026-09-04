import * as React from 'react';
import { Section, Text, Heading } from '@react-email/components';
import { EmailLayout } from './components/email-layout';
import { EmailHeader } from './components/email-header';
import { EmailFooter } from './components/email-footer';
import { EmailButton } from './components/email-button';

interface TestimonialRequestEmailProps {
  fullName: string;
  reviewLink: string;
}

export default function TestimonialRequestEmail({
  fullName = 'Client Name',
  reviewLink = 'https://example.com/review',
}: TestimonialRequestEmailProps) {
  return (
    <EmailLayout preview="We value your feedback">
      <EmailHeader />
      <Section style={contentContainer}>
        <Heading style={heading}>We Value Your Feedback</Heading>
        <Text style={text}>Hi {fullName},</Text>
        <Text style={text}>
          Following the successful launch of your project, we would greatly appreciate it if you could take a few moments to share your experience working with Logic Intelligence Technologies.
        </Text>
        <Text style={text}>
          Client feedback is essential to our continuous improvement and helps us maintain the high standards we strive for.
        </Text>
        <Section style={buttonContainer}>
          <EmailButton href={reviewLink}>
            Leave a Review
          </EmailButton>
        </Section>
        <Text style={text}>
          Thank you once again for choosing us as your technology partner.
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
