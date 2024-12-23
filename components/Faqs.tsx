"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";

const Faqs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Is it possible to place an order online and what are the available payment options?",
      answer: "Online ordering is available, and upon receipt of payment, orders will be processed and shipped as soon as possible. The total time for delivery will depend on payment confirmation, processing time, and transit time. It can take anywhere from 24 hours to 10 days for in-stock items.",
    },
    {
      question: "Is the option of paying in cash upon delivery available?",
      answer: "Cash On Delivery is available for Karachi, and for other major cities, it is only available for orders under a certain limit.",
    },
    {
      question: "Are the prices of 'On Order' products subject to change?",
      answer: "We strive to keep prices accurate. However, due to fluctuations in foreign exchange rates or government policies, we may adjust prices without prior notice.",
    },
    {
      question: "What is the purpose of writing reviews?",
      answer: "We value your feedback! Your reviews help other consumers make informed decisions. You can submit reviews for items on our website, whether positive or negative.",
    },
    {
      question: "What’s not allowed in reviews?",
      answer: "We reserve the right to remove reviews that include objectionable content like offensive language, promotional material, or irrelevant feedback.",
    },
    {
      question: "What do 'On Order Only' items mean?",
      answer: "Items marked 'On Order Only' are not currently in stock and must be ordered from the supplier. Please call to confirm prices, especially due to fluctuating dollar rates.",
    },
    {
      question: "What are your store hours?",
      answer: "Store Hours: Monday – Thursday & Saturday: 11:00 am to 8:00 pm, Friday: 11:00 am to 1:00 pm & 3:00 pm to 8:00 pm, Sunday: Closed",
    },
  ];

  return (
    <div className="bg-white py-12 px-6 md:px-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600">Here are some common questions and answers to help you.</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
          >
            <button
              className="w-full text-left px-6 py-4 flex justify-between items-center bg-gray-100 rounded-md text-gray-800 hover:bg-gray-200"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center space-x-2">
                <FaQuestionCircle className="text-xl text-indigo-500" />
                <span className="text-md font-medium">{faq.question}</span>
              </div>
              <div className="text-xl text-gray-600">
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </button>

            <div
              className={`transition-all duration-300 overflow-hidden px-6 py-4 text-gray-700 ${
                openIndex === index ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
