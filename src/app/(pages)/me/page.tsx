"use client";

import React from "react";
import { MapPin } from "lucide-react";
import FadeIn from "@/components/fade-in";

export default function MePage() {
  const sectionTitle: React.CSSProperties = {
    fontWeight: 800,
    fontSize: 16,
    color: "#111",
    marginBottom: 10,
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
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Location */}
      <FadeIn delay={0.1} direction="up">
        <div className="section-para" style={{ display: "flex", gap: 10, fontSize: 14.5, marginBottom: 2 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <MapPin size={16} color="#22c55e" />
            <div>
              <div style={{ fontSize: 10, color: "#888", fontWeight: 700, textTransform: "uppercase" }}>Location</div>
              <div style={{ color: "#111", fontWeight: 700 }}>Chennai, Tamil Nadu, India</div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* About Me Card */}
      <FadeIn delay={0.15} direction="up">
        <div style={{ background: "#ffffff", border: "2px solid #18181b", boxShadow: "6px 6px 0px #18181b", borderRadius: 20, padding: 22 }}>
          <div className="section-title" style={sectionTitle}>👋 About Me</div>
          <p style={paragraph}>
            I&apos;m <b>Anbu Selvan</b> — Full-Stack &amp; AI Automation Developer working with <b>Small to Medium-Sized Businesses (SMBs)</b>, <b>Founders</b>, and <b>International Clients</b>. I specialize in building <DoodleHighlight color="#38bdf8">web applications</DoodleHighlight>, <DoodleHighlight color="#a855f7">native mobile apps (Android)</DoodleHighlight>, and <DoodleHighlight color="#f59e0b">AI Automations &amp; Agentic Workflows</DoodleHighlight> to scale operations, remove business bottlenecks, and save teams 20+ hours per week.
          </p>
          <p style={{ ...paragraph, margin: 0 }}>
            I specialize in transforming complex business bottlenecks into seamless automated systems. Working with cutting-edge platforms and tools like <b>n8n</b>, <b>Claude</b>, <b>Hermes</b>, and custom AI agents, I design production-ready solutions spanning web development, voice AI, automated lead capture, and intelligent messaging pipelines.
          </p>
        </div>
      </FadeIn>

      {/* Experience Card */}
      <FadeIn delay={0.3} direction="up">
        <div style={{ background: "#ffffff", border: "2px solid #18181b", boxShadow: "6px 6px 0px #18181b", borderRadius: 20, padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>💼</span>
              <span style={{ fontWeight: 800, fontSize: 16.5, color: "#111" }}>Software &amp; Automation Developer</span>
            </div>
            <span style={{ fontSize: 12, color: "#15803d", fontWeight: 800, background: "#f0fdf4", border: "1.5px solid #18181b", boxShadow: "2px 2px 0px #18181b", padding: "3px 12px", borderRadius: 999 }}>2025 - Present</span>
          </div>
          <p style={{ ...paragraph, fontSize: 14, color: "#333", fontWeight: 500, marginBottom: 16 }}>
            Partnering directly with business owners, SMB founders, and international clients across the UK, US, and India to eliminate operational bottlenecks, automate customer acquisition, and engineer high-performance systems.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* 1. PM Electricals (UK) */}
            <div style={{ padding: 16, borderRadius: 16, background: "#fafafa", border: "1.5px solid #18181b", boxShadow: "3px 3px 0px #18181b" }}>
              <div style={{ fontSize: 14.5, fontWeight: 800, color: "#111", marginBottom: 6 }}>⚡ PM Electricals (UK)</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, color: "#333", lineHeight: 1.65, display: "flex", flexDirection: "column", gap: 6 }}>
                <li>Designed &amp; deployed a custom web platform paired with an intelligent Reputation Management system.</li>
                <li>Built automated review filtering that intelligently routes 4 &amp; 5-star reviews to Google Reviews while capturing private feedback for lower ratings.</li>
                <li>Streamlined quote requests and digital brand presence, boosting public 5-star Google reviews by 300%.</li>
              </ul>
            </div>

            {/* 2. Dental Clinics & Healthcare Practices */}
            <div style={{ padding: 16, borderRadius: 16, background: "#fafafa", border: "1.5px solid #18181b", boxShadow: "3px 3px 0px #18181b" }}>
              <div style={{ fontSize: 14.5, fontWeight: 800, color: "#111", marginBottom: 6 }}>🏥 Dental Clinics &amp; Healthcare Practices</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, color: "#333", lineHeight: 1.65, display: "flex", flexDirection: "column", gap: 6 }}>
                <li>Engineered 24/7 AI Voice Receptionists using Retell AI &amp; n8n to eliminate missed inbound calls outside office hours.</li>
                <li>Integrated automated WhatsApp booking agents connected directly with real-time Google Calendar availability sync.</li>
                <li>Reduced patient inquiry drop-offs by 90%, saving clinic staff 20+ hours per week in manual appointment booking.</li>
              </ul>
            </div>

            {/* 3. Real Estate Agencies */}
            <div style={{ padding: 16, borderRadius: 16, background: "#fafafa", border: "1.5px solid #18181b", boxShadow: "3px 3px 0px #18181b" }}>
              <div style={{ fontSize: 14.5, fontWeight: 800, color: "#111", marginBottom: 6 }}>🏠 Real Estate Agencies</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, color: "#333", lineHeight: 1.65, display: "flex", flexDirection: "column", gap: 6 }}>
                <li>Developed high-converting automated SMS &amp; WhatsApp lead response engines for instant property inquiry follow-ups.</li>
                <li>Built outbound AI cold-calling CRM pipelines to qualify prospective property buyers automatically.</li>
                <li>Accelerated site-visit booking rates by 3x and eliminated manual lead nurturing delays.</li>
              </ul>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* My Philosophy Card */}
      <FadeIn delay={0.45} direction="up">
        <div style={{ background: "#ffffff", border: "2px solid #18181b", boxShadow: "6px 6px 0px #18181b", borderRadius: 20, padding: 22 }}>
          <div className="section-title" style={sectionTitle}>💡 My Philosophy</div>
          <p style={{ ...paragraph, fontStyle: "italic", color: "#111", fontWeight: 600, borderLeft: "3.5px solid #18181b", paddingLeft: 14, margin: "10px 0 14px" }}>
            {`"The man who loves walking will walk further than the man who loves the destination."`}
          </p>
          <p style={{ ...paragraph, fontSize: 14 }}>
            I believe <b>consistency</b>, <b>curiosity</b>, and <b>embracing challenges</b> are what truly shape a person. 🚀 Difficult problems don&apos;t discourage me, they <em>motivate</em> me. The harder the journey, the more <b>meaningful the lessons</b> and the greater the satisfaction of finding a solution.
          </p>
          <p style={{ ...paragraph, fontSize: 14, margin: 0 }}>
            I care about building things that create <b>real impact</b>. Whether it's software, automation, or an idea, I want my work to <em>make someone's life easier</em> or help a business grow. 🌱 My goal is to become the kind of <b>engineer people can trust</b>, someone who keeps learning, keeps improving, and can always figure things out.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}

{/* Notion-style Doodle Highlight Component */}
function DoodleHighlight({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      style={{
        position: "relative",
        fontWeight: 700,
        color: "#111",
        display: "inline-block",
        padding: "0 2px",
      }}
    >
      {children}
      <svg
        style={{
          position: "absolute",
          left: 0,
          bottom: -2,
          width: "100%",
          height: 6,
          overflow: "visible",
          pointerEvents: "none",
        }}
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        <path
          d="M0 15 Q 25 5, 50 15 T 100 15"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
