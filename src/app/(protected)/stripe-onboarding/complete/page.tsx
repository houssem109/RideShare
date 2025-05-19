
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function OnboardingCompletePage() {
  const router = useRouter();
  
  useEffect(() => {
    // This could trigger a refresh of the account status in the background
  }, []);
  
  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Account Setup Completed</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-gray-600">
            Thank you for setting up your payment account. Your account information has been submitted 
            and is now being verified. This process typically takes 1-2 business days.
          </p>
          <Button onClick={() => router.push("/espace-driver")}>
            Return to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}