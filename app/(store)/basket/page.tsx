"use client";
import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import AddToBasketButton from "@/components/AddToBasketButton";
import Loader from "@/components/Loader";
import { imageUrl } from "@/lib/imageUrl";
import useBasketStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { createClient } from "@sanity/client";
import { BasketItem } from "@/types"; // Assuming this type exists

const client = createClient({
  projectId: "your-project-id",
  dataset: "production",
  apiVersion: "2024-12-01",
  useCdn: true,
});

const saveOrderToSanity = async (orderDetails) => {
  try {
    const order = await client.create({
      _type: "order",
      orderNumber: orderDetails.orderNumber,
      customerName: orderDetails.customerName,
      customerEmail: orderDetails.customerEmail,
      items: orderDetails.items.map((item) => ({
        _type: "reference",
        _ref: item.product._id, // Assuming your products have _id field
      })),
      total: orderDetails.total,
      paymentMethod: orderDetails.paymentMethod,
      status: "pending", // Set initial status to 'pending'
    });
    console.log("Order saved to Sanity:", order);
  } catch (error) {
    console.error("Error saving order to Sanity:", error);
  }
};

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null); // Initialize the state for order details
  const [step, setStep] = useState(0);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    primaryPhone: "",
    secondaryPhone: "",
    address: "",
  }); // Initialize the userDetails state
  const truncateTitle = (title, wordLimit = 5) => {
    const words = title.split(" "); // Splits the title into an array of words.
    if (words.length <= wordLimit) return title; // If the title has 5 words or fewer, it is returned as is.
    return words.slice(0, wordLimit).join(" ") + "..."; // Otherwise, truncates to 5 words and appends '...'.
  };
  

  const saveOrderToSanity = async (orderDetails) => {
    try {
      const order = await client.create({
        _type: "order", // The document type in Sanity, make sure it exists in your schema
        orderNumber: orderDetails.orderNumber,
        customerName: orderDetails.customerName,
        customerEmail: orderDetails.customerEmail,
        items: orderDetails.items.map((item) => ({
          _type: "reference",
          _ref: item.product._id, // Assuming each item has a reference to a product in Sanity
        })),
        total: orderDetails.total,
        paymentMethod: orderDetails.paymentMethod,
        status: "pending", // Status of the order, initially set to 'pending'
        user: {
          _type: "reference",
          _ref: orderDetails.userId, // Reference to the user document in Sanity
        },
      });
      console.log("Order saved to Sanity:", order);
    } catch (error) {
      console.error("Error saving order to Sanity:", error);
    }
  };

  const handleCheckout = async () => {
    // Check if the user is signed in
    if (!isSignedIn) {
      alert('You must be signed in to complete the order.');
      return; // Prevent further execution if not signed in
    }
  
    // Set loading state to true while processing
    setLoading(true);

    try {
      console.log("Redirecting to success page...");
      router.push('/success'); // Redirect to success page
      const metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user!.id,
        paymentMethod: "Cash On Delivery",
      };

      // Create checkout session and get the URL
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

      // Update order details state
      setOrderDetails({
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        items: groupedItems,
        total: useBasketStore.getState().getTotalPrice(),
      });

      // Save the order to Sanity
      await saveOrderToSanity({
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        items: groupedItems,
        total: useBasketStore.getState().getTotalPrice(),
        paymentMethod: "Cash On Delivery",
        userId: user!.id, // Add userId to save a reference to the user in the order document
      });

      setOrderConfirmed(true);
      setStep(3); // Go to success page
    } catch (error) {
      console.error("Error processing checkout", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 max-w-full">
          Your Basket
        </h1>
        <p className="text-gray-600 text-lg">Your basket is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 truncate">
        Your Basket
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section: Basket Items */}
        <div className="flex-grow">
          {groupedItems.map((item) => (
            <div
              key={item.product._id}
              className="mb-4 p-4 border rounded flex items-center justify-between"
            >
              <div
                className="flex items-center cursor-pointer flex-1 min-w-0"
                onClick={() =>
                  router.push(`/product/${item.product.slug?.current}`)
                }
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name ?? "Product image"}
                      className="w-full h-full object-cover rounded"
                      width={96}
                      height={96}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold truncate">
                    {truncateTitle(item.product.name, 6)}{" "}
                    {/* Limit to 6 words */}
                  </h2>
                  <p className="text-sm sm:text-base">
                    Price: Rs
                    {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center ml-4 flex-shrink-0">
                <AddToBasketButton product={item.product} />
              </div>
            </div>
          ))}
        </div>
        {/* Right Section: Order Summary and Multi-step Checkout */}
        <div className="w-full lg:w-96 lg:sticky lg:top-4 h-fit bg-white p-8 border border-gray-300 rounded-2xl shadow-lg order-first lg:order-last">
        {step === 0 && (
  <div className="w-full lg:w-80 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
    {/* Header */}
    <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
      Order Summary
    </h3>

    {/* Order Details */}
    <div className="space-y-4 text-gray-700">
      {/* Items Count */}
      <div className="flex justify-between items-center text-lg font-medium">
        <span>Items:</span>
        <span>
          {groupedItems.reduce((total, item) => total + item.quantity, 0)}
        </span>
      </div>

      {/* Divider */}
      <hr className="border-gray-300" />

      {/* Total Price */}
      <div className="flex justify-between items-center text-lg font-semibold">
        <span>Total:</span>
        <span className="text-gray-900">
          Rs {useBasketStore.getState().getTotalPrice().toFixed(2)}
        </span>
      </div>

      {/* Cash On Delivery Charges */}
      <div className="flex justify-between items-center text-base text-gray-500 line-through">
        <span>Cash On Delivery:</span>
        <span>Rs 200</span>
      </div>

      {/* Discounted Total */}
      <div className="bg-gradient-to-br from-green-200 via-green-200 to-green-10 p-4 rounded-lg shadow-inner border border-green-100 text-center">
        <p className="text-xl font-semibold text-green-800">
          Discounted Total:
        </p>
        <p className="text-3xl font-extrabold text-green-700 mt-2">
          Rs {useBasketStore.getState().getTotalPrice().toFixed(2)}
        </p>
      </div>
    </div>

    {/* Proceed to Checkout Button */}
    <div className="mt-6">
      <button
        onClick={() => setStep(1)}
        className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white px-2 py-3 rounded-full shadow-md font-medium text-lg hover:from-blue-700 hover:to-teal-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={groupedItems.length === 0}
      >
        Proceed to Checkout
      </button>
    </div>
  </div>
)}

{step === 1 && (
  <div className="w-full lg:w-80 bg-white p-5 rounded-lg shadow-md space-y-5">
    {/* Header */}
    <h3 className="text-lg font-semibold text-gray-800 text-center">
      Contact & Shipping Information
    </h3>
    <p className="text-sm text-gray-500 text-center">
      Provide your details to proceed with the order.
    </p>

    {/* Form Fields */}
    <div className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="John Doe"
          value={userDetails.fullName}
          onChange={(e) =>
            setUserDetails({ ...userDetails, fullName: e.target.value })
          }
        />
      </div>

      {/* Primary Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Primary Phone
        </label>
        <input
          type="tel"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="03001234567"
          value={userDetails.primaryPhone}
          onChange={(e) =>
            setUserDetails({ ...userDetails, primaryPhone: e.target.value })
          }
        />
      </div>

      {/* Shipping Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Shipping Address
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter your address"
          rows="3"
          value={userDetails.address}
          onChange={(e) =>
            setUserDetails({ ...userDetails, address: e.target.value })
          }
        ></textarea>
      </div>
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-between items-center">
      <button
        onClick={() => setStep(0)}
        className="w-5/12 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm font-medium"
      >
        Back
      </button>
      <button
        onClick={() => setStep(2)}
        className="w-5/12 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm font-medium"
      >
        Next
      </button>
    </div>
  </div>
)}

{step === 2 && (
  <div className="w-full lg:w-80 bg-white p-6 rounded-lg shadow-lg space-y-5">
    {/* Header */}
    <h3 className="text-lg font-semibold text-gray-800 text-center">
      Confirm Your Order
    </h3>
    <p className="text-sm text-gray-500 text-center">
      Review your order details and personal information before confirming.
    </p>

    {/* Order Summary */}
    <div className="space-y-4">
      {/* Items Count */}
      <div className="flex justify-between items-center text-sm text-gray-700">
        <span className="font-medium">Items:</span>
        <span className="font-semibold text-gray-800">3</span>
      </div>

      {/* Total Price */}
      <div className="flex justify-between items-center text-lg font-bold text-gray-800">
        <span>Total:</span>
        <span>Rs {parseFloat(1234.56).toFixed(2)}</span>
      </div>

      {/* Confirmation Message */}
      <p className="text-sm text-gray-500">
        Your order will be processed shortly. A confirmation email will be sent
        to you after completion.
      </p>
    </div>

    {/* Customer Details */}
    <div className="space-y-4 text-sm text-gray-700">
      <div className="flex justify-between items-center">
        <span className="font-medium">Full Name:</span>
        <span className="font-semibold text-gray-800">{userDetails.fullName}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium">Primary Phone:</span>
        <span className="font-semibold text-gray-800">{userDetails.primaryPhone}</span>
      </div>
      <div className="flex flex-col space-y-1">
        <span className="font-medium">Shipping Address:</span>
        <span className="font-semibold text-gray-800 whitespace-pre-wrap">
          {userDetails.address}
        </span>
      </div>
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-between items-center">
      <button
        onClick={() => setStep(1)}
        className="w-5/12 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm font-medium"
      >
        Back
      </button>
      <button
  type="button"
  onClick={handleCheckout} // Handle checkout on click
  className="w-5/12 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-all focus:outline-none focus:ring-2 focus:ring-green-400 text-sm font-medium"
>
  Confirm Order
</button>

    </div>
  </div>
)}


        </div>
      </div>
    </div>
  );
}

export default BasketPage;
