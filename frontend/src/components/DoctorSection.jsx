import { useState } from "react";
import { doctorsCard } from "../data/data";
import DoctorCard from "./doctorCard";
import { ArrowRight, ArrowLeft } from "lucide-react";

function DoctorSection() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3; 

  const handleNext = () => {
    if (startIndex + visibleCount < doctorsCard.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleDoctors = doctorsCard.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="px-4 lg:px-[200px] py-12 md:py-[50px] flex flex-col items-center gap-10">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 max-w-[1040px] text-center">
        <h2 className="text-[#1C398E] text-2xl md:text-4xl font-inter font-medium tracking-[3.6px]">
          Meet Our Expert Team
        </h2>
        <p className="text-vision-text-light text-base leading-6 max-w-[662px]">
          Our board-certified professionals are dedicated to providing you with the highest quality eye care.
        </p>
      </div>

      {/* Doctors grid */}
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
          {visibleDoctors.map((doctor) => (
            <DoctorCard {...doctor} key={doctor.name} />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={startIndex + visibleCount >= doctorsCard.length}
          className="p-2 border rounded-full disabled:opacity-50"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

export default DoctorSection;
