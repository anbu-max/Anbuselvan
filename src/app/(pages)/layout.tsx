"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp, Home as HomeIcon } from "lucide-react";
import { TABS } from "@/lib/data";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  const [showQ, setShowQ] = useState(true);
  const pathname = usePathname();
  const activeSection = pathname.replace("/", "") || "me";

  return (
    <>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      .qb{user-select:none; transition:all .2s ease;}
      .qb:hover{border-color:#111!important;transform:translateY(-1px)}
      .home-btn{transition:all .2s ease; padding:6px 10px; border-radius:12px; color:#888; display:flex; align-items:center; gap:4px; font-size:12px; font-weight:600; text-decoration:none; cursor:pointer;}
      .home-btn:hover{background:#111; color:#fff; transform:translateY(-1px);}
      
      .flip-card { background-color: transparent; perspective: 1000px; height: 130px; }
      .flip-card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.6s; transform-style: preserve-3d; }
      .flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
      .flip-card-front, .flip-card-back { position: absolute; top: 0; left: 0; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 16px; padding: 20px; box-sizing: border-box; }
      .flip-card-front { background: #fafafa; border: 1px solid #eee; display:flex; flex-direction:column; justify-content:space-between; }
      .flip-card-back { background: #111; color: white; transform: rotateY(180deg); display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; }
      
      .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
      @media (max-width: 600px) { .projects-grid { grid-template-columns: 1fr; } }

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
      `}</style>
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fafafa", fontFamily: "'Inter',-apple-system,sans-serif", padding: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: 780, height: "92vh", background: "#fff", borderRadius: 24, boxShadow: "0 8px 60px rgba(0,0,0,.08)", overflow: "hidden", border: "1px solid rgba(0,0,0,.06)" }}>
          {/* Header */}
          <header style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "14px 16px 10px", borderBottom: "1px solid #f0f0f0", background: "#fff", flexShrink: 0, position: "relative" }}>
            <Link href="/" className="home-btn" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}><HomeIcon size={16} /> Home</Link>
            <img src="/img/avatar.png" alt="Anbu Selvan" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid #fff", boxShadow: "0 2px 8px rgba(0,0,0,.1)" }} />
            <span style={{ fontWeight: 700, fontSize: 14, color: "#111", marginTop: 3 }}>Anbu Selvan</span>
            <span style={{ fontSize: 11, color: "#22c55e", fontWeight: 600, display: "flex", alignItems: "center", gap: 4, marginTop: 1 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} /> Active Now</span>
          </header>
          {/* Page Content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px", display: "flex", flexDirection: "column" }}>
            <div style={{ background: "#fff", color: "#1f2937", padding: "0", fontSize: 14, lineHeight: 1.55, animation: "slideUp .3s ease" }}>
              {children}
            </div>
          </div>
          {/* Footer */}
          <footer style={{ padding: "10px 16px 14px", borderTop: "1px solid #f0f0f0", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", cursor: "pointer", display: "flex", alignItems: "center", gap: 3, userSelect: "none" }} onClick={() => setShowQ(!showQ)}>
              {showQ ? "Hide quick sections" : "Show quick sections"} {showQ ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </div>
            {showQ && (
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, padding: "2px 0" }}>
                {TABS.map(tab => (
                  <Link key={tab.key} href={tab.path} className="qb" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 999, border: "1px solid #e5e7eb", background: activeSection === tab.key ? "#f3f4f6" : "#fff", fontSize: 12, fontWeight: 600, color: "#374151", cursor: "pointer" }}>
                    <span style={{ color: tab.color, display: "flex", alignItems: "center" }}>{tab.icon}</span> {tab.label}
                  </Link>
                ))}
              </div>
            )}
          </footer>
        </div>
      </div>
    </>
  );
}
