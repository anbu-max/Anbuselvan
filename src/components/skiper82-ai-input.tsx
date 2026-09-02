"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowUp, Sparkles, ChevronDown, ChevronUp, ExternalLink, RefreshCw } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  thought?: string;
  thoughtTime?: number;
  links?: { label: string; url: string }[];
}

// Concise 1-line question prompts designed to sit side-by-side in a horizontal row
const ALL_QUESTION_PROMPTS = [
  "Who is Anbu Selvan?",
  "What is Ballz CRM?",
  "Anbu's AI & Tech Stack",
  "How 24/7 Voice AI works",
  "Book a free AI demo",
  "Custom workflow automations",
  "How to contact Anbu",
  "Backend & DB skills",
  "Google Review System",
  "Native Android apps",
  "Where is Anbu based?",
  "n8n & Twilio automations",
];

// Helper to get stored wish count from localStorage or cookies
function getStoredWishCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const localVal = localStorage.getItem("anbu_ai_wishes_count");
    if (localVal !== null) return parseInt(localVal, 10) || 0;

    const match = document.cookie.match(/(?:^|; )anbu_ai_wishes_count=([^;]*)/);
    if (match) return parseInt(match[1], 10) || 0;
  } catch {
    // fallback
  }
  return 0;
}

// Helper to save wish count into both localStorage and cookies (30 day expiry)
function saveStoredWishCount(count: number) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("anbu_ai_wishes_count", count.toString());
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `anbu_ai_wishes_count=${count}; expires=${expires}; path=/; SameSite=Lax`;
  } catch {
    // fallback
  }
}

export function Skiper82AiInput() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [remainingWishes, setRemainingWishes] = useState(3);
  const [isThinking, setIsThinking] = useState(false);
  const [expandedThoughtId, setExpandedThoughtId] = useState<string | null>(null);
  const [activePrompts, setActivePrompts] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Detect mobile screen width & initialize remaining wishes from localStorage / cookies on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const used = getStoredWishCount();
    const remaining = Math.max(0, 3 - used);
    setRemainingWishes(remaining);

    const shuffled = [...ALL_QUESTION_PROMPTS].sort(() => 0.5 - Math.random());
    setActivePrompts(shuffled.slice(0, 3));

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Play satisfying Web Audio pop sound on send
  const playSendSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Audio fallback
    }
  };

