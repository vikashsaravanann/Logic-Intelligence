import { Text, Section, Hr } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/email-layout';
import { EmailHeader } from './components/email-header';
import { EmailFooter } from './components/email-footer';

interface ChecklistSubmissionEmailProps {
  email: string;
  submissionDate: string;
  answers: string[];
}

export const ChecklistSubmissionEmail = ({ 
  email, 
  submissionDate, 
  answers 
}: ChecklistSubmissionEmailProps) => {
  return (
    <EmailLayout preview={`New Checklist Submission from ${email}`}>
      <EmailHeader />
      <Section style={content}>
        <Section style={alertBanner}>
          <Text style={alertText}>📋 NEW CHECKLIST SUBMISSION</Text>
        </Section>

        <Section style={detailsCard}>
          <Section style={detailRow}>
            <Text style={detailLabel}>Email</Text>
            <Text style={detailValueHighlight}>{email}</Text>
          </Section>
          <Hr style={rowDivider} />
          <Section style={detailRow}>
            <Text style={detailLabel}>Submitted</Text>
            <Text style={detailValue}>
              {new Date(submissionDate).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </Text>
          </Section>
        </Section>
        
        <Text style={subheading}>Answers</Text>
        <Section style={answersCard}>
          {answers.map((answer, index) => (
            <React.Fragment key={index}>
              {index > 0 && <Hr style={rowDivider} />}
              <Section style={answerRow}>
                <Text style={questionNumber}>Question {index + 1}</Text>
                <Text style={answerText}>{answer || 'Skipped'}</Text>
              </Section>
            </React.Fragment>
          ))}
        </Section>
      </Section>
      <EmailFooter />
    </EmailLayout>
  );
};

export default ChecklistSubmissionEmail;

const content = {
  padding: '0 40px 36px 40px',
};

const alertBanner = {
  backgroundColor: '#8b5cf6',
  padding: '12px 24px',
  margin: '0 -40px 28px -40px',
  textAlign: 'center' as const,
};

const alertText = {
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: '800' as const,
  letterSpacing: '2px',
  margin: '0',
};

const subheading = {
  color: '#0a0d1a',
  fontSize: '16px',
  fontWeight: '700' as const,
  margin: '28px 0 12px 0',
};

const detailsCard = {
  backgroundColor: '#f8fafc',
  borderRadius: '12px',
  border: '1px solid #e5e7eb',
  padding: '4px 20px',
};

const detailRow = {
  padding: '4px 0',
};

const rowDivider = {
  borderTop: '1px solid #e5e7eb',
  margin: '0',
};

const detailLabel = {
  color: '#6b7280',
  fontSize: '12px',
  fontWeight: '600' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 2px 0',
  lineHeight: '16px',
};

const detailValue = {
  color: '#1a1a2e',
  fontSize: '15px',
  fontWeight: '500' as const,
  margin: '0',
  lineHeight: '22px',
};

const detailValueHighlight = {
  color: '#00bfff',
  fontSize: '15px',
  fontWeight: '600' as const,
  margin: '0',
  lineHeight: '22px',
};

const answersCard = {
  backgroundColor: '#f8fafc',
  borderRadius: '12px',
  border: '1px solid #e5e7eb',
  padding: '4px 20px',
  borderLeft: '4px solid #8b5cf6',
};

const answerRow = {
  padding: '4px 0',
};

const questionNumber = {
  color: '#8b5cf6',
  fontSize: '11px',
  fontWeight: '700' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 2px 0',
  lineHeight: '14px',
};

const answerText = {
  color: '#1a1a2e',
  fontSize: '14px',
  margin: '0',
  lineHeight: '22px',
};
