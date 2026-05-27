import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RippleEffect {
  id: number;
  x: number;
  y: number;
}

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  tiltStrength?: number;
  parallaxStrength?: number;
  floatAmplitude?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  glowColor = 'hsl(var(--neon-primary))',
  tiltStrength = 15,
  parallaxStrength = 20,
  floatAmplitude = 8,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [tiltStrength, -tiltStrength]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-tiltStrength, tiltStrength]), {
    stiffness: 200,
    damping: 30,
  });

  const contentX = useSpring(useTransform(mouseX, [0, 1], [parallaxStrength, -parallaxStrength]), {
    stiffness: 150,
    damping: 25,
  });
  const contentY = useSpring(useTransform(mouseY, [0, 1], [parallaxStrength, -parallaxStrength]), {
    stiffness: 150,
    damping: 25,
  });

  const glowX = useTransform(mouseX, [0, 1], [0, 100]);
  const glowY = useTransform(mouseY, [0, 1], [0, 100]);

  const shadowX = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), { stiffness: 200, damping: 30 });
  const shadowY = useSpring(useTransform(mouseY, [0, 1], [-20, 20]), { stiffness: 200, damping: 30 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, { id, x, y }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 800);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={cn('relative group cursor-pointer', className)}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{
        y: isHovered ? -floatAmplitude : 0,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <motion.div
        className="relative w-full h-full rounded-xl overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Gradient border glow */}
        <motion.div
          className="absolute -inset-[1px] rounded-xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, hsl(var(--neon-primary)), hsl(var(--neon-accent)), hsl(var(--neon-warning)), hsl(var(--neon-primary)))`,
            backgroundSize: '300% 300%',
          }}
          animate={isHovered ? {
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* Card body */}
        <div className="relative z-10 rounded-xl bg-background/80 backdrop-blur-xl border border-white/5 h-full overflow-hidden">
          {/* Neon glow highlight following cursor */}
          <motion.div
            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([x, y]: number[]) =>
                  `radial-gradient(circle at ${x}% ${y}%, hsl(var(--neon-primary) / 0.3), transparent 60%)`
              ),
            }}
          />

          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100"
            animate={isHovered ? {
              backgroundPosition: ['-200% 0%', '200% 0%'],
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            style={{
              background: 'linear-gradient(90deg, transparent 30%, hsl(var(--neon-primary) / 0.08) 50%, transparent 70%)',
              backgroundSize: '200% 100%',
            }}
          />

          {/* Parallax content wrapper */}
          <motion.div
            className="relative z-10"
            style={{ x: contentX, y: contentY }}
          >
            {children}
          </motion.div>

          {/* Click ripple effects */}
          {ripples.map(ripple => (
            <motion.span
              key={ripple.id}
              className="absolute z-20 rounded-full pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
                x: '-50%',
                y: '-50%',
                background: 'radial-gradient(circle, hsl(var(--neon-primary) / 0.4), transparent 70%)',
              }}
              initial={{ width: 0, height: 0, opacity: 0.8 }}
              animate={{ width: 300, height: 300, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          ))}
        </div>

        {/* Dynamic shadow */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            x: shadowX,
            y: shadowY,
            filter: 'blur(30px)',
            background: 'hsl(var(--neon-primary) / 0.15)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};
