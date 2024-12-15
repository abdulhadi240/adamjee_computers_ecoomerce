import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

// Function to get all categories
export const getAllCategories = async () => {
  // Define the query to fetch all categories
  const ALL_CATEGORIES_QUERY = defineQuery(`
    *[_type == "category"] | order(name asc)
  `);

  try {
    // Use sanityFetch to send the query
    const categories = await sanityFetch({
      query: ALL_CATEGORIES_QUERY,
    });

    // Log the categories for debugging
    console.log(categories);

    // Return the list of categories, or an empty array if none are found
    return categories.data || [];
  } catch (error) {
    // Log the error to the console
    console.error("Error fetching all categories:", error);

    // Return an empty array if an error occurs
    return [];
  }
};
