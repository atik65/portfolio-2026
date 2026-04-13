"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { MoveRight } from "lucide-react";

export default function FeaturedWorks() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        },
      );

      // Projects Grid Animation
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative py-24 px-6 md:py-32 overflow-hidden bg-black"
    >
      {/* Concentric Background Decor */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary/20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/15"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mx-auto transition-all hover:border-primary/40">
            <Star className="w-3 h-3 text-primary fill-primary" />
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/60 font-headline">
              Portfolio
            </p>
          </div>
          <h2 className="text-4xl md:text-7xl font-headline font-black text-white tracking-tighter leading-tight">
            Featured <span className="text-primary italic">Work</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-sm md:text-base">
            A selection of my recent full-stack applications, showcasing complex
            problem-solving, scalable architectures, and modern UI/UX design.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {projects.map((project, idx) => (
            <article
              key={idx}
              className="group relative flex flex-col bg-white/5 border border-white/10 rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_20px_50px_rgba(29,185,84,0.1)] backdrop-blur-sm"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -ml-16 -mt-16 group-hover:bg-primary/10 transition-all duration-700"></div>

              <div className="aspect-video relative overflow-hidden bg-white/5 mx-6 mt-6 rounded-[24px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow relative z-10">
                <h3 className="text-2xl font-headline font-black text-white mb-3 tracking-tight group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/40 mb-8 flex-grow leading-relaxed text-sm">
                  {project.description.split(".")[0]}.
                </p>
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-bold group/link self-start text-sm"
                >
                  View Case Study
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Footer Action */}
        <div className="flex justify-center">
          <button className="inline-flex items-center gap-3 px-10 py-5 rounded-full border-2 border-primary text-primary font-black font-headline transition-all duration-300 hover:bg-primary/10 hover:shadow-[0_0_30px_rgba(29,185,84,0.2)] group text-sm uppercase tracking-widest">
            View All Projects
            <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
