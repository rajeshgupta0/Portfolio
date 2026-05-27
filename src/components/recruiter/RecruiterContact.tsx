import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github, MessageCircle, Send, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { AnimatedIcon } from '@/components/ui/animated-icon';

export const RecruiterContact = () => {
  const [copied, setCopied] = useState(false);
  const email = 'rajeshgupta070799@gmail.com';
  
  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = () => {
    // Method 1: Using mailto
    window.location.href = `mailto:${email}?subject=Opportunity%20for%20Rajesh%20Gupta&body=Hello%20Rajesh,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity...%0A%0ABest%20regards,`;
  };

  const contactMethods = [
    {
      label: 'Email',
      value: email,
      icon: Mail,
      colorClass: 'text-blue-500 bg-blue-500/10',
      href: `mailto:${email}`,
      primary: true,
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/rajesh-gupta-9134862b0',
      icon: Linkedin,
      colorClass: 'text-blue-400 bg-blue-400/10',
      href: 'https://linkedin.com/in/rajesh-gupta-9134862b0',
    },
    {
      label: 'GitHub',
      value: '@byteranger',
      icon: Github,
      colorClass: 'text-gray-400 bg-gray-400/10',
      href: 'https://github.com/byteranger',
    },
  ];

  return (
    <section id="recruiter-contact" className="py-20 px-6 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Open to opportunities
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Let's Connect
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Interested in working together? I'd love to hear about your project or opportunity.
          </p>
        </motion.div>
        
        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-8 border border-gray-100 dark:border-gray-800"
        >
          <div className="grid gap-4">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.label !== 'Email' ? '_blank' : undefined}
                rel={method.label !== 'Email' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className={`
                  flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                  ${method.primary 
                    ? 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-950/50' 
                    : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }
                `}
              >
                <div className={`w-10 h-10 rounded-lg ${method.colorClass} flex items-center justify-center`}>
                  <method.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">
                    {method.label}
                  </div>
                  <div className="text-gray-900 dark:text-white font-medium truncate">
                    {method.value}
                  </div>
                </div>
                {method.primary && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      copyEmail();
                    }}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                  </button>
                )}
              </motion.a>
            ))}
          </div>
        </motion.div>
        
        {/* Send Message Button - Fixed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <Button
            onClick={handleSendMessage}
            size="lg"
            className="inline-flex items-center gap-2 px-8 py-6 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold text-base hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
          >
            <Send className="w-5 h-5" />
            Send Message
          </Button>
        </motion.div>
        
        {/* Availability note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MessageCircle className="w-4 h-4 text-green-500" />
            <span>
              Currently available for{' '}
              <span className="text-gray-900 dark:text-white font-medium">full-time</span>,{' '}
              <span className="text-gray-900 dark:text-white font-medium">contract</span>, or{' '}
              <span className="text-gray-900 dark:text-white font-medium">freelance</span> opportunities
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};