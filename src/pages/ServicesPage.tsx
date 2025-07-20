import {
  ChevronRight,
  Code,
  Palette,
  ShoppingBag,
  Camera,
  Globe,
  MessageSquare,
  Users,
  Award,
  Heart,
  ArrowRight,
  Check,
  Star,
  Zap,
  Smartphone,
  Share2,
  Search,
  GripVertical,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { useEffect, useRef, useState, Suspense } from "react";
import { useMediaQuery } from 'react-responsive';
import SEOHead from '../components/SEOHead';
import ServicesHeroBackground from '../components/background/ServicesHeroBackground';

/** --------------------------------------------------------------------------------------------------------------------
 * ENHANCED PAGE BACKGROUND
 * ------------------------------------------------------------------------------------------------------------------ */
function PageBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#0A0A0A]">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0B0D12] to-[#10131A]" />
      
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#3CAAFF]/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#00E0FF]/5 rounded-full blur-3xl"
      />
    </div>
  );
}

/** --------------------------------------------------------------------------------------------------------------------
 * IMPROVED HOOKS & HELPERS
 * ------------------------------------------------------------------------------------------------------------------ */
function useSmoothScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-10%",
    amount: 0.3 
  });
  
  return { ref, isInView };
}

function useParallaxScroll(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  
  return { ref, y, opacity };
}

/** --------------------------------------------------------------------------------------------------------------------
 * ENHANCED HERO SECTION
 * ------------------------------------------------------------------------------------------------------------------ */
