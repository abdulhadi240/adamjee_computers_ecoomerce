'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const Slider = () => {
  const swiperRef = useRef<any>(null); // Ref to access Swiper instance
  const [isAutoplayActive, setIsAutoplayActive] = useState(true); // Track autoplay status
  const slideIntervalRef = useRef<any>(null); // Store interval ID for autoplay

  const goToPrev = () => {
    swiperRef.current.swiper.slidePrev(); // Go to previous slide
    resetAutoplay(); // Reset autoplay timer
  };

  const goToNext = () => {
    swiperRef.current.swiper.slideNext(); // Go to next slide
    resetAutoplay(); // Reset autoplay timer
  };

  // Custom autoplay function
  const startAutoplay = () => {
    slideIntervalRef.current = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slideNext(); // Go to next slide
      }
    }, 6000); // Auto-slide every 5 seconds
  };

  // Reset autoplay timer whenever the user interacts with the slider
  const resetAutoplay = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current); // Clear the previous interval
    }
    if (isAutoplayActive) {
      startAutoplay(); // Restart the autoplay timer
    }
  };

  // Start the autoplay when the component mounts
  useEffect(() => {
    startAutoplay();

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current); // Clean up interval on component unmount
      }
    };
  }, [isAutoplayActive]);

  return (
    <div className="relative w-full h-full rounded-lg shadow-lg overflow-hidden">
      <Swiper
        ref={swiperRef}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        className="w-full h-full"
        onSlideChange={resetAutoplay} // Reset autoplay when user interacts
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="/Apple.webp"
              alt="Black Friday Deals"
              className="w-full h-full object-cover rounded-lg transform transition-all duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent text-white flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold">Black Friday Deals!</h3>
              <p className="text-sm">Don't miss out on the best discounts of the year!</p>
            </div>
          </div>
        </SwiperSlide>
        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="/all.png"
              alt="Exclusive Offers"
              className="w-full h-full object-cover rounded-lg transform transition-all duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent text-white flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold">Exclusive Offers</h3>
              <p className="text-sm">Up to 50% OFF on selected items</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* Custom Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700"
        onClick={goToPrev}
      >
        &#10094;
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700"
        onClick={goToNext}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Slider;
