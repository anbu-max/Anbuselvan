import React from "react";
import { Github } from "lucide-react";
import { PROJECTS, Tag } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <div>
      <div style={{ fontWeight: 700, fontSize: 15, color: "#111", marginBottom: 12 }}>My Projects</div>
      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <div key={i} className="flip-card" style={{ height: "auto", aspectRatio: "1/1" }}>
            <div className="flip-card-inner">
              {/* Front of Card: Image and Title */}
              <div className="flip-card-front" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
                <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 16px 16px", background: "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.6) 60%, transparent)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <span style={{ fontWeight: 800, fontSize: 18, color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.5)", marginBottom: 4 }}>{p.title}</span>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.9)", margin: 0, lineHeight: 1.4 }}>{p.desc}</p>
                </div>
              </div>
              
              {/* Back of Card: Techstack and Github */}
              <div className="flip-card-back" style={{ padding: 20 }}>
                <div style={{ fontWeight: 800, fontSize: 18, color: "#fff", marginBottom: 12 }}>{p.title}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 16 }}>
                  {p.tags.map((t, j) => (
                    <span key={j} style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 11, fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
                {p.github !== "#" && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="github-btn" style={{ color: "#fff", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, textDecoration: "none", padding: "8px 16px", borderRadius: 20 }}>
                    <Github size={16} /> GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, padding: 24, borderRadius: 16, background: "#fafafa", border: "1px solid #eee", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: "#111" }}>These are some of my projects.</div>
        <div style={{ fontSize: 14, color: "#666" }}>Do you have a project in mind? Let's build it together!</div>
        <a href="/contact" className="dl-btn" style={{ marginTop: 4, display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 999, textDecoration: "none", fontSize: 13, fontWeight: 700 }}>
          Contact Me
        </a>
      </div>
    </div>
  );
}
