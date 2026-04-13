import Navbar from "@/components/pages/home/Navbar";
import Hero from "@/components/pages/home/Hero";
import About from "@/components/pages/home/About";
import MyServices from "@/components/pages/home/MyServices";
import Skills from "@/components/pages/home/Skills";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <MyServices />
      <Skills />
    </>
  );
}
