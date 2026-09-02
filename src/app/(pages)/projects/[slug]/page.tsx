import React from "react";
import { notFound } from "next/navigation";
import { Github, ArrowLeft, CheckCircle, Target, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import FadeIn from "@/components/fade-in";
import { PROJECTS, Tag } from "@/lib/data";
import { ReputationArchitectureFlow } from "@/components/reputation-architecture-flow";
import { ProjectCarousel } from "@/components/project-carousel";

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header section with back button */}
      <FadeIn delay={0} direction="none" duration={0.5}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <Link href="/projects" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 8, borderRadius: "50%", background: "#f3f4f6", color: "#111", textDecoration: "none" }}>
            <ArrowLeft size={16} />
          </Link>
          <div className="section-title" style={{ fontWeight: 800, fontSize: 18, color: "#111", margin: 0 }}>
            {project.title}
          </div>
        </div>
      </FadeIn>

      {/* Hero Image or Interactive Carousel */}
      <FadeIn delay={0.1} direction="up">
        {project.images && project.images.length > 0 ? (
          <ProjectCarousel images={project.images} title={project.title} autoPlayInterval={5000} />
        ) : (
          <div style={{ width: "100%", maxHeight: 340, borderRadius: 24, overflow: "hidden", border: "2px solid #18181b", boxShadow: "6px 6px 0px #18181b", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
            <img src={project.image} alt={project.title} style={{ width: "100%", height: "auto", maxHeight: 310, objectFit: "contain" }} />
          </div>
        )}
      </FadeIn>

      {/* Tags and Links */}
      <FadeIn delay={0.2} direction="up">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.tags.map((t, i) => (
              <span key={i} style={{ padding: "6px 14px", borderRadius: 999, background: "#ffffff", border: "1.5px solid #18181b", boxShadow: "2px 2px 0px #18181b", color: "#18181b", fontSize: 12, fontWeight: 700 }}>
                {t}
              </span>
            ))}
          </div>
          {project.github !== "#" && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 999, background: "#18181b", color: "#fff", border: "2px solid #18181b", boxShadow: "3px 3px 0px #000", textDecoration: "none", fontSize: 13, fontWeight: 700 }}>
              <Github size={16} /> View Code
            </a>
          )}
        </div>
      </FadeIn>

      {/* Architecture Flowchart Diagram for Reputation Management System */}
      {slug === "5-star-google-review" && (
        <FadeIn delay={0.25} direction="up">
          <ReputationArchitectureFlow />
        </FadeIn>
      )}

      {/* Conversational Project Story Card */}
      <FadeIn delay={0.3} direction="up">
        <div style={{ background: "#ffffff", border: "2px solid #18181b", boxShadow: "6px 6px 0px #18181b", borderRadius: 24, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 800, color: "#111" }}>
            <Sparkles size={18} color="#f59e0b" />
            Project Story &amp; Overview
          </div>

          <p style={{ fontSize: 14.5, color: "#222", lineHeight: 1.7, margin: 0 }}>
            {project.action}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
            <div style={{ padding: 16, borderRadius: 16, background: "#fafafa", border: "1.5px solid #18181b", boxShadow: "3px 3px 0px #18181b" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#dc2626", marginBottom: 4 }}>⚠️ The Challenge</div>
              <p style={{ fontSize: 13.5, color: "#333", lineHeight: 1.6, margin: 0 }}>{project.problem}</p>
            </div>

            <div style={{ padding: 16, borderRadius: 16, background: "#fafafa", border: "1.5px solid #18181b", boxShadow: "3px 3px 0px #18181b" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#16a34a", marginBottom: 4 }}>🎯 Key Results &amp; Business Impact</div>
              <p style={{ fontSize: 13.5, color: "#333", lineHeight: 1.6, margin: 0 }}>{project.result}</p>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
