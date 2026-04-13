/**
 * Centralized Personal Data Store
 * This file contains all the personal information, experience, education, and skills.
 * Use this to populate components across the application.
 */

export const personalData = {
  name: "Md. Atikul Islam Atik",
  firstName: "Atikul Islam",
  nickname: "Atik",
  fullName: "Md. Atikul Islam Atik",
  role: "Software Engineer",
  title: "Engineering Scalable & Modern Software Solutions",
  location: "Dhaka, Bangladesh",
  email: "atik.hasan.dev@gmail.com",
  phone: "+8801790631785",
  github: "https://github.com/atik65",
  linkedin: "https://linkedin.com/in/atik65",
  whatsapp: "https://wa.me/8801790631785",
  resume:
    "https://drive.google.com/file/d/1GeOtkQ3clz6SUd6lsFX-eLJ4nzerkT4G/view",

  about: {
    short:
      "Software Engineer with 2+ years of experience building scalable, production-grade web applications. Expert in Next.js, React, and TypeScript.",
    long: "I am a Software Engineer with over 2 years of professional experience building scalable, production-grade web applications using modern JavaScript technologies. My primary expertise lies in JavaScript (ES6+), TypeScript, React, and Next.js, where I focus on building high-performance, maintainable, and user-centric platforms. I enjoy solving real-world engineering challenges, building meaningful digital products, and continuously improving my skills in system design, scalable architecture, and modern web technologies.",
    highlights: [
      "2+ Years of Professional Experience",
      "Expert in Next.js & React Ecosystem",
      "Specialized in Scalable Frontend Architecture",
      "BSc in CSE with CGPA 3.97 (Top of Batch)",
    ],
  },

  skills: {
    frontend: [
      { name: "React", level: "Expert", icon: "Code2" },
      { name: "Next.js", level: "Expert", icon: "Layers" },
      { name: "TypeScript", level: "Expert", icon: "Code" },
      { name: "JavaScript (ES6+)", level: "Expert", icon: "ChevronDown" },
      { name: "Tailwind CSS", level: "Advanced", icon: "Layout" },
      { name: "Redux / Zustand", level: "Advanced", icon: "Fingerprint" },
    ],
    backend: [
      { name: "Node.js", level: "Advanced", icon: "Server" },
      { name: "Express.js", level: "Advanced", icon: "Monitor" },
      { name: "Python", level: "Intermediate", icon: "Terminal" },
      { name: "Django (DRF)", level: "Intermediate", icon: "Database" },
      { name: "PostgreSQL / MongoDB", level: "Advanced", icon: "Database" },
    ],
    tools: [
      { name: "Git / GitHub", level: "Expert", icon: "GitBranch" },
      { name: "Docker", level: "Intermediate", icon: "Box" },
      { name: "Linux", level: "Advanced", icon: "Terminal" },
      { name: "Jest / Cypress", level: "Intermediate", icon: "CheckCircle2" },
    ],
  },

  experience: [
    {
      company: "Soft Valley",
      role: "Software Engineer",
      type: "Full-time",
      location: "Banani, Dhaka (On-site)",
      period: "Dec 2025 — Present",
      description:
        "Building production-grade software systems using React, Next.js, and TypeScript. Focusing on scalable architecture, API integration, and system design.",
      skills: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Systems Design",
        "Frontend Architecture",
      ],
    },
    {
      company: "Eutropia IT Solution",
      role: "Frontend Engineer",
      type: "Full-time",
      location: "Dhaka (Remote)",
      period: "Aug 2023 — Nov 2025",
      description:
        "Led frontend architecture for multi-stakeholder platforms. Built a chauffeur booking system for the Australian market and custom eCommerce solutions.",
      skills: [
        "Next.js",
        "TypeScript",
        "Zustand",
        "REST API",
        "Google Maps API",
        "SEO",
      ],
    },
  ],

  education: [
    {
      degree: "BSc in Computer Science & Engineering",
      institution: "University of Asia Pacific",
      period: "2021 — 2025",
      grade: "3.94 / 4.00",
      achievements:
        "6 Vice Chancellor Awards, 2 Dean's Awards. Ranked Top of Batch.",
      details: [
        "Software Engineering",
        "Algorithms",
        "Data Structures",
        "System Analysis",
        "RDBMS",
        "Networking",
        "Operating System",
      ],
    },
    {
      degree: "Higher Secondary Certificate (Science)",
      institution: "New Govt. Degree College, Rajshahi",
      period: "2017 — 2019",
      grade: "5.00 / 5.00",
      details: ["Physics", "Higher Mathematics", "Chemistry"],
    },
  ],

  achievements: [
    {
      title: "Runner-Up - INNOVATEX 2025",
      organization: "National Innovation Competition",
      description:
        "Showcased high-end technical innovation and teamwork in a national hackathon.",
    },
    {
      title: "4th Position - MIST Inventions 4.1",
      organization: "MIST Hackathon 2025",
      description:
        "Developed a rapid prototype for a real-world complex problem under strict time constraints.",
    },
    {
      title: "University Merit Scholarship",
      organization: "University of Asia Pacific",
      description:
        "Awarded for exceptional academic performance across all semesters.",
    },
  ],
};
