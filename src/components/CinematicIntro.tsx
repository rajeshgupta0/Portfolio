import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import coderAvatar from '@/assets/coder-avatar.jpg';

interface CinematicIntroProps {
  onComplete: () => void;
  skipDelay?: number;
}

export const CinematicIntro = ({ onComplete, skipDelay = 4500 }: CinematicIntroProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showText, setShowText] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(1), 300),
      setTimeout(() => setCurrentStep(2), 800),
      setTimeout(() => setShowText(true), 1200),
      setTimeout(() => setGlitchActive(true), 3500),
      setTimeout(() => setGlitchActive(false), 3700),
      setTimeout(() => onComplete(), skipDelay)
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete, skipDelay]);

  // Enhanced particle system
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4
  }));

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-br from-background-tertiary via-background-secondary to-background-tertiary flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1, scale: 1 }}
        exit={{ 
          opacity: 0, 
          scale: 1.2,
          filter: "blur(20px)",
          transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Dynamic Gradient Background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, hsl(var(--neon-primary) / 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 30%, hsl(var(--neon-accent) / 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 70%, hsl(var(--neon-primary) / 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 60% 20%, hsl(var(--neon-accent) / 0.15) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Advanced Neon Flicker Effect */}
        {currentStep >= 1 && (
          <>
            <motion.div
              className="absolute inset-0 bg-neon-primary pointer-events-none"
              animate={{ 
                opacity: [0, 0.08, 0, 0.05, 0, 0.12, 0],
                filter: ["blur(0px)", "blur(2px)", "blur(0px)", "blur(4px)", "blur(0px)"]
              }}
              transition={{ 
                duration: 0.8, 
                repeat: 5,
                times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute inset-0 bg-neon-accent pointer-events-none"
              animate={{ 
                opacity: [0, 0, 0.05, 0, 0.03, 0],
                filter: ["blur(0px)", "blur(1px)", "blur(3px)", "blur(0px)"]
              }}
              transition={{ duration: 0.6, delay: 0.2, repeat: 4 }}
            />
          </>
        )}

        {/* Enhanced Scan Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-primary/10 to-transparent animate-scan" />
          <svg className="absolute inset-0 w-full h-full opacity-5">
            <pattern id="scanlines" width="4" height="4" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="4" y2="0" stroke="currentColor" strokeWidth="1" className="text-neon-primary" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#scanlines)" />
          </svg>
        </div>

        {/* 3D Avatar Container with Mouse Tracking */}
        {currentStep >= 2 && (
          <motion.div
            className="relative perspective-1000"
            style={{ rotateX, rotateY }}
            initial={{ opacity: 0, scale: 0.3, rotateZ: -180 }}
            animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.34, 1.56, 0.64, 1],
              type: "spring",
              stiffness: 100
            }}
          >
            {/* Glowing Aura */}
            <motion.div
              className="absolute -inset-16 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 20px hsl(var(--neon-primary))",
                  "0 0 40px hsl(var(--neon-primary)), 0 0 20px hsl(var(--neon-accent))",
                  "0 0 60px hsl(var(--neon-primary)), 0 0 30px hsl(var(--neon-accent))",
                  "0 0 40px hsl(var(--neon-primary))",
                  "0 0 20px hsl(var(--neon-primary))"
                ],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Main Avatar Container */}
            <div className="relative">
              <motion.div
                className="relative w-44 h-44 rounded-full overflow-hidden shadow-2xl"
                animate={glitchActive ? {
                  x: [0, -2, 2, -1, 1, 0],
                  y: [0, 1, -1, 2, -2, 0],
                  transition: { duration: 0.2, repeat: 5 }
                } : {}}
              >
                <img
                  src={coderAvatar}
                  alt="Byte Ranger Avatar"
                  className="w-full h-full object-cover"
                />
                
                {/* Avatar Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neon-primary/40 via-transparent to-neon-accent/20 mix-blend-overlay" />
                
                {/* Glitch Overlay */}
                {glitchActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-primary/40 via-transparent to-neon-accent/40 mix-blend-screen" />
                )}
              </motion.div>

              {/* Holographic Rings - Enhanced */}
              <motion.div
                className="absolute -inset-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full border-2 border-neon-primary/40 border-t-neon-primary border-r-neon-primary/20" />
              </motion.div>
              
              <motion.div
                className="absolute -inset-16"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full border border-neon-accent/30 border-b-neon-accent border-l-neon-accent/10" />
              </motion.div>

              <motion.div
                className="absolute -inset-24"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <div className="w-full h-full rounded-full border border-dashed border-neon-primary/20" />
              </motion.div>
            </div>

            {/* Floating Code Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-neon-primary/60 text-xs font-mono"
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, (Math.random() - 0.5) * 200 - 100],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              >
                {"<>{}[]();".charAt(Math.floor(Math.random() * 9))}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Enhanced Intro Text with Typing Animation */}
        {showText && (
          <motion.div
            className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-center max-w-3xl px-8"
            initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-orbitron font-bold bg-gradient-to-r from-neon-primary via-neon-accent to-neon-primary bg-300% bg-clip-text text-transparent mb-4"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                Welcome to my portfolio
              </motion.h1>
              
              {/* Underline with animation */}
              <motion.div
                className="h-0.5 bg-gradient-to-r from-transparent via-neon-primary to-transparent mx-auto"
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ duration: 1.5, delay: 1 }}
              />
            </motion.div>
            
            <motion.p
              className="text-2xl md:text-3xl text-foreground-muted mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              I am{' '}
              <motion.span
                className="text-neon-primary font-bold inline-block"
                animate={{ 
                  textShadow: [
                    "0 0 8px hsl(var(--neon-primary))",
                    "0 0 16px hsl(var(--neon-primary))",
                    "0 0 8px hsl(var(--neon-primary))"
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Byte Ranger
              </motion.span>
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <div className="flex gap-4 justify-center mb-6">
                {["Computer Science Student", "Developer", "Innovator"].map((title, idx) => (
                  <motion.span
                    key={title}
                    className="text-lg text-foreground-subtle bg-neon-primary/10 px-4 py-2 rounded-full backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.5 + idx * 0.2 }}
                    whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--neon-primary) / 0.2)" }}
                  >
                    {title}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="mt-10 flex items-center justify-center gap-3 text-neon-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 0.8 }}
            >
              <motion.span
                className="text-lg font-mono"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                Initializing experience
              </motion.span>
              <motion.span
                className="text-2xl"
                animate={{ 
                  x: [0, 5, 0],
                  rotate: [0, 360],
                }}
                transition={{ 
                  x: { duration: 0.5, repeat: Infinity, repeatType: "reverse" },
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" }
                }}
              >
                🚀
              </motion.span>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-neon-primary/20 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.8 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-neon-primary to-neon-accent rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 3.9, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Enhanced Particle Field */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-0.5 h-0.5 bg-neon-primary rounded-full"
              initial={{ 
                x: `${particle.x}%`, 
                y: `${particle.y}%`,
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                y: [`${particle.y}%`, `${particle.y - 30}%`],
                opacity: [0, 0.8, 0],
                scale: [0, 2, 0],
              }}
              transition={{ 
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Vignette Effect */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black/50" />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay">
          <div className="w-full h-full bg-noise animate-noise" />
        </div>

        {/* Skip Button */}
        <motion.button
          className="absolute bottom-8 right-8 px-4 py-2 bg-neon-primary/10 border border-neon-primary/30 rounded-lg text-neon-primary text-sm font-mono backdrop-blur-sm z-50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
          whileHover={{ 
            scale: 1.05, 
            backgroundColor: "hsl(var(--neon-primary) / 0.2)",
            borderColor: "hsl(var(--neon-primary))"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
        >
          Skip Intro [ESC]
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

// Add these to your global CSS or tailwind config:
/*
@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}
.animate-scan {
  animation: scan 4s linear infinite;
}
.animate-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  animation: noise 0.2s infinite;
}
@keyframes noise {
  0% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -5%); }
  20% { transform: translate(5%, -5%); }
  30% { transform: translate(-5%, 5%); }
  40% { transform: translate(5%, 5%); }
  50% { transform: translate(-5%, -5%); }
  60% { transform: translate(5%, -5%); }
  70% { transform: translate(-5%, 5%); }
  80% { transform: translate(5%, 5%); }
  90% { transform: translate(-5%, -5%); }
  100% { transform: translate(0, 0); }
}
.perspective-1000 {
  perspective: 1000px;
}
.bg-gradient-radial {
  background-image: radial-gradient(circle, var(--tw-gradient-stops));
}
.bg-300\% {
  background-size: 300% 100%;
}
*/