import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Eye Examinations",
    description: "Comprehensive vision testing and eye health evaluations",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/2bd094ea241132f388e2724df967b69d8941060f?width=716",
  },
  {
    title: "Eyeglasses & Contact Lenses",
    description: "Wide selection of frames and lens options",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/41716772802cdcc1e9e1f5cffa255c322612f197?width=625",
  },
  {
    title: "Advanced Eye Care",
    description: "Treatment for eye diseases and surgical procedures",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/9d0840834b612bbdce6bb7d4f95c237b6134aa35?width=625",
  },
];

export default function ServicesSection() {
  return (
    <section className="px-4 lg:px-[200px] py-12 md:py-[50px] flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-4 max-w-[1040px] text-center">
        <h2 className="text-[#1C398E] text-3xl md:text-4xl font-inter font-medium tracking-[3.6px]">
          Our Services
        </h2>
        <p className="text-vision-text-light text-base leading-6 max-w-[662px]">
          From routine eye exams to advanced surgical procedures, we offer comprehensive eye
          care solutions for your entire family.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-[1040px]">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col rounded-[14px] border border-black/10 bg-white overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-[239px] overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col gap-6">
              <h3 className="text-[#101828] text-lg font-inter font-medium leading-[27px]">
                {service.title}
              </h3>
              <p className="text-vision-text-light text-base leading-6">
                {service.description}
              </p>
              <button className="flex items-center gap-2 text-[#155DFC] text-base font-medium hover:gap-3 transition-all">
                Learn More
                <ArrowRight className="w-4 h-4" strokeWidth={1.33} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="border border-[#155DFC] text-[#155DFC] bg-white px-4 py-2 rounded-[10px] text-sm font-poppins font-medium hover:bg-[#155DFC] hover:text-white transition-colors">
        View All Services
      </button>
    </section>
  );
}
