"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

interface HeroProps {
  onShopNowClick: () => void;
  onLearnMoreClick: () => void;
}

export function Hero({ onShopNowClick, onLearnMoreClick }: HeroProps) {
  return (
    <section className="relative px-4 py-20 text-center bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
        <a href="https://nextjs.org/" className="hover:text-blue-600 transition-colors">Next.js</a> + <a href="https://sellauth.com/" className="hover:text-blue-600 transition-colors">SellAuth</a> Demo
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8 max-w-2xl mx-auto">
        A simple demo of how to integrate SellAuth into a NextJS app
      </p>
      <div className="flex gap-4 justify-center">
        <Button size="lg" onClick={onShopNowClick}>Shop Now</Button>
        <Button size="lg" variant="outline" onClick={onLearnMoreClick}>
          Learn More
        </Button>
      </div>
    </section>
  );
} 