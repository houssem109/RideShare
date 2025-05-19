import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DriverStats } from '@/types/TripSummary';
interface EarningsBreakdownProps {
  stats: DriverStats;
}

export const EarningsBreakdown: React.FC<EarningsBreakdownProps> = ({
  stats
}) => {
  return (
    <Card className="shadow-sm bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Earnings Breakdown</CardTitle>
        <CardDescription>Performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Completed Trips</span>
              <span className="text-sm font-medium">{stats.completedTrips} of {stats.totalTrips}</span>
            </div>
            <Progress 
              value={(stats.completedTrips / (stats.totalTrips || 1)) * 100} 
              className="h-2 bg-gray-200"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Average Per Trip</span>
              <span className="text-sm font-medium">
                ${((stats.totalEarnings || 0) / (stats.completedTrips || 1)).toFixed(2)}
              </span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Average Per Passenger</span>
              <span className="text-sm font-medium">
                ${((stats.totalEarnings || 0) / (stats.totalPassengers || 1)).toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium mb-3">Earnings by Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm flex items-center">
                  <span className="w-3 h-3 inline-block bg-green-500 rounded-full mr-2"></span>
                  Completed
                </span>
                <span className="text-sm font-medium">
                  ${(stats.totalEarnings * 0.9).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm flex items-center">
                  <span className="w-3 h-3 inline-block bg-blue-500 rounded-full mr-2"></span>
                  Active
                </span>
                <span className="text-sm font-medium">
                  ${(stats.totalEarnings * 0.1).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
