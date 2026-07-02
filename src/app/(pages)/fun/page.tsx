"use client";

import React from "react";

export default function FunPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>Interests & Fun</div>
      <p style={{ fontSize: 14, color: "#555", fontStyle: "italic", margin: 0 }}>"No matter what the world says, I just walk my own path." — Roronoa Zoro</p>
      <p style={{ fontSize: 13, color: "#666", margin: 0 }}>I read psychology books and build automation scripts for daily tasks.</p>
      <button onClick={() => import("canvas-confetti").then(m => m.default({ particleCount: 100, spread: 80 }))} style={{ alignSelf: "flex-start", padding: "8px 18px", borderRadius: 999, background: "linear-gradient(135deg,#ec4899,#f43f5e)", color: "#fff", border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Fire Confetti 🎉</button>
    </div>
  );
}
