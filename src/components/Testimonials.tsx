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
    id: number;
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
      className={`flex-shrink-0 w-[90vw] sm:w-[500px] md:w-[600px] mx-auto transition-opacity duration-300 ${
        isActive ? 'opacity-100' : 'opacity-30'
      }`}
    >
      <div className="relative bg-[#181B22] p-8 rounded-2xl border border-[#23262F] shadow-lg overflow-hidden transition-all duration-200 group hover:shadow-blue-500/10 hover:border-blue-500/40 hover:bg-gradient-to-br hover:from-[#181B22] hover:to-[#1a2233] flex flex-col items-center">
        {/* Quote Icon - centered above text */}
        <div className="flex items-center justify-center mb-6">
          <span className="p-4 rounded-full bg-blue-400/10 flex items-center justify-center">
            <Quote className="w-10 h-10 text-blue-400" />
          </span>
        </div>
        {/* Quote Text */}
        <div className="relative mb-8 w-full">
          <p className="text-xl text-[#BDBDBD] leading-relaxed font-light text-center">
            “{testimonial.quote}”
          </p>
        </div>
        {/* Author Info */}
        <div className="flex items-center justify-between pt-5 border-t border-[#23262F] mt-6 w-full">
          <div>
            <p className="text-lg font-semibold text-white">
              {testimonial.author}
            </p>
            <p className="text-base text-[#ABABAB] tracking-wide">
              {testimonial.position}
            </p>
          </div>
          <div className="flex gap-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <span key={i} className="inline-flex items-center justify-center p-1 rounded-full bg-blue-400/10 group-hover:scale-110 transition-transform duration-200">
                <Star className="w-5 h-5 text-blue-400 fill-current" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonialRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Simple intersection observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (testimonialRef.current) {
      observer.observe(testimonialRef.current);
    }

    return () => observer.disconnect();
  }, []);

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

  return (
    <section 
      id="testimonials"
      className="pt-0 pb-24 relative bg-gradient-to-br from-[#0A0A0A] via-[#0B0D12] to-[#10131A]"
      ref={testimonialRef}
    >
      {/* Subtle noise/texture background - unified with Facilities */}
      <div className="pointer-events-none absolute inset-0 z-0" style={{ background: 'url(/noise.png), linear-gradient(90deg, #0A0A0A 0%, #10131A 100%)', opacity: 0.25 }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 relative flex flex-col items-center justify-center">
          {/* Soft blurred highlight behind heading */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 w-72 h-24 bg-blue-400/10 blur-2xl rounded-full" />
          <span className="relative inline-block">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tracking-tight"
            >
              Trusted by{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-extrabold">
                Industry
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                  className="absolute left-0 right-0" 
                  style={{
                    height: '4px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(to right, #38bdf8, #22d3ee)',
                    bottom: '-6px',
                    opacity: 1,
                  }}
                />
              </span>{' '}Leaders
            </motion.h2>
          </span>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="text-[#BDBDBD] max-w-xl mx-auto text-lg font-medium tracking-wider mb-10"
          >
            See how world-class brands achieve more with our digital expertise.
          </motion.p>
        </div>
        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="w-full max-w-4xl mx-auto overflow-hidden">
            <div 
              className="flex items-center transition-transform duration-300"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard
                    testimonial={{
                      id: testimonial.id,
                      ...testimonial.testimonial
                    }}
                    isActive={index === activeIndex}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-8 p-3 rounded-full bg-[#181B22] border border-[#23262F] shadow-md hover:border-blue-400/40 hover:bg-blue-400/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-blue-400" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-8 p-3 rounded-full bg-[#181B22] border border-[#23262F] shadow-md hover:border-blue-400/40 hover:bg-blue-400/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-blue-400" />
          </button>
          {/* Dots Navigation */}
          <div className="flex justify-center mt-10 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative h-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  index === activeIndex ? 'w-10' : 'w-3'
                }`}
              >
                <div className={`relative h-full rounded-full transition-colors duration-300 ${
                  index === activeIndex
                    ? 'bg-blue-400'
                    : 'bg-white/20'
                }`}></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;