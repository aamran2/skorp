"use client";

import { useRef, useState } from "react";
import { featuredProducts } from "@/data/products";
import { Hero } from "./_components/home/Hero";
import { LearnMoreDialog } from "./_components/home/LearnMoreDialog";
import { ProductsSection } from "./_components/products/ProductsSection";

export default function Home() {
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const productsRef = useRef<HTMLElement>(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Hero 
        onShopNowClick={scrollToProducts}
        onLearnMoreClick={() => setIsLearnMoreOpen(true)}
      />

      <ProductsSection 
        ref={productsRef}
        products={featuredProducts}
      />

      <LearnMoreDialog 
        isOpen={isLearnMoreOpen}
        onOpenChange={setIsLearnMoreOpen}
      />
    </div>
  );
}
