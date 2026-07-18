 // Personal Information
export const PERSONAL_INFO = {
  name: "Jalaj Jain",
  firstName: "Jalaj",
  lastName: "Jain",
  title: "Software Developer",
  subtitle: "Building AI-powered products, from LLM pipelines to full-stack apps.",
  location: "Pune, India",
  email: "jalajjain31@gmail.com",
  phone: "",
  website: "https://jalajjain.com",
  resume: "https://drive.google.com/drive/folders/105m9AJuISnOptKxKOl_Ft_oek_OEVB9h?usp=sharing",
  profileImage: "/images/profile.jpeg"
}

// Social Media Links
export const SOCIAL_LINKS = {
  github: "https://github.com/jainjalajj",
  linkedin: "https://linkedin.com/in/jalaj-jain31",
  twitter: "https://x.com/jalajjain_31",
  instagram: "https://instagram.com/jalajjain_",
  dribbble: "https://dribbble.com/jainjalajj",
  behance: "https://behance.net/jainjalajj",
  medium: "",
  dev: ""
}

// Navigation Menu Items
export const NAVIGATION_ITEMS = [
  { name: "Home", href: "#home", icon: "Home" },
  { name: "About", href: "#about", icon: "User" },
  { name: "Experience", href: "#experience", icon: "Briefcase" },
  { name: "Skills", href: "#skills", icon: "Code" },
  { name: "Projects", href: "#projects", icon: "Briefcase" },
  { name: "Contact", href: "#contact", icon: "Mail" }
]

// Skills Data
export const SKILLS_DATA = {
  technical: [
    { name: "JavaScript", level: 95, icon: "⚡", category: "Frontend" },
    { name: "React", level: 90, icon: "⚛️", category: "Frontend" },
    { name: "Next.js", level: 85, icon: "▲", category: "Frontend" },
    { name: "TypeScript", level: 80, icon: "🔷", category: "Frontend" },
    { name: "Node.js", level: 85, icon: "🟢", category: "Backend" },
    { name: "Python", level: 75, icon: "🐍", category: "Backend" },
    { name: "PostgreSQL", level: 80, icon: "🐘", category: "Database" },
    { name: "MongoDB", level: 75, icon: "🍃", category: "Database" },
    { name: "AWS", level: 70, icon: "☁️", category: "Cloud" },
    { name: "Docker", level: 75, icon: "🐳", category: "DevOps" }
  ],
  tools: [
    "VS Code", "Git", "GitHub", "Postman", 
    "Webpack", "Vite", "ESLint", "Prettier"
  ],
  soft: [
    "Problem Solving", "Team Leadership", "Communication", 
    "Project Management", "Creative Thinking", "Adaptability"
  ]
}

