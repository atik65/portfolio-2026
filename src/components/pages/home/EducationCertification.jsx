"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  GraduationCap,
  Award,
  Calendar,
  ChevronDown,
  Star,
  Bookmark,
  CheckCircle2,
} from "lucide-react";

import { personalData } from "@/data/personalData";
import { TextRepel } from "@/components/ui/text-repel";

export default function EducationAchievements() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);
  const achievementsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveal
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
        timelineRef.current.querySelectorAll(".education-entry"),
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

      // Achievements reveal
      gsap.fromTo(
        achievementsRef.current.children,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: achievementsRef.current,
            start: "top 85%",
          },
        },
      );

      // Vertical line animation
      gsap.fromTo(
        ".edu-timeline-line",
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

  const items = personalData.education.map((edu) => ({
    title: edu.degree,
    institution: edu.institution,
    period: edu.period,
    type: "ACADEMIC",
    highlight: edu.achievements,
    details: edu.details,
  }));

  return (
    <section
      id="education"
      ref={containerRef}
      className="relative py-24 px-6 md:py-32 overflow-hidden bg-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mx-auto transition-all hover:border-primary/40">
            <Star className="w-3 h-3 text-primary fill-primary" />
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/60 font-headline">
              Academic & Excellence
            </p>
          </div>
          <h2 className="text-4xl md:text-6xl font-headline font-black text-white tracking-tighter leading-tight">
            <TextRepel text="Education &" />
            <span className="text-primary italic ps-3">
              <TextRepel text="Achievements" />
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left: Education Timeline */}
          <div className="lg:col-span-7 space-y-12">
            <h3 className="text-2xl font-headline font-black text-white/40 uppercase tracking-widest mb-12 flex items-center gap-4">
              <GraduationCap className="w-6 h-6 text-primary" />
              Education
            </h3>

            <div className="relative" ref={timelineRef}>
              <div className="absolute left-5 md:left-9 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary to-primary-container opacity-30 edu-timeline-line"></div>
              <div className="space-y-12">
                {items.map((item, idx) => (
                  <EducationItem key={idx} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Achievements Grid */}
          <div className="lg:col-span-5 space-y-12">
            <h3 className="text-2xl font-headline font-black text-white/40 uppercase tracking-widest mb-12 flex items-center gap-4">
              <Award className="w-6 h-6 text-primary" />
              Honors & Awards
            </h3>

            <div ref={achievementsRef} className="space-y-6">
              {personalData.achievements.map((achievement, i) => (
                <div
                  key={i}
                  className="group relative p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-primary/20 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
                >
                  {/* Decor */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-500">
                      <Award className="w-6 h-6 text-primary group-hover:text-black transition-colors duration-500" />
                    </div>

                    <h4 className="text-xl font-headline font-black text-white mb-2 tracking-tight group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h4>

                    <p className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-4">
                      {achievement.organization}
                    </p>

                    <p className="text-sm text-white/50 leading-relaxed font-medium">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="education-entry relative pl-12 md:pl-24 group">
      {/* Timeline Dot */}
      <div className="absolute left-[0.85rem] md:left-[1.85rem] top-8 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(29,185,84,0.8)] z-10 group-hover:scale-125 transition-transform duration-300"></div>

      <div className="bg-white/5 rounded-[32px] p-8 md:p-12 border border-white/5 backdrop-blur-sm relative overflow-hidden transition-all duration-500 hover:bg-white/[0.08] hover:border-primary/20">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-700"></div>

        <div className="flex flex-col lg:flex-row lg:items-start gap-8 relative z-10">
          {/* Left Column: Icon & Date (Inspired by image) */}
          <div className="flex flex-col items-start gap-4 shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-500">
              <GraduationCap className="w-7 h-7 text-primary" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/60">
              <Calendar className="w-3 h-3 text-primary" />
              {item.period}
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="flex-grow">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase mb-4">
              {item.type}
            </div>
            <h3 className="text-3xl font-headline font-black text-white mb-3 tracking-tight group-hover:text-primary transition-colors">
              {item.title}
            </h3>

            <div className="flex items-center gap-2 text-white/40 font-bold text-xs uppercase tracking-wider mb-6">
              <Bookmark className="w-3.5 h-3.5 text-primary" />
              {item.institution}
            </div>

            <p className="text-white/50 leading-relaxed text-sm md:text-base mb-8 max-w-2xl">
              {item.highlight}
            </p>

            {/* View Course Highlights Accordion */}
            <div className="border-t border-white/5 pt-6">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-primary font-bold text-sm group/btn"
              >
                <span>View Course Highlights</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0"} overflow-hidden`}
              >
                <div className="min-h-0">
                  <ul className="space-y-4 pl-2">
                    {item.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span className="text-white/40 text-sm leading-relaxed">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
