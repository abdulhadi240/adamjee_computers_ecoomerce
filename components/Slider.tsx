'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const Slider = () => {
  const swiperRef = useRef<any>(null); // Create a ref to access Swiper instance

  // Handle custom navigation
  const goToPrev = () => {
    swiperRef.current.swiper.slidePrev(); // Go to previous slide
  };

  const goToNext = () => {
    swiperRef.current.swiper.slideNext(); // Go to next slide
  };

  return (
    <div className="relative w-full h-full rounded-lg shadow-lg overflow-hidden">
      <Swiper
        ref={swiperRef} // Attach ref to the Swiper instance
        spaceBetween={0} // No gap between slides
        slidesPerView={1}
        autoplay={{ delay: 6000 }} // Auto-slide every 6 seconds
        loop={true} // Infinite loop
        className="w-full h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="/mouse.jpg" // Ensure correct path
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
              src="/img.jpg" // Ensure correct path
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
        onClick={goToPrev} // Bind the goToPrev function to this button
      >
        &#10094;
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700"
        onClick={goToNext} // Bind the goToNext function to this button
      >
        &#10095;
      </button>
    </div>
  );
};

export default Slider;
