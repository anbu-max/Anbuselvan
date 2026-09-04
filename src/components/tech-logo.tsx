"use client";

import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiN8N,
  SiTwilio,
  SiMongodb,
  SiAndroid,
  SiKotlin,
  SiOpenai,
  SiGooglesheets,
  SiGooglecalendar,
  SiGoogle,
  SiPython,
  SiWhatsapp,
  SiFramer,
  SiVercel,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiSpringboot,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGithub,
  SiPostman,
} from "react-icons/si";
import { FaJava, FaDatabase } from "react-icons/fa";
import { Sparkles, Bot, Cpu, PhoneCall } from "lucide-react";

export function TechLogo({ tool, size = 18 }: { tool: string; size?: number }) {
  const t = tool.toLowerCase();

  if (t.includes("retell")) return <PhoneCall size={size} color="#ea4b71" />;
  if (t.includes("n8n")) return <SiN8N size={size} color="#EA4B71" />;
  if (t.includes("twilio")) return <SiTwilio size={size} color="#F22F46" />;
  if (t.includes("openai") || t.includes("gpt")) return <SiOpenai size={size} color="#10A37F" />;
  if (t.includes("claude") || t.includes("perplexity") || t.includes("sonar")) return <Sparkles size={size} color="#22B8CF" />;
  if (t.includes("calendar")) return <SiGooglecalendar size={size} color="#4285F4" />;
  if (t.includes("sheet")) return <SiGooglesheets size={size} color="#34A853" />;
  if (t.includes("google")) return <SiGoogle size={size} color="#4285F4" />;
  if (t.includes("compose") || t.includes("android")) return <SiAndroid size={size} color="#3DDC84" />;
  if (t.includes("kotlin")) return <SiKotlin size={size} color="#7F52FF" />;
  if (t.includes("room") || t.includes("sqlite")) return <FaDatabase size={size} color="#003B57" />;
  if (t.includes("react")) return <SiReact size={size} color="#61DAFB" />;
  if (t.includes("next")) return <SiNextdotjs size={size} color="#000000" />;
  if (t.includes("tailwind")) return <SiTailwindcss size={size} color="#06B6D4" />;
  if (t.includes("mongo")) return <SiMongodb size={size} color="#47A248" />;
  if (t.includes("vercel")) return <SiVercel size={size} color="#000000" />;
  if (t.includes("framer")) return <SiFramer size={size} color="#0055FF" />;
  if (t.includes("python")) return <SiPython size={size} color="#3776AB" />;
  if (t.includes("whatsapp")) return <SiWhatsapp size={size} color="#25D366" />;
  if (t.includes("postgres")) return <SiPostgresql size={size} color="#336791" />;
  if (t.includes("redis")) return <SiRedis size={size} color="#DC382D" />;
  if (t.includes("docker")) return <SiDocker size={size} color="#2496ED" />;
  if (t.includes("spring")) return <SiSpringboot size={size} color="#6DB33F" />;
  if (t.includes("java")) return <FaJava size={size} color="#007396" />;
  if (t.includes("javascript") || t.includes("js")) return <SiJavascript size={size} color="#F7DF1E" />;
  if (t.includes("html")) return <SiHtml5 size={size} color="#E34F26" />;
  if (t.includes("css")) return <SiCss3 size={size} color="#1572B6" />;
  if (t.includes("github")) return <SiGithub size={size} color="#181717" />;
  if (t.includes("postman")) return <SiPostman size={size} color="#FF6C37" />;

  return <Cpu size={size} color="#6366f1" />;
}
