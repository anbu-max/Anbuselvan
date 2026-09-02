"use client";

import * as React from "react";
import { useRef, useEffect } from "react";

interface MouseFollowingEyesProps {
  className?: string;
  size?: number; // Size of each eye in px
}

const MouseFollowingEyes: React.FC<MouseFollowingEyesProps> = ({
  className = "",
  size = 32,
}) => {
  const eye1Ref = useRef<HTMLDivElement>(null);
  const eye2Ref = useRef<HTMLDivElement>(null);

  return (
    <div className={`flex items-center justify-center gap-1.5 ${className}`}>
      <Eye selfRef={eye1Ref} otherRef={eye2Ref} size={size} />
      <Eye selfRef={eye2Ref} otherRef={eye1Ref} size={size} />
    </div>
  );
};

interface EyeProps {
  selfRef: React.RefObject<HTMLDivElement | null>;
  otherRef: React.RefObject<HTMLDivElement | null>;
  size: number;
}

const Eye: React.FC<EyeProps> = ({ selfRef, otherRef, size }) => {
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!selfRef.current || !pupilRef.current) return;

      const rect = selfRef.current.getBoundingClientRect();
      const otherRect = otherRef.current?.getBoundingClientRect();

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Check if mouse is hovering directly over either eye
      const isOverSelf =
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom;

      const isOverOther =
        otherRect &&
        mouseX >= otherRect.left &&
        mouseX <= otherRect.right &&
        mouseY >= otherRect.top &&
        mouseY <= otherRect.bottom;

      if (isOverSelf || isOverOther) {
        pupilRef.current.style.transform = `translate(0px, 0px)`;
        return;
      }

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const angle = Math.atan2(dy, dx);

      const maxMove = Math.max(3, size * 0.24);
      const pupilX = Math.cos(angle) * maxMove;
      const pupilY = Math.sin(angle) * maxMove;

      pupilRef.current.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [selfRef, otherRef, size]);

  const pupilSize = Math.max(8, size * 0.42);
  const highlightSize = Math.max(2.5, pupilSize * 0.35);

  return (
    <div
      ref={selfRef}
      style={{ width: size, height: size }}
      className="relative bg-white border-2 border-black rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm"
    >
      <div
        ref={pupilRef}
        style={{ width: pupilSize, height: pupilSize }}
        className="absolute bg-emerald-800 rounded-full flex items-center justify-center transition-transform duration-75 ease-out"
      >
        <div
          style={{ width: pupilSize * 0.72, height: pupilSize * 0.72 }}
          className="bg-black rounded-full relative"
        >
          <div
            style={{ width: highlightSize, height: highlightSize }}
            className="bg-white rounded-full absolute bottom-0.5 right-0.5"
          />
        </div>
      </div>
    </div>
  );
};

export { MouseFollowingEyes };
