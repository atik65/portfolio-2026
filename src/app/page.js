import Navbar from "@/components/pages/home/Navbar";
import Hero from "@/components/pages/home/Hero";
import About from "@/components/pages/home/About";
import MyServices from "@/components/pages/home/MyServices";
import MyDevelopementProcess from "@/components/pages/home/MyDevelopementProcess";
import FeaturedWorks from "@/components/pages/home/FeaturedWorks";
import Skills from "@/components/pages/home/Skills";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <MyServices />
      <MyDevelopementProcess />
      <FeaturedWorks />
      <Skills />
    </>
  );
}
