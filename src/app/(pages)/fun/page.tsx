"use client";

import React from "react";
import FadeIn from "@/components/fade-in";

export default function FunPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <FadeIn delay={0} direction="none" duration={0.5}>
        <div className="section-title" style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>Interests &amp; Fun</div>
      </FadeIn>

      <FadeIn delay={0.1} direction="up">
        <p style={{ fontSize: 14.5, color: "#1a1a1a", fontStyle: "italic", margin: 0 }}>"No matter what the world says, I just walk my own path." — <b>Roronoa Zoro</b></p>
      </FadeIn>

      {/* Beyond Coding */}
      <FadeIn delay={0.15} direction="up">
        <div style={{ marginTop: 4 }}>
          <div className="section-title" style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>🌿 Beyond Coding</div>
        </div>
      </FadeIn>
      <FadeIn delay={0.2} direction="up">
        <p style={{ fontSize: 14.5, color: "#1a1a1a", lineHeight: 1.7, margin: "0 0 10px 0" }}>
          When I take my hand off the mouse and step away from the keyboard, you&apos;ll probably find me playing with my cat, <b>Scar</b>. 🐈 He likes to remind me that I&apos;m living in <em>his</em> house, and, if we&apos;re being honest, I&apos;m probably just his human assistant.
        </p>
      </FadeIn>
      <FadeIn delay={0.25} direction="up">
        <p style={{ fontSize: 14.5, color: "#1a1a1a", lineHeight: 1.7, margin: "0 0 10px 0" }}>
          Outside of technology, I enjoy reading <b>non-fiction books</b> on <b>business</b>, <b>history</b>, <b>psychology</b>, and <b>self-improvement</b> because I believe becoming a <em>better engineer</em> starts with becoming a <em>better thinker</em>. 📚 I&apos;m equally fascinated by <b>entrepreneurship and marketing</b>, understanding how products grow, and how technology creates real value for people and businesses.
        </p>
      </FadeIn>
      <FadeIn delay={0.3} direction="up">
        <p style={{ fontSize: 14.5, color: "#1a1a1a", lineHeight: 1.7, margin: "0 0 10px 0" }}>
          I also enjoy going for <b>long walks</b>. 🚶‍♂️ They're often where my <em>best ideas</em> come from, whether it's solving a technical problem, refining a product idea, or simply clearing my mind before tackling the next challenge.
        </p>
      </FadeIn>
      <FadeIn delay={0.35} direction="up">
        <p style={{ fontSize: 14.5, color: "#1a1a1a", lineHeight: 1.7, margin: 0 }}>
          Above all, I try to <b>stay curious</b>. There&apos;s always another concept to learn, another tool to explore, and another problem worth solving. I&apos;m always <em>one project away</em> from learning something new. ✨
        </p>
      </FadeIn>

      <FadeIn delay={0.4} direction="up">
        <button onClick={() => import("canvas-confetti").then(m => m.default({ particleCount: 100, spread: 80 }))} style={{ alignSelf: "flex-start", marginTop: 8, padding: "8px 18px", borderRadius: 999, background: "linear-gradient(135deg,#ec4899,#f43f5e)", color: "#fff", border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Fire Confetti 🎉</button>
      </FadeIn>
    </div>
  );
}
