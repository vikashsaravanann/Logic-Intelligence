import { Link } from '@react-email/components';
import * as React from 'react';

interface EmailButtonProps {
  href: string;
  children: React.ReactNode;
}

export const EmailButton = ({ href, children }: EmailButtonProps) => {
  return (
    <Link style={link} href={href}>
      {children}
    </Link>
  );
};

const link = {
  color: '#2563eb',
  fontSize: '15px',
  textDecoration: 'underline',
  fontWeight: '500' as const,
};
