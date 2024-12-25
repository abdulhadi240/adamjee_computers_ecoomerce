"use client";
import { Products } from "@/sanity.types";
import ProductThumb from "./ProductThumb";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react"; // Eye icon from lucide-react for modern touch

function ProductGrid({ products }: { products: Products[] }) {
  const router = useRouter();

  const handleProductClick = (product: Products) => {
    router.push(`/product/${product.slug.current}`); // Navigate to product details page
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 px-4 sm:px-6">
      {products?.map((product) => {
        return (
          <AnimatePresence key={product._id}>
            <motion.div
              layout
              initial={{ opacity: 0.2, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex justify-center relative group"
            >
              <div
                onClick={() => handleProductClick(product)}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200 ease-in-out transform hover:scale-102 hover:shadow-lg w-full cursor-pointer flex flex-col"
              >
                {/* Product Thumbnail */}
                <ProductThumb key={product._id} product={product} />

                {/* Quick View Label */}
                <div className="absolute top-4 right-4 p-3 bg-black bg-opacity-70 text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform scale-90 group-hover:scale-100 flex items-center space-x-2 shadow-lg">
                  <Eye className="h-5 w-5" /> {/* Eye icon */}
                  <span className="font-semibold">Quick View</span>
                </div>

                {/* View Details Button Below the Product Card */}
                <div className="p-4 mt-auto">
                  <button
                    onClick={() => handleProductClick(product)} // Same functionality as Quick View
                    className="w-full px-2 py-1 bg-gradient-to-r from-blue-600 to-teal-500 text-white p-3 rounded-full hover:from-blue-700 hover:to-teal-600 transition-all ease-in-out duration-300 font-thin"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        );
      })}
    </div>
  );
}

export default ProductGrid;
