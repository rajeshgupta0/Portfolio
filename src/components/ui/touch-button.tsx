import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useViewMode } from "@/contexts/ViewModeContext";

const touchButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        neon: "border border-primary/50 bg-transparent text-primary hover:border-primary hover:shadow-neon",
        premium: "bg-gradient-to-r from-primary to-accent text-primary-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface RippleEffect {
  id: number;
  x: number;
  y: number;
}

interface ParticleEffect {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  delay: number;
}

export interface TouchButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof touchButtonVariants> {
  asChild?: boolean;
  enableRipple?: boolean;
  enableParticles?: boolean;
  enableGlow?: boolean;
  particleCount?: number;
}

const TouchButton = React.forwardRef<HTMLButtonElement, TouchButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    enableRipple = true,
    enableParticles = true,
    enableGlow = true,
    particleCount = 8,
    children,
    onClick,
    ...props 
  }, ref) => {
    const [ripples, setRipples] = React.useState<RippleEffect[]>([]);
    const [particles, setParticles] = React.useState<ParticleEffect[]>([]);
    const [isPressed, setIsPressed] = React.useState(false);
    const [glowIntensity, setGlowIntensity] = React.useState(0);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const { isRecruiterMode } = useViewMode();
    
    const isAnimationsDisabled = prefersReducedMotion || isRecruiterMode;

    const createRipple = (event: React.MouseEvent | React.TouchEvent) => {
      if (!enableRipple || isAnimationsDisabled) return;
      
      const button = buttonRef.current || (ref as React.RefObject<HTMLButtonElement>)?.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      let x: number, y: number;

      if ('touches' in event) {
        x = event.touches[0].clientX - rect.left;
        y = event.touches[0].clientY - rect.top;
      } else {
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
      }

      const newRipple: RippleEffect = {
        id: Date.now(),
        x,
        y,
      };

      setRipples((prev) => [...prev, newRipple]);

      // Cleanup ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
      }, 600);
    };

    const createParticles = (event: React.MouseEvent | React.TouchEvent) => {
      if (!enableParticles || isAnimationsDisabled) return;
      
      const button = buttonRef.current || (ref as React.RefObject<HTMLButtonElement>)?.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      let x: number, y: number;

      if ('touches' in event) {
        x = event.touches[0].clientX - rect.left;
        y = event.touches[0].clientY - rect.top;
      } else {
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
      }

      const newParticles: ParticleEffect[] = Array.from({ length: particleCount }, (_, i) => ({
        id: Date.now() + i,
        x,
        y,
        angle: (360 / particleCount) * i + Math.random() * 30,
        distance: 30 + Math.random() * 40,
        size: 3 + Math.random() * 4,
        delay: i * 0.02,
      }));

      setParticles((prev) => [...prev, ...newParticles]);

      // Cleanup particles after animation
      setTimeout(() => {
        setParticles((prev) => 
          prev.filter((particle) => !newParticles.find((np) => np.id === particle.id))
        );
      }, 800);
    };

    const handlePress = (event: React.MouseEvent | React.TouchEvent) => {
      setIsPressed(true);
      createRipple(event);
      
      if (enableGlow && !isAnimationsDisabled) {
        setGlowIntensity(1);
      }
    };

    const handleRelease = (event: React.MouseEvent | React.TouchEvent) => {
      setIsPressed(false);
      createParticles(event);
      
      if (enableGlow) {
        // Fade out glow
        setTimeout(() => setGlowIntensity(0), 150);
      }
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
    };

    const Comp = asChild ? Slot : "button";

    const buttonContent = (
      <>
        {/* Ripple effects */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
                backgroundColor: 'hsl(var(--primary) / 0.3)',
              }}
              initial={{ 
                width: 0, 
                height: 0, 
                x: 0, 
                y: 0, 
                opacity: 0.6 
              }}
              animate={{ 
                width: 200, 
                height: 200, 
                x: -100, 
                y: -100, 
                opacity: 0 
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.4, 0, 0.2, 1] 
              }}
            />
          ))}
        </AnimatePresence>

        {/* Particle burst effects */}
        <AnimatePresence>
          {particles.map((particle) => {
            const radians = (particle.angle * Math.PI) / 180;
            const endX = Math.cos(radians) * particle.distance;
            const endY = Math.sin(radians) * particle.distance;

            return (
              <motion.span
                key={particle.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: particle.x,
                  top: particle.y,
                  width: particle.size,
                  height: particle.size,
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                  boxShadow: '0 0 8px hsl(var(--primary) / 0.8)',
                }}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 0, 
                  opacity: 1 
                }}
                animate={{ 
                  x: endX, 
                  y: endY, 
                  scale: [0, 1.5, 0], 
                  opacity: [1, 0.8, 0] 
                }}
                transition={{ 
                  duration: 0.5, 
                  ease: "easeOut",
                  delay: particle.delay 
                }}
              />
            );
          })}
        </AnimatePresence>

        {/* Glow overlay */}
        {enableGlow && !isAnimationsDisabled && (
          <motion.span
            className="absolute inset-0 pointer-events-none rounded-[inherit]"
            style={{
              background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.15), transparent 70%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: glowIntensity }}
            transition={{ duration: 0.15 }}
          />
        )}

        {/* Shimmer effect on hover */}
        {!isAnimationsDisabled && (
          <motion.span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, hsl(var(--foreground) / 0.08) 50%, transparent 100%)',
              transform: 'translateX(-100%)',
            }}
            whileHover={{
              transform: 'translateX(100%)',
              transition: { duration: 0.5, ease: 'easeInOut' }
            }}
          />
        )}

        {/* Content wrapper */}
        <span className="relative z-10">{children}</span>
      </>
    );

    if (isAnimationsDisabled) {
      return (
        <Comp
          className={cn(touchButtonVariants({ variant, size, className }))}
          ref={ref}
          onClick={handleClick}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <motion.button
        className={cn(touchButtonVariants({ variant, size, className }))}
        ref={buttonRef}
        onClick={handleClick}
        onMouseDown={handlePress}
        onMouseUp={handleRelease}
        onMouseLeave={() => {
          setIsPressed(false);
          setGlowIntensity(0);
        }}
        onTouchStart={handlePress}
        onTouchEnd={handleRelease}
        whileTap={{ scale: 0.95 }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 0 20px hsl(var(--primary) / 0.4)'
        }}
        transition={{
          scale: { type: 'spring', stiffness: 400, damping: 17 },
        }}
        style={{
          boxShadow: glowIntensity > 0 
            ? `0 0 ${30 * glowIntensity}px hsl(var(--primary) / ${0.5 * glowIntensity})`
            : undefined
        }}
        {...(props as any)}
      >
        {buttonContent}
      </motion.button>
    );
  }
);
TouchButton.displayName = "TouchButton";

export { TouchButton, touchButtonVariants };
