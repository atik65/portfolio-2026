import Navbar from "@/components/pages/home/Navbar";
import Hero from "@/components/pages/home/Hero";
import About from "@/components/pages/home/About";
import MyServices from "@/components/pages/home/MyServices";
import MyDevelopementProcess from "@/components/pages/home/MyDevelopementProcess";
import FeaturedWorks from "@/components/pages/home/FeaturedWorks";
import Skills from "@/components/pages/home/Skills";
import ProfessionalExperience from "@/components/pages/home/ProfessionalExperience";
import EducationAchievements from "@/components/pages/home/EducationCertification";
import Contact from "@/components/pages/home/Contact";
import Footer from "@/components/pages/home/Footer";
import ScrollToTop from "@/components/pages/home/ScrollToTop";

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
      <ProfessionalExperience />
      <EducationAchievements />
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  );
}
