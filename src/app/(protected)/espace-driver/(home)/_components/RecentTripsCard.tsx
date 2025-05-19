import React from 'react';
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Route,
  Users
} from "lucide-react";
import { TripSummary } from '@/types/TripSummary';
import { getStatusColor, formatTime,formatDate } from '@/utils/helpers';

interface RecentTripsCardProps {
  trips: TripSummary[];
}

export const RecentTripsCard: React.FC<RecentTripsCardProps> = ({
  trips
}) => {
  const router = useRouter();
  
  return (
    <Card className="shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="text-lg">Recent Trips</CardTitle>
        <CardDescription>Your most recent trip activities</CardDescription>
      </CardHeader>
      <CardContent>
        {trips.length > 0 ? (
          <div className="space-y-4">
            {trips.map((trip) => (
              <div key={trip.id} className="p-4 border rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div className="flex items-center mb-2 md:mb-0">
                    <div className="mr-4 p-3 bg-indigo-100 rounded-full">
                      <MapPin className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{trip.departure} → {trip.arrival}</h4>
                      <p className="text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(trip.departure_date)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-medium">${trip.price.toFixed(2)}</p>
                      <p className={`text-sm flex items-center ${getStatusColor(trip.status)}`}>
                        <span className="h-2 w-2 rounded-full bg-current mr-1"></span>
                        {trip.status}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <Clock className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">
                      {formatTime(trip.departure_date)} - {formatTime(trip.arrival_date)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">
                      {trip.booking_count}/{trip.nb_places} seats booked
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Route className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No recent trips</h3>
            <p className="text-gray-500 mb-4">You haven&apos;t created any trips yet.</p>
            <Button onClick={() => router.push("/espace-driver/add-trip")}>
              Create Your First Trip
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center border-t">
        <Button 
          variant="outline"
          className="mt-2" 
          onClick={() => router.push("/espace-driver/my-trips")}
        >
          View All Trips
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
