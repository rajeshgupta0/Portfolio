import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTouchEffects } from '@/hooks/useTouchEffects';

export const TouchEffectsRenderer = () => {
  const { touchEffects, currentTouch, isLongPress } = useTouchEffects();

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Active Touch Indicator */}
      {currentTouch && (
        <motion.div
          className={`fixed w-8 h-8 rounded-full border-2 ${
            isLongPress 
              ? 'border-neon-purple bg-neon-purple/20 glow-neon-lg' 
              : 'border-neon-cyan bg-neon-cyan/20 glow-neon'
          }`}
          style={{
            left: currentTouch.x - 16,
            top: currentTouch.y - 16,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isLongPress ? 1.5 : 1, 
            opacity: 1,
            rotate: isLongPress ? 180 : 0
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30 
          }}
        />
      )}

      {/* Touch Effects */}
      <AnimatePresence>
        {touchEffects.map((effect) => (
          <motion.div
            key={effect.id}
            className="fixed"
            style={{
              left: effect.x - 20,
              top: effect.y - 20,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: effect.type === 'hold' ? 2 : 1.5, 
              opacity: 0 
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: effect.type === 'hold' ? 1.5 : 1, 
              ease: "easeOut" 
            }}
          >
            {effect.type === 'tap' && (
              <div className="w-10 h-10 rounded-full border-2 border-neon-cyan glow-neon" />
            )}
            
            {effect.type === 'swipe' && (
              <div className="w-6 h-6 rounded-full bg-neon-purple glow-neon-lg" />
            )}
            
            {effect.type === 'hold' && (
              <div className="w-12 h-12 rounded-full border-4 border-neon-purple bg-neon-purple/10 glow-neon-lg">
                <div className="w-full h-full rounded-full border-2 border-neon-cyan animate-ping" />
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Holographic Ripples for Long Press */}
      {isLongPress && currentTouch && (
        <div className="fixed" style={{ left: currentTouch.x - 100, top: currentTouch.y - 100 }}>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-48 h-48 rounded-full border border-neon-purple/30"
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ 
                scale: [0, 1, 2], 
                opacity: [0.8, 0.4, 0] 
              }}
              transition={{ 
                duration: 2, 
                delay: i * 0.3, 
                repeat: Infinity,
                ease: "easeOut" 
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};