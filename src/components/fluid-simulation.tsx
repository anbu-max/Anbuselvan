"use client";

import React, { useEffect, useRef } from "react";

export default function FluidSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Intercept window keydown in capture phase to prevent webgl-fluid from catching Spacebar (splats) and P (pausing/freezing)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === " " ||
        e.code === "Space" ||
        e.key === "Spacebar" ||
        e.key === "p" ||
        e.key === "P" ||
        e.code === "KeyP"
      ) {
        e.stopImmediatePropagation();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);

    if (typeof window === "undefined" || !canvasRef.current) {
      return () => {
        window.removeEventListener("keydown", handleKeyDown, true);
      };
    }

    let isMounted = true;
    const isMobile = window.innerWidth < 768;

    // @ts-ignore
    import("webgl-fluid").then((module) => {
      if (!isMounted || !canvasRef.current) return;
      if (canvasRef.current.dataset.init) return;
      canvasRef.current.dataset.init = "true";
      
      const webGLFluid = module.default;

      try {
        webGLFluid(canvasRef.current, {
          IMMEDIATE: false,
          TRIGGER: "hover", // responds to touch on mobile too
          // Resolution tuned for smooth performance
          SIM_RESOLUTION: isMobile ? 64 : 128,
          DYE_RESOLUTION: isMobile ? 256 : 512,
          CAPTURE_RESOLUTION: isMobile ? 256 : 512,
          DENSITY_DISSIPATION: 3.5, // Smooth clean fade out so colors do not get stuck
          VELOCITY_DISSIPATION: 2.0,
          PRESSURE: 0.8,
          PRESSURE_ITERATIONS: isMobile ? 10 : 20,
          CURL: 30,
          SPLAT_RADIUS: isMobile ? 0.2 : 0.12, 
          SPLAT_FORCE: 6000,
          SHADING: !isMobile, // Turn off expensive 3D shading on mobile GPUs
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

    return () => {
      isMounted = false;
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: "100%", 
          height: "100%", 
          opacity: 0.7
        }} 
      />
    </div>
  );
}
