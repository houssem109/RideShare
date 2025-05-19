"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ChevronRight, Home, Search } from "lucide-react";

export default function ReservationSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  
  // Auto-redirect after countdown
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/espace-client/reservation-history');
    }, countdown * 1000);
    
    const interval = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [router]);

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-[80vh]">
      <Card className="max-w-md w-full border-0 shadow-lg overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-600"></div>
        
        <CardHeader className="text-center pt-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Reservation Confirmed!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
         {/*  <p className="text-gray-600">
            Your reservation has been successfully recorded. You&apos;ll receive a confirmation email shortly.
          </p>
           */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="font-medium text-gray-800">
              What&apos;s next?
            </p>
            <p className="text-sm text-gray-600 mt-1">
              You can view your reservation details in your client dashboard.
            </p>
          </div>
          
          <div className="text-sm text-gray-500">
            Automatic redirect in {countdown} seconds...
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3 pb-8">
          <Button 
            onClick={() => router.push('/espace-client/reservation-history')}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <Home className="mr-2 h-4 w-4" />
            Go to reservation history
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => router.push('/available-rides')}
            className="w-full"
          >
            <Search className="mr-2 h-4 w-4" />
            Find More Trips
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}