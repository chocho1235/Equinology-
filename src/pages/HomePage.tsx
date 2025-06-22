import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import FlagCarousel from '../components/FlagCarousel';
import Facilities from '../components/Facilities';
import Testimonials from '../components/Testimonials';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  title: string;
  description: string;
  icon: ReactNode;
  index: number;
}

const HomePage = () => {
  return (
    <div className="bg-[#0A0A0A]">
      <Hero />
      <Services />
      <FlagCarousel />
      <Facilities />
      <Testimonials />
    </div>
  );
};

const Card = ({ title, description, icon, index }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative p-6 rounded-lg bg-[#111111] border border-gray-800 hover:border-blue-400/30 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-cyan-300/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-blue-400/10 flex items-center justify-center mb-4 group-hover:bg-blue-400/20 transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">
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