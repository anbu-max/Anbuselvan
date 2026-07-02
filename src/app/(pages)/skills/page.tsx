import React from "react";
import { CheckCircle2 } from "lucide-react";
import { SKILL_GROUPS, Tag } from "@/lib/data";

export default function SkillsPage() {
  return (
    <div>
      <div style={{ fontWeight: 700, fontSize: 15, color: "#111", marginBottom: 12 }}>Skills & Expertise</div>
      {SKILL_GROUPS.map((g, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 12, color: "#333", marginBottom: 8 }}>{g.icon} {g.label}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{g.items.map((s, j) => <Tag key={j} t={s.name} icon={s.icon} />)}</div>
        </div>
      ))}
      <div style={{ marginTop: 24, padding: 16, borderRadius: 12, background: "#fef3c7", border: "1px solid #fde68a", color: "#b45309", fontSize: 14, fontWeight: 600, textAlign: "center" }}>
        I'd love to help you with your next project and automate your business workflows!
      </div>
    </div>
  );
}
