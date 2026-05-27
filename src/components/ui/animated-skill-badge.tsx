import { motion, Variants, useReducedMotion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useViewMode } from '@/contexts/ViewModeContext';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

interface AnimatedSkillBadgeProps {
  icon: LucideIcon;
  name: string;
  description: string;
  level: number;
  colorGradient: string;
  /** Stagger delay for multiple badges */
  delay?: number;
  /** Index for entrance animation */
  index?: number;
}

// Ring rotation variants
const ringVariants: Variants = {
  idle: {
    rotate: 0,
    scale: 1,
  },
  hover: {
    rotate: 360,
    scale: 1.1,
    transition: {
      rotate: { duration: 2, ease: 'linear', repeat: Infinity },
      scale: { duration: 0.3, ease: 'easeOut' },
    },
  },
};

// Reduced motion ring variants
const reducedRingVariants: Variants = {
  idle: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// Static ring variants for recruiter mode
const staticRingVariants: Variants = {
  idle: { scale: 1, rotate: 0 },
  hover: { scale: 1, rotate: 0 },
};

// Icon pulse animation
const iconPulseVariants: Variants = {
  idle: (delay: number) => ({
    scale: [1, 1.08, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    },
  }),
  hover: {
    scale: 1.15,
    rotateY: 180,
    transition: {
      scale: { duration: 0.2, ease: 'easeOut' },
      rotateY: { duration: 0.3, ease: 'easeOut' },
    },
  },
};

// Reduced motion icon variants
const reducedIconVariants: Variants = {
  idle: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
};

// Static icon variants
const staticIconVariants: Variants = {
  idle: { scale: 1 },
  hover: { scale: 1 },
};

// Hover card variants
const hoverCardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.8,
    transition: { duration: 0.15 },
  },
};

export const AnimatedSkillBadge = ({
  icon: Icon,
  name,
  description,
  level,
  colorGradient,
  delay = 0,
  index = 0,
}: AnimatedSkillBadgeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { isRecruiterMode, performance } = useViewMode();

  const shouldBeStatic = isRecruiterMode;
  const shouldReduceMotion = prefersReducedMotion || performance.reducedMotion;

  // Select appropriate variants
  const ringVariant = shouldBeStatic
    ? staticRingVariants
    : shouldReduceMotion
    ? reducedRingVariants
    : ringVariants;

  const iconVariant = shouldBeStatic
    ? staticIconVariants
    : shouldReduceMotion
    ? reducedIconVariants
    : iconPulseVariants;

  const circumference = 2 * Math.PI * 45;
  const strokeOffset = circumference * (1 - level / 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Holographic Ring Container */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        {/* Animated Gradient Ring */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${colorGradient} p-1`}
          variants={ringVariant}
          initial="idle"
          animate={isHovered ? 'hover' : 'idle'}
        >
          <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
            {/* Animated Icon */}
            <motion.div
              variants={iconVariant}
              initial="idle"
              animate={isHovered ? 'hover' : 'idle'}
              custom={delay}
              style={{
                perspective: 1000,
                transformStyle: 'preserve-3d',
              }}
            >
              <Icon
                className={`w-12 h-12 transition-all duration-300 ${
                  isHovered
                    ? 'text-neon-primary drop-shadow-[0_0_12px_hsl(var(--neon-primary))]'
                    : 'text-foreground-muted'
                }`}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Progress Ring SVG */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 100 100"
        >
          {/* Background track */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--foreground-subtle))"
            strokeWidth="2"
            opacity="0.2"
          />
          {/* Animated progress */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--neon-primary))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: strokeOffset }}
            transition={{ duration: 2, delay: index * 0.1, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="drop-shadow-[0_0_10px_hsl(var(--neon-primary))]"
          />
        </svg>

        {/* Level indicator */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-xs font-orbitron font-bold text-neon-primary mt-8">
            {level}%
          </span>
        </motion.div>
      </div>

      {/* Skill Name */}
      <div className="text-center">
        <motion.h3
          className="text-sm font-orbitron font-semibold text-foreground mb-2"
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {name}
        </motion.h3>

        {/* Hover Card */}
        {isHovered && !shouldBeStatic && (
          <motion.div
            variants={hoverCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute z-10 -top-4 left-1/2 transform -translate-x-1/2 w-64"
          >
            <Card className="glass-morphism border-neon-primary/50 p-4 glow-neon">
              <CardContent className="p-0 text-center">
                <h4 className="font-orbitron font-bold text-neon-primary mb-2">
                  {name}
                </h4>
                <p className="text-sm text-foreground-muted">{description}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
