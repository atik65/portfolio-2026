"use client";

import Link from "next/link";
import { Github, Linkedin, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] border-t border-white/[0.03] pt-24 pb-12 overflow-hidden text-body">
      <div className="max-w-7xl mx-auto px-6 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 mb-24">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="group flex items-center gap-4">
              <div className="w-11 h-11 bg-primary rounded-[14px] flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(29,185,84,0.3)] shrink-0">
                <span className="text-black font-black text-2xl">A</span>
              </div>
              <h2 className="text-3xl font-headline font-black text-white tracking-tighter">
                Atikul <span className="text-primary italic">Islam</span>
                <span className="text-primary">.</span>
              </h2>
            </Link>
            <p className="text-white/40 text-base leading-relaxed max-w-sm font-medium">
              Engineering modern and scalable software solutions. Transforming
              ideas into scalable, performant apps for real-world impact.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: "https://github.com/atik65" },
                { icon: Linkedin, href: "https://linkedin.com/in/atik65" },
                { icon: MessageCircle, href: "https://wa.me/8801790631785" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/30 hover:scale-110 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Discover */}
          <div className="space-y-8">
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] opacity-40">
              Discover
            </h4>
            <ul className="space-y-5">
              {["Home", "About", "Services"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
                    className="text-white/60 hover:text-white transition-colors text-sm font-bold tracking-tight"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise */}
          <div className="space-y-8">
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] opacity-40">
              Expertise
            </h4>
            <ul className="space-y-5">
              {["Process", "Skills", "Projects"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-white/60 hover:text-white transition-colors text-sm font-bold tracking-tight"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Journey & CTA */}
          <div className="space-y-8">
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] opacity-40">
              Journey
            </h4>
            <ul className="space-y-5">
              {["Experience", "Education", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-white/60 hover:text-white transition-colors text-sm font-bold tracking-tight"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ready to start */}
          <div className="space-y-8">
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] opacity-40">
              Ready to start?
            </h4>
            <p className="text-white font-headline text-2xl font-bold tracking-tight hover:text-primary cursor-pointer transition-colors">
              Let's Talk
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/[0.03] flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold text-white/20 uppercase tracking-[0.1em]">
            © {currentYear} Atikul Islam. All rights reserved.
          </p>
          <div className="flex items-center gap-10">
            <Link
              href="#"
              className="text-[11px] font-bold text-white/20 hover:text-white uppercase tracking-[0.1em] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-[11px] font-bold text-white/20 hover:text-white uppercase tracking-[0.1em] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
