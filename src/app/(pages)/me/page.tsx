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
    {
      image: "/img/me/ai seo results.jpeg",
      title: "Client Results",
      icon: "📈",
      badge: "AI Automation",
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
            Hi, I&apos;m <b>Anbu Selvan</b>. My journey into tech began at the{" "}
            <b>age of 16</b> completely by accident. This sparked an intense
            curiosity that pulled me deep into the tech world, exploring
            programming languages and understanding the technology behind how
            software actually works.
          </p>

          <p style={paragraph}>
            I didn&apos;t stop at code. Driven by a deep fascination with{" "}
            <b>neuroscience and marketing</b>, I devoured non-fiction books,
            neuroscience, and business strategies to learn from great minds and
            understand not just how systems run, but how people think and how
            businesses grow.
          </p>

          <p style={paragraph}>
            Today, I combine that technical depth with strategic thinking to
            build{" "}
            <DoodleHighlight color="#38bdf8">web applications</DoodleHighlight>,{" "}
            <DoodleHighlight color="#a855f7">
              native Android apps
            </DoodleHighlight>
            , and{" "}
            <DoodleHighlight color="#f59e0b">
              AI Automation Systems
            </DoodleHighlight>
            . Working with <b>SMBs</b>, <b>Founders</b>, and clients across the{" "}
            <b>US &amp; UK</b>, I engineer high-leverage solutions that
            eliminate operational friction and save teams{" "}
            <b>15+ hours per week</b>.
          </p>

          <p style={paragraph}>
            Using cutting-edge platforms like <b>n8n</b>, <b>Make</b>,{" "}
            <b>Claude</b>, and custom AI agents, I design production-ready
            pipelines for <b>lead generation</b>,{" "}
            <b>autonomous lead qualification</b>, and{" "}
            <b>intelligent messaging workflows</b>.
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
                marginBottom: 8,
              }}
            >
              Your success is my success. I make you succeed no matter what. 🚀
              I believe that extraordinary outcomes are the result of
              compounding daily execution, radical accountability, and an
              obsession with solving hard problems. If you are seeking a
              relentless high performer with a creative mind to engineer your
              systems, you have found the right one.
            </p>
            <p
              style={{
                ...paragraph,
                fontSize: 13.5,
                color: "#333",
                margin: 0,
                fontStyle: "italic",
              }}
            >
              I will do whatever it takes to get you those results. Effort is
              the baseline, and out-competing the friction of reality is the
              goal. Give me a bottleneck, and I will automate it out of
              existence.
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
              alignItems: "center",
              marginBottom: 14,
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>💼</span>
              <span style={{ fontWeight: 800, fontSize: 16.5, color: "#111" }}>
                AI &amp; Automation Dev
              </span>
            </div>
            <span
              style={{
                fontSize: 12,
                color: "#15803d",
                fontWeight: 800,
                background: "#f0fdf4",
                border: "1.5px solid #18181b",
                boxShadow: "2px 2px 0px #18181b",
                padding: "3px 12px",
                borderRadius: 999,
              }}
            >
              Freelance
            </span>
          </div>
          <p
            style={{
              ...paragraph,
              fontSize: 14,
              color: "#333",
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            Worked with business owners and clients (UK, US, Ireland, etc.) to
            eliminate operational bottlenecks and engineer high-performance
            systems. I build custom n8n workflows and AI automation systems
            engineered to drive measurable results and automate repetitive
            tasks. Key solutions and impact delivered for businesses:
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
              gap: 12,
            }}
          >
            <li>
              <strong>AI Voice &amp; WhatsApp Automation:</strong> Built
              n8n-driven speed-to-lead pipelines triggering autonomous AI Voice
              and WhatsApp agents within 2 minutes of inquiry—qualifying
              prospects, booking site visits, slashing no-shows from 35% to 8%,
              and saving 30+ hours/week.
            </li>
            <li>
              <strong>Reputation Management System &amp; AI SEO:</strong>{" "}
              Developed CRM-connected review generation automations with smart
              sentiment filtering, automated review responses, and AI-driven SEO
              strategies—driving a 315% surge in 5-star Google reviews and
              search visibility.
            </li>
            <li>
              <strong>Custom Integrations &amp; Intelligent Pipelines:</strong>{" "}
              Designed end-to-end webhook architectures, automated lead routing,
              CRM synchronizations, and custom agentic workflows to streamline
              operations and eliminate manual bottlenecks.
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
