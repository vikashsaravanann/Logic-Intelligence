import { Html, Head, Body, Container, Font } from '@react-email/components';
import * as React from 'react';

interface EmailLayoutProps {
  children: React.ReactNode;
  preview?: string;
}

export const EmailLayout = ({ children, preview }: EmailLayoutProps) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Body style={main}>
        <Container style={wrapper}>
          <Container style={container}>
            {children}
          </Container>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#0a0d1a',
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  padding: '40px 0',
};

const wrapper = {
  maxWidth: '600px',
  margin: '0 auto',
};

const container = {
  backgroundColor: '#111827',
  margin: '0 auto',
  borderRadius: '16px',
  overflow: 'hidden' as const,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  border: '1px solid #1f2937',
};
