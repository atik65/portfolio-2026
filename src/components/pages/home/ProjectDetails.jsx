"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle2,
  Maximize2,
  X,
} from "lucide-react";
import { EyeTracking } from "@/components/ui/eye-tracking";

/**
 * ProjectDetails Component
 *
 * A high-end, immersive project showcase inspired by the shared UI concepts.
 * Features staggered reveals, hover-triggered highlights, and structured data visualization.
 */
export default function ProjectDetails({ project, onBack }) {
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Default data for preview if no project is passed
  const fallbackData = {
    title: "ProQure",
    description:
      "ProQure is a full-stack procurement intelligence platform designed to help organizations make smarter, more sustainable purchasing decisions. The platform leverages AI-powered analysis to evaluate suppliers across multiple dimensions including ESG performance, risk exposure, carbon emissions, and procurement spend. Through a conversational AI advisor and a rich analytics dashboard, procurement teams can generate supplier evaluations, visualize spend patterns, and monitor sustainability metrics in real time. ProQure transforms fragmented procurement data into actionable insights, enabling organizations to identify high-risk suppliers, benchmark performance against industry standards, and uncover opportunities for cost optimization and environmental impact reduction.",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "React Router",
      "Framer Motion",
      "GSAP",
      "Recharts",
      "React Hook Form",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT Authentication",
      "Hugging Face API",
    ],
    liveLink: "#",
    githubLink: "#",
    features: [
      "AI-powered supplier evaluation and procurement advisor",
      "Interactive analytics dashboard with real-time procurement metrics",
      "ESG scorecards analyzing environmental, social, and governance performance",
      "Carbon emissions tracking and monthly CO2 trend visualization",
      "Supplier risk assessment and benchmarking against industry standards",
      "Data visualizations including line charts, radar charts, bar charts, and pie charts",
      "Sortable supplier table with sustainability and risk indicators",
      "Exportable procurement reports in PDF and JSON formats",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1504868584819-f8eec7460afc?auto=format&fit=crop&q=80&w=1000",
    ],
  };

  // Merge provided project with fallbackData to ensure features/gallery are always present
  const data = {
    ...fallbackData,
    ...project,
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial Page Entrance
      const tl = gsap.timeline();

      tl.from(".back-btn", {
        opacity: 0,
        x: -20,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".char",
          {
            opacity: 0,
            y: 70,
            rotateX: -90,
            stagger: 0.03,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.4",
        )
        .from(
          ".main-desc",
          { opacity: 0, y: 30, duration: 1, ease: "power3.out" },
          "-=0.8",
        )
        .from(
          ".tech-tag",
          {
            opacity: 0,
            scale: 0.8,
            y: 20,
            stagger: 0.05,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.6",
        )
        .from(
          ".action-buttons",
          { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        );

      // 2. Sections Reveal
      gsap.from(".gallery-header", {
        opacity: 0,
        y: 30,
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 90%",
        },
      });

      gsap.from(".gallery-item", {
        opacity: 0,
        y: 50,
        scale: 0.95,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 80%",
        },
      });

      gsap.from(".feature-header", {
        opacity: 0,
        y: 30,
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 90%",
        },
      });

      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        },
      );

      // Refresh ScrollTrigger after a slight delay to ensure all image heights are accounted for
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }, containerRef);

    // Cleanup
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white pt-32 pb-32 px-6 md:px-12 selection:bg-primary selection:text-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between  mb-8 md:mb-12">
          <button
            onClick={onBack}
            className="back-btn flex items-center gap-3 text-white/40 hover:text-white transition-all group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="text-xs font-black tracking-[0.2em] uppercase">
              Back to Projects
            </span>
          </button>

          {/* eyes for large screen */}
          <div className="hidden sm:block">
            <EyeTracking
              eyeSize={70}
              gap={10}
              irisColor="#1DB954"
              // irisColorSecondary="#1DB954"
              blinkInterval={3000}
            />
          </div>

          <div className="block sm:hidden">
            <EyeTracking
              eyeSize={40}
              gap={10}
              irisColor="#1DB954"
              // irisColorSecondary="#1DB954"
              blinkInterval={3000}
            />
          </div>
        </div>

        {/* Hero Meta Section */}
        <div className="mb-32">
          <h1 className="main-title text-6xl md:text-9xl font-headline font-black mb-12 tracking-tighter leading-none flex flex-wrap">
            {data.title.split("").map((char, i) => (
              <span key={i} className="char inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            <span className="text-primary">.</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-8 space-y-12">
              <p className="main-desc text-white/50 text-xl md:text-2xl leading-relaxed font-medium">
                {data.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {data.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="tech-tag px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-primary text-[10px] sm:text-[11px] font-black uppercase tracking-widest hover:border-primary/40 transition-all cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-12 action-buttons">
              <div className="p-8 rounded-[32px] bg-white/[0.03] border border-white/5 backdrop-blur-sm space-y-4">
                <a
                  href={data.liveLink}
                  target="_blank"
                  className="w-full flex items-center justify-between px-8 py-5 rounded-2xl bg-primary text-black font-headline font-black hover:shadow-[0_0_40px_rgba(29,185,84,0.4)] transition-all duration-300 group"
                >
                  <span className="text-lg">Live Demo</span>
                  <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </a>

                <a
                  href={data.githubLink}
                  target="_blank"
                  className="w-full flex items-center justify-between px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-headline font-bold hover:bg-white/10 transition-all duration-300 group text-lg"
                >
                  <span>View Source</span>
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>

              <div className="px-4">
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">
                  Project Timeline
                </p>
                <p className="text-white font-headline font-bold text-lg italic">
                  2024 — Modernizing Procurement
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-40">
          <h2 className="gallery-header text-4xl md:text-5xl font-headline font-black text-white mb-20 tracking-tighter">
            Gallery<span className="text-primary italic">_</span>
          </h2>

          <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.gallery.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(img)}
                className="gallery-item relative aspect-video rounded-[40px] overflow-hidden group bg-white/[0.02] border border-white/5 cursor-pointer shadow-lg"
              >
                <img
                  src={img}
                  alt={`${data.title} preview ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 border-[1px] border-white/5 rounded-[40px] pointer-events-none group-hover:border-primary/20 transition-colors duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-[2px] transform translate-y-4 group-hover:translate-y-0">
                  <div className="bg-white/10 px-8 py-4 rounded-full border border-white/20 flex items-center gap-3 transform scale-90 group-hover:scale-100 transition-transform duration-500">
                    <Maximize2 className="w-5 h-5 text-primary" />
                    <span className="text-sm font-black tracking-widest uppercase">
                      View Fullscreen
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="pb-20">
          <h2 className="feature-header text-4xl md:text-5xl font-headline font-black text-white mb-20 tracking-tighter">
            Key Features<span className="text-primary italic">.</span>
          </h2>

          <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.features &&
              data.features.map((feature, i) => (
                <div
                  key={i}
                  className="feature-card flex items-start gap-6 p-10 rounded-[40px] bg-white/[0.03] border border-white/10 hover:border-primary/30 hover:bg-white/[0.05] transition-all duration-500 group shadow-lg"
                >
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-500">
                    <CheckCircle2 className="w-5 h-5 text-primary group-hover:text-black transition-colors duration-500" />
                  </div>
                  <p className="text-white/60 text-lg md:text-xl leading-relaxed font-bold group-hover:text-white transition-colors duration-500 italic">
                    {feature}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Lightbox / Fullscreen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/95 backdrop-blur-xl transition-all duration-500 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-10 right-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all group"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>

          <div
            className="max-w-7xl max-h-[90vh] w-full px-6 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Project Fullscreen"
              className="max-w-full max-h-full rounded-3xl object-contain shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </div>
  );
}
