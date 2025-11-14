import { useState } from "react";
import { servicesCard } from "../data/data";
import Service from "./Service";
import { ArrowRight, ArrowLeft } from "lucide-react";

function ServicesSection() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3; // Number of services to show at once

  const handleNext = () => {
    if (startIndex + visibleCount < servicesCard.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleServices = servicesCard.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="px-4 lg:px-[200px] py-12 md:py-[50px] flex flex-col items-center gap-10">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 max-w-[1040px] text-center">
        <h2 className="text-[#1C398E] text-3xl md:text-4xl font-inter font-medium tracking-[3.6px]">
          Our Services
        </h2>
        <p className="text-vision-text-light text-base leading-6 max-w-[662px]">
          From routine eye exams to advanced surgical procedures, we offer comprehensive eye
          care solutions for your entire family.
        </p>
      </div>

      {/* Services grid */}
      <div className="flex items-center gap-4 w-full max-w-[1040px]">
        {/* Prev button */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="p-2 border rounded-full disabled:opacity-50"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 flex-1">
          {visibleServices.map((service) => (
            <Service {...service} key={service.title} />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={startIndex + visibleCount >= servicesCard.length}
          className="p-2 border rounded-full disabled:opacity-50"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* View all */}
      {/* 
<button className="border border-[#155DFC] text-[#155DFC] bg-white px-4 py-2 rounded-[10px] text-sm font-poppins font-medium hover:bg-[#155DFC] hover:text-white transition-colors">
  View All Services
</button> 
*/}

    </section>
  );
}

export default ServicesSection;
