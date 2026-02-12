"use client"

import { motion } from 'framer-motion';
// Scene3D is now global in layout

import { useHover } from "@/context/hover-context";

export function Hero() {
  const { is3DHovered } = useHover();
  
  return (
    <section id="hero" className="flex flex-col items-center justify-center min-h-screen text-center px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-brand-blue/20 opacity-20 blur-[100px] dark:bg-brand-blue/10"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tight mb-6">
          <span className={`block text-lg sm:text-xl md:text-2xl font-bold mb-2 tracking-widest uppercase transition-colors duration-500 font-display ${is3DHovered ? 'text-[#00ff88]' : 'text-brand-blue'}`}>
            Freelance Developer
          </span>
          I Build <span className={`transition-colors duration-500 ${is3DHovered ? 'text-[#00ff88]' : 'text-brand-blue'}`}>High-Performance</span> <br />
          Web Experiences.
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="text-base sm:text-lg md:text-2xl text-muted-foreground max-w-3xl mb-8 leading-relaxed px-4"
      >
        I help businesses and agencies craft award-winning websites that <span className="text-foreground font-semibold">convert visitors into clients</span>. 
        Combining psychological design principles with cutting-edge 3D tech.
      </motion.p>
      
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
         className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 sm:px-0"
      >
        <a href="#contact" className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity w-full sm:w-auto">
            Start a Project
        </a>
        <a href="#projects" className="px-8 py-3 rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors w-full sm:w-auto">
            View Work
        </a>
      </motion.div>
    </section>
  )
}
