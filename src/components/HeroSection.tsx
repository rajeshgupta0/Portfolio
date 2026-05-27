import { motion, useMotionValue, useTransform, useSpring, useScroll, useVelocity, useTransform as useTransform2 } from 'framer-motion';
import { ChevronDown, Code, Zap } from 'lucide-react';
import { LiquidButton } from '@/components/ui/liquid-button';
import { BorderTraceButton } from '@/components/ui/border-trace-button';
import { useRef, useEffect, useState } from 'react';

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // 3D Rotation with smoother springs
  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [12, -12]), { 
    stiffness: 250, 
    damping: 25,
    mass: 0.5
  });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-12, 12]), { 
    stiffness: 250, 
    damping: 25,
    mass: 0.5
  });
  
  const scale3D = useSpring(useTransform(mouseX, [-400, 400], [0.98, 1.02]), { 
    stiffness: 200, 
    damping: 20 
  });
  
  const glowIntensity = useSpring(useTransform(scrollVelocity, [-500, 0, 500], [0.5, 1, 2]), {
    stiffness: 100,
    damping: 30
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = e.clientX - centerX;
        const y = e.clientY - centerY;
        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x: x / 10, y: y / 10 });
      }
    };
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    handleResize();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouseX, mouseY]);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Enhanced particle system with colors
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 4 + Math.random() * 6,
    size: 1.5 + Math.random() * 4,
    color: ['neon-primary', 'neon-accent', 'neon-secondary'][Math.floor(Math.random() * 3)],
    velocityX: (Math.random() - 0.5) * 50,
    velocityY: (Math.random() - 0.5) * 50
  }));

  // Floating code snippets
  const codeSnippets = ['<code>', '</>', '{}', '[]', '()', '=>', 'const', 'let', 'function', 'return', 'import', 'export'];

  return (
    <motion.section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ perspective: 1500 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Animated Gradient Mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, hsl(var(--neon-primary) / 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 70%, hsl(var(--neon-accent) / 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, hsl(var(--neon-primary) / 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 60% 20%, hsl(var(--neon-accent) / 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, hsl(var(--neon-primary) / 0.2) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Animated Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--neon-primary))" strokeWidth="0.5"/>
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 3D Portal Effect - Ultra Enhanced */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ 
          rotateX, 
          rotateY, 
          scale: scale3D,
          y: useTransform(scrollY, [0, 500], [0, -50])
        }}
      >
        <div className="relative">
          {/* Core Energy Ball */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full"
            animate={{
              boxShadow: [
                "0 0 40px hsl(var(--neon-primary))",
                "0 0 80px hsl(var(--neon-primary)), 0 0 40px hsl(var(--neon-accent))",
                "0 0 120px hsl(var(--neon-primary)), 0 0 60px hsl(var(--neon-accent))",
                "0 0 80px hsl(var(--neon-primary))",
                "0 0 40px hsl(var(--neon-primary))"
              ],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-r from-neon-primary/20 via-neon-accent/20 to-neon-primary/20 blur-2xl" />
          </motion.div>

          {/* Primary Ring with Dash Array */}
          <motion.div
            className="w-[450px] h-[450px] rounded-full border-4"
            style={{ borderColor: "hsl(var(--neon-primary))" }}
            animate={{ 
              scale: [1, 1.06, 1],
              rotate: [0, 360],
              boxShadow: [
                "0 0 20px hsl(var(--neon-primary))",
                "0 0 60px hsl(var(--neon-primary))",
                "0 0 20px hsl(var(--neon-primary))"
              ]
            }}
            transition={{ 
              scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          {/* Secondary Ring */}
          <motion.div
            className="absolute inset-0 w-[450px] h-[450px] rounded-full border-2"
            style={{ borderColor: "hsl(var(--neon-accent))" }}
            animate={{ 
              scale: [1, 1.12, 1],
              rotate: [360, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 18, repeat: Infinity, ease: "linear" }
            }}
          />
          
          {/* Tertiary Ring with Dashes */}
          <motion.div
            className="absolute -inset-6 w-[510px] h-[510px] rounded-full border border-dashed"
            style={{ borderColor: "hsl(var(--neon-secondary))" }}
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.08, 1],
            }}
            transition={{ 
              rotate: { duration: 22, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          />

          {/* Fourth Ring - Energy Wave */}
          <motion.div
            className="absolute -inset-12 w-[540px] h-[540px] rounded-full"
            style={{ border: "2px solid", borderColor: "hsl(var(--neon-primary) / 0.2)" }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, -360]
            }}
            transition={{
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          />

          {/* Orbiting Spheres */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${i * 30}deg) translate(265px, 0)`,
              }}
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                rotate: { duration: 10, repeat: Infinity, ease: "linear", delay: i * 0.5 }
              }}
            >
              <motion.div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: `hsl(var(--${i % 2 === 0 ? 'neon-primary' : 'neon-accent'}))` }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.3, 1, 0.3],
                  boxShadow: [
                    "0 0 5px currentColor",
                    "0 0 20px currentColor",
                    "0 0 5px currentColor"
                  ]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}

          {/* Energy Trails */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`trail-${i}`}
              className="absolute w-full h-full"
              style={{ rotate: i * 60 }}
              animate={{ rotate: [i * 60, i * 60 + 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute w-1 h-1 rounded-full"
                style={{ 
                  left: '50%',
                  top: '-5%',
                  backgroundColor: `hsl(var(--neon-primary))`,
                  filter: 'blur(2px)'
                }}
                animate={{
                  scale: [1, 3, 1],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Content with Parallax */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="mb-10"
          style={{
            y: useTransform(scrollY, [0, 300], [0, -30])
          }}
        >
          {/* Glitch Effect on Title */}
          <motion.h1
            className="text-7xl md:text-9xl font-orbitron font-black mb-8 leading-tight flex justify-center flex-wrap relative"
            animate={{
              textShadow: [
                "0 0 0px hsl(var(--neon-primary))",
                "2px 0 0px hsl(var(--neon-primary)), -2px 0 0px hsl(var(--neon-accent))",
                "0 0 0px hsl(var(--neon-primary))"
              ]
            }}
            transition={{ duration: 0.3, delay: 3, repeat: 2 }}
          >
            {"BYTE RANGER".split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                initial={{ opacity: 0, y: 100, rotateX: -90, filter: "blur(15px)" }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                transition={{
                  type: "spring",
                  damping: 8,
                  stiffness: 100,
                  delay: 0.8 + i * 0.04,
                }}
                whileHover={{
                  scale: 1.2,
                  textShadow: "0 0 30px hsl(var(--neon-primary))",
                  transition: { duration: 0.15 }
                }}
                className={char === " " ? "w-4 md:w-6" : "inline-block relative"}
              >
                {char}
                {/* Micro glitch effect on hover */}
                <motion.span
                  className="absolute inset-0 text-neon-primary opacity-0"
                  style={{ left: '2px' }}
                  whileHover={{ opacity: 0.5, left: '-2px', top: '1px' }}
                  transition={{ duration: 0.05 }}
                >
                  {char}
                </motion.span>
              </motion.span>
            ))}
          </motion.h1>
          
          {/* Enhanced Divider with Particle Effect */}
          <motion.div
            className="flex items-center justify-center gap-6 mb-7"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.8, type: "spring", stiffness: 150 }}
          >
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-neon-primary to-transparent w-24"
              animate={{ 
                scaleX: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Code className="w-10 h-10 text-neon-primary" />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-neon-primary/50 rounded-full blur-md"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-neon-primary to-transparent w-24"
              animate={{ 
                scaleX: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </motion.div>
          
          {/* Text with shimmer effect */}
          <motion.p
            className="text-xl md:text-3xl text-foreground-muted mb-5 font-inter"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            Computer Science Student &{" "}
            <motion.span
              className="text-neon-primary font-bold inline-block"
              animate={{ 
                textShadow: [
                  "0 0 5px hsl(var(--neon-primary))",
                  "0 0 15px hsl(var(--neon-primary))",
                  "0 0 5px hsl(var(--neon-primary))"
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Full-Stack Developer
            </motion.span>
          </motion.p>
          
          <motion.p
            className="text-lg text-foreground-subtle max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.8 }}
          >
             Building modern digital experiences through code, creativity, and continuous learning.
Welcome to my creative development space.
          </motion.p>
        </motion.div>

        {/* CTA Buttons with Advanced Animations */}
        <motion.div
          className="flex flex-col sm:flex-row gap-8 items-center justify-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            whileHover={{ 
              scale: 1.1, 
              rotate: [0, -2, 2, -1, 0],
              transition: { rotate: { duration: 0.3 } }
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <LiquidButton
              variant="plasma"
              onClick={scrollToNext}
              className="font-orbitron font-bold text-lg px-8 py-4"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, -15, 0, 15, 0]
                }}
                transition={{ duration: 1.5, delay: 4, repeat: 3 }}
                className="inline-flex items-center"
              >
                <Zap className="w-5 h-5 mr-2" />
              </motion.div>
              Enter the Grid
            </LiquidButton>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <BorderTraceButton
              variant="dual"
              className="font-orbitron font-semibold text-lg px-8 py-4"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </BorderTraceButton>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator with Pulse Ring */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ 
            y: [0, 15, 0],
          }}
          transition={{ 
            duration: 1.8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          whileHover={{ scale: 1.2 }}
          onClick={scrollToNext}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-neon-primary/30"
              animate={{ 
                scale: [1, 1.8, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="relative bg-background-tertiary/80 backdrop-blur-md rounded-full p-3 border-2 border-neon-primary"
              animate={{
                borderColor: [
                  "hsl(var(--neon-primary))",
                  "hsl(var(--neon-accent))",
                  "hsl(var(--neon-primary))"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-7 h-7 text-neon-primary" />
            </motion.div>
          </div>
          <motion.p
            className="text-xs font-mono text-neon-primary mt-3 tracking-wider"
            animate={{ opacity: [0.5, 1, 0.5], letterSpacing: ["2px", "4px", "2px"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            SCROLL
          </motion.p>
        </motion.div>
      </div>

      {/* Ultra Enhanced Particle System */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full bg-${particle.color} shadow-[0_0_10px_currentColor]`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [particle.top, particle.top - 80, particle.top],
              x: [particle.left, particle.left + particle.velocityX, particle.left],
              opacity: [0, 0.8, 0],
              scale: [0, 2, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Code Snippets */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {codeSnippets.map((code, i) => (
          <motion.div
            key={`code-${i}`}
            className="absolute font-mono text-neon-primary/20 text-sm whitespace-nowrap"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0
            }}
            animate={{
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0, 0.3, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              delay: i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {code}
          </motion.div>
        ))}
      </div>

      {/* Vignette Effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black/60" />

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="w-full h-screen bg-gradient-to-b from-transparent via-neon-primary/5 to-transparent"
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay">
        <div className="w-full h-full bg-noise animate-noise" />
      </div>
    </motion.section>
  );
};