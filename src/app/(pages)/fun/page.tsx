"use client";

import React from "react";
import FadeIn from "@/components/fade-in";
import HobbyCardStack from "@/components/hobby-card-stack";

export default function FunPage() {
  const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    border: "2px solid #18181b",
    boxShadow: "6px 6px 0px #18181b",
    borderRadius: 20,
    padding: 22,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  };

  const cardTitle: React.CSSProperties = {
    fontWeight: 800,
    fontSize: 16,
    color: "#111",
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "fit-content",
    borderBottom: "2.5px solid #18181b",
    paddingBottom: 3,
  };

  const paragraph: React.CSSProperties = {
    fontSize: 14.5,
    color: "#1a1a1a",
    lineHeight: 1.7,
    margin: 0,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <FadeIn delay={0} direction="none" duration={0.5}>
        <div className="section-title" style={{ fontWeight: 800, fontSize: 18, color: "#111", margin: 0 }}>
          🌿 Hobby
        </div>
      </FadeIn>

      <FadeIn delay={0.08} direction="up">
        <p style={{ fontSize: 14.5, color: "#444", fontStyle: "italic", margin: 0, borderLeft: "3.5px solid #18181b", paddingLeft: 12 }}>
          &ldquo;Your actions create habits, habits create identity, identity is what people call their fate.&rdquo;
        </p>
      </FadeIn>

      {/* 1. Books & Philosophy Card */}
      <FadeIn delay={0.15} direction="up">
        <div style={cardStyle}>
          <div style={cardTitle}>📚 Reading &amp; Philosophy</div>
          <p style={paragraph}>
            I read a lot—mostly around <b>business, consumer psychology, marketing, and philosophy</b>. Authors like <b>Seth Godin</b>, <b>Ryan Holiday</b>, and <b>Brian Tracy</b> have had a big impact on how I think.
          </p>
          <p style={paragraph}>
            For me, reading isn&apos;t just passive theory. It&apos;s about finding practical concepts and immediately testing them out in real life and workflows. Learning how people think, what motivates decisions, and how great systems are built is what genuinely fascinates me.
          </p>
        </div>
      </FadeIn>

      {/* 2. Competitive Gaming Card */}
      <FadeIn delay={0.25} direction="up">
        <div style={cardStyle}>
          <div style={cardTitle}>⚔️ Strategy &amp; Competitive Gaming</div>
          <p style={paragraph}>
            When I game, I play <b>tactical and competitive games</b>. I enjoy the fast decision-making, resource management under pressure, and the strategy of out-positioning the other team.
          </p>
          <p style={paragraph}>
            It&apos;s great mental exercise: stay calm, read the board, adapt quickly to whatever comes up, and execute clean plays.
          </p>
        </div>
      </FadeIn>

      {/* 3. Personal & Cat Card */}
      <FadeIn delay={0.35} direction="up">
        <div style={cardStyle}>
          <div style={cardTitle}>🐾 Scar &amp; Downtime</div>
          <p style={paragraph}>
            When I step away from the keyboard, you&apos;ll usually find me hanging out with my cat, <b>Scar</b> 🐈 (who firmly believes he&apos;s the CEO of the house and I&apos;m just his assistant).
          </p>
          <p style={paragraph}>
            I also enjoy watching <b>anime</b> 🎌 and taking <b>long walks</b> 🚶‍♂️ to disconnect, reset, and let new workflow ideas connect in the background.
          </p>
          
          <button
            onClick={() => import("canvas-confetti").then((m) => m.default({ particleCount: 100, spread: 80 }))}
            style={{
              alignSelf: "flex-start",
              marginTop: 4,
              padding: "8px 18px",
              borderRadius: 12,
              background: "#18181b",
              color: "#fff",
              border: "2px solid #18181b",
              boxShadow: "3px 3px 0px #000",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              transition: "transform 0.15s ease",
            }}
          >
            Fire Confetti 🎉
          </button>
        </div>
      </FadeIn>

      {/* 4. Interactive Hobby Image Card Stack */}
      <FadeIn delay={0.45} direction="up">
        <HobbyCardStack />
      </FadeIn>
    </div>
  );
}
