import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Flame,
  Trophy,
  Users,
  Target,
  Award,
  Briefcase,
  Sparkles,
  Heart,
  Camera,
  Zap,
  ChevronRight,
  Quote,
  Coffee,
  PenTool,
  Signature,
  Paintbrush,
  Rocket,
  Medal,
  CheckCircle,
  Star,
  TrendingUp,
  Cpu,
  Calendar,
  MapPin,
  Building,
  Laptop,
  GitBranch,
} from 'lucide-react';

/* =========================================================
   TYPES
========================================================= */

interface Achievement {
  icon: any;
  value: string;
  label: string;
  description: string;
  color: string;
}

/* =========================================================
   ACHIEVEMENTS DATA
========================================================= */

const achievements: Achievement[] = [
  {
    icon: Code2,
    value: '350+',
    label: 'DSA Problems',
    description: 'Solved across LeetCode, CodeChef, GeeksforGeeks',
    color: 'cyan',
  },
  {
    icon: Flame,
    value: '180+',
    label: 'Day Streak',
    description: 'Consistent daily coding practice',
    color: 'orange',
  },
  {
    icon: Trophy,
    value: 'Top 8%',
    label: 'Competitive Programming',
    description: 'National-level coding competition rank',
    color: 'amber',
  },
  {
    icon: Target,
    value: '65+',
    label: 'Contests',
    description: 'CodeChef, LeetCode, and more',
    color: 'purple',
  },
];

/* =========================================================
   ACTIVITIES DATA
========================================================= */

const activities = [
  {
    id: 1,
    title: 'Training & Placement Cell',
    role: 'Student Coordinator',
    description:
      'As a Student Coordinator in the Training & Placement Cell, I worked with students and recruiters during placement activities and campus drives. My role mainly involved managing communication, coordinating schedules, helping students during recruitment processes, and making sure everything ran smoothly during placement sessions and company visits.',

    image: '/favico.ico',
    color: 'cyan',

    tags: ['Coordination', 'Leadership', 'Communication'],

    quote:
      'Helping students move one step closer to their careers was always the most rewarding part.'
  },

  {
    id: 2,
    title: 'Social Impact Club',
    role: 'Core Team Member',
    description:
      'Being part of the Social Impact Club gave me the opportunity to work on activities focused on teamwork, social awareness, and community involvement. I actively participated in organizing events, awareness drives, and volunteer activities that encouraged students to contribute beyond academics.',

    image: '/sc.ico',
    color: 'purple',

    tags: ['Teamwork', 'Community', 'Event Management'],

    quote:
      'Even small efforts can create a meaningful impact when people work together.'
  },

  {
    id: 3,
    title: 'Social Media Team',
    role: 'Content Strategy Head',
    description:
      'As the head of the Social Media Team, I worked on planning content, managing creative posts, and improving the digital presence of our student community. I collaborated with designers and team members to create engaging content that connected better with students and increased overall engagement.',

    image: '/sm.ico',
    color: 'pink',

    tags: ['Creativity', 'Content Planning', 'Digital Presence'],

    quote:
      'Good content is not just about design — it is about creating connection and engagement.'
  },
];

/* =========================================================
   COLOR CLASSES
========================================================= */

const colorStyles = {
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    glow: 'shadow-[0_0_30px_rgba(6,182,212,0.25)]',
    gradient: 'from-cyan-500 to-blue-500',
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    glow: 'shadow-[0_0_30px_rgba(249,115,22,0.25)]',
    gradient: 'from-orange-500 to-red-500',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    glow: 'shadow-[0_0_30px_rgba(245,158,11,0.25)]',
    gradient: 'from-amber-500 to-yellow-500',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    glow: 'shadow-[0_0_30px_rgba(168,85,247,0.25)]',
    gradient: 'from-purple-500 to-pink-500',
  },
  pink: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30',
    text: 'text-pink-400',
    glow: 'shadow-[0_0_30px_rgba(236,72,153,0.25)]',
    gradient: 'from-pink-500 to-rose-500',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    glow: 'shadow-[0_0_30px_rgba(16,185,129,0.25)]',
    gradient: 'from-emerald-500 to-teal-500',
  },
};

/* =========================================================
   COUNT UP ANIMATION
========================================================= */

const CountUp = ({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.toString());
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

/* =========================================================
   DRAWING CANVAS COMPONENT
========================================================= */

const DrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#06B6D4');
  const [brushSize, setBrushSize] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [color, brushSize]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="space-y-3 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Paintbrush className="w-5 h-5 text-cyan-400" />
          <span className="text-sm text-gray-300 font-medium">Digital Canvas</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-7 h-7 rounded cursor-pointer bg-transparent border border-white/20"
          />
          <select
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="bg-white/10 border border-white/20 rounded text-xs px-2 py-1 text-white"
          >
            <option value={2}>Small</option>
            <option value={4}>Medium</option>
            <option value={6}>Large</option>
          </select>
          <button
            onClick={clearCanvas}
            className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
          >
            Clear
          </button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="w-full h-80 rounded-xl border-2 border-white/20 bg-black/50 cursor-crosshair"
        style={{ touchAction: 'none' }}
      />
      <p className="text-xs text-center text-gray-500 italic">
        🎨 Draw, write, or sign — express yourself freely
      </p>
    </div>
  );
};

/* =========================================================
   TECH TEAM COORDINATOR INFO BOX COMPONENT
========================================================= */

