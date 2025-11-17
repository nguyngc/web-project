import Hero from "../components/Hero";
import ContactSection from "../components/ContactSection";
import IntroSectionCard from "../components/IntroSectionCard";
import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";
import { introSection } from "../data/dataIntroSection.js";

function Home() {
  return (
    <div>
      <Hero page="home" />
      <IntroSectionCard section={introSection.home} />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}

export default Home;
