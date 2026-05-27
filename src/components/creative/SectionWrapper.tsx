import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionId } from '@/hooks/useSectionTheme';

interface SectionWrapperProps {
  id: SectionId;
  children: ReactNode;
  className?: string;
  showDivider?: boolean;
}

export const SectionWrapper = ({ 
  id, 
  children, 
  className = '',
  showDivider = true,
}: SectionWrapperProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-20% 0px -20% 0px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {/* Section top divider */}
      {showDivider && (
        <div className="absolute top-0 left-0 right-0 h-px">
          <motion.div
            className="h-full"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%, 
                hsl(var(--section-${id}) / 0.3) 20%, 
                hsl(var(--section-${id}) / 0.5) 50%, 
                hsl(var(--section-${id}) / 0.3) 80%, 
                transparent 100%)`,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Section glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[50%]"
          style={{
            background: `radial-gradient(ellipse 60% 40% at 50% 0%, 
              hsl(var(--section-${id}) / 0.08) 0%, 
              transparent 70%)`,
          }}
        />
      </motion.div>
    </motion.section>
  );
};
