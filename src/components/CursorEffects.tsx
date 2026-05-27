import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  age: number;
  maxAge: number;
}

export const CursorEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const animationFrameRef = useRef<number>();

  // Particle system with requestAnimationFrame
  useEffect(() => {
    const updateParticles = () => {
      setParticles(prev => {
        const updated = prev
          .map(particle => ({
            ...particle,
            age: particle.age + 1
          }))
          .filter(particle => particle.age < particle.maxAge);
        
        return updated;
      });
      
      animationFrameRef.current = requestAnimationFrame(updateParticles);
    };
    
    animationFrameRef.current = requestAnimationFrame(updateParticles);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Track mouse movement and spawn particles
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      
      // Spawn particle trail (up to 20 particles)
      if (Math.random() < 0.4) {
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x: newPosition.x,
          y: newPosition.y,
          age: 0,
          maxAge: 60 // ~1 second at 60fps
        };
        
        setParticles(prev => {
          const updated = [...prev, newParticle];
          return updated.slice(-20); // Keep only last 20 particles
        });
      }
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: -100, y: -100 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Cursor Glow with Screen Blend Mode */}
      <motion.div
        className="fixed w-64 h-64 rounded-full pointer-events-none"
        style={{
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
          background: 'radial-gradient(circle, hsl(var(--neon-primary) / 0.6) 0%, hsl(var(--neon-primary) / 0.3) 30%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Particle Trail System */}
      {particles.map((particle, index) => {
        const opacity = 1 - (particle.age / particle.maxAge);
        const scale = 1 - (particle.age / particle.maxAge) * 0.5;
        const positionInSequence = index / Math.max(particles.length - 1, 1);
        
        return (
          <div
            key={particle.id}
            className="fixed w-2 h-2 rounded-full pointer-events-none"
            style={{
              left: particle.x - 4,
              top: particle.y - 4,
              background: `radial-gradient(circle, hsl(var(--neon-primary)), hsl(var(--neon-accent)))`,
              opacity: opacity * (0.3 + positionInSequence * 0.7),
              transform: `scale(${scale})`,
              boxShadow: `0 0 ${8 * opacity}px hsl(var(--neon-primary))`,
            }}
          />
        );
      })}
    </div>
  );
};