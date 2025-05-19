import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CarFront, 
  CheckCircle2, 
  Clock, 
  LayoutDashboard, 
  Route 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { DriverStats } from '@/types/TripSummary';

interface TripStatusOverviewProps {
  stats: DriverStats;
}

export const TripStatusOverview: React.FC<TripStatusOverviewProps> = ({
  stats
}) => {
  const router = useRouter();
  
  return (
    <Card className="shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="text-lg">Trip Status Overview</CardTitle>
        <CardDescription>Summary of your trip statuses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-full mr-3">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Upcoming</p>
                <h4 className="text-xl font-bold">{stats.upcomingTrips}</h4>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <Route className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <h4 className="text-xl font-bold">{stats.activeTrips}</h4>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-full mr-3">
                <CarFront className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Ongoing</p>
                <h4 className="text-xl font-bold">{stats.ongoingTrips}</h4>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-full mr-3">
                <CheckCircle2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <h4 className="text-xl font-bold">{stats.completedTrips}</h4>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <LayoutDashboard className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm font-medium">Trip Completion Progress</span>
            </div>
            <span className="text-sm font-medium">
              {Math.floor((stats.completedTrips / (stats.totalTrips || 1)) * 100)}%
            </span>
          </div>
          <Progress 
            value={(stats.completedTrips / (stats.totalTrips || 1)) * 100} 
            className="h-2 bg-gray-200"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => router.push("/espace-driver/add-trip")}
        >
          Create New Trip
        </Button>
      </CardFooter>
    </Card>
  );
};