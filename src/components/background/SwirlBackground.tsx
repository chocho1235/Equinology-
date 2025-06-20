"use client";

import { useEffect, useRef, memo } from 'react';

const SwirlBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const pointsRef = useRef<{ x: number; y: number; angle: number; speed: number }[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size with device pixel ratio
    const resizeCanvas = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(pixelRatio, pixelRatio);
      
      // Reinitialize points when canvas is resized
      initializePoints(width, height);
    };

    // Initialize points in a circular pattern
    const initializePoints = (width: number, height: number) => {
      const numPoints = Math.min(30, Math.floor((width * height) / 60000)); // Reduced number of points
      pointsRef.current = Array.from({ length: numPoints }, (_, i) => ({
        x: width / 2,
        y: height / 2,
        angle: (i / numPoints) * Math.PI * 2,
        speed: 0.08 + Math.random() * 0.08 // Slightly reduced speed
      }));
    };

    resizeCanvas();

    // Throttled resize listener
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };
    window.addEventListener('resize', handleResize);

    // Pre-calculate values that don't change
    const TWO_PI = Math.PI * 2;
    const baseRadius = Math.min(window.innerWidth, window.innerHeight) * 0.3;

    // Create off-screen canvas for gradients
    const gradientCanvas = document.createElement('canvas');
    const gradientCtx = gradientCanvas.getContext('2d');
    gradientCanvas.width = 20;
    gradientCanvas.height = 20;
    if (gradientCtx) {
      const gradient = gradientCtx.createRadialGradient(10, 10, 0, 10, 10, 10);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)'); // Reduced opacity
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      gradientCtx.fillStyle = gradient;
      gradientCtx.fillRect(0, 0, 20, 20);
    }

    const animate = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw points
      const points = pointsRef.current;
      const time = timeRef.current;
      
      ctx.beginPath();
      points.forEach((point, i) => {
        // Update angle
        point.angle += point.speed * 0.01;
        
        // Calculate position in a swirling pattern
        const swirlRadius = baseRadius * (0.5 + Math.sin(time + i * 0.1) * 0.25);
        point.x = width / 2 + Math.cos(point.angle) * swirlRadius;
        point.y = height / 2 + Math.sin(point.angle) * swirlRadius;
        
        // Draw point using pre-rendered gradient
        if (gradientCtx) {
          ctx.drawImage(gradientCanvas, point.x - 10, point.y - 10);
        }
      });
      
      // Draw lines between points for the swirl effect
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const current = points[i];
        const next = points[(i + 1) % points.length];
        
        ctx.moveTo(current.x, current.y);
        ctx.lineTo(next.x, next.y);
      }
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)'; // Reduced opacity
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      timeRef.current += 0.01;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        background: 'transparent',
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    />
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(SwirlBackground); 