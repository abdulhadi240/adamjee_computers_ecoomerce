import { Category, Products } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/category-selector";

interface ProductsViewProps {
  products: Products[];
  categories: Category[];
}

const ProductsView = ({ products, 
  categories 
}: ProductsViewProps)  => {
  return (
    <div className="flex flex-col">
      {/* Categories Section */}
      <div className="w-full sm:w-[200px]">
        <CategorySelectorComponent categories={categories} />
      </div>

   {/* Products Section */}
<div className="flex-1 bg-white shadow-lg rounded-lg p-6 space-y-10">
  {/* Header for Featured Products */}
  <div className="flex flex-col mb-6">
    <h2 className="text-3xl font-normal text-gray-900 tracking-tight mb-1">
      Featured Products
    </h2>
    <div className="w-full h-[1px] bg-gray-400 opacity-30 mb-1"></div> {/* Light line beneath title */}
  </div>

  {/* Product Grid */}
  <ProductGrid products={products} />
</div>

    </div>
  );
};

export default ProductsView;