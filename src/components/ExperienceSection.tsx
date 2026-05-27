import React, { useState, useRef, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Award, Code, GraduationCap, Briefcase, Download, FileText, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExperienceFilter, type ExperienceCategory, experienceCategoryIcons } from '@/components/ui/experience-filter';

interface TimelineItem {
  id: string;
  type: 'work' | 'education' | 'certification';
  title: string;
  organization: string;
  location: string;
  date: string;
  description: string[];
  technologies?: string[];
  icon: React.ReactNode;
}

const timelineData: TimelineItem[] = [
  {
    id: '1',
    type: 'education',
    title: 'Bachelor of Technology in Computer Science',
    organization: 'Bharat Ratna Babasaheb Bhimrao Ambedkar Rajkiya Engineering College',
    location: 'Pratapgarh, Uttar Pradesh',
    date: '2023 - Present',
    description: [
      'Pursuing a degree in Computer Science Engineering with a strong focus on full-stack development, software engineering, and problem-solving',
      'Actively studying core computer science subjects including Data Structures & Algorithms, Database Management Systems, Operating Systems, and Computer Networks',
      'Continuously building modern web applications and improving technical expertise through real-world development projects and hands-on learning'
    ],
    technologies: ['C++', 'Java', 'JavaScript', 'React', 'Node.js'],
    icon: <GraduationCap className="w-6 h-6" />
  },
  {
    id: '2',
    type: 'certification',
    title: 'Artificial Intelligence Learning Path',
    organization: 'Infosys Springboard',
    location: 'Online Certification',
    date: '2025',
    description: [
      'Successfully completed an Artificial Intelligence learning program covering machine learning fundamentals and modern AI concepts',
      'Explored real-world applications of AI systems, intelligent automation, and data-driven technologies',
      'Strengthened analytical thinking and technical understanding of emerging technologies and problem-solving approaches'
    ],
    technologies: ['Artificial Intelligence', 'Machine Learning', 'Problem Solving'],
    icon: <Award className="w-6 h-6" />
  },
   
  {
    id: '4',
    type: 'work',
    title: 'Student Coordinator – Training & Placement Cell',
    organization: 'Training & Placement Cell',
    location: 'College Campus',
    date: '2025 - Present',
    description: [
      'Coordinated placement-related activities including scheduling, communication, and student participation management',
      'Worked closely with placement teams to support recruitment drives and technical events',
      'Developed organizational, communication, and teamwork skills while contributing to smooth placement operations'
    ],
    technologies: ['Management', 'Coordination', 'Communication'],
    icon: <Briefcase className="w-6 h-6" />
  },
];

// Distinct color schemes for each type
const getTypeColor = (type: TimelineItem['type']) => {
  switch (type) {
    case 'work':
      return '#FF6B35';
    case 'education':
      return '#00D4FF';
    case 'certification':
      return '#FF006E';
    default:
      return '#FF6B35';
  }
};

const getTypeGlowColor = (type: TimelineItem['type']) => {
  switch (type) {
    case 'work':
      return '#FF6B35';
    case 'education':
      return '#00D4FF';
    case 'certification':
      return '#FF006E';
    default:
      return '#FF6B35';
  }
};

const getCardBgColor = (type: TimelineItem['type']) => {
  switch (type) {
    case 'work':
      return 'bg-gradient-to-br from-orange-500/10 via-background-secondary to-orange-600/5';
    case 'education':
      return 'bg-gradient-to-br from-cyan-500/10 via-background-secondary to-cyan-600/5';
    case 'certification':
      return 'bg-gradient-to-br from-pink-500/10 via-background-secondary to-pink-600/5';
    default:
      return 'bg-gradient-to-br from-orange-500/10 via-background-secondary to-orange-600/5';
  }
};

const getTypeGradient = (type: TimelineItem['type']) => {
  switch (type) {
    case 'work':
      return 'from-orange-500 to-red-500';
    case 'education':
      return 'from-cyan-400 to-blue-500';
    case 'certification':
      return 'from-pink-500 to-purple-600';
    default:
      return 'from-orange-500 to-red-500';
  }
};

const TimelineNode = ({ 
  item, 
  index, 
  isVisible,
  activeCategory
}: { 
  item: TimelineItem; 
  index: number; 
  isVisible: boolean;
  activeCategory: ExperienceCategory;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const itemColor = getTypeColor(item.type);
  const glowColor = getTypeGlowColor(item.type);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className="relative flex flex-col md:flex-row items-start mb-12 md:mb-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 50
      }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Timeline Line (Desktop only) */}
      {index !== 0 && (
        <motion.div
          className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b"
          style={{
            top: '-4rem',
            height: '8rem',
            background: `linear-gradient(to bottom, ${itemColor}80, transparent)`
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        />
      )}

      {/* Timeline Node with Pulsing Glow */}
      <motion.div
        className={`relative z-20 mx-auto md:mx-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 mb-4 md:mb-0 cursor-pointer`}
        style={{ top: '1rem' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.15, rotate: 180 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Pulsing Radial Gradient Background */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            filter: 'blur(8px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Node Circle */}
        <motion.div
          className="relative w-12 h-12 md:w-14 md:h-14 rounded-full border-4 flex items-center justify-center backdrop-blur-sm shadow-2xl"
          style={{ 
            borderColor: itemColor,
            backgroundColor: 'hsl(var(--background-tertiary))',
            color: itemColor,
            boxShadow: isHovered ? `0 0 30px ${glowColor}` : `0 0 15px ${glowColor}80`
          }}
        >
          {item.icon}
        </motion.div>
      </motion.div>

      {/* Content Card - Same hover effect as icon */}
      <motion.div
        className={`w-full md:w-5/12 ${isLeft ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'} mt-8 md:mt-0`}
        style={{ marginLeft: isLeft ? 0 : 'auto' }}
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          x: isVisible ? 0 : (isLeft ? -30 : 30)
        }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
      >
        <motion.div
          className="cursor-pointer h-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ 
            scale: 1.02,
            y: -5,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Card 
            className={`relative overflow-hidden backdrop-blur-sm border-2 transition-all duration-300 h-full ${getCardBgColor(item.type)}`}
            style={{
              borderColor: isHovered ? `${itemColor}80` : 'rgba(255,255,255,0.1)',
              boxShadow: isHovered ? `0 0 30px ${glowColor}40` : 'none',
            }}
          >
            {/* Gradient Border Top - Same as icon hover effect */}
            <motion.div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getTypeGradient(item.type)}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Glow Effect on Hover - Same as icon pulse effect */}
            <motion.div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${itemColor}30, transparent 70%)`,
              }}
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Secondary Glow Effect - Matching icon's pulsing */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              animate={{
                boxShadow: isHovered ? `inset 0 0 20px ${glowColor}20` : 'inset 0 0 0px transparent',
              }}
              transition={{ duration: 0.3 }}
            />
            
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-center gap-3 text-sm mb-2">
                <motion.div 
                  className="flex items-center gap-1.5"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                    color: isHovered ? itemColor : 'rgba(255,255,255,0.7)'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Calendar className="w-4 h-4" style={{ color: isHovered ? itemColor : 'rgba(255,255,255,0.5)' }} />
                  <span>{item.date}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-1.5"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                    color: isHovered ? itemColor : 'rgba(255,255,255,0.7)'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="w-4 h-4" style={{ color: isHovered ? itemColor : 'rgba(255,255,255,0.5)' }} />
                  <span className="truncate">{item.location}</span>
                </motion.div>
              </div>
              
              <CardTitle className="text-lg md:text-xl font-orbitron font-bold mb-2">
                <motion.span 
                  className="transition-all duration-300"
                  animate={{
                    color: isHovered ? itemColor : 'white',
                  }}
                >
                  {item.title}
                </motion.span>
              </CardTitle>
              
              <CardDescription className="text-base font-semibold" style={{ color: itemColor }}>
                {item.organization}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-2 text-sm mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {item.description.map((desc, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <motion.div 
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" 
                      style={{ backgroundColor: itemColor }}
                      animate={{ 
                        scale: isHovered ? [1, 1.3, 1] : 1,
                        backgroundColor: isHovered ? itemColor : itemColor
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.span
                      animate={{
                        color: isHovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)'
                      }}
                    >
                      {desc}
                    </motion.span>
                  </motion.li>
                ))}
              </ul>
              
              {item.technologies && item.technologies.length > 0 && (
                <motion.div 
                  className="flex flex-wrap gap-2 mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {item.technologies.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full font-mono transition-all duration-300 cursor-pointer"
                      style={{
                        backgroundColor: `${itemColor}15`,
                        color: itemColor,
                        border: `1px solid ${itemColor}30`,
                      }}
                      whileHover={{ 
                        scale: 1.08,
                        backgroundColor: `${itemColor}30`,
                        borderColor: itemColor,
                        boxShadow: `0 0 10px ${itemColor}`
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<ExperienceCategory>('all');
  const [isDownloading, setIsDownloading] = useState(false);

  // Calculate category counts correctly
  const categories = useMemo(() => {
    const counts: Record<ExperienceCategory, number> = {
      all: timelineData.length,
      work: 0,
      education: 0,
      internship: 0,
    };

    timelineData.forEach(item => {
      if (item.type === 'work') counts.work++;
      if (item.type === 'education') counts.education++;
      if (item.type === 'certification') counts.internship++;
    });

    return [
      { id: 'all' as ExperienceCategory, label: 'All', count: counts.all, icon: experienceCategoryIcons.all },
      { id: 'work' as ExperienceCategory, label: 'Work', count: counts.work, icon: experienceCategoryIcons.work },
      { id: 'education' as ExperienceCategory, label: 'Education', count: counts.education, icon: experienceCategoryIcons.education },
      { id: 'internship' as ExperienceCategory, label: 'Certifications', count: counts.internship, icon: experienceCategoryIcons.internship },
    ].filter(cat => cat.count > 0 || cat.id === 'all');
  }, []);

  // Filter timeline items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return timelineData;
    if (activeCategory === 'internship') {
      return timelineData.filter(item => item.type === 'certification');
    }
    return timelineData.filter(item => item.type === activeCategory);
  }, [activeCategory]);

  // Resume download handler
  const handleDownloadResume = () => {
    setIsDownloading(true);
    
    setTimeout(() => {
      const resumeUrl = '/Rajesh gupta.pdf';
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'Byte_Ranger_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsDownloading(false);
      
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out';
      toast.textContent = 'Resume download started!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }, 500);
  };

  return (
    <section 
      ref={ref}
      className="min-h-screen py-16 md:py-20 relative overflow-hidden"
      id="experience"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,107,53,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      {/* Floating Background Orbs with New Colors */}
      <motion.div
        className="absolute top-20 left-10 w-56 h-56 md:w-72 md:h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.15), transparent)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-64 h-64 md:w-80 md:h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.15), transparent)' }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
          x: [0, -40, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div
        className="absolute top-1/2 left-1/4 w-48 h-48 md:w-60 md:h-60 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,0,110,0.12), transparent)' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [0, -30, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header with New Gradient */}
        <motion.div
          className="text-center mb-12 md:mb-16 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-3xl md:text-5xl lg:text-7xl font-orbitron font-bold mb-4 md:mb-6"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-orange-500 via-cyan-500 to-pink-500 bg-clip-text text-transparent">
              Experience & Education
            </span>
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isInView ? "5rem" : 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-0.5 bg-gradient-to-r from-orange-500 via-cyan-500 to-pink-500 mx-auto rounded-full"
          />
          
          <motion.p 
            className="text-base md:text-lg text-gray-400 mt-4 md:mt-6 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            A journey of learning, growth, leadership, and hands-on experiences throughout my academic and technical path.
          </motion.p>
        </motion.div>

        {/* Experience Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="px-2"
        >
          <ExperienceFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto px-2 md:px-4 mt-8 md:mt-12">
          {/* Central Animated Timeline Line - Hidden on Mobile */}
          <motion.div
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 top-0"
            style={{ 
              height: '90%',
              background: 'linear-gradient(180deg, #FF6B35, #00D4FF, #FF006E, transparent)',
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />

          {/* Timeline Items with AnimatePresence */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {filteredItems.length > 0 ? (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredItems.map((item, index) => (
                    <TimelineNode
                      key={item.id}
                      item={item}
                      index={index}
                      isVisible={isInView}
                      activeCategory={activeCategory}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-20"
                >
                  <div className="text-5xl md:text-6xl mb-4">📭</div>
                  <h3 className="text-lg md:text-xl font-orbitron text-gray-400">No items found</h3>
                  <p className="text-sm md:text-base text-gray-500 mt-2">Try selecting a different category</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Resume Download Section */}
        <motion.div
          className="mt-16 md:mt-20 text-center relative z-10 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div
            className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mb-6 md:mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={handleDownloadResume}
              disabled={isDownloading}
              className="group relative px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-orange-600/20 via-cyan-600/20 to-pink-600/20 backdrop-blur-sm border-2 border-orange-500/50 hover:border-orange-500 transition-all duration-300 overflow-hidden w-full md:w-auto"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-600 via-cyan-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                animate={{
                  x: isDownloading ? ['0%', '100%'] : '0%',
                }}
                transition={{ duration: 1, repeat: isDownloading ? Infinity : 0 }}
              />
              
              <div className="relative flex items-center justify-center gap-2 md:gap-3">
                {isDownloading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Download className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                    </motion.div>
                    <span className="text-sm md:text-lg font-orbitron font-semibold text-orange-500">
                      Preparing Resume...
                    </span>
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <FileText className="w-4 h-4 md:w-5 md:h-5 text-orange-500 group-hover:text-cyan-500 transition-colors" />
                    </motion.div>
                    <span className="text-sm md:text-lg font-orbitron font-semibold bg-gradient-to-r from-orange-500 via-cyan-500 to-pink-500 bg-clip-text text-transparent">
                      Download Resume
                    </span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <Download className="w-3 h-3 md:w-4 md:h-4 text-orange-500/70 group-hover:text-cyan-500 transition-colors" />
                    </motion.div>
                  </>
                )}
              </div>
            </button>
          </motion.div>
          
          <motion.p
            className="text-xs text-gray-500 mt-3 md:mt-4 flex items-center justify-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <Sparkles className="w-3 h-3 text-orange-500" />
            PDF format • Updated 2026
            <Sparkles className="w-3 h-3 text-pink-500" />
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};