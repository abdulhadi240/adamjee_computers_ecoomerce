"use client";
import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession";
import AddToBasketButton from "@/components/AddToBasketButton";
import Loader from "@/components/Loader";
import { imageUrl } from "@/lib/imageUrl";
import useBasketStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { createClient } from '@sanity/client';
import { BasketItem } from "@/types"; // Assuming this type exists

const client = createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  apiVersion: '2024-12-01',
  useCdn: true,
});

const saveOrderToSanity = async (orderDetails) => {
  try {
    const order = await client.create({
      _type: 'order',
      orderNumber: orderDetails.orderNumber,
      customerName: orderDetails.customerName,
      customerEmail: orderDetails.customerEmail,
      items: orderDetails.items.map(item => ({
        _type: 'reference',
        _ref: item.product._id, // Assuming your products have _id field
      })),
      total: orderDetails.total,
      paymentMethod: orderDetails.paymentMethod,
      status: 'pending', // Set initial status to 'pending'
    });
    console.log('Order saved to Sanity:', order);
  } catch (error) {
    console.error('Error saving order to Sanity:', error);
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
    fullName: '',
    primaryPhone: '',
    secondaryPhone: '',
    address: '',
  }); // Initialize the userDetails state

  const saveOrderToSanity = async (orderDetails) => {
    try {
      const order = await client.create({
        _type: 'order', // The document type in Sanity, make sure it exists in your schema
        orderNumber: orderDetails.orderNumber,
        customerName: orderDetails.customerName,
        customerEmail: orderDetails.customerEmail,
        items: orderDetails.items.map(item => ({
          _type: 'reference',
          _ref: item.product._id, // Assuming each item has a reference to a product in Sanity
        })),
        total: orderDetails.total,
        paymentMethod: orderDetails.paymentMethod,
        status: 'pending', // Status of the order, initially set to 'pending'
        user: {
          _type: 'reference', 
          _ref: orderDetails.userId // Reference to the user document in Sanity
        },
      });
      console.log('Order saved to Sanity:', order);
    } catch (error) {
      console.error('Error saving order to Sanity:', error);
    }
  };
  
  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setLoading(true);
  
    try {
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
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
        <p className="text-gray-600 text-lg">Your basket is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
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
                    {item.product.name}
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
<div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last">
  {step === 0 && (
    <div>
      {/* Step 0: Order Summary */}
      <h3 className="text-xl font-semibold text-gray-800">Order Summary</h3>
      <div className="mt-4 space-y-2 text-gray-700">
        <p className="flex justify-between">
          <span>Items:</span>
          <span>
            {groupedItems.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </p>
        <p className="flex justify-between text-2xl font-bold border-t pt-2">
          <span>Total:</span>
          <span>{useBasketStore.getState().getTotalPrice().toFixed(2)}</span>
        </p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Cash On Delivery Charges:</span>
          <span className="line-through text-gray-500">Rs 200</span>
        </div>
        <div className="flex justify-between text-xl font-semibold border-t pt-2">
          <span>Discounted Total:</span>
          <span>{useBasketStore.getState().getTotalPrice().toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={() => setStep(1)}
        className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Proceed to Checkout
      </button>
    </div>
  )}

  {step === 1 && (
    <div>
      {/* Step 1: Contact and Shipping Information */}
      <h3 className="text-xl font-semibold text-gray-800">Contact & Shipping</h3>
      <div className="mt-4 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 mt-1 border rounded focus:ring-2 focus:ring-blue-400"
            placeholder="Full Name"
            value={userDetails.fullName}
            onChange={(e) =>
              setUserDetails({ ...userDetails, fullName: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">
            Primary Phone
          </label>
          <input
            type="tel"
            className="w-full px-4 py-2 mt-1 border rounded focus:ring-2 focus:ring-blue-400"
            placeholder="Primary Phone"
            value={userDetails.primaryPhone}
            onChange={(e) =>
              setUserDetails({ ...userDetails, primaryPhone: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">
            Shipping Address
          </label>
          <textarea
            className="w-full px-4 py-2 mt-1 border rounded focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your address"
            value={userDetails.address}
            onChange={(e) =>
              setUserDetails({ ...userDetails, address: e.target.value })
            }
          />
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setStep(0)}
          className="w-1/3 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={() => setStep(2)}
          className="w-1/3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  )}

{step === 2 && !orderConfirmed && (
        <div>
          {/* Step 2: Order Confirmation */}
          <h3 className="text-xl font-semibold text-gray-800">Order Confirmation</h3>
          <div className="mt-4 space-y-4 text-gray-700">
            <p className="flex justify-between">
              <span>Items:</span>
              <span> {/* Add item quantity logic here */} </span>
            </p>
            <p className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>{/* Add total price calculation here */}</span>
            </p>
            <p className="text-sm text-gray-600">
              Your order will be processed soon. A confirmation email will be sent to you.
            </p>
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="w-1/3 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Back
            </button>
            <button
  type="button"
  onClick={handleCheckout}
  className="w-full py-2 sm:py-3 rounded-md bg-purple-600 text-white hover:bg-purple-700 text-sm sm:text-base"
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
};

export default BasketPage;