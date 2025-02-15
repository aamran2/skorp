'use client';

interface SellAuthErrorResponse {
  success: boolean;
  error: string;
  message: string;
}

interface ToastFunction {
  (props: { 
    variant: "default" | "destructive";
    title: string;
    description: string;
  }): void;
}

interface SellAuthError extends Error {
  status?: number;
  data?: SellAuthErrorResponse;
}

export function handleSellAuthError(error: unknown, toast: ToastFunction) {
  const sellAuthError = error as SellAuthError;
  
  if (sellAuthError.status === 422) {
    const errorData = sellAuthError.data as SellAuthErrorResponse;
    toast({
      variant: "destructive",
      title: "Error",
      description: errorData.message,
    });
  } else if (sellAuthError.status === 429) {
    toast({
      variant: "destructive",
      title: "Too Many Requests",
      description: "Please wait a moment before trying again.",
    });
  } else {
    toast({
      variant: "destructive",
      title: "Error",
      description: sellAuthError.message || "An unexpected error occurred. Please try again later.",
    });
  }
  console.error('Checkout error:', error);
} 