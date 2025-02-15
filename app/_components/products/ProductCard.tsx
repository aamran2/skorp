"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductDialog } from "./ProductDialog";
import { type Product, type Variant } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(product.variants[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const priceRange = product.variants.length > 1
    ? {
        min: Math.min(...product.variants.map(v => Number(v.price))),
        max: Math.max(...product.variants.map(v => Number(v.price)))
      }
    : null;

  return (
    <>
      <Card className="flex flex-col group cursor-pointer h-full" onClick={() => setIsDialogOpen(true)}>
        <CardHeader className="flex-none">
          <div className="aspect-square relative bg-zinc-100 dark:bg-zinc-800 rounded-lg mb-2">
            <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
              [Product Image]
            </div>
            {product.badge && (
              <Badge variant="secondary" className="absolute top-2 left-2">
                {product.badge}
              </Badge>
            )}
          </div>
          <CardTitle className="line-clamp-1" title={product.name}>
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2" title={product.shortDescription}>
              {product.shortDescription}
            </p>
            <div className="mt-auto pt-2">
              <p className="text-2xl font-bold">
                {priceRange 
                  ? `$${priceRange.min} - $${priceRange.max}`
                  : `$${selectedVariant.price}`
                }
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-none border-t pt-4">
          <Button 
            className="w-full group-hover:bg-primary/90"
            onClick={(e) => {
              e.stopPropagation();
              setIsDialogOpen(true);
            }}
          >
            View Details
          </Button>
        </CardFooter>
      </Card>

      <ProductDialog 
        product={product}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
} 