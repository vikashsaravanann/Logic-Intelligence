import { Section, Img, Text } from '@react-email/components';
import * as React from 'react';

export const EmailHeader = () => {
  return (
    <Section style={header}>
      {/* We use a stable logo if available, else text fallback */}
      <Text style={logoText}>LOGIC INTELLIGENCE TECHNOLOGIES</Text>
    </Section>
  );
};

const header = {
  padding: '20px',
  backgroundColor: '#0a0d1a',
  textAlign: 'center' as const,
};

const logoText = {
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: 'bold',
  letterSpacing: '2px',
  margin: '0',
};
