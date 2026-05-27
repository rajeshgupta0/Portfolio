import { motion, useScroll, useSpring } from 'framer-motion';
import { useSectionTheme } from '@/hooks/useSectionTheme';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const { theme } = useSectionTheme();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
      style={{
        scaleX,
        background: `linear-gradient(90deg, 
          hsla(${theme.primaryHue}, 100%, 50%, 0.8) 0%, 
          hsla(${theme.secondaryHue}, 80%, 60%, 0.8) 50%,
          hsla(${theme.primaryHue}, 100%, 50%, 0.8) 100%)`,
        boxShadow: `0 0 10px hsla(${theme.primaryHue}, 100%, 50%, 0.5)`,
      }}
    />
  );
};
