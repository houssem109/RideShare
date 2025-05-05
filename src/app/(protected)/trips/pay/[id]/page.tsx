// src/app/(protected)/trips/pay/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PaymentWrapper from "@/components/payment/PaymentWrapper";
import { apiClient } from "@/lib/axios";
import { createClient } from "@/utils/supabase/client";

export default function PayTripPage() {
  const { id } = useParams();
  const router = useRouter();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true);
        
        // Get current user session
        const supabase = createClient();
        const { data } = await supabase.auth.getSession();
        
        if (!data.session?.access_token) {
          router.push(`/sign-in?redirect=/trips/pay/${id}`);
          return;
        }
        
        // Fetch trip details
        const { data: tripData } = await apiClient.get(`trajets/${id}/`, {
          token: data.session.access_token,
        });
        
        setTrip(tripData);
        
      } catch (err: any) {
        setError(err.message || "Failed to load trip details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrip();
  }, [id, router]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (error || !trip) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p>{error || "Trip not found"}</p>
          <button
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={() => router.push("/trips")}
          >
            Back to Trips
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 max-w-lg pt-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Payment for Trip</h1>
        <p className="text-gray-600">
          {trip.departure} → {trip.arrival} | {new Date(trip.departure_date).toLocaleString()}
        </p>
      </div>
      
      <PaymentWrapper
        trajetId={parseInt(id as string)}
        price={parseFloat(trip.price)}
        driverName={trip.name}
      />
    </div>
  );
}