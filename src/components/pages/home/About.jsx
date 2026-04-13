"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight, Sparkles, Code, Globe, Zap, Briefcase, GraduationCap } from "lucide-react";

export default function About() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const floatingCardRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);
  const bgDecorRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // MODULE A: Master Section Entry Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // MODULE B: Image Reveal Upgrade
      tl.fromTo(
        imageWrapperRef.current,
        { 
          clipPath: "inset(0 100% 0 0)",
          scale: 0.9,
          rotate: -2,
        },
        { 
          clipPath: "inset(0 0% 0 0)",
          scale: 1,
          rotate: 0,
          duration: 1.4,
          ease: "expo.out",
        }
      );

      // MODULE C: Floating Experience Card Pop
      tl.fromTo(
        floatingCardRef.current,
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1, 
          ease: "back.out(1.7)" 
        },
        "-=0.8"
      );

      // Continuous Floating Loop
      gsap.to(floatingCardRef.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // MODULE D & E: Content Reveal (Heading, Paragraph, Info Grid)
      const contentElements = contentRef.current.children;
      
      tl.fromTo(
        contentElements,
        { 
          opacity: 0, 
          y: 40,
          filter: "blur(10px)",
        },
        { 
          opacity: 1, 
          y: 0,
          filter: "blur(0px)",
          stagger: 0.15,
          duration: 1.2,
          ease: "power4.out",
        },
        "-=1"
      );

      // MODULE G: Stats Cards + Counter Animation
      const statsCards = statsRef.current.children;
      
      tl.fromTo(
        statsCards,
        { opacity: 0, scale: 0.8, y: 30 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          onStart: () => {
            // Trigger counter logic for each stat
            const valElements = containerRef.current.querySelectorAll(".stat-value");
            valElements.forEach((el) => {
              const target = parseInt(el.getAttribute("data-target"));
              gsap.fromTo(el, 
                { innerHTML: 0 },
                { 
                  innerHTML: target, 
                  duration: 2, 
                  snap: { innerHTML: 1 },
                  ease: "expo.out" 
                }
              );
            });
          }
        },
        "-=0.5"
      );

      // MODULE H: Background Ambient Motion
      gsap.to(bgDecorRef.current, {
        scale: 1.2,
        xPercent: 10,
        yPercent: 10,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // MODULE I: Parallax Layering
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: "Years Experience", value: "2", icon: Sparkles },
    { label: "Projects Completed", value: "20", icon: Code },
    { label: "Happy Customers", value: "10", icon: Globe },
    { label: "Awards Won", value: "5", icon: Zap },
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
            <div 
              ref={imageWrapperRef}
              className="relative z-10 aspect-square overflow-hidden rounded-[32px] md:rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="w-full h-full flex items-center justify-center p-8 md:p-12">
                 <div className="relative w-full h-full border-4 border-dashed border-white/5 rounded-[24px] md:rounded-[30px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
                    <div className="z-10 text-center">
                       <span className="text-white/20 text-[80px] md:text-[120px] font-black italic select-none uppercase">Atik</span>
                    </div>
                 </div>
              </div>
            </div>
            
            {/* Floating Experience Card Design */}
            <div 
              ref={floatingCardRef}
              className="absolute -bottom-6 right-2 lg:-bottom-8 lg:-right-8 z-20 bg-primary p-5 md:p-8 rounded-[24px] md:rounded-[32px] shadow-[0_20px_50px_rgba(29,185,84,0.3)] hover:scale-105 transition-transform duration-500 cursor-pointer"
            >
               <p className="text-black font-headline font-black text-2xl md:text-4xl italic leading-none">2<br/><span className="text-[10px] md:text-sm font-bold uppercase tracking-widest opacity-60">Years XP</span></p>
            </div>
          </div>

          {/* Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 gap-3 md:gap-4 lg:max-w-[500px]">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/5 hover:border-primary/20 p-5 md:p-8 rounded-[24px] md:rounded-[32px] group transition-all duration-300 backdrop-blur-sm hover:-translate-y-2">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary mb-3 md:mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                <h4 className="text-xl md:text-3xl font-black text-white flex items-end gap-1">
                  <span className="stat-value" data-target={stat.value.replace("+", "")}>0</span>
                  {stat.value.includes("+") && <span className="text-primary text-xl">+</span>}
                </h4>
                <p className="text-[10px] uppercase tracking-wider font-bold text-white/30 group-hover:text-white/60 transition-colors">{stat.label}</p>
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
                <div key={i} className="flex flex-col gap-0.5 translate-y-0 lg:hover:-translate-y-1 transition-transform duration-300 px-4 md:px-0 group/info">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold group-hover/info:text-primary transition-colors">{info.label}</span>
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
      <div 
        ref={bgDecorRef}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
      ></div>
    </section>
  );
}
