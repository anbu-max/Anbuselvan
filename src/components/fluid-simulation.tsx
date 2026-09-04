"use client";

import React, { useEffect, useRef } from "react";

export default function FluidSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;

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
          // Drastically reduce resolution and iterations on mobile to maintain 60FPS scroll performance
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
    };
  }, []);

  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
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
