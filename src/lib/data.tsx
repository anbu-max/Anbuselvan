import React from "react";
import { Smile, Briefcase, Layers, PartyPopper, Search, Code2, Sparkles, Info } from "lucide-react";

export const PROJECTS = [
  { title: "MovieDex", desc: "Movie search catalog built with React + OMDB API, local-storage favorites.", github: "https://github.com/anbu-max/Moviedex", tags: ["React", "OMDB API", "CSS"], image: "/img/projects/moviedex.png" },
  { title: "Todo - Auth", desc: "Secure REST API — Spring Boot, JPA/Hibernate, PostgreSQL & JWT auth.", github: "https://github.com/anbu-max/TodoJwtAuth", tags: ["SpringBoot", "JWT", "PostgreSQL"], image: "/img/projects/todo.png" },
  { title: "URL Shortener", desc: "URL simplification platform with custom expiry & REST endpoints.", github: "https://github.com/anbu-max/URLs-Simplifier", tags: ["Java", "REST API", "SQL"], image: "/img/projects/url.png" },
  { title: "YAPG", desc: "\"Yet Another Platform Game\" — HTML5 Canvas + JS physics engine.", github: "#", tags: ["Game Dev", "JS", "Canvas"], image: "/img/projects/yapg.png" },
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
