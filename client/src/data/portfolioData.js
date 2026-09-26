// Centralized content for the portfolio.
// Edit this file to update text, links, skills, experience and projects
// without touching any component code.
import instagramCover from "../assets/project cover/Instagram cover.png";
import hrmsCover from "../assets/project cover/HRMS cover.png";
import ridegoCover from "../assets/project cover/ridego cover.png";
import productManagementCover from "../assets/project cover/product Management cover.png";
import multivendorCover from "../assets/project cover/Multivendor cover.png";

export const personalInfo = {
  name: "Giridharan M",
  title: "Full Stack Developer",
  altTitle: "MERN Stack Developer",
  location: "India",
  email: "murugasangiridharan@gmail.com",
  linkedin: "https://linkedin.com/in/giridharan08",
  github: "https://github.com/Mgiridharan33",
  resumePath: "/resume/GiridharanM.pdf",
};

export const heroContent = {
  greeting: "Hi, I'm Giridharan M",
  headline: "Full Stack Developer",
  description:
    "I build modern, responsive and scalable web applications using React.js, Node.js and MongoDB.",
};

export const aboutContent = {
  paragraphs: [
    "I'm a passionate Full Stack Developer with hands-on experience in building modern web applications using the MERN stack. I recently completed my MERN Stack development internship, where I worked with React.js, Node.js, Express.js, REST APIs, authentication and real-time application features.",
    "I enjoy building responsive user interfaces, developing backend APIs and connecting different technologies to create complete web applications.",
  ],
  stats: [
    { value: "1+", label: "Internship Experience" },
    { value: "4+", label: "Major Projects" },
    { value: "10+", label: "Technologies" },
  ],
};

export const skillGroups = [
  {
    category: "Frontend",
    skills: [
      { name: "React.js", description: "Building component-driven, interactive UIs." },
      { name: "JavaScript", description: "Core language for all client-side logic." },
      { name: "HTML5", description: "Semantic, accessible page structure." },
      { name: "CSS3", description: "Responsive layouts, animation and theming." },
      { name: "Tailwind CSS", description: "Utility-first styling for rapid UI work." },
      { name: "React Router", description: "Client-side routing for single-page apps." },
      { name: "Axios", description: "Promise-based HTTP requests to REST APIs." },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", description: "JavaScript runtime for server-side logic." },
      { name: "Express.js", description: "Minimal framework for building REST APIs." },
      { name: "REST APIs", description: "Designing predictable, resource-based endpoints." },
      { name: "JWT Authentication", description: "Stateless, token-based user authentication." },
      { name: "Role-Based Access Control", description: "Restricting features by user role." },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "MongoDB", description: "Document database for flexible data models." },
      { name: "MySQL", description: "Relational database for structured data." },
      { name: "Redis", description: "In-memory store for caching and sessions." },
    ],
  },
  {
    category: "Real-Time",
    skills: [
      { name: "Socket.IO", description: "Real-time, bidirectional event-based communication." },
      { name: "WebSockets", description: "Persistent connections for live features." },
    ],
  },
  {
    category: "Architecture",
    skills: [
      { name: "Microservices", description: "Breaking systems into independent services." },
      { name: "API Gateway", description: "Single entry point for backend services." },
      { name: "RabbitMQ", description: "Message broker for async communication." },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", description: "Version control for tracking code changes." },
      { name: "GitHub", description: "Hosting repositories and collaborating on code." },
      { name: "Docker", description: "Containerizing apps for consistent environments." },
      { name: "Postman", description: "Testing and documenting REST APIs." },
      { name: "VS Code", description: "Primary code editor and workflow." },
    ],
  },
];

export const experience = [
  {
    role: "MERN Stack Developer Intern",
    company: "Beleaf Technology Solutions",
    period: "2026",
    completed: "Internship completed in September 2026",
    description:
      "Worked on full-stack web development using React.js, Node.js, Express.js and MongoDB. Gained hands-on experience in developing REST APIs, authentication, role-based access, responsive interfaces and real-time application features.",
  },
];

export const projects = [
  {
    name: "Instagram Clone",
    cover: instagramCover,
    description:
      "An Instagram-inspired social media application with authentication, profiles, posts, stories, reels, messaging, notifications and follow functionality.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "JWT", "Cloudinary"],
    features: [
      "Authentication",
      "User profiles",
      "Follow/unfollow",
      "Posts",
      "Stories",
      "Reels",
      "Real-time messaging",
      "Notifications",
      "Image uploads",
    ],
    github: "https://github.com/Mgiridharan33/instagram-clone",
    demo: "",
  },
  {
    name: "HRMS Human Resource Management",
    cover: hrmsCover,
    description:
      "A Human Resource Management System designed to manage employees, attendance, leave and HR-related operations through a modern web interface.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API"],
    features: [],
    github: "https://github.com/Mgiridharan33/HRMS_HUMAN-RESOURCE-MANAGEMENT",
    demo: "",
  },
  {
    name: "RideGo",
    cover: ridegoCover,
    description:
      "A modern ride management application focused on providing a smooth interface for managing ride-related functionality.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
    features: [],
    github: "https://github.com/Mgiridharan33/RideGo",
    demo: "",
  },
  {
    name: "Product Management",
    cover: productManagementCover,
    description:
      "A product management system for organizing catalog data, features, inventory and product workflows in a streamlined dashboard.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API"],
    features: [],
    github: "https://github.com/Mgiridharan33/Product_Management",
    demo: "",
  },
  {
    name: "Multi-Vendor Commerce Platform",
    cover: multivendorCover,
    description:
      "A full-stack multi-vendor e-commerce platform where multiple sellers can manage products and customers can browse and purchase products.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux", "REST API"],
    features: [],
    github: "https://github.com/Mgiridharan33/multi-vendor-commerce-platform",
    demo: "",
  },
];
