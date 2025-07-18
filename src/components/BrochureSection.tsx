import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import HTMLFlipBook from 'react-pageflip';
import { 
  BookOpen, 
  Shield, 
  Users, 
  Zap, 
  Clock, 
  Award, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Star,
  Globe,
  Code,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const BrochureSection = () => {
  const flipBook = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3; // Only front cover + 2 pages

  const nextPage = () => {
    if (flipBook.current) {
      flipBook.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (flipBook.current) {
      flipBook.current.pageFlip().flipPrev();
    }
  };

  const handleFlip = (e: any) => {
    console.log('Page flipped:', e);
    setCurrentPage(e.data || 0);
  };



  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#111111]/80 to-[#111111]/90 backdrop-blur-xl border border-[#3CAAFF]/30 shadow-[0_0_30px_rgba(60,170,255,0.1)] mb-12"
          >
            <BookOpen className="w-6 h-6 text-[#3CAAFF]" />
            <span className="text-white/90 font-semibold text-base">Our Promise</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl lg:text-5xl font-bold mb-8 leading-tight"
          >
            <span className="text-white">
              Commitment to{" "}
            </span>
            <span className="bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent">
              Your Success
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-[#B8BCC4] max-w-4xl mx-auto leading-relaxed"
          >
            Discover our comprehensive approach to delivering exceptional digital solutions. 
            Turn the pages to explore what makes us your ideal technology partner.
          </motion.p>
        </motion.div>

        {/* Interactive Brochure */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center mb-16"
        >
          <div className="relative">
            {/* Realistic brochure shadow */}
            <div className="absolute -inset-8 bg-black/20 rounded-2xl blur-2xl transform rotate-1" />
            <div className="absolute -inset-6 bg-black/10 rounded-2xl blur-xl transform -rotate-1" />
            
            {/* Navigation Arrows */}
            {/* Left Arrow */}
            {currentPage > 0 && (
              <motion.button
                onClick={prevPage}
                className="absolute left-[-100px] top-1/2 transform -translate-y-1/2 z-20 
                           bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] hover:from-[#2A9AEF] hover:to-[#00D0EF] 
                           rounded-full p-4 shadow-[0_0_20px_rgba(60,170,255,0.4)] 
                           hover:shadow-[0_0_30px_rgba(60,170,255,0.6)] transition-all duration-300 
                           border border-[#3CAAFF]/50 backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ChevronLeft className="w-6 h-6 text-white drop-shadow-sm" />
              </motion.button>
            )}

            {/* Right Arrow */}
            {currentPage < totalPages - 1 && (
              <motion.button
                onClick={nextPage}
                className="absolute right-[-100px] top-1/2 transform -translate-y-1/2 z-20 
                           bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] hover:from-[#2A9AEF] hover:to-[#00D0EF] 
                           rounded-full p-4 shadow-[0_0_20px_rgba(60,170,255,0.4)] 
                           hover:shadow-[0_0_30px_rgba(60,170,255,0.6)] transition-all duration-300 
                           border border-[#3CAAFF]/50 backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <ChevronRight className="w-6 h-6 text-white drop-shadow-sm" />
              </motion.button>
            )}
            
            {/* Page Indicator */}
            <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 
                            flex items-center gap-2 bg-gradient-to-r from-[#111111]/90 to-[#111111]/95 
                            backdrop-blur-xl px-6 py-3 rounded-full border border-[#3CAAFF]/30 
                            shadow-[0_0_20px_rgba(60,170,255,0.2)]">
              <span className="text-sm text-white/90 font-medium">
                {currentPage + 1} / {totalPages}
              </span>
            </div>
            
            {/* React PageFlip Brochure */}
            <div className="flex justify-center">
              <HTMLFlipBook
                ref={flipBook}
                width={800}
                height={1200}
                size="stretch"
                minWidth={600}
                maxWidth={800}
                minHeight={900}
                maxHeight={1200}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={false}
                className="flipbook"
                style={{
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}
                startPage={0}
                drawShadow={true}
                flippingTime={1000}
                usePortrait={true}
                startZIndex={0}
                autoSize={false}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={true}
                disableFlipByClick={false}
                onFlip={handleFlip}
              >
                {/* Front Cover */}
                <div className="page-cover" style={{ 
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0',
                  height: '100%',
                  overflow: 'hidden'
                }}>
                  <img 
                    src="/Our promise to new and existing clients.svg"
                    alt="Our Promise to New and Existing Clients"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center'
                    }}
                  />
                </div>

                {/* Page 1 - Custom Image */}
                <div className="page" style={{ 
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0',
                  height: '100%',
                  overflow: 'hidden'
                }}>
                  <img 
                    src="/Our promise to new and existing clients (1).png"
                    alt="Our Promise to New and Existing Clients - Page 2"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                </div>

                {/* Page 2 - Support */}
                <div className="page" style={{ 
                  background: '#f8fafc',
                  padding: '40px',
                  color: '#1f2937',
                  height: '100%',
                  overflow: 'hidden'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '20px'
                    }}>
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0 }}>24/7 Support</h3>
                      <p style={{ color: '#3CAAFF', margin: 0, fontWeight: '500' }}>Always Here for You</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px' }}>
                    Our commitment doesn't end at delivery. We provide ongoing support to ensure 
                    your success long after the project launch.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div style={{ background: '#eff6ff', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3CAAFF' }}>24/7</div>
                      <div style={{ fontSize: '0.9rem' }}>Support Available</div>
                    </div>
                    <div style={{ background: '#eff6ff', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3CAAFF' }}>&lt;2hrs</div>
                      <div style={{ fontSize: '0.9rem' }}>Response Time</div>
                    </div>
                    <div style={{ background: '#eff6ff', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3CAAFF' }}>50+</div>
                      <div style={{ fontSize: '0.9rem' }}>Countries Served</div>
                    </div>
                    <div style={{ background: '#eff6ff', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3CAAFF' }}>99%</div>
                      <div style={{ fontSize: '0.9rem' }}>Client Satisfaction</div>
                    </div>
                  </div>
                </div>
              </HTMLFlipBook>
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default BrochureSection; 