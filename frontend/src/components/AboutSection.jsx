import { Check } from "lucide-react";

const features = [
  "Board-certified optometrists and ophthalmologists",
  "State-of-the-art diagnostic equipment",
  "Comprehensive range of services for all ages",
  "Flexible scheduling and convenient location",
];

export default function AboutSection() {
  return (
    <section className="px-4 lg:px-[200px] py-12 md:py-[50px] bg-vision-bg-light">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex flex-col gap-8 max-w-[472px]">
          <h2 className="text-[#1C398E] text-3xl md:text-4xl font-inter font-medium tracking-[10px]">
            <span className="font-light">Why</span> <span className="font-medium">Choose Us?</span>
          </h2>
          <p className="text-vision-text-light text-base leading-[30px]">
            At Vision Clinic, we understand that your eyes are precious. That's why we're
            committed to providing the highest standard of eye care with a personal touch.
          </p>
          <div className="flex flex-col gap-5">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-vision-secondary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-vision-text text-base leading-6">{feature}</span>
              </div>
            ))}
          </div>
          <button className="bg-gradient-to-b from-[rgba(21,158,236,0.5)] to-[#159EEC] text-white px-6 py-3 rounded-[10px] shadow-[0_4px_4px_0_rgba(37,57,169,0.25)] text-sm font-poppins font-semibold hover:opacity-90 transition-opacity w-fit">
            Learn more about us
          </button>
        </div>
        <div className="relative">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/c5505e4e8a1aa0c300951631e7f8063f701c1a96?width=1200"
            alt="Vision care equipment"
            className="rounded-[10px] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] w-full max-w-[600px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
