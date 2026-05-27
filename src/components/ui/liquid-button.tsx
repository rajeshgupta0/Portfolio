import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useViewMode } from "@/contexts/ViewModeContext";

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "water" | "lava" | "plasma" | "slime";
  className?: string;
}

// Use actual color values for Framer Motion animations (CSS variables can't be animated)
const liquidColors = {
  water: {
    base: "#00bfff",
    fill: "#00bfff",
    highlight: "#66d9ff",
    text: "#e5e7eb",
    textHover: "#0a0a0f",
  },
  lava: {
    base: "#ef4444",
    fill: "#f97316",
    highlight: "#fbbf24",
    text: "#e5e7eb",
    textHover: "#0a0a0f",
  },
  plasma: {
    base: "#a855f7",
    fill: "#c026d3",
    highlight: "#ec4899",
    text: "#e5e7eb",
    textHover: "#0a0a0f",
  },
  slime: {
    base: "#22c55e",
    fill: "#16a34a",
    highlight: "#4ade80",
    text: "#e5e7eb",
    textHover: "#0a0a0f",
  },
};

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ children, variant = "water", className, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const { isRecruiterMode } = useViewMode();
    const isAnimationsDisabled = prefersReducedMotion || isRecruiterMode;
    const [isHovered, setIsHovered] = React.useState(false);

    const colors = liquidColors[variant];

    if (isAnimationsDisabled) {
      return (
        <button
          ref={ref}
          className={cn(
            "relative inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg",
            "border-2 transition-colors",
            className
          )}
          style={{
            borderColor: colors.base,
            color: colors.text,
          }}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <motion.button
        ref={ref as any}
        className={cn(
          "relative inline-flex items-center justify-center px-8 py-3 font-medium rounded-lg",
          "border-2 overflow-hidden",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        style={{
          borderColor: colors.base,
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileTap={{ scale: 0.98 }}
        {...(props as any)}
      >
        {/* Liquid fill with wave animation */}
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${colors.fill} 0%, ${colors.highlight} 100%)`,
          }}
          initial={{ y: "100%" }}
          animate={{
            y: isHovered ? "0%" : "100%",
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 0.8,
          }}
        />

        {/* Wave surface effect */}
        <motion.span
          className="absolute inset-x-0 h-4 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${colors.highlight} 0%, transparent 100%)`,
            filter: "blur(2px)",
          }}
          initial={{ bottom: "-10%", opacity: 0 }}
          animate={{
            bottom: isHovered ? "45%" : "-10%",
            opacity: isHovered ? 0.8 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        />

        {/* Bubble effects */}
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 4 + Math.random() * 8,
                  height: 4 + Math.random() * 8,
                  left: `${15 + Math.random() * 70}%`,
                  background: `radial-gradient(circle at 30% 30%, ${colors.highlight}, ${colors.fill})`,
                  boxShadow: `0 0 4px ${colors.highlight}`,
                }}
                initial={{ 
                  bottom: "-10%",
                  opacity: 0,
                  scale: 0,
                }}
                animate={{ 
                  bottom: "120%",
                  opacity: [0, 0.8, 0.6, 0],
                  scale: [0, 1, 1.2, 0.5],
                }}
                transition={{
                  duration: 1.5 + Math.random() * 1,
                  delay: i * 0.15,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}

        {/* Surface ripple */}
        <motion.span
          className="absolute inset-x-0 h-1 pointer-events-none"
          style={{
            background: colors.highlight,
            filter: "blur(1px)",
          }}
          initial={{ top: "100%", opacity: 0, scaleY: 1 }}
          animate={{
            top: isHovered ? "0%" : "100%",
            opacity: isHovered ? [0.3, 0.6, 0.3] : 0,
            scaleY: isHovered ? [1, 1.5, 1] : 1,
          }}
          transition={{
            top: { type: "spring", stiffness: 100, damping: 15 },
            opacity: { duration: 1, repeat: Infinity, ease: "easeInOut" },
            scaleY: { duration: 1, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Content with color transition */}
        <motion.span
          className="relative z-10 font-semibold"
          initial={{ color: colors.text }}
          animate={{
            color: isHovered ? colors.textHover : colors.text,
          }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.span>
      </motion.button>
    );
  }
);

LiquidButton.displayName = "LiquidButton";
