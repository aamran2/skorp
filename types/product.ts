export interface Variant {
    sellAuthVariantId?: number;
    name: string;
    price: string;
    features: string[];

  }
  
  export interface Product {
    id: number;
    sellAuthProductId?: number;
    name: string;
    shortDescription: string;
    description: string;
    image: string;
    showcaseImages?: string[];
    variants: Variant[];
    notAvailable?: boolean;
    badge?: string;
    keyFeatures?: { title: string; description: string; }[];
  } 