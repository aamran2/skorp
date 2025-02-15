"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LearnMoreDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LearnMoreDialog({ isOpen, onOpenChange }: LearnMoreDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            What&apos;s this demo about?
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <DialogDescription>
            A simple demo showing how to add SellAuth payments to a Next.js website. Perfect for developers who want to start selling products online quickly.
          </DialogDescription>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">What&apos;s included</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Quick checkout with SellAuth</li>
                <li>Product options and variants</li>
                <li>Clean, modern design</li>
                <li>Works on all devices</li>
                <li>Light and dark themes</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Built with</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Next.js 15</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Shadcn UI</li>
                <li>SellAuth</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-end border-t pt-4">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 