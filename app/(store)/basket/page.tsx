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
import { useState, useEffect } from "react";

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const [isClient, setIsClient] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null); // State for order details modal
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    primaryPhone: "",
    secondaryPhone: "",
    address: "",
  });
  // Define handleNextStep
  const handleNextStep = () => {
    if (step === 1) {
      // Validate and move to step 2
      if (
        !userDetails.fullName ||
        !userDetails.primaryPhone ||
        !userDetails.secondaryPhone
      ) {
        alert("Please fill all fields.");
        return;
      }
    }
    setStep(step + 1); // Go to next step
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

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user!.id,
        paymentMethod: "Cash On Delivery",
      };

      // Get the checkout data (order details)
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

      // Set order details to be shown in the modal or as part of the page
      setOrderDetails({
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        items: groupedItems,
        total: useBasketStore.getState().getTotalPrice(),
      });

      // You can decide whether to redirect or not. If not, comment out the redirect:
      // window.location.href = checkoutUrl; // Remove this if you want to show the data instead
    } catch (error) {
      console.error("ERROR IN FETCHING CHECKOUT", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Apply the discount for the order type and calculate total with the discount
  const discount = 200;
  const totalPrice = useBasketStore.getState().getTotalPrice();
  const finalTotal = totalPrice - discount;

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

        {/* Right Section: Order Summary */}
        <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <div className="mt-4 space-y-2">
            <p className="flex justify-between">
              <span>Items: </span>
              <span>
                {groupedItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </p>
            <p className="flex justify-between text-2xl font-bold border-t pt-2">
              <span>Total: </span>
              <span>
                {useBasketStore.getState().getTotalPrice().toFixed(2)}
              </span>
            </p>

            {/* Cash on Delivery with strike-through */}
            <div className="flex justify-between text-sm text-gray-500">
              <span>Cash On Delivery Charges:</span>
              <span className="line-through text-gray-500">Rs 200</span>
            </div>

            {/* No changes to total price */}
            <div className="flex justify-between text-xl font-semibold border-t pt-2">
              <span>Discounted Total: </span>
              <span>
                {useBasketStore.getState().getTotalPrice().toFixed(2)}
              </span>
            </div>
          </div>

          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isLoading ? "Processing..." : "Checkout"}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Sign in to Checkout
              </button>
            </SignInButton>
          )}
        </div>
      </div>

      {/* Multi-step Form */}
      {step > 0 && (
        <div className="w-full lg:w-80 bg-white p-6 border rounded mt-8">
          {step === 1 && (
            <div>
              <h3 className="text-xl font-semibold">
                Step 1: Contact Information
              </h3>
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Full Name"
                  value={userDetails.fullName}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, fullName: e.target.value })
                  }
                />
                <input
                  type="tel"
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Primary Phone"
                  value={userDetails.primaryPhone}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      primaryPhone: e.target.value,
                    })
                  }
                />
                <input
                  type="tel"
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Secondary Phone"
                  value={userDetails.secondaryPhone}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      secondaryPhone: e.target.value,
                    })
                  }
                />
              </div>
              <button
                onClick={handleNextStep}
                className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-xl font-semibold">Step 2: Shipping Address</h3>
              <div className="mt-4 space-y-4">
                <textarea
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Shipping Address"
                  value={userDetails.address}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, address: e.target.value })
                  }
                />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)} // Go back to step 1
                  className="w-1/3 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Back
                </button>
                <button
                  onClick={handleCheckout} // Finalize Checkout
                  className="w-1/3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BasketPage;