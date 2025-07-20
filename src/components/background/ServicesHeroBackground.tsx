import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ServicesHeroBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create a structured grid for both particles and lines
    const gridSize = 8; // 8x8 grid
    const spacing = 2.5;
    const particlePositions: number[] = [];
    const particleColors: number[] = [];
    const particleSizes: number[] = [];
    const linePositions: number[] = [];
    const lineColors: number[] = [];

    // Create particles at grid intersection points
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = (i - gridSize / 2) * spacing;
        const y = (j - gridSize / 2) * spacing;
        const z = (Math.random() - 0.5) * 2;

        particlePositions.push(x, y, z);

        // Subtle blue gradient
        const intensity = 0.4 + Math.random() * 0.4;
        particleColors.push(
          0.2 * intensity,     // R
          0.6 * intensity,     // G
          1.0 * intensity      // B
        );

        particleSizes.push(1.8 + Math.random() * 0.8);
      }
    }

    // Create lines connecting the grid points
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const currentIndex = i * gridSize + j;
        const x1 = particlePositions[currentIndex * 3];
        const y1 = particlePositions[currentIndex * 3 + 1];
        const z1 = particlePositions[currentIndex * 3 + 2];

        // Connect to right neighbor
        if (j < gridSize - 1) {
          const rightIndex = i * gridSize + (j + 1);
          const x2 = particlePositions[rightIndex * 3];
          const y2 = particlePositions[rightIndex * 3 + 1];
          const z2 = particlePositions[rightIndex * 3 + 2];

          linePositions.push(x1, y1, z1, x2, y2, z2);
          lineColors.push(0.2, 0.6, 1.0, 0.2, 0.6, 1.0);
        }

        // Connect to bottom neighbor
        if (i < gridSize - 1) {
          const bottomIndex = (i + 1) * gridSize + j;
          const x2 = particlePositions[bottomIndex * 3];
          const y2 = particlePositions[bottomIndex * 3 + 1];
          const z2 = particlePositions[bottomIndex * 3 + 2];

          linePositions.push(x1, y1, z1, x2, y2, z2);
          lineColors.push(0.2, 0.6, 1.0, 0.2, 0.6, 1.0);
        }

        // Add some diagonal connections for more network feel
        if (i < gridSize - 1 && j < gridSize - 1 && Math.random() > 0.7) {
          const diagonalIndex = (i + 1) * gridSize + (j + 1);
          const x2 = particlePositions[diagonalIndex * 3];
          const y2 = particlePositions[diagonalIndex * 3 + 1];
          const z2 = particlePositions[diagonalIndex * 3 + 2];

          linePositions.push(x1, y1, z1, x2, y2, z2);
          lineColors.push(0.2, 0.6, 1.0, 0.2, 0.6, 1.0);
        }
      }
    }

    // Create particles geometry
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));
    particlesGeometry.setAttribute('size', new THREE.Float32BufferAttribute(particleSizes, 1));

    // Particle material
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Very subtle movement
          float wave = sin(time * 0.3 + position.x * 0.2) * 0.03;
          mvPosition.xyz += wave;
          
          gl_PointSize = size * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5));
          if (distance > 0.5) discard;
          
          float alpha = 1.0 - distance * 2.0;
          gl_FragColor = vec4(vColor, alpha * 0.5);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particles);

    // Create lines geometry
    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3CAAFF,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });

    const lines = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(lines);

    // Animation
    const animate = (time: number) => {
      animationRef.current = requestAnimationFrame(animate);

      // Update particle material time uniform
      if (particleMaterial.uniforms.time) {
        particleMaterial.uniforms.time.value = time * 0.001;
      }

      // Very slow, subtle rotation
      particles.rotation.y += 0.0002;
      particles.rotation.x += 0.0001;

      // Very slow line rotation
      lines.rotation.y += 0.0003;

      renderer.render(scene, camera);
    };

    animate(0);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ServicesHeroBackground; 