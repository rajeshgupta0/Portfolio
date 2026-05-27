import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useViewMode } from '@/contexts/ViewModeContext';
import React, { useState, useRef } from 'react';

export type SkillCategory = 'all' | 'frontend' | 'backend' | 'devops' | 'mobile' | 'design' | 'tools';

interface SkillFilterProps {
  categories: { id: SkillCategory; label: string; count: number }[];
  activeCategory: SkillCategory;
  onCategoryChange: (category: SkillCategory) => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
}

const FilterButton = ({ 
  category, 
  isActive, 
  index, 
  onClick,
  isAnimationsDisabled 
}: { 
  category: { id: SkillCategory; label: string; count: number };
  isActive: boolean;
  index: number;
  onClick: () => void;
  isAnimationsDisabled: boolean;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Glow intensity based on hover
  const glowOpacity = useTransform(
    [x, y],
    ([latestX, latestY]: number[]) => {
      const distance = Math.sqrt(latestX * latestX + latestY * latestY);
      return Math.min(0.8, distance / 20);
    }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimationsDisabled || !buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    
    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isAnimationsDisabled && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const rippleX = e.clientX - rect.left;
      const rippleY = e.clientY - rect.top;
      
      // Add ripple
      const rippleId = Date.now();
      setRipples(prev => [...prev, { id: rippleId, x: rippleX, y: rippleY }]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== rippleId));
      }, 600);

      // Add particles
      const newParticles = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        x: rippleX,
        y: rippleY,
        angle: (i * 60) + Math.random() * 30,
      }));
      setParticles(prev => [...prev, ...newParticles]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
      }, 500);
    }
    
    onClick();
  };

  if (isAnimationsDisabled) {
    return (
      <button
        onClick={onClick}
        className={cn(
          'relative px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300',
          'border border-border/50 backdrop-blur-sm',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
          isActive 
            ? 'bg-primary/20 text-primary border-primary/50'
            : 'bg-background/50 text-foreground-muted hover:text-foreground hover:border-primary/30'
        )}
      >
        <span className="flex items-center gap-2">
          {category.label}
          <span className={cn(
            'text-xs px-1.5 py-0.5 rounded-full',
            isActive ? 'bg-primary/30 text-primary' : 'bg-muted/50 text-foreground-muted'
          )}>
            {category.count}
          </span>
        </span>
      </button>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={cn(
        'relative px-5 py-2.5 rounded-full font-medium text-sm',
        'border border-border/50 backdrop-blur-sm overflow-hidden',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
        isActive 
          ? 'bg-primary/20 text-primary border-primary/50'
          : 'bg-background/50 text-foreground-muted'
      )}
      whileTap={{ scale: 0.95 }}
    >
      {/* Magnetic glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + (x.get() * 2)}% ${50 + (y.get() * 2)}%, #00bfff20 0%, transparent 70%)`,
          opacity: glowOpacity,
        }}
      />

      {/* Hover shimmer effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '100%', opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          }}
        />
      )}

      {/* Active indicator glow */}
      {isActive && (
        <motion.div
          layoutId="activeFilterGlow"
          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}

      {/* Ripple effects */}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            background: 'radial-gradient(circle, #00bfff40 0%, transparent 70%)',
          }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.8 }}
          animate={{ width: 150, height: 150, x: -75, y: -75, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}

      {/* Particle burst */}
      {particles.map(particle => (
        <motion.span
          key={particle.id}
          className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            background: '#00bfff',
            boxShadow: '0 0 6px #00bfff',
          }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            x: Math.cos(particle.angle * Math.PI / 180) * 30,
            y: Math.sin(particle.angle * Math.PI / 180) * 30,
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      ))}
      
      {/* Content */}
      <motion.span 
        className="relative z-10 flex items-center gap-2"
        animate={{
          color: isActive ? '#00bfff' : isHovered ? '#e5e7eb' : '#9ca3af',
        }}
        transition={{ duration: 0.2 }}
      >
        {category.label}
        <motion.span 
          className={cn(
            'text-xs px-1.5 py-0.5 rounded-full transition-colors duration-300',
            isActive 
              ? 'bg-primary/30 text-primary'
              : 'bg-muted/50 text-foreground-muted'
          )}
          animate={{
            scale: isHovered && !isActive ? 1.1 : 1,
          }}
        >
          {category.count}
        </motion.span>
      </motion.span>
      
      {/* Active underline */}
      {isActive && (
        <motion.div
          layoutId="activeFilterUnderline"
          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}

      {/* Orbiting dot for active state */}
      {isActive && (
        <motion.div
          className="absolute w-1 h-1 rounded-full bg-primary"
          style={{ boxShadow: '0 0 8px #00bfff' }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          initial={{ top: '50%', left: '-4px', translateY: '-50%' }}
        />
      )}
    </motion.button>
  );
};

export const SkillFilter = ({ categories, activeCategory, onCategoryChange }: SkillFilterProps) => {
  const { isRecruiterMode } = useViewMode();
  const prefersReducedMotion = typeof window !== 'undefined' 
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isAnimationsDisabled = prefersReducedMotion || isRecruiterMode;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-3 mb-12"
    >
      {categories.map((category, index) => (
        <FilterButton
          key={category.id}
          category={category}
          isActive={activeCategory === category.id}
          index={index}
          onClick={() => onCategoryChange(category.id)}
          isAnimationsDisabled={isAnimationsDisabled}
        />
      ))}
    </motion.div>
  );
};
