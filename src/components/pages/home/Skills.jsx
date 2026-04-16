"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Code2,
  Terminal,
  Layers,
  Paintbrush,
  Database,
  Cpu,
  Rocket,
  Server,
  GitBranch,
  Layout,
  Star,
  Globe,
  Monitor,
  Box,
  Fingerprint,
} from "lucide-react";
import { personalData } from "@/data/personalData";
import { TextRepel } from "@/components/ui/text-repel";
import { GithubCalendar } from "@/components/ui/github-calendar";

const iconMap = {
  Code2,
  Terminal,
  Layers,
  Paintbrush,
  Database,
  Cpu,
  Layout,
  Globe,
  Server,
  Monitor,
  Box,
  Fingerprint,
  GitBranch,
  CheckCircle2: Box,
};

export default function Skills() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

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

      // Tech Grid staggered entry
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const allSkills = [
    ...personalData.skills.frontend,
    ...personalData.skills.backend,
    ...personalData.skills.tools,
  ].map((skill) => ({
    ...skill,
    icon: iconMap[skill.icon] || Code2,
    featured: skill.level === "Expert",
  }));

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-24 px-6 md:py-32 bg-black overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/20 rounded-full blur-[2px]"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mx-auto transition-all hover:border-primary/40">
            <Star className="w-3 h-3 text-primary fill-primary" />
            <span className="font-headline font-bold text-[10px] tracking-[0.2em] text-white/80">
              SKILLS & TECHNOLOGIES
            </span>
          </div>

          <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
            <TextRepel text="Technical" />
            <span className="text-primary italic ps-3">
              <TextRepel text="Arsenal" />
            </span>
          </h2>

          <p className="text-white/40 text-lg max-w-xl mx-auto font-light leading-relaxed">
            Leveraging cutting-edge technologies to build performant, scalable,
            and visually stunning digital experiences.
          </p>
        </div>

        {/* Tech Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allSkills.map((skill, idx) => (
            <div
              key={idx}
              className={`group flex items-center gap-3 px-6 py-4 rounded-full border transition-all duration-500 backdrop-blur-sm cursor-default hover:-translate-y-1.5 hover:scale-[1.02]
                ${
                  skill.featured
                    ? "bg-primary/5 border-primary shadow-[0_0_20px_rgba(29,185,84,0.3)] hover:shadow-[0_10px_30px_rgba(29,185,84,0.4)]"
                    : "bg-white/5 border-white/5 hover:border-primary/40 hover:bg-white/10 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                }`}
            >
              <skill.icon
                className={`w-5 h-5 ${skill.featured ? "text-primary" : "text-primary/70 group-hover:text-primary transition-colors"}`}
              />
              <span className="font-headline font-bold text-sm tracking-tight text-white/90">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

        {/* github metircs */}
        <div className="mt-12  flex justify-center">
          <GithubCalendar variant="minimal" username="atik65" />
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center group">
          <p className="font-headline text-2xl md:text-4xl font-bold tracking-tight text-white">
            You've Got A Challenge?{" "}
            <span className="text-primary italic cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all duration-500 group-hover:after:w-full">
              Let's Talk!
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
