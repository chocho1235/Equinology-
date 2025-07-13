import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { PenTool, Layout, Compass, Lightbulb, Ruler, Users, Sparkles } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import React from 'react';
import { useAnimation } from '../contexts/AnimationContext';

// Define types for AnimatedOrb props
interface AnimatedOrbProps {
  style?: React.CSSProperties;
  customAnimation?: { [key: string]: any }; // More specific type for animation object
  className?: string;
  parallaxValue?: number | MotionValue<number>; // Allow MotionValue type
}

// Reusable AnimatedOrb component with subtle animations and smooth parallax.
const AnimatedOrb: React.FC<AnimatedOrbProps> = ({ style, customAnimation, className, parallaxValue = 0 }) => {
  return (
    <motion.div
      className={`absolute rounded-full filter blur-[100px] ${className}`}
      animate={customAnimation}
      transition={{
        duration: 15,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "linear",
      }}
      style={{ ...style, y: parallaxValue }}
    />
  );
};

const getMobileAnimationConfig = (isMobile: boolean) => ({
  initial: { opacity: 0, y: isMobile ? 10 : 20 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: isMobile ? 0.4 : 0.7,
      ease: "easeOut"
    }
  },
  viewport: { once: true, margin: isMobile ? "-40px" : "-80px" }
});

const Services = () => {
  const { isMobile, isReducedMotion } = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animation config based on device
  const animationConfig = getMobileAnimationConfig(isMobile);

  // Services array for your content.
  const services = [
    {
      icon: <PenTool className="w-10 h-10 text-[#3CAAFF]" />,
      title: "Web Design",
      description: "We specialise in web design. Our personal knowledge allows us to help build your perfect website tailored to your specific needs.",
    },
    {
      icon: <Layout className="w-10 h-10 text-[#3CAAFF]" />,
      title: "Software Development",
      description: "We offer specialist websites and also create specific software that reflects real-world knowledge to support your business.",
    },
    {
      icon: <Compass className="w-10 h-10 text-[#3CAAFF]" />,
      title: "Detailed Planning",
      description: "Our in depth planning turns your vision into reality. We carefully map each step, from inspiring concepts to precise timelines, giving you a clear path to success.",
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-[#3CAAFF]" />,
      title: "Full Transparency",
      description: "We provide clear, upfront pricing with no hidden fees or confusing technical jargon. You get complete peace of mind.",
    },
    {
      icon: <Ruler className="w-10 h-10 text-[#3CAAFF]" />,
      title: "Personal Touch",
      description: "Your business deserves a bespoke solution. We handcraft every aspect of your site. No pre made templates, just design uniquely tailored to you.",
    },
    {
      icon: <Users className="w-10 h-10 text-[#3CAAFF]" />,
      title: "Feedback",
      description: "Our discussions are straightforward and realistic. We say 'no' as openly as we say 'yes'. Expect honest feedback and clear guidance.",
    },
  ];

  const [showCards, setShowCards] = useState(isReducedMotion);
  useEffect(() => {
    if (!isReducedMotion) {
      const timeout = setTimeout(() => setShowCards(true), 100);
      return () => clearTimeout(timeout);
    }
  }, [isReducedMotion]);

  return (
    <section id="services" className="relative py-32 overflow-hidden" ref={containerRef}>

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#111111]/80 to-[#111111]/90 backdrop-blur-xl border border-[#3CAAFF]/30 shadow-[0_0_30px_rgba(60,170,255,0.1)] mb-12"
          >
            <Sparkles className="w-6 h-6 text-[#3CAAFF]" />
            <span className="text-white/90 font-semibold text-base">What We Offer</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl lg:text-5xl font-bold mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent">
              Our Services
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-[#B8BCC4] max-w-4xl mx-auto leading-relaxed"
          >
            We offer an extensive range of design and personalised services tailored to the unique needs of every individual industry. From web design to construction, we have it covered.
          </motion.p>
        </motion.div>

        {/* Enhanced Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#111111]/60 to-[#111111]/40 backdrop-blur-sm rounded-3xl border border-[#3CAAFF]/20 group-hover:border-[#3CAAFF]/50 transition-all duration-300 shadow-lg shadow-black/20" />
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3CAAFF]/5 to-[#00E0FF]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm" />
              
              {/* Card Content */}
              <div className="relative p-8 space-y-6">
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3CAAFF]/10 to-[#00E0FF]/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  {service.icon}
                </motion.div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-white group-hover:text-[#3CAAFF] transition-colors duration-300">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-[#B8BCC4] leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;