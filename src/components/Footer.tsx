import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Facebook } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Use Link for internal navigation
import logo from "../images/logo.webp";

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHashLink = to.startsWith('/#');
  const sectionId = isHashLink ? to.replace('/#', '') : null;

  const handleClick = (e: React.MouseEvent) => {
    if (isHashLink && sectionId) {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          section?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      } else {
        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // else: normal navigation
  };

  return (
    <li>
      <Link 
        to={to} 
        onClick={handleClick}
        className="text-[#777777] hover:text-[#AABBDD] transition-colors duration-200 text-sm relative group"
      >
        {children}
        <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#3CAAFF]/0 to-[#3CAAFF] group-hover:w-full transition-all duration-300 ease-out"></span>
      </Link>
    </li>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-[#ABABAB] pt-20 pb-10 mt-24 relative overflow-hidden footer-noise-bg">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#222222] to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
        >
          {/* Column 1: Brand & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-flex items-center mb-6 group">
              <img src={logo} className="w-64 h-auto drop-shadow-lg" alt="Logo" />
            </Link>
            <p className="text-[#777777] text-sm leading-relaxed">
              Expert web design services for businesses worldwide. Specialising in custom websites, equine sales platforms, and software solutions that combine our expertise with modern web design.
            </p>
          </div>

          {/* Column 2: Site Navigation */}
          <div>
            <h3 className="text-[#F5F5F7] font-medium mb-4 text-base tracking-wide">Navigation</h3>
            <ul className="space-y-3">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/#services">Services</FooterLink> {/* Assuming Services section has id="services" */}
              <FooterLink to="/#testimonials">Testimonials</FooterLink> {/* Assuming Testimonials section has id="testimonials" */}
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Column 3: Contact Info & Socials */}
          <div>
            <h3 className="text-[#F5F5F7] font-medium mb-4 text-base tracking-wide">Get In Touch</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="mailto:enquiries@equinology.co.uk" className="inline-flex items-center text-[#777777] hover:text-[#3CAAFF] transition-colors duration-200 text-sm">
                  <Mail className="w-4 h-4 mr-2" />
                  enquiries@equinology.co.uk
                </a>
              </li>
              <li>
                <a href="tel:+447493303857" className="inline-flex items-center text-[#777777] hover:text-[#3CAAFF] transition-colors duration-200 text-sm">
                  <Phone className="w-4 h-4 mr-2" />
                  +44 7493 303857
                </a>
              </li>
            </ul>
            {/* Social Media Links */}
            <h3 className="text-[#F5F5F7] font-medium mb-4 text-base tracking-wide">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/equinology.co.uk" 
                aria-label="Facebook" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#777777] hover:text-[#3CAAFF] transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-8 pt-8 border-t border-[#111111]/50 text-center text-xs text-[#555555]">
          <p>&copy; {currentYear} Equinology. All rights reserved.</p>
          {/* Optional: Add Privacy Policy / Terms links here */}
          {/* <p className="mt-2">
            <Link to="/privacy" className="hover:text-[#3CAAFF] transition-colors">Privacy Policy</Link> | 
            <Link to="/terms" className="hover:text-[#3CAAFF] transition-colors">Terms of Service</Link>
          </p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
