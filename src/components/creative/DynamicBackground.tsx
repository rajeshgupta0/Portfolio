import { useEffect, useRef, useMemo } from 'react';
import { motion, useSpring, useMotionTemplate } from 'framer-motion';
import { useSectionTheme } from '@/hooks/useSectionTheme';
import { useViewMode } from '@/contexts/ViewModeContext';

interface GradientOrb {
  id: number;
  x: number;
  y: number;
  size: number;
  hueOffset: number;
  delay: number;
}

export const DynamicBackground = () => {
  const { theme } = useSectionTheme();
  const { performance } = useViewMode();
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth spring for color transitions
  const primaryHue = useSpring(theme.primaryHue, { stiffness: 50, damping: 30 });
  const glowIntensity = useSpring(theme.glowIntensity, { stiffness: 80, damping: 25 });

  // Update springs when theme changes
  useEffect(() => {
    primaryHue.set(theme.primaryHue);
    glowIntensity.set(theme.glowIntensity);
  }, [theme, primaryHue, glowIntensity]);

  // Pre-compute motion templates at component level (not in render)
  const topGlowGradient = useMotionTemplate`radial-gradient(ellipse 100% 60% at 50% -10%, hsla(${primaryHue}, 100%, 50%, 0.12) 0%, transparent 70%)`;

  // Generate gradient orbs
  const orbs: GradientOrb[] = useMemo(() => {
    return [
      { id: 1, x: 20, y: 20, size: 600, hueOffset: 0, delay: 0 },
      { id: 2, x: 80, y: 80, size: 500, hueOffset: 30, delay: 2 },
      { id: 3, x: 50, y: 50, size: 700, hueOffset: -20, delay: 4 },
    ];
  }, []);

  // Reduced motion check
  if (performance.reducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 bg-background">
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 30%, hsla(${theme.primaryHue}, 80%, 50%, 0.1) 0%, transparent 60%)`,
          }}
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            hsl(222 47% 5%) 0%, 
            hsl(225 43% 4%) 50%, 
            hsl(230 45% 3%) 100%)`,
        }}
      />

      {/* Static gradient orbs - simplified for performance */}
      {performance.enableParticles && orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(80px)',
            background: `radial-gradient(circle, hsla(${theme.primaryHue + orb.hueOffset}, 100%, 50%, 0.08) 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20 + orb.delay * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}

      {/* Section-specific accent glow */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[60vh] pointer-events-none"
        style={{ background: topGlowGradient }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Cyber grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(hsla(${theme.primaryHue}, 100%, 50%, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, hsla(${theme.primaryHue}, 100%, 50%, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 0%, hsl(222 47% 5% / 0.5) 100%)',
        }}
      />
    </div>
  );
};
