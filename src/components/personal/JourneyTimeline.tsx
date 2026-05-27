import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Rocket,
  Code2,
  Brain,
  Layers3,
  Sparkles,
  Cpu,
  Target,
  Zap,
  Star,
  TrendingUp,
} from 'lucide-react';

/* =========================================================
   TYPES
========================================================= */

interface TimelineItem {
  year: string;
  phase: string;
  title: string;
  description: string;
  mindset: string;
  icon: any;
  color: keyof typeof colorClasses;
}

/* =========================================================
   COLOR CLASSES - Vibrant & Distinct
========================================================= */

const colorClasses = {
  rose: {
    text: 'text-rose-400',
    border: 'border-rose-500/40',
    bg: 'bg-rose-500/10',
    glow: 'shadow-[0_0_30px_rgba(244,63,94,0.2)]',
    hover: 'hover:border-rose-500/60',
  },
  cyan: {
    text: 'text-cyan-400',
    border: 'border-cyan-500/40',
    bg: 'bg-cyan-500/10',
    glow: 'shadow-[0_0_30px_rgba(6,182,212,0.2)]',
    hover: 'hover:border-cyan-500/60',
  },
  emerald: {
    text: 'text-emerald-400',
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-500/10',
    glow: 'shadow-[0_0_30px_rgba(16,185,129,0.2)]',
    hover: 'hover:border-emerald-500/60',
  },
  amber: {
    text: 'text-amber-400',
    border: 'border-amber-500/40',
    bg: 'bg-amber-500/10',
    glow: 'shadow-[0_0_30px_rgba(245,158,11,0.2)]',
    hover: 'hover:border-amber-500/60',
  },
  purple: {
    text: 'text-purple-400',
    border: 'border-purple-500/40',
    bg: 'bg-purple-500/10',
    glow: 'shadow-[0_0_30px_rgba(168,85,247,0.2)]',
    hover: 'hover:border-purple-500/60',
  },
  pink: {
    text: 'text-pink-400',
    border: 'border-pink-500/40',
    bg: 'bg-pink-500/10',
    glow: 'shadow-[0_0_30px_rgba(236,72,153,0.2)]',
    hover: 'hover:border-pink-500/60',
  },
};

/* =========================================================
   JOURNEY DATA
========================================================= */