// Projects Data
export const PROJECTS_DATA = [
  {
    id: 1,
    title: "ConnectSphere – Real-time Communication Platform",
    description: "A full-stack real-time communication platform enabling instant messaging, secure authentication, and role-based access control with WebSockets for real-time updates.",
    image: "/images/project1.png",
    technologies: ["React", "Material UI", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Socket.IO", "JWT", "bcrypt"],
    liveUrl: "https://spherex-phi.vercel.app/",
    githubUrl: "https://github.com/jainjalajj/Connect-Sphere",
    featured: true,
    category: "Full Stack",
    status: "In Progress",
    year: "2025"
  },
  {
    id: 2,
    title: "Violence Alert System",
    description: "A real-time violence detection system leveraging MobileNetV2 to analyze video feeds and detect violent activities, providing timely and reliable alerts.",
    image: "/images/project2.png",
    technologies: ["Python", "MobileNetV2", "Jupyter Notebook", "Google Colab"],
    liveUrl: "",
    githubUrl: "https://github.com/jainjalajj/Violence_Alert_System",
    featured: true,
    category: "AI/ML",
    status: "Completed",
    year: "2024"
  },
  {
    id: 3,
    title: "MERN Chat Application",
    description: "A full-stack real-time chat application with secure authentication, instant communication via WebSockets, and a responsive UI.",
    image: "/images/project3.png",
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Socket.IO", "JWT", "bcrypt", "Material UI"],
    liveUrl: "",
    githubUrl: "https://github.com/jainjalajj/mern-chat-app",
    featured: false,
    category: "Full Stack",
    status: "Completed",
    year: "2024"
  }
];


// About Me Data
export const ABOUT_DATA = {
  bio: "I'm a passionate Software Developer, excited to explore and create digital solutions that make an impact. I love working with modern web technologies and enjoy turning complex ideas into simple, engaging, and user-friendly experiences.",
  experience: "1",
  projectsCompleted: "10",
  happyClients: "5",
  certifications: ["AWS Certified Developer", "Introduction to Git & Github", "Meta Frontend Certified"],
  interests: ["Open Source", "AI/ML", "Full-Stack Development"],
  education: {
    degree: "Bachelor of Computer Science Engineering",
    university: "Bharati Vidyapeeth (DU) College Of Engineering, Pune",
    year: "2026",
    gpa: "8.14 (A+ Grade)"
  }
}

// Experience Data
export const EXPERIENCE_DATA = [
  {
    id: 1,
    role: "AI/ML Intern",
    company: "Tech Mahindra (Makers Lab)",
    duration: "Nov 2025 – March 2026",
    location: "Pune, India",
    description: [
      "Contributed to Project INDUS 2.0, Tech Mahindra's flagship 8-billion parameter foundational LLM, by architecting a sophisticated Synthetic Data Generation (SDG) pipeline using NVIDIA Data Designer.",
      "Engineered dependency-aware synthetic datasets by blending statistical samplers for structured data with prompt-templated, context-aware LLM generations, ensuring high contextual fidelity for enterprise analytics.",
      "Conducted rigorous data validation and quality assurance using advanced SQL and sampling techniques, seamlessly aligning the statistical distribution of synthetic data with real-world Indic language datasets."
    ]
  }
]

// Contact Form Configuration
export const CONTACT_CONFIG = {
  emailService: "emailjs", // or "netlify", "formspree"
  serviceId: "service_f5ol0nq",
  templateId: "template_awecm3b",
  publicKey: "9UfKnB3dB_-naZG9t",
  subject: "New Contact Form Submission",
  autoReply: true
}

// Theme Configuration
export const THEME_CONFIG = {
  defaultTheme: "light", // "light" or "dark"
  systemPreference: false,
  themes: {
    light: {
      primary: "#38bdf8",
      secondary: "#f1f5f9",
      background: "#ffffff",
      foreground: "#0f172a"
    },
    dark: {
      primary: "#38bdf8",
      secondary: "#1e293b",
      background: "#0f172a",
      foreground: "#f1f5f9"
    }
  }
}

// Animation Configuration
export const ANIMATION_CONFIG = {
  enabled: true,
  duration: 600,
  delay: 100,
  easing: "ease-out",
  threshold: 0.1,
  reducedMotion: true // Respect user's motion preferences
}

// SEO Configuration
export const SEO_CONFIG = {
  siteName: "Your Portfolio",
  siteUrl: "https://yourwebsite.com",
  defaultTitle: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`,
  defaultDescription: "Professional portfolio showcasing modern web development skills, creative projects, and innovative solutions.",
  defaultKeywords: ["web developer", "full stack", "react", "next.js", "portfolio", "javascript"],
  ogImage: "/images/og-image.jpg",
  twitterHandle: "@yourusername",
  lang: "en-US"
}

// API Endpoints
export const API_ENDPOINTS = {
  contact: "/api/contact",
  newsletter: "/api/newsletter",
  analytics: "/api/analytics",
  projects: "/api/projects"
}

// Feature Flags
export const FEATURES = {
  darkMode: true,
  animations: true,
  blog: false,
  newsletter: true,
  analytics: true,
  contactForm: true,
  downloadResume: true,
  projectFilters: true,
  testimonials: false,
  services: false
}

// Error Messages
export const ERROR_MESSAGES = {
  general: "Something went wrong. Please try again later.",
  network: "Network error. Please check your connection.",
  validation: "Please check your input and try again.",
  email: "Please enter a valid email address.",
  required: "This field is required.",
  contact: {
    send: "Failed to send message. Please try again.",
    success: "Message sent successfully! I'll get back to you soon."
  }
}

// Success Messages
export const SUCCESS_MESSAGES = {
  contact: "Thank you for your message! I'll get back to you within 24 hours.",
  newsletter: "Successfully subscribed to the newsletter!",
  copy: "Copied to clipboard!",
  download: "Resume downloaded successfully!"
}

// Loading States
export const LOADING_STATES = {
  contact: "Sending message...",
  download: "Downloading...",
  page: "Loading..."
}

// Breakpoints (matches Tailwind CSS)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
}
