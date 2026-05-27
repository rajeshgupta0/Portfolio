import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useViewMode } from "@/contexts/ViewModeContext";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  magneticStrength?: number;
  className?: string;
}

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, magneticStrength = 0.3, className, ...props }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const { isRecruiterMode } = useViewMode();
    
    const isAnimationsDisabled = prefersReducedMotion || isRecruiterMode;

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isAnimationsDisabled) return;
      
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;

      mouseX.set(distanceX * magneticStrength);
      mouseY.set(distanceY * magneticStrength);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    if (isAnimationsDisabled) {
      return (
        <button
          ref={ref}
          className={cn(
            "relative inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg",
            "bg-primary text-primary-foreground",
            "transition-colors hover:bg-primary/90",
            className
          )}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <motion.button
        ref={buttonRef}
        className={cn(
          "relative inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg",
          "bg-primary text-primary-foreground",
          "cursor-pointer",
          className
        )}
        style={{ x, y }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...(props as any)}
      >
        <motion.span
          className="relative z-10"
          style={{
            x: useTransform(x, (val) => val * 0.3),
            y: useTransform(y, (val) => val * 0.3),
          }}
        >
          {children}
        </motion.span>
      </motion.button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";
