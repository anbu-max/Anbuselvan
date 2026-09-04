"use client";

import React from "react";
import FadeIn from "@/components/fade-in";
import { Skiper80Showcase } from "@/components/skiper80-showcase";

export default function ProjectsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <FadeIn delay={0} direction="none" duration={0.5}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div className="section-title" style={{ fontWeight: 800, fontSize: 18, color: "#111", margin: 0 }}>
            Featured Projects
          </div>
        </div>
      </FadeIn>

      {/* Skiper80 Showcase Component */}
      <FadeIn delay={0.1} direction="up">
        <Skiper80Showcase />
      </FadeIn>

      <FadeIn delay={0.3} direction="up">
        <div style={{ marginTop: 24, padding: 24, borderRadius: 16, background: "#fafafa", border: "1px solid #eee", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div className="section-para" style={{ fontWeight: 700, fontSize: 16, color: "#111" }}>These are some of my featured projects.</div>
          <div className="section-para" style={{ fontSize: 14.5, color: "#1a1a1a" }}>Do you have an automation or custom software project in mind? <b>Let&apos;s build it together!</b></div>
          <a href="/contact" className="dl-btn" style={{ marginTop: 4, display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 999, textDecoration: "none", fontSize: 13, fontWeight: 700 }}>
            Contact Me
          </a>
        </div>
      </FadeIn>
    </div>
  );
}
