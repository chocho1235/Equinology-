import React, { useState, useCallback, memo, useRef } from "react";
import { motion } from "framer-motion";

interface BusinessWebsiteImagesProps {
  mobile?: boolean;
}

const images = [
  {
    src: "/Screenshot 2025-05-26 at 14.15.47.png",
    alt: "Business website example screenshot",
  },
  {
    src: "/Screenshot 2025-05-26 at 14.28.04.png",
    alt: "Additional website screenshot 1",
  },
  {
    src: "/687474703a2f2f64656d6f2e6375726c797468656d65732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031392f30352f30342e6a7067.jpeg",
    alt: "Additional website screenshot 2",
  },
];

// Overlap and angles for a photostack look (desktop only)
const overlapConfig = [
  { x: -180, y: 35, rotate: -8, scale: 0.94, z: 8 },  // left
  { x: 0,    y: 0,  rotate: 0,   scale: 1,    z: 20 }, // main
  { x: 180,  y: 40, rotate: 8,   scale: 0.94, z: 12 }, // right
];

// Desktop sizing
const mainImgClass = "md:w-[340px] md:h-[230px] lg:w-[440px] lg:h-[300px]";
const sideImgClass = "md:w-[230px] md:h-[155px] lg:w-[280px] lg:h-[190px]";

// Mobile single image sizing
const mobileImgClass = "w-64 h-40 sm:w-72 sm:h-44";

const BusinessWebsiteImages: React.FC<BusinessWebsiteImagesProps> = memo(({ mobile }) => {
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = useCallback((src: string) => {
    setImagesLoaded((prev) => ({ ...prev, [src]: true }));
  }, []);

  // Mobile version - single image
  if (mobile) {
    const mainImage = images[1]; // Use the main center image
    
    return (
      <div className="w-full max-w-[320px] h-[200px] sm:max-w-[360px] sm:h-[220px] mx-auto flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{
            opacity: imagesLoaded[mainImage.src] ? 1 : 0,
            scale: 1,
            y: 0,
          }}
          transition={{
            type: "spring",
            duration: 0.6,
            ease: "easeOut",
            stiffness: 100,
            damping: 15
          }}
          className="relative"
        >
          <div
            className={`relative overflow-hidden rounded-lg shadow-lg border-2 border-white/40 backdrop-blur-sm ${mobileImgClass}`}
            style={{
              background: "linear-gradient(130deg, rgba(255,255,255,0.15) 0%, rgba(90,175,255,0.05) 100%)",
              boxShadow: "0 4px 16px 0 rgba(20,30,50,0.1), 0 2px 4px rgba(80,165,255,0.06)",
            }}
          >
            <img
              src={mainImage.src}
              alt={mainImage.alt}
              onLoad={() => handleImageLoad(mainImage.src)}
              className="w-full h-full object-cover"
              style={{ borderRadius: "0.5rem" }}
              draggable={false}
            />
            {!imagesLoaded[mainImage.src] && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#23262F]/10 to-[#23262F]/20 animate-pulse" />
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // Desktop version - 3 image stack with whileInView animation
  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center select-none w-[480px] h-[380px] md:w-[600px] md:h-[500px]"
      style={{ minWidth: 320 }}
    >
      {images.map((img, idx) => {
        const isMain = idx === 1;
        const base = overlapConfig[idx];
        return (
          <motion.div
            key={img.src}
            initial={{ opacity: 0, scale: base.scale * 0.8, x: base.x, y: base.y, rotate: base.rotate }}
            whileInView={{
              opacity: imagesLoaded[img.src] ? 1 : 0,
              scale: base.scale,
              x: base.x,
              y: base.y,
              rotate: base.rotate,
              filter: "brightness(1) saturate(1)",
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              type: "spring",
              duration: 0.6,
              ease: "easeOut",
              delay: idx * 0.15,
              stiffness: 100,
              damping: 15
            }}
            className="absolute"
            style={{ zIndex: base.z }}
          >
            <div
              className={`relative overflow-hidden rounded-2xl border-2 border-white/40 shadow-xl ring-1 ring-black/5 backdrop-blur-md
                ${isMain ? mainImgClass : sideImgClass}
              `}
              style={{
                background: "linear-gradient(130deg, rgba(255,255,255,0.2) 0%, rgba(90,175,255,0.06) 100%)",
                boxShadow: "0 4px 20px 0 rgba(20,30,50,0.13), 0 1px 3px rgba(80,165,255,0.08)",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                onLoad={() => handleImageLoad(img.src)}
                className="w-full h-full object-cover"
                style={{ borderRadius: "1.1rem" }}
                draggable={false}
              />
              {!imagesLoaded[img.src] && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#23262F]/5 to-[#23262F]/10 animate-pulse" />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
});

BusinessWebsiteImages.displayName = "BusinessWebsiteImages";
export default BusinessWebsiteImages;