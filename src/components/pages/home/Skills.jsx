"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { 
  Code2, 
  Database, 
  Wrench, 
  Cpu,
  CheckCircle2
} from "lucide-react";

export default function Skills() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const categoriesRef = useRef(null);

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
             }
          }
       );

       // Categories stagger reveal
       gsap.fromTo(
          categoriesRef.current.children,
          { opacity: 0, y: 40 },
          {
             opacity: 1,
             y: 0,
             stagger: 0.2,
             duration: 0.8,
             ease: "power3.out",
             scrollTrigger: {
                trigger: categoriesRef.current,
                start: "top 80%",
             }
          }
       );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const skillCategories = [
    {
      title: "Web Technologies",
      icon: Code2,
      skills: [
        "Next.js", "React.js", "JavaScript", "Node.js", 
        "Express.js", "Redux", "Zustand", "Jotai",
        "Tailwind CSS", "Material UI", "Bootstrap", "HTML/CSS"
      ]
    },
    {
      title: "Backend & Database",
      icon: Database,
      skills: [
        "MongoDB", "MySQL", "Firebase", "REST APIs",
        "OOP", "DS"
      ]
    },
    {
      title: "Programming",
      icon: Cpu,
      skills: [
        "C++", "Java", "Computer Science", "Software Architecture"
      ]
    },
    {
      title: "Tools & Deploy",
      icon: Wrench,
      skills: [
        "Git & GitHub", "Azure", "Linux", "NGINX",
        "Vercel", "VS Code", "Postman"
      ]
    }
  ];

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-24 px-6 md:py-32 bg-black overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/60">My Stack</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-headline font-black text-white tracking-tighter uppercase leading-tight">
            Technical <span className="text-primary italic">Arsenal</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-sm md:text-base">
            I use a modern and performant stack to build scalable applications that deliver exceptional user experiences.
          </p>
        </div>

        {/* Categories Grid */}
        <div ref={categoriesRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => (
            <div 
              key={idx} 
              className="group relative bg-[#0b0c0b] border border-white/5 rounded-[32px] p-8 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(29,185,84,0.05)]"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-500">
                <category.icon className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
              </div>
              
              <h3 className="text-xl font-headline font-black text-white mb-6 uppercase tracking-tight">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <div 
                    key={sIdx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group/skill"
                  >
                    <CheckCircle2 className="w-3 h-3 text-primary/40 group-hover/skill:text-primary transition-colors" />
                    <span className="text-[11px] font-bold text-white/60 group-hover/skill:text-white transition-colors">{skill}</span>
                  </div>
                ))}
              </div>

              {/* Decorative accent */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <div className="w-1 h-1 rounded-full bg-primary animate-ping"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
