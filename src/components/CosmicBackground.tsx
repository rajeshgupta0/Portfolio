import React, { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { Points, PointMaterial, Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Star Field Component with Enhanced Visuals
const StarField = ({ count = 8000 }) => {
  const mesh = useRef<THREE.Points>(null);
  const { mouse, clock } = useThree();
  
  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Create a spherical distribution for better depth
      const radius = 800 + Math.random() * 800;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Color based on position and randomness
      const hue = 0.55 + (positions[i * 3 + 2] / 1600) * 0.3; // Cyan to Blue/Purple range
      const saturation = 0.4 + Math.random() * 0.4;
      const lightness = 0.5 + Math.random() * 0.4;
      
      const color = new THREE.Color().setHSL(hue, saturation, lightness);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = 0.5 + Math.random() * 1.5;
    }
    
    return [positions, colors, sizes];
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      // Smooth rotation
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      
      // Mouse interaction
      mesh.current.rotation.x += mouse.y * 0.0002;
      mesh.current.rotation.y += mouse.x * 0.0002;
    }
  });

  return (
    <Points ref={mesh} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
      <bufferAttribute
        attach="geometry-attributes-color"
        args={[colors, 3]}
      />
    </Points>
  );
};

// Enhanced Neural Network with Glowing Lines
const NeuralNetwork = () => {
  const linesRef = useRef<THREE.Group>(null);
  const { mouse, clock } = useThree();
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const nodes = useMemo(() => {
    const nodePositions = [];
    // Create layered nodes for depth
    for (let i = 0; i < 80; i++) {
      const layer = Math.floor(i / 20); // 4 layers
      const radius = 40 + layer * 25;
      const angle = (i % 20) * (Math.PI * 2 / 20);
      
      nodePositions.push(new THREE.Vector3(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 10,
        Math.sin(angle) * radius + (Math.random() - 0.5) * 10,
        (layer - 1.5) * 30 + (Math.random() - 0.5) * 15
      ));
    }
    return nodePositions;
  }, []);

  const connections = useMemo(() => {
    const conns = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].distanceTo(nodes[j]);
        if (distance < 45 && distance > 0) {
          conns.push({ from: nodes[i], to: nodes[j], distance });
        }
      }
    }
    return conns;
  }, [nodes]);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.2;
      linesRef.current.rotation.x = mouse.y * 0.1;
      linesRef.current.rotation.z = mouse.x * 0.1;
    }
  });

  return (
    <group ref={linesRef}>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh 
          key={i} 
          position={node}
          onPointerOver={() => setHoveredNode(i)}
          onPointerOut={() => setHoveredNode(null)}
        >
          <sphereGeometry args={[hoveredNode === i ? 0.8 : 0.5, 16, 16]} />
          <meshStandardMaterial 
            color={hoveredNode === i ? "#00D4FF" : "#FF6B35"}
            emissive={hoveredNode === i ? "#00D4FF" : "#FF6B35"}
            emissiveIntensity={hoveredNode === i ? 0.8 : 0.3}
            transparent 
            opacity={0.8}
          />
        </mesh>
      ))}
      
      {/* Glowing Connections */}
      {connections.map((conn, i) => (
        <Line
          key={i}
          points={[conn.from, conn.to]}
          color="#FF006E"
          opacity={0.15 / (conn.distance / 30)}
          transparent
          lineWidth={0.5}
        />
      ))}
    </group>
  );
};

