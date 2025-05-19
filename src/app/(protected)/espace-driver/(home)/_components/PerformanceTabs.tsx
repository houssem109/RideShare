import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TopDestinationsChart } from './TopDestinationsChart';
import { MonthlyTripsChart } from './MonthlyTripsChart';
import { VehicleInfo } from './VehicleInfo';
import { MonthlyEarningsChart } from './MonthlyEarningsChart';
import { EarningsBreakdown } from './EarningsBreakdown';
import { RatingDistributionChart } from './RatingDistributionChart';
import { PerformanceMetrics } from './PerformanceMetrics';
import { DriverStats } from '@/types/TripSummary';

interface PerformanceTabsProps {
  stats: DriverStats;
}

export const PerformanceTabs: React.FC<PerformanceTabsProps> = ({
  stats
}) => {
  return (
    <div className="mb-8">
      <Tabs defaultValue="trips" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="trips">Trip Analytics</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
         {/*  <TabsTrigger value="feedback">Feedback</TabsTrigger> */}
        </TabsList>

        <TabsContent value="trips">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopDestinationsChart destinations={stats.topDestinations} />
            <MonthlyTripsChart monthlyData={stats.monthlyTrips} />
          </div>

          {/* Vehicle Information */}
          {stats.vehicle && (
            <VehicleInfo vehicle={stats.vehicle} totalDistance={stats.totalDistance} />
          )}
        </TabsContent>

        <TabsContent value="earnings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MonthlyEarningsChart monthlyData={stats.monthlyEarnings} />
            <EarningsBreakdown stats={stats} />
          </div>
        </TabsContent>

    {/*     <TabsContent value="feedback">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RatingDistributionChart ratings={stats.ratings} />
            <PerformanceMetrics stats={stats} />
          </div>
        </TabsContent> */}
      </Tabs>
    </div>
  );
};