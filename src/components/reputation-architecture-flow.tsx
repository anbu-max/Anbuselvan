"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Mail, MessageSquare, Smartphone, CheckCircle, AlertTriangle } from "lucide-react";

export function ReputationArchitectureFlow() {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: 20,
        background: "#fafafa",
        border: "1px solid #e5e7eb",
        padding: "28px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 4 }}>
        <h4 style={{ fontSize: 16, fontWeight: 800, color: "#111", margin: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <ShieldCheck size={18} color="#22c55e" /> Review Filtering Architecture & Workflow
        </h4>
        <p style={{ fontSize: 12.5, color: "#666", margin: "4px 0 0" }}>
          How bad reviews are privately captured while 5-star reviews boost public Google Business rankings.
        </p>
      </div>

      {/* Step 1: Customer Completes Service */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          width: "100%",
          maxWidth: 520,
          background: "#18181b",
          color: "#fff",
          borderRadius: 16,
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#f97316",
            color: "#fff",
            fontWeight: 800,
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          1
        </div>
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: "#fff" }}>
            Customer Completes Service
          </div>
          <div style={{ fontSize: 12, color: "#a1a1aa", marginTop: 2 }}>
            Appointment completed or invoice paid in CRM / POS system
          </div>
        </div>
      </motion.div>

      {/* Vertical Connecting Line */}
      <div style={{ width: 2, height: 20, background: "#d4d4d8" }} />

      {/* Step 2: Review Request Sent */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        style={{
          width: "100%",
          maxWidth: 520,
          background: "#fff",
          border: "2px solid #18181b",
          borderRadius: 16,
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#18181b",
              color: "#fff",
              fontWeight: 800,
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            2
          </div>
          <span style={{ fontSize: 14.5, fontWeight: 800, color: "#111" }}>
            Review Request Sent
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6 }}>
          {["SMS", "EMAIL", "WHATSAPP", "CHATBOT"].map((channel, i) => (
            <span
              key={i}
              style={{
                fontSize: 10.5,
                fontWeight: 800,
                padding: "3px 10px",
                borderRadius: 6,
                background: "#f4f4f5",
                border: "1px solid #e4e4e7",
                color: "#3f3f46",
                letterSpacing: "0.04em",
              }}
            >
              {channel}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Vertical Connecting Line */}
      <div style={{ width: 2, height: 20, background: "#d4d4d8" }} />

      {/* Step 3: Customer Selects Rating */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        style={{
          width: "100%",
          maxWidth: 520,
          background: "#fff",
          border: "2px solid #18181b",
          borderRadius: 16,
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#18181b",
              color: "#fff",
              fontWeight: 800,
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            3
          </div>
          <span style={{ fontSize: 14.5, fontWeight: 800, color: "#111" }}>
            Customer Selects Rating
          </span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} size={20} fill="#f59e0b" color="#f59e0b" />
          ))}
        </div>
      </motion.div>

      {/* Split Branch Flow */}
      <div className="w-full max-w-[560px] grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        {/* Branch 1: 4-5 Stars (Positive Path) */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              4–5 STARS ⭐
            </span>
          </div>

          <div
            style={{
              padding: 16,
              borderRadius: 14,
              background: "#f0fdf4",
              border: "2px solid #22c55e",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div style={{ fontSize: 13.5, fontWeight: 800, color: "#15803d", display: "flex", alignItems: "center", gap: 6 }}>
              <CheckCircle size={16} /> Redirect to Google Review
            </div>
            <p style={{ fontSize: 11.5, color: "#166534", margin: 0, lineHeight: 1.4 }}>
              Customer leaves a public review directly on your Google Business Profile.
            </p>
          </div>

          <div
            style={{
              padding: 14,
              borderRadius: 12,
              background: "#16a34a",
              color: "#fff",
              textAlign: "center",
              fontWeight: 800,
              fontSize: 13,
              boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
            }}
          >
            🚀 Generate More Public Reviews
          </div>
        </motion.div>

        {/* Branch 2: 1-3 Stars (Private Feedback Path) */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              1–3 STARS ⚠️
            </span>
          </div>

          <div
            style={{
              padding: 16,
              borderRadius: 14,
              background: "#fef2f2",
              border: "2px solid #ef4444",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div style={{ fontSize: 13.5, fontWeight: 800, color: "#b91c1c", display: "flex", alignItems: "center", gap: 6 }}>
              <AlertTriangle size={16} /> Private Feedback Form
            </div>
            <p style={{ fontSize: 11.5, color: "#991b1b", margin: 0, lineHeight: 1.4 }}>
              Owner is notified immediately via SMS/Email with private customer notes before public posting.
            </p>
          </div>

          <div
            style={{
              padding: 14,
              borderRadius: 12,
              background: "#18181b",
              color: "#fff",
              borderLeft: "4px solid #ef4444",
              textAlign: "center",
              fontWeight: 800,
              fontSize: 12.5,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            🛠️ Issue Resolved Before Public Review
          </div>
        </motion.div>
      </div>
    </div>
  );
}
