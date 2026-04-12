"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { href: "#", label: "Home", active: true },
    { href: "#about", label: "About", active: false },
    { href: "#services", label: "Services", active: false },
    { href: "#portfolio", label: "Portfolio", hasDropdown: true },
    { href: "#contact", label: "Contact", active: false },
  ];

  const portfolioItems = [
    { label: "Skills", icon: "code", href: "#skills" },
    { label: "Projects", icon: "grid_view", href: "#projects" },
    { label: "Experience", icon: "military_tech", href: "#experience" },
  ];

  useEffect(() => {
    if (dropdownOpen) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: 10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" }
      );
    }
  }, [dropdownOpen]);

  return (
    <nav className="fixed top-8 left-0 right-0 z-[1000] px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* LOGO: Rounded Green Rect + Black K */}
        <div className="flex-shrink-0">
          <Link href="/">
            <div className="w-11 h-11 bg-primary rounded-[14px] flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(29,185,84,0.3)]">
              <span className="text-black font-black text-2xl">K</span>
            </div>
          </Link>
        </div>

        {/* NAVIGATION CAPSULE: Dark container with pill shape */}
        <div className="hidden md:flex items-center gap-1.5 p-1 bg-[#0b0c0b]/80 backdrop-blur-2xl rounded-full border border-white/5 shadow-2xl">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group">
              {link.hasDropdown ? (
                <button
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                  className={`px-5 py-2.5 rounded-full font-bold text-[13px] tracking-tight transition-all duration-300 flex items-center gap-1.5 ${
                    dropdownOpen ? "text-white" : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}>
                    expand_more
                  </span>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48"
                    >
                      <div className="bg-[#0b0c0b] border border-white/10 rounded-2xl p-2 shadow-2xl overflow-hidden">
                        {portfolioItems.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group/item"
                          >
                            <span className="material-symbols-outlined text-white/40 group-hover/item:text-primary transition-colors text-[20px]">
                              {item.icon}
                            </span>
                            <span className="text-white font-bold text-[13px]">
                              {item.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </button>
              ) : (
                <Link
                  href={link.href}
                  className={`px-5 py-2.5 rounded-full font-bold text-[13px] tracking-tight transition-all duration-300 block ${
                    link.active
                      ? "bg-[#12261a] text-primary"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* CTA BUTTON: Green Rounded with Icon */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex bg-primary text-black font-headline font-black uppercase text-[11px] tracking-widest px-8 py-4 rounded-full items-center gap-3 hover:shadow-[0_0_30px_rgba(29,185,84,0.4)] transition-all duration-300 active:scale-95">
            Get Started
            <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[14px] font-black">
                arrow_forward
              </span>
            </div>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Overlay) */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-24 left-6 right-6 p-6 bg-[#0b0c0b]/95 backdrop-blur-2xl rounded-3xl border border-white/5 shadow-2xl animate-fade-in">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-4 rounded-2xl font-bold text-base transition-all duration-300 ${
                  link.active ? "bg-primary/10 text-primary" : "text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
