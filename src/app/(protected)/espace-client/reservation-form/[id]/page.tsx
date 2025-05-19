"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReservationForm from '@/components/reservation/ReservationForm';
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent } from "@/components/ui/card";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from '@/components/ui/skeleton';

export default function ReservationPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Debug log to check the ID value
  useEffect(() => {
    console.log('Reservation page loaded with trip ID:', id);
  }, [id]);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Check authentication
        const supabase = createClient();
        const { data } = await supabase.auth.getSession();
        
        if (!data.session) {
          // Redirect to login if not authenticated
          window.location.href = `/sign-in?redirect=/espace-client/reservation/${id}`;
          return;
        }
        
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Auth check error:", err);
        setError("An error occurred while checking authentication. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [id]);
  
  // Handle going back
  const handleGoBack = () => {
    window.history.back();
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto max-w-md p-4 mt-8">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-20 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (error || !isAuthenticated) {
    return (
      <div className="container mx-auto max-w-md p-4 mt-8">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-red-500 mb-4">
              {error || "You need to be logged in to make a reservation."}
            </div>
            <Button variant="outline" onClick={handleGoBack}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 mt-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={handleGoBack}
          className="text-gray-600 flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
      </div>
      
      {/* Make sure id exists and is properly passed as a number */}
      {id ? (
        <ReservationForm trajetId={Number(id)} />
      ) : (
        <div className="p-6 text-center bg-red-50 rounded-lg border border-red-100">
          <p className="text-red-600">Error: Trip ID is missing. Please return to the trips page and try again.</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/trajectory'}
            className="mt-4"
          >
            Return to Trips
          </Button>
        </div>
      )}
    </div>
  );
}