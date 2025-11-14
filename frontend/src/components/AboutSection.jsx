import InfoCard from "./InfoCard";
import { aboutSectionCard } from "../data/data";

function AboutSection() {
  return (
    <section className="px-4 lg:px-[200px] py-12">
      <InfoCard {...aboutSectionCard} />
    </section>
  );
}
export default AboutSection;
