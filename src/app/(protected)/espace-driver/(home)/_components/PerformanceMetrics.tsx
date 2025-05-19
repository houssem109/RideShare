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

interface PerformanceMetricsProps {
  stats: DriverStats;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  stats
}) => {
  return (
    <Card className="shadow-sm bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Performance Metrics</CardTitle>
        <CardDescription>Key indicators of your service quality</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Overall Rating</span>
              <span className="text-sm font-medium">{stats.averageRating.toFixed(1)} / 5.0</span>
            </div>
            <Progress 
              value={(stats.averageRating / 5) * 100} 
              className="h-2 bg-gray-200"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Trip Completion Rate</span>
              <span className="text-sm font-medium">
                {Math.floor((stats.completedTrips / (stats.totalTrips || 1)) * 100)}%
              </span>
            </div>
            <Progress 
              value={(stats.completedTrips / (stats.totalTrips || 1)) * 100} 
              className="h-2 bg-gray-200"
            />
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium mb-3">Rating Breakdown</h4>
            <div className="space-y-2">
              {stats.ratings.map((rating) => (
                <div key={rating.rating} className="flex items-center">
                  <span className="text-sm font-medium w-14">{rating.rating} stars</span>
                  <div className="mx-2 flex-1">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-500"
                        style={{ 
                          width: `${(rating.count / stats.ratings.reduce((sum, item) => sum + item.count, 0)) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium w-10 text-right">{rating.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
