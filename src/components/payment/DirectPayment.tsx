// src/components/payment/DirectPayment.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "@/services/paymentService";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface DirectPaymentProps {
  trajetId: number;
  price: number;
  driverName: string;
}

export default function DirectPayment({
  trajetId,
  price,
  driverName,
}: DirectPaymentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      // Get session token
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      
      if (!data.session?.access_token) {
        throw new Error("Authentication required");
      }
      
      // Create payment intent
      const { clientSecret } = await createPaymentIntent(
        trajetId,
        data.session.access_token
      );
      
      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        }
      );
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (paymentIntent.status === "succeeded") {
        router.push("/payment-success");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Payment failed");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pay for Trip</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-xl font-bold">{price.toFixed(2)} TND</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Driver</p>
            <p>{driverName}</p>
          </div>
          
          <div className="p-4 border rounded-md bg-gray-50">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
          
          {errorMessage && (
            <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md">
              {errorMessage}
            </div>
          )}
        </CardContent>
        
        <CardFooter>
          <Button
            type="submit"
            disabled={!stripe || isLoading}
            className="w-full"
          >
            {isLoading ? "Processing..." : "Pay Now"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}