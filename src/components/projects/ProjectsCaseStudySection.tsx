import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCaseStudyCard } from './ProjectCaseStudyCard';
import { projectCaseStudies } from '@/data/projectCaseStudies';

export const ProjectsCaseStudySection = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const featuredProjects = projectCaseStudies.filter(p => p.featured);
  const otherProjects = projectCaseStudies.filter(p => !p.featured);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-gradient mb-6">
            Project Archive
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8" />
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            Deep dives into my most impactful work — problems solved, decisions made, lessons learned
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-lg font-orbitron text-neon-primary mb-6 flex items-center gap-2"
          >
            <span className="w-8 h-px bg-neon-primary" />
            Featured Case Studies
          </motion.h3>
          
          <div className="space-y-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCaseStudyCard
                  project={project}
                  isExpanded={expandedProject === project.id}
                  onToggle={() => setExpandedProject(
                    expandedProject === project.id ? null : project.id
                  )}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-lg font-orbitron text-foreground-muted mb-6 flex items-center gap-2"
            >
              <span className="w-8 h-px bg-foreground-subtle" />
              More Projects
            </motion.h3>
            
            <div className="space-y-4">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCaseStudyCard
                    project={project}
                    isExpanded={expandedProject === project.id}
                    onToggle={() => setExpandedProject(
                      expandedProject === project.id ? null : project.id
                    )}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="particle-field opacity-10" />
        </div>
      </div>
    </section>
  );
};
