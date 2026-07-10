"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const [isHovering, setIsHovering] = useState(false);

  // Position state
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide native cursor on desktop
    if (window.innerWidth > 768) {
      document.body.style.cursor = "none";
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        window.getComputedStyle(target).cursor === "pointer" ||
        target.closest("a") || target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    let rafId: number;
    const render = () => {
      // Lerp (smooth follow) the ring position towards the mouse
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(calc(${ring.current.x}px - 50%), calc(${ring.current.y}px - 50%), 0)`;
      }

      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      <style>{`
        @media (min-width: 769px) {
          body, a, button, [style*="cursor: pointer"] {
            cursor: none !important;
          }
        }
        
        .ai-cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 6px; height: 6px;
          background: #111;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: width 0.2s, height 0.2s, background 0.2s, box-shadow 0.2s;
        }
        
        .ai-cursor-ring-wrapper {
          position: fixed;
          top: 0; left: 0;
          width: 32px; height: 32px;
          pointer-events: none;
          z-index: 9998;
          transition: width 0.2s, height 0.2s;
        }

        .ai-cursor-ring-inner {
          width: 100%; height: 100%;
          border: 1.5px solid rgba(17, 17, 17, 0.2);
          border-radius: 50%;
          transition: border-color 0.2s, background 0.2s, border-style 0.2s;
        }
        
        /* Hover state (AI Automation feel) */
        .ai-cursor-dot.hover {
          width: 10px; height: 10px;
          background: #22c55e;
          box-shadow: 0 0 12px rgba(34, 197, 94, 0.8), 0 0 20px rgba(34, 197, 94, 0.4);
        }
        .ai-cursor-ring-wrapper.hover {
          width: 48px; height: 48px;
        }
        .ai-cursor-ring-wrapper.hover .ai-cursor-ring-inner {
          border-color: rgba(34, 197, 94, 0.5);
          background: rgba(34, 197, 94, 0.05);
          /* Subtle spinning dash effect for tech vibe */
          border-width: 1.5px;
          border-style: dashed;
          animation: cursor-spin 4s linear infinite;
        }

        @keyframes cursor-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .ai-cursor-dot, .ai-cursor-ring-wrapper { display: none !important; }
        }
      `}</style>
      
      <div ref={dotRef} className={`ai-cursor-dot ${isHovering ? "hover" : ""}`} />
      <div ref={ringRef} className={`ai-cursor-ring-wrapper ${isHovering ? "hover" : ""}`}>
        <div className="ai-cursor-ring-inner"></div>
      </div>
    </>
  );
}
