import React from "react";
import { Smile, Briefcase, Layers, PartyPopper, Search, Code2, Sparkles, Info } from "lucide-react";

export const PROJECTS = [
  { title: "MovieDex", desc: "Movie search catalog built with React + OMDB API, local-storage favorites.", github: "https://github.com/anbu-max/Moviedex", tags: ["React", "OMDB API", "CSS", "LocalStorage"], impact: "Learned React & API Integration", impactType: "learned" as const, image: "/img/projects/moviedex.png" },
  { title: "Todo - JWT Auth", desc: "Full-stack Todo app with secure JWT auth, pagination, Spring Security & Swagger docs.", github: "https://github.com/anbu-max/TodoJwtAuth", tags: ["Spring Boot", "Spring Security", "JWT", "PostgreSQL", "Swagger"], impact: "Learned Auth & Security Patterns", impactType: "learned" as const, image: "/img/projects/todo.png" },
  { title: "URL Shortener", desc: "Production-ready URL shortener with Redis caching, MongoDB TTL, Docker & Nginx reverse proxy.", github: "https://github.com/anbu-max/URLs-Simplifier", tags: ["Spring Boot", "MongoDB", "Redis", "Docker", "Nginx"], impact: "Learned Caching & Containerization", impactType: "learned" as const, image: "/img/projects/url.png" },
  { title: "5-Star Google Review", desc: "Automated Google review workflow — WhatsApp requests, AI-powered replies & Sheets logging.", github: "#", tags: ["n8n", "WhatsApp API", "Google Sheets", "AI Auto-Reply"], impact: "Boost 5-Star Reviews", impactType: "impact" as const, image: "/img/projects/google-review.png" },
  { title: "Missed Call Text-Back", desc: "Instant SMS responses to missed callers with lead capture & calendar booking.", github: "#", tags: ["n8n", "Twilio", "Webhooks", "SMS API"], impact: "Zero Missed Leads", impactType: "impact" as const, image: "/img/projects/missed-call.png" },
  { title: "THRIVEN Blog", desc: "Premium AI & tech blog platform with admin console, cloud storage & immersive UI.", github: "https://github.com/anbu-max/thriven-Blog", tags: ["Next.js", "Tailwind CSS", "MongoDB", "Vercel Blob", "Framer Motion"], impact: "SEO-Optimized Publishing", impactType: "impact" as const, image: "/img/projects/thriven.png" },
  { title: "AI Appointment Chatbot", desc: "Website chatbot that checks calendar availability, collects visitor info & books appointments automatically.", github: "#", tags: ["n8n", "Chatbot", "Calendar API", "Webhooks"], impact: "24/7 Auto Booking", impactType: "impact" as const, image: "/img/projects/chatbot.png" },
  { title: "AI Receptionist", desc: "Voice AI receptionist that handles inbound business calls 24/7, answers FAQs & books appointments.", github: "#", tags: ["Retell AI", "n8n", "Voice AI", "Webhooks"], impact: "24/7 Call Handling", impactType: "impact" as const, image: "/img/projects/ai-receptionist.png" },
];

import { SiHtml5, SiCss3, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss, SiSpringboot, SiPostgresql, SiGithub, SiPostman, SiTwilio, SiN8N } from "react-icons/si";
import { FaJava, FaGitAlt } from "react-icons/fa";
import { TbApi, TbMessage2, TbUsers, TbBulb, TbAdjustments } from "react-icons/tb";

export const SKILL_GROUPS = [
  { label: "Frontend", icon: <Code2 size={14} />, items: [
    { name: "HTML5", icon: <SiHtml5 size={18} color="#E34F26" /> },
    { name: "CSS3", icon: <SiCss3 size={18} color="#1572B6" /> },
    { name: "JavaScript", icon: <SiJavascript size={18} color="#F7DF1E" /> },
    { name: "React", icon: <SiReact size={18} color="#61DAFB" /> }
  ]},
  { label: "Backend & DB", icon: <Code2 size={14} />, items: [
    { name: "Java", icon: <FaJava size={18} color="#007396" /> },
    { name: "Spring Boot", icon: <SiSpringboot size={18} color="#6DB33F" /> },
    { name: "PostgreSQL", icon: <SiPostgresql size={18} color="#336791" /> },
    { name: "SQL", icon: <TbApi size={18} color="#f59e0b" /> },
    { name: "Git", icon: <FaGitAlt size={18} color="#F05032" /> },
    { name: "GitHub", icon: <SiGithub size={18} color="#181717" /> }
  ]},
  { label: "Automation & Tools", icon: <Sparkles size={14} />, items: [
    { name: "n8n", icon: <SiN8N size={18} color="#EA4B71" /> },
    { name: "Postman", icon: <SiPostman size={18} color="#FF6C37" /> },
    { name: "REST APIs", icon: <TbApi size={18} color="#0284c7" /> }
  ]},
  { label: "Soft Skills", icon: <Info size={14} />, items: [
    { name: "Problem-Solving", icon: <TbBulb size={18} color="#eab308" /> },
    { name: "Communication", icon: <TbMessage2 size={18} color="#3b82f6" /> },
    { name: "Teamwork", icon: <TbUsers size={18} color="#10b981" /> },
    { name: "Adaptability", icon: <TbAdjustments size={18} color="#8b5cf6" /> }
  ]},
];

export const TABS = [
  { key: "me", label: "Me", icon: <Smile size={22} />, color: "#22c55e", path: "/me" },
  { key: "projects", label: "Projects", icon: <Briefcase size={22} />, color: "#16a34a", path: "/projects" },
  { key: "skills", label: "Skills", icon: <Layers size={22} />, color: "#a855f7", path: "/skills" },
  { key: "fun", label: "Fun", icon: <PartyPopper size={22} />, color: "#ec4899", path: "/fun" },
  { key: "contact", label: "Contact", icon: <Search size={22} />, color: "#f59e0b", path: "/contact" },
];

export const Tag = ({ t, icon }: { t: string, icon?: React.ReactNode }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 999, background: "rgba(17, 17, 17, 0.05)", border: "1px solid rgba(17, 17, 17, 0.1)", backdropFilter: "blur(8px)", color: "#111", fontSize: 13, fontWeight: 600 }}>
    {icon && <span style={{ opacity: 0.9 }}>{icon}</span>}
    {t}
  </span>
);
