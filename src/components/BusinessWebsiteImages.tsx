import React, { useState, useCallback, memo } from "react";
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

// Overlap and angles for a photostack look
const overlapConfig = [
  { x: -180, y: 35, rotate: -8, scale: 0.94, z: 8 },  // left
  { x: 0,    y: 0,  rotate: 0,   scale: 1,    z: 20 }, // main
  { x: 180,  y: 40, rotate: 8,   scale: 0.94, z: 12 }, // right
];

const mobileOverlapConfig = [
  { x: -80, y: 16, rotate: -6, scale: 0.89, z: 8 },
  { x: 0,   y: 0,  rotate: 0,  scale: 1,    z: 20 },
  { x: 80,  y: 19, rotate: 6,  scale: 0.89, z: 12 },
];

const mainImgClass = "w-60 h-40 md:w-[340px] md:h-[230px] lg:w-[440px] lg:h-[300px]";
const sideImgClass = "w-40 h-28 md:w-[230px] md:h-[155px] lg:w-[280px] lg:h-[190px]";

const BusinessWebsiteImages: React.FC<BusinessWebsiteImagesProps> = memo(({ mobile }) => {
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({});

  const handleImageLoad = useCallback((src: string) => {
    setImagesLoaded((prev) => ({ ...prev, [src]: true }));
  }, []);

  const config = mobile ? mobileOverlapConfig : overlapConfig;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${
        mobile ? "w-full max-w-xs h-[220px]" : "w-[480px] h-[380px] md:w-[600px] md:h-[500px]"
      }`}
      style={{ minWidth: mobile ? 0 : 320 }}
    >
      {images.map((img, idx) => {
        const isMain = idx === 1;
        const base = config[idx];

        return (
          <motion.div
            key={img.src}
            initial={{ opacity: 0, scale: base.scale, x: base.x, y: base.y, rotate: base.rotate }}
            animate={{
              x: base.x,
              y: base.y,
              scale: base.scale,
              rotate: base.rotate,
              opacity: imagesLoaded[img.src] ? 1 : 0,
              filter: "brightness(1) saturate(1)",
            }}
            transition={{
              type: "tween",
              duration: 0.45,
              ease: "easeInOut"
            }}
            className="absolute"
            style={{
              zIndex: base.z,
              pointerEvents: "none",
            }}
          >
            <div
              className={`relative overflow-hidden rounded-2xl border-2 border-white/40 shadow-xl ring-1 ring-black/10 backdrop-blur-md
                ${isMain ? mainImgClass : sideImgClass}
              `}
              style={{
                background:
                  "linear-gradient(130deg, rgba(255,255,255,0.2) 0%, rgba(90,175,255,0.06) 100%)",
                boxShadow: "0 4px 20px 0 rgba(20,30,50,0.13), 0 1px 3px rgba(80,165,255,0.08)",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                onLoad={() => handleImageLoad(img.src)}
                className="w-full h-full object-cover"
                style={{
                  borderRadius: "1.1rem",
                }}
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