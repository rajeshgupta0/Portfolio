import { motion } from 'framer-motion';
import { Code2, Database, Cloud, Wrench, Zap, Palette, FileText, Presentation } from 'lucide-react';

const techCategories = [
  {
    title: 'Frontend',
    icon: Code2,
    colorClass: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    icon: Database,
    colorClass: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL'],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    colorClass: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
    skills: ['AWS', 'Docker', 'Vercel', 'CI/CD', 'Supabase'],
  },
  {
    title: 'Design & Documentation',
    icon: Palette,
    colorClass: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
    skills: ['Canva', 'Figma', 'Word', 'Excel', 'PowerPoint'],
  },
  {
    title: 'Development Tools',
    icon: Wrench,
    colorClass: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
    skills: ['Git', 'VS Code', 'Jest', 'Postman', 'REST APIs'],
  },
];

export const TechStackSnapshot = () => {
  return (
    <section className="py-16 px-6 border-y border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tech Stack</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Core competencies & tools</p>
          </div>
        </motion.div>
        
        {/* Grid - 5 columns on desktop, 2 on mobile */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {techCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${category.colorClass}`}>
                  <category.icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 rounded-md bg-gray-50 dark:bg-gray-800 text-[11px] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};