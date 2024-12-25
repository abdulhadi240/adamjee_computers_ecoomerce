"use client";
import { Products } from "@/sanity.types";
import useBasketStore from "@/store/store";
import { useState, useEffect } from "react";

interface AddToBasketButtonProps {
  product: Products;
  disabled?: boolean;
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-4">
      {/* Add to Cart Button if no item in cart */}
      {itemCount === 0 ? (
        <button
          onClick={() => addItem(product)}
          className={` w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white p-3 rounded-full hover:from-blue-700 hover:to-teal-600 transition-all ease-in-out duration-300 ${
            disabled ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={disabled}
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          {/* Minus Button - Red for remove */}
          <button
            onClick={() => removeItem(product._id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center bg-red-500 text-xl font-bold text-white ${
              disabled ? "bg-gray-400 cursor-not-allowed" : "hover:bg-red-600"
            }`}
            disabled={disabled}
          >
            -
          </button>

          {/* Product Quantity */}
          <span className="w-8 text-center font-semibold">{itemCount}</span>

          {/* Plus Button - Green for add */}
          <button
            onClick={() => addItem(product)}
            className={`w-8 h-8 rounded-full flex items-center justify-center bg-green-500 text-xl font-bold text-white ${
              disabled ? "bg-gray-400 cursor-not-allowed" : "hover:bg-green-600"
            }`}
            disabled={disabled}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default AddToBasketButton;
