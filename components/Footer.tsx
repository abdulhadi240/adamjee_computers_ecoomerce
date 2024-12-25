import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaRegLightbulb, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Link from 'next/link'; // Import Link for Next.js routing

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-10 px-6">
      {/* Social Media and Newsletter */}
      <div className="flex flex-wrap justify-between items-center border-b border-white/20 pb-6">
        {/* Social Media Icons */}
        <div className="flex space-x-4 mb-4 sm:mb-0">
          <a
            href="https://facebook.com"
            className="text-white hover:text-blue-300 transform hover:scale-105 transition-all duration-200"
          >
            <FaFacebook size={22} />
          </a>
          <a
            href="https://twitter.com"
            className="text-white hover:text-blue-300 transform hover:scale-105 transition-all duration-200"
          >
            <FaTwitter size={22} />
          </a>
          <a
            href="https://instagram.com"
            className="text-white hover:text-blue-300 transform hover:scale-105 transition-all duration-200"
          >
            <FaInstagram size={22} />
          </a>
          <a
            href="https://linkedin.com"
            className="text-white hover:text-blue-300 transform hover:scale-105 transition-all duration-200"
          >
            <FaLinkedin size={22} />
          </a>
        </div>

        {/* Updated Gap Section - Modern CTA */}
        <div className="flex flex-col items-center space-y-3 mb-4 sm:mb-0 bg-gradient-to-r from-teal-500 to-blue-600 p-4 rounded-md shadow-lg">
          <div className="flex items-center space-x-2 text-lg font-semibold">
            <FaRegLightbulb className="text-yellow-400" size={24} />
            <p className="text-white text-sm">Get Exclusive Offers & Updates!</p>
          </div>
          <p className="text-gray-200 text-xs text-center">
            Stay in the loop with the latest offers, arrivals, and exclusive discounts. Be the first to know!
          </p>
        </div>

        {/* Newsletter */}
        <div className="flex items-center space-x-2">
          <input
            type="email"
            placeholder="Your email"
            className="p-2 rounded-l-md text-gray-800 w-48 text-sm focus:ring-2 focus:ring-teal-300 outline-none"
            aria-label="Enter your email address"
          />
          <button
            className="px-4 py-2 rounded-r-md bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white transform hover:scale-105 transition-all duration-200 text-sm"
            aria-label="Subscribe to newsletter"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Links Section */}
      <div className="flex flex-wrap justify-between items-start mt-6 text-sm">
        {/* Logo and Description */}
        <div className="w-full sm:w-1/4 mb-6 sm:mb-0">
          <h1 className="text-xl font-bold text-gray-100">Shopr</h1>
          <p className="text-gray-300 mt-2 leading-relaxed">
            Your trusted online store for computers <br /> and accessories in Pakistan.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="w-full sm:w-2/4 flex justify-between flex-wrap">
          {[{
            title: "PRODUCTS",
            links: [
              "Laptops",
              "Printers",
              "Hard Drives",
              "Network Products",
              "Monitors",
            ],
          }, {
            title: "ACCOUNT",
            links: ["Sign Up", "My Account", "Shopping Cart", "Order History"],
          }, {
            title: "CORPORATE",
            links: [
              <Link href="/about" key="about">
                About Us
              </Link>,
              <Link href="/contact" key="contact">
                Contact
              </Link>,
              <Link href="/faqs" key="faqs">
                FAQs
              </Link>,
              <Link href="/Policies" key="policies">
                Policies
              </Link>,
            ],
          }].map((section, index) => (
            <div key={index} className="w-1/2 sm:w-1/3 mb-4 sm:mb-0">
              <h3 className="text-gray-100 font-semibold mb-2">{section.title}</h3>
              <ul className="space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="w-full sm:w-1/4 mt-6 sm:mt-0">
          <h3 className="text-gray-100 font-semibold mb-2">CONTACT US</h3>
          <ul className="space-y-1 text-gray-300">
            <li className="flex items-center space-x-2">
              <FaEnvelope size={16} className="text-gray-300" />
              <span>
                <a
                  href="mailto:support@shopr.com"
                  className="text-gray-300 hover:text-blue-300"
                >
                  support@shopr.com
                </a>
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <FaPhoneAlt size={16} className="text-gray-300" />
              <span>
                <a
                  href="tel:+923001234567"
                  className="text-gray-300 hover:text-blue-300"
                >
                  +92 300 000 0000
                </a>
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <FaMapMarkerAlt size={16} className="text-gray-300" />
              <span>Shopr Pvt. Ltd, Lahore, Pakistan</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 text-center text-gray-300 text-xs">
        <p>&copy; 2024 Shopr. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
