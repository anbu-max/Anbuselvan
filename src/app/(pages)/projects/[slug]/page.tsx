import React from "react";
import { notFound } from "next/navigation";
import { Github, ArrowLeft, Sparkles, HelpCircle, Cpu, GitMerge, Award } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import FadeIn from "@/components/fade-in";
import { PROJECTS } from "@/lib/data";
import { ReputationArchitectureFlow } from "@/components/reputation-architecture-flow";
import { AIReceptionistArchitectureFlow } from "@/components/ai-receptionist-architecture-flow";
import { ProjectCarousel } from "@/components/project-carousel";
import { TechLogo } from "@/components/tech-logo";

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Anbuselvan Portfolio",
    };
  }

  return {
    title: `${project.title} | Anbuselvan Portfolio`,
    description: project.desc,
    openGraph: {
      title: project.title,
      description: project.desc,
      images: [project.image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.desc,
      images: [project.image],
    },
  };
}

function ScribbleUnderline({ color = "#18181b" }: { color?: string }) {
  return (
    <svg width="100%" height="8" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none" style={{ marginTop: 2, display: "block" }}>
      <path d="M1 5 Q 25 1, 50 5 T 100 5 T 150 5 T 199 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4 7 Q 29 3, 54 7 T 104 7 T 154 7 T 196 7" stroke={color} strokeWidth="1.5" strokeOpacity="0.7" strokeLinecap="round" />
    </svg>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": project.title,
    "description": project.desc,
    "codeRepository": project.github !== "#" ? project.github : undefined,
    "programmingLanguage": project.tags,
  };

  return (
    <article style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Inject JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header section with back button */}
      <FadeIn delay={0} direction="none" duration={0.3}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/projects" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "50%", background: "#18181b", color: "#fff", textDecoration: "none" }}>
            <ArrowLeft size={16} />
          </Link>
          <h1 className="section-title" style={{ fontWeight: 800, fontSize: 18, color: "#111", margin: 0 }}>
            {project.title}
          </h1>
        </div>
      </FadeIn>

      {/* CARD 1: Top Hero Image or Interactive Carousel */}
      <FadeIn delay={0.05} direction="none">
        {project.images && project.images.length > 0 ? (
          <ProjectCarousel images={project.images} title={project.title} autoPlayInterval={5000} />
        ) : (
          <div style={{ width: "100%", borderRadius: 20, overflow: "hidden", border: "1.5px solid #18181b", boxShadow: "4px 4px 0px #18181b", background: "#ffffff" }}>
            <img src={project.image} alt={project.title} style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
        )}
      </FadeIn>

      {/* CARD 2: Single Comprehensive Body Content Card */}
      <FadeIn delay={0.1} direction="none">
        <div
          style={{
            background: "#ffffff",
            border: "2px solid #18181b",
            boxShadow: "6px 6px 0px #18181b",
            borderRadius: 24,
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {/* 2.1 Badges, Tags, GitHub link */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between", borderBottom: "1.5px dashed #e4e4e7", paddingBottom: 16 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
              {project.builtFor && (
                <span style={{ padding: "6px 14px", borderRadius: 999, background: "#18181b", color: "#ffffff", fontSize: 12, fontWeight: 800 }}>
                  🏢 Built For: {project.builtFor}
                </span>
              )}
              {project.tags.map((t, i) => (
                <span key={i} style={{ padding: "6px 14px", borderRadius: 999, background: "#f4f4f5", border: "1.5px solid #18181b", color: "#18181b", fontSize: 12, fontWeight: 700 }}>
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

          {/* 2.2 What is this project & What can it do? */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ width: "fit-content" }}>
              <h2 style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 800, color: "#111", margin: 0 }}>
                <HelpCircle size={18} color="#10b981" />
                What is this project &amp; What can it do?
              </h2>
              <ScribbleUnderline color="#10b981" />
            </div>
            <p style={{ fontSize: 14.5, color: "#27272a", lineHeight: 1.7, margin: "6px 0 0" }}>
              {project.whatItIs || project.desc}
            </p>
          </div>

          {/* 2.3 Interactive Architecture / Flow */}
          {slug === "ai-receptionist" && (
            <div style={{ margin: "4px 0" }}>
              <AIReceptionistArchitectureFlow />
            </div>
          )}

          {slug === "5-star-google-review" && (
            <div style={{ margin: "4px 0" }}>
              <ReputationArchitectureFlow />
            </div>
          )}

          {/* 2.4 Key Features & Capabilities (Black bold feature titles) */}
          {project.features && project.features.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ width: "fit-content" }}>
                <h2 style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 800, color: "#111", margin: 0 }}>
                  <Award size={18} color="#6366f1" />
                  Key Features &amp; Capabilities
                </h2>
                <ScribbleUnderline color="#6366f1" />
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10, margin: 0, paddingLeft: 20 }}>
                {project.features.map((feat, i) => (
                  <li key={i} style={{ fontSize: 13.5, color: "#27272a", lineHeight: 1.6 }}>
                    <b style={{ color: "#18181b" }}>{feat.title}:</b> {feat.desc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 2.5 n8n Workflow Breakdown (Unboxed Numbered List) */}
          {project.n8nNodes && project.n8nNodes.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ width: "fit-content" }}>
                <h2 style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 800, color: "#111", margin: 0 }}>
                  <GitMerge size={18} color="#f43f5e" />
                  n8n Automation Workflow — Main Nodes Used
                </h2>
                <ScribbleUnderline color="#f43f5e" />
              </div>
              <p style={{ fontSize: 13.5, color: "#475569", margin: 0, lineHeight: 1.6 }}>
                Configured an optimized n8n workflow using key nodes to connect triggers, AI intelligence, database queries, and notifications:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {project.n8nNodes.map((node, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, borderBottom: i < project.n8nNodes!.length - 1 ? "1px dashed #e4e4e7" : "none", paddingBottom: 10 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#18181b", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0, marginTop: 2 }}>
                      {i + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 800, color: "#18181b" }}>
                        {node.name}
                      </div>
                      <p style={{ fontSize: 12.5, color: "#475569", margin: "2px 0 0", lineHeight: 1.5 }}>
                        {node.purpose}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2.6 Tech Stack Breakdown (Unboxed Official Brand Logos List) */}
          {project.techStackDetails && project.techStackDetails.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ width: "fit-content" }}>
                <h2 style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 800, color: "#111", margin: 0 }}>
                  <Cpu size={18} color="#06b6d4" />
                  Tech Stack Used
                </h2>
                <ScribbleUnderline color="#06b6d4" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 4 }}>
                {project.techStackDetails.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, borderBottom: i < project.techStackDetails!.length - 1 ? "1px dashed #e4e4e7" : "none", paddingBottom: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: "#ffffff", border: "1.5px solid #18181b", boxShadow: "2px 2px 0px #18181b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <TechLogo tool={item.tool} size={16} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <div style={{ fontSize: 13.5, color: "#111", lineHeight: 1.4 }}>
                        <span style={{ fontWeight: 800 }}>{item.tool}</span> <span style={{ fontSize: 11.5, fontWeight: 700, color: "#71717a", textTransform: "uppercase", marginLeft: 4 }}>• {item.category}</span>
                      </div>
                      <p style={{ fontSize: 12.5, color: "#3f3f46", margin: 0, lineHeight: 1.5 }}>
                        {item.usage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2.7 Challenge & Business Impact */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, borderTop: "1.5px dashed #e4e4e7", paddingTop: 18 }}>
            <div style={{ width: "fit-content" }}>
              <h2 style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 800, color: "#111", margin: 0 }}>
                <Sparkles size={18} color="#f59e0b" />
                Challenge &amp; Business Impact
              </h2>
              <ScribbleUnderline color="#f59e0b" />
            </div>

            <p style={{ fontSize: 14, color: "#27272a", lineHeight: 1.6, margin: 0 }}>
              {project.action}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ padding: 14, borderRadius: 14, background: "#fef2f2", border: "1.5px solid #fca5a5" }}>
                <div style={{ fontSize: 13.5, fontWeight: 800, color: "#dc2626", marginBottom: 4 }}>⚠️ The Challenge</div>
                <p style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5, margin: 0 }}>{project.problem}</p>
              </div>

              <div style={{ padding: 14, borderRadius: 14, background: "#f0fdf4", border: "1.5px solid #86efac" }}>
                <div style={{ fontSize: 13.5, fontWeight: 800, color: "#16a34a", marginBottom: 4 }}>🎯 Key Results &amp; Impact</div>
                <p style={{ fontSize: 13, color: "#14532d", lineHeight: 1.5, margin: 0 }}>{project.result}</p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </article>
  );
}



