"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Clock, Users, DollarSign, Phone, CarFront } from "lucide-react";

export default function TripForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
    price: "",
    departure: "",
    arrival: "",
    departure_date: "",
    departure_time: "10:00", // Default time
    arrival_date: "",
    arrival_time: "14:00",   // Default time
    nb_places: "",
  });

  useEffect(() => {
    // Get the current user from Supabase
    const fetchUserData = async () => {
      const supabase = createClient();
      const { data: { user: supabaseUser } } = await supabase.auth.getUser();
      
      if (supabaseUser) {
        setUser(supabaseUser);
      } else {
        // Redirect if not logged in
        router.push('/sign-in');
      }
    };
    
    fetchUserData();
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Get auth token
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      
      if (!data.session?.access_token) {
        throw new Error('Authentication required');
      }

      // Validate that arrival is after departure
      const departureDateTime = new Date(`${formData.departure_date}T${formData.departure_time}:00`);
      const arrivalDateTime = new Date(`${formData.arrival_date}T${formData.arrival_time}:00`);
      
      if (arrivalDateTime <= departureDateTime) {
        setError("Arrival time must be after departure time");
        setIsLoading(false);
        return;
      }

      // Format for the API
      const departure_datetime = `${formData.departure_date}T${formData.departure_time}:00Z`;
      const arrival_datetime = `${formData.arrival_date}T${formData.arrival_time}:00Z`;
      
      // Create data object matching API expectations
      const apiData = {
        name: formData.name,
        phonenumber: formData.phonenumber,
        price: parseFloat(formData.price),
        departure: formData.departure,
        arrival: formData.arrival,
        departure_date: departure_datetime,
        arrival_date: arrival_datetime,
        nb_places: parseInt(formData.nb_places),
      };

      const response = await fetch("http://localhost:8000/api/create-trajet/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${data.session.access_token}`
        },
        body: JSON.stringify(apiData),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert("Trip added successfully!");
        // Reset form
        setFormData({
          name: "",
          phonenumber: "",
          price: "",
          departure: "",
          arrival: "",
          departure_date: "",
          departure_time: "10:00",
          arrival_date: "",
          arrival_time: "14:00",
          nb_places: "",
        });
        // Navigate to driver dashboard or trips list
        router.push('/espace-driver');
      } else {
        setError(`Error: ${responseData.error || JSON.stringify(responseData)}`);
      }
    } catch (error: any) {
      console.error("Error:", error);
      setError(error.message || "Server connection problem.");
    } finally {
      setIsLoading(false);
    }
  };
  
  
      
  

  return (
    <div className="flex justify-center items-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
      <Card className="w-full max-w-xl shadow-xl border-0 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2" />
        <CardHeader className="space-y-1 pb-6 pt-8">
          <div className="flex items-center justify-center mb-2">
            <CarFront className="h-8 w-8 text-blue-600 mr-2" />
            <CardTitle className="text-2xl font-bold text-center">Create a New Trip</CardTitle>
          </div>
          <CardDescription className="text-center text-muted-foreground">
            Share your journey and make travel more affordable for everyone
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 text-sm border border-red-200">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Trip Name
                </Label>
                <div className="relative">
                  <Input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Name your trip" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="pl-10" 
                    required 
                  />
                  <CarFront className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phonenumber" className="text-sm font-medium">
                    Contact Number
                  </Label>
                  <div className="relative">
                    <Input 
                      type="text" 
                      id="phonenumber" 
                      name="phonenumber" 
                      placeholder="Your phone number" 
                      value={formData.phonenumber} 
                      onChange={handleChange} 
                      className="pl-10" 
                      required 
                      maxLength={8} 
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nb_places" className="text-sm font-medium">
                    Available Seats
                  </Label>
                  <div className="relative">
                    <Input 
                      type="number" 
                      id="nb_places" 
                      name="nb_places" 
                      placeholder="Number of seats" 
                      value={formData.nb_places} 
                      onChange={handleChange} 
                      className="pl-10" 
                      min="1" 
                      required 
                    />
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium text-gray-700">Trip Route</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="departure" className="text-sm font-medium">
                      Departure Location
                    </Label>
                    <div className="relative">
                      <Input 
                        type="text" 
                        id="departure" 
                        name="departure" 
                        placeholder="City or location" 
                        value={formData.departure} 
                        onChange={handleChange} 
                        className="pl-10" 
                        required 
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="arrival" className="text-sm font-medium">
                      Arrival Location
                    </Label>
                    <div className="relative">
                      <Input 
                        type="text" 
                        id="arrival" 
                        name="arrival" 
                        placeholder="City or location" 
                        value={formData.arrival} 
                        onChange={handleChange} 
                        className="pl-10" 
                        required 
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium text-gray-700">Departure Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="departure_date" className="text-sm font-medium">
                      Date
                    </Label>
                    <div className="relative">
                      <Input 
                        type="date" 
                        id="departure_date" 
                        name="departure_date" 
                        value={formData.departure_date} 
                        onChange={handleChange} 
                        className="pl-10" 
                        required 
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departure_time" className="text-sm font-medium">
                      Time
                    </Label>
                    <div className="relative">
                      <Input 
                        type="time" 
                        id="departure_time" 
                        name="departure_time" 
                        value={formData.departure_time} 
                        onChange={handleChange} 
                        className="pl-10" 
                        required 
                      />
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium text-gray-700">Arrival Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="arrival_date" className="text-sm font-medium">
                      Date
                    </Label>
                    <div className="relative">
                      <Input 
                        type="date" 
                        id="arrival_date" 
                        name="arrival_date" 
                        value={formData.arrival_date} 
                        onChange={handleChange} 
                        className="pl-10" 
                        required 
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="arrival_time" className="text-sm font-medium">
                      Time
                    </Label>
                    <div className="relative">
                      <Input 
                        type="time" 
                        id="arrival_time" 
                        name="arrival_time" 
                        value={formData.arrival_time} 
                        onChange={handleChange} 
                        className="pl-10" 
                        required 
                      />
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium">
                  Price per Seat
                </Label>
                <div className="relative">
                  <Input 
                    type="number" 
                    id="price" 
                    name="price" 
                    placeholder="Amount in currency" 
                    value={formData.price} 
                    onChange={handleChange} 
                    className="pl-10" 
                    min="0" 
                    step="0.01" 
                    required 
                  />
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <CardFooter className="px-0 pb-0 pt-4">
              <Button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Trip...
                  </span>
                ) : (
                  "Create Trip"
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}