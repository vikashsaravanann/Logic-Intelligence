import { Section, Img } from '@react-email/components';
import * as React from 'react';

const LOGO_URL = 'https://www.logicintelligencetechnologies.in/assets/logo.jpg';

export const EmailHeader = () => {
  return (
    <Section style={header}>
      <Img
        src={LOGO_URL}
        alt="Logic Intelligence Technologies"
        width="56"
        height="56"
        style={logo}
      />
    </Section>
  );
};

const header = {
  padding: '32px 40px 24px 40px',
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e5e7eb',
};

const logo = {
  display: 'block',
  borderRadius: '50%',
  margin: '0',
};
