"use client";

import React, { useEffect, useRef } from "react";

export default function FluidSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Disable WebGL fluid entirely on mobile to fix scroll lag
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    if (!canvasRef.current) return;

    let isMounted = true;

    // @ts-ignore
    import("webgl-fluid").then((module) => {
      if (!isMounted || !canvasRef.current) return;
      const webGLFluid = module.default;

      try {
        webGLFluid(canvasRef.current, {
          IMMEDIATE: false,
          TRIGGER: "hover",
          SIM_RESOLUTION: 128,
          DYE_RESOLUTION: 512,
          CAPTURE_RESOLUTION: 512,
          DENSITY_DISSIPATION: 0.95,
          VELOCITY_DISSIPATION: 0.95,
          PRESSURE: 0.8,
          PRESSURE_ITERATIONS: 20,
          CURL: 30,
          SPLAT_RADIUS: 0.12, // Much smaller radius for sharp, minimal effect
          SPLAT_FORCE: 6000,
          SHADING: true, // Shading gives it a 3D water-like liquid feel
          COLORFUL: true, // Turn back on the rainbow (purple, blue, red, pink, orange, green)
          COLOR_UPDATE_SPEED: 10,
          PAUSED: false,
          BACK_COLOR: { r: 252, g: 252, b: 252 },
          TRANSPARENT: false,
          BLOOM: false, // Turn off bloom to keep it sharp and water-like instead of glowing gas
          BLOOM_ITERATIONS: 8,
          BLOOM_RESOLUTION: 256,
          BLOOM_INTENSITY: 0.8,
          BLOOM_THRESHOLD: 0.4,
          BLOOM_SOFT_KNEE: 0.7,
          SUNRAYS: false, // Turn off sunrays to keep it minimal
          SUNRAYS_RESOLUTION: 196,
          SUNRAYS_WEIGHT: 1.0,
        });
      } catch (err) {
        console.error("Fluid simulation init error:", err);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, display: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "block" }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: "100%", 
          height: "100%", 
          opacity: 0.7 // Slight opacity to keep it subtle and not overdone
        }} 
      />
    </div>
  );
}
