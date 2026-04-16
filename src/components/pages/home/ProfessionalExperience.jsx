"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Briefcase,
  MapPin,
  Calendar,
  Building2,
  ArrowRight,
  Star,
} from "lucide-react";
import { personalData } from "@/data/personalData";

export default function ProfessionalExperience() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveal (Matching Skills.jsx style)
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

      // Timeline entries reveal
      gsap.fromTo(
        timelineRef.current.querySelectorAll(".experience-entry"),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.3,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
          },
        },
      );

      // Timeline line animation
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 90%",
            scrub: true,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const experiences = personalData.experience.map((exp) => ({
    ...exp,
    achievements: exp.description ? [exp.description] : [], // Use description as achievement for now or refine data
    type: exp.type.toUpperCase(),
  }));

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-24 px-6 md:py-16 overflow-hidden bg-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header (Matching established style) */}
        <div ref={headerRef} className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mx-auto transition-all hover:border-primary/40">
            <Star className="w-3 h-3 text-primary fill-primary" />
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/60 font-headline">
              Career Path
            </p>
          </div>
          <h2 className="text-4xl md:text-6xl font-headline font-black text-white tracking-tighter leading-tight">
            Professional <span className="text-primary italic">Experience</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            A timeline of my professional journey, highlighting my roles,
            responsibilities, and the impact I've delivered across various
            organizations.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Vertical Timeline Line */}
          <div className="absolute left-5 md:left-9 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary to-primary-container opacity-30 timeline-line"></div>

          <div className="space-y-16">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="experience-entry relative pl-12 md:pl-24 group"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[0.85rem] md:left-[1.85rem] top-8 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(29,185,84,0.8)] z-10 group-hover:scale-125 transition-transform duration-300"></div>

                <div className="bg-white/5 rounded-[32px] p-8 md:p-12 border border-white/5 backdrop-blur-sm relative overflow-hidden transition-all duration-500 hover:bg-white/[0.08] hover:border-primary/20">
                  {/* Glow Effect */}
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-700"></div>

                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8 relative z-10">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase mb-4">
                        {exp.type}
                      </div>
                      <h3 className="text-3xl font-headline font-black text-white mb-3 tracking-tight group-hover:text-primary transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/40 font-bold text-xs uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5" />
                          {exp.company}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20"></span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <div className="text-white/60 font-headline font-bold text-lg md:text-xl md:text-right flex items-center gap-2 lg:block">
                      <Calendar className="w-4 h-4 lg:hidden text-primary" />
                      {exp.period}
                    </div>
                  </div>

                  <ul className="space-y-4 relative z-10">
                    {exp.achievements.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 group/bullet"
                      >
                        <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0 group-hover/bullet:translate-x-1 transition-transform" />
                        <p className="text-white/50 leading-relaxed text-sm md:text-base">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
