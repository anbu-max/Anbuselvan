"use client"
import Link from "next/link"
import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from "react-icons/fa"

export function Footer() {
  return (
    <footer id="contact" className="bg-background border-t py-12">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold mb-6">Contact</h2>
            <p className="mb-8 text-muted-foreground max-w-md mx-auto">
                If you'd like to get in touch, you can reach me using the following methods.
                I'm also available for freelance projects.
            </p>
            
            <div className="flex justify-center gap-6 mb-8">
                <Link href="mailto:anbuselvan.devz@gmail.com" className="p-3 bg-secondary rounded-full hover:bg-brand-blue hover:text-white transition-all hover:-translate-y-1 shadow-sm">
                    <FaEnvelope className="h-6 w-6" />
                </Link>
                <Link href="https://leetcode.com/u/AnbuselvanA/" target="_blank" className="p-3 bg-secondary rounded-full hover:bg-brand-gold hover:text-black transition-all hover:-translate-y-1 shadow-sm">
                    <FaCode className="h-6 w-6" />
                </Link>
                <Link href="https://github.com/anbu-max" target="_blank" className="p-3 bg-secondary rounded-full hover:bg-black hover:text-white transition-all hover:-translate-y-1 shadow-sm">
                    <FaGithub className="h-6 w-6" />
                </Link>
                <Link href="https://www.linkedin.com/in/anbuselvan01/" target="_blank" className="p-3 bg-secondary rounded-full hover:bg-[#0077b5] hover:text-white transition-all hover:-translate-y-1 shadow-sm">
                    <FaLinkedin className="h-6 w-6" />
                </Link>
            </div>
            
            <p className="text-sm text-muted-foreground">
                © 2022 - 2026 | Anbu
            </p>
        </div>
    </footer>
  )
}
