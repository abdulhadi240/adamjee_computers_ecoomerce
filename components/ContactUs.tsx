// src/components/ContactUs.tsx
"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface FormData {
  fullName: string;
  email: string;
  comments: string;
}

const ContactUs: React.FC<{ title?: string }> = ({ title }) => {
  // Default title for Contact Us if no prop is passed
  const pageTitle = title || "Contact Us";

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      comments: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required!"),
      email: Yup.string().email("Invalid email format").required("Email is required!"),
      comments: Yup.string().required("Please enter your comments."),
    }),
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{pageTitle}</h1>
        <p className="text-gray-600 text-lg">
          {pageTitle === "Contact Us"
            ? "We'd love to hear from you! Drop us a message and we will get back to you soon."
            : "We appreciate your feedback! Please share your thoughts with us."}
        </p>
      </div>

      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-xl p-8 space-y-6">
        {/* Contact/Feedback Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-500 text-sm mt-2">{formik.errors.fullName}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-2">{formik.errors.email}</div>
            )}
          </div>

          {/* Comments (Feedback) */}
          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formik.values.comments}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={4}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            ></textarea>
            {formik.touched.comments && formik.errors.comments && (
              <div className="text-red-500 text-sm mt-2">{formik.errors.comments}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:from-blue-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Contact Details (if it's Contact Us) */}
      {pageTitle === "Contact Us" && (
        <div className="mt-12 text-center text-gray-800 space-y-4">
          <p className="text-lg">Or reach us via:</p>
          <div className="space-y-2 text-sm">
            <p><strong>Phone:</strong> +92 300 000 0000 | +92 300 000 0000</p>
            <p><strong>Email:</strong> support@shopr.com</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
