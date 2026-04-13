"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  ChevronDown,
  Code,
  LayoutGrid,
  Medal,
  ArrowRight,
  Menu,
  X,
  Home,
  User,
  Briefcase,
  FolderOpen,
  Mail,
} from "lucide-react";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileLinksRef = useRef([]);

  const navLinks = [
    { href: "#", label: "Home", active: true, icon: Home },
    { href: "#about", label: "About", active: false, icon: User },
    { href: "#services", label: "Services", active: false, icon: Briefcase },
    { href: "#portfolio", label: "Portfolio", hasDropdown: true, icon: FolderOpen },
    { href: "#contact", label: "Contact", active: false, icon: Mail },
  ];

  const portfolioItems = [
    { label: "Skills", icon: Code, href: "#skills" },
    { label: "Work", icon: LayoutGrid, href: "#work" },
    { label: "Experience", icon: Medal, href: "#experience" },
  ];

  const onMobileMenuOpenChange = (open) => {
    if (open) {
      setTimeout(() => {
        gsap.fromTo(
          mobileLinksRef.current,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power3.out",
          }
        );
      }, 100);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: 10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" }
      );
    }
  }, [dropdownOpen]);

  const ctaArrowRef = useRef(null);

  const onCtaEnter = () => {
    gsap.to(ctaArrowRef.current, { x: 4, duration: 0.3, ease: "power2.out" });
  };
  const onCtaLeave = () => {
    gsap.to(ctaArrowRef.current, { x: 0, duration: 0.3, ease: "power2.in" });
  };

  return (
    <nav className="fixed top-8 left-0 right-0 z-[1000] px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* LOGO */}
        <div className="flex-shrink-0">
          <Link href="/">
            <div className="w-11 h-11 bg-primary rounded-[14px] flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(29,185,84,0.3)]">
              <span className="text-black font-black text-2xl">A</span>
            </div>
          </Link>
        </div>

        {/* DESKTOP NAV */}
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
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />

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
                            <item.icon className="w-5 h-5 text-white/40 group-hover/item:text-primary transition-colors" />
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

        {/* CTA & MOBILE TRIGGER */}
        <div className="flex items-center gap-4">
          <button
            onMouseEnter={onCtaEnter}
            onMouseLeave={onCtaLeave}
            className="hidden sm:flex bg-primary font-bold text-white uppercase text-[11px] tracking-widest px-6 py-3 rounded-full items-center gap-3 hover:shadow-[0_0_30px_rgba(29,185,84,0.4)] transition-all duration-300 active:scale-95"
          >
            Get Started
            <div
              ref={ctaArrowRef}
              className="w-6 h-6 p-1 flex items-center justify-center bg-black/20 rounded-full"
            >
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          <Sheet onOpenChange={onMobileMenuOpenChange}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-white bg-white/5 rounded-full border border-white/10">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              showCloseButton={false}
              side="right"
              className="w-full sm:max-w-md bg-[#0b0c0b] border-l border-white/5 p-8 flex flex-col justify-between z-1000"
            >
              <div className="flex flex-col gap-10">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-headline font-black text-white tracking-tighter uppercase leading-none">
                      Md. Atikul Islam <span className="text-primary italic">Atik</span>
                    </h2>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mt-1">
                      Software Engineer
                    </p>
                  </div>
                  <SheetClose asChild>
                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </SheetClose>
                </div>

                {/* Nav Links Card */}
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-4 flex flex-col">
                  {navLinks.map((link, idx) => {
                    const isPortfolio = link.label === "Portfolio";
                    return (
                      <div key={link.label} className="flex flex-col">
                        <div
                          ref={(el) => (mobileLinksRef.current[idx] = el)}
                          onClick={() => {
                            if (isPortfolio) {
                              setMobilePortfolioOpen(!mobilePortfolioOpen);
                            }
                          }}
                        >
                          <Link
                            href={isPortfolio ? "#" : link.href}
                            className={`flex items-center gap-4 px-6 py-5 rounded-[24px] transition-all duration-300 group ${
                              link.active
                                ? "bg-[#12261a] text-primary"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <link.icon className={`w-5 h-5 ${link.active ? "text-primary" : "text-white/40 group-hover:text-white"}`} />
                            <span className="font-bold text-[15px] tracking-tight flex-1">
                              {link.label}
                            </span>
                            {link.active && (
                              <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(29,185,84,0.8)]" />
                            )}
                            {link.hasDropdown && (
                              <ChevronDown className={`w-4 h-4 text-white/20 transition-transform duration-300 ${mobilePortfolioOpen ? "rotate-180" : ""}`} />
                            )}
                          </Link>
                        </div>

                        {/* Nested Portfolio Items */}
                        {isPortfolio && mobilePortfolioOpen && (
                          <div className="flex flex-col gap-1 pl-12 pr-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            {portfolioItems.map((item) => (
                              <SheetClose asChild key={item.label}>
                                <Link
                                  href={item.href}
                                  className="flex items-center gap-3 py-3 text-white/40 hover:text-primary transition-colors font-bold text-sm"
                                >
                                  <item.icon className="w-4 h-4" />
                                  {item.label}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer CTA */}
              <button className="w-full bg-primary text-white  font-black py-6 rounded-[24px] hover:shadow-[0_0_40px_rgba(29,185,84,0.3)] transition-all duration-500 uppercase text-xs tracking-widest active:scale-[0.98]">
                Get In Touch
              </button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
