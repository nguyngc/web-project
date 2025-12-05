import { useEffect, useState } from "react";
import DoctorCard from "./doctorCard";
import { ArrowRight, ArrowLeft } from "lucide-react";
import doctor1 from "../assets/images/doctor1.jpg";
import doctor2 from "../assets/images/doctor2.jpg";

function DoctorSection() {
  const [doctors, setDoctors] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const visibleCount = 3;

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/users/doctors/public");
        const data = await res.json();

        if (res.ok) {
          setDoctors(data);
        }
      } catch (error) {
        console.error("Failed to load doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleNext = () => {
    if (startIndex + visibleCount < doctors.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleDoctors = doctors.slice(startIndex, startIndex + visibleCount);

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

      {/* Loading */}
      {loading && <p className="text-gray-500">Loading doctors...</p>}

      {/* Empty state */}
      {!loading && doctors.length === 0 && (
        <p className="text-gray-500">No doctors available at the moment.</p>
      )}

      {/* Doctors */}
      {!loading && doctors.length > 0 && (
        <div className="flex items-center gap-4 w-full max-w-[1040px]">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="p-2 border rounded-full disabled:opacity-50"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 flex-1">
            {visibleDoctors.map((doctor, index) => (
              <DoctorCard
                key={doctor._id}
                Image={doctor.doctorInfo?.profilePicture || (index % 2 === 0 ? doctor1 : doctor2)}
                name={`${doctor.firstName} ${doctor.lastName}`}
                specialty={doctor.doctorInfo?.specialization || "Eye Specialist"}
                bio={doctor.doctorInfo?.bio || ""}
                rate={doctor.doctorInfo?.rate || 5}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={startIndex + visibleCount >= doctors.length}
            className="p-2 border rounded-full disabled:opacity-50"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
}

export default DoctorSection;
