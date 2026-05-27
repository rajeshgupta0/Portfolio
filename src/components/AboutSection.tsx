import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, Cpu, Database, Globe, Sparkles, User, Award, Rocket } from 'lucide-react';

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const stats = [
    { 
      icon: Code2, 
      label: 'Years Coding', 
      value: '2+', 
      description: 'of hands-on experience',
      color: 'cyan',
      gradient: 'from-cyan-500 to-blue-500',
      glow: 'shadow-cyan-500/20'
    },
    { 
      icon: Cpu, 
      label: 'Projects Built', 
      value: '15+', 
      description: 'complete solutions',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      glow: 'shadow-purple-500/20'
    },
    { 
      icon: Database, 
      label: 'Technologies', 
      value: '8+', 
      description: 'modern tools',
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-500',
      glow: 'shadow-emerald-500/20'
    },
    { 
      icon: Globe, 
      label: 'Domains', 
      value: 'Full-Stack', 
      description: 'end-to-end development',
      color: 'orange',
      gradient: 'from-orange-500 to-red-500',
      glow: 'shadow-orange-500/20'
    },
  ];

  const colorStyles = {
    cyan: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      hover: 'hover:border-cyan-500/60 hover:shadow-cyan-500/20',
      gradient: 'from-cyan-500 to-blue-500',
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      hover: 'hover:border-purple-500/60 hover:shadow-purple-500/20',
      gradient: 'from-purple-500 to-pink-500',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      hover: 'hover:border-emerald-500/60 hover:shadow-emerald-500/20',
      gradient: 'from-emerald-500 to-teal-500',
    },
    orange: {
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      text: 'text-orange-400',
      hover: 'hover:border-orange-500/60 hover:shadow-orange-500/20',
      gradient: 'from-orange-500 to-red-500',
    },
  };

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-24 md:py-28 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12), transparent)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.12), transparent)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4], x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.1), transparent)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2], x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${i % 4 === 0 ? '#06B6D4' : i % 4 === 1 ? '#A855F7' : i % 4 === 2 ? '#10B981' : '#F97316'}, transparent)`,
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header - Without Badge */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-6"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "6rem" } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-6"
          />

          <motion.p 
            className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
           Passionate developer focused on building creative, practical, and user-friendly digital solutions.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-2 border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10">
              <CardContent className="p-8 relative z-10">
                {/* Avatar Section */}
                <div className="relative mb-6">
                  <motion.div
                    className="relative w-32 h-32 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Pulsing Background */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-cyan-500/20"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Avatar Image */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-2xl">
                      <img
                        src="/favicon.ico"
                        alt="Byte Ranger"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
                
                <motion.h3
                  className="text-2xl font-orbitron font-bold text-center mb-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                   Problem Solver & Developer
                  </span>
                </motion.h3>
                
                <motion.p
                  className="text-gray-400 text-center leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  I’m a Computer Science student who enjoys building real-world projects and turning ideas into meaningful digital experiences through code. From developing full-stack applications to exploring modern technologies, I’m always focused on learning, improving, and creating solutions that are both functional and user-friendly.
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Grid - Different Colors for Each Box */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((stat, index) => {
              const styles = colorStyles[stat.color as keyof typeof colorStyles];
              
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1, type: "spring", stiffness: 200 }}
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="relative cursor-pointer group"
                  >
                    <Card className={`relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-2 transition-all duration-500 hover:shadow-2xl ${styles.border} ${styles.hover}`}>
                      {/* Hover Glow Effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r from-${stat.color}-500/0 via-${stat.color}-500/15 to-${stat.color}-500/0`}
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Top Glow Line */}
                      <motion.div
                        className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-${stat.color}-500 to-transparent`}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                      
                      <CardContent className="p-6 text-center relative z-10">
                        {/* Icon with 360° Rotation on Hover */}
                        <div className="relative mb-4">
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.15 }}
                            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                            className="inline-block"
                          >
                            {/* Icon Glow */}
                            <motion.div
                              className={`absolute inset-0 rounded-full blur-md bg-${stat.color}-500/30`}
                              animate={{ scale: hoveredStat === index ? [1, 1.3, 1] : 1 }}
                              transition={{ duration: 1, repeat: hoveredStat === index ? Infinity : 0 }}
                            />
                            <stat.icon 
                              className={`relative w-10 h-10 mx-auto transition-all duration-300 ${styles.text}`}
                            />
                          </motion.div>
                          
                          {/* Border Ring */}
                          <motion.div
                            className="absolute -inset-3 rounded-full border transition-all duration-300"
                            initial={{ borderColor: "transparent", scale: 0.8, opacity: 0 }}
                            animate={{
                              borderColor: hoveredStat === index ? `rgba(${stat.color === 'cyan' ? '6,182,212' : stat.color === 'purple' ? '168,85,247' : stat.color === 'emerald' ? '16,185,129' : '249,115,22'}, 0.3)` : "transparent",
                              scale: hoveredStat === index ? 1 : 0.8,
                              opacity: hoveredStat === index ? 1 : 0,
                            }}
                          />
                        </div>
                        
                        {/* Value */}
                        <motion.div
                          className="text-3xl font-orbitron font-bold mb-2"
                          animate={{
                            scale: hoveredStat === index ? 1.05 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                            {stat.value}
                          </span>
                        </motion.div>
                        
                        {/* Label */}
                        <div className={`text-sm font-inter uppercase tracking-wide ${styles.text}`}>
                          {stat.label}
                        </div>
                        
                        {/* Description on Hover */}
                        <motion.div
                          className="text-xs text-gray-500 mt-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{
                            opacity: hoveredStat === index ? 1 : 0,
                            height: hoveredStat === index ? "auto" : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {stat.description}
                        </motion.div>
                        
                        {/* Bottom Accent Line */}
                        <motion.div
                          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r ${stat.gradient}`}
                          initial={{ width: 0, opacity: 0 }}
                          animate={{
                            width: hoveredStat === index ? 40 : 0,
                            opacity: hoveredStat === index ? 1 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Background Cyber Grid */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(6,182,212,0.1) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(168,85,247,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      </div>
    </section>
  );
};