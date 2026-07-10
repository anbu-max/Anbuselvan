"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FluidSimulation from "@/components/fluid-simulation";
import { TABS } from "@/lib/data";

export default function Home() {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const avatarRef = useRef<HTMLDivElement>(null);

  // 3D tilt and manual canvas event forwarding
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // Tilt logic
      const el = avatarRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const nx = (e.clientX - cx) / (window.innerWidth / 2);
        const ny = (e.clientY - cy) / (window.innerHeight / 2);
        const max = 25; // Increased from 18 for a more pronounced head tilt
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
      .tabcard{transition:all .2s ease; user-select:none; text-decoration:none;} 
      .tabcard:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(0,0,0,.06);border-color:rgba(0,0,0,.12);background:rgba(255,255,255,0.6)!important;}
      .tabs-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; width: 100%; max-width: 680px; }
      .center-content { pointer-events: none; }
      .mobile-scroll-capture { pointer-events: none; }
      @media (max-width: 768px) {
        .tabs-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .mobile-scroll-capture { pointer-events: auto !important; }
      }
      @media (max-width: 480px) {
        .tabs-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
      }`}</style>
      <div style={{ position: "relative", minHeight: "100vh", background: "#fafafa", fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", overflowX: "hidden", overflowY: "auto" }}>
        <FluidSimulation />
        {/* Faint watermark */}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "center", pointerEvents: "none", zIndex: 1, overflow: "hidden", userSelect: "none" }}>
          <span style={{ fontSize: "12rem", fontWeight: 900, lineHeight: 1, marginBottom: "-2rem", background: "linear-gradient(to bottom, rgba(0,0,0,0.02), rgba(0,0,0,0))", WebkitBackgroundClip: "text", color: "transparent" }}>ANBU</span>
        </div>
        {/* Center content */}
        <div className="center-content" style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "3rem 1.5rem", maxWidth: 900, margin: "0 auto", userSelect: "none" }}>
          {/* Headings on top of image */}
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
          <h3 className="mobile-scroll-capture" style={{ fontSize: 20, fontWeight: 500, color: "#6b7280", marginBottom: 32, textAlign: "center", fontStyle: "italic" }}>Your fellow neighbourhood engineer</h3>
          
          {/* Avatar with 3D tilt */}
          <div ref={avatarRef} className="mobile-scroll-capture" style={{ width: 200, height: 200, marginBottom: 20, transformStyle: "preserve-3d", transition: "transform .15s ease-out", transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}>
            <img src="/img/MainAvt.png" alt="Anbu Selvan" style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 16px 32px rgba(0,0,0,.15))", pointerEvents: "none", userSelect: "none" }} />
          </div>
          
          {/* Tab cards */}
          <div className="tabs-grid">
            {TABS.map(tab => (
              <Link key={tab.key} href={tab.path} className="tabcard" style={{ pointerEvents: "auto", background: "rgba(255,255,255,.4)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.5)", borderRadius: 20, padding: "20px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", boxShadow: "0 4px 15px rgba(0,0,0,.05)" }}>
                <span style={{ color: tab.color, display: "flex" }}>{tab.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#1f2937" }}>{tab.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
