import { motion } from 'framer-motion';
import { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { ExternalLink, Github, Zap, Sparkles, Star, TrendingUp } from 'lucide-react';
import { TouchButton } from '@/components/ui/touch-button';
import { PressedButton } from '@/components/ui/pressed-button';
import { TiltCard } from '@/components/ui/tilt-card';

export const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [hoveredGridProject, setHoveredGridProject] = useState<number | null>(null);

  const projects = [
    {
      title: 'HoloCommerce Platform',
      description: 'A futuristic e-commerce platform with 3D product visualization and AR try-on features.',
      tech: ['React', 'Three.js', 'Node.js', 'PostgreSQL', 'Stripe'],
      image: '/placeholder.svg',
      github: '#',
      live: '#',
      featured: true,
    },
    {
      title: 'Neural Task Manager',
      description: 'AI-powered task management with smart prioritization and productivity insights.',
      tech: ['Next.js', 'OpenAI API', 'Supabase', 'TailwindCSS'],
      image: '/placeholder.svg',
      github: '#',
      live: '#',
      featured: true,
    },
    {
      title: 'Quantum Chat App',
      description: 'Real-time messaging app with end-to-end encryption and holographic themes.',
      tech: ['React Native', 'Socket.io', 'Express', 'MongoDB'],
      image: '/placeholder.svg',
      github: '#',
      live: '#',
      featured: false,
    },
    {
      title: 'CyberPortfolio Template',
      description: 'Open-source portfolio template with modern animations and responsive design.',
      tech: ['React', 'Framer Motion', 'Tailwind', 'TypeScript'],
      image: '/placeholder.svg',
      github: '#',
      live: '#',
      featured: false,
    },
    {
      title: 'DataViz Dashboard',
      description: 'Interactive data visualization dashboard with real-time analytics.',
      tech: ['Vue.js', 'D3.js', 'Python', 'FastAPI', 'Redis'],
      image: '/placeholder.svg',
      github: '#',
      live: '#',
      featured: false,
    },
    {
      title: 'Blockchain Explorer',
      description: 'Web3 application for exploring blockchain transactions with beautiful UI.',
      tech: ['React', 'Web3.js', 'Ethers.js', 'Chart.js'],
      image: '/placeholder.svg',
      github: '#',
      live: '#',
      featured: false,
    },
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section className="py-20 md:py-24 relative overflow-hidden" id="projects">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12), transparent)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.12), transparent)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
            x: [0, 40, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-purple-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
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
              Project Archive
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
            Explore my digital creations - each project a unique blend of innovation and code
          </motion.p>
        </motion.div>

        {/* Featured Projects Section */}
        {featuredProjects.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-500" />
                <h3 className="text-2xl font-orbitron font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Featured Projects
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-yellow-500/50 to-transparent" />
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-20">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <TiltCard className="h-full group" tiltStrength={12} floatAmplitude={10}>
                    <div className="h-full bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-500/50 transition-all duration-500">
                      {/* Image Container */}
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-56 object-cover"
                          animate={{
                            scale: hoveredProject === index ? 1.05 : 1,
                          }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
                        
                        {/* Holographic Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20"
                          animate={{
                            opacity: hoveredProject === index ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Featured Badge */}
                        <motion.div
                          className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center gap-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Sparkles className="w-3 h-3 text-white" />
                          <span className="text-xs font-semibold text-white">Featured</span>
                        </motion.div>
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl md:text-2xl font-orbitron font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            {project.title}
                          </h3>
                          <motion.div
                            animate={{
                              rotate: hoveredProject === index ? 360 : 0,
                              scale: hoveredProject === index ? 1.2 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <Zap className="w-5 h-5 text-yellow-500" />
                          </motion.div>
                        </div>
                        
                        <p className="text-gray-400 mb-5 leading-relaxed">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((tech, i) => (
                            <motion.span
                              key={tech}
                              className="px-3 py-1 text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full font-mono"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                              whileHover={{ scale: 1.05, backgroundColor: "rgba(6,182,212,0.2)" }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                        
                        <div className="flex gap-4">
                          <TouchButton
                            variant="outline"
                            size="sm"
                            className="flex-1 border-cyan-500/50 hover:border-cyan-500 hover:bg-cyan-500/10"
                            enableParticles={true}
                            enableRipple={true}
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </TouchButton>
                          <PressedButton
                            variant="primary"
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </PressedButton>
                        </div>
                      </CardContent>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Other Projects Section */}
        {otherProjects.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-purple-500" />
                <h3 className="text-2xl font-orbitron font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  More Projects
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  onMouseEnter={() => setHoveredGridProject(index)}
                  onMouseLeave={() => setHoveredGridProject(null)}
                >
                  <TiltCard className="h-full group" tiltStrength={8} floatAmplitude={6} parallaxStrength={12}>
                    <div className="h-full bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-40 object-cover"
                          animate={{
                            scale: hoveredGridProject === index ? 1.08 : 1,
                          }}
                          transition={{ duration: 0.4 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
                      </div>
                      
                      <CardContent className="p-4">
                        <h4 className="font-orbitron font-semibold text-white mb-2 text-sm line-clamp-1">
                          {project.title}
                        </h4>
                        
                        <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {project.tech.slice(0, 2).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-xs bg-purple-500/10 text-purple-400 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 2 && (
                            <span className="px-2 py-0.5 text-xs text-gray-500">
                              +{project.tech.length - 2}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <TouchButton 
                            variant="ghost" 
                            size="sm" 
                            className="flex-1 p-2 h-8 text-gray-400 hover:text-white hover:bg-cyan-500/10"
                            enableParticles={false}
                          >
                            <Github className="w-3 h-3" />
                          </TouchButton>
                          <TouchButton 
                            variant="ghost" 
                            size="sm" 
                            className="flex-1 p-2 h-8 text-gray-400 hover:text-white hover:bg-purple-500/10"
                            enableParticles={false}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </TouchButton>
                        </div>
                      </CardContent>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </>
        )}

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