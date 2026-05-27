import * as React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useViewMode } from "@/contexts/ViewModeContext";

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "neon" | "holographic" | "pulse" | "cyber";
  className?: string;
}

const glowVariants: Record<string, Variants> = {
  neon: {
    initial: { 
      boxShadow: "0 0 0px hsl(var(--primary) / 0)" 
    },
    hover: { 
      boxShadow: [
        "0 0 20px hsl(var(--primary) / 0.4)",
        "0 0 40px hsl(var(--primary) / 0.6)",
        "0 0 20px hsl(var(--primary) / 0.4)",
      ],
      transition: {
        boxShadow: { duration: 1, repeat: Infinity, ease: "easeInOut" }
      }
    },
    tap: { 
      boxShadow: "0 0 60px hsl(var(--primary) / 0.8)",
      scale: 0.95 
    }
  },
  holographic: {
    initial: { 
      background: "hsl(var(--primary))" 
    },
    hover: {
      background: [
        "linear-gradient(135deg, hsl(195 100% 50%), hsl(265 89% 70%))",
        "linear-gradient(135deg, hsl(265 89% 70%), hsl(320 85% 60%))",
        "linear-gradient(135deg, hsl(320 85% 60%), hsl(195 100% 50%))",
      ],
      transition: {
        background: { duration: 2, repeat: Infinity, ease: "linear" }
      }
    },
    tap: { scale: 0.95 }
  },
  pulse: {
    initial: { scale: 1 },
    hover: {
      scale: [1, 1.02, 1],
      boxShadow: [
        "0 0 0px hsl(var(--primary) / 0)",
        "0 0 30px hsl(var(--primary) / 0.5)",
        "0 0 0px hsl(var(--primary) / 0)",
      ],
      transition: {
        scale: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
        boxShadow: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
      }
    },
    tap: { scale: 0.9 }
  },
  cyber: {
    initial: { 
      borderColor: "hsl(var(--primary) / 0.3)" 
    },
    hover: {
      borderColor: [
        "hsl(var(--primary))",
        "hsl(var(--accent))",
        "hsl(var(--neon-magenta))",
        "hsl(var(--primary))",
      ],
      boxShadow: [
        "0 0 10px hsl(var(--primary) / 0.3), inset 0 0 10px hsl(var(--primary) / 0.1)",
        "0 0 20px hsl(var(--accent) / 0.3), inset 0 0 15px hsl(var(--accent) / 0.1)",
        "0 0 10px hsl(var(--primary) / 0.3), inset 0 0 10px hsl(var(--primary) / 0.1)",
      ],
      transition: {
        borderColor: { duration: 2, repeat: Infinity, ease: "linear" },
        boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
      }
    },
    tap: { 
      scale: 0.95,
      boxShadow: "0 0 40px hsl(var(--primary) / 0.6), inset 0 0 20px hsl(var(--primary) / 0.2)"
    }
  }
};

const baseStyles: Record<string, string> = {
  neon: "bg-transparent border-2 border-primary text-primary",
  holographic: "bg-primary text-primary-foreground border-0",
  pulse: "bg-primary/20 border border-primary text-primary",
  cyber: "bg-transparent border-2 text-foreground",
};

export const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ children, variant = "neon", className, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const { isRecruiterMode } = useViewMode();
    
    const isAnimationsDisabled = prefersReducedMotion || isRecruiterMode;

    if (isAnimationsDisabled) {
      return (
        <button
          ref={ref}
          className={cn(
            "relative inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg",
            "transition-colors",
            baseStyles[variant],
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
          "relative inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg overflow-hidden",
          baseStyles[variant],
          className
        )}
        variants={glowVariants[variant]}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        {...(props as any)}
      >
        {/* Animated border gradient for cyber variant */}
        {variant === "cyber" && (
          <motion.span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.1) 50%, transparent 100%)",
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        {/* Holographic shimmer overlay */}
        {variant === "holographic" && (
          <motion.span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(110deg, transparent 25%, hsl(0 0% 100% / 0.2) 50%, transparent 75%)",
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1,
            }}
          />
        )}

        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

GlowButton.displayName = "GlowButton";
