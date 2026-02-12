"use client"
import { motion } from "framer-motion"
import { 
  FaJava, FaPython, FaHtml5, FaCss3Alt, FaJs, FaReact, 
  FaGitAlt, FaGithub, FaDatabase, FaPaperPlane 
} from "react-icons/fa"
import { SiSpringboot, SiPostgresql } from "react-icons/si"

const skills = [
  { name: "Java", icon: FaJava, color: "#ed1d24" },
  { name: "Python", icon: FaPython, color: "#3776ab" },
  { name: "HTML", icon: FaHtml5, color: "#e34f26" },
  { name: "CSS", icon: FaCss3Alt, color: "#1572b6" },
  { name: "JavaScript", icon: FaJs, color: "#f7df1e" },
  { name: "React", icon: FaReact, color: "#61dafb" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f" },
  { name: "Git", icon: FaGitAlt, color: "#f05032" },
  { name: "GitHub", icon: FaGithub, color: "#333" }, // White in dark mode handled by class
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Postman", icon: FaPaperPlane, color: "#FF6C37" },
  { name: "SQL", icon: FaDatabase, color: "#336791" },
]

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-muted/30 overflow-hidden">
       <div className="container mx-auto px-6 mb-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Tech Arsenal</h2>
            <p className="text-lg text-muted-foreground">The tools I use to bring ideas to life.</p>
       </div>
       
       <div className="relative w-full overflow-hidden mask-linear-gradient">
            {/* Gradient masks for smooth fade */}
           <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent"></div>
           <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent"></div>

           <motion.div 
             className="flex gap-8 whitespace-nowrap"
             animate={{ x: ["0%", "-50%"] }}
             transition={{ 
               repeat: Infinity, 
               ease: "linear", 
               duration: 25 
             }}
           >
                {[...skills, ...skills].map((skill, index) => (
                    <div 
                        key={index}
                        className="flex flex-col items-center justify-center p-4 md:p-6 bg-card rounded-xl shadow-sm border w-[120px] md:w-[150px] aspect-square transition-all hover:scale-110 hover:shadow-md group cursor-pointer"
                    >
                          <skill.icon 
                            className="text-4xl md:text-5xl mb-2 md:mb-3 transition-colors duration-300 group-hover:drop-shadow-lg" 
                            style={{ color: "var(--icon-color)", "--icon-color": skill.color } as React.CSSProperties} 
                          />
                          <span className="font-semibold text-xs md:text-sm group-hover:text-brand-blue transition-colors">{skill.name}</span>
                    </div>
                ))}
           </motion.div>
       </div>
    </section>
  )
}
