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
  backgroundColor: '#00bfff', // Primary cyan color
  borderRadius: '4px',
  color: '#0a0d1a', // Dark text for contrast
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '12px',
};
