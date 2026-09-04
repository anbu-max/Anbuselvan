"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface ProjectCarouselProps {
  images: string[];
  title: string;
  autoPlayInterval?: number;
}

export function ProjectCarousel({
  images,
  title,
  autoPlayInterval = 5000,
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard arrow listener for full-screen view
  useEffect(() => {
    if (!isFullScreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setIsFullScreen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen, handleNext, handlePrev]);

  // Auto-play slideshow (pauses on hover or full screen)
  useEffect(() => {
    if (images.length <= 1 || isHovered || isFullScreen) return;
    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [images.length, isHovered, isFullScreen, autoPlayInterval, handleNext]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "relative",
          width: "100%",
          borderRadius: 20,
          overflow: "hidden",
          background: "#09090b",
          padding: "16px 12px 18px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
        }}
      >
        {/* Fullscreen Button in Header */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0 8px 8px",
          }}
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFullScreen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: 999,
              background: "rgba(255, 255, 255, 0.12)",
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            <Maximize2 size={14} /> Fullscreen
          </motion.button>
        </div>

        {/* Main Image Frame (Clicking opens Fullscreen Lightbox) */}
        <div
          onClick={() => setIsFullScreen(true)}
          style={{
            position: "relative",
            width: "100%",
            minHeight: 320,
            maxHeight: 440,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${title} screenshot ${currentIndex + 1}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{
                maxWidth: "100%",
                maxHeight: 420,
                width: "auto",
                height: "auto",
                objectFit: "contain",
                borderRadius: 12,
                filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.4))",
              }}
            />
          </AnimatePresence>

          {/* Navigation Arrows (Shown if > 1 image) */}
          {images.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "rgba(0, 0, 0, 0.75)",
                  backdropFilter: "blur(6px)",
                  color: "#ffffff",
                  border: "1.5px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 10,
                }}
              >
                <ChevronLeft size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "rgba(0, 0, 0, 0.75)",
                  backdropFilter: "blur(6px)",
                  color: "#ffffff",
                  border: "1.5px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 10,
                }}
              >
                <ChevronRight size={20} />
              </motion.button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {images.length > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 14,
            }}
          >
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: currentIndex === idx ? 24 : 8,
                  height: 8,
                  borderRadius: 999,
                  background: currentIndex === idx ? "#38bdf8" : "rgba(255,255,255,0.3)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "rgba(9, 9, 11, 0.94)",
              backdropFilter: "blur(12px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px 16px",
            }}
            onClick={() => setIsFullScreen(false)}
          >
            {/* Top Toolbar */}
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 24,
                right: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                zIndex: 20,
              }}
            >
              <div style={{ color: "#ffffff", fontSize: 14, fontWeight: 700 }}>
                {title} <span style={{ opacity: 0.65, marginLeft: 8 }}>({currentIndex + 1} / {images.length})</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFullScreen(false)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={22} />
              </motion.button>
            </div>

            {/* Modal Image Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "90vw",
                maxHeight: "85vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`${title} fullscreen ${currentIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    maxHeight: "85vh",
                    maxWidth: "90vw",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: 16,
                    border: "2px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
                  }}
                />
              </AnimatePresence>

              {/* Lightbox Arrows */}
              {images.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1, x: -4 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePrev}
                    style={{
                      position: "absolute",
                      left: -20,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 46,
                      height: 46,
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.8)",
                      color: "#fff",
                      border: "1.5px solid rgba(255,255,255,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                    }}
                  >
                    <ChevronLeft size={24} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1, x: 4 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNext}
                    style={{
                      position: "absolute",
                      right: -20,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 46,
                      height: 46,
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.8)",
                      color: "#fff",
                      border: "1.5px solid rgba(255,255,255,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                    }}
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
