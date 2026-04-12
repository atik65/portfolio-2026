"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Hero() {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const buttonsRef = useRef(null);
  const bgGlowRef = useRef(null);
  const bgCirclesRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // MODULE A: Initial Entry Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
        },
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.4",
        )
        .fromTo(
          subheadlineRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.6",
        )
        .fromTo(
          buttonsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.5,
          },
          "-=0.6",
        );

      // Text Swapping Animation (Modern <-> Scalable)
      const words = gsap.utils.toArray(".swap-word");
      const wordTl = gsap.timeline({ repeat: -1 });

      words.forEach((word, i) => {
        wordTl
          .to(word, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "expo.out",
          })
          .to(word, {
            y: -50,
            opacity: 0,
            duration: 0.8,
            ease: "expo.in",
            delay: 2,
          });
      });

      // MODULE D: Background Ambient Motion
      gsap.to(bgGlowRef.current, {
        scale: 1.1,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(bgCirclesRef.current, {
        rotation: 3,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // MODULE E: Scroll Indicator Animation
      gsap.to(scrollIndicatorRef.current, {
        height: "48px",
        opacity: 0.2,
        duration: 1.5,
        repeat: -1,
        ease: "power2.inOut",
      });

      // MODULE F: Parallax Effect (On Scroll)
      gsap.to(heroRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 overflow-hidden bg-black"
    >
      {/* Background Ambience */}
      <div
        ref={bgCirclesRef}
        className="absolute inset-0 concentric-circles pointer-events-none opacity-60"
      ></div>
      <div
        ref={bgGlowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[160px] pointer-events-none"
      ></div>

      <section className="relative z-10 max-w-5xl w-full text-center">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
        >
          <p className="font-label text-[18px] tracking-tight text-white/60 font-medium">
            I am Md. Atikul Islam Atik. A Software Engineer.
          </p>
        </div>

        {/* Main Headline */}
        <h1
          ref={headlineRef}
          className="font-headline text-5xl md:text-7xl lg:text-[88px] font-black tracking-tight leading-[1.05] mb-8 text-white"
        >
          Engineering{" "}
          <div className="inline-block relative h-[1em] overflow-hidden align-bottom">
            <span className="swap-word block opacity-0 translate-y-[50px]">
              Scalable
            </span>
            <span className="swap-word absolute top-0 left-0 opacity-0 translate-y-[50px]">
              Modern
            </span>
          </div>{" "}
          <br />
          <span className="text-primary italic">Software Solutions</span>
        </h1>

        {/* Sub-headline */}
        <p
          ref={subheadlineRef}
          className="font-body text-base md:text-[17px] text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed tracking-tight"
        >
          Transforming ideas into scalable, performant apps for real-world
          impact.
        </p>

        {/* Action Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <button className="group px-8 py-4 bg-primary rounded-full text-on-primary font-headline font-extra-bold uppercase text-[11px] tracking-widest flex items-center gap-2 hover:shadow-[0_0_30px_rgba(29,185,84,0.4)] transition-all duration-300 active:scale-95">
            Collaborate with Me
            <span className="material-symbols-outlined text-sm font-black group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
          <button className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-white font-headline font-extra-bold uppercase text-[11px] tracking-widest hover:bg-white/10 transition-all duration-300 active:scale-95 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">
              description
            </span>
            My Portfolio
          </button>
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
        <div
          ref={scrollIndicatorRef}
          className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"
        ></div>
      </div>
    </main>
  );
}
