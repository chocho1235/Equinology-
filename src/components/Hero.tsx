import { ArrowRight, Star, Compass } from 'lucide-react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'framer-motion';
import ClientThreeBackground from './ClientThreeBackground';

interface HeroProps {
  isMobile: boolean;
}

const Hero = ({ isMobile }: HeroProps) => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  
  // Scroll-based animation for horse - simplified for mobile
  const { scrollY } = useScroll();
  const horseRotate = useTransform(scrollY, [0, 600], [0, isMobile ? -1.5 : -3]); // Reduced rotation
  const horseY = useTransform(scrollY, [0, 600], [0, isMobile ? -4 : -8]); // Reduced movement
  const horseOpacity = useTransform(scrollY, [0, 300, 600], [1, isMobile ? 0.9 : 0.8, isMobile ? 0.6 : 0.4]); // Less fade
  
  useEffect(() => {
    // Check prefers-reduced-motion
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(media.matches);
    const handler = () => setReduceMotion(media.matches);
    media.addEventListener('change', handler);
    // Delay animations until after first paint
    const timeout = setTimeout(() => setHasLoaded(true), isMobile ? 50 : 100);
    return () => {
      media.removeEventListener('change', handler);
      clearTimeout(timeout);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isInView && hasLoaded && !reduceMotion) {
      controls.start("visible");
    }
    if (reduceMotion) {
      controls.set("visible");
    }
  }, [isInView, controls, hasLoaded, reduceMotion]);

  return (
    <div className="relative min-h-screen" ref={ref}>
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-[#0A0A0A] z-10" />

      {/* Content */}
      <div className="relative z-40 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="text-center lg:text-left lg:grid lg:grid-cols-12 lg:gap-12 items-center w-full">
            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: isMobile ? 10 : 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: reduceMotion ? 0 : (isMobile ? 0.3 : 0.5) }}
              className="lg:col-span-7 space-y-8 w-full overflow-visible"
            >
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#111111]/60 backdrop-blur-sm px-5 py-2.5 rounded-full border border-[#3CAAFF]/40">
                <Compass className="w-4 h-4 text-[#3CAAFF]" />
                <span className="text-sm font-medium text-[#BDBDBD]">Digital Innovation Experts</span>
              </div>

              {/* Main heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-relaxed mb-8">
                <span className="block text-white mb-2">Transform Ideas</span>
                <span className="block bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent py-1">
                  Digital Reality
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg lg:text-xl text-[#B8BCC4] max-w-2xl leading-relaxed font-light mt-6">
                Professional digital solutions that drive business growth. From consultation to delivery, we create exceptional experiences that exceed expectations.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] text-[#0A0A0A] font-semibold hover:shadow-lg hover:shadow-[#3CAAFF]/25 transition-all duration-300"
                >
                  Contact Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/services')}
                  className="inline-flex items-center px-8 py-3 rounded-full border border-[#3CAAFF]/40 hover:border-[#3CAAFF]/80 text-[#BDBDBD] hover:text-white transition-all duration-300 hover:bg-[#3CAAFF]/10 font-semibold"
                >
                  View Our Work
                </button>
              </div>

              {/* Social proof - simplified animations for mobile */}
              <div className="pt-8 border-t border-[#333333]/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                  <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start mb-2">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: isMobile ? 0.3 : 0.5,
                            delay: isMobile ? 0 : i * 0.1,
                            ease: "easeOut"
                          }}
                        >
                          <Star className="w-4 h-4 text-[#3CAAFF] fill-current" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-sm text-[#888888]">Trusted by thousands of business owners</p>
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-2xl font-bold text-white mb-1">6+</p>
                    <p className="text-sm text-[#888888]">Years of excellence</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hero image/illustration */}
            <div className="mt-16 lg:mt-0 lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative max-w-[600px] w-full">
                <motion.div 
                  className="relative transform lg:-translate-x-4 pb-8"
                  style={{
                    rotateZ: horseRotate,
                    y: horseY,
                    opacity: horseOpacity,
                    transformOrigin: "center 80%"
                  }}
                >
                  <div className="aspect-w-4 aspect-h-3 rounded-3xl overflow-visible">
                    <img
                      src="/ChatGPT Image Jun 20, 2025, 01_54_47 PM.png"
                      alt="Elegant Horse"
                      className={`object-contain w-full h-full rounded-3xl transition-opacity duration-700 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                      width={600}
                      height={450}
                      onLoad={() => setImageLoaded(true)}
                    />
                    {!imageLoaded && (
                      <div className="absolute inset-0 animate-pulse" />
                    )}
                  </div>
                  
                  {/* Subtle glow effect - reduced on mobile */}
                  <div className={`absolute -inset-6 bg-gradient-radial from-[#3CAAFF]/8 via-transparent to-transparent rounded-full blur-2xl pointer-events-none ${
                    isMobile ? 'opacity-40' : 'opacity-70'
                  }`}></div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;