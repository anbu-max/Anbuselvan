import React from "react";
import { Calendar, MapPin, Briefcase, BookOpen } from "lucide-react";

export default function MePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 12, borderBottom: "1px solid #f0f0f0" }}>
        <img src="/img/avatar.png" alt="" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>Anbu Selvan</div>
          <div style={{ fontSize: 11, color: "#888" }}>Software Developer</div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 999, background: "#ecfdf5", fontSize: 10, fontWeight: 700, color: "#059669", marginTop: 3 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#059669", display: "inline-block" }} /> Available
          </span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, fontSize: 13, marginBottom: 8 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}><MapPin size={16} color="#22c55e" /><div><div style={{ fontSize: 10, color: "#aaa", fontWeight: 600, textTransform: "uppercase" }}>Location</div><div style={{ color: "#333", fontWeight: 500 }}>Chennai, Tamil Nadu</div></div></div>
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#111", marginBottom: 4 }}>Automation & Software Developer</div>
        <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6, margin: 0 }}>
          I am a 2026 Computer Science graduate with hands-on, real-world experience in designing scalable web applications, robust REST APIs, and efficient workflow automations. I specialize in leveraging SQL databases and modern backend architectures to deliver seamless digital experiences and intelligent automation solutions tailored for businesses.
        </p>
      </div>
      <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#111", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}><BookOpen size={15} color="#3b82f6" /> Courses</div>
        {[ { date: "3 Months", title: "Java Course", place: "Qspiders" } ].map((t, i) => (
          <div key={i} style={{ position: "relative", paddingLeft: 18, borderLeft: "2px solid #e5e7eb", marginBottom: 14, paddingBottom: 2 }}>
            <div style={{ position: "absolute", left: -6, top: 4, width: 10, height: 10, borderRadius: "50%", background: "#3b82f6" }} />
            <div style={{ fontSize: 10, fontWeight: 700, color: "#2563eb", textTransform: "uppercase" }}>{t.date}</div>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#111" }}>{t.title}</div>
            <div style={{ fontSize: 11, color: "#999" }}>{t.place}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
