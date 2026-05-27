import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Globe, 
  Smartphone, 
  Cloud, 
  GitBranch,
  Palette,
  Server,
  Sparkles,
  Shield
} from 'lucide-react';
import { AnimatedSkillBadge } from '@/components/ui/animated-skill-badge';
import { SkillFilter, type SkillCategory } from '@/components/ui/skill-filter';

type Skill = {
  icon: typeof Code2;
  name: string;
  description: string;
  level: number;
  color: string;
  category: SkillCategory;
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills: Skill[] = [
    {
      icon: Code2,
      name: 'Frontend Development',
      description: 'React, JavaScript, TypeScript, Tailwind CSS',
      level: 88,
      color: 'from-cyan-500 to-blue-500',
      category: 'frontend',
    },
    {
      icon: Globe,
      name: 'Web Technologies',
      description: 'HTML5, CSS3, JavaScript, Responsive Design',
      level: 90,
      color: 'from-blue-500 to-indigo-500',
      category: 'frontend',
    },
    {
      icon: Server,
      name: 'Backend Development',
      description: 'Node.js, Express.js, REST APIs',
      level: 78,
      color: 'from-orange-500 to-red-500',
      category: 'backend',
    },
    {
      icon: Database,
      name: 'Database Management',
      description: 'MongoDB, Supabase, Firebase Basics',
      level: 75,
      color: 'from-emerald-500 to-teal-500',
      category: 'backend',
    },
    {
      icon: GitBranch,
      name: 'Version Control',
      description: 'Git, GitHub, Collaboration Workflow',
      level: 85,
      color: 'from-purple-500 to-pink-500',
      category: 'tools',
    },
    {
      icon: Code2,
      name: 'Programming & DSA',
      description: 'C++, Java, Data Structures & Algorithms',
      level: 82,
      color: 'from-yellow-500 to-orange-500',
      category: 'tools',
    },
    {
      icon: Palette,
      name: 'UI/UX & Design',
      description: 'Modern UI Design, Animations, Responsive Layouts',
      level: 72,
      color: 'from-pink-500 to-rose-500',
      category: 'design',
    },
    {
      icon: Cloud,
      name: 'Deployment & Tools',
      description: 'Vercel, Netlify, Railway, VS Code',
      level: 76,
      color: 'from-sky-500 to-cyan-500',
      category: 'tools',
    },
  ];

  // Calculate category counts
  const categories = useMemo(() => {
    const counts: Record<SkillCategory, number> = {
      all: skills.length,
      frontend: 0,
      backend: 0,
      devops: 0,
      mobile: 0,
      design: 0,
      tools: 0,
    };

    skills.forEach(skill => {
      counts[skill.category]++;
    });

    return [
      { id: 'all' as SkillCategory, label: 'All Skills', count: counts.all, icon: Sparkles },
      { id: 'frontend' as SkillCategory, label: 'Frontend', count: counts.frontend, icon: Globe },
      { id: 'backend' as SkillCategory, label: 'Backend', count: counts.backend, icon: Server },
      { id: 'devops' as SkillCategory, label: 'DevOps', count: counts.devops, icon: Cloud },
      { id: 'mobile' as SkillCategory, label: 'Mobile', count: counts.mobile, icon: Smartphone },
      { id: 'design' as SkillCategory, label: 'Design', count: counts.design, icon: Palette },
      { id: 'tools' as SkillCategory, label: 'Tools', count: counts.tools, icon: Shield },
    ].filter(cat => cat.count > 0 || cat.id === 'all');
  }, [skills]);

  // Filter skills based on active category
  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') return skills;
    return skills.filter(skill => skill.category === activeCategory);
  }, [skills, activeCategory]);

  return (
    <section className="py-20 md:py-24 relative overflow-hidden" id="skills">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15), transparent)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.15), transparent)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
            x: [0, -40, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.12), transparent)' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -30, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0, 0.4, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-6"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Skill Matrix
            </span>
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto rounded-full"
          />
          
          <motion.p 
            className="text-base md:text-lg text-gray-400 mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Explore my technical expertise across various domains
          </motion.p>
        </motion.div>

        {/* Skill Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SkillFilter 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto mt-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -30 }}
                transition={{
                  layout: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                  y: { duration: 0.3 },
                  delay: index * 0.05,
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <AnimatedSkillBadge
                  icon={skill.icon}
                  name={skill.name}
                  description={skill.description}
                  level={skill.level}
                  colorGradient={skill.color}
                  delay={index * 0.1}
                  index={index}
                  isHovered={hoveredSkill === skill.name}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filteredSkills.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-orbitron text-gray-400">No skills found</h3>
              <p className="text-gray-500 mt-2">Try selecting a different category</p>
            </motion.div>
          )}
        </AnimatePresence>

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