"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PhoneIncoming, PhoneOutgoing, Calendar, CheckCircle2, Bot, ArrowDown, Building2 } from "lucide-react";

export function AIReceptionistArchitectureFlow() {
  const [activeTab, setActiveTab] = useState<"inbound" | "outbound">("inbound");

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
        gap: 20,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 14px", borderRadius: 999, background: "#fef3c7", border: "1.5px solid #f59e0b", color: "#92400e", fontSize: 12, fontWeight: 800, marginBottom: 8 }}>
          <Building2 size={14} /> Real Estate Voice Agent Architecture
        </div>
        <h4 style={{ fontSize: 18, fontWeight: 800, color: "#111", margin: 0 }}>
          Dual Inbound &amp; Outbound AI Voice System
        </h4>
        <p style={{ fontSize: 13, color: "#52525b", margin: "4px 0 0", lineHeight: 1.5 }}>
          How 24/7 inbound property calls, n8n automated workflows, and outbound site visit verification calls operate together.
        </p>
      </div>

      {/* Toggle Controls for Inbound vs Outbound Flow */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={() => setActiveTab("inbound")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 20px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 800,
            cursor: "pointer",
            border: activeTab === "inbound" ? "2px solid #16a34a" : "2px solid #e4e4e7",
            background: activeTab === "inbound" ? "#16a34a" : "#ffffff",
            color: activeTab === "inbound" ? "#ffffff" : "#15803d",
            boxShadow: activeTab === "inbound" ? "3px 3px 0px #14532d" : "none",
            transition: "all 0.2s",
          }}
        >
          <PhoneIncoming size={15} color={activeTab === "inbound" ? "#fff" : "#16a34a"} />
          1. Inbound Voice Flow (24/7)
        </button>
        <button
          onClick={() => setActiveTab("outbound")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 20px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 800,
            cursor: "pointer",
            border: activeTab === "outbound" ? "2px solid #2563eb" : "2px solid #e4e4e7",
            background: activeTab === "outbound" ? "#2563eb" : "#ffffff",
            color: activeTab === "outbound" ? "#ffffff" : "#1d4ed8",
            boxShadow: activeTab === "outbound" ? "3px 3px 0px #1e3a8a" : "none",
            transition: "all 0.2s",
          }}
        >
          <PhoneOutgoing size={15} color={activeTab === "outbound" ? "#fff" : "#2563eb"} />
          2. Outbound Site Verification
        </button>
      </div>

      {/* Dynamic Workflow View */}
      {activeTab === "inbound" ? (
        <motion.div
          key="inbound-flow"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}
        >
          {/* Step 1 */}
          <div style={{ width: "100%", maxWidth: 540, padding: 16, borderRadius: 16, background: "#f0fdf4", border: "2px solid #22c55e", boxShadow: "3px 3px 0px #14532d", display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: "#16a34a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>
              <PhoneIncoming size={18} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#14532d" }}>1. Buyer Calls Real Estate Office (Inbound 24/7)</div>
              <p style={{ fontSize: 12.5, color: "#166534", margin: "4px 0 0", lineHeight: 1.5 }}>
                A prospective buyer calls inquiring about villa prices, floor plans, or site visits. Retell AI answers instantly in human voice.
              </p>
            </div>
          </div>

          <ArrowDown size={18} color="#16a34a" />

          {/* Step 2 */}
          <div style={{ width: "100%", maxWidth: 540, padding: 16, borderRadius: 16, background: "#ffffff", border: "2px solid #18181b", boxShadow: "3px 3px 0px #18181b", display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: "#ea4b71", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>
              <Bot size={18} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#111" }}>2. n8n Webhook &amp; LLM Knowledge Lookup</div>
              <p style={{ fontSize: 12.5, color: "#3f3f46", margin: "4px 0 0", lineHeight: 1.5 }}>
                Retell AI streams audio to n8n webhook nodes. OpenAI / Claude LLM retrieves real estate property specs &amp; answers complex FAQs instantly.
              </p>
            </div>
          </div>

          <ArrowDown size={18} color="#16a34a" />

          {/* Step 3 */}
          <div style={{ width: "100%", maxWidth: 540, padding: 16, borderRadius: 16, background: "#f0fdf4", border: "2px solid #22c55e", boxShadow: "3px 3px 0px #14532d", display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: "#16a34a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>
              <Calendar size={18} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#14532d" }}>3. Calendar Slot Check &amp; Site Visit Booking</div>
              <p style={{ fontSize: 12.5, color: "#166534", margin: "4px 0 0", lineHeight: 1.5 }}>
                Voice AI negotiates a slot, queries Google Calendar / CRM availability via n8n HTTP node, and schedules the site visit appointment.
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="outbound-flow"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}
        >
          {/* Outbound Step 1 */}
          <div style={{ width: "100%", maxWidth: 540, padding: 16, borderRadius: 16, background: "#eff6ff", border: "2px solid #3b82f6", boxShadow: "3px 3px 0px #1e3a8a", display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>
              <PhoneOutgoing size={18} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#1e3a8a" }}>1. Automated Outbound Trigger Node (n8n Cron)</div>
              <p style={{ fontSize: 12.5, color: "#1e40af", margin: "4px 0 0", lineHeight: 1.5 }}>
                Whenever a site visit appointment is booked (or prior to appointment time), n8n triggers an automated phone call API request to Retell AI.
              </p>
            </div>
          </div>

          <ArrowDown size={18} color="#2563eb" />

          {/* Outbound Step 2 */}
          <div style={{ width: "100%", maxWidth: 540, padding: 16, borderRadius: 16, background: "#ffffff", border: "2px solid #18181b", boxShadow: "3px 3px 0px #18181b", display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: "#ca8a04", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>
              <Bot size={18} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#111" }}>2. AI Voice Agent Verifies Site Visit</div>
              <p style={{ fontSize: 12.5, color: "#3f3f46", margin: "4px 0 0", lineHeight: 1.5 }}>
                AI places call: <i>&quot;Hi, calling to confirm your site visit for Sunshine Heights today at 4 PM. Will you still be able to make it?&quot;</i> If buyer needs to reschedule, AI updates slot live.
              </p>
            </div>
          </div>

          <ArrowDown size={18} color="#2563eb" />

          {/* Outbound Step 3 */}
          <div style={{ width: "100%", maxWidth: 540, padding: 16, borderRadius: 16, background: "#eff6ff", border: "2px solid #3b82f6", boxShadow: "3px 3px 0px #1e3a8a", display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>
              <CheckCircle2 size={18} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#1e3a8a" }}>3. CRM Status Update &amp; Agent Notification</div>
              <p style={{ fontSize: 12.5, color: "#1e40af", margin: "4px 0 0", lineHeight: 1.5 }}>
                n8n marks lead as &quot;Site Visit Confirmed&quot; in CRM, sends buyer SMS directions, and alerts real estate agent with lead details.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Key Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginTop: 4 }}>
        <div style={{ padding: 10, borderRadius: 12, background: "#f0fdf4", border: "1.5px solid #86efac", textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d" }}>INBOUND AVAILABILITY</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#14532d" }}>24/7 Zero Wait</div>
        </div>
        <div style={{ padding: 10, borderRadius: 12, background: "#eff6ff", border: "1.5px solid #93c5fd", textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#1d4ed8" }}>OUTBOUND VERIFICATION</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#1e3a8a" }}>Automated Calls</div>
        </div>
        <div style={{ padding: 10, borderRadius: 12, background: "#fafafa", border: "1.5px solid #18181b", textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#71717a" }}>TARGET INDUSTRY</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#18181b" }}>Real Estate</div>
        </div>
      </div>
    </div>
  );
}


