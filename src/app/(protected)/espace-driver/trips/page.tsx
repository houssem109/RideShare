"use client";
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { apiClient } from "@/lib/axios";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import PassengerDialog from "./_components/PassengerDialog";
import { apiVoiture } from "@/lib/constants";

// Updated interface based on your actual API response
interface DriverTrip {
  id: number;
  name: string;
  phonenumber: string;
  price: string; // Changed to string based on your data
  departure: string;
  arrival: string;
  departure_date: string;
  arrival_date: string;
  nb_places: number;
  status: string;
  voiture: number; // Changed from voiture_id
  owner_id: number; // Changed from owner_id_id
  created_at: string;
  voiture_details: {
    car_image_id: string;
    id_voiture: number;
    image: string;
    marque: string;
    matricule: string;
  };
  // We'll compute this since it's not in the API
  booking_count?: number;
}
interface Passenger {
  id: number;
  name: string;
  phonenumber: string;
  status: "pending" | "confirmed" | "rejected";
}
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
  
const Page = () => {
  const [trips, setTrips] = useState<DriverTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 6;
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [tripPassengers, setTripPassengers] = useState<Passenger[]>([]);

  // For the passenger dialog
  const [passengerDialogOpen, setPassengerDialogOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);

  // Open passenger dialog
  const openPassengerDialog = (tripId: number) => {
    setSelectedTripId(tripId);
    setPassengerDialogOpen(true);
  };

  // Fetch driver trips from API with authentication
  useEffect(() => {
    const fetchDriverTrips = async () => {
      try {
        setLoading(true);

        // Get authentication token from Supabase
        const supabase = createClient();
        const { data: authData } = await supabase.auth.getSession();

        if (!authData.session) {
          throw new Error("You must be logged in to view your trips");
        }

        const token = authData.session.access_token;

        // Make authenticated API request
        const { data } = await apiClient.get<DriverTrip[]>("user-trajets/", {
          token,
        });

        console.log("Fetched trips:", data);

        // Add booking_count to each trip - based on seed data
        // In the real app, you would get this from the API
        const tripsWithBookings = data.map((trip) => ({
          ...trip,
          booking_count: Math.floor(Math.random() * trip.nb_places), // Mock data until API provides this
        }));

        setTrips(tripsWithBookings);
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch driver trips:", err);
        setError(
          err.message || "Failed to load your trips. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDriverTrips();
  }, []);

  // Handle trip deletion with authentication
  const handleDeleteTrip = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        // Get authentication token from Supabase
        const supabase = createClient();
        const { data: authData } = await supabase.auth.getSession();

        if (!authData.session) {
          throw new Error("You must be logged in to delete trips");
        }

        const token = authData.session.access_token;

        // Call the delete API endpoint with authentication
        await apiClient.delete(`user-trajets/${id}/`, {
        token}
        );

        // Remove trip from state after successful deletion
        setTrips(trips.filter((trip) => trip.id !== id));

        // Show success alert
        alert("Trip deleted successfully");
      } catch (err: any) {
        console.error("Failed to delete trip:", err);

        // Show more specific error message if available
        if (err.response && err.response.data && err.response.data.error) {
          alert(`Error: ${err.response.data.error}`);
        } else {
          alert("Failed to delete trip. Please try again.");
        }
      }
    }
  };

  // Filter trips based on status
  const filteredTrips =
    statusFilter === "all"
      ? trips
      : trips.filter((trip) => trip.status === statusFilter);

  // Calculate pagination
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip);
  const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);

  // Format date to time (e.g., "8:30 AM")
  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      return "Invalid time";
    }
  };

  // Format date to display date (e.g., "Apr 15, 2023")
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  // Get appropriate status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col p-4 md:p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Trips</h1>
        <Link href="/espace-driver/add-trajectory">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-2" />
            Create New Trip
          </Button>
        </Link>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex mb-6 border-b">
        <button
          className={`px-4 py-2 font-medium ${
            statusFilter === "all"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-600 hover:text-indigo-600"
          }`}
          onClick={() => setStatusFilter("all")}
        >
          All Trips
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            statusFilter === "active"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-600 hover:text-indigo-600"
          }`}
          onClick={() => setStatusFilter("active")}
        >
          Active
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            statusFilter === "completed"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-600 hover:text-indigo-600"
          }`}
          onClick={() => setStatusFilter("completed")}
        >
          Completed
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            statusFilter === "cancelled"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-600 hover:text-indigo-600"
          }`}
          onClick={() => setStatusFilter("cancelled")}
        >
          Cancelled
        </button>
      </div>

      {/* Loading, Error and Empty States */}
      {loading ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading your trips...</p>
          </CardContent>
        </Card>
      ) : error ? (
        <Card>
          <CardContent className="p-8 text-center text-red-500">
            <p>{error}</p>
          </CardContent>
        </Card>
      ) : currentTrips.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            <p>No trips found. Create a new trip to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Trip Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTrips.map((trip) => (
              <Card key={trip.id} className="overflow-hidden">
                <div className="relative">
                  {/* Use the car image from API if available */}
                  <Image
                    src={ "/opel.jpg"}
                    alt={`Trip from ${trip.departure} to ${trip.arrival}`}
                    className="w-full h-48 object-cover"
                    width={400}
                    height={250}
                  />
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(trip.status)}
                  </div>
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {trip.departure} → {trip.arrival}
                      </CardTitle>
                      <CardDescription>
                        <span className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3 mr-1" />{" "}
                          {formatTime(trip.departure_date)}
                        </span>
                        <span className="block text-xs text-gray-500 mt-1">
                          {formatDate(trip.departure_date)}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="text-lg font-semibold">{trip.price} DT</div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {trip.booking_count || 0}/{trip.nb_places} seats booked
                      </span>
                    </div>
                    {trip.voiture_details && (
                      <div className="text-sm text-gray-600">
                        {trip.voiture_details.marque}{" "}
                        {trip.voiture_details.matricule}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <Button
                    variant="outline"
                    className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                    onClick={() => openPassengerDialog(trip.id)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Passengers
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="p-2 h-9 w-9" asChild>
                      <Link href={`/espace-driver/edit-trajectory/${trip.id}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="p-2 h-9 w-9 border-red-200 text-red-500 hover:bg-red-50"
                      onClick={() => handleDeleteTrip(trip.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* Passenger Dialog */}
          {selectedTripId && (
           <PassengerDialog
            isOpen={passengerDialogOpen}
    onClose={() => setPassengerDialogOpen(false)}
    tripId={selectedTripId}
         />
          )}
        </>
      )}
    </div>
  );
};

export default Page;
