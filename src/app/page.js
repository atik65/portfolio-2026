import Navbar from "@/components/pages/home/Navbar";
import Hero from "@/components/pages/home/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <footer className="w-full py-12 mt-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-label text-sm tracking-[0.08em] text-on-surface-variant uppercase text-center md:text-left">
            © 2024 LUMINAL ARCHITECT. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <a
              className="text-on-surface-variant hover:text-primary transition-colors font-label text-sm tracking-[0.08em] uppercase"
              href="#"
            >
              Dribbble
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors font-label text-sm tracking-[0.08em] uppercase"
              href="#"
            >
              Instagram
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors font-label text-sm tracking-[0.08em] uppercase"
              href="#"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
