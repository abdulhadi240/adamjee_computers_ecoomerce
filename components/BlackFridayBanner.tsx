import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import Slider from "./Slider"; // Import the Slider component

async function BlackFridayBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);

  if (!sale?.isActive) {
    return null;
  }

  return (
    <div className="bg-white text-[#1f2937] px-0 py-0 mx-auto mt-1 rounded-xl shadow-xl relative overflow-hidden transform transition-all duration-500 ease-in-out hover:scale-105">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between space-y-0 sm:space-y-0 sm:space-x-1">
        {/* Left side: Text section */}
        <div className="flex-1 sm:flex-[0.4] text-center sm:text-left">
          <h2 className="text-3xl sm:text-3xl font-extrabold mb-2 text-[#1f2937] transition-all duration-300 ease-in-out transform hover:text-[#9333ea]">
            {sale.title}
          </h2>
          <p className="text-base sm:text-xl font-semibold mb-2 text-[#4b5563] transition-all duration-300 ease-in-out transform hover:text-[#1f2937]">
            {sale.description}
          </p>
          <div className="flex justify-center sm:justify-start">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-1 px-4 sm:px-5 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#2563eb] relative z-10">
              <span className="font-bold text-xl sm:text-xl">
                Use code:{" "}
                <span className="text-red-500">{sale.couponCode}</span>
              </span>
              <span className="ml-2 font-bold text-lg sm:text-xl">
                for {sale.discountAmount}% OFF
              </span>
            </div>
          </div>
        </div>

        {/* Right side: Image Slider */}
        <div className="flex-1 sm:flex-[0.6] mt-4 sm:mt-0 relative w-full sm:max-w-2xl rounded-lg overflow-hidden shadow-xl">
          <Slider /> {/* Add the Slider component here */}
        </div>
      </div>

      {/* Decorative diagonal line for added flair */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-indigo-600 to-purple-600 transform rotate-6 skew-y-6 z-0"></div>
    </div>
  );
}

export default BlackFridayBanner;
