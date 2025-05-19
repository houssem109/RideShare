"use client";
import React, { useState, useEffect } from "react";
import { apiClient } from "@/lib/axios";
import { Trip } from "@/types/Trip";
import { EmptyState } from "./_components/EmptyState";
import { LoadingState } from "./_components/LoadingState";
import { Pagination } from "./_components/Pagination";
import { SearchFilters } from "./_components/SearchFilters";
import { TripCard } from "./_components/TripCard";
import { ErrorState } from "./_components/ErrorState";


const TripsPage: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [allTrips, setAllTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 6;

  // Fetch trips from API
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get<Trip[]>("available-trajets/");
        console.log("Fetched trips:", data);
        
        setTrips(data);
        setAllTrips(data);
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

  // Handle search
  const handleSearch = (from: string, to: string) => {
    setSearchLoading(true);

    // Simulate a delay of 1 second
    setTimeout(() => {
      // If both search fields are empty, reset to show all trips
      if (!from.trim() && !to.trim()) {
        setTrips(allTrips);
      } else {
        // Filter trips based on from and to locations
        const filtered = allTrips.filter(
          (trip) =>
            trip.departure.toLowerCase().includes(from.toLowerCase()) &&
            trip.arrival.toLowerCase().includes(to.toLowerCase())
        );
        setTrips(filtered);
      }

      setCurrentPage(1); // Reset to first page after search
      setSearchLoading(false);
    }, 1000);
  };

  // Calculate pagination
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = trips.slice(indexOfFirstTrip, indexOfLastTrip);
  const totalPages = Math.ceil(trips.length / tripsPerPage);

  return (
    <div className="flex flex-col p-4 md:p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">
        All Available Trips
      </h1>

      {/* Search Filters */}
      <SearchFilters onSearch={handleSearch} isLoading={searchLoading} />

      {/* Loading, Error and Empty States */}
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : currentTrips.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Trip Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default TripsPage;