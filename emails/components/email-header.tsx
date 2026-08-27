import { Section, Img, Text, Link, Hr } from '@react-email/components';
import * as React from 'react';

export const EmailHeader = () => {
  return (
    <Section style={header}>
      {/* Company Logo */}
      <Img
        src="https://www.logicintelligencetechnologies.in/logo.jpg"
        alt="Logic Intelligence Technologies"
        width="64"
        height="64"
        style={logo}
      />
      <Text style={companyName}>
        LOGIC INTELLIGENCE
      </Text>
      <Text style={companySubtext}>
        TECHNOLOGIES
      </Text>
      <Hr style={divider} />
      <Text style={tagline}>Where Logic Meets Innovation</Text>
    </Section>
  );
};

const header = {
  padding: '40px 40px 24px 40px',
  backgroundColor: '#0a0d1a',
  textAlign: 'center' as const,
  backgroundImage: 'linear-gradient(135deg, #0a0d1a 0%, #111827 50%, #0a0d1a 100%)',
};

const logo = {
  margin: '0 auto 16px auto',
  borderRadius: '50%',
  border: '2px solid rgba(0, 191, 255, 0.3)',
};

const companyName = {
  color: '#ffffff',
  fontSize: '22px',
  fontWeight: '700' as const,
  letterSpacing: '4px',
  margin: '0 0 0 0',
  lineHeight: '28px',
};

const companySubtext = {
  color: '#00bfff',
  fontSize: '14px',
  fontWeight: '600' as const,
  letterSpacing: '6px',
  margin: '0 0 16px 0',
  lineHeight: '20px',
};

const divider = {
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  margin: '0 60px 12px 60px',
};

const tagline = {
  color: 'rgba(255, 255, 255, 0.5)',
  fontSize: '11px',
  fontWeight: '500' as const,
  letterSpacing: '2px',
  margin: '0',
  textTransform: 'uppercase' as const,
};
