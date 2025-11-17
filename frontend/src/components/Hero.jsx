import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { heroSlides } from "../data/data.js";

function Hero({ page }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = heroSlides[page] || [];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of manual interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const handleSlideClick = (slide) => {
    window.location.hash = slide.buttonLink;
  };

  if (slides.length === 0) return null;

  if (slides.length > 1) {
    return (
      <div className="relative h-[400px] md:h-[600px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/50" />

            <div className="relative h-full px-4 lg:px-[200px] py-12 md:py-[176px] flex items-center">
              <div className="max-w-[672px]">
                {/* <div className="container mx-auto relative h-full px-4 z-10 flex items-center">
            <div className="max-w-2xl text-white"> */}
                {slide.badge && (
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                    <span className="text-white text-sm">{slide.badge}</span>
                  </div>
                )}
                <h2 className="text-white text-xl md:text-2xl font-inter mb-4">
                  {slide.title}
                </h2>
                <p className="text-[#EFF6FF] text-base md:text-xl leading-7 mb-8 max-w-[648px]">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    size="lg"
                    className="bg-white text-[#1C398E] px-6 py-2.5 rounded-[10px] text-sm font-poppins font-medium hover:bg-gray-100 transition-colors"
                    onClick={() => handleSlideClick(slide)}>
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Nút Previous */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all group"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" strokeWidth={2} />
        </button>

        {/* Nút Next */}
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all group"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" strokeWidth={2} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full ${index === currentSlide
                ? "bg-white w-8 h-2"
                : "bg-white/50 hover:bg-white/75 w-2 h-2"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Pause/Play indicator (subtle) */}
        {!isAutoPlaying && (
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
              Auto-play paused
            </div>
          </div>
        )}
      </div>
    );
  } else {
    // Single slide (no controls)
    const slide = slides[0];
    return (
      <div className={`px-4 lg:px-[200px] flex items-center bg-cover bg-center relative`}>
        <img
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/50" />

        <div className="relative h-full py-12 flex items-center">
          <div className="max-w-[672px]">
            {slide.badge && (
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <span className="text-white text-sm">{slide.badge}</span>
              </div>
            )}
            <h2 className="text-white text-xl md:text-2xl font-inter mb-4">
              {slide.title}
            </h2>
            <p className="text-[#EFF6FF] text-base md:text-xl leading-7 mb-2 max-w-[648px]">
              {slide.subtitle}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero;
