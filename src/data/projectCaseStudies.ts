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
  id: 'pragyan-ai-platform',
  title: 'Pragyan – AI-Powered College Event Feedback & Intelligence Platform',
  tagline: 'Smart event analytics, AI feedback intelligence, and personalized recommendations',

  thumbnail: '/placeholder.svg',
  featured: true,

  overview:
    'Pragyan is a full-stack AI-powered platform that helps colleges manage events, collect student feedback, analyze sentiment, identify urgent issues, and generate actionable insights. The platform transforms traditional feedback collection into an intelligent decision-making system using AI-driven analytics, keyword trend detection, event performance reports, and personalized event recommendations.',

  problem: {
    statement:
      'Colleges struggle to extract meaningful insights from large volumes of student feedback and event participation data.',

    context:
      'Traditional feedback forms provide raw responses but lack intelligent analysis, trend detection, sentiment tracking, and actionable recommendations for organizers.',

    userPain:
      'Students often feel their feedback is ignored, while administrators spend significant time manually reviewing responses without obtaining clear insights or improvement strategies.',
  },

  constraints: [
    'Real-time analytics and dashboard updates',
    'AI processing for sentiment, keyword extraction, and recommendations',
    'Scalable architecture for handling large event datasets',
    'Secure role-based access for students and administrators',
  ],

  architecture: {
    description:
      'Modern full-stack architecture powered by React, Supabase, PostgreSQL, and Google Gemini AI.',

    components: [
      {
        name: 'Frontend',
        tech: 'React + TypeScript + Tailwind CSS',
        purpose: 'Responsive user interface and analytics dashboard',
      },
      {
        name: 'Backend',
        tech: 'Supabase Edge Functions',
        purpose: 'Serverless AI processing and business logic',
      },
      {
        name: 'Database',
        tech: 'PostgreSQL (Supabase)',
        purpose: 'Store events, registrations, feedback, and analytics data',
      },
      {
        name: 'AI Engine',
        tech: 'Google Gemini AI',
        purpose: 'Sentiment analysis, keyword extraction, recommendations, and event intelligence',
      },
      {
        name: 'Authentication',
        tech: 'Supabase Auth',
        purpose: 'Secure student and administrator access',
      },
    ],
  },

  decisions: [
    {
      decision: 'Used Supabase as Backend-as-a-Service',
      reasoning:
        'Provided authentication, PostgreSQL, realtime features, storage, and edge functions in a unified ecosystem.',
      alternatives: ['Firebase', 'Custom Node.js Backend'],
    },

    {
      decision: 'Integrated Google Gemini AI',
      reasoning:
        'Enabled intelligent sentiment analysis, keyword trend detection, event summaries, and personalized recommendations.',
      alternatives: ['Rule-based NLP', 'Traditional keyword matching'],
    },

    {
      decision: 'Built role-based student and admin dashboards',
      reasoning:
        'Separated operational workflows and analytics capabilities for better usability.',
      alternatives: ['Single dashboard approach'],
    },
  ],

  tradeoffs: [
    {
      chose: 'AI-powered analysis',
      over: 'Manual feedback review',
      why:
        'Provides faster insights and automation but introduces external AI dependency and API costs.',
    },

    {
      chose: 'Serverless Edge Functions',
      over: 'Dedicated backend server',
      why:
        'Improves scalability and deployment simplicity but requires stateless architecture design.',
    },
  ],

  impact: [
    {
      metric: 'Feedback Processing Time',
      value: '-90%',
      context:
        'Automated sentiment analysis and event reporting reduced manual review effort.',
    },

    {
      metric: 'Insight Generation',
      value: 'Real-Time',
      context:
        'Administrators receive instant analytics and trend detection.',
    },

    {
      metric: 'Event Discovery',
      value: '+70%',
      context:
        'Personalized event recommendation system improves student engagement.',
    },
  ],

  engineeringNotes: [
    'Implemented AI-powered sentiment analysis using Google Gemini',
    'Built keyword trend detection and visualization dashboard',
    'Developed urgent issue detection system for critical feedback',
    'Created personalized event recommendation engine',
    'Integrated image and audio feedback analysis',
    'Implemented realtime updates using Supabase subscriptions',
    'Generated automated AI event performance reports',
    'Designed scalable serverless architecture using Edge Functions',
  ],

  tech: [
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Supabase',
    'PostgreSQL',
    'Google Gemini AI',
    'Recharts',
    'Deno Edge Functions',
  ],

  github: 'https://github.com/rajeshgupta0/College-Event-FeedBack-System',

  live: 'https://college-ai-event-feedback-system.vercel.app/',

  timeline: '2026',

  role: 'Full-Stack Developer & AI Integration Engineer (Solo)',
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
