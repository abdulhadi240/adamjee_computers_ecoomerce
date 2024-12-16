"use server";
import { BasketItem } from "@/store/store";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
  paymentMethod: string; // Added a new field for payment method
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata
) {
  try {
    // Check if any grouped items don't have a price
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have a price");
    }

    // Add Cash on Delivery as the payment method
    const updatedMetadata: Metadata = {
      ...metadata,
      paymentMethod: "Cash on Delivery", // Set the payment method to "Cash on Delivery"
    };

    // Proceed with the checkout process
    console.log("Checkout Session Created with the following details:");
    console.log("Order Number:", updatedMetadata.orderNumber);
    console.log("Customer Name:", updatedMetadata.customerName);
    console.log("Customer Email:", updatedMetadata.customerEmail);
    console.log("Payment Method:", updatedMetadata.paymentMethod); // Logs the payment method (COD)

    // In a real-world scenario, here you would save the order to the database, etc.
    // For this example, let's assume the order is successfully processed.

    return {
      status: "success",
      message: "Order created successfully with Cash on Delivery.",
    };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error; // Rethrow the error after logging
  }
}
