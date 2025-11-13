import { Eye, Award, Heart } from "lucide-react";

const introCards = [
  {
    icon: Eye,
    title: "Comprehensive Eye Exams",
    description: "Complete vision assessments using state-of-the-art technology",
  },
  {
    icon: Award,
    title: "25+ Years of Excellence",
    description: "Trusted by thousands of satisfied patients in our community",
  },
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description: "Personalized treatment plans tailored to your unique needs",
  },
];

export default function IntroSection() {
  return (
    <section className="px-4 lg:px-[200px] py-12 md:py-[50px] flex flex-col items-center gap-10">
      <h2 className="text-[#1C398E] text-2xl md:text-4xl font-inter font-medium text-center tracking-[3.6px] uppercase max-w-[1040px]">
        Welcome to Vision Clinic
      </h2>
      <p className="text-vision-text text-lg md:text-xl text-center max-w-[916px]">
        Your trusted partner for comprehensive eye care services. We combine advanced
        technology with compassionate care to protect and enhance your vision.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1040px]">
        {introCards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-4 p-8 rounded-[20px] border-2 border-vision-border-light bg-white hover:shadow-lg transition-shadow"
          >
            <div className="bg-vision-secondary rounded-full p-2.5">
              <card.icon className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <h3 className="text-vision-text-light text-xl text-center font-inter">
              {card.title}
            </h3>
            <p className="text-vision-text text-center text-base">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
