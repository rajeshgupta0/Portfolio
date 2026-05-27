import { useState, lazy, Suspense } from 'react';
import { useViewMode } from '@/contexts/ViewModeContext';
import { RecruiterModeToggle } from '@/components/RecruiterModeToggle';
import { RecruiterView } from '@/components/RecruiterView';

// Lazy load heavy creative components
const CinematicIntro = lazy(() => import('@/components/CinematicIntro').then(m => ({ default: m.CinematicIntro })));
const DynamicBackground = lazy(() => import('@/components/creative/DynamicBackground').then(m => ({ default: m.DynamicBackground })));
const EnhancedCursor = lazy(() => import('@/components/creative/EnhancedCursor').then(m => ({ default: m.EnhancedCursor })));
const ScrollProgress = lazy(() => import('@/components/creative/ScrollProgress').then(m => ({ default: m.ScrollProgress })));
const FloatingNav = lazy(() => import('@/components/creative/FloatingNav').then(m => ({ default: m.FloatingNav })));

// Regular section imports
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ProjectsCaseStudySection } from '@/components/projects/ProjectsCaseStudySection';
import { EngineerThinkingSection } from '@/components/proof/EngineerThinkingSection';
import { AIUsageSection } from '@/components/proof/AIUsageSection';
import { InteractiveDemosSection } from '@/components/proof/InteractiveDemosSection';
import { JourneyTimeline } from '@/components/personal/JourneyTimeline';
import { BeyondCodingSection } from '@/components/personal/BeyondCodingSection';
import { MicroBlogs } from '@/components/personal/MicroBlogs';
import { FinalCTA } from '@/components/personal/FinalCTA';
import { SectionWrapper } from '@/components/creative/SectionWrapper';

// Loading fallback
const LoadingFallback = () => (
  <div className="fixed inset-0 bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-neon-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const { isRecruiterMode, performance } = useViewMode();
  // Track intro separately, reset when switching TO experience mode
  const [showIntro, setShowIntro] = useState(() => !isRecruiterMode);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  // Skip intro if already seen or switching from recruiter mode
  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasSeenIntro(true);
  };

  // When switching to experience mode, skip intro if already seen
  const shouldShowIntro = showIntro && !hasSeenIntro && !isRecruiterMode;

  // Recruiter Mode - Clean, fast, professional
  if (isRecruiterMode) {
    return (
      <>
        <RecruiterModeToggle />
        <RecruiterView />
      </>
    );
  }

  // Creative Mode - Full immersive experience
  return (
    <div className="min-h-screen">
      <RecruiterModeToggle />
      
      {/* Cinematic intro (only on first visit, skip if switching modes) */}
      {shouldShowIntro && (
        <Suspense fallback={<LoadingFallback />}>
          <CinematicIntro onComplete={handleIntroComplete} />
        </Suspense>
      )}
      
      {/* Main content after intro */}
      {!shouldShowIntro && (
        <Suspense fallback={<LoadingFallback />}>
          {/* Dynamic background that changes per section */}
          <DynamicBackground />
          
          {/* Enhanced cursor effects */}
          {performance.enableParticles && <EnhancedCursor />}
          
          {/* Scroll progress indicator */}
          <ScrollProgress />
          
          {/* Floating navigation */}
          <FloatingNav />
          
          {/* Main sections */}
          <main>
            <SectionWrapper id="hero" showDivider={false}>
              <HeroSection />
            </SectionWrapper>
            
            <SectionWrapper id="about">
              <AboutSection />
            </SectionWrapper>
            
            <SectionWrapper id="skills">
              <SkillsSection />
            </SectionWrapper>
            
            <SectionWrapper id="experience">
              <ExperienceSection />
            </SectionWrapper>
            
            <SectionWrapper id="projects">
              <ProjectsCaseStudySection />
            </SectionWrapper>
            
            <SectionWrapper id="proof">
              <EngineerThinkingSection />
              <AIUsageSection />
              <InteractiveDemosSection />
            </SectionWrapper>
            
            {/* Personal signal sections */}
            <JourneyTimeline />
            
            {/* Beyond Coding Section - Newly Added */}
            <SectionWrapper id="beyond-coding">
              <BeyondCodingSection />
            </SectionWrapper>
            
            <MicroBlogs />
            
            {/* Final CTA */}
            <FinalCTA />
          </main>
          
          {/* Footer */}
          <footer className="py-8 px-6 border-t border-foreground-dim/10">
            <div className="container mx-auto max-w-5xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground-subtle">
                <div className="flex items-center gap-2">
                  <span className="text-neon-primary font-orbitron font-bold">BYTE RANGER</span>
                  <span className="text-foreground-dim">•</span>
                  <span>© {new Date().getFullYear()}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>Built with React, TypeScript & Three.js</span>
                  <span className="text-foreground-dim">•</span>
                  <span className="flex items-center gap-1.5 text-neon-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-primary animate-pulse" />
                    Creative Mode
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </Suspense>
      )}
    </div>
  );
};

export default Index;