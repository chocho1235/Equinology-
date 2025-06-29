import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import FlagCarousel from '../components/FlagCarousel';
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
    <div className="bg-[#0A0A0A]">
      <Hero isMobile={isMobile} />
      <Services />
      <OngoingProjects />
      <FlagCarousel />
      <Facilities isMobile={isMobile} />
      <Testimonials isMobile={isMobile} />
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