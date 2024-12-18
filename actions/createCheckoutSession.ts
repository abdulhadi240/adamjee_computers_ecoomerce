"use server";

import { imageUrl } from "@/lib/imageUrl";
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
  items: GroupedBasketItem[],  // Fix: Correct type definition (should be an array)
  metadata: Metadata
) {
  try {
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have a price");
    }

    const orderData = items.map((item) => ({
      product_data: {
        name: item.product.name || "Unnamed Product",
        description: `Product ID: ${item.product._id}`,
        metadata: {
          id: item.product._id,
        },
        images: item.product.image
          ? [imageUrl(item.product.image).url()]
          : undefined,
      },
      quantity: item.quantity,
    }));

    // Here, you would typically handle the order data, such as saving to a database or further processing.
    console.log("Order Data:", orderData);

    // Simulate successful order URL (or redirect as needed)
    return `/order-success?orderNumber=${metadata.orderNumber}`;

  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;  // Rethrow the error to be handled at a higher level
  }
}
