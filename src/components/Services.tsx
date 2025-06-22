import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { PenTool, Layout, Compass, Lightbulb, Ruler, Users } from 'lucide-react';
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
      title: "Equestrian Web Design",
      description: "As equestrian specialists, we speak your language. Our personal web design knowledge allows us to help build your perfect personal website tailored to your specific needs.",
    },
    {
      icon: <Layout className="w-10 h-10 text-[#3CAAFF]" />,
      title: "Software Development",
      description: "We don't just offer specialist websites—we also create specific software that reflects real horse-world knowledge to support your equestrian business.",
    },
    {
      icon: <Compass className="w-10 h-10 text-[#3CAAFF]" />,
      title: "Detailed Planning",
      description: "Our in-depth planning turns your equestrian vision into reality. We carefully map each step—from inspiring concepts to precise timelines—giving you a clear path to success.",
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-[#3CAAFF]" />,
      title: "Full Transparency",
      description: "We provide clear, upfront pricing with no hidden fees or confusing technical jargon—giving you complete peace of mind.",
    },
    {
      icon: <Ruler className="w-10 h-10 text-[#3CAAFF]" />,
      title: "Personal Touch",
      description: "Your equestrian business deserves a bespoke solution. We handcraft every aspect of your site—no pre-made templates, just design uniquely tailored to you.",
    },
    {
      icon: <Users className="w-10 h-10 text-[#3CAAFF]" />,
      title: "Feedback",
      description: "Our discussions are straightforward and realistic—we say 'no' as openly as we say 'yes'. Expect honest feedback and clear guidance.",
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
    <section id="services" className="relative py-20 sm:py-32 overflow-hidden bg-[#0A0A0A]" ref={containerRef}>
      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {isReducedMotion ? (
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
          ) : (
            <motion.h2
              {...animationConfig}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent">
                Our Services
              </span>
            </motion.h2>
          )}
          
          {!isReducedMotion && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: isMobile ? "-40px" : "-80px" }}
              transition={{ 
                duration: isMobile ? 0.4 : 0.7,
                delay: isMobile ? 0.1 : 0.2,
                ease: "easeOut"
              }}
              className="text-[#ABABAB] max-w-2xl mx-auto"
            >
              We offer an extensive range of design and personalised services tailored to the unique needs of every individual industry, from equestrian to construction, we have it covered.
            </motion.p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {services.map((service, index) => (
            <div
              key={service.title}
              style={{
                opacity: showCards ? 1 : 0,
                transition: isReducedMotion
                  ? 'none'
                  : `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${0.15 * index + 0.1}s`
              }}
              className="bg-[#111111]/50 backdrop-blur-sm p-8 rounded-2xl border border-[#3CAAFF]/20 hover:border-[#3CAAFF]/50 transition-all duration-300"
            >
              {service.icon}
              <h3 className="text-xl font-semibold text-white mt-6 mb-4">{service.title}</h3>
              <p className="text-[#ABABAB]">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;