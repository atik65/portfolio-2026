"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPos = window.scrollY;
      const progressValue = (scrollPos / totalHeight) * 100;
      setProgress(progressValue);
      setIsVisible(scrollPos > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG calculations
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-[100] w-14 h-14 flex items-center justify-center transition-all duration-500 rounded-full bg-black/80 backdrop-blur-md border border-white/5 group ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      } hover:scale-110 active:scale-95`}
    >
      {/* Progress SVG Ring */}
      <svg className="absolute top-0 left-0 w-full h-full -rotate-90 pointer-events-none">
        {/* Background Circle */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          className="text-white/5"
        />
        {/* Progress Circle (Primary Green) */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-primary transition-all duration-150 ease-out"
        />
      </svg>
      
      <ArrowUp className="w-5 h-5 text-white/40 group-hover:text-primary group-hover:-translate-y-1 transition-all duration-300" />
    </button>
  );
}
