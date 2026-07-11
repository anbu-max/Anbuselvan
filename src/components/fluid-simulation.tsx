"use client";

import React, { useEffect, useRef } from "react";

// Preserve the canvas globally so we only initialize webgl-fluid exactly once
let globalCanvas: HTMLCanvasElement | null = null;
let isInitialized = false;

export default function FluidSimulation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    if (!globalCanvas) {
      globalCanvas = document.createElement("canvas");
      globalCanvas.style.width = "100%";
      globalCanvas.style.height = "100%";
      globalCanvas.style.opacity = "0.7";
    }

    containerRef.current.appendChild(globalCanvas);

    if (!isInitialized) {
      isInitialized = true;
      const isMobile = window.innerWidth < 768;

      // @ts-ignore
      import("webgl-fluid").then((module) => {
        const webGLFluid = module.default;
        try {
          webGLFluid(globalCanvas, {
            IMMEDIATE: false,
            TRIGGER: "hover",
            SIM_RESOLUTION: isMobile ? 64 : 128,
            DYE_RESOLUTION: isMobile ? 256 : 512,
            CAPTURE_RESOLUTION: isMobile ? 256 : 512,
            DENSITY_DISSIPATION: 0.95,
            VELOCITY_DISSIPATION: 0.95,
            PRESSURE: 0.8,
            PRESSURE_ITERATIONS: isMobile ? 10 : 20,
            CURL: 30,
            SPLAT_RADIUS: isMobile ? 0.2 : 0.12, 
            SPLAT_FORCE: 6000,
            SHADING: !isMobile,
            COLORFUL: true,
            COLOR_UPDATE_SPEED: 10,
            PAUSED: false,
            BACK_COLOR: { r: 252, g: 252, b: 252 },
            TRANSPARENT: false,
            BLOOM: false,
            BLOOM_ITERATIONS: 8,
            BLOOM_RESOLUTION: 256,
            BLOOM_INTENSITY: 0.8,
            BLOOM_THRESHOLD: 0.4,
            BLOOM_SOFT_KNEE: 0.7,
            SUNRAYS: false,
            SUNRAYS_RESOLUTION: 196,
            SUNRAYS_WEIGHT: 1.0,
          });
        } catch (err) {
          console.error("Fluid simulation init error:", err);
        }
      });
    }

    return () => {
      if (globalCanvas && globalCanvas.parentNode) {
        globalCanvas.parentNode.removeChild(globalCanvas);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}
    />
  );
}
