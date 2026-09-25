"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface HobbyCardItem {
  id: string;
  src: string;
  tag: string;
}

const HOBBY_ITEMS: HobbyCardItem[] = [
  {
    id: "scar-1",
    src: "/img/hobby/scar.jpeg",
    tag: "Pet & Companion",
  },
  {
    id: "scar-2",
    src: "/img/hobby/scar3.jpeg",
    tag: "Pet & Companion",
  },
  {
    id: "anime",
    src: "/img/hobby/anime.jpeg",
    tag: "Anime & Stories",
  },
  {
    id: "workspace",
    src: "/img/hobby/laptop.jpeg",
    tag: "Engineering",
  },
  {
    id: "sun-aspiration",
    src: "/img/hobby/aspiring to be great like sun.jpeg",
    tag: "Mindset & Ambition",
  },
  {
    id: "coffeeshop",
    src: "/img/hobby/coffeshop.jpeg",
    tag: "Vibes & Flow",
  },
];

export default function HobbyCardStack() {
  const [cards, setCards] = useState<HobbyCardItem[]>(HOBBY_ITEMS);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = () => {
    setDirection("next");
    setCards((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  const handlePrev = () => {
    setDirection("prev");
    setCards((prev) => {
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, prev.length - 1);
      return [last, ...rest];
    });
  };

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, cards]);

  const activeIndex = HOBBY_ITEMS.findIndex((item) => item.id === cards[0].id);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        background: "#ffffff",
        border: "2px solid #18181b",
        boxShadow: "6px 6px 0px #18181b",
        borderRadius: 20,
        padding: 22,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* Header with Navigation Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>📸</span>
          <span
            style={{
              fontWeight: 800,
              fontSize: 16,
              color: "#111",
              borderBottom: "2.5px solid #18181b",
              paddingBottom: 2,
            }}
          >
            Life, Cat &amp; Moments
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              background: "#f1f5f9",
              border: "1px solid #18181b",
              padding: "2px 8px",
              borderRadius: 999,
              color: "#333",
            }}
          >
            {activeIndex + 1} / {HOBBY_ITEMS.length}
          </span>
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#ffffff",
              border: "2px solid #18181b",
              boxShadow: "2px 2px 0px #18181b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#18181b",
              transition: "transform 0.1s ease, box-shadow 0.1s ease",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translate(1px, 1px)";
              e.currentTarget.style.boxShadow = "1px 1px 0px #18181b";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translate(0, 0)";
              e.currentTarget.style.boxShadow = "2px 2px 0px #18181b";
            }}
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next image"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#18181b",
              border: "2px solid #18181b",
              boxShadow: "2px 2px 0px #18181b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#ffffff",
              transition: "transform 0.1s ease, box-shadow 0.1s ease",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translate(1px, 1px)";
              e.currentTarget.style.boxShadow = "1px 1px 0px #18181b";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translate(0, 0)";
              e.currentTarget.style.boxShadow = "2px 2px 0px #18181b";
            }}
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Interactive Card Stack Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: 1000,
          overflow: "visible",
          userSelect: "none",
        }}
      >
        {cards.slice(0, 3).map((item, index) => {
          const isFront = index === 0;
          const scale = 1 - index * 0.05;
          const yOffset = index * 14;
          const zIndex = 30 - index * 10;
          const opacity = 1 - index * 0.2;

          return (
            <motion.div
              key={item.id}
              layout
              initial={{
                scale: direction === "next" ? 0.9 : 1.05,
                y: direction === "next" ? 20 : -20,
                opacity: 0,
              }}
              animate={{
                scale,
                y: yOffset,
                zIndex,
                opacity,
              }}
              exit={{
                scale: 0.85,
                y: 50,
                opacity: 0,
                transition: { duration: 0.2 },
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 24,
              }}
              onClick={isFront ? handleNext : undefined}
              onContextMenu={(e) => e.preventDefault()}
              style={{
                position: "absolute",
                top: 4,
                width: "100%",
                maxWidth: 480,
                height: 275,
                borderRadius: 18,
                border: "2px solid #18181b",
                boxShadow: isFront
                  ? "6px 6px 0px #18181b"
                  : "3px 3px 0px rgba(24, 24, 27, 0.4)",
                background: "#000000",
                overflow: "hidden",
                cursor: isFront ? "pointer" : "default",
                transformOrigin: "bottom center",
              }}
            >
              {/* Full Image */}
              <img
                src={encodeURI(item.src)}
                alt={item.tag}
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  pointerEvents: "none",
                }}
              />

              {/* Floating Tag Badge */}
              <span
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  fontSize: 11.5,
                  fontWeight: 800,
                  background: "#ffffff",
                  border: "1.5px solid #18181b",
                  boxShadow: "2px 2px 0px #18181b",
                  padding: "4px 12px",
                  borderRadius: 999,
                  color: "#18181b",
                  zIndex: 2,
                }}
              >
                {item.tag}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination Dot Indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
          marginTop: -4,
        }}
      >
        {HOBBY_ITEMS.map((item, i) => (
          <div
            key={item.id}
            onClick={() => {
              const targetIdx = HOBBY_ITEMS.findIndex((x) => x.id === item.id);
              const reordered = [
                ...HOBBY_ITEMS.slice(targetIdx),
                ...HOBBY_ITEMS.slice(0, targetIdx),
              ];
              setCards(reordered);
            }}
            style={{
              width: i === activeIndex ? 22 : 8,
              height: 8,
              borderRadius: 999,
              background: i === activeIndex ? "#18181b" : "#e2e8f0",
              border: "1px solid #18181b",
              transition: "all 0.25s ease",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}
