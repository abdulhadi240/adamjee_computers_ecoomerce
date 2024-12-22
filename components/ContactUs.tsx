"use client"
import React, { useState } from "react";

// Define types for the form data and error message
interface FormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  category: string;
  subject: string;
  comments: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    comments: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation check for required fields
    if (!formData.fullName || !formData.email || !formData.comments) {
      setError("Please fill out all required fields.");
    } else {
      setError("");
      console.log("Form submitted", formData);
      // Send the data to an API endpoint or handle the submission here
    }
  };

  return (
    <div className="bg-gray-50 py-16 px-8 sm:px-16 md:px-32">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 animate__animated animate__fadeIn">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600">We’d love to hear from you! Reach out to us using the form below.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Contact Details Section */}
        <div className="bg-white p-8 rounded-lg shadow-xl w-full md:w-1/2 space-y-8 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-blue-50 hover:translate-y-4">
          <h2 className="text-3xl font-semibold text-gray-800">Contact Details</h2>

          {/* Contact Info */}
          <div className="text-gray-700 space-y-6">
            <div className="flex items-center space-x-4 hover:bg-blue-50 hover:rounded-md p-4 transition duration-300">
              <i className="fas fa-building text-blue-600 text-2xl"></i>
              <div>
                <strong className="text-gray-600">Company Name:</strong> Computer Zone
              </div>
            </div>

            <div className="flex items-center space-x-4 hover:bg-blue-50 hover:rounded-md p-4 transition duration-300">
              <i className="fas fa-map-marker-alt text-blue-600 text-2xl"></i>
              <div>
                <strong className="text-gray-600">Address:</strong> FL 4/20, Main Rashid Minhas Road, Gulshan-e-Iqbal Block-5, Karachi, Pakistan.
              </div>
            </div>

            <div className="flex items-center space-x-4 hover:bg-blue-50 hover:rounded-md p-4 transition duration-300">
              <i className="fas fa-phone-alt text-blue-600 text-2xl"></i>
              <div>
                <strong className="text-gray-600">Phone:</strong> +922134817355 | +922134155030 | +922134960583 | +923366842938 (WhatsApp Only)
              </div>
            </div>

            <div className="flex items-center space-x-4 hover:bg-blue-50 hover:rounded-md p-4 transition duration-300">
              <i className="fas fa-envelope text-blue-600 text-2xl"></i>
              <div>
                <strong className="text-gray-600">Email:</strong> <a href="mailto:info@czone.com.pk" className="text-blue-500 hover:underline">info@czone.com.pk</a>
              </div>
            </div>

            <div className="flex items-center space-x-4 hover:bg-blue-50 hover:rounded-md p-4 transition duration-300">
              <i className="fas fa-globe text-blue-600 text-2xl"></i>
              <div>
                <strong className="text-gray-600">Website:</strong> <a href="https://www.czone.com.pk" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">www.czone.com.pk</a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-xl w-full md:w-1/2">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-6">
              <label htmlFor="fullName" className="block text-lg font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Company Name */}
            <div className="mb-6">
              <label htmlFor="companyName" className="block text-lg font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Address */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-6">
              <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
                Phone / Mobile
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div className="mb-6">
              <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="Inquiry">Inquiry</option>
                <option value="Support">Support</option>
                <option value="Feedback">Feedback</option>
              </select>
            </div>

            {/* Subject */}
            <div className="mb-6">
              <label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Comments */}
            <div className="mb-6">
              <label htmlFor="comments" className="block text-lg font-medium text-gray-700 mb-2">
                Comments <span className="text-red-500">*</span>
              </label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
