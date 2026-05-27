import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  Github, 
  ChevronDown, 
  ChevronUp,
  AlertTriangle,
  Lightbulb,
  Scale,
  TrendingUp,
  Wrench,
  Layers,
  X
} from 'lucide-react';
import { ProjectCaseStudy } from '@/data/projectCaseStudies';

interface ProjectCaseStudyCardProps {
  project: ProjectCaseStudy;
  isExpanded: boolean;
  onToggle: () => void;
}

export const ProjectCaseStudyCard = ({ project, isExpanded, onToggle }: ProjectCaseStudyCardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'decisions' | 'impact'>('overview');

  return (
    <Card className={`
      glass-morphism border-neon-primary/30 overflow-hidden
      transition-all duration-500
      ${isExpanded ? 'glow-neon' : 'hover:border-neon-primary/50'}
    `}>
      {/* Header - Always Visible */}
      <div 
        className="p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-orbitron font-bold text-gradient">
                {project.title}
              </h3>
              {project.featured && (
                <span className="px-2 py-0.5 text-[10px] bg-neon-warning/20 text-neon-warning rounded-full border border-neon-warning/30">
                  Featured
                </span>
              )}
            </div>
            <p className="text-foreground-muted mb-3">
              {project.tagline}
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="text-foreground-subtle">
                <span className="text-neon-primary">{project.timeline}</span> • {project.role}
              </span>
            </div>
            
            {/* Tech Stack Preview */}
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-neon-primary/10 text-neon-primary border border-neon-primary/30 rounded"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="px-2 py-1 text-xs text-foreground-subtle">
                  +{project.tech.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Expand/Collapse */}
          <Button
            variant="ghost"
            size="icon"
            className="text-neon-primary hover:bg-neon-primary/10"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-t border-neon-primary/20">
              {/* Tab Navigation */}
              <div className="flex border-b border-foreground-subtle/20">
                {(['overview', 'architecture', 'decisions', 'impact'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={(e) => { e.stopPropagation(); setActiveTab(tab); }}
                    className={`
                      flex-1 px-4 py-3 text-sm font-orbitron capitalize transition-colors
                      ${activeTab === tab 
                        ? 'text-neon-primary border-b-2 border-neon-primary bg-neon-primary/5' 
                        : 'text-foreground-muted hover:text-foreground hover:bg-foreground/5'
                      }
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <p className="text-foreground-muted leading-relaxed">
                      {project.overview}
                    </p>
                    
                    {/* Problem Section */}
                    <div className="p-4 bg-background/50 rounded-lg border border-neon-warning/30">
                      <h4 className="flex items-center gap-2 text-sm font-orbitron text-neon-warning mb-3">
                        <AlertTriangle className="w-4 h-4" />
                        The Problem
                      </h4>
                      <p className="text-foreground font-medium mb-2">
                        {project.problem.statement}
                      </p>
                      <p className="text-sm text-foreground-muted mb-2">
                        <span className="text-foreground-subtle">Context:</span> {project.problem.context}
                      </p>
                      <p className="text-sm text-foreground-muted">
                        <span className="text-foreground-subtle">User Pain:</span> {project.problem.userPain}
                      </p>
                    </div>
                    
                    {/* Constraints */}
                    <div>
                      <h4 className="text-sm font-orbitron text-foreground-muted mb-3">
                        Constraints
                      </h4>
                      <ul className="space-y-2">
                        {project.constraints.map((constraint, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
                            <span className="text-neon-accent mt-1">→</span>
                            {constraint}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'architecture' && (
                  <div className="space-y-6">
                    <div className="flex items-start gap-2">
                      <Layers className="w-5 h-5 text-neon-primary mt-1" />
                      <div>
                        <h4 className="font-orbitron text-foreground mb-2">System Architecture</h4>
                        <p className="text-sm text-foreground-muted">
                          {project.architecture.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Architecture Components */}
                    <div className="grid gap-3">
                      {project.architecture.components.map((comp, i) => (
                        <div 
                          key={i}
                          className="p-3 bg-background/50 rounded-lg border border-foreground-subtle/20"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-orbitron text-sm text-foreground">
                              {comp.name}
                            </span>
                            <span className="text-xs text-neon-primary bg-neon-primary/10 px-2 py-0.5 rounded">
                              {comp.tech}
                            </span>
                          </div>
                          <p className="text-xs text-foreground-muted">
                            {comp.purpose}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'decisions' && (
                  <div className="space-y-6">
                    {/* Key Decisions */}
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-orbitron text-foreground mb-4">
                        <Lightbulb className="w-4 h-4 text-neon-primary" />
                        Key Technical Decisions
                      </h4>
                      <div className="space-y-4">
                        {project.decisions.map((decision, i) => (
                          <div 
                            key={i}
                            className="p-4 bg-background/50 rounded-lg border border-neon-primary/20"
                          >
                            <p className="text-foreground font-medium mb-2">
                              {decision.decision}
                            </p>
                            <p className="text-sm text-foreground-muted mb-2">
                              <span className="text-neon-primary">Why:</span> {decision.reasoning}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              <span className="text-xs text-foreground-subtle">Alternatives considered:</span>
                              {decision.alternatives.map((alt, j) => (
                                <span key={j} className="text-xs text-foreground-muted">
                                  {alt}{j < decision.alternatives.length - 1 ? ',' : ''}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Trade-offs */}
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-orbitron text-foreground mb-4">
                        <Scale className="w-4 h-4 text-neon-accent" />
                        Trade-offs Made
                      </h4>
                      <div className="space-y-3">
                        {project.tradeoffs.map((tradeoff, i) => (
                          <div 
                            key={i}
                            className="p-3 bg-neon-accent/5 rounded-lg border border-neon-accent/20"
                          >
                            <p className="text-sm">
                              <span className="text-neon-primary">Chose:</span>{' '}
                              <span className="text-foreground">{tradeoff.chose}</span>{' '}
                              <span className="text-foreground-subtle">over</span>{' '}
                              <span className="text-foreground-muted">{tradeoff.over}</span>
                            </p>
                            <p className="text-xs text-foreground-muted mt-1">
                              {tradeoff.why}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'impact' && (
                  <div className="space-y-6">
                    {/* Impact Metrics */}
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-orbitron text-foreground mb-4">
                        <TrendingUp className="w-4 h-4 text-neon-warning" />
                        Impact & Results
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {project.impact.map((item, i) => (
                          <div 
                            key={i}
                            className="p-4 bg-background/50 rounded-lg border border-neon-warning/20 text-center"
                          >
                            <div className="text-2xl font-orbitron font-bold text-gradient mb-1">
                              {item.value}
                            </div>
                            <div className="text-sm text-foreground">{item.metric}</div>
                            {item.context && (
                              <div className="text-xs text-foreground-subtle mt-1">
                                {item.context}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Engineering Notes */}
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-orbitron text-foreground mb-4">
                        <Wrench className="w-4 h-4 text-neon-secondary" />
                        Engineering Notes
                      </h4>
                      <ul className="space-y-2">
                        {project.engineeringNotes.map((note, i) => (
                          <li 
                            key={i}
                            className="flex items-start gap-2 text-sm text-foreground-muted p-2 bg-neon-secondary/5 rounded border-l-2 border-neon-secondary/50"
                          >
                            <span className="text-neon-secondary">💡</span>
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-4 mt-6 pt-4 border-t border-foreground-subtle/20">
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-neon-primary/50 text-neon-primary hover:bg-neon-primary/10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                  )}
                  {project.live && (
                    <Button
                      size="sm"
                      className="bg-gradient-primary text-background hover:opacity-90"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
