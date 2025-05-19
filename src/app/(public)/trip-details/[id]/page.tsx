"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/axios";
import { createClient } from "@/utils/supabase/client";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TrajetDetail } from "@/types/TrajetDetail";
import { DriverInfo } from "./_components/DriverInfo";
import { EmptyState } from "./_components/EmptyState";
import { ErrorState } from "./_components/ErrorState";
import { LoadingState } from "./_components/LoadingState";
import { TripBanner } from "./_components/TripBanner";
import { TripFooter } from "./_components/TripFooter";
import { TripHeader } from "./_components/TripHeader";
import { TripSchedule } from "./_components/TripSchedule";
import { TripStatus } from "./_components/TripStatus";
import { VehicleInfo } from "./_components/VehicleInfo";


export default function TripDetailsPage() {
  const params = useParams();
  const trajetId = params?.id;
  
  const [trajet, setTrajet] = useState<TrajetDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  
  // Fetch trip details
  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        setLoading(true);
        
        // Get authentication token
        const supabase = createClient();
        const { data } = await supabase.auth.getSession();
        const accessToken = data.session?.access_token || null;
        setToken(accessToken);
        
        // Fetch trip details
        const response = await apiClient.get(`trajets/${trajetId}`, {
          token: accessToken
        });
        
        setTrajet(response.data);
      } catch (err: any) {
        console.error("Error fetching trip details:", err);
        setError(err.message || "Failed to load trip details");
      } finally {
        setLoading(false);
      }
    };
    
    if (trajetId) {
      fetchTripDetails();
    }
  }, [trajetId]);
  
  // Book trip function
  const handleBookTrip = async () => {
    // Redirect to payment page
    window.location.href = `/espace-client/reservation-form/${trajetId}`;
  };
  
  // Share trip function
  const handleShareTrip = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Trip from ${trajet?.departure} to ${trajet?.arrival}`,
          text: `Check out this trip from ${trajet?.departure} to ${trajet?.arrival}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };
  
  // Handle back button click
  const handleBackClick = () => {
    window.history.back();
  };
  
  if (loading) {
    return <LoadingState />;
  }
  
  if (error) {
    return <ErrorState message={error} onBack={handleBackClick} />;
  }
  
  if (!trajet) {
    return <EmptyState onBack={handleBackClick} />;
  }
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <TripHeader onBack={handleBackClick} />
      
      {/* Main Trip Card */}
      <Card className="mb-6 overflow-hidden">
        {/* Trip Banner */}
        <TripBanner 
          departure={trajet.departure}
          arrival={trajet.arrival}
          price={trajet.price}
        />
        
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Trip Details */}
            <div className="space-y-4">
              <TripSchedule 
                departureDate={trajet.departure_date}
                arrivalDate={trajet.arrival_date}
              />
              
              <Separator />
              
              <DriverInfo 
                name={trajet.name}
                phone={trajet.phonenumber}
              />
              
              <Separator />
              
              <TripStatus 
                status={trajet.status}
                availableSeats={trajet.nb_places}
              />
            </div>
            
            {/* Right Column - Car Information */}
            <VehicleInfo carDetails={trajet.car_details} />
          </div>
        </CardContent>
        
        <CardFooter>
          <TripFooter 
            availableSeats={trajet.nb_places}
            status={trajet.status}
            onShare={handleShareTrip}
            onBook={handleBookTrip}
          />
        </CardFooter>
      </Card>
    </div>
  );
}