import React from 'react';

interface ShieldCheckIconProps {
  width?: number;
  height?: number;
  className?: string;
  shieldColor?: string;
  checkColor?: string;
}

export const ShieldCheckIcon: React.FC<ShieldCheckIconProps> = ({
  width = 24,
  height = 24,
  className = '',
  shieldColor = '#4f46e5', // Indigo/purple color
  checkColor = '#ffffff', // White color
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      width={width} 
      height={height}
      className={className}
    >
      <path 
        fill={shieldColor} 
        d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
      />
      <path 
        fill={checkColor} 
        d="M10.75 13.75l-2.5-2.5-1.25 1.25 3.25 3.75 8-8-1.25-1.25-6.75 6.75z"
      />
    </svg>
  );
};

export default ShieldCheckIcon;