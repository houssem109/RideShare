"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Phone,
  CarFront,
  PenTool,
} from "lucide-react";

export default function EditTrip() {
  const router = useRouter();
  const { id } = useParams(); // get ID from URL
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    const fetchTrip = async () => {
      const supabase = createClient();
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session?.access_token) {
        console.error("No access token found");
        setError("Authentication required");
        return;
      }

      try {
        const res = await fetch(`http://localhost:8000/api/trajet/${id}/`, {
          headers: {
            "Authorization": `Bearer ${sessionData.session.access_token}`,
            "Content-Type": "application/json"
          },
        });

        if (!res.ok) {
          throw new Error("Unauthorized or not found");
        }
        
        const data = await res.json();
  
        setFormData({
          name: data.name,
          phonenumber: data.phonenumber,
          price: data.price.toString(),
          departure: data.departure,
          arrival: data.arrival,
          departure_date: data.departure_date.split("T")[0],
          departure_time: data.departure_date.split("T")[1].slice(0, 5),
          arrival_date: data.arrival_date.split("T")[0],
          arrival_time: data.arrival_date.split("T")[1].slice(0, 5),
          nb_places: data.nb_places.toString(),
        });
      } catch (err) {
        console.error("Error fetching trip:", err);
        setError("Failed to load trip data");
      }
    };

    fetchTrip();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();

      if (!data.session?.access_token) {
        throw new Error("Authentication required");
      }

      // Validate that arrival is after departure
      const departureDateTime = new Date(
        `${formData.departure_date}T${formData.departure_time}:00`
      );
      const arrivalDateTime = new Date(
        `${formData.arrival_date}T${formData.arrival_time}:00`
      );

      if (arrivalDateTime <= departureDateTime) {
        setError("Arrival time must be after departure time");
        setIsLoading(false);
        return;
      }

      const departure_datetime = `${formData.departure_date}T${formData.departure_time}:00Z`;
      const arrival_datetime = `${formData.arrival_date}T${formData.arrival_time}:00Z`;

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

      const response = await fetch(`http://localhost:8000/api/trajet/update/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${data.session.access_token}`,
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        alert("Trip updated successfully!");
        router.push("/espace-driver/my-trips");
      } else {
        const resData = await response.json();
        setError(resData.error || "Update failed");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
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
            <PenTool className="h-8 w-8 text-blue-600 mr-2" />
            <CardTitle className="text-2xl font-bold text-center">
              Update Your Trip
            </CardTitle>
          </div>
          <CardDescription className="text-center text-muted-foreground">
            Modify your journey details for travelers
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 text-sm border border-red-200">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleUpdate}>
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
                <h3 className="text-base font-medium text-gray-700">
                  Trip Route
                </h3>
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
                <h3 className="text-base font-medium text-gray-700">
                  Departure Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="departure_date"
                      className="text-sm font-medium"
                    >
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
                    <Label
                      htmlFor="departure_time"
                      className="text-sm font-medium"
                    >
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
                <h3 className="text-base font-medium text-gray-700">
                  Arrival Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="arrival_date"
                      className="text-sm font-medium"
                    >
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
                    <Label
                      htmlFor="arrival_time"
                      className="text-sm font-medium"
                    >
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
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-md transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating Trip...
                  </span>
                ) : (
                  "Update Trip"
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}