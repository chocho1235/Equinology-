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

  // Words with potential typos for realistic effect
  const rotatingWords = [
    "Ideas",
    "Dreams", 
    "Visions",
    "Goals",
    "Future"
  ];
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Realistic human typing simulation
  const getRealisticDelay = (char: string = '', position: number = 0) => {
    // Base typing speed variations
    const baseSpeed = 80 + Math.random() * 40; // 80-120ms base
    
    // Letter-specific variations
    const difficultLetters = 'qwzxcvbnm';
    const easyLetters = 'asdf';
    const commonLetters = 'etaoinshrdlu';
    
    let multiplier = 1;
    
    if (char) {
      const lowerChar = char.toLowerCase();
      if (difficultLetters.includes(lowerChar)) {
        multiplier = 1.3 + Math.random() * 0.4; // Slower for difficult letters
      } else if (easyLetters.includes(lowerChar)) {
        multiplier = 0.7 + Math.random() * 0.2; // Faster for easy letters
      } else if (commonLetters.includes(lowerChar)) {
        multiplier = 0.8 + Math.random() * 0.3; // Moderate for common letters
      }
    }
    
    // Position-based variations (slower at start, faster in middle)
    if (position === 0) {
      multiplier *= 1.5; // Slower start
    } else if (position > 2) {
      multiplier *= 0.9; // Faster once in rhythm
    }
    
    // Random hesitations (very rare)
    if (Math.random() < 0.05) {
      multiplier *= 2; // Occasional hesitation
    }
    
    // Burst typing (occasional fast sequences)
    if (Math.random() < 0.15 && position > 1) {
      multiplier *= 0.6; // Fast burst
    }
    
    return Math.floor(baseSpeed * multiplier);
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
          const delay = getRealisticDelay(nextChar, displayText.length);
          timeout = setTimeout(updateText, delay);
        } else {
          // Word complete, start deleting immediately (no pause)
          setIsDeleting(true);
          timeout = setTimeout(updateText, 300 + Math.random() * 200);
        }
      } else {
        // Deleting phase
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
          // Faster, consistent deletion speed
          const deleteSpeed = 40 + Math.random() * 20;
          timeout = setTimeout(updateText, deleteSpeed);
        } else {
          // Move to next word immediately
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
          // Tiny pause before starting next word
          timeout = setTimeout(updateText, 100 + Math.random() * 100);
        }
      }
    };

    timeout = setTimeout(updateText, getRealisticDelay());
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 relative">
                <div className={`${isMobile ? 'flex flex-col items-center' : 'inline-flex items-center'} text-white relative z-20 mb-1`}>
                  <span>Transform</span>
                  <div className={`relative inline-flex ${isMobile ? 'mt-1' : 'ml-3'}`}>
                    <span className={`relative block h-[1.2em] overflow-hidden ${isMobile ? 'w-[5.5em] text-center' : ''}`}>
                      <div className={`absolute whitespace-nowrap text-white ${isMobile ? 'left-1/2 transform -translate-x-1/2' : 'left-0'}`}>
                        {displayText}
                        <span className="inline-block w-[2px] h-[0.9em] bg-white ml-[1px] animate-realistic-blink shadow-sm"></span>
                      </div>
                      <span className="invisible whitespace-nowrap">{rotatingWords[currentWordIndex]}</span>
                    </span>
                  </div>
              </div>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="block bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent mt-3 leading-[1.15] pb-1"
                >
                  Digital Reality
                </motion.span>
              </h1>

              {/* Description with adjusted spacing */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg lg:text-xl text-[#B8BCC4] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light mt-4"
              >
                Professional digital solutions that drive business growth. From consultation to delivery, we create exceptional experiences that exceed expectations.
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