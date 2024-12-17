"use server";

import { BasketItem } from "@/store/store";

// Define Metadata and GroupedBasketItem types
export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string; // Clerk user ID to verify login
  paymentMethod: string; // Payment method (e.g., "Cash on Delivery", "Card")
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

// Function to simulate order creation and handle errors
export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata
) {
  try {
    // 1. Check for user login status
    if (!metadata.clerkUserId) {
      throw new Error("You must be logged in to place an order.");
    }

    // 2. Validate product prices
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items in your basket are missing a price.");
    }

    // 3. Set default payment method if not specified
    const updatedMetadata: Metadata = {
      ...metadata,
      paymentMethod: metadata.paymentMethod || "Cash on Delivery",
    };

    // 4. Simulate order processing (e.g., saving to database or calling a backend API)
    console.log("✅ Creating order...");
    console.log("Order Details:");
    console.table({
      OrderNumber: updatedMetadata.orderNumber,
      Customer: updatedMetadata.customerName,
      Email: updatedMetadata.customerEmail,
      Payment: updatedMetadata.paymentMethod,
    });

    // Fake delay for realistic processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 5. Return success response
    return {
      status: "success",
      message: `🎉 Thank you, ${updatedMetadata.customerName}! Your order #${updatedMetadata.orderNumber} has been placed successfully.`,
    };
    
  } catch (error: any) {
    console.error("🚨 Error during checkout:", error.message);

    // Return structured error response for better debugging
    return {
      status: "error",
      message: error.message || "Something went wrong during checkout.",
    };
  }
}