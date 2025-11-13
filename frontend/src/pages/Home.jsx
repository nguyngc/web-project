import Hero from "../components/Hero";
import ContactSection from "../components/ContactSection";
import IntroSection from "../components/IntroSection";
import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";

function Home() {
  return (
    <div>
      <Hero page="home" />
      <IntroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}

export default Home;
