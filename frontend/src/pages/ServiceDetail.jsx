import Hero from "../components/Hero.jsx";
import IntroSectionCard from "../components/IntroSectionCard.jsx";
import ServiceDetail from "../components/ServiceDetail.jsx";
import { introSection } from "../data/dataIntroSection.js";
import ContactSection from "../components/ContactSection.jsx";

function Services() {
  return (
    <div>
      <ServiceDetail />
      <IntroSectionCard section={introSection.serviceDetail} />
      <ContactSection />
    </div>
  );
}

export default Services;