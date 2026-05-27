import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSectionTheme, SectionId } from '@/hooks/useSectionTheme';
import { Home, User, Lightbulb, Briefcase, FolderKanban, Brain, Mail } from 'lucide-react';

const navItems: { id: SectionId; label: string; icon: typeof Home }[] = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Lightbulb },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'proof', label: 'Engineering', icon: Brain },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export const FloatingNav = () => {
  const { currentSection, theme } = useSectionTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsExpanded(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          <motion.div
            className="flex items-center gap-1 px-2 py-2 rounded-full glass-premium"
            style={{
              border: `1px solid hsla(${theme.primaryHue}, 80%, 50%, 0.25)`,
              boxShadow: `0 0 30px hsla(${theme.primaryHue}, 80%, 50%, 0.12), 0 4px 20px rgba(0,0,0,0.3)`,
            }}
            animate={{
              paddingLeft: isExpanded ? 16 : 8,
              paddingRight: isExpanded ? 16 : 8,
            }}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {navItems.map((item, index) => {
              const isActive = currentSection === item.id;
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative flex items-center gap-2 p-3 min-w-[44px] min-h-[44px] rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    color: isActive 
                      ? `hsl(${theme.primaryHue}, 100%, 60%)` 
                      : 'hsl(var(--foreground-muted))',
                  }}
                  aria-label={item.label}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `hsla(${theme.primaryHue}, 100%, 50%, 0.15)`,
                        border: `1px solid hsla(${theme.primaryHue}, 100%, 50%, 0.3)`,
                      }}
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    />
                  )}
                  
                  <Icon className="w-4 h-4 relative z-10" />
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 'auto', opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs font-medium whitespace-nowrap overflow-hidden relative z-10"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
