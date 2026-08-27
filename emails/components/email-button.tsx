import { Button } from '@react-email/components';
import * as React from 'react';

interface EmailButtonProps {
  href: string;
  children: React.ReactNode;
}

export const EmailButton = ({ href, children }: EmailButtonProps) => {
  return (
    <Button style={button} href={href}>
      {children}
    </Button>
  );
};

const button = {
  backgroundColor: '#00bfff',
  borderRadius: '8px',
  color: '#0a0d1a',
  fontSize: '15px',
  fontWeight: '700' as const,
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block' as const,
  padding: '14px 32px',
  margin: '8px 0',
  letterSpacing: '0.5px',
};
