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
          🌿 Interests &amp; Beyond Code
        </div>
      </FadeIn>

      <FadeIn delay={0.08} direction="up">
        <p style={{ fontSize: 14.5, color: "#444", fontStyle: "italic", margin: 0, borderLeft: "3.5px solid #18181b", paddingLeft: 12 }}>
          &ldquo;As long as I am alive, there are infinite chances.&rdquo; — <b>Monkey D. Luffy</b>
        </p>
      </FadeIn>

      {/* 1. Books & Philosophy Card */}
      <FadeIn delay={0.15} direction="up">
        <div style={cardStyle}>
          <div style={cardTitle}>📚 The Book Obsession &amp; Philosophy</div>
          <p style={paragraph}>
            I am genuinely obsessed with <b>reading and collecting books</b>. People feed their bodies every day, but my mind has an insatiable hunger to learn something new that never stops. Whenever I earn money, my immediate thought is always: <i>&ldquo;Which book can I buy next?&rdquo;</i>
          </p>
          <p style={paragraph}>
            I collect, download, and devour books across <b>business, marketing, psychology, and especially philosophy</b>. Some of my favorite authors whose ideas have profoundly shaped my perspective include <b>Joseph Murphy</b>, <b>Seth Godin</b>, <b>Brian Tracy</b>, and <b>Ryan Holiday</b>. Every time I learn a powerful concept and successfully implement it into real life, that massive rush of dopamine hits—and I love that feeling.
          </p>
          <p style={paragraph}>
            I don&apos;t just believe in becoming a better engineer; I believe in becoming a <b>better person</b>. Building a stronger character, refining my personality, and relentlessly striving to create the best version of myself is what makes life truly fulfilling.
          </p>
        </div>
      </FadeIn>

      {/* 2. Competitive Gaming Card */}
      <FadeIn delay={0.25} direction="up">
        <div style={cardStyle}>
          <div style={cardTitle}>⚔️ Competitive Gaming &amp; Strategy</div>
          <p style={paragraph}>
            When I game, I gravitate strictly toward <b>high-stakes competitive games</b>. While story-driven games have their place, competitive pressure is what truly excites me. I love the intensity, the sharp cognitive focus required, and the thrill of out-thinking opponents under pressure.
          </p>
          <p style={paragraph}>
            To me, competitive gaming isn&apos;t just about raw speed or power—it&apos;s about <b>positioning, tactics, and maximizing every resource at your disposal</b>. In games (and in life), the playing field isn&apos;t always fair; opponents might have advantages or pay-to-win perks. You can&apos;t complain. You adapt, out-play the friction, and force a win regardless.
          </p>
        </div>
      </FadeIn>

      {/* 3. Personal & Cat Card */}
      <FadeIn delay={0.35} direction="up">
        <div style={cardStyle}>
          <div style={cardTitle}>🐾 Scar &amp; Anime</div>
          <p style={paragraph}>
            When I step away from the keyboard, you&apos;ll usually find me hanging out with my cat, <b>Scar</b>. 🐈 He loves to remind me that I&apos;m living in <em>his</em> house and that I&apos;m essentially his personal assistant.
          </p>
          <p style={paragraph}>
            I also love getting lost in <b>anime</b> adventures and epic storylines 🎌, as well as taking <b>long walks</b> 🚶‍♂️ to clear my head and let product ideas and technical solutions connect in the background.
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
