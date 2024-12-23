// src/components/AboutUs.tsx
"use client";
import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">About Us</h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          We are a tech-driven e-commerce platform bringing the latest computer products to your doorstep. Our mission is to make high-quality computer products accessible to everyone.
        </p>
      </div>

      {/* Company Overview */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-base leading-relaxed">
          At [Your Company Name], we provide the best in computer hardware, software, and accessories. Our mission is to deliver the latest and most innovative technology solutions at the best prices while ensuring top-notch customer service.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Our Story</h2>
        <p className="text-gray-600 text-base leading-relaxed">
          Founded in 2020, we set out to make buying computer products easy and efficient. We combine our passion for technology with our expertise in e-commerce to bring you the best deals on the latest tech gadgets.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Why Choose Us?</h2>
        <p className="text-gray-600 text-base leading-relaxed">
          We’re not just another e-commerce platform. We stand out by offering:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Expertly curated products for all your computer needs</li>
          <li>Fast and secure shipping worldwide</li>
          <li>Top-tier customer support whenever you need it</li>
          <li>Exclusive deals and discounts on the latest tech</li>
        </ul>
      </div>

      {/* Team Section */}
      <div className="text-center mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Meet the Team</h2>
        <div className="flex flex-wrap justify-center gap-10">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-lg font-semibold">
            CEO
          </div>
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-lg font-semibold">
            COO
          </div>
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-lg font-semibold">
            CTO
          </div>
        </div>
        <p className="mt-6 text-gray-600 text-base max-w-xl mx-auto">
          Our team is passionate about technology and committed to bringing the best customer experience in the e-commerce industry.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
