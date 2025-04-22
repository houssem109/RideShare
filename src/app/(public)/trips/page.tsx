"use client";
import React, { useState, useEffect } from "react";
import { MapPin, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { apiClient } from "@/lib/axios"; // Adjust the import based on your axios setup

// Define interface based on your database schema
interface Trip {
  id: number;
  name: string; // Driver's name
  phonenumber: string;
  price: number;
  departure: string; // From location
  arrival: string; // To location
  departure_date: string;
  arrival_date: string;
  nb_places: number; // Available seats
  status: string;
  voiture_id: number;
  owner_id_id: number;
  // Add any additional fields you need
  rating?: number; // Optional field not in your DB schema
}

const Page = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [allTrips, setAllTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 6;

  // Fetch trips from API
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get<Trip[]>("available-trajets/");
        console.log("Fetched trips:", data);
        // Add rating field to each trip (since it's not in your DB schema)
        const tripsWithRating = data.map((trip: any) => ({
          ...trip,
          rating: Math.floor(Math.random() * 3) + 3, // Random rating between 3-5
        }));
    
        setTrips(tripsWithRating);
        setAllTrips(tripsWithRating); // Add this line to set allTrips
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch trips:", err);
        setError(
          err.message || "Failed to load trips. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Handle search button click
  const handleSearch = () => {
    setSearchLoading(true);
  
    // Simulate a delay of 1 second
    setTimeout(() => {
      // If both search fields are empty, reset to show all trips
      if (!fromFilter.trim() && !toFilter.trim()) {
        setTrips(allTrips);
      } else {
        // Filter trips based on from and to locations
        const filtered = allTrips.filter(
          (trip) =>
            trip.departure.toLowerCase().includes(fromFilter.toLowerCase()) &&
            trip.arrival.toLowerCase().includes(toFilter.toLowerCase())
        );
        setTrips(filtered);
      }
      
      setCurrentPage(1); // Reset to first page after search
      setSearchLoading(false);
    }, 1000);
  };
  // Filtered trips for display
  const filteredTrips = trips;

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

  // Function to render stars based on rating
  const renderRating = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col p-4 md:p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">
        All Available Trips
      </h1>

      {/* Search Filters */}
      <Card className="mb-8 shadow-lg border-0 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 p-5">
          <h2 className="text-xl font-bold text-white mb-1">
            Find Your Perfect Ride
          </h2>
          <p className="text-indigo-100 text-sm">
            Enter your departure and destination to find available rides
          </p>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-indigo-600" />
                </div>
                <Label htmlFor="from" className="font-medium">
                  From
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="from"
                  className="pl-4 py-6 rounded-xl border-indigo-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm"
                  placeholder="Enter departure location"
                  value={fromFilter}
                  onChange={(e) => setFromFilter(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-indigo-600" />
                </div>
                <Label htmlFor="to" className="font-medium">
                  To
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="to"
                  className="pl-4 py-6 rounded-xl border-indigo-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm"
                  placeholder="Enter destination location"
                  value={toFilter}
                  onChange={(e) => setToFilter(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-xl text-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={handleSearch}
              disabled={searchLoading}
            >
              {searchLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Searching...
                </div>
              ) : (
                "Search Rides"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading, Error and Empty States */}
      {loading ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading available trips...</p>
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
            <p>No matching trips found. Try adjusting your search criteria.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Trip Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTrips.map((trip) => (
              <Card key={trip.id} className="overflow-hidden">
                <div className="relative">
                  <Image
                    src={"/opel.jpg"}
                    alt={`Trip from ${trip.departure} to ${trip.arrival}`}
                    className="w-full object-cover"
                    width={400}
                    height={250}
                  />
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {trip.departure} → {trip.arrival}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />{" "}
                        {formatTime(trip.departure_date)}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-medium">
                      {trip.name.charAt(0)}
                    </div>
                    <span className="font-medium">{trip.name}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {trip.nb_places} seats
                      </span>
                    </div>
                    {renderRating(trip.rating || 4)}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div className="text-lg font-semibold">
                    À Partir {trip.price} DT
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    Book
                  </Button>
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
        </>
      )}
    </div>
  );
};

export default Page;
