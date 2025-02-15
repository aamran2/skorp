import { Product } from "@/types/product";

export const featuredProducts: Product[] = [
  {
    id: 1,
    sellAuthProductId: 1,
    name: "Product Name",
    shortDescription: "Brief product description",
    description: "Detailed product description goes here",
    image: "/path-to-your-product-image.jpg",
    variants: [
      {
        sellAuthVariantId: 1,
        name: "Variant Name",
        price: "1",
        features: ["Key Variant Feature 1", "Key Variant Feature 2", "Key Variant Feature 3"]
      }
    ],
    badge: "Optional Badge Text",
    keyFeatures: [
      { title: "Main Feature 1", description: "Description of main feature 1" },
      { title: "Main Feature 2", description: "Description of main feature 2" },
      { title: "Main Feature 3", description: "Description of main feature 3" }
    ]
  },
  {
    id: 2,
    sellAuthProductId: 2,
    name: "Product Name",
    shortDescription: "Brief product description",
    description: "Detailed product description goes here",
    image: "/path-to-your-product-image.jpg",
    variants: [
      {
        sellAuthVariantId: 2,
        name: "Variant Name",
        price: "2",
        features: ["Key Variant Feature 1", "Key Variant Feature 2", "Key Variant Feature 3"]
      }
    ],
    badge: "Optional Badge Text",
    keyFeatures: [
      { title: "Main Feature 1", description: "Description of main feature 1" },
      { title: "Main Feature 2", description: "Description of main feature 2" },
      { title: "Main Feature 3", description: "Description of main feature 3" }
    ]
  },
  {
    id: 3,
    sellAuthProductId: 3,
    name: "Product Name",
    shortDescription: "Brief product description",
    description: "Detailed product description goes here",
    image: "/path-to-your-product-image.jpg",
    variants: [
      {
        sellAuthVariantId: 3,
        name: "Variant Name",
        price: "3",
        features: ["Key Variant Feature 1", "Key Variant Feature 2", "Key Variant Feature 3"]
      }
    ],
    keyFeatures: [
      { title: "Main Feature 1", description: "Description of main feature 1" },
      { title: "Main Feature 2", description: "Description of main feature 2" },
      { title: "Main Feature 3", description: "Description of main feature 3" }
    ]
  },
  {
    id: 4,
    sellAuthProductId: 4,
    name: "Product Name",
    shortDescription: "Brief product description",
    description: "Detailed product description goes here",
    image: "/path-to-your-product-image.jpg",
    variants: [
      {
        sellAuthVariantId: 4,
        name: "Variant Name",
        price: "4",
        features: ["Key Variant Feature 1", "Key Variant Feature 2", "Key Variant Feature 3"]
      }
    ],
    keyFeatures: [
      { title: "Main Feature 1", description: "Description of main feature 1" },
      { title: "Main Feature 2", description: "Description of main feature 2" },
      { title: "Main Feature 3", description: "Description of main feature 3" }
    ]
  },
]; 