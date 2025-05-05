// src/app/(protected)/espace-driver/stripe-onboarding/page.tsx

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StripeOnboardingButton from "@/components/payment/StripeOnboardingButton";
import { checkStripeAccountStatus } from "@/services/paymentService";
import { createClient } from "@/utils/supabase/client";
import { Shield, AlertCircle, CheckCircle } from "lucide-react";

export default function StripeOnboardingPage() {
  const [accountStatus, setAccountStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const checkStatus = async () => {
      try {
        setLoading(true);
        
        const supabase = createClient();
        const { data } = await supabase.auth.getSession();
        
        if (!data.session?.access_token) {
          throw new Error("Authentication required");
        }
        
        const status = await checkStripeAccountStatus(data.session.access_token);
        setAccountStatus(status);
        
      } catch (err: any) {
        setError(err.message || "Failed to check account status");
      } finally {
        setLoading(false);
      }
    };
    
    checkStatus();
  }, []);
  
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-indigo-600" />
          </div>
          <CardTitle className="text-2xl">Payment Account Setup</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="p-4 flex items-center bg-red-50 text-red-600 rounded-md mb-4">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          ) : !accountStatus?.has_account ? (
            <div className="space-y-6">
              <p className="text-center text-gray-600">
                To receive payments from passengers, you need to set up your payment account.
                This is a one-time process that takes just a few minutes.
              </p>
              <StripeOnboardingButton />
            </div>
          ) : accountStatus.is_verified ? (
            <div className="p-4 flex items-center bg-green-50 text-green-600 rounded-md">
              <CheckCircle className="h-5 w-5 mr-2" />
              Your payment account is verified and ready to receive payments!
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 flex items-center bg-yellow-50 text-yellow-600 rounded-md">
                <AlertCircle className="h-5 w-5 mr-2" />
                Your payment account is pending verification. This process typically takes 1-2 business days.
              </div>
              
              <p className="text-center text-gray-600">
                Need to complete your account setup? Click the button below to continue.
              </p>
              
              <StripeOnboardingButton />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}