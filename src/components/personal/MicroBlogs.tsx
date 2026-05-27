import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Newspaper, 
  Clock, 
  ArrowRight, 
  Bookmark, 
  Sparkles,
  TrendingUp,
  Lightbulb,
  Code2,
  Brain,
  Zap,
  Star,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ExternalLink,
  Share2
} from 'lucide-react';

interface MicroBlog {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  featured?: boolean;
  likes?: number;
  tags?: string[];
  externalUrl?: string;
}

const microBlogs: MicroBlog[] = [
  {
    id: '1',
    title: 'Why I Stopped Chasing "Best Practices"',
    excerpt: 'After years of dogmatic adherence to rules, I learned that context matters more than conventions. Here\'s how I think about trade-offs now.',
    category: 'Engineering Philosophy',
    readTime: '4 min',
    date: '2024-01',
    featured: true,
    likes: 42,
    tags: ['Philosophy', 'Best Practices', 'Growth'],
    externalUrl: 'https://rajeshrmgupta.hashnode.dev/why-i-stopped-chasing-best-practices',
  },
  {
    id: '2',
    title: 'The Art of Debugging: A Mental Framework',
    excerpt: 'My systematic approach to squashing bugs efficiently. Spoiler: it involves more thinking and less random changes.',
    category: 'Problem Solving',
    readTime: '5 min',
    date: '2024-02',
    likes: 38,
    tags: ['Debugging', 'Mental Models', 'Efficiency'],
  },
  {
    id: '3',
    title: 'Building with AI: Lessons from the Trenches',
    excerpt: 'Integrating AI into production apps taught me to think differently about architecture, error handling, and user expectations.',
    category: 'AI Development',
    readTime: '6 min',
    date: '2024-03',
    featured: true,
    likes: 56,
    tags: ['AI', 'Architecture', 'Production'],
  },
  {
    id: '4',
    title: 'System Design: From Monolith to Microservices',
    excerpt: 'A practical guide to understanding when and how to break down your monolith into scalable microservices.',
    category: 'System Design',
    readTime: '8 min',
    date: '2024-04',
    likes: 31,
    tags: ['System Design', 'Architecture', 'Scalability'],
  },
  {
    id: '5',
    title: 'The Psychology of Clean Code',
    excerpt: 'Why writing clean code is more about empathy and teamwork than just following style guides.',
    category: 'Software Craftsmanship',
    readTime: '5 min',
    date: '2024-05',
    featured: true,
    likes: 47,
    tags: ['Clean Code', 'Teamwork', 'Best Practices'],
  },
  {
    id: '6',
    title: 'Mastering React Performance',
    excerpt: 'Deep dive into React optimization techniques that actually matter in production applications.',
    category: 'Frontend',
    readTime: '7 min',
    date: '2024-06',
    likes: 53,
    tags: ['React', 'Performance', 'Optimization'],
  },
];

const categories = ['All', 'Engineering Philosophy', 'Problem Solving', 'AI Development', 'System Design', 'Software Craftsmanship', 'Frontend'];

export const MicroBlogs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [showOptionsFor, setShowOptionsFor] = useState<string | null>(null);

  const filteredBlogs = activeCategory === 'All' 
    ? microBlogs 
    : microBlogs.filter(blog => blog.category === activeCategory);
  
  const displayedBlogs = filteredBlogs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredBlogs.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, filteredBlogs.length));
  };

  return (
    <section className="py-24 md:py-28 px-4 md:px-6 relative overflow-hidden" id="blogs">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12), transparent)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.12), transparent)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-400/30"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0, 0.4, 0], scale: [0, 1.2, 0] }}
            transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10" ref={containerRef}>
        {/* Section header - Without badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-3xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-4"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Thoughts & Learnings
            </span>
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "5rem" } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto rounded-full"
          />
          
          <motion.p 
            className="text-base md:text-lg text-gray-400 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Exploring engineering philosophy, problem-solving strategies, and technical insights
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category, idx) => (
            <motion.button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setVisibleCount(6);
                setShowOptionsFor(null);
              }}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white border border-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Blog grid - Exactly 6 cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedBlogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
              whileHover={{ y: -8 }}
              className={`group relative rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:shadow-2xl ${
                blog.featured 
                  ? 'bg-gradient-to-br from-gray-900/95 to-gray-950/95 border-2 border-amber-500/30 hover:border-amber-500/50' 
                  : 'bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-white/10 hover:border-white/20'
              }`}
            >
              {/* Featured badge */}
              {blog.featured && (
                <motion.div 
                  className="absolute top-4 right-4 z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 text-[10px] font-medium border border-amber-500/30">
                    <Star className="w-3 h-3" />
                    Featured
                  </span>
                </motion.div>
              )}

              {/* More Options Button */}
              <div className="absolute top-4 left-4 z-10">
                <div className="relative">
                  <motion.button
                    onClick={() => setShowOptionsFor(showOptionsFor === blog.id ? null : blog.id)}
                    className="p-1.5 rounded-full bg-black/50 backdrop-blur-sm hover:bg-white/10 transition-colors border border-white/10"
                    whileTap={{ scale: 0.95 }}
                  >
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </motion.button>
                  
                  {showOptionsFor === blog.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute left-0 mt-2 w-48 bg-gray-900 border border-white/10 rounded-lg shadow-xl z-20 overflow-hidden"
                    >
                      {blog.externalUrl && (
                        <a
                          href={blog.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors w-full"
                          onClick={() => setShowOptionsFor(null)}
                        >
                          <ExternalLink className="w-4 h-4 text-cyan-400" />
                          Read on Hashnode
                        </a>
                      )}
                      <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors w-full">
                        <Bookmark className="w-4 h-4 text-purple-400" />
                        Save for later
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors w-full">
                        <Share2 className="w-4 h-4 text-pink-400" />
                        Share article
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="p-6">
                {/* Category & read time */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 flex-wrap">
                  <span className="text-cyan-400 font-medium">{blog.category}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {blog.readTime}
                  </span>
                  {blog.likes && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-400" />
                        {blog.likes} likes
                      </span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-orbitron font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-4">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                {blog.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-gray-800/50 text-gray-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Read more button - Changed to work with external URL if available */}
                <motion.button
                  onClick={() => {
                    if (blog.externalUrl) {
                      window.open(blog.externalUrl, '_blank');
                    }
                  }}
                  className="flex items-center gap-2 text-sm text-cyan-400 font-medium group/btn"
                  whileHover={{ x: 5 }}
                >
                  {blog.externalUrl ? 'Read full article' : 'Read more'}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 100%, ${blog.featured ? 'rgba(245,158,11,0.15)' : 'rgba(6,182,212,0.1)'} 0%, transparent 60%)`,
                }}
              />
            </motion.article>
          ))}
        </div>

        {/* Load More Button - Only if more cards available */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={loadMore}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 font-mono text-sm hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Articles
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};