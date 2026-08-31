import React from 'react';

export default function BrandLogo({ size = 28, className = "" }) {
  return (
    <img 
      src="/logo-nobg.png" 
      alt="Logic Intelligence Logo"
      className={className}
      style={{ width: size, height: size, objectFit: 'cover', borderRadius: '50%' }}
      onError={(e) => { e.target.src = '/logo-nobg.png'; e.target.style.display = 'none'; }}
    />
  );
}
