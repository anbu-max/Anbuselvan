"use client";

import React, { useEffect, useRef } from "react";

let globalCanvas: HTMLCanvasElement | null = null;
let isInitialized = false;

export default function FluidSimulation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    // Suppress webgl-fluid internal pointer 'down' setting error
    const handleGlobalError = (event: ErrorEvent) => {
      if (
        event.message?.includes("setting 'down'") ||
        event.message?.includes("webgl-fluid") ||
        (event.error && String(event.error).includes("setting 'down'"))
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    window.addEventListener("error", handleGlobalError, true);

    if (!globalCanvas) {
      globalCanvas = document.createElement("canvas");
      globalCanvas.style.position = "fixed";
      globalCanvas.style.top = "0";
      globalCanvas.style.left = "0";
      globalCanvas.style.width = "100vw";
      globalCanvas.style.height = "100vh";
      globalCanvas.style.opacity = "0.85";
      globalCanvas.style.pointerEvents = "none"; // Avoid canvas intercepting click/pointer events directly
      globalCanvas.style.zIndex = "0";
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
            DENSITY_DISSIPATION: 1.8,
            VELOCITY_DISSIPATION: 0.98,
            PRESSURE: 0.8,
            PRESSURE_ITERATIONS: isMobile ? 10 : 20,
            CURL: 35,
            SPLAT_RADIUS: isMobile ? 0.38 : 0.28,
            SPLAT_FORCE: 9000,
            SHADING: !isMobile,
            COLORFUL: true,
            COLOR_UPDATE_SPEED: 15,
            PAUSED: false,
            BACK_COLOR: { r: 250, g: 250, b: 250 },
            TRANSPARENT: true,
            BLOOM: false,
          });
        } catch (err) {
          console.error("Fluid simulation init error:", err);
        }
      }).catch((e) => console.error("webgl-fluid load error", e));
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.code === "Space") {
        e.stopImmediatePropagation();
      }
    };
    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener("error", handleGlobalError, true);
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      if (globalCanvas && globalCanvas.parentNode) {
        globalCanvas.parentNode.removeChild(globalCanvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
