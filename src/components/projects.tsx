"use client"
import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "MovieDex",
    subtitle: "Cine-Discovery App",
    description: "Architected a dynamic movie discovery interface using React.js. Integrated OMDB API for real-time data fetching and implemented persistent local-storage state management for user favorites.",
    image: "/img/movie-new.png",
    github: "https://github.com/anbu-max/Moviedex",
    tags: ["React", "API", "CSS"],
  },
  {
    title: "SecureTask",
    subtitle: "JWT Auth System",
    description: "Engineered a secure, scalable REST API using Spring Boot and PostgreSQL. Implemented JWT (JSON Web Token) for stateless authentication and role-based access control.",
    image: "/img/todo-new.png",
    github: "https://github.com/anbu-max/TodoJwtAuth",
    tags: ["Spring Boot", "PostgreSQL", "JWT"],
  },
  {
    title: "LinkSnap",
    subtitle: "Scalable URL Shortener",
    description: "Designed a highly efficient URL shortening service. Features include custom alias generation, algorithm optimization for unique keys, and detailed click analytics.",
    image: "/img/url-new.png",
    github: "https://github.com/anbu-max/URLs-Simplifier",
    tags: ["Java", "System Design", "Analytics"],
  },
  {
    title: "YAPG",
    subtitle: "2D Physics Engine",
    description: "Developed a high-performance 2D platformer. Implemented core game loop mechanics, AABB collision detection, and optimized rendering pipelines.",
    image: "/img/yapg-new.png",
    github: "#",
    tags: ["Game Dev", "Physics", "Rendering"],
  }
]

interface Project {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  github: string;
  tags: string[];
}

