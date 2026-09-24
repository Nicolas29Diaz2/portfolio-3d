export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  website?: string;
  achievements: string[];
  techStack: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Full Stack" | "3D & WebGL" | "Enterprise";
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const PERSONAL_INFO = {
  fullName: "Nicolás Díaz",
  role: "Full Stack Software Engineer",
  tagline: "React • Next.js • Node.js • NestJS • Three.js",
  location: "Cali, Colombia • Available for Global Remote Roles",
  availability: "Available for new opportunities",
  email: "diazsantosnicolas10@gmail.com",
  phoneDisplay: "+57 312 420 6472",
  whatsappUrl:
    "https://wa.me/573124206472?text=Hello%20Nicolas!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.",
  githubUrl: "https://github.com/Nicolas29Diaz2",
  linkedinUrl: "https://www.linkedin.com/in/nicolassdiazs",
  portfolio3dUrl: "/3d",
  resumeEnUrl: "/Engineer-NicolasDiaz.pdf",
  resumeEsUrl: "/Ingeniero-NicolasDiaz.pdf",
  bio: "Software Engineer with full-stack experience building digital products and enterprise applications. Specialized in TypeScript, React, Next.js, and NestJS. I combine robust backend architecture and asynchronous queues with interactive 3D/WebGL experiences and multimodal AI.",
  yearsExperience: "2+",
};

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: "volio",
    role: "Founder & Lead Full Stack Engineer",
    company: "Volio",
    location: "Remote",
    period: "May 2026 – Present",
    type: "SaaS Product",
    website: "https://volio-studio.com",
    achievements: [
      "Architected end-to-end cloud infrastructure for an interactive album SaaS using NestJS, Redis, BullMQ, PostgreSQL, and Cloudflare R2 on AWS EC2.",
      "Engineered real-time 3D physics with Three.js/R3F (video mapped onto dynamic geometry) alongside multimodal AI layout generation.",
    ],
    techStack: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "Redis",
      "BullMQ",
      "PostgreSQL",
      "Three.js",
      "AWS EC2",
    ],
  },
  {
    id: "bluepixel",
    role: "Full Stack Developer Mid",
    company: "BluePixel Software",
    location: "Mexico (Remote)",
    period: "March 2025 – May 2026",
    type: "Enterprise Solutions",
    achievements: [
      "Delivered full-stack modules for corporate accounts and airline logistics using React, TypeScript, Node.js, and Azure DevOps.",
      "Engineered 20+ secure REST endpoints and integrated WebGL dashboards for real-time operational monitoring.",
    ],
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "REST APIs",
      "Azure DevOps",
      "Three.js",
      "PostgreSQL",
    ],
  },
  {
    id: "bde",
    role: "Frontend Developer",
    company: "BDE",
    location: "Mexico (Remote)",
    period: "October 2024 – March 2025",
    type: "Analytics & Dashboards",
    achievements: [
      "Built type-safe UI component systems with React, TypeScript, and Tailwind CSS for administrative business dashboards.",
      "Engineered real-time metric visualizations converting telemetry data into actionable monitoring tools.",
    ],
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Data Viz",
      "State Management",
    ],
  },
  {
    id: "uao-dev",
    role: "Full Stack Developer",
    company: "Universidad Autónoma de Occidente",
    location: "Cali, Colombia",
    period: "January 2024 – June 2024",
    type: "Academic Platform",
    achievements: [
      "Developed full-stack database workflows and REST APIs using React, Node.js, Sequelize, and MySQL.",
      "Executed user testing and agile iterations following user-centered interaction design standards.",
    ],
    techStack: ["React", "Node.js", "Sequelize", "MySQL", "UX Research"],
  },
];

