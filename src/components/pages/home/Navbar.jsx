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
  GraduationCap,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import { personalData } from "@/data/personalData";
import { Signature } from "@/components/ui/signature";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const dropdownRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    // { href: "/", id: "home", label: "Home", icon: Home },
    { href: "/#about", id: "about", label: "About", icon: User },
    { href: "/#services", id: "services", label: "Services", icon: Briefcase },
    {
      href: "/#portfolio",
      id: "portfolio",
      label: "Portfolio",
      hasDropdown: true,
      icon: FolderOpen,
    },
    { href: "/#contact", id: "contact", label: "Contact", icon: Mail },
  ];

  const portfolioItems = [
    { label: "Skills", icon: Code, href: "/#skills", id: "skills" },
    { label: "Work", icon: LayoutGrid, href: "/#work", id: "work" },
    {
      label: "Experience",
      icon: Medal,
      href: "/#experience",
      id: "experience",
    },
    {
      label: "Education",
      icon: GraduationCap,
      href: "/#education",
      id: "education",
    },
    { label: "Process", icon: Briefcase, href: "/#process", id: "process" },
  ];

  // Smooth scroll handler
  const handleNavClick = (e, href, id) => {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
      }
    }
    // If not on home page, normal Link behavior will handle it
  };

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Trigger when section is in top-middle of view
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Elements to observe
    const sections = [
      "home",
      "about",
      "services",
      "skills",
      "work",
      "experience",
      "education",
      "process",
      "contact",
    ];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

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
          },
        );
      }, 100);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: 10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" },
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
    <nav className="fixed top-4 md:top-8 left-0 right-0 z-[1000] px-5 md:px-12 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between bg-white/[0.04] backdrop-blur-2xl md:bg-transparent md:backdrop-blur-none  md:pl-3.5 pr-2 md:py-2 md:p-0 rounded-full md:rounded-none border border-white/10 md:border-none shadow-2xl md:shadow-none">
        {/* LOGO */}
        <div
          onClick={() => {
            router.push("/");

            // and scroll to top
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className="flex-shrink-0 bg-transparent md:bg-[#0b0c0b]/80 md:backdrop-blur-2xl md:rounded-full max-w-36 md:shadow-2xl px-2 md:px-5 pt-2"
        >
          {/* <Link href="/">
            <div className="w-11 h-11 bg-primary rounded-[14px] flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(29,185,84,0.3)]">
              <span className="text-black font-black text-2xl">A</span>
            </div>
          </Link> */}

          <Signature
            text="Atik"
            fontSize={16}
            duration={1.5}
            inView={true}
            once={false}
            className="cursor-pointer py-1 md:py-0 text-primary md:text-white"
          />
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-1.5 p-1 bg-[#0b0c0b]/80 backdrop-blur-2xl rounded-full border border-white/5 shadow-2xl">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group">
              {link.hasDropdown ? (
                <div
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="relative"
                >
                  <button
                    className={`px-5 py-2.5 rounded-full font-bold text-[13px] tracking-tight transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                      activeSection === "portfolio" ||
                      portfolioItems.some(
                        (item) => activeSection === item.id,
                      ) ||
                      dropdownOpen
                        ? "text-primary bg-primary/10"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

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
                            onClick={(e) =>
                              handleNavClick(e, item.href, item.id)
                            }
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group/item ${
                              activeSection === item.id
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-white/5"
                            }`}
                          >
                            <item.icon
                              className={`w-5 h-5 transition-colors ${
                                activeSection === item.id
                                  ? "text-primary"
                                  : "text-white/40 group-hover/item:text-primary"
                              }`}
                            />
                            <span
                              className={`font-bold text-[13px] ${
                                activeSection === item.id
                                  ? "text-primary"
                                  : "text-white"
                              }`}
                            >
                              {item.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`px-5 py-2.5 rounded-full font-bold text-[13px] tracking-tight transition-all duration-300 block ${
                    activeSection === link.id
                      ? "bg-primary/10 text-primary"
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
            onClick={(e) => handleNavClick(e, "/#about", "about")}
            className="hidden sm:flex bg-primary font-bold text-white uppercase text-[11px] tracking-widest px-6 py-3 rounded-full items-center gap-3 hover:shadow-[0_0_30px_rgba(29,185,84,0.4)] transition-all duration-300 active:scale-95 cursor-pointer"
          >
            Get Started
            <div
              ref={ctaArrowRef}
              className="w-6 h-6 p-1 flex items-center justify-center bg-black/20 rounded-full"
            >
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-white bg-white/5 rounded-full border border-white/10">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              showCloseButton={false}
              side="right"
              className="w-full sm:max-w-md bg-[#0b0c0b] border-l border-white/5 p-8 flex flex-col justify-between z-[1000] overflow-y-auto"
            >
              <div className="flex flex-col gap-10">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-headline font-black text-white tracking-tighter uppercase leading-none">
                      {personalData.firstName}{" "}
                      <span className="text-primary italic">
                        {personalData.nickname}
                      </span>
                    </h2>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mt-1">
                      {personalData.role}
                    </p>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav Links Card */}
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-4 flex flex-col">
                  {navLinks.map((link, idx) => {
                    const isPortfolio = link.label === "Portfolio";
                    const isActive =
                      activeSection === link.id ||
                      (isPortfolio &&
                        portfolioItems.some((i) => activeSection === i.id));

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
                            onClick={(e) => {
                              if (!isPortfolio) {
                                handleNavClick(e, link.href, link.id);
                                setMobileMenuOpen(false);
                              }
                            }}
                            className={`flex items-center gap-4 px-6 py-5 rounded-[24px] transition-all duration-300 group ${
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <link.icon
                              className={`w-5 h-5 ${isActive ? "text-primary" : "text-white/40 group-hover:text-white"}`}
                            />
                            <span className="font-bold text-[15px] tracking-tight flex-1">
                              {link.label}
                            </span>
                            {isActive && (
                              <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(29,185,84,0.8)]" />
                            )}
                            {link.hasDropdown && (
                              <ChevronDown
                                className={`w-4 h-4 text-white/20 transition-transform duration-300 ${mobilePortfolioOpen ? "rotate-180" : ""}`}
                              />
                            )}
                          </Link>
                        </div>

                        {/* Nested Portfolio Items */}
                        {isPortfolio && mobilePortfolioOpen && (
                          <div className="flex flex-col gap-1 pl-12 pr-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            {portfolioItems.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                onClick={(e) => {
                                  handleNavClick(e, item.href, item.id);
                                  setMobileMenuOpen(false);
                                }}
                                className={`flex items-center gap-3 py-3 font-bold text-sm transition-colors ${
                                  activeSection === item.id
                                    ? "text-primary"
                                    : "text-white/40 hover:text-primary"
                                }`}
                              >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                              </Link>
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
