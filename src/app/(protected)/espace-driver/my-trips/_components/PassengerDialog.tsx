"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiClient } from "@/lib/axios";
import { createClient } from "@/utils/supabase/client";
import {
  User,
  Phone,
  ArrowUpRight,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

// Updated interface to match the actual response structure
interface PassengerData {
  created_at: string;
  id: string;
  passenger: {
    id: string;
    name: string;
    phone: string;
  };
  payment_method: string;
  payment_status: string | null;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  trip: {
    id: number;
    departure: string;
    arrival: string;
    departure_date: string;
    status: string;
  };
  length: number;
}

interface PassengerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: number;
}

const PassengerDialog: React.FC<PassengerDialogProps> = ({
  isOpen,
  onClose,
  tripId,
}) => {
  const [passengerData, setPassengerData] = useState<PassengerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch passengers for the specific trip
  useEffect(() => {
    const fetchPassengers = async () => {
      if (!isOpen || !tripId) return;

      try {
        setLoading(true);

        // Get authentication token from Supabase
        const supabase = createClient();
        const { data: authData } = await supabase.auth.getSession();

        if (!authData.session) {
          throw new Error("You must be logged in to view passengers");
        }

        const token = authData.session.access_token;

        const { data } = await apiClient.get("driver-reservations/", {
          token: token,
          params: tripId ? { trip_id: tripId } : undefined,
        });

        console.log("Fetched passengers:", data);
        setPassengerData(data || []);
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch passengers:", err);
        setError(err.message || "Failed to load passengers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPassengers();
  }, [isOpen, tripId]);

  // Navigate to passenger profile
  const handleViewProfile = (userId: string) => {
    router.push(`/user-profile/${userId}`);
    onClose(); // Close the dialog
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Accepted
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-gray-100 text-gray-800 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Cancelled
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Filter to show only accepted passengers
  const acceptedPassengers = passengerData.filter(
    (p) => p.status === "accepted"
  );
  
  console.log("Accepted passengers:", acceptedPassengers);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Accepted Passengers</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-4">
              <p>{error}</p>
            </div>
          ) : acceptedPassengers.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              <p>No accepted passengers for this trip yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {acceptedPassengers.map((data) => (
                <div
                  key={data.id}
                  className="p-3 border rounded-lg hover:border-indigo-200 hover:bg-indigo-50 transition-colors cursor-pointer"
                  onClick={() => handleViewProfile(data.passenger.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {data.passenger.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {data.passenger.phone}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(data.status)}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="p-0 h-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewProfile(data.passenger.id);
                        }}
                      >
                        <ArrowUpRight className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  </div>

                  {data.payment_method === "cash" && (
                    <div className="mt-2 text-xs flex items-center gap-1 text-gray-600">
                      <span className="font-medium">Payment Method:</span>
                      <span>Cash</span>
                    </div>
                  )}
                  
                  {data.payment_method === "online" && (
                    <div className="mt-2 text-xs flex items-center gap-1 text-gray-600">
                      <span className="font-medium">Payment:</span>
                      {data.payment_status === "paye" ? (
                        <span className="text-green-600">Paid</span>
                      ) : (
                        <span className="text-amber-600">Not paid</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PassengerDialog;