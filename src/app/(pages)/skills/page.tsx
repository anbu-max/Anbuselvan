"use client";

import React from "react";
import FadeIn from "@/components/fade-in";
import { Skiper31SkillsShowcase } from "@/components/skiper31-skills-showcase";

export default function SkillsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <FadeIn delay={0} direction="none" duration={0.5}>
        <div className="section-title" style={{ fontWeight: 700, fontSize: 16, color: "#111", margin: 0 }}>
          Skills &amp; Tech Stack
        </div>
      </FadeIn>

      <FadeIn delay={0.1} direction="up">
        <Skiper31SkillsShowcase />
      </FadeIn>
    </div>
  );
}
