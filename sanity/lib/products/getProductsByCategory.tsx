import { defineQuery } from "next-sanity";  // Import the necessary function from next-sanity
import { sanityFetch } from "../live";  // Import your custom sanity fetch utility

// Define the query to fetch products by category
export const getProductsByCategory = async (categorySlug: string) => {
  const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
    *[_type == "products" && references(*[_type == "category" && slug.current == $categorySlug]._id)] 
    | order(name asc)
  `);

  try {
    // Use sanityFetch to send the query with the category slug as a parameter
    const products = await sanityFetch({
      query: PRODUCTS_BY_CATEGORY_QUERY,
      params: {
        categorySlug, // Pass the categorySlug as a parameter
      },
    });

    // Return the list of products, or an empty array if none are found
    return products.data || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};
