"use client"
import { motion } from "framer-motion"

export function About() {
  return (
    <section id="about" className="py-20 relative z-10 pointer-events-none">
      <div className="container mx-auto px-6 pointer-events-auto">
        <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-12"
            >
            About Me
            </motion.h2>
            
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed text-left md:text-center"
            >
            <p className="mb-4">
                Hi, I'm <span className="text-brand-blue font-bold">Anbu Selvan</span>. I'm a Freelance Developer who helps businesses turn ideas into <span className="text-foreground font-semibold">high-impact digital products</span>.
                I specialize in building <span className="text-foreground font-semibold">SaaS MVPs</span>, high-converting Landing Pages, and scalable Web Applications using <span className="text-brand-blue font-medium">Next.js and React</span>.
                From <span className="text-foreground font-semibold">Authentication</span> to <span className="text-foreground font-semibold">SEO & Performance Optimization</span>, I handle the full stack development process so you can focus on growing your business.
            </p>
            </motion.div>
        </div>
      </div>
    </section>
  )
}
