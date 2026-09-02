import React from "react";
import { Smile, Briefcase, Layers, PartyPopper, Search, Code2, Sparkles, Info } from "lucide-react";

export const PROJECTS = [
  { slug: "ai-receptionist", title: "AI Receptionist", desc: "Voice AI receptionist that handles inbound business calls 24/7, answers FAQs & books appointments.", problem: "Businesses need affordable, 24/7 inbound call handling.", action: "Developed a voice AI agent using Retell AI and n8n.", result: "Reduced missed calls and effectively answered customer FAQs around the clock.", github: "#", tags: ["Retell AI", "n8n", "Voice AI", "Webhooks"], impact: "24/7 Call Handling", impactType: "impact" as const, image: "/img/projects/ai-receptionist.png" },
  {
    slug: "android-twilio-cold-calls",
    title: "Ballz — Android Cold Call CRM & Power Dialer",
    desc: "Native Android application built with Jetpack Compose & Twilio Voice SDK for high-velocity power dialing, CSV prospect import, conversion funnel tracking & real-time deal sizing economics.",
    problem: "Outbound sales teams waste hours manually typing phone numbers, tracking lead outcomes in paper notes, and lacking structured conversion metrics. Most people simply don't have the ballz to cold call consistently!",
    action: "I named this app 'Ballz' because let's face it — most people don't have the ballz to pick up the phone and cold call! Built a 100% offline-first native Android app featuring Jetpack Compose (Material 3), Twilio WebRTC VoIP SDK + Cellular dual-calling redundancy, Room SQLite database, and automated CSV prospect lead parser.",
    result: "Accelerated outbound call speeds by 4x, automated lead status updates, tracked Value Per Dial ($), and eliminated manual dialing friction for outbound sales reps.",
    github: "https://github.com/anbu-max",
    tags: ["Android (SDK 36)", "Jetpack Compose", "Kotlin 2.2", "Twilio Voice SDK", "Room DB", "Power Dialer"],
    impact: "Boosted Conversions",
    impactType: "impact" as const,
    image: "/Project images/Android power dialer/dashboard.jpeg",
    images: [
      "/Project images/Android power dialer/dashboard.jpeg",
      "/Project images/Android power dialer/xcel ,csv file upload.jpeg",
      "/Project images/Android power dialer/dashboard 2.jpeg",
      "/Project images/Android power dialer/power dialer with business name.jpeg",
      "/Project images/Android power dialer/numbers.jpeg",
      "/Project images/Android power dialer/themes setting.jpeg",
      "/Project images/Android power dialer/dash end.jpeg",
    ]
  },
  { slug: "ai-appointment-chatbot", title: "AI Appointment Chatbot", desc: "Website chatbot that checks calendar availability, collects visitor info & books appointments automatically.", problem: "Manual appointment scheduling is time-consuming.", action: "Created an AI chatbot to handle inquiries, check availability, and book slots.", result: "Enabled 24/7 automated booking and improved customer experience.", github: "#", tags: ["n8n", "Chatbot", "Calendar API", "Webhooks"], impact: "24/7 Auto Booking", impactType: "impact" as const, image: "/img/projects/chatbot.png" },
  { slug: "whatsapp-agent", title: "n8n WhatsApp Agent", desc: "Automated WhatsApp agent workflow to handle customer queries, parse requests, and streamline communications 24/7.", problem: "Manual replies on WhatsApp delay customer support and lead conversion.", action: "Built an intelligent n8n WhatsApp agent connected with AI models to instantly answer questions and assist users.", result: "Significantly reduced response time and increased conversion rates.", github: "#", tags: ["n8n", "WhatsApp API", "AI Agent", "Webhooks"], impact: "Instant Support", impactType: "impact" as const, image: "/img/projects/n8n-whatsapp-agent.png" },
  { slug: "email-agent", title: "n8n Email Agent", desc: "Smart email automation agent that categorizes incoming messages, drafts context-aware replies, and syncs CRM data.", problem: "Overwhelming email volume leads to delayed customer responses and missed sales inquiries.", action: "Developed an AI-driven n8n email agent for automatic categorization, sentiment analysis, and intelligent drafting.", result: "Improved response times by 80% and maintained 100% inbox organization.", github: "#", tags: ["n8n", "Gmail API", "AI Agent", "Email Automation"], impact: "Faster Replies", impactType: "impact" as const, image: "/img/projects/n8n-email-agent.png" },
  {
    slug: "seo-blog-agent",
    title: "Automated SEO Blog Agent (n8n & AI)",
    desc: "Fully autonomous n8n workflow agent that researches trending keywords, generates SEO-optimized long-form blog articles with images, and automatically publishes & schedules posts to CMS websites.",
    problem: "Content marketing teams spend 15+ hours weekly researching keywords, drafting articles, formatting images, and manually publishing blog posts.",
    action: "Built an automated n8n workflow powered by Claude/Gemini AI and web scrapers that researches trending topics, generates structured SEO long-form articles, embeds relevant Unsplash imagery, and auto-publishes to WordPress/Next.js CMS.",
    result: "100% automated blog publishing pipeline, saving 15+ hours weekly and boosting organic search traffic.",
    github: "https://github.com/anbu-max",
    tags: ["n8n", "Gemini AI", "SEO Automation", "WordPress API", "Web Scraping"],
    impact: "100% Auto Publishing",
    impactType: "impact" as const,
    image: "/img/projects/n8n-seo-agent.png"
  },
  { slug: "thriven-blog", title: "THRIVEN Blog", desc: "Premium AI & tech blog platform with admin console, cloud storage & immersive UI.", problem: "Needed a modern, high-performance platform for tech and AI content.", action: "Built a Next.js application with Tailwind CSS and Framer Motion.", result: "Delivered an SEO-optimized, highly engaging publishing platform.", github: "https://github.com/anbu-max/thriven-Blog", tags: ["Next.js", "Tailwind CSS", "MongoDB", "Vercel Blob", "Framer Motion"], impact: "SEO-Optimized Publishing", impactType: "impact" as const, image: "/img/projects/thriven.png" },
  { slug: "missed-call-text-back", title: "Missed Call Text-Back", desc: "Instant SMS responses to missed callers with lead capture & calendar booking.", problem: "Missed calls result in lost leads and opportunities.", action: "Integrated Twilio and n8n to send immediate SMS replies with booking links.", result: "Captured lost leads automatically, ensuring zero missed opportunities.", github: "#", tags: ["n8n", "Twilio", "Webhooks", "SMS API"], impact: "Zero Missed Leads", impactType: "impact" as const, image: "/img/projects/missed-call.png" },
  { slug: "5-star-google-review", title: "Reputation Management System", desc: "Automated reputation & review management system — intelligently routes 4-5 star reviews to Google and captures 1-3 star feedback privately.", problem: "Businesses struggle to filter negative feedback while boosting positive Google reviews.", action: "Built an intelligent automated workflow that gates review requests based on customer rating.", result: "Increased 5-star Google reviews by 300% while preventing negative public reviews.", github: "#", tags: ["n8n", "WhatsApp API", "Google Business", "AI Filtering"], impact: "Boost 5-Star Reviews", impactType: "impact" as const, image: "/img/projects/google-review.png" },
  { slug: "moviedex", title: "MovieDex", desc: "Movie search catalog built with React + OMDB API, local-storage favorites.", problem: "Need an easy way to search for movies and save favorites.", action: "Built a responsive catalog using React, integrated OMDB API, and used local storage.", result: "Created a fast and reliable movie discovery platform.", github: "https://github.com/anbu-max/Moviedex", tags: ["React", "OMDB API", "CSS", "LocalStorage"], impact: "Learned React & API Integration", impactType: "learned" as const, image: "/img/projects/moviedex.png" },
  { slug: "todo-jwt-auth", title: "Todo - JWT Auth", desc: "Full-stack Todo app with secure JWT auth, pagination, Spring Security & Swagger docs.", problem: "Building secure authorization and role-based access for an application.", action: "Developed a full-stack Java app implementing JWT tokens, role-based access, and pagination.", result: "Achieved robust security and complete documentation via Swagger.", github: "https://github.com/anbu-max/TodoJwtAuth", tags: ["Spring Boot", "Spring Security", "JWT", "PostgreSQL", "Swagger"], impact: "Learned Auth & Security Patterns", impactType: "learned" as const, image: "/img/projects/todo.png" },
  { slug: "url-shortener", title: "URL Shortener", desc: "Production-ready URL shortener with Redis caching, MongoDB TTL, Docker & Nginx reverse proxy.", problem: "Long URLs are difficult to share and track.", action: "Developed a scalable URL shortener using Spring Boot, Redis for caching, and MongoDB.", result: "Reduced link size significantly and improved load times with caching.", github: "https://github.com/anbu-max/URLs-Simplifier", tags: ["Spring Boot", "MongoDB", "Redis", "Docker", "Nginx"], impact: "Learned Caching & Containerization", impactType: "learned" as const, image: "/img/projects/url.png" }
];