export const FEATURED_HERO_PROJECT: ProjectItem = {
  id: "volio-studio",
  title: "Volio Studio",
  subtitle: "Interactive Digital Magazine & Album SaaS",
  category: "Full Stack",
  description:
    "Production SaaS platform allowing users to generate interactive digital magazines with 3D physics, multimodal AI layout generation, and commercial publishing workflows.",
  image: "/Images/Projects/volio2.png",
  tags: [
    "Next.js",
    "NestJS",
    "Three.js",
    "BullMQ",
    "Redis",
    "PostgreSQL",
    "AWS EC2",
  ],
  liveUrl: "https://volio-studio.com",
  featured: true,
  highlights: [
    "Decoupled asynchronous worker architecture with BullMQ & Redis on AWS EC2",
    "Synchronized video texture mapping on dynamic 3D page geometry with mobile GPU optimization",
  ],
};

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: "contech",
    title: "ConTech Geospatial Platform",
    subtitle: "Enterprise Incident Management & Site Operations",
    category: "Enterprise",
    description:
      "Enterprise construction management system featuring real-time geospatial incident tracking, interactive vector mapping, and operational analytics.",
    image: "/Images/Projects/contech.png",
    tags: ["Next.js", "TypeScript", "Mapbox GL", "Recharts", "Tailwind CSS"],
    liveUrl: "https://bim-front-beryl.vercel.app",
    highlights: [
      "Live vector tile mapping with incident location clustering",
      "Real-time analytical reporting and telemetry dashboards",
    ],
  },
  {
    id: "dragon-ball-3d",
    title: "Dragon Ball 3D Book",
    subtitle: "Dynamic Canvas API Projection on 3D Geometry",
    category: "3D & WebGL",
    description:
      "Interactive 3D book that fetches character data from a REST API, renders custom cards onto a 2D canvas, and projects them as real-time textures on turning 3D pages.",
    image: "/Images/Projects/3Dbook.webp",
    tags: ["React", "Three.js", "Canvas 2D API", "WebGL"],
    liveUrl: "https://dragonball3dbook.netlify.app/",
    highlights: [
      "Real-time procedural canvas textures mapped onto 3D book meshes",
      "Smooth page flip physics and responsive interaction",
    ],
  },
  {
    id: "portfolio-3d",
    title: "Spatial 3D Portfolio",
    subtitle: "Hardware-Accelerated WebGL Experience",
    category: "3D & WebGL",
    description:
      "Cinematic 3D virtual workspace built with React Three Fiber, custom Blender GLTF assets, dynamic GPU tier detection, and interactive screen shaders.",
    image: "/Images/Projects/Portfolio.webp",
    tags: ["React 19", "Three.js", "R3F", "Blender", "Postprocessing"],
    liveUrl: "/3d",
    githubUrl: "https://github.com/Nicolas29Diaz2/portfolio-3d",
    highlights: [
      "Dynamic GPU tier detection maintaining 60 FPS across desktop and mobile",
      "Interactive spline camera transitions and customized WebGL shaders",
    ],
  },
  {
    id: "shewhart",
    title: "Shewhart QC Platform",
    subtitle: "Statistical Analysis & Sample Management",
    category: "Full Stack",
    description:
      "Educational platform for statistical quality control courses, automating batch sample generation, control chart plotting, and student grading workflows.",
    image: "/Images/Projects/Shewhart.webp",
    tags: ["React", "Node.js", "Express", "Sequelize", "MySQL"],
    highlights: [
      "Algorithmic calculation of X-bar and R control chart parameters",
      "Secure batch sample data generation and automated student evaluations",
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ESNext)",
      "Tailwind CSS",
      "HTML5 / CSS3",
      "Zustand",
    ],
  },
  {
    title: "Backend & Systems",
    skills: [
      "Node.js",
      "NestJS",
      "REST APIs",
      "Redis",
      "BullMQ Queues",
      "Hexagonal Architecture",
      "Microservices",
    ],
  },
  {
    title: "3D & Web Graphics",
    skills: [
      "Three.js",
      "React Three Fiber (R3F)",
      "WebGL",
      "Drei",
      "Blender",
      "Shaders",
    ],
  },
  {
    title: "Databases & Cloud",
    skills: [
      "PostgreSQL (Neon)",
      "MySQL",
      "Docker",
      "AWS EC2",
      "Cloudflare R2",
      "Azure DevOps",
      "Prisma / Sequelize",
    ],
  },
  {
    title: "Architecture & AI",
    skills: [
      "Multimodal LLM APIs",
      "Structured Outputs",
      "Prompt Engineering",
      "CI/CD Pipelines",
      "System Design",
    ],
  },
];

export const EDUCATION_DATA = {
  degree: "B.S. in Multimedia Engineering (Ingeniería Multimedia)",
  institution: "Universidad Autónoma de Occidente",
  location: "Cali, Colombia",
  date: "October 2024",
  distinction: "Winner of the Academic Excellence Award",
  note: "Graduated with highest institutional scholastic distinction. Bilingual: Spanish (Native), English (B2 - Professional Fluency).",
};
