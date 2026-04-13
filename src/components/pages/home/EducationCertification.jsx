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
  CheckCircle2
} from "lucide-react";

export default function EducationCertification() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);

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
        }
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
        }
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
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const items = [
    {
      title: "BSc in Computer Science & Engineering",
      institution: "University of Asia Pacific",
      period: "2020 — 2024",
      type: "DEGREE",
      highlight: "Graduated with a record CGPA of 3.97, securing the top position in the department.",
      details: [
        "Core focus on Software Engineering, Data Structures, and AI.",
        "Ranked top of the batch with consistent academic excellence.",
        "Runner-up at INNOVATEX National Innovation Competition.",
        "Awarded University Merit Scholarship for all semesters."
      ],
    },
    {
      title: "Full Stack Web Development",
      institution: "Specialized Training",
      period: "2022 — 2023",
      type: "CERTIFICATION",
      highlight: "In-depth specialization in modern web ecosystems and high-performance architectures.",
      details: [
        "Advanced proficiency in Next.js, React, and TypeScript.",
        "Full-stack integration using Django and Express.js.",
        "Specialized in clean architecture and scalable system design.",
        "Implementation of CI/CD pipelines and DevOps best practices."
      ],
    },
  ];

  return (
    <section 
      id="education" 
      ref={containerRef}
      className="relative py-24 px-6 md:py-32 overflow-hidden bg-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header (Exact text from user request) */}
        <div ref={headerRef} className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mx-auto transition-all hover:border-primary/40">
            <Star className="w-3 h-3 text-primary fill-primary" />
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/60 font-headline">Academic Journey</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-headline font-black text-white tracking-tighter leading-tight">
            Education & <span className="text-primary italic">Certifications</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            My formal education and continuous learning path, building a strong foundation in software engineering, artificial intelligence, and business management.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative" ref={timelineRef}>
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary to-primary-container opacity-30 edu-timeline-line"></div>

          <div className="space-y-16">
            {items.map((item, idx) => (
              <EducationItem key={idx} item={item} />
            ))}
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
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
               </button>

               <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'} overflow-hidden`}>
                  <div className="min-h-0">
                    <ul className="space-y-4 pl-2">
                       {item.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3">
                             <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                             <span className="text-white/40 text-sm leading-relaxed">{detail}</span>
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
