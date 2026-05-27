import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Mail, Github, Linkedin, MapPin, ExternalLink, CheckCircle2, FileText, Sparkles, Briefcase, GraduationCap, Code2 } from 'lucide-react';
import coderAvatar from '@/assets/favicon.jpg';
import { useState } from 'react';

export const RecruiterHero = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const scrollToContact = () => {
    document.getElementById('recruiter-contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    setIsDownloading(true);
    
    setTimeout(() => {
      const resumeUrl = '/Rajesh gupta.pdf';
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'Rajesh_Gupta_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsDownloading(false);
      
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm';
      toast.textContent = '✓ Resume downloaded';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }, 500);
  };

  const stats = [
    { label: 'Experience', value: '2+ Years' },
    { label: 'Projects', value: '15+' },
    { label: 'Availability', value: 'Immediate' },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-16 px-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-5xl mx-auto w-full">
        {/* Main Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
          <div className="p-8 md:p-10">
            
            {/* Top Section - Name & Title */}
            <div className="text-center mb-8">
              <div className="inline-block mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-100 dark:ring-blue-900/50 shadow-md mx-auto">
                  <img
                    src={coderAvatar}
                    alt="Rajesh Gupta"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Rajesh Gupta
              </h1>
              
              <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-3">
                Full-Stack Developer
              </p>
              
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
                Computer Science Student passionate about building scalable web applications
              </p>
            </div>

            {/* Stats Row - Quick Info for Recruiters */}
            <div className="grid grid-cols-3 gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Left Column - Key Info */}
              <div>
                <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                  About Me
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
                  I'm a full-stack developer who loves creating fast, user-friendly applications. 
                  I focus on writing clean code and building things that actually help people.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <GraduationCap className="w-4 h-4 text-blue-500" />
                    <span>B.Tech Computer Science</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Briefcase className="w-4 h-4 text-blue-500" />
                    <span>Available for full-time opportunities</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>Basti, Uttar Pradesh</span>
                  </div>
                </div>

                {/* Quick Highlights */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    What I bring to the table:
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                      <span>2+ years hands-on development experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                      <span>15+ production-ready projects</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                      <span>MERN stack • TypeScript • Tailwind</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                      <span>Problem solver & quick learner</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact & Social */}
              <div>
                <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                  Connect With Me
                </h2>

                {/* Contact Buttons */}
                <div className="space-y-3 mb-6">
                  <Button
                    onClick={scrollToContact}
                    className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 py-5 rounded-xl text-base font-medium transition-all"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Me
                  </Button>
                  
                  <Button
                    onClick={handleDownloadResume}
                    disabled={isDownloading}
                    variant="outline"
                    className="w-full border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 py-5 rounded-xl text-base font-medium transition-all"
                  >
                    {isDownloading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
                        Preparing...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download Resume (PDF)
                      </>
                    )}
                  </Button>
                </div>

                {/* Social Links - Added LeetCode */}
                <div className="border-t border-gray-100 dark:border-gray-800 pt-5">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 text-center md:text-left">
                    Find me on:
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <a
                      href="https://github.com/rajeshgupta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-sm"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                    <a
                      href="https://linkedin.com/in/rajesh-gupta-9134862b0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all text-sm"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                    <a
                      href="https://leetcode.com/rajeshgupta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-950/30 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all text-sm"
                    >
                      <Code2 className="w-4 h-4" />
                      LeetCode
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:text-purple-600 dark:hover:text-purple-400 transition-all text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Portfolio
                    </a>
                  </div>
                </div>

                {/* Resume Note */}
                <div className="mt-5 text-center md:text-left">
                  <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center md:justify-start gap-2">
                    <FileText className="w-3 h-3" />
                    PDF format • Last updated: March 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note - REMOVED */}
      </div>
    </section>
  );
};