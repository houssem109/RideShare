
"use client";
import React, { useState, useEffect } from "react";
import { MapPin, Clock, Users, ChevronLeft, ChevronRight, Plus, Edit, Trash2, Check, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { apiClient } from "@/lib/axios";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

// Updated interface based on your actual API response
interface DriverTrip {
  id: number;
  name: string;
  phonenumber: string;
  price: string;
  departure: string;
  arrival: string;
  departure_date: string;
  arrival_date: string;
  nb_places: number;
  status: string;
  voiture: number;
  owner_id: number;
  created_at: string;
  voiture_details: {
    car_image_id: string;
    id_voiture: number;
    image: string;
    marque: string;
    matricule: string;
  };
  booking_count?: number;
  // Static passenger data for each trip
  passengers?: Passenger[];
}

interface Passenger {
  id: number;
  name: string;
  phonenumber: string;
  status: "pending" | "confirmed" | "rejected";
}

// Static passenger data
const staticPassengers: Passenger[] = [
  {
    id: 1,
    name: "Ahmed Ben Salem",
    phonenumber: "+216 98765432",
    status: "confirmed"
  },
  {
    id: 2,
    name: "Mouna Trabelsi",
    phonenumber: "+216 55123456",
    status: "pending"
  },
  {
    id: 3,
    name: "Karim Mahjoub",
    phonenumber: "+216 27891234",
    status: "rejected"
  },
  {
    id: 4,
    name: "Sarra Belhadj",
    phonenumber: "+216 92345678",
    status: "pending"
  },
  {
    id: 5,
    name: "Youssef Bouazizi",
    phonenumber: "+216 53987654",
    status: "confirmed"
  },
  {
    id: 6,
    name: "Amina Mejri",
    phonenumber: "+216 24567890",
    status: "pending"
  }
];

// Passenger Dialog Component
const PassengerDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  tripId: number;
  passengers: Passenger[];
  setPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>;
}> = ({ isOpen, onClose, tripId, passengers, setPassengers }) => {
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async (passengerId: number, newStatus: "confirmed" | "rejected") => {
    try {
      setLoading(true);
      
      // In a real implementation, we would make an API call here
      // For now, we'll just update the state locally
      setTimeout(() => {
        setPassengers(
          passengers.map((p) =>
            p.id === passengerId ? { ...p, status: newStatus } : p
          )
        );
        setLoading(false);
        
        // Show success notification
        alert(`Passenger status updated to ${newStatus}`);
      }, 500);
      
    } catch (err: any) {
      console.error("Failed to update passenger status:", err);
      alert("Failed to update status. Please try again.");
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Passenger Reservations</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {loading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          ) : staticPassengers.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              No reservations for this trip yet.
            </p>
          ) : (
            <div className="space-y-4">
              {staticPassengers.map((passenger) => (
                <div
                  key={passenger.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                      {passenger.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{passenger.name}</div>
                      <div className="text-sm text-gray-500">
                        {passenger.phonenumber}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(passenger.status)}
                    
                    {passenger.status === "pending" && (
                      <div className="flex ml-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="p-1 h-8 w-8 rounded-full text-green-600 border-green-200 hover:bg-green-50 mr-1"
                          onClick={() => handleUpdateStatus(passenger.id, "confirmed")}
                          disabled={loading}
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Confirm</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="p-1 h-8 w-8 rounded-full text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleUpdateStatus(passenger.id, "rejected")}
                          disabled={loading}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Reject</span>
                        </Button>
                      </div>
                    )}
                  </div>
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