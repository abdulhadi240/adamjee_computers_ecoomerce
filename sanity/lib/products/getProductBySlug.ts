import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductBySlug = async (slug: string) => {
  // Define Query
  const PRODUCT_BY_ID_QUERY = defineQuery(`
    *[
      _type == "products" && slug.current == $slug
    ] | order(name asc) [0]
  `);

  try {
    // Use sanityFetch to send the query with the slug as a parameter
    const product = await sanityFetch({
      query: PRODUCT_BY_ID_QUERY,
      params: {
        slug, // Pass the slug as a query parameter
      },
    });
    console.log("Fetching product with slug:", slug);


    // Return the product data or null if not found
    return product.data || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};
