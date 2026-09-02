"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export const ThemeToggleButton = ({
  className = "",
  variant = "circle",
  start = "center",
  blur = false,
}: {
  className?: string;
  variant?: "circle" | "rectangle" | "polygon" | "circle-blur";
  start?: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  blur?: boolean;
}) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const styleId = "theme-transition-styles";

  const updateStyles = useCallback((css: string) => {
    if (typeof window === "undefined") return;
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = css;
  }, []);

  const toggleTheme = useCallback(() => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);

    const animation = createAnimation(variant, start, blur);
    updateStyles(animation.css);

    if (typeof window === "undefined") return;

    const switchTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark");
    };

    // View Transitions API support
    const doc = document as any;
    if (!doc.startViewTransition) {
      switchTheme();
      return;
    }

    doc.startViewTransition(switchTheme);
  }, [theme, setTheme, variant, start, blur, updateStyles, isDark]);

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        background: isDark ? "#ffffff" : "#09090b",
        color: isDark ? "#09090b" : "#ffffff",
        border: "1px solid rgba(255,255,255,0.2)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        transition: "background 0.3s, color 0.3s",
      }}
      className={className}
    >
      <svg viewBox="0 0 240 240" fill="none" style={{ width: 22, height: 22 }}>
        <motion.g
          animate={{ rotate: isDark ? -180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <path
            d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
            fill={isDark ? "#09090b" : "#ffffff"}
          />
          <path
            d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
            fill={isDark ? "#ffffff" : "#09090b"}
          />
        </motion.g>
        <motion.path
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
          fill={isDark ? "#09090b" : "#ffffff"}
        />
      </svg>
    </motion.button>
  );
};

const createAnimation = (
  variant: string,
  start: string,
  blur: boolean
) => {
  return {
    name: `${variant}-${start}${blur ? "-blur" : ""}`,
    css: `
      ::view-transition-group(root) {
        animation-duration: 0.7s;
        animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
      }
            
      ::view-transition-new(root) {
        animation-name: reveal-light;
        ${blur ? "filter: blur(2px);" : ""}
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark;
        ${blur ? "filter: blur(2px);" : ""}
      }

      @keyframes reveal-dark {
        from {
          clip-path: circle(0% at 50% 50%);
          ${blur ? "filter: blur(8px);" : ""}
        }
        to {
          clip-path: circle(150% at 50% 50%);
          ${blur ? "filter: blur(0px);" : ""}
        }
      }

      @keyframes reveal-light {
        from {
          clip-path: circle(0% at 50% 50%);
          ${blur ? "filter: blur(8px);" : ""}
        }
        to {
          clip-path: circle(150% at 50% 50%);
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
    `,
  };
};
