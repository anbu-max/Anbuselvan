"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { SKILL_GROUPS, Tag } from "@/lib/data";
import FadeIn from "@/components/fade-in";

export default function SkillsPage() {
  return (
    <div>
      <FadeIn delay={0} direction="none" duration={0.5}>
        <div className="section-title" style={{ fontWeight: 700, fontSize: 15, color: "#111", marginBottom: 12 }}>Skills &amp; Expertise</div>
      </FadeIn>
      {SKILL_GROUPS.map((g, i) => (
        <FadeIn key={i} delay={0.1 + i * 0.1} direction="up">
          <div style={{ marginBottom: 16 }}>
            <div className="section-para" style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 13, color: "#1a1a1a", marginBottom: 8 }}>{g.icon} {g.label}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{g.items.map((s, j) => <Tag key={j} t={s.name} icon={s.icon} />)}</div>
          </div>
        </FadeIn>
      ))}
      <FadeIn delay={0.15 + SKILL_GROUPS.length * 0.1} direction="up">
        <div className="section-para" style={{ marginTop: 24, padding: 16, borderRadius: 12, background: "#fef3c7", border: "1px solid #fde68a", color: "#b45309", fontSize: 14.5, fontWeight: 600, textAlign: "center" }}>
          I'd love to help you with your next project and <b>automate your business workflows</b>!
        </div>
      </FadeIn>
    </div>
  );
}
