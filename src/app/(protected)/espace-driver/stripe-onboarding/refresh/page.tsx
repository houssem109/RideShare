// src/app/(protected)/espace-driver/stripe-onboarding/refresh/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function OnboardingRefreshPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Generate a new onboarding link and redirect
    const refreshOnboarding = async () => {
      try {
        // Small delay to prevent immediate redirect loop
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Redirect back to the main onboarding page
        // This will generate a new link with the existing account
        router.push("/espace-driver/stripe-onboarding");
      } catch (error) {
        console.error("Error refreshing onboarding:", error);
      }
    };
    
    refreshOnboarding();
  }, [router]);
  
  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Refreshing Your Session</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Loader2 className="h-10 w-10 text-indigo-600 animate-spin mb-4" />
          <p className="text-center text-gray-600">
            Please wait while we refresh your payment setup session...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}