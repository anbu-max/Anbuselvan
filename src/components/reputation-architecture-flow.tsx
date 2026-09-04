"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, CheckCircle, AlertTriangle } from "lucide-react";

export function ReputationArchitectureFlow() {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: 24,
        background: "#ffffff",
        border: "2px solid #18181b",
        boxShadow: "6px 6px 0px #18181b",
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 4 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 14px", borderRadius: 999, background: "#fafafa", border: "1.5px solid #18181b", color: "#18181b", fontSize: 12, fontWeight: 800, marginBottom: 8 }}>
          <ShieldCheck size={14} /> Review Filtering Architecture
        </div>
        <h4 style={{ fontSize: 18, fontWeight: 800, color: "#111", margin: 0 }}>
          Smart Rating Branch Routing
        </h4>
        <p style={{ fontSize: 13, color: "#52525b", margin: "4px 0 0", lineHeight: 1.5 }}>
          How 1–3 star feedback is routed privately while 4–5 star reviews boost Google Business rankings.
        </p>
      </div>

      {/* Step 1: Customer Completes Service */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: "100%",
          maxWidth: 520,
          background: "#18181b",
          color: "#fff",
          borderRadius: 16,
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          boxShadow: "3px 3px 0px #18181b",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#fff",
            color: "#18181b",
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
          <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>
            1. Customer Completes Service
          </div>
          <div style={{ fontSize: 12, color: "#a1a1aa", marginTop: 2 }}>
            Appointment completed or invoice paid in CRM / POS system
          </div>
        </div>
      </motion.div>

      {/* Vertical Line */}
      <div style={{ width: 2, height: 16, background: "#18181b" }} />

      {/* Step 2: Review Request Sent */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: "100%",
          maxWidth: 520,
          background: "#fafafa",
          border: "2px solid #18181b",
          borderRadius: 16,
          padding: "14px 18px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          boxShadow: "3px 3px 0px #18181b",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
          <span style={{ fontSize: 14, fontWeight: 800, color: "#111" }}>
            2. Review Request Sent
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6 }}>
          {["SMS", "EMAIL", "WHATSAPP", "CHATBOT"].map((channel, i) => (
            <span
              key={i}
              style={{
                fontSize: 11,
                fontWeight: 800,
                padding: "3px 10px",
                borderRadius: 6,
                background: "#fff",
                border: "1px solid #18181b",
                color: "#18181b",
              }}
            >
              {channel}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Vertical Line */}
      <div style={{ width: 2, height: 16, background: "#18181b" }} />

      {/* Step 3: Customer Selects Rating */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: "100%",
          maxWidth: 520,
          background: "#fafafa",
          border: "2px solid #18181b",
          borderRadius: 16,
          padding: "14px 18px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          boxShadow: "3px 3px 0px #18181b",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
          <span style={{ fontSize: 14, fontWeight: 800, color: "#111" }}>
            3. Customer Selects Rating
          </span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} size={18} fill="#18181b" color="#18181b" />
          ))}
        </div>
      </motion.div>

      {/* Split Branch Flow */}
      <div style={{ width: "100%", maxWidth: 520, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginTop: 4 }}>
        {/* Branch 1: 4-5 Stars (Positive Path) */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#18181b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              4–5 STARS ⭐
            </span>
          </div>

          <div
            style={{
              padding: 14,
              borderRadius: 14,
              background: "#fafafa",
              border: "2px solid #18181b",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div style={{ fontSize: 13.5, fontWeight: 800, color: "#111", display: "flex", alignItems: "center", gap: 6 }}>
              <CheckCircle size={16} color="#18181b" /> Direct to Google Review
            </div>
            <p style={{ fontSize: 12, color: "#3f3f46", margin: 0, lineHeight: 1.4 }}>
              Customer leaves a public review directly on your Google Business Profile.
            </p>
          </div>
        </motion.div>

        {/* Branch 2: 1-3 Stars (Private Feedback Path) */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#18181b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              1–3 STARS ⚠️
            </span>
          </div>

          <div
            style={{
              padding: 14,
              borderRadius: 14,
              background: "#fafafa",
              border: "2px solid #18181b",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div style={{ fontSize: 13.5, fontWeight: 800, color: "#111", display: "flex", alignItems: "center", gap: 6 }}>
              <AlertTriangle size={16} color="#18181b" /> Private Feedback Form
            </div>
            <p style={{ fontSize: 12, color: "#3f3f46", margin: 0, lineHeight: 1.4 }}>
              Owner is notified immediately via SMS/Email with private customer notes before public posting.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

