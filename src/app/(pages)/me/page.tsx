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

  const carouselSlides = [
    {
      image: "/img/me/workfows.png",
      title: "Production-Ready Workflows",
      icon: "⚡",
      badge: "n8n & AI Pipeline",
      badgeColor: "#4338ca",
      badgeBg: "#e0e7ff",
      description: (
        <>
          Built to deliver results. Engineered custom pipelines for clients that
          achieved great results.
        </>
      ),
    },
    {
      image: "/img/me/ai seo 2.jpeg",
      title: "Client Results",
      icon: "📈",
      badge: "Automated SEO",
      badgeColor: "#15803d",
      badgeBg: "#f0fdf4",
      description: (
        <>
          Using <DoodleHighlight color="#38bdf8">automated SEO</DoodleHighlight>{" "}
          and <DoodleHighlight color="#f59e0b">AI automation</DoodleHighlight>,
          I have got these results for my clients, implementing automation
          systems to get more visitors and bookings for their site.
        </>
      ),
    },
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselSlides.length]);

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % carouselSlides.length);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Location */}
      <FadeIn delay={0.1} direction="up">
        <div
          className="section-para"
          style={{ display: "flex", gap: 10, fontSize: 14.5, marginBottom: 2 }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <MapPin size={16} color="#22c55e" />
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "#888",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                Location
              </div>
              <div style={{ color: "#111", fontWeight: 700 }}>
                Chennai, Tamil Nadu, India
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* About Me Card */}
      <FadeIn delay={0.15} direction="up">
        <div
          style={{
            background: "#ffffff",
            border: "2px solid #18181b",
            boxShadow: "6px 6px 0px #18181b",
            borderRadius: 20,
            padding: 22,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div className="section-title" style={sectionTitle}>
            👋 About Me
          </div>

          <p style={paragraph}>
            Hey, I&apos;m <b>Anbu Selvan</b>. Got into tech around <b>age 16</b>
            —um, honestly just pure curiosity. Wanted to see how software
            actually ticks under the hood, and yeah, got completely hooked
            building and breaking things.
          </p>

          <p style={paragraph}>
            I didn&apos;t stop at code either. The code is good, but
            distribution is what really matters right now. Before that,
            psychology and marketing also interested me, so I learned how
            marketing and sales actually work. I&apos;ve always been pretty
            ambitious, so I want to learn every bit of how businesses grow.
          </p>

          <p style={paragraph}>
            Today, I focus on building{" "}
            <DoodleHighlight color="#f59e0b">
              automation and AI systems
            </DoodleHighlight>
            . I work with founders and people approaching us to eliminate their
            manual work, engineering high-leverage workflows that eliminate
            operational friction and save teams <b>15+ hours per week</b>.
          </p>

          <p style={paragraph}>
            My go-to stack is <b>n8n</b>, <b>Claude</b>, and custom AI
            agents—designing production-ready pipelines for lead generation,
            autonomous lead qualification, and automated messaging workflows.
          </p>

          <div
            style={{
              background: "#f8fafc",
              border: "1.5px solid #18181b",
              borderRadius: 14,
              padding: "14px 16px",
              marginTop: 4,
            }}
          >
            <p
              style={{
                ...paragraph,
                fontSize: 14,
                color: "#111",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Bottom line? Hand me a messy operational bottleneck or a
              mind-numbing manual task, and I&apos;ll automate it out of
              existence. No fluff, no excuses—just systems that work. Got a
              bottleneck? Gotcha covered.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Experience Card */}
      <FadeIn delay={0.3} direction="up">
        <div
          style={{
            background: "#ffffff",
            border: "2px solid #18181b",
            boxShadow: "6px 6px 0px #18181b",
            borderRadius: 20,
            padding: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 8,
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>💼</span>
                <span style={{ fontWeight: 800, fontSize: 16.5, color: "#111" }}>
                  GTM Intern
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
                  @ Tenlyr
                </span>
              </div>
              <div style={{ fontSize: 12.5, color: "#666", fontWeight: 600, marginTop: 2, marginLeft: 26 }}>
                Oct 2026 – Present
              </div>
            </div>
          </div>
          <p
            style={{
              ...paragraph,
              fontSize: 14,
              color: "#333",
              fontWeight: 500,
              marginBottom: 12,
              marginTop: 6,
            }}
          >
            Building automated systems that eliminate operational bottlenecks and help teams move faster. Connected scrapers, AI agents, and webhooks to remove manual work so the team can focus directly on growth:
          </p>

          <ul
            style={{
              margin: 0,
              paddingLeft: 18,
              fontSize: 13.5,
              color: "#333",
              lineHeight: 1.65,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <li>
              <strong>Automated Prospect Discovery &amp; Research:</strong> Built
              automated workflows using Apify and AI agents to track business
              trends and source verified decision-makers, saving 15+ hours of
              manual research every week.
            </li>
            <li>
              <strong>Speed-to-Lead &amp; Inbound Routing:</strong> Engineered
              n8n-driven voice and messaging pipelines that trigger autonomous AI
              agents within minutes of an inquiry—qualifying leads, handling
              FAQs, and booking meetings automatically.
            </li>
            <li>
              <strong>Workflow &amp; Database Integrations:</strong> Connected
              end-to-end webhook architectures across Airtable, Supabase, and
              internal tools to route lead data seamlessly and eliminate manual
              copy-pasting.
            </li>
            <li>
              <strong>Rapid Prototyping:</strong> Leveraged Claude Code, n8n,
              and MCP to rapidly prototype and deploy AI-driven business workflows.
            </li>
          </ul>
        </div>
      </FadeIn>

      {/* Portfolio Carousel Card */}
      <FadeIn delay={0.45} direction="up">
        <div
          style={{
            background: "#ffffff",
            border: "2px solid #18181b",
            boxShadow: "6px 6px 0px #18181b",
            borderRadius: 20,
            padding: 22,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>
                {carouselSlides[currentSlideIndex].icon}
              </span>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: 16.5,
                  color: "#111",
                  transition: "color 0.3s ease",
                }}
              >
                {carouselSlides[currentSlideIndex].title}
              </span>
            </div>
            <span
              style={{
                fontSize: 12,
                color: carouselSlides[currentSlideIndex].badgeColor,
                fontWeight: 800,
                background: carouselSlides[currentSlideIndex].badgeBg,
                border: "1.5px solid #18181b",
                boxShadow: "2px 2px 0px #18181b",
                padding: "3px 12px",
                borderRadius: 999,
                transition: "background 0.3s ease, color 0.3s ease",
              }}
            >
              {carouselSlides[currentSlideIndex].badge}
            </span>
          </div>

          <p
            style={{
              ...paragraph,
              fontSize: 14,
              color: "#333",
              fontWeight: 500,
              marginBottom: 0,
              minHeight: 48,
            }}
          >
            {carouselSlides[currentSlideIndex].description}
          </p>

          <div
            onClick={handleNextSlide}
            onContextMenu={(e) => e.preventDefault()}
            style={{
              width: "100%",
              borderRadius: 14,
              border: "2px solid #18181b",
              overflow: "hidden",
              boxShadow: "3px 3px 0px #18181b",
              background: "#f8fafc",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <img
              src={carouselSlides[currentSlideIndex].image}
              alt={carouselSlides[currentSlideIndex].title}
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: "block",
                transition: "opacity 0.3s ease-in-out",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                display: "flex",
                gap: 6,
              }}
            >
              {carouselSlides.map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background:
                      currentSlideIndex === idx
                        ? "#18181b"
                        : "rgba(24,24,27,0.3)",
                    transition: "background 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

{
  /* Notion-style Doodle Highlight Component */
}
function DoodleHighlight({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
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