const journeyItems: TimelineItem[] = [
  {
    year: '2023',
    phase: 'Phase 01',
    title: 'Programming Foundations',
    description:
      'Started my journey into Computer Science by learning programming fundamentals, logic building, and problem-solving. Focused on understanding how software works internally while improving analytical thinking through consistent practice.',
    mindset:
      'Strong fundamentals create the foundation for advanced engineering skills.',
    icon: Code2,
    color: 'rose',
  },
  {
    year: '2024',
    phase: 'Phase 02',
    title: 'Frontend Development Journey',
    description:
      'Explored modern frontend development by building responsive and interactive web applications using React, JavaScript, and modern UI technologies. Learned component architecture, state management, and user experience design principles.',
    mindset:
      'Great software should feel intuitive, responsive, and user-focused.',
    icon: Sparkles,
    color: 'cyan',
  },
  {
    year: '2025',
    phase: 'Phase 03',
    title: 'Full-Stack Engineering',
    description:
      'Expanded into backend development, APIs, databases, authentication systems, and deployment workflows. Built complete full-stack applications while learning scalable architecture and real-world development practices.',
    mindset:
      'Building production-ready applications requires understanding both frontend and backend systems deeply.',
    icon: Layers3,
    color: 'emerald',
  },
  {
    year: '2025',
    phase: 'Phase 04',
    title: 'Problem Solving & Systems Thinking',
    description:
      'Focused on Data Structures & Algorithms, debugging strategies, performance optimization, and engineering problem-solving. Started approaching development with a systems-thinking and optimization mindset.',
    mindset:
      'Engineering is not just about writing code — it is about solving problems efficiently and designing scalable solutions.',
    icon: Brain,
    color: 'amber',
  },
  {
    year: '2026',
    phase: 'Phase 05',
    title: 'AI-Augmented Development',
    description:
      'Started integrating AI-assisted workflows into development, exploring scalable engineering concepts, modern development tooling, and advanced software architecture patterns.',
    mindset:
      'AI becomes most powerful when combined with strong engineering fundamentals and structured thinking.',
    icon: Cpu,
    color: 'purple',
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export const JourneyTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="journey" className="relative py-28 md:py-32 px-4 md:px-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.12), transparent)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12), transparent)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4], x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Floating Particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${i % 5 === 0 ? '#F43F5E' : i % 5 === 1 ? '#06B6D4' : i % 5 === 2 ? '#10B981' : i % 5 === 3 ? '#F59E0B' : '#A855F7'}, transparent)`,
            }}
            animate={{ y: [0, -40, 0], opacity: [0, 0.5, 0], scale: [0, 1.5, 0] }}
            transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10" ref={containerRef}>
        {/* Header - Without Badge */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-6"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-rose-400 via-cyan-500 via-emerald-500 via-amber-500 to-purple-500 bg-clip-text text-transparent">
              How I Think,
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
              Learn & Build
            </span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "6rem" } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-rose-500 via-cyan-500 via-emerald-500 via-amber-500 to-purple-500 mx-auto rounded-full mb-6"
          />

          <motion.p 
            className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            A journey through programming, full-stack development, scalable systems,
            problem-solving, and modern software engineering.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line - Animated */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block -translate-x-1/2 origin-top"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, #F43F5E 15%, #06B6D4 35%, #10B981 55%, #F59E0B 75%, #A855F7 85%, transparent 100%)',
            }}
          />

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-20">
            {journeyItems.map((item, index) => {
              const Icon = item.icon;
              const styles = colorClasses[item.color];
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                  className={`flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'} text-center`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`
                        inline-block max-w-xl p-7 rounded-2xl
                        backdrop-blur-sm bg-gradient-to-br from-gray-900/90 to-gray-950/90
                        border-2 transition-all duration-500
                        ${styles.border} ${styles.hover}
                        hover:shadow-2xl ${styles.glow}
                      `}
                    >
                      {/* Year + Phase */}
                      <div className={`flex items-center gap-3 ${isEven ? 'md:justify-end' : 'md:justify-start'} justify-center mb-4`}>
                        <motion.span
                          className={`px-3 py-1 rounded-full text-xs font-bold font-orbitron ${styles.bg} ${styles.border} border ${styles.text}`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {item.year}
                        </motion.span>
                        <span className="text-xs uppercase tracking-[0.2em] font-orbitron font-bold text-gray-500">
                          {item.phase}
                        </span>
                      </div>

                      {/* Title */}
                      <motion.h3
                        className="text-2xl font-bold font-orbitron text-white mb-4"
                        whileHover={{ scale: 1.02 }}
                      >
                        {item.title}
                      </motion.h3>

                      {/* Description */}
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-5">
                        {item.description}
                      </p>

                      {/* Thinking Approach */}
                      <motion.div
                        className={`rounded-xl p-4 border-2 ${styles.bg} ${styles.border}`}
                        whileHover={{ x: 5 }}
                      >
                        <p className="text-sm leading-relaxed text-gray-300">
                          <span className={`font-semibold ${styles.text}`}>
                            💡 Thinking Approach:
                          </span>{' '}
                          {item.mindset}
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Center Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
                    className="relative z-10 flex-shrink-0"
                  >
                    <div className={`
                      w-16 h-16 rounded-full flex items-center justify-center border-2
                      bg-gray-900/90 backdrop-blur-xl shadow-2xl
                      ${styles.border} ${styles.glow}
                    `}>
                      <Icon className={`w-7 h-7 ${styles.text}`} />
                    </div>
                  </motion.div>

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500/5 to-purple-500/5 backdrop-blur-sm border border-white/10">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-gray-500">Continuous Growth • Lifelong Learning • Scalable Thinking</span>
            <Star className="w-3 h-3 text-amber-400" />
          </div>
        </motion.div>

        {/* Background Cyber Grid */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(244,63,94,0.1) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(6,182,212,0.1) 1px, transparent 1px),
                                linear-gradient(45deg, rgba(16,185,129,0.05) 1px, transparent 1px)`,
              backgroundSize: '50px 50px, 50px 50px, 70px 70px'
            }}
          />
        </div>
      </div>
    </section>
  );
};