import Hero from "../components/Hero";
import IntroSectionCard from "../components/IntroSectionCard";
import { introSection } from "../data/dataIntroSection.js"; 
import ContactFormMap from "../components/ContactFormMap.jsx";
import ContactQA from "../components/ContactQA.jsx";

function Contact() {
  return (
    <div>
      <Hero page="contact" />
      <IntroSectionCard section={introSection.contact} />
      <ContactFormMap />
      <ContactQA />
    </div>
  );
}

export default Contact;