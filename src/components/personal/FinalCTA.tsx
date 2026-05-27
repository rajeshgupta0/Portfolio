import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  CheckCircle,
  Clock,
  X,
  Send,
  CalendarDays,
  Phone,
  MessageCircle,
  Coffee
} from 'lucide-react';
import { AnimatedIcon } from '@/components/ui/animated-icon';

export const FinalCTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailClick = () => {
    window.location.href = 'mailto:rajeshgupta070799@gmail.com';
  };

  const handleGetInTouch = () => {
    window.location.href = 'mailto:rajeshgupta070799@gmail.com?subject=Hey! Let\'s build something amazing&body=Hi Byte Ranger,%0A%0AI came across your portfolio and really liked your work.%0A%0AI would love to connect and discuss...%0A%0ABest regards,%0A[Your Name]';
  };

  const handleScheduleCall = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create email content
    const subject = `Schedule Call Request from ${formData.name}`;
    const body = `Hi Byte Ranger,%0A%0A${formData.name} would like to schedule a call with you.%0A%0A📅 Preferred Date: ${formData.date}%0A⏰ Preferred Time: ${formData.time}%0A📧 Email: ${formData.email}%0A%0A💬 Message:%0A${formData.message || 'No additional message provided.'}%0A%0A---%0AThis request was sent from your portfolio website.`;
    
    // Open email client
    window.location.href = `mailto:rajeshgupta070799@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Show success message
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
    
    // Reset form and close modal after delay
    setTimeout(() => {
      setFormData({ name: '', email: '', date: '', time: '', message: '' });
      setShowScheduleModal(false);
      setIsSubmitting(false);
    }, 1500);
  };

  const contactOptions = [
    {
      icon: Mail,
      label: 'Email me',
      value: 'rajeshgupta070799@gmail.com',
      action: handleEmailClick,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      hover: 'hover:border-cyan-500/60 hover:bg-cyan-500/5'
    },
    {
      icon: Linkedin,
      label: 'Connect on LinkedIn',
      value: 'linkedin.com/in/',
      action: () => window.open('https://linkedin.com/in/', '_blank'),
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      hover: 'hover:border-blue-500/60 hover:bg-blue-500/5'
    },
    {
      icon: Github,
      label: 'Check my code',
      value: 'github.com/',
      action: () => window.open('https://github.com/', '_blank'),
      color: 'text-gray-400',
      bg: 'bg-gray-500/10',
      border: 'border-gray-500/30',
      hover: 'hover:border-gray-500/60 hover:bg-gray-500/5'
    },
  ];

  const availableDates = [
    'Monday, Jan 20', 'Tuesday, Jan 21', 'Wednesday, Jan 22', 
    'Thursday, Jan 23', 'Friday, Jan 24', 'Monday, Jan 27',
    'Tuesday, Jan 28', 'Wednesday, Jan 29', 'Thursday, Jan 30', 'Friday, Jan 31'
  ];
  
  const availableTimes = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', 
    '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  return (
    <section id="contact" className="py-24 md:py-32 px-4 md:px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1), transparent)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 30, 0], y: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.1), transparent)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4], x: [0, -40, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Subtle particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-cyan-400/20"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -25, 0], opacity: [0, 0.3, 0] }}
            transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-4xl relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          {/* Availability status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs text-emerald-400 font-medium">
              Open for work & collaborations
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-4"
          >
            <span className="text-white">Let's Build</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
              Something Amazing
            </span>
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "5rem" } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mx-auto rounded-full mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="text-gray-400 max-w-2xl mx-auto mb-8"
          >
                Hey there! 👋 I'm always excited to connect with people who share the same passion for building cool stuff. 
            Whether you have a project in mind, just want to chat about tech, or grab a virtual coffee — I'd love to hear from you.
          </motion.p>

          {/* Primary CTA - Get In Touch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 }}
            className="mb-12"
          >
            <button
              onClick={handleGetInTouch}
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-orbitron font-semibold text-base shadow-lg shadow-purple-500/25 transition-all duration-300 inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Send me a message
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" />
              I usually reply within a few hours
            </p>
          </motion.div>

          {/* Contact options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1 }}
            className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10"
          >
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.button
                  key={option.label}
                  onClick={option.action}
                  className={`group p-4 rounded-xl backdrop-blur-sm bg-gray-900/40 border ${option.border} ${option.hover} transition-all duration-300 text-left cursor-pointer`}
                  whileHover={{ y: -3 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.1 + index * 0.1 }}
                >
                  <div className={`inline-flex p-2 rounded-lg ${option.bg} mb-3`}>
                    <Icon className={`w-4 h-4 ${option.color}`} />
                  </div>
                  <p className="text-xs text-gray-500 mb-0.5">{option.label}</p>
                  <p className="text-xs text-gray-400 font-mono truncate group-hover:text-cyan-400 transition-colors">
                    {option.value}
                  </p>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Schedule call option */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.3 }}
            className="pt-6 border-t border-white/10"
          >
            <p className="text-sm text-gray-500 mb-3 flex items-center justify-center gap-2">
              <Coffee className="w-4 h-4" />
              Prefer a live conversation?
            </p>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50 text-gray-300 hover:text-cyan-400 text-sm transition-all duration-300"
            >
              <Calendar className="w-4 h-4" />
              Schedule a 30-min chat
              <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-500/90 to-teal-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2"
        >
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm">Email client opened! Just hit send 📧</span>
        </motion.div>
      )}

      {/* Schedule Call Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowScheduleModal(false)}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative max-w-md w-full bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10">
                  <CalendarDays className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-orbitron font-semibold text-white">Schedule a chat</h3>
              </div>
              <button onClick={() => setShowScheduleModal(false)} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleScheduleCall} className="p-5 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Your name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white text-sm focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="e.g., John Doe"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Your email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white text-sm focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Pick a date *</label>
                <select
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white text-sm focus:border-cyan-500 focus:outline-none"
                >
                  <option value="">Select a date</option>
                  {availableDates.map(date => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Pick a time *</label>
                <select
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white text-sm focus:border-cyan-500 focus:outline-none"
                >
                  <option value="">Select a time</option>
                  {availableTimes.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">What would you like to discuss? (optional)</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white text-sm focus:border-cyan-500 focus:outline-none resize-none"
                  placeholder="e.g., I have a project idea about..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium text-sm hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Opening email...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Send request
                  </span>
                )}
              </button>

              <p className="text-center text-xs text-gray-500">
                This will open your email client with a pre-filled message
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};