"use client";

import React, { useState } from "react";
import { Mail, Linkedin, Github, Download, Send, PhoneCall, Sparkles, HelpCircle } from "lucide-react";
import FadeIn from "@/components/fade-in";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    
    // Fire confetti
    import("canvas-confetti").then(m => m.default({ particleCount: 100, spread: 80 }));

    const subject = encodeURIComponent(`Free Demo Request from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone/WhatsApp: ${formData.phone}\n\nMessage / Demo Request:\n${formData.message}`);
    window.location.href = `mailto:anbuselvandzz@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleDownload = () => {
    import("canvas-confetti").then(m => m.default({ particleCount: 100, spread: 80 }));
  };

  const contacts = [
    { href: "mailto:anbuselvandzz@gmail.com", icon: <Mail size={18} />, bg: "#fef3c7", c: "#d97706", l: "Email", s: "anbuselvandzz@gmail.com" },
    { href: "https://wa.me/919361952703", icon: <PhoneCall size={18} />, bg: "#dcfce7", c: "#15803d", l: "WhatsApp / Call", s: "+91 9361952703" },
    { href: "https://www.linkedin.com/in/anbuselvan01/", icon: <Linkedin size={18} />, bg: "#dbeafe", c: "#2563eb", l: "LinkedIn", s: "anbuselvan01" },
    { href: "https://github.com/anbu-max", icon: <Github size={18} />, bg: "#f1f5f9", c: "#0f172a", l: "GitHub", s: "anbu-max" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <FadeIn delay={0} direction="none" duration={0.5}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 8 }}>
            <div className="section-title" style={{ fontWeight: 800, fontSize: 18, color: "#111", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
              🤝 Let&apos;s Connect
            </div>

            {/* Resume Button */}
            <a onClick={handleDownload} href="/resume/anbu-selvan-resume.pdf" download="Anbu_Selvan_Resume.pdf" className="dl-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 999, textDecoration: "none", fontSize: 12.5, fontWeight: 800, border: "2px solid #18181b", boxShadow: "3px 3px 0px #18181b", background: "#ffffff", color: "#18181b" }}>
              <Download size={15} /> Download Resume
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} direction="up">
          <p style={{ fontSize: 14.5, color: "#1a1a1a", lineHeight: 1.6, marginBottom: 16, fontWeight: 500 }}>
            Want to <b>power your business with AI</b> and <b>automate repetitive tasks</b>? I&apos;m always open to building custom AI agents, web applications, or discussing partnership opportunities. Reach out to me directly!
          </p>
        </FadeIn>

        {/* Contact Method Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {contacts.map((c, i) => (
            <FadeIn key={i} delay={0.15 + i * 0.08} direction="up">
              <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, borderRadius: 16, background: "#ffffff", border: "2px solid #18181b", boxShadow: "4px 4px 0px #18181b", textDecoration: "none", color: "inherit", transition: "transform 0.15s ease" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: c.bg, color: c.c, border: "1.5px solid #18181b", flexShrink: 0 }}>{c.icon}</div>
                <div style={{ minWidth: 0 }}><div style={{ fontWeight: 800, fontSize: 13.5, marginBottom: 2, color: "#111" }}>{c.l}</div><div style={{ fontSize: 11, color: "#555", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.s}</div></div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Book Free Demo Form Card */}
      <FadeIn delay={0.3} direction="up">
        <div style={{ background: "#ffffff", border: "2px solid #18181b", boxShadow: "6px 6px 0px #18181b", borderRadius: 24, padding: 22 }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: "#111", marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkles size={18} color="#f59e0b" /> Book your free demo or message me
          </div>
          <p style={{ fontSize: 13.5, color: "#444", marginBottom: 14, lineHeight: 1.5, fontWeight: 500 }}>
            Tell me what kind of demo or AI automation you want, and I will build it for you!
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name *" required style={{ flex: "1 1 180px", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #18181b", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email *" required style={{ flex: "1 1 180px", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #18181b", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone / WhatsApp Number *" required style={{ flex: "1 1 180px", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #18181b", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
            </div>

            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="What kind of demo or AI automation do you want built? *" required rows={4} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #18181b", fontSize: 13, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />

            {/* Workflow Audit Helper Note */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 12px", borderRadius: 12, background: "#f8fafc", border: "1px dashed #94a3b8", fontSize: 12, color: "#475569", lineHeight: 1.5 }}>
              <HelpCircle size={16} color="#3b82f6" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <b>Don&apos;t know what to automate?</b> No problem! Tell me about your daily business processes, and I&apos;ll audit your workflows, suggest high-ROI automations, and build a custom demo for you.
              </div>
            </div>

            <button type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 20px", borderRadius: 12, background: "#18181b", color: "#fff", border: "2px solid #18181b", boxShadow: "3px 3px 0px #000", fontSize: 13.5, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
              <Send size={14} /> Request Free Demo
            </button>
          </form>
        </div>
      </FadeIn>
    </div>
  );
}
