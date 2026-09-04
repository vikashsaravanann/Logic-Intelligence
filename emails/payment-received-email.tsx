import * as React from 'react';
import { Section, Text, Heading } from '@react-email/components';
import { EmailLayout } from './components/email-layout';
import { EmailHeader } from './components/email-header';
import { EmailFooter } from './components/email-footer';

interface PaymentReceivedEmailProps {
  fullName: string;
  amount: string;
  invoiceNumber: string;
}

export default function PaymentReceivedEmail({
  fullName = 'Client Name',
  amount = '$0.00',
  invoiceNumber = 'INV-001',
}: PaymentReceivedEmailProps) {
  return (
    <EmailLayout preview={`Payment Received for Invoice ${invoiceNumber}`}>
      <EmailHeader />
      <Section style={contentContainer}>
        <Heading style={heading}>Payment Received</Heading>
        <Text style={text}>Hi {fullName},</Text>
        <Text style={text}>
          Thank you for your payment. We have successfully received <strong>{amount}</strong> for invoice <strong>{invoiceNumber}</strong>.
        </Text>
        <Text style={text}>
          Please retain this email as your official receipt of payment.
        </Text>
        <Text style={text}>
          We appreciate your business and look forward to our continued partnership.
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

const signature = {
  fontSize: '15px',
  color: '#374151',
  lineHeight: '24px',
  margin: '32px 0 0 0',
};
