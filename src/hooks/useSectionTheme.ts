import { useState, useEffect, useCallback } from 'react';

export type SectionId = 'hero' | 'about' | 'skills' | 'experience' | 'projects' | 'proof' | 'contact';

interface SectionTheme {
  id: SectionId;
  primaryHue: number;
  secondaryHue: number;
  glowIntensity: number;
  particleDensity: number;
  gradientDirection: number;
}

const sectionThemes: Record<SectionId, SectionTheme> = {
  hero: {
    id: 'hero',
    primaryHue: 195,
    secondaryHue: 265,
    glowIntensity: 1,
    particleDensity: 1,
    gradientDirection: 135,
  },
  about: {
    id: 'about',
    primaryHue: 200,
    secondaryHue: 240,
    glowIntensity: 0.8,
    particleDensity: 0.7,
    gradientDirection: 180,
  },
  skills: {
    id: 'skills',
    primaryHue: 265,
    secondaryHue: 320,
    glowIntensity: 0.9,
    particleDensity: 0.8,
    gradientDirection: 225,
  },
  experience: {
    id: 'experience',
    primaryHue: 180,
    secondaryHue: 200,
    glowIntensity: 0.7,
    particleDensity: 0.6,
    gradientDirection: 270,
  },
  projects: {
    id: 'projects',
    primaryHue: 320,
    secondaryHue: 45,
    glowIntensity: 1,
    particleDensity: 0.9,
    gradientDirection: 315,
  },
  proof: {
    id: 'proof',
    primaryHue: 45,
    secondaryHue: 25,
    glowIntensity: 0.85,
    particleDensity: 0.7,
    gradientDirection: 0,
  },
  contact: {
    id: 'contact',
    primaryHue: 195,
    secondaryHue: 150,
    glowIntensity: 0.9,
    particleDensity: 0.8,
    gradientDirection: 45,
  },
};

export const useSectionTheme = () => {
  const [currentSection, setCurrentSection] = useState<SectionId>('hero');
  const [theme, setTheme] = useState<SectionTheme>(sectionThemes.hero);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateSection = useCallback(() => {
    const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'proof', 'contact'] as SectionId[];
    const viewportHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    
    // Calculate overall scroll progress (0 to 1)
    const totalHeight = document.documentElement.scrollHeight - viewportHeight;
    setScrollProgress(Math.min(scrollTop / totalHeight, 1));
    
    // Find current section
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        
        // Section is in view when its top is above 60% of viewport
        if (sectionTop < viewportHeight * 0.6 && sectionBottom > viewportHeight * 0.3) {
          if (currentSection !== sectionId) {
            setCurrentSection(sectionId);
            setTheme(sectionThemes[sectionId]);
          }
          break;
        }
      }
    }
  }, [currentSection]);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(updateSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateSection(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateSection]);

  return {
    currentSection,
    theme,
    scrollProgress,
    allThemes: sectionThemes,
  };
};
