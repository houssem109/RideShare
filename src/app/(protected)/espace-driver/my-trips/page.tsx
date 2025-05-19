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
import { formatDate, formatTime, getImageUrl } from "@/utils/helpers";
import Pagination from "./_components/Pagination";
import StatusFilterTabs from "./_components/StatusFilterTabs";
import TripGrid from "./_components/TripGrid";
import { DriverTrip } from "@/types/Driver";
import EmptyState from "./_components/EmptyState";
import ErrorState from "./_components/ErrorState";
import LoadingState from "./_components/LoadingState";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Page = () => {
  const [trips, setTrips] = useState<DriverTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [passengerDialogOpen, setPassengerDialogOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const tripsPerPage = 6;

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
        const tripsWithBookings = data.map((trip) => ({
          ...trip,
          booking_count: trip.nb_places - (trip.available_seats ?? 0), // Mock data until API provides this
        }));

        setTrips(tripsWithBookings);
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch driver trips:", err);
        setError(
          err.message || "Failed to load your trips. Please try again later."
        );
        toast.error("Error loading trips", {
          description: err.message || "Failed to load your trips. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDriverTrips();
  }, []);

  // Open delete confirmation dialog
  const confirmDeleteTrip = (id: number) => {
    setTripToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Handle trip deletion with authentication
  const handleDeleteTrip = async () => {
    if (!tripToDelete) return;
    
    try {
      setDeleteLoading(true);
      
      // Get authentication token from Supabase
      const supabase = createClient();
      const { data: authData } = await supabase.auth.getSession();

      if (!authData.session) {
        throw new Error("You must be logged in to delete trips");
      }

      const token = authData.session.access_token;

      // Call the delete API endpoint with authentication
      await apiClient.delete(`delete-trajet/${tripToDelete}/`, {
        token,
      });

      // Remove trip from state after successful deletion
      setTrips(trips.filter((trip) => trip.id !== tripToDelete));

      // Show success toast
      toast.success("Trip deleted", {
        description: "Your trip has been successfully deleted.",
      });
    } catch (err: any) {
      console.error("Failed to delete trip:", err);

      // Show error toast with specific message if available
      toast.error("Failed to delete trip", {
        description: err.response?.data?.error || "Please try again later.",
      });
      
    
    } finally {
      setDeleteLoading(false);
      setDeleteDialogOpen(false);
      setTripToDelete(null);
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

  return (
    <div className="flex flex-col p-4 md:p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Trips</h1>
        <Link href="/espace-driver/add-trip">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-2" />
            Create New Trip
          </Button>
        </Link>
      </div>

      {/* Status Filter Tabs */}
      <StatusFilterTabs 
        statusFilter={statusFilter} 
        setStatusFilter={setStatusFilter} 
      />

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
          <TripGrid 
            trips={currentTrips} 
            onDeleteTrip={confirmDeleteTrip} 
            onViewPassengers={openPassengerDialog} 
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {/* Passenger Dialog */}
          {selectedTripId && (
            <PassengerDialog
              isOpen={passengerDialogOpen}
              onClose={() => setPassengerDialogOpen(false)}
              tripId={selectedTripId}
            />
          )}
          
          {/* Delete Confirmation Dialog */}
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Trip</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this trip? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={deleteLoading}>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteTrip} 
                  disabled={deleteLoading}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
};

export default Page;