import InfoCard from "./InfoCard";
import { aboutSectionCard } from "../data/data";

function AboutSection() {
  return (
    <section className="flex flex-col items-center px-4 lg:px-[200px] py-12 w-full max-w-[1440px] mx-auto">
      <InfoCard {...aboutSectionCard} />
    </section>
  );
}

export default AboutSection;
