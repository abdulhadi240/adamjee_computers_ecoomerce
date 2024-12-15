import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Initialize the image URL builder
const builder = imageUrlBuilder(client);

// Function to generate image URLs
export function imageUrl(source: SanityImageSource) {
  return builder.image(source);
}
