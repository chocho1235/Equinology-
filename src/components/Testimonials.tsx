import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

// Define types for AnimatedOrb props
interface AnimatedOrbProps {
  style?: React.CSSProperties;
  customAnimation?: { [key: string]: any };
  className?: string;
  parallaxValue?: number | MotionValue<number>;
}

// Reusable AnimatedOrb component
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

// Testimonial card component
interface TestimonialCardProps {
  testimonial: {
    quote: string;
    author: string;
    position: string;
    rating: number;
  };
  isActive: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, isActive }) => {
  return (
    <div
      className={`flex-shrink-0 w-[95vw] max-w-[320px] sm:w-[500px] sm:max-w-[500px] md:w-[600px] md:max-w-[600px] mx-auto transition-opacity duration-300 ${
        isActive ? 'opacity-100' : 'opacity-30'
      }`}
    >
      <div className="relative bg-[#181B22] p-4 sm:p-6 md:p-8 rounded-2xl border border-[#23262F] shadow-xl shadow-blue-400/5 overflow-hidden transition-all duration-200 group hover:shadow-2xl hover:shadow-blue-400/10 hover:border-blue-400/30 hover:bg-gradient-to-br hover:from-[#181B22] hover:to-[#1a2233] flex flex-col items-center min-h-[280px] sm:min-h-[320px]">
        {/* Quote Icon - centered above text */}
        <div className="flex items-center justify-center mb-3 sm:mb-4 md:mb-6">
          <span className="p-2 sm:p-3 md:p-4 rounded-full bg-blue-400/10 flex items-center justify-center">
            <Quote className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-400" />
          </span>
        </div>
        {/* Quote Text */}
        <div className="relative mb-4 sm:mb-6 md:mb-8 w-full flex-1 flex items-center">
          <p className="text-sm sm:text-lg md:text-xl text-[#BDBDBD] leading-relaxed font-light text-center line-clamp-6 sm:line-clamp-none">
            "{testimonial.quote}"
          </p>
        </div>
        {/* Author Info */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 md:pt-5 border-t border-[#23262F] mt-auto w-full">
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base md:text-lg font-semibold text-white truncate">
              {testimonial.author}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-[#ABABAB] tracking-wide truncate">
              {testimonial.position}
            </p>
          </div>
          <div className="flex gap-0.5 sm:gap-1 ml-2 flex-shrink-0">
            {[...Array(testimonial.rating)].map((_, i) => (
              <span key={i} className="inline-flex items-center justify-center p-0.5 sm:p-1 rounded-full bg-blue-400/10 group-hover:scale-110 transition-transform duration-200">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400 fill-current" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface TestimonialsProps {
  isMobile: boolean;
}

const Testimonials = ({ isMobile }: TestimonialsProps) => {
  const testimonialRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // The required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = isMobile ? 30 : 50;

  // Simple intersection observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: isMobile ? 0.05 : 0.1 }
    );

    if (testimonialRef.current) {
      observer.observe(testimonialRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile]);

  // Auto-advance testimonials on mobile for better UX
  useEffect(() => {
    if (!isVisible) return;
    
    if (isMobile) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }, 5000); // Change every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [isVisible, isMobile]);

  useEffect(() => {
    const node = carouselRef.current;
    if (!node) return;
    // Handler for touchmove
    const handleTouchMove = (e: TouchEvent) => {
      setTouchEnd(e.touches[0].clientX);
      if (touchStart !== null) e.preventDefault();
    };
    node.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      node.removeEventListener('touchmove', handleTouchMove);
    };
  }, [touchStart]);

  const testimonials = [
    {
      id: 1,
      company: {
        name: "Equestrian Training Academy",
        logo: "/logos/company1.png",
        industry: "Equestrian Training",
        location: "UK"
      },
      testimonial: {
        quote: "It was such an amazing opportunity to work with Henry. He has a collaborative approach to projects and has the utmost patience for changes, big or small, that you ask for. I'm always nervous going into projects where I feel as though I don't know what I'm doing, but Henry made it very easy to provide feedback and articulate what I wanted. It was such a pleasure working with him!",
        author: "Ben S",
        position: "Hobby Horses LLC",
        rating: 5
      }
    },
    {
      id: 2,
      company: {
        name: "AD Accounting",
        logo: "/logos/company4.png",
        industry: "Accounting Services",
        location: "UK"
      },
      testimonial: {
        quote: "I had the pleasure of working with Henry on a recent web scraping project, and I can confidently say he exceeded all expectations. His technical expertise, attention to detail, and ability to deliver clean, structured data from even the most complex sources were impressive. Henry communicated clearly throughout the project, kept me updated on progress, and was quick to implement any feedback or changes. He delivered everything ahead of schedule and went the extra mile to ensure the final output",
        author: "",
        position: "AD Accounting",
        rating: 5
      }
    },
    {
      id: 3,
      company: {
        name: "Construction Solutions Ltd",
        logo: "/logos/company2.png",
        industry: "Construction",
        location: "UK"
      },
      testimonial: {
        quote: "Henry's creativity and dedication shone through as he designed a new logo from scratch for our construction industry product. He presented several innovative concepts, which we refined together to achieve the final artwork. I am delighted with the outcome and look forward to collaborating with Henry on future projects across different brands. Thank you!",
        author: "Rachel G",
        position: "Rapid Kerb Ltd",
        rating: 5
      }
    },
    {
      id: 4,
      company: {
        name: "Dressage Excellence",
        logo: "/logos/company3.png",
        industry: "Equestrian Sports",
        location: "UK"
      },
      testimonial: {
        quote: "Henry at Equinology really understood what I needed. My previous website had a checkout and basket feature, which didn't make sense for selling horses. He helped create a system that actually worked for my business. It was great to work with someone who understands the equestrian world.",
        author: "Sarah M",
        position: "Owner",
        rating: 5
      }
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <section 
      id="testimonials"
      className="pt-0 pb-16 sm:pb-20 md:pb-24 relative bg-[#0A0A0A]"
      ref={testimonialRef}
    >
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20 relative flex flex-col items-center justify-center">
          {/* Soft blurred highlight behind heading */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 w-32 h-10 sm:w-48 sm:h-16 bg-blue-400/5 blur-xl rounded-full" />
          <span className="relative inline-block">
            <motion.h2
              initial={{ opacity: 0, y: isMobile ? 12 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.4 : 0.7, ease: 'easeOut' }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tracking-tight px-4"
            >
              Trusted by{' '}
              <span className="text-white">Our Clients</span>
            </motion.h2>
          </span>
          <motion.p
            initial={{ opacity: 0, y: isMobile ? 8 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? 0.1 : 0.2 }}
            className="text-[#BDBDBD] max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed"
          >
            See what our clients say about working with us
          </motion.p>
        </div>

        {/* Testimonial Carousel */}
        <div 
          ref={carouselRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative"
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: isMobile ? 0.3 : 0.5,
                    delay: isMobile ? index * 0.1 : index * 0.2
                  }}
                  className="flex-shrink-0 w-full"
                >
                  <TestimonialCard 
                    testimonial={testimonial.testimonial}
                    isActive={index === activeIndex}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-blue-400 w-6' 
                    : 'bg-blue-400/30 hover:bg-blue-400/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;