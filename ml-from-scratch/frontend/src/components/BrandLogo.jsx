import React from 'react';

export default function BrandLogo({ size = 28, className = "" }) {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logic AI Logo"
    >
      <defs>
        <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="50%" stopColor="#9B72CB" />
          <stop offset="100%" stopColor="#D96570" />
        </linearGradient>
      </defs>
      <path
        d="M50 12c-9 0-16 6-18 14-7 1-12 7-12 14 0 4 2 8 5 10-2 2-3 5-3 8 0 7 6 13 13 13 1 5 5 9 10 9h10c5 0 9-4 10-9 7 0 13-6 13-13 0-3-1-6-3-8 3-2 5-6 5-10 0-7-5-13-12-14-2-8-9-14-18-14z"
        stroke="url(#brainGrad)"
        strokeWidth="3"
        fill="none"
        strokeLinejoin="round"
      />
      <circle cx="55" cy="30" r="2.2" fill="#4285F4" />
      <circle cx="68" cy="38" r="2.2" fill="#9B72CB" />
      <circle cx="72" cy="52" r="2.2" fill="#9B72CB" />
      <circle cx="60" cy="62" r="2.2" fill="#D96570" />
      <circle cx="45" cy="68" r="2.2" fill="#D96570" />
      <path
        d="M55 30 L62 30 L62 38 L68 38 M68 38 L68 46 L72 46 L72 52 M60 62 L60 55 L68 55 M45 68 L45 58 L52 58 L52 48"
        stroke="url(#brainGrad)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
