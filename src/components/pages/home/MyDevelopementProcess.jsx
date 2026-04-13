"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Code, Rocket, ShieldCheck, Activity, Star } from "lucide-react";

export default function MyDevelopementProcess() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);
  const bentoRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveal (Matching Skills.jsx)
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

      // Timeline Animation
      gsap.fromTo(
        timelineRef.current.querySelectorAll(".process-step"),
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
          },
        }
      );

      // Bento Animation
      gsap.fromTo(
        bentoRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bentoRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      title: "Modular Development",
      description: "Crafting clean, scalable code using modern frameworks and performance-first modular architecture.",
      icon: Code,
    },
    {
      title: "Deployment & Launch",
      description: "Seamless CI/CD integration and cloud deployment ensuring high availability and global reach.",
      icon: Rocket,
    },
    {
      title: "Maintenance & Support",
      description: "Continuous monitoring, regular security updates, and performance optimization post-launch.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section 
      id="process" 
      ref={containerRef}
      className="relative py-20 px-6 md:py-32 overflow-hidden bg-black"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] border border-primary/20 rounded-full blur-[2px]"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] md:w-[1200px] md:h-[1200px] border border-primary/10 rounded-full blur-[4px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        {/* Header (Matching Skills.jsx style) */}
        <div ref={headerRef} className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/60">How It Works</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-headline font-black text-white tracking-tighter leading-tight">
            Development <span className="text-primary italic">Process</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-sm md:text-base">
            A streamlined approach to turning complex ideas into high-performance digital solutions with technical precision.
          </p>
        </div>

        {/* Timeline Component */}
        <div className="relative mt-20" ref={timelineRef}>
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="process-step flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-white/5 border border-primary/30 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(29,185,84,0.1)] transition-all duration-500 group-hover:border-primary group-hover:bg-primary/10 group-hover:shadow-[0_0_30px_rgba(29,185,84,0.3)] group-hover:scale-105">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-headline text-2xl font-bold text-white mb-4 transition-colors group-hover:text-primary">
                  {step.title}
                </h3>
                <p className="text-white/40 leading-relaxed max-w-[280px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bento-style Process Detail */}
        <div ref={bentoRef} className="mt-32 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 bg-white/5 rounded-[32px] p-8 md:p-10 border border-white/5 backdrop-blur-sm group hover:border-primary/20 transition-colors duration-500">
            <div className="text-primary font-black text-xs tracking-widest uppercase mb-4">01. Strategy</div>
            <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">Technical Discovery</h4>
            <p className="text-white/40 text-sm md:text-base leading-relaxed">
              Every project begins with a comprehensive audit of your technical requirements and business goals to ensure the optimal tech stack selection and architectural roadmap.
            </p>
          </div>

          <div className="bg-white/5 rounded-[32px] p-8 md:p-10 border border-white/5 flex flex-col justify-center items-center text-center group hover:border-primary/20 transition-colors duration-500">
            <div className="text-4xl font-black text-primary mb-2">98%</div>
            <div className="text-[10px] uppercase tracking-widest font-black text-white/30 group-hover:text-white/60 transition-colors">Code Coverage</div>
            <Activity className="w-8 h-8 text-primary/10 mt-4 group-hover:text-primary/30 transition-colors" />
          </div>

          <div className="bg-white/5 rounded-[32px] p-8 md:p-10 border border-white/5 flex flex-col justify-center items-center text-center group hover:border-primary/20 transition-colors duration-500">
            <div className="text-4xl font-black text-primary mb-2">24/7</div>
            <div className="text-[10px] uppercase tracking-widest font-black text-white/30 group-hover:text-white/60 transition-colors">Monitoring</div>
            <div className="w-2 h-2 rounded-full bg-primary animate-ping mt-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
