"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export function Navbar() {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Monitor path changes to close mobile menu
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Wait for mounting on the client to avoid theme mismatch hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  const isInfoPage = pathname?.startsWith("/information");

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, section: string) => {
    if (pathname === "/") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("nav-section", { detail: section }));
    }
  };

  // Links list based on context
  const getLinks = () => {
    const links = [
      { name: "Home", href: "/", section: "me" },
      { name: "Skills", href: "/#skills", section: "skills" },
      { name: "Experience", href: "/#experience", section: "me" },
      { name: "Projects", href: "/#projects", section: "projects" },
      { name: "Contact", href: "/#contact", section: "contact" }
    ];

    return (
      <ul className={isMenuOpen ? "active" : ""}>
        {links.map((link) => (
          <li key={link.name}>
            <Link 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.section)}
            >
              {link.name}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/information">Full Story</Link>
        </li>
      </ul>
    );
  };

  return (
    <div className="pill-navbar-container">
      <nav className="pill-navbar">
        <button className="menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          ☰
        </button>
        <Link href="/" className="logo">
          ANBU<span>.</span>
        </Link>
        {getLinks()}
        <div className="right-actions">
          {mounted && (
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
