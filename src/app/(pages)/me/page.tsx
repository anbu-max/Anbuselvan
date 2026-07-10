"use client";

import React from "react";
import { MapPin } from "lucide-react";
import FadeIn from "@/components/fade-in";

export default function MePage() {
  const sectionTitle: React.CSSProperties = {
    fontWeight: 700,
    fontSize: 15,
    color: "#111",
    marginBottom: 6,
    display: "flex",
    alignItems: "center",
    gap: 8,
  };

  const paragraph: React.CSSProperties = {
    fontSize: 14.5,
    color: "#1a1a1a",
    lineHeight: 1.7,
    margin: 0,
    marginBottom: 10,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Location */}
      <FadeIn delay={0.1} direction="up">
        <div className="section-para" style={{ display: "flex", gap: 10, fontSize: 14.5, marginBottom: 8 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <MapPin size={16} color="#22c55e" />
            <div>
              <div style={{ fontSize: 10, color: "#aaa", fontWeight: 600, textTransform: "uppercase" }}>Location</div>
              <div style={{ color: "#333", fontWeight: 500 }}>Chennai, Tamil Nadu</div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* My Philosophy */}
      <FadeIn delay={0.2} direction="up">
        <div>
          <div className="section-title" style={sectionTitle}>💡 My Philosophy</div>
          <p style={{ ...paragraph, fontStyle: "italic", color: "#444", borderLeft: "3px solid #d0d0d0", paddingLeft: 12, marginBottom: 12 }}>
            {`"The man who loves walking will walk further than the man who loves the destination."`}
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={0.3} direction="up">
        <p style={paragraph}>
          I believe <b>consistency</b>, <b>curiosity</b>, and <b>embracing challenges</b> are what truly shape a person. 🚀 Difficult problems don&apos;t discourage me, they <em>motivate</em> me. The harder the journey, the more <b>meaningful the lessons</b> and the greater the satisfaction of finding a solution.
        </p>
      </FadeIn>
      <FadeIn delay={0.4} direction="up">
        <p style={paragraph}>
          I care about building things that create <b>real impact</b>. Whether it's software, automation, or an idea, I want my work to <em>make someone's life easier</em> or help a business grow. 🌱 My goal is to become the kind of <b>engineer people can trust</b>, someone who keeps learning, keeps improving, and can always figure things out.
        </p>
      </FadeIn>

      {/* About Me */}
      <FadeIn delay={0.15} direction="up">
        <div className="section-title" style={sectionTitle}>👋 About Me</div>
      </FadeIn>
      <FadeIn delay={0.2} direction="up">
        <p style={paragraph}>
          I&apos;m Anbu, a <b>Computer Science graduate</b> passionate about building <b>modern web applications</b>, <b>scalable backend systems</b>, and <b>intelligent automation solutions</b> that solve real business problems.
        </p>
      </FadeIn>
      <FadeIn delay={0.25} direction="up">
        <p style={paragraph}>
          I enjoy designing software that goes beyond clean code by delivering <em>measurable value</em>. My interests span <b>full-stack development</b>, <b>REST APIs</b>, <b>workflow automation</b>, and the rapidly evolving world of <b>AI</b>. I spend much of my time exploring technologies like <b>Large Language Models (LLMs)</b>, <b>Retrieval-Augmented Generation (RAG)</b>, <b>AI agents</b>, and <b>automation platforms</b>, constantly experimenting with new ideas and applying them to <em>practical business use cases</em>.
        </p>
      </FadeIn>
      <FadeIn delay={0.3} direction="up">
        <p style={{ ...paragraph, marginBottom: 0 }}>
          I&apos;m particularly interested in how <b>software engineering and AI</b> can work together to help businesses <em>eliminate repetitive work</em>, <em>improve customer experiences</em>, and create systems that continue <b>delivering value</b> long after they&apos;re deployed.
        </p>
      </FadeIn>
    </div>
  );
}
