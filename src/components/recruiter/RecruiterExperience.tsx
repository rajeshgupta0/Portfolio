import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Building2, Calendar, Award, Star, Users, Code2 } from 'lucide-react';

const experiences = [
  {
    type: 'work',
    title: 'Student Coordinator – Training & Placement Cell',
    company: 'Training & Placement Cell',
    period: '2025 - Present',
    description: 'Coordinated placement activities, managed communication with recruiters, and facilitated student placement processes. Successfully organized placement drives and pre-placement talks.',
    highlights: ['Placement Coordination', 'Recruiter Communication', 'Event Management', 'Student Support'],
  },
  {
    type: 'work',
    title: 'Student Coordinator – Core Technical Team',
    company: 'Rhythm 2026 (College Technical Fest)',
    period: '2025 - Present',
    description: 'Designed and managed official fest website, handled technical operations, and ensured smooth execution of digital systems during large-scale college events.',
    highlights: ['React', 'Tailwind CSS', 'Supabase', 'Event Management'],
  },
];

const education = [
  {
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'Bharat Ratna Babasaheb Bhimrao Ambedkar Rajkiya Engineering College',
    period: '2023 - 2027',
    cgpa: '7.0/10.0',
    highlights: ['Data Structures & Algorithms', 'Full-Stack Development', 'DBMS', 'Operating Systems'],
  },
];

export const RecruiterExperience = () => {
  return (
    <section className="py-16 px-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Experience Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Experience</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Professional background</p>
              </div>
            </motion.div>
            
            <div className="space-y-5">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">
                      <Calendar className="w-3 h-3" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-[11px] text-blue-600 dark:text-blue-400 flex items-center gap-1"
                      >
                        <Star className="w-2.5 h-2.5" />
                        {h}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Education Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Education</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Academic background</p>
              </div>
            </motion.div>
            
            <div className="space-y-5">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{edu.institution}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">{edu.cgpa}</div>
                      <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{edu.period}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {edu.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2 py-1 rounded-md bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-[11px] text-purple-600 dark:text-purple-400 flex items-center gap-1"
                      >
                        <Code2 className="w-2.5 h-2.5" />
                        {h}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-center bg-white dark:bg-gray-900"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Certifications</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                AI Learning Path (Infosys Springboard) • Full-Stack Development
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};