import { Section, Text, Link, Hr } from '@react-email/components';
import * as React from 'react';

export const EmailFooter = () => {
  return (
    <Section style={footer}>
      <Hr style={topDivider} />
      <Text style={companyLine}>
        Logic Intelligence Technologies Pvt. Ltd.
      </Text>
      <Text style={addressLine}>
        Coimbatore, Tamil Nadu, India
      </Text>
      <Section style={linksRow}>
        <Link href="https://www.logicintelligencetechnologies.in" style={footerLink}>
          Website
        </Link>
        <Text style={separator}>  •  </Text>
        <Link href="https://www.logicintelligencetechnologies.in/privacy" style={footerLink}>
          Privacy
        </Link>
        <Text style={separator}>  •  </Text>
        <Link href="https://www.logicintelligencetechnologies.in/terms" style={footerLink}>
          Terms
        </Link>
      </Section>
      <Text style={contactLine}>
        ✉️ contact@logicintelligencetechnologies.in  |  📞 +91 93428 77474
      </Text>
      <Text style={copyright}>
        © {new Date().getFullYear()} Logic Intelligence Technologies. All rights reserved.
      </Text>
    </Section>
  );
};

const footer = {
  padding: '24px 40px 32px 40px',
  backgroundColor: '#0a0d1a',
  textAlign: 'center' as const,
};

const topDivider = {
  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  margin: '0 0 20px 0',
};

const companyLine = {
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: '600' as const,
  margin: '0 0 4px 0',
  letterSpacing: '0.5px',
};

const addressLine = {
  color: 'rgba(255, 255, 255, 0.5)',
  fontSize: '12px',
  margin: '0 0 16px 0',
};

const linksRow = {
  textAlign: 'center' as const,
  margin: '0 0 12px 0',
};

const footerLink = {
  color: '#00bfff',
  fontSize: '12px',
  textDecoration: 'none',
  fontWeight: '500' as const,
};

const separator = {
  color: 'rgba(255, 255, 255, 0.3)',
  fontSize: '12px',
  display: 'inline' as const,
  margin: '0',
};

const contactLine = {
  color: 'rgba(255, 255, 255, 0.5)',
  fontSize: '11px',
  margin: '0 0 12px 0',
};

const copyright = {
  color: 'rgba(255, 255, 255, 0.3)',
  fontSize: '10px',
  margin: '0',
};
