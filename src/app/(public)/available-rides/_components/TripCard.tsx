"use client";
import React from "react";
import { Clock, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatTime, getImageUrl } from "@/utils/helpers";
import { Trip } from "@/types/Trip";

interface TripCardProps {
  trip: Trip;
}

export const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Image
          src={
            trip.voiture_details?.image
              ? getImageUrl(trip.voiture_details.image) || "/default-car.jpg"
              : "/default-car.jpg" // Fallback image
          }
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
              <Clock className="h-3 w-3" /> {formatTime(trip.departure_date)}
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
        <div className="flex items-center gap-1 mt-3">
          <Users className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {trip.nb_places} seats
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center">
        <div className="text-lg font-semibold">
          À Partir {trip.price} DT
        </div>
        <div className="ml-auto flex gap-2">
          <Button>
            <Link href={`/trip-details/${trip.id}`}>
              View Details
            </Link>
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Link href={`/espace-client/reservation-form/${trip.id}`}>
              Book
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};