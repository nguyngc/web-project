import Hero from "../components/Hero";
import ContactSection from "../components/ContactSection";
import ServiceCards from "../components/ServiceCards";
import IntroSectionCard from "../components/IntroSectionCard";
import { introSection } from "../data/dataIntroSection.js";

function Services() {
  return (
    <div>
      <Hero page="services" />
      <section className="flex flex-col items-center px-4 lg:px-[200px] py-[50px] gap-5 w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center gap-4 max-w-[1040px] text-center">
          <h2 className="text-[#0b219c] text-[28px] leading-[39px] font-inter font-bold tracking-[3.6px]">
            COMPLETE EYE CARE SERVICES
          </h2>
          <p className="text-vision-text text-[20px] leading-9 font-inter font-normal max-w-[916px]">
            From routine eye exams to advanced treatments, we offer a full spectrum of services to meet all your vision and eye health needs.
          </p>
        </div>
      </section>

      <ServiceCards />
      <IntroSectionCard section={introSection.services} />
      <ContactSection />
    </div>
  );
}

export default Services;