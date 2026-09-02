"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import FluidSimulation from "@/components/fluid-simulation";
import { VercelTooltipNav } from "@/components/vercel-tooltip-nav";

import { Skiper82AiInput } from "@/components/skiper82-ai-input";

const useLoop = (delay = 2400) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, delay);
    return () => clearInterval(interval);
  }, [delay]);

  return { key };
};

const ROLE_COLORS = ["#f97316", "#38bdf8", "#a855f7", "#22c55e", "#ef4444"];

export default function Home() {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const avatarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { key: loopKey } = useLoop(2500);

  const roles = useMemo(
    () => [
      "full-stack developer",
      "automation specialist",
      "software engineer",
      "AI guy",
      "AI SEO guy",
    ],
    []
  );

  const currentRole = useMemo(() => {
    return roles[loopKey % roles.length];
  }, [roles, loopKey]);

  const currentColor = useMemo(() => {
    return ROLE_COLORS[loopKey % ROLE_COLORS.length];
  }, [loopKey]);

  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 3D tilt
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = avatarRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const nx = (e.clientX - cx) / (window.innerWidth / 2);
        const ny = (e.clientY - cy) / (window.innerHeight / 2);
        const max = 25;
        setTilt({ ry: Math.max(-max, Math.min(max, nx * max)), rx: Math.max(-max, Math.min(max, -ny * max)) });
      }
    };
    
    const leave = () => setTilt({ rx: 0, ry: 0 });
    window.addEventListener("mousemove", handler);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => { 
      window.removeEventListener("mousemove", handler); 
      document.documentElement.removeEventListener("mouseleave", leave); 
    };
  }, []);

  return (
    <>
      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      .center-content { pointer-events: none; }
      .mobile-scroll-capture { pointer-events: none; }
      @media (max-width: 768px) {
        .mobile-scroll-capture { pointer-events: auto !important; }
      }`}</style>
      <div ref={containerRef} style={{ position: "relative", minHeight: "100vh", background: "#fafafa", fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", overflowX: "hidden", overflowY: "auto" }}>
        {/* Scroll Progress Bar */}
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 4, background: "transparent", zIndex: 100 }}>
          <motion.div style={{ height: "100%", background: "linear-gradient(90deg, #3b82f6, #10b981)", scaleX, transformOrigin: "0%" }} />
        </div>
        <FluidSimulation />

        {/* Faint watermark */}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "center", pointerEvents: "none", zIndex: 1, overflow: "hidden", userSelect: "none" }}>
          <span style={{ fontSize: "12rem", fontWeight: 900, lineHeight: 1, marginBottom: "-2rem", background: "linear-gradient(to bottom, rgba(0,0,0,0.02), rgba(0,0,0,0))", WebkitBackgroundClip: "text", color: "transparent" }}>ANBU</span>
        </div>

        {/* Center content */}
        <div className="center-content" style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "3rem 1.5rem", maxWidth: 900, margin: "0 auto", userSelect: "none" }}>
          {/* Headings */}
          <h2 className="mobile-scroll-capture" style={{ fontSize: 18, fontWeight: 500, color: "#6b7280", marginBottom: 4, textAlign: "center" }}>Hey, I&apos;m</h2>
          <h1 className="mobile-scroll-capture" style={{ 
            fontSize: 72, 
            fontWeight: 900, 
            letterSpacing: "-0.04em", 
            lineHeight: 1.1, 
            background: "linear-gradient(135deg, #000, #4b5563)", 
            WebkitBackgroundClip: "text", 
            color: "transparent", 
            marginBottom: 12, 
            textAlign: "center", 
            textTransform: "uppercase",
            transition: "transform .15s ease-out",
            transform: `translate(${tilt.ry * 0.4}px, ${-tilt.rx * 0.4}px)` 
          }}>Anbu Selvan</h1>
          
          {/* Subtitle with static 'Your fellow' & dynamic looping role with animated doodle underline */}
          <div
            className="mobile-scroll-capture"
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: "#6b7280",
              fontStyle: "italic",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              margin: "0 0 32px 0",
              padding: "0 16px",
              minHeight: 48,
              width: "100%",
              overflow: "visible",
            }}
          >
            <span>Your fellow</span>
            <div style={{ position: "relative", minHeight: 48, display: "inline-flex", alignItems: "center", overflow: "visible" }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={loopKey}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  style={{ display: "inline-block", color: "#111", fontWeight: 700, whiteSpace: "nowrap", position: "relative", paddingBottom: 4 }}
                >
                  {currentRole}

                  {/* Animated Notion-style Doodle Underline */}
                  <motion.svg
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                    style={{ position: "absolute", left: 0, bottom: -2, width: "100%", height: 8, overflow: "visible", pointerEvents: "none" }}
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 15 Q 25 5, 50 15 T 100 15"
                      fill="none"
                      stroke={currentColor}
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Avatar with 3D tilt */}
          <div ref={avatarRef} className="mobile-scroll-capture" style={{ width: 200, height: 200, marginBottom: 20, transformStyle: "preserve-3d", transition: "transform .15s ease-out", transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}>
            <img src="/img/MainAvt.png" alt="Anbu Selvan" style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 16px 32px rgba(0,0,0,.15))", pointerEvents: "none", userSelect: "none" }} />
          </div>
          
          {/* Skiper82 AI Input Bar & Vercel Tooltip Dock */}
          <div style={{ pointerEvents: "auto", marginTop: 12, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <Skiper82AiInput />
            <VercelTooltipNav />
          </div>
        </div>
      </div>
    </>
  );
}
