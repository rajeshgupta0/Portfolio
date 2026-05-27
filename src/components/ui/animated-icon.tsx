import { motion, Variants, useReducedMotion, HTMLMotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useViewMode } from '@/contexts/ViewModeContext';

interface AnimatedIconProps {
  icon: LucideIcon;
  size?: number;
  /** Stagger delay for multiple icons (e.g., 0, 0.3, 0.6) */
  delay?: number;
  /** Additional classes for the icon itself */
  iconClassName?: string;
  /** Additional classes for the wrapper */
  className?: string;
  /** Disable all animations */
  static?: boolean;
}

// Idle animation variants - continuous subtle motion
const idleVariants: Variants = {
  animate: (delay: number) => ({
    rotate: [0, 360],
    scale: [1, 1.08, 1],
    transition: {
      rotate: {
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
        delay,
      },
      scale: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      },
    },
  }),
};

// Reduced motion variants - no rotation, minimal scale
const reducedMotionVariants: Variants = {
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Static variants for recruiter mode
const staticVariants: Variants = {
  animate: {
    scale: 1,
    rotate: 0,
  },
};

export const AnimatedIcon = ({
  icon: Icon,
  size = 20,
  delay = 0,
  iconClassName = '',
  className = '',
  static: isStatic = false,
}: AnimatedIconProps) => {
  const prefersReducedMotion = useReducedMotion();
  const { isRecruiterMode, performance } = useViewMode();

  // Determine which variant set to use
  const shouldBeStatic = isStatic || isRecruiterMode;
  const shouldReduceMotion = prefersReducedMotion || performance.reducedMotion;

  const variants = shouldBeStatic
    ? staticVariants
    : shouldReduceMotion
    ? reducedMotionVariants
    : idleVariants;

  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      variants={variants}
      animate="animate"
      custom={delay}
      whileHover={
        shouldBeStatic
          ? undefined
          : {
              scale: 1.15,
              rotateY: 180,
              transition: {
                scale: { duration: 0.2, ease: 'easeOut' },
                rotateY: { duration: 0.3, ease: 'easeOut' },
              },
            }
      }
      whileTap={
        shouldBeStatic
          ? undefined
          : {
              scale: 0.9,
              transition: {
                type: 'spring',
                stiffness: 400,
                damping: 17,
              },
            }
      }
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      <Icon
        size={size}
        className={`transition-[filter] duration-300 ${
          shouldBeStatic ? '' : 'hover:drop-shadow-[0_0_8px_currentColor]'
        } ${iconClassName}`}
      />
    </motion.div>
  );
};

// Wrapper for icon links with proper focus styles
interface AnimatedIconLinkProps extends AnimatedIconProps {
  href: string;
  label: string;
  linkClassName?: string;
}

export const AnimatedIconLink = ({
  href,
  label,
  linkClassName = '',
  ...iconProps
}: AnimatedIconLinkProps) => {
  return (
    <a
      href={href}
      aria-label={label}
      className={`inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg ${linkClassName}`}
    >
      <AnimatedIcon {...iconProps} />
    </a>
  );
};
