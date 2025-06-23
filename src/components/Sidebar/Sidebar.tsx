import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import SidebarNav from './SidebarNav';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Focus trap and ESC close
  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement as HTMLElement;
      sidebarRef.current?.focus();
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        // Trap focus
        if (e.key === 'Tab' && sidebarRef.current) {
          const focusable = sidebarRef.current.querySelectorAll<HTMLElement>(
            'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
          );
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          } else if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        lastFocused.current?.focus();
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 z-40 transition-opacity duration-300"
        aria-hidden="true"
        onClick={onClose}
      />
      {/* Sidebar Drawer */}
      <div
        id="mobile-sidebar"
        ref={sidebarRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        className="fixed top-0 left-0 h-full w-[85vw] max-w-sm bg-gradient-to-br from-black/95 to-black/90 backdrop-blur-xl z-50 flex flex-col p-8 shadow-2xl border-r border-[#3CAAFF]/10 outline-none transition-transform duration-300 transform translate-x-0"
        style={{
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        <SidebarNav onClose={onClose} />
      </div>
    </>,
    document.body
  );
};

export default Sidebar; 