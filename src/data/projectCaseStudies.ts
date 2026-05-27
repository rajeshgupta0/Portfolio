export interface ProjectCaseStudy {
  id: string;
  title: string;
  tagline: string;
  thumbnail: string;
  featured: boolean;
  
  // Case study details
  overview: string;
  problem: {
    statement: string;
    context: string;
    userPain: string;
  };
  constraints: string[];
  
  architecture: {
    description: string;
    components: {
      name: string;
      tech: string;
      purpose: string;
    }[];
    diagram?: string;
  };
  
  decisions: {
    decision: string;
    reasoning: string;
    alternatives: string[];
  }[];
  
  tradeoffs: {
    chose: string;
    over: string;
    why: string;
  }[];
  
  impact: {
    metric: string;
    value: string;
    context?: string;
  }[];
  
  engineeringNotes: string[];
  
  tech: string[];
  github?: string;
  live?: string;
  
  timeline: string;
  role: string;
}

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    id: 'edtech-platform',
    title: 'EdTech Learning Platform',
    tagline: 'Full-stack platform for course management, enrollment, and analytics',
    thumbnail: '/placeholder.svg',
    featured: true,

    overview: 'A full-stack EdTech platform that enables users to browse courses, enroll, and manage their learning journey. It also includes a powerful admin dashboard for course management, user tracking, and analytics. The platform is designed to replicate real-world online learning systems with a complete end-to-end workflow.',

    problem: {
      statement: 'Lack of centralized and scalable platforms for managing online courses and student progress',
      context: 'Many basic learning systems lack proper enrollment tracking, admin control, and analytics, making it difficult to manage courses and monitor user activity effectively.',
      userPain: 'Students face disorganized learning experiences, while admins struggle to track enrollments, engagement, and course performance.',
    },

    constraints: [
      'Developed as a full-stack project within limited time',
      'Solo development with focus on learning MERN stack',
      'Scalable structure for future feature additions (currently under construction)',
    ],

    architecture: {
      description: 'MERN stack-based architecture with client-server communication via REST APIs',
      components: [
        { name: 'Frontend', tech: 'React.js', purpose: 'User interface and dynamic rendering' },
        { name: 'Backend', tech: 'Node.js + Express.js', purpose: 'API handling and business logic' },
        { name: 'Database', tech: 'MongoDB', purpose: 'Storing users, courses, and enrollment data' },
        { name: 'Authentication', tech: 'JWT / Session-based', purpose: 'Secure login and user sessions' },
      ],
    },

    decisions: [
      {
        decision: 'Used MERN stack (MongoDB, Express, React, Node.js)',
        reasoning: 'Provides a complete JavaScript-based ecosystem, making development faster and easier to manage end-to-end.',
        alternatives: ['Django (Python)', 'Spring Boot (Java)', 'PHP-based stacks'],
      },
      {
        decision: 'Designed separate admin panel',
        reasoning: 'Allows better control over platform data, course management, and analytics without affecting user-side performance.',
        alternatives: ['Single unified dashboard', 'Limited admin controls'],
      },
      {
        decision: 'REST API-based architecture',
        reasoning: 'Ensures modularity, scalability, and easier integration with future mobile apps or services.',
        alternatives: ['GraphQL', 'Monolithic rendering'],
      },
    ],

    tradeoffs: [
      {
        chose: 'MongoDB (NoSQL)',
        over: 'Relational databases',
        why: 'Flexible schema helps in rapid development, though joins and complex relations require extra handling',
      },
      {
        chose: 'Client-side rendering (React)',
        over: 'Server-side rendering',
        why: 'Provides smoother user experience and faster navigation after initial load',
      },
    ],

    impact: [
      { metric: 'Feature Coverage', value: 'Complete', context: 'Includes all core features of a real-world EdTech platform' },
      { metric: 'Scalability', value: 'High', context: 'Structured for adding features like video streaming, quizzes, etc.' },
      { metric: 'User Flow', value: 'End-to-End', context: 'From registration to course enrollment and tracking' },
    ],

    engineeringNotes: [
      'Structured backend using modular routes and controllers',
      'Implemented role-based logic for admin and users',
      'Designed separate views for enrollment and student status tracking',
      'Platform is under active development with planned feature expansions',
    ],

    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    github: '#',
    live: '#',
    timeline: 'In Progress',
    role: 'Full-Stack Developer (Solo)',
  },
  {
    id: 'college-event-portal',
    title: 'College Event Portal',
    tagline: 'Real-time event management platform with emergency alert intelligence',
    thumbnail: '/placeholder.svg',
    featured: true,

    overview: 'A full-stack event management platform designed for college fests, concerts, and technical events. It enables users to explore events, register, and interact in real-time through feedback and chat. The platform also includes an intelligent emergency alert system that analyzes user inputs and helps administrators respond quickly to critical situations.',

    problem: {
      statement: 'Lack of real-time communication and emergency handling systems in college events',
      context: 'Most event platforms only focus on registration and scheduling, ignoring live interaction, safety reporting, and feedback during the event.',
      userPain: 'Participants cannot report issues instantly, and organizers lack visibility into emergencies or crowd concerns, leading to delayed responses and poor event management.',
    },

    constraints: [
      'Real-time data handling required for chat and alerts',
      'Designed for high concurrent users during live events',
      'Solo development with focus on performance and scalability',
    ],

    architecture: {
      description: 'Frontend-driven architecture with real-time backend powered by Supabase and AI-based processing',
      components: [
        { name: 'Frontend', tech: 'React + Tailwind CSS', purpose: 'Responsive UI and interactive user experience' },
        { name: 'Backend / Database', tech: 'Supabase (PostgreSQL + Realtime)', purpose: 'Real-time data sync and storage' },
        { name: 'AI Processing', tech: 'OpenAI API', purpose: 'Keyword detection and emergency alert classification' },
        { name: 'Authentication', tech: 'Supabase Auth', purpose: 'Secure login and user management' },
      ],
    },

    decisions: [
      {
        decision: 'Used Supabase instead of Firebase',
        reasoning: 'Provides real-time capabilities with SQL-based structure, making it easier to query analytics and manage relational data.',
        alternatives: ['Firebase (NoSQL)', 'Custom backend with WebSockets'],
      },
      {
        decision: 'Integrated OpenAI API for word detection',
        reasoning: 'Allows intelligent detection of emergency-related keywords and patterns instead of relying on static keyword matching.',
        alternatives: ['Manual keyword filters', 'Rule-based systems'],
      },
      {
        decision: 'Implemented real-time chat and feedback system',
        reasoning: 'Ensures immediate communication between users and admins during live events.',
        alternatives: ['Post-event feedback only', 'Email-based reporting'],
      },
    ],

    tradeoffs: [
      {
        chose: 'Real-time architecture',
        over: 'Traditional request-response system',
        why: 'Improves responsiveness and live interaction, but increases complexity and resource usage',
      },
      {
        chose: 'AI-based word detection',
        over: 'Static keyword filtering',
        why: 'More accurate and adaptive, but adds API cost and dependency',
      },
    ],

    impact: [
      { metric: 'User Engagement', value: '+150%', context: 'Due to real-time chat and feedback features' },
      { metric: 'Response Time', value: 'Instant', context: 'Emergency alerts and live communication improved issue handling' },
      { metric: 'Event Management Efficiency', value: '+60%', context: 'Admins gained better visibility through analytics and alerts' },
    ],

    engineeringNotes: [
      'Implemented real-time subscriptions using Supabase for chat and feedback',
      'Designed keyword detection pipeline using OpenAI API for smarter alert classification',
      'Created admin dashboard for monitoring alerts and high-frequency keywords',
      'Ensured responsive UI using Tailwind CSS for mobile-first experience',
    ],

    tech: ['React', 'Tailwind CSS', 'Supabase', 'OpenAI API', 'PostgreSQL'],
    github: '#',
    live: '#',
    timeline: 'In Progress',
    role: 'Full-Stack Developer (Solo)',
  },
  {
    id: 'dataviz',
    title: 'DataViz Dashboard',
    tagline: 'Real-time analytics visualization',
    thumbnail: '/placeholder.svg',
    featured: false,
    
    overview: 'An interactive dashboard that transforms complex data into actionable insights through beautiful, real-time visualizations.',
    
    problem: {
      statement: 'Complex data was hard to interpret for non-technical stakeholders',
      context: 'Teams relied on exported spreadsheets and static reports that were outdated by the time they were reviewed.',
      userPain: 'Slow decision-making, missed trends, and data silos between teams.',
    },
    
    constraints: [
      'Handle 100K+ data points with smooth interactions',
      'Real-time updates under 100ms latency',
      'Must integrate with existing Python data pipeline',
      'Accessible on large displays and tablets',
    ],
    
    architecture: {
      description: 'Event-driven with WebSocket streaming and canvas rendering',
      components: [
        { name: 'Visualization Layer', tech: 'Vue.js + D3.js', purpose: 'Interactive charts' },
        { name: 'API Server', tech: 'FastAPI', purpose: 'REST + WebSocket endpoints' },
        { name: 'Cache', tech: 'Redis', purpose: 'Aggregated metrics caching' },
        { name: 'Data Processing', tech: 'Python + Pandas', purpose: 'ETL and aggregations' },
      ],
    },
    
    decisions: [
      {
        decision: 'D3.js with Canvas instead of SVG for large datasets',
        reasoning: 'Canvas handles 100K+ points at 60fps; SVG creates DOM nodes that bog down',
        alternatives: ['SVG (DOM overhead)', 'WebGL (overkill)', 'Chart.js (less flexible)'],
      },
      {
        decision: 'FastAPI over Flask/Django',
        reasoning: 'Native async support for WebSockets, automatic OpenAPI docs, type validation',
        alternatives: ['Flask (sync only)', 'Django (too heavy)', 'Node.js (team knows Python)'],
      },
    ],
    
    tradeoffs: [
      {
        chose: 'WebSocket streaming',
        over: 'Polling',
        why: 'Real-time updates essential for monitoring; connection overhead acceptable',
      },
      {
        chose: 'Pre-aggregated metrics',
        over: 'On-demand calculation',
        why: 'Consistent response times; storage is cheap, compute during peaks is expensive',
      },
    ],
    
    impact: [
      { metric: 'Teams Using', value: '3', context: 'Engineering, Product, Analytics' },
      { metric: 'Reporting Time', value: '-60%', context: 'From manual report generation' },
      { metric: 'Data Freshness', value: '<5s', context: 'From event to visualization' },
    ],
    
    engineeringNotes: [
      'Implemented virtualized rendering for scrollable large datasets',
      'Created reusable chart components with consistent theming',
      'Added export functionality for presentations (PNG, PDF)',
      'Built keyboard navigation for accessibility compliance',
    ],
    
    tech: ['Vue.js', 'D3.js', 'Python', 'FastAPI', 'Redis', 'WebSockets', 'Pandas'],
    github: '#',
    live: '#',
    timeline: '6 weeks',
    role: 'Lead Developer (2-person team)',
  },
];

// Helper function to get featured projects
export const getFeaturedProjects = (): ProjectCaseStudy[] => {
  return projectCaseStudies.filter(project => project.featured === true);
};

// Helper function to get project by ID
export const getProjectById = (id: string): ProjectCaseStudy | undefined => {
  return projectCaseStudies.find(project => project.id === id);
};

// Helper function to get all project IDs (for routing)
export const getAllProjectIds = (): string[] => {
  return projectCaseStudies.map(project => project.id);
};

// Helper function to get projects by tech stack
export const getProjectsByTech = (tech: string): ProjectCaseStudy[] => {
  return projectCaseStudies.filter(project => 
    project.tech.some(t => t.toLowerCase().includes(tech.toLowerCase()))
  );
};

// Helper function to get related projects (excluding current)
export const getRelatedProjects = (currentId: string, limit: number = 3): ProjectCaseStudy[] => {
  return projectCaseStudies
    .filter(project => project.id !== currentId)
    .slice(0, limit);
};