// Call Gemini API with automatic fallback to smart JSON answering
async function queryGeminiApi(
  userPrompt: string,
  isFinalWish: boolean = false
): Promise<{ text: string; links?: { label: string; url: string }[] } | null> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const systemPrompt = `You are Anbu Selvan's AI Assistant powered by Google Gemini on his portfolio website.
Anbu Selvan is an ELITE Full-Stack & AI Automation Developer based in Chennai, Tamil Nadu, India.
Contact details: Email: anbuselvandzz@gmail.com, WhatsApp: +91 9361952703.

Key Projects & Capabilities:
- Ballz — Android Cold Call CRM & Power Dialer (Jetpack Compose, Twilio Voice SDK, Room DB)
- AI Receptionist (24/7 Voice AI with Retell AI & n8n)
- Reputation Management System (5-Star Google Reviews)
- Automated SEO Blog Agent (n8n & AI long-form blog auto-publisher)
- n8n WhatsApp Agent & n8n Email Agent
- Full-Stack Web Development (Next.js, React, Java Spring Boot, Python, MongoDB, Redis, Docker)

CRITICAL INSTRUCTIONS:
1. If asked what AI model you are: State clearly that you are powered by Google Gemini AI, customized for Anbu Selvan's portfolio!
2. If asked why someone should hire Anbu: Highlight his unmatched technical versatility, high-velocity delivery, and ability to build AI agent automations that save businesses dozens of hours weekly and boost sales!
3. Match the user's exact energy, tone, and style (enthusiastic, casual, technical, or formal).
4. Keep responses fast, concise, and punchy (under 3 sentences).
${isFinalWish ? "5. THIS IS THE USER'S FINAL (3RD) WISH! Warmly invite them to Connect, Hire Anbu, or Book a Free Demo for their business on the Connect page!" : "5. Highlight Anbu's expertise and invite them to explore projects or connect."}`;

    // Try Gemini 2.0 Flash first, then 1.5 Flash
    let res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\nUser Question: ${userPrompt}` }] }],
        }),
      }
    );

    if (!res.ok) {
      res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\nUser Question: ${userPrompt}` }] }],
          }),
        }
      );
    }

    if (!res.ok) return null;
    const data = await res.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) return null;

    return {
      text: candidateText.trim(),
      links: [
        { label: "🤝 Connect & Hire Anbu", url: "/contact" },
        { label: "📁 View Projects", url: "/projects" },
      ],
    };
  } catch {
    return null;
  }
}

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || remainingWishes <= 0 || isThinking) return;

    playSendSound();
    setInput("");

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    const newUsedCount = getStoredWishCount() + 1;
    saveStoredWishCount(newUsedCount);
    setRemainingWishes(Math.max(0, 3 - newUsedCount));
    setIsThinking(true);

    const thoughtTime = Math.floor(Math.random() * 3) + 3; // 3-5s
    const isFinal = newUsedCount >= 3;

    // First attempt Gemini API call
    const geminiRes = await queryGeminiApi(query, isFinal);

    if (geminiRes) {
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: geminiRes.text,
        thought: "1. Prompted Google Gemini 2.0 Flash Model.\n2. Processed user prompt against Anbu's portfolio context & hiring strengths.\n3. Generated personalized high-energy response with action links.",
        thoughtTime,
        links: geminiRes.links,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
      return;
    }

    // Fallback: Smart Client-Side JSON Answering Engine
    setTimeout(() => {
      const lower = query.toLowerCase();
      let aiText = "";
      let links: { label: string; url: string }[] = [];
      let thoughtSteps = "";

      const isGreeting = ["hi", "hello", "hey", "good morning", "good evening", "namaste", "yo", "sup"].some(
        (g) => lower === g || lower.startsWith(g + " ")
      );

      if (isGreeting) {
        thoughtSteps = "1. Detected greeting intent.\n2. Formatted polite welcome response.\n3. Prompted visitor for their name & business needs.";
        aiText = "Hey there! 👋 Welcome to Anbu's portfolio. May I know your name and what kind of AI automation, web app, or free demo you're looking for today?";
        links = [
          { label: "🤝 Book Free Demo", url: "/contact" },
          { label: "📁 Explore Projects", url: "/projects" },
        ];
      } else if (lower.includes("model") || lower.includes("what ai") || lower.includes("who are you")) {
        thoughtSteps = "1. Identified query intent: AI Model Identity.\n2. Stated Google Gemini AI architecture.\n3. Formatted response with contact link.";
        aiText = "I am powered by Google Gemini AI, customized specifically to showcase Anbu Selvan's full-stack & AI automation portfolio! Anbu is an top-tier engineer who builds custom AI agents and web apps.";
        links = [
          { label: "🤝 Hire / Connect with Anbu", url: "/contact" },
          { label: "📁 Explore Projects", url: "/projects" },
        ];
      } else if (lower.includes("hire") || lower.includes("why need") || lower.includes("why should") || lower.includes("best")) {
        thoughtSteps = "1. Identified query intent: Why Hire Anbu Selvan?\n2. Highlighted top strengths: Full-Stack Next.js, Android SDK 36, n8n & Twilio AI Agent workflows.\n3. Attached direct booking link.";
        aiText = "You should hire Anbu Selvan because he is a powerhouse developer! He builds production-ready web apps (Next.js, Spring Boot), native Android apps (Ballz Power Dialer), and AI agent workflows (n8n, Twilio, Retell AI) that save 15+ hours weekly and boost business revenue!";
        links = [
          { label: "🤝 Book Free Demo / Hire Anbu", url: "/contact" },
          { label: "⚡ View Skills", url: "/skills" },
        ];
      } else if (lower.includes("ballz") || lower.includes("dialer") || (lower.includes("android") && lower.includes("app"))) {
        thoughtSteps = "1. Identified query intent: Ballz Android Cold Call CRM & Power Dialer.\n2. Retrieved specs: SDK 36, Jetpack Compose, Kotlin 2.2, Twilio WebRTC Voice SDK, Room DB.\n3. Prepared project navigation link.";
        aiText = "Anbu built 'Ballz' — a 100% offline-first native Android Power Dialer & CRM! Powered by Jetpack Compose (Material 3), Twilio WebRTC VoIP SDK, Kotlin 2.2, and Room SQLite DB for high-velocity outbound calling and conversion funnel tracking.";
        links = [
          { label: "📱 View Ballz Power Dialer Project", url: "/projects/android-twilio-cold-calls" },
        ];
      } else if (lower.includes("receptionist") || lower.includes("voice ai") || lower.includes("call")) {
        thoughtSteps = "1. Identified query intent: 24/7 AI Voice Receptionist.\n2. Retrieved specs: Retell AI, n8n, Webhooks, Twilio Voice API.\n3. Attached project detail link.";
        aiText = "Anbu built a 24/7 AI Voice Receptionist using Retell AI, n8n webhooks, and Twilio Voice API that automatically answers inbound business calls, addresses customer FAQs, and books appointments around the clock!";
        links = [
          { label: "📞 View AI Voice Receptionist", url: "/projects/ai-receptionist" },
        ];
      } else if (lower.includes("demo") || lower.includes("audit") || lower.includes("automate")) {
        thoughtSteps = "1. Identified query intent: Custom Free AI Demo & Business Workflow Audit.\n2. Retrieved contact workflow options.\n3. Attached direct booking form link.";
        aiText = "Anbu offers custom free AI demos! Whether you know your exact automation requirements or need a workflow audit to identify high-ROI bottlenecks, Anbu will build a tailored working prototype for you.";
        links = [
          { label: "🤝 Book Free Demo on Connect Page", url: "/contact" },
        ];
      } else if (lower.includes("skill") || lower.includes("stack") || lower.includes("tech") || lower.includes("n8n") || lower.includes("backend") || lower.includes("frontend")) {
        thoughtSteps = "1. Identified query intent: Technical Skills & Stack.\n2. Listed core tech: React, Next.js, Java, Spring Boot, Python, Twilio, Retell AI, n8n, MongoDB, Redis, Docker.\n3. Formatted response.";
        aiText = "Anbu's stack spans React, Next.js, TypeScript, Java, Spring Boot, Python, Twilio Voice SDK, Retell AI, and n8n workflow automations for enterprise-grade applications.";
        links = [
          { label: "⚡ Explore Skills Showcase", url: "/skills" },
          { label: "💼 View Work Experience", url: "/me" },
        ];
      } else if (lower.includes("contact") || lower.includes("email") || lower.includes("phone") || lower.includes("whatsapp") || lower.includes("reach")) {
        thoughtSteps = "1. Identified query intent: Contact Details.\n2. Retrieved contact info: Email (anbuselvandzz@gmail.com), WhatsApp (+91 9361952703).\n3. Attached direct links.";
        aiText = "You can contact Anbu Selvan directly via email at anbuselvandzz@gmail.com or on WhatsApp at +91 9361952703. You can also request a free demo directly on the Connect page!";
        links = [
          { label: "🤝 Go to Connect Page", url: "/contact" },
        ];
      } else if (lower.includes("who") || lower.includes("anbu") || lower.includes("about")) {
        thoughtSteps = "1. Identified query intent: Who is Anbu Selvan?\n2. Summarized background: Full-Stack & AI Automation Developer based in Chennai, India.\n3. Formatted response with links.";
        aiText = "Anbu Selvan is a Full-Stack & Automation Developer based in Chennai, Tamil Nadu, India. He builds high-performance web applications, native Android apps, and AI agent workflows that automate business operations.";
        links = [
          { label: "👋 About Anbu", url: "/me" },
          { label: "📁 Explore Projects", url: "/projects" },
        ];
      } else {
        thoughtSteps = "1. Analyzing general prompt.\n2. Summarizing core expertise: AI Agents, Web & Android Apps, Workflow Automations.\n3. Providing relevant quick links.";
        aiText = "Anbu Selvan specializes in Full-Stack Web Development, Native Android Apps, and AI Agent Automations. He builds custom solutions that eliminate manual business tasks and boost conversions.";
        links = [
          { label: "🚀 View Featured Projects", url: "/projects" },
          { label: "🤝 Book Free Demo", url: "/contact" },
        ];
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiText,
        thought: thoughtSteps,
        thoughtTime,
        links,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 1200);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 620,
        background: "#ffffff",
        border: "2px solid #18181b",
        boxShadow: "6px 6px 0px #18181b",
        borderRadius: 24,
        padding: "18px 16px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        userSelect: "none",
        pointerEvents: "auto",
        boxSizing: "border-box",
      }}
    >
      {/* Session Wishes Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 14px",
          borderRadius: 999,
          background: remainingWishes > 0 ? "#f0fdf4" : "#fef2f2",
          border: remainingWishes > 0 ? "1.5px solid #16a34a" : "1.5px solid #ef4444",
          boxShadow: "2.5px 2.5px 0px #18181b",
          fontSize: 12,
          fontWeight: 800,
          color: remainingWishes > 0 ? "#15803d" : "#b91c1c",
        }}
      >
        <Sparkles size={14} />
        {remainingWishes > 0
          ? `🧞‍♂️ Make your 3 wishes (${remainingWishes}/3 available)`
          : "Wish limit reached! Explore the page yourself below 🚀"}
      </div>

      {/* Chat Messages Log */}
      <AnimatePresence>
        {messages.length > 0 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              maxHeight: 280,
              overflowY: "auto",
              padding: "4px 8px 12px",
            }}
          >
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {/* User Bubble */}
                {msg.sender === "user" ? (
                  <div
                    style={{
                      padding: "10px 16px",
                      borderRadius: "20px 20px 4px 20px",
                      background: "#0284c7",
                      color: "#ffffff",
                      fontSize: 13.5,
                      fontWeight: 600,
                      boxShadow: "0 4px 14px rgba(2, 132, 199, 0.3)",
                      lineHeight: 1.5,
                    }}
                  >
                    {msg.text}
                  </div>
                ) : (
                  /* AI Card Bubble */
                  <div
                    style={{
                      padding: "14px 16px",
                      borderRadius: "20px 20px 20px 4px",
                      background: "#ffffff",
                      border: "2px solid #18181b",
                      boxShadow: "4px 4px 0px #18181b",
                      color: "#111",
                      fontSize: 13.5,
                      lineHeight: 1.6,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {/* Expandable Thought Accordion */}
                    {msg.thought && (
                      <div
                        style={{
                          borderRadius: 10,
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          padding: "6px 10px",
                          fontSize: 11.5,
                        }}
                      >
                        <button
                          onClick={() =>
                            setExpandedThoughtId(
                              expandedThoughtId === msg.id ? null : msg.id
                            )
                          }
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            background: "none",
                            border: "none",
                            color: "#64748b",
                            fontWeight: 700,
                            cursor: "pointer",
                            padding: 0,
                            width: "100%",
                            textAlign: "left",
                          }}
                        >
                          <span>🧠 Thought for {msg.thoughtTime || 4} seconds</span>
                          {expandedThoughtId === msg.id ? (
                            <ChevronUp size={14} />
                          ) : (
                            <ChevronDown size={14} />
                          )}
                        </button>

                        <AnimatePresence>
                          {expandedThoughtId === msg.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              style={{
                                marginTop: 6,
                                paddingTop: 6,
                                borderTop: "1px solid #cbd5e1",
                                color: "#475569",
                                fontFamily: "monospace",
                                fontSize: 11,
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {msg.thought}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    <div>{msg.text}</div>

                    {/* Action Links */}
                    {msg.links && msg.links.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                        {msg.links.map((link, idx) => (
                          <Link
                            key={idx}
                            href={link.url}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              padding: "4px 10px",
                              borderRadius: 999,
                              background: "#f1f5f9",
                              border: "1px solid #18181b",
                              color: "#18181b",
                              fontSize: 11.5,
                              fontWeight: 700,
                              textDecoration: "none",
                            }}
                          >
                            {link.label} <ExternalLink size={11} />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}

            {/* Thinking Indicator */}
            {isThinking && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  alignSelf: "flex-start",
                  padding: "8px 14px",
                  borderRadius: 16,
                  background: "#ffffff",
                  border: "2px solid #18181b",
                  boxShadow: "3px 3px 0px #18181b",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <RefreshCw size={13} className="animate-spin" /> Thinking...
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}
      </AnimatePresence>

      {/* Skiper82 Floating Pill Input Component */}
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
          background: "#f8fafc",
          border: "1.5px solid #18181b",
          boxShadow: "3px 3px 0px #18181b",
          borderRadius: 999,
          padding: "6px 8px 6px 18px",
          gap: 10,
          transition: "all 0.2s ease",
        }}
      >
        {/* Input Text Box */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          disabled={remainingWishes <= 0 || isThinking}
          placeholder={
            remainingWishes > 0
              ? "Ask AI anything about Anbu's projects, skills..."
              : "Wish limit reached for this session."
          }
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: 13.5,
            fontWeight: 500,
            color: "#111111",
            fontFamily: "inherit",
          }}
        />

        {/* Morphing Arrow Action Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSend()}
          disabled={!input.trim() || remainingWishes <= 0 || isThinking}
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: input.trim() && remainingWishes > 0 ? "#18181b" : "#f1f5f9",
            color: input.trim() && remainingWishes > 0 ? "#ffffff" : "#94a3b8",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: input.trim() && remainingWishes > 0 ? "pointer" : "default",
            transition: "all 0.2s ease",
            flexShrink: 0,
          }}
        >
          <AnimatePresence mode="wait">
            {input.trim() ? (
              <motion.div
                key="up-arrow"
                initial={{ rotate: -90, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 90, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <ArrowUp size={18} />
              </motion.div>
            ) : (
              <motion.div
                key="left-arrow"
                initial={{ rotate: 90, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -90, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <ArrowLeft size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Suggested Quick Question Chips (Max 2 on Mobile, 3 on Desktop) */}
      {activePrompts.length > 0 && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            marginTop: 4,
            padding: "2px 0",
          }}
        >
          {(isMobile ? activePrompts.slice(0, 2) : activePrompts.slice(0, 3)).map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => remainingWishes > 0 && handleSend(suggestion)}
              disabled={remainingWishes <= 0}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: isMobile ? "4px 10px" : "6px 14px",
                borderRadius: 999,
                background: "#ffffff",
                border: "1.5px solid #18181b",
                boxShadow: "2px 2px 0px #18181b",
                fontSize: isMobile ? 11 : 12,
                fontWeight: 700,
                color: remainingWishes > 0 ? "#18181b" : "#94a3b8",
                cursor: remainingWishes > 0 ? "pointer" : "default",
                whiteSpace: "nowrap",
                maxWidth: isMobile ? "48%" : "none",
                overflow: "hidden",
                textOverflow: "ellipsis",
                transition: "all 0.15s ease",
              }}
            >
              💡 {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
