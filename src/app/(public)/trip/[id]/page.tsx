// src/app/trip/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/axios";
import { createClient } from "@/utils/supabase/client";
import { MapPin, Calendar, Clock, User, CreditCard, Car, Phone, Flag, CheckSquare, Share2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface TrajetDetail {
  id: number;
  name: string;
  phonenumber: string;
  price: number;
  departure: string;
  arrival: string;
  departure_date: string;
  arrival_date: string;
  nb_places: number;
  created_at: string;
  status: "active" | "inactive" | "completed";
  car_details: {
    id: number;
    marque: string;
    matricule: string;
    image: string | null;
    car_image_id: string | null;
  } | null;
  owner_details: {
    id: number;
    user_id: string;
    car: {
      id: number;
      marque: string;
      matricule: string;
      image: string | null;
      car_image_id: string | null;
    } | null;
  } | null;
}

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
  
  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };
  
  // Format time
  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } catch {
      return "";
    }
  };
  
  // Function to build the correct image URL
  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) return null;
    
    // If the image path already includes http, use it as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Remove any leading slash if present
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    
    // Check if the path already includes 'voitures/'
    if (cleanPath.startsWith('voitures/')) {
      return `http://localhost:8000/${cleanPath}`;
    }
    
    // Otherwise, assume it's a direct filename in the voitures directory
    return `http://localhost:8000/voitures/${cleanPath}`;
  };
  
  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Book trip function
  const handleBookTrip = async () => {
    // Redirect to payment page
    window.location.href = `/payment/${trajetId}`;
  };
  
  // Share trip function
  const handleShareTrip = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Trip from ${trajet?.departure} to ${trajet?.arrival}`,
          text: `Check out this trip from ${trajet?.departure} to ${trajet?.arrival} on ${formatDate(trajet?.departure_date || "")}`,
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
  
  if (loading) {
    return (
      <div className="container mx-auto p-4 h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading trip details...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Card className="border-red-200">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">{error}</p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  if (!trajet) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Trip Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">The trip you're looking for doesn't exist or has been removed.</p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <Button variant="outline" size="sm" onClick={() => window.history.back()} className="mb-4">
          &larr; Back
        </Button>
        <h1 className="text-3xl font-bold text-[#652CB3]">Trip Details</h1>
        <p className="text-muted-foreground">View complete information about this trip</p>
      </div>
      
      {/* Main Trip Card */}
      <Card className="mb-6 overflow-hidden">
        {/* Trip Banner */}
        <div className="relative h-40 bg-gradient-to-r from-[#652CB3] to-[#8058C4]">
          <div className="absolute inset-0 flex items-center justify-between px-6">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-1">{trajet.departure}</h2>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Starting point</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-px bg-white/50 my-2"></div>
              <div className="px-4 py-1 bg-white rounded-full text-[#652CB3] font-bold text-lg">
                {typeof trajet.price === 'number' 
                  ? trajet.price.toFixed(2) 
                  : parseFloat(trajet.price).toFixed(2)} TND
              </div>
            </div>
            
            <div className="text-white text-right">
              <h2 className="text-2xl font-bold mb-1">{trajet.arrival}</h2>
              <div className="flex items-center gap-2 justify-end">
                <span>Destination</span>
                <Flag className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Trip Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#652CB3]" />
                  Trip Schedule
                </h3>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Departure:</span>
                    <span className="font-medium">
                      {formatDate(trajet.departure_date)} at {formatTime(trajet.departure_date)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Arrival:</span>
                    <span className="font-medium">
                      {formatDate(trajet.arrival_date)} at {formatTime(trajet.arrival_date)}
                    </span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5 text-[#652CB3]" />
                  Driver Information
                </h3>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{trajet.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">{trajet.phonenumber}</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-[#652CB3]" />
                  Trip Status
                </h3>
                <div className="mt-3">
                  <Badge 
                    className={getStatusColor(trajet.status)}
                    variant="outline"
                  >
                    {trajet.status.charAt(0).toUpperCase() + trajet.status.slice(1)}
                  </Badge>
                  <div className="mt-2">
                    <span className="text-muted-foreground">Available seats:</span>
                    <span className="font-medium ml-2">{trajet.nb_places}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Car Information */}
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Car className="h-5 w-5 text-[#652CB3]" />
                Vehicle Information
              </h3>
              
              {trajet.car_details ? (
                <div className="space-y-4">
                  {/* Car Image */}
                  <div className="aspect-video relative rounded-lg overflow-hidden border bg-muted">
                    {trajet.car_details.image ? (
                      <div className="w-full h-full">
                        <img
                         src={getImageUrl(trajet.car_details.image) || ''}
                          alt={trajet.car_details.marque}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Car className="h-16 w-16 text-muted-foreground opacity-50" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Brand:</span>
                      <span className="font-medium">{trajet.car_details.marque}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">License plate:</span>
                      <span className="font-medium">{trajet.car_details.matricule}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-lg border border-dashed text-center text-muted-foreground">
                  No vehicle information available
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-4 pb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShareTrip}
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          
          {trajet.nb_places > 0 && trajet.status === "active" ? (
            <Button 
              onClick={handleBookTrip}
              className="flex items-center gap-2 bg-[#652CB3] hover:bg-[#8058C4]"
            >
              <CreditCard className="h-4 w-4" />
              Book this trip
            </Button>
          ) : (
            <Button 
              disabled
              className="flex items-center gap-2"
            >
              {trajet.status === "completed" ? "Trip completed" : "No seats available"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}