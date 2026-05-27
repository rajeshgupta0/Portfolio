import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send, MapPin, Linkedin, Github, Twitter } from 'lucide-react';
import { MorphButton } from '@/components/ui/morph-button';
import { GlowButton } from '@/components/ui/glow-button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { AnimatedIcon } from '@/components/ui/animated-icon';

// Validation schema with security constraints
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s\-']+$/, { message: "Name contains invalid characters" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission - replace with actual API call when backend is implemented
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Message sent successfully!", {
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      form.reset();
    } catch {
      toast.error("Failed to send message", {
        description: "Please try again later or contact me directly via email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#', color: 'hover:text-neon-primary' },
    { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'hover:text-neon-secondary' },
    { icon: Twitter, label: 'Twitter', href: '#', color: 'hover:text-neon-accent' },
    { icon: Mail, label: 'Email', href: 'mailto:contact@byteranger.dev', color: 'hover:text-neon-warning' },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-gradient mb-6">
            Initialize Contact
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8" />
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            Ready to collaborate? Send a transmission through the digital void
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="glass-morphism border-neon-primary/30 p-8 glow-neon">
              <CardContent className="p-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-orbitron text-foreground-muted">
                              Identity
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                maxLength={100}
                                className="bg-background-secondary/50 border-neon-primary/30 focus:border-neon-primary text-foreground placeholder:text-foreground-subtle"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-orbitron text-foreground-muted">
                              Communication Link
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your.email@domain.com"
                                maxLength={255}
                                className="bg-background-secondary/50 border-neon-primary/30 focus:border-neon-primary text-foreground placeholder:text-foreground-subtle"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-orbitron text-foreground-muted">
                            Transmission Content
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Encode your message here..."
                              rows={6}
                              maxLength={1000}
                              className="bg-background-secondary/50 border-neon-primary/30 focus:border-neon-primary text-foreground placeholder:text-foreground-subtle resize-none"
                              {...field}
                            />
                          </FormControl>
                          <div className="flex justify-between items-center">
                            <FormMessage className="text-xs text-red-400" />
                            <span className="text-xs text-foreground-subtle">
                              {field.value.length}/1000
                            </span>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <MorphButton
                      type="submit"
                      state={isSubmitting ? 'loading' : 'idle'}
                      className="w-full font-orbitron font-bold"
                      loadingText="Transmitting..."
                      successText="Sent!"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Transmit Message
                    </MorphButton>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Location Card */}
            <Card className="glass-morphism border-neon-accent/30 p-6 group hover:glow-neon transition-all duration-300">
              <CardContent className="p-0 flex items-center space-x-4">
                <div className="p-3 bg-neon-accent/10 rounded-full border border-neon-accent/30">
                  <MapPin className="w-6 h-6 text-neon-accent" />
                </div>
                <div>
                  <h3 className="font-orbitron font-semibold text-foreground mb-1">
                    Location Node
                  </h3>
                  <p className="text-foreground-muted">
                    University Campus, Tech District
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="glass-morphism border-neon-secondary/30 p-6">
              <CardContent className="p-0">
                <h3 className="font-orbitron font-semibold text-foreground mb-6 text-center">
                  Connect Across the Grid
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center space-x-3 p-3 bg-background-secondary/30 rounded-lg border border-foreground-subtle/20 ${social.color} transition-all duration-300 group`}
                    >
                      <AnimatedIcon icon={social.icon} size={20} delay={index * 0.3} />
                      <span className="font-inter text-sm">{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Status Card */}
            <Card className="glass-morphism border-neon-warning/30 p-6">
              <CardContent className="p-0 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-3 h-3 bg-neon-warning rounded-full animate-glow-pulse mr-3" />
                  <span className="font-orbitron font-semibold text-neon-warning">
                    STATUS: ONLINE
                  </span>
                </div>
                <p className="text-foreground-muted text-sm">
                  Currently available for new projects and collaborations
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="cyber-grid opacity-5" />
          <div className="particle-field opacity-20" />
        </div>
      </div>
    </section>
  );
};
