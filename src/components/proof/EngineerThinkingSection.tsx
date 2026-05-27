import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  Brain,
  Bug,
  Gauge,
  Search,
  Layers,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Target,
  Zap,
  TrendingUp,
  Lightbulb,
  Rocket,
  Shield,
  Cpu,
} from 'lucide-react';

interface ThinkingStep {
  title: string;
  description: string;
  example: string;
}

interface ThinkingApproach {
  icon: any;
  title: string;
  color: string;
  steps: ThinkingStep[];
}

const colorClasses = {
  rose: {
    text: 'text-rose-400',
    border: 'border-rose-500/40',
    bg: 'bg-rose-500/10',
    glow: 'shadow-[0_0_30px_rgba(244,63,94,0.2)]',
    hover: 'hover:border-rose-500/60',
    gradient: 'from-rose-500 to-pink-500',
  },
  blue: {
    text: 'text-blue-400',
    border: 'border-blue-500/40',
    bg: 'bg-blue-500/10',
    glow: 'shadow-[0_0_30px_rgba(59,130,246,0.2)]',
    hover: 'hover:border-blue-500/60',
    gradient: 'from-blue-500 to-cyan-500',
  },
  amber: {
    text: 'text-amber-400',
    border: 'border-amber-500/40',
    bg: 'bg-amber-500/10',
    glow: 'shadow-[0_0_30px_rgba(245,158,11,0.2)]',
    hover: 'hover:border-amber-500/60',
    gradient: 'from-amber-500 to-yellow-500',
  },
  violet: {
    text: 'text-violet-400',
    border: 'border-violet-500/40',
    bg: 'bg-violet-500/10',
    glow: 'shadow-[0_0_30px_rgba(139,92,246,0.2)]',
    hover: 'hover:border-violet-500/60',
    gradient: 'from-violet-500 to-purple-500',
  },
  teal: {
    text: 'text-teal-400',
    border: 'border-teal-500/40',
    bg: 'bg-teal-500/10',
    glow: 'shadow-[0_0_30px_rgba(20,184,166,0.2)]',
    hover: 'hover:border-teal-500/60',
    gradient: 'from-teal-500 to-emerald-500',
  },
  indigo: {
    text: 'text-indigo-400',
    border: 'border-indigo-500/40',
    bg: 'bg-indigo-500/10',
    glow: 'shadow-[0_0_30px_rgba(99,102,241,0.2)]',
    hover: 'hover:border-indigo-500/60',
    gradient: 'from-indigo-500 to-blue-500',
  },
};

