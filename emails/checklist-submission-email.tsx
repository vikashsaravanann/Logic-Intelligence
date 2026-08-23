import { Text, Section } from '@react-email/components';
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
    <EmailLayout>
      <EmailHeader />
      <Section style={content}>
        <Text style={heading}>New Checklist Submission</Text>
        
        <Section style={detailsSection}>
          <Text style={detailItem}><strong>Email:</strong> {email}</Text>
          <Text style={detailItem}><strong>Submitted:</strong> {submissionDate}</Text>
        </Section>
        
        <Text style={subheading}>Answers:</Text>
        <Section style={answersBox}>
          {answers.map((answer, index) => (
            <Text key={index} style={answerItem}>
              <strong>Q{index + 1}:</strong> {answer || 'Skipped'}
            </Text>
          ))}
        </Section>
      </Section>
      <EmailFooter />
    </EmailLayout>
  );
};

export default ChecklistSubmissionEmail;

const content = {
  padding: '20px',
};

const heading = {
  color: '#0a0d1a',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const subheading = {
  color: '#0a0d1a',
  fontSize: '18px',
  fontWeight: 'bold',
  marginTop: '20px',
  marginBottom: '10px',
};

const detailsSection = {
  backgroundColor: '#f6f9fc',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '20px',
};

const detailItem = {
  margin: '8px 0',
  color: '#525f7f',
  fontSize: '14px',
};

const answersBox = {
  backgroundColor: '#f6f9fc',
  padding: '16px',
  borderRadius: '8px',
  borderLeft: '4px solid #00bfff',
};

const answerItem = {
  margin: '8px 0',
  color: '#525f7f',
  fontSize: '14px',
};
