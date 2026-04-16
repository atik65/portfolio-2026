"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Mail,
  Phone,
  MapPin,
  User,
  CircleHelp,
  PenTool,
  Send,
  Github,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { TextRepel } from "@/components/ui/text-repel";

export default function Contact() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        },
      );

      // Left info reveal
      gsap.fromTo(
        ".contact-info-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        },
      );

      // Right form reveal
      gsap.fromTo(
        ".contact-form-card",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-24 px-6 md:py-32 bg-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-headline font-black text-white tracking-tighter">
            <TextRepel text="Contacts" />
            <span className="text-primary italic ps-3">
              <TextRepel text="." />
            </span>
          </h2>
        </div>

        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        >
          {/* Left Section: Info */}
          <div className="space-y-12">
            <div className="contact-info-item">
              <h3 className="text-5xl md:text-6xl font-headline font-black text-white leading-[1.1] mb-2">
                <TextRepel text="Have a" />
                <span className="bg-gradient-to-r from-white via-primary/80 to-primary bg-clip-text text-transparent italic pr-2 ps-2">
                  cool
                </span>
              </h3>
              <h3 className="text-5xl md:text-6xl font-headline font-black text-white leading-[1.1]">
                <span className="bg-gradient-to-r from-white via-primary/80 to-primary bg-clip-text text-transparent italic pr-2">
                  project?
                </span>{" "}
                <TextRepel text="Get in touch!" />
              </h3>
            </div>

            <div className="space-y-12 mt-16">
              {/* Email */}
              <div className="contact-info-item group relative pl-20 transition-all duration-300">
                <span className="absolute left-0 top-0 text-8xl font-black text-white/[0.08] select-none transition-all duration-500 group-hover:text-primary/10 leading-none -ml-4">
                  01
                </span>
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30 mb-2 relative z-10">
                  Email
                </p>
                <a
                  href="mailto:atik.hasan.dev@gmail.com"
                  className="text-xl md:text-2xl font-headline font-bold text-white hover:text-primary transition-colors relative z-10"
                >
                  atik.hasan.dev@gmail.com
                </a>
              </div>

              {/* Location */}
              <div className="contact-info-item group relative pl-20 transition-all duration-300">
                <span className="absolute left-0 top-0 text-8xl font-black text-white/[0.08] select-none transition-all duration-500 group-hover:text-primary/10 leading-none -ml-4">
                  02
                </span>
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30 mb-2 relative z-10">
                  Location
                </p>
                <p className="text-xl md:text-2xl font-headline font-bold text-white relative z-10">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="contact-info-item flex items-center gap-4 pt-12">
              {[
                { icon: Github, href: "https://github.com/atik65" },
                { icon: Linkedin, href: "https://linkedin.com/in/atik65" },
                { icon: MessageCircle, href: "https://wa.me/8801790631785" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Section: Form Card */}
          <div className="contact-form-card bg-white/[0.03] border border-white/5 p-8 md:p-12 rounded-[32px] backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -ml-32 -mt-32"></div>

            <form
              className="space-y-10 relative z-10"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-8">
                {/* Name */}
                <div className="group relative border-b border-white/10 focus-within:border-primary transition-colors pb-3">
                  <div className="flex items-center gap-4">
                    <User className="w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      placeholder="Name"
                      className="bg-transparent border-none w-full text-white placeholder:text-white/20 focus:ring-0 focus:outline-none font-headline font-bold text-base"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="group relative border-b border-white/10 focus-within:border-primary transition-colors pb-3">
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="bg-transparent border-none w-full text-white placeholder:text-white/20 focus:ring-0 focus:outline-none font-headline font-bold text-base"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="group relative border-b border-white/10 focus-within:border-primary transition-colors pb-3">
                  <div className="flex items-center gap-4">
                    <CircleHelp className="w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      placeholder="Subject"
                      className="bg-transparent border-none w-full text-white placeholder:text-white/20 focus:ring-0 focus:outline-none font-headline font-bold text-base"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="group relative border-b border-white/10 focus-within:border-primary transition-colors pb-3">
                  <div className="flex items-start gap-4">
                    <PenTool className="w-5 h-5 text-white/20 mt-1.5 group-focus-within:text-primary transition-colors" />
                    <textarea
                      rows="4"
                      placeholder="How can we help you? Feel free to get in touch!"
                      className="bg-transparent border-none w-full text-white placeholder:text-white/20 focus:ring-0 focus:outline-none font-headline font-bold text-base resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              <button className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-black font-headline font-black rounded-full hover:shadow-[0_0_40px_rgba(29,185,84,0.4)] transition-all duration-300 active:scale-95 group text-sm uppercase tracking-widest">
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Get In Touch
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
    </section>
  );
}
