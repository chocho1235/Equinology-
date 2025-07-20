import { useEffect, useRef } from 'react';

interface ServicesHeroBackgroundProps {
  isMobile?: boolean;
}

const ServicesHeroBackground = ({ isMobile = false }: ServicesHeroBackgroundProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 bg-black pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ServicesHeroBackground; 