import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, Star } from 'lucide-react';
import { Suspense } from 'react';
import ClientThreeBackground from './ClientThreeBackground';

interface HeroProps {
  isMobile: boolean;
}

const Hero = ({ isMobile }: HeroProps) => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Scroll-based animation for horse - simplified for mobile
  const { scrollY } = useScroll();
  const horseRotate = useTransform(scrollY, [0, 600], [0, isMobile ? -1.5 : -3]); // Reduced rotation
  const horseY = useTransform(scrollY, [0, 600], [0, isMobile ? -4 : -8]); // Reduced movement
  const horseOpacity = useTransform(scrollY, [0, 300, 600], [1, isMobile ? 0.9 : 0.8, isMobile ? 0.6 : 0.4]); // Less fade

  // Extended word list for dynamic rotation - starting with most professional
  const rotatingWords = [
    "Business",
    "Strategy",
    "Success",
    "Growth",
    "Innovation",
    "Excellence",
    "Enterprise",
    "Solution",
    "Service",
    "Platform",
    "Product",
    "Brand",
    "Website",
    "Company",
    "Project",
    "Venture",
    "Experience",
    "Identity",
    "Vision",
    "Mission",
    "Potential",
    "Impact",
    "Goals",
    "Plan",
    "Purpose",
    "Future",
    "Ideas",
    "Concept",
    "Startup",
    "Ambition",
    "Journey",
    "Story",
    "Dreams",
    "Visions",
    "Passion"
  ];
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Function to get next word index in order
  const getNextWordIndex = (currentIndex: number) => {
    return (currentIndex + 1) % rotatingWords.length;
  };

  // Enhanced smooth typewriter effect with variable timing
  const getSmoothDelay = () => {
    return 120; // Slower, more deliberate typing
  };


  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentWord = rotatingWords[currentWordIndex];
    
    const updateText = () => {
      if (!isDeleting) {
        // Typing phase
        if (displayText.length < currentWord.length) {
          const nextChar = currentWord[displayText.length];
          
          // Perfect typing - no mistakes
          setDisplayText(currentWord.slice(0, displayText.length + 1));
          const delay = getSmoothDelay();
          timeout = setTimeout(updateText, delay);
        } else {
          // Word complete, start deleting after smooth pause
          setIsDeleting(true);
          timeout = setTimeout(updateText, 800);
        }
      } else {
        // Deleting phase
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
          // Smooth deletion speed
          const deleteSpeed = 40;
          timeout = setTimeout(updateText, deleteSpeed);
        } else {
          // Move to next word in order
          setIsDeleting(false);
          setCurrentWordIndex((prev) => getNextWordIndex(prev));
          // Smooth pause before starting next word
          timeout = setTimeout(updateText, 300);
        }
      }
    };

    timeout = setTimeout(updateText, getSmoothDelay());
    return () => clearTimeout(timeout);
  }, [currentWordIndex, displayText, isDeleting, rotatingWords]);

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  return (
    <div className="relative min-h-screen" ref={ref}>
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-[#0A0A0A] z-10" />

      {/* Three.js Background */}
      <div className="absolute inset-0 z-20">
        <Suspense fallback={null}>
          <ClientThreeBackground />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-40 min-h-screen flex items-center overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="text-center lg:text-left lg:grid lg:grid-cols-12 lg:gap-12 items-center w-full">
            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: isMobile ? 10 : 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: isMobile ? 0.3 : 0.5 }}
              className={`${isMobile ? 'w-full' : 'lg:col-span-7'} space-y-8 overflow-visible`}
            >
              {/* Enhanced badge */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#111111]/80 to-[#111111]/90 backdrop-blur-xl px-5 py-2.5 rounded-full border border-[#3CAAFF]/20 shadow-[0_0_20px_rgba(60,170,255,0.05)] hover:border-[#3CAAFF]/30 hover:shadow-[0_0_25px_rgba(60,170,255,0.08)] transition-all duration-300"
              >
                <Compass className="w-4 h-4 text-[#3CAAFF] animate-pulse" />
                <span className="text-sm font-medium bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent tracking-wide">
                  Experts in Equestrian & Agriculture
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3CAAFF]/10 via-transparent to-[#3CAAFF]/10 animate-gradient" />
              </motion.div>

              {/* Main heading - Centered with fixed space for mobile */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 relative">
                <div className="flex flex-col items-center lg:items-start relative z-20 mb-1">
                  <span className="text-white mb-2">Transform Your</span>
                  <div className="relative inline-flex">
                    <div className="relative">
                      <div className="whitespace-nowrap bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent leading-[1.2] transition-all duration-75">
                        {displayText}
                        <span className="inline-block w-[2px] h-[1.2em] bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] ml-[1px] animate-realistic-blink shadow-sm"></span>
                      </div>
                      <div className="invisible whitespace-nowrap absolute left-0 top-0 leading-[1.2]">{rotatingWords[currentWordIndex]}</div>
                    </div>
                  </div>
              </div>
              </h1>

              {/* Description with adjusted spacing */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg lg:text-xl text-[#B8BCC4] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light mt-4"
              >
                Professional web design and development services for businesses of all sizes. We specialise in equestrian and agricultural sectors while delivering exceptional results across industries. From stunning websites to high-converting platforms, we create digital solutions that drive growth and exceed expectations.
              </motion.p>

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

              {/* Social proof */}
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
            <div className="mt-16 lg:mt-0 lg:col-span-5 relative flex justify-center lg:justify-end hidden md:flex">
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
                      src="/ChatGPT Image Jun 20, 2025, 01_54_47 PM-optimised (1).svg"
                      alt="Professional equestrian web design services - Elegant horse illustration representing our expertise in equestrian and agricultural website development"
                      className={`object-contain w-full h-full rounded-3xl transition-opacity duration-700 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                      width={600}
                      height={450}
                      onLoad={() => setImageLoaded(true)}
                      decoding="async"
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