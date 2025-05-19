import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Users, Clock, Edit, Trash2 } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatTime, getImageUrl } from "@/utils/helpers";
import { DriverTrip } from '@/types/Driver';

interface TripCardProps {
  trip: DriverTrip;
  onDeleteTrip: (id: number) => void;
  onViewPassengers: (id: number) => void;
}

const TripCard: React.FC<TripCardProps> = ({ 
  trip, 
  onDeleteTrip, 
  onViewPassengers 
}) => {
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
    <Card className="overflow-hidden">
      <div className="relative">
        {/* Use the car image from API if available */}
        <Image
          src={
            trip.voiture_details?.image
              ? getImageUrl(trip.voiture_details.image) ||
                "/default-car.jpg"
              : "/default-car.jpg" // Fallback image
          }
          alt={`Trip from ${trip.departure} to ${trip.arrival}`}
          className="w-full object-cover"
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
                <Clock className="h-3 w-3 mr-1" /> {formatTime(trip.departure_date)}
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
          onClick={() => onViewPassengers(trip.id)}
        >
          <Users className="h-4 w-4 mr-2" />
          Passengers
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="p-2 h-9 w-9" asChild>
            <Link href={`/espace-driver/edit-trip/${trip.id}`}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="p-2 h-9 w-9 border-red-200 text-red-500 hover:bg-red-50"
            onClick={() => onDeleteTrip(trip.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TripCard;