"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Home as HomeIcon, ArrowLeft, Download, Sparkles } from "lucide-react";
import { TABS } from "@/lib/data";

import { TextRoll } from "@/components/text-roll";
import { VercelTooltipNav } from "@/components/vercel-tooltip-nav";
import { ProgressiveBlur } from "@/components/progressive-blur";

const MotionLink = motion.create(Link);
const MotionA = motion.a;

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  const [showQ, setShowQ] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const activeSection = pathname.split("/")[1] || "me";
  const contentRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ container: contentRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Check if current route is a subpage (e.g., /projects/moviedex)
  const isSubpage = pathname.split("/").length > 2 || (pathname.startsWith("/projects/") && pathname !== "/projects");

  return (
    <>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      .portfolio-content::-webkit-scrollbar { display: none; }
      .portfolio-content { -ms-overflow-style: none; scrollbar-width: none; scroll-behavior: smooth; overscroll-behavior-y: auto; -webkit-overflow-scrolling: touch; }
      .qb{user-select:none; transition:all .2s ease;}
      .qb:hover{border-color:#111!important;transform:translateY(-1px)}
      .home-btn{transition:all .2s ease; padding:7px 14px; border-radius:12px; color:#18181b; display:flex; align-items:center; gap:6px; font-size:13.5px; font-weight:700; text-decoration:none; cursor:pointer; background:#f4f4f5; border:1.5px solid #e4e4e7;}
      .home-btn:hover{background:#18181b; color:#fff; border-color:#18181b; transform:translateY(calc(-50% - 1px));}
      
      .resume-btn { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); transition: all 0.2s ease; background: #18181b; border: 1.5px solid #18181b; color: #fff; display: flex; align-items: center; gap: 6px; padding: 7px 16px; border-radius: 12px; text-decoration: none; font-size: 13.5px; font-weight: 800; box-shadow: 0 2px 8px rgba(0,0,0,0.12); }
      .resume-btn:hover { background: #000; color: #fff; transform: translateY(calc(-50% - 1px)); box-shadow: 0 4px 14px rgba(0,0,0,0.2); }

      .flip-card { background-color: transparent; perspective: 1000px; height: 130px; }
      .flip-card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.6s; transform-style: preserve-3d; }
      .flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
      .flip-card-front, .flip-card-back { position: absolute; top: 0; left: 0; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 16px; padding: 20px; box-sizing: border-box; }
      .flip-card-front { background: #fafafa; border: 1px solid #eee; display:flex; flex-direction:column; justify-content:space-between; }
      .flip-card-back { background: #111; color: white; transform: rotateY(180deg); display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; }
      
      .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
      @media (max-width: 600px) { .projects-grid { grid-template-columns: 1fr; } }
      @media (min-width: 1440px) { .projects-grid { grid-template-columns: repeat(3, 1fr); } }

      .contact-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
      @media (max-width: 600px) { .contact-grid { grid-template-columns: 1fr; } }

      .contact-card { transition: all 0.3s ease; }
      .contact-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); background: #fff !important; }
      
      .contact-card .icon-box { transition: all 0.3s ease; }
      .contact-title { color: #111; transition: color 0.3s ease; }

      .c-email:hover { background: #f97316 !important; color: #fff !important; }
      .c-email:hover .icon-box { background: rgba(255,255,255,0.2) !important; color: #fff !important; }
      .c-email:hover .subtitle, .c-email:hover .contact-title { color: #fff !important; }
      
      .c-linkedin:hover { background: #2563eb !important; color: #fff !important; }
      .c-linkedin:hover .icon-box { background: rgba(255,255,255,0.2) !important; color: #fff !important; }
      .c-linkedin:hover .subtitle, .c-linkedin:hover .contact-title { color: #fff !important; }
      
      .c-github:hover { background: #111 !important; color: #fff !important; }
      .c-github:hover .icon-box { background: rgba(255,255,255,0.2) !important; color: #fff !important; }
      .c-github:hover .subtitle, .c-github:hover .contact-title { color: #fff !important; }

      .c-leetcode:hover { background: #d97706 !important; color: #fff !important; }
      .c-leetcode:hover .icon-box { background: rgba(255,255,255,0.2) !important; color: #fff !important; }
      .c-leetcode:hover .subtitle, .c-leetcode:hover .contact-title { color: #fff !important; }

      .dl-btn { transition: all 0.3s ease; background: #111; color: #fff; }
      .dl-btn:hover { background: #eab308 !important; color: #111 !important; transform: translateY(-2px); box-shadow: 0 4px 15px rgba(234,179,8,0.4); }

      .github-btn { background: rgba(255,255,255,0.15); transition: background 0.2s; }
      .github-btn:hover { background: rgba(255,255,255,0.25); }

      .navbar-avatar { width: 34px; height: 34px; transition: all 0.2s ease; }

      /* Responsive: Laptop screens */
      @media (min-width: 1024px) {
        .portfolio-shell { max-width: 920px !important; }
        .portfolio-content { padding: 24px 36px !important; font-size: 15.5px !important; }
        .portfolio-content p, .portfolio-content .section-para { font-size: 15.5px !important; line-height: 1.75 !important; }
        .portfolio-content .section-title { font-size: 17px !important; }
        .home-btn { padding: 8px 16px !important; font-size: 14px !important; left: 16px !important; }
        .resume-btn { padding: 8px 18px !important; font-size: 14px !important; right: 16px !important; }
        .navbar-avatar { width: 36px !important; height: 36px !important; }
      }

      /* Responsive: Large desktop */
      @media (min-width: 1440px) {
        .portfolio-shell { max-width: 1040px !important; }
        .portfolio-content { padding: 28px 44px !important; font-size: 16.5px !important; }
        .portfolio-content p, .portfolio-content .section-para { font-size: 16.5px !important; line-height: 1.8 !important; }
        .portfolio-content .section-title { font-size: 18px !important; }
        .home-btn { padding: 9px 18px !important; font-size: 14.5px !important; left: 20px !important; }
        .resume-btn { padding: 9px 20px !important; font-size: 14.5px !important; right: 20px !important; }
        .navbar-avatar { width: 40px !important; height: 40px !important; }
      }

      /* Responsive: Small screens */
      @media (max-width: 640px) {
        .portfolio-shell { border-radius: 0 !important; height: 100vh !important; }
        .portfolio-content { padding: 16px 18px !important; font-size: 13.5px !important; }
        .home-btn { left: 10px !important; padding: 6px 12px !important; font-size: 12.5px !important; gap: 5px !important; }
        .resume-btn { right: 10px !important; padding: 6px 12px !important; font-size: 12.5px !important; gap: 5px !important; }
      }
      `}</style>
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fafafa", fontFamily: "'Inter',-apple-system,sans-serif", padding: "1rem" }}>
        <div className="portfolio-shell" style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: 920, height: "92vh", background: "#fff", borderRadius: 24, boxShadow: "0 8px 60px rgba(0,0,0,.08)", overflow: "hidden", border: "1px solid rgba(0,0,0,.06)", position: "relative" }}>
          {/* Scroll Progress Bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "transparent", zIndex: 100 }}>
            <motion.div style={{ height: "100%", background: "linear-gradient(90deg, #3b82f6, #10b981)", scaleX, transformOrigin: "0%" }} />
          </div>
          {/* Header - Enlarged, Prominent & Spacious */}
          <header style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 20px", borderBottom: "1.5px solid #eaeaea", background: "#fff", flexShrink: 0, position: "relative", minHeight: 64 }}>
            {/* Dynamic Home vs Back button */}
            {isSubpage ? (
              <button 
                onClick={() => router.back()} 
                className="home-btn" 
                style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}
              >
                <ArrowLeft size={17} /> <TextRoll>Back</TextRoll>
              </button>
            ) : (
              <MotionLink href="/" initial="initial" whileHover="hovered" className="home-btn" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}>
                <HomeIcon size={17} /> <TextRoll>Home</TextRoll>
              </MotionLink>
            )}

            {/* Clean Header Avatar / Title */}
            <div ref={avatarRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <span style={{ fontWeight: 900, fontSize: 16, color: "#111", letterSpacing: "-0.02em" }}>Anbu</span>
              <span style={{ fontSize: 10.5, color: "#16a34a", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", display: "inline-block", boxShadow: "0 0 5px rgba(22,163,74,0.7)" }} /> ACTIVE
              </span>
            </div>

            {/* Connect Button */}
            <MotionLink href="/contact" initial="initial" whileHover="hovered" className="resume-btn">
              <Sparkles size={16} color="#f59e0b" /> <TextRoll>Connect</TextRoll>
            </MotionLink>
          </header>
          {/* Page Content */}
          <div ref={contentRef} className="portfolio-content" style={{ flex: 1, overflowY: "auto", padding: "24px 32px", display: "flex", flexDirection: "column" }}>
            <div style={{ background: "#fff", color: "#1f2937", padding: "0", fontSize: 15, lineHeight: 1.6, animation: "slideUp .3s ease" }}>
              {children}
            </div>
          </div>

          {/* Footer with Vercel Tooltip Nav */}
          <footer style={{ padding: "10px 16px 14px", borderTop: "1px solid #f0f0f0", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", cursor: "pointer", display: "flex", alignItems: "center", gap: 3, userSelect: "none" }} onClick={() => setShowQ(!showQ)}>
              {showQ ? "Hide quick sections" : "Show quick sections"} {showQ ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </div>
            {showQ && (
              <div style={{ padding: "4px 0" }}>
                <VercelTooltipNav activeSection={activeSection} />
              </div>
            )}
          </footer>
        </div>
      </div>
    </>
  );
}
