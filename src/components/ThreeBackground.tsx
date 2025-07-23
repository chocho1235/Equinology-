import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useAnimation } from '../contexts/AnimationContext';

// AnimatedSphere component with mobile optimizations
function AnimatedSphere({ isMobile }: { isMobile: boolean }) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const frameCount = useRef(0);

  useFrame(({ clock }) => {
    if (!sphereRef.current) return;
    
    // On mobile, update every 3rd frame for better performance
    frameCount.current = (frameCount.current + 1) % (isMobile ? 3 : 1);
    if (frameCount.current !== 0) return;

    const elapsed = clock.getElapsedTime();
    
    // Reduced movement amplitude for mobile
    const amplitudeY = isMobile ? 0.08 : 0.15;
    const amplitudeX = isMobile ? 0.05 : 0.1;
    const rotationSpeed = isMobile ? 0.05 : 0.1;
    
    // Apply subtle movement
    sphereRef.current.position.y = Math.sin(elapsed * 0.5) * amplitudeY;
    sphereRef.current.position.x = Math.cos(elapsed * 0.3) * amplitudeX;
    sphereRef.current.rotation.x = elapsed * (rotationSpeed * 0.5);
    sphereRef.current.rotation.y = elapsed * (rotationSpeed * 0.25);
  });

  return (
    <Sphere 
      ref={sphereRef} 
      args={[isMobile ? 1.2 : 1.5, isMobile ? 24 : 32, isMobile ? 24 : 32]} 
      position={[1, 0, -1]}
    >
      <meshPhongMaterial
        color="#3CAAFF"
        opacity={isMobile ? 0.06 : 0.08}
        transparent
        wireframe
      />
    </Sphere>
  );
}

export default function ThreeBackground() {
  const { isMobile } = useAnimation();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    setMounted(true);
    
    // Add a small delay to ensure smooth loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (canvasRef.current) {
            const scrollY = window.scrollY;
            // Reduce opacity based on scroll position
            const opacity = Math.max(0, 1 - (scrollY / window.innerHeight));
            canvasRef.current.style.opacity = opacity.toString();
            setIsVisible(opacity > 0.1);
          }
          lastScrollY.current = window.scrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (!mounted || hasError || isLoading) return null;

  return (
    <div 
      ref={canvasRef}
      className={`absolute inset-0 -z-10 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden"
      }}
    >
      <Canvas 
        camera={{ position: [0, 0, 5] }}
        dpr={[1, isMobile ? 1.5 : 2]} // Lower DPR on mobile
        gl={{ 
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          depth: false, // Disable depth testing for better performance
          failIfMajorPerformanceCaveat: false,
          preserveDrawingBuffer: false,
          stencil: false
        }}
        style={{ mixBlendMode: 'screen' }}
        onError={() => setHasError(true)}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <AnimatedSphere isMobile={isMobile} />
      </Canvas>
    </div>
  );
} 