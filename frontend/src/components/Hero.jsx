import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import eyeExamImage from "../assets/eye-exam.png";
import { heroSlides } from "../data/data.js";

function Hero({ page }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = heroSlides[page] || [];

  if (slides.length === 0) return null;

  return (
    <div className="relative h-[400px] md:h-[600px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      <img
        src={eyeExamImage}
        alt="Eye examination"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative h-full px-4 lg:px-[200px] py-12 md:py-44 flex items-center">
        <div className="max-w-2xl">
          {slides[currentSlide].badge && (
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <span className="text-white text-sm">{slides[currentSlide].badge}</span>
            </div>
          )}
          <h2 className="text-white text-xl md:text-2xl font-inter mb-4">
            {slides[currentSlide].title}
          </h2>
          <p className="text-[#EFF6FF] text-base md:text-xl leading-7 mb-8 max-w-[648px]">
            {slides[currentSlide].description}
          </p>
          <button className="bg-white text-[#1C398E] px-6 py-2.5 rounded-[10px] text-sm font-poppins font-medium hover:bg-gray-100 transition-colors">
            Read Article
          </button>
        </div>
      </div>

      {/* Nút Previous */}
      <button
        className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
        onClick={() =>
          setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
        }
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" strokeWidth={2} />
      </button>

      {/* Nút Next */}
      <button
        className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
        onClick={() =>
          setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
        }
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" strokeWidth={2} />
      </button>
    </div>
  );
}

export default Hero;
