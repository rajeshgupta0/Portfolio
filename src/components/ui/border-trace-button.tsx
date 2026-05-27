import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useViewMode } from "@/contexts/ViewModeContext";

interface BorderTraceButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "single" | "dual" | "pulse" | "spark";
  traceColor?: string;
  className?: string;
}

export const BorderTraceButton = React.forwardRef<HTMLButtonElement, BorderTraceButtonProps>(
  ({ children, variant = "single", traceColor, className, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const { isRecruiterMode } = useViewMode();
    const isAnimationsDisabled = prefersReducedMotion || isRecruiterMode;
    const [isHovered, setIsHovered] = React.useState(false);

    // Use actual color values for Framer Motion animations (CSS variables can't be animated)
    const defaultTraceColor = "#00bfff"; // Primary cyan color
    const activeColor = traceColor || defaultTraceColor;
    const accentColor = "#a855f7"; // Purple accent

    if (isAnimationsDisabled) {
      return (
        <button
          ref={ref}
          className={cn(
            "relative inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg",
            "border border-border bg-background text-foreground transition-colors hover:border-primary",
            className
          )}
          {...props}
        >
          {children}
        </button>
      );
    }

    const renderTraceEffect = () => {
      switch (variant) {
        case "single":
          return (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="calc(100% - 2px)"
                height="calc(100% - 2px)"
                rx="7"
                ry="7"
                fill="none"
                stroke={activeColor}
                strokeWidth="2"
                strokeDasharray="150 500"
                strokeDashoffset="0"
                className="opacity-0"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-650"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </rect>
            </svg>
          );

        case "dual":
          return (
            <>
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="7"
                  ry="7"
                  fill="none"
                  stroke={activeColor}
                  strokeWidth="2"
                  strokeDasharray="80 570"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.3s",
                  }}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-650"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="7"
                  ry="7"
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="2"
                  strokeDasharray="80 570"
                  strokeDashoffset="325"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.3s",
                  }}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="325"
                    to="-325"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </rect>
              </svg>
            </>
          );

        case "pulse":
          return (
            <motion.span
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                border: `2px solid ${activeColor}`,
              }}
              initial={{ opacity: 0, scale: 1 }}
              animate={isHovered ? {
                opacity: [0.8, 0],
                scale: [1, 1.08],
              } : { opacity: 0, scale: 1 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          );

        case "spark":
          return null; // Handled separately with motion elements
      }
    };

    const renderSparkEffect = () => {
      if (variant !== "spark" || !isHovered) return null;

      const sparks = [
        { angle: 0, delay: 0 },
        { angle: 90, delay: 0.1 },
        { angle: 180, delay: 0.2 },
        { angle: 270, delay: 0.3 },
      ];

      return (
        <>
          {/* Moving glow on border */}
          <motion.span
            className="absolute inset-0 rounded-lg pointer-events-none overflow-hidden"
            style={{ border: "2px solid transparent" }}
          >
            <motion.span
              className="absolute w-8 h-8 rounded-full"
              style={{
                background: `radial-gradient(circle, ${activeColor} 0%, transparent 70%)`,
                filter: "blur(4px)",
              }}
              animate={{
                top: ["-10%", "-10%", "100%", "100%", "-10%"],
                left: ["-10%", "100%", "100%", "-10%", "-10%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.span>

          {/* Corner sparks */}
          {sparks.map((spark, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: activeColor,
                boxShadow: `0 0 8px 2px ${activeColor}`,
                top: spark.angle === 0 || spark.angle === 90 ? -2 : "auto",
                bottom: spark.angle === 180 || spark.angle === 270 ? -2 : "auto",
                left: spark.angle === 0 || spark.angle === 270 ? -2 : "auto",
                right: spark.angle === 90 || spark.angle === 180 ? -2 : "auto",
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: spark.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      );
    };

    return (
      <motion.button
        ref={ref as any}
        className={cn(
          "relative inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg",
          "border border-border bg-background text-foreground overflow-visible",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{ borderColor: "#374151" }}
        whileHover={{ 
          borderColor: activeColor,
          boxShadow: `0 0 20px ${activeColor}40`,
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        {...(props as any)}
      >
        {renderTraceEffect()}
        {renderSparkEffect()}

        {/* Pulse variant additional ring */}
        {variant === "pulse" && isHovered && (
          <motion.span
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              border: `2px solid ${activeColor}`,
            }}
            initial={{ opacity: 0, scale: 1 }}
            animate={{
              opacity: [0.6, 0],
              scale: [1, 1.15],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5,
            }}
          />
        )}

        {/* Glow background on hover */}
        <motion.span
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${activeColor}15, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <motion.span
          className="relative z-10"
          initial={{ color: "#e5e7eb" }}
          animate={{
            color: isHovered ? activeColor : "#e5e7eb",
          }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
      </motion.button>
    );
  }
);

BorderTraceButton.displayName = "BorderTraceButton";