const TechTeamInfoBox = () => {
  const styles = colorStyles.emerald;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`p-5 rounded-2xl ${styles.bg} border-2 ${styles.border} backdrop-blur-sm transition-all duration-300 ${styles.glow}`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${styles.bg} border ${styles.border}`}>
          <Laptop className={`w-6 h-6 ${styles.text}`} />
        </div>
        <div className="flex-1">
          <h4 className={`text-lg font-orbitron font-bold ${styles.text} mb-2`}>
            Tech Team Coordinator
          </h4>
          <p className="text-sm text-gray-300 mb-3 leading-relaxed">
            As a Tech Coordinator for the college tech fest, I managed technical activities, 
            coordinated event execution, and worked closely with different teams to ensure 
            smooth management of competitions, technical sessions, and student participation 
            throughout the event.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-gray-400">8+ Technical Events</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-gray-400">500+ Participants</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-gray-400">3-Day Tech Fest</span>
            </div>
            <div className="flex items-center gap-2">
              <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-gray-400">Cross-Team Coordination</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* =========================================================
   ACTIVITY CARD COMPONENT
========================================================= */

const ActivityCard = ({ activity, index, isInView }: { activity: any; index: number; isInView: boolean }) => {
  const styles = colorStyles[activity.color as keyof typeof colorStyles];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.8 + index * 0.15, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={`group relative overflow-hidden rounded-2xl border-2 ${styles.border} bg-white/5 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl ${styles.glow}`}
    >
      <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} h-full`}>
        {/* Image Section */}
        <div className="md:w-2/5 relative overflow-hidden min-h-[200px]">
          <img
            src={activity.image}
            alt={activity.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4">
            <div className={`inline-block px-2 py-1 rounded text-xs font-mono ${styles.bg} ${styles.text} border ${styles.border}`}>
              {activity.role}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="md:w-3/5 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
              <h3 className={`text-lg font-orbitron font-bold ${styles.text}`}>
                {activity.title}
              </h3>
              <div className="flex flex-wrap gap-1">
                {activity.tags.slice(0, 2).map((tag: string, i: number) => (
                  <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full ${styles.bg} ${styles.text}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {activity.description}
            </p>
          </div>

          {activity.quote && (
            <div className={`mt-3 p-3 rounded-lg ${styles.bg} border-l-2 ${styles.border}`}>
              <Quote className={`w-3 h-3 ${styles.text} mb-1`} />
              <p className="text-xs italic text-gray-400">"{activity.quote}"</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export const BeyondCodingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-28 px-4 md:px-6 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 20% 30%, #0a0a0f 0%, #050508 100%)',
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagon" width="50" height="50" patternUnits="userSpaceOnUse" patternTransform="scale(1.2)">
              <path d="M25 0 L50 12.5 L50 37.5 L25 50 L0 37.5 L0 12.5 Z" fill="none" stroke="#06B6D4" strokeWidth="0.5" strokeOpacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagon)" />
        </svg>

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-10 left-10 w-56 h-56 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08), transparent)' }}
          animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08), transparent)' }}
          animate={{ scale: [1.1, 1, 1.1], x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${i % 4 === 0 ? '#06B6D4' : i % 4 === 1 ? '#A855F7' : i % 4 === 2 ? '#EC4899' : '#F59E0B'}, transparent)`,
            }}
            animate={{
              y: [0, -40, 0],
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

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full blur-xl animate-pulse" />
              <div className="relative flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 backdrop-blur-xl px-5 py-2 rounded-full border border-white/20">
                <Rocket className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold tracking-wider text-white">BEYOND THE CODE</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </div>
            </div>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-orbitron font-black mb-3"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">
              Beyond the Code
            </span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "5rem" } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-4"
          />

          <motion.p
            className="text-base text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            Building communities, leading teams, and creating impact beyond the screen
          </motion.p>
        </motion.div>

        {/* Grid Layout: 1/2 + 1/2 */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Achievements & Activities */}
          <div className="space-y-6">
            {/* Problem Solving Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Medal className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-orbitron font-bold text-white">Problem Solving Discipline</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {achievements.map((achievement, idx) => {
                  const Icon = achievement.icon;
                  const styles = colorStyles[achievement.color as keyof typeof colorStyles];
                  const numericValue = parseInt(achievement.value);
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.8 + idx * 0.05 }}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className={`p-3 rounded-xl ${styles.bg} border ${styles.border} text-center transition-all cursor-pointer`}
                    >
                      <Icon className={`w-5 h-5 ${styles.text} mx-auto mb-1`} />
                      <div className={`text-lg font-orbitron font-bold ${styles.text}`}>
                        {isNaN(numericValue) ? achievement.value : <CountUp value={numericValue} suffix="+" />}
                      </div>
                      <div className="text-[9px] text-gray-400">{achievement.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Activities */}
            {activities.map((activity, idx) => (
              <ActivityCard key={activity.id} activity={activity} index={idx} isInView={isInView} />
            ))}
          </div>

          {/* Right Column - Digital Canvas + Tech Team Box + Quote */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="h-full"
            >
              <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20">
                <DrawingCanvas />
              </div>
            </motion.div>

            {/* Tech Team Coordinator Info Box */}
            <TechTeamInfoBox />

            {/* Quote Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-white/20 text-center"
            >
              <Quote className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
              <p className="text-gray-300 text-sm italic leading-relaxed">
                "Code is my craft, but leadership and creativity are my superpowers."
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Signature className="w-4 h-4 text-pink-400" />
                <span className="text-xs text-gray-500 font-mono">— Byte Ranger</span>
                <Star className="w-3 h-3 text-amber-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};