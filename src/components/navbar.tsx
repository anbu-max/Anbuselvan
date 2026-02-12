"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "About Me", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Blog", href: "https://thrive-blog.vercel.app/", external: true },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <div
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled ? "pt-4" : "pt-0"
      }`}
    >
      <header
        className={`w-full transition-all duration-500 mx-auto ${
          isScrolled
            ? "max-w-2xl rounded-full border bg-background/80 backdrop-blur-md shadow-lg py-2"
            : "max-w-7xl bg-transparent py-4 border-b border-transparent"
        }`}
      >
        <div className={`container mx-auto flex items-center justify-between px-6 ${isScrolled ? "h-12" : "h-16"}`}>
        <Link href="/" className="text-2xl font-bold tracking-tighter hover:text-primary transition-colors">
          SSS
        </Link>
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              className="text-sm font-medium hover:text-brand-blue transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <nav className="flex flex-col gap-4 mt-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                className="text-lg font-medium hover:text-brand-blue transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      </header>
    </div>
  )
}
