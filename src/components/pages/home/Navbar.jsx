"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#", label: "Home", active: true },
    { href: "#about", label: "About", active: false },
    { href: "#services", label: "Services", active: false },
    { href: "#portfolio", label: "Portfolio", hasDropdown: true },
    { href: "#contact", label: "Contact", active: false },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-[1000] px-4 md:px-12">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo - Left */}
        <div className="flex-shrink-0">
          <Link href="/">
            <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(29,185,84,0.4)] hover:scale-105 transition-transform duration-300">
              <span className="text-on-primary font-black text-xl tracking-tighter">
                K
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Capsule - Center */}
        <div className="hidden md:flex items-center gap-1 p-1.5 bg-black/40 backdrop-blur-xl rounded-full border border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`px-5 py-2 rounded-full font-bold text-[11px] uppercase tracking-wide transition-all duration-300 ${
                link.active
                  ? "bg-white/10 text-primary"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-1">
                {link.label}
                {link.hasDropdown && (
                  <span className="material-symbols-outlined text-[14px]">
                    expand_more
                  </span>
                )}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA Button - Right */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex bg-primary text-on-primary font-headline font-extrabold uppercase text-[10px] tracking-widest px-6 py-3 rounded-full items-center gap-2 hover:shadow-[0_0_25px_rgba(29,185,84,0.4)] transition-all duration-300 active:scale-95">
            Get Started
            <div className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[12px] font-black">
                chevron_right
              </span>
            </div>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 p-6 bg-surface-container/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-fade-in">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-3 rounded-xl font-bold text-sm uppercase tracking-tight transition-all duration-300 ${
                  link.active
                    ? "bg-primary/10 text-primary"
                    : "text-white hover:bg-white/5"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center justify-between">
                  {link.label}
                  {link.hasDropdown && (
                    <span className="material-symbols-outlined text-sm">
                      expand_more
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
