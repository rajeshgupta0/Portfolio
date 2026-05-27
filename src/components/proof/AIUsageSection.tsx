import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sparkles,
  Code2,
  RefreshCw,
  BookOpen,
  MessageSquare,
  Zap,
  Shield,
  Layers,
  BrainCircuit,
  Award,
} from 'lucide-react';

/* =========================================================
   TYPES
========================================================= */

interface AIUseCase {
  icon: any;
  title: string;
  description: string;
  examples: string[];
  color: keyof typeof colorClasses;
}

/* =========================================================
   COLOR CLASSES - 6 Different Mix Colors
========================================================= */

const colorClasses = {
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    glow: 'shadow-[0_0_30px_rgba(6,182,212,0.2)]',
    hover: 'hover:border-cyan-500/50',
    gradient: 'from-cyan-500 to-blue-500',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    glow: 'shadow-[0_0_30px_rgba(168,85,247,0.2)]',
    hover: 'hover:border-purple-500/50',
    gradient: 'from-purple-500 to-pink-500',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    glow: 'shadow-[0_0_30px_rgba(16,185,129,0.2)]',
    hover: 'hover:border-emerald-500/50',
    gradient: 'from-emerald-500 to-teal-500',
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    glow: 'shadow-[0_0_30px_rgba(249,115,22,0.2)]',
    hover: 'hover:border-orange-500/50',
    gradient: 'from-orange-500 to-red-500',
  },
  pink: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30',
    text: 'text-pink-400',
    glow: 'shadow-[0_0_30px_rgba(236,72,153,0.2)]',
    hover: 'hover:border-pink-500/50',
    gradient: 'from-pink-500 to-rose-500',
  },
  indigo: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    text: 'text-indigo-400',
    glow: 'shadow-[0_0_30px_rgba(99,102,241,0.2)]',
    hover: 'hover:border-indigo-500/50',
    gradient: 'from-indigo-500 to-purple-500',
  },
};

/* =========================================================
   COMPONENT
========================================================= */

