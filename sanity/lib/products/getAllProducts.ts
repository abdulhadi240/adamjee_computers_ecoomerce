import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
  // Define the query to fetch all products
  const ALL_PRODUCTS_QUERY = defineQuery(`*[ _type == "products" ] | order(name asc)`);

  try {
    // Use sanityFetch to send the query
    const products = await sanityFetch({
      query: ALL_PRODUCTS_QUERY,
    });

    console.log("Fetched Products: ", products); // Log the products data

    // Return the list of products, or an empty array if no data is found
    return products.data || [];
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};