// Enhanced Particle System with Flow Field
const ParticleSystem = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const { mouse, viewport, clock } = useThree();

  const particleCount = 3000;
  const [positions, velocities, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Torus distribution
      const radius = 50;
      const tubeRadius = 20;
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      
      positions[i * 3] = (radius + tubeRadius * Math.cos(v)) * Math.cos(u);
      positions[i * 3 + 1] = (radius + tubeRadius * Math.cos(v)) * Math.sin(u);
      positions[i * 3 + 2] = tubeRadius * Math.sin(v);
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
      
      const color = new THREE.Color().setHSL(
        0.55 + Math.random() * 0.2,
        0.8,
        0.6
      );
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return [positions, velocities, colors];
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const positionsAttr = particlesRef.current.geometry.attributes.position;
      const positionsArray = positionsAttr.array as Float32Array;
      const time = clock.getElapsedTime();
      
      for (let i = 0; i < particleCount; i++) {
        // Flow field effect using sine/cosine
        const x = positionsArray[i * 3];
        const y = positionsArray[i * 3 + 1];
        const z = positionsArray[i * 3 + 2];
        
        const noiseX = Math.sin(y * 0.03 + time) * 0.02;
        const noiseY = Math.cos(x * 0.03 + time * 0.7) * 0.02;
        const noiseZ = Math.sin(z * 0.03 + time * 0.5) * 0.02;
        
        velocities[i * 3] += noiseX + (mouse.x * viewport.width) * 0.00005;
        velocities[i * 3 + 1] += noiseY + (mouse.y * viewport.height) * 0.00005;
        velocities[i * 3 + 2] += noiseZ;
        
        // Damping
        velocities[i * 3] *= 0.99;
        velocities[i * 3 + 1] *= 0.99;
        velocities[i * 3 + 2] *= 0.99;
        
        positionsArray[i * 3] += velocities[i * 3];
        positionsArray[i * 3 + 1] += velocities[i * 3 + 1];
        positionsArray[i * 3 + 2] += velocities[i * 3 + 2];
        
        // Reset if too far
        if (Math.abs(positionsArray[i * 3]) > 100) {
          positionsArray[i * 3] = (Math.random() - 0.5) * 100;
          velocities[i * 3] = (Math.random() - 0.5) * 0.05;
        }
        if (Math.abs(positionsArray[i * 3 + 1]) > 100) {
          positionsArray[i * 3 + 1] = (Math.random() - 0.5) * 100;
          velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
        }
        if (Math.abs(positionsArray[i * 3 + 2]) > 100) {
          positionsArray[i * 3 + 2] = (Math.random() - 0.5) * 100;
          velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
        }
      }
      
      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <Points ref={particlesRef} positions={positions} stride={3}>
      <PointMaterial
        vertexColors
        size={0.3}
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
      <bufferAttribute
        attach="geometry-attributes-color"
        args={[colors, 3]}
      />
    </Points>
  );
};

// Nebula Effect
const Nebula = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { clock } = useThree();
  
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create nebula-like pattern
      for (let i = 0; i < 500; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 3;
        const alpha = Math.random() * 0.3;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 100, 255, ${alpha})`;
        ctx.fill();
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.01;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.005) * 0.1;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[200, 64, 64]} />
      <meshBasicMaterial 
        map={texture} 
        transparent 
        opacity={0.15}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// Camera Controller for Dynamic Movement
const CameraController = () => {
  const { camera, mouse } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 100));
  
  useFrame(() => {
    // Smooth camera movement based on mouse
    targetPosition.current.x = mouse.x * 15;
    targetPosition.current.y = -mouse.y * 10;
    targetPosition.current.z = 100 + Math.abs(mouse.x) * 10;
    
    camera.position.lerp(targetPosition.current, 0.05);
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

// Main Component
export const CosmicBackground = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10">
      {isLoaded && (
        <Canvas
          camera={{ position: [0, 0, 100], fov: 60 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true
          }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
        >
          {/* Ambient Light for better visibility */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#FF6B35" />
          
          {/* Background Elements */}
          <Nebula />
          <StarField count={6000} />
          
          {/* Dynamic Elements */}
          <NeuralNetwork />
          <ParticleSystem />
          
          {/* Camera Control */}
          <CameraController />
          
          {/* Subtle Fog for Depth */}
          <fog attach="fog" args={['#000000', 150, 300]} />
        </Canvas>
      )}
      
      {/* Fallback Gradient for loading or low-end devices */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-black to-cyan-950/20 pointer-events-none" />
    </div>
  );
};

export default CosmicBackground;