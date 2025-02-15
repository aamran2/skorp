'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { handleSellAuthError } from './SellAuthErrorHandler';
import { VisuallyHidden } from '@/components/VisuallyHidden';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

interface SellAuthCart {
  productId: number;
  variantId: number;
  quantity: number;
}

interface SellAuthCheckoutOptions {
  cart: SellAuthCart[];
  shopId: number;
  modal?: boolean;
}

class SellAuthEmbed {
  private recaptchaSiteKey: string;
  private isCheckingOut: boolean;
  private onCheckoutUrl?: (url: string) => void;

  constructor() {
    this.recaptchaSiteKey = '6LdtUw8qAAAAAOciQRvmRxTico0CL2IQmKUf8JyL';
    this.isCheckingOut = false;
    this.injectScripts();
    this.injectStyles();
  }

  private injectScripts(): void {
    if (!document.querySelector(`script[src*="recaptcha"]`)) {
      const recaptchaScript = document.createElement('script');
      recaptchaScript.src = `https://www.google.com/recaptcha/api.js?render=${this.recaptchaSiteKey}`;
      recaptchaScript.async = true;
      recaptchaScript.defer = true;
      document.head.appendChild(recaptchaScript);
    }
  }

  private injectStyles(): void {
    if (document.getElementById('sellauth-embed-style')) {
      return;
    }
    const style = document.createElement('style');
    style.id = 'sellauth-embed-style';
    style.textContent = `
      .sellauth-button[data-checking-out] {
        opacity: 0.5;
        pointer-events: none;
      }
      .grecaptcha-badge {
        visibility: hidden;
      }
    `;
    document.head.appendChild(style);
  }

  private async generateRecaptchaToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      const waitForRecaptcha = (attempts = 0) => {
        if (attempts > 20) { // 10 seconds timeout (20 * 500ms)
          reject(new Error('reCAPTCHA failed to load'));
          return;
        }

        if (!window.grecaptcha || !window.grecaptcha.execute) {
          setTimeout(() => waitForRecaptcha(attempts + 1), 500);
          return;
        }

        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(this.recaptchaSiteKey, {
              action: 'checkout_embed'
            });
            if (!token) {
              reject(new Error('Failed to generate reCAPTCHA token'));
              return;
            }
            resolve(token);
          } catch (error) {
            reject(error);
          }
        });
      };

      waitForRecaptcha();
    });
  }

  public setCheckoutUrlHandler(handler: (url: string) => void) {
    this.onCheckoutUrl = handler;
  }

  public async checkout(
    button: HTMLButtonElement,
    { cart, shopId, modal = Boolean(process.env.NEXT_PUBLIC_SELLAUTH_IS_MODAL) }: SellAuthCheckoutOptions
  ): Promise<void> {
    if (this.isCheckingOut) {
      return;
    }
    
    this.isCheckingOut = true;
    button.setAttribute('data-checking-out', '');

    try {
      let recaptchaToken;
      try {
        recaptchaToken = await this.generateRecaptchaToken();
      } catch (error) {
        console.error('reCAPTCHA error:', error);
        throw new Error('Failed to verify security check. Please refresh and try again.');
      }

      const formData = { 
        cart, 
        shopId,
        recaptchaToken 
      };

      const response = await fetch('https://api-internal.sellauth.com/v1/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        const error = new Error('Checkout failed') as Error & {
          status?: number;
          data?: unknown;
        };
        error.status = response.status;
        error.data = responseData;
        throw error;
      }

      if (!responseData.url) {
        throw new Error('No checkout URL returned');
      }

      if (modal && this.onCheckoutUrl) {
        this.onCheckoutUrl(responseData.url);
      } else {
        window.open(responseData.url, '_blank');
      }
    } catch (error: unknown) {
      this.isCheckingOut = false;
      button.removeAttribute('data-checking-out');
      throw error;
    }

    this.isCheckingOut = false;
    button.removeAttribute('data-checking-out');
  }
}

declare global {
  interface Window {
    sellAuthEmbed: SellAuthEmbed;
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

interface SellAuthButtonProps {
  productId: number;
  variantId: number;
  quantity?: number;
  shopId?: number;
  modal?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function SellAuthButton({
  productId,
  variantId,
  quantity = 1,
  shopId = Number(process.env.NEXT_PUBLIC_SELLAUTH_SHOP_ID),
  modal = Boolean(process.env.NEXT_PUBLIC_SELLAUTH_IS_MODAL),
  className,
  children,
}: SellAuthButtonProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!window.sellAuthEmbed) {
      window.sellAuthEmbed = new SellAuthEmbed();
    }
    window.sellAuthEmbed.setCheckoutUrlHandler((url) => {
      setCheckoutUrl(url);
      setIsDialogOpen(true);
    });
  }, []);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (window.sellAuthEmbed) {
      setIsCheckingOut(true);
      try {
        await window.sellAuthEmbed.checkout(event.currentTarget, {
          cart: [{ productId, variantId, quantity }],
          shopId,
          modal,
        });
      } catch (error: unknown) {
        handleSellAuthError(error, toast);
      } finally {
        setIsCheckingOut(false);
      }
    }
  };

  return (
    <>
      <Button
        className={cn('flex items-center gap-2', className)}
        onClick={handleClick}
        disabled={isCheckingOut}
      >
        {children}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full max-w-3xl p-0">
          <VisuallyHidden>
            <DialogTitle>Checkout</DialogTitle>
          </VisuallyHidden>
          {checkoutUrl && (
            <iframe
              src={checkoutUrl}
              className="w-full h-[700px] border-0"
              title="Checkout"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
} 