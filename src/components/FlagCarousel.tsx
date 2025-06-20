import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, useScroll, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Users, Zap, Award } from 'lucide-react';
import { useAnimation as useAnimationContext } from '../contexts/AnimationContext';

const globalStats = [
  { icon: <Globe className="w-8 h-8" />, number: '50+', label: 'Countries Served', color: 'from-blue-400 to-cyan-400' },
  { icon: <Users className="w-8 h-8" />, number: '1000+', label: 'Happy Clients', color: 'from-purple-400 to-pink-400' },
  { icon: <Zap className="w-8 h-8" />, number: '2500+', label: 'Projects Delivered', color: 'from-green-400 to-emerald-400' },
  { icon: <Award className="w-8 h-8" />, number: '99%', label: 'Client Satisfaction', color: 'from-yellow-400 to-orange-400' },
  { icon: <Globe className="w-8 h-8" />, number: '24/7', label: 'Global Support', color: 'from-indigo-400 to-blue-400' },
  { icon: <Users className="w-8 h-8" />, number: '15+', label: 'Industries', color: 'from-pink-400 to-rose-400' },
];

// Duplicate the stats array to create a seamless loop
const duplicatedStats = [...globalStats, ...globalStats];

const FlagCarousel = () => {
  const { disableAnimations } = useAnimationContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    const startAnimation = () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
      
      const currentValue = x.get();
      animationRef.current = animate(x, currentValue - 1440, {
        duration: 30,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      });
    };

    if (!isHovered && !disableAnimations) {
      startAnimation();
    } else if (animationRef.current) {
      animationRef.current.stop();
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [isHovered, disableAnimations, x]);

  const renderDesktopVersion = () => (
    <div 
      className="relative h-[420px] overflow-hidden rounded-3xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlays for seamless edges */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20 pointer-events-none" />
      
      <motion.div
        className="absolute inset-0 flex items-center will-change-transform"
        style={{ x }}
      >
        <div className="flex gap-8 pl-8">
          {duplicatedStats.map((stat, index) => (
            <motion.div
              key={`${stat.label}-${index}`}
              className="relative group flex-shrink-0 w-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
            >
              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              
              <div className="relative bg-gradient-to-br from-[#1a1a1a]/90 via-[#151515]/80 to-[#0f0f0f]/90 backdrop-blur-xl p-8 rounded-2xl border border-white/10 group-hover:border-white/30 transition-all duration-500 h-full flex flex-col items-center justify-center shadow-2xl group-hover:shadow-3xl">
                {/* Animated background pattern */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500 rounded-2xl" />
                
                <motion.div 
                  className={`relative z-10 text-transparent bg-gradient-to-r ${stat.color} bg-clip-text mb-6`}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.6 }
                  }}
                >
                  {stat.icon}
                </motion.div>
                
                <motion.div 
                  className="text-5xl font-bold text-white mb-3 relative z-10"
                  whileHover={{
                    scale: 1.1,
                    textShadow: "0 0 20px rgba(60, 170, 255, 0.5)"
                  }}
                >
                  {stat.number}
                </motion.div>
                
                <div className="text-gray-400 text-sm font-medium text-center group-hover:text-white transition-colors duration-300 relative z-10">
                  {stat.label}
                </div>
                
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderMobileVersion = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
      {globalStats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileTap={{ scale: 0.95 }}
          className="group relative"
        >
          {/* Glow effect */}
          <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-xl blur-lg opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
          
          <div className="relative bg-gradient-to-br from-[#1a1a1a]/90 via-[#151515]/80 to-[#0f0f0f]/90 backdrop-blur-xl p-6 rounded-xl border border-white/10 group-hover:border-white/25 transition-all duration-500 h-full flex flex-col items-center justify-center shadow-xl group-hover:shadow-2xl">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500 rounded-xl" />
            
            <motion.div 
              className={`relative z-10 text-transparent bg-gradient-to-r ${stat.color} bg-clip-text mb-4`}
              whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
              transition={{ duration: 0.4 }}
            >
              {stat.icon}
            </motion.div>
            
            <motion.div 
              className="text-3xl font-bold text-white mb-2 text-center relative z-10"
              whileHover={{ scale: 1.05 }}
            >
              {stat.number}
            </motion.div>
            
            <div className="text-gray-400 text-xs font-medium text-center group-hover:text-gray-300 transition-colors duration-300 relative z-10">
              {stat.label}
            </div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <section ref={containerRef} className="relative py-28 overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#0B0D12] to-[#10131A]">
      <div className="pointer-events-none absolute inset-0 z-0" style={{ background: "url(/noise.png), linear-gradient(90deg, #0A0A0A 0%, #10131A 100%)", opacity: 0.25 }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          {disableAnimations ? (
            <>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent">Proven Excellence</span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
                Our track record speaks for itself. From startups to enterprise solutions, we deliver results that drive business growth worldwide.
              </p>
            </>
          ) : (
            <>
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.165, 0.84, 0.44, 1] }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent">Proven Excellence</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed"
              >
                Our track record speaks for itself. From startups to enterprise solutions, we deliver results that drive business growth worldwide.
              </motion.p>
            </>
          )}
        </div>

        {disableAnimations ? renderMobileVersion() : renderDesktopVersion()}
      </div>
    </section>
  );
};

export default FlagCarousel; 