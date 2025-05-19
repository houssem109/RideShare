import React from 'react';
import { DollarSign, Route, Star, TrendingUp, Users } from "lucide-react";
import { StatsCard } from './StatsCard';
import { DriverStats } from '@/types/TripSummary';

interface DriverStatsGridProps {
  stats: DriverStats;
}

export const DriverStatsGrid: React.FC<DriverStatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <StatsCard 
        title="Total Trips"
        value={stats.totalTrips}
        icon={<Route />}
        iconBgColor="bg-indigo-100"
        iconColor="text-indigo-600"
        footer={
          <React.Fragment>
            <span className="text-green-600 font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              {Math.floor((stats.completedTrips / (stats.totalTrips || 1)) * 100)}%
            </span>
            <span className="text-gray-500 ml-2">completion rate</span>
          </React.Fragment>
        }
      />

      <StatsCard 
        title="Total Earnings"
        value={`${stats.totalEarnings.toFixed(2)}`}
        icon={<DollarSign />}
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
        footer={
          <span className="text-gray-500">
            Avg. ${((stats.totalEarnings || 0) / (stats.totalTrips || 1)).toFixed(2)} per trip
          </span>
        }
      />

      <StatsCard 
        title="Passengers"
        value={stats.totalPassengers}
        icon={<Users />}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        footer={
          <span className="text-gray-500">
            Avg. {((stats.totalPassengers || 0) / (stats.totalTrips || 1)).toFixed(1)} per trip
          </span>
        }
      />
{/* 
      <StatsCard 
        title="Rating"
        value={stats.averageRating.toFixed(1)}
        icon={<Star />}
        iconBgColor="bg-yellow-100"
        iconColor="text-yellow-600"
        footer={
          <React.Fragment>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(stats.averageRating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-500 ml-2">
              from {stats.ratings.reduce((sum, item) => sum + item.count, 0)} reviews
            </span>
          </React.Fragment>
        }
      /> */}
    </div>
  );
};