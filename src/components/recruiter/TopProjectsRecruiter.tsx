import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, ArrowRight, Star, TrendingUp, Sparkles } from 'lucide-react';

const topProjects = [
  {
    id: 1,
    title: 'College Event Portal',
    tagline: 'Real-time event management with AI-powered emergency alerts',
    description: 'Built a full-stack event management platform for college fests with real-time chat, feedback system, and intelligent emergency alert detection using OpenAI API.',
    metrics: [
      { label: 'User Engagement', value: '+150%' },
      { label: 'Response Time', value: 'Instant' },
    ],
    tech: ['React', 'Tailwind CSS', 'Supabase', 'OpenAI API', 'PostgreSQL'],
    impact: 'Increased student engagement and improved emergency response time dramatically',
    links: { demo: '#', github: '#' },
  },
  {
    id: 2,
    title: 'EdTech Learning Platform',
    tagline: 'Full-stack platform for course management & analytics',
    description: 'Developed a complete EdTech platform enabling users to browse courses, enroll, and track progress with powerful admin dashboard for course management.',
    metrics: [
      { label: 'Students', value: '500+' },
      { label: 'Courses', value: '50+' },
    ],
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    impact: 'Successfully managed 500+ students and 50+ courses with seamless enrollment',
    links: { demo: '#', github: '#' },
  },
  {
    id: 3,
    title: 'CyberPortfolio Template',
    tagline: 'Modern portfolio with stunning animations',
    description: 'Created an open-source portfolio template with modern animations, responsive design, and 3D elements using Three.js and Framer Motion.',
    metrics: [
      { label: 'Downloads', value: '1K+' },
      { label: 'Stars', value: '85+' },
    ],
    tech: ['React', 'Framer Motion', 'Three.js', 'TypeScript', 'Tailwind CSS'],
    impact: 'Gained 85+ GitHub stars and 1K+ downloads from the developer community',
    links: { demo: '#', github: '#' },
  },
];

export const TopProjectsRecruiter = () => {
  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Top Projects</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Featured work with real impact</p>
            </div>
          </div>
        </motion.div>
        
        {/* Projects */}
        <div className="space-y-5">
          {topProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{project.tagline}</p>
                    </div>
                    {/* Links */}
                    <div className="flex gap-2 flex-shrink-0">
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                          aria-label="Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                          aria-label="GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-[10px] text-blue-600 dark:text-blue-400 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Impact */}
                  <div className="flex items-center gap-2 text-xs">
                    <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-green-600 dark:text-green-400 font-medium">Impact:</span>
                    <span className="text-gray-500 dark:text-gray-400">{project.impact}</span>
                  </div>
                </div>
                
                {/* Metrics sidebar */}
                <div className="flex lg:flex-col gap-4 lg:gap-3 lg:w-28 flex-shrink-0">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="text-center lg:text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {metric.value}
                      </div>
                      <div className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Button
            variant="ghost"
            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm group"
          >
            View all projects
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};