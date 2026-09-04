"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Github, X, Target, Zap, CheckCircle, ArrowRight, Move, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { PROJECTS } from "@/lib/data";

export function Skiper80Showcase() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  // Mouse position tracking for smooth floating preview image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 18 };
  const previewX = useSpring(mouseX, springConfig);
  const previewY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - 120);
    mouseY.set(e.clientY - rect.top - 80);
  };

  return (
    <div 
      className="relative w-full" 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Floating Preview Image for Desktop Hover */}
      <AnimatePresence>
        {hoveredIndex !== null && !selectedProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              x: previewX,
              y: previewY,
              pointerEvents: "none",
              zIndex: 30,
            }}
            className="hidden lg:block w-60 h-40 rounded-xl overflow-hidden shadow-2xl border-2 border-white/80 bg-black/90 backdrop-blur-md"
          >
            <motion.img
              key={hoveredIndex}
              src={PROJECTS[hoveredIndex].image}
              alt={PROJECTS[hoveredIndex].title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Gallery List */}
      <div className="hidden lg:flex flex-col gap-3">
        {PROJECTS.map((project, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <motion.div
              key={project.slug}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => router.push(`/projects/${project.slug}`)}
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                position: "relative",
                padding: "16px 20px",
                borderRadius: 16,
                background: "#ffffff",
                border: "2px solid #18181b",
                boxShadow: "4px 4px 0px #18181b",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                transition: "transform 0.2s, boxShadow 0.2s",
              }}
            >
              {/* Left Side: Number & Title */}
              <div style={{ display: "flex", alignItems: "center", gap: 18, flex: 1, minWidth: 0 }}>
                {/* Large Bold Display Number in Black */}
                <div style={{
                  fontSize: 34,
                  fontWeight: 900,
                  color: "#18181b",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  flexShrink: 0,
                  userSelect: "none",
                  fontFamily: "var(--font-outfit), sans-serif",
                }}>
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 800, fontSize: 16, color: "#111", letterSpacing: "-0.01em" }}>
                      {project.title}
                    </span>
                  </div>
                  <p style={{ fontSize: 12.5, color: "#666", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {project.desc}
                  </p>
                </div>
              </div>

              {/* Right Side: Tech Tags & Action Icon */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {project.tags.slice(0, 3).map((t, j) => (
                    <span key={j} style={{ padding: "4px 8px", borderRadius: 999, background: "#fff", border: "1px solid #e5e7eb", color: "#444", fontSize: 11, fontWeight: 600 }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: isHovered ? "#111" : "#f3f4f6",
                  color: isHovered ? "#fff" : "#666",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}>
                  <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile / Tablet Square Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.slug}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(`/projects/${project.slug}`)}
            style={{
              position: "relative",
              aspectRatio: "1/1",
              borderRadius: 20,
              overflow: "hidden",
              border: "2px solid #18181b",
              boxShadow: "6px 6px 0px #18181b",
              cursor: "pointer",
              background: "#111",
            }}
          >
            {/* Background Cover Image */}
            <img
              src={project.image}
              alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            {/* Gradient Overlay & Bottom Content */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.95) 15%, rgba(0,0,0,0.6) 60%, transparent)",
                padding: 16,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                gap: 6,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontWeight: 800, fontSize: 16, color: "#fff", letterSpacing: "-0.01em" }}>
                  {project.title}
                </span>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#fff", color: "#111", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ArrowRight size={14} />
                </div>
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", margin: 0, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {project.desc}
              </p>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 2 }}>
                {project.tags.slice(0, 3).map((t, j) => (
                  <span key={j} style={{ padding: "2px 8px", borderRadius: 999, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 10, fontWeight: 600 }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expandable Detail View Modal (Overlay) */}
      <AnimatePresence>
        {selectedProject && (
          <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}>
            {/* Backdrop click to close */}
            <div style={{ position: "absolute", inset: 0 }} onClick={() => setSelectedProject(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{
                position: "relative",
                zIndex: 10,
                width: "100%",
                maxWidth: 720,
                maxHeight: "90vh",
                overflowY: "auto",
                background: "#fff",
                borderRadius: 24,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                border: "1px solid #eee",
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* Modal Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111", margin: 0 }}>
                    {selectedProject.title}
                  </h2>
                  {selectedProject.impact && (
                    <span style={{ fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 999, background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>
                      {selectedProject.impact}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{ width: 36, height: 36, borderRadius: "50%", background: "#f3f4f6", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#111", transition: "background 0.2s" }}
                  onMouseOver={(e) => e.currentTarget.style.background = "#e5e7eb"}
                  onMouseOut={(e) => e.currentTarget.style.background = "#f3f4f6"}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Interactive Draggable Preview Image */}
              <div style={{ position: "relative", width: "100%", height: 260, borderRadius: 16, overflow: "hidden", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <motion.img
                  drag
                  dragConstraints={{ top: -40, bottom: 40, left: -40, right: 40 }}
                  whileDrag={{ scale: 1.05, cursor: "grabbing" }}
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "grab" }}
                />
                <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", color: "#fff", padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 5, pointerEvents: "none" }}>
                  <Move size={12} /> Drag image to inspect
                </div>
              </div>

              {/* Tags & Action Buttons */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {selectedProject.tags.map((t, i) => (
                    <span key={i} style={{ padding: "4px 10px", borderRadius: 999, background: "#f3f4f6", color: "#333", fontSize: 12, fontWeight: 600 }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {selectedProject.github !== "#" && (
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 999, background: "#111", color: "#fff", textDecoration: "none", fontSize: 12, fontWeight: 700 }}>
                      <Github size={14} /> GitHub
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      router.push(`/projects/${selectedProject.slug}`);
                    }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 999, background: "#22c55e", color: "#fff", border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                  >
                    Full Details <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Problem, Action, Result Breakdown Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginTop: 4 }}>
                <div style={{ padding: 16, borderRadius: 14, background: "#fff5f5", border: "1px solid #fed7d7" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, color: "#e53e3e" }}>
                    <Target size={16} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>Problem</span>
                  </div>
                  <p style={{ fontSize: 12.5, color: "#4a5568", lineHeight: 1.5, margin: 0 }}>{selectedProject.problem}</p>
                </div>

                <div style={{ padding: 16, borderRadius: 14, background: "#ebf8ff", border: "1px solid #bee3f8" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, color: "#3182ce" }}>
                    <Zap size={16} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>Action</span>
                  </div>
                  <p style={{ fontSize: 12.5, color: "#4a5568", lineHeight: 1.5, margin: 0 }}>{selectedProject.action}</p>
                </div>

                <div style={{ padding: 16, borderRadius: 14, background: "#f0fff4", border: "1px solid #c6f6d5" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, color: "#38a169" }}>
                    <CheckCircle size={16} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>Result</span>
                  </div>
                  <p style={{ fontSize: 12.5, color: "#4a5568", lineHeight: 1.5, margin: 0 }}>{selectedProject.result}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
