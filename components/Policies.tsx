"use client";
import React from "react";

const Policies: React.FC = () => {
  return (
    <div className="bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Title Section */}
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-4">Warranty & Return Policies</h1>
          <p className="text-lg text-gray-600">
            Please read our terms and conditions regarding warranties and returns.
          </p>
        </div>

        {/* Policy Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Policy Block */}
          <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Warranty Coverage</h2>
            <p className="text-gray-600">
              Warranty is provided by the manufacturer, supplier, or distributor. 
              It is essential that customers inspect products before purchase as warranties begin upon receipt.
            </p>
            <ul className="list-disc pl-5 mt-4 text-gray-600">
              <li>Warranty applies only if the product is in good condition.</li>
              <li>Claims without the original invoice will be rejected.</li>
              <li>Warranty does not cover accidental damage or misuse.</li>
            </ul>
          </div>

          {/* Policy Block */}
          <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Conditions & Exclusions</h2>
            <p className="text-gray-600">
              Certain conditions and exclusions apply. Please ensure that all product requirements are met to ensure warranty coverage.
            </p>
            <ul className="list-disc pl-5 mt-4 text-gray-600">
              <li>Warranty will not cover products with damaged serial numbers.</li>
              <li>Power surges and accidental damage are not covered under warranty.</li>
              <li>Software-related issues are not part of hardware warranty.</li>
            </ul>
          </div>
        </div>

        {/* Additional Policy Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Returns & Refunds</h2>
            <p className="text-gray-600">
              Returns are allowed for unused products within 30 days. Refunds are processed after review.
            </p>
            <ul className="list-disc pl-5 mt-4 text-gray-600">
              <li>Items marked "Without Warranty" must be checked before leaving.</li>
              <li>Refunds will be issued based on the condition of the product.</li>
              <li>Refund requests are not entertained after 30 days.</li>
            </ul>
          </div>

          <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Warranty Service Hours</h2>
            <p className="text-gray-600">
              We accept warranty claims during service hours and only with proper documentation.
            </p>
            <ul className="list-disc pl-5 mt-4 text-gray-600">
              <li>Warranty service is available Monday to Friday, from 11:30 AM to 6:30 PM.</li>
              <li>Claims can be processed with original invoices and warranty cards.</li>
              <li>International warranty claims are handled directly by the manufacturer.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            <span>&copy; {new Date().getFullYear()} Shopr. All rights reserved.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policies;
