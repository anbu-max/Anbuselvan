"use client";

import React from "react";
import { Mail, Linkedin, Github, Search, Download } from "lucide-react";
import FadeIn from "@/components/fade-in";

export default function ContactPage() {
  const contacts = [
    { href: "mailto:anbuselvan.devz@gmail.com", icon: <Mail size={16} />, bg: "#fef3c7", c: "#d97706", l: "Email", s: "anbuselvan.devz", cls: "c-email" },
    { href: "https://www.linkedin.com/in/anbuselvan01/", icon: <Linkedin size={16} />, bg: "#dbeafe", c: "#2563eb", l: "LinkedIn", s: "anbuselvan01", cls: "c-linkedin" },
    { href: "https://github.com/anbu-max", icon: <Github size={16} />, bg: "#f3f4f6", c: "#111", l: "GitHub", s: "anbu-max", cls: "c-github" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <FadeIn delay={0} direction="none" duration={0.5}>
          <div className="section-title" style={{ fontWeight: 700, fontSize: 15, color: "#111", marginBottom: 8 }}>Let&apos;s Connect</div>
        </FadeIn>
        <FadeIn delay={0.1} direction="up">
          <p style={{ fontSize: 14.5, color: "#1a1a1a", lineHeight: 1.6, marginBottom: 16 }}>
            Want to <b>power your business with AI</b> and <b>automate repetitive boring tasks</b>? I&apos;m always open to discussing <b>product design work</b> or <b>partnership opportunities</b>. Feel free to reach out to me!
          </p>
        </FadeIn>
        <div className="contact-grid">
          {contacts.map((c, i) => (
            <FadeIn key={i} delay={0.15 + i * 0.1} direction="up">
              <a href={c.href} target="_blank" rel="noopener noreferrer" className={`contact-card ${c.cls}`} style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, borderRadius: 16, background: "#fafafa", border: "1px solid #eee", textDecoration: "none", color: "inherit" }}>
                <div className="icon-box" style={{ width: 38, height: 38, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: c.bg, color: c.c }}>{c.icon}</div>
                <div><div className="contact-title" style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{c.l}</div><div className="subtitle" style={{ fontSize: 11, color: "#888", fontFamily: "monospace" }}>{c.s}</div></div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
      <FadeIn delay={0.5} direction="up">
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <a href="#" download className="dl-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 999, textDecoration: "none", fontSize: 14, fontWeight: 700 }}><Download size={16} /> Download Resume</a>
        </div>
      </FadeIn>
    </div>
  );
}