import { SiHtml5, SiCss3, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss, SiSpringboot, SiPostgresql, SiGithub, SiPostman, SiTwilio, SiN8N, SiMongodb, SiRedis, SiDocker, SiPython } from "react-icons/si";
import { FaJava, FaGitAlt } from "react-icons/fa";
import { TbApi, TbMessage2, TbUsers, TbBulb, TbAdjustments } from "react-icons/tb";

export const SKILL_GROUPS = [
  { label: "Frontend", icon: <Code2 size={14} />, items: [
    { name: "React", icon: <SiReact size={18} color="#61DAFB" /> },
    { name: "Next.js", icon: <SiNextdotjs size={18} color="#111111" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={18} color="#06B6D4" /> },
    { name: "JavaScript", icon: <SiJavascript size={18} color="#F7DF1E" /> },
    { name: "HTML5", icon: <SiHtml5 size={18} color="#E34F26" /> },
    { name: "CSS3", icon: <SiCss3 size={18} color="#1572B6" /> }
  ]},
  { label: "Backend & DB", icon: <Code2 size={14} />, items: [
    { name: "Java", icon: <FaJava size={18} color="#007396" /> },
    { name: "Spring Boot", icon: <SiSpringboot size={18} color="#6DB33F" /> },
    { name: "Python", icon: <SiPython size={18} color="#3776AB" /> },
    { name: "PostgreSQL", icon: <SiPostgresql size={18} color="#336791" /> },
    { name: "MongoDB", icon: <SiMongodb size={18} color="#47A248" /> },
    { name: "Redis", icon: <SiRedis size={18} color="#DC382D" /> },
    { name: "Docker", icon: <SiDocker size={18} color="#2496ED" /> },
    { name: "Git", icon: <FaGitAlt size={18} color="#F05032" /> },
    { name: "GitHub", icon: <SiGithub size={18} color="#181717" /> }
  ]},
  { label: "Automation & AI Tools", icon: <Sparkles size={14} />, items: [
    { name: "n8n", icon: <SiN8N size={18} color="#EA4B71" /> },
    { name: "Twilio", icon: <SiTwilio size={18} color="#F22F46" /> },
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
  { key: "skills", label: "Skills", icon: <Layers size={22} />, color: "#a855f7", path: "/skills" },
  { key: "projects", label: "Projects", icon: <Briefcase size={22} />, color: "#16a34a", path: "/projects" },
  { key: "fun", label: "Fun", icon: <PartyPopper size={22} />, color: "#ec4899", path: "/fun" },
  { key: "contact", label: "Connect", icon: <Search size={22} />, color: "#f59e0b", path: "/contact" },
];

export const Tag = ({ t, icon }: { t: string, icon?: React.ReactNode }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 999, background: "rgba(17, 17, 17, 0.05)", border: "1px solid rgba(17, 17, 17, 0.1)", backdropFilter: "blur(8px)", color: "#111", fontSize: 13, fontWeight: 600 }}>
    {icon && <span style={{ opacity: 0.9 }}>{icon}</span>}
    {t}
  </span>
);
