import React from "react";
import { Mail, Linkedin, Github, Search, Download } from "lucide-react";

export default function ContactPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#111", marginBottom: 8 }}>Let's Connect</div>
        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, marginBottom: 16 }}>
          I'm always open to discussing product design work or partnership opportunities. Feel free to reach out to me through any of the platforms below!
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[ { href: "mailto:anbuselvan.devz@gmail.com", icon: <Mail size={16} />, bg: "#fef3c7", c: "#d97706", l: "Email", s: "anbuselvan.devz", cls: "c-email" },
             { href: "https://www.linkedin.com/in/anbuselvan01/", icon: <Linkedin size={16} />, bg: "#dbeafe", c: "#2563eb", l: "LinkedIn", s: "anbuselvan01", cls: "c-linkedin" },
             { href: "https://github.com/anbu-max", icon: <Github size={16} />, bg: "#f3f4f6", c: "#111", l: "GitHub", s: "anbu-max", cls: "c-github" },
             { href: "https://leetcode.com/u/AnbuselvanA/", icon: <Search size={16} />, bg: "#fef3c7", c: "#d97706", l: "LeetCode", s: "AnbuselvanA", cls: "c-leetcode" },
          ].map((c, i) => (
            <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className={`contact-card ${c.cls}`} style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, borderRadius: 16, background: "#fafafa", border: "1px solid #eee", textDecoration: "none", color: "inherit" }}>
              <div className="icon-box" style={{ width: 38, height: 38, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: c.bg, color: c.c }}>{c.icon}</div>
              <div><div className="contact-title" style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{c.l}</div><div className="subtitle" style={{ fontSize: 11, color: "#888", fontFamily: "monospace" }}>{c.s}</div></div>
            </a>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <a href="#" download className="dl-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 999, textDecoration: "none", fontSize: 14, fontWeight: 700 }}><Download size={16} /> Download Resume</a>
      </div>
    </div>
  );
}
