import { useState, useEffect, useCallback } from 'react';

interface TouchEffect {
  id: number;
  x: number;
  y: number;
  timestamp: number;
  type: 'tap' | 'swipe' | 'hold';
}

interface TouchPosition {
  x: number;
  y: number;
}

export const useTouchEffects = () => {
  const [touchEffects, setTouchEffects] = useState<TouchEffect[]>([]);
  const [currentTouch, setCurrentTouch] = useState<TouchPosition | null>(null);
  const [isLongPress, setIsLongPress] = useState(false);

  const addTouchEffect = useCallback((x: number, y: number, type: TouchEffect['type']) => {
    const newEffect: TouchEffect = {
      id: Date.now() + Math.random(),
      x,
      y,
      timestamp: Date.now(),
      type
    };

    setTouchEffects(prev => [...prev, newEffect]);

    // Remove effect after animation duration
    setTimeout(() => {
      setTouchEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
    }, 1000);
  }, []);

  const triggerBackgroundShift = useCallback(() => {
    // Trigger background color shift
    document.documentElement.style.setProperty(
      '--dynamic-bg-shift', 
      `hsl(${Math.random() * 360}, 70%, 5%)`
    );
    
    setTimeout(() => {
      document.documentElement.style.removeProperty('--dynamic-bg-shift');
    }, 2000);
  }, []);

  const createParticleExplosion = useCallback((x: number, y: number) => {
    // Create multiple particles at touch point
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        addTouchEffect(
          x + (Math.random() - 0.5) * 50,
          y + (Math.random() - 0.5) * 50,
          'tap'
        );
      }, i * 50);
    }
  }, [addTouchEffect]);

  const createNeuralWave = useCallback((x: number, y: number) => {
    // Create expanding neural wave effect
    const waveElement = document.createElement('div');
    waveElement.className = 'neural-wave';
    waveElement.style.cssText = `
      position: fixed;
      left: ${x - 50}px;
      top: ${y - 50}px;
      width: 100px;
      height: 100px;
      border: 2px solid hsl(var(--neon-cyan));
      border-radius: 50%;
      pointer-events: none;
      z-index: 1000;
      animation: neural-wave-expand 1s ease-out forwards;
    `;

    document.body.appendChild(waveElement);

    setTimeout(() => {
      document.body.removeChild(waveElement);
    }, 1000);
  }, []);

  useEffect(() => {
    let longPressTimer: ReturnType<typeof setTimeout>;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const position = { x: touch.clientX, y: touch.clientY };
      setCurrentTouch(position);

      // Start long press timer
      longPressTimer = setTimeout(() => {
        setIsLongPress(true);
        addTouchEffect(position.x, position.y, 'hold');
        triggerBackgroundShift();
        createNeuralWave(position.x, position.y);
      }, 500);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const newPosition = { x: touch.clientX, y: touch.clientY };
      
      if (currentTouch) {
        const distance = Math.sqrt(
          Math.pow(newPosition.x - currentTouch.x, 2) + 
          Math.pow(newPosition.y - currentTouch.y, 2)
        );

        if (distance > 10) {
          clearTimeout(longPressTimer);
          setIsLongPress(false);
          
          // Create swipe trail effect
          addTouchEffect(newPosition.x, newPosition.y, 'swipe');
        }
      }

      setCurrentTouch(newPosition);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      clearTimeout(longPressTimer);
      
      if (currentTouch && !isLongPress) {
        addTouchEffect(currentTouch.x, currentTouch.y, 'tap');
        createParticleExplosion(currentTouch.x, currentTouch.y);
        
        // Random chance for background shift on tap
        if (Math.random() < 0.3) {
          triggerBackgroundShift();
        }
      }

      setCurrentTouch(null);
      setIsLongPress(false);
    };

    // Add touch event listeners
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Add CSS for neural wave animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes neural-wave-expand {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(5);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(longPressTimer);
      document.head.removeChild(style);
    };
  }, [currentTouch, isLongPress, addTouchEffect, triggerBackgroundShift, createParticleExplosion, createNeuralWave]);

  return {
    touchEffects,
    currentTouch,
    isLongPress
  };
};