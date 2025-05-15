// src/components/driver/ReservationManagement.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Phone, User, ExternalLink } from "lucide-react";
import { apiClient } from "@/lib/axios";
import { Skeleton } from "@/components/ui/skeleton";

interface Reservation {
  id: string;
  passenger: {
    id: string;
    name: string;
    phone: string;
  };
  trip: {
    id: number;
    departure: string;
    arrival: string;
    departure_date: string;
    status: string;
  };
  status: string;
  payment_method: string;
  payment_status: string | null;
  created_at: string;
}

interface ReservationManagementProps {
  tripId?: number;
  showAll?: boolean;
  limit?: number;
  onStatusChange?: () => void;
}

export default function ReservationManagement({
  tripId,
  showAll = true,
  limit = 5,
  onStatusChange
}: ReservationManagementProps) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchReservations();
  }, [tripId]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Authentication required");
      }

      const { data } = await apiClient.get("driver-reservations/", {
        token: session.access_token,
        params: tripId ? { trip_id: tripId } : undefined
      });

      // Sort reservations by created_at, most recent first
      const sortedReservations = data
        .sort((a: Reservation, b: Reservation) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .slice(0, showAll ? undefined : limit);

      setReservations(sortedReservations);
    } catch (err: any) {
      console.error("Error fetching reservations:", err);
      setError(err.message || "Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (reservationId: string, status: 'accepted' | 'rejected') => {
    try {
      setUpdating(reservationId);
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Authentication required");
      }

      const response = await apiClient.post("update-status/", {
        body: {
          reservation_id: reservationId,
          status: status
        },
        token: session.access_token
      });

      // Update the local state
      setReservations(reservations.map(res => 
        res.id === reservationId ? { ...res, status } : res
      ));

      // Notify parent component about the change
      if (onStatusChange) {
        onStatusChange();
      }

    } catch (err: any) {
      console.error("Error updating reservation status:", err);
      alert(err.message || "Failed to update reservation status");
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'accepted':
        return <Badge className="bg-blue-100 text-blue-800">Accepted</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center p-4 border rounded-lg">
            <div className="mr-4">
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div>
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border rounded-lg bg-red-50 text-red-700">
        <p>Error: {error}</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchReservations} 
          className="mt-2"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div className="text-center p-6 border rounded-lg bg-gray-50">
        <p className="text-gray-500">No reservations found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <div 
          key={reservation.id} 
          className={`p-4 border rounded-lg transition-colors hover:bg-gray-50 ${
            reservation.status === 'pending' ? 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100/50' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                {reservation.passenger.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium flex items-center">
                  {reservation.passenger.name}
                </p>
                <div className="flex items-center text-gray-500 text-sm">
                  <Phone className="h-3 w-3 mr-1" />
                  {reservation.passenger.phone}
                </div>
              </div>
            </div>
            
            <div>
              {getStatusBadge(reservation.status)}
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <div className="text-gray-500">
              <span>From: {reservation.trip.departure} to {reservation.trip.arrival}</span>
              <div>
                <span>Booked: {formatDate(reservation.created_at)}</span>
              </div>
            </div>
            
            {reservation.status === 'pending' && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="p-1 h-8 w-8 rounded-full text-green-600 border-green-200 hover:bg-green-50"
                  onClick={() => handleUpdateStatus(reservation.id, 'accepted')}
                  disabled={updating === reservation.id}
                >
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Accept</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="p-1 h-8 w-8 rounded-full text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => handleUpdateStatus(reservation.id, 'rejected')}
                  disabled={updating === reservation.id}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Reject</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
      
      {!showAll && reservations.length >= limit && (
        <div className="text-center">
          <Button 
            variant="ghost" 
            className="text-indigo-600"
            onClick={() => window.location.href = "/espace-driver/reservations"}
          >
            View All Reservations
          </Button>
        </div>
      )}
    </div>
  );
}