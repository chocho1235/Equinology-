import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';

interface SidebarNavProps {
  onClose: () => void;
}

const navLinks = [
  { label: 'Services', path: '/services' },
  { label: 'Testimonials', path: '/#testimonials' },
  { label: 'Articles', path: '/articles' },
];

const SidebarNav: React.FC<SidebarNavProps> = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    onClose();
    if (path.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(path.replace('/#', ''));
        section?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-12">
        <span className="text-2xl font-bold text-white">Menu</span>
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#3CAAFF]/30 transition-all duration-200"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>
      <ul className="flex-1 flex flex-col gap-6">
        {navLinks.map(link => (
          <li key={link.label}>
            <button
              onClick={() => handleNav(link.path)}
              className={`w-full flex items-center justify-between text-left px-4 py-4 rounded-xl text-lg font-medium transition-all duration-200
                ${location.pathname === link.path ? 'bg-[#3CAAFF]/10 text-[#3CAAFF]' : 'text-white hover:bg-[#3CAAFF]/5'}`}
            >
              <span>{link.label}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => { onClose(); navigate('/contact'); }}
        className="mt-10 w-full bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] px-6 py-4 rounded-2xl text-lg font-medium shadow-lg hover:shadow-xl hover:shadow-[#3CAAFF]/25 transition-all duration-300 text-[#0A0A0A] group flex items-center justify-center"
      >
        Contact Us
        <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </nav>
  );
};

export default SidebarNav; 