import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-8 relative">

      {/* Social Media Icons and Subscribe to Newsletter Section */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 z-10">
        {/* Social Media Icons on the Left */}
        <div className="flex space-x-6">
          <a href="https://facebook.com" className="text-white hover:text-blue-300">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" className="text-white hover:text-blue-300">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" className="text-white hover:text-blue-300">
            <FaInstagram size={24} />
          </a>
          <a href="https://linkedin.com" className="text-white hover:text-blue-300">
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Subscribe to Newsletter on the Right */}
        <div className="bg-gradient-to-r from-blue-700 to-teal-600 p-4 rounded-md flex items-center space-x-2">
          <input
            type="email"
            placeholder="Your email"
            className="p-2 rounded-l-md text-gray-800 w-48"
          />
          <button className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 text-sm">Subscribe</button>
        </div>
      </div>

      {/* Gradient Line */}
      <div className="border-t-2 border-gradient-to-r from-blue-600 to-teal-500 my-16 z-0 mt-24"></div>

      {/* Flex container for logo + description (left) and other sections (right) */}
      <div className="flex justify-between items-start mt-24 z-20 px-6">
        {/* Logo and Description Section */}
        <div className="flex flex-col w-1/3">
          {/* Logo as Text */}
          <div className="flex-shrink-0 mb-4">
            <h1 className="text-3xl font-semibold text-gray-100">Shopr</h1>
          </div>

          {/* Description */}
          <div className="text-left">
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Welcome to Computer Shopr. <br />
              Online Computer store in Pakistan. <br />
              Buy Dell, Lenovo, HP, Acer laptops <br />
              at the best prices in Pakistan.
            </p>
          </div>
        </div>

        {/* Other Sections (Products, Account, Corporate, Contact) */}
        <div className="flex w-2/3 justify-between">
          {/* Products Section */}
          <section className="w-1/4">
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Popular Products</h3>
            <ul className="text-gray-300 space-y-2">
              <li><a href="#" className="hover:text-blue-300">Dell Laptops</a></li>
              <li><a href="#" className="hover:text-blue-300">Lenovo Laptops</a></li>
              <li><a href="#" className="hover:text-blue-300">HP Laptops</a></li>
              <li><a href="#" className="hover:text-blue-300">Acer Laptops</a></li>
            </ul>
          </section>

          {/* Account Section */}
          <section className="w-1/4">
            <h3 className="text-lg font-semibold mb-4 text-gray-100">My Account</h3>
            <ul className="text-gray-300 space-y-2">
              <li><a href="#" className="hover:text-blue-300">Sign In</a></li>
              <li><a href="#" className="hover:text-blue-300">Create an Account</a></li>
              <li><a href="#" className="hover:text-blue-300">Order History</a></li>
              <li><a href="#" className="hover:text-blue-300">Wishlist</a></li>
            </ul>
          </section>

          {/* Corporate Section */}
          <section className="w-1/4">
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Corporate</h3>
            <ul className="text-gray-300 space-y-2">
              <li><a href="#" className="hover:text-blue-300">About Us</a></li>
              <li><a href="#" className="hover:text-blue-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-300">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-blue-300">Careers</a></li>
            </ul>
          </section>

          {/* Contact Section */}
          <section className="w-1/4">
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Contact Us</h3>
            <ul className="text-gray-300 space-y-2">
              <li>Email: <a href="mailto:support@shopr.com" className="hover:text-blue-300">support@shopr.com</a></li>
              <li>Phone: <a href="tel:+923001234567" className="hover:text-blue-300">+92 300 123 4567</a></li>
              <li>Address: Shopr Pvt. Ltd, Lahore, Pakistan</li>
            </ul>
          </section>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-6 text-center text-gray-300 text-sm">
        <p>&copy; 2024 Shopr. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
