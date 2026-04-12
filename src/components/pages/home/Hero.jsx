"use client";

export default function Hero() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 overflow-hidden bg-black">
      {/* Background Ambience */}
      <div className="absolute inset-0 concentric-circles pointer-events-none opacity-60"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[160px] pointer-events-none"></div>

      <section className="relative z-10 max-w-5xl w-full text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-in">
          <p className="font-label text-[13px] tracking-tight text-white/60 font-medium">
            I am Kelvin Juma. A Full Stack Engineer.
          </p>
        </div>

        {/* Main Headline */}
        <h1 className="font-headline text-5xl md:text-7xl lg:text-[88px] font-black tracking-tight leading-[1.05] mb-8 text-white">
          Engineering Modern <br />
          <span className="text-primary">Software Solutions</span>
        </h1>

        {/* Sub-headline */}
        <p className="font-body text-base md:text-[17px] text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed tracking-tight">
          Transforming ideas into scalable, performant apps for real-world impact.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
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
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
      </div>
    </main>
  );
}
