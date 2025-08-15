import React from 'react';

interface JobWiseLogoProps {
  className?: string;
  size?: number;
}

const JobWiseLogo: React.FC<JobWiseLogoProps> = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="barGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      
      {/* Outer circle with gradient border */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="transparent"
        stroke="url(#borderGradient)"
        strokeWidth="4"
      />
      
      {/* Bar chart elements */}
      <rect x="20" y="65" width="6" height="15" fill="url(#barGradient)" rx="1" />
      <rect x="28" y="55" width="6" height="25" fill="url(#barGradient)" rx="1" />
      <rect x="36" y="45" width="6" height="35" fill="url(#barGradient)" rx="1" />
      
      {/* Line chart elements */}
      <circle cx="22" cy="35" r="2.5" fill="#60A5FA" />
      <circle cx="32" cy="28" r="2.5" fill="#60A5FA" />
      <circle cx="42" cy="32" r="2.5" fill="#60A5FA" />
      <circle cx="52" cy="22" r="2.5" fill="#60A5FA" />
      
      {/* Line connections */}
      <path
        d="M22 35 L32 28 L42 32 L52 22"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* List/menu elements on the right */}
      <circle cx="72" cy="28" r="2" fill="#EC4899" />
      <rect x="76" y="26" width="8" height="1.5" fill="#EC4899" rx="0.75" />
      <rect x="76" y="29" width="6" height="1.5" fill="#EC4899" rx="0.75" />
      
      <circle cx="72" cy="38" r="2" fill="#EC4899" />
      <rect x="76" y="36" width="8" height="1.5" fill="#EC4899" rx="0.75" />
      <rect x="76" y="39" width="6" height="1.5" fill="#EC4899" rx="0.75" />
      
      <circle cx="72" cy="48" r="2" fill="#EC4899" />
      <rect x="76" y="46" width="8" height="1.5" fill="#EC4899" rx="0.75" />
      <rect x="76" y="49" width="6" height="1.5" fill="#EC4899" rx="0.75" />
    </svg>
  );
};

export default JobWiseLogo;