function ProjectCard({ project, index, activeIndex, total, onNext }: { project: Project; index: number; activeIndex: number; total: number; onNext: () => void }) {
    // Calculate position in stack
    // If index === activeIndex, it's top.
    // If index > activeIndex, it's behind.
    // If index < activeIndex, it's "gone" (or moved to bottom if cycling).
    
    // We want a cycling stack. 
    // Let's assume we just show the top one and maybe a peek of the next.
    // User said "next element... next project card will be shown".
    
    // Let's use a simple shifting logic.
    // standard offset based on (index - activeIndex)
    
    const offset = (index - activeIndex + total) % total; // 0 is active, 1 is next, etc.
    const isActive = offset === 0;
    const isNext = offset === 1;
    const isPrev = offset === total - 1; // logical previous, likely behind or bottom

    // Z-index: Active is highest.
    const zIndex = total - offset; 
    
    // Scale & Y-position for stacking effect
    const scale = isActive ? 1 : 0.9;
    const y = isActive ? 0 : 20 * offset; // cascading down
    const opacity = isActive ? 1 : (isNext ? 0.6 : 0); // Only show active and next? User said "near that it has a next element".
    
    // Flip Logic
    // We use a CSS class or state for flipping.
    // The user wants hover on image to flip.
    
    const [isFlipped, setIsFlipped] = React.useState(false);

    // Reset flip when becoming active/inactive
    React.useEffect(() => {
        setIsFlipped(false);
    }, [activeIndex]);

    if (!isActive && !isNext) return null; // Hide others for simplicity or performance? Or keep them for smooth transition?
    // User wants "stack". Let's show top 2-3.
    const isVisible = offset < 3;

    return (
        <motion.div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-4"
            style={{ 
                zIndex,
            }}
            initial={false}
            animate={{
                y: offset * 30, // Stack vertical offset
                scale: 1 - offset * 0.05,
                opacity: isVisible ? 1 - offset * 0.2 : 0,
                filter: isActive ? 'blur(0px)' : 'blur(2px)',
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
            {/* Flip Container */}
            <div 
                className="relative w-full max-w-2xl h-full md:h-auto md:aspect-video cursor-pointer"
                style={{ perspective: "1000px" }}
                onMouseEnter={() => isActive && setIsFlipped(true)}
                onMouseLeave={() => isActive && setIsFlipped(false)}
            >
                <div 
                    className="relative w-full h-full transition-all duration-700"
                    style={{ 
                        transformStyle: "preserve-3d",
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" 
                    }}
                >
                    {/* Front: Image */}
                    <div 
                        className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-background/50 backdrop-blur-sm"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                         <Image 
                            src={project.image} 
                            alt={project.title} 
                            fill 
                            className="object-cover"
                         />
                         {/* Optional overlay hint */}
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                            <span className="text-white font-medium border border-white/50 px-4 py-1 rounded-full backdrop-blur-md">Hover for Details</span>
                         </div>
                    </div>

                    {/* Back: Details */}
                    <div 
                        className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-brand-blue/30 bg-background/95 p-6 md:p-8 flex flex-col items-center justify-center text-center bg-[url('/img/grid.svg')] bg-cover"
                        style={{ 
                            transform: "rotateY(180deg)",
                            backfaceVisibility: "hidden"
                        }}
                    >
                         <h3 className="text-xl md:text-3xl font-bold mb-2 text-brand-blue">{project.title}</h3>
                         {project.subtitle && <h4 className="text-sm md:text-xl text-muted-foreground mb-2 md:mb-4">{project.subtitle}</h4>}
                         <p className="text-xs md:text-base text-muted-foreground mb-4 md:mb-6 max-w-lg mx-auto leading-relaxed line-clamp-3 md:line-clamp-none">
                             {project.description}
                         </p>
                         <div className="flex gap-2 flex-wrap justify-center mb-4 md:mb-0">
                             {project.tags.map((tag: string) => (
                                 <span key={tag} className="px-2 md:px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-xs md:text-sm font-medium border border-brand-blue/20">
                                     {tag}
                                 </span>
                             ))}
                         </div>
                         <div className="mt-2 md:mt-6">
                            <Button asChild variant="outline" size="sm" className="rounded-full gap-2 hover:bg-brand-blue hover:text-white transition-colors">
                                <Link href={project.github} target="_blank">
                                    <Github className="w-3 md:w-4 h-3 md:h-4" /> View Code
                                </Link>
                            </Button>
                         </div>
                    </div>
                </div>
            </div>

            {/* Next Button (Only for active card, placed explicitly?) Or global next? 
                User said "near that it has a next element".
                Let's put a Next button/arrow to the right of the stack or below.
                Actually, let's put it on the side.
            */}
        </motion.div>
    )
}



export function Projects() {
    const [activeIndex, setActiveIndex] = React.useState(0);
    
    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % projects.length);
    }

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }
    
    return (
        <section id="projects" className="py-20 min-h-screen flex flex-col justify-center relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 z-10">
                 <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 md:mb-16">
                    Selected Work
                 </h2>
                 
                 <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center gap-0 md:gap-8">
                     {/* Prev Button */}
                     <Button 
                        onClick={handlePrev}
                        variant="ghost" 
                        size="icon"
                        className="hidden md:flex h-16 w-16 rounded-full border border-white/10 hover:bg-white/10 hover:scale-110 transition-all z-20"
                     >
                        <ChevronLeft className="h-8 w-8" />
                        <span className="sr-only">Previous Project</span>
                     </Button>

                     <div className="relative w-full max-w-2xl h-[450px] md:h-[500px] mx-auto perspective-1000">
                         {/* Stack Container */}
                         {projects.map((project, index) => (
                             <ProjectCard 
                                key={index} 
                                project={project} 
                                index={index} 
                                activeIndex={activeIndex} 
                                total={projects.length}
                                onNext={handleNext}
                             />
                         ))}
                     </div>

                     {/* Next Button */}
                     <Button 
                        onClick={handleNext}
                        variant="ghost" 
                        size="icon"
                        className="hidden md:flex h-16 w-16 rounded-full border border-white/10 hover:bg-white/10 hover:scale-110 transition-all z-20"
                     >
                        <ChevronRight className="h-8 w-8" />
                        <span className="sr-only">Next Project</span>
                     </Button>
                 </div>

                 {/* Mobile Controls */}
                 <div className="flex md:hidden justify-center gap-8 mt-8">
                     <Button onClick={handlePrev} variant="outline" size="icon" className="rounded-full h-12 w-12 text-brand-blue border-brand-blue/30">
                         <ChevronLeft className="h-6 w-6" />
                     </Button>
                     <Button onClick={handleNext} variant="outline" size="icon" className="rounded-full h-12 w-12 text-brand-blue border-brand-blue/30">
                         <ChevronRight className="h-6 w-6" />
                     </Button>
                 </div>
            </div>
        </section>
    )
}
