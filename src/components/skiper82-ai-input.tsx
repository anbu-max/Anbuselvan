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

// Clean inline Markdown parser & renderer for bolding, links, subheaders, lists and paragraph breaks
function parseInlineMarkdown(text: string): React.ReactNode[] {
  // Strip raw redundant link patterns like `[/contact](/contact)` or `(/contact)` or phone numbers in raw text
  let cleaned = text
    .replace(/\[\s*\/contact\s*\]\(\s*\/contact\s*\)/gi, "the Connect page")
    .replace(/\(\/contact\)/gi, "")
    .replace(/\(\+91\s*9361952703\)/gi, "");

  // Match Markdown links [label](url) and **bold** / *italic*
  const parts = cleaned.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return parts.map((part, idx) => {
    // Markdown link [label](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const label = linkMatch[1];
      const url = linkMatch[2];
      return (
        <Link
          key={idx}
          href={url}
          style={{
            color: "#0284c7",
            fontWeight: 700,
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          {label}
        </Link>
      );
    }

    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={idx} style={{ fontWeight: 800, color: "#09090b" }}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={idx}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function FormattedMarkdownText({ content }: { content: string }) {
  const cleanContent = content.replace(/\r\n/g, "\n").trim();
  const blocks = cleanContent.split(/\n{2,}/);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, lineHeight: 1.6, fontSize: 13.5, color: "#18181b" }}>
      {blocks.map((block, bIdx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        if (trimmed === "***" || trimmed === "---" || trimmed === "___") {
          return <div key={bIdx} style={{ height: 1, background: "#e2e8f0", margin: "4px 0" }} />;
        }

        if (trimmed.startsWith("#")) {
          const headerText = trimmed.replace(/^#+\s*/, "");
          return (
            <div key={bIdx} style={{ fontWeight: 800, fontSize: 14, color: "#09090b", marginTop: 2 }}>
              {parseInlineMarkdown(headerText)}
            </div>
          );
        }

        const lines = trimmed.split("\n");
        const isList = lines.length > 1 && lines.every(l => /^[*\-•\d\.]+\s+/.test(l.trim()));

        if (isList) {
          return (
            <ul key={bIdx} style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 4 }}>
              {lines.map((l, lIdx) => {
                const cleanLine = l.replace(/^[*\-•\d\.]+\s+/, "");
                return <li key={lIdx}>{parseInlineMarkdown(cleanLine)}</li>;
              })}
            </ul>
          );
        }

        return (
          <p key={bIdx} style={{ margin: 0 }}>
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {lIdx > 0 && <br />}
                {parseInlineMarkdown(line)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

// Concise 1-line question prompts designed to sit side-by-side in a horizontal row
const ALL_QUESTION_PROMPTS = [
  "Who is Anbu Selvan?",
  "Why work with Anbu?",
  "Anbu's top skills",
  "Top 3 Automation Projects",
  "Why choose Anbu?",
  "Multi-Modal WhatsApp AI Agent",
  "24/7 AI Voice Receptionist",
  "Anbu's work ethic & mindset",
  "How to get in touch with Anbu",
];

// Helper to get stored wish count from localStorage or cookies (v5 key to refresh limit)
function getStoredWishCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const localVal = localStorage.getItem("anbu_ai_wishes_v5");
    if (localVal !== null) return parseInt(localVal, 10) || 0;

    const match = document.cookie.match(/(?:^|; )anbu_ai_wishes_v5=([^;]*)/);
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
    localStorage.setItem("anbu_ai_wishes_v5", count.toString());
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `anbu_ai_wishes_v5=${count}; expires=${expires}; path=/; SameSite=Lax`;
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

// Call secure Server Route Handler (/api/chat) with automatic fallback to smart JSON answering
async function queryGeminiApi(
  userPrompt: string,
  isFinalWish: boolean = false
): Promise<{ text: string; links?: { label: string; url: string }[] } | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // Strict 10-second timeout

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userPrompt, isFinalWish }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const data = await res.json();
    if (data.error || !data.text) return null;

    return {
      text: data.text,
      links: data.links,
    };
  } catch {
    return null;
  }
}

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isThinking) return;

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

    const thoughtTime = 1; // Optimized ultra-fast 1s thought timing
    const isFinal = remainingWishes === 1; // Final wish prompt on last try

    // First attempt Live AI API call (OpenAI via /api/chat)
    const geminiRes = await queryGeminiApi(query, isFinal);

    if (geminiRes) {
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: geminiRes.text,
        thought: `1. Analyzing prompt intent: "${query.length > 45 ? query.slice(0, 45) + "..." : query}"\n2. Evaluated Anbu's technical stack, relentless execution mindset, and high-status qualification CTA.\n3. Formulated structured response with action links.`,
        thoughtTime,
        links: geminiRes.links,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
      return;
    }

    // Fallback: ONLY triggers if live AI query fails or takes longer than 10 seconds
    setTimeout(() => {
      let aiText = "I am currently experiencing high traffic or a temporary network issue. Please reach out to Anbu directly on the Connect page for any inquiries!";
      let links = [
        { label: "🤝 Connect with Anbu", url: "/contact" }
      ];
      let thoughtSteps = "1. Attempted to connect to AI API.\n2. Connection timed out or failed.\n3. Falling back to direct contact recommendation.";

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
    }, 200);
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
          background: remainingWishes > 0 ? "#f0fdf4" : "#fee2e2",
          border: `1.5px solid ${remainingWishes > 0 ? "#16a34a" : "#dc2626"}`,
          boxShadow: "2.5px 2.5px 0px #18181b",
          fontSize: 12,
          fontWeight: 800,
          color: remainingWishes > 0 ? "#15803d" : "#991b1b",
        }}
      >
        <Sparkles size={14} />
        {remainingWishes > 0 ? `⚡ ${remainingWishes} Free AI Chats Remaining` : "⚡ Limit Reached - Contact Anbu to Talk"}
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

                    {/* Clean Formatted Markdown Text */}
                    <FormattedMarkdownText content={msg.text} />

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
          disabled={isThinking}
          placeholder="Ask AI anything about Anbu's projects, skills..."
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
          disabled={!input.trim() || isThinking}
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: input.trim() ? "#18181b" : "#f1f5f9",
            color: input.trim() ? "#ffffff" : "#94a3b8",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: input.trim() ? "pointer" : "default",
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
              onClick={() => handleSend(suggestion)}
              disabled={isThinking}
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
                color: "#18181b",
                cursor: isThinking ? "default" : "pointer",
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
