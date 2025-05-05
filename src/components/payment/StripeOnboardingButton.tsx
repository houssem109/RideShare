// src/components/payment/StripeOnboardingButton.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { initiateStripeOnboarding } from "@/services/paymentService";
import { createClient } from "@/utils/supabase/client";

export default function StripeOnboardingButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSetupPayments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get current user session
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      
      if (!data.session?.access_token) {
        throw new Error("Authentication required");
      }
      
      // Get user email
      const { data: userData } = await supabase.auth.getUser();
      const email = userData.user?.email;
      
      if (!email) {
        throw new Error("User email not found");
      }
      
      console.log("Starting Stripe onboarding with email:", email);
      
      // Start onboarding process
      const result = await initiateStripeOnboarding(
        email,
        data.session.access_token
      );
      
      console.log("Onboarding result:", result);
      
      if (result.url) {
        // Redirect to Stripe Connect onboarding
        window.location.href = result.url;
      } else {
        throw new Error("No onboarding URL returned");
      }
      
    } catch (err: any) {
      console.error("Onboarding error:", err);
      let errorMessage = err.message || "Failed to start payment setup";
      
      // Check for specific error data
      if (err.data && err.data.error) {
        errorMessage = err.data.error;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <Button
        onClick={handleSetupPayments}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Setting up..." : "Set Up Payment Account"}
      </Button>
      
      {error && (
        <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}