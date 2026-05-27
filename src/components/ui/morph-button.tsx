import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useViewMode } from "@/contexts/ViewModeContext";
import { Check, Loader2, X } from "lucide-react";

type ButtonState = "idle" | "loading" | "success" | "error";

interface MorphButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: React.ReactNode;
  state?: ButtonState;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  onStateChange?: (state: ButtonState) => void;
  className?: string;
}

const stateColors: Record<ButtonState, string> = {
  idle: "bg-primary",
  loading: "bg-primary/80",
  success: "bg-neon-success",
  error: "bg-destructive",
};

const stateIcons: Record<ButtonState, React.ReactNode> = {
  idle: null,
  loading: <Loader2 className="w-4 h-4 animate-spin" />,
  success: <Check className="w-4 h-4" />,
  error: <X className="w-4 h-4" />,
};

export const MorphButton = React.forwardRef<HTMLButtonElement, MorphButtonProps>(
  ({ 
    children, 
    state = "idle", 
    loadingText = "Loading...",
    successText = "Success!",
    errorText = "Error",
    className,
    disabled,
    ...props 
  }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const { isRecruiterMode } = useViewMode();
    
    const isAnimationsDisabled = prefersReducedMotion || isRecruiterMode;

    const getText = () => {
      switch (state) {
        case "loading": return loadingText;
        case "success": return successText;
        case "error": return errorText;
        default: return children;
      }
    };

    if (isAnimationsDisabled) {
      return (
        <button
          ref={ref}
          className={cn(
            "relative inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg",
            "text-primary-foreground transition-colors",
            stateColors[state],
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          disabled={disabled || state === "loading"}
          {...props}
        >
          {stateIcons[state]}
          {getText()}
        </button>
      );
    }

    return (
      <motion.button
        ref={ref as any}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg",
          "text-primary-foreground overflow-hidden",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        animate={{
          backgroundColor: state === "idle" 
            ? "hsl(var(--primary))"
            : state === "success"
            ? "hsl(150 80% 50%)"
            : state === "error"
            ? "hsl(0 84% 60%)"
            : "hsl(var(--primary) / 0.8)",
        }}
        whileHover={state === "idle" ? { scale: 1.02 } : undefined}
        whileTap={state === "idle" ? { scale: 0.98 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        disabled={disabled || state === "loading"}
        {...(props as any)}
      >
        {/* Ripple effect on success */}
        <AnimatePresence>
          {state === "success" && (
            <motion.span
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundColor: "hsl(150 80% 50% / 0.3)" }}
              initial={{ scale: 0, borderRadius: "50%" }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </AnimatePresence>

        {/* Error shake effect handled by parent motion */}
        <motion.div
          className="flex items-center justify-center gap-2"
          animate={state === "error" ? { x: [0, -5, 5, -5, 5, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={state}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {stateIcons[state]}
              {getText()}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </motion.button>
    );
  }
);

MorphButton.displayName = "MorphButton";
