import React from 'react';
import { ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const handleScroll = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl sm:text-6xl font-light text-white tracking-wide">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Web Design Experts
          </span>
        </h1>

        <div className="flex justify-center my-6">
          <button
            onClick={handleScroll}
            className="px-8 py-3 bg-transparent border border-blue-400/30 text-blue-300 rounded-full font-light tracking-wide group flex items-center justify-center gap-2"
          >
            Explore Our Services
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
         Specialising in custom websites, sales platforms, and software solutions for businesses worldwide. We combine industry expertise with modern web design.
        </p>
      </div>
    </section>
  );
};

export default HeroSection; 