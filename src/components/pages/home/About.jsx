"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight, Sparkles, Code, Globe, Zap } from "lucide-react";

export default function About() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entry animation for image
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          },
        }
      );

      // Multi-layer reveal for content
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );

      // Stats stagger animation
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: "Years Experience", value: "5+", icon: Sparkles },
    { label: "Projects Completed", value: "100+", icon: Code },
    { label: "Happy Clients", value: "20+", icon: Globe },
    { label: "Fast Performance", value: "100%", icon: Zap },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 px-6 md:py-32 overflow-hidden bg-black"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Visual/Image */}
        <div ref={imageRef} className="relative group">
          <div className="relative z-10 aspect-square overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
            {/* 
              Placeholder for Image - In a real scenario, this would be src={atikImage}
              For now, using a stylized graphical element 
            */}
            <div className="w-full h-full flex items-center justify-center p-12">
               <div className="relative w-full h-full border-4 border-dashed border-white/5 rounded-[30px] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
                  <div className="z-10 text-center">
                     <span className="text-white/20 text-[120px] font-black italic select-none">ATIK</span>
                  </div>
               </div>
            </div>
          </div>
          
          {/* Floating Card Design */}
          <div className="absolute -bottom-8 -right-8 z-20 bg-primary p-8 rounded-[32px] shadow-[0_20px_50px_rgba(29,185,84,0.3)] hover:scale-105 transition-transform duration-500">
             <p className="text-black font-headline font-black text-4xl italic leading-none">5+<br/><span className="text-sm font-bold uppercase tracking-widest opacity-60">Years XP</span></p>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col gap-8">
          <div ref={contentRef} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <p className="text-[10px] uppercase tracking-widest font-bold text-white/60">Who Am I</p>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-headline font-black text-white tracking-tighter leading-tight">
              Crafting Digital <br/>
              <span className="text-primary italic">Excellence</span> Through Code
            </h2>
            
            <p className="text-white/50 text-lg leading-relaxed max-w-xl">
              I am <span className="text-white font-bold">Md. Atikul Islam Atik</span>, a dedicated Frontend Developer with a passion for building high-performance, visually stunning web applications. I specialize in turning complex requirements into seamless digital experiences that solve real-world problems.
            </p>
            
            <p className="text-white/40 text-[15px] leading-relaxed max-w-xl italic">
              "My mission is to bridge the gap between creative design and technical precision, ensuring every pixel serves a purpose and every interaction feels natural."
            </p>
          </div>

          {/* Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/5 hover:border-white/10 p-6 rounded-[24px] group transition-all duration-300">
                <stat.icon className="w-5 h-5 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-2xl font-black text-white">{stat.value}</h4>
                <p className="text-[10px] uppercase tracking-wider font-bold text-white/30">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* About CTA */}
          <div className="mt-4">
             <button className="inline-flex items-center gap-3 text-white/60 hover:text-primary transition-colors group font-bold">
                Learn more about my process
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
             </button>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
}
