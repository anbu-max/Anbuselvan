"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TABS } from "@/lib/data";

interface VercelTooltipNavProps {
  activeSection?: string;
}

export function VercelTooltipNav({ activeSection }: VercelTooltipNavProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const getShortcut = (key: string) => {
    switch (key) {
      case "me": return "M";
      case "projects": return "P";
      case "skills": return "S";
      case "fun": return "F";
      case "contact": return "C";
      default: return "";
    }
  };

  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Black Vercel Capsule Dock */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "6px 14px",
          borderRadius: 999,
          background: "#09090b",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 12px 36px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeSection === tab.key;
          const isHovered = hoveredTab === tab.key;

          return (
            <div
              key={tab.key}
              style={{ position: "relative" }}
              onMouseEnter={() => setHoveredTab(tab.key)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <motion.div
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link
                  href={tab.path}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    color: isActive || isHovered ? "#fff" : "rgba(255,255,255,0.65)",
                    background: isActive ? "rgba(255,255,255,0.15)" : isHovered ? "rgba(255,255,255,0.1)" : "transparent",
                    transition: "color 0.2s, background 0.2s",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {tab.icon}
                  </span>

                  {/* Active/Notification Blue Dot Badge */}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#38bdf8",
                        boxShadow: "0 0 8px #38bdf8",
                      }}
                    />
                  )}
                </Link>
              </motion.div>

              {/* Vercel Tooltip (Skiper43) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: -50, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    style={{
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 100,
                      pointerEvents: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "6px 12px",
                        borderRadius: 10,
                        background: "#000",
                        color: "#fff",
                        fontSize: 12.5,
                        fontWeight: 700,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      <span>{tab.label}</span>

                      {/* Tooltip Arrow */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: -4,
                          left: "50%",
                          transform: "translateX(-50%) rotate(45deg)",
                          width: 8,
                          height: 8,
                          background: "#000",
                          borderRight: "1px solid rgba(255,255,255,0.2)",
                          borderBottom: "1px solid rgba(255,255,255,0.2)",
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