export const AIUsageSection = () => {
  const useCases: AIUseCase[] = [
    {
      icon: Code2,
      title: 'AI-Assisted Code Review',
      description:
        'Leverage AI tools as a secondary review layer to identify issues, optimize implementations, and improve overall code quality.',
      examples: [
        'Detect security vulnerabilities in authentication flows',
        'Identify edge cases in asynchronous operations',
        'Recognize performance anti-patterns',
        'Improve accessibility and semantic structure',
      ],
      color: 'cyan',
    },
    {
      icon: RefreshCw,
      title: 'Intelligent Refactoring Workflow',
      description:
        'Use AI to safely refactor large codebases, improve maintainability, and modernize architecture patterns.',
      examples: [
        'Extract reusable hooks and utilities',
        'Migrate legacy components to modern patterns',
        'Improve TypeScript type safety',
        'Simplify complex business logic',
      ],
      color: 'purple',
    },
    {
      icon: BookOpen,
      title: 'Rapid Technical Learning',
      description:
        'Accelerate understanding of unfamiliar technologies, architectural concepts, and engineering patterns.',
      examples: [
        'Understand framework internals and architecture',
        'Compare system design trade-offs',
        'Analyze complex algorithms and data structures',
        'Learn from real-world production incidents',
      ],
      color: 'emerald',
    },
    {
      icon: MessageSquare,
      title: 'Technical Documentation Automation',
      description:
        'Improve developer experience through automated and structured technical documentation workflows.',
      examples: [
        'Generate API documentation from types',
        'Create project README structures',
        'Document complex logic and workflows',
        'Write architecture decision records',
      ],
      color: 'orange',
    },
    {
      icon: Layers,
      title: 'System Design Exploration',
      description:
        'Use AI to evaluate scalable architectures, distributed systems concepts, and engineering trade-offs.',
      examples: [
        'Compare monolith vs microservices',
        'Evaluate database scaling approaches',
        'Analyze caching and CDN strategies',
        'Explore distributed system reliability patterns',
      ],
      color: 'pink',
    },
    {
      icon: BrainCircuit,
      title: 'Problem-Solving Acceleration',
      description:
        'Enhance debugging, reasoning, and solution exploration through AI-assisted engineering workflows.',
      examples: [
        'Break down complex engineering problems',
        'Explore alternative implementation strategies',
        'Generate debugging hypotheses',
        'Validate optimization approaches',
      ],
      color: 'indigo',
    },
  ];

  const principles = [
    {
      icon: Shield,
      text: 'Validate AI-generated solutions through testing, reasoning, and code review.',
    },
    {
      icon: Zap,
      text: 'AI enhances productivity but never replaces strong engineering fundamentals.',
    },
    {
      icon: Code2,
      text: 'Maintain complete ownership, accountability, and understanding of production code.',
    },
  ];

  return (
    <section className="relative py-24 md:py-28 overflow-hidden" id="ai-usage">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12), transparent)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 40, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.12), transparent)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.1), transparent)' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -30, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        
        {/* Floating Particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`,
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
        {/* =========================================================
            HEADER
        ========================================================= */}

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
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              AI-Assisted Engineering
            </span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-6"
          />

          <motion.p 
            className="text-base md:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Leveraging AI tools to accelerate development,
            improve code quality, optimize workflows, and
            enhance engineering problem-solving while
            maintaining strong technical fundamentals.
          </motion.p>
        </motion.div>

        {/* =========================================================
            USE CASES GRID - 6 Different Colors
        ========================================================= */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto mb-20">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            const styles = colorClasses[useCase.color];

            return (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Card
                  className={`
                    relative overflow-hidden backdrop-blur-sm
                    bg-gradient-to-br from-gray-900/90 to-gray-950/90
                    border-2 h-full transition-all duration-500
                    ${styles.border} ${styles.hover}
                    hover:shadow-2xl ${styles.glow}
                  `}
                >
                  {/* Animated Border Gradient */}
                  <motion.div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 0% 0%, ${useCase.color === 'cyan' ? '#06B6D4' : useCase.color === 'purple' ? '#A855F7' : useCase.color === 'emerald' ? '#10B981' : useCase.color === 'orange' ? '#F97316' : useCase.color === 'pink' ? '#EC4899' : '#6366F1'}15, transparent 70%)`,
                    }}
                    whileHover={{ opacity: 1 }}
                  />
                  
                  <CardContent className="p-6 relative z-10">
                    {/* Icon + Title */}
                    <div className="flex items-start gap-4 mb-5">
                      <motion.div
                        className={`
                          p-3 rounded-xl border-2
                          ${styles.bg} ${styles.border}
                        `}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon className={`w-6 h-6 ${styles.text}`} />
                      </motion.div>

                      <div>
                        <h3 className="font-orbitron text-lg font-semibold text-white mb-2 leading-snug">
                          {useCase.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-400">
                          {useCase.description}
                        </p>
                      </div>
                    </div>

                    {/* Examples */}
                    <ul className="space-y-3">
                      {useCase.examples.map((example, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-3 text-sm text-gray-400"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <motion.span
                            className={`w-1.5 h-1.5 rounded-full mt-2 ${styles.bg}`}
                            whileHover={{ scale: 1.5 }}
                          />
                          <span className="leading-relaxed">{example}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* =========================================================
            PRINCIPLES SECTION
        ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Card className="relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-2 border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(6,182,212,0.1)]">
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 30%, rgba(6,182,212,0.1), transparent 50%)',
                  'radial-gradient(circle at 80% 70%, rgba(168,85,247,0.1), transparent 50%)',
                  'radial-gradient(circle at 40% 80%, rgba(236,72,153,0.1), transparent 50%)',
                  'radial-gradient(circle at 20% 30%, rgba(6,182,212,0.1), transparent 50%)',
                ]
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            
            <CardContent className="p-8 relative z-10">
              {/* Title */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <Award className="w-6 h-6 text-cyan-400" />
                <h3 className="font-orbitron text-2xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Engineering Principles for Responsible AI Usage
                </h3>
              </div>

              {/* Principles */}
              <div className="grid md:grid-cols-3 gap-5">
                {principles.map((principle, index) => {
                  const Icon = principle.icon;
                  const colors = ['cyan', 'purple', 'pink'];
                  const colorStyle = colorClasses[colors[index] as keyof typeof colorClasses];
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                      className={`
                        bg-gray-800/30 backdrop-blur-sm
                        border border-white/10
                        rounded-2xl p-5
                        hover:bg-gray-800/50
                        transition-all duration-300
                        group
                      `}
                    >
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className={`p-2 rounded-lg ${colorStyle.bg} border ${colorStyle.border} group-hover:scale-110 transition-transform duration-300`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon className={`w-5 h-5 ${colorStyle.text}`} />
                        </motion.div>
                        <p className="text-sm leading-relaxed text-gray-300">
                          {principle.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Background Cyber Grid */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(6,182,212,0.1) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(6,182,212,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      </div>
    </section>
  );
};