"use client"
import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Only show custom cursor on desktop (hover enabled devices)
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      // Only set visible once moved, to avoid initial jump
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => document.body.classList.add('cursor-clicked')
    const handleMouseUp = () => document.body.classList.remove('cursor-clicked')
    
    // Add class to body to hide default cursor
    document.body.classList.add('custom-cursor-active')

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [cursorX, cursorY, isVisible])

  if (!isVisible) return null;

  return (
    <>
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
            .custom-cursor-active, 
            .custom-cursor-active a, 
            .custom-cursor-active button, 
            .custom-cursor-active [role="button"], 
            .custom-cursor-active input {
              cursor: none !important;
            }
        }
        .cursor-clicked .custom-cursor-ring {
            transform: translate(-50%, -50%) scale(0.8);
        }
        .cursor-clicked .custom-cursor-dot {
             transform: translate(-50%, -50%) scale(1.5);
        }
      `}</style>
      <motion.div
        className="custom-cursor-ring fixed top-0 left-0 w-8 h-8 border border-white dark:border-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block" // Hidden on mobile
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Inner dot */}
      </motion.div>
      <motion.div
         className="custom-cursor-dot fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
         style={{
            x: cursorX, // No spring for immediate feedback
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
         }}
      />
    </>
  )
}
