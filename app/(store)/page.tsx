import { getAllProducts } from "@/sanity/lib/products/getAllProducts";  // Adjust with your actual path
import ProductsView from "@/components/ProductsView";  // Your ProductsView component
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";  // Assuming you have this function

export default async function Home() {
  // Fetch products and categories
  const products = await getAllProducts();  // Call your getAllProducts function
  const categories = await getAllCategories();  // Call getAllCategories if needed
  
  // Return the page content
  return (
    <div>
      <h1>Hello World</h1>
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
        {/* Any other content */}
      </div>
      <ProductsView products={products} categories={categories} /> {/* Pass products and categories to the view */}
    </div>
  );
}
