import { motion } from 'framer-motion';
import { RecruiterHero } from './recruiter/RecruiterHero';
import { TechStackSnapshot } from './recruiter/TechStackSnapshot';
import { TopProjectsRecruiter } from './recruiter/TopProjectsRecruiter';
import { RecruiterExperience } from './recruiter/RecruiterExperience';
import { RecruiterContact } from './recruiter/RecruiterContact';
import { Code2, Sparkles, Briefcase, GraduationCap, Star, Mail } from 'lucide-react';

export const RecruiterView = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      {/* Premium subtle background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #3B82F6, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #8B5CF6, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                              linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Top gradient fade */}
        <div 
          className="absolute top-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to bottom, #f9fafb, transparent)',
          }}
        />
      </div>
      
      {/* Navigation hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-4 left-4 z-40 hidden md:block"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-[10px] text-gray-500 dark:text-gray-400 shadow-sm">
          <Sparkles className="w-3 h-3 text-purple-500" />
          <span>Recruiter View • Quick Overview</span>
        </div>
      </motion.div>
      
      <div className="relative z-10">
        <section id="recruiter-hero"><RecruiterHero /></section>
        <section id="recruiter-tech"><TechStackSnapshot /></section>
        <section id="recruiter-projects"><TopProjectsRecruiter /></section>
        <section id="recruiter-experience"><RecruiterExperience /></section>
        <section id="recruiter-contact"><RecruiterContact /></section>
        
        {/* Premium Footer */}
        <footer className="py-12 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-500" />
                <span>© 2024 Rajesh Gupta</span>
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <span>Built with React & TypeScript</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                  Recruiter Mode
                </span>
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <span>Clean • Professional • Fast Load</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};