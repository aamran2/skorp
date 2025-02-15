"use client";

import { forwardRef } from "react";
import { type Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductsSectionProps {
  products: Product[];
}

export const ProductsSection = forwardRef<HTMLElement, ProductsSectionProps>(
  function ProductsSection({ products }, ref) {
    return (
      <section ref={ref} className="py-16 px-4 bg-zinc-50 dark:bg-zinc-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    );
  }
); 