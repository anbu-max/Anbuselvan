"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiSpringboot,
  SiMongodb,
  SiRedis,
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGit,
  SiPostman,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbApi } from "react-icons/tb";

type SkillItem = {
  name: string;
  icon?: React.ReactNode;
  imgSrc?: string;
};

type CategoryGroup = {
  title: string;
  textColor: string;
  highlightBg: string;
  direction: "left" | "right";
  speed: number;
  items: SkillItem[];
};

const SKILL_CATEGORIES: CategoryGroup[] = [
  {
    title: "frontend tech stack",
    textColor: "#0369a1",
    highlightBg: "#bae6fd",
    direction: "left",
    speed: 22,
    items: [
      { name: "React", icon: <SiReact size={26} color="#61DAFB" /> },
      { name: "Next.js", icon: <SiNextdotjs size={26} color="#111111" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={26} color="#06B6D4" /> },
      { name: "JavaScript", icon: <SiJavascript size={26} color="#F7DF1E" /> },
      { name: "HTML5", icon: <SiHtml5 size={26} color="#E34F26" /> },
      { name: "CSS3", icon: <SiCss3 size={26} color="#1572B6" /> },
      { name: "Figma", imgSrc: "/skill logos/figma-Picsart-BackgroundRemover.png" },
    ],
  },
  {
    title: "backend & database",
    textColor: "#15803d",
    highlightBg: "#bbf7d0",
    direction: "right",
    speed: 25,
    items: [
      { name: "Java", icon: <FaJava size={26} color="#007396" /> },
      { name: "Spring Boot", icon: <SiSpringboot size={26} color="#6DB33F" /> },
      { name: "Python", icon: <SiPython size={26} color="#3776AB" /> },
      { name: "SQL", imgSrc: "/skill logos/sql-Picsart-BackgroundRemover.png" },
      { name: "MongoDB", icon: <SiMongodb size={26} color="#47A248" /> },
      { name: "Redis", icon: <SiRedis size={26} color="#DC382D" /> },
      { name: "Docker", imgSrc: "/skill logos/docker-Picsart-BackgroundRemover.png" },
      { name: "Git", icon: <SiGit size={26} color="#F05032" /> },
      { name: "GitHub", imgSrc: "/skill logos/png-transparent-github-logo-Picsart-BackgroundRemover.png" },
    ],
  },
  {
    title: "automation & ai tools",
    textColor: "#be123c",
    highlightBg: "#fecdd3",
    direction: "left",
    speed: 24,
    items: [
      { name: "Hermes Agent", imgSrc: "/skill logos/hermesagent-Picsart-BackgroundRemover.webp" },
      { name: "Claude", imgSrc: "/skill logos/claude.png" },
      { name: "ChatGPT", imgSrc: "/skill logos/chatgpt-Picsart-BackgroundRemover.jpg" },
      { name: "n8n", imgSrc: "/skill logos/n8n-Picsart-BackgroundRemover.jpg" },
      { name: "Retell AI", imgSrc: "/skill logos/Retell-AI-Logo-.png" },
      { name: "Twilio", imgSrc: "/skill logos/Twilio-Logo-Picsart-BackgroundRemover.png" },
      { name: "NotebookLM", imgSrc: "/skill logos/NotebookLM.png" },
      { name: "LangChain", imgSrc: "/skill logos/langchain-Picsart-BackgroundRemover.jpg" },
      { name: "Pinecone", imgSrc: "/skill logos/Pinecone-Icon-Logo-Vector.svg-.png" },
      { name: "Clay", imgSrc: "/skill logos/Clay-Logo-Picsart-BackgroundRemover.jpg" },
      { name: "AntiGravity AI", imgSrc: "/skill logos/antigravity-logo-png-Picsart-BackgroundRemover.jpg" },
      { name: "Postman", icon: <SiPostman size={26} color="#FF6C37" /> },
      { name: "REST APIs", icon: <TbApi size={26} color="#0284c7" /> },
    ],
  },
];

export function Skiper31SkillsShowcase() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, paddingBottom: 16 }}>
      {SKILL_CATEGORIES.map((cat, idx) => (
        <CategoryMarqueeRow key={idx} category={cat} />
      ))}
    </div>
  );
}

function CategoryMarqueeRow({ category }: { category: CategoryGroup }) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items 4x for a completely seamless infinite loop
  const duplicatedItems = [
    ...category.items,
    ...category.items,
    ...category.items,
    ...category.items,
  ];

  return (
    <div
      style={{
        borderRadius: 24,
        background: "#ffffff",
        border: "2px solid #18181b",
        padding: "24px 16px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        overflow: "hidden",
        boxShadow: "6px 6px 0px #18181b",
      }}
    >
      {/* Title Header with Color Highlight */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          fontSize: 15,
          fontWeight: 800,
          color: "#111",
          margin: 0,
          textAlign: "center",
          textTransform: "lowercase",
        }}
      >
        <Bracket style={{ height: 24 }} />
        <span
          style={{
            position: "relative",
            display: "inline-block",
            padding: "4px 16px",
            borderRadius: 10,
            background: category.highlightBg,
            color: category.textColor,
            border: "1.5px solid #18181b",
            boxShadow: "2px 2px 0px #18181b",
          }}
        >
          {category.title}
        </span>
        <Bracket style={{ height: 24, transform: "scaleX(-1)" }} />
      </div>

      {/* Infinite Marquee Container - Pauses on Hover */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          padding: "20px 0 16px",
        }}
      >
        <motion.div
          animate={
            isPaused
              ? false
              : {
                  x: category.direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }
          }
          transition={{
            duration: category.speed,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            width: "max-content",
          }}
        >
          {duplicatedItems.map((item, index) => (
            <motion.div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                borderRadius: 16,
                background: "#f8fafc",
                border: "1.5px solid #18181b",
                boxShadow: "3px 3px 0px #18181b",
                userSelect: "none",
                flexShrink: 0,
                cursor: "pointer",
              }}
              whileHover={{
                scale: 1.3,
                y: -4,
                background: "#ffffff",
                boxShadow: "5px 5px 0px #18181b",
                borderColor: category.textColor,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              {item.imgSrc ? (
                <img
                  src={item.imgSrc}
                  alt={item.name}
                  style={{ width: 28, height: 28, objectFit: "contain", borderRadius: 4 }}
                />
              ) : (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.icon}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

const Bracket = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 27 78" style={style}>
      <path
        fill="#111"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      />
    </svg>
  );
};
