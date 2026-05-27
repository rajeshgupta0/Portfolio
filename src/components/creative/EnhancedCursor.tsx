import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useSectionTheme } from '@/hooks/useSectionTheme';
import { useViewMode } from '@/contexts/ViewModeContext';

interface CursorState {
  isHovering: boolean;
  isClicking: boolean;
  hoverType: 'default' | 'link' | 'button' | 'card' | 'text';
}

export const EnhancedCursor = () => {
  const { theme } = useSectionTheme();
  const { performance, isRecruiterMode } = useViewMode();
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    hoverType: 'default',
  });
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const trailRef = useRef<{ x: number; y: number; opacity: number }[]>([]);
  const [trail, setTrail] = useState<{ x: number; y: number; opacity: number; id: number }[]>([]);
  const trailIdRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    setIsVisible(true);

    // Add to trail
    if (performance.enableParticles) {
      trailIdRef.current += 1;
      const newPoint = { x: e.clientX, y: e.clientY, opacity: 1, id: trailIdRef.current };
      setTrail(prev => [...prev.slice(-15), newPoint]);
    }
  }, [cursorX, cursorY, performance.enableParticles]);

  const handleMouseDown = useCallback(() => {
    setCursorState(prev => ({ ...prev, isClicking: true }));
  }, []);

  const handleMouseUp = useCallback(() => {
    setCursorState(prev => ({ ...prev, isClicking: false }));
  }, []);

  const handleMouseEnter = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    if (target.closest('a, button, [role="button"]')) {
      setCursorState(prev => ({ ...prev, isHovering: true, hoverType: 'button' }));
    } else if (target.closest('[data-cursor="card"]')) {
      setCursorState(prev => ({ ...prev, isHovering: true, hoverType: 'card' }));
    } else if (target.closest('p, span, h1, h2, h3, h4, h5, h6')) {
      setCursorState(prev => ({ ...prev, isHovering: true, hoverType: 'text' }));
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursorState(prev => ({ ...prev, isHovering: false, hoverType: 'default' }));
  }, []);

  useEffect(() => {
    if (isRecruiterMode || performance.reducedMotion) return;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave, isRecruiterMode, performance.reducedMotion]);

  // Fade out trail
  useEffect(() => {
    if (!performance.enableParticles) return;
    
    const interval = setInterval(() => {
      setTrail(prev => 
        prev
          .map(p => ({ ...p, opacity: p.opacity - 0.1 }))
          .filter(p => p.opacity > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [performance.enableParticles]);

  if (isRecruiterMode || performance.reducedMotion) {
    return null;
  }

  const getCursorSize = () => {
    if (cursorState.isClicking) return 24;
    switch (cursorState.hoverType) {
      case 'button': return 48;
      case 'card': return 56;
      case 'text': return 16;
      default: return 32;
    }
  };

  return (
    <>
      {/* Trail particles */}
      {performance.enableParticles && trail.map((point) => (
        <motion.div
          key={point.id}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: point.x,
            top: point.y,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0.5, opacity: point.opacity }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: `hsla(${theme.primaryHue}, 100%, 60%, ${point.opacity * 0.5})`,
              boxShadow: `0 0 8px hsla(${theme.primaryHue}, 100%, 60%, ${point.opacity * 0.3})`,
            }}
          />
        </motion.div>
      ))}

      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-screen"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Outer glow */}
        <motion.div
          className="rounded-full"
          animate={{
            width: getCursorSize() * 3,
            height: getCursorSize() * 3,
            opacity: cursorState.isHovering ? 0.15 : 0.1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={{
            background: `radial-gradient(circle, 
              hsla(${theme.primaryHue}, 100%, 60%, 0.3) 0%, 
              transparent 70%)`,
            filter: 'blur(10px)',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            left: '50%',
            top: '50%',
          }}
        />

        {/* Inner cursor */}
        <motion.div
          className="rounded-full border"
          animate={{
            width: getCursorSize(),
            height: getCursorSize(),
            borderColor: `hsla(${theme.primaryHue}, 100%, 60%, ${cursorState.isHovering ? 0.8 : 0.5})`,
            backgroundColor: cursorState.isClicking 
              ? `hsla(${theme.primaryHue}, 100%, 60%, 0.2)` 
              : 'transparent',
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={{
            boxShadow: `0 0 20px hsla(${theme.primaryHue}, 100%, 60%, 0.3)`,
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            left: '50%',
            top: '50%',
          }}
        />

        {/* Center dot */}
        <motion.div
          className="w-1 h-1 rounded-full absolute left-1/2 top-1/2"
          style={{
            transform: 'translate(-50%, -50%)',
            background: `hsla(${theme.primaryHue}, 100%, 70%, 0.8)`,
            boxShadow: `0 0 4px hsla(${theme.primaryHue}, 100%, 70%, 1)`,
          }}
        />
      </motion.div>

      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};
