import AddToBasketButton from "@/components/AddToBasketButton";
import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

async function ProductPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Main Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Product Image */}
        <div
          className={`relative flex justify-center items-center overflow-hidden rounded-xl shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}
          style={{ height: '350px', width: '100%' }} // Adjusted size
        >
          {product.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name ?? "Product image"}
              layout="fill"
              objectFit="contain"
              className="transition-transform duration-300 hover:scale-105"
            />
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Product Name */}
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">{product.name}</h1>

            {/* Price */}
            <div className="text-xl font-medium text-gray-600 mb-4">
              Rs: {product.price?.toFixed(2)}
            </div>

            {/* Product Description */}
            <div className="prose text-gray-600 mb-6">
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center mb-6">
              <span
                className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${isOutOfStock ? 'bg-red-500' : 'bg-green-500'}`}
              >
                <svg
                  className="w-3 h-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {isOutOfStock ? (
                    <path
                      fillRule="evenodd"
                      d="M10 2a8 8 0 11-8 8 8.009 8.009 0 018-8zM10 0a10 10 0 100 20A10 10 0 0010 0zm0 15a1 1 0 110-2h1v-1h-2v3h1a1 1 0 010 2h-2a1 1 0 110-2h1v-2h-1a1 1 0 110-2h3a1 1 0 110 2h-1v2z"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M10 3a7 7 0 11-7 7 7 7 0 017-7zM10 0a10 10 0 100 20A10 10 0 0010 0zm0 15a1 1 0 110-2h1v-1h-2v3h1a1 1 0 010 2h-2a1 1 0 110-2h1v-2h-1a1 1 0 110-2h3a1 1 0 110 2h-1v2z"
                    />
                  )}
                </svg>
              </span>
              <span className={`ml-2 text-lg font-medium ${isOutOfStock ? 'text-red-500' : 'text-green-500'}`}>
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-6 ">
            <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="mt-8 border-t-2 border-gray-300 opacity-40 w-full"></div>
    </div>
  );
}

export default ProductPage;
