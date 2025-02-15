"use client";

import { type Dispatch, type SetStateAction } from "react";
import { Badge } from "@/components/ui/badge";
import { SellAuthButton } from "@/components/SellAuth/SellAuthButton";
import { type Product, type Variant } from "@/types/product";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductDialogProps {
  product: Product;
  selectedVariant: Variant;
  setSelectedVariant: Dispatch<SetStateAction<Variant>>;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDialog({ 
  product, 
  selectedVariant, 
  setSelectedVariant, 
  isOpen, 
  onOpenChange 
}: ProductDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col md:block max-w-2xl max-h-[90vh] md:max-h-fit">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto md:overflow-visible pr-2 md:pr-0">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400">
                [Product Image]
              </div>
              <div className="space-y-4">
                {product.badge && (
                  <Badge variant="secondary" className="mb-2">
                    {product.badge}
                  </Badge>
                )}
                <p className="text-zinc-600 dark:text-zinc-300">
                  {product.description}
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Key Features</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {product.keyFeatures?.map((feature, index) => (
                        <li key={index}>
                          <span className="font-medium">{feature.title}:</span>{" "}
                          {feature.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {product.variants.length > 1 && (
                    <div className="space-y-2">
                      <h3 className="font-medium">Select Variant</h3>
                      <Select
                        value={selectedVariant.name}
                        onValueChange={(value) => {
                          const variant = product.variants.find((v) => v.name === value);
                          if (variant) setSelectedVariant(variant);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a variant" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.variants.map((variant) => (
                            <SelectItem key={variant.sellAuthVariantId} value={variant.name}>
                              {variant.name} - ${variant.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium mb-2">Variant Features</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedVariant.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t pt-4 mt-4 bg-background sticky md:static bottom-0">
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold">${selectedVariant.price}</p>
            {product.variants.length > 1 && (
              <p className="text-sm text-zinc-500">{selectedVariant.name}</p>
            )}
          </div>
          <SellAuthButton 
            productId={product.sellAuthProductId!}
            variantId={selectedVariant.sellAuthVariantId!}
            className="w-48"
          >
            Buy now
          </SellAuthButton>
        </div>
      </DialogContent>
    </Dialog>
  );
} 