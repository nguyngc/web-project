import { Award, Heart } from "lucide-react";
import coresImage from "../assets/images/cores.png";

function MissionVision() {
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 lg:px-[200px] py-[50px] gap-10 w-full max-w-[1440px] mx-auto">
      {/* Title */}
      <h2 className="w-full max-w-[1040px] text-center font-inter font-medium text-[28px] sm:text-[36px] leading-[36px] sm:leading-[44px] tracking-[0.1em] uppercase text-[#1C398E]">
        Mission - Vision
      </h2>

      {/* Cards */}
      <div className="flex flex-col lg:flex-row gap-5 w-full max-w-[1040px]">
        {/* Mission Card */}
        <div className="flex flex-col items-center p-6 sm:p-8 border-2 border-[#00C8B3] rounded-2xl shadow-lg w-full lg:w-[510px]">
          <div className="flex justify-center items-center w-12 h-12 rounded-full bg-[#159EEC]">
            <Award className="w-6 h-6 text-white" />
          </div>
          <p className="mt-4 w-full max-w-[450px] font-inter text-[16px] sm:text-[20px] leading-[22px] sm:leading-[24px] text-[#0C0646] text-left">
            Our Mission<br /><br />
            To provide exceptional, comprehensive eye care services that enhance our
            patients' vision and quality of life. We strive to deliver personalized care using
            advanced technology in a welcoming, professional environment.
          </p>
        </div>

        {/* Vision Card */}
        <div className="flex flex-col items-center p-6 sm:p-8 border-2 border-[#00C8B3] rounded-2xl shadow-lg w-full lg:w-[510px]">
          <div className="flex justify-center items-center w-12 h-12 rounded-full bg-[#159EEC]">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <p className="mt-4 w-full max-w-[450px] font-inter text-[16px] sm:text-[20px] leading-[22px] sm:leading-[24px] text-[#0C0646] text-left">
            Our Vision<br /><br />
            To be the most trusted eye care provider in our community, recognized for
            clinical excellence, innovative treatments, and unwavering commitment to patient
            satisfaction and lifelong vision health.
          </p>
        </div>
      </div>

      {/* Banner Image */}
      <div className="w-full max-w-[1040px] h-[200px] sm:h-[300px] lg:h-[430px] flex justify-center items-center mt-6">
        <img
          src={coresImage}
          className="w-full h-full object-contain rounded-lg "
          alt="Cores banner"
        />
      </div>
    </section>
  );
}

export default MissionVision;