function HeroSection({ isMobile }: { isMobile: boolean }) {
  const { ref: contentRef, isInView } = useSmoothScroll();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Hide scroll indicator when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        setShowScrollIndicator(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      const yOffset = -120;
      const y = servicesSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      // Hide indicator immediately when clicked
      setShowScrollIndicator(false);
      
      window.scrollTo({ 
        top: y, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Unique Three.js background for services page */}
      <Suspense fallback={null}>
        <ServicesHeroBackground />
      </Suspense>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div 
          ref={contentRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          className="text-center space-y-8"
        >
          {/* Enhanced badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#111111]/80 to-[#111111]/90 backdrop-blur-xl px-6 py-3 rounded-full border border-[#3CAAFF]/20 shadow-[0_0_30px_rgba(60,170,255,0.1)]"
          >
            <Sparkles className="w-4 h-4 text-[#3CAAFF] animate-pulse" />
            <span className="text-sm font-medium text-white/90 tracking-wide">
              Professional Digital Solutions
            </span>
          </motion.div>

          {/* Enhanced heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
          >
            Crafting Digital
            <br />
            <span className="bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent">
              Excellence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-[#BDBDBD] max-w-3xl mx-auto leading-relaxed font-light px-4"
          >
            We transform ideas into exceptional digital solutions. Our expertise in web design and development helps businesses thrive in the digital landscape.
          </motion.p>

          {/* Enhanced feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-[#BDBDBD] px-4"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-[#3CAAFF]/10 border border-[#3CAAFF]/20 group-hover:bg-[#3CAAFF]/20 transition-all duration-300">
                <Shield className="w-5 h-5 text-[#3CAAFF]" />
              </div>
              <span className="group-hover:text-white transition-colors duration-300">Enterprise Grade</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-[#3CAAFF]/10 border border-[#3CAAFF]/20 group-hover:bg-[#3CAAFF]/20 transition-all duration-300">
                <Zap className="w-5 h-5 text-[#3CAAFF]" />
              </div>
              <span className="group-hover:text-white transition-colors duration-300">Lightning Fast</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-[#3CAAFF]/10 border border-[#3CAAFF]/20 group-hover:bg-[#3CAAFF]/20 transition-all duration-300">
                <Star className="w-5 h-5 text-[#3CAAFF]" />
              </div>
              <span className="group-hover:text-white transition-colors duration-300">Award Winning</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced intuitive scroll indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              enter: { delay: 1.2, duration: 0.8 },
              exit: { duration: 0.5 }
            }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
          >
        {/* Scroll hint container */}
        <motion.div
          onClick={handleScrollToServices}
          className="group cursor-pointer flex flex-col items-center gap-4 scroll-indicator"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated scroll line */}
          <motion.div
            className="relative w-px h-24 overflow-hidden bg-gradient-to-b from-[#3CAAFF]/20 to-[#00E0FF]/20 rounded-full"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#3CAAFF] to-[#00E0FF] rounded-full"
              animate={{
                y: ["0%", "100%"],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ height: "40%" }}
            />
          </motion.div>
          
          {/* Scroll text with animation */}
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-sm tracking-wider uppercase text-[#BDBDBD] group-hover:text-white transition-colors duration-300 font-medium">
              Scroll to Explore
            </span>
            <motion.div
              className="w-2 h-2 bg-[#3CAAFF] rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
        
        {/* Additional visual cue */}
        <motion.div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 opacity-60"
          animate={{ opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#3CAAFF]/30 to-transparent rounded-full" />
        </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/** --------------------------------------------------------------------------------------------------------------------
 * ENHANCED BRANDING & IDENTITY SECTION
 * ------------------------------------------------------------------------------------------------------------------ */
function BrandingIdentitySection({ isMobile }: { isMobile: boolean }) {
  const { ref, isInView } = useSmoothScroll();
  
  const items = [
    {
      title: "Brand Strategy & Design",
      desc: "We craft distinctive brand identities that reflect your company's values and vision. Our strategic design process combines thoughtful research with creative execution to develop memorable brands that connect with your target audience.",
      image: "https://i.ibb.co/HLZ3VMKb/GALLOP.webp",
      icon: <Palette className="h-6 w-6 text-[#3CAAFF]" />,
      features: [
        "Brand strategy",
        "Logo design",
        "Visual identity",
        "Brand guidelines",
      ],
    },
    {
      title: "Print & Digital Design",
      desc: "We design compelling visual materials across all mediums. From business stationery to digital assets, we ensure your brand maintains a consistent and professional presence that builds recognition and trust.",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&q=80&w=600",
      icon: <Award className="h-6 w-6 text-[#3CAAFF]" />,
      features: [
        "Business collateral",
        "Marketing materials",
        "Digital assets",
        "Social media design",
      ],
    },
    {
      title: "Creative Direction",
      desc: "We provide creative direction to ensure your brand's visual storytelling is cohesive and impactful. Our approach combines strategic thinking with design excellence to create memorable brand experiences.",
      image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&q=80&w=600",
      icon: <Heart className="h-6 w-6 text-[#3CAAFF]" />,
      features: [
        "Art direction",
        "Visual storytelling",
        "Brand photography",
        "Design systems",
      ],
    },
  ];

  return (
    <section ref={ref} className="relative py-16 sm:py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-snug mb-6">
            Brand Design
            <br />
            <span className="bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent">
              & Identity
            </span>
          </h2>
          <p className="text-[#BDBDBD] max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Creating distinctive brand identities that leave lasting impressions.
          </p>
        </motion.div>

        <div className="grid gap-16 md:gap-24">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2 
              }}
              className="group relative grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div 
                className={`${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#10131A] p-8 border border-[#3CAAFF]/10">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-[#3CAAFF]/5 to-[#00E0FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="relative z-10 w-full h-[300px] object-cover rounded-xl transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </motion.div>

              <div className={`${index % 2 === 0 ? "md:order-2" : "md:order-1"} space-y-6`}>
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-3 rounded-xl bg-[#3CAAFF]/10 border border-[#3CAAFF]/20 group-hover:bg-[#3CAAFF]/20 transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    {item.title}
                  </h3>
                </motion.div>
                
                <p className="text-[#BDBDBD] leading-relaxed text-lg">
                  {item.desc}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {item.features.map((feature, featureIndex) => (
                    <motion.div 
                      key={feature} 
                      className="flex items-center gap-3 text-sm text-[#BDBDBD] group-hover:text-white transition-colors duration-300"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.2 + featureIndex * 0.1 
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#3CAAFF] group-hover:scale-125 transition-transform duration-300" />
                      <span className="font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** --------------------------------------------------------------------------------------------------------------------
 * ENHANCED SERVICES SECTION
 * ------------------------------------------------------------------------------------------------------------------ */
function ServicesSection({ isMobile }: { isMobile: boolean }) {
  const { ref, isInView } = useSmoothScroll();
  
  const services = [
    {
      title: "Website Design & Development",
      desc: "We deliver professional, responsive websites optimised for performance and user experience. Our development process ensures your site meets modern web standards while achieving your business objectives.",
      icon: <Code className="h-6 w-6 text-[#3CAAFF]" />,
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-full max-w-[280px] bg-[#1A1A1A] rounded-lg overflow-hidden shadow-xl border border-[#3CAAFF]/10">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#252525]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 ml-2">
                <div className="w-24 h-2 bg-[#333] rounded" />
              </div>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <div className="w-16 h-2 bg-[#3CAAFF] rounded mb-2" />
                <div className="w-32 h-2 bg-[#333] rounded" />
              </div>
              <div className="space-y-3">
                <div className="w-full h-24 bg-gradient-to-r from-[#3CAAFF]/20 to-[#00E0FF]/20 rounded" />
                <div className="flex gap-2">
                  <div className="w-1/3 h-8 bg-[#333] rounded" />
                  <div className="w-1/3 h-8 bg-[#333] rounded" />
                  <div className="w-1/3 h-8 bg-[#333] rounded" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#3CAAFF]/20 rounded-full blur-xl" />
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#00E0FF]/20 rounded-full blur-xl" />
        </div>
      ),
      features: [
        "Responsive design",
        "Performance optimisation",
        "SEO implementation",
        "Content management",
      ],
    },
    {
      title: "E-commerce Solutions",
      desc: "We build secure, scalable e-commerce platforms that drive sales. Our solutions include comprehensive payment integration, inventory management, and customer account systems.",
      icon: <ShoppingBag className="h-6 w-6 text-[#3CAAFF]" />,
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-full max-w-[280px] bg-[#1A1A1A] rounded-lg p-4 border border-[#3CAAFF]/10">
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="w-full aspect-square bg-gradient-to-br from-[#3CAAFF]/10 to-[#00E0FF]/10 rounded-lg" />
                  <div className="w-3/4 h-2 bg-[#333] rounded" />
                  <div className="w-1/2 h-2 bg-[#3CAAFF] rounded" />
                </div>
              ))}
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#3CAAFF] rounded-full flex items-center justify-center">
              <ShoppingBag className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#3CAAFF]/20 rounded-full blur-xl" />
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#00E0FF]/20 rounded-full blur-xl" />
        </div>
      ),
      features: [
        "Secure transactions",
        "Inventory management",
        "Customer accounts",
        "Payment integration",
      ],
    },
    {
      title: "Web Applications",
      desc: "We develop custom web applications that streamline your business operations. Our solutions focus on efficiency, scalability, and user experience to meet your specific requirements.",
      icon: <Code className="h-6 w-6 text-[#3CAAFF]" />,
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-full max-w-[280px] bg-[#1A1A1A] rounded-lg p-4 border border-[#3CAAFF]/10">
            <div className="flex gap-4">
              <div className="w-16 space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-full h-8 bg-[#252525] rounded" />
                ))}
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-16 bg-gradient-to-tr from-[#3CAAFF]/20 to-[#00E0FF]/20 rounded" />
                  <div className="h-16 bg-gradient-to-tr from-[#00E0FF]/20 to-[#3CAAFF]/20 rounded" />
                </div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-full h-4 bg-[#252525] rounded" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 right-0 w-16 h-16 bg-[#3CAAFF]/20 rounded-full blur-xl" />
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#00E0FF]/20 rounded-full blur-xl" />
        </div>
      ),
      features: [
        "Custom development",
        "Process automation",
        "System integration",
        "User management",
      ],
    },
    {
      title: "Digital Marketing & SEO",
      desc: "We implement comprehensive SEO and digital marketing strategies to improve your online visibility. Our approach combines technical optimisation with content strategy to drive qualified traffic.",
      icon: <Search className="h-6 w-6 text-[#3CAAFF]" />,
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-full max-w-[280px] bg-[#1A1A1A] rounded-lg p-4 border border-[#3CAAFF]/10">
            <div className="mb-4">
              <div className="w-full h-32 bg-[#252525] rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-end">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 mx-0.5"
                      style={{
                        height: `${Math.random() * 60 + 20}%`,
                        background: `linear-gradient(180deg, #3CAAFF ${i * 10}%, #00E0FF)`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-1">
                  <div className="w-12 h-2 bg-[#3CAAFF] rounded" />
                  <div className="w-16 h-2 bg-[#333] rounded" />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#3CAAFF]/20 rounded-full blur-xl" />
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#00E0FF]/20 rounded-full blur-xl" />
        </div>
      ),
      features: [
        "Technical SEO",
        "Content strategy",
        "Performance tracking",
        "Conversion optimisation",
      ],
    },
  ];

  return (
    <section ref={ref} className="relative py-32" id="services">
      {/* Visual anchor point */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-[#3CAAFF] to-transparent opacity-60"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-snug mb-6">
            Professional
            <br />
            <span className="bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent">
              Web Solutions
            </span>
          </h2>
          <p className="text-[#BDBDBD] max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Delivering strategic digital solutions that drive business growth.
          </p>
        </motion.div>

        <div className="grid gap-16 md:gap-24">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2 
              }}
              className="group relative grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div 
                className={`${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#10131A] p-8 border border-[#3CAAFF]/10">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-[#3CAAFF]/5 to-[#00E0FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative z-10 min-h-[300px]">
                    {service.illustration}
                  </div>
                </div>
              </motion.div>
                  
              <div className={`${index % 2 === 0 ? "md:order-2" : "md:order-1"} space-y-6`}>
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-3 rounded-xl bg-[#3CAAFF]/10 border border-[#3CAAFF]/20 group-hover:bg-[#3CAAFF]/20 transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    {service.title}
                  </h3>
                </motion.div>
                
                <p className="text-[#BDBDBD] leading-relaxed text-lg">
                  {service.desc}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div 
                      key={feature} 
                      className="flex items-center gap-3 text-sm text-[#BDBDBD] group-hover:text-white transition-colors duration-300"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.2 + featureIndex * 0.1 
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#3CAAFF] group-hover:scale-125 transition-transform duration-300" />
                      <span className="font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** --------------------------------------------------------------------------------------------------------------------
 * BUSINESS WEBSITES & EQUESTRIAN EXPERTISE SECTION
 * ------------------------------------------------------------------------------------------------------------------ */
function BusinessWebsitesSection({ isMobile }: { isMobile: boolean }) {
  const { ref, isInView } = useSmoothScroll();

  const equestrianServices = [
    {
      title: "Equestrian Business Websites",
      desc: "Specialised websites for equestrian businesses including riding schools, livery yards, trainers, horses for sale, and equine service providers. We understand the unique needs of the British equestrian industry.",
      icon: <Heart className="h-6 w-6 text-[#3CAAFF]" />,
      features: [
        "Riding school websites",
        "Livery yard management",
        "Trainer portfolios",
        "Horses for sale platforms",
        "Equine contractor websites",
      ],
    },
    {
      title: "Agricultural Business Solutions",
      desc: "Comprehensive digital solutions for agricultural businesses, farms, and rural enterprises. From machinery sales to livestock management, we build platforms that work for your business.",
      icon: <Target className="h-6 w-6 text-[#3CAAFF]" />,
      features: [
        "Machinery sales websites",
        "Contractor service platforms",
        "Livestock management",
        "Agricultural e-commerce",
      ],
    },
    {
      title: "Rural Business Development",
      desc: "Digital transformation for rural businesses, helping traditional enterprises thrive in the modern digital landscape whilst maintaining their authentic character and local connections.",
      icon: <TrendingUp className="h-6 w-6 text-[#3CAAFF]" />,
      features: [
        "Local business websites",
        "Community platforms",
        "Rural e-commerce",
        "Digital marketing",
      ],
    },
  ];

  const pastProjects = [
    {
      name: "Gallop Riding School",
      type: "Equestrian Business",
      description: "Complete website redesign with booking system and student portal",
      year: "2024",
    },
    {
      name: "Green Meadows Farm",
      type: "Agricultural Business",
      description: "E-commerce platform for farm products and CSA management",
      year: "2023",
    },
    {
      name: "Elite Equestrian Training",
      type: "Equestrian Services",
      description: "Professional trainer website with lesson scheduling and payment integration",
      year: "2023",
    },
    {
      name: "Rural Roots Market",
      type: "Agricultural Retail",
      description: "Online marketplace connecting local farmers with consumers",
      year: "2022",
    },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-gradient-to-br from-[#0A0A0A] via-[#0B0D12] to-[#10131A]">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-10 w-64 h-64 bg-[#3CAAFF]/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 right-10 w-48 h-48 bg-[#00E0FF]/5 rounded-full blur-3xl"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-snug mb-6">
            Business Websites
            <br />
            <span className="bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent">
              & Equestrian Expertise
            </span>
          </h2>
          <p className="text-[#BDBDBD] max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            With years of experience in the British equestrian and agricultural sectors, we understand the unique challenges and opportunities facing rural businesses. Our portfolio includes everything from horses for sale platforms to contractor and machinery websites. Contact us to see more of our previous work.
          </p>
        </motion.div>

        {/* Services Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-24">
          {equestrianServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative rounded-2xl bg-gradient-to-br from-[#111111] to-[#1A1A1A] p-8 border border-[#3CAAFF]/10 hover:border-[#3CAAFF]/20 transition-all duration-300"
            >
              <motion.div 
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3CAAFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <motion.div 
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#3CAAFF]/10 border border-[#3CAAFF]/20 transition-all duration-300 group-hover:bg-[#3CAAFF]/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="mb-4 text-xl font-semibold text-white group-hover:text-[#3CAAFF] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-[#BDBDBD] leading-relaxed mb-6">
                  {service.desc}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div 
                      key={feature} 
                      className="flex items-center gap-3 text-sm text-[#BDBDBD] group-hover:text-white transition-colors duration-300"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.2 + featureIndex * 0.1 
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#3CAAFF] group-hover:scale-125 transition-transform duration-300" />
                      <span className="font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Our Wealth of Experience
          </h3>
          <p className="text-[#BDBDBD] max-w-2xl mx-auto text-lg">
            We've successfully delivered projects across the equestrian and agricultural sectors, building lasting relationships with our clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-8">
          {equestrianServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative rounded-xl bg-gradient-to-br from-[#111111] to-[#1A1A1A] p-6 border border-[#3CAAFF]/10 hover:border-[#3CAAFF]/20 transition-all duration-300"
            >
              <motion.div 
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#3CAAFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-medium text-[#3CAAFF] bg-[#3CAAFF]/10 px-2 py-1 rounded-full">
                    {service.title.split(' ')[0]}
                  </span>
                  <span className="text-xs text-[#BDBDBD]">
                    Expertise
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#3CAAFF] transition-colors duration-300">
                  {service.title}
                </h4>
                <p className="text-sm text-[#BDBDBD] leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center rounded-full bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] px-8 py-3 text-lg font-semibold text-[#0A0A0A] transition-all duration-300 hover:shadow-lg hover:shadow-[#3CAAFF]/25"
          >
            Contact Us to See Previous Work
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

/** --------------------------------------------------------------------------------------------------------------------
 * ENHANCED GLOBAL REACH SECTION
 * ------------------------------------------------------------------------------------------------------------------ */
const globalReachItems = [
  {
    title: "Digital Presence",
    description: "Establish a strong online presence that works for you 24/7, reaching potential clients worldwide.",
    icon: <Globe className="h-6 w-6 text-[#3CAAFF]" />,
  },
  {
    title: "Mobile Accessibility",
    description: "Ensure your services are accessible to clients on any device, anywhere in the world.",
    icon: <Smartphone className="h-6 w-6 text-[#3CAAFF]" />,
  },
  {
    title: "Social Media Integration",
    description: "Seamlessly connect your website with social platforms to expand your reach and engagement.",
    icon: <Share2 className="h-6 w-6 text-[#3CAAFF]" />,
  },
  {
    title: "Search Visibility",
    description: "Optimise your online presence to be easily found by those searching for your services.",
    icon: <Search className="h-6 w-6 text-[#3CAAFF]" />,
  },
];

function GlobalReachSection() {
  const { ref, isInView } = useSmoothScroll();

  return (
    <section ref={ref} className="relative bg-gradient-to-br from-[#0A0A0A] via-[#0B0D12] to-[#10131A] py-32">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-10 w-64 h-64 bg-[#3CAAFF]/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 right-10 w-48 h-48 bg-[#00E0FF]/5 rounded-full blur-3xl"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-snug mb-6">
            Digital Reach &
            <br />
            <span className="bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent">
              Connectivity
            </span>
          </h2>
          <p className="text-[#BDBDBD] max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Expand your influence and connect with clients globally through a powerful digital presence.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {globalReachItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative rounded-2xl bg-gradient-to-br from-[#111111] to-[#1A1A1A] p-8 border border-[#3CAAFF]/10 hover:border-[#3CAAFF]/20 transition-all duration-300"
            >
              <motion.div 
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3CAAFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <motion.div 
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#3CAAFF]/10 border border-[#3CAAFF]/20 transition-all duration-300 group-hover:bg-[#3CAAFF]/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="mb-4 text-xl font-semibold text-white group-hover:text-[#3CAAFF] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[#BDBDBD] leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** --------------------------------------------------------------------------------------------------------------------
 * ENHANCED CONTACT SECTION
 * ------------------------------------------------------------------------------------------------------------------ */
function ContactSection({ navigate }: { navigate: (path: string) => void }) {
  const { ref, isInView } = useSmoothScroll();

  return (
    <section ref={ref} className="relative py-32 bg-gradient-to-br from-[#0A0A0A] via-[#0B0D12] to-[#10131A]">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-20 w-32 h-32 bg-[#3CAAFF]/5 rounded-full blur-2xl"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-20 w-40 h-40 bg-[#00E0FF]/5 rounded-full blur-2xl"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
                      className="grid gap-8 md:gap-16 md:grid-cols-2 items-center"
        >
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Ready to Transform
              <br />
              <span className="bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent">
                Your Business?
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 text-lg text-[#BDBDBD] leading-relaxed"
            >
              Let's create something extraordinary together. Contact us today to discuss your
              project and discover how we can help elevate your business to new heights.
            </motion.p>
            <motion.ul 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4"
            >
              <motion.li 
                className="flex items-center gap-3 text-[#BDBDBD]"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Star className="h-5 w-5 text-[#3CAAFF]" />
                <span>Free initial consultation</span>
              </motion.li>
              <motion.li 
                className="flex items-center gap-3 text-[#BDBDBD]"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Zap className="h-5 w-5 text-[#3CAAFF]" />
                <span>Quick response time</span>
              </motion.li>
              <motion.li 
                className="flex items-center gap-3 text-[#BDBDBD]"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Check className="h-5 w-5 text-[#3CAAFF]" />
                <span>No-obligation quote</span>
              </motion.li>
            </motion.ul>
          </div>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              onClick={() => {
                navigate("/contact");
                setTimeout(() => window.scrollTo(0, 0));
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center rounded-full bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold text-[#0A0A0A] transition-all duration-300 hover:shadow-lg hover:shadow-[#3CAAFF]/25"
            >
              Contact Us Now
              <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Smooth transition element */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      />
    </section>
  );
}

/** --------------------------------------------------------------------------------------------------------------------
 * MAIN PAGE COMPONENT
 * ------------------------------------------------------------------------------------------------------------------ */
export default function ServicesPage() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  useEffect(() => {
    setMounted(true);
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <SEOHead
        title="Web Design Services UK | Professional Website Development | Equinology"
        description="Professional web design services across the UK. Specialising in equestrian, agricultural, and business websites. Affordable web design from £299. Expert web developers delivering stunning, high-converting websites."
        keywords="web design services UK, professional website development, equestrian web design, agricultural web design, business website design, affordable web design, custom website development, responsive web design, WordPress development, e-commerce websites, UK web designer, digital agency services"
        canonical="/services"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Web Design Services",
          "description": "Professional web design services across the UK. Specialising in equestrian, agricultural, and business websites.",
          "provider": {
            "@type": "Organisation",
            "name": "Equinology Digital Agency"
          },
          "serviceType": "Web Design",
          "areaServed": "GB",
          "offers": {
            "@type": "Offer",
            "price": "299",
            "priceCurrency": "GBP",
            "description": "Affordable web design starting from £299"
          }
        }}
      />
      <PageBackground />
      
      <AnimatePresence mode="wait">
        {mounted && (
          <motion.main
            key="services"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative text-[#F5F5F7]"
          >
            <HeroSection isMobile={isMobile} />
            <BrandingIdentitySection isMobile={isMobile} />
            <ServicesSection isMobile={isMobile} />
            <BusinessWebsitesSection isMobile={isMobile} />
            <GlobalReachSection />
            <ContactSection navigate={navigate} />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}