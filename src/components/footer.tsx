"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    if (pathname === "/") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("nav-section", { detail: section }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="premium-footer">
      <div className="footer-grid">
        {/* Column 1: Brand */}
        <div className="footer-col brand">
          <h3>
            ANBU<span>.</span>
          </h3>
          <p>
            Software Developer specializing in building high-performance web applications, scalable database systems, and workflow automation.
          </p>
          <div className="socials">
            <a href="mailto:anbuselvan.devz@gmail.com" aria-label="Email">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="https://leetcode.com/u/AnbuselvanA/" target="_blank" rel="noopener" aria-label="LeetCode">
              <i className="fas fa-code"></i>
            </a>
            <a href="https://github.com/anbu-max" target="_blank" rel="noopener" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/anbuselvan01/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="footer-col links">
          <h4>Navigation</h4>
          <ul>
            <li>
              <Link href="/" onClick={(e) => handleNavClick(e, "me")}>Home</Link>
            </li>
            <li>
              <Link href="/#skills" onClick={(e) => handleNavClick(e, "skills")}>Skills</Link>
            </li>
            <li>
              <Link href="/#experience" onClick={(e) => handleNavClick(e, "me")}>Experience</Link>
            </li>
            <li>
              <Link href="/#projects" onClick={(e) => handleNavClick(e, "projects")}>Projects</Link>
            </li>
            <li>
              <Link href="/information">Full Story</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="footer-col contact">
          <h4>Contact Details</h4>
          <ul>
            <li>
              <i className="fas fa-envelope"></i>
              <span>anbuselvan.devz@gmail.com</span>
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span>Namakkal, Tamil Nadu, India</span>
            </li>
            <li>
              <i className="fas fa-briefcase"></i>
              <span>Available for SDE & Freelance roles</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2026 Anbu Selvan. All Rights Reserved.</p>
        <p>
          Crafted with <i className="fas fa-heart" style={{ color: "#ff652f" }}></i> for modern web
        </p>
      </div>
    </footer>
  );
}
