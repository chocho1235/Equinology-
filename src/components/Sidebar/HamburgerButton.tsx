import React from 'react';

interface HamburgerButtonProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ open, setOpen, className = '' }) => (
  <button
    aria-label={open ? 'Close menu' : 'Open menu'}
    aria-expanded={open}
    aria-controls="mobile-sidebar"
    onClick={() => setOpen(!open)}
    className={`focus:outline-none focus:ring-2 focus:ring-[#3CAAFF] p-2 rounded-md transition-colors duration-200 bg-black/60 border border-white/10 hover:border-[#3CAAFF]/30 ${className}`}
    type="button"
  >
    <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
    <div className="relative w-7 h-7 flex flex-col justify-center items-center">
      <span
        className={`block absolute h-0.5 w-6 bg-white rounded transition-all duration-300 ${open ? 'rotate-45 top-3.5' : 'top-2'}`}
      />
      <span
        className={`block absolute h-0.5 w-6 bg-white rounded transition-all duration-300 ${open ? 'opacity-0' : 'top-3.5'}`}
      />
      <span
        className={`block absolute h-0.5 w-6 bg-white rounded transition-all duration-300 ${open ? '-rotate-45 top-3.5' : 'top-5'}`}
      />
    </div>
  </button>
);

export default HamburgerButton; 