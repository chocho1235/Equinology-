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
function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 140]);
  const contentOpacity = useTransform(scrollY, [0, 350], [1, 0]);
  const scrollCueOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const backgroundY = useTransform(scrollY, [0, 800], [0, -200]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  const handleScroll = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      const yOffset = -80;
      const y = servicesSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#0B0D12] to-[#10131A]">
      {/* Parallax background */}
      <motion.div 
        style={{ y: backgroundY, scale, background: "url(/noise.png), linear-gradient(90deg, #0A0A0A 0%, #10131A 100%)", opacity: 0.25 }}
        className="pointer-events-none absolute inset-0 z-0" 
      />
      {/* Floating elements for depth */}
      <motion.div 
        style={{ y: useTransform(scrollY, [0, 1000], [0, -300]) }}
        className="absolute top-20 left-20 w-32 h-32 bg-[#3CAAFF]/5 rounded-full blur-3xl"
      />
      <motion.div 
        style={{ y: useTransform(scrollY, [0, 1000], [0, -150]) }}
        className="absolute bottom-20 right-20 w-48 h-48 bg-[#00E0FF]/5 rounded-full blur-3xl"
      />
      {/* Content */}
      <motion.div
        style={{ y, opacity: contentOpacity }}
        className="relative z-10 px-4 text-center max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-block mb-6"
        >
          <div className="px-6 py-2 text-sm font-medium border border-[#3CAAFF]/20 bg-[#3CAAFF]/5 rounded-full inline-flex items-center">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mr-2 h-2 w-2 rounded-full bg-[#3CAAFF]"
            />
            <span className="text-[#3CAAFF]/90">Premium Digital Solutions</span>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mb-8 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
        >
            Digital Excellence
          <br />
          <span className="bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent">
            Delivered
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mx-auto mb-12 max-w-3xl text-xl text-[#BDBDBD] leading-relaxed font-light"
        >
          Elevating businesses through innovative digital solutions. From custom web
          development to comprehensive branding, we create sophisticated digital
          experiences that drive growth and success.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleScroll}
          className="relative inline-flex items-center gap-3 overflow-hidden rounded-full px-10 py-4 bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] text-[#0A0A0A] font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#3CAAFF]/25 group"
        >
          <span className="relative">Explore Our Services</span>
          <ChevronRight className="relative w-5 h-5 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>

      {/* scroll cue */}
      <div className="fixed inset-x-0 bottom-12 flex justify-center pointer-events-none z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ opacity: scrollCueOpacity }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm text-[#BDBDBD]/60">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.6, 1]
            }}
          >
            <ChevronRight className="h-5 w-5 rotate-90 text-[#3CAAFF]/80" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/** --------------------------------------------------------------------------------------------------------------------
 * BRANDING & IDENTITY SECTION
 *  • Re-implemented with useFadeIn() per element instead of continuous scrollOpacity.
 * ------------------------------------------------------------------------------------------------------------------ */
function BrandingIdentitySection() {
  const items = [
    {
      title: "Logo Design",
      desc: "We create unique, eye-catching logos that capture the essence of what you. Whether you run a riding school, competition yard or from another industry we design highly technical logos that seamlessly intertwine text and icons or opt for a more simplistic, elegant approach tailored to your brand.",
      image: "https://i.ibb.co/HLZ3VMKb/GALLOP.webp",
      icon: <Palette className="h-8 w-8 text-blue-400" />,
      features: [
        "Custom logo design",
        "Multiple design concepts",
        "Brand guidelines",
        "File formats for all uses",
      ],
    },
    {
      title: "Brand Collateral",
      desc: "We design high-quality business cards, signage, and digital assets tailored to the equestrian industry. Our branding materials ensure a sophisticated and professional presence across print and digital platforms, maintaining a consistent identity for your equestrian business.",
      image:
        "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&q=80&w=600",
      icon: <Award className="h-8 w-8 text-blue-400" />,
      features: [
        "Business cards",
        "Signage design",
        "Social media templates",
        "Email signatures",
      ],
    },
    {
      title: "Visual Identity",
      desc: "A strong visual identity sets your brand apart. We develop sophisticated branding systems, including color palettes, typography, and imagery, ensuring that your equestrian business maintains a professional and recognizable presence across all platforms.",
      image:
        "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&q=80&w=600",
      icon: <Heart className="h-8 w-8 text-blue-400" />,
      features: [
        "Color palette development",
        "Typography system",
        "Imagery guidelines",
        "Brand voice definition",
      ],
    },
  ];

  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#0B0D12] to-[#10131A]">
      <div className="pointer-events-none absolute inset-0 z-0" style={{ background: "url(/noise.png), linear-gradient(90deg, #0A0A0A 0%, #10131A 100%)", opacity: 0.25 }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-snug mb-6">
            Branding &
            <br />
            <span className="bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent">
              Identity
            </span>
      </h2>
          <p className="text-[#BDBDBD] max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Crafting distinctive brand identities that capture your essence and resonate with your audience.
          </p>
        </motion.div>
        <div className="space-y-32">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col items-center gap-12 lg:flex-row"
            >
              {/* image */}
              <div
                className={`lg:w-1/2 ${
                  index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="group relative">
                    <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-[#3CAAFF]/20 to-[#00E0FF]/20 blur-2xl transition-all duration-500 group-hover:blur-3xl" />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="relative z-10 h-auto max-h-[420px] w-full rounded-2xl object-cover shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:saturate-150"
                  />
                </div>
              </div>

              {/* text */}
              <div
                className={`lg:w-1/2 ${
                  index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="mb-6 flex items-center gap-4">
                    <div className="rounded-xl border border-[#3CAAFF]/20 bg-[#3CAAFF]/5 p-4">
                    {item.icon}
                  </div>
                    <h3 className="text-2xl font-semibold text-white">
                    {item.title}
                  </h3>
                </div>
                  <p className="mb-6 text-lg leading-relaxed text-[#BDBDBD]">
                  {item.desc}
                </p>
                <ul className="space-y-3">
                  {item.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-[#BDBDBD]">
                        <Check className="h-5 w-5 text-[#3CAAFF]" />
                        <span>{feature}</span>
                    </li>
                  ))}
                </ul>
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
function ServicesSection() {
  const services = [
    {
      title: "Custom Website Design & Development",
      problem: "Need a professional website that brings in customers?",
      solution: "We design and build custom websites from scratch",
      description: "Get a completely custom website designed specifically for your business. We handle everything: design, development, content, images, and launch. Your website will be mobile-friendly, fast-loading, and optimized for search engines.",
      icon: <Code className="h-6 w-6 text-[#3CAAFF]" />,
      includes: ["Custom design & development", "Mobile responsive", "Search engine optimized", "Content management system"],
      outcome: "Professional website live quickly",
    },
    {
      title: "E-commerce Store Development",
      problem: "Need a professional online store?",
      solution: "We build complete e-commerce websites that turn visitors into customers.",
      description: "Custom online store with payment processing, inventory management, and customer accounts. Mobile-optimized and ready to sell worldwide.",
      icon: <ShoppingBag className="h-8 w-8 text-[#3CAAFF]" />,
      includes: [
        "Custom store design",
        "Payment gateway setup",
        "Product catalog system",
        "Order management",
        "Customer accounts",
        "Mobile optimization",
      ],
      outcome: "Ready to take orders quickly",
    },
    {
      title: "Business Management Software",
      problem: "Spending too much time on repetitive tasks?",
      solution: "We create custom software that automates your business operations.",
      description: "Tailored solutions for booking systems, client management, invoicing, and workflow automation. Built specifically for your business needs.",
      icon: <Code className="h-8 w-8 text-[#3CAAFF]" />,
      includes: [
        "Custom business logic",
        "Automated workflows",
        "Data management",
        "User permissions",
        "Reporting dashboard",
        "Integration capabilities",
      ],
      outcome: "Save significant time on admin work",
    },
    {
      title: "Search Engine Optimization (SEO)",
      problem: "Not showing up on Google?",
      solution: "We optimize your website to rank higher in search results.",
      description: "Complete SEO strategy including keyword research, content optimization, technical improvements, and ongoing monitoring to increase your visibility.",
      icon: <Search className="h-8 w-8 text-[#3CAAFF]" />,
      includes: [
        "Keyword research",
        "On-page optimization",
        "Technical SEO audit",
        "Content strategy",
        "Local SEO setup",
        "Monthly reporting",
      ],
      outcome: "Higher Google rankings quickly",
    },
    {
      title: "Website Hosting & Maintenance",
      problem: "Worried about website security, backups, and updates?",
      solution: "We host and maintain your website so you don't have to worry",
      description: "Professional website hosting with daily backups, security monitoring, software updates, and technical support. Your website stays fast, secure, and always online while we handle all the technical stuff.",
      icon: <Globe className="h-6 w-6 text-[#3CAAFF]" />,
      includes: ["Secure hosting", "Daily backups", "Security monitoring", "Technical support"],
      outcome: "99.9% uptime with complete peace of mind",
    },
    {
      title: "Digital Marketing & Analytics",
      problem: "Don't know how your website and marketing are performing?",
      solution: "We set up tracking and provide monthly performance reports",
      description: "Get clear insights into your website visitors, where they come from, and what they do. We set up Google Analytics, create custom dashboards, and provide monthly reports with actionable recommendations.",
      icon: <Users className="h-6 w-6 text-[#3CAAFF]" />,
      includes: ["Analytics setup", "Performance tracking", "Monthly reports", "Marketing recommendations"],
      outcome: "Clear data to make better business decisions",
    },
  ];

  return (
    <section id="services" className="relative py-28 overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#0B0D12] to-[#10131A]">
      <div className="pointer-events-none absolute inset-0 z-0" style={{ background: "url(/noise.png), linear-gradient(90deg, #0A0A0A 0%, #10131A 100%)", opacity: 0.25 }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-snug mb-6">
            How We Help Your
            <br />
            <span className="bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent">
              Business Grow
            </span>
      </h2>
          <p className="text-[#BDBDBD] max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Simple solutions for common business problems. No technical jargon, just results.
          </p>
        </motion.div>
        <div className="space-y-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.2 }}
              className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
            >
              {/* Content */}
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl border border-[#3CAAFF]/20 bg-[#3CAAFF]/5 p-3">
                {service.icon}
              </div>
                  <h3 className="text-2xl font-bold text-white">
                {service.title}
              </h3>
            </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-[#BDBDBD] text-lg leading-relaxed">{service.problem}</p>
                  </div>
                  
                  <div>
                    <p className="text-white text-xl font-medium leading-relaxed">{service.solution}</p>
                  </div>
                  
                  <p className="text-[#BDBDBD] leading-relaxed">
                {service.description}
              </p>
                </div>
                
                <div className="bg-[#181B22] rounded-xl p-6 border border-[#2a2d35]">
                  <p className="text-[#00E0FF] font-medium mb-3">What's Included:</p>
                  <ul className="space-y-2">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[#BDBDBD]">
                        <Check className="h-4 w-4 text-[#3CAAFF] flex-shrink-0" />
                        <span>{item}</span>
                  </li>
                ))}
              </ul>
                </div>
                
                <div className="bg-gradient-to-r from-[#3CAAFF]/10 to-[#00E0FF]/10 rounded-xl p-6 border border-[#3CAAFF]/20">
                  <p className="text-[#3CAAFF] font-medium mb-2">Expected Outcome:</p>
                  <p className="text-white font-medium">{service.outcome}</p>
                </div>
              </div>
              
              {/* Visual representation */}
              <motion.div 
                className="lg:w-1/2"
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut",
                    delay: index * 0.15 + 0.3
                  }
                }}
              >
                <motion.div 
                  className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#181B22] to-[#0F1117] border border-[#3CAAFF]/20 p-8 relative overflow-hidden group"
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: "rgba(60, 170, 255, 0.4)",
                    boxShadow: "0 20px 40px rgba(60, 170, 255, 0.1)"
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div 
                      className="absolute inset-0" 
                      style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                        backgroundSize: '20px 20px'
                      }}
                    />
                  </div>
                  
                  {/* Service-specific visual */}
                  {index === 0 && ( // Website Design
                    <div className="relative h-full flex flex-col justify-center">
                      <div className="bg-[#2a2d35] rounded-lg p-4 mb-4 border border-[#3CAAFF]/30">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-3 h-3 rounded-full bg-[#FF6B6B]" />
                          <div className="w-3 h-3 rounded-full bg-[#FFD93D]" />
                          <div className="w-3 h-3 rounded-full bg-[#6BCF7F]" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-[#3CAAFF]/30 rounded w-3/4" />
                          <div className="h-2 bg-[#BDBDBD]/20 rounded w-1/2" />
                          <div className="h-8 bg-[#3CAAFF]/20 rounded" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Smartphone className="w-6 h-6 text-[#3CAAFF]" />
                        <Globe className="w-6 h-6 text-[#00E0FF]" />
                        <Zap className="w-6 h-6 text-[#3CAAFF]" />
                      </div>
                    </div>
                  )}
                  
                  {index === 1 && ( // E-commerce
                    <div className="relative h-full flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {[1,2,3,4].map((item) => (
                          <div key={item} className="bg-[#2a2d35] rounded-lg p-3 border border-[#3CAAFF]/20">
                            <div className="w-full h-8 bg-[#3CAAFF]/20 rounded mb-2" />
                            <div className="h-1 bg-[#BDBDBD]/30 rounded mb-1" />
                            <div className="h-1 bg-[#BDBDBD]/30 rounded w-2/3" />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center gap-3">
                        <ShoppingBag className="w-6 h-6 text-[#3CAAFF]" />
                        <div className="w-6 h-6 rounded bg-[#00E0FF]/20 flex items-center justify-center text-xs text-[#00E0FF]">£</div>
                        <Check className="w-6 h-6 text-[#6BCF7F]" />
                      </div>
                    </div>
                  )}
                  
                  {index === 2 && ( // Business Software
                    <div className="relative h-full flex flex-col justify-center">
                      <div className="bg-[#2a2d35] rounded-lg p-4 mb-4 border border-[#3CAAFF]/30">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[#3CAAFF] text-sm font-medium">Dashboard</span>
                          <Users className="w-4 h-4 text-[#3CAAFF]" />
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          <div className="bg-[#3CAAFF]/20 rounded p-2 text-center">
                            <div className="text-xs text-[#3CAAFF]">24</div>
                            <div className="text-xs text-[#BDBDBD]">Clients</div>
                          </div>
                          <div className="bg-[#00E0FF]/20 rounded p-2 text-center">
                            <div className="text-xs text-[#00E0FF]">12</div>
                            <div className="text-xs text-[#BDBDBD]">Bookings</div>
                          </div>
                          <div className="bg-[#6BCF7F]/20 rounded p-2 text-center">
                            <div className="text-xs text-[#6BCF7F]">£2.4k</div>
                            <div className="text-xs text-[#BDBDBD]">Revenue</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center gap-3">
                        <Zap className="w-6 h-6 text-[#3CAAFF]" />
                        <Users className="w-6 h-6 text-[#00E0FF]" />
                        <Star className="w-6 h-6 text-[#6BCF7F]" />
                      </div>
                    </div>
                  )}
                  
                  {index === 3 && ( // SEO
                    <div className="relative h-full flex flex-col justify-center">
                      <div className="bg-[#2a2d35] rounded-lg p-4 mb-4 border border-[#3CAAFF]/30">
                        <div className="flex items-center gap-2 mb-3">
                          <Search className="w-4 h-4 text-[#3CAAFF]" />
                          <span className="text-[#3CAAFF] text-sm">Search Results</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-[#6BCF7F]/20 flex items-center justify-center text-xs text-[#6BCF7F]">1</div>
                            <div className="h-2 bg-[#6BCF7F]/30 rounded flex-1" />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-[#3CAAFF]/20 flex items-center justify-center text-xs text-[#3CAAFF]">2</div>
                            <div className="h-2 bg-[#3CAAFF]/30 rounded flex-1" />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-[#BDBDBD]/20 flex items-center justify-center text-xs text-[#BDBDBD]">3</div>
                            <div className="h-2 bg-[#BDBDBD]/20 rounded w-3/4" />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center gap-3">
                        <Search className="w-6 h-6 text-[#3CAAFF]" />
                        <Globe className="w-6 h-6 text-[#00E0FF]" />
                        <ArrowRight className="w-6 h-6 text-[#6BCF7F]" />
                      </div>
                    </div>
                  )}
                  
                  {index === 4 && ( // Hosting
                    <div className="relative h-full flex flex-col justify-center">
                      <div className="bg-[#2a2d35] rounded-lg p-4 mb-4 border border-[#3CAAFF]/30">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[#6BCF7F] text-sm font-medium">System Status</span>
                          <div className="w-2 h-2 rounded-full bg-[#6BCF7F] animate-pulse" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-[#BDBDBD]">Uptime</span>
                            <span className="text-xs text-[#6BCF7F]">99.9%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-[#BDBDBD]">Speed</span>
                            <span className="text-xs text-[#3CAAFF]">1.2s</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-[#BDBDBD]">Security</span>
                            <span className="text-xs text-[#6BCF7F]">Protected</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center gap-3">
                        <Globe className="w-6 h-6 text-[#3CAAFF]" />
                        <Shield className="w-6 h-6 text-[#6BCF7F]" />
                        <Zap className="w-6 h-6 text-[#00E0FF]" />
                      </div>
                    </div>
                  )}
                  
                  {index === 5 && ( // Analytics
                    <div className="relative h-full flex flex-col justify-center">
                      <div className="bg-[#2a2d35] rounded-lg p-4 mb-4 border border-[#3CAAFF]/30">
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="w-4 h-4 text-[#3CAAFF]" />
                          <span className="text-[#3CAAFF] text-sm">Analytics</span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-end gap-1 h-12">
                            {[3, 7, 5, 9, 6, 8, 4].map((height, i) => (
                              <motion.div 
                                key={i} 
                                className="bg-[#3CAAFF]/30 rounded-sm flex-1" 
                                initial={{ height: 0 }}
                                animate={{ 
                                  height: `${height * 4}px`,
                                  transition: {
                                    duration: 0.8,
                                    delay: i * 0.1 + 0.5,
                                    ease: "easeOut"
                                  }
                                }}
                              />
                            ))}
                          </div>
                          <motion.div 
                            className="text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ 
                              opacity: 1, 
                              y: 0,
                              transition: { delay: 1.2, duration: 0.6 }
                            }}
                          >
                            <span className="text-xs text-[#6BCF7F]">↗ +127% Growth</span>
                          </motion.div>
                        </div>
                      </div>
                      <div className="flex justify-center gap-3">
                        <motion.div
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            transition: { 
                              duration: 2, 
                              repeat: Infinity, 
                              delay: 1.5,
                              ease: "easeInOut" 
                            }
                          }}
                        >
                          <Users className="w-6 h-6 text-[#3CAAFF]" />
                        </motion.div>
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            transition: { 
                              duration: 2, 
                              repeat: Infinity, 
                              delay: 1.7,
                              ease: "easeInOut" 
                            }
                          }}
                        >
                          <Star className="w-6 h-6 text-[#00E0FF]" />
                        </motion.div>
                        <motion.div
                          animate={{ 
                            x: [0, 5, 0],
                            transition: { 
                              duration: 2, 
                              repeat: Infinity, 
                              delay: 1.9,
                              ease: "easeInOut" 
                            }
                          }}
                        >
                          <ArrowRight className="w-6 h-6 text-[#6BCF7F]" />
                        </motion.div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
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
            <HeroSection />
            <BrandingIdentitySection />
            <ServicesSection />
            <GlobalReachSection />
            <ContactSection navigate={navigate} />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}