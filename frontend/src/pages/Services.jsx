import Hero from "../components/Hero";
import ContactSection from "../components/ContactSection";
import ServiceCards from "../components/ServiceCards";
import IntroSectionCard from "../components/IntroSectionCard";
import { introSection } from "../data/dataIntroSection.js";

function Services() {
  return (
    <div>
      <Hero page="services" />
      <ServiceCards />
      <IntroSectionCard section={introSection.services} />
      <ContactSection />
    </div>
  );
}

export default Services;