export const EngineerThinkingSection = () => {
  const [expandedApproach, setExpandedApproach] = useState<number | null>(0);

  const approaches: ThinkingApproach[] = [
   {
  icon: Search,
  title: 'Structured Problem Solving',
  color: 'rose',

  steps: [
    {
      title: '1. Understanding the Problem',
      description:
        'I first try to clearly understand the actual issue before jumping into coding or implementation.',
      
      example:
        '"Users are unable to complete checkout" → Check whether the issue is coming from authentication, payment integration, cart logic, or backend validation.',
    },

    {
      title: '2. Analyzing Requirements & Limitations',
      description:
        'Before building a solution, I analyze project requirements, technical limitations, scalability needs, and possible dependencies.',
      
      example:
        'Making sure the application stays responsive, handles API limitations properly, and works smoothly across devices.',
    },

    {
      title: '3. Breaking Down Complex Problems',
      description:
        'I prefer dividing large problems into smaller and manageable parts so the development process becomes more organized and easier to maintain.',
      
      example:
        'Authentication system → Login flow → Token handling → Session management → Access control.',
    },

    {
      title: '4. Focusing on What Matters Most',
      description:
        'I prioritize solving high-impact issues first, especially the ones affecting user experience, functionality, or system stability.',
      
      example:
        'Fixing server-side errors and broken functionality before working on visual enhancements or animations.',
    },
  ],
},
   {
  icon: Bug,
  title: 'Systematic Debugging Strategy',
  color: 'blue',

  steps: [
    {
      title: '1. Understanding the Issue Clearly',
      description:
        'I first try to reproduce the issue properly and understand when, where, and why it is happening before making changes.',
      
      example:
        'The application works locally but fails after deployment → Check environment variables, API endpoints, build configuration, and server logs.',
    },

    {
      title: '2. Finding the Root Cause',
      description:
        'Instead of guessing, I compare working and failing parts of the system to identify the exact source of the problem.',
      
      example:
        'Using logs, network inspection, git history, and debugging tools to trace where the issue actually starts.',
    },

    {
      title: '3. Testing Possible Solutions',
      description:
        'I create logical assumptions based on the issue and test them step by step to confirm the real cause.',
      
      example:
        'If API responses are outdated, verify whether caching, state management, or incorrect request handling is causing the issue.',
    },

    {
      title: '4. Solving Problems Step by Step',
      description:
        'I prefer debugging methodically by changing one thing at a time and validating each fix carefully.',
      
      example:
        'Adding focused logs, checking a single API response, and validating one condition before moving to another possibility.',
    },
  ],
},
   {
  icon: Gauge,
  title: 'Performance Optimization',
  color: 'amber',

  steps: [
    {
      title: '1. Understanding Performance Issues',
      description:
        'Before optimizing anything, I first try to understand where the actual performance issue is coming from instead of making random changes.',
      
      example:
        'Using tools like Lighthouse, browser DevTools, or React Profiler to check slow loading times, large bundles, or unnecessary renders.',
    },

    {
      title: '2. Focusing on the Biggest Bottleneck',
      description:
        'I prioritize optimizing the parts of the application that have the biggest impact on user experience and overall performance.',
      
      example:
        'Improving a slow API response or reducing page loading time before optimizing small UI-level delays.',
    },

    {
      title: '3. Balancing Performance & Maintainability',
      description:
        'I try to optimize applications in a way that keeps the code scalable, maintainable, and easy to manage in the long run.',
      
      example:
        'Using caching, lazy loading, or code splitting carefully without making the application unnecessarily complex.',
    },

    {
      title: '4. Verifying Real Improvements',
      description:
        'After optimization, I measure performance again to confirm that the changes actually improved the user experience.',
      
      example:
        'Checking whether load time, responsiveness, or rendering performance improved after implementing optimizations.',
    },
  ],
},
    {
  icon: Layers,
  title: 'Scalable System Design',
  color: 'violet',

  steps: [
    {
      title: '1. Building with Scalability in Mind',
      description:
        'I prefer designing systems that can grow smoothly as users, features, and data increase over time.',
      
      example:
        'Structuring applications in a modular way so new features and services can be added without affecting the entire system.',
    },

    {
      title: '2. Improving Reliability & Stability',
      description:
        'I focus on creating systems that remain stable, reliable, and capable of handling unexpected failures gracefully.',
      
      example:
        'Using backups, proper error handling, fallback systems, and reliable database management to avoid critical failures.',
    },

    {
      title: '3. Optimizing Data & Application Flow',
      description:
        'I try to reduce unnecessary operations and improve how data moves through the application for better performance and efficiency.',
      
      example:
        'Implementing caching, lazy loading, pagination, and optimized API handling to improve responsiveness.',
    },

    {
      title: '4. Balancing Performance & Maintainability',
      description:
        'Good system design is not only about performance — it is also about keeping the application maintainable, scalable, and easier to manage.',
      
      example:
        'Choosing solutions that improve scalability while keeping the codebase clean and manageable for future development.',
    },
  ],
},
  ];

  return (
    <section className="relative py-24 md:py-28 overflow-hidden" id="engineering-mindset">
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
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12), transparent)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4], x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.1), transparent)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2], x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        
        {/* Floating Particles - More vibrant */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? '#F43F5E' : i % 3 === 0 ? '#3B82F6' : i % 4 === 0 ? '#F59E0B' : '#8B5CF6'}, transparent)`,
            }}
            animate={{ y: [0, -40, 0], opacity: [0, 0.6, 0], scale: [0, 1.5, 0] }}
            transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header - Clean without badge */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-6"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-rose-400 via-blue-500 via-amber-500 to-violet-500 bg-clip-text text-transparent">
              Engineering Mindset
            </span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-rose-500 via-blue-500 via-amber-500 to-violet-500 mx-auto rounded-full mb-6"
          />

          <motion.p 
            className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            A systematic approach to problem-solving, debugging, performance
            optimization, and scalable software engineering.
          </motion.p>
        </motion.div>

        {/* Cards - With New Colors */}
        <div className="max-w-5xl mx-auto space-y-5">
          {approaches.map((approach, index) => {
            const Icon = approach.icon;
            const isExpanded = expandedApproach === index;
            const styles = colorClasses[approach.color as keyof typeof colorClasses];

            return (
              <motion.div
                key={approach.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`
                    relative overflow-hidden backdrop-blur-sm
                    bg-gradient-to-br from-gray-900/90 to-gray-950/90
                    transition-all duration-500
                    hover:-translate-y-1 hover:shadow-2xl
                    ${isExpanded ? `${styles.border} ${styles.glow}` : 'border border-white/10 hover:border-white/20'}
                  `}
                >
                  {/* Animated Gradient Border */}
                  <motion.div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 0% 0%, ${approach.color === 'rose' ? '#F43F5E' : approach.color === 'blue' ? '#3B82F6' : approach.color === 'amber' ? '#F59E0B' : '#8B5CF6'}15, transparent 70%)`,
                    }}
                    animate={{ opacity: isExpanded ? 1 : 0 }}
                  />

                  {/* Card Header */}
                  <motion.div
                    onClick={() => setExpandedApproach(isExpanded ? null : index)}
                    className="flex items-center justify-between p-6 cursor-pointer group"
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className={`
                          p-3 rounded-xl border-2 transition-all duration-300
                          ${styles.bg} ${styles.border}
                          group-hover:scale-110
                        `}
                        whileHover={{ rotate: 5 }}
                      >
                        <Icon className={`w-6 h-6 ${styles.text}`} />
                      </motion.div>

                      <h3 className="text-lg md:text-xl font-semibold font-orbitron text-white">
                        {approach.title}
                      </h3>
                    </div>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className={`w-5 h-5 ${styles.text}`} />
                    </motion.div>
                  </motion.div>

                  {/* Expandable Content */}
                  <AnimatePresence mode="wait">
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <CardContent className="px-6 pb-6 pt-4 border-t border-white/10">
                          <div className="grid gap-6 mt-2">
                            {approach.steps.map((step, stepIndex) => (
                              <motion.div
                                key={step.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: stepIndex * 0.08, duration: 0.3 }}
                                className="relative pl-8"
                              >
                                {/* Timeline Connector */}
                                {stepIndex < approach.steps.length - 1 && (
                                  <motion.div
                                    className={`absolute left-[10px] top-8 bottom-0 w-px ${styles.bg}`}
                                    initial={{ scaleY: 0 }}
                                    animate={{ scaleY: 1 }}
                                    transition={{ delay: stepIndex * 0.1, duration: 0.5 }}
                                  />
                                )}

                                <div className="flex items-start gap-4">
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: stepIndex * 0.1, type: "spring", stiffness: 300 }}
                                  >
                                    <CheckCircle2 className={`w-5 h-5 mt-1 flex-shrink-0 ${styles.text}`} />
                                  </motion.div>

                                  <div className="flex-1">
                                    <h4 className={`font-semibold mb-2 font-orbitron text-white`}>
                                      {step.title}
                                    </h4>

                                    <p className="text-sm leading-relaxed text-gray-400 mb-3">
                                      {step.description}
                                    </p>

                                    <motion.div
                                      className={`
                                        text-xs md:text-sm font-mono p-3 rounded-lg
                                        bg-gray-800/50 border-l-2 ${styles.border}
                                        text-gray-300 hover:bg-gray-800/70 transition-all duration-300
                                      `}
                                      whileHover={{ x: 5 }}
                                    >
                                      💡 {step.example}
                                    </motion.div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Background Cyber Grid */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(244,63,94,0.1) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(59,130,246,0.1) 1px, transparent 1px),
                                linear-gradient(45deg, rgba(245,158,11,0.05) 1px, transparent 1px)`,
              backgroundSize: '50px 50px, 50px 50px, 70px 70px'
            }}
          />
        </div>
      </div>
    </section>
  );
};