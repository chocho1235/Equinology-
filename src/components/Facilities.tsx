import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue, useSpring, useAnimation } from 'framer-motion';
import { ArrowRight, Globe, Building2, Image, BarChart3, Calendar, ShoppingCart, Check, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAnimation as useAnimationContext } from '../contexts/AnimationContext';
import { useInView } from 'framer-motion';
import BusinessWebsiteImages from './BusinessWebsiteImages';

// Define types for AnimatedOrb props (copied from Services.tsx)
interface AnimatedOrbProps {
  style?: React.CSSProperties;
  customAnimation?: { [key: string]: any };
  className?: string;
  parallaxValue?: number | MotionValue<number>;
}

// Reusable AnimatedOrb component (copied from Services.tsx)
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

interface FacilitiesProps {
  isMobile: boolean;
}

const Facilities = ({ isMobile }: FacilitiesProps) => {
  const { disableAnimations } = useAnimationContext();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: isMobile ? "-50px" : "-100px" });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
        delayChildren: isMobile ? 0.1 : 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 20 : 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: isMobile ? 150 : 100,
        damping: isMobile ? 25 : 20,
        duration: isMobile ? 0.3 : 0.5
      }
    }
  };

  const facilities = [
    {
      category: "Featured",
      title: "Business Websites",
      description: "Professional, responsive websites for any business—showcase your services, build trust, and attract new clients with a modern online presence.",
      features: [
        "Custom design and development",
        "Responsive across all devices",
        "SEO optimization built-in",
        "Performance-focused architecture"
      ],
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      image: "/Screenshot 2025-05-26 at 14.15.47.png"
    },
    {
      category: "Construction",
      title: "Construction Websites",
      description: "Feature your projects, team, and expertise. Integrate project galleries, testimonials, and contact forms to win more contracts.",
      features: [
        "Project portfolio showcase",
        "Team and expertise highlights",
        "Interactive galleries",
        "Lead generation forms"
      ],
      icon: <Building2 className="w-6 h-6 text-blue-400" />
    },
    {
      category: "Portfolio",
      title: "Portfolio & Personal Sites",
      description: "Showcase your work, achievements, and services with a beautiful, responsive portfolio site tailored to your brand.",
      features: [
        "Custom portfolio layouts",
        "Work showcase galleries",
        "Personal branding elements",
        "Contact integration"
      ],
      icon: <Image className="w-6 h-6 text-blue-400" />
    },
    {
      category: "SaaS",
      title: "SaaS Dashboards",
      description: "Custom dashboards for SaaS products, featuring analytics, user management, and real-time data visualisation.",
      features: [
        "Real-time data visualization",
        "User management system",
        "Analytics integration",
        "Custom reporting tools"
      ],
      icon: <BarChart3 className="w-6 h-6 text-blue-400" />
    },
    {
      category: "Booking",
      title: "Booking & Scheduling Systems",
      description: "Manage appointments, classes, or events with intuitive booking systems, automated reminders, and easy online payments.",
      features: [
        "Calendar integration",
        "Automated reminders",
        "Payment processing",
        "Client management"
      ],
      icon: <Calendar className="w-6 h-6 text-blue-400" />
    },
    {
      category: "E-commerce",
      title: "E-commerce Platforms",
      description: "Launch a powerful online store with advanced search, detailed product listings, secure payments, and a smooth customer experience.",
      features: [
        "Product management",
        "Secure checkout",
        "Inventory tracking",
        "Order management"
      ],
      icon: <ShoppingCart className="w-6 h-6 text-blue-400" />
    }
  ];

  // Add navigation handler
  const handleContactNavigation = () => {
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section 
      ref={containerRef} 
      className="relative py-28 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-28 md:mb-36"
        >
          {/* Badge - centered above heading */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#111111]/80 to-[#111111]/90 backdrop-blur-xl border border-[#3CAAFF]/30 shadow-[0_0_30px_rgba(60,170,255,0.1)]">
              <Building2 className="w-6 h-6 text-[#3CAAFF]" />
              <span className="text-white/90 font-semibold text-base">What We Build</span>
            </div>
          </motion.div>
          
          {/* Heading - centered */}
          <motion.div 
            variants={itemVariants}
            className="mb-6"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-snug">
              Digital Solutions for{" "}
              <span className="bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent">
                Modern Business
              </span>
            </h2>
          </motion.div>
          
          {/* Description - centered */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-[#B8BCC4] max-w-2xl mx-auto leading-relaxed"
          >
            Empowering enterprises with cutting-edge digital solutions that drive growth and innovation.
          </motion.p>
        </motion.div>

        {/* Featured Solution - Stripe Style, breaks grid */}
        <motion.div
          variants={containerVariants}
          className="mb-24"
        >
          <motion.div
            variants={itemVariants}
            whileHover={isMobile ? {} : { scale: 1.015, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px] lg:col-span-2 gap-8 lg:gap-12">
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-16 order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex items-center gap-3 sm:gap-5 mb-6 sm:mb-10"
                >
                  <div className="p-3 sm:p-4 rounded-full bg-blue-400/10 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                    <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase block mb-1">
                      {facilities[0].category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-1">
                      {facilities[0].title}
                    </h3>
                  </div>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-[#BDBDBD] text-base sm:text-lg leading-relaxed mb-6 sm:mb-10"
                >
                  {facilities[0].description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-3 sm:space-y-4 mb-6 sm:mb-10"
                >
                  {facilities[0].features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-3 sm:gap-4 group-hover:scale-105 transition-transform duration-200"
                    >
                      <div className="p-1.5 sm:p-2 rounded-full bg-blue-400/10 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 flex-shrink-0">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                      </div>
                      <span className="text-sm sm:text-base text-[#BDBDBD] font-light">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.button
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  onClick={handleContactNavigation}
                  className="flex items-center gap-2 w-fit px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm sm:text-base shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </motion.button>
              </div>
              {/* Desktop Image */}
              <div className="hidden lg:flex items-center justify-center order-1 lg:order-2">
                <BusinessWebsiteImages />
              </div>
              {/* Mobile Image */}
              <div className="flex items-center justify-center order-1 lg:hidden py-6 px-4">
                <BusinessWebsiteImages mobile />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Secondary Solutions Grid - Clean even layout */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {facilities.slice(1).map((facility, index) => (
            <motion.div
              key={facility.title}
              variants={itemVariants}
              whileHover={isMobile ? {} : { scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative"
            >
              <div className="relative rounded-2xl bg-gradient-to-br from-[#1a1d24] via-[#181b22] to-[#151821] border border-[#2a2d35] shadow-lg overflow-hidden h-full flex flex-col hover:border-blue-400/40 transition-colors duration-200">
                {/* Top section with icon and title */}
                <div className="p-8 pb-6">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-400/15 to-cyan-400/10 border border-blue-400/20 flex items-center justify-center">
                      {React.cloneElement(facility.icon, { className: 'w-7 h-7 text-blue-400' })}
                    </div>
                    <div className="flex-1">
                      <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase block mb-2 opacity-80">
                        {facility.category}
                      </span>
                      <h3 className="text-2xl font-bold text-white leading-tight">
                        {facility.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-[#b8bcc4] text-base leading-relaxed font-light">
                    {facility.description}
                  </p>
                </div>

                {/* Features section */}
                <div className="px-8 pb-6 flex-1">
                  <div className="space-y-4">
                    {facility.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <div className="p-2 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/15 border border-blue-400/25 flex items-center justify-center">
                          <Check className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-sm text-[#a8acb4] font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA section */}
                <div className="px-8 pb-8 mt-auto">
                  <div className="pt-6 border-t border-[#2a2d35]">
                    <button
                      onClick={handleContactNavigation}
                      className="flex items-center gap-2 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 rounded-lg px-2 py-1"
                    >
                      Learn More
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Facilities;
