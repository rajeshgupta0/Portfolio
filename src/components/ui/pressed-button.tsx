import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useViewMode } from "@/contexts/ViewModeContext";

interface PressedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "primary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantStyles = {
  default: {
    base: "bg-secondary text-secondary-foreground",
    top: "bg-gradient-to-b from-secondary to-secondary/80",
    shadow: "hsl(var(--secondary) / 0.5)",
    highlight: "hsl(var(--foreground) / 0.1)",
  },
  primary: {
    base: "bg-primary text-primary-foreground",
    top: "bg-gradient-to-b from-primary to-primary/80",
    shadow: "hsl(var(--primary) / 0.5)",
    highlight: "hsl(var(--primary-foreground) / 0.2)",
  },
  danger: {
    base: "bg-destructive text-destructive-foreground",
    top: "bg-gradient-to-b from-destructive to-destructive/80",
    shadow: "hsl(var(--destructive) / 0.5)",
    highlight: "hsl(var(--destructive-foreground) / 0.2)",
  },
  success: {
    base: "bg-accent text-accent-foreground",
    top: "bg-gradient-to-b from-accent to-accent/80",
    shadow: "hsl(var(--accent) / 0.5)",
    highlight: "hsl(var(--accent-foreground) / 0.2)",
  },
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-8 py-4 text-lg",
};

export const PressedButton = React.forwardRef<HTMLButtonElement, PressedButtonProps>(
  ({ children, variant = "primary", size = "md", className, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const { isRecruiterMode } = useViewMode();
    const isAnimationsDisabled = prefersReducedMotion || isRecruiterMode;

    const styles = variantStyles[variant];

    if (isAnimationsDisabled) {
      return (
        <button
          ref={ref}
          className={cn(
            "relative inline-flex items-center justify-center font-semibold rounded-xl",
            "transition-colors",
            styles.base,
            sizeStyles[size],
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
        ref={ref as any}
        className={cn(
          "relative inline-flex items-center justify-center font-semibold rounded-xl",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          sizeStyles[size],
          className
        )}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
        initial="idle"
        whileHover="hover"
        whileTap="pressed"
        {...(props as any)}
      >
        {/* 3D shadow/depth layer */}
        <motion.span
          className="absolute inset-0 rounded-xl"
          style={{
            background: styles.shadow,
            transform: "translateZ(-8px) translateY(4px)",
            filter: "blur(2px)",
          }}
          variants={{
            idle: { 
              transform: "translateZ(-8px) translateY(4px)",
              opacity: 0.6,
            },
            hover: { 
              transform: "translateZ(-10px) translateY(6px)",
              opacity: 0.8,
            },
            pressed: { 
              transform: "translateZ(-2px) translateY(1px)",
              opacity: 0.3,
            },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        />

        {/* Main button body */}
        <motion.span
          className={cn(
            "absolute inset-0 rounded-xl",
            styles.top
          )}
          style={{
            boxShadow: `
              inset 0 1px 0 ${styles.highlight},
              inset 0 -2px 4px hsl(0 0% 0% / 0.2),
              0 2px 8px hsl(0 0% 0% / 0.1)
            `,
          }}
          variants={{
            idle: { 
              transform: "translateZ(0px) translateY(0px)",
            },
            hover: { 
              transform: "translateZ(4px) translateY(-2px)",
            },
            pressed: { 
              transform: "translateZ(-4px) translateY(3px)",
            },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        />

        {/* Top shine/reflection */}
        <motion.span
          className="absolute inset-x-0 top-0 h-1/2 rounded-t-xl pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${styles.highlight}, transparent)`,
          }}
          variants={{
            idle: { opacity: 0.5 },
            hover: { opacity: 0.7 },
            pressed: { opacity: 0.2 },
          }}
          transition={{ duration: 0.15 }}
        />

        {/* Content wrapper with 3D movement */}
        <motion.span
          className={cn(
            "relative z-10 flex items-center justify-center gap-2",
            styles.base.includes("text-") ? "" : "text-primary-foreground"
          )}
          variants={{
            idle: { 
              transform: "translateY(0px)",
              textShadow: "0 1px 2px hsl(0 0% 0% / 0.2)",
            },
            hover: { 
              transform: "translateY(-2px)",
              textShadow: "0 2px 4px hsl(0 0% 0% / 0.3)",
            },
            pressed: { 
              transform: "translateY(2px)",
              textShadow: "0 0px 1px hsl(0 0% 0% / 0.1)",
            },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {children}
        </motion.span>
      </motion.button>
    );
  }
);

PressedButton.displayName = "PressedButton";
