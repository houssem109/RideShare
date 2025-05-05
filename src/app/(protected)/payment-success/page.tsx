// src/app/(protected)/payment-success/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Optional: Add any post-payment tracking here
  }, []);
  
  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-gray-600">
            Your payment has been processed successfully. The driver has been notified.
          </p>
          
          <div className="flex flex-col space-y-2">
            <Button
              onClick={() => router.push("/trips")}
              className="w-full"
            >
              Browse More Trips
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="w-full"
            >
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}