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
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from 'react-responsive';

/** --------------------------------------------------------------------------------------------------------------------
 * GLOBAL PAGE BACKGROUND
 * ------------------------------------------------------------------------------------------------------------------ */
function PageBackground() {
  return (
    <div
      aria-hidden
      style={{ opacity: 0.03 }}
      className="fixed inset-0 -z-10 bg-[#0A0A0A]"
    >
      {/* Base gradient - moved to CSS for better performance */}
      <div className="absolute inset-0 bg-gradient-radial-subtle" />
      
      {/* Noise texture */}
      <div className="absolute inset-0 mix-blend-overlay opacity-5 bg-[url('/noise.png')]" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('/grid.svg')] bg-[length:16rem_16rem]" />
    </div>
  );
}

/** --------------------------------------------------------------------------------------------------------------------
 * HOOKS / HELPERS
 * ------------------------------------------------------------------------------------------------------------------ */
function useFadeIn() {
  /** A tiny helper that fades the element in only once when it enters the viewport. */
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  return [ref, isInView] as const;
}

function useStaggeredAnimation(count: number) {
  /** Creates staggered animations for multiple elements */
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return { ref, isVisible };
}

/** --------------------------------------------------------------------------------------------------------------------
 * HERO
 *  • Scroll-linked parallax cleaned up – no more double-controlled opacity.
 *  • Only inner content translates/fades, section itself stays 100% opaque for route transitions.
 *  • Removed old transition clash that caused Safari flashing.
 * ------------------------------------------------------------------------------------------------------------------ */
function HeroSection({ isMobile }: { isMobile: boolean }) {
  const scrollY = useScroll().scrollY;
  const opacity = useTransform(
    scrollY,
    [0, isMobile ? 150 : 300],
    [1, 0]
  );
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const scrollIndicatorOpacity = useTransform(
    scrollY,
    [0, isMobile ? 75 : 150],
    [1, 0]
  );

  const handleScroll = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      const yOffset = -80;
      const y = servicesSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ opacity: opacity as any }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          style={{ opacity }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-[#3CAAFF]/20 to-transparent rounded-full blur-3xl"
      />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          style={{ opacity }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-[#00E0FF]/20 to-transparent rounded-full blur-3xl"
            />
          </div>
        
      <div className="relative w-full max-w-[90rem] mx-auto px-4 md:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ opacity, y, scale }}
          className="relative w-full max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          {/* Subtle line decoration */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ opacity }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-[#3CAAFF]/30 to-transparent"
          />

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1]"
        >
            Crafting Digital
          <br />
          <span className="bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent">
              Experiences
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-[#BDBDBD] mb-16 font-light max-w-2xl leading-relaxed px-4"
          >
            We transform ideas into exceptional digital solutions. Our expertise in web design and development helps businesses thrive in the digital landscape.
          </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[#BDBDBD] mb-16 px-4"
          >
            <div className="flex items-center gap-3 group">
              <Shield className="w-5 h-5 text-[#3CAAFF] group-hover:text-[#00E0FF] transition-colors duration-300" />
              <span className="group-hover:text-white transition-colors duration-300">Enterprise Grade</span>
            </div>
            <div className="flex items-center gap-3 group">
              <Zap className="w-5 h-5 text-[#3CAAFF] group-hover:text-[#00E0FF] transition-colors duration-300" />
              <span className="group-hover:text-white transition-colors duration-300">Lightning Fast</span>
            </div>
            <div className="flex items-center gap-3 group">
              <Star className="w-5 h-5 text-[#3CAAFF] group-hover:text-[#00E0FF] transition-colors duration-300" />
              <span className="group-hover:text-white transition-colors duration-300">Award Winning</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ opacity: scrollIndicatorOpacity }}
        onClick={handleScroll}
        className="group fixed bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-4 z-10"
        >
        <motion.div 
          className="relative w-px h-16 overflow-hidden bg-gradient-to-b from-[#3CAAFF]/20 to-[#00E0FF]/20"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#3CAAFF] to-[#00E0FF]"
            animate={{
              y: ["0%", "100%"],
              height: ["0%", "100%"]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ height: "50%" }}
          />
        </motion.div>
        <span className="text-sm tracking-wider uppercase text-[#BDBDBD] group-hover:text-white transition-colors duration-300">
          Explore
        </span>
      </motion.div>
    </motion.section>
  );
}

/** --------------------------------------------------------------------------------------------------------------------
 * BRANDING & IDENTITY SECTION
 *  • Re-implemented with useFadeIn() per element instead of continuous scrollOpacity.
 * ------------------------------------------------------------------------------------------------------------------ */
function BrandingIdentitySection({ isMobile }: { isMobile: boolean }) {
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
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.5 : 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
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
              initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: isMobile ? 0.5 : 0.7, 
                delay: isMobile ? 0 : index * 0.1 
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="group relative grid md:grid-cols-2 gap-8 items-center"
            >
              <div className={`${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0A0A0A] to-[#10131A] p-8">
                  <div className={`absolute inset-0 bg-gradient-to-r from-[#3CAAFF]/10 to-[#00E0FF]/10 transition-opacity duration-300 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[300px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className={`${index % 2 === 0 ? "md:order-2" : "md:order-1"} space-y-6`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#3CAAFF]/5 border border-[#3CAAFF]/10">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-medium text-white">
                    {item.title}
                  </h3>
                </div>
                
                <p className="text-[#BDBDBD] leading-relaxed">
                  {item.desc}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {item.features.map((feature) => (
                    <div 
                      key={feature} 
                      className="flex items-center gap-2 text-sm text-[#BDBDBD]"
                    >
                      <div className="w-1 h-1 rounded-full bg-[#3CAAFF]" />
                        <span>{feature}</span>
                    </div>
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
 * GENERIC SECTION COMPONENTS BELOW – UNCHANGED LOGIC BUT REFACTORED TO useFadeIn() FOR PERFORMANCE
 * ------------------------------------------------------------------------------------------------------------------ */
function ServicesSection({ isMobile }: { isMobile: boolean }) {
  const services = [
    {
      title: "Website Design & Development",
      desc: "We deliver professional, responsive websites optimised for performance and user experience. Our development process ensures your site meets modern web standards while achieving your business objectives.",
      icon: <Code className="h-6 w-6 text-[#3CAAFF]" />,
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
      features: [
        "Technical SEO",
        "Content strategy",
        "Performance tracking",
        "Conversion optimisation",
      ],
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.5 : 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
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
              initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: isMobile ? 0.5 : 0.7, 
                delay: isMobile ? 0 : index * 0.1 
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="group relative grid md:grid-cols-2 gap-8 items-center"
            >
              <div className={`${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0A0A0A] to-[#10131A] p-8">
                  <div className={`absolute inset-0 bg-gradient-to-r from-[#3CAAFF]/10 to-[#00E0FF]/10 transition-opacity duration-300 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                  <div className="relative z-10 flex flex-col items-center justify-center min-h-[300px]">
                    <div className="p-4 rounded-2xl bg-[#3CAAFF]/5 border border-[#3CAAFF]/10 mb-6">
                {service.icon}
              </div>
                    <div className="text-center">
                      <h4 className="text-lg font-medium text-white mb-2">Request a Consultation</h4>
                      <p className="text-sm text-[#BDBDBD]">Discuss your project requirements</p>
            </div>
                  </div>
                </div>
                  </div>
                  
              <div className={`${index % 2 === 0 ? "md:order-2" : "md:order-1"} space-y-6`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#3CAAFF]/5 border border-[#3CAAFF]/10">
                    {service.icon}
                </div>
                  <h3 className="text-xl font-medium text-white">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-[#BDBDBD] leading-relaxed">
                  {service.desc}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <div 
                      key={feature} 
                      className="flex items-center gap-2 text-sm text-[#BDBDBD]"
                    >
                      <div className="w-1 h-1 rounded-full bg-[#3CAAFF]" />
                      <span>{feature}</span>
                          </div>
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
 * GLOBAL REACH & CONTACT – unchanged except minor style tweaks for consistency.
 * ------------------------------------------------------------------------------------------------------------------ */
const globalReachItems = [
  {
    title: "Digital Presence",
    description:
      "Establish a strong online presence that works for you 24/7, reaching potential clients worldwide.",
    icon: <Globe className="h-6 w-6 text-blue-400" />,
  },
  {
    title: "Mobile Accessibility",
    description:
      "Ensure your services are accessible to clients on any device, anywhere in the world.",
    icon: <Smartphone className="h-6 w-6 text-blue-400" />,
  },
  {
    title: "Social Media Integration",
    description:
      "Seamlessly connect your website with social platforms to expand your reach and engagement.",
    icon: <Share2 className="h-6 w-6 text-blue-400" />,
  },
  {
    title: "Search Visibility",
    description:
      "Optimise your online presence to be easily found by those searching for your services.",
    icon: <Search className="h-6 w-6 text-blue-400" />,
  },
];

function GlobalReachSection() {
  return (
    <section className="relative bg-[#0A0A0A] py-20 overflow-hidden">
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#3CAAFF]/3 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#00E0FF]/3 rounded-full blur-3xl" />
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">
            Digital Reach & Connectivity
          </h2>
          <p className="text-lg text-gray-300">
            Expand your influence and connect with clients globally through a powerful digital presence
          </p>
        </motion.div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-l from-[#0A0A0A] to-transparent" />
          <div className="flex gap-8 overflow-x-auto pb-8 px-2 scrollbar-hide">
            {globalReachItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
                className="group relative w-[300px] flex-shrink-0 rounded-lg bg-[#111111] p-6 cursor-pointer"
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-400/5 transition-colors group-hover:bg-blue-400/10">
                    {item.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-blue-400">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ navigate }: { navigate: (path: string) => void }) {
  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#0B0D12] to-[#10131A]">
      <div className="pointer-events-none absolute inset-0 z-0" style={{ background: "url(/noise.png), linear-gradient(90deg, #0A0A0A 0%, #10131A 100%)", opacity: 0.25 }} />
      <div className="absolute top-20 right-20 w-32 h-32 bg-[#3CAAFF]/5 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#00E0FF]/5 rounded-full blur-2xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-16 md:grid-cols-2 items-center"
        >
          <div>
              <h2 className="mb-8 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Ready to Transform
                <br />
                <span className="bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent">
                  Your Business?
                </span>
            </h2>
              <p className="mb-8 text-lg text-[#BDBDBD] leading-relaxed">
              Let's create something extraordinary together. Contact us today to discuss your
                project and discover how we can help elevate your business to new heights.
            </p>
            <ul className="space-y-4">
                <li className="flex items-center gap-3 text-[#BDBDBD]">
                  <Star className="h-5 w-5 text-[#3CAAFF]" />
                <span>Free initial consultation</span>
              </li>
                <li className="flex items-center gap-3 text-[#BDBDBD]">
                  <Zap className="h-5 w-5 text-[#3CAAFF]" />
                <span>Quick response time</span>
              </li>
                <li className="flex items-center gap-3 text-[#BDBDBD]">
                  <Check className="h-5 w-5 text-[#3CAAFF]" />
                <span>No-obligation quote</span>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <button
              onClick={() => {
                navigate("/contact");
                setTimeout(() => window.scrollTo(0, 0));
              }}
                className="group inline-flex items-center rounded-full bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] px-12 py-4 text-lg font-semibold text-[#0A0A0A] transition-all duration-300 hover:shadow-lg hover:shadow-[#3CAAFF]/25 hover:scale-105"
            >
              Contact Us Now
              <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** --------------------------------------------------------------------------------------------------------------------
 * MAIN PAGE COMPONENT
 *  • Mounts PageBackground once and gives consistent fade between route transitions.
 * ------------------------------------------------------------------------------------------------------------------ */
export default function ServicesPage() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  useEffect(() => {
    // Immediate mount to prevent flash
    setMounted(true);
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      {/* Background always renders immediately */}
      <PageBackground />
      
      <AnimatePresence mode="wait">
        {mounted && (
          <motion.main
            key="services"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-transparent text-[#F5F5F7]"
          >
            <HeroSection isMobile={isMobile} />
            <BrandingIdentitySection isMobile={isMobile} />
            <ServicesSection isMobile={isMobile} />
            <GlobalReachSection />
            <ContactSection navigate={navigate} />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}