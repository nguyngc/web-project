import ServiceCard from "./ServiceCard";
import dataServices from "../data/dataServices";

function ServiceCards() {
  return (
    <section className="px-4 lg:px-[200px] py-12 flex flex-col gap-12">
      <h2 className="text-[#1C398E] text-3xl md:text-4xl font-medium text-center">
        Our Services
      </h2>

      <div className="flex flex-col gap-16">
        {dataServices.map((service, index) => (
          <ServiceCard key={service.title} {...service} reverse={index % 2 !== 0} />
        ))}
      </div>
    </section>
  );
}

export default ServiceCards;
