"use client";

import React from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function FadeIn({
  children,
  className,
  style,
}: FadeInProps) {
  return (
    <div
      className={className}
      style={{
        opacity: 1,
        transform: "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
