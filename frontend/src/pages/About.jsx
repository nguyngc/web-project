import Hero from "../components/Hero";
import ContactSection from "../components/ContactSection";
import IntroSectionCard from "../components/IntroSectionCard";
import { introSection } from "../data/dataIntroSection.js";
import DoctorSection from "../components/DoctorSection.jsx";
import MissionCore from "../components/MissionCore.jsx";

function About() {
  return (
    <div>
      <Hero page="about" />
      <IntroSectionCard section={introSection.about} />
      <MissionCore />
      <DoctorSection />
      <ContactSection />
    </div>
  );
}

export default About;