import { Section, Text } from '@react-email/components';
import * as React from 'react';

export const EmailFooter = () => {
  return (
    <Section style={footer}>
      <Text style={footerText}>
        Logic Intelligence Technologies Pvt. Ltd.<br />
        Coimbatore, Tamil Nadu, India<br />
        logicwithvikash@gmail.com | +91 93428 77474
      </Text>
    </Section>
  );
};

const footer = {
  padding: '20px',
  backgroundColor: '#f6f9fc',
  textAlign: 'center' as const,
  borderTop: '1px solid #e6ebf1',
};

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};
