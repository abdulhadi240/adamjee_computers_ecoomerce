import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import Slider from "./Slider";

export default async function BlackFridayBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);

  if (!sale?.isActive) {
    return null;
  }

  return (
    <div className="bg-white text-gray-900 px-6 py-8 mx-auto mt-4 rounded-xl shadow-2xl relative overflow-hidden transition-transform duration-300 transform hover:scale-105 max-w-6xl">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0">
        {/* Left Side: Text */}
        <div className="flex-1 text-center sm:text-left">
          {/* Black Friday Title with Gradient Mix of Blue */}
          <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-teal-500 mb-3">
            Black Friday
          </h2>
          
          {/* Description */}
          <p className="text-xl font-semibold text-gray-700 mb-4">
            Welcome to this year's largest sale!
          </p>
          
          {/* Use Code Button with Gradient and Hover Effect */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-2 px-6 rounded-full shadow-lg hover:from-blue-700 hover:to-teal-600 transition-all duration-300 hover:scale-105 inline-flex items-center space-x-3">
            <span className="font-bold text-sm sm:text-base">
              Use code: <span className="font-extrabold text-white">{sale.couponCode}</span>
            </span>
            <span className="font-bold text-sm sm:text-base">
              for {sale.discountAmount}% OFF
            </span>
          </div>
        </div>

        {/* Right Side: Slider */}
        <div className="flex-1 w-full rounded-xl shadow-lg overflow-hidden">
          <Slider />
        </div>
      </div>
    </div>
  );
}
