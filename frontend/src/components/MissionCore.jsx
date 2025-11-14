import { Award, Heart, Star } from "lucide-react";

function MissionVisionCore() {
  return (
    <section className="flex flex-col items-center px-4 lg:px-[200px] py-[50px] gap-10 w-full max-w-[1440px]">
      {/* Heading */}
      <h2 className="mt-[100px] text-[#1C398E] text-[28px] leading-[30px] font-inter font-medium uppercase tracking-[0.1em] text-center">
        Mission - Vision - Core
      </h2>

      {/* Mission + Vision cards */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-[1040px]">
        {/* Mission card */}
        <div className="flex flex-col items-center p-[30px] gap-[15px] w-full md:w-[510px] h-[309px] border-2 border-[#00C8B3] rounded-[20px] shadow-md">
          <div className="flex items-center justify-center w-10 h-10 bg-[#159EEC] rounded-full">
            <Award className="w-5 h-5 text-white" />
          </div>
          <p className="text-[#0C0646] text-[20px] leading-[24px] text-center font-inter font-normal ">
            Our Mission <br />
            To provide exceptional, comprehensive eye care services that enhance our patients' vision and quality of life. We strive to deliver personalized care using advanced technology in a welcoming, professional environment.
          </p>
        </div>

        {/* Vision card */}
        <div className="flex flex-col items-center p-[30px] gap-[15px] w-full md:w-[510px] h-[309px] border-2 border-[#00C8B3] rounded-[20px] shadow-lg">
          <div className="flex items-center justify-center w-10 h-10 bg-[#159EEC] rounded-full">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <p className="text-[#0C0646] text-[20px] leading-[24px] text-center font-inter font-normal">
            Our Vision <br />
            To be the most trusted eye care provider in our community, recognized for clinical excellence, innovative treatments, and unwavering commitment to patient satisfaction and lifelong vision health.
          </p>
        </div>
      </div>

      {/* Core Values card */}
      <div className="flex flex-col items-center p-[30px] gap-[15px] w-full max-w-[1040px] h-[309px] border-2 border-[#00C8B3] rounded-[20px] shadow-lg">
        <div className="flex items-center justify-center w-10 h-10 bg-[#159EEC] rounded-full">
          <Star className="w-5 h-5 text-white" />
        </div>
        <p className="text-[#0C0646] text-[20px] leading-[24px] text-center font-inter font-normal">
          Our Core Values <br />
          Compassion, Innovation, Integrity, and Excellence in every aspect of patient care.
        </p>
      </div>
    </section>
  );
}

export default MissionVisionCore;
