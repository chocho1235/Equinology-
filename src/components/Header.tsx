import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import logo from "../images/logo.webp";
import { useAnimation } from '../contexts/AnimationContext';
import HamburgerButton from './Sidebar/HamburgerButton';
import Sidebar from './Sidebar/Sidebar';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); 
  const location = useLocation(); 
  
  // Use useTransform for more efficient scroll calculations
  const { scrollY } = useScroll();
  const bgOpacityValue = useTransform(scrollY, [0, 300], [0.7, 0.95]);
  const blurValue = useTransform(scrollY, [0, 300], [4, 12]);
  const shadowOpacity = useTransform(scrollY, [0, 300], [0, 0.2]);

  // Convert opacity to rgba string
  const bgOpacity = useTransform(bgOpacityValue, (latest) => `rgba(0, 0, 0, ${latest})`);

  const { disableAnimations } = useAnimation();

  const [pendingNavigation, setPendingNavigation] = useState<null | (() => void)>(null);

  // Memoize navigation handlers
  const handleNavigation = useCallback((sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.pathname, navigate]);

  // Memoize nav items to prevent unnecessary re-renders
  const navItems = useMemo(() => [
    { 
      label: "Services", 
      action: () => {
        navigate("/services");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } 
    },
    { label: "Testimonials", action: () => handleNavigation("testimonials") },
    { 
      label: "Articles", 
      action: () => {
        navigate("/articles");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } 
    },
  ], [handleNavigation, navigate]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto"; 
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  return (
    <div className="motion-container">
      <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {disableAnimations ? (
        <header className="fixed w-full z-50 transition-all duration-300" style={{
          backgroundColor: `rgba(0, 0, 0, ${bgOpacityValue.get()})`,
          backdropFilter: `blur(${blurValue.get()}px)`,
          boxShadow: shadowOpacity.get() > 0.1 ? `0 4px 30px rgba(0, 0, 0, ${shadowOpacity.get()})` : 'none'
        }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
            <a href="/" className="flex items-center">
              <img src={logo} className="w-40 h-auto drop-shadow-lg" alt="Equinology Digital Agency logo" />
            </a>

            <div className="hidden md:flex space-x-6">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="text-white text-md font-medium tracking-wide hover:text-[#3CAAFF] transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] px-6 py-2.5 rounded-full text-sm font-medium shadow-md hover:shadow-lg hover:shadow-[#3CAAFF]/25 transition-all duration-300 text-[#0A0A0A]"
              onClick={() => navigate("/contact")}
            >
              Contact Us
              <ChevronRight className="inline-block ml-1 w-4 h-4" />
            </motion.button>

            <HamburgerButton open={isSidebarOpen} setOpen={setIsSidebarOpen} className="md:hidden" />
          </div>
        </header>
      ) : (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed w-full z-50 transition-all duration-300"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${bgOpacityValue.get()})`,
            backdropFilter: `blur(${blurValue.get()}px)`,
            boxShadow: shadowOpacity.get() > 0.1 ? `0 4px 30px rgba(0, 0, 0, ${shadowOpacity.get()})` : 'none'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
            <a href="/" className="flex items-center">
              <img src={logo} className="w-40 h-auto drop-shadow-lg" alt="Equinology Digital Agency logo" />
            </a>

            <div className="hidden md:flex space-x-6">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="text-white text-md font-medium tracking-wide hover:text-[#3CAAFF] transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] px-6 py-2.5 rounded-full text-sm font-medium shadow-md hover:shadow-lg hover:shadow-[#3CAAFF]/25 transition-all duration-300 text-[#0A0A0A]"
              onClick={() => navigate("/contact")}
            >
              Contact Us
              <ChevronRight className="inline-block ml-1 w-4 h-4" />
            </motion.button>

            <HamburgerButton open={isSidebarOpen} setOpen={setIsSidebarOpen} className="md:hidden" />
          </div>
        </motion.header>
      )}
    </div>
  );
};

export default Header;
