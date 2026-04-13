"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight, Sparkles, Code, Globe, Zap, Briefcase, GraduationCap } from "lucide-react";

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
    { label: "Years Experience", value: "2", icon: Sparkles },
    { label: "Projects Completed", value: "20+", icon: Code },
    { label: "Happy Customers", value: "10+", icon: Globe },
    { label: "Awards Won", value: "5+", icon: Zap },
  ];

  const personalInfo = [
    { label: "First Name", value: "Md. Atikul Islam" },
    { label: "Last Name", value: "Atik" },
    { label: "Age", value: "25 Years" },
    { label: "Nationality", value: "Bangladeshi" },
    { label: "Freelance", value: "Available" },
    { label: "Address", value: "Dhaka, Bangladesh" },
    { label: "Email", value: "atik.hasan.dev@gmail.com" },
    { label: "Language", value: "Bangla, English, Hindi" },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-16 px-6 md:py-32 overflow-hidden bg-black"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 lg:items-stretch">
        {/* Left Side: Visual/Image & Stats */}
        <div className="flex flex-col gap-10 lg:gap-12 order-2 lg:order-1">
          <div ref={imageRef} className="relative group max-w-[500px] mx-auto lg:mx-0 w-full px-4 lg:px-0">
            <div className="relative z-10 aspect-square overflow-hidden rounded-[32px] md:rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
              {/* stylized graphical element */}
              <div className="w-full h-full flex items-center justify-center p-8 md:p-12">
                 <div className="relative w-full h-full border-4 border-dashed border-white/5 rounded-[24px] md:rounded-[30px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
                    <div className="z-10 text-center">
                       <span className="text-white/20 text-[80px] md:text-[120px] font-black italic select-none">ATIK</span>
                    </div>
                 </div>
              </div>
            </div>
            
            {/* Floating Experience Card Design */}
            <div className="absolute -bottom-6 right-2 lg:-bottom-8 lg:-right-8 z-20 bg-primary p-5 md:p-8 rounded-[24px] md:rounded-[32px] shadow-[0_20px_50px_rgba(29,185,84,0.3)] hover:scale-105 transition-transform duration-500">
               <p className="text-black font-headline font-black text-2xl md:text-4xl italic leading-none">2<br/><span className="text-[10px] md:text-sm font-bold uppercase tracking-widest opacity-60">Years XP</span></p>
            </div>
          </div>

          {/* Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 gap-3 md:gap-4 lg:max-w-[500px]">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/5 hover:border-white/10 p-5 md:p-8 rounded-[24px] md:rounded-[32px] group transition-all duration-300 backdrop-blur-sm">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary mb-3 md:mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl md:text-3xl font-black text-white">{stat.value}</h4>
                <p className="text-[10px] uppercase tracking-wider font-bold text-white/30">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col justify-center h-full order-1 lg:order-2">
          <div ref={contentRef} className="space-y-6 lg:space-y-8">
            <div className="space-y-3 md:space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                <p className="text-[10px] uppercase tracking-widest font-bold text-white/60">Who Am I</p>
              </div>
              
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-headline font-black text-white tracking-tighter leading-[1.1]">
                Engineering <span className="text-primary italic">Modern</span> <br className="hidden lg:block"/>
                Software Solutions
              </h2>
              
              <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                I am <span className="text-white font-bold">Md. Atikul Islam Atik</span>, a Software Engineer currently pursuing my BSc in CSE at University of Asia Pacific. With 2 years of professional experience, I specialize in building high-performance, scalable web applications using the latest technologies.
              </p>
            </div>

            {/* Personal Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 md:gap-y-6 gap-x-8 md:gap-x-12 py-6 md:py-8 border-y border-white/5">
              {personalInfo.map((info, i) => (
                <div key={i} className="flex flex-col gap-0.5 translate-y-0 lg:hover:-translate-y-1 transition-transform duration-300 px-4 md:px-0">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{info.label}</span>
                  <span className="text-sm md:text-base text-white/90 font-medium tracking-tight">{info.value}</span>
                </div>
              ))}
            </div>
            
            <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-xl italic text-center lg:text-left mx-auto lg:mx-0">
              "Transforming ideas into scalable, performant apps for real-world impact. My mission is to bridge creative design with technical precision."
            </p>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
}
