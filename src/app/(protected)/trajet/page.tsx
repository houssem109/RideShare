"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/global/submit-button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

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

      console.log("Sending data to API:", apiData);

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
    <div className="flex justify-center items-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 flex flex-col items-center pb-8">
          <CardTitle className="text-2xl font-bold text-center">Add a Trip</CardTitle>
          <CardDescription className="text-center">
            Fill in the information to add a new trip.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}
          
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Trip Name</Label>
              <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phonenumber">Phone Number</Label>
              <Input type="text" id="phonenumber" name="phonenumber" value={formData.phonenumber} onChange={handleChange} required maxLength={8} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="departure">Departure Location</Label>
              <Input type="text" id="departure" name="departure" value={formData.departure} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrival">Arrival Location</Label>
              <Input type="text" id="arrival" name="arrival" value={formData.arrival} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="departure_date">Departure Date</Label>
                <Input type="date" id="departure_date" name="departure_date" value={formData.departure_date} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="departure_time">Departure Time</Label>
                <Input type="time" id="departure_time" name="departure_time" value={formData.departure_time} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="arrival_date">Arrival Date</Label>
                <Input type="date" id="arrival_date" name="arrival_date" value={formData.arrival_date} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arrival_time">Arrival Time</Label>
                <Input type="time" id="arrival_time" name="arrival_time" value={formData.arrival_time} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nb_places">Available Seats</Label>
              <Input type="number" id="nb_places" name="nb_places" value={formData.nb_places} onChange={handleChange} min="1" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input type="number" id="price" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" required />
            </div>

            <SubmitButton 
  pendingText="Adding..." 
  className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
  // Remove the isPending prop
>
  Add Trip
</SubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}