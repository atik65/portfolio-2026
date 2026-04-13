"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Code, Terminal, Palette, Smartphone, Cloud, ArrowRight } from "lucide-react";

export default function MyServices() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const grid1Ref = useRef(null);
  const grid2Ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: "power2.out" 
        }
      );

      tl.fromTo(
        [grid1Ref.current.children, grid2Ref.current.children],
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: "power2.out" 
        },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const topServices = [
    {
      title: "Frontend Development",
      description: "Crafting highly interactive, responsive, and accessible user interfaces using React and Next.js, with a focus on core web vitals and premium aesthetics.",
      icon: Code,
    },
    {
      title: "Backend Engineering",
      description: "Building robust, secure server-side architectures and APIs using Django and Express to power complex business logic and high-performance apps.",
      icon: Terminal,
    },
    {
      title: "UI/UX Implementation",
      description: "Bridging the gap between design and development by turning complex prototypes into pixel-perfect, fluidly animated web experiences.",
      icon: Palette,
    },
  ];

  const bottomServices = [
    {
      title: "Mobile App Development",
      description: "Delivering cross-platform mobile solutions that provide native performance and seamless experiences across iOS and Android devices.",
      icon: Smartphone,
    },
    {
      title: "Cloud & Optimization",
      description: "Managing scalable cloud deployments and optimizing application performance, SEO, and security for a production-ready presence.",
      icon: Cloud,
    },
  ];

  return (
    <section 
      id="services" 
      ref={containerRef}
      className="relative py-20 px-6 md:py-32 overflow-hidden bg-black"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/2 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16 md:mb-24 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/60">Services</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-headline font-black text-white tracking-tighter mb-6">
            My Services<span className="text-primary">.</span>
          </h2>
          <p className="text-white/50 text-base md:text-xl leading-relaxed max-w-2xl">
            Delivering end-to-end software solutions from conceptualization to deployment, ensuring performance, scalability, and exceptional user journeys.
          </p>
        </div>

        {/* Services Grids */}
        <div className="space-y-6">
          <div 
            ref={grid1Ref} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {topServices.map((service, idx) => (
              <ServiceCard key={idx} service={service} />
            ))}
          </div>

          <div 
            ref={grid2Ref} 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {bottomServices.map((service, idx) => (
              <ServiceCard key={idx} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  return (
    <div className="group relative bg-white/5 border border-white/10 p-8 rounded-[32px] hover:border-primary/30 transition-all duration-500 backdrop-blur-sm overflow-hidden flex flex-col h-full">
      {/* Glow Effect */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -ml-16 -mt-16 group-hover:bg-primary/20 transition-all duration-700"></div>
      
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-[0_0_20px_rgba(29,185,84,0.1)] group-hover:shadow-[0_0_30px_rgba(29,185,84,0.2)]">
        <service.icon className="w-7 h-7 text-primary" />
      </div>

      <h3 className="text-2xl font-headline font-bold text-white mb-4 tracking-tight group-hover:text-primary transition-colors">
        {service.title}
      </h3>
      
      <p className="text-white/50 leading-relaxed text-sm md:text-base mb-8 flex-grow">
        {service.description}
      </p>

      {/* Footer / CTA Link */}
      <div className="mt-auto flex items-center justify-between">
        <div className="h-[1px] w-8 bg-white/10 group-hover:w-full group-hover:bg-primary/30 transition-all duration-700"></div>
        <div className="flex items-center gap-2 text-primary font-bold text-sm pl-4 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 whitespace-nowrap">
          <span>Let's Build</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
