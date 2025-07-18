import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import FlagCarousel from '../components/FlagCarousel';
import BrochureSection from '../components/BrochureSection';
import Facilities from '../components/Facilities';
import Testimonials from '../components/Testimonials';
import OngoingProjects from '../components/OngoingProjects';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';

interface CardProps {
  title: string;
  description: string;
  icon: ReactNode;
  index: number;
}

const HomePage = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  return (
    <div className="bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A] to-[#0F0F0F] relative">
      {/* Global Enhanced Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(60,170,255,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,224,255,0.05)_0%,transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(60,170,255,0.03)_0%,transparent_40%)]" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMDAgMEwwIDEwMCIgc3Ryb2tlPSJyZ2JhKDYwLDE3MCwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMC41Ii8+CjxwYXRoIGQ9Ik0wIDBMMTAwIDEwMCIgc3Ryb2tlPSJyZ2JhKDYwLDE3MCwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMC41Ii8+CjwvnZnPgo=')] opacity-20" />
      </div>
      
      {/* Content with relative positioning */}
      <div className="relative z-10">
        <Hero isMobile={isMobile} />
        <Services />
        <OngoingProjects />
        <FlagCarousel />
        <BrochureSection />
        <Facilities isMobile={isMobile} />
        <Testimonials isMobile={isMobile} />
      </div>
    </div>
  );
};

const Card = ({ title, description, icon, index }: CardProps) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: isMobile ? 0.3 : 0.5,
        delay: isMobile ? 0 : index * 0.1,
        ease: "easeOut"
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative p-6 rounded-lg bg-[#111111] border border-gray-800 hover:border-blue-400/30 transition-all duration-300"
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-blue-400/5 to-cyan-300/5 rounded-lg transition-opacity duration-300 ${
        isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`} />
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300 ${
          isMobile ? 'bg-blue-400/20' : 'bg-blue-400/10 group-hover:bg-blue-400/20'
        }`}>
          {icon}
        </div>
        <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
          isMobile ? 'text-blue-400' : 'text-white group-hover:text-blue-400'
        }`}>
          {title}
        </h3>
        <p className="text-gray-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default HomePage; 