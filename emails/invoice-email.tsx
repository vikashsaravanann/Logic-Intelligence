import * as React from 'react';
import { Section, Text, Heading } from '@react-email/components';
import { EmailLayout } from './components/email-layout';
import { EmailHeader } from './components/email-header';
import { EmailFooter } from './components/email-footer';
import { EmailButton } from './components/email-button';

interface InvoiceEmailProps {
  fullName: string;
  invoiceNumber: string;
  amount: string;
  dueDate: string;
  paymentLink: string;
}

export default function InvoiceEmail({
  fullName = 'Client Name',
  invoiceNumber = 'INV-001',
  amount = '$0.00',
  dueDate = 'Jan 1, 2026',
  paymentLink = 'https://example.com/pay',
}: InvoiceEmailProps) {
  return (
    <EmailLayout preview={`Invoice ${invoiceNumber} is ready for payment`}>
      <EmailHeader />
      <Section style={contentContainer}>
        <Heading style={heading}>Invoice Due: {invoiceNumber}</Heading>
        <Text style={text}>Hi {fullName},</Text>
        <Text style={text}>
          Thank you for choosing Logic Intelligence Technologies. This is a notification that invoice <strong>{invoiceNumber}</strong> for <strong>{amount}</strong> is now due.
        </Text>
        <Text style={text}>
          Please note our payment terms are Net 15/30. We kindly request that you complete the payment by <strong>{dueDate}</strong>.
        </Text>
        <Section style={buttonContainer}>
          <EmailButton href={paymentLink}>
            Pay Invoice
          </EmailButton>
        </Section>
        <Text style={text}>
          If you have any questions, please reply directly to this email.
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
