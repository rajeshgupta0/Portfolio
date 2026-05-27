import { motion, AnimatePresence } from 'framer-motion';
import { useViewMode } from '@/contexts/ViewModeContext';
import { Sparkles, Briefcase, Zap, Monitor, Cpu } from 'lucide-react';

export const RecruiterModeToggle = () => {
  const { toggleMode, isRecruiterMode, gpuTier } = useViewMode();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 right-4 z-50 flex items-center gap-3"
    >
      {/* GPU Tier Indicator (subtle) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="hidden md:flex items-center gap-1.5 text-[10px] text-foreground-dim"
      >
        <Cpu className="w-3 h-3" />
        <span className="uppercase tracking-wider">{gpuTier}</span>
      </motion.div>
      
      {/* Toggle Button */}
      <button
        onClick={toggleMode}
        className={`
          relative group flex items-center gap-2 px-4 py-2.5 rounded-full
          font-orbitron text-xs tracking-wide uppercase
          transition-all duration-500 ease-out
          ${isRecruiterMode 
            ? 'bg-recruiter-bg border border-recruiter-accent/40 text-recruiter-accent shadow-[0_0_20px_hsl(var(--recruiter-accent)/0.2)]' 
            : 'glass-premium border-neon-primary/20 text-neon-primary hover:border-neon-primary/40'
          }
        `}
      >
        {/* Background glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            isRecruiterMode ? 'bg-recruiter-accent/10' : 'bg-neon-primary/10'
          }`}
        />
        
        <AnimatePresence mode="wait">
          {isRecruiterMode ? (
            <motion.span
              key="immersive"
              initial={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="relative flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Experience Mode</span>
              <span className="sm:hidden">Full</span>
            </motion.span>
          ) : (
            <motion.span
              key="recruiter"
              initial={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="relative flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Recruiter Mode</span>
              <span className="sm:hidden">Quick</span>
            </motion.span>
          )}
        </AnimatePresence>
        
        {/* Animated indicator dot */}
        <motion.span
          className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ${
            isRecruiterMode ? 'bg-recruiter-accent' : 'bg-neon-primary'
          }`}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Outer ring animation */}
        <motion.span
          className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border ${
            isRecruiterMode ? 'border-recruiter-accent' : 'border-neon-primary'
          }`}
          animate={{ 
            scale: [1, 2],
            opacity: [0.5, 0],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </button>
      
      {/* Mode description tooltip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute top-full right-0 mt-3 hidden md:block"
      >
        <div className={`
          flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] tracking-wide
          ${isRecruiterMode 
            ? 'bg-recruiter-bg/80 border border-recruiter-accent/20 text-recruiter-accent' 
            : 'glass-morphism text-foreground-muted'
          }
        `}>
          {isRecruiterMode ? (
            <>
              <Zap className="w-3 h-3" />
              <span>Instant load • Key info only</span>
            </>
          ) : (
            <>
              <Monitor className="w-3 h-3" />
              <span>Full immersive experience</span>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
