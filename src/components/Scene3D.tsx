import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Floating particle component - golden particles
const FloatingParticle = ({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4 + delay) * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15 + delay;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2 + delay) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.06, 0]} />
      <meshStandardMaterial 
        color="#DAA520" 
        emissive="#DAA520" 
        emissiveIntensity={0.6} 
        metalness={0.9} 
        roughness={0.1} 
      />
    </mesh>
  );
};

// Floating heart shape - warm tones
const FloatingHeart = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x, y + 0.25);
    shape.bezierCurveTo(x, y + 0.25, x - 0.25, y, x - 0.25, y);
    shape.bezierCurveTo(x - 0.25, y - 0.25, x, y - 0.35, x, y - 0.5);
    shape.bezierCurveTo(x, y - 0.35, x + 0.25, y - 0.25, x + 0.25, y);
    shape.bezierCurveTo(x + 0.25, y, x, y + 0.25, x, y + 0.25);
    return shape;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} scale={scale} rotation={[0, 0, Math.PI]}>
        <shapeGeometry args={[heartShape]} />
        <meshStandardMaterial 
          color="#8B4513" 
          emissive="#8B4513" 
          emissiveIntensity={0.35} 
          metalness={0.6} 
          roughness={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
};

// Decorative ring - golden
const DecorativeRing = ({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <torusGeometry args={[0.35, 0.025, 16, 100]} />
      <meshStandardMaterial 
        color="#DAA520" 
        emissive="#DAA520" 
        emissiveIntensity={0.5} 
        metalness={0.95} 
        roughness={0.05} 
      />
    </mesh>
  );
};

// Floating Diya (lamp) light effect
const DiyaLight = ({ position }: { position: [number, number, number] }) => {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame((state) => {
    if (lightRef.current) {
      // Flickering effect
      lightRef.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 8) * 0.3 + Math.sin(state.clock.elapsedTime * 12) * 0.15;
    }
  });

  return (
    <pointLight 
      ref={lightRef}
      position={position} 
      intensity={1.5} 
      color="#FF8C00" 
      distance={8}
      decay={2}
    />
  );
};

// Scene content
const SceneContent = () => {
  return (
    <>
      {/* Ambient and directional lights - warm tones */}
      <ambientLight intensity={0.25} color="#FFE4B5" />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#FFF5E1" />
      <pointLight position={[-5, 5, 5]} intensity={0.6} color="#DAA520" />
      <pointLight position={[5, -5, 5]} intensity={0.4} color="#8B4513" />
      
      {/* Diya lights for warm ambiance */}
      <DiyaLight position={[-6, -3, 2]} />
      <DiyaLight position={[6, -3, 2]} />
      <DiyaLight position={[0, -4, 3]} />
      
      {/* Stars background - warmer tones */}
      <Stars 
        radius={60} 
        depth={60} 
        count={800} 
        factor={3} 
        saturation={0.3} 
        fade 
        speed={0.3} 
      />
      
      {/* Golden sparkles - more prominent */}
      <Sparkles 
        count={100} 
        scale={18} 
        size={2.5} 
        speed={0.2} 
        color="#DAA520" 
      />
      
      {/* Additional warm sparkles */}
      <Sparkles 
        count={50} 
        scale={15} 
        size={1.5} 
        speed={0.15} 
        color="#FF8C00" 
      />
      
      {/* Floating particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <FloatingParticle
          key={i}
          position={[
            (Math.random() - 0.5) * 12,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 6 - 3
          ]}
          delay={i * 0.4}
        />
      ))}
      
      {/* Floating hearts - positioned around edges */}
      <FloatingHeart position={[-4, 2.5, -4]} scale={0.45} />
      <FloatingHeart position={[4, -1.5, -5]} scale={0.35} />
      <FloatingHeart position={[-3, -2.5, -3]} scale={0.28} />
      <FloatingHeart position={[3.5, 2, -4]} scale={0.32} />
      <FloatingHeart position={[-5, 0, -4]} scale={0.25} />
      <FloatingHeart position={[5, 0.5, -3.5]} scale={0.3} />
      
      {/* Decorative rings */}
      <DecorativeRing position={[-5, 1, -6]} rotation={[Math.PI / 4, 0, 0]} />
      <DecorativeRing position={[5, 1.5, -5]} rotation={[0, Math.PI / 4, Math.PI / 6]} />
      <DecorativeRing position={[0, -4, -7]} rotation={[Math.PI / 3, Math.PI / 4, 0]} />
      <DecorativeRing position={[-4, -2, -5]} rotation={[Math.PI / 5, 0, Math.PI / 4]} />
      <DecorativeRing position={[4, -2.5, -6]} rotation={[0, Math.PI / 3, Math.PI / 5]} />
    </>
  );
};

const Scene3D = () => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};

export default Scene3D